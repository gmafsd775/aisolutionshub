// Build-time prerender: snapshots main pages + blog into dist/, writes redirects, sitemap and RSS.
// Run after `vite build`. Needs VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (read from env or .env).
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const SITE = "https://damha577.online";
const DIST = "dist";
const PAGE_SIZE = 10;
const env = { ...Object.fromEntries((fs.existsSync(".env") ? fs.readFileSync(".env", "utf8") : "").split("\n").map((l) => l.match(/^(\w+)="?([^"]*)"?$/)).filter(Boolean).map((m) => [m[1], m[2]])), ...process.env };
const URL_ = env.VITE_SUPABASE_URL, KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY;

const slugify = (s) => s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
const esc = (s = "") => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function rest(q) {
  const r = await fetch(`${URL_}/rest/v1/${q}`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } });
  if (!r.ok) { console.warn("fetch failed", q, r.status, await r.text()); return []; }
  return r.json();
}

const posts = (await rest(`blog_posts?select=*&status=eq.published&published_at=lte.${new Date().toISOString()}&order=published_at.desc`)) || [];
const redirects = (await rest("blog_redirects?select=old_slug,new_slug")) || [];
const tags = [...new Set(posts.flatMap((p) => p.tags))];
const tagPosts = (t) => posts.filter((p) => p.tags.some((x) => slugify(x) === slugify(t)));

const routes = ["/", "/workflows/", "/contact/", "/about/", "/blog/"];
for (let i = 2; i <= Math.ceil(posts.length / PAGE_SIZE); i++) routes.push(`/blog/page/${i}/`);
for (const p of posts) routes.push(`/blog/${p.slug}/`);
for (const t of tags) {
  routes.push(`/blog/tag/${slugify(t)}/`);
  for (let i = 2; i <= Math.ceil(tagPosts(t).length / PAGE_SIZE); i++) routes.push(`/blog/tag/${slugify(t)}/page/${i}/`);
}

const srv = spawn("npx", ["vite", "preview", "--port", "4173", "--strictPort"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 4000));
try {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const r of routes) {
    await page.goto("http://localhost:4173" + r, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const html = "<!doctype html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
    const out = path.join(DIST, r === "/" ? "index.html" : r.replace(/^\/|\/$/g, "") + "/index.html");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    console.log("prerendered", r);
  }
  await browser.close();
} finally { srv.kill(); }

// Old-slug redirect pages (GitHub Pages can't send 301s)
const live = new Set(posts.map((p) => p.slug));
for (const { old_slug, new_slug } of redirects) {
  if (live.has(old_slug) || !live.has(new_slug)) continue;
  const to = `${SITE}/blog/${new_slug}/`;
  const out = path.join(DIST, "blog", old_slug, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `<!doctype html><html><head><meta charset="utf-8"><title>Moved</title><link rel="canonical" href="${to}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${to}"><script>location.replace(${JSON.stringify(to)})</script></head><body><a href="${to}">This article has moved</a></body></html>`);
  console.log("redirect", old_slug, "->", new_slug);
}

// Sitemap
const day = (d) => (d || new Date().toISOString()).slice(0, 10);
const latest = posts[0]?.updated_at;
const entries = [
  ["/", "1.0"], ["/workflows/", "0.9"], ["/contact/", "0.8"], ["/about/", "0.8"],
  ["/blog/", "0.9", latest],
  ...posts.map((p) => [`/blog/${p.slug}/`, "0.7", p.updated_at]),
  ...tags.map((t) => [`/blog/tag/${slugify(t)}/`, "0.6", tagPosts(t)[0]?.updated_at]),
];
fs.writeFileSync(path.join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(([u, pr, lm]) => `  <url>\n    <loc>${SITE}${u}</loc>\n${lm ? `    <lastmod>${day(lm)}</lastmod>\n` : ""}    <priority>${pr}</priority>\n  </url>`).join("\n")}
</urlset>
`);

// RSS
fs.writeFileSync(path.join(DIST, "feed.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>AI Solutions Blog</title><link>${SITE}/blog/</link><description>n8n automation and AI workflow articles</description><language>en</language>
<atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${posts.slice(0, 20).map((p) => `<item><title>${esc(p.title)}</title><link>${SITE}/blog/${p.slug}/</link><guid>${SITE}/blog/${p.slug}/</guid><pubDate>${new Date(p.published_at).toUTCString()}</pubDate><description>${esc(p.meta_description || "")}</description>${p.tags.map((t) => `<category>${esc(t)}</category>`).join("")}</item>`).join("\n")}
</channel></rss>
`);
console.log(`sitemap: ${entries.length} urls, feed: ${Math.min(20, posts.length)} items`);
