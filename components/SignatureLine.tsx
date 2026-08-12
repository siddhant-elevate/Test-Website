"use client";

/**
 * The Elevate Line — a single rising hairline that is the recurring
 * signature motif of the site: part research chart, part ascent.
 * It draws itself in on first paint and is reused (in smaller, static
 * form) as a section divider throughout the site.
 */
export default function SignatureLine({
  className = "",
  animate = true,
  markerEnd = true,
}: {
  className?: string;
  animate?: boolean;
  markerEnd?: boolean;
}) {
  const path = "M0,86 C120,84 180,70 260,58 C340,46 400,20 520,4";

  return (
    <svg
      viewBox="0 0 520 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength={1000}
        style={
          animate
            ? {
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
                animation: "draw-line 2.2s cubic-bezier(0.65,0,0.35,1) 0.15s forwards",
              }
            : undefined
        }
      />
      {markerEnd && (
        <circle
          cx="520"
          cy="4"
          r="4"
          fill="currentColor"
          style={
            animate
              ? {
                  opacity: 0,
                  animation: "fade-up 0.6s ease-out 2.1s forwards",
                }
              : undefined
          }
        />
      )}
    </svg>
  );
}
