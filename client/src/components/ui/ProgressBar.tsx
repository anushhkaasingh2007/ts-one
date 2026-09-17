import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  className,
  colorClass = "bg-green",
}: {
  value: number;
  className?: string;
  colorClass?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-700 ease-out", colorClass)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
