import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const auth = req.headers.get("Authorization") ?? "";
  if (!auth.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: auth } },
  });
  const { data, error } = await supabase.auth.getUser(auth.slice(7));
  if (error || !data?.user) return json({ error: "Unauthorized" }, 401);

  const repo = Deno.env.get("GITHUB_REPO");
  const token = Deno.env.get("GITHUB_DEPLOY_TOKEN");
  if (!repo || !token || !/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    return json({ error: "Auto-publish is not set up yet (GitHub repo or token missing)." }, 500);
  }

  const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "damha577-blog",
    },
    body: JSON.stringify({ event_type: "publish_blog" }),
  });
  if (res.status !== 204) {
    const text = await res.text();
    console.error("GitHub dispatch failed", res.status, text);
    return json({ error: `GitHub returned ${res.status}` }, 502);
  }
  return json({ ok: true });
});
