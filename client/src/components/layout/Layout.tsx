import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { TopStrip } from "@/components/layout/TopStrip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotFab } from "@/components/layout/ChatbotFab";
import { useLanguage } from "@/context/LanguageContext";

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        {t.skipToContent}
      </a>
      <TopStrip />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      {location.pathname !== "/chatbot" && <ChatbotFab />}
    </div>
  );
}
