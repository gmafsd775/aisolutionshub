import { useParams, Link } from "react-router-dom";
import { ArrowLeft, DollarSign, ExternalLink, MessageCircle, Mail, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { getWorkflowById } from "@/lib/store";
import { useState } from "react";
import { toast } from "sonner";

export default function BuyPage() {
  const { id } = useParams<{ id: string }>();
  const workflow = getWorkflowById(id || "");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (!workflow) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-2xl font-bold mb-4">Workflow not found</h2>
        <Button asChild><Link to="/workflows">Back to Solutions</Link></Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Email is required"); return; }
    toast.success("Interest submitted! We'll reach out shortly.");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Button variant="ghost" asChild className="mb-8">
        <Link to="/workflows"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Solutions</Link>
      </Button>

      <div className="grid md:grid-cols-5 gap-10">
        {/* Left: Details - 3 cols */}
        <div className="md:col-span-3">
          <div className="aspect-video rounded-2xl bg-muted flex items-center justify-center overflow-hidden shadow-card" style={{ background: "var(--gradient-card)" }}>
            {workflow.videoUrl ? (
              <video controls className="w-full h-full object-cover rounded-2xl" src={workflow.videoUrl} />
            ) : workflow.imageUrl ? (
              <img src={workflow.imageUrl} alt={workflow.title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center animate-float">
                  <Play className="h-7 w-7 text-primary" />
                </div>
                <span className="text-sm">Preview</span>
              </div>
            )}
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold mt-6 mb-3">{workflow.title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-5">{workflow.description}</p>
          <div className="flex items-center gap-2 font-display text-3xl font-bold text-gradient">
            <DollarSign className="h-7 w-7" />{workflow.price}
          </div>
        </div>

        {/* Right: Purchase - 2 cols */}
        <div className="md:col-span-2 space-y-5">
          <h2 className="font-display text-lg font-semibold">Purchase Options</h2>

          <div className="grid gap-3">
            <a href="https://www.fiverr.com/s/pdRm5pG" target="_blank" rel="noopener noreferrer">
              <Button className="w-full gap-2 bg-fiverr hover:bg-fiverr/90 text-primary-foreground">
                <ExternalLink className="h-4 w-4" /> Buy on Fiverr
              </Button>
            </a>
            <a href="https://www.upwork.com/freelancers/~015ab5cef27524deca" target="_blank" rel="noopener noreferrer">
              <Button className="w-full gap-2 bg-upwork hover:bg-upwork/90 text-primary-foreground">
                <ExternalLink className="h-4 w-4" /> Buy on Upwork
              </Button>
            </a>
            <a href="https://wa.me/923219088673" target="_blank" rel="noopener noreferrer">
              <Button className="w-full gap-2 bg-whatsapp hover:bg-whatsapp/90 text-primary-foreground">
                <MessageCircle className="h-4 w-4" /> Message on WhatsApp
              </Button>
            </a>
          </div>

          <p className="text-xs text-muted-foreground text-center py-1">
            Purchase via Fiverr, Upwork, or message directly on WhatsApp
          </p>

          <Card className="border-0 shadow-card">
            <CardContent className="p-5">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> Express Interest</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Label>Gmail Address</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@gmail.com" />
                </div>
                <div>
                  <Label>Message (optional)</Label>
                  <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Questions or requirements?" rows={3} />
                </div>
                <Button type="submit" variant="hero" className="w-full">Submit Interest</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
