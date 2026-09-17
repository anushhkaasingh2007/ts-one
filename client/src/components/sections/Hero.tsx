import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TribalMotifStrip } from "@/components/ui/TribalMotif";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-50 to-white dark:from-navy-950 dark:to-background">
      <TribalMotifStrip className="absolute inset-x-0 top-0" />
      <div className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t.hero.badge}
          </span>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-navy dark:text-navy-100 sm:text-4xl lg:text-5xl">
            {t.hero.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            {t.hero.subtext}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/eligibility">
              <Button size="lg" variant="saffron">
                {t.hero.applyNow} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/track">
              <Button size="lg" variant="outline">
                <Search className="h-4 w-4" /> {t.hero.trackApplication}
              </Button>
            </Link>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              ["5", "Scholarship Schemes"],
              ["28", "States & UTs"],
              ["100%", "DBT Transfers"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-xl font-extrabold text-navy dark:text-navy-200 sm:text-2xl">{value}</dt>
                <dd className="text-xs text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-6 -z-10 rounded-full bg-saffron-100/60 blur-3xl dark:bg-saffron-900/20" />
          <HeroIllustration />
        </motion.div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 420" role="img" aria-labelledby="hero-illustration-title" className="w-full">
      <title id="hero-illustration-title">
        Illustration of Scheduled Tribe students using a mobile phone to access the TS-One scholarship platform
      </title>
      <rect x="0" y="330" width="480" height="90" fill="none" />
      <ellipse cx="240" cy="380" rx="170" ry="18" className="fill-navy-100 dark:fill-navy-900/40" />

      <g transform="translate(60,60)">
        <circle cx="90" cy="46" r="34" className="fill-saffron-200 dark:fill-saffron-900/50" />
        <path d="M40 210 Q40 120 90 108 Q140 120 140 210 Z" className="fill-navy" />
        <circle cx="90" cy="46" r="26" fill="#3a2417" />
        <circle cx="90" cy="50" r="21" className="fill-[#c98a5e]" />
        <rect x="55" y="150" width="70" height="70" rx="10" className="fill-white dark:fill-navy-950 stroke-navy" strokeWidth="3" />
        <rect x="63" y="160" width="54" height="34" rx="3" className="fill-navy-100 dark:fill-navy-800" />
        <circle cx="90" cy="204" r="5" className="fill-navy-300" />
      </g>

      <g transform="translate(230,90)">
        <circle cx="90" cy="40" r="30" className="fill-green-200 dark:fill-green-900/50" />
        <path d="M45 200 Q45 118 90 108 Q135 118 135 200 Z" className="fill-green-700" />
        <circle cx="90" cy="40" r="23" fill="#2b1a10" />
        <circle cx="90" cy="44" r="18" className="fill-[#c98a5e]" />
        <rect x="72" y="130" width="36" height="58" rx="8" className="fill-white dark:fill-navy-950 stroke-navy" strokeWidth="3" />
        <rect x="78" y="140" width="24" height="30" rx="2" className="fill-green-100 dark:fill-green-900" />
      </g>

      <g transform="translate(150,20)">
        <circle cx="90" cy="40" r="32" className="fill-navy-200 dark:fill-navy-800" />
        <path d="M40 220 Q40 128 90 116 Q140 128 140 220 Z" className="fill-saffron-500" />
        <circle cx="90" cy="40" r="24" fill="#4a2f1c" />
        <circle cx="90" cy="44" r="19" className="fill-[#d29a6e]" />
        <rect x="58" y="145" width="64" height="80" rx="12" className="fill-white dark:fill-navy-950 stroke-navy" strokeWidth="3.5" />
        <rect x="66" y="156" width="48" height="42" rx="4" className="fill-navy-50 dark:fill-navy-900" />
        <circle cx="90" cy="212" r="6" className="fill-navy-300" />
        <rect x="72" y="164" width="36" height="4" rx="2" className="fill-green-500" />
        <rect x="72" y="174" width="26" height="4" rx="2" className="fill-saffron-500" />
        <rect x="72" y="184" width="30" height="4" rx="2" className="fill-navy-400" />
      </g>

      <g className="fill-green-600">
        <circle cx="60" cy="60" r="4" opacity="0.5" />
        <circle cx="420" cy="80" r="5" opacity="0.4" />
        <circle cx="440" cy="220" r="4" opacity="0.4" />
      </g>
    </svg>
  );
}
