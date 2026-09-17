import { Ear, Languages, Phone, Moon, Sun, ALargeSmall } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export function TopStrip() {
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="hidden bg-navy-900 text-white sm:block">
      <div className="container flex h-9 items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span className="font-medium">{t.govIndia}</span>
          <span className="opacity-60">|</span>
          <span>{t.ministry}</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#main-content" className="flex items-center gap-1 hover:text-saffron-300">
            <ALargeSmall className="h-3.5 w-3.5" aria-hidden />
            {t.accessibility}
          </a>
          <button className="flex items-center gap-1 hover:text-saffron-300" aria-label={t.screenReader}>
            <Ear className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden md:inline">{t.screenReader}</span>
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 hover:text-saffron-300"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 rounded border border-white/30 px-2 py-0.5 hover:bg-white/10"
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5" aria-hidden />
            {lang === "en" ? "हिंदी" : "English"}
          </button>
          <span className="flex items-center gap-1">
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {t.helpline}
          </span>
        </div>
      </div>
    </div>
  );
}
