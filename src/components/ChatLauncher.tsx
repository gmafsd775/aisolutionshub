import { Suspense, lazy, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatbotWidget = lazy(() => import("./ChatbotWidget"));

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [chatOpened, setChatOpened] = useState(false);

  return (
    <>
      <button
        onClick={() => { setChatOpened(true); setOpen(!open); }}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl shadow-glow flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-glow"
        style={{ background: "var(--gradient-hero)" }}
      >
        {open ? <X className="h-5 w-5 text-primary-foreground" /> : <MessageCircle className="h-5 w-5 text-primary-foreground" />}
      </button>
      {chatOpened && (
        <Suspense fallback={null}>
          <ChatbotWidget open={open} />
        </Suspense>
      )}
    </>
  );
}
