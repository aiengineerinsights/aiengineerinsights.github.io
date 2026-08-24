import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

// On-brand newsletter capture. Our card provides the heading/subtext/styling;
// beehiiv's hosted subscribe form (email + button) is embedded as a fixed-height
// iframe. We use a direct iframe rather than beehiiv's auto-resizing loader
// script because the loader's postMessage resize doesn't fire reliably inside a
// client-side SPA (it left the form collapsed to 0 height). beehiiv stores the
// subscriber and sends the welcome email — no API key or backend on our side.
const BEEHIIV_FORM_URL =
  "https://subscribe-forms.beehiiv.com/v3/forms/d4d732ec-6a7f-43b0-a9b1-ed8c7345d5cb";

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

      <iframe
        src={BEEHIIV_FORM_URL}
        title="Subscribe to the AI Engineer Insights newsletter"
        loading="lazy"
        scrolling="no"
        className="w-full mt-3 border-0 rounded-lg"
        style={{ height: 168 }}
      />

      <p className="text-xs text-muted-foreground mt-1 mb-0">
        By subscribing you agree to receive emails from AI Engineer Insights. Unsubscribe anytime. See our{" "}
        <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
      </p>
    </Card>
  );
};

export default NewsletterSignup;
