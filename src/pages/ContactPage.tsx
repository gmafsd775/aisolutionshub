import { useState } from "react";
import { Mail, MessageCircle, ExternalLink, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Let's Connect</h1>
        <p className="text-muted-foreground text-lg">Have a project in mind? I'd love to hear about it.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-0 shadow-card">
          <CardContent className="p-7">
            <h2 className="font-display font-semibold text-lg mb-5">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..." rows={4} />
              </div>
              <Button type="submit" variant="hero" className="w-full gap-2">
                <Send className="h-4 w-4" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="border-0 shadow-card">
            <CardContent className="p-6 space-y-3">
              <h2 className="font-display font-semibold text-lg mb-2">Direct Channels</h2>
              <a href="https://wa.me/923219088673" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full gap-2 justify-start mb-2">
                  <MessageCircle className="h-4 w-4 text-whatsapp" /> WhatsApp: +923219088673
                </Button>
              </a>
              <a href="https://www.fiverr.com/s/pdRm5pG" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full gap-2 justify-start mb-2">
                  <ExternalLink className="h-4 w-4 text-fiverr" /> Fiverr Profile
                </Button>
              </a>
              <a href="https://www.upwork.com/freelancers/~015ab5cef27524deca" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full gap-2 justify-start">
                  <ExternalLink className="h-4 w-4 text-upwork" /> Upwork Profile
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm">Fast Response</h3>
                <p className="text-sm text-muted-foreground">Typically within 2-4 hours</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="font-display font-semibold text-sm">Email</h3>
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
