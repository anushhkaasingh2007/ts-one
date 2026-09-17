import { useState } from "react";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Who is eligible to apply on TS-One?",
    a: "Any student belonging to a notified Scheduled Tribe (ST) community, studying from Class 9 through Ph.D or admitted to a foreign university, can apply for the relevant scheme.",
  },
  {
    q: "How is my identity verified?",
    a: "TS-One verifies your identity and documents in real time through UIDAI (Aadhaar), DigiLocker, UDISE+, AISHE, UGC-NTA and State e-District services — no physical paperwork is required.",
  },
  {
    q: "How long does verification take?",
    a: "Most documents are verified instantly. If a mismatch is found, the case is routed to a district officer for manual review, typically resolved within 7 working days.",
  },
  {
    q: "How will I receive my scholarship amount?",
    a: "All sanctioned amounts are transferred directly to your Aadhaar-seeded bank account through Direct Benefit Transfer (DBT), usually within 5–7 working days of sanction.",
  },
  {
    q: "Can I apply for more than one scheme?",
    a: "Yes, as long as you meet the eligibility criteria for each scheme and the schemes are not mutually exclusive for the same academic year.",
  },
  {
    q: "What if I don't have a bank account yet?",
    a: "You will need to open an Aadhaar-seeded bank account before your scholarship can be sanctioned. Most nationalised banks offer zero-balance Basic Savings accounts.",
  },
];

export function HelpCenter() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Breadcrumb items={[{ label: "Help" }]} />
      <div className="container py-10">
        <SectionHeading
          eyebrow="Support"
          title="Help Center"
          description="Find answers to common questions, or reach out to the TS-One support team directly."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            <Card className="p-5">
              <h3 className="mb-3 text-sm font-bold text-navy dark:text-navy-200">Contact Us</h3>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-navy" /> 1800-11-8283 (Toll Free)
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-navy" /> support@tsone.gov.in
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-navy" />
                  Ministry of Tribal Affairs, Shastri Bhawan, New Delhi – 110001
                </li>
              </ul>
            </Card>
            <Card className="p-5">
              <h3 className="mb-2 text-sm font-bold text-navy dark:text-navy-200">Office Hours</h3>
              <p className="text-sm text-muted-foreground">Monday – Friday, 9:30 AM – 6:00 PM IST</p>
              <p className="mt-1 text-xs text-muted-foreground">JAGO Chatbot is available 24×7 for instant help.</p>
            </Card>
          </div>

          <div id="faq" className="space-y-3">
            {FAQS.map((faq, i) => (
              <Card key={faq.q} className="overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between p-4 text-left"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-sm font-semibold text-foreground">{faq.q}</span>
                  <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", openIndex === i && "rotate-180")} />
                </button>
                {openIndex === i && (
                  <CardContent className="pt-0 text-sm text-muted-foreground">{faq.a}</CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
