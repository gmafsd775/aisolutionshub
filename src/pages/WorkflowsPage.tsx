import { useState, useEffect } from "react";
import { getWorkflows } from "@/lib/store";
import { getSession } from "@/lib/store";
import WorkflowCard from "@/components/WorkflowCard";
import OwnerDashboard from "@/components/OwnerDashboard";
import { Workflow } from "@/lib/types";

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    getWorkflows().then(setWorkflows);
    getSession().then((s) => setAuthed(!!s));
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">Browse</span>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">n8n Workflows</h1>
        <p className="text-muted-foreground text-lg max-w-xl">Ready-to-deploy n8n automation workflows designed to supercharge your operations.</p>
      </div>

      {authed && (
        <div className="mb-12 p-6 rounded-3xl border-2 border-primary/20" style={{ background: "var(--gradient-card)" }}>
          <OwnerDashboard onChanged={() => getWorkflows().then(setWorkflows)} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((w, i) => (
          <WorkflowCard key={w.id} workflow={w} index={i} />
        ))}
      </div>
    </div>
  );
}
