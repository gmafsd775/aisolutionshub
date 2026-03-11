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
        <div className="absolute inset-0 bg-grid opacity-40" />
        {/* Neon orbs */}
        <div className="absolute top-10 left-[10%] w-80 h-80 rounded-full blur-[140px] opacity-50" style={{ background: "hsl(270 100% 65%)" }} />
        <div className="absolute bottom-0 right-[15%] w-96 h-96 rounded-full blur-[160px] opacity-35" style={{ background: "hsl(330 100% 60%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[180px] opacity-20" style={{ background: "hsl(185 100% 55%)" }} />
        <div className="absolute top-[20%] right-[5%] w-40 h-40 rounded-full blur-[100px] opacity-30" style={{ background: "hsl(150 100% 50%)" }} />

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full neon-border bg-card/60 backdrop-blur-sm px-5 py-2.5 text-sm mb-8 animate-fade-in shadow-card">
            <Sparkles className="h-4 w-4 text-neon-pink" />
            <span className="text-muted-foreground">Intelligent Automation for Modern Business</span>
            <span className="h-2 w-2 rounded-full bg-neon-green animate-pulse" />
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
              { value: `${workflows.length}+`, label: "Workflows", icon: Rocket, borderColor: "hsl(270 100% 65% / 0.3)", glowColor: "shadow-glow" },
              { value: "98%", label: "Happy Clients", icon: Star, borderColor: "hsl(330 100% 60% / 0.3)", glowColor: "shadow-glow-accent" },
              { value: "24h", label: "Delivery", icon: TrendingUp, borderColor: "hsl(185 100% 55% / 0.3)", glowColor: "shadow-glow-cyan" },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl bg-card p-4 ${s.glowColor} transition-shadow duration-300 hover:scale-105 transform`} style={{ border: `1px solid ${s.borderColor}` }}>
                <s.icon className="h-5 w-5 text-neon-cyan mx-auto mb-1" />
                <div className="font-display text-xl md:text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[200px] opacity-15" style={{ background: "var(--gradient-hero)" }} />

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-neon-pink mb-3 block animate-fade-in">Why Us</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Everything You Need to <span className="text-gradient-neon">Automate</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">From simple tasks to complex AI pipelines — we build it all.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Bot, title: "AI-Powered Flows", desc: "GPT, Claude, and other models integrated directly into your automation pipelines.", gradient: "var(--gradient-hero)", border: "hsl(270 100% 65%)", iconColor: "text-neon-purple", shadowColor: "hsl(270 100% 65% / 0.15)", number: "01" },
              { icon: Shield, title: "Battle-Tested", desc: "Every workflow is rigorously tested with error handling and monitoring built in.", gradient: "var(--gradient-cool)", border: "hsl(185 100% 55%)", iconColor: "text-neon-cyan", shadowColor: "hsl(185 100% 55% / 0.15)", number: "02" },
              { icon: Zap, title: "Rapid Delivery", desc: "Get your automation live within 24-48 hours with ongoing support included.", gradient: "var(--gradient-warm)", border: "hsl(330 100% 60%)", iconColor: "text-neon-pink", shadowColor: "hsl(330 100% 60% / 0.15)", number: "03" },
            ].map((f, i) => (
              <div
                key={f.title}
                className="relative rounded-3xl p-[1px] group hover:-translate-y-2 transition-all duration-500"
                style={{
                  background: `linear-gradient(160deg, ${f.border} / 0.3, transparent 50%)`,
                }}
              >
                {/* Hover glow effect */}
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" style={{ background: f.shadowColor }} />
                
                <div className="relative rounded-3xl p-8 h-full" style={{ background: "var(--gradient-card)" }}>
                  {/* Step number */}
                  <span className="absolute top-6 right-6 font-display text-5xl font-extrabold opacity-[0.06] text-foreground select-none">{f.number}</span>
                  
                  {/* Icon with glow ring */}
                  <div className="relative mb-7">
                    <div className="h-14 w-14 rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: `${f.border} / 0.1` }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: f.gradient, opacity: 0.15 }} />
                      <f.icon className={`h-6 w-6 ${f.iconColor} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <div className="absolute -bottom-1 left-3 right-3 h-4 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" style={{ background: f.border }} />
                  </div>

                  <h3 className="font-display font-bold text-xl mb-3 text-foreground group-hover:text-gradient transition-colors duration-300">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  
                  {/* Bottom accent line */}
                  <div className="mt-6 h-[2px] w-12 rounded-full opacity-40 group-hover:w-full group-hover:opacity-80 transition-all duration-500" style={{ background: f.gradient }} />
                </div>
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
              <span className="text-xs font-bold uppercase tracking-widest text-neon-cyan mb-2 block">Popular</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Featured <span className="text-gradient-cool">n8n Workflows</span></h2>
            </div>
            <Button variant="ghost" asChild className="hidden sm:inline-flex text-neon-cyan hover:text-neon-purple">
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
            <div className="absolute inset-0 rounded-3xl" style={{ boxShadow: "inset 0 0 80px hsl(270 100% 65% / 0.2)" }} />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Ready to Transform Your Business?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto text-lg">Get a free consultation and let's build the perfect AI workflow for you.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-card text-foreground hover:bg-card/90 shadow-lg border border-primary/30" asChild>
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
