# Blog system for damha577.online

Build the full blog from the uploaded spec, inside this draft. Existing pages (Home, Workflows, Contact, About), their wording, design and canonicals, plus /buy/:id, stay as they are. The only additions there are the Blog link in the menu and footer, and a "Latest from the Blog" section on the homepage.

## What you get
- **Public pages:** /blog/ shows 10 posts per page, plus a "Browse by Tag" section. Each post has its own page at /blog/[slug]/. Each tag has its own page at /blog/tag/[tag]/. All of them are prerendered, so search engines see the full text.
- **On each post:** reading progress bar, table of contents (a sticky sidebar on computers, a collapsible box on phones), FAQ accordion, author card (neon "AZ" badge, the name "Ahmed & Zarrar", the title "AI & Automation Specialists", a short bio and a "Read more about us →" link to /about/), and share buttons for X, LinkedIn, WhatsApp and Facebook. Each post also shows its tags, 3 related posts and a "Need custom automation?" link to /contact/.
- **Search data on each post:** Article, FAQ and Breadcrumb markup, plus title, description, canonical, og and Twitter tags. Posts without a cover use /og-image.jpg for sharing only. The post page itself shows no image space.
- **Admin at /admin/blog/:** uses the existing Owner login, with no new login. You can filter and search the post list. You can publish, unpublish or delete posts. The editor has title and description counters, an auto slug, markdown with live preview, an optional cover (upload or paste a link), tag chips, FAQ rows, status and date. It also has Save Draft, Publish, Preview and Delete, plus a "Rebuild Site" button.
- **Auto-publish:** clicking Publish or Rebuild tells GitHub to rebuild and redeploy the site. This takes about 1–2 minutes.
