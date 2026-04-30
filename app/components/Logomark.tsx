// Small geodesic mark used as the brand symbol next to the wordmark.

export function Logomark({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <g fill="none" stroke={color} strokeWidth="1.4">
        <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" />
        <line x1="20" y1="4" x2="20" y2="36" />
        <line x1="6" y1="12" x2="34" y2="28" />
        <line x1="34" y1="12" x2="6" y2="28" />
      </g>
    </svg>
  );
}
