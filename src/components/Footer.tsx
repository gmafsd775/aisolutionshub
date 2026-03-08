import { Link } from "react-router-dom";
import { Bot, ExternalLink, MessageCircle, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card mt-auto">
      <div className="glow-line" />
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 font-display font-bold text-xl mb-4">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-hero)" }}>
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-gradient">AI Solutions</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Smart automation workflows powered by n8n and AI. We help businesses automate, scale, and thrive.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-xs uppercase tracking-widest text-neon-cyan">Pages</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/workflows", label: "n8n Workflows" },
                { to: "/contact", label: "Contact" },
                { to: "/about", label: "About" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-muted-foreground hover:text-neon-purple transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-xs uppercase tracking-widest text-neon-pink">Connect</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="https://www.fiverr.com/s/pdRm5pG" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-neon-green transition-colors">
                <ExternalLink className="h-3.5 w-3.5" /> Fiverr
              </a>
              <a href="https://www.upwork.com/freelancers/~015ab5cef27524deca" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-neon-green transition-colors">
                <ExternalLink className="h-3.5 w-3.5" /> Upwork
              </a>
              <a href="https://wa.me/923219088673" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-neon-green transition-colors">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/50 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
          <span>© {new Date().getFullYear()} AI Solutions by Ahmed. All rights reserved.</span>
          <span className="flex items-center gap-1">Made with <Heart className="h-3 w-3 text-neon-pink" /> by Ahmed</span>
        </div>
      </div>
    </footer>
  );
}
