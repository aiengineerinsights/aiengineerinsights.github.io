import { useEffect } from "react";
import { CheckCircle2, Mail, FileText, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import { trackEvent } from "@/lib/analytics";

// Landing page Topmate redirects to after a booking. Its job: confirm the
// booking, tell the buyer how to prepare, and offer the newsletter (with the
// roadmap PDF) so they can subscribe themselves. Kept out of search (noindex,
// not in the sitemap).
const ROADMAP_BONUS = {
  label: "AI engineering roadmap (PDF)",
  href: "/downloads/ai-roadmap.pdf",
};

const steps = [
  {
    icon: Mail,
    title: "Check your email",
    body: "Topmate has sent the confirmation and the meeting link. Add the slot to your calendar so it does not slip.",
  },
  {
    icon: FileText,
    title: "Send what I need before the call",
    body: "Reply to the confirmation with your resume or LinkedIn, the role you are targeting, and anything you want me to read first. The more I see beforehand, the more of the call goes to answers.",
  },
  {
    icon: MessageSquare,
    title: "Write down your top two questions",
    body: "We will start with those, so the most important things are covered even if we run out of time.",
  },
];

const ThanksForBookingPage = () => {
  // Topmate sends buyers here after checkout, so a view of this page is the
  // closest signal the site gets that a booking completed.
  useEffect(() => {
    trackEvent("booking_confirmed");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
            <CheckCircle2 className="h-9 w-9 text-emerald-500" aria-hidden="true" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Your booking is confirmed.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
            Thanks for booking. Here is how to get the most out of our time together.
          </p>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold text-center mb-6">Before we meet</h2>
            <div className="space-y-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <Card key={step.title} className="p-5 bg-gradient-card border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground m-0">{step.body}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          <div className="mt-10 text-left">
            <NewsletterSignup
              heading="While you wait: get my weekly AI engineering notes"
              subtext="One short email a week on agents, LLM systems and AI careers, plus the free AI engineering roadmap PDF when you join. No spam, unsubscribe anytime."
              bonus={ROADMAP_BONUS}
            />
          </div>

          <section className="mt-12">
            <p className="text-muted-foreground mb-4">Useful reading before the call:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild variant="outline">
                <Link to="/ai-engineering-roadmap">
                  The AI engineering roadmap
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/blogs">All articles</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThanksForBookingPage;
