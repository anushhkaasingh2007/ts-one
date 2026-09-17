import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, Send, User } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

const SUGGESTIONS = [
  "Is my application verified?",
  "What documents are pending?",
  "When will DBT be credited?",
  "Am I eligible for NFST?",
];

function ChatbotContent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api
      .get<ChatMessage[]>("/chatbot/messages")
      .then(setMessages)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || sending) return;
    setSending(true);
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: `temp-${Date.now()}`, sender: "USER", message: text, createdAt: new Date().toISOString() },
    ]);
    try {
      const { userMessage, botMessage } = await api.post<{ userMessage: ChatMessage; botMessage: ChatMessage }>(
        "/chatbot/messages",
        { message: text }
      );
      setMessages((prev) => [...prev.filter((m) => !m.id.startsWith("temp-")), userMessage, botMessage]);
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="container flex flex-col py-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white">
          <Bot className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-xl font-extrabold text-navy dark:text-navy-100">JAGO — Scholarship Assistant</h1>
          <p className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Online &middot; Available 24×7
          </p>
        </div>
      </div>

      <Card className="flex h-[65vh] flex-col overflow-hidden">
        <div className="flex-1 space-y-3 overflow-y-auto gov-scrollbar p-5">
          {loading && <p className="text-sm text-muted-foreground">Loading conversation…</p>}
          {messages.map((m) => (
            <div key={m.id} className={cn("flex gap-2", m.sender === "USER" ? "justify-end" : "justify-start")}>
              {m.sender === "BOT" && (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy dark:bg-navy-900 dark:text-navy-200">
                  <Bot className="h-4 w-4" />
                </span>
              )}
              <div
                className={cn(
                  "max-w-[75%] rounded-gov px-3.5 py-2.5 text-sm",
                  m.sender === "USER" ? "bg-navy text-white" : "bg-muted text-foreground"
                )}
              >
                {m.message}
              </div>
              {m.sender === "USER" && (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-saffron-100 text-saffron-700 dark:bg-saffron-900/40 dark:text-saffron-200">
                  <User className="h-4 w-4" />
                </span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-border p-3">
          <div className="mb-2 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-navy hover:text-navy dark:hover:text-navy-200"
              >
                {s}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question in English or Hindi…"
              className="flex-1 rounded-gov border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus-visible:border-navy"
            />
            <Button type="submit" disabled={sending || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export function Chatbot() {
  return (
    <>
      <Breadcrumb items={[{ label: "JAGO Chatbot" }]} />
      <RequireAuth>
        <ChatbotContent />
      </RequireAuth>
    </>
  );
}
