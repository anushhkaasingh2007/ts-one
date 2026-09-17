import { cn } from "@/lib/utils";

/**
 * A repeating geometric motif (triangles + dots) inspired by Warli-style tribal
 * folk art — TS-One's own decorative signature, distinct from generic GIGW panels.
 */
export function TribalMotifStrip({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const stroke = tone === "dark" ? "#FF9933" : "#0B3D91";
  return (
    <svg
      viewBox="0 0 240 16"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-4 w-full", className)}
      aria-hidden
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 12}, 0)`}>
          <polygon points="6,2 10,13 2,13" fill="none" stroke={stroke} strokeWidth="1" opacity="0.55" />
          <circle cx="6" cy="8" r="0.9" fill={stroke} opacity="0.55" />
        </g>
      ))}
    </svg>
  );
}
