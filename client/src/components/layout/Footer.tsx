import { Link } from "react-router-dom";
import { ShieldCheck, MessageCircle, Rss, Video, Camera, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { TribalMotifStrip } from "@/components/ui/TribalMotif";

const COLUMNS = [
  {
    title: "About TS-One",
    links: [
      { label: "Ministry of Tribal Affairs", href: "https://tribal.nic.in" },
      { label: "Digital India", href: "https://digitalindia.gov.in" },
      { label: "National Scholarship Portal", href: "https://scholarships.gov.in" },
      { label: "About the Platform", href: "#" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Schemes", href: "/schemes" },
      { label: "Eligibility Checker", href: "/eligibility" },
      { label: "Track Application", href: "/track" },
      { label: "Document Wallet", href: "/documents" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "FAQ", href: "/help#faq" },
      { label: "Helpdesk: 1800-11-8283", href: "#" },
      { label: "Grievance Redressal", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Website Policy", href: "#" },
      { label: "Copyright Policy", href: "#" },
    ],
  },
];

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-16 border-t border-border bg-navy-950 text-navy-100 no-print">
      <div className="tricolor-bar" aria-hidden />
      <TribalMotifStrip tone="dark" className="opacity-80" />
      <div className="container grid grid-cols-2 gap-8 py-10 sm:grid-cols-2 md:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-saffron-300">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") ? (
                    <Link to={l.href} className="text-navy-200 hover:text-white hover:underline">
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      className="inline-flex items-center gap-1 text-navy-200 hover:text-white hover:underline"
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      {l.label}
                      {l.href.startsWith("http") && <ExternalLink className="h-3 w-3" />}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-300 sm:flex-row">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {t.ministry}, {t.govIndia}. {t.footer.rights}.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 font-semibold text-white">
              <ShieldCheck className="h-3.5 w-3.5 text-green-400" />
              Secure • DigiLocker Enabled • DBT Integrated
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="hover:text-saffron-300"><MessageCircle className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter / X" className="hover:text-saffron-300"><Rss className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-saffron-300"><Video className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-saffron-300"><Camera className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
