import { Link } from "react-router-dom";
import { Play, DollarSign, ArrowUpRight, Sparkles } from "lucide-react";
import { Workflow } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CARD_GRADIENTS = [
  "linear-gradient(135deg, hsl(255 60% 97%), hsl(280 50% 96%))",
  "linear-gradient(135deg, hsl(200 60% 97%), hsl(230 50% 96%))",
  "linear-gradient(135deg, hsl(340 60% 97%), hsl(20 50% 96%))",
  "linear-gradient(135deg, hsl(160 60% 97%), hsl(200 50% 96%))",
];

interface Props {
  workflow: Workflow;
  index?: number;
}

export default function WorkflowCard({ workflow, index = 0 }: Props) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400 group border-0 hover:-translate-y-1">
      <div className="aspect-[16/10] relative flex items-center justify-center overflow-hidden" style={{ background: gradient }}>
        {workflow.imageUrl ? (
          <img src={workflow.imageUrl} alt={workflow.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="h-16 w-16 rounded-2xl flex items-center justify-center animate-float" style={{ background: "var(--gradient-hero)", opacity: 0.15 }}>
              <Sparkles className="h-7 w-7 text-primary" style={{ opacity: 1 }} />
            </div>
          </div>
        )}
        {workflow.videoUrl && (
          <div className="absolute top-3 right-3 glass-dark text-primary-foreground rounded-full p-2">
            <Play className="h-3 w-3" />
          </div>
        )}
        <div className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold glass-dark text-primary-foreground">
          ${workflow.price}
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-display font-semibold text-base mb-2 group-hover:text-primary transition-colors">{workflow.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">{workflow.description}</p>
        <Button size="sm" variant="hero" asChild className="w-full gap-2">
          <Link to={`/buy/${workflow.id}`}>View Details <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </Button>
      </CardContent>
    </Card>
  );
}
