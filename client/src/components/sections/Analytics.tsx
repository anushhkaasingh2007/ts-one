import { FileText, ShieldCheck, Award, Banknote, Users } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { StatCard } from "@/components/ui/StatCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const MONTHLY_DATA = [
  { month: "Apr", applications: 12400, sanctioned: 8100 },
  { month: "May", applications: 18900, sanctioned: 12400 },
  { month: "Jun", applications: 27600, sanctioned: 19800 },
  { month: "Jul", applications: 41200, sanctioned: 30500 },
  { month: "Aug", applications: 52800, sanctioned: 41900 },
  { month: "Sep", applications: 61300, sanctioned: 49200 },
];

export function Analytics() {
  return (
    <section className="bg-muted/40 py-16" id="analytics">
      <div className="container">
        <SectionHeading
          eyebrow="Scholarship Coverage"
          title="Real Impact, Reported in Real Time"
          description="Live figures from the TS-One national rollout across all 28 States and Union Territories."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard icon={FileText} label="Applications Submitted" value={612480} accent="navy" />
          <StatCard icon={ShieldCheck} label="Students Verified" value={548210} accent="green" />
          <StatCard icon={Award} label="Scholarships Sanctioned" value={492030} accent="saffron" />
          <StatCard icon={Banknote} label="Funds Disbursed (₹ Lakh)" value={38640} accent="green" />
          <StatCard icon={Users} label="Unreached ST Students Identified" value={74210} accent="navy" />
        </div>

        <Card className="mt-8 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy dark:text-navy-200">
              Applications vs. Sanctions — 2025-26 (cumulative)
            </h3>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B3D91" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#0B3D91" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSanctioned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#138808" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#138808" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={56}
                  tickFormatter={(value: number) => `${Math.round(value / 1000)}k`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }}
                  formatter={(value) => Number(value).toLocaleString("en-IN")}
                />
                <Area type="monotone" dataKey="applications" name="Applications" stroke="#0B3D91" fill="url(#colorApplications)" strokeWidth={2} />
                <Area type="monotone" dataKey="sanctioned" name="Sanctioned" stroke="#138808" fill="url(#colorSanctioned)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  );
}
