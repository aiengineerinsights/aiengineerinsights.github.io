// Cloudflare Worker: newsletter signup proxy for beehiiv.
//
// The browser posts { email, first_name } here; this Worker calls the beehiiv
// subscriptions API with the secret API key so the key is NEVER exposed to the
// client. Free tier is plenty for this.
//
// DEPLOY (once):
//   1. npm i -g wrangler   (or use the Cloudflare dashboard → Workers → Create)
//   2. wrangler deploy workers/newsletter-proxy.js --name newsletter
//   3. Set secrets (dashboard → Worker → Settings → Variables, or CLI):
//        wrangler secret put BEEHIIV_API_KEY          # from beehiiv → Settings → API
//        wrangler secret put BEEHIIV_PUBLICATION_ID   # e.g. pub_xxxxxxxx
//   4. Copy the Worker URL (e.g. https://newsletter.<you>.workers.dev) into
//      NEWSLETTER_ENDPOINT in src/components/NewsletterSignup.tsx, then redeploy the site.
//
// Optional: put the Worker behind your domain (e.g. newsletter.aiengineerinsights.com)
// via a Cloudflare route once the domain is on Cloudflare.

const ALLOWED_ORIGINS = new Set([
  "https://aiengineerinsights.com",
  "https://www.aiengineerinsights.com",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://aiengineerinsights.com";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, origin);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ error: "Invalid body" }, 400, origin);
    }

    const email = (data.email || "").trim().toLowerCase();
    const firstName = (data.first_name || "").trim().slice(0, 80);
    if (!EMAIL_RE.test(email)) {
      return json({ error: "Invalid email" }, 400, origin);
    }

    if (!env.BEEHIIV_API_KEY || !env.BEEHIIV_PUBLICATION_ID) {
      return json({ error: "Server not configured" }, 500, origin);
    }

    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.BEEHIIV_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: "aiengineerinsights.com",
          utm_medium: "website_signup",
          referring_site: "aiengineerinsights.com",
          custom_fields: firstName ? [{ name: "First Name", value: firstName }] : [],
        }),
      }
    );

    if (!beehiivRes.ok) {
      const detail = await beehiivRes.text().catch(() => "");
      return json({ error: "Subscription failed", detail: detail.slice(0, 300) }, 502, origin);
    }

    return json({ ok: true }, 200, origin);
  },
};
