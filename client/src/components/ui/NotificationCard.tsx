import { ShieldCheck, ClipboardCheck, Award, Banknote, Bell } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn, formatDate } from "@/lib/utils";
import type { NotificationItem } from "@/types";

const CATEGORY_CONFIG: Record<NotificationItem["category"], { icon: LucideIcon; classes: string }> = {
  VERIFICATION: { icon: ShieldCheck, classes: "bg-navy-50 text-navy dark:bg-navy-900/40 dark:text-navy-200" },
  APPLICATION: { icon: ClipboardCheck, classes: "bg-navy-50 text-navy dark:bg-navy-900/40 dark:text-navy-200" },
  SANCTION: { icon: Award, classes: "bg-saffron-50 text-saffron-700 dark:bg-saffron-900/30 dark:text-saffron-200" },
  DBT: { icon: Banknote, classes: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
  GENERAL: { icon: Bell, classes: "bg-muted text-muted-foreground" },
};

export function NotificationCard({ item }: { item: NotificationItem }) {
  const cfg = CATEGORY_CONFIG[item.category];
  const Icon = cfg.icon;
  return (
    <Card className={cn("flex items-start gap-3 p-4", !item.read && "border-navy-200 bg-navy-50/40 dark:bg-navy-950/40")}>
      <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-gov", cfg.classes)}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-foreground">{item.title}</p>
          {!item.read && <span className="h-2 w-2 shrink-0 rounded-full bg-saffron-500" aria-label="Unread" />}
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">{item.message}</p>
        <p className="mt-1.5 text-xs text-muted-foreground/70">{formatDate(item.createdAt)}</p>
      </div>
    </Card>
  );
}
