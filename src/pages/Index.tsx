import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Shield, Zap, Rocket, Star, TrendingUp, Sparkles, CheckCircle2, Users, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWorkflows } from "@/lib/store";
import WorkflowCard from "@/components/WorkflowCard";
import { Workflow } from "@/lib/types";
import SEOHead from "@/components/SEOHead";

export default function Index() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [allCount, setAllCount] = useState(0);

  useEffect(() => {
    getWorkflows().then((data) => {
      setAllCount(data.length);
      setWorkflows(data.slice(0, 4));
    });
  }, []);

  return (
    <div>
      <SEOHead
        title="AI Solutions — n8n Automation & AI Workflows"
        description="Custom n8n automation workflows powered by AI. Automate your business with GPT and Claude integrations. 24h delivery, 100% satisfaction guaranteed."
        path="/"
        keywords="n8n automation, AI workflows, business automation, GPT integration, custom workflows, AI solutions"
      />

      {/* Hero */}
      <section className="relative py-24 md:py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        {/* Animated neon orbs */}
        <div className="absolute top-10 left-[10%] w-60 h-60 rounded-full blur-[100px] opacity-40" style={{ background: "hsl(270 100% 65%)" }} />
        <div className="absolute bottom-0 right-[15%] w-72 h-72 rounded-full blur-[120px] opacity-30" style={{ background: "hsl(330 100% 60%)" }} />

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
            Custom <strong className="text-foreground">n8n workflows</strong> that automate your business, boost productivity, and deliver results — all powered by cutting-edge <strong className="text-foreground">AI</strong>.
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
              { value: `${allCount}+`, label: "Workflows", icon: Rocket, borderColor: "hsl(270 100% 65% / 0.3)", glowColor: "shadow-glow" },
              { value: "98%", label: "Happy Clients", icon: Star, borderColor: "hsl(330 100% 60% / 0.3)", glowColor: "shadow-glow-accent" },
              { value: "24h", label: "Delivery", icon: TrendingUp, borderColor: "hsl(185 100% 55% / 0.3)", glowColor: "shadow-glow-cyan" },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl bg-card p-4 ${s.glowColor} transition-all duration-300 hover:scale-105 transform`} style={{ border: `1px solid ${s.borderColor}` }}>
                <s.icon className="h-5 w-5 text-neon-cyan mx-auto mb-1" />
                <div className="font-display text-xl md:text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges / Social Proof Bar */}
      <section className="py-8 px-4 border-y border-border/30" style={{ background: "var(--gradient-subtle)" }}>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-muted-foreground">
            {[
              { icon: CheckCircle2, text: "Verified on Fiverr & Upwork", color: "text-neon-green" },
              { icon: Users, text: "Trusted by Global Clients", color: "text-neon-cyan" },
              { icon: Clock, text: "24-48h Turnaround", color: "text-neon-pink" },
              { icon: Award, text: "100% Satisfaction Guarantee", color: "text-neon-purple" },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-sm font-medium">
                <badge.icon className={`h-4 w-4 ${badge.color}`} />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[200px] opacity-15" style={{ background: "var(--gradient-hero)" }} />

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-neon-pink mb-3 block animate-fade-in">Why Choose Us</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Everything You Need to <span className="text-gradient-neon">Automate</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">From simple tasks to complex AI pipelines — we build it all with precision and speed.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Bot, title: "AI-Powered Flows", desc: "GPT, Claude, and other AI models integrated directly into your n8n automation pipelines for intelligent decision-making.", gradient: "var(--gradient-hero)", border: "hsl(270 100% 65%)", iconColor: "text-neon-purple", shadowColor: "hsl(270 100% 65% / 0.15)", number: "01" },
              { icon: Shield, title: "Battle-Tested & Reliable", desc: "Every workflow is rigorously tested with built-in error handling, retry logic, and real-time monitoring.", gradient: "var(--gradient-cool)", border: "hsl(185 100% 55%)", iconColor: "text-neon-cyan", shadowColor: "hsl(185 100% 55% / 0.15)", number: "02" },
              { icon: Zap, title: "Rapid 24h Delivery", desc: "Get your custom automation live within 24-48 hours with ongoing support and free revisions included.", gradient: "var(--gradient-warm)", border: "hsl(330 100% 60%)", iconColor: "text-neon-pink", shadowColor: "hsl(330 100% 60% / 0.15)", number: "03" },
            ].map((f) => (
              <div
                key={f.title}
                className="relative rounded-3xl p-[1px] group hover:-translate-y-2 transition-all duration-500"
                style={{
                  background: `linear-gradient(160deg, ${f.border} / 0.3, transparent 50%)`,
                }}
              >
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" style={{ background: f.shadowColor }} />
                
                <div className="relative rounded-3xl p-8 h-full" style={{ background: "var(--gradient-card)" }}>
                  <span className="absolute top-6 right-6 font-display text-5xl font-extrabold opacity-[0.06] text-foreground select-none">{f.number}</span>
                  
                  <div className="relative mb-7">
                    <div className="h-14 w-14 rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: `${f.border} / 0.1` }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: f.gradient, opacity: 0.15 }} />
                      <f.icon className={`h-6 w-6 ${f.iconColor} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <div className="absolute -bottom-1 left-3 right-3 h-4 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" style={{ background: f.border }} />
                  </div>

                  <h3 className="font-display font-bold text-xl mb-3 text-foreground group-hover:text-gradient transition-colors duration-300">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  
                  <div className="mt-6 h-[2px] w-12 rounded-full opacity-40 group-hover:w-full group-hover:opacity-80 transition-all duration-500" style={{ background: f.gradient }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ background: "var(--gradient-subtle)" }}>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-neon-green mb-3 block">Simple Process</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">How It <span className="text-gradient-cool">Works</span></h2>
            <p className="text-muted-foreground max-w-lg mx-auto">From idea to live automation in 3 easy steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Tell Us Your Needs", desc: "Share your business challenge via WhatsApp, email, or the contact form. We'll analyze your workflow.", color: "text-neon-cyan", border: "hsl(185 100% 55% / 0.25)" },
              { step: "02", title: "We Build & Test", desc: "Our team designs a custom n8n workflow with AI integration, fully tested with error handling.", color: "text-neon-pink", border: "hsl(330 100% 60% / 0.25)" },
              { step: "03", title: "Deploy & Support", desc: "Get your automation live within 24h with documentation, training, and ongoing support.", color: "text-neon-green", border: "hsl(150 100% 50% / 0.25)" },
            ].map((s) => (
              <div key={s.step} className="relative rounded-2xl p-6 text-center group hover:-translate-y-1 transition-all duration-300" style={{ background: "var(--gradient-card)", border: `1px solid ${s.border}` }}>
                <div className={`font-display text-4xl font-extrabold ${s.color} opacity-30 mb-3`}>{s.step}</div>
                <h3 className="font-display font-bold text-lg mb-2 text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workflows */}
      <section className="py-20 px-4">
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

      {/* Testimonial / Trust */}
      <section className="py-20 px-4" style={{ background: "var(--gradient-subtle)" }}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-neon-orange mb-3 block">What Clients Say</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold">Trusted by <span className="text-gradient-warm">Businesses Worldwide</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { quote: "Ahmed built an AI-powered lead qualification workflow that saved us 20+ hours per week. Incredible quality and speed!", name: "Sarah K.", role: "Marketing Director", stars: 5 },
              { quote: "The n8n automation Ahmed created streamlined our entire customer onboarding. Best investment we've made this year.", name: "David M.", role: "Startup Founder", stars: 5 },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl p-6 relative overflow-hidden" style={{ background: "var(--gradient-card)", border: "1px solid hsl(270 100% 65% / 0.15)" }}>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-neon-orange text-neon-orange" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
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
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto text-lg">Get a free consultation and let's build the perfect AI-powered n8n workflow for you.</p>
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

      {/* Internal Links Section for SEO */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <nav aria-label="Quick links" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/workflows" className="rounded-2xl p-5 text-center group hover:-translate-y-1 transition-all duration-300" style={{ background: "var(--gradient-card)", border: "1px solid hsl(270 100% 65% / 0.15)" }}>
              <Zap className="h-6 w-6 text-neon-purple mx-auto mb-2" />
              <span className="font-display font-semibold text-sm text-foreground">All Workflows</span>
              <p className="text-xs text-muted-foreground mt-1">Browse our automation library</p>
            </Link>
            <Link to="/contact" className="rounded-2xl p-5 text-center group hover:-translate-y-1 transition-all duration-300" style={{ background: "var(--gradient-card)", border: "1px solid hsl(185 100% 55% / 0.15)" }}>
              <Shield className="h-6 w-6 text-neon-cyan mx-auto mb-2" />
              <span className="font-display font-semibold text-sm text-foreground">Get in Touch</span>
              <p className="text-xs text-muted-foreground mt-1">Free consultation available</p>
            </Link>
            <Link to="/about" className="rounded-2xl p-5 text-center group hover:-translate-y-1 transition-all duration-300" style={{ background: "var(--gradient-card)", border: "1px solid hsl(330 100% 60% / 0.15)" }}>
              <Bot className="h-6 w-6 text-neon-pink mx-auto mb-2" />
              <span className="font-display font-semibold text-sm text-foreground">About Ahmed</span>
              <p className="text-xs text-muted-foreground mt-1">Learn about our expertise</p>
            </Link>
            <a href="https://wa.me/923219088673" target="_blank" rel="noopener noreferrer" className="rounded-2xl p-5 text-center group hover:-translate-y-1 transition-all duration-300" style={{ background: "var(--gradient-card)", border: "1px solid hsl(150 100% 50% / 0.15)" }}>
              <Rocket className="h-6 w-6 text-neon-green mx-auto mb-2" />
              <span className="font-display font-semibold text-sm text-foreground">WhatsApp</span>
              <p className="text-xs text-muted-foreground mt-1">Chat with us directly</p>
            </a>
          </nav>
        </div>
      </section>
    </div>
  );
}
