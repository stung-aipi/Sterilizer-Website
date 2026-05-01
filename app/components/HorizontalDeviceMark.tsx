// Concept 4 — the locked logo, in seven variants. The first four share the
// horizontal-device structure (capsule + body + wordmark in middle) and only
// vary how the dome surface is described. The last three are bookends-family
// layouts: a horizontal pair of dome shapes flanking a dominant wordmark, with
// no connecting body.
//
// All variants render into the same 200×52 viewBox so they scale together
// in headers, thumbnails, and previews.

export type LogoVariant =
  | "wireframe"   // standard — curved longitudes + three latitude rings
  | "faceted"     // straight-line spokes (angular, gem-cut)
  | "dense"       // denser wireframe (engineering-drawing density)
  | "openFrame"   // body's top/bottom removed — wordmark floats between dome arcs
  | "bookends"    // two D-shape domes flanking a large wordmark, no body
  | "blocky"      // half-decagon ends, each fanned into 7 triangles
  | "honed";      // same half-decagon form, internal anchor pulled toward the cut for more uniform triangles

export const LOGO_VARIANTS: { id: LogoVariant; label: string; sub: string }[] = [
  { id: "blocky", label: "Blocky", sub: "Half-decagons subdivided into five polygons — three triangles + two side quads, with a larger back triangle." },
  { id: "bookends", label: "Bookends", sub: "Two D-shape domes flanking a large wordmark — silicon-valley minimal." },
  { id: "honed", label: "Honed", sub: "Same half-decagon, internal anchor pulled toward the cut — five polygons closer in size." },
  { id: "wireframe", label: "Wireframe", sub: "Curved longitudes and three latitude rings — the standard." },
  { id: "faceted", label: "Faceted", sub: "Straight-line spokes — angular, like a cut gem." },
  { id: "dense", label: "Dense", sub: "More meridians and rings — engineering-drawing density." },
  { id: "openFrame", label: "Open Frame", sub: "Top and bottom of the body removed — wordmark floats between dome arcs." },
];

export function HorizontalDeviceMark({
  name,
  variant = "blocky",
  color = "currentColor",
  fontFamily = "var(--font-grotesk), Inter, ui-sans-serif, system-ui, sans-serif",
  fontWeight = 600,
  letterSpacing = 0.5,
  className,
}: {
  name: string;
  variant?: LogoVariant;
  color?: string;
  fontFamily?: string;
  fontWeight?: number;
  letterSpacing?: number;
  className?: string;
}) {
  const W = 200;
  const H = 52;
  const r = H / 2;            // 26
  const stroke = 1.6;
  const silhouetteR = r - stroke / 2;

  const chordHalf = (x: number) =>
    Math.sqrt(silhouetteR * silhouetteR - (r - x) * (r - x));

  const longitudeLeft = (yb: number) => {
    if (yb === r) return `M 0 ${r} L ${r} ${r}`;
    const ry = Math.abs(yb - r);
    const sweep = yb < r ? 1 : 0;
    return `M 0 ${r} A ${r} ${ry} 0 0 ${sweep} ${r} ${yb}`;
  };
  const longitudeRight = (yb: number) => {
    if (yb === r) return `M ${W} ${r} L ${W - r} ${r}`;
    const ry = Math.abs(yb - r);
    const sweep = yb < r ? 0 : 1;
    return `M ${W} ${r} A ${r} ${ry} 0 0 ${sweep} ${W - r} ${yb}`;
  };

  // Common wordmark for the bookends-family variants — larger and tracked
  // wider than the in-body wordmark of the horizontal-device variants.
  const BookendsWordmark = (
    <text
      x={W / 2}
      y={r + 2}
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily={fontFamily}
      fontSize={32}
      fontWeight={fontWeight}
      letterSpacing={letterSpacing * 1.4}
      fill={color}
    >
      {name}
    </text>
  );

  // ----- Variant 5: Bookends — outlined D-shapes -----
  if (variant === "bookends") {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-label={name}>
        <path
          d="M 30 4 A 16 22 0 0 0 30 48 Z"
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinejoin="round"
        />
        <path
          d={`M ${W - 30} 4 A 16 22 0 0 1 ${W - 30} 48 Z`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinejoin="round"
        />
        {BookendsWordmark}
      </svg>
    );
  }

  // ----- Variants Blocky / Honed -----
  // Edge-oriented regular decagon (top edge horizontal), sliced at the Y axis.
  // Each half has 7 boundary vertices (V1..V7: 2 cut points + 5 outer vertices)
  // plus 1 internal anchor. Instead of fanning to all seven (which gives the
  // busy 7-triangle look), the anchor is connected to only V1, V3, V4, V5, V7
  // — five spokes — collapsing two pairs of fan-triangles into quadrilaterals
  // and yielding 5 internal regions: 3 triangles + 2 side quads.
  //
  // For anchor at horizontal distance d from the cut:
  //   • Apex triangles (i-V3-V4, i-V4-V5): area = 6.8 × (R − d)
  //   • Back triangle (i-V7-V1, base = cut): area = 22d
  //   • Side quads (i-V1-V2-V3, i-V5-V6-V7): area = 235.84 − 4.2d
  //
  // Blocky uses d = R/2 ≈ 11.57 — back triangle dominates (255 vs 187 quads
  //   vs 79 apex triangles); a 3.2× spread for the chunky look.
  // Honed uses d = R/4 ≈ 5.78 — quads still biggest (212), but back (127) and
  //   apex (118) land in the same band; spread compresses to 1.8×.
  if (variant === "blocky" || variant === "honed") {
    // Pulled in 5 units from the Bookends position (28) so the domes sit
    // tighter against the wordmark, which is also typeset larger here.
    const cxL = 33;
    const cxR = W - 33;
    const cy = r;

    // Decagon circumradius chosen so the apothem (center-to-flat distance) on
    // the vertical axis equals 22 — keeps the half-decagon's vertical extent
    // identical to the existing Bookends D-shape (y = 4..48).
    const apothemY = 22;
    const R = apothemY / Math.cos(Math.PI / 10); // ≈ 23.13

    const sin18 = Math.sin(Math.PI / 10);
    const sin54 = Math.sin((3 * Math.PI) / 10);
    const cos54 = Math.cos((3 * Math.PI) / 10);

    // LEFT half boundary, going clockwise from top-cut.
    const leftBoundary: [number, number][] = [
      [cxL, cy - apothemY],                  // V1: top cut
      [cxL - R * sin18, cy - apothemY],      // V2: 342°
      [cxL - R * sin54, cy - R * cos54],     // V3: 306°
      [cxL - R, cy],                          // V4: 270° — apex
      [cxL - R * sin54, cy + R * cos54],     // V5: 234°
      [cxL - R * sin18, cy + apothemY],      // V6: 198°
      [cxL, cy + apothemY],                   // V7: bottom cut
    ];
    // Anchor connects to indices [0, 2, 3, 4, 6] — i.e., V1, V3, V4, V5, V7.
    // Skipping V2 and V6 turns the would-be top and bottom fan-triangles
    // into the i-V1-V2-V3 and i-V5-V6-V7 quadrilaterals.
    const spokeIndices = [0, 2, 3, 4, 6];

    const internalOffset = variant === "blocky" ? R / 2 : R / 4;
    const leftInternal: [number, number] = [cxL - internalOffset, cy];

    // RIGHT half is the mirror across the vertical centerline.
    const rightBoundary: [number, number][] = leftBoundary.map(([x, y]) => [W - x, y]);
    const rightInternal: [number, number] = [W - leftInternal[0], leftInternal[1]];

    const polygonPoints = (pts: [number, number][]) => pts.map(([x, y]) => `${x},${y}`).join(" ");

    return (
      <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-label={name}>
        {/* Outlines */}
        <polygon
          points={polygonPoints(leftBoundary)}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinejoin="miter"
        />
        <polygon
          points={polygonPoints(rightBoundary)}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinejoin="miter"
        />

        {/* Interior — five spokes per half, leaving V2 and V6 unconnected so
            the would-be top/bottom fan-triangles merge into side quads. */}
        <g stroke={color} strokeWidth={0.85} strokeOpacity={0.6} fill="none">
          {spokeIndices.map((idx) => {
            const [x, y] = leftBoundary[idx];
            return (
              <line
                key={`bl-${idx}`}
                x1={leftInternal[0]}
                y1={leftInternal[1]}
                x2={x}
                y2={y}
              />
            );
          })}
          {spokeIndices.map((idx) => {
            const [x, y] = rightBoundary[idx];
            return (
              <line
                key={`br-${idx}`}
                x1={rightInternal[0]}
                y1={rightInternal[1]}
                x2={x}
                y2={y}
              />
            );
          })}
        </g>

        {/* Wordmark — larger than the Bookends/Filled variants since the
            domes sit tighter against the name here. */}
        <text
          x={W / 2}
          y={r + 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily={fontFamily}
          fontSize={40}
          fontWeight={fontWeight}
          letterSpacing={letterSpacing * 1.4}
          fill={color}
        >
          {name}
        </text>
      </svg>
    );
  }

  // ----- Variants 1–4: Horizontal-device structure -----
  type HorizConfig = {
    longitudes: number[];
    latitudeAnglesDeg: number[];
    style: "curved" | "straight";
    facetStroke: number;
    facetOpacity: number;
    drawCapsule: boolean;
    drawDomeArcs: boolean;
    drawSeam: boolean;
  };

  const configs: Record<
    "wireframe" | "faceted" | "dense" | "openFrame",
    HorizConfig
  > = {
    wireframe: {
      longitudes: [8, 17, 26, 35, 44],
      latitudeAnglesDeg: [40, 60, 75],
      style: "curved",
      facetStroke: 0.9,
      facetOpacity: 0.72,
      drawCapsule: true,
      drawDomeArcs: false,
      drawSeam: true,
    },
    faceted: {
      longitudes: [8, 17, 26, 35, 44],
      latitudeAnglesDeg: [60],
      style: "straight",
      facetStroke: 0.95,
      facetOpacity: 0.8,
      drawCapsule: true,
      drawDomeArcs: false,
      drawSeam: true,
    },
    dense: {
      longitudes: [5, 11, 17, 22, 26, 30, 35, 41, 47],
      latitudeAnglesDeg: [25, 45, 62, 78],
      style: "curved",
      facetStroke: 0.7,
      facetOpacity: 0.62,
      drawCapsule: true,
      drawDomeArcs: false,
      drawSeam: true,
    },
    openFrame: {
      longitudes: [8, 17, 26, 35, 44],
      latitudeAnglesDeg: [40, 60, 75],
      style: "curved",
      facetStroke: 0.9,
      facetOpacity: 0.72,
      drawCapsule: false,
      drawDomeArcs: true,
      drawSeam: true,
    },
  };

  const config = configs[variant as keyof typeof configs];
  const latitudeXs = config.latitudeAnglesDeg.map(
    (deg) => r * (1 - Math.cos((deg * Math.PI) / 180)),
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-label={name}>
      {config.drawCapsule && (
        <rect
          x={stroke / 2}
          y={stroke / 2}
          width={W - stroke}
          height={H - stroke}
          rx={r - stroke / 2}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
        />
      )}
      {config.drawDomeArcs && (
        <g fill="none" stroke={color} strokeWidth={stroke}>
          <path d={`M ${r} ${stroke / 2} A ${silhouetteR} ${silhouetteR} 0 0 0 ${r} ${H - stroke / 2}`} />
          <path d={`M ${W - r} ${stroke / 2} A ${silhouetteR} ${silhouetteR} 0 0 1 ${W - r} ${H - stroke / 2}`} />
        </g>
      )}

      <g
        stroke={color}
        strokeWidth={config.facetStroke}
        strokeOpacity={config.facetOpacity}
        fill="none"
      >
        {config.longitudes.map((yb) =>
          config.style === "curved" ? (
            <g key={`lon-${yb}`}>
              <path d={longitudeLeft(yb)} />
              <path d={longitudeRight(yb)} />
            </g>
          ) : (
            <g key={`lon-${yb}`}>
              <line x1={0} y1={r} x2={r} y2={yb} />
              <line x1={W} y1={r} x2={W - r} y2={yb} />
            </g>
          ),
        )}
        {latitudeXs.map((cx, i) => {
          const dy = chordHalf(cx);
          return (
            <g key={`lat-${i}`}>
              <line x1={cx} y1={r - dy} x2={cx} y2={r + dy} />
              <line x1={W - cx} y1={r - dy} x2={W - cx} y2={r + dy} />
            </g>
          );
        })}
      </g>

      {config.drawSeam && (
        <g stroke={color} strokeOpacity="0.4" strokeWidth="0.9">
          <line x1={r} y1={2} x2={r} y2={H - 2} />
          <line x1={W - r} y1={2} x2={W - r} y2={H - 2} />
        </g>
      )}

      <text
        x={W / 2}
        y={r + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily={fontFamily}
        fontSize={20}
        fontWeight={fontWeight}
        letterSpacing={letterSpacing}
        fill={color}
      >
        {name}
      </text>
    </svg>
  );
}
