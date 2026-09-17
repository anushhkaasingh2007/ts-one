import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Clock, AlertTriangle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { VerificationStatus } from "@/types";

const STATUS_CONFIG: Record<
  VerificationStatus,
  { icon: LucideIcon; classes: string; label: string }
> = {
  VERIFIED: { icon: CheckCircle2, classes: "text-green-600 dark:text-green-400", label: "Verified" },
  PENDING: { icon: Clock, classes: "text-muted-foreground", label: "Pending" },
  MANUAL_REVIEW: { icon: AlertTriangle, classes: "text-saffron-600 dark:text-saffron-300", label: "Manual Review" },
  FAILED: { icon: XCircle, classes: "text-red-600 dark:text-red-400", label: "Failed" },
};

export function VerificationCard({
  icon: SourceIcon,
  name,
  description,
  status,
}: {
  icon: LucideIcon;
  name: string;
  description: string;
  status: VerificationStatus;
}) {
  const cfg = STATUS_CONFIG[status];
  const StatusIcon = cfg.icon;
  return (
    <Card className="flex items-start gap-3 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-gov bg-navy-50 text-navy dark:bg-navy-900/40 dark:text-navy-200">
        <SourceIcon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        <div className={cn("mt-2 inline-flex items-center gap-1 text-xs font-semibold", cfg.classes)}>
          <StatusIcon className="h-3.5 w-3.5" />
          {cfg.label}
        </div>
      </div>
    </Card>
  );
}
