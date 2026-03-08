import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Fetch current workflows from DB for context
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: workflows } = await supabase
      .from("workflows")
      .select("title, description, price")
      .order("created_at", { ascending: false })
      .limit(50);

    const workflowContext = workflows && workflows.length > 0
      ? workflows.map((w: any) => `- ${w.title} ($${w.price}): ${w.description}`).join("\n")
      : "No workflows are currently listed.";

    const systemPrompt = `You are the AI assistant for "AI Solutions Hub" — a website by Ahmed that sells custom AI-powered n8n automation workflows for businesses.

WEBSITE CONTEXT:
- Owner: Ahmed (WhatsApp: +923219088673, Email: damha577@gmail.com)
- Purchase channels: Fiverr, Upwork, WhatsApp, or Email
- The website showcases AI automation workflows built with n8n

CURRENT WORKFLOWS/SOLUTIONS AVAILABLE:
${workflowContext}

RULES:
1. ONLY answer questions related to the website, its services, workflows, pricing, purchasing, and AI automation.
2. If someone asks about something unrelated to the website or AI automation services, politely decline and redirect them to ask about the services offered.
3. Be friendly, professional, and concise (2-4 sentences max).
4. When relevant, mention specific workflows available and their prices.
5. For purchases or custom solutions, always direct to WhatsApp (+923219088673), Fiverr, or Upwork.
6. Never make up information about workflows that aren't in the context above.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chatbot error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
