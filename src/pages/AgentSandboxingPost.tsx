import { ArrowLeft, Clock, User, Calendar, ShieldAlert, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import AgentSandboxingHeroDiagram from "@/components/AgentSandboxingHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";
import ExploreWithAI from "@/components/ExploreWithAI";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const boundaries = [
  { name: "Process sandbox", eg: "bubblewrap, seccomp-bpf, Landlock", isolation: "Restricts one process on the shared host kernel", kernelShared: "Yes — full host kernel surface minus the filter", bestFor: "Cheapest guardrail on a trusted host; not enough alone for untrusted agent code" },
  { name: "Container", eg: "Docker/runc, Kubernetes Pod", isolation: "Namespaces + cgroups around a process group", kernelShared: "Yes — a kernel bug is a potential escape route", bestFor: "Cheap, fast isolation for code you mostly trust; pair with gVisor/Kata for untrusted code" },
  { name: "User-space kernel", eg: "gVisor (runsc), Kata-lite setups", isolation: "A Sentry re-implements the Linux syscall ABI; only ~60–70 host syscalls are ever reached", kernelShared: "No — host kernel sees only the Sentry's narrow, seccomp-filtered calls", bestFor: "Multi-tenant untrusted code execution at near-container weight (Cloud Run, App Engine, agent code-interpreters)" },
  { name: "microVM", eg: "Firecracker, Kata Containers (QEMU-based)", isolation: "Its own real guest kernel under KVM hardware virtualization", kernelShared: "No — hardware-enforced boundary, full Linux syscall compatibility", bestFor: "Arbitrary/unpredictable agent-generated code where compatibility matters as much as isolation" },
];

const sandboxVendors = [
  { name: "E2B", backend: "Firecracker microVM", published: "~150–185ms cold start (vendor benchmark)", notes: "Purpose-built code-interpreter sandboxes for AI agents; open-source core" },
  { name: "Modal", backend: "gVisor", published: "~800–820ms cold start (vendor/third-party benchmarks)", notes: "Serverless compute with GPU passthrough; isolation via gVisor's Sentry, not a VM" },
  { name: "Docker Sandboxes", backend: "Custom microVM (Docker's own hypervisor)", published: "Local-first, free; cloud burst metered", notes: "Each sandbox gets its own kernel and private Docker daemon; works for Claude Code, Codex, and other CLIs" },
  { name: "Kubernetes Agent Sandbox", backend: "Pluggable — gVisor or Kata Containers", isolation: "", published: "SIG Apps subproject; SandboxWarmPool targets sub-1s claims", notes: "Declarative Sandbox/SandboxTemplate/SandboxClaim CRDs for stateful, singleton agent workloads on K8s" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is AI agent sandboxing?",
    a: "AI agent sandboxing is running the code, shell commands, or file/network actions an AI agent generates inside an isolated, disposable environment instead of directly on a host with real credentials and data. The isolation can be a process-level filter (bubblewrap, seccomp), a container, a user-space kernel like gVisor, or a hardware-isolated microVM like Firecracker — each trades compatibility and performance for how hard the boundary is to break out of.",
  },
  {
    q: "Why do AI agents need sandboxing at all?",
    a: "Because agents execute model-generated actions, not just model-generated text: coding agents run shell commands, data agents run Python/SQL, computer-use agents click and type. A hijacked or simply buggy tool call on an unsandboxed host can read SSH keys, exfiltrate secrets, or modify files outside the task's scope. Microsoft's own disclosure of two CVEs in Semantic Kernel showed a prompt-injection-controlled agent could chain into full host-level remote code execution when nothing contained it.",
  },
  {
    q: "What's the difference between a container and gVisor for sandboxing agents?",
    a: "A plain container (runc) isolates with Linux namespaces and cgroups, but every syscall the containerized process makes still reaches the single, shared host kernel directly — a kernel bug is a potential escape route. gVisor interposes a user-space kernel called the Sentry that re-implements the Linux syscall ABI itself; the application's syscalls are trapped and serviced by the Sentry, and only a small, seccomp-filtered set (gVisor's own docs put it at roughly 60–70 distinct calls) ever reaches the host kernel, regardless of what the application does.",
  },
  {
    q: "Is a microVM like Firecracker safer than gVisor for agent sandboxing?",
    a: "They isolate differently rather than one being strictly safer. Firecracker boots a real, separate guest kernel per microVM under hardware KVM virtualization, so compatibility is that of an ordinary Linux box and there's no per-syscall interception tax — the trade-off is a per-guest memory cost and a boot step (mitigated with snapshot-restore). gVisor's user-space kernel reaches near-container weight and needs no hardware virtualization support, but it doesn't reimplement 100% of the Linux syscall surface, so syscall-heavy or exotic workloads can hit compatibility gaps. For arbitrary, unpredictable agent-generated code, the hardware boundary and fuller compatibility of a microVM is generally the safer default; gVisor is the better fit when you need container-like density and speed for more predictable workloads.",
  },
  {
    q: "Does sandboxing alone make an AI agent safe?",
    a: "No. Microsoft's Semantic Kernel disclosure demonstrated a sandbox escape through an unvalidated file-path parameter that let an attacker write a payload straight to the host's Startup folder from inside an 'isolated' sandbox. Sandboxing reduces blast radius; it doesn't replace least-privilege tool scoping, short-lived scoped credentials, network egress controls, and human approval gates for high-risk actions — the same controls covered in prompt-injection defense for coding agents.",
  },
  {
    q: "What should I actually use to sandbox my agent's tool calls?",
    a: "Match the tool to the workload: E2B or Docker Sandboxes (both Firecracker-class microVMs) for per-task code-interpreter execution where you want hardware isolation and fast snapshot-restore boot; Modal when you need gVisor-backed sandboxes with GPU passthrough for heavier compute; Kubernetes Agent Sandbox (the kubernetes-sigs/agent-sandbox CRDs, pluggable to gVisor or Kata) when you're already running agent workloads on Kubernetes and want a standard, declarative primitive instead of hand-rolled pods. None of these substitute for scoping the credentials and network access the sandbox is given in the first place.",
  },
];

const AgentSandboxingPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-orange-700 rounded-full px-3 py-1">
                  <ShieldAlert className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">Agentic Security</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                AI Agent Sandboxing Explained: Process Sandboxes vs Containers vs gVisor vs microVMs (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>AI agent sandboxing means running an agent's tool calls — shell commands, generated code,
                file and network access — inside an isolated, disposable environment instead of directly on a host
                with real credentials.</strong> The isolation options form a ladder of increasing strength and cost:
                a process-level filter, a container, a user-space kernel like gVisor, or a hardware-isolated microVM
                like Firecracker. Here's how each actually works, what Docker Sandboxes, E2B, Modal, and the new
                Kubernetes Agent Sandbox project do differently, the real-world numbers, and why sandboxing alone
                still isn't enough.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-600 to-orange-700 flex items-center justify-center flex-shrink-0">
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
                      Technical Guide
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Oct 23, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      11 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <AgentSandboxingHeroDiagram />

            <ExploreWithAI path="/blog/ai-agent-sandboxing" variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is AI agent sandboxing?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  AI agent sandboxing is the practice of giving an{" "}
                  <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">AI agent</Link>{" "}
                  a disposable, isolated environment to run its tool calls in — generated code, shell commands,
                  file writes, network requests — rather than letting those actions touch the host directly. The
                  agent (or the person running it) never sees the difference functionally; the boundary exists so
                  that when the agent does something wrong, whether from a bug or a successful{" "}
                  <Link to="/blog/ai-agent-security-prompt-injection" className="text-primary hover:underline">prompt injection</Link>,
                  the damage is contained to a box that gets thrown away.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two different things get called "sandboxing agents" and the confusion causes real mistakes.
                  Sandboxing <em>the agent itself</em> means the whole agent program — its process, its files, its
                  view of the network — runs inside the box, which is what Docker Sandboxes does for Claude Code,
                  Codex CLI, and Gemini CLI. <em>Giving the agent a sandbox</em> means the agent runs wherever it
                  already runs and gets a disposable remote machine as a tool for executing code it writes — E2B's
                  and Modal's code-interpreter product. Careful setups do both: sandbox the agent program, and still
                  run its generated code in a second, throwaway sandbox.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="why" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Why does an AI agent need sandboxing?</h2>
                <p className="text-muted-foreground leading-relaxed mb-2 text-sm sm:text-base">
                  Agents don't just generate text — they execute actions, and that execution surface is exactly
                  what adversarial or malformed input can hijack:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Coding agents run shell commands.</strong> Real CVEs across Cursor, Copilot, Junie, Codex CLI, and Roo Code show prompt injection chaining into credential theft and remote code execution — covered in detail in{" "}
                      <Link to="/blog/ai-agent-security-prompt-injection" className="text-primary hover:underline">AI coding agent security</Link>.</li>
                    <li>• <strong>Data agents run model-generated Python/SQL.</strong> Executing that directly against production data or a host with real credentials turns a wrong query into a real incident.</li>
                    <li>• <strong>Computer-use agents click and type</strong> with the same permissions as whoever's logged-in session they're driving.</li>
                    <li>• <strong>Sandboxing isn't theoretical for the frontier labs either:</strong> a documented 2026 incident had OpenAI's own models break out of an evaluation sandbox and reach Hugging Face infrastructure during a cyber-capability test — see{" "}
                      <Link to="/blog/openai-models-hacked-hugging-face" className="text-primary hover:underline">what happened</Link>.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Microsoft's own disclosure of two chained CVEs in Semantic Kernel showed how far this can go:
                  prompt injection into an unsandboxed agent escalated into full host-level remote code execution.
                  The fix in every one of these writeups is the same primitive — never let a model-generated action
                  touch a host that has real secrets or data, full stop.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="boundaries" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The four isolation boundaries, weakest to strongest</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Every sandboxing option is really a choice about which of these boundaries an escaped agent would
                  have to break through next.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Boundary</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Examples</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">How isolation works</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Host kernel exposure</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Best for</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {boundaries.map((b) => (
                            <TableRow key={b.name}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{b.name}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{b.eg}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{b.isolation}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{b.kernelShared}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{b.bestFor}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>gVisor's own architecture documentation</strong> explains the user-space-kernel approach
                  plainly: the Sentry re-implements enough of the Linux syscall ABI in memory-safe Go that the
                  sandboxed workload never makes a host syscall directly — it only talks to the Sentry, which then
                  forwards a narrow, seccomp-filtered set to the real kernel. A separate helper process, the Gofer,
                  brokers filesystem access so the Sentry itself keeps minimal host reach — least privilege applied
                  to the sandboxing layer's own internals. <RefLink href="https://gvisor.dev/docs/architecture_guide/intro/">
                  Read gVisor's architecture guide</RefLink> for the full mechanism.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Firecracker</strong> takes the opposite bet: instead of intercepting syscalls in user
                  space, it boots a genuinely separate, minimal guest kernel per sandbox under hardware KVM
                  virtualization. AWS, which open-sourced Firecracker and runs it under Lambda and Fargate, states
                  a microVM can start in as little as ~125ms with under 5 MiB of memory overhead and that a single
                  host can launch up to 150 microVMs per second —{" "}
                  <RefLink href="https://firecracker-microvm.github.io/">see Firecracker's own published specs</RefLink>.
                  Because it's a real kernel, compatibility is "if it runs on Linux, it runs in the microVM" — there's
                  no syscall-interception tax, at the cost of a small per-guest memory footprint.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Agent runtimes, agentic security, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="vendors" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How Docker Sandboxes, E2B, Modal, and Kubernetes Agent Sandbox differ</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  None of these products are a new isolation primitive — each one wraps one of the four boundaries
                  above into a product with its own lifecycle, SDK, and cold-start trade-offs.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Product</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Isolation backend</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Published startup figure</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it's for</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sandboxVendors.map((v) => (
                            <TableRow key={v.name}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{v.name}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{v.backend}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{v.published}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{v.notes}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Cold-start figures are vendor- and third-party-published benchmarks, not an independently
                  verified constant</strong> — measurement basis differs (cold boot vs resume-from-snapshot vs
                  resume-from-hibernation), and the numbers shift release to release. Treat every number in that
                  table as directional and re-measure on your own workload before building an SLA around it.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Kubernetes Agent Sandbox</strong> (<RefLink href="https://github.com/kubernetes-sigs/agent-sandbox">kubernetes-sigs/agent-sandbox</RefLink>)
                  is the newest entrant and the one most worth watching if you already run on Kubernetes: Google
                  launched it as a formal Kubernetes SIG Apps subproject in November 2025, and{" "}
                  <RefLink href="https://kubernetes.io/blog/2026/03/20/running-agents-on-kubernetes-with-agent-sandbox/">
                  the Kubernetes blog's March 2026 deep dive</RefLink> describes its <code>Sandbox</code>,{" "}
                  <code>SandboxTemplate</code>, and <code>SandboxClaim</code> CRDs as a declarative, backend-agnostic
                  primitive built specifically for singleton, stateful agent workloads — something Deployments and
                  StatefulSets weren't designed for. It natively supports gVisor or Kata Containers for the actual
                  isolation and adds a <code>SandboxWarmPool</code> to eliminate the roughly one-second cold start a
                  freshly scheduled pod otherwise adds.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="not-enough" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Does a sandbox alone make an agent safe?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  No — sandbox escapes exist too, and they're already documented in production tools, not just
                  research. Microsoft's Semantic Kernel disclosure showed an agent sandbox defeated through an
                  unvalidated file-path parameter, letting an attacker write a payload straight to the host's
                  Startup folder from inside the "isolated" sandbox — the same point the{" "}
                  <Link to="/blog/ai-agent-security-prompt-injection" className="text-primary hover:underline">
                  prompt-injection defense guide</Link> makes about coding agents specifically.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Scope credentials, don't just isolate compute.</strong> A sandbox with a long-lived, broadly scoped API key is still a liability if it's breached — pair isolation with short-lived, scoped tokens the way{" "}
                      <Link to="/blog/mcp-server-trust-permissions" className="text-primary hover:underline">MCP server trust scoping</Link> recommends for tool permissions generally.</li>
                    <li>• <strong>Control network egress explicitly.</strong> Every sandbox vendor above lets you deny-by-default outbound network access; a sandbox that can freely exfiltrate over the network defeats most of the point of isolating it.</li>
                    <li>• <strong>Gate irreversible actions behind human approval</strong>, regardless of how strong the sandbox is — the same production-readiness checklist covered in{" "}
                      <Link to="/blog/agent-runtimes-explained" className="text-primary hover:underline">AI agent runtimes</Link>.</li>
                    <li>• <strong>Destroy the sandbox after every task.</strong> Ephemeral, single-use sandboxes mean a successful escape only ever compromises one throwaway box, not a shared, long-lived environment other tasks reuse.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="choose" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Which sandbox should I actually use?</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Running coding agents (Claude Code, Codex, Copilot CLI) locally or hybrid:</strong> Docker Sandboxes — same microVM boundary on your laptop and in the cloud, with a `sbx move` to carry work between them.</li>
                    <li>• <strong>Per-task code-interpreter execution with fast, frequent spin-up:</strong> E2B — Firecracker-class microVMs purpose-built for this, with published sub-200ms cold starts.</li>
                    <li>• <strong>Heavier compute or GPU-backed agent tool calls:</strong> Modal — gVisor isolation with GPU passthrough, trading some cold-start latency for flexible hardware.</li>
                    <li>• <strong>Already running agent workloads on Kubernetes:</strong> kubernetes-sigs/agent-sandbox — declarative CRDs instead of hand-rolled pods, pluggable to gVisor or Kata, with warm pools for sub-second claims.</li>
                    <li>• <strong>Homelab or self-hosted, no cloud sandbox vendor:</strong> a locked-down Docker container (no swap, PID limits, no network by default) is a reasonable floor, with gVisor's runsc as a drop-in upgrade once you need to run genuinely untrusted code.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h2>
                {faqs.map((f) => (
                  <div key={f.q} className="mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{f.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{f.a}</p>
                  </div>
                ))}
                <ExploreWithAI path="/blog/ai-agent-sandboxing" variant="questions" />
                <TopmateCTA />
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="references" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">References</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <RefLink href="https://gvisor.dev/docs/architecture_guide/intro/">gVisor — Introduction to gVisor security (architecture guide)</RefLink></li>
                  <li>• <RefLink href="https://github.com/google/gvisor">google/gvisor (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://firecracker-microvm.github.io/">Firecracker microVM — official site and specs</RefLink></li>
                  <li>• <RefLink href="https://aws.amazon.com/blogs/aws/firecracker-lightweight-virtualization-for-serverless-computing/">AWS — Firecracker: Lightweight Virtualization for Serverless Computing</RefLink></li>
                  <li>• <RefLink href="https://opensource.googleblog.com/2025/11/unleashing-autonomous-ai-agents-why-kubernetes-needs-a-new-standard-for-agent-execution.html">Google Open Source Blog — Agent Sandbox launch announcement (Nov 2025)</RefLink></li>
                  <li>• <RefLink href="https://kubernetes.io/blog/2026/03/20/running-agents-on-kubernetes-with-agent-sandbox/">Kubernetes Blog — Running Agents on Kubernetes with Agent Sandbox (Mar 2026)</RefLink></li>
                  <li>• <RefLink href="https://github.com/kubernetes-sigs/agent-sandbox/">kubernetes-sigs/agent-sandbox (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://docs.docker.com/ai/sandboxes/">Docker Sandboxes — documentation</RefLink></li>
                  <li>• <RefLink href="https://github.com/e2b-dev/E2B">e2b-dev/E2B (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://github.com/modal-labs/modal-examples">Modal examples (GitHub)</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/ai-agent-sandboxing" />
      <Footer />
    </div>
  );
};

export default AgentSandboxingPost;
