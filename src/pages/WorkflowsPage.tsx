import { getWorkflows, isAuthenticated } from "@/lib/store";
import WorkflowCard from "@/components/WorkflowCard";
import OwnerDashboard from "@/components/OwnerDashboard";

export default function WorkflowsPage() {
  const workflows = getWorkflows();
  const authed = isAuthenticated();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Automation Solutions</h1>
        <p className="text-muted-foreground text-lg max-w-xl">Browse our library of ready-to-deploy n8n workflows designed to scale your business.</p>
      </div>

      {authed && (
        <div className="mb-12 p-6 rounded-2xl border-2 border-primary/20 bg-accent/50">
          <OwnerDashboard />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((w) => (
          <WorkflowCard key={w.id} workflow={w} />
        ))}
      </div>
    </div>
  );
}
