import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Shield, Zap, Rocket, Star, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWorkflows } from "@/lib/store";
import WorkflowCard from "@/components/WorkflowCard";
import { Workflow } from "@/lib/types";

export default function Index() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    getWorkflows().then((data) => setWorkflows(data.slice(0, 4)));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-10 left-[10%] w-80 h-80 rounded-full blur-[120px] opacity-40" style={{ background: "hsl(255 85% 60%)" }} />
        <div className="absolute bottom-0 right-[15%] w-96 h-96 rounded-full blur-[140px] opacity-30" style={{ background: "hsl(340 82% 58%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20" style={{ background: "hsl(200 90% 55%)" }} />

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card/80 backdrop-blur-sm px-5 py-2.5 text-sm mb-8 animate-fade-in shadow-card">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">Intelligent Automation for Modern Business</span>
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 animate-slide-up leading-[1.05]">
            Smarter Work with{" "}
            <span className="text-gradient">AI Solutions</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-slide-up max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: "0.1s" }}>
            Custom n8n workflows that automate your business, boost productivity, and deliver results — all powered by cutting-edge AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" variant="hero" asChild>
              <Link to="/workflows">Explore Solutions <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Free Consultation</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 max-w-md mx-auto animate-slide-up" style={{ animationDelay: "0.35s" }}>
            {[
              { value: "50+", label: "Workflows", icon: Rocket, color: "text-primary" },
              { value: "98%", label: "Happy Clients", icon: Star, color: "text-accent" },
              { value: "24h", label: "Delivery", icon: TrendingUp, color: "text-secondary" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-card p-4 shadow-card">
                <s.icon className={`h-5 w-5 ${s.color} mx-auto mb-1`} />
                <div className="font-display text-xl md:text-2xl font-bold">{s.value}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">Why Us</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Everything You Need to Automate</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From simple tasks to complex AI pipelines — we build it all.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Bot, title: "AI-Powered Flows", desc: "GPT, Claude, and other models integrated directly into your automation pipelines.", gradient: "var(--gradient-hero)", shadow: "shadow-glow" },
              { icon: Shield, title: "Battle-Tested", desc: "Every workflow is rigorously tested with error handling and monitoring built in.", gradient: "var(--gradient-cool)", shadow: "" },
              { icon: Zap, title: "Rapid Delivery", desc: "Get your automation live within 24-48 hours with ongoing support included.", gradient: "var(--gradient-warm)", shadow: "" },
            ].map((f) => (
              <div key={f.title} className="rounded-3xl border bg-card p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group hover:-translate-y-1">
                <div className="mb-6 h-14 w-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ background: f.gradient, opacity: 0.15 }}>
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 px-4" style={{ background: "var(--gradient-subtle)" }}>
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">Popular</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Featured n8n Workflows</h2>
            </div>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/workflows">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflows.map((w, i) => (
              <WorkflowCard key={w.id} workflow={w} index={i} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Button variant="outline" asChild><Link to="/workflows">View All Solutions</Link></Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Ready to Transform Your Business?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto text-lg">Get a free consultation and let's build the perfect AI workflow for you.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-card text-foreground hover:bg-card/90 shadow-lg" asChild>
                  <Link to="/contact">Start Free Consultation</Link>
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
