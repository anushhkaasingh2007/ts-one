import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { ApplicationTimeline } from "@/components/ui/Timeline";
import { api } from "@/lib/api";
import { formatCurrencyINR, formatDate } from "@/lib/utils";
import type { Application } from "@/types";

function TrackContent() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api
      .get<Application[]>("/applications")
      .then(setApplications)
      .finally(() => setLoading(false));
  }, []);

  const filtered = applications.filter(
    (a) =>
      a.scheme.name.toLowerCase().includes(query.toLowerCase()) ||
      a.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-extrabold text-navy dark:text-navy-100">Track Application Status</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Follow your application through every stage — from submission to DBT disbursal.
      </p>

      <div className="relative mt-6 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by scheme name or application ID"
          className="w-full rounded-gov border border-border bg-background py-2.5 pl-9 pr-3.5 text-sm outline-none focus-visible:border-navy"
        />
      </div>

      <div className="mt-8 space-y-5">
        {loading && <p className="text-sm text-muted-foreground">Loading applications…</p>}
        {!loading && filtered.length === 0 && (
          <Card className="p-8 text-center text-sm text-muted-foreground">No applications found.</Card>
        )}
        {filtered.map((app) => (
          <Card key={app.id} className="p-6">
            <CardHeader className="flex-col items-start gap-3 p-0 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>{app.scheme.name}</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  Application ID: {app.id} &middot; Academic Year {app.academicYear} &middot; Submitted{" "}
                  {formatDate(app.submittedAt)}
                </p>
                {app.amountSanctioned != null && (
                  <p className="mt-1 text-xs font-semibold text-green-700 dark:text-green-400">
                    Amount Sanctioned: {formatCurrencyINR(app.amountSanctioned)}
                  </p>
                )}
              </div>
              <StatusBadge status={app.stage} />
            </CardHeader>
            <CardContent className="p-0">
              <ApplicationTimeline currentStage={app.stage} events={app.statusEvents} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function TrackApplication() {
  return (
    <>
      <Breadcrumb items={[{ label: "Track Status" }]} />
      <RequireAuth>
        <TrackContent />
      </RequireAuth>
    </>
  );
}
