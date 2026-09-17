import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { translations, type Lang, type TranslationSet } from "@/data/translations";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  t: TranslationSet;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return (localStorage.getItem("tsone_lang") as Lang) || "en";
    } catch {
      return "en";
    }
  });

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: (l) => {
        setLang(l);
        try {
          localStorage.setItem("tsone_lang", l);
        } catch {
          // ignore
        }
      },
      toggleLang: () =>
        setLang((prev) => {
          const next = prev === "en" ? "hi" : "en";
          try {
            localStorage.setItem("tsone_lang", next);
          } catch {
            // ignore
          }
          return next;
        }),
      t: translations[lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
