import { useState } from "react";
import { Mail, MessageCircle, ExternalLink, Clock } from "lucide-react";
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
    // In production, send to damha577@gmail.com and gmafsd775@gmail.com
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Contact Me</h1>
      <p className="text-muted-foreground mb-8">Have questions? Reach out through any of these channels.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Send a Message</h2>
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
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can I help?" rows={4} />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Direct Channels</h2>
              <a href="https://wa.me/923219088673" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full gap-2 justify-start">
                  <MessageCircle className="h-4 w-4 text-whatsapp" /> WhatsApp: +923219088673
                </Button>
              </a>
              <a href="https://www.fiverr.com/s/pdRm5pG" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full gap-2 justify-start">
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

          <Card>
            <CardContent className="p-6 flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Response Time</h3>
                <p className="text-sm text-muted-foreground">Usually within 2-4 hours</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-sm mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">damha577@gmail.com</p>
              <p className="text-sm text-muted-foreground">gmafsd775@gmail.com</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
