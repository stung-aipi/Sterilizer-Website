// Concept 3 monogram: a vertical pill that echoes the device's slim cylindrical
// silhouette, with the chosen letter inside. Designed to read at app-icon size.

export function CylinderMono({
  letter,
  color = "currentColor",
  className,
}: {
  letter: string;
  color?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 36" className={className} aria-hidden>
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="31"
        rx="9.5"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
      />
      <text
        x="12"
        y="22.5"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="14"
        fontWeight="600"
        fill={color}
      >
        {(letter || "").slice(0, 1).toUpperCase()}
      </text>
    </svg>
  );
}
