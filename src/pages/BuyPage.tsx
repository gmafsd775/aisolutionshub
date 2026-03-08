import { useParams, Link } from "react-router-dom";
import { ArrowLeft, DollarSign, ExternalLink, MessageCircle, Mail } from "lucide-react";
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
        <h2 className="text-2xl font-bold mb-4">Workflow not found</h2>
        <Button asChild><Link to="/workflows">Back to Workflows</Link></Button>
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
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/workflows"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Workflows</Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Details */}
        <div>
          <div className="aspect-video rounded-lg bg-muted flex items-center justify-center mb-4 overflow-hidden">
            {workflow.videoUrl ? (
              <video controls className="w-full h-full object-cover" src={workflow.videoUrl} />
            ) : workflow.imageUrl ? (
              <img src={workflow.imageUrl} alt={workflow.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-muted-foreground text-sm">No preview available</span>
            )}
          </div>
          <h1 className="text-2xl font-bold mb-2">{workflow.title}</h1>
          <p className="text-muted-foreground mb-4">{workflow.description}</p>
          <div className="flex items-center gap-2 text-2xl font-bold text-primary">
            <DollarSign className="h-6 w-6" />{workflow.price}
          </div>
        </div>

        {/* Right: Purchase */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Purchase Options</h2>

          <div className="grid gap-3">
            <a href="https://www.fiverr.com/s/pdRm5pG" target="_blank" rel="noopener noreferrer">
              <Button className="w-full gap-2 bg-fiverr hover:bg-fiverr/90">
                <ExternalLink className="h-4 w-4" /> Buy on Fiverr
              </Button>
            </a>
            <a href="https://www.upwork.com/freelancers/~015ab5cef27524deca" target="_blank" rel="noopener noreferrer">
              <Button className="w-full gap-2 bg-upwork hover:bg-upwork/90">
                <ExternalLink className="h-4 w-4" /> Buy on Upwork
              </Button>
            </a>
            <a href="https://wa.me/923219088673" target="_blank" rel="noopener noreferrer">
              <Button className="w-full gap-2 bg-whatsapp hover:bg-whatsapp/90">
                <MessageCircle className="h-4 w-4" /> Message on WhatsApp
              </Button>
            </a>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            You can buy via Fiverr or Upwork, or message me directly on WhatsApp
          </p>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><Mail className="h-4 w-4" /> Express Interest</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Label>Gmail Address</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@gmail.com" />
                </div>
                <div>
                  <Label>Message (optional)</Label>
                  <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Any questions or requirements?" rows={3} />
                </div>
                <Button type="submit" className="w-full">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
