import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Workflow, Shield, Clock, Bot, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWorkflows } from "@/lib/store";
import WorkflowCard from "@/components/WorkflowCard";

export default function Index() {
  const workflows = getWorkflows().slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-36 px-4 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary-glow/15 rounded-full blur-[120px]" />

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card/80 backdrop-blur-sm px-4 py-2 text-sm text-muted-foreground mb-8 animate-fade-in shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" /> AI-Powered Workflow Automation
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up leading-[1.1]">
            Automate Smarter with{" "}
            <span className="text-gradient">NexaFlow AI</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-slide-up max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: "0.1s" }}>
            Custom-built n8n workflows that eliminate repetitive tasks, reduce errors, and supercharge your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" variant="hero" asChild>
              <Link to="/workflows">Explore Solutions <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Get a Custom Quote</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {[
              { value: "50+", label: "Workflows Built" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "24h", label: "Avg. Delivery" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3">Why Choose NexaFlow AI?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">End-to-end automation solutions designed for real business impact.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Bot, title: "AI-Integrated Workflows", desc: "Harness GPT, Claude, and other AI models directly within your automation pipelines." },
              { icon: Shield, title: "Battle-Tested & Reliable", desc: "Every workflow is rigorously tested with error handling and monitoring built in." },
              { icon: Zap, title: "Rapid Deployment", desc: "Get your automation live within 24-48 hours with ongoing support and optimization." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border bg-card p-7 shadow-card hover:shadow-card-hover transition-all duration-300 group">
                <div className="mb-5 h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured workflows */}
      <section className="py-20 px-4" style={{ background: "var(--gradient-subtle)" }}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold">Featured Solutions</h2>
              <p className="text-muted-foreground mt-1">Ready-to-deploy automation workflows</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/workflows">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflows.map((w) => (
              <WorkflowCard key={w.id} workflow={w} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Button variant="outline" asChild>
              <Link to="/workflows">View All Solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Automate?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">Let's build the perfect workflow for your business. Get a free consultation today.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                  <a href="https://wa.me/923219088673" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
