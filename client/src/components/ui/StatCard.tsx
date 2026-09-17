import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

function useCountUp(target: number, durationMs = 1400, start: boolean) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, durationMs, start]);

  return value;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  accent = "navy",
  animate = true,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  accent?: "navy" | "saffron" | "green";
  animate?: boolean;
}) {
  const [visible, setVisible] = useState(!animate);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 1400, visible);

  useEffect(() => {
    if (!animate || !ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [animate]);

  const accentClasses = {
    navy: "bg-navy-50 text-navy dark:bg-navy-900/40 dark:text-navy-200",
    saffron: "bg-saffron-50 text-saffron-700 dark:bg-saffron-900/30 dark:text-saffron-200",
    green: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  };

  return (
    <Card ref={ref} className="p-5">
      <div className={cn("mb-3 inline-flex h-11 w-11 items-center justify-center rounded-gov", accentClasses[accent])}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        {count.toLocaleString("en-IN")}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </Card>
  );
}
