import { getWorkflows, isAuthenticated } from "@/lib/store";
import WorkflowCard from "@/components/WorkflowCard";
import OwnerDashboard from "@/components/OwnerDashboard";

export default function WorkflowsPage() {
  const workflows = getWorkflows();
  const authed = isAuthenticated();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Workflows</h1>
      <p className="text-muted-foreground mb-8">Browse ready-to-use n8n automation workflows.</p>

      {authed && (
        <div className="mb-10 p-6 rounded-xl border-2 border-primary/20 bg-primary/5">
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
