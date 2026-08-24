import { CheckCircle2, FileDown, Inbox, CalendarClock, Reply, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Confirmation landing page. beehiiv's double opt-in redirects here after a
// subscriber clicks the confirm link in their email, so this page's whole job
// is to acknowledge "you're confirmed" and hand over the roadmap PDF — the
// lead magnet promised at signup. Kept out of search (noindex, not in sitemap).
const PDF = "/downloads/ai-roadmap.pdf";

const nextSteps = [
  {
    icon: Inbox,
    title: "Check your inbox",
    body: "A welcome email is on its way with your roadmap and what to expect. Peek in Promotions or Spam if it's not there in a minute.",
  },
  {
    icon: CalendarClock,
    title: "One email a week",
    body: "The AI Engineer's Brief lands weekly — ~5 minutes, engineering-first, hype-free. Agents, LLMs, tools, and honest career notes.",
  },
  {
    icon: Reply,
    title: "Reply anytime",
    body: "Hit reply and tell me where you are — breaking in, leveling up, or already shipping. I read every reply.",
  },
];

const SubscribedPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Acknowledgement */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
            <CheckCircle2 className="h-9 w-9 text-emerald-500" aria-hidden="true" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            You're confirmed — welcome aboard.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
            Your subscription to <strong>The AI Engineer's Brief</strong> is active. As promised, here's
            your free AI Engineering Roadmap — the whole path on one page.
          </p>

          {/* Primary payoff: the roadmap PDF */}
          <Card className="mt-8 p-6 sm:p-8 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 border-purple-600/30">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Grab your roadmap PDF</h2>
            <p className="text-muted-foreground mb-5 max-w-md mx-auto">
              Six phases from Python and math to ML, MLOps, LLMs, and agents — with curated resources for each.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg">
                <a href={PDF} download="ai-engineering-roadmap.pdf">
                  <FileDown className="mr-2 h-5 w-5" />
                  Download the roadmap PDF
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/ai-engineering-roadmap">
                  View it on the web
                </Link>
              </Button>
            </div>
          </Card>

          {/* What happens next */}
          <section className="mt-12 text-left">
            <h2 className="text-2xl font-bold text-center mb-6">What happens next</h2>
            <div className="space-y-4">
              {nextSteps.map((step) => {
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

          {/* Keep reading while you wait */}
          <section className="mt-12">
            <p className="text-muted-foreground mb-4">While you wait for the first issue:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild variant="outline">
                <Link to="/blogs">
                  Read the latest articles
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/">Back to home</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubscribedPage;
