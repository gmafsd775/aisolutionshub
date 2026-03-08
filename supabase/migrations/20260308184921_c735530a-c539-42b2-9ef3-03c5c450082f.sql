
-- Create workflows table
CREATE TABLE public.workflows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC NOT NULL DEFAULT 0,
  image_url TEXT DEFAULT '',
  video_url TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;

-- Everyone can read workflows
CREATE POLICY "Anyone can view workflows" ON public.workflows FOR SELECT USING (true);

-- Only authenticated users can manage workflows (owner)
CREATE POLICY "Authenticated users can insert workflows" ON public.workflows FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update workflows" ON public.workflows FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete workflows" ON public.workflows FOR DELETE TO authenticated USING (true);

-- Create storage bucket for workflow media
INSERT INTO storage.buckets (id, name, public) VALUES ('workflow-media', 'workflow-media', true);

-- Storage policies
CREATE POLICY "Anyone can view workflow media" ON storage.objects FOR SELECT USING (bucket_id = 'workflow-media');
CREATE POLICY "Authenticated users can upload workflow media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'workflow-media');
CREATE POLICY "Authenticated users can update workflow media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'workflow-media');
CREATE POLICY "Authenticated users can delete workflow media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'workflow-media');

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_workflows_updated_at
  BEFORE UPDATE ON public.workflows
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
