import { useEffect, useState } from "react";
import { CheckCheck } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { NotificationCard } from "@/components/ui/NotificationCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import type { NotificationItem } from "@/types";

function NotificationsContent() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => api.get<NotificationItem[]>("/notifications").then(setNotifications).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const markAllRead = async () => {
    await api.patch("/notifications/read-all");
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-navy dark:text-navy-100">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">{unread} unread notification{unread === 1 ? "" : "s"}</p>
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {loading && <p className="text-sm text-muted-foreground">Loading notifications…</p>}
        {!loading && notifications.length === 0 && (
          <Card className="p-8 text-center text-sm text-muted-foreground">You&rsquo;re all caught up.</Card>
        )}
        {notifications.map((n) => (
          <NotificationCard key={n.id} item={n} />
        ))}
      </div>
    </div>
  );
}

export function Notifications() {
  return (
    <>
      <Breadcrumb items={[{ label: "Notifications" }]} />
      <RequireAuth>
        <NotificationsContent />
      </RequireAuth>
    </>
  );
}
