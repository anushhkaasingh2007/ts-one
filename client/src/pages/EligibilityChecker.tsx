import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, XCircle, Sparkles, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { checkEligibility, type EligibilityInput, type EligibilityResult } from "@/lib/eligibility";
import { SCHEMES } from "@/data/schemes";
import { SCHEME_ICONS } from "@/data/schemeIcons";

const initialInput: EligibilityInput = {
  category: "ST",
  classLevel: "11-12",
  annualIncome: 200000,
  hasQualifyingExam: false,
  admittedToPremierInstitute: false,
};

export function EligibilityChecker() {
  const [input, setInput] = useState<EligibilityInput>(initialInput);
  const [results, setResults] = useState<EligibilityResult[] | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setResults(checkEligibility(input));
  };

  return (
    <>
      <Breadcrumb items={[{ label: "Eligibility" }]} />
      <div className="container py-10">
        <SectionHeading
          align="left"
          eyebrow="Instant Rule Engine"
          title="Eligibility Checker"
          description="Answer a few questions to instantly see which of the five MoTA scholarship schemes you qualify for."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <fieldset>
                  <legend className="mb-1.5 text-sm font-semibold text-foreground">Category</legend>
                  <select
                    value={input.category}
                    onChange={(e) => setInput({ ...input, category: e.target.value as EligibilityInput["category"] })}
                    className="w-full rounded-gov border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus-visible:border-navy"
                  >
                    <option value="ST">Scheduled Tribe (ST)</option>
                    <option value="OTHER">Other Category</option>
                  </select>
                </fieldset>

                <fieldset>
                  <legend className="mb-1.5 text-sm font-semibold text-foreground">Current Education Level</legend>
                  <select
                    value={input.classLevel}
                    onChange={(e) => setInput({ ...input, classLevel: e.target.value as EligibilityInput["classLevel"] })}
                    className="w-full rounded-gov border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus-visible:border-navy"
                  >
                    <option value="9-10">Class 9–10</option>
                    <option value="11-12">Class 11–12</option>
                    <option value="UG-PG">Undergraduate / Postgraduate</option>
                    <option value="MPHIL-PHD">M.Phil / Ph.D</option>
                    <option value="ABROAD">Admitted to Foreign University</option>
                  </select>
                </fieldset>

                <fieldset>
                  <legend className="mb-1.5 text-sm font-semibold text-foreground">
                    Annual Family Income (₹{input.annualIncome.toLocaleString("en-IN")})
                  </legend>
                  <input
                    type="range"
                    min={0}
                    max={800000}
                    step={10000}
                    value={input.annualIncome}
                    onChange={(e) => setInput({ ...input, annualIncome: Number(e.target.value) })}
                    className="w-full accent-navy"
                  />
                </fieldset>

                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={input.hasQualifyingExam}
                    onChange={(e) => setInput({ ...input, hasQualifyingExam: e.target.checked })}
                    className="h-4 w-4 accent-navy"
                  />
                  I have qualified UGC-NET / JRF or an equivalent exam
                </label>

                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={input.admittedToPremierInstitute}
                    onChange={(e) => setInput({ ...input, admittedToPremierInstitute: e.target.checked })}
                    className="h-4 w-4 accent-navy"
                  />
                  I am admitted to a MoTA-notified premier institution
                </label>

                <Button type="submit" className="w-full">
                  <Sparkles className="h-4 w-4" /> Check Eligibility
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {!results && (
              <Card className="flex h-full items-center justify-center p-10 text-center text-sm text-muted-foreground">
                Fill the form to see your eligibility results here.
              </Card>
            )}
            {results?.map((r) => {
              const scheme = SCHEMES.find((s) => s.key === r.key)!;
              const Icon = SCHEME_ICONS[r.key];
              return (
                <Card key={r.key} className={`flex items-start gap-3 p-4 ${r.eligible ? "border-green-200 dark:border-green-900" : ""}`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-gov bg-navy-50 text-navy dark:bg-navy-900/40 dark:text-navy-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">{scheme.name}</p>
                      {r.eligible ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 shrink-0 text-muted-foreground" />
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{r.reason}</p>
                    {r.eligible && (
                      <Link
                        to={`/schemes/${scheme.id}`}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-navy hover:underline dark:text-navy-200"
                      >
                        View scheme &amp; apply <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
