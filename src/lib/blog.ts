import { supabase } from "./supabase";

// Blog tables are added by a staged migration; cast until generated types include them.
const db = supabase as any;

export interface FaqItem { question: string; answer: string }
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  body: string;
  cover_image_url: string | null;
  tags: string[];
  faq: FaqItem[];
  published_at: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  old_slugs: string[];
}

export const SITE = "https://damha577.online";
export const PAGE_SIZE = 10;

export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

export const readTime = (body: string) =>
  `${Math.max(1, Math.round(body.trim().split(/\s+/).filter(Boolean).length / 200))} min read`;

export const excerpt = (p: Pick<BlogPost, "body" | "meta_description">) => {
  const plain = (p.body || "").replace(/```[\s\S]*?```/g, "").replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[#>*_`|~-]/g, "").replace(/\s+/g, " ").trim();
  const src = plain || p.meta_description || "";
  return src.length > 150 ? src.slice(0, 150).trimEnd() + "…" : src;
};

export const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

export const tagSlug = (t: string) => slugify(t);

export async function listPublished(): Promise<BlogPost[]> {
  const { data, error } = await db.from("blog_posts").select("*").eq("status", "published")
    .lte("published_at", new Date().toISOString()).order("published_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getPublishedBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await db.from("blog_posts").select("*").eq("status", "published").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getRedirect(slug: string): Promise<string | null> {
  const { data } = await db.from("blog_redirects").select("new_slug").eq("old_slug", slug).maybeSingle();
  return data?.new_slug ?? null;
}

export async function getPreviewPost(token: string): Promise<BlogPost | null> {
  const { data, error } = await db.rpc("get_preview_post", { _token: token });
  if (error) throw error;
  return (data && data[0]) || null;
}

// ---------- admin ----------
export async function listAll(): Promise<BlogPost[]> {
  const { data, error } = await db.from("blog_posts").select("*").order("updated_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getById(id: string): Promise<BlogPost | null> {
  const { data, error } = await db.from("blog_posts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export type PostInput = Omit<BlogPost, "id" | "created_at" | "updated_at" | "old_slugs">;

export async function savePost(id: string | null, input: PostInput): Promise<BlogPost> {
  if (!id) {
    const { data, error } = await db.from("blog_posts").insert(input).select().single();
    if (error) throw error;
    return data;
  }
  const existing = await getById(id);
  let old_slugs = existing?.old_slugs || [];
  if (existing && existing.slug !== input.slug) {
    old_slugs = Array.from(new Set([...old_slugs, existing.slug])).filter((s) => s !== input.slug);
    // Point every older slug at the new one, and drop any redirect that would shadow the new slug.
    await db.from("blog_redirects").delete().eq("old_slug", input.slug);
    const rows = old_slugs.map((s) => ({ old_slug: s, new_slug: input.slug }));
    if (rows.length) {
      const { error } = await db.from("blog_redirects").upsert(rows, { onConflict: "old_slug" });
      if (error) throw error;
    }
  }
  const { data, error } = await db.from("blog_posts").update({ ...input, old_slugs }).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function setStatus(p: BlogPost, status: "draft" | "published") {
  const patch: any = { status };
  if (status === "published" && !p.published_at) patch.published_at = new Date().toISOString();
  const { error } = await db.from("blog_posts").update(patch).eq("id", p.id);
  if (error) throw error;
}

export async function deletePost(id: string) {
  const { error } = await db.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}

export async function createPreviewToken(postId: string): Promise<string> {
  const { data, error } = await db.from("blog_preview_tokens").insert({ post_id: postId }).select("token").single();
  if (error) throw error;
  return data.token;
}

export async function uploadCover(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `covers/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("blog-images").upload(path, file, { contentType: file.type });
  if (error) throw error;
  return supabase.storage.from("blog-images").getPublicUrl(path).data.publicUrl;
}

export async function triggerRebuild() {
  const { data, error } = await supabase.functions.invoke("trigger-rebuild", { body: {} });
  if (error) {
    let msg = error.message;
    try { msg = (await (error as any).context?.json())?.error || msg; } catch { /* ignore */ }
    throw new Error(msg);
  }
  return data;
}

// Heading ids shared by TOC and markdown renderer
export function extractHeadings(md: string) {
  const out: { level: 2 | 3; text: string; id: string }[] = [];
  const seen: Record<string, number> = {};
  let inCode = false;
  for (const line of md.split("\n")) {
    if (line.trim().startsWith("```")) { inCode = !inCode; continue; }
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
    out.push({ level: m[1].length as 2 | 3, text, id: uniqueId(text, seen) });
  }
  return out;
}
export function uniqueId(text: string, seen: Record<string, number>) {
  const base = slugify(text) || "section";
  seen[base] = (seen[base] || 0) + 1;
  return seen[base] > 1 ? `${base}-${seen[base]}` : base;
}
