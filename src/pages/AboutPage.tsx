import { Code2, Zap, Globe, BarChart3, Bot, Layers, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";

const SKILLS = [
  { icon: Bot, label: "AI Automation", gradient: "var(--gradient-hero)", border: "hsl(270 100% 65% / 0.2)", iconColor: "text-neon-purple" },
  { icon: Zap, label: "n8n Workflows", gradient: "var(--gradient-warm)", border: "hsl(330 100% 60% / 0.2)", iconColor: "text-neon-pink" },
  { icon: Globe, label: "Digital Marketing", gradient: "var(--gradient-cool)", border: "hsl(185 100% 55% / 0.2)", iconColor: "text-neon-cyan" },
  { icon: Code2, label: "API Integration", gradient: "var(--gradient-fresh)", border: "hsl(150 100% 50% / 0.2)", iconColor: "text-neon-green" },
  { icon: BarChart3, label: "Analytics", gradient: "var(--gradient-warm)", border: "hsl(25 100% 55% / 0.2)", iconColor: "text-neon-orange" },
  { icon: Layers, label: "System Design", gradient: "var(--gradient-hero)", border: "hsl(270 100% 65% / 0.2)", iconColor: "text-neon-purple" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <SEOHead
        title="About Ahmed — AI & n8n Automation Expert | AI Solutions"
        description="Meet Ahmed, the AI and automation specialist behind AI Solutions. Expert in n8n workflows, GPT integration, API automation, and digital marketing."
        path="/about"
        keywords="Ahmed automation expert, n8n specialist, AI developer, automation freelancer"
      />
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-neon-pink mb-2 block">About</span>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">Meet <span className="text-gradient">Ahmed</span></h1>
        <p className="text-muted-foreground text-lg">The mind behind AI Solutions</p>
      </div>

      <Card className="mb-10 border-0 shadow-card rounded-3xl overflow-hidden neon-border">
        <div className="glow-line" />
        <CardContent className="p-8 md:p-10 relative">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[100px] opacity-20" style={{ background: "hsl(270 100% 65%)" }} />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-[80px] opacity-15" style={{ background: "hsl(185 100% 55%)" }} />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-2xl flex items-center justify-center animate-pulse-glow" style={{ background: "var(--gradient-hero)" }}>
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">Ahmed</h2>
                <p className="text-sm font-semibold text-gradient">AI & Automation Specialist</p>
              </div>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>I specialize in building intelligent n8n automation workflows that combine the power of AI with practical business logic. My solutions help companies eliminate repetitive tasks, reduce errors, and scale operations effortlessly.</p>
              <p>With deep expertise in digital marketing and technical integration, I bridge the gap between complex automation platforms and real business outcomes. Every workflow is custom-built to deliver measurable ROI.</p>
              <p>My approach: understand your needs deeply, build fast, deliver reliably, and support continuously. Whether it's a simple notification system or a complex multi-step AI pipeline — I make it happen.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <span className="text-xs font-bold uppercase tracking-widest text-neon-cyan mb-4 block">Expertise</span>
      <h2 className="font-display text-2xl font-bold mb-6">Skills & <span className="text-gradient-neon">Technologies</span></h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {SKILLS.map((s) => (
          <Card key={s.label} className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300 group hover:-translate-y-1 rounded-2xl" style={{ border: `1px solid ${s.border}` }}>
            <CardContent className="p-5 flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ background: s.gradient, opacity: 0.15 }}>
                <s.icon className={`h-6 w-6 ${s.iconColor}`} />
              </div>
              <span className="font-display font-semibold text-sm text-foreground">{s.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
