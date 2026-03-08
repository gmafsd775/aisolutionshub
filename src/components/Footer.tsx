import { Link } from "react-router-dom";
import { Zap, ExternalLink, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <Zap className="h-5 w-5 text-primary" />
              Ahmed's n8n Hub
            </div>
            <p className="text-sm text-muted-foreground">Professional n8n workflow automation solutions for your business.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link to="/workflows" className="hover:text-foreground transition-colors">Workflows</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="https://www.fiverr.com/s/pdRm5pG" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="h-4 w-4" /> Fiverr
              </a>
              <a href="https://www.upwork.com/freelancers/~015ab5cef27524deca" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="h-4 w-4" /> Upwork
              </a>
              <a href="https://wa.me/923219088673" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ahmed's n8n Automation Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
