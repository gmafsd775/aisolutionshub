import { useState } from "react";
import { MessageCircle, X, Send, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const QUICK_REPLIES = [
  { label: "How do I buy?", answer: "You can purchase workflows through Fiverr, Upwork, or contact me directly on WhatsApp at +923219088673." },
  { label: "What is n8n?", answer: "n8n is a powerful open-source workflow automation tool. I build custom n8n workflows powered by AI to automate your business processes." },
  { label: "Custom solution?", answer: "Absolutely! I build custom AI-powered workflows tailored to your needs. Reach out on WhatsApp or through Fiverr/Upwork to discuss." },
  { label: "Pricing?", answer: "Prices vary by complexity. Browse the Solutions page for listed prices, or contact me for custom quotes." },
];

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm the NexaFlow assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const addMessage = (text: string) => {
    setMessages((prev) => [...prev, { role: "user", text }]);
    const match = QUICK_REPLIES.find((q) => text.toLowerCase().includes(q.label.toLowerCase().slice(0, 8)));
    const reply = match?.answer || "Great question! For detailed help, contact Ahmed on WhatsApp at +923219088673 or through Fiverr/Upwork.";
    setTimeout(() => setMessages((prev) => [...prev, { role: "bot", text: reply }]), 500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage(input);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl shadow-glow flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
        style={{ background: "var(--gradient-hero)" }}
      >
        {open ? <X className="h-5 w-5 text-primary-foreground" /> : <MessageCircle className="h-5 w-5 text-primary-foreground" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl border-0 bg-card shadow-2xl flex flex-col max-h-[30rem] animate-fade-in overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-3" style={{ background: "var(--gradient-hero)" }}>
            <Sparkles className="h-5 w-5 text-primary-foreground" />
            <span className="font-display font-semibold text-primary-foreground">NexaFlow Assistant</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q.label}
                onClick={() => addMessage(q.label)}
                className="text-xs px-3 py-1.5 rounded-full border bg-accent/50 text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                {q.label}
              </button>
            ))}
          </div>

          <div className="border-t px-3 py-3 flex gap-2">
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="text-sm border-0 bg-muted/50"
            />
            <Button size="icon" variant="hero" onClick={handleSend}><Send className="h-4 w-4" /></Button>
          </div>

          <a
            href="https://wa.me/923219088673"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 text-xs text-muted-foreground hover:text-foreground border-t transition-colors"
          >
            <ExternalLink className="h-3 w-3" /> Continue on WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
