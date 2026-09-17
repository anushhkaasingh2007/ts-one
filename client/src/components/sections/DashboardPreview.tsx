import { FileCheck2, ShieldCheck, Banknote, ListTodo, FolderOpen, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { ApplicationTimeline } from "@/components/ui/Timeline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatCurrencyINR } from "@/lib/utils";

const PREVIEW_TILES = [
  { icon: ClipboardList, label: "Active Applications", value: "2", tone: "navy" },
  { icon: ShieldCheck, label: "Verification Status", value: "Verified", tone: "green" },
  { icon: FileCheck2, label: "Sanction Status", value: "Sanctioned", tone: "green" },
  { icon: Banknote, label: "DBT Payment Status", value: "Credited", tone: "saffron" },
  { icon: ListTodo, label: "Pending Actions", value: "1", tone: "navy" },
  { icon: FolderOpen, label: "Document Wallet", value: "6/6 Verified", tone: "green" },
] as const;

const TONE_CLASSES: Record<string, string> = {
  navy: "bg-navy-50 text-navy dark:bg-navy-900/40 dark:text-navy-200",
  green: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  saffron: "bg-saffron-50 text-saffron-700 dark:bg-saffron-900/30 dark:text-saffron-200",
};

export function DashboardPreview() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container">
        <SectionHeading
          eyebrow="Unified Dashboard"
          title="Every Application, One Screen"
          description="A single, real-time view of every scholarship application, its verification status and DBT disbursal — for the student and the administrator."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PREVIEW_TILES.map((tile) => (
            <Card key={tile.label} className="p-4 text-center sm:text-left">
              <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-gov sm:mx-0 ${TONE_CLASSES[tile.tone]}`}>
                <tile.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-bold text-foreground">{tile.value}</p>
              <p className="text-xs text-muted-foreground">{tile.label}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6">
          <CardHeader className="flex-row items-center justify-between p-0 pb-4">
            <div>
              <CardTitle>Post-Matric Scholarship — 2025-26</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                Application ID: TS1-PM-2025-004821 &middot; Amount sanctioned: {formatCurrencyINR(48000)}
              </p>
            </div>
            <StatusBadge status="SANCTIONED" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <ApplicationTimeline
              currentStage="SANCTIONED"
              events={[
                { id: "1", stage: "SUBMITTED", occurredAt: "2025-07-12" },
                { id: "2", stage: "VERIFIED", occurredAt: "2025-07-24" },
                { id: "3", stage: "APPROVED", occurredAt: "2025-08-02" },
                { id: "4", stage: "SANCTIONED", occurredAt: "2025-08-14" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
