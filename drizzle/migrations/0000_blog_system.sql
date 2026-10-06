CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text NOT NULL,
  meta_description text CHECK (meta_description IS NULL OR char_length(meta_description) <= 160),
  body text NOT NULL DEFAULT '',
  cover_image_url text,
  tags text[] NOT NULL DEFAULT '{}',
  faq jsonb NOT NULL DEFAULT '[]'::jsonb,
  published_at timestamptz,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  old_slugs text[] NOT NULL DEFAULT '{}'
);
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published posts" ON public.blog_posts FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Authenticated read all posts" ON public.blog_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (true);
CREATE INDEX blog_posts_status_published_idx ON public.blog_posts (status, published_at DESC);
CREATE INDEX blog_posts_tags_idx ON public.blog_posts USING GIN (tags);
CREATE INDEX blog_posts_old_slugs_idx ON public.blog_posts USING GIN (old_slugs);
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.blog_redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  old_slug text NOT NULL UNIQUE,
  new_slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_redirects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_redirects TO authenticated;
GRANT ALL ON public.blog_redirects TO service_role;
ALTER TABLE public.blog_redirects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads redirects" ON public.blog_redirects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated manage redirects" ON public.blog_redirects FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.blog_preview_tokens (
  token text PRIMARY KEY DEFAULT encode(gen_random_bytes(24), 'hex'),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '24 hours'),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.blog_preview_tokens TO authenticated;
GRANT ALL ON public.blog_preview_tokens TO service_role;
ALTER TABLE public.blog_preview_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated manage tokens" ON public.blog_preview_tokens FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.get_preview_post(_token text)
RETURNS SETOF public.blog_posts
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT p.* FROM public.blog_posts p
  JOIN public.blog_preview_tokens t ON t.post_id = p.id
  WHERE t.token = _token AND t.expires_at > now()
  LIMIT 1
$$;
GRANT EXECUTE ON FUNCTION public.get_preview_post(text) TO anon, authenticated;