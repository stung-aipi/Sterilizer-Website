// Device illustration. Rendered as inline SVG so it scales crisply,
// stays themable per variant via currentColor / explicit props,
// and works as a placeholder until real product photography lands.

import { BRAND } from "../lib/brand";

type Props = {
  className?: string;
  body?: string;       // body color
  dome?: string;       // dome facet color
  glow?: string;       // soft glow color
  ink?: string;        // outline ink
  glowOn?: boolean;    // pulse glow
  wordmark?: string;   // text etched on the body
};

export function DeviceVisual({
  className,
  body = "#222831",
  dome = "#9DB7C6",
  glow = "#7FB3FF",
  ink = "#0F1B2D",
  glowOn = false,
  wordmark = BRAND.toUpperCase(),
}: Props) {
  return (
    <svg viewBox="0 0 280 600" className={className} aria-hidden>
      <defs>
        {/* Cylinder shading — pure black ramp with alpha so the body itself
            stays fully opaque (no background bleeding through). */}
        <linearGradient id="bodyShade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.22" />
          <stop offset="50%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
        <radialGradient id="domeGrad" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0%" stopColor={dome} stopOpacity="1" />
          <stop offset="60%" stopColor={dome} stopOpacity="0.8" />
          <stop offset="100%" stopColor={dome} stopOpacity="0.4" />
        </radialGradient>
        <radialGradient id="glowGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={glow} stopOpacity="0.85" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft halo */}
      {glowOn && (
        <g className="animate-glow" style={{ transformOrigin: "center" }}>
          <circle cx="140" cy="80" r="120" fill="url(#glowGrad)" />
          <circle cx="140" cy="520" r="120" fill="url(#glowGrad)" />
        </g>
      )}

      {/* Both domes are painted first so the body rect covers their lower /
          upper halves respectively — the visible portion sticks out the ends
          of the cylinder, the rest reads as hidden behind the casing. */}

      {/* Top dome */}
      <g>
        <circle cx="140" cy="80" r="68" fill="url(#domeGrad)" stroke={ink} strokeOpacity="0.35" />
        <g stroke={ink} strokeOpacity="0.55" fill="none" strokeWidth="1">
          <polygon points="140,12 200,46 200,114 140,148 80,114 80,46" />
          <line x1="140" y1="12" x2="140" y2="148" />
          <line x1="80" y1="46" x2="200" y2="114" />
          <line x1="200" y1="46" x2="80" y2="114" />
          <polygon points="110,30 170,30 200,80 170,130 110,130 80,80" />
        </g>
      </g>

      {/* Bottom dome */}
      <g>
        <circle cx="140" cy="520" r="68" fill="url(#domeGrad)" stroke={ink} strokeOpacity="0.35" />
        <g stroke={ink} strokeOpacity="0.55" fill="none" strokeWidth="1">
          <polygon points="140,452 200,486 200,554 140,588 80,554 80,486" />
          <line x1="140" y1="452" x2="140" y2="588" />
          <line x1="80" y1="486" x2="200" y2="554" />
          <line x1="200" y1="486" x2="80" y2="554" />
          <polygon points="110,470 170,470 200,520 170,570 110,570 80,520" />
        </g>
      </g>

      {/* Body — drawn over both domes, so each dome only shows the half that
          sticks past the cylinder's end. Solid fill, then a shading overlay. */}
      <rect x="68" y="80" width="144" height="440" rx="20" fill={body} stroke={ink} strokeOpacity="0.35" />
      <rect x="68" y="80" width="144" height="440" rx="20" fill="url(#bodyShade)" />
      <line x1="68" y1="100" x2="212" y2="100" stroke={ink} strokeOpacity="0.25" />
      <line x1="68" y1="500" x2="212" y2="500" stroke={ink} strokeOpacity="0.25" />

      {/* Wordmark — uses the dome color so it always contrasts the dark body
          (the body is always dark across all variants). */}
      <text
        x="140"
        y="312"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="14"
        letterSpacing="7"
        fontWeight="500"
        fill={dome}
        fillOpacity="0.92"
      >
        {wordmark.toUpperCase()}
      </text>
    </svg>
  );
}
