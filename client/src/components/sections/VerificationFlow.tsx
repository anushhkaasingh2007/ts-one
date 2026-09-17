import { ArrowRight, User, Layers3, Database, CheckCircle2, AlertOctagon } from "lucide-react";
import { VerificationCard } from "@/components/ui/VerificationCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VERIFICATION_SOURCES } from "@/data/verificationSources";
import type { VerificationSource, VerificationStatus } from "@/types";

const DEMO_STATUS: Record<VerificationSource, VerificationStatus> = {
  DIGILOCKER: "VERIFIED",
  UIDAI: "VERIFIED",
  APAAR: "VERIFIED",
  UDISE: "VERIFIED",
  AISHE: "PENDING",
  UGC_NTA: "VERIFIED",
  E_DISTRICT: "MANUAL_REVIEW",
  INCOME_CERT: "VERIFIED",
  DISABILITY_CERT: "PENDING",
};

const FLOW_STEPS = [
  { icon: User, label: "Student" },
  { icon: Layers3, label: "Verification Layer" },
  { icon: Database, label: "Government Database" },
  { icon: CheckCircle2, label: "Verified" },
];

export function VerificationFlow() {
  return (
    <section className="bg-background py-16">
      <div className="container">
        <SectionHeading
          eyebrow="Digital Verification"
          title="Real-Time API Verification"
          description="Every claim a student makes is verified directly against authoritative government databases — no manual paperwork required."
        />

        <div className="mx-auto mb-12 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-4">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2 sm:gap-4">
              <div className="flex flex-col items-center gap-2">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-navy bg-navy-50 text-navy dark:bg-navy-900/40 dark:text-navy-200">
                  <step.icon className="h-6 w-6" />
                </span>
                <span className="text-xs font-semibold text-foreground">{step.label}</span>
              </div>
              {i < FLOW_STEPS.length - 1 && <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(VERIFICATION_SOURCES) as VerificationSource[]).map((key) => {
            const src = VERIFICATION_SOURCES[key];
            return (
              <VerificationCard
                key={key}
                icon={src.icon}
                name={src.name}
                description={src.description}
                status={DEMO_STATUS[key]}
              />
            );
          })}
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-gov border border-saffron-200 bg-saffron-50 p-4 text-sm text-saffron-800 dark:border-saffron-900 dark:bg-saffron-950 dark:text-saffron-200">
          <AlertOctagon className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            <span className="font-semibold">Exceptions go to Manual Review:</span> if any source cannot confirm a
            record automatically (e.g. a mismatched name or an unlinked certificate), the application is routed to
            a district-level officer for manual verification within 7 working days.
          </p>
        </div>
      </div>
    </section>
  );
}
