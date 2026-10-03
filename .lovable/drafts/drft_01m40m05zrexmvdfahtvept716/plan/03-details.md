## What I need from you during the build
1. **GitHub repo name** (owner/repo) for the Pages site. I will save it as GITHUB_REPO.
2. **GitHub fine-grained token** with Actions and Contents set to read/write on that repo. You will paste it into a secure box, and it is saved as GITHUB_DEPLOY_TOKEN.
3. **Two GitHub repo secrets you add yourself:** VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY. These let GitHub fetch your posts during a build. I will give you the exact values.

The new database tables and image storage are only created when you accept the draft. Until then, the preview can't save posts. I will check everything I can in the draft, then do the full owner test (create → publish → view) right after you accept.

## Technical details
- **Database changes (staged, applied when you accept):** a `blog_posts` table with the columns from the spec, an `old_slugs` column, and indexes on slug, status+published_at, and GIN on tags and old_slugs. A `blog_redirects` table. A `blog_preview_tokens` table (token, post_id, expires_at = now + 24h). A `get_preview_post(token)` security-definer function that returns the draft only while its token is valid. Grants follow the required order, then RLS: anyone can read published posts, signed-in users have full access. A public `blog-images` bucket that only signed-in users can write to. An `updated_at` trigger.
- **Server function `trigger-rebuild`:** checks the owner's login first. Then it POSTs `repos/{GITHUB_REPO}/dispatches` with `event_type: publish_blog`.
- **GitHub workflow `.github/workflows/deploy-on-publish.yml`:** runs on repository_dispatch, on manual start (workflow_dispatch) and on push. It installs packages and runs `vite build` and `scripts/prerender.py`. Then it copies dist → docs/ and commits. Pages already serves from docs/.
- **Prerender script:** fetches published posts and redirects through the public read-only key. It snapshots /blog/, the paginated /blog/page/N/, each post and each tag page. It writes redirect HTML at each old slug (canonical, meta refresh and JS replace). It rebuilds sitemap.xml: the existing 4 pages, plus blog 0.9, posts 0.7 and tags 0.6, with lastmod = updated_at. It also writes an RSS 2.0 `/feed.xml`. An RSS alternate link is added to `index.html`.
- **Frontend:** `react-markdown` + `remark-gfm` for display. The editor is a simple textarea with a toolbar and live preview, which needs no heavy editor package. The new parts are `src/config/author.ts`, the blog pages, the admin pages, a `RequireOwner` guard, and `BlogCard`, `TOC`, `ReadingProgress`, `ShareButtons`, `AuthorCard` and `FaqSection`. A missing post or empty tag shows the blog 404, with links to /blog/, home and the latest 3 posts.
- **Limits (reported honestly):**
  - GitHub Pages can't send a real 301 or 404 status. Old slugs use a meta refresh plus a canonical link, which Google treats as a permanent move. Missing posts are served by 404.html, which gives a true 404 status.
  - Free plan only: no image transformations or resizing.
  - Not testable from here: the live domain, the real GitHub workflow run, and other browsers.
- Add the blog module and publish flow to AGENTS.md.
