import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ label, path }: { label: string; path: string }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://damha577.online/" },
      { "@type": "ListItem", position: 2, name: label, item: `https://damha577.online${path}` },
    ],
  };
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
      <ol className="flex items-center gap-1.5">
        <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
        <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
        <li aria-current="page" className="text-foreground">{label}</li>
      </ol>
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </nav>
  );
}
