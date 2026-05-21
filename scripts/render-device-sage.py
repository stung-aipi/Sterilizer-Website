"""
Builds and renders the FORTH sterilizer — Sage colorway.
Based on render-device.py (midnight). Only the color palette and output paths differ.
Run: blender -b -P scripts/render-device-sage.py
Output: public/renderings/forth-device-sage-frame-00.png  (frame 0 only)

To render the full rotation later, set NUM_FRAMES = 104.
After rendering all frames, encode with ffmpeg:
  ffmpeg -r 30 -i "public/renderings/forth-device-sage-frame-%02d.png" ^
    -c:v libvpx-vp9 -g 1 -b:v 0 -crf 33 -an ^
    "public/renderings/forth-device-sage-rotation.webm"
"""
import bpy
import math
import os
import shutil

REPO_ROOT         = r"c:\Users\Stephen\Documents\GitHub\Sterilizer-Website"
OUT_DIR           = os.path.join(REPO_ROOT, "public", "renderings")
HDRI_PATH         = os.path.join(REPO_ROOT, "scripts", "hdri", "studio_small_08_1k.exr")
WORDMARK_TEX_PATH = os.path.join(REPO_ROOT, "scripts", "_wordmark.png")

RES_X, RES_Y = 1600, 2400
SAMPLES      = 512
NUM_FRAMES   = 1   # set to 104 for full rotation

BODY_LENGTH = 6.4
BODY_RADIUS = 1.10
CAP_RADIUS  = 1.10
RING_RADIUS = 1.101
RING_DEPTH  = 0.06

# ── Sage palette (Blender linear RGB) ─────────────────────────────────────────
BODY_DARK    = (0.013, 0.024, 0.021, 1.0)   # dark forest green
BODY_LIGHT   = (0.022, 0.040, 0.035, 1.0)   # slightly lighter green
CAP_BASE     = (0.381, 0.569, 0.466, 1.0)   # #A6C7B6 sage glass
CAP_EDGE     = (0.550, 0.750, 0.620, 1.0)   # brighter sage edge accent
CAP_EMIT     = (0.381, 0.569, 0.466, 1.0)   # sage emission on facets
CAP_EDGE_EMIT= (0.550, 0.750, 0.620, 1.0)   # edge emission
EMITTER_COL  = (0.880, 0.950, 0.920, 1.0)   # cool sage-white inner glow
GLOW_COL     = (0.381, 0.569, 0.466, 1.0)   # compositor fog glow color


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def render_wordmark_texture():
    if os.path.exists(WORDMARK_TEX_PATH):
        return WORDMARK_TEX_PATH

    bpy.ops.wm.read_factory_settings(use_empty=True)
    text_scene = bpy.context.scene
    text_scene.name = "TextScene"

    bpy.ops.object.text_add(location=(0, 0, 0))
    text_obj = bpy.context.active_object
    text_obj.data.body = "FORTH"
    text_obj.data.size = 1.0
    text_obj.data.align_x = 'CENTER'
    text_obj.data.align_y = 'CENTER'
    text_obj.data.space_character = 2.4
    text_obj.data.extrude = 0.0

    mat = bpy.data.materials.new("WordmarkInk")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    for n in list(nodes):
        if n.type != 'OUTPUT_MATERIAL':
            nodes.remove(n)
    em = nodes.new('ShaderNodeEmission')
    em.inputs["Color"].default_value = (1.0, 1.0, 1.0, 1.0)
    em.inputs["Strength"].default_value = 1.0
    links.new(em.outputs["Emission"], nodes['Material Output'].inputs["Surface"])
    text_obj.data.materials.append(mat)

    bpy.ops.object.camera_add(location=(0, 0, 5))
    cam = bpy.context.active_object
    cam.rotation_euler = (0, 0, 0)
    cam.data.type = 'ORTHO'
    cam.data.ortho_scale = 7.5
    text_scene.camera = cam

    text_scene.render.engine = 'CYCLES'
    text_scene.cycles.samples = 16
    text_scene.render.resolution_x = 2048
    text_scene.render.resolution_y = 512
    text_scene.render.film_transparent = True
    text_scene.render.image_settings.file_format = 'PNG'
    text_scene.render.image_settings.color_mode = 'RGBA'
    text_scene.render.filepath = WORDMARK_TEX_PATH

    world = bpy.data.worlds.new("TextWorld")
    text_scene.world = world
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.0

    bpy.ops.render.render(write_still=True)
    return WORDMARK_TEX_PATH


def set_principled(bsdf, **kwargs):
    aliases = {
        "Transmission":  ["Transmission Weight", "Transmission"],
        "Coat":          ["Coat Weight", "Clearcoat"],
        "CoatRoughness": ["Coat Roughness", "Clearcoat Roughness"],
        "Sheen":         ["Sheen Weight", "Sheen"],
    }
    for key, value in kwargs.items():
        for n in aliases.get(key, [key]):
            if n in bsdf.inputs:
                bsdf.inputs[n].default_value = value
                break


def make_body():
    bpy.ops.mesh.primitive_cylinder_add(
        radius=BODY_RADIUS, depth=BODY_LENGTH, vertices=192, location=(0, 0, 0)
    )
    obj = bpy.context.active_object
    obj.name = "Body"

    bevel = obj.modifiers.new(name="Bevel", type='BEVEL')
    bevel.width = 0.04
    bevel.segments = 6
    bevel.limit_method = 'ANGLE'

    bpy.ops.object.shade_smooth()

    mat = bpy.data.materials.new("BodyMat")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    bsdf = nodes["Principled BSDF"]
    set_principled(bsdf, Metallic=0.0, Coat=0.0)

    voronoi = nodes.new('ShaderNodeTexVoronoi')
    voronoi.inputs["Scale"].default_value = 220.0
    voronoi.feature = 'F1'

    color_ramp = nodes.new('ShaderNodeValToRGB')
    color_ramp.color_ramp.elements[0].position = 0.0
    color_ramp.color_ramp.elements[0].color = BODY_DARK
    color_ramp.color_ramp.elements[1].position = 1.0
    color_ramp.color_ramp.elements[1].color = BODY_LIGHT
    links.new(voronoi.outputs["Distance"], color_ramp.inputs["Fac"])

    rough_map = nodes.new('ShaderNodeMapRange')
    rough_map.inputs["From Min"].default_value = 0.0
    rough_map.inputs["From Max"].default_value = 1.0
    rough_map.inputs["To Min"].default_value   = 0.45
    rough_map.inputs["To Max"].default_value   = 0.85
    links.new(voronoi.outputs["Distance"], rough_map.inputs["Value"])
    links.new(rough_map.outputs["Result"], bsdf.inputs["Roughness"])

    bump = nodes.new('ShaderNodeBump')
    bump.inputs["Strength"].default_value = 1.6
    bump.inputs["Distance"].default_value = 0.007
    links.new(voronoi.outputs["Distance"], bump.inputs["Height"])
    links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

    if os.path.exists(WORDMARK_TEX_PATH):
        wordmark_img = bpy.data.images.load(WORDMARK_TEX_PATH, check_existing=True)
    else:
        wordmark_img = None

    if wordmark_img is not None:
        tex_coord = nodes.new('ShaderNodeTexCoord')
        sep = nodes.new('ShaderNodeSeparateXYZ')
        links.new(tex_coord.outputs["Object"], sep.inputs["Vector"])

        u_div = nodes.new('ShaderNodeMath')
        u_div.operation = 'DIVIDE'
        u_div.inputs[1].default_value = 2.0 * BODY_RADIUS
        links.new(sep.outputs["X"], u_div.inputs[0])
        u_add = nodes.new('ShaderNodeMath')
        u_add.operation = 'ADD'
        u_add.inputs[1].default_value = 0.5
        links.new(u_div.outputs["Value"], u_add.inputs[0])

        v_div = nodes.new('ShaderNodeMath')
        v_div.operation = 'DIVIDE'
        v_div.inputs[1].default_value = BODY_LENGTH
        links.new(sep.outputs["Z"], v_div.inputs[0])
        v_add = nodes.new('ShaderNodeMath')
        v_add.operation = 'ADD'
        v_add.inputs[1].default_value = 0.5
        links.new(v_div.outputs["Value"], v_add.inputs[0])

        combine = nodes.new('ShaderNodeCombineXYZ')
        links.new(u_add.outputs["Value"], combine.inputs["X"])
        links.new(v_add.outputs["Value"], combine.inputs["Y"])

        mapping = nodes.new('ShaderNodeMapping')
        mapping.inputs["Location"].default_value[0] = -0.28
        mapping.inputs["Location"].default_value[1] = -7.83
        mapping.inputs["Scale"].default_value[0] = 1.56
        mapping.inputs["Scale"].default_value[1] = 16.67
        links.new(combine.outputs["Vector"], mapping.inputs["Vector"])

        wm_tex = nodes.new('ShaderNodeTexImage')
        wm_tex.image = wordmark_img
        wm_tex.extension = 'CLIP'
        wm_tex.interpolation = 'Linear'
        links.new(mapping.outputs["Vector"], wm_tex.inputs["Vector"])

        y_mask = nodes.new('ShaderNodeMath')
        y_mask.operation = 'LESS_THAN'
        y_mask.inputs[1].default_value = 0.0
        links.new(sep.outputs["Y"], y_mask.inputs[0])

        masked_alpha = nodes.new('ShaderNodeMath')
        masked_alpha.operation = 'MULTIPLY'
        links.new(wm_tex.outputs["Alpha"], masked_alpha.inputs[0])
        links.new(y_mask.outputs["Value"], masked_alpha.inputs[1])

        color_mix = nodes.new('ShaderNodeMixRGB')
        color_mix.blend_type = 'MIX'
        links.new(masked_alpha.outputs["Value"], color_mix.inputs["Fac"])
        links.new(color_ramp.outputs["Color"], color_mix.inputs["Color1"])
        color_mix.inputs["Color2"].default_value = (0.78, 0.79, 0.80, 1.0)
        links.new(color_mix.outputs["Color"], bsdf.inputs["Base Color"])
    else:
        links.new(color_ramp.outputs["Color"], bsdf.inputs["Base Color"])

    obj.data.materials.append(mat)
    return obj


def make_cap(z_offset, name, top=True):
    bpy.ops.mesh.primitive_ico_sphere_add(
        subdivisions=2, radius=CAP_RADIUS, location=(0, 0, z_offset)
    )
    obj = bpy.context.active_object
    obj.name = name

    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.bisect(
        plane_co=(0.0, 0.0, z_offset),
        plane_no=(0.0, 0.0, 1.0 if top else -1.0),
        clear_inner=True,
        use_fill=True,
    )
    bpy.ops.object.mode_set(mode='OBJECT')
    bpy.ops.object.shade_flat()

    edge_bevel = obj.modifiers.new(name="EdgeAccent", type='BEVEL')
    edge_bevel.width = 0.006
    edge_bevel.segments = 2
    edge_bevel.limit_method = 'NONE'
    edge_bevel.material = 1

    mat = bpy.data.materials.new(f"CapMat_{name}")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = CAP_BASE
    set_principled(bsdf, Roughness=0.22, IOR=1.46, Transmission=0.25)
    if "Emission Color"    in bsdf.inputs: bsdf.inputs["Emission Color"].default_value    = CAP_EMIT
    if "Emission Strength" in bsdf.inputs: bsdf.inputs["Emission Strength"].default_value = 0.15
    obj.data.materials.append(mat)

    edge_mat = bpy.data.materials.new(f"CapEdgeMat_{name}")
    edge_mat.use_nodes = True
    edge_bsdf = edge_mat.node_tree.nodes["Principled BSDF"]
    edge_bsdf.inputs["Base Color"].default_value = CAP_EDGE
    set_principled(edge_bsdf, Roughness=0.10, IOR=1.46, Transmission=0.20)
    if "Emission Color"    in edge_bsdf.inputs: edge_bsdf.inputs["Emission Color"].default_value    = CAP_EDGE_EMIT
    if "Emission Strength" in edge_bsdf.inputs: edge_bsdf.inputs["Emission Strength"].default_value = 0.45
    obj.data.materials.append(edge_mat)
    return obj


def make_button():
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(BODY_RADIUS - 0.04, 0, 0))
    cutter = bpy.context.active_object
    cutter.name = "PortCutter"
    cutter.scale = (0.18, 0.42, 0.18)
    bpy.ops.object.transform_apply(scale=True)
    bev = cutter.modifiers.new(name="CutterBevel", type='BEVEL')
    bev.width = 0.085
    bev.segments = 10
    bpy.ops.object.modifier_apply(modifier="CutterBevel")

    body = bpy.data.objects.get("Body")
    if body is not None:
        bpy.ops.object.select_all(action='DESELECT')
        body.select_set(True)
        bpy.context.view_layer.objects.active = body
        bool_mod = body.modifiers.new(name="PortCutout", type='BOOLEAN')
        bool_mod.operation = 'DIFFERENCE'
        bool_mod.object = cutter
        bool_mod.solver = 'EXACT'
        bpy.ops.object.modifier_apply(modifier="PortCutout")
        bpy.ops.object.shade_smooth()
        bpy.ops.object.mode_set(mode='EDIT')
        bpy.ops.mesh.select_all(action='SELECT')
        bpy.ops.mesh.remove_doubles(threshold=0.0001)
        bpy.ops.object.mode_set(mode='OBJECT')

    bpy.ops.object.select_all(action='DESELECT')
    cutter.select_set(True)
    bpy.context.view_layer.objects.active = cutter
    bpy.ops.object.delete()

    contact_mat = bpy.data.materials.new("ContactMat")
    contact_mat.use_nodes = True
    contact_bsdf = contact_mat.node_tree.nodes["Principled BSDF"]
    contact_bsdf.inputs["Base Color"].default_value = (0.85, 0.55, 0.18, 1.0)
    set_principled(contact_bsdf, Metallic=1.0, Roughness=0.32)

    for dy in (-0.11, 0.0, 0.11):
        bpy.ops.mesh.primitive_cylinder_add(
            radius=0.022, depth=0.012, vertices=24,
            location=(BODY_RADIUS - 0.07, dy, 0),
            rotation=(0, math.radians(90), 0),
        )
        bpy.context.active_object.data.materials.append(contact_mat)

    return body


def make_softbox(name, location, rot_euler, scale_yz, color, strength):
    bpy.ops.mesh.primitive_plane_add(size=1, location=location)
    plane = bpy.context.active_object
    plane.name = name
    plane.rotation_euler = rot_euler
    bpy.ops.object.transform_apply(rotation=True)
    plane.scale = (1.0, scale_yz[0], scale_yz[1])
    bpy.ops.object.transform_apply(scale=True)

    mat = bpy.data.materials.new(f"SoftboxMat_{name}")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    for node in list(nodes):
        if node.type != 'OUTPUT_MATERIAL':
            nodes.remove(node)
    em = nodes.new('ShaderNodeEmission')
    em.inputs["Color"].default_value = (*color, 1.0)
    em.inputs["Strength"].default_value = strength
    links.new(em.outputs["Emission"], nodes['Material Output'].inputs["Surface"])
    plane.data.materials.append(mat)
    plane.visible_camera = False
    plane.visible_shadow = False


def make_lighting():
    make_softbox("KeyBox",    (-5.0, -4.5, 3.0),  (math.radians(-22), math.radians(82), 0), (4.0, 8.0),  (1.0, 0.97, 0.93), 35)
    make_softbox("FrontFill", (0.0,  -9.0, -0.5), (math.radians(90),  0, 0),                (10.0, 12.0),(0.96, 0.97, 1.0),  6)


def make_camera():
    angle = math.radians(14)
    distance = 26.0
    bpy.ops.object.camera_add(location=(-distance * math.sin(angle), -distance * math.cos(angle), 0))
    cam = bpy.context.active_object
    bpy.ops.object.empty_add(location=(0, 0, 0))
    target = bpy.context.active_object
    target.name = "CamTarget"
    constraint = cam.constraints.new(type='TRACK_TO')
    constraint.target = target
    constraint.track_axis = 'TRACK_NEGATIVE_Z'
    constraint.up_axis = 'UP_Y'
    cam.data.lens = 110
    cam.data.sensor_width = 36
    bpy.context.scene.camera = cam
    return cam


def configure_render():
    scene = bpy.context.scene
    scene.render.engine              = 'CYCLES'
    scene.cycles.samples             = SAMPLES
    scene.cycles.use_denoising       = True
    scene.cycles.caustics_reflective = False
    scene.cycles.caustics_refractive = False
    scene.render.resolution_x        = RES_X
    scene.render.resolution_y        = RES_Y
    scene.render.resolution_percentage = 100
    scene.render.film_transparent    = True
    scene.render.image_settings.file_format  = 'PNG'
    scene.render.image_settings.color_mode   = 'RGBA'
    scene.render.image_settings.compression  = 15
    scene.view_settings.view_transform = 'Filmic'
    scene.view_settings.look           = 'High Contrast'

    world = bpy.data.worlds.new("World") if not bpy.data.worlds else bpy.data.worlds[0]
    scene.world = world
    world.use_nodes = True
    nodes = world.node_tree.nodes
    links = world.node_tree.links
    for node in list(nodes):
        if node.type != 'OUTPUT_WORLD':
            nodes.remove(node)
    output = nodes['World Output']

    env_tex = nodes.new('ShaderNodeTexEnvironment')
    env_tex.image = bpy.data.images.load(HDRI_PATH)
    mapping = nodes.new('ShaderNodeMapping')
    mapping.inputs["Rotation"].default_value[2] = math.radians(120)
    tex_coord = nodes.new('ShaderNodeTexCoord')
    links.new(tex_coord.outputs["Generated"], mapping.inputs["Vector"])
    links.new(mapping.outputs["Vector"], env_tex.inputs["Vector"])

    bg = nodes.new('ShaderNodeBackground')
    bg.inputs["Strength"].default_value = 1.0
    links.new(env_tex.outputs["Color"], bg.inputs["Color"])
    links.new(bg.outputs["Background"], output.inputs["Surface"])

    try:
        comp_tree = bpy.data.node_groups.new(name="CompositorTree", type='CompositorNodeTree')
        if hasattr(scene, "compositing_node_group"):
            scene.compositing_node_group = comp_tree
        if hasattr(comp_tree, "interface"):
            comp_tree.interface.new_socket(name="Image", in_out='OUTPUT', socket_type='NodeSocketColor')
        cnodes = comp_tree.nodes
        clinks = comp_tree.links
        rl = cnodes.new('CompositorNodeRLayers')
        glare = cnodes.new('CompositorNodeGlare')
        for attr_name, value in [
            ('glare_type', 'FOG_GLOW'),
            ('mode', 'FOG_GLOW'),
            ('quality', 'HIGH'),
            ('size', 5),
            ('threshold', 1.0),
            ('mix', -0.4),
            ('bloom_size', 5),
        ]:
            try:
                setattr(glare, attr_name, value)
            except (TypeError, AttributeError):
                pass
        set_alpha = cnodes.new('CompositorNodeSetAlpha')
        out = cnodes.new('NodeGroupOutput')
        clinks.new(rl.outputs['Image'], glare.inputs['Image'])
        clinks.new(glare.outputs['Image'], set_alpha.inputs['Image'])
        clinks.new(rl.outputs['Alpha'], set_alpha.inputs['Alpha'])
        clinks.new(set_alpha.outputs['Image'], out.inputs[0])
    except Exception as e:
        print(f"[render-device-sage] Compositor setup skipped: {e}")


def main():
    os.makedirs(OUT_DIR, exist_ok=True)

    if not os.path.exists(WORDMARK_TEX_PATH):
        render_wordmark_texture()

    reset_scene()
    make_body()
    make_cap(BODY_LENGTH / 2,  "TopCap", top=True)
    make_cap(-BODY_LENGTH / 2, "BotCap", top=False)
    make_button()
    make_lighting()
    make_camera()
    configure_render()

    bpy.ops.object.empty_add(location=(0, 0, 0))
    device_root = bpy.context.active_object
    device_root.name = "DeviceRoot"

    NON_DEVICE = {"DeviceRoot", "CamTarget", "KeyBox", "FrontFill"}
    for obj in list(bpy.data.objects):
        if obj.name in NON_DEVICE:
            continue
        if obj.type in ('CAMERA', 'LIGHT', 'EMPTY'):
            continue
        if obj.name.startswith("Halo_") or obj.name.startswith("Softbox"):
            continue
        obj.parent = device_root

    for i in range(NUM_FRAMES):
        progress = i / max(NUM_FRAMES - 1, 1)
        device_root.rotation_euler = (0, 0, math.radians(-progress * 90.0))
        frame_path = os.path.join(OUT_DIR, f"forth-device-sage-frame-{i:02d}.png")
        bpy.context.scene.render.filepath = frame_path
        bpy.ops.render.render(write_still=True)
        print(f"[sage] {i+1}/{NUM_FRAMES} → {frame_path}")

    shutil.copy(
        os.path.join(OUT_DIR, "forth-device-sage-frame-00.png"),
        os.path.join(OUT_DIR, "forth-device-sage-hero.png"),
    )
    device_root.rotation_euler = (0, 0, 0)
    print(f"[sage] Done. Frames in {OUT_DIR}")


if __name__ == "__main__":
    main()
