import { useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

// On-brand newsletter capture. We provide the heading/subtext/card styling and
// mount beehiiv's own subscribe form (email + button) inside it via their v3
// embed loader. beehiiv stores the subscriber and sends the welcome email — no
// API key or backend on our side. The form is client-rendered (the loader runs
// after hydration); the heading/subtext still prerender for SEO.
const BEEHIIV_FORM_ID = "d4d732ec-6a7f-43b0-a9b1-ed8c7345d5cb";
const BEEHIIV_LOADER = "https://subscribe-forms.beehiiv.com/v3/loader.js";
const BEEHIIV_ATTRIBUTION = "https://subscribe-forms.beehiiv.com/attribution.js";

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
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el || el.querySelector("script")) return; // guard against double-inject
    const form = document.createElement("script");
    form.async = true;
    form.src = BEEHIIV_LOADER;
    form.setAttribute("data-beehiiv-form", BEEHIIV_FORM_ID);
    el.appendChild(form);

    // UTM/attribution forwarding (loaded once, globally).
    if (!document.querySelector(`script[src="${BEEHIIV_ATTRIBUTION}"]`)) {
      const attr = document.createElement("script");
      attr.async = true;
      attr.src = BEEHIIV_ATTRIBUTION;
      document.body.appendChild(attr);
    }
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

      {/* beehiiv subscribe form mounts here (email + button) */}
      <div ref={mountRef} className="mt-4" />

      <p className="text-xs text-muted-foreground mt-3 mb-0">
        By subscribing you agree to receive emails from AI Engineer Insights. Unsubscribe anytime. See our{" "}
        <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
      </p>
    </Card>
  );
};

export default NewsletterSignup;
