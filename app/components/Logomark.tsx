// Geodesic dome viewed top-down. Outer hexagon is the base ring; a triangulated
// band converges to the inner hexagon, whose six spokes meet at the apex point —
// the same dome shape rendered in side view by GeodesicDome (in ExplodedReveal).

export function Logomark({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <g fill="none" stroke={color} strokeLinejoin="round" strokeLinecap="round">
        {/* Base ring */}
        <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" strokeWidth="1.4" />
        {/* Triangulated band: each outer vertex to its two nearest inner vertices */}
        <g strokeWidth="0.9">
          <line x1="20" y1="4" x2="16.5" y2="14" />
          <line x1="20" y1="4" x2="23.5" y2="14" />
          <line x1="34" y1="12" x2="23.5" y2="14" />
          <line x1="34" y1="12" x2="27" y2="20" />
          <line x1="34" y1="28" x2="27" y2="20" />
          <line x1="34" y1="28" x2="23.5" y2="26" />
          <line x1="20" y1="36" x2="23.5" y2="26" />
          <line x1="20" y1="36" x2="16.5" y2="26" />
          <line x1="6" y1="28" x2="16.5" y2="26" />
          <line x1="6" y1="28" x2="13" y2="20" />
          <line x1="6" y1="12" x2="13" y2="20" />
          <line x1="6" y1="12" x2="16.5" y2="14" />
        </g>
        {/* Inner ring (rotated 30° relative to outer for the geodesic offset) */}
        <polygon points="23.5,14 27,20 23.5,26 16.5,26 13,20 16.5,14" strokeWidth="1.1" />
        {/* Spokes to apex */}
        <g strokeWidth="0.9">
          <line x1="23.5" y1="14" x2="20" y2="20" />
          <line x1="27" y1="20" x2="20" y2="20" />
          <line x1="23.5" y1="26" x2="20" y2="20" />
          <line x1="16.5" y1="26" x2="20" y2="20" />
          <line x1="13" y1="20" x2="20" y2="20" />
          <line x1="16.5" y1="14" x2="20" y2="20" />
        </g>
        {/* Apex */}
        <circle cx="20" cy="20" r="0.9" fill={color} stroke="none" />
      </g>
    </svg>
  );
}
