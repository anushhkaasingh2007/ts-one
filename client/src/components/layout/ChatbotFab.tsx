import { Link } from "react-router-dom";
import { Bot } from "lucide-react";

export function ChatbotFab() {
  return (
    <Link
      id="jago-fab"
      to="/chatbot"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-navy px-4 py-3 text-sm font-bold text-white shadow-gov-lg transition-transform hover:scale-105 focus-visible:outline-none sm:bottom-6 sm:right-6"
      aria-label="Open JAGO Chatbot assistant"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-40" />
        <Bot className="relative h-6 w-6" />
      </span>
      <span className="hidden sm:inline">JAGO</span>
    </Link>
  );
}
