import { Code2, Zap, Globe, BarChart3, Bot, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SKILLS = [
  { icon: Zap, label: "n8n Workflows" },
  { icon: Bot, label: "Automation" },
  { icon: Globe, label: "Digital Marketing" },
  { icon: Code2, label: "API Integration" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Layers, label: "System Design" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>

      <Card className="mb-8">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-xl font-bold mb-1">Ahmed</h2>
          <p className="text-sm text-primary font-medium mb-4">Freelance Technical Specialist & Digital Marketer</p>
          <div className="space-y-3 text-muted-foreground">
            <p>
              I specialize in building and selling custom n8n automation workflows that help businesses streamline their operations, save time, and reduce manual errors.
            </p>
            <p>
              With a strong background in digital marketing and technical integration, I bridge the gap between complex automation tools and real business outcomes. Every workflow I build is tailored to solve specific problems and deliver measurable results.
            </p>
            <p>
              My client-focused approach means clear communication, fast delivery, and ongoing support. Whether you need a simple email automation or a complex multi-step workflow, I'm here to help your business grow.
            </p>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Skills & Technologies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {SKILLS.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium text-sm">{s.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
