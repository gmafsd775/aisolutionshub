import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
}

export default function SEOHead({ title, description, path = "/", keywords }: SEOHeadProps) {
  useEffect(() => {
    document.title = title;
    
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", `https://aisolutionshub.lovable.app${path}`, true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = `https://aisolutionshub.lovable.app${path}`;
  }, [title, description, path, keywords]);

  return null;
}
