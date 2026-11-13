import { useState, useEffect, useRef } from "react";
import { CheckCircle2, Download } from "lucide-react";
import { Link } from "@/components/SiteLink";
import { trackEvent } from "@/lib/analytics";
import type { NewsletterBonus } from "@/config/newsletterBonuses";

// Newsletter capture. beehiiv's hosted form (email + button) is embedded as a
// tight, single-row iframe. beehiiv posts a `BEEHIIV_SUBSCRIBER_FORM_SUBMITTED`
// message to the parent on a successful submit — we listen for it (scoped to
// this iframe) and swap the form for our own success acknowledgement, since
// beehiiv's own success message would be clipped by the compact iframe. No API
// key or backend needed.
const BEEHIIV_FORM_ID = "d4d732ec-6a7f-43b0-a9b1-ed8c7345d5cb";
const BEEHIIV_FORM_URL = `https://subscribe-forms.beehiiv.com/v3/forms/${BEEHIIV_FORM_ID}`;

interface SubscribeFormProps {
  bonus?: NewsletterBonus;
  /** Where on the page this form sits, sent with the signup event. */
  placement?: string;
  /** Load the iframe immediately (above the fold) instead of lazily. */
  eager?: boolean;
  /** Hide the legal line (when the surrounding block already carries one). */
  compact?: boolean;
  /** Mount the third-party form only once the browser is idle, so it never
      competes with first paint. Until then a plain link to /newsletter shows. */
  defer?: boolean;
}

/** The bare form row + success state, for use inside any styled block. */
export const SubscribeForm = ({ bonus, placement = "inline", eager = false, compact = false, defer = false }: SubscribeFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [ready, setReady] = useState(!defer);

  useEffect(() => {
    if (ready) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    const go = () => setReady(true);
    const id = w.requestIdleCallback ? w.requestIdleCallback(go, { timeout: 2500 }) : window.setTimeout(go, 1200);
    return () => {
      if (!w.requestIdleCallback) window.clearTimeout(id);
    };
  }, [ready]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin !== "string" || !e.origin.includes("subscribe-forms.beehiiv.com")) return;
      const data = e.data as { type?: string } | undefined;
      // Scope to this component's iframe so only the submitted form shows success.
      if (data?.type === "BEEHIIV_SUBSCRIBER_FORM_SUBMITTED" && e.source === iframeRef.current?.contentWindow) {
        setSubmitted(true);
        trackEvent("newsletter_signup", {
          signup_source_page: window.location.pathname,
          signup_placement: placement,
          ...(bonus ? { signup_bonus: bonus.href } : {}),
        });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [bonus, placement]);

  if (submitted) {
    return (
      <div className="flex items-start gap-3 rounded-sm border border-primary bg-background p-4 text-foreground text-left" role="status" aria-live="polite" style={{ animation: "aei-in 0.35s ease-out both" }}>
        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="min-w-0">
          <pre className="font-mono text-xs sm:text-[13px] leading-relaxed m-0 mb-3 whitespace-pre-wrap text-muted-foreground" aria-hidden="true">{`{ "tool": "send_roadmap", "status": "200 OK", "next_step": "confirm_email" }`}</pre>
          <p className="font-semibold text-sm sm:text-base m-0">You're on the list. One more step.</p>
          <p className="text-sm text-muted-foreground mt-1 mb-0">
            Check your inbox and click the confirmation link. Your free roadmap PDF is on the way. (Can't find it? Look in spam or promotions.)
          </p>
          {bonus && (
            <a
              href={bonus.href}
              target="_blank"
              rel="noopener"
              className="mt-3 inline-flex items-center gap-2 min-h-[44px] rounded-sm bg-primary px-4 text-sm font-semibold text-primary-foreground no-underline hover:bg-primary-glow"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download your {bonus.label}
            </a>
          )}
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="h-[112px] sm:h-[60px] flex items-start">
        <Link
          to="/newsletter"
          className="inline-flex items-center min-h-[52px] px-6 rounded-sm bg-primary text-primary-foreground font-bold hover:bg-primary-glow transition-colors"
        >
          Send me the roadmap
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* beehiiv's hosted form has a fixed ~80px of top padding baked in.
          We crop it: the iframe is tall (so the form renders) and shifted up
          74px inside a clipped container, so only the form row shows — no gap. */}
      <div className="overflow-hidden h-[112px] sm:h-[60px]">
        <iframe
          ref={iframeRef}
          src={BEEHIIV_FORM_URL}
          title="Subscribe to the AI Engineer Insights newsletter"
          loading={eager ? "eager" : "lazy"}
          className="w-full border-0 block"
          style={{ height: 260, marginTop: -74 }}
        />
      </div>
      {!compact && (
        <p className="text-xs text-muted-foreground mt-1 mb-0">
          By subscribing you agree to receive emails from AI Engineer Insights. Unsubscribe anytime. See our{" "}
          <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
        </p>
      )}
    </>
  );
};

interface NewsletterSignupProps {
  heading?: string;
  subtext?: string;
  className?: string;
  bonus?: NewsletterBonus;
}

const NewsletterSignup = ({
  heading,
  subtext,
  className = "",
  bonus,
}: NewsletterSignupProps) => {
  const title = heading ?? (bonus ? `Free with this guide: ${bonus.label.replace(/ \(PDF\)$/, "")}` : "Get the AI engineering newsletter");
  const body =
    subtext ??
    (bonus
      ? "One page you can keep. Subscribe and the download button appears right here, along with the free AI engineer roadmap PDF."
      : "Practical, engineering-first breakdowns on AI agents, LLMs, and breaking into the field, plus the free roadmap PDF when you join. No spam.");

  return (
    <section
      id={bonus ? "free-pdf" : undefined}
      className={`not-prose my-8 sm:my-10 rounded-sm border border-primary bg-card p-5 sm:p-7 scroll-mt-24 ${className}`}
    >
      <p className="label-mono text-primary m-0 mb-2">{bonus ? "Free PDF" : "Newsletter"}</p>
      <h2 className="font-bold text-xl sm:text-2xl m-0 leading-snug text-foreground">{title}</h2>
      <p className="text-sm sm:text-base text-muted-foreground mt-2 mb-4">{body}</p>
      <SubscribeForm bonus={bonus} placement={bonus ? "article_bonus" : "article_inline"} />
    </section>
  );
};

export default NewsletterSignup;
