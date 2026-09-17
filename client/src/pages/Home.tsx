import { Hero } from "@/components/sections/Hero";
import { SchemeCards } from "@/components/sections/SchemeCards";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { VerificationFlow } from "@/components/sections/VerificationFlow";
import { ChatbotSection } from "@/components/sections/ChatbotSection";
import { Analytics } from "@/components/sections/Analytics";
import { NotificationCenter } from "@/components/sections/NotificationCenter";

export function Home() {
  return (
    <>
      <Hero />
      <SchemeCards />
      <DashboardPreview />
      <VerificationFlow />
      <ChatbotSection />
      <Analytics />
      <NotificationCenter />
    </>
  );
}
