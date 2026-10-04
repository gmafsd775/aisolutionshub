import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { BlogBreadcrumbs, BlogCard, TagChip } from "@/components/blog/BlogBits";
import { BlogPost, listPublished, PAGE_SIZE, tagSlug } from "@/lib/blog";
import NotFound from "@/pages/NotFound";

export default function BlogIndexPage({ tag }: { tag?: boolean }) {
  const params = useParams();
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => { listPublished().then(setPosts).catch(() => setPosts([])); }, []);

  const tagParam = tag ? params.tag || "" : "";
  const filtered = posts ? (tag ? posts.filter((p) => p.tags.some((t) => tagSlug(t) === tagParam)) : posts) : null;
  const tagName = tag && filtered?.length ? filtered[0].tags.find((t) => tagSlug(t) === tagParam) || tagParam : tagParam;
  const allTags = posts ? Array.from(new Set(posts.flatMap((p) => p.tags))).sort((a, b) => a.localeCompare(b)) : [];
  const pages = filtered ? Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)) : 1;
  const shown = filtered ? (tag ? filtered : filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)) : [];

  if (filtered && ((tag && filtered.length === 0) || (!tag && page > pages))) return <NotFound />;

  const path = tag ? `/blog/tag/${tagParam}/` : page > 1 ? `/blog/page/${page}/` : "/blog/";
  const title = tag ? `Articles tagged "${tagName}" | AI Solutions Blog` : page > 1 ? `Blog – Page ${page} | AI Solutions` : "AI Automation & n8n Blog | AI Solutions";
  const desc = tag
    ? `Read every AI Solutions article about ${tagName}: practical n8n workflow guides, AI automation tips and real business process examples from Ahmed & Zarrar.`
    : "Practical guides on n8n workflows, AI automation, GPT and Claude integrations, and business process automation from the AI Solutions team, Ahmed & Zarrar.";

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <SEOHead title={title} description={desc} path={path} />
      <BlogBreadcrumbs items={tag ? [{ label: "Blog", path: "/blog/" }, { label: `Tag: ${tagName}` }] : [{ label: "Blog" }]} />
      <header className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">{tag ? <>Tag: <span className="text-gradient">{tagName}</span></> : <>The <span className="text-gradient">Automation</span> Blog</>}</h1>
        <p className="text-muted-foreground max-w-2xl">{tag ? `${filtered?.length || 0} article${filtered?.length === 1 ? "" : "s"} on this topic.` : "Guides, tutorials and real-world examples of n8n workflows and AI automation."}</p>
      </header>

      {!filtered ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="h-64 rounded-2xl bg-muted/40 animate-pulse" />)}</div>
      ) : shown.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center">No articles yet — check back soon.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{shown.map((p) => <BlogCard key={p.id} post={p} />)}</div>
      )}

      {!tag && pages > 1 && (
        <nav aria-label="Pagination" className="flex justify-center gap-2 mt-12">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <Link key={n} to={n === 1 ? "/blog/" : `/blog/page/${n}/`} aria-current={n === page ? "page" : undefined}
              className={`h-10 min-w-10 px-3 rounded-xl flex items-center justify-center text-sm font-medium ${n === page ? "bg-primary/15 nav-active-text neon-border" : "text-muted-foreground hover:bg-muted/60"}`}>{n}</Link>
          ))}
        </nav>
      )}

      {allTags.length > 0 && (
        <section className="mt-16" aria-labelledby="tags-heading">
          <h2 id="tags-heading" className="font-display text-2xl font-bold mb-4">Browse by Tag</h2>
          <div className="flex flex-wrap gap-2">{allTags.map((t) => <TagChip key={t} tag={t} />)}</div>
        </section>
      )}
    </div>
  );
}
