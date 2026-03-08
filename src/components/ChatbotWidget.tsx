import { useState } from "react";
import { MessageCircle, X, Send, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const QUICK_REPLIES = [
  { label: "How do I buy a workflow?", answer: "You can purchase workflows through Fiverr, Upwork, or contact me directly on WhatsApp at +923219088673." },
  { label: "What is n8n?", answer: "n8n is a powerful workflow automation tool that connects apps and services. I build custom n8n workflows to automate your business processes." },
  { label: "Custom workflow?", answer: "Yes! I build custom workflows tailored to your needs. Reach out on WhatsApp or through Fiverr/Upwork to discuss your project." },
  { label: "Pricing?", answer: "Prices vary by workflow complexity. Browse the Workflows page for listed prices, or contact me for custom quotes." },
];

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm here to help you with n8n workflows. Ask me anything or use a quick reply below." },
  ]);
  const [input, setInput] = useState("");

  const addMessage = (text: string, fromUser = true) => {
    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    const match = QUICK_REPLIES.find((q) => text.toLowerCase().includes(q.label.toLowerCase().slice(0, 10)));
    const botReply = match?.answer || "Thanks for your message! For detailed help, contact me on WhatsApp at +923219088673 or through Fiverr/Upwork.";

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    }, 600);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage(input);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary shadow-lg flex items-center justify-center text-primary-foreground hover:scale-105 transition-transform"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-xl border bg-card shadow-2xl flex flex-col max-h-[28rem] animate-fade-in">
          <div className="px-4 py-3 border-b font-semibold text-sm flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-primary" /> Chat with us
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="px-4 pb-2 flex flex-wrap gap-1">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q.label}
                onClick={() => addMessage(q.label)}
                className="text-xs px-2 py-1 rounded-full border bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="border-t px-3 py-2 flex gap-2">
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="text-sm"
            />
            <Button size="icon" onClick={handleSend}><Send className="h-4 w-4" /></Button>
          </div>

          {/* WhatsApp link */}
          <a
            href="https://wa.me/923219088673"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground hover:text-foreground border-t transition-colors"
          >
            <ExternalLink className="h-3 w-3" /> Continue on WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
