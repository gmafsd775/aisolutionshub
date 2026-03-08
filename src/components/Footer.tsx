import { Link } from "react-router-dom";
import { Sparkles, ExternalLink, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 font-display font-bold text-lg mb-3">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              NexaFlow<span className="text-primary">AI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">Intelligent automation solutions powered by n8n. Streamline your business with custom AI workflows.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Navigation</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors">Home</Link>
              <Link to="/workflows" className="text-foreground/70 hover:text-foreground transition-colors">Solutions</Link>
              <Link to="/contact" className="text-foreground/70 hover:text-foreground transition-colors">Contact</Link>
              <Link to="/about" className="text-foreground/70 hover:text-foreground transition-colors">About</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Connect</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="https://www.fiverr.com/s/pdRm5pG" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
                <ExternalLink className="h-3.5 w-3.5" /> Fiverr
              </a>
              <a href="https://www.upwork.com/freelancers/~015ab5cef27524deca" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
                <ExternalLink className="h-3.5 w-3.5" /> Upwork
              </a>
              <a href="https://wa.me/923219088673" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="border-t mt-10 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NexaFlow AI. Built by Ahmed. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
