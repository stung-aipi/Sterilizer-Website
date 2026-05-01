// Vertical capsule rendering of the device, matching the geodesic-faceted look
// used in the scroll-driven exploded view. Drop-in replacement for DeviceVisual
// (same prop shape) so the body / dome / ink / glow color scheme is preserved
// at every site where it's used.

import { BRAND } from "../lib/brand";

type Props = {
  className?: string;
  body?: string;       // cylinder body fill
  dome?: string;       // dome / end-cap fill
  ink?: string;        // outline color
  glow?: string;       // ambient halo color (used when glowOn)
  glowOn?: boolean;
  wordmark?: string;
};

// Geodesic dome — flat-based polygonal hemisphere. Local origin sits at the dome's
// flat side; tip points to negative x. Mirror via scale(-1, 1) for the opposite end.
function GeodesicDome({ flip = false, fill, ink }: { flip?: boolean; fill: string; ink: string }) {
  return (
    <g transform={flip ? "scale(-1, 1)" : undefined}>
      <path
        d="M 0 -52 L -22 -47 L -38 -32 L -46 -12 L -46 12 L -38 32 L -22 47 L 0 52 Z"
        fill={fill}
        stroke={ink}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <g fill="none" stroke={ink} strokeWidth="0.8" opacity="0.7">
        <line x1="0" y1="-52" x2="-15" y2="-28" />
        <line x1="0" y1="-52" x2="0" y2="-22" />
        <line x1="0" y1="52" x2="-15" y2="28" />
        <line x1="0" y1="52" x2="0" y2="22" />
        <line x1="-22" y1="-47" x2="-15" y2="-28" />
        <line x1="-38" y1="-32" x2="-15" y2="-28" />
        <line x1="-38" y1="-32" x2="-30" y2="-12" />
        <line x1="-46" y1="-12" x2="-30" y2="-12" />
        <line x1="-46" y1="12" x2="-30" y2="12" />
        <line x1="-38" y1="32" x2="-30" y2="12" />
        <line x1="-38" y1="32" x2="-15" y2="28" />
        <line x1="-22" y1="47" x2="-15" y2="28" />
        <line x1="-15" y1="-28" x2="0" y2="-22" />
        <line x1="-15" y1="-28" x2="-30" y2="-12" />
        <line x1="0" y1="-22" x2="-30" y2="-12" />
        <line x1="-30" y1="-12" x2="-30" y2="12" />
        <line x1="0" y1="-22" x2="0" y2="22" />
        <line x1="-30" y1="-12" x2="0" y2="22" />
        <line x1="-30" y1="12" x2="0" y2="22" />
        <line x1="-30" y1="12" x2="-15" y2="28" />
        <line x1="0" y1="22" x2="-15" y2="28" />
      </g>
    </g>
  );
}

function ChargingPort({ fill, ink }: { fill: string; ink: string }) {
  return (
    <g>
      <rect x="-12" y="-3" width="24" height="6" fill={fill} stroke={ink} strokeWidth="1.0" rx="1.2" />
      <circle cx="-6.5" cy="0" r="1.4" fill="none" stroke={ink} strokeWidth="0.7" />
      <circle cx="0" cy="0" r="1.4" fill="none" stroke={ink} strokeWidth="0.7" />
      <circle cx="6.5" cy="0" r="1.4" fill="none" stroke={ink} strokeWidth="0.7" />
    </g>
  );
}

export function DeviceCylinder({
  className,
  body = "#FAF8F2",
  dome,
  ink = "#0F1B2D",
  glow,
  glowOn = false,
  wordmark = BRAND.toUpperCase(),
}: Props) {
  // Dome defaults to the body color if no separate dome color is provided.
  const domeFill = dome ?? body;

  return (
    <svg
      viewBox="-70 -240 140 480"
      className={className}
      style={{ overflow: "visible" }}
      aria-hidden
    >
      <defs>
        <radialGradient id="dc-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={glow ?? domeFill} stopOpacity="0.55" />
          <stop offset="55%" stopColor={glow ?? domeFill} stopOpacity="0.18" />
          <stop offset="100%" stopColor={glow ?? domeFill} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft halo at each dome — overflow:visible on the SVG lets the glow
          fade past the SVG's bounding box instead of clipping at a hard edge. */}
      {glowOn && (
        <g className="animate-glow" style={{ transformOrigin: "center" }}>
          <circle cx="0" cy="-220" r="200" fill="url(#dc-glow)" />
          <circle cx="0" cy="220" r="200" fill="url(#dc-glow)" />
        </g>
      )}

      {/* Cylinder rendered horizontal then rotated 90° clockwise → vertical capsule.
          rotate(90) maps original (-x) to top (-y) and original (+x) to bottom (+y). */}
      <g transform="rotate(90)">
        {/* Housing (single piece) — body fill, no end-ellipse stroke (dome covers them) */}
        <rect x="-160" y="-52" width="320" height="104" fill={body} stroke={ink} strokeWidth="1.4" />
        <ellipse cx="-160" cy="0" rx="6" ry="52" fill={body} stroke="none" />
        <ellipse cx="160" cy="0" rx="6" ry="52" fill={body} stroke="none" />

        {/* Cylinder curvature highlights */}
        <line x1="-160" y1="-44" x2="160" y2="-44" stroke={ink} strokeWidth="0.5" opacity="0.25" />
        <line x1="-160" y1="44" x2="160" y2="44" stroke={ink} strokeWidth="0.5" opacity="0.25" />

        {/* Charging-port hole — lower arc only, at the housing top edge (centered) */}
        <path
          d="M -13 -52 A 13 3.5 0 0 0 13 -52"
          fill="none"
          stroke={ink}
          strokeWidth="0.85"
        />

        {/* Top dome (left in horizontal pre-rotation coords) */}
        <g transform="translate(-160 0)">
          <GeodesicDome fill={domeFill} ink={ink} />
        </g>
        {/* Bottom dome (right in horizontal pre-rotation coords) */}
        <g transform="translate(160 0)">
          <GeodesicDome flip fill={domeFill} ink={ink} />
        </g>

        {/* Charging port — sits in its hole on the cylinder top */}
        <g transform="translate(0 -50)">
          <ChargingPort fill={body} ink={ink} />
        </g>
      </g>

      {/* Wordmark — drawn outside the rotation so it reads horizontally,
          centered on the body. Uses dome color so it always contrasts the body. */}
      <text
        x="0"
        y="6"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="11"
        letterSpacing="6"
        fontWeight="500"
        fill={domeFill}
        fillOpacity="0.92"
      >
        {wordmark.toUpperCase()}
      </text>
    </svg>
  );
}
