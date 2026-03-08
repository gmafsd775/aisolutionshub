import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAuthenticated, logout } from "@/lib/store";
import LoginModal from "./LoginModal";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/workflows", label: "Workflows" },
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
      <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <Zap className="h-6 w-6 text-primary" />
            <span>Ahmed's n8n Hub</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {authed ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2 gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            ) : (
              <Button variant="default" size="sm" onClick={() => setLoginOpen(true)} className="ml-2 gap-2">
                <LogIn className="h-4 w-4" /> Owner Login
              </Button>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-card px-4 pb-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-md text-sm font-medium ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
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
