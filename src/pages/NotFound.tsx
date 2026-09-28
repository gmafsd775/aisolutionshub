import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const LINKS = [
  { to: "/", label: "Home page" },
  { to: "/workflows", label: "Browse n8n workflows" },
  { to: "/contact", label: "Contact Ahmed" },
  { to: "/about", label: "About AI Solutions" },
];

const NotFound = () => (
  <section className="flex min-h-[70vh] items-center justify-center px-4">
    <SEOHead title="Page Not Found | AI Solutions" description="The page you are looking for does not exist. Explore n8n automation workflows, contact Ahmed, or return to the AI Solutions home page." path="/404" />
    <div className="text-center max-w-md">
      <h1 className="font-display mb-3 text-5xl font-bold text-gradient">404</h1>
      <p className="mb-6 text-lg text-muted-foreground">Sorry, we couldn't find that page. Try one of these instead:</p>
      <ul className="grid gap-2">
        {LINKS.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="block rounded-xl border border-border/50 px-4 py-3 text-foreground hover:bg-muted/60 transition-colors">{l.label}</Link>
          </li>
        ))}
        <li>
          <a href="/sitemap.xml" className="block px-4 py-3 text-sm text-muted-foreground underline">View the sitemap</a>
        </li>
      </ul>
    </div>
  </section>
);

export default NotFound;
