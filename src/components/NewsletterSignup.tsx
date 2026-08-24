import { useState } from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

// On-brand newsletter capture. Posts { email, first_name } to a small serverless
// proxy (a Cloudflare Worker) that forwards to the beehiiv subscriptions API with
// the secret API key server-side — the key is NEVER shipped to the browser.
//
// SETUP: deploy workers/newsletter-proxy.js to Cloudflare, set BEEHIIV_API_KEY +
// BEEHIIV_PUBLICATION_ID as Worker secrets, then paste the Worker URL below.
const NEWSLETTER_ENDPOINT = ""; // e.g. "https://newsletter.aiengineerinsights.workers.dev"

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface NewsletterSignupProps {
  heading?: string;
  subtext?: string;
  className?: string;
}

const NewsletterSignup = ({
  heading = "Get the AI engineering newsletter",
  subtext = "Practical, engineering-first breakdowns on AI agents, LLMs, and breaking into the field — plus the free roadmap PDF when you join. No spam.",
  className = "",
}: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot (bots fill it; humans don't see it)

  // Until the beehiiv proxy endpoint is configured, render nothing — so the form
  // never appears in a broken (can't-submit) state. It goes live automatically
  // once NEWSLETTER_ENDPOINT is set and the site is redeployed.
  if (!NEWSLETTER_ENDPOINT) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return; // honeypot tripped — silently drop
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    if (!NEWSLETTER_ENDPOINT) {
      setStatus("error");
      setMessage("Signups aren't wired up yet — check back shortly.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), first_name: firstName.trim() }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus("success");
      setMessage("You're in! Check your inbox to confirm and grab the roadmap PDF.");
      setEmail("");
      setFirstName("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again in a moment.");
    }
  };

  return (
    <Card className={`my-6 sm:my-8 p-5 sm:p-6 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 border-purple-600/30 ${className}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center flex-shrink-0">
          <Mail className="h-4 w-4 text-white" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-base sm:text-lg m-0 leading-snug">{heading}</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-0">{subtext}</p>
        </div>
      </div>

      {status === "success" ? (
        <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 mt-3" role="status" aria-live="polite">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{message}</span>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start" noValidate>
          {/* honeypot: hidden from users, catches bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="nl-website">Website</label>
            <input id="nl-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          <div className="flex-1 w-full">
            <label htmlFor="nl-firstname" className="sr-only">First name (optional)</label>
            <Input
              id="nl-firstname"
              type="text"
              placeholder="First name (optional)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mb-2"
              autoComplete="given-name"
            />
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <Input
              id="nl-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              aria-invalid={status === "error"}
            />
          </div>

          <Button
            type="submit"
            disabled={status === "loading"}
            className="bg-purple-600 text-white hover:bg-purple-700 shrink-0 w-full sm:w-auto"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Joining…
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 mt-2" role="alert" aria-live="assertive">
          <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{message}</span>
        </div>
      )}

      {status !== "success" && (
        <p className="text-xs text-muted-foreground mt-3 mb-0">
          By subscribing you agree to receive emails from AI Engineer Insights. Unsubscribe anytime. See our{" "}
          <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
        </p>
      )}
    </Card>
  );
};

export default NewsletterSignup;
