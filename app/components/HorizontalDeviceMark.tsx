// Concept 4 — a flat, horizontal silhouette of the device with the wordmark
// set inside the cylindrical body. Reads as a logo at small sizes by virtue
// of the strong horizontal form; reads as a product cue at large sizes.

export function HorizontalDeviceMark({
  name,
  color = "currentColor",
  fontFamily = "ui-sans-serif, system-ui, sans-serif",
  fontWeight = 600,
  letterSpacing = 0,
  className,
  domeStyle = "geodesic",
}: {
  name: string;
  color?: string;
  fontFamily?: string;
  fontWeight?: number;
  letterSpacing?: number;
  className?: string;
  domeStyle?: "geodesic" | "plain";
}) {
  // Capsule layout: total 200×52 viewbox, dome radius 26, body 148×52.
  const W = 200;
  const H = 52;
  const r = H / 2;
  const stroke = 1.6;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-label={name}>
      {/* Outer capsule outline (single stroke makes the whole shape feel like one form) */}
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

      {/* Dome facets — left */}
      {domeStyle === "geodesic" && (
        <g stroke={color} strokeWidth="1" strokeOpacity="0.7" fill="none">
          {/* Inner hexagonal facet on left dome */}
          <polygon points={`6,${r} 14,${r - 12} 26,${r - 14} 38,${r - 12} 38,${r + 12} 26,${r + 14} 14,${r + 12}`} />
          <line x1={6} y1={r} x2={38} y2={r - 12} />
          <line x1={6} y1={r} x2={38} y2={r + 12} />
          {/* Inner hexagonal facet on right dome */}
          <polygon points={`${W - 6},${r} ${W - 14},${r - 12} ${W - 26},${r - 14} ${W - 38},${r - 12} ${W - 38},${r + 12} ${W - 26},${r + 14} ${W - 14},${r + 12}`} />
          <line x1={W - 6} y1={r} x2={W - 38} y2={r - 12} />
          <line x1={W - 6} y1={r} x2={W - 38} y2={r + 12} />
        </g>
      )}

      {/* Dome seam markers (where the body meets the dome) */}
      <line x1={H} y1={6} x2={H} y2={H - 6} stroke={color} strokeOpacity="0.35" strokeWidth="1" />
      <line x1={W - H} y1={6} x2={W - H} y2={H - 6} stroke={color} strokeOpacity="0.35" strokeWidth="1" />

      {/* Wordmark inside the body */}
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
