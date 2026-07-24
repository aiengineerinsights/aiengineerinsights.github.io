import { ArrowLeft, Clock, User, Calendar, Bug, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import BugBountyHeroDiagram from "@/components/BugBountyHeroDiagram";

const GithubBugBountyPost = () => {
  const tierData = [
    { tier: "VIP (invite-only)", low: "$1,000", medium: "$7,500", high: "$20,000", critical: "$30,000+" },
    { tier: "Public program", low: "$250", medium: "$2,000", high: "$5,000", critical: "$10,000" },
  ];

  const responseData = [
    { who: "curl (Daniel Stenberg)", when: "Jan 2026", what: "Ended its bug bounty program entirely after years of AI-generated noise" },
    { who: "Google (Chrome / Android VRP)", when: "Mar 2026", what: "Stopped accepting reports that are purely AI-generated with no human verification" },
    { who: "Internet Bug Bounty", when: "2026", what: "Paused accepting new reports while it reworks triage" },
    { who: "Node.js / OpenJS Foundation", when: "2026", what: "Added minimum HackerOne reputation (\"Signal\") requirements for new researchers" },
    { who: "GitHub", when: "Jul 27, 2026", what: "Restructured payouts, launched an invite-only VIP tier, capped new researchers at 4 submissions" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <TableOfContents />

          <div className="flex-1 w-full max-w-none lg:max-w-4xl">
            <Link to="/#blogs">
              <Button variant="ghost" className="mb-6 sm:mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm sm:text-base">Back to Insights</span>
              </Button>
            </Link>

            <header className="mb-8 sm:mb-12">
              <div className="flex items-center space-x-2 mb-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-800 rounded-full px-3 py-1">
                  <Bug className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">Agentic Security</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                GitHub's Bug Bounty Overhaul: What "AI Slop" Vulnerability Reports Are Doing to Security Research
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Starting July 27, 2026, GitHub is restructuring its bug bounty program around an invite-only VIP tier
                and a four-submission cap for new researchers. It's the latest program — after curl, Google, and
                others — to buckle under a flood of plausible-looking, AI-generated vulnerability reports. Here's what
                changed, why it happened, and what it means if you write, review, or triage code for a living.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-red-800 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <div className="font-semibold text-base sm:text-lg hover:underline">Gurram Poorna Prudhvi</div>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base">Lead AI Engineer</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analysis
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Jul 24, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      9 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            {/* Hero Diagram */}
            <BugBountyHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-changed" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. What Actually Changed (TL;DR)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  On its Security Lab blog, GitHub announced it is <strong>restructuring its bug bounty program
                  effective July 27, 2026</strong>. Two changes matter most. First, a new <strong>invite-only VIP
                  tier</strong> for researchers with a proven track record — at least one critical, two high, four
                  medium, or seven low-severity valid finding — pays significantly more and gets faster response
                  times. Second, researchers <strong>without an established reputation score are capped at four
                  initial submissions</strong> before they need to build up a track record to submit more.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  GitHub was explicit about why: a growing submission queue dominated by "low-effort and AI-generated
                  reports," alongside new requirements that every report include a working proof-of-concept, a
                  demonstrated impact, and confirmation that the researcher — not just a scanner or an AI tool —
                  verified the finding.
                </p>
                <div className="bg-muted/50 border-l-4 border-orange-500 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <p className="text-sm sm:text-base text-foreground">
                    <strong>The one-line version:</strong> "you don't earn more by submitting more. You earn more by
                    submitting better," as GitHub put it. That's a direct response to AI tooling making it nearly
                    free to generate a vulnerability report that <em>looks</em> credible but isn't.
                  </p>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="new-tiers" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. The New Payout Structure</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  GitHub also moved from payout <em>ranges</em> to fixed amounts per severity, and split the program
                  into two tracks:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Track</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Low</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Medium</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">High</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Critical</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tierData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.tier}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.low}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.medium}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.high}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.critical}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Reports filed before the July 27 cutoff are grandfathered under the old, higher-range payout rules
                  — a detail that matters if you have something in flight and are deciding whether to file now or
                  wait for VIP eligibility.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-we-got-here" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. How We Got Here: The "AI Slop" Numbers</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  GitHub is not the first program to hit this wall, and the data from the programs that got there
                  first is what makes the trend legible. curl maintainer Daniel Stenberg has tracked the problem
                  longest: in his 2025 post <em>"Death by a thousand slops,"</em> he estimated roughly 20% of that
                  year's bug bounty submissions were AI-generated noise arriving at a rate of about two per week, and
                  that across six years of monitoring, <strong>not one genuine vulnerability had come from a purely
                  AI-generated submission</strong>. By January 2026, curl shut its bounty program down entirely,
                  writing that the goal was to "remove the incentives for submitting made-up lies."
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The pattern repeats at scale. HackerOne's 2025 Hacker-Powered Security Report recorded AI
                  vulnerability report volume up 210% year over year, with prompt-injection findings specifically up
                  540% — evidence that AI-assisted research is genuinely growing, not just noise. But volume and
                  quality moved in opposite directions elsewhere: streaming-software vendor Screenly confirmed only
                  39 of 331 reports received as real. That ratio — roughly one in eight — is the actual cost driver:
                  every one of those 331 reports still needed a human to read it, understand it, and decide it was
                  wrong.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Program</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">When</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Response</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {responseData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap">{row.who}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap">{row.when}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.what}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="why-this-happens" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. Why AI Makes This Specific Failure Mode Worse</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Bug bounty triage has always had to filter noise. What changed is the <strong>cost asymmetry</strong>.
                  Writing a convincing-sounding vulnerability report — CVE-style formatting, a plausible attack
                  narrative, code snippets that reference real function names — used to take a human real effort,
                  which naturally capped submission volume. An LLM can point at a public repository, pattern-match
                  "this looks like a known vulnerability class," and generate that same report in seconds, with none
                  of the actual exploitation work done. The report is fluent and structurally correct; it just
                  describes a bug that doesn't exist, or a real-looking code path that's unreachable in practice.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  That is a straightforward consequence of what tool-calling and reasoning give a model — the same{" "}
                  <Link to="/blog/what-makes-llms-agentic" className="text-primary hover:underline">
                    properties that make an LLM agentic
                  </Link>{" "}
                  in the first place also make it capable of autonomously scanning a codebase and drafting a
                  submission end to end, with no human in the loop verifying any of it. GitHub's own framing draws
                  this line directly: AI-<em>assisted</em> research, where a human verifies what the tool produced,
                  is welcome. AI-<em>generated</em> research submitted without verification is exactly what the new
                  rules are built to filter out. It's the inverse problem to the one we covered when{" "}
                  <Link to="/blog/openai-models-hacked-hugging-face" className="text-primary hover:underline">
                    OpenAI's own models breached Hugging Face during a benchmark run
                  </Link>{" "}
                  — there, unchecked agentic capability caused a real intrusion; here, unchecked agentic output is
                  causing a flood of fake ones. Both are what happens when you scale up a model's capability without
                  scaling up the verification around it.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="engineer-takeaways" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. What This Means If You Ship or Review Code</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This isn't only a bug-bounty-hunter problem. If your team maintains a public repository, runs a
                  security inbox, or is starting to route AI-assisted static analysis into your own review pipeline,
                  the same triage math applies to you:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                    <li>• <strong>Require a reproducible PoC, always.</strong> GitHub's rule change formalizes what most experienced maintainers already do informally: a report without a working reproduction is a hypothesis, not a finding.</li>
                    <li>• <strong>Reputation systems aren't optional at scale.</strong> HackerOne's "Signal" score, GitHub's VIP invite bar, and Node.js's new minimum reputation requirement are all converging on the same fix — gate volume behind a track record instead of trusting each report equally.</li>
                    <li>• <strong>Treat your own AI-assisted scanning the same way.</strong> If you're feeding an LLM your codebase to find vulnerabilities, the output needs the exact same human verification step you'd demand from an external researcher — a model confidently describing a plausible-sounding bug is not evidence the bug exists.</li>
                    <li>• <strong>Budget triage time as a real cost, not overhead.</strong> Screenly's 39-real-of-331 ratio is the number to plan around: assume the large majority of unsolicited reports (AI-generated or not) will consume reviewer time and return nothing.</li>
                    <li>• <strong>Don't conflate "AI-assisted" with "AI-generated."</strong> HackerOne's data shows genuine AI-assisted research is growing fast and finding real classes of bugs (prompt injection up 540%). The goal is filtering out unverified output, not discouraging the tooling.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="whats-next" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. What to Watch Next</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  GitHub is a large, well-resourced program that can afford to build a reputation-gated VIP tier;
                  smaller open-source maintainers generally can't run that kind of triage infrastructure, which is
                  why curl's answer was simply to stop taking outside reports at all. Expect more programs to land
                  somewhere between those two poles over the next few months — minimum reputation thresholds,
                  mandatory PoC requirements, or narrower scope — rather than inventing new approaches. The open
                  question worth tracking is whether reputation-gating quietly locks out legitimate new researchers
                  who haven't had the chance to build a track record yet, which is exactly the tension GitHub's
                  four-submission allowance for newcomers is trying, and may or may not succeed, to balance.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. Frequently Asked Questions</h2>

                <h3 id="faq-when-effective" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">When do GitHub's new bug bounty rules take effect?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  July 27, 2026. Reports filed before that date are grandfathered under the previous, range-based
                  payout structure.
                </p>

                <h3 id="faq-is-ai-banned" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Is GitHub banning AI-assisted security research?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  No. GitHub says it welcomes AI-assisted research where a human verifies the tool's output before
                  submitting. What it's filtering out is unverified, AI-generated reports submitted without a working
                  proof-of-concept or confirmed impact.
                </p>

                <h3 id="faq-how-to-qualify-vip" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">How do you qualify for GitHub's VIP tier?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It's invite-only, based on a track record of at least one critical, two high, four medium, or seven
                  low-severity valid findings. VIP researchers get higher fixed payouts and faster response times.
                </p>

                <h3 id="faq-other-programs" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Is GitHub the only program dealing with this?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  No — curl ended its bug bounty program entirely in January 2026, Google stopped accepting purely
                  AI-generated reports for Chrome and Android in March 2026, and the Internet Bug Bounty and Node.js
                  have both added similar friction. GitHub's restructuring follows the same trend, not a unique one.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://github.blog/security/next-chapter-restructuring-githubs-bug-bounty-program/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub Security Lab — restructuring GitHub's bug bounty program</a></li>
                  <li>• <a href="https://analyticsindiamag.com/ai-news/github-tightens-bug-bounty-rules-as-ai-changes-security-research" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Analytics India Magazine — coverage</a></li>
                  <li>• <a href="https://daniel.haxx.se/blog/2025/07/14/death-by-a-thousand-slops/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Daniel Stenberg — "Death by a thousand slops" (curl)</a></li>
                  <li>• <a href="https://www.theregister.com/2026/01/21/curl_ends_bug_bounty/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">The Register — curl ends its bug bounty program</a></li>
                  <li>• <a href="https://www.hackerone.com/press-release/hackerone-report-finds-210-spike-ai-vulnerability-reports-amid-rise-ai-autonomy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">HackerOne — 2025 Hacker-Powered Security Report press release</a></li>
                  <li>• <a href="https://www.securityweek.com/google-adjusts-bug-bounties-chrome-payouts-drop-as-android-rewards-rise-amid-ai-surge/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SecurityWeek — Google adjusts Chrome/Android bug bounty payouts</a></li>
                  <li>• <a href="https://thehackernews.com/2026/07/github-cuts-public-bug-bounty-payouts.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">The Hacker News — coverage</a></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/github-bug-bounty-ai-slop" />
      <Footer />
    </div>
  );
};

export default GithubBugBountyPost;
