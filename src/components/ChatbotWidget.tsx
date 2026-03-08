import { useState } from "react";
import { MessageCircle, X, Send, ExternalLink, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const QUICK_REPLIES = [
  { label: "How to buy?", answer: "You can purchase through Fiverr, Upwork, or WhatsApp at +923219088673." },
  { label: "What is n8n?", answer: "n8n is a powerful open-source automation tool. I build custom AI-powered n8n workflows for businesses." },
  { label: "Custom solution?", answer: "Yes! I build custom AI workflows tailored to your needs. Reach out on WhatsApp or Fiverr/Upwork." },
  { label: "Pricing?", answer: "Prices vary by complexity. Check the Solutions page or contact me for quotes." },
];

interface Msg { role: "user" | "bot"; text: string; }

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi! 👋 I'm the AI Solutions assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");

  const addMsg = (text: string) => {
    setMessages((p) => [...p, { role: "user", text }]);
    const match = QUICK_REPLIES.find((q) => text.toLowerCase().includes(q.label.toLowerCase().slice(0, 6)));
    const reply = match?.answer || "Great question! Contact Ahmed on WhatsApp +923219088673 or via Fiverr/Upwork for details.";
    setTimeout(() => setMessages((p) => [...p, { role: "bot", text: reply }]), 500);
  };

  const send = () => { if (!input.trim()) return; addMsg(input); setInput(""); };

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl shadow-glow flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-glow"
        style={{ background: "var(--gradient-hero)" }}
      >
        {open ? <X className="h-5 w-5 text-primary-foreground" /> : <MessageCircle className="h-5 w-5 text-primary-foreground" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-3xl border-0 bg-card shadow-2xl flex flex-col max-h-[30rem] animate-fade-in overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-3" style={{ background: "var(--gradient-hero)" }}>
            <Bot className="h-5 w-5 text-primary-foreground" />
            <span className="font-display font-bold text-primary-foreground">AI Assistant</span>
            <span className="ml-auto h-2 w-2 rounded-full bg-success animate-pulse" />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  m.role === "user"
                    ? "text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`} style={m.role === "user" ? { background: "var(--gradient-hero)" } : undefined}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {QUICK_REPLIES.map((q) => (
              <button key={q.label} onClick={() => addMsg(q.label)}
                className="text-xs px-3 py-1.5 rounded-full border bg-muted/50 text-foreground/70 hover:text-primary-foreground transition-all duration-200"
                style={{ ["--tw-bg-opacity" as string]: undefined }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gradient-hero)", e.currentTarget.style.borderColor = "transparent")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "", e.currentTarget.style.borderColor = "")}
              >{q.label}</button>
            ))}
          </div>

          <div className="border-t px-3 py-3 flex gap-2">
            <Input placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} className="text-sm border-0 bg-muted/50 rounded-xl" />
            <Button size="icon" variant="hero" onClick={send} className="rounded-xl flex-shrink-0"><Send className="h-4 w-4" /></Button>
          </div>

          <a href="https://wa.me/923219088673" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 text-xs text-muted-foreground hover:text-foreground border-t transition-colors">
            <ExternalLink className="h-3 w-3" /> Continue on WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
