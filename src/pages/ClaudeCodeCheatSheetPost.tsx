import { ArrowLeft, Clock, User, Calendar, Terminal, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import ExploreWithAI from "@/components/ExploreWithAI";
import TableOfContents from "@/components/TableOfContents";
import ClaudeCodeCheatSheetHeroDiagram from "@/components/ClaudeCodeCheatSheetHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import { CLAUDE_CODE_CHEAT_SHEET } from "@/config/newsletterBonuses";

const PATH = "/blog/claude-code-cheat-sheet";

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
const C = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-muted px-1.5 py-0.5 text-[0.85em] font-mono text-foreground whitespace-nowrap">{children}</code>
);

// A reference table: the first column is the thing you type, set in code.
const RefTable = ({ head, rows }: { head: [string, string]; rows: [string, string][] }) => (
  <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
    <div className="min-w-full inline-block align-middle">
      <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
        <Table>
          <TableHeader>
            <TableRow>
              {head.map((h) => <TableHead key={h} className="text-xs sm:text-sm px-2 sm:px-4">{h}</TableHead>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(([key, desc]) => (
              <TableRow key={key}>
                <TableCell className="text-xs sm:text-sm px-2 sm:px-4 align-top w-[38%]">
                  <code className="font-mono font-semibold text-foreground break-words">{key}</code>
                </TableCell>
                <TableCell className="text-xs sm:text-sm px-2 sm:px-4 text-muted-foreground">{desc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
);

const ClaudeCodeCheatSheetPost = () => {
  const topTwelve: [string, string][] = [
    ["/init", "Create a starter CLAUDE.md for the project"],
    ["/plan [description]", "Enter plan mode: Claude researches and proposes a plan before it edits anything"],
    ["/model [model]", "Switch model. With no argument it opens a picker"],
    ["/context", "Show what is filling the context window"],
    ["/compact [instructions]", "Summarize the conversation so far to free context. You can say what the summary should keep"],
    ["/clear [name]", "Start a new conversation with empty context. Project memory stays"],
    ["/resume [session]", "Reopen an earlier conversation by name or ID, or pick from a list"],
    ["/rewind", "Roll the code, the conversation, or both back to an earlier point"],
    ["/diff", "Review the changes in your working tree, including Claude's edits"],
    ["/code-review", "Check the current diff for bugs. /review is an alias"],
    ["/permissions", "Manage allow, ask and deny rules for tools"],
    ["/mcp", "Manage MCP server connections and sign-ins"],
  ];

  const setup: [string, string][] = [
    ["/init", "Create a starter CLAUDE.md"],
    ["/memory", "Edit CLAUDE.md files and view or switch off auto memory"],
    ["/permissions", "Manage allow, ask and deny rules for tools"],
    ["/mcp", "Manage MCP servers. /mcp reconnect all retries failed ones"],
    ["/add-dir <path>", "Give Claude access to another directory"],
    ["/cd <path>", "Move the session to another directory and keep the conversation"],
    ["/hooks", "View your hook configuration"],
    ["/agents", "Reminder of how to create and manage subagents"],
    ["/skills", "List available skills"],
    ["/plugin", "Open the plugin menu, or pass list, install, enable or disable"],
    ["/ide", "Manage IDE integrations"],
    ["/terminal-setup", "Install the Shift+Enter newline binding in VS Code, Cursor, Alacritty or Zed"],
    ["/statusline", "Set up the status line"],
    ["/import [codex|gemini|cursor]", "Bring configuration over from Codex, Gemini CLI or Cursor"],
  ];

  const contextRows: [string, string][] = [
    ["/context", "Show context usage as a grid, with suggestions"],
    ["/compact [instructions]", "Summarize the conversation to free context"],
    ["/clear [name]", "New conversation, empty context"],
    ["/model [model]", "Switch model"],
    ["/effort [level]", "Set reasoning effort: low to xhigh, max, or auto"],
    ["/fast [on|off]", "Toggle fast mode"],
    ["/btw [question]", "Ask a side question without adding it to the conversation"],
    ["/usage", "Session cost, plan limits and activity. /cost and /stats are aliases"],
    ["/output-style [style]", "List output styles or switch to one"],
  ];

  const workRows: [string, string][] = [
    ["/plan [description]", "Plan mode: research and plan first, edit after you approve"],
    ["/goal [condition]", "Keep Claude working across turns until a condition is met. /goal clear stops it"],
    ["/loop [interval] [prompt]", "Repeat a prompt while the session is open, e.g. /loop 5m check if the deploy finished"],
    ["/tasks", "List background work in this session, including finished subagents"],
    ["/subtask <task>", "Start a background subagent that inherits the whole conversation"],
    ["/background [prompt]", "Detach the session to run as a background agent. Alias: /bg"],
    ["/fork [prompt]", "Copy the conversation into a new background session and keep working here"],
    ["/batch", "Split a large change into independent units and run one subagent per unit"],
    ["/schedule [description]", "Create or manage cloud scheduled tasks"],
  ];

  const shipRows: [string, string][] = [
    ["/diff", "Review working-tree changes"],
    ["/code-review [level] [--fix]", "Check the diff, a PR number, a branch or a path for bugs. --fix applies the findings"],
    ["/security-review", "Look for security problems in the changes on your branch"],
    ["/simplify [target]", "Review changed code for cleanup and apply the fixes"],
    ["/verify", "Build and run the app to confirm a change works"],
    ["/autofix-pr [prompt]", "Start a cloud session that watches the branch's PR and pushes fixes"],
    ["/install-github-app", "Install the Claude GitHub App for a repository"],
  ];

  const sessionRows: [string, string][] = [
    ["/resume [session]", "Resume by name or ID, or open the picker"],
    ["/rename [name]", "Name the session so it is easy to find later"],
    ["/branch [name]", "Branch the conversation here and try another direction"],
    ["/rewind", "Roll back code, conversation or both. Aliases: /checkpoint, /undo"],
    ["/export [filename]", "Export the conversation as plain text"],
    ["/copy [N]", "Copy the last response, or the Nth-latest"],
    ["/recap", "One-line summary of the session"],
    ["/teleport", "Pull a cloud session into this terminal. Alias: /tp"],
    ["/remote-control", "Control this session from claude.ai. Alias: /rc"],
    ["/exit", "Exit. Alias: /quit"],
  ];

  const fixRows: [string, string][] = [
    ["/doctor", "Diagnose installation, settings and CLAUDE.md problems and propose fixes"],
    ["/debug [description]", "Turn on debug logging and troubleshoot from the session log"],
    ["/status", "Version, model, account and connectivity"],
    ["/config [key=value]", "Open settings, or set one directly, e.g. /config theme=dark"],
    ["/keybindings", "Open your keyboard shortcuts file"],
    ["/release-notes", "Read the changelog"],
    ["/feedback [report]", "Send feedback or report a bug. /bug opens the same dialog"],
    ["/help", "Show help and available commands"],
    ["/login, /logout", "Sign in or out of your Anthropic account"],
  ];

  const generalKeys: [string, string][] = [
    ["Shift+Tab", "Cycle permission modes"],
    ["Esc", "Interrupt Claude mid-turn; it keeps the work done so far"],
    ["Esc Esc", "With text in the prompt: clear the draft. With an empty prompt: open the rewind menu"],
    ["Ctrl+C", "Interrupt. If nothing is running, first press clears the input and a second press exits"],
    ["Ctrl+D", "Exit (press twice)"],
    ["Ctrl+R", "Search your prompt history"],
    ["Ctrl+B", "Send a running Bash command or agent to the background (twice in tmux)"],
    ["Ctrl+O", "Toggle the transcript viewer, which shows tool calls in detail"],
    ["Ctrl+T", "Show or hide Claude's task checklist"],
    ["Ctrl+G", "Edit the prompt in your default text editor"],
    ["Ctrl+S", "Stash the prompt; press again on an empty prompt to restore it"],
    ["Ctrl+L", "Redraw the screen"],
    ["Ctrl+V", "Paste an image from the clipboard (Cmd+V in iTerm2, Alt+V on Windows and WSL)"],
    ["Option+P / Alt+P", "Switch model without clearing the prompt"],
    ["Option+O / Alt+O", "Toggle fast mode"],
    ["Up / Down", "Move through prompt history"],
    ["Tab", "Accept an autocomplete suggestion"],
    ["?", "On an empty prompt: toggle the shortcut help panel"],
  ];

  const newlineKeys: [string, string][] = [
    ["\\ then Enter", "Works in every terminal"],
    ["Ctrl+J", "Works in every terminal, no setup"],
    ["Shift+Enter", "Native in iTerm2, WezTerm, Ghostty, Kitty, Warp and Windows Terminal 1.25+. Elsewhere run /terminal-setup"],
    ["Option+Enter", "macOS, after enabling Option as Meta"],
  ];

  const editKeys: [string, string][] = [
    ["Ctrl+A / Ctrl+E", "Start / end of line"],
    ["Alt+B / Alt+F", "Back / forward one word"],
    ["Ctrl+K", "Delete to end of line"],
    ["Ctrl+U", "Delete from cursor to line start"],
    ["Ctrl+W", "Delete back to the previous whitespace"],
    ["Ctrl+Y", "Paste the text you last deleted"],
    ["Ctrl+_", "Undo the last input edit"],
  ];

  const prefixes: [string, string][] = [
    ["/", "At the start of a message: run a command or skill"],
    ["!", "At the start of a message: shell mode. Runs the command and adds its output to the session"],
    ["@", "Mention a file, with path autocomplete"],
  ];

  const cliCommands: [string, string][] = [
    ["claude", "Start an interactive session"],
    ['claude "query"', "Start an interactive session with a first prompt"],
    ['claude -p "query"', "Print mode: answer, then exit. Use it in scripts and CI"],
    ['cat logs.txt | claude -p "explain"', "Pipe content in"],
    ["claude -c", "Continue the most recent conversation in this directory"],
    ['claude -r "<session>" "query"', "Resume a session by ID or name"],
    ["claude update", "Update to the latest version"],
    ["claude doctor", "Print installation and settings diagnostics without starting a session"],
    ["claude mcp", "Configure MCP servers"],
    ["claude plugin", "Manage plugins"],
    ["claude agents", "Open agent view to watch and dispatch background sessions"],
    ["claude auth login", "Sign in. Also: auth logout, auth status"],
  ];

  const cliFlags: [string, string][] = [
    ["--model <name>", "Set the model for this session: sonnet, opus, haiku, fable, or a full model name"],
    ["--permission-mode <mode>", "Start in a mode: default, acceptEdits, plan, auto, dontAsk or bypassPermissions"],
    ["--add-dir <path>", "Add another working directory"],
    ["--worktree, -w <name>", "Start in an isolated git worktree under .claude/worktrees/"],
    ["--bg", 'Start as a background agent and return at once, e.g. claude --bg "investigate the flaky test"'],
    ["--name, -n <name>", "Name the session; resume it later with claude --resume <name>"],
    ["--effort <level>", "Set the effort level for this session"],
    ["--append-system-prompt <text>", "Add text to the end of the default system prompt"],
    ["--allowedTools, --disallowedTools", "Tools that run without a prompt, and tools that are denied"],
    ["--output-format <format>", "Print mode output: text, json or stream-json"],
    ["--max-turns <n>", "Limit agentic turns (print mode only)"],
    ["--mcp-config <file>", "Load MCP servers from JSON files or strings"],
    ["--bare", "Minimal mode: skip hooks, skills, plugins, MCP servers, auto memory and CLAUDE.md so scripted calls start faster"],
    ["--safe-mode", "Start with all customizations disabled, to troubleshoot a broken setup"],
    ["--verbose", "Full turn-by-turn output"],
    ["--dangerously-skip-permissions", "Skip permission prompts. Same as --permission-mode bypassPermissions"],
  ];

  const modes: [string, string][] = [
    ["default", "Shown as Manual in the mode indicator. Claude asks before it edits files or runs commands"],
    ["acceptEdits", "File edits go through without a prompt"],
    ["plan", "Claude researches and proposes a plan; it does not edit until you approve"],
    ["auto", "Where available. A classifier decides which actions need your approval"],
    ["bypassPermissions", "Where available. Skips permission prompts; only for sandboxes you can throw away"],
  ];

  const changed: [string, string][] = [
    ["/vim", "Removed in v2.1.92. Use /config and change Editor mode"],
    ["/pr-comments", "Removed in v2.1.91. Ask Claude to read the PR comments instead"],
    ["/ultraplan", "Removed. Use plan mode"],
    ["/cost, /stats", "Now aliases for /usage"],
    ["/review", "Now an alias for /code-review"],
    ["/ultrareview", "Still runs; the preferred form is /code-review ultra"],
    ["/agents", "No longer opens a manager (v2.1.197 and earlier did). It prints a reminder; ask Claude to create subagents"],
    ["--enable-auto-mode", "Removed in v2.1.111. Use --permission-mode auto"],
    ["--remote", "Deprecated alias for --cloud"],
    [".claude/commands/*.md", "Still works, but custom commands are now skills"],
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
                  <Terminal className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Coding</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Claude Code Cheat Sheet (2026): Commands, Slash Commands and Shortcuts
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                This Claude Code cheat sheet, also available as a{" "}
                <a href="#get-pdf" className="text-primary hover:underline">free one-page PDF</a>, lists the commands
                you type every day: the slash commands grouped by task, the keyboard shortcuts, and the{" "}
                <C>claude</C> CLI commands and flags. Every entry was checked against
                Anthropic's Claude Code docs on November 18, 2026, and the last table lists what has been removed or
                renamed, because most cheat sheets online still show commands that no longer exist.
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
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />Nov 18, 2026</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />9 min read</div>
                  </div>
                </div>
              </Card>
            </header>

            <ClaudeCodeCheatSheetHeroDiagram />

            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-l-4 border-primary" aria-label="TL;DR">
              <p className="text-sm sm:text-base leading-relaxed">
                <strong>TL;DR — Claude Code commands in one line each:</strong> type <C>/</C> to list every command and{" "}
                <C>?</C> on an empty prompt for shortcuts. Start a repo with <C>/init</C>. Use <C>/plan</C> before a big
                change, <C>/context</C> and <C>/compact</C> when the conversation gets long, <C>/clear</C> for a new
                task, <C>/rewind</C> (or <C>Esc Esc</C>) to undo, and <C>/diff</C> then <C>/code-review</C> before you
                ship. <C>Shift+Tab</C> cycles permission modes and <C>Esc</C> interrupts. From the shell,{" "}
                <C>claude -c</C> continues the last session and <C>claude -p "query"</C> answers and exits.
              </p>
            </div>

            <ExploreWithAI path={PATH} variant="strip" />

            <section className="mb-6 sm:mb-8 rounded-lg border border-border p-4 sm:p-6">
              <H2 id="download-pdf">Download the Claude Code Cheat Sheet PDF</H2>
              <P>
                The PDF is one printable page with the same commands, shortcuts and CLI flags as this page. It is free
                with the newsletter sign-up: enter your email in the form below and the download link appears right
                away.
              </P>
              <a href="#get-pdf" className="text-primary font-medium hover:underline text-sm sm:text-base">
                Go to the sign-up form and get the PDF
              </a>
            </section>

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <H2 id="most-used">1. Which Claude Code Commands Do You Use Most?</H2>
                <P>
                  Claude Code ships more than a hundred commands. A dozen cover most days. A command only works at the
                  start of your message, and anything after its name is passed as arguments. In the tables, <C>[x]</C>{" "}
                  is optional and <C>&lt;x&gt;</C> is required.
                </P>
                <RefTable head={["Command", "What it does"]} rows={topTwelve} />
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="slash-commands">2. Claude Code Slash Commands by Task</H2>
                <P>
                  The official list is alphabetical. This one is grouped by when you reach for a command. Not every
                  command shows for every user: some depend on your plan, platform or version.
                </P>

                <H3 id="setup-commands">Set up a project</H3>
                <RefTable head={["Command", "What it does"]} rows={setup} />
                <P>
                  Not sure what to put in the file <C>/init</C> creates? Start from one of our{" "}
                  <Link to="/blog/claude-md-template" className="text-primary hover:underline">CLAUDE.md templates</Link>.
                </P>

                <H3 id="context-commands">Manage context, model and cost</H3>
                <RefTable head={["Command", "What it does"]} rows={contextRows} />
                <P>
                  <C>/clear</C> and <C>/compact</C> are easy to mix up. <C>/clear</C> starts a new conversation.{" "}
                  <C>/compact</C> keeps the same conversation and replaces its history with a summary. Use{" "}
                  <C>/clear</C> when you change task and <C>/compact</C> when you are mid-task and running out of room.
                </P>

                <H3 id="work-commands">Plan and run work</H3>
                <RefTable head={["Command", "What it does"]} rows={workRows} />

                <P>
                  Not sure which of these keeps Claude going until the job is done? See{" "}
                  <Link to="/blog/claude-code-goal-loop" className="text-primary hover:underline">/goal vs /loop vs Ralph loop</Link>.
                </P>

                <H3 id="ship-commands">Review and ship</H3>
                <RefTable head={["Command", "What it does"]} rows={shipRows} />

                <H3 id="session-commands">Move between sessions</H3>
                <RefTable head={["Command", "What it does"]} rows={sessionRows} />

                <H3 id="fix-commands">Fix problems and change settings</H3>
                <RefTable head={["Command", "What it does"]} rows={fixRows} />
              </section>

              <div id="get-pdf" className="scroll-mt-24">
                <NewsletterSignup bonus={CLAUDE_CODE_CHEAT_SHEET} />
              </div>

              <section className="mb-6 sm:mb-8">
                <H2 id="shortcuts">3. Claude Code Keyboard Shortcuts</H2>
                <P>
                  These are the defaults in the terminal. You can rebind them: <C>/keybindings</C> opens the file. On
                  macOS, the <C>Alt</C> word-movement keys need Option set as Meta in your terminal.
                </P>

                <H3 id="general-shortcuts">General controls</H3>
                <RefTable head={["Shortcut", "What it does"]} rows={generalKeys} />

                <H3 id="multiline">New line without sending</H3>
                <RefTable head={["Keys", "Where it works"]} rows={newlineKeys} />

                <H3 id="editing-shortcuts">Editing the prompt</H3>
                <RefTable head={["Shortcut", "What it does"]} rows={editKeys} />

                <H3 id="prefixes">Prefixes</H3>
                <RefTable head={["Type", "What it does"]} rows={prefixes} />
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="cli">4. Claude Code CLI Commands and Flags</H2>
                <P>
                  These run from your shell, not inside a session. <C>claude -p</C> (print mode) is the one to learn
                  for scripts and CI: it takes a prompt, prints the answer and exits.
                </P>
                <H3 id="cli-commands">CLI commands</H3>
                <RefTable head={["Command", "What it does"]} rows={cliCommands} />
                <H3 id="cli-flags">Useful flags</H3>
                <RefTable head={["Flag", "What it does"]} rows={cliFlags} />
                <P>Three combinations worth saving:</P>
                <pre className="bg-muted rounded-lg p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm mb-4"><code>{`# Review a diff in CI and get JSON back
git diff main | claude -p "review this diff for bugs" --output-format json

# Start in plan mode on a named session, in its own worktree
claude -w auth-refactor -n auth-refactor --permission-mode plan

# Pick up where you left off
claude -c`}</code></pre>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="permission-modes">5. Permission Modes (Shift+Tab)</H2>
                <P>
                  <C>Shift+Tab</C> cycles through the permission modes. Which ones appear depends on your plan and
                  settings. Start a session in a mode with <C>--permission-mode</C>.
                </P>
                <RefTable head={["Mode", "What Claude may do"]} rows={modes} />
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="custom-commands">6. How Do You Create a Custom Slash Command?</H2>
                <P>
                  Custom commands are now <strong>skills</strong>. Make a folder, put a <C>SKILL.md</C> in it, and the
                  folder name becomes the command. A project skill lives in <C>.claude/skills/&lt;name&gt;/</C> and is
                  shared through git; a personal one lives in <C>~/.claude/skills/&lt;name&gt;/</C> and works in all
                  your projects.
                </P>
                <pre className="bg-muted rounded-lg p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm mb-4"><code>{`# .claude/skills/fix-issue/SKILL.md   ->   /fix-issue 123
---
description: Fix a GitHub issue by number. Use when asked to fix an issue.
argument-hint: [issue-number]
disable-model-invocation: true
---

Read issue #$ARGUMENTS with the gh CLI, find the cause, fix it,
add a test, and summarize the change.`}</code></pre>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <C>$ARGUMENTS</C> is everything typed after the command. <C>$0</C>, <C>$1</C> pick one argument.</li>
                  <li>• <C>description</C> tells Claude when to use the skill on its own.</li>
                  <li>• <C>disable-model-invocation: true</C> means only you can run it, by typing the command.</li>
                  <li>• Older <C>.claude/commands/*.md</C> files still work. If a skill and a command file share a name, the skill wins.</li>
                </ul>
                <P>
                  For the full walk-through, including community skills and how skills differ from MCP servers, see{" "}
                  <Link to="/blog/claude-code-skills" className="text-primary hover:underline">Claude Skills: how to add, use and create them</Link>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="removed">7. Removed and Renamed Commands</H2>
                <P>
                  Claude Code changes weekly, so older cheat sheets go stale fast. If a command from another list does
                  nothing, check here first.
                </P>
                <RefTable head={["Command or flag", "Status"]} rows={changed} />
                <P>
                  Know the commands and want the setup around them? Read{" "}
                  <Link to="/blog/claude-code-best-practices" className="text-primary hover:underline">Claude Code best practices</Link>.
                  Choosing a tool, not learning one? See{" "}
                  <Link to="/blog/claude-code-vs-cursor" className="text-primary hover:underline">Claude Code vs Cursor</Link>{" "}
                  and the wider comparison of the{" "}
                  <Link to="/blog/best-ai-coding-agents" className="text-primary hover:underline">best AI coding agents</Link>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="faq">8. FAQ</H2>

                <H3 id="faq-list-commands">How do I see all Claude Code commands?</H3>
                <P>
                  Type / at the prompt to list every command available to you, then keep typing to filter. /help shows
                  help and available commands, and typing ? on an empty prompt opens the keyboard shortcut panel. The
                  list differs by plan, platform and version, so yours may not match a published one exactly.
                </P>

                <H3 id="faq-clear-vs-compact">What is the difference between /clear and /compact in Claude Code?</H3>
                <P>
                  /clear starts a new conversation with empty context and keeps project memory such as CLAUDE.md.
                  /compact stays in the same conversation and replaces its history with a summary to free space. Use
                  /clear when you switch tasks and /compact when you are in the middle of one.
                </P>

                <H3 id="faq-undo">How do I undo a change in Claude Code?</H3>
                <P>
                  Run /rewind, or press Esc twice on an empty prompt. Both open the rewind menu, where you can restore
                  the code, the conversation, or both to an earlier point. /checkpoint and /undo are aliases for
                  /rewind.
                </P>

                <H3 id="faq-plan-mode">What is the shortcut for plan mode in Claude Code?</H3>
                <P>
                  Press Shift+Tab to cycle permission modes until the indicator shows plan mode, or type /plan,
                  optionally followed by the task. To start a session in plan mode, run claude --permission-mode plan.
                </P>

                <H3 id="faq-custom-command">How do I create a custom slash command in Claude Code?</H3>
                <P>
                  Create a folder at .claude/skills/your-command/ with a SKILL.md file inside. The folder name becomes
                  the command, so the skill in .claude/skills/deploy/ runs as /deploy. Use $ARGUMENTS in the file for
                  whatever you type after the command. Older .claude/commands/ files still work.
                </P>

                <H3 id="faq-pdf">Is there a Claude Code cheat sheet PDF?</H3>
                <P>
                  Yes. The one-page printable PDF of this cheat sheet is free with the newsletter sign-up on this
                  page. It has the same commands, shortcuts and CLI flags, laid out for A4.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="sources">9. Sources</H2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <A href="https://code.claude.com/docs/en/commands">Claude Code docs — Commands</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/interactive-mode">Claude Code docs — Interactive mode (keyboard shortcuts)</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/cli-reference">Claude Code docs — CLI reference</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/skills">Claude Code docs — Skills (custom commands)</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/permission-modes">Claude Code docs — Permission modes</A></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-xs sm:text-sm italic">
                  Checked against Anthropic's Claude Code docs on November 18, 2026. Descriptions are shortened in our
                  own words. Claude Code ships updates weekly, so run /help or /release-notes if something here does
                  not match your version.
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

export default ClaudeCodeCheatSheetPost;
