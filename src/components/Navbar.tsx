import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession, signOut } from "@/lib/store";
import LoginModal from "./LoginModal";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/workflows", label: "n8n Workflows" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    getSession().then((s) => setAuthed(!!s));
  }, []);

  const handleLogout = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b glass">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-xl">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-hero)" }}>
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-gradient">AI Solutions</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >{link.label}</Link>
            ))}
            {authed ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-3 gap-2"><LogOut className="h-4 w-4" /> Logout</Button>
            ) : (
              <Button variant="hero" size="sm" onClick={() => setLoginOpen(true)} className="ml-3 gap-2"><LogIn className="h-4 w-4" /> Owner</Button>
            )}
          </div>

          <button className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t glass px-4 pb-4 animate-fade-in">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === link.to ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
              >{link.label}</Link>
            ))}
            {authed ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="mt-2 w-full gap-2"><LogOut className="h-4 w-4" /> Logout</Button>
            ) : (
              <Button variant="hero" size="sm" onClick={() => { setLoginOpen(true); setMobileOpen(false); }} className="mt-2 w-full gap-2"><LogIn className="h-4 w-4" /> Owner</Button>
            )}
          </div>
        )}
      </nav>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
