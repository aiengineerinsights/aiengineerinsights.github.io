import { ArrowLeft, Clock, User, Calendar, Wrench, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import ExploreWithAI from "@/components/ExploreWithAI";
import TableOfContents from "@/components/TableOfContents";
import ClaudeCodeSetupHeroDiagram from "@/components/ClaudeCodeSetupHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import { CLAUDE_CODE_STARTER_KIT } from "@/config/newsletterBonuses";

const PATH = "/blog/claude-code-best-practices";

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">{children}</p>
);
const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{children}</h2>
);
const H3 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h3 id={id} className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{children}</h3>
);
const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{children}</a>
);
const In = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-primary hover:underline">{children}</Link>
);
const C = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-muted px-1.5 py-0.5 text-[0.85em] font-mono text-foreground">{children}</code>
);
const Code = ({ children }: { children: string }) => (
  <pre className="bg-muted rounded-lg p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm mb-4"><code>{children}</code></pre>
);
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">{children}</ul>
);

// `codeFirst` sets the first column in a code font (file paths, commands).
const DataTable = ({ head, rows, codeFirst }: { head: string[]; rows: string[][]; codeFirst?: boolean }) => (
  <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
    <div className="min-w-full inline-block align-middle">
      <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
        <Table>
          <TableHeader>
            <TableRow>{head.map((h) => <TableHead key={h} className="text-xs sm:text-sm px-2 sm:px-4">{h}</TableHead>)}</TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r[0]}>
                {r.map((c, j) => (
                  <TableCell key={j} className={`text-xs sm:text-sm px-2 sm:px-4 align-top ${j === 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                    {j === 0 && codeFirst ? <code className="font-mono break-words">{c}</code> : c}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
);

const ClaudeCodeBestPracticesPost = () => {
  const whereRows = [
    ["CLAUDE.md", "What Claude cannot work out from the code: test commands, misleading spots, team decisions", "Claude decides", "./CLAUDE.md"],
    ["Rules", "Conventions for one part of the codebase, loaded only when Claude works there", "Claude decides", ".claude/rules/*.md"],
    ["Skills", "Procedures: how you release, review, write docs, handle an incident", "Claude decides (or only you start it)", ".claude/skills/<name>/SKILL.md"],
    ["Permission rules", "What Claude may read, run and fetch", "Always enforced", ".claude/settings.json"],
    ["Hooks", "Steps with zero exceptions: format after edit, block a folder", "Always enforced", ".claude/settings.json"],
    ["Sandbox", "OS-level limits on files and network for shell commands", "Always enforced", "/sandbox"],
    ["Done check", "Tests, typecheck, a Stop hook, CI", "Always enforced", "Your test command"],
    ["MCP servers", "Systems with no CLI: issue tracker, docs, dashboards", "Adds tools", ".mcp.json"],
    ["Plugins", "Ready-made packs of skills, hooks and subagents", "Adds tools", "/plugin"],
    ["Subagents", "Parallel work, noisy output, an independent reviewer", "Claude delegates", ".claude/agents/"],
  ];

  const addOns = [
    ["Workflow pack", "Everything Claude Code (ECC)", "Broad: its plugin describes 38 agents, 156 skills and ready-made hooks, with a selective install", "You want one pack that covers review, testing, security and many languages"],
    ["Workflow pack", "Superpowers", "Opinionated: a fixed brainstorm, plan, test-first, review cycle", "You want one process the whole team follows"],
    ["Loop", "Built-in /goal", "Keeps working until a condition you write is met", "Almost always: try this before any loop plugin"],
    ["Loop", "ralph-loop (Anthropic's marketplace)", "Re-feeds the same prompt until a completion phrase appears", "You want the Ralph technique exactly, with --max-iterations"],
    ["Memory", "claude-mem", "Carries context from earlier sessions into new ones", "Long projects where you keep re-explaining decisions"],
    ["Docs", "Context7 (MCP server)", "Fetches current library documentation", "You work with fast-moving libraries"],
    ["Browser", "Playwright (MCP server)", "Lets Claude open a page and check the result", "Front-end work"],
  ];

  const commitRows = [
    ["CLAUDE.md", "Yes", "Everyone on the repo"],
    [".claude/settings.json", "Yes", "Everyone: permissions and hooks"],
    [".claude/rules/, .claude/skills/, .claude/agents/", "Yes", "Everyone"],
    [".mcp.json", "Yes", "Everyone: shared MCP servers"],
    ["CLAUDE.local.md", "No, gitignore it", "Only you, this project"],
    [".claude/settings.local.json", "No", "Only you, this project"],
    ["~/.claude/CLAUDE.md, ~/.claude/settings.json", "Not in the repo", "Only you, all projects"],
    ["Managed settings", "Set by an admin", "The whole organisation; nobody can override them"],
  ];

  const stopRows = [
    ["Writing IMPORTANT or ALL CAPS on a rule Claude keeps missing", "Shorten the file, or move the rule to a hook or deny rule"],
    ["Adding \"think hard\" or \"be thorough\" to prompts", "Set the effort level with /effort"],
    ["Treating the context window as your main constraint", "Use /clear between tasks for focus and cost, not out of fear of running out"],
    ["Delegating to a subagent to get a better answer", "Use subagents for parallel work, noisy output or a fresh reviewer"],
    ["Telling Claude to keep going and not be lazy", "Give it a check to pass; use /goal or a Stop hook for unattended runs"],
    ["Describing your architecture and folders in CLAUDE.md", "Let Claude read the repo; write down only what is not in it"],
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full px-3 py-1">
                  <Wrench className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Coding</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Claude Code Best Practices (2026): A Setup That Scales From One Engineer to a Team
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Most Claude Code best practices come down to one decision: <strong>is this a guideline Claude should
                weigh, or a rule that must hold every time?</strong> Guidelines go in CLAUDE.md, rules and skills.
                Rules with no exceptions go in hooks, permission rules and the sandbox. This guide shows what belongs
                in each place, with config you can copy, which add-ons are worth installing, and how to roll the same
                setup out to a team.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <div className="font-semibold text-base sm:text-lg hover:underline">Gurram Poorna Prudhvi</div>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base">Lead AI Engineer</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center"><BarChart3 className="h-4 w-4 mr-1" />Intermediate</div>
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />Nov 18, 2026</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />13 min read</div>
                  </div>
                </div>
              </Card>
            </header>

            <ClaudeCodeSetupHeroDiagram />

            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-l-4 border-primary" aria-label="TL;DR">
              <p className="text-sm sm:text-base leading-relaxed">
                <strong>TL;DR — Claude Code best practices:</strong> keep <C>CLAUDE.md</C> under 200 lines and limit it
                to what Claude cannot read from the code. Put anything that must happen every time in a hook or a deny
                rule, because CLAUDE.md is advice. Give Claude a pass/fail check to run so it can finish without you.
                Install one workflow pack, not three. Commit the shared config, keep personal config local, and cap
                turns or spend on any run you are not watching.
              </p>
            </div>

            <ExploreWithAI path={PATH} variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <H2 id="one-idea">1. The One Idea: What Claude Decides vs What Claude Code Enforces</H2>
                <P>
                  Anthropic's docs split every instruction into two kinds, and most setup problems are a rule filed
                  under the wrong one.
                </P>
                <UL>
                  <li>• <strong>Claude decides.</strong> Your prompt, <C>CLAUDE.md</C>, rules and skills are text the model reads. It follows them nearly every time, but it is allowed to judge that a guideline does not apply.</li>
                  <li>• <strong>Claude Code enforces.</strong> Hooks, deny rules, the sandbox and managed settings are configuration the program applies itself. The model's opinion does not come into it.</li>
                </UL>
                <P>
                  Most of the time you want the first kind. Guidelines have exceptions, and a model looking at the
                  actual code is usually better placed to spot one than a rule you wrote last month. Keep the second
                  kind for the few things where "nearly every time" is not good enough: never read <C>.env</C>, always
                  run the formatter, never edit the migrations folder.
                </P>
                <P>
                  A quick test: if you keep adding emphasis to a line in CLAUDE.md and Claude still misses it, the
                  line is in the wrong place. It is either lost in a file that has grown too long, or it is a
                  no-exceptions rule that belongs in a hook.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="what-goes-where">2. What Goes Where in a Claude Code Setup</H2>
                <DataTable head={["Layer", "What belongs there", "Who decides", "Where it lives"]} rows={whereRows} />
                <P>
                  Set these up in order, top to bottom, and stop when the problems stop. A solo developer on a small
                  repo may never need more than the first four rows. New to the commands themselves? Keep the{" "}
                  <In to="/blog/claude-code-cheat-sheet">Claude Code cheat sheet</In> open alongside this guide.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="claude-md">3. How to Write a CLAUDE.md That Works</H2>
                <P>
                  Claude Code loads <C>CLAUDE.md</C> into every session, so each line costs a little attention on
                  every task. The file earns its place only when it holds things Claude could not find by reading the
                  repo:
                </P>
                <UL>
                  <li>• <strong>How to check work here:</strong> the exact test, lint and typecheck commands, and how to run one test file.</li>
                  <li>• <strong>Where the code misleads:</strong> an old pattern new code must not copy, a folder that looks dead but is not.</li>
                  <li>• <strong>Decisions that are not in the repo:</strong> which helper the team settled on, how deploys work.</li>
                  <li>• <strong>Anything you have corrected twice.</strong></li>
                </UL>
                <P>Here is a template for a Python service. It is short on purpose.</P>
                <Code>{`# Commands
- Install: uv sync
- Run one test file: uv run pytest tests/test_retrieval.py -q
- Lint and types: uv run ruff check . && uv run pyright

# Conventions
- Call models through app/llm/client.py, never import a vendor SDK directly
- Prompts live in app/prompts/*.md, not inline in Python
- app/legacy/ is still in production: fix bugs there, do not copy its patterns

# Gotchas
- Eval tests need EVAL_DATASET_PATH set, see .env.example
- Changing a prompt means re-running: uv run python -m evals.run --suite smoke`}</Code>
                <UL>
                  <li>• Run <C>/init</C> for a first draft, then delete lines. The memory docs recommend staying under 200.</li>
                  <li>• <C>/doctor</C> suggests cuts for anything Claude can already work out from the code.</li>
                  <li>• Personal preferences go in <C>CLAUDE.local.md</C>, which you add to <C>.gitignore</C>.</li>
                  <li>• <C>/context all</C> confirms the file was loaded.</li>
                </UL>

                <H3 id="rules">Scope a rule to one folder</H3>
                <P>
                  A rule that only matters in one part of the codebase goes in <C>.claude/rules/</C> with a{" "}
                  <C>paths</C> filter, so it loads only when Claude is working there:
                </P>
                <Code>{`# .claude/rules/api.md
---
paths:
  - "app/api/**/*.py"
---
- Validate request bodies with the pydantic models in app/api/schemas/
- Every new endpoint needs an entry in openapi.yaml; CI fails without it`}</Code>

                <H3 id="skills">Put procedures in skills</H3>
                <P>
                  How your team cuts a release or writes a postmortem is a procedure, not a guideline. Save it as a
                  skill at <C>.claude/skills/&lt;name&gt;/SKILL.md</C>. Claude sees only the short description until
                  the task calls for it, so a long procedure does not weigh on unrelated work. For anything with side
                  effects, add <C>disable-model-invocation: true</C> so it runs only when you type the command. The
                  full walk-through is in <In to="/blog/claude-code-skills">Claude Skills: how to add, use and create them</In>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="done-check">4. Give Claude a Check to Run</H2>
                <P>
                  Claude stops when the work looks done. Without something that returns pass or fail, "looks done" is
                  all it has, and you become the test suite. With a check, it can make the change, run the check, read
                  the failure and fix it without you.
                </P>
                <UL>
                  <li>• <strong>Ask for it:</strong> name the command in the prompt and in CLAUDE.md. This works most of the time.</li>
                  <li>• <strong>Enforce it:</strong> a <C>Stop</C> hook runs the check whenever Claude tries to finish. Exit code 2 blocks the stop and sends the error output back to Claude.</li>
                </UL>
                <Code>{`// .claude/settings.json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          { "type": "command", "command": "uv run pytest -q 1>&2 || exit 2" }
        ]
      }
    ]
  }
}`}</Code>
                <P>
                  There is a safety valve: if a Stop hook blocks eight stops in a row with no tool call between them,
                  Claude Code overrides the next block and ends the turn. Keep the check fast, because it runs on
                  every stop.
                </P>
              </section>

              <NewsletterSignup bonus={CLAUDE_CODE_STARTER_KIT} />

              <section className="mb-6 sm:mb-8">
                <H2 id="enforce">5. Rules With No Exceptions: Hooks, Permissions and the Sandbox</H2>

                <H3 id="hooks">Hooks</H3>
                <P>
                  A hook runs your command at a fixed point: before or after a tool call, when Claude tries to stop,
                  when a session starts. This one formats every Python file Claude edits, and blocks edits to a frozen
                  folder:
                </P>
                <Code>{`// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "f=$(jq -r '.tool_input.file_path'); case \\"$f\\" in *.py) uv run ruff format \\"$f\\";; esac" }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "jq -r '.tool_input.file_path' | grep -q '/migrations/' && { echo 'migrations/ is frozen' >&2; exit 2; } || exit 0" }
        ]
      }
    ]
  }
}`}</Code>
                <P>
                  You do not have to write these by hand. "Write a hook that blocks edits to the migrations folder"
                  works as a prompt, and <C>/hooks</C> shows the result. One caution from the docs: a hook that asks a
                  model to decide (a <C>prompt</C> or <C>agent</C> hook) is not deterministic. For real enforcement
                  use a <C>command</C> or <C>http</C> hook.
                </P>

                <H3 id="permissions">Permission rules</H3>
                <P>
                  Permission rules decide what Claude may run, read and fetch. <C>deny</C> rules hold in every
                  permission mode, including auto and <C>bypassPermissions</C>, which is why secrets belong here:
                </P>
                <Code>{`// .claude/settings.json
{
  "permissions": {
    "allow": ["Bash(uv run pytest *)", "Bash(uv run ruff *)"],
    "ask":   ["Bash(git push *)"],
    "deny":  ["Read(./.env)", "Read(./.env.local)", "Read(./secrets/**)"]
  }
}`}</Code>
                <P>
                  Rules match tool calls, not intent. A <C>Read</C> deny rule catches <C>cat .env</C> too, but not a
                  script that opens the file, and a <C>WebFetch</C> deny rule does nothing about <C>curl</C> unless
                  the sandbox is on.
                </P>

                <H3 id="sandbox">The sandbox and permission modes</H3>
                <UL>
                  <li>• <strong>Sandbox:</strong> <C>/sandbox</C> turns on OS-level limits for shell commands on macOS, Linux and WSL2, and picks up your <C>Read</C> deny rules. For anything security-related, use permission rules and the sandbox together.</li>
                  <li>• <strong>Auto mode:</strong> what interactive sessions start in. A separate classifier model checks actions and stops things like <C>curl | bash</C>, production deploys and force pushes. It is a judgment call, not a hard rule, so your "never" rules still belong in deny rules or hooks.</li>
                  <li>• <strong>Manual mode:</strong> you approve every edit and command. Safe, but people start approving without reading.</li>
                  <li>• <strong>bypassPermissions:</strong> only in a container you can throw away.</li>
                </UL>
                <P>
                  Keep the enforced set small. Every hook and deny rule sometimes fires when it should not, and someone
                  has to maintain it. The docs' own warning sign is forty of them: at that point most are preferences.
                  For the security side in depth, see <In to="/blog/ai-agent-sandboxing">AI agent sandboxing</In> and{" "}
                  <In to="/blog/mcp-server-trust-permissions">MCP server trust and permissions</In>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="add-ons">6. Which Claude Code Plugins and Add-Ons Are Worth Installing?</H2>
                <P>
                  Add tools in layers and only when the layer below is working. Every installed skill and MCP server
                  adds its name and description to each session, so more is not free. <C>/usage</C> breaks your usage
                  down by skill, plugin and MCP server, and <C>/skill-doctor</C> shows what each skill costs.
                </P>
                <DataTable head={["Layer", "Option", "What it gives you", "Pick it when"]} rows={addOns} />
                <UL>
                  <li>• <strong>Pick one workflow pack.</strong> ECC and Superpowers overlap. Running both loads two sets of planning and review skills into every session.</li>
                  <li>• <strong>Use a CLI before an MCP server.</strong> If a system has a CLI Claude can call, such as <C>gh</C>, that is usually simpler. Add MCP for systems without one: <C>claude mcp add --transport http &lt;name&gt; &lt;url&gt;</C>.</li>
                  <li>• <strong>Read before you install.</strong> Plugins can run code through hooks. Install from sources you trust and skim the hooks first.</li>
                </UL>
                <P>
                  Install the official loop plugin with <C>/plugin install ralph-loop@claude-plugins-official</C>. For
                  the others, follow each project's own README:{" "}
                  <A href="https://github.com/affaan-m/everything-claude-code">Everything Claude Code</A>,{" "}
                  <A href="https://github.com/obra/superpowers">Superpowers</A>,{" "}
                  <A href="https://github.com/thedotmack/claude-mem">claude-mem</A>,{" "}
                  <A href="https://github.com/upstash/context7">Context7</A> and{" "}
                  <A href="https://github.com/microsoft/playwright-mcp">Playwright MCP</A>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="team">7. How Do You Set Up Claude Code for a Team?</H2>
                <P>Where a file lives decides who it applies to. Commit the shared ones and keep the personal ones out of git.</P>
                <DataTable head={["File", "Commit it?", "Applies to"]} rows={commitRows} codeFirst />
                <P>A rollout order that avoids shipping everything at once:</P>
                <UL>
                  <li>• <strong>Week 1:</strong> a short <C>CLAUDE.md</C> with the test commands, plus deny rules for secrets. Review changes to it like code.</li>
                  <li>• <strong>Weeks 2–3:</strong> one formatting hook and one Stop hook. Add path-scoped rules where people keep correcting the same thing.</li>
                  <li>• <strong>Month 2:</strong> turn repeated procedures into skills. Add shared MCP servers in <C>.mcp.json</C>.</li>
                  <li>• <strong>Later:</strong> package the stable parts as a plugin so other repos can install them. Security policy goes in managed settings, the one place personal settings cannot override.</li>
                </UL>
                <P>
                  In a monorepo, give each team's directory its own <C>CLAUDE.md</C>. Files in subdirectories load on
                  demand, so a team only loads its own conventions. This is the same shape as{" "}
                  <In to="/blog/conways-law-ai">Conway's law for AI teams</In>: the config ends up mirroring who owns
                  what.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="unattended">8. Letting Claude Code Run Without You</H2>
                <P>Before a run goes unattended, answer five questions for that task:</P>
                <UL>
                  <li>• <strong>What does done look like?</strong> A goal condition, a spec file, or a failing test to turn green.</li>
                  <li>• <strong>Can it check its own work?</strong> Tests, a Stop hook, a review step.</li>
                  <li>• <strong>What may it touch?</strong> Permission rules, the sandbox, a worktree, one branch.</li>
                  <li>• <strong>What stops it?</strong> A turn limit, a budget, a spend limit.</li>
                  <li>• <strong>Who signs off?</strong> A pull request and a person approving the merge.</li>
                </UL>

                <H3 id="goal">Goals: the built-in loop</H3>
                <P>
                  <C>/goal</C> sets a completion condition and Claude keeps working until it is met. After each turn a
                  separate model checks the condition. That checker reads the conversation; it does not run commands
                  itself. So write a condition Claude's own output can prove:
                </P>
                <Code>{`/goal uv run pytest tests/retrieval exits 0 and ruff check is clean,
      without editing any file under tests/, or stop after 20 turns`}</Code>
                <UL>
                  <li>• One measurable end state, a stated check, and the constraints that matter.</li>
                  <li>• A goal does not change your permission mode. Run it in auto mode if it should not stop to ask.</li>
                  <li>• <C>/goal</C> with no argument shows turns, time and token spend. <C>/goal clear</C> stops it.</li>
                </UL>
                <P>
                  <C>/loop</C> is different: it repeats a prompt on a time interval, which suits polling ("every 15
                  minutes, check CI"). A Stop hook is the deterministic version of a goal, because your script decides.
                </P>

                <H3 id="scripts">Scripts and CI</H3>
                <P>
                  <C>claude -p</C> runs once and exits. In a script, pre-approve the tools it needs, refuse the rest,
                  and cap the turns:
                </P>
                <Code>{`claude --bare -p "Migrate $file to the new logger API and commit. Reply OK or FAIL." \\
  --allowedTools "Read,Edit,Bash(git add *),Bash(git commit *)" \\
  --permission-mode dontAsk \\
  --max-turns 20`}</Code>
                <UL>
                  <li>• <C>--bare</C> skips hooks, skills, plugins, MCP servers and CLAUDE.md so the run behaves the same everywhere. Do not use it for a run that depends on your hooks.</li>
                  <li>• <C>claude -w &lt;name&gt;</C> gives each parallel session its own git worktree so edits cannot collide.</li>
                  <li>• <C>/schedule</C> sets up cloud tasks that run on a timer. Protect <C>main</C> with a branch rule before you leave one running.</li>
                  <li>• Try any unattended job on three files first.</li>
                </UL>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="stop-doing">9. Claude Code Advice You Can Stop Following</H2>
                <P>
                  Much of the advice still circulating was a workaround for older models. Anthropic's docs now list
                  these as habits to drop:
                </P>
                <DataTable head={["Old habit", "Do this instead"]} rows={stopRows} />
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="faq">10. FAQ</H2>

                <H3 id="faq-best-practices">What are the best practices for Claude Code?</H3>
                <P>
                  Keep CLAUDE.md short and limited to what Claude cannot read from the code. Put rules that must
                  always hold in hooks, deny rules and the sandbox. Give Claude a pass/fail check such as your test
                  command so it can verify its own work. Use /clear between unrelated tasks, and cap turns or spend on
                  any run you are not watching.
                </P>

                <H3 id="faq-claude-md">What should go in CLAUDE.md?</H3>
                <P>
                  Only what Claude cannot work out from the repo: the exact test, lint and typecheck commands, places
                  where the code is misleading, team decisions that are not written in the code, and anything you have
                  had to correct twice. Leave out architecture and folder descriptions, and keep the file under about
                  200 lines.
                </P>

                <H3 id="faq-claude-md-vs-hooks">What is the difference between CLAUDE.md and hooks?</H3>
                <P>
                  CLAUDE.md is text the model reads, so it is advice: Claude follows it nearly every time but can
                  decide a guideline does not apply. A hook is a command Claude Code runs itself at a fixed point, so
                  it happens every time. Use CLAUDE.md for guidelines and hooks for rules with zero exceptions.
                </P>

                <H3 id="faq-plugins">Which Claude Code plugins should I install first?</H3>
                <P>
                  Start with none and add them when a problem shows up. Then pick one workflow pack, such as
                  Everything Claude Code or Superpowers, not both. Add a memory plugin for long projects and an MCP
                  server such as Context7 or Playwright when you need current docs or a browser. Every add-on costs
                  context in each session.
                </P>

                <H3 id="faq-team">How do I set up Claude Code for a team?</H3>
                <P>
                  Commit CLAUDE.md, .claude/settings.json, and the rules, skills and agents folders so everyone shares
                  them. Keep CLAUDE.local.md and settings.local.json out of git for personal preferences. Start with a
                  short CLAUDE.md and deny rules for secrets, add hooks next, then skills, and put security policy in
                  managed settings.
                </P>

                <H3 id="faq-auto-mode">Is auto mode safe to use in Claude Code?</H3>
                <P>
                  Auto mode is the default for interactive sessions and is a reasonable middle ground. A classifier
                  model checks each action and stops risky ones such as production deploys and force pushes. Because
                  it is a model's judgment and not a hard rule, anything that must never happen should also be a deny
                  rule or a hook, which apply before the classifier runs.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="sources">11. Sources</H2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <A href="https://code.claude.com/docs/en/best-practices">Claude Code docs — Best practices</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/memory">Claude Code docs — Memory and CLAUDE.md</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/hooks-guide">Claude Code docs — Hooks guide</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/permission-modes">Claude Code docs — Permission modes</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/goal">Claude Code docs — Keep Claude working toward a goal</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/skills">Claude Code docs — Skills</A></li>
                  <li>• <A href="https://claude.com/resources/articles/steering-claude-code-skills-hooks-rules-subagents-and-more">Anthropic — Steering Claude Code: CLAUDE.md, skills, hooks and subagents</A></li>
                  <li>• <A href="https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop">ralph-loop plugin, Anthropic's official marketplace</A></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-xs sm:text-sm italic">
                  Checked against Anthropic's Claude Code docs on November 18, 2026. The examples are ours, written for
                  a Python project; adapt the commands to your stack and test each hook before you rely on it. Add-on
                  descriptions come from each project's own repository. Claude Code ships updates weekly.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current={PATH} />
      <Footer />
    </div>
  );
};

export default ClaudeCodeBestPracticesPost;
