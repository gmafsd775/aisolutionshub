import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { AuthorCard, BlogBreadcrumbs, BlogCard, BlogNotFound, FaqSection, Markdown, PostMeta, ReadingProgress, ShareButtons, TagChip, TOC } from "@/components/blog/BlogBits";
import { author } from "@/config/author";
import { BlogPost, getPreviewPost, getPublishedBySlug, getRedirect, listPublished, SITE } from "@/lib/blog";

function useOgImage(url: string) {
  useEffect(() => {
    const set = (attr: string, k: string, v: string) => {
      let el = document.querySelector(`meta[${attr}="${k}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, k); document.head.appendChild(el); }
      el.setAttribute("content", v);
    };
    set("property", "og:image", url); set("name", "twitter:image", url); set("property", "og:type", "article");
    return () => { set("property", "og:image", `${SITE}/og-image.jpg`); set("name", "twitter:image", `${SITE}/og-image.jpg`); set("property", "og:type", "website"); };
  }, [url]);
}

function useNoIndex(on: boolean) {
  useEffect(() => {
    if (!on) return;
    const m = document.createElement("meta"); m.name = "robots"; m.content = "noindex, nofollow"; document.head.appendChild(m);
    return () => m.remove();
  }, [on]);
}

export default function BlogPostPage({ preview }: { preview?: boolean }) {
  const { slug = "", token = "" } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
  const [all, setAll] = useState<BlogPost[]>([]);

  useEffect(() => {
    let live = true;
    setPost(undefined);
    (async () => {
      const list = await listPublished().catch(() => []);
      if (!live) return;
      setAll(list);
      if (preview) { setPost(await getPreviewPost(token).catch(() => null)); return; }
      const p = await getPublishedBySlug(slug).catch(() => null);
      if (p) { if (live) setPost(p); return; }
      const to = await getRedirect(slug).catch(() => null);
      if (to && to !== slug) { navigate(`/blog/${to}/`, { replace: true }); return; }
      if (live) setPost(null);
    })();
    return () => { live = false; };
  }, [slug, token, preview]);

  const url = post ? `${SITE}/blog/${post.slug}/` : "";
  useOgImage(post?.cover_image_url || `${SITE}/og-image.jpg`);
  useNoIndex(!!preview);

  if (post === undefined) return <div className="min-h-[60vh]" />;
  if (post === null) return <BlogNotFound latest={all} />;

  const related = (() => {
    const others = all.filter((p) => p.id !== post.id);
    const scored = others.map((p) => ({ p, s: p.tags.filter((t) => post.tags.includes(t)).length })).filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s).map((x) => x.p);
    return [...scored, ...others.filter((p) => !scored.includes(p))].slice(0, 3);
  })();

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.meta_description || "",
    image: post.cover_image_url || `${SITE}/og-image.jpg`, datePublished: post.published_at, dateModified: post.updated_at,
    author: { "@type": "Organization", name: author.name, url: `${SITE}${author.aboutLink}` },
    publisher: { "@type": "Organization", name: "AI Solutions", logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": url }, keywords: post.tags.join(", "),
  };

  return (
    <>
      <ReadingProgress />
      <SEOHead title={`${post.title} | AI Solutions`} description={post.meta_description || post.title} path={`/blog/${post.slug}/`} keywords={post.tags.join(", ")} />
      <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      {preview && <div className="bg-accent/20 text-center text-sm py-2 border-b border-border">Preview — this {post.status === "draft" ? "draft is not public yet" : "post"}. Link expires 24h after it was created.</div>}
      <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
        <BlogBreadcrumbs items={[{ label: "Blog", path: "/blog/" }, { label: post.title }]} />
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
          <article className="min-w-0">
            <header className="mb-8">
              <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
              <PostMeta post={post} />
            </header>
            {post.cover_image_url && (
              <img src={post.cover_image_url} alt={post.title} width={1200} height={630} className="w-full rounded-2xl mb-8 aspect-[1200/630] object-cover bg-muted" />
            )}
            <div className="lg:hidden"><TOC body={post.body} variant="mobile" /></div>
            <Markdown body={post.body} />
            <FaqSection faq={post.faq || []} />
            {post.tags.length > 0 && <div className="mt-10 flex flex-wrap gap-2">{post.tags.map((t) => <TagChip key={t} tag={t} />)}</div>}
            <div className="mt-8"><ShareButtons url={url} title={post.title} /></div>
            <AuthorCard />
            <section className="mt-12 rounded-2xl p-8 text-center neon-border" style={{ background: "var(--gradient-subtle)" }}>
              <h2 className="font-display text-2xl font-bold mb-2">Need custom automation?</h2>
              <p className="text-muted-foreground mb-5">Tell us about your process and we'll build the workflow for you.</p>
              <Button asChild variant="hero"><Link to="/contact/">Contact us <ArrowRight className="h-4 w-4" /></Link></Button>
            </section>
          </article>
          <aside className="hidden lg:block"><TOC body={post.body} variant="desktop" /></aside>
        </div>
        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-display text-2xl font-bold mb-6">Related articles</h2>
            <div className="grid gap-6 md:grid-cols-3">{related.map((p) => <BlogCard key={p.id} post={p} />)}</div>
          </section>
        )}
      </div>
    </>
  );
}
