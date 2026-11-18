// Hero diagram for the Claude Code cheat sheet: three columns (slash commands,
// keyboard shortcuts, CLI) with the dozen entries people use most in each.
// Pure inline SVG so it prerenders to crawler-visible markup and doubles as the
// OG image (viewBox 1200x630). Every entry is from Anthropic's Claude Code docs.

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

type Column = { title: string; color: string; x: number; keyWidth: number; rows: [string, string][] };

const COLUMNS: Column[] = [
  {
    title: "SLASH COMMANDS",
    color: "#f97316",
    x: 40,
    keyWidth: 132,
    rows: [
      ["/init", "create a starter CLAUDE.md"],
      ["/plan", "plan before any edits"],
      ["/model", "switch model"],
      ["/context", "see what fills the window"],
      ["/compact", "summarize to free context"],
      ["/clear", "new conversation"],
      ["/resume", "reopen an earlier session"],
      ["/rewind", "roll back code and chat"],
      ["/diff", "review what changed"],
      ["/code-review", "check the diff for bugs"],
      ["/permissions", "allow, ask and deny rules"],
      ["/mcp", "manage MCP servers"],
    ],
  },
  {
    title: "KEYBOARD SHORTCUTS",
    color: "#5eb8c8",
    x: 420,
    keyWidth: 132,
    rows: [
      ["Shift+Tab", "cycle permission modes"],
      ["Esc", "interrupt Claude"],
      ["Esc Esc", "rewind, or clear the draft"],
      ["Ctrl+C", "interrupt; twice to exit"],
      ["Ctrl+R", "search prompt history"],
      ["Ctrl+B", "send a task to background"],
      ["Ctrl+O", "open transcript viewer"],
      ["Ctrl+G", "edit prompt in your editor"],
      ["Ctrl+S", "stash or restore prompt"],
      ["Ctrl+J", "new line, any terminal"],
      ["Ctrl+V", "paste an image"],
      ["Alt+P", "switch model (Option+P)"],
    ],
  },
  {
    title: "CLI AND PREFIXES",
    color: "#8b9cf0",
    x: 800,
    keyWidth: 172,
    rows: [
      ['claude "query"', "start with a prompt"],
      ['claude -p "query"', "answer, then exit"],
      ["claude -c", "continue last session"],
      ["claude -r <name>", "resume by name or ID"],
      ["claude -w <name>", "run in a git worktree"],
      ['claude --bg "task"', "run in the background"],
      ["claude --model opus", "pick the model"],
      ["claude update", "update Claude Code"],
      ["claude doctor", "check the install"],
      ["/  at line start", "command or skill"],
      ["!  at line start", "run a shell command"],
      ["@", "mention a file"],
    ],
  },
];

const ClaudeCodeCheatSheetHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f16]">
    <svg
      viewBox="0 0 1200 630"
      role="img"
      fontFamily="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
      aria-label="Claude Code cheat sheet. Slash commands: /init creates a starter CLAUDE.md, /plan plans before any edits, /model switches model, /context shows what fills the context window, /compact summarizes to free context, /clear starts a new conversation, /resume reopens an earlier session, /rewind rolls back code and chat, /diff reviews what changed, /code-review checks the diff for bugs, /permissions manages allow, ask and deny rules, /mcp manages MCP servers. Keyboard shortcuts: Shift+Tab cycles permission modes, Esc interrupts Claude, Esc twice rewinds or clears the draft, Ctrl+C interrupts and exits on a second press, Ctrl+R searches prompt history, Ctrl+B sends a task to the background, Ctrl+O opens the transcript viewer, Ctrl+G edits the prompt in your editor, Ctrl+S stashes or restores the prompt, Ctrl+J adds a new line in any terminal, Ctrl+V pastes an image, Alt+P or Option+P switches model. CLI: claude with a quoted query starts with a prompt, claude -p answers then exits, claude -c continues the last session, claude -r resumes by name or ID, claude -w runs in a git worktree, claude --bg runs in the background, claude --model picks the model, claude update updates Claude Code, claude doctor checks the install. Prefixes: slash at line start runs a command or skill, exclamation mark at line start runs a shell command, at sign mentions a file."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="cccsBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a0f16" />
          <stop offset="100%" stopColor="#111a24" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#cccsBg)" />

      <text x="600" y="44" textAnchor="middle" fill="#eef6ff" fontSize="25" fontWeight="800" letterSpacing="1">
        CLAUDE CODE CHEAT SHEET
      </text>
      <text x="600" y="68" textAnchor="middle" fill="#9fb3c8" fontSize="14">
        the commands, shortcuts and CLI flags you use every day
      </text>

      {COLUMNS.map((c) => (
        <g key={c.title}>
          <rect x={c.x} y="88" width="360" height="460" rx="14" fill="#121b27" stroke={c.color} strokeWidth="1.8" />
          <rect x={c.x} y="88" width="360" height="7" rx="3" fill={c.color} />
          <text x={c.x + 180} y="126" textAnchor="middle" fill={c.color} fontSize="17" fontWeight="800" letterSpacing="1.2">
            {c.title}
          </text>
          <line x1={c.x + 18} y1="142" x2={c.x + 342} y2="142" stroke="#263241" strokeWidth="1" />
          {c.rows.map(([key, desc], i) => (
            <g key={key}>
              <text x={c.x + 18} y={170 + i * 32.5} fill={c.color} fontSize="13.5" fontWeight="700" fontFamily={MONO}>
                {key}
              </text>
              <text x={c.x + 18 + c.keyWidth} y={170 + i * 32.5} fill="#d6e1ee" fontSize="13">
                {desc}
              </text>
            </g>
          ))}
        </g>
      ))}

      <rect x="250" y="562" width="700" height="34" rx="10" fill="#1f1a10" stroke="#f59e0b" strokeWidth="1.4" />
      <text x="600" y="584" textAnchor="middle" fill="#fde68a" fontSize="14.5" fontWeight="700">
        type / to list every command · type ? on an empty prompt for shortcuts
      </text>

      <text x="600" y="617" textAnchor="middle" fill="#64748b" fontSize="11.5">
        aiengineerinsights.com · from Anthropic's Claude Code docs, checked Nov 18 2026
      </text>
    </svg>
  </div>
);

export default ClaudeCodeCheatSheetHeroDiagram;
