import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, message, source, workflowId, workflowTitle } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Store in database first (this always works)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("contact_messages").insert({
      name,
      email,
      message,
      source: source || "contact",
      workflow_id: workflowId || null,
    });

    if (dbError) {
      console.error("DB error:", dbError);
    }

    // Send email via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    let emailSent = false;

    if (RESEND_API_KEY) {
      const subject = source === "buy"
        ? `New Interest: ${workflowTitle || "Workflow"}`
        : "New Contact Message";

      const htmlContent = `
        <h2 style="color: #7c3aed;">${subject}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${workflowTitle ? `<p><strong>Workflow:</strong> ${workflowTitle}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message || "No message provided"}</p>
        <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #6b7280; font-size: 12px;">Sent from AI Solutions Hub</p>
      `;

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "AI Solutions Hub <onboarding@resend.dev>",
            to: ["damha577@gmail.com"],
            subject,
            html: htmlContent,
          }),
        });

        if (res.ok) {
          emailSent = true;
          console.log("Email sent successfully to damha577@gmail.com");
        } else {
          const errorData = await res.text();
          console.error("Resend error:", errorData);
        }
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true, emailSent, dbSaved: !dbError }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
