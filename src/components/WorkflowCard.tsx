import { Link } from "react-router-dom";
import { Play, DollarSign } from "lucide-react";
import { Workflow } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  workflow: Workflow;
}

export default function WorkflowCard({ workflow }: Props) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="aspect-video bg-muted relative flex items-center justify-center">
        {workflow.imageUrl ? (
          <img src={workflow.imageUrl} alt={workflow.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Play className="h-10 w-10" />
            <span className="text-xs">Workflow Preview</span>
          </div>
        )}
        {workflow.videoUrl && (
          <div className="absolute top-2 right-2 bg-foreground/70 text-primary-foreground rounded-full p-1.5">
            <Play className="h-3 w-3" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">{workflow.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{workflow.description}</p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 font-bold text-primary">
            <DollarSign className="h-4 w-4" />
            {workflow.price}
          </span>
          <Button size="sm" asChild>
            <Link to={`/buy/${workflow.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
