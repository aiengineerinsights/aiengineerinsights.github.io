import { Mail, Wrench, BookOpen, Briefcase, Flame, Clock, Ban, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";

const whatYouGet = [
  { icon: Wrench, title: "Build", body: "One practical thing to try — a tool, a pattern, a repo, a setting worth stealing." },
  { icon: BookOpen, title: "Read", body: "One piece worth your time — ours or external — with an honest verdict on why." },
  { icon: Briefcase, title: "Career", body: "One note on getting or growing the job — a salary data point, a role, an interview angle." },
  { icon: Flame, title: "The Take", body: "A short, opinionated read. The anti-hype edge — what's actually worth your attention." },
];

const sampleSubjects = [
  "Anthropic just watermarked Claude. Here's what actually breaks.",
  "Claude Code vs Cursor: the honest answer nobody gives you.",
  "The one AI-engineering skill everyone underrates (it's evaluation).",
  "You don't need a PhD. You need these six skills.",
];

const NewsletterPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-800 rounded-full px-3 py-1 mb-5">
              <Mail className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">The Newsletter</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              The AI Engineer's Brief
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              The 5-minute weekly brief for people building — and breaking into — AI engineering.
              Engineering-first, hype-free. Plus the free roadmap PDF when you join.
            </p>
          </div>

          {/* Primary signup */}
          <NewsletterSignup
            heading="Join The AI Engineer's Brief"
            subtext="One email a week — agents, LLMs, the tools worth using, and honest career notes. Subscribe and we'll send you the free AI Engineering Roadmap PDF."
          />

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground my-8">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> ~5 minutes, weekly</span>
            <span className="inline-flex items-center gap-1.5"><Ban className="h-4 w-4" /> No spam, unsubscribe anytime</span>
            <span className="inline-flex items-center gap-1.5"><Mail className="h-4 w-4" /> Written by a Lead AI Engineer</span>
          </div>

          {/* What you get */}
          <section className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">What you get each week</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
              One clear idea, four fast sections. Skimmable in a coffee break, useful all week.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {whatYouGet.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="p-5 bg-gradient-card border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground m-0">{item.body}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Sample subjects */}
          <section className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">A taste of the subject lines</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
              Specific, honest, and worth the open. No "This week in AI."
            </p>
            <div className="space-y-3">
              {sampleSubjects.map((s) => (
                <div key={s} className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base">{s}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Roadmap magnet */}
          <section className="mt-12">
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-emerald-600/10 to-blue-600/10 border-emerald-600/30 text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Subscribe and get the roadmap, free</h2>
              <p className="text-muted-foreground mb-5 max-w-xl mx-auto">
                New subscribers get the complete AI Engineering Roadmap PDF — the whole path on one page.
                Prefer to grab it now? It's on the roadmap page too.
              </p>
              <Link to="/ai-engineering-roadmap">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  See the roadmap
                </Button>
              </Link>
            </Card>
          </section>

          {/* Closing signup */}
          <section className="mt-12">
            <NewsletterSignup
              heading="Ready? Get the first issue."
              subtext="Join engineers building and breaking into AI. One sharp email a week, plus the roadmap PDF to start."
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsletterPage;
