import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        neutral: "bg-muted text-muted-foreground",
        info: "bg-navy-50 text-navy-700 dark:bg-navy-900/50 dark:text-navy-200",
        success: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        warning: "bg-saffron-50 text-saffron-700 dark:bg-saffron-900/30 dark:text-saffron-200",
        danger: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

const STAGE_MAP: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
  SUBMITTED: { label: "Submitted", variant: "info" },
  VERIFIED: { label: "Verified", variant: "info" },
  APPROVED: { label: "Approved", variant: "warning" },
  SANCTIONED: { label: "Sanctioned", variant: "success" },
  DISBURSED: { label: "Disbursed", variant: "success" },
  REJECTED: { label: "Rejected", variant: "danger" },
  PENDING: { label: "Pending", variant: "neutral" },
  FAILED: { label: "Failed", variant: "danger" },
  MANUAL_REVIEW: { label: "Manual Review", variant: "warning" },
};

export function StatusBadge({ status }: { status: string }) {
  const cfg = STAGE_MAP[status] || { label: status, variant: "neutral" as const };
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}
