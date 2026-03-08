import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, DollarSign, ExternalLink, MessageCircle, Mail, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { getWorkflowById } from "@/lib/store";
import { Workflow } from "@/lib/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function BuyPage() {
  const { id } = useParams<{ id: string }>();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getWorkflowById(id || "").then((w) => {
      setWorkflow(w || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-20 text-center"><p className="text-muted-foreground">Loading...</p></div>;
  }

  if (!workflow) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-2xl font-bold mb-4">Solution not found</h2>
        <Button asChild><Link to="/workflows">Back to Solutions</Link></Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Email is required"); return; }
    toast.success("Interest submitted! We'll reach out shortly.");
    setEmail(""); setMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Button variant="ghost" asChild className="mb-8">
        <Link to="/workflows"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Solutions</Link>
      </Button>

      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-3">
          <div className="aspect-video rounded-3xl flex items-center justify-center overflow-hidden shadow-card" style={{ background: "var(--gradient-card)" }}>
            {workflow.videoUrl ? (
              <video controls className="w-full h-full object-cover rounded-3xl" src={workflow.videoUrl} />
            ) : workflow.imageUrl ? (
              <img src={workflow.imageUrl} alt={workflow.title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <div className="h-20 w-20 rounded-2xl flex items-center justify-center animate-float" style={{ background: "var(--gradient-hero)", opacity: 0.15 }}>
                  <Sparkles className="h-9 w-9 text-primary" />
                </div>
                <span className="text-sm">Preview Coming Soon</span>
              </div>
            )}
          </div>
          <h1 className="font-display text-2xl md:text-4xl font-bold mt-6 mb-3">{workflow.title}</h1>
          <p className="text-muted-foreground leading-relaxed text-lg mb-5">{workflow.description}</p>
          <div className="inline-flex items-center gap-2 font-display text-3xl font-bold rounded-2xl px-5 py-3" style={{ background: "var(--gradient-hero)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            <DollarSign className="h-7 w-7" style={{ WebkitTextFillColor: "initial", color: "hsl(var(--primary))" }} />{workflow.price}
          </div>
        </div>

        <div className="md:col-span-2 space-y-5">
          <h2 className="font-display text-lg font-bold">Get This Solution</h2>

          <div className="grid gap-3">
            <a href="https://www.fiverr.com/s/pdRm5pG" target="_blank" rel="noopener noreferrer">
              <Button className="w-full gap-2 bg-fiverr hover:bg-fiverr/90 text-primary-foreground rounded-xl h-12">
                <ExternalLink className="h-4 w-4" /> Buy on Fiverr
              </Button>
            </a>
            <a href="https://www.upwork.com/freelancers/~015ab5cef27524deca" target="_blank" rel="noopener noreferrer">
              <Button className="w-full gap-2 bg-upwork hover:bg-upwork/90 text-primary-foreground rounded-xl h-12">
                <ExternalLink className="h-4 w-4" /> Buy on Upwork
              </Button>
            </a>
            <a href="https://wa.me/923219088673" target="_blank" rel="noopener noreferrer">
              <Button className="w-full gap-2 bg-whatsapp hover:bg-whatsapp/90 text-primary-foreground rounded-xl h-12">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </Button>
            </a>
          </div>

          <p className="text-xs text-muted-foreground text-center py-1">Purchase via Fiverr, Upwork, or message directly</p>

          <Card className="border-0 shadow-card rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-display font-bold mb-4 flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> Express Interest</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@gmail.com" /></div>
                <div><Label>Message (optional)</Label><Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Questions?" rows={3} /></div>
                <Button type="submit" variant="hero" className="w-full">Submit Interest</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
