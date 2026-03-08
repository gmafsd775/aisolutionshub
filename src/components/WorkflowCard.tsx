import { Link } from "react-router-dom";
import { Play, DollarSign, ArrowUpRight } from "lucide-react";
import { Workflow } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  workflow: Workflow;
}

export default function WorkflowCard({ workflow }: Props) {
  return (
    <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group border-0">
      <div className="aspect-video relative flex items-center justify-center overflow-hidden" style={{ background: "var(--gradient-card)" }}>
        {workflow.imageUrl ? (
          <img src={workflow.imageUrl} alt={workflow.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center animate-float">
              <Play className="h-6 w-6 text-primary" />
            </div>
          </div>
        )}
        {workflow.videoUrl && (
          <div className="absolute top-3 right-3 bg-foreground/60 text-primary-foreground rounded-full p-2 backdrop-blur-sm">
            <Play className="h-3 w-3" />
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="font-display font-semibold text-base mb-1.5 group-hover:text-primary transition-colors">{workflow.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{workflow.description}</p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 font-display font-bold text-lg text-primary">
            <DollarSign className="h-4 w-4" />
            {workflow.price}
          </span>
          <Button size="sm" variant="hero" asChild>
            <Link to={`/buy/${workflow.id}`}>Details <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
