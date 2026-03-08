import { Link } from "react-router-dom";
import { ArrowRight, Zap, Workflow, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWorkflows } from "@/lib/store";
import WorkflowCard from "@/components/WorkflowCard";

export default function Index() {
  const workflows = getWorkflows().slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm text-muted-foreground mb-6 animate-fade-in">
            <Zap className="h-4 w-4 text-primary" /> Professional n8n Automation
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-slide-up text-balance">
            Welcome to Ahmed's n8n <span className="text-primary">Automation Hub</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 animate-slide-up max-w-2xl mx-auto" style={{ animationDelay: "0.1s" }}>
            Custom-built workflow solutions that save you time, reduce errors, and scale your business operations effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" asChild>
              <Link to="/workflows">Browse Workflows <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-card border-y">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Workflow, title: "Custom Workflows", desc: "Tailored n8n automations built for your specific business needs." },
              { icon: Shield, title: "Reliable & Tested", desc: "Every workflow is thoroughly tested before delivery." },
              { icon: Clock, title: "Fast Delivery", desc: "Quick turnaround with ongoing support and updates." },
            ].map((f) => (
              <div key={f.title} className="text-center p-6">
                <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured workflows */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Workflows</h2>
            <Button variant="ghost" asChild>
              <Link to="/workflows">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflows.map((w) => (
              <WorkflowCard key={w.id} workflow={w} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
