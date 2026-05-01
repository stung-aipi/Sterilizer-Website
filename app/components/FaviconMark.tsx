// Favicon set — six dome / crystalline marks, all in the same 40×40 viewBox
// at the same line weight. Each is a different ANGLE on the same form: the
// device's geodesic dome, viewed from above, from the side, in cross-section,
// or as a silhouette holding the brand initial.

export type FaviconVariant =
  | "geodesic"   // hexagon with 3 long diagonals (dome viewed top-down)
  | "pentagon"   // pentagon with spokes (the dome's apex pentagon)
  | "facet"      // diamond / cut gem (crystalline cousin of the dome)
  | "rings"      // half-dome silhouette with concentric latitude arcs
  | "burst"      // radial spokes from a center point (apex of dome)
  | "monogram";  // brand initial inside a half-dome silhouette

export const FAVICON_VARIANTS: { id: FaviconVariant; label: string; sub: string }[] = [
  { id: "geodesic", label: "Geodesic", sub: "Hexagon with crossed diagonals." },
  { id: "pentagon", label: "Pentagon", sub: "The dome's apex facet." },
  { id: "facet", label: "Facet", sub: "Cut-gem diamond, crystalline." },
  { id: "rings", label: "Rings", sub: "Side-view dome with latitude arcs." },
  { id: "burst", label: "Burst", sub: "Radial spokes — dome from above." },
  { id: "monogram", label: "Monogram", sub: "Brand initial inside the dome." },
];

export function FaviconMark({
  variant,
  letter = "F",
  color = "currentColor",
  className,
}: {
  variant: FaviconVariant;
  letter?: string;
  color?: string;
  className?: string;
}) {
  const sw = 1.6; // shared stroke width for all variants

  const inner = (() => {
    switch (variant) {
      case "geodesic":
        return (
          <g stroke={color} strokeWidth={sw} fill="none">
            <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" />
            <line x1="20" y1="4" x2="20" y2="36" />
            <line x1="6" y1="12" x2="34" y2="28" />
            <line x1="34" y1="12" x2="6" y2="28" />
          </g>
        );

      case "pentagon":
        // Regular pentagon, apex up, with spokes from center to each vertex.
        return (
          <g stroke={color} strokeWidth={sw} fill="none">
            <polygon points="20,5 35,16 29,33 11,33 5,16" />
            <line x1="20" y1="20" x2="20" y2="5" />
            <line x1="20" y1="20" x2="35" y2="16" />
            <line x1="20" y1="20" x2="29" y2="33" />
            <line x1="20" y1="20" x2="11" y2="33" />
            <line x1="20" y1="20" x2="5" y2="16" />
          </g>
        );

      case "facet":
        // Octagonal / diamond cut. Outer rhombus + inner cut planes.
        return (
          <g stroke={color} strokeWidth={sw} fill="none">
            <polygon points="20,4 33,14 33,26 20,36 7,26 7,14" />
            <polyline points="7,14 20,18 33,14" />
            <polyline points="7,26 20,22 33,26" />
            <line x1="20" y1="4" x2="20" y2="18" />
            <line x1="20" y1="22" x2="20" y2="36" />
          </g>
        );

      case "rings":
        // Side-view half-dome (D-shape with flat right edge), with two
        // concentric latitude arcs inside.
        return (
          <g stroke={color} strokeWidth={sw} fill="none">
            <path d="M 30 6 A 16 14 0 0 0 30 34" />
            <line x1="30" y1="6" x2="30" y2="34" />
            <path d="M 30 12 A 11 9 0 0 0 30 28" />
            <path d="M 30 17 A 6 4 0 0 0 30 23" />
          </g>
        );

      case "burst":
        // Apex viewed from above — a radial sunburst inside a hexagon.
        return (
          <g stroke={color} strokeWidth={sw} fill="none">
            <polygon points="20,5 33,12 33,28 20,35 7,28 7,12" />
            <line x1="20" y1="20" x2="20" y2="5" />
            <line x1="20" y1="20" x2="33" y2="12" />
            <line x1="20" y1="20" x2="33" y2="28" />
            <line x1="20" y1="20" x2="20" y2="35" />
            <line x1="20" y1="20" x2="7" y2="28" />
            <line x1="20" y1="20" x2="7" y2="12" />
            <circle cx="20" cy="20" r="1.6" fill={color} stroke="none" />
          </g>
        );

      case "monogram":
        // Brand initial inside a half-dome silhouette, flat side at the
        // bottom — so it reads as "letter sitting under a dome."
        return (
          <g>
            <path
              d="M 5 32 A 15 15 0 0 1 35 32 Z"
              fill="none"
              stroke={color}
              strokeWidth={sw}
              strokeLinejoin="round"
            />
            <text
              x="20"
              y="29"
              textAnchor="middle"
              fontFamily="var(--font-grotesk), Inter, sans-serif"
              fontSize="16"
              fontWeight="700"
              fill={color}
            >
              {(letter || "").slice(0, 1).toUpperCase()}
            </text>
          </g>
        );
    }
  })();

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      {inner}
    </svg>
  );
}
