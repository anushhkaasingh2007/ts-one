import { cn } from "@/lib/utils";
import { TribalMotifStrip } from "@/components/ui/TribalMotif";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
  motifTone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
  motifTone?: "light" | "dark";
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow && (
        <span className="mb-2 inline-block text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-extrabold tracking-tight text-navy dark:text-navy-100 sm:text-3xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{description}</p>}
      <TribalMotifStrip tone={motifTone} className={cn("mt-4 max-w-[160px]", align === "center" && "mx-auto")} />
    </div>
  );
}
