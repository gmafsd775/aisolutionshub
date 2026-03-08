import { Code2, Zap, Globe, BarChart3, Bot, Layers, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SKILLS = [
  { icon: Bot, label: "AI Automation", color: "from-violet-500/20 to-purple-500/20" },
  { icon: Zap, label: "n8n Workflows", color: "from-amber-500/20 to-orange-500/20" },
  { icon: Globe, label: "Digital Marketing", color: "from-blue-500/20 to-cyan-500/20" },
  { icon: Code2, label: "API Integration", color: "from-emerald-500/20 to-green-500/20" },
  { icon: BarChart3, label: "Analytics", color: "from-rose-500/20 to-pink-500/20" },
  { icon: Layers, label: "System Architecture", color: "from-indigo-500/20 to-blue-500/20" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">About Me</h1>
        <p className="text-muted-foreground text-lg">The mind behind NexaFlow AI</p>
      </div>

      <Card className="mb-10 border-0 shadow-card overflow-hidden">
        <CardContent className="p-8 md:p-10 relative">
          {/* Subtle accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Sparkles className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">Ahmed</h2>
                <p className="text-sm text-primary font-medium">Freelance AI & Automation Specialist</p>
              </div>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I specialize in building intelligent n8n automation workflows that combine the power of AI with practical business logic. My solutions help companies eliminate repetitive tasks, reduce errors, and scale operations effortlessly.
              </p>
              <p>
                With deep expertise in digital marketing and technical integration, I bridge the gap between complex automation platforms and real business outcomes. Every workflow is custom-built to solve specific problems and deliver measurable ROI.
              </p>
              <p>
                My approach is simple: understand your needs deeply, build fast, deliver reliably, and support continuously. Whether it's a simple notification system or a complex multi-step AI pipeline, I'm here to make it happen.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="font-display text-2xl font-bold mb-6">Skills & Expertise</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {SKILLS.map((s) => (
          <Card key={s.label} className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300 group">
            <CardContent className="p-5 flex flex-col items-center text-center gap-3">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display font-medium text-sm">{s.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
