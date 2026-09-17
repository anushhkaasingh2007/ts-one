import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SCHEMES } from "@/data/schemes";
import { SCHEME_ICONS } from "@/data/schemeIcons";

export function Schemes() {
  return (
    <>
      <Breadcrumb items={[{ label: "Schemes" }]} />
      <div className="container py-10">
        <SectionHeading
          align="left"
          eyebrow="MoTA Schemes"
          title="Scholarship Schemes"
          description="Ministry of Tribal Affairs administers five central scholarship and fellowship schemes for Scheduled Tribe students, all accessible through TS-One."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SCHEMES.map((scheme) => {
            const Icon = SCHEME_ICONS[scheme.key];
            return (
              <Card key={scheme.id} className="flex flex-col">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-gov bg-navy-50 text-navy dark:bg-navy-900/40 dark:text-navy-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{scheme.name}</CardTitle>
                  <CardDescription>{scheme.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="rounded-gov bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Eligibility: </span>
                    {scheme.eligibilitySummary}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to={`/schemes/${scheme.id}`} className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
