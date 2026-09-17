import { Check, Circle } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { ApplicationStage, StatusEvent } from "@/types";

const STAGES: { key: ApplicationStage; label: string }[] = [
  { key: "SUBMITTED", label: "Submitted" },
  { key: "VERIFIED", label: "Verified" },
  { key: "APPROVED", label: "Approved" },
  { key: "SANCTIONED", label: "Sanctioned" },
  { key: "DISBURSED", label: "Disbursed" },
];

export function ApplicationTimeline({
  currentStage,
  events = [],
}: {
  currentStage: ApplicationStage;
  events?: StatusEvent[];
}) {
  const currentIndex = STAGES.findIndex((s) => s.key === currentStage);
  const eventFor = (key: ApplicationStage) => events.find((e) => e.stage === key);

  return (
    <ol className="flex flex-col gap-0 sm:flex-row sm:items-start" aria-label="Application progress">
      {STAGES.map((stage, i) => {
        const isCurrent = i === currentIndex && currentStage !== "REJECTED";
        const isComplete = i <= currentIndex;
        const event = eventFor(stage.key);
        return (
          <li key={stage.key} className="relative flex flex-1 gap-3 pb-6 sm:flex-col sm:gap-2 sm:pb-0">
            {i < STAGES.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "absolute left-[15px] top-8 h-full w-0.5 sm:left-0 sm:top-[15px] sm:h-0.5 sm:w-full",
                  isComplete && i < currentIndex ? "bg-green" : "bg-border"
                )}
              />
            )}
            <span
              className={cn(
                "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                isComplete
                  ? "border-green bg-green text-white"
                  : isCurrent
                  ? "border-navy bg-white text-navy animate-pulse-ring dark:bg-card"
                  : "border-border bg-white text-muted-foreground dark:bg-card"
              )}
            >
              {isComplete ? <Check className="h-4 w-4" /> : <Circle className="h-3 w-3 fill-current" />}
            </span>
            <div className="sm:pt-1">
              <p
                className={cn(
                  "text-sm font-semibold",
                  isComplete ? "text-navy dark:text-navy-200" : "text-muted-foreground"
                )}
              >
                {stage.label}
              </p>
              {event && (
                <p className="text-xs text-muted-foreground">{formatDate(event.occurredAt)}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
