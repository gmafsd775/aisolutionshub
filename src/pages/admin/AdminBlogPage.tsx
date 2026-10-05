import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Trash2, Eye, Pencil, Rocket, Bold, Italic, Heading2, Link2, List, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSession } from "@/lib/store";
import { Markdown } from "@/components/blog/BlogBits";
import {
  BlogPost, FaqItem, createPreviewToken, deletePost, formatDate, getById, listAll, savePost,
  setStatus, slugify, triggerRebuild, uploadCover,
} from "@/lib/blog";

function useOwner() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => { getSession().then((s) => setOk(!!s)); }, []);
  useEffect(() => {
    const m = document.createElement("meta"); m.name = "robots"; m.content = "noindex, nofollow"; document.head.appendChild(m);
    return () => m.remove();
  }, []);
  return ok;
}

function Gate({ ok, children }: { ok: boolean | null; children: React.ReactNode }) {
  if (ok === null) return <div className="min-h-[60vh]" />;
  if (!ok) return (
    <div className="container mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold mb-3">Owner only</h1>
      <p className="text-muted-foreground">Sign in with the Owner button in the menu to manage the blog.</p>
    </div>
  );
  return <>{children}</>;
}

async function publishSite() {
  try { await triggerRebuild(); toast.success("Site rebuild started — live in a few minutes."); }
  catch (e: any) { toast.error(e.message || "Rebuild failed"); }
}

export function AdminBlogList() {
  const ok = useOwner();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const load = () => listAll().then(setPosts).catch((e) => toast.error(e.message));
  useEffect(() => { if (ok) load(); }, [ok]);
  return (
    <Gate ok={ok}>
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <h1 className="font-display text-3xl font-bold">Blog <span className="text-gradient">posts</span></h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={publishSite}><Rocket className="h-4 w-4 mr-1" />Rebuild site</Button>
            <Button variant="hero" asChild><Link to="/admin/blog/new"><Plus className="h-4 w-4 mr-1" />New post</Link></Button>
          </div>
        </div>
        {posts.length === 0 ? <p className="text-muted-foreground">No posts yet.</p> : (
          <div className="space-y-3">
            {posts.map((p) => (
              <div key={p.id} className="rounded-xl border border-primary/20 p-4 flex flex-wrap items-center gap-3" style={{ background: "var(--gradient-card)" }}>
                <div className="flex-1 min-w-[200px]">
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-muted-foreground">/blog/{p.slug}/ · {p.status === "published" ? `Published ${formatDate(p.published_at)}` : "Draft"}</p>
                </div>
                <Button size="sm" variant="outline" asChild><Link to={`/admin/blog/${p.id}`}><Pencil className="h-4 w-4" /></Link></Button>
                <Button size="sm" variant="outline" onClick={async () => { await setStatus(p, p.status === "published" ? "draft" : "published"); load(); }}>
                  {p.status === "published" ? "Unpublish" : "Publish"}
                </Button>
                <Button size="sm" variant="outline" aria-label="Delete post" onClick={async () => { if (confirm(`Delete "${p.title}"?`)) { await deletePost(p.id); load(); } }}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Gate>
  );
}

const empty = { slug: "", title: "", meta_description: "", body: "", cover_image_url: "", tags: "", faq: [] as FaqItem[], published_at: "", status: "draft" as "draft" | "published" };

export function AdminBlogEditor() {
  const ok = useOwner();
  const { id } = useParams();
  const navigate = useNavigate();
  const [f, setF] = useState(empty);
  const [slugTouched, setSlugTouched] = useState(false);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!ok || !id) return;
    getById(id).then((p) => {
      if (!p) return;
      setSlugTouched(true);
      setF({ slug: p.slug, title: p.title, meta_description: p.meta_description || "", body: p.body, cover_image_url: p.cover_image_url || "", tags: p.tags.join(", "), faq: p.faq || [], published_at: p.published_at ? p.published_at.slice(0, 16) : "", status: p.status });
    });
  }, [ok, id]);

  const set = (k: keyof typeof empty, v: any) => setF((s) => ({ ...s, [k]: v }));
  const wrap = (a: string, b = a) => {
    const ta = document.getElementById("body") as HTMLTextAreaElement;
    const { selectionStart: s, selectionEnd: e } = ta;
    set("body", f.body.slice(0, s) + a + f.body.slice(s, e) + b + f.body.slice(e));
  };

  const save = async (status: "draft" | "published") => {
    if (!f.title.trim() || !f.slug) return toast.error("Title and slug are required");
    if (f.meta_description.length > 160) return toast.error("Meta description must be 160 characters or fewer");
    setBusy(true);
    try {
      const published_at = status === "published" ? (f.published_at ? new Date(f.published_at).toISOString() : new Date().toISOString()) : (f.published_at ? new Date(f.published_at).toISOString() : null);
      const p = await savePost(id || null, {
        slug: f.slug, title: f.title.trim(), meta_description: f.meta_description || null, body: f.body,
        cover_image_url: f.cover_image_url || null, tags: f.tags.split(",").map((t) => t.trim()).filter(Boolean),
        faq: f.faq.filter((q) => q.question.trim() && q.answer.trim()), published_at, status,
      });
      toast.success(status === "published" ? "Published" : "Draft saved");
      if (!id) navigate(`/admin/blog/${p.id}`, { replace: true });
      set("status", status);
    } catch (e: any) { toast.error(e.message?.includes("duplicate") ? "That slug is already used" : e.message); }
    setBusy(false);
  };

  const preview = async () => {
    if (!id) return toast.error("Save the draft first");
    const t = await createPreviewToken(id);
    const url = `${window.location.origin}/blog/preview/${t}/`;
    await navigator.clipboard?.writeText(url).catch(() => {});
    window.open(url, "_blank");
    toast.success("Preview link copied (valid 24h)");
  };

  return (
    <Gate ok={ok}>
      <div className="container mx-auto max-w-4xl px-4 py-12 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">{id ? "Edit post" : "New post"}</h1>
          <Link to="/admin/blog" className="text-sm text-neon-purple hover:underline">← All posts</Link>
        </div>
        <div><Label htmlFor="title">Title</Label>
          <Input id="title" value={f.title} onChange={(e) => { set("title", e.target.value); if (!slugTouched) set("slug", slugify(e.target.value)); }} /></div>
        <div><Label htmlFor="slug">Slug (address)</Label>
          <Input id="slug" value={f.slug} onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }} />
          <p className="text-xs text-muted-foreground mt-1">damha577.online/blog/{f.slug || "…"}/{id && " — changing it keeps the old address redirecting here."}</p></div>
        <div><Label htmlFor="meta">Meta description ({f.meta_description.length}/160)</Label>
          <Textarea id="meta" rows={2} maxLength={160} value={f.meta_description} onChange={(e) => set("meta_description", e.target.value)} /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label htmlFor="tags">Tags (comma separated)</Label><Input id="tags" value={f.tags} onChange={(e) => set("tags", e.target.value)} /></div>
          <div><Label htmlFor="pub">Publish date</Label><Input id="pub" type="datetime-local" value={f.published_at} onChange={(e) => set("published_at", e.target.value)} /></div>
        </div>
        <div><Label htmlFor="cover">Cover image (1200×630 recommended)</Label>
          <Input id="cover" type="file" accept="image/*" onChange={async (e) => {
            const file = e.target.files?.[0]; if (!file) return;
            try { set("cover_image_url", await uploadCover(file)); toast.success("Image uploaded"); } catch (err: any) { toast.error(err.message); }
          }} />
          {f.cover_image_url && <div className="mt-2 flex items-center gap-3"><img src={f.cover_image_url} alt="" className="h-20 rounded" /><Button size="sm" variant="outline" onClick={() => set("cover_image_url", "")}>Remove</Button></div>}</div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="body">Article (Markdown)</Label>
            <div className="flex gap-1">
              <Button size="sm" variant={tab === "write" ? "secondary" : "ghost"} onClick={() => setTab("write")}>Write</Button>
              <Button size="sm" variant={tab === "preview" ? "secondary" : "ghost"} onClick={() => setTab("preview")}>Preview</Button>
            </div>
          </div>
          {tab === "write" ? (<>
            <div className="flex gap-1 mb-1">
              {[[Bold, "Bold", () => wrap("**")], [Italic, "Italic", () => wrap("_")], [Heading2, "Heading", () => wrap("\n## ", "")], [Link2, "Link", () => wrap("[", "](https://)")], [List, "List", () => wrap("\n- ", "")], [Code, "Code", () => wrap("`")]].map(([I, l, fn]: any) => (
                <Button key={l} size="sm" variant="ghost" aria-label={l} onClick={fn}><I className="h-4 w-4" /></Button>
              ))}
            </div>
            <Textarea id="body" rows={18} className="font-mono text-sm" value={f.body} onChange={(e) => set("body", e.target.value)} />
          </>) : <div className="rounded-xl border border-primary/20 p-5 min-h-[300px]"><Markdown body={f.body} /></div>}
        </div>
        <div>
          <Label>FAQ (optional)</Label>
          {f.faq.map((q, i) => (
            <div key={i} className="mt-2 space-y-2 rounded-lg border border-primary/15 p-3">
              <Input placeholder="Question" value={q.question} onChange={(e) => set("faq", f.faq.map((x, j) => j === i ? { ...x, question: e.target.value } : x))} />
              <Textarea placeholder="Answer" rows={2} value={q.answer} onChange={(e) => set("faq", f.faq.map((x, j) => j === i ? { ...x, answer: e.target.value } : x))} />
              <Button size="sm" variant="ghost" onClick={() => set("faq", f.faq.filter((_, j) => j !== i))}>Remove</Button>
            </div>
          ))}
          <Button size="sm" variant="outline" className="mt-2" onClick={() => set("faq", [...f.faq, { question: "", answer: "" }])}><Plus className="h-4 w-4 mr-1" />Add question</Button>
        </div>
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
          <Button variant="outline" disabled={busy} onClick={() => save("draft")}>Save draft</Button>
          <Button variant="outline" disabled={busy} onClick={preview}><Eye className="h-4 w-4 mr-1" />Preview link</Button>
          <Button variant="hero" disabled={busy} onClick={() => save("published")}>Publish</Button>
          <Button variant="outline" disabled={busy} onClick={publishSite}><Rocket className="h-4 w-4 mr-1" />Rebuild site</Button>
        </div>
      </div>
    </Gate>
  );
}
