import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAuthenticated, logout } from "@/lib/store";
import LoginModal from "./LoginModal";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/workflows", label: "Solutions" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const location = useLocation();
  const authed = isAuthenticated();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b glass">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span>NexaFlow<span className="text-primary">AI</span></span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {authed ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-3 gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            ) : (
              <Button variant="default" size="sm" onClick={() => setLoginOpen(true)} className="ml-3 gap-2">
                <LogIn className="h-4 w-4" /> Owner Login
              </Button>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t glass px-4 pb-4 animate-fade-in">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {authed ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="mt-2 w-full gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            ) : (
              <Button variant="default" size="sm" onClick={() => { setLoginOpen(true); setMobileOpen(false); }} className="mt-2 w-full gap-2">
                <LogIn className="h-4 w-4" /> Owner Login
              </Button>
            )}
          </div>
        )}
      </nav>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
