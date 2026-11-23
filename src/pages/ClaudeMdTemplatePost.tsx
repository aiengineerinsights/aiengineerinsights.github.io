import { ArrowLeft, Clock, User, Calendar, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import ExploreWithAI from "@/components/ExploreWithAI";
import TableOfContents from "@/components/TableOfContents";
import ColumnsHeroDiagram from "@/components/ColumnsHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import { CLAUDE_CODE_STARTER_KIT } from "@/config/newsletterBonuses";

const PATH = "/blog/claude-md-template";

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
const DataTable = ({ head, rows }: { head: string[]; rows: string[][] }) => (
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
                  <TableCell key={j} className={`text-xs sm:text-sm px-2 sm:px-4 align-top ${j === 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}>{c}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
);

const pythonTemplate = `# Commands
- Install: uv sync
- Run the API locally: uv run uvicorn app.main:app --reload
- Run one test file: uv run pytest tests/test_orders.py -q
- Lint and types: uv run ruff check . && uv run pyright
- New migration: uv run alembic revision --autogenerate -m "describe change"

# Conventions
- Raise the errors in app/errors.py, never a bare Exception
- Database access goes through app/repositories/, not from route handlers
- Settings come from app/config.py; do not read os.environ elsewhere
- app/legacy/ is still in production: fix bugs there, do not copy its patterns

# Gotchas
- Integration tests need DATABASE_URL set, see .env.example
- Never edit a migration that is already merged; add a new one
- The orders table is large: any new query on it needs an index review`;

const tsTemplate = `# Commands
- Install: pnpm install
- Dev server: pnpm dev
- Run one test file: pnpm vitest run path/to/file.test.ts
- Typecheck: pnpm tsc --noEmit
- Lint: pnpm lint
- End-to-end tests: pnpm playwright test (needs the dev server running)

# Conventions
- Server data is fetched in src/lib/api/, never inside components
- Use the Button, Input and Dialog in src/components/ui/, do not add a new UI library
- Use the error helpers in src/lib/errors.ts, never throw raw strings
- Prefer named exports
- src/legacy/ is still live but do not copy its patterns into new code

# Gotchas
- Environment variables are validated in src/env.ts; add new ones there first
- Translations live in messages/*.json: every new string needs a key in en.json
- Do not change files under src/generated/, they are rebuilt by pnpm codegen`;

const monorepoTemplate = `# Layout
- apps/web (customer site), apps/admin, services/api, packages/ui, packages/config
- Each app and service has its own CLAUDE.md with its commands. Read it before working there.

# Commands (run from the repo root)
- Install: pnpm install
- Test one package: pnpm --filter @acme/api test
- Build one app: pnpm turbo run build --filter=@acme/web
- Lint everything: pnpm turbo run lint

# Conventions
- Shared code goes in packages/, never import from one app into another
- A change to packages/ui needs a changeset: pnpm changeset
- Keep a pull request inside one app or package where possible

# Gotchas
- services/api owns the database schema; other packages must not write SQL
- CI only runs tests for packages that changed, so run the affected package's tests yourself`;

const mlTemplate = `# Commands
- Install: uv sync
- Fast tests: uv run pytest -q -m "not slow"
- Lint: uv run ruff check .
- Smoke eval (about 2 minutes): uv run python -m evals.run --suite smoke
- Pull data and model files: dvc pull

# Conventions
- Notebooks in notebooks/ are for exploration; never import from them
- Reusable code lives in src/pipeline/ and has tests
- Every experiment is a config file in configs/, not edited constants in code
- Set the random seed through utils.seed_everything, never ad hoc

# Gotchas
- Do not start a full training run. Ask first; a full run takes hours and costs money
- data/raw/ is read-only. Write derived data to data/processed/
- Changing a prompt or a preprocessing step means re-running the smoke eval
- Never print or commit rows from data/raw/, they contain customer data`;

const ClaudeMdTemplatePost = () => {
  const leaveOut = [
    ["Folder layout, architecture overview, dependency list", "Claude reads the repo itself. /doctor proposes cutting exactly these", "Nowhere. Delete it"],
    ["A multi-step procedure (release, migration, incident steps)", "It costs attention on every unrelated task", "A skill, which loads only when it is needed"],
    ["Rules for one folder or file type", "They load in every session, even when Claude never touches that code", "A path-scoped file in .claude/rules/"],
    ["A rule that must never be broken", "CLAUDE.md is context, not enforced configuration", "A hook, a deny rule or a managed setting"],
    ["Your personal preferences", "The file is shared with the whole team through git", "CLAUDE.local.md, added to .gitignore"],
    ["IMPORTANT, NEVER and repeated emphasis", "The docs say emphasis probably will not fix an ignored line", "Shorten the file, or move the rule to a hook"],
    ["Vague advice such as \"write clean code\"", "Nothing in it can be checked", "A specific line: \"Use 2-space indentation\""],
    ["Two lines that disagree", "Claude may pick one arbitrarily", "Remove one; /doctor prompt-audit finds them"],
  ];

  const files = [
    ["CLAUDE.md", "./CLAUDE.md or ./.claude/CLAUDE.md", "The team, through git", "At launch, in every session", "Commands, conventions and gotchas for the whole project"],
    ["CLAUDE.local.md", "./CLAUDE.local.md, in .gitignore", "Only you, in this project", "At launch, right after the CLAUDE.md beside it", "Your sandbox URLs, preferred test data"],
    [".claude/rules/*.md", "One topic per file, in .claude/rules/", "The team, through git", "No paths field: at launch. With paths: when Claude works on a matching file", "Rules for one part of the codebase"],
    ["~/.claude/CLAUDE.md", "Your home directory", "Only you, in every project", "At launch, before project files", "Personal style and tool preferences"],
    ["Subdirectory CLAUDE.md", "For example services/api/CLAUDE.md", "The team, through git", "When Claude reads or edits a file in that directory", "Commands and rules for one package in a monorepo"],
  ];

  const agents = [
    ["An AGENTS.md, and no CLAUDE.md or CLAUDE.local.md in your working directory or above it", "Your AGENTS.md"],
    ["An AGENTS.md and a CLAUDE.md or CLAUDE.local.md", "Your CLAUDE.md files only"],
    ["A CLAUDE.md that imports AGENTS.md", "Your CLAUDE.md, with AGENTS.md included through the import"],
  ];

  const checks = [
    ["/init", "Writes a starting CLAUDE.md from your codebase. If one exists, it suggests improvements and does not overwrite"],
    ["/context all", "Lists what loaded under Memory files, so you can confirm your file is there"],
    ["/memory", "Opens your CLAUDE.md files for editing and shows auto memory"],
    ["/doctor", "Proposes trims for content Claude can work out from the code"],
    ["/doctor prompt-audit", "Flags instructions written for older models, references to missing files, and lines that contradict each other. Needs v2.1.283 or later"],
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
                  <FileText className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Coding</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                CLAUDE.md Template: 4 Copy-Paste Examples for Claude Code (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Here are four CLAUDE.md templates you can copy: a Python service, a TypeScript web app, a monorepo and
                a data or ML project. Each one is short on purpose. After the templates you will find what to leave
                out, how <strong>CLAUDE.md</strong>, <strong>CLAUDE.local.md</strong> and{" "}
                <strong>.claude/rules</strong> differ, and how Claude Code now reads <strong>AGENTS.md</strong>. Every
                rule here was checked against Anthropic's Claude Code docs on November 23, 2026.
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
                    <p className="text-muted-foreground text-sm sm:text-base">AI Engineering Lead</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center"><BarChart3 className="h-4 w-4 mr-1" />Beginner</div>
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />Nov 23, 2026</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />10 min read</div>
                  </div>
                </div>
              </Card>
            </header>

            <ColumnsHeroDiagram
              gradientId="cmdtBg"
              title="WHERE CLAUDE CODE INSTRUCTIONS LIVE"
              subtitle="four files, and when Claude Code loads each one"
              columns={[
                { name: "CLAUDE.md", tag: "the team's instructions", color: "#f97316", lines: ["project root or .claude/", "loads in every session", "shared through git", "aim for under 200 lines"], best: "best for: commands and conventions" },
                { name: "CLAUDE.local.md", tag: "your own notes", color: "#5eb8c8", lines: ["project root, gitignored", "loads after CLAUDE.md", "only you see it", "one worktree only"], best: "best for: sandbox URLs, test data" },
                { name: ".claude/rules/", tag: "one topic per file", color: "#8b9cf0", lines: ["paths: scopes a rule", "scoped rules load on match", "no paths: loads at launch", "found in subfolders too"], best: "best for: rules for one folder" },
                { name: "AGENTS.md", tag: "shared with other agents", color: "#86c98f", lines: ["read if no CLAUDE.md exists", "needs v2.1.277 or later", "or import it: @AGENTS.md", "AGENTS.local.md is not read"], best: "best for: one file for every tool" },
              ]}
              footer="write down only what Claude cannot work out from the code"
              ariaLabel="Where Claude Code instructions live: four files and when each one loads. CLAUDE.md holds the team's instructions; it sits in the project root or in .claude/, loads in every session, is shared through git and should stay under 200 lines; best for commands and conventions. CLAUDE.local.md holds your own notes; it sits in the project root and is gitignored, loads after CLAUDE.md, only you see it and it exists in one worktree only; best for sandbox URLs and test data. .claude/rules/ holds one topic per file; a paths field scopes a rule, scoped rules load when Claude works on a matching file, rules without paths load at launch, and rules in subfolders are found too; best for rules for one folder. AGENTS.md is shared with other coding agents; Claude Code reads it if no CLAUDE.md exists, this needs version 2.1.277 or later, you can also import it with @AGENTS.md, and AGENTS.local.md is not read; best for one file for every tool. Whichever you use: write down only what Claude cannot work out from the code."
              source="aiengineerinsights.com · from Anthropic's Claude Code docs (memory, best practices), checked Nov 23 2026"
            />

            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-l-4 border-primary" aria-label="TL;DR">
              <p className="text-sm sm:text-base leading-relaxed">
                <strong>TL;DR — a CLAUDE.md template in three parts:</strong> <C>Commands</C> (install, run one test
                file, typecheck, lint), <C>Conventions</C> (decisions that are not visible in the code) and{" "}
                <C>Gotchas</C> (what breaks, and what you have corrected twice). Put it at <C>./CLAUDE.md</C>, keep it
                under 200 lines, and leave out anything Claude can read from the repo. Personal notes go in{" "}
                <C>CLAUDE.local.md</C>, rules for one folder go in <C>.claude/rules/</C>, and a rule that must never
                be broken goes in a hook, because CLAUDE.md is context and not enforcement. Run <C>/context all</C> to
                confirm the file loaded.
              </p>
            </div>

            <ExploreWithAI path={PATH} variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <H2 id="what-goes-in">1. What Goes in a CLAUDE.md?</H2>
                <P>
                  CLAUDE.md is a markdown file of instructions that Claude Code reads at the start of every session.
                  Because it loads every time, each line takes a little attention on every task. Anthropic's docs say
                  the file works best when it holds only what Claude could not work out from the code:
                </P>
                <UL>
                  <li>• <strong>How to confirm work in this repo:</strong> the exact test, typecheck and lint commands, and how to run a single test file.</li>
                  <li>• <strong>Places where the code is misleading:</strong> an old pattern that new code must not copy, or a directory that looks unused but is not.</li>
                  <li>• <strong>Decisions that are not in the repo:</strong> which error helper the team settled on, how deploys work, what needs a migration review.</li>
                  <li>• <strong>Anything you have had to correct twice.</strong></li>
                </UL>
                <P>
                  That is why all four templates below use the same three headings: Commands, Conventions and
                  Gotchas. The commands, paths and package names are examples. Replace every one with your own, and
                  delete any line that is not true for your repo. A wrong line is worse than a missing one.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="python-template">2. CLAUDE.md Template for a Python Service</H2>
                <P>
                  For an API or backend service that uses uv, pytest, ruff and Alembic. Swap in your own tools if you
                  use pip, poetry, mypy or Django migrations.
                </P>
                <Code>{pythonTemplate}</Code>
                <P>
                  Notice the "run one test file" line. Claude checks its own work as it goes, and running one file is
                  faster than running the whole suite after every edit.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="typescript-template">3. CLAUDE.md Template for a TypeScript Web App</H2>
                <P>For a React or Next.js app that uses pnpm, Vitest and Playwright.</P>
                <Code>{tsTemplate}</Code>
                <P>
                  "Prefer named exports" belongs here because it has exceptions and needs judgment. A rule with no
                  exceptions, such as never editing <C>src/generated/</C>, is better enforced with a hook; the line
                  above is the reminder, not the lock.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="monorepo-template">4. CLAUDE.md Template for a Monorepo</H2>
                <P>
                  In a monorepo the root file stays small and points down. Each app or service gets its own CLAUDE.md
                  with its own commands. Claude Code loads a subdirectory's CLAUDE.md only when it reads or edits a
                  file in that directory, so a person working in <C>apps/web</C> does not pay for the API team's
                  rules. This example uses pnpm workspaces and Turborepo.
                </P>
                <Code>{monorepoTemplate}</Code>
                <P>
                  If another team's CLAUDE.md gets picked up and is not relevant to you, skip it with the{" "}
                  <C>claudeMdExcludes</C> setting in <C>.claude/settings.local.json</C>:
                </P>
                <Code>{`{
  "claudeMdExcludes": ["**/services/billing/CLAUDE.md"]
}`}</Code>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="ml-template">5. CLAUDE.md Template for a Data or ML Project</H2>
                <P>
                  Data and ML repos have two risks a web app does not: expensive jobs and sensitive data. The Gotchas
                  section carries most of the value here. This example uses uv, pytest and DVC.
                </P>
                <Code>{mlTemplate}</Code>
                <P>
                  "Do not start a full training run" and "never print rows from data/raw/" are lines where a mistake
                  is costly. Keep them in the file, and back them with a deny rule or a hook as well. The file asks;
                  the hook enforces.
                </P>
              </section>

              <NewsletterSignup bonus={CLAUDE_CODE_STARTER_KIT} />

              <section className="mb-6 sm:mb-8">
                <H2 id="leave-out">6. What Should You Leave Out of CLAUDE.md?</H2>
                <P>
                  Most CLAUDE.md files fail by being too long. Anthropic's guidance is to target under 200 lines per
                  file, because longer files use more context and reduce how well Claude follows them. If you start
                  from <C>/init</C>, the work is mostly removing lines.
                </P>
                <DataTable head={["Leave out", "Why", "Where it goes instead"]} rows={leaveOut} />
                <P>
                  One more, which is our advice and not from the docs: never put secrets, tokens or customer data in
                  CLAUDE.md. The file is committed to the repo and sent to the model in every session.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="local-vs-rules">7. CLAUDE.md vs CLAUDE.local.md vs .claude/rules</H2>
                <P>
                  All of these are instruction files that Claude Code loads into context. They differ in who sees them
                  and when they load.
                </P>
                <DataTable head={["File", "Where it lives", "Who it applies to", "When it loads", "Use it for"]} rows={files} />
                <P>
                  The files are joined together, not overridden. Claude Code loads CLAUDE.md and CLAUDE.local.md from
                  your working directory and every directory above it, ordered from the top of the filesystem down, so
                  the instructions closest to where you started are read last. Within one directory, CLAUDE.local.md
                  comes after CLAUDE.md.
                </P>
                <H3 id="path-rules">A path-scoped rule</H3>
                <P>
                  A file in <C>.claude/rules/</C> with a <C>paths</C> field loads only when Claude works on a matching
                  file. <C>paths</C> is the only frontmatter field Claude Code reads from a rule.
                </P>
                <Code>{`---
paths:
  - "src/api/**/*.ts"
---

# API rules
- Every endpoint validates its input
- Use the standard error response format`}</Code>
                <H3 id="imports">Imports</H3>
                <P>
                  A CLAUDE.md can pull in another file with <C>@path/to/file</C>. Imports help you organise a long
                  file, but they do not make it cheaper: the imported file loads together with the CLAUDE.md that
                  imports it. Imports can nest up to four levels deep.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="agents-md">8. Does Claude Code Read AGENTS.md?</H2>
                <P>
                  Yes. From Claude Code v2.1.277, a repository that already has an AGENTS.md for other coding agents
                  works without a CLAUDE.md, an import or a setting. What Claude reads by default:
                </P>
                <DataTable head={["Your repository has", "Claude reads"]} rows={agents} />
                <P>
                  The second row surprises people. If you add a CLAUDE.local.md for your own notes in a repo that
                  relies on AGENTS.md, Claude stops reading AGENTS.md for you. To read both, type <C>/config</C> and
                  set <strong>Project instructions</strong> to <C>claude-md-and-agents-md</C>.
                </P>
                <P>
                  To keep one shared file for every tool and still add Claude-specific lines, import it from a
                  CLAUDE.md next to it:
                </P>
                <Code>{`@AGENTS.md

## Claude Code

Use plan mode for changes under src/billing/.`}</Code>
                <UL>
                  <li>• <strong>Not read:</strong> <C>AGENTS.local.md</C>, <C>AGENTS.override.md</C>, or anything under a <C>.agents/</C> directory.</li>
                  <li>• <strong>A symlink also works</strong> (<C>ln -s AGENTS.md CLAUDE.md</C>), but Claude's edit tools refuse to write through a symlink, and symlinks are awkward on Windows. The docs recommend the import if anyone on the team uses Windows.</li>
                  <li>• <strong>Moving from another tool:</strong> <C>/init</C> reads Cursor rules and Copilot instructions and folds the relevant parts into the CLAUDE.md it writes.</li>
                </UL>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="check">9. How Do You Check That CLAUDE.md Is Working?</H2>
                <DataTable head={["Command", "What it does"]} rows={checks} />
                <P>Three behaviours worth knowing:</P>
                <UL>
                  <li>• <strong>It survives compaction.</strong> After <C>/compact</C>, Claude Code re-reads the project-root CLAUDE.md from disk. An instruction you gave only in conversation does not survive, so write it down.</li>
                  <li>• <strong>HTML comments are free.</strong> Block-level <C>{"<!-- notes -->"}</C> comments are stripped before the file reaches Claude, so you can leave notes for teammates without spending context.</li>
                  <li>• <strong>Very large files are skipped.</strong> Claude Code skips an instruction file over 4 MiB, and warns at startup when a file is over the recommended length.</li>
                </UL>
                <P>
                  If Claude still ignores a line, the docs give the order to check: is the file listed under Memory
                  files, is the line specific, does another file contradict it. If the line must hold every time, it
                  is a hook. Our <In to="/blog/claude-code-best-practices">Claude Code best practices guide</In>{" "}
                  covers that split, and the <In to="/blog/claude-code-cheat-sheet">Claude Code cheat sheet</In> lists
                  the commands above with the rest.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="faq">10. FAQ</H2>

                <H3 id="faq-what">What is a CLAUDE.md file?</H3>
                <P>
                  CLAUDE.md is a markdown file of instructions that Claude Code reads at the start of every session.
                  You write it in plain text, usually with the commands to test and lint the project, team conventions
                  and known pitfalls. Claude treats it as context, so it guides behaviour but does not enforce it.
                </P>

                <H3 id="faq-where">Where do I put CLAUDE.md?</H3>
                <P>
                  Put the project file at ./CLAUDE.md or ./.claude/CLAUDE.md and commit it so the team shares it. Use
                  ~/.claude/CLAUDE.md for personal preferences across all projects, and ./CLAUDE.local.md, added to
                  .gitignore, for personal notes on one project.
                </P>

                <H3 id="faq-length">How long should a CLAUDE.md be?</H3>
                <P>
                  Anthropic's docs recommend under 200 lines per file. Longer files use more context and reduce how
                  reliably Claude follows them. Move instructions for one part of the codebase into path-scoped rules
                  in .claude/rules/, and multi-step procedures into skills.
                </P>

                <H3 id="faq-local">What is the difference between CLAUDE.md and CLAUDE.local.md?</H3>
                <P>
                  CLAUDE.md is shared with the team through version control. CLAUDE.local.md holds your personal
                  preferences for that project, is added to .gitignore, and loads right after the CLAUDE.md in the
                  same directory. Both are treated the same way once loaded.
                </P>

                <H3 id="faq-agents">Does Claude Code read AGENTS.md?</H3>
                <P>
                  Yes, from Claude Code v2.1.277. By default it reads AGENTS.md only when there is no CLAUDE.md or
                  CLAUDE.local.md in your working directory or above it. If you have both, add the line @AGENTS.md to
                  your CLAUDE.md, or set Project instructions to claude-md-and-agents-md in /config.
                </P>

                <H3 id="faq-ignored">Why is Claude ignoring my CLAUDE.md?</H3>
                <P>
                  CLAUDE.md is context, not enforced configuration, so there is no guarantee of strict compliance. Run
                  /context all to confirm the file loaded, make the instruction specific enough to verify, and remove
                  conflicting lines. If it must happen every time, write it as a hook instead.
                </P>

                <H3 id="faq-init">Can Claude Code write the CLAUDE.md for me?</H3>
                <P>
                  Yes. Run /init and Claude analyses the codebase and writes a starting file with the build commands,
                  test instructions and conventions it finds. If a CLAUDE.md already exists, /init suggests
                  improvements and does not overwrite it. Then remove what Claude could have read from the code.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="sources">11. Sources</H2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <A href="https://code.claude.com/docs/en/memory">Claude Code docs — How Claude remembers your project (CLAUDE.md, rules, AGENTS.md)</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/best-practices">Claude Code docs — Best practices (Keep CLAUDE.md short)</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/hooks-guide">Claude Code docs — Hooks guide</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/skills">Claude Code docs — Skills</A></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-xs sm:text-sm italic">
                  Checked against Anthropic's Claude Code docs on November 23, 2026. The four templates are our own
                  examples, and their commands, paths and package names are placeholders to replace. Version numbers
                  and settings are as the docs state them; Claude Code changes weekly, so run /release-notes if
                  something here does not match.
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

export default ClaudeMdTemplatePost;
