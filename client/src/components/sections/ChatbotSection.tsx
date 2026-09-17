import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Bot, MessageSquareText, FileWarning, Banknote, Languages, Clock4, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES = [
  { icon: MessageSquareText, label: "Eligibility guidance" },
  { icon: Clock4, label: "Application status" },
  { icon: FileWarning, label: "Missing documents" },
  { icon: Banknote, label: "DBT updates" },
  { icon: Languages, label: "Multilingual support" },
  { icon: Bot, label: "24×7 assistance" },
];

export function ChatbotSection() {
  return (
    <section className="bg-navy-950 py-16 text-white">
      <div className="container">
        <SectionHeading
          eyebrow="JAGO — Your Scholarship Assistant"
          title="Ask JAGO Anything About Your Scholarship"
          description="JAGO (Janjati Assistance & Guidance Operator) is the government AI assistant built into TS-One, available around the clock in English and Hindi."
          className="[&_h2]:text-white [&_p]:text-navy-200"
          motifTone="dark"
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.label} className="flex items-center gap-2 rounded-gov border border-white/10 bg-white/5 p-3">
                  <f.icon className="h-4 w-4 shrink-0 text-saffron-300" />
                  <span className="text-xs font-medium text-navy-100">{f.label}</span>
                </div>
              ))}
            </div>
            <Link to="/chatbot" className="mt-8 inline-block">
              <Button variant="saffron" size="lg">
                Chat with JAGO <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Card className="border-white/10 bg-white text-foreground">
            <div className="flex items-center gap-3 border-b border-border p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-navy">JAGO Assistant</p>
                <p className="flex items-center gap-1 text-xs text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Online now
                </p>
              </div>
            </div>
            <div className="space-y-3 p-4">
              <ChatBubble from="bot">
                Namaste! I&rsquo;m JAGO. I can check your eligibility, track your application, or tell you which
                documents are pending. How can I help?
              </ChatBubble>
              <ChatBubble from="user">Is my Post-Matric application verified yet?</ChatBubble>
              <ChatBubble from="bot">
                Yes — your income certificate was verified via State e-District on 24 Jul 2025. Your application is
                now Sanctioned and ₹48,000 will be disbursed via DBT within 5 working days.
              </ChatBubble>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({ from, children }: { from: "bot" | "user"; children: ReactNode }) {
  return (
    <div className={`flex ${from === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-gov px-3.5 py-2.5 text-sm ${
          from === "user" ? "bg-navy text-white" : "bg-muted text-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
