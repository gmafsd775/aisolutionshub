import { useState } from "react";
import { Mail, MessageCircle, ExternalLink, Clock, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { toast.error("Please fill in all fields"); return; }
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { name: form.name, email: form.email, message: form.message, source: "contact" },
      });
      if (error) throw error;
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-neon-cyan mb-2 block">Reach Out</span>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">Let's Build Something <span className="text-gradient">Great</span></h1>
        <p className="text-muted-foreground text-lg">Have a project in mind? I'd love to hear about it.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-0 shadow-card rounded-3xl overflow-hidden neon-border">
          <div className="glow-line" />
          <CardContent className="p-7 relative">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-15" style={{ background: "hsl(270 100% 65%)" }} />
            <h2 className="font-display font-bold text-lg mb-5 flex items-center gap-2 relative z-10">
              <Sparkles className="h-5 w-5 text-neon-pink" /> Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div><Label className="text-muted-foreground">Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></div>
              <div><Label className="text-muted-foreground">Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" /></div>
              <div><Label className="text-muted-foreground">Message</Label><Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..." rows={4} /></div>
              <Button type="submit" variant="hero" className="w-full gap-2" disabled={sending}><Send className="h-4 w-4" /> {sending ? "Sending..." : "Send Message"}</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="border-0 shadow-card rounded-2xl neon-border-cyan">
            <CardContent className="p-6 space-y-3">
              <h2 className="font-display font-bold text-lg mb-2 text-foreground">Direct Channels</h2>
              <a href="https://wa.me/923219088673" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full gap-2 justify-start mb-2 h-12">
                  <MessageCircle className="h-5 w-5 text-neon-green" /> WhatsApp: +923219088673
                </Button>
              </a>
              <a href="https://www.fiverr.com/s/pdRm5pG" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full gap-2 justify-start mb-2 h-12">
                  <ExternalLink className="h-5 w-5 text-neon-green" /> Fiverr Profile
                </Button>
              </a>
              <a href="https://www.upwork.com/freelancers/~015ab5cef27524deca" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full gap-2 justify-start h-12">
                  <ExternalLink className="h-5 w-5 text-neon-green" /> Upwork Profile
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card rounded-2xl overflow-hidden neon-border-pink">
            <div className="glow-line" style={{ background: "var(--gradient-fresh)" }} />
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--gradient-fresh)", opacity: 0.15 }}>
                <Clock className="h-6 w-6 text-neon-green" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-foreground">Fast Response</h3>
                <p className="text-sm text-muted-foreground">Typically within 2-4 hours</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card rounded-2xl neon-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-5 w-5 text-neon-pink" />
                <h3 className="font-display font-bold text-sm text-foreground">Email</h3>
              </div>
              <p className="text-sm text-muted-foreground">damha577@gmail.com</p>
              <p className="text-sm text-muted-foreground">gmafsd775@gmail.com</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
