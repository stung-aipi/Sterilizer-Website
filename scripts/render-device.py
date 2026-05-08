"""
Builds and renders the FORTH sterilizer device.
Run: blender -b -P scripts/render-device.py
Outputs: public/renderings/forth-device-hero.png + forth-device.glb
"""
import bpy
import math
import os

REPO_ROOT = "/Users/cole/Documents/Sterilizer-Website"
OUT_DIR = os.path.join(REPO_ROOT, "public/renderings")
PNG_PATH = os.path.join(OUT_DIR, "forth-device-hero.png")
GLB_PATH = os.path.join(OUT_DIR, "forth-device.glb")
HDRI_PATH = os.path.join(REPO_ROOT, "scripts/hdri/studio_small_08_1k.exr")
WORDMARK_TEX_PATH = os.path.join(REPO_ROOT, "scripts/_wordmark.png")

RES_X, RES_Y = 1600, 2400
SAMPLES = 512  # higher for clean specular highlights, denoiser handles remaining noise

# Device proportions: matched to schematics/assembled.png. Working units = 1 cm.
# Body is a clean cylinder with a hemispherical geodesic cap at each end. Total length
# (body + 2 cap radii) ≈ 87 mm; body radius ≈ 11 mm.
BODY_LENGTH = 6.4
BODY_RADIUS = 1.10
CAP_RADIUS = 1.10   # flush with body — no step in the silhouette
RING_RADIUS = 1.101  # tiny epsilon over body so the seam reads, but no silhouette change
RING_DEPTH = 0.06


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def render_wordmark_texture():
    """Render a transparent PNG with FORTH text — this image gets used as a
    texture on the body so the wordmark is truly part of the body surface,
    not floating geometry."""
    if os.path.exists(WORDMARK_TEX_PATH):
        # Already rendered for this run; reuse to save time
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
    # Wider letter spacing so the wordmark feels more spaced/airy
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
    # Larger ortho scale to frame the wider-spaced text with margin
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
    print(f"[render-device] wrote wordmark texture {WORDMARK_TEX_PATH}")
    return WORDMARK_TEX_PATH


def set_principled(bsdf, **kwargs):
    """Tolerant setter — Blender renamed several Principled BSDF inputs in 4.x."""
    aliases = {
        "Transmission": ["Transmission Weight", "Transmission"],
        "Coat": ["Coat Weight", "Clearcoat"],
        "CoatRoughness": ["Coat Roughness", "Clearcoat Roughness"],
        "Sheen": ["Sheen Weight", "Sheen"],
    }
    for key, value in kwargs.items():
        names = aliases.get(key, [key])
        for n in names:
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
    # High roughness for true matte. Pure dielectric.
    set_principled(bsdf, Metallic=0.0, Coat=0.0)

    # Voronoi cells = pebbled/anodized texture. The same texture drives bump,
    # color variation, and roughness variation so the surface reads as visibly
    # textured even on a dark color where bump-only would be too subtle.
    voronoi = nodes.new('ShaderNodeTexVoronoi')
    voronoi.inputs["Scale"].default_value = 220.0
    voronoi.feature = 'F1'

    # Color variation — drives base color between two dark navy shades following
    # the cell pattern, with wider color range so texture reads more clearly.
    color_ramp = nodes.new('ShaderNodeValToRGB')
    color_ramp.color_ramp.elements[0].position = 0.0
    color_ramp.color_ramp.elements[0].color = (0.003, 0.006, 0.014, 1.0)
    color_ramp.color_ramp.elements[1].position = 1.0
    color_ramp.color_ramp.elements[1].color = (0.026, 0.040, 0.066, 1.0)
    links.new(voronoi.outputs["Distance"], color_ramp.inputs["Fac"])

    # Roughness variation — wider range so different cells reflect differently.
    rough_map = nodes.new('ShaderNodeMapRange')
    rough_map.inputs["From Min"].default_value = 0.0
    rough_map.inputs["From Max"].default_value = 1.0
    rough_map.inputs["To Min"].default_value = 0.45
    rough_map.inputs["To Max"].default_value = 0.85
    links.new(voronoi.outputs["Distance"], rough_map.inputs["Value"])
    links.new(rough_map.outputs["Result"], bsdf.inputs["Roughness"])

    # Stronger bump for clearly visible surface relief
    bump = nodes.new('ShaderNodeBump')
    bump.inputs["Strength"].default_value = 1.6
    bump.inputs["Distance"].default_value = 0.007
    links.new(voronoi.outputs["Distance"], bump.inputs["Height"])
    links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

    # FORTH wordmark — applied as a UV-mapped texture decal so it's truly part of
    # the body surface, not floating geometry. The cylinder primitive comes with
    # default UVs (circumference→U, length→V), so we offset/scale the wordmark
    # image to land at the front-of-cylinder, vertically centered.
    if os.path.exists(WORDMARK_TEX_PATH):
        wordmark_img = bpy.data.images.load(WORDMARK_TEX_PATH, check_existing=True)
    else:
        wordmark_img = None

    if wordmark_img is not None:
        # Object-space cylindrical projection (more reliable than UV).
        # Body cylinder is at origin, axis along Z. Front of device is the -Y side.
        # We project the wordmark onto the (X, Z) plane so the texture appears
        # centered on the front of the cylinder. A Y-mask hides it on the back.
        tex_coord = nodes.new('ShaderNodeTexCoord')
        sep = nodes.new('ShaderNodeSeparateXYZ')
        links.new(tex_coord.outputs["Object"], sep.inputs["Vector"])

        # U = X / (2 * BODY_RADIUS) + 0.5  → maps X∈[-R, R] to U∈[0, 1]
        u_div = nodes.new('ShaderNodeMath')
        u_div.operation = 'DIVIDE'
        u_div.inputs[1].default_value = 2.0 * BODY_RADIUS
        links.new(sep.outputs["X"], u_div.inputs[0])
        u_add = nodes.new('ShaderNodeMath')
        u_add.operation = 'ADD'
        u_add.inputs[1].default_value = 0.5
        links.new(u_div.outputs["Value"], u_add.inputs[0])

        # V = Z / BODY_LENGTH + 0.5  → maps Z∈[-L/2, L/2] to V∈[0, 1]
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

        # Position the wordmark: wider horizontal band on the front of the cylinder.
        # U=0.5 is dead-center (front), V=0.5 is mid-height.
        # Want image to span U∈[0.18, 0.82] (64% width) and V∈[0.47, 0.53] (6% height).
        #   scale_u = 1/0.64 ≈ 1.56,  loc_u = 0.5 - 0.5*1.56 = -0.28
        #   scale_v = 1/0.06 ≈ 16.67, loc_v = 0.5 - 0.5*16.67 = -7.83
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

        # Y-mask: only show the wordmark on the front (Y < 0). Otherwise the
        # X-based projection would also paint the back of the cylinder.
        y_mask = nodes.new('ShaderNodeMath')
        y_mask.operation = 'LESS_THAN'
        y_mask.inputs[1].default_value = 0.0
        links.new(sep.outputs["Y"], y_mask.inputs[0])

        # Combined alpha = wordmark.alpha * front_facing_mask
        masked_alpha = nodes.new('ShaderNodeMath')
        masked_alpha.operation = 'MULTIPLY'
        links.new(wm_tex.outputs["Alpha"], masked_alpha.inputs[0])
        links.new(y_mask.outputs["Value"], masked_alpha.inputs[1])

        # Mix wordmark over body color (color_ramp) using the masked alpha
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
    """Smooth faceted glass hemisphere. Subdivision-2 icosphere gives the classic
    geodesic dome look — many fine triangular facets across a rounded hemisphere."""
    bpy.ops.mesh.primitive_ico_sphere_add(
        subdivisions=2,
        radius=CAP_RADIUS,
        location=(0, 0, z_offset),
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

    # Flat shading per facet so each polygon shades distinctly from its neighbors.
    bpy.ops.object.shade_flat()

    # Bevel chamfer between facets — wider now so the chamfered surfaces read as
    # visible "edge strips" outlining each polygon. We assign the chamfer to a
    # second material slot to give it a subtle bright accent.
    edge_bevel = obj.modifiers.new(name="EdgeAccent", type='BEVEL')
    edge_bevel.width = 0.006
    edge_bevel.segments = 2
    edge_bevel.limit_method = 'NONE'
    edge_bevel.material = 1  # chamfer faces use material slot 1 (the accent)

    # Slot 0 — main facet material (the body of each polygon)
    mat = bpy.data.materials.new(f"CapMat_{name}")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (0.55, 0.72, 0.92, 1.0)
    set_principled(
        bsdf,
        Roughness=0.22,
        IOR=1.46,
        Transmission=0.25,
    )
    if "Emission Color" in bsdf.inputs:
        bsdf.inputs["Emission Color"].default_value = (0.45, 0.70, 1.0, 1.0)
    if "Emission Strength" in bsdf.inputs:
        bsdf.inputs["Emission Strength"].default_value = 0.15
    obj.data.materials.append(mat)

    # Slot 1 — edge accent: brighter, slightly more emissive, tighter roughness so
    # the chamfered edges between polygons catch a clean light highlight that
    # outlines each facet.
    edge_mat = bpy.data.materials.new(f"CapEdgeMat_{name}")
    edge_mat.use_nodes = True
    edge_bsdf = edge_mat.node_tree.nodes["Principled BSDF"]
    edge_bsdf.inputs["Base Color"].default_value = (0.85, 0.93, 1.0, 1.0)
    set_principled(
        edge_bsdf,
        Roughness=0.10,
        IOR=1.46,
        Transmission=0.20,
    )
    if "Emission Color" in edge_bsdf.inputs:
        edge_bsdf.inputs["Emission Color"].default_value = (0.55, 0.80, 1.0, 1.0)
    if "Emission Strength" in edge_bsdf.inputs:
        edge_bsdf.inputs["Emission Strength"].default_value = 0.45
    obj.data.materials.append(edge_mat)
    return obj


def make_cap_halo(z_offset, name, top=True):
    """Camera-facing billboard plane with a radial gradient emission. Sits in front
    of the cap and creates the visible 'glow extending outward' halo — bright at
    the cap, fading to transparent at the edges."""
    cam_angle = math.radians(14)

    # Position the plane at the cap's location, slightly toward camera, so it
    # surrounds the cap visually from the camera POV.
    halo_radius = CAP_RADIUS * 2.6
    offset_toward_cam = 0.5
    plane_x = -offset_toward_cam * math.sin(cam_angle)
    plane_y = -offset_toward_cam * math.cos(cam_angle)
    bpy.ops.mesh.primitive_plane_add(
        size=halo_radius * 2,
        location=(plane_x, plane_y, z_offset + (CAP_RADIUS * 0.3 if top else -CAP_RADIUS * 0.3)),
    )
    plane = bpy.context.active_object
    plane.name = f"Halo_{name}"
    # Face the camera (perpendicular to camera direction)
    plane.rotation_euler = (math.pi / 2, 0, -cam_angle)

    mat = bpy.data.materials.new(f"HaloMat_{name}")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    for n in list(nodes):
        if n.type != 'OUTPUT_MATERIAL':
            nodes.remove(n)
    output = nodes['Material Output']

    # Radial gradient: 0 at center, 1 at edge.
    tex_coord = nodes.new('ShaderNodeTexCoord')
    gradient = nodes.new('ShaderNodeTexGradient')
    gradient.gradient_type = 'SPHERICAL'
    links.new(tex_coord.outputs["Generated"], gradient.inputs["Vector"])

    # Invert so center=1, edge=0
    invert = nodes.new('ShaderNodeMath')
    invert.operation = 'SUBTRACT'
    invert.inputs[0].default_value = 1.0
    links.new(gradient.outputs["Fac"], invert.inputs[1])

    # Power for sharper falloff (so the bright spot is concentrated near the cap)
    power = nodes.new('ShaderNodeMath')
    power.operation = 'POWER'
    power.inputs[1].default_value = 3.0
    links.new(invert.outputs["Value"], power.inputs[0])

    # Emission with the cap's blue tone
    emission = nodes.new('ShaderNodeEmission')
    emission.inputs["Color"].default_value = (0.45, 0.70, 1.0, 1.0)
    emission.inputs["Strength"].default_value = 5.0

    # Transparent for areas outside the gradient bright spot
    transparent = nodes.new('ShaderNodeBsdfTransparent')

    # Mix using a real float factor (1 at center → emission, 0 at edge → transparent)
    mix = nodes.new('ShaderNodeMixShader')
    links.new(power.outputs["Value"], mix.inputs["Fac"])
    links.new(transparent.outputs["BSDF"], mix.inputs[1])
    links.new(emission.outputs["Emission"], mix.inputs[2])
    links.new(mix.outputs["Shader"], output.inputs["Surface"])

    # Halo shouldn't cast shadows or reflect onto other things
    plane.visible_shadow = False
    plane.visible_glossy = False
    plane.visible_diffuse = False
    return plane


def make_cap_emitter(z_offset, name, top=True):
    """Soft white emissive sphere inside the glass hemisphere. Light shines outward
    through the faceted glass so the cap reads as glowing — like the device is on,
    UV-C lamps illuminated. Cool white tone (not saturated blue) so it reads as
    "device powered" rather than "UV mode" specifically."""
    # Small emitter core inside the cap. Hidden from camera rays so it doesn't
    # show up as a visible sphere through the glass — its light still propagates,
    # scatters through the volume in the cap material, and creates the glow.
    inset = CAP_RADIUS * 0.30
    emit_z = z_offset + (inset if top else -inset)
    bpy.ops.mesh.primitive_ico_sphere_add(
        subdivisions=3,
        radius=CAP_RADIUS * 0.35,
        location=(0, 0, emit_z),
    )
    obj = bpy.context.active_object
    obj.name = f"Emitter_{name}"
    bpy.ops.object.shade_smooth()

    mat = bpy.data.materials.new(f"EmitterMat_{name}")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    for node in list(nodes):
        if node.type != 'OUTPUT_MATERIAL':
            nodes.remove(node)
    output = nodes['Material Output']
    emission = nodes.new(type='ShaderNodeEmission')
    emission.inputs["Color"].default_value = (0.94, 0.96, 1.0, 1.0)
    emission.inputs["Strength"].default_value = 12.0
    links.new(emission.outputs["Emission"], output.inputs["Surface"])
    obj.data.materials.append(mat)

    # Hide from camera and glossy rays. Light still emits and scatters through
    # the cap's volume material, but the sphere geometry isn't seen directly.
    obj.visible_camera = False
    obj.visible_glossy = False
    return obj


def make_wordmark():
    """FORTH wordmark, sitting flush against the cylinder surface like printed
    branding. Thin extrusion + close-to-surface placement reads as a real
    silkscreen/laser-marked wordmark rather than floating geometry."""
    cam_angle = math.radians(14)
    surface_offset = BODY_RADIUS + 0.0015
    pos_x = -surface_offset * math.sin(cam_angle)
    pos_y = -surface_offset * math.cos(cam_angle)
    bpy.ops.object.text_add(location=(pos_x, pos_y, 0))
    obj = bpy.context.active_object
    obj.name = "Wordmark"
    obj.data.body = "FORTH"
    obj.data.size = 0.28
    # Very thin extrude — like the depth of printed ink rather than raised metal.
    obj.data.extrude = 0.002
    obj.data.align_x = 'CENTER'
    obj.data.align_y = 'CENTER'
    obj.rotation_euler = (math.pi / 2, 0, -cam_angle)
    obj.data.space_character = 1.8

    # Convert to mesh so the Bevel modifier can soften the edges
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.convert(target='MESH')

    # Smaller bevel — just enough to soften the harsh corners of laser/screen-printed
    # text. Avoids the chunky raised-metal look.
    bevel = obj.modifiers.new(name="Bevel", type='BEVEL')
    bevel.width = 0.0008
    bevel.segments = 2
    bevel.limit_method = 'ANGLE'

    # Don't cast shadows onto the body. A flat text plane sits at varying distances
    # from the curved cylinder (R sits closest, F/H/O float further) — if we let
    # the text cast shadows, those gaps show up as drop shadows and make the
    # letters look like they're peeling off the surface. Self-shadowing via the
    # bevel still gives each letter the embossed gradient.
    obj.visible_shadow = False

    mat = bpy.data.materials.new("WordmarkMat")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    # Slightly muted off-white with higher roughness — looks like real silkscreen
    # ink absorbing some light, not glossy plastic floating above the surface.
    bsdf.inputs["Base Color"].default_value = (0.78, 0.79, 0.80, 1.0)
    set_principled(bsdf, Roughness=0.65, Metallic=0.0)
    obj.data.materials.append(mat)
    return obj


def make_button():
    """Recessed charging port: a pill-shaped cavity Boolean-cut into the body,
    with three brass contacts inside the recess. The Boolean is APPLIED (baked
    into the body mesh) so there are no runtime modifier artifacts."""
    pill_z = 0.0  # match wordmark height (centered on body)

    # Cutter pill — beveled cube with X and Z dimensions equal so the bevel
    # rounds the cavity into a clean capsule shape (the depth of the recess
    # matches the height, giving symmetric rounding).
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(BODY_RADIUS - 0.04, 0, pill_z))
    cutter = bpy.context.active_object
    cutter.name = "PortCutter"
    cutter.scale = (0.18, 0.42, 0.18)
    bpy.ops.object.transform_apply(scale=True)
    bev = cutter.modifiers.new(name="CutterBevel", type='BEVEL')
    bev.width = 0.085
    bev.segments = 10
    bpy.ops.object.modifier_apply(modifier="CutterBevel")

    # Apply Boolean DIFFERENCE on the body, then bake the modifier so the cut
    # becomes part of the body mesh and rotates cleanly with the device.
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
        # Re-shade smooth — the Boolean's new vertices may have lost smoothing
        bpy.ops.object.shade_smooth()
        # Merge by distance to clean up duplicate vertices the Boolean creates
        # (these duplicates are what produce visible seam lines on the surface)
        bpy.ops.object.mode_set(mode='EDIT')
        bpy.ops.mesh.select_all(action='SELECT')
        bpy.ops.mesh.remove_doubles(threshold=0.0001)
        bpy.ops.object.mode_set(mode='OBJECT')

    # Cutter is no longer needed — delete it
    bpy.ops.object.select_all(action='DESELECT')
    cutter.select_set(True)
    bpy.context.view_layer.objects.active = cutter
    bpy.ops.object.delete()

    # Brass charging contacts — three small pads in a horizontal row, inside the
    # recess. Position them at depth where the cavity floor is.
    contact_mat = bpy.data.materials.new("ContactMat")
    contact_mat.use_nodes = True
    contact_bsdf = contact_mat.node_tree.nodes["Principled BSDF"]
    contact_bsdf.inputs["Base Color"].default_value = (0.85, 0.55, 0.18, 1.0)
    set_principled(contact_bsdf, Metallic=1.0, Roughness=0.32)

    # Contacts scaled to fit the smaller oval recess
    for dy in (-0.11, 0.0, 0.11):
        bpy.ops.mesh.primitive_cylinder_add(
            radius=0.022,
            depth=0.012,
            vertices=24,
            location=(BODY_RADIUS - 0.07, dy, pill_z),  # inside the shallower recess
            rotation=(0, math.radians(90), 0),
        )
        contact = bpy.context.active_object
        contact.name = f"Contact_{dy}"
        contact.data.materials.append(contact_mat)

    return body


def make_softbox(name, location, rot_euler, scale_yz, color, strength):
    """Tall vertical emissive plane to create a defined specular highlight stripe on
    the cylindrical body. Hidden from camera so it doesn't appear in the background;
    only contributes to lighting and reflections (the 'softbox' product-photo look)."""
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
    output = nodes['Material Output']
    emission = nodes.new(type='ShaderNodeEmission')
    emission.inputs["Color"].default_value = (*color, 1.0)
    emission.inputs["Strength"].default_value = strength
    links.new(emission.outputs["Emission"], output.inputs["Surface"])
    plane.data.materials.append(mat)

    # Visible to reflections/diffuse but not to the camera ray itself
    plane.visible_camera = False
    plane.visible_shadow = False
    return plane


def make_lighting():
    # HDRI provides the main studio lighting. Just one supplementary key softbox
    # to ensure a punchy highlight on the body's left edge, since the HDRI's
    # default brightest light may not land exactly there from the camera POV.
    make_softbox(
        name="KeyBox",
        location=(-5.0, -4.5, 3.0),
        rot_euler=(math.radians(-22), math.radians(82), 0),
        scale_yz=(4.0, 8.0),
        color=(1.0, 0.97, 0.93),
        strength=35,
    )

    # Subtle frontal fill so the wordmark area doesn't fall into shadow.
    make_softbox(
        name="FrontFill",
        location=(0.0, -9.0, -0.5),
        rot_euler=(math.radians(90), 0, 0),
        scale_yz=(10.0, 12.0),
        color=(0.96, 0.97, 1.0),
        strength=6,
    )


def make_shadow_catcher():
    """Invisible ground plane that catches a soft contact shadow under the device.
    With transparent film, the shadow shows up as partial alpha — when composited on
    the page's bg color, it reads as a real grounded shadow."""
    bpy.ops.mesh.primitive_plane_add(
        size=40,
        location=(0, 0, -(BODY_LENGTH / 2 + CAP_RADIUS + 0.02)),
    )
    plane = bpy.context.active_object
    plane.name = "ShadowCatcher"
    plane.is_shadow_catcher = True
    plane.visible_glossy = False  # don't reflect into the body
    return plane


def make_camera():
    # 3/4 angle so the geodesic facets read as 3D rather than flat. Camera orbits
    # around the device, then aims at origin via a track-to constraint.
    angle = math.radians(14)
    distance = 26.0  # closer than 36 so device fills more frame, but not cropped
    cam_x = -distance * math.sin(angle)
    cam_y = -distance * math.cos(angle)
    bpy.ops.object.camera_add(location=(cam_x, cam_y, 0))
    cam = bpy.context.active_object
    # Aim at world origin: yaw to face origin from this orbit position, then pitch up.
    cam.rotation_euler = (math.radians(90), 0, math.radians(-90) + angle + math.radians(90))
    # Simpler: use a track-to constraint to look at origin.
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
    scene.render.engine = 'CYCLES'
    scene.cycles.samples = SAMPLES
    scene.cycles.use_denoising = True
    # Disable caustics — they produce bright triangular hotspots on the cap facets
    # (light focused through glass refraction) which read as rendering glitches.
    scene.cycles.caustics_reflective = False
    scene.cycles.caustics_refractive = False
    scene.render.resolution_x = RES_X
    scene.render.resolution_y = RES_Y
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    scene.render.image_settings.compression = 15
    scene.view_settings.view_transform = 'Filmic'
    scene.view_settings.look = 'High Contrast'

    # Real studio HDRI. Provides physically-based environment lighting — the body
    # picks up the softbox positions as cylindrical highlights, the glass caps
    # refract to the studio environment (so they look properly transparent), and
    # everything reads as photographed in a real product studio.
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

    # Slight rotation so the brightest softbox lands at upper-left from the camera's
    # POV (rather than wherever the HDRI's default orientation puts it).
    mapping = nodes.new('ShaderNodeMapping')
    mapping.inputs["Rotation"].default_value[2] = math.radians(120)
    tex_coord = nodes.new('ShaderNodeTexCoord')
    links.new(tex_coord.outputs["Generated"], mapping.inputs["Vector"])
    links.new(mapping.outputs["Vector"], env_tex.inputs["Vector"])

    bg = nodes.new('ShaderNodeBackground')
    bg.inputs["Strength"].default_value = 1.0
    links.new(env_tex.outputs["Color"], bg.inputs["Color"])
    links.new(bg.outputs["Background"], output.inputs["Surface"])

    # Compositor Glare/Fog Glow — bright pixels (the emissive caps) cast a soft
    # halo around them, creating the visible "light extending outward" look.
    # Blender 5.x stores this as a separate node-group datablock with a node-group
    # output (not a Composite output node).
    try:
        comp_tree = bpy.data.node_groups.new(name="CompositorTree", type='CompositorNodeTree')
        if hasattr(scene, "compositing_node_group"):
            scene.compositing_node_group = comp_tree
        # Define an Image output socket on the tree's interface
        if hasattr(comp_tree, "interface"):
            comp_tree.interface.new_socket(name="Image", in_out='OUTPUT', socket_type='NodeSocketColor')
        cnodes = comp_tree.nodes
        clinks = comp_tree.links
        rl = cnodes.new('CompositorNodeRLayers')
        glare = cnodes.new('CompositorNodeGlare')
        # Blender 5.x renamed glare_type → some other attribute. Set tolerantly.
        for attr_name, value in [
            ('glare_type', 'FOG_GLOW'),
            ('mode', 'FOG_GLOW'),
            ('quality', 'HIGH'),
            ('size', 5),
            ('threshold', 1.0),
            ('mix', -0.4),  # blend less aggressively with original
            ('bloom_size', 5),
        ]:
            try:
                setattr(glare, attr_name, value)
            except (TypeError, AttributeError):
                pass
        # Apply Glare to color, but preserve the original render's alpha so the
        # background stays transparent for compositing on the page bg. This means
        # the halo is clipped at the device silhouette — but the bright glow
        # within the cap area will still bleed onto the body and read clearly.
        set_alpha = cnodes.new('CompositorNodeSetAlpha')
        out = cnodes.new('NodeGroupOutput')
        clinks.new(rl.outputs['Image'], glare.inputs['Image'])
        clinks.new(glare.outputs['Image'], set_alpha.inputs['Image'])
        clinks.new(rl.outputs['Alpha'], set_alpha.inputs['Alpha'])
        clinks.new(set_alpha.outputs['Image'], out.inputs[0])
    except Exception as e:
        print(f"[render-device] Compositor setup skipped: {e}")


def main():
    os.makedirs(OUT_DIR, exist_ok=True)

    # First: render the FORTH wordmark to a small PNG that the body material
    # uses as a texture. Wordmark is now baked into the body surface, not
    # floating geometry.
    if not os.path.exists(WORDMARK_TEX_PATH):
        render_wordmark_texture()

    reset_scene()
    body = make_body()
    make_cap(BODY_LENGTH / 2, "TopCap", top=True)
    make_cap(-BODY_LENGTH / 2, "BotCap", top=False)
    make_button()
    make_lighting()
    make_camera()
    configure_render()

    # Group all device meshes under a single empty so we can rotate them as one
    # unit for the scroll-driven turnaround animation. Camera, lights, and
    # softbox emissive planes stay in world space (don't rotate with device).
    bpy.ops.object.empty_add(location=(0, 0, 0))
    device_root = bpy.context.active_object
    device_root.name = "DeviceRoot"

    NON_DEVICE = {
        "DeviceRoot", "CamTarget",
        # Softbox emissive planes (lighting, not part of the device)
        "KeyBox", "FrontFill", "RimBox", "TopBox", "BackBox", "BottomBox",
    }
    for obj in list(bpy.data.objects):
        if obj.name in NON_DEVICE:
            continue
        if obj.type in ('CAMERA', 'LIGHT', 'EMPTY'):
            continue
        if obj.name.startswith("Halo_") or obj.name.startswith("Softbox"):
            continue
        obj.parent = device_root

    # Render rotation sequence: 0° → -90° (clockwise viewed from above), revealing
    # the charging port that was on the +X side. Frames are evenly spaced.
    NUM_FRAMES = 104
    for i in range(NUM_FRAMES):
        progress = i / (NUM_FRAMES - 1)
        angle_deg = -progress * 90.0
        device_root.rotation_euler = (0, 0, math.radians(angle_deg))

        frame_path = os.path.join(OUT_DIR, f"forth-device-frame-{i:02d}.png")
        bpy.context.scene.render.filepath = frame_path
        bpy.ops.render.render(write_still=True)
        print(f"[render-device] wrote {frame_path}")

    # Mirror frame 0 to the canonical hero filename so any code referencing the
    # original path keeps working.
    import shutil
    shutil.copy(
        os.path.join(OUT_DIR, "forth-device-frame-00.png"),
        PNG_PATH,
    )
    print(f"[render-device] copied frame 0 to {PNG_PATH}")

    # Reset rotation before GLB export so the model exports in its rest pose.
    device_root.rotation_euler = (0, 0, 0)

    # Export GLB (for browser-side rotation later)
    for obj in bpy.context.scene.objects:
        obj.select_set(obj.type == 'MESH' or obj.type == 'FONT')
    bpy.ops.export_scene.gltf(
        filepath=GLB_PATH,
        export_format='GLB',
        use_selection=True,
        export_apply=True,
    )
    print(f"[render-device] wrote {GLB_PATH}")


if __name__ == "__main__":
    main()
