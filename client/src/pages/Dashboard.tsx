import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, ShieldCheck, FileCheck2, Banknote, ListTodo, FolderOpen, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { ApplicationTimeline } from "@/components/ui/Timeline";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { formatCurrencyINR, formatDate } from "@/lib/utils";
import type { Application, DocumentItem, NotificationItem } from "@/types";

function DashboardContent() {
  const { student } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get<Application[]>("/applications"),
      api.get<DocumentItem[]>("/documents"),
      api.get<NotificationItem[]>("/notifications"),
    ])
      .then(([apps, docs, notifs]) => {
        setApplications(apps);
        setDocuments(docs);
        setNotifications(notifs);
      })
      .finally(() => setLoading(false));
  }, []);

  const verifiedDocs = documents.filter((d) => d.status === "VERIFIED").length;
  const pendingActions = documents.filter((d) => d.status !== "VERIFIED").length;
  const sanctioned = applications.filter((a) => a.stage === "SANCTIONED" || a.stage === "DISBURSED");
  const totalSanctioned = sanctioned.reduce((sum, a) => sum + (a.amountSanctioned || 0), 0);
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const tiles = [
    { icon: ClipboardList, label: "Active Applications", value: String(applications.length), tone: "navy" },
    {
      icon: ShieldCheck,
      label: "Verification Status",
      value: documents.some((d) => d.status !== "VERIFIED") ? "In Progress" : "Verified",
      tone: "green",
    },
    { icon: FileCheck2, label: "Sanction Status", value: `${sanctioned.length} Sanctioned`, tone: "green" },
    { icon: Banknote, label: "DBT Payment Status", value: formatCurrencyINR(totalSanctioned), tone: "saffron" },
    { icon: ListTodo, label: "Pending Actions", value: String(pendingActions), tone: "navy" },
    { icon: FolderOpen, label: "Document Wallet", value: `${verifiedDocs}/${documents.length} Verified`, tone: "green" },
  ] as const;

  const toneClasses: Record<string, string> = {
    navy: "bg-navy-50 text-navy dark:bg-navy-900/40 dark:text-navy-200",
    green: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    saffron: "bg-saffron-50 text-saffron-700 dark:bg-saffron-900/30 dark:text-saffron-200",
  };

  return (
    <div className="container py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-navy dark:text-navy-100">
            Welcome, {student?.name?.split(" ")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            {student?.community} &middot; {student?.district}, {student?.state}
          </p>
        </div>
        <Link to="/notifications">
          <Button variant="outline" size="sm">
            {unreadNotifs > 0 ? `${unreadNotifs} New Notifications` : "Notifications"}
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading your dashboard…</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {tiles.map((tile) => (
              <Card key={tile.label} className="p-4">
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-gov ${toneClasses[tile.tone]}`}>
                  <tile.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold text-foreground">{tile.value}</p>
                <p className="text-xs text-muted-foreground">{tile.label}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-navy dark:text-navy-100">Your Applications</h2>
              {applications.length === 0 && (
                <Card className="p-6 text-center text-sm text-muted-foreground">
                  You haven&rsquo;t applied for any scholarship yet.
                  <Link to="/schemes" className="ml-1 font-semibold text-navy underline dark:text-navy-200">
                    Browse schemes
                  </Link>
                </Card>
              )}
              {applications.map((app) => (
                <Card key={app.id} className="p-5">
                  <CardHeader className="flex-row items-start justify-between p-0 pb-4">
                    <div>
                      <CardTitle>{app.scheme.name}</CardTitle>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Academic Year {app.academicYear} &middot; Submitted {formatDate(app.submittedAt)}
                      </p>
                    </div>
                    <StatusBadge status={app.stage} />
                  </CardHeader>
                  <CardContent className="p-0">
                    <ApplicationTimeline currentStage={app.stage} events={app.statusEvents} />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-navy dark:text-navy-100">Recent Notifications</h2>
              <Card className="divide-y divide-border p-0">
                {notifications.slice(0, 4).map((n) => (
                  <div key={n.id} className="p-4">
                    <p className="text-sm font-semibold text-foreground">{n.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{n.message}</p>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <p className="p-4 text-sm text-muted-foreground">No notifications yet.</p>
                )}
              </Card>
              <Link to="/notifications" className="flex items-center gap-1 text-sm font-semibold text-navy hover:underline dark:text-navy-200">
                View all notifications <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function Dashboard() {
  return (
    <>
      <Breadcrumb items={[{ label: "Scholarship Dashboard" }]} />
      <RequireAuth>
        <DashboardContent />
      </RequireAuth>
    </>
  );
}
