import { useState, useEffect, useRef } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

// On-brand newsletter capture. Our card provides the heading/subtext/styling;
// beehiiv's hosted form (email + button) is embedded as a tight, single-row
// iframe. beehiiv posts a `BEEHIIV_SUBSCRIBER_FORM_SUBMITTED` message to the
// parent on a successful submit — we listen for it (scoped to this iframe) and
// swap the form for our own success acknowledgement, since beehiiv's own success
// message would be clipped by the compact iframe. No API key or backend needed.
const BEEHIIV_FORM_ID = "d4d732ec-6a7f-43b0-a9b1-ed8c7345d5cb";
const BEEHIIV_FORM_URL = `https://subscribe-forms.beehiiv.com/v3/forms/${BEEHIIV_FORM_ID}`;

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
  const [submitted, setSubmitted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin !== "string" || !e.origin.includes("subscribe-forms.beehiiv.com")) return;
      const data = e.data as { type?: string; externalEmbedId?: string } | undefined;
      // Scope to this component's iframe so only the submitted form shows success.
      if (
        data?.type === "BEEHIIV_SUBSCRIBER_FORM_SUBMITTED" &&
        (e.source === iframeRef.current?.contentWindow || data.externalEmbedId === BEEHIIV_FORM_ID)
      ) {
        setSubmitted(true);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <Card className={`my-6 sm:my-8 p-5 sm:p-6 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 border-purple-600/30 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center flex-shrink-0">
          <Mail className="h-4 w-4 text-white" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-base sm:text-lg m-0 leading-snug">{heading}</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-0">{subtext}</p>
        </div>
      </div>

      {submitted ? (
        <div
          className="mt-4 flex items-start gap-3 rounded-lg border border-emerald-600/30 bg-emerald-600/10 p-4"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium text-sm sm:text-base m-0">You're on the list — one more step.</p>
            <p className="text-sm text-muted-foreground mt-1 mb-0">
              Check your inbox and click the confirmation link. Your free roadmap PDF is on the way. (Can't find it? Peek in spam/promotions.)
            </p>
          </div>
        </div>
      ) : (
        <>
          <iframe
            ref={iframeRef}
            src={BEEHIIV_FORM_URL}
            title="Subscribe to the AI Engineer Insights newsletter"
            loading="lazy"
            className="w-full mt-3 border-0 h-[104px] sm:h-16"
          />
          <p className="text-xs text-muted-foreground mt-1 mb-0">
            By subscribing you agree to receive emails from AI Engineer Insights. Unsubscribe anytime. See our{" "}
            <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </>
      )}
    </Card>
  );
};

export default NewsletterSignup;
