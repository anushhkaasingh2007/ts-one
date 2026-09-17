import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, FileText, ListOrdered, HelpCircle, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { api, ApiError } from "@/lib/api";
import { SCHEMES } from "@/data/schemes";
import { SCHEME_ICONS } from "@/data/schemeIcons";
import { SCHEME_DETAILS } from "@/data/schemeDetails";

export function ScholarshipDetails() {
  const { id } = useParams();
  const scheme = SCHEMES.find((s) => s.id === id);
  const { student } = useAuth();
  const { toast } = useToast();
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!scheme) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Scheme not found.</p>
        <Link to="/schemes" className="mt-4 inline-block font-semibold text-navy underline">
          Back to Schemes
        </Link>
      </div>
    );
  }

  const detail = SCHEME_DETAILS[scheme.key];
  const Icon = SCHEME_ICONS[scheme.key];

  const handleApply = async () => {
    if (!student) return;
    setApplying(true);
    try {
      await api.post("/applications", {
        schemeKey: scheme.key,
        academicYear: "2025-26",
        amountRequested: 50000,
      });
      setApplied(true);
      toast({ title: "Application submitted", description: `Your ${scheme.name} application has been received.`, variant: "success" });
    } catch (err) {
      toast({
        title: "Could not submit application",
        description: err instanceof ApiError ? err.message : "Please try again later.",
        variant: "warning",
      });
    } finally {
      setApplying(false);
    }
  };

  return (
    <>
      <Breadcrumb items={[{ label: "Schemes", to: "/schemes" }, { label: scheme.name }]} />
      <div className="container py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-gov bg-navy-50 text-navy dark:bg-navy-900/40 dark:text-navy-200">
              <Icon className="h-7 w-7" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-navy dark:text-navy-100">{scheme.name}</h1>
              <p className="text-sm text-muted-foreground">{detail.amount}</p>
            </div>
          </div>
          {student ? (
            <Button onClick={handleApply} disabled={applying || applied} size="lg" variant="saffron">
              {applied ? "Application Submitted" : applying ? "Submitting…" : "Apply Now"}
              {!applied && <ArrowRight className="h-4 w-4" />}
            </Button>
          ) : (
            <Link to="/login">
              <Button size="lg" variant="saffron">
                Login to Apply <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="space-y-6 p-6">
              <p className="text-sm text-muted-foreground">{scheme.shortDescription}</p>

              <section>
                <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-navy dark:text-navy-200">
                  <CheckCircle2 className="h-4 w-4" /> Benefits
                </h2>
                <ul className="space-y-2">
                  {detail.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> {b}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-navy dark:text-navy-200">
                  <ListOrdered className="h-4 w-4" /> Application Process
                </h2>
                <ol className="space-y-2">
                  {detail.process.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-100 text-[11px] font-bold text-navy dark:bg-navy-900 dark:text-navy-200">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-navy dark:text-navy-200">
                  <HelpCircle className="h-4 w-4" /> Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {detail.faqs.map((f) => (
                    <div key={f.q} className="rounded-gov bg-muted/50 p-3.5">
                      <p className="text-sm font-semibold text-foreground">{f.q}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardContent className="p-6">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-navy dark:text-navy-200">
                <FileText className="h-4 w-4" /> Documents Required
              </h2>
              <ul className="space-y-2">
                {detail.documentsRequired.map((doc) => (
                  <li key={doc} className="flex items-center gap-2 rounded-gov bg-muted/50 px-3 py-2 text-xs font-medium text-foreground">
                    <FileText className="h-3.5 w-3.5 text-navy" /> {doc}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-muted-foreground">
                Eligibility: {scheme.eligibilitySummary}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
