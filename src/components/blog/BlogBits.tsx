import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDown, ChevronRight, Calendar, Clock, Linkedin, Facebook, MessageCircle } from "lucide-react";
import { author } from "@/config/author";
import { BlogPost, excerpt, formatDate, readTime, tagSlug, uniqueId, extractHeadings, SITE } from "@/lib/blog";

export function TagChip({ tag }: { tag: string }) {
  return (
    <Link to={`/blog/tag/${tagSlug(tag)}/`} className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-neon-cyan border border-primary/20 hover:bg-primary/20 transition-colors">
      #{tag}
    </Link>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  const hasImg = !!post.cover_image_url;
  return (
    <article className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1" style={{ background: "var(--gradient-card)", border: "1px solid hsl(270 100% 65% / 0.15)" }}>
      {hasImg && (
        <Link to={`/blog/${post.slug}/`} className="block aspect-[1200/630] overflow-hidden bg-muted">
          <img src={post.cover_image_url!} alt={post.title} loading="lazy" width={1200} height={630} className="h-full w-full object-cover" />
        </Link>
      )}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h2 className={`font-display font-bold leading-snug ${hasImg ? "text-xl" : "text-2xl"}`}>
          <Link to={`/blog/${post.slug}/`} className="hover:text-neon-purple transition-colors">{post.title}</Link>
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{excerpt(post)}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(post.published_at)}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{readTime(post.body)}</span>
        </div>
        {post.tags.length > 0 && <div className="flex flex-wrap gap-2">{post.tags.map((t) => <TagChip key={t} tag={t} />)}</div>}
      </div>
    </article>
  );
}

export function BlogBreadcrumbs({ items }: { items: { label: string; path?: string }[] }) {
  const all = [{ label: "Home", path: "/" }, ...items];
  const ld = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, ...(it.path ? { item: SITE + it.path } : {}) })),
  };
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {it.path && i < all.length - 1 ? <Link to={it.path} className="hover:text-foreground transition-colors">{it.label}</Link> : <span aria-current="page" className="text-foreground line-clamp-1">{it.label}</span>}
          </li>
        ))}
      </ol>
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </nav>
  );
}

export function Markdown({ body }: { body: string }) {
  const seen: Record<string, number> = {};
  const text = (c: any): string => (Array.isArray(c) ? c.map(text).join("") : typeof c === "string" ? c : c?.props ? text(c.props.children) : "");
  return (
    <div className="blog-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
        h2: ({ children }) => <h2 id={uniqueId(text(children), seen)}>{children}</h2>,
        h3: ({ children }) => <h3 id={uniqueId(text(children), seen)}>{children}</h3>,
        a: ({ href, children }) => <a href={href} {...(href?.startsWith("http") && !href.startsWith(SITE) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>,
        img: ({ src, alt }) => <img src={src} alt={alt || ""} loading="lazy" />,
        table: ({ children }) => <div className="overflow-x-auto"><table>{children}</table></div>,
      }}>{body}</ReactMarkdown>
    </div>
  );
}

export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div aria-hidden="true" className="fixed top-0 left-0 z-[60] h-[3px]" style={{ width: `${p}%`, background: "var(--gradient-hero)", boxShadow: "0 0 8px hsl(var(--primary))" }} />;
}

export function TOC({ body, variant }: { body: string; variant: "desktop" | "mobile" }) {
  const heads = extractHeadings(body);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!heads.length) return;
    const obs = new IntersectionObserver((es) => {
      const vis = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setActive(vis[0].target.id);
    }, { rootMargin: "-80px 0px -70% 0px" });
    heads.forEach((h) => { const el = document.getElementById(h.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [body]);
  if (heads.length < 2) return null;
  const list = (
    <ol className="space-y-1.5 text-sm">
      {heads.map((h) => (
        <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
          <a href={`#${h.id}`} onClick={() => setOpen(false)} className={`block py-0.5 transition-colors ${active === h.id ? "text-neon-cyan font-medium" : "text-muted-foreground hover:text-foreground"}`}>{h.text}</a>
        </li>
      ))}
    </ol>
  );
  const box = "rounded-2xl p-5 border border-primary/20";
  if (variant === "desktop") {
    return <nav aria-label="Table of contents" className={`${box} sticky top-24`} style={{ background: "var(--gradient-card)" }}><p className="font-display font-semibold text-xs uppercase tracking-widest text-neon-purple mb-3">On this page</p>{list}</nav>;
  }
  return (
    <nav aria-label="Table of contents" className={`${box} mb-8`} style={{ background: "var(--gradient-card)" }}>
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="w-full flex items-center justify-between font-display font-semibold text-sm">
        Table of contents <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-3">{list}</div>}
    </nav>
  );
}

export function FaqSection({ faq }: { faq: { question: string; answer: string }[] }) {
  const items = faq.filter((f) => f.question?.trim() && f.answer?.trim());
  if (!items.length) return null;
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-display text-2xl font-bold mb-5">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {items.map((f, i) => (
          <details key={i} className="group rounded-xl border border-primary/20 p-4" style={{ background: "var(--gradient-card)" }}>
            <summary className="cursor-pointer list-none flex items-center justify-between font-medium">
              {f.question}<ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-muted-foreground leading-relaxed whitespace-pre-line">{f.answer}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </section>
  );
}

export function AuthorCard() {
  return (
    <aside className="mt-12 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 neon-border" style={{ background: "var(--gradient-card)" }}>
      <div aria-hidden="true" className="h-16 w-16 shrink-0 rounded-full flex items-center justify-center font-display font-bold text-xl text-primary-foreground animate-pulse-glow" style={{ background: "var(--gradient-hero)" }}>{author.initials}</div>
      <div>
        <p className="font-display font-bold text-lg">{author.name}</p>
        <p className="text-sm text-neon-cyan mb-2">{author.title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{author.bio}</p>
        <Link to={author.aboutLink} className="inline-block mt-3 text-sm font-medium text-neon-purple hover:underline">{author.aboutLinkText} →</Link>
      </div>
    </aside>
  );
}

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  const links = [
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, icon: <span className="font-bold text-sm">𝕏</span> },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: <Linkedin className="h-4 w-4" /> },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, icon: <MessageCircle className="h-4 w-4" /> },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: <Facebook className="h-4 w-4" /> },
  ];
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-muted-foreground mr-1">Share:</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className="h-10 w-10 rounded-full flex items-center justify-center border border-primary/25 text-foreground hover:bg-primary/15 hover:text-neon-cyan transition-colors">{l.icon}</a>
      ))}
    </div>
  );
}

export function BlogNotFound({ latest }: { latest: BlogPost[] }) {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-6xl font-display font-bold text-gradient mb-4">404</p>
      <h1 className="font-display text-2xl font-bold mb-3">This article couldn't be found</h1>
      <p className="text-muted-foreground mb-6">It may have moved or been unpublished.</p>
      <div className="flex justify-center gap-4 mb-10 text-sm">
        <Link to="/blog/" className="text-neon-purple hover:underline">Browse the blog</Link>
        <Link to="/" className="text-neon-cyan hover:underline">Go home</Link>
      </div>
      {latest.length > 0 && <div className="grid gap-6 md:grid-cols-3 text-left">{latest.slice(0, 3).map((p) => <BlogCard key={p.id} post={p} />)}</div>}
    </div>
  );
}

export function PostMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      <span>By <span className="text-foreground">{author.name}</span></span>
      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(post.published_at || post.updated_at)}</span>
      <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{readTime(post.body)}</span>
    </div>
  );
}
