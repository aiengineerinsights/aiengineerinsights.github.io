import { ArrowLeft, Clock, User, Calendar, Wrench, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import ClaudeSkillsHeroDiagram from "@/components/ClaudeSkillsHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import ExploreWithAI from "@/components/ExploreWithAI";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const CC_SKILLS = "https://code.claude.com/docs/en/skills";
const PLATFORM_SKILLS = "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview";
const SKILLS_REPO = "https://github.com/anthropics/skills";

const minimalSkill = `---
name: your-skill-name
description: Brief description of what this Skill does and when to use it
---

# Your Skill Name

## Instructions
[Clear, step-by-step guidance for Claude to follow]

## Examples
[Concrete examples of using this Skill]`;

const features = [
  { feature: "Skill", what: "Reusable knowledge or a workflow, loaded into the main context when relevant", use: "Teaching Claude how your team does a recurring task" },
  { feature: "Subagent", what: "An isolated worker with its own context that returns a summary", use: "Delegating a big, self-contained job without filling your context" },
  { feature: "MCP server", what: "A connection to external tools and data", use: "Giving Claude access to a system (GitHub, a database, Slack)" },
  { feature: "Hook", what: "A deterministic script that runs on lifecycle events", use: "Rules that must always hold, such as formatting or blocking a command" },
  { feature: "Plugin", what: "The packaging layer that bundles skills, hooks, subagents, and MCP servers", use: "Sharing a complete setup with a team or the community" },
];

const bestSkills = [
  { name: "skill-creator", source: "Official", does: "Builds new skills, runs evals on them, and tunes descriptions so they trigger reliably" },
  { name: "docx / pdf / pptx / xlsx", source: "Official", does: "Create and edit Word files, PDFs, slide decks and spreadsheets" },
  { name: "frontend-design", source: "Official", does: "Gives UI work a distinctive design direction instead of templated defaults" },
  { name: "mcp-builder", source: "Official", does: "Guides you through building an MCP server in Python or TypeScript" },
  { name: "webapp-testing", source: "Official", does: "Tests local web apps with Playwright, including screenshots and logs" },
  { name: "doc-coauthoring", source: "Official", does: "A structured workflow for co-writing docs, specs and proposals" },
  { name: "web-artifacts-builder", source: "Official", does: "Builds multi-file React, Tailwind and shadcn/ui artifacts" },
  { name: "claude-api", source: "Official", does: "Up-to-date Claude API and SDK reference for building on Claude" },
  { name: "canvas-design / algorithmic-art", source: "Official", does: "Posters and visual art as PNG or PDF, and generative art in p5.js" },
];

const communitySkills = [
  { repo: "mattpocock/skills", stars: "321k", does: "Engineering skills such as grill-me, improve-codebase-architecture and prototype" },
  { repo: "obra/superpowers", stars: "316k", does: "A development methodology as skills: planning, TDD, systematic debugging" },
  { repo: "affaan-m/everything-claude-code", stars: "301k", does: "A large harness of skills, agents, hooks and memory for Claude Code" },
  { repo: "nextlevelbuilder/ui-ux-pro-max-skill", stars: "148k", does: "UI/UX design guidance: styles, palettes, font pairings, UX rules" },
  { repo: "heygen-com/hyperframes", stars: "82k", does: "Lets agents turn HTML into video" },
  { repo: "K-Dense-AI/claude-scientific-skills", stars: "57k", does: "177 skills for scientific research and data analysis" },
  { repo: "vercel-labs/agent-browser", stars: "49k", does: "Browser automation CLI with a skill for coding agents" },
  { repo: "wshobson/agents", stars: "42k", does: "Plugins, subagents and skills that work across several coding CLIs" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What are Claude skills?",
    a: "Skills are folders of instructions, scripts, and resources that Claude discovers and loads when a task needs them. Each skill has a SKILL.md file with a name and a description; Claude keeps only that short metadata in context and loads the full instructions, and any bundled files, when your request matches the description. Skills work in the Claude apps, Claude Code and the Claude API, and Agent Skills is an open standard that tools like Codex, Cursor, Gemini CLI and GitHub Copilot also read.",
  },
  {
    q: "How do I add skills to Claude Code?",
    a: "Put a skill folder with a SKILL.md file in ~/.claude/skills/ (for all your projects) or .claude/skills/ (for one repo), or install one from a plugin marketplace with /plugin install name@marketplace, for example /plugin install skill-creator@claude-plugins-official. Run /skills to list what is installed. Claude loads a skill automatically when your request matches its description, or you can run it with /skill-name.",
  },
  {
    q: "How do I add skills in the Claude app?",
    a: "Turn on code execution under Settings > Capabilities, then open Customize > Skills to switch on Anthropic's skills. To add your own, choose + > Create skill > Upload a skill and upload a ZIP of the skill folder. On Team plans skills are on by default; on Enterprise an owner enables them under Organization settings.",
  },
  {
    q: "How do I create a Claude skill?",
    a: "Create a folder under ~/.claude/skills/ (for yourself) or .claude/skills/ (for a project), add a SKILL.md file with YAML frontmatter containing a name and a description that says what the skill does and when to use it, then write the instructions below it. Add reference files or scripts next to it if needed. The easiest route is Anthropic's skill-creator skill, installed with /plugin install skill-creator@claude-plugins-official, which drafts the skill, writes test prompts, runs evals, and improves the description.",
  },
  {
    q: "What are the best Claude skills?",
    a: "Start with Anthropic's official ones in the anthropics/skills repository: skill-creator for building your own, the document skills (docx, pdf, pptx, xlsx), frontend-design, mcp-builder and webapp-testing. The most-starred community collections in November 2026 are mattpocock/skills, obra/superpowers and everything-claude-code. Anthropic doesn't review third-party skills, so read them before installing.",
  },
  {
    q: "Is there a Claude skills marketplace?",
    a: "Yes. Skills are distributed through plugin marketplaces. Anthropic's official marketplace, claude-plugins-official, lists over 300 plugins and is added to Claude Code automatically, and the web catalog at claude.com/plugins lists over 500. You can add any marketplace with /plugin marketplace add owner/repo, for example /plugin marketplace add anthropics/skills. Community directories such as skills.sh install skills with npx skills add owner/repo.",
  },
  {
    q: "What is the difference between skills, subagents, MCP, and hooks?",
    a: "A skill adds knowledge or a workflow to Claude's main context when it's relevant. A subagent is a separate worker with its own context that returns a summary. An MCP server connects Claude to external tools and data; skills teach Claude how to use them. A hook is a deterministic script that runs on events, which is where Anthropic recommends putting guardrails. A plugin packages any of these for sharing.",
  },
  {
    q: "Are Claude skills safe to install?",
    a: "Only from sources you trust. Anthropic's guidance is to use skills you wrote yourself or got from Anthropic, to audit every bundled file, and to treat installing a skill like installing software. Plugins are riskier still: Anthropic's docs warn that an installed plugin can execute arbitrary code on your machine with your user privileges, and that it doesn't review third-party marketplaces.",
  },
];

const ClaudeCodeSkillsPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-primary rounded-sm px-3 py-1">
                  <Wrench className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Tools</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Claude Skills (2026): What They Are, the Best Ones, and How to Add Them to Claude Code
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>A skill teaches Claude a task once, then loads itself whenever that task comes up.</strong>{" "}
                Claude skills work in the Claude app, Claude Code and the API. This guide covers what they are, the
                SKILL.md format, how to add skills to Claude Code and the Claude app, the best official and community
                skills, the plugin marketplaces, and how to stay safe installing other people's skills.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-primary-foreground" />
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
                      Practical Guide
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Updated Nov 11, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      11 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <ClaudeSkillsHeroDiagram />

            <div className="bg-muted/50 border-l-4 border-primary p-4 sm:p-6 rounded-lg mb-8 sm:mb-10">
              <p className="text-sm sm:text-base leading-relaxed m-0">
                <strong>TL;DR:</strong> A Claude skill is a folder with a <code>SKILL.md</code> file (a name, a
                description of what it does and when to use it, then instructions) plus optional reference files and
                scripts. Claude keeps only the short description in context and loads the rest when a task matches, or
                you run it with <code>/skill-name</code>. Put personal skills in <code>~/.claude/skills/</code> and
                project skills in <code>.claude/skills/</code>. Build your own with Anthropic's skill-creator, install
                others from plugin marketplaces with <code>/plugin install</code>, and only install skills you trust,
                because they can run code.
              </p>
            </div>

            <ExploreWithAI path="/blog/claude-code-skills" variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-are-skills" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What are Claude skills?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Anthropic introduced skills as "organized folders of instructions, scripts, and resources that agents
                  can discover and load dynamically" in{" "}
                  <RefLink href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills">Equipping agents for the real world with Agent Skills</RefLink>{" "}
                  (October 2025), and later published Agent Skills as an open standard at{" "}
                  <RefLink href="https://agentskills.io">agentskills.io</RefLink>, which dozens of other tools now read,
                  including OpenAI Codex, Cursor, Gemini CLI and GitHub Copilot. The idea is simple: instead of
                  pasting the same long instructions into every session, you write them once as a skill, and Claude
                  pulls them in when they're relevant.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  What makes skills cheap is <strong>progressive disclosure</strong>, documented in Anthropic's{" "}
                  <RefLink href={PLATFORM_SKILLS}>Agent Skills overview</RefLink>. There are three levels:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Metadata</strong> (the name and description) is always loaded, roughly 100 tokens per skill.</li>
                    <li><strong>The SKILL.md body</strong> loads only when the skill is triggered, and should stay under about 5,000 tokens.</li>
                    <li><strong>Bundled files</strong> load only when needed; scripts run through bash and only their output enters the context.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  So you can install dozens of skills without filling the context window. That makes skills one of the
                  most practical pieces of an{" "}
                  <Link to="/blog/what-is-an-agent-harness" className="text-primary hover:underline">agent harness</Link>:
                  reusable know-how, loaded on demand.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="skill-md" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The SKILL.md format</h2>
                <p className="text-muted-foreground leading-relaxed mb-2 text-sm sm:text-base">
                  A minimal skill, from Anthropic's{" "}
                  <RefLink href={PLATFORM_SKILLS}>docs</RefLink>:
                </p>
                <pre className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-xs sm:text-sm">
                  <code>{minimalSkill}</code>
                </pre>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>name</strong>: up to 64 characters, lowercase letters, numbers, and hyphens only; it can't contain "anthropic" or "claude".</li>
                    <li>• <strong>description</strong>: up to 1,024 characters, and it should say both <em>what</em> the skill does and <em>when</em> to use it. This is the line Claude matches against, so it decides whether your skill ever triggers.</li>
                    <li>• <strong>Claude Code is more lenient.</strong> Per the <RefLink href={CC_SKILLS}>Claude Code skills docs</RefLink>, no field is strictly required (the name defaults to the folder name), and there are extra optional fields such as <code>allowed-tools</code>, <code>disable-model-invocation</code>, <code>argument-hint</code>, and <code>context: fork</code>. Stick to <code>name</code> and <code>description</code> if you want the skill to work everywhere.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="where-skills-live" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Where do skills live, and how are they triggered?</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Personal:</strong> <code>~/.claude/skills/&lt;name&gt;/SKILL.md</code>, available in all your projects.</li>
                    <li>• <strong>Project:</strong> <code>.claude/skills/&lt;name&gt;/SKILL.md</code>, committed with the repo so your team shares it.</li>
                    <li>• <strong>Plugin:</strong> installed skills, namespaced as <code>/plugin-name:skill-name</code>.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Claude loads a skill automatically when its description matches what you asked, unless the skill sets{" "}
                  <code>disable-model-invocation: true</code>. You can also call it yourself with{" "}
                  <code>/skill-name</code> plus arguments. Run <code>/skills</code> to list every installed skill. Since Claude Code 2.1, custom slash commands and skills are the
                  same thing: <code>.claude/commands/deploy.md</code> and <code>.claude/skills/deploy/SKILL.md</code>{" "}
                  both give you <code>/deploy</code>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="skills-vs" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Skills vs subagents vs MCP vs hooks vs plugins</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Claude Code has five ways to extend it, and Anthropic's{" "}
                  <RefLink href="https://code.claude.com/docs/en/features-overview">features overview</RefLink>{" "}
                  draws the lines clearly:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Feature</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it is</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Use it for</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {features.map((f) => (
                            <TableRow key={f.feature}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{f.feature}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{f.what}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{f.use}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two quotes from that page settle most debates: MCP connects Claude to tools, and "Skills give Claude
                  knowledge about how to use those tools"; and for anything that must always happen, "Put guardrails in
                  hooks." A skill is guidance the model follows; a hook is code that runs regardless. More on MCP in{" "}
                  <Link to="/blog/what-is-mcp" className="text-primary hover:underline">What is MCP?</Link> and on
                  subagents in{" "}
                  <Link to="/blog/multi-agent-orchestration-patterns" className="text-primary hover:underline">multi-agent orchestration patterns</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="create-a-skill" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to create a Claude Code skill</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Pick a task you repeat</strong> and that Claude gets wrong without guidance: your release process, your API conventions, a report format.</li>
                    <li><strong>Make the folder:</strong> <code>.claude/skills/release-notes/</code> (or under <code>~/.claude/skills/</code> for personal use).</li>
                    <li><strong>Write SKILL.md:</strong> a name, a description that names the trigger ("Use when the user asks for release notes or a changelog"), then numbered steps and one worked example.</li>
                    <li><strong>Move bulk into files:</strong> long references go in separate markdown files the skill points to; repeatable logic goes in a script Claude runs.</li>
                    <li><strong>Test the trigger:</strong> ask for the task in a few different phrasings and check the skill loads; if it doesn't, the description is the thing to fix.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Or let Claude do it. Anthropic's{" "}
                  <RefLink href="https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md">skill-creator</RefLink>{" "}
                  skill will "create new skills, modify and improve existing skills, and measure skill performance."
                  Install it with:
                </p>
                <pre className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-xs sm:text-sm">
                  <code>/plugin install skill-creator@claude-plugins-official</code>
                </pre>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It works in a loop: capture what you want, draft the skill, write test prompts, run them, grade the
                  results, and rewrite. It can store test cases in <code>evals/evals.json</code>, run them in isolated
                  subagents, compare runs with and without the skill, and A/B two versions, which is the same discipline
                  we recommend for any LLM feature in{" "}
                  <Link to="/blog/rag-evaluation-metrics" className="text-primary hover:underline">evaluating RAG systems</Link>.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Claude Code, skills, agents, and the tools worth using: one practical email a week for engineers. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="best-skills" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The best Claude skills to install first (official)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Start with official skills from{" "}
                  <RefLink href={SKILLS_REPO}>anthropics/skills</RefLink>; they are maintained, readable, and good
                  examples of how to write your own. The repo has 19 skills and about 192,000 GitHub stars; these are
                  the ones most worth installing:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Skill</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Source</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it does</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bestSkills.map((s) => (
                            <TableRow key={s.name}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4"><code>{s.name}</code></TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{s.source}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{s.does}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  To get the official document skills in Claude Code:{" "}
                  <code>/plugin marketplace add anthropics/skills</code>, then{" "}
                  <code>/plugin install document-skills@anthropic-agent-skills</code>. Most skills in that repo are Apache
                  2.0; the docx, pdf, pptx, and xlsx skills are source-available under a proprietary license. From the
                  official plugin marketplace, <code>code-review</code>, <code>feature-dev</code>,{" "}
                  <code>commit-commands</code>, and <code>security-guidance</code> are worth a look. Self-hosted agents
                  use the same idea; see how{" "}
                  <Link to="/blog/hermes-agent-skills" className="text-primary hover:underline">Hermes Agent skills</Link>{" "}
                  work.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="community-skills" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The most popular community Claude skills</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Most of the skills people actually install come from the community. These are the most-starred skill
                  repos on GitHub as of November 11, 2026. Anthropic doesn't review any of them, so read the files
                  before you install.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Repo</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Stars</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it does</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {communitySkills.map((c) => (
                            <TableRow key={c.repo}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4"><RefLink href={`https://github.com/${c.repo}`}>{c.repo}</RefLink></TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{c.stars}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{c.does}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  For install counts rather than stars, Vercel's <RefLink href="https://skills.sh">skills.sh</RefLink>{" "}
                  leaderboard tracks which skills agents actually pull, and installs any of them with{" "}
                  <code>npx skills add owner/repo</code>. Its most-installed skill is <code>find-skills</code>, at about
                  4.3 million installs.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="marketplace" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The Claude skills marketplace: plugins and marketplaces</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Skills are shared through <strong>plugins</strong>, which can bundle skills, agents, hooks, and MCP and
                  LSP servers, and plugins are published in <strong>marketplaces</strong>. Anthropic runs{" "}
                  <RefLink href="https://code.claude.com/docs/en/plugins/anthropic-marketplaces">three</RefLink>:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>claude-plugins-official</strong> (<code>anthropics/claude-plugins-official</code>): the official marketplace, with over 300 plugins, added automatically the first time you run Claude Code interactively.</li>
                    <li>• <strong>claude-community</strong> (<code>anthropics/claude-plugins-community</code>): community plugins; you add it yourself.</li>
                    <li>• <strong>claude-code-plugins</strong> (<code>anthropics/claude-code</code>): demo plugins, which the docs note "isn't the official marketplace."</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-2 text-sm sm:text-base">
                  The commands you'll use:
                </p>
                <pre className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-xs sm:text-sm">
                  <code>{`/plugin                                   # browse (Discover tab)
/plugin marketplace add owner/repo        # add any marketplace
/plugin install <name>@<marketplace>      # install a plugin
/plugin marketplace list | update | remove
claude plugin install <name>@<marketplace> --scope project   # from your shell`}</code>
                </pre>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There is also a web catalog at{" "}
                  <RefLink href="https://claude.com/plugins">claude.com/plugins</RefLink>, listing over 500 plugins for
                  Claude and Claude Code, that marks some plugins "Anthropic verified." Large community lists exist on
                  GitHub too, such as{" "}
                  <RefLink href="https://github.com/ComposioHQ/awesome-claude-skills">ComposioHQ/awesome-claude-skills</RefLink>{" "}
                  (about 79,000 stars), but treat them as directories, not endorsements.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="security" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Are Claude skills safe? What Anthropic recommends</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• "Use Skills only from trusted sources: those you created yourself or obtained from Anthropic." Read every bundled file first, and be wary of skills that fetch external URLs.</li>
                    <li>• Plugins carry more risk: per Anthropic's <RefLink href="https://code.claude.com/docs/en/plugins/security">plugin security docs</RefLink>, "A Claude Code plugin you install can execute arbitrary code on your machine with your user privileges." Hooks and MCP servers run outside the sandbox.</li>
                    <li>• Check <code>hooks/hooks.json</code>, <code>.mcp.json</code>, and any <code>bin/</code> folder before installing, and remember auto-updates can change files after you reviewed them.</li>
                    <li>• "Anthropic doesn't review third-party marketplaces." The same caution we give for <Link to="/blog/mcp-server-trust-permissions" className="text-primary hover:underline">vetting MCP servers</Link> applies here.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Skills are available on every paid Claude plan that includes Claude Code. Still choosing a tool? See <Link to="/blog/claude-code-vs-cursor" className="text-primary hover:underline">Claude Code vs Cursor</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="availability" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to use skills in the Claude app and the API</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Skills aren't only for Claude Code. Per Anthropic's{" "}
                  <RefLink href="https://support.claude.com/en/articles/12512180-using-skills-in-claude">help center</RefLink>,
                  in the Claude app (claude.ai and desktop):
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li>Turn on <strong>Settings &gt; Capabilities &gt; Code execution and file creation</strong>. Skills need it.</li>
                    <li>Open <strong>Customize &gt; Skills</strong> and switch on the Anthropic skills you want.</li>
                    <li>To add your own, choose <strong>+ &gt; Create skill &gt; Upload a skill</strong> and upload a ZIP of the skill folder.</li>
                    <li>On Team, skills are on by default. On Enterprise, an owner enables them under Organization settings and can provision skills to everyone.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  On the <RefLink href="https://platform.claude.com/docs/en/build-with-claude/skills-guide">Claude API</RefLink>,
                  skills run inside the code execution tool. You list up to 20 per request under{" "}
                  <code>container.skills</code>, using the prebuilt IDs (<code>pptx</code>, <code>xlsx</code>,{" "}
                  <code>docx</code>, <code>pdf</code>) or custom skills you upload through <code>/v1/skills</code>.
                  Custom skills don't sync between the app, Claude Code and the API, so keep the source in a repo and
                  upload it to each.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you want to prove you can build with Claude Code, skills included, our <Link to="/blog/anthropic-certifications" className="text-primary hover:underline">Anthropic certifications guide</Link> covers the developer and architect exams.
                </p>
              </section>

              <ExploreWithAI path="/blog/claude-code-skills" variant="questions" />

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h2>
                {faqs.map((f) => (
                  <div key={f.q} className="mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{f.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{f.a}</p>
                  </div>
                ))}
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="references" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">References</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <RefLink href={CC_SKILLS}>Anthropic — Claude Code skills docs</RefLink></li>
                  <li>• <RefLink href={PLATFORM_SKILLS}>Anthropic — Agent Skills overview (format, progressive disclosure, security)</RefLink></li>
                  <li>• <RefLink href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills">Anthropic Engineering — Equipping agents for the real world with Agent Skills</RefLink></li>
                  <li>• <RefLink href="https://code.claude.com/docs/en/features-overview">Anthropic — Claude Code features overview</RefLink></li>
                  <li>• <RefLink href={SKILLS_REPO}>anthropics/skills (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://code.claude.com/docs/en/plugins/anthropic-marketplaces">Anthropic — Anthropic's plugin marketplaces</RefLink></li>
                  <li>• <RefLink href="https://code.claude.com/docs/en/plugins/security">Anthropic — Plugin security</RefLink></li>
                  <li>• <RefLink href="https://support.claude.com/en/articles/12512180-using-skills-in-claude">Claude Help Center — Using skills in Claude</RefLink></li>
                  <li>• <RefLink href="https://platform.claude.com/docs/en/build-with-claude/skills-guide">Anthropic — Using skills with the Claude API</RefLink></li>
                  <li>• <RefLink href="https://agentskills.io">Agent Skills — open standard and specification</RefLink></li>
                  <li>• <RefLink href="https://skills.sh">skills.sh — skills leaderboard and installer</RefLink></li>
                  <li>• <RefLink href="https://claude.com/plugins">Claude — plugin catalog</RefLink></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-sm sm:text-base">
                  <em>Verified against Anthropic's docs and GitHub on November 11, 2026.</em>
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/claude-code-skills" />
      <Footer />
    </div>
  );
};

export default ClaudeCodeSkillsPost;
