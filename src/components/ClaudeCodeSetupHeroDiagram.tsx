// Hero diagram for the Claude Code best-practices guide: the eight places a
// rule or capability can live, what belongs in each, where the file is, and
// whether Claude weighs it (advice) or Claude Code applies it every time
// (enforced). Pure inline SVG so it prerenders to crawler-visible markup and
// doubles as the OG image (viewBox 1200x630).

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const KIND = {
  advice: { label: "CLAUDE DECIDES", color: "#f97316", fill: "#2a170a" },
  enforced: { label: "ALWAYS ENFORCED", color: "#86c98f", fill: "#0f1f14" },
  tools: { label: "ADDS TOOLS", color: "#8b9cf0", fill: "#141a33" },
} as const;

const ROWS: { layer: string; what: string; kind: keyof typeof KIND; path: string }[] = [
  { layer: "CLAUDE.md", what: "test commands, gotchas, decisions not in the repo", kind: "advice", path: "./CLAUDE.md" },
  { layer: "Rules", what: "conventions for one part of the codebase", kind: "advice", path: ".claude/rules/*.md" },
  { layer: "Skills", what: "team procedures: release, review, runbook", kind: "advice", path: ".claude/skills/<name>/SKILL.md" },
  { layer: "Permissions", what: "what Claude may read, run and fetch", kind: "enforced", path: ".claude/settings.json" },
  { layer: "Hooks", what: "steps with zero exceptions: format, block a folder", kind: "enforced", path: ".claude/settings.json" },
  { layer: "Sandbox", what: "OS-level limits on files and network", kind: "enforced", path: "/sandbox" },
  { layer: "Done check", what: "tests, typecheck, a Stop hook, CI", kind: "enforced", path: "your test command" },
  { layer: "MCP + plugins", what: "outside systems and ready-made packs", kind: "tools", path: ".mcp.json  ·  /plugin" },
];

const ClaudeCodeSetupHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f16]">
    <svg
      viewBox="0 0 1200 630"
      role="img"
      fontFamily="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
      aria-label="Claude Code setup: what goes where. CLAUDE.md holds test commands, gotchas and decisions not in the repo; Claude decides whether a line applies. Rules in .claude/rules hold conventions for one part of the codebase; Claude decides. Skills in .claude/skills hold team procedures such as release, review and runbooks; Claude decides. Permissions in .claude/settings.json control what Claude may read, run and fetch; always enforced. Hooks in .claude/settings.json run steps with zero exceptions, such as formatting or blocking a folder; always enforced. The sandbox, turned on with /sandbox, sets OS-level limits on files and network; always enforced. The done check is your tests, typecheck, a Stop hook or CI; always enforced. MCP servers in .mcp.json and plugins added with /plugin connect outside systems and add ready-made packs; they add tools. Rule of thumb: if it must happen every time, it does not belong in CLAUDE.md."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="ccsBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a0f16" />
          <stop offset="100%" stopColor="#111a24" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#ccsBg)" />

      <text x="600" y="44" textAnchor="middle" fill="#eef6ff" fontSize="25" fontWeight="800" letterSpacing="1">
        CLAUDE CODE SETUP: WHAT GOES WHERE
      </text>
      <text x="600" y="68" textAnchor="middle" fill="#9fb3c8" fontSize="14">
        some instructions Claude weighs · others Claude Code applies every time
      </text>

      <text x="64" y="104" fill="#64748b" fontSize="11.5" fontWeight="700" letterSpacing="1.4">LAYER</text>
      <text x="236" y="104" fill="#64748b" fontSize="11.5" fontWeight="700" letterSpacing="1.4">WHAT BELONGS THERE</text>
      <text x="682" y="104" fill="#64748b" fontSize="11.5" fontWeight="700" letterSpacing="1.4">WHO DECIDES</text>
      <text x="892" y="104" fill="#64748b" fontSize="11.5" fontWeight="700" letterSpacing="1.4">WHERE IT LIVES</text>

      {ROWS.map((r, i) => {
        const y = 116 + i * 52;
        const k = KIND[r.kind];
        return (
          <g key={r.layer}>
            <rect x="40" y={y} width="1120" height="44" rx="9" fill="#121b27" stroke="#263241" strokeWidth="1" />
            <rect x="40" y={y} width="6" height="44" rx="3" fill={k.color} />
            <text x="64" y={y + 28} fill="#f8fafc" fontSize="16.5" fontWeight="800">{r.layer}</text>
            <text x="236" y={y + 28} fill="#d6e1ee" fontSize="14.5">{r.what}</text>
            <rect x="682" y={y + 9} width="176" height="26" rx="13" fill={k.fill} stroke={k.color} strokeWidth="1.2" />
            <text x="770" y={y + 27} textAnchor="middle" fill={k.color} fontSize="11.5" fontWeight="800" letterSpacing="1">{k.label}</text>
            <text x="892" y={y + 28} fill="#9fb3c8" fontSize="13" fontFamily={MONO}>{r.path}</text>
          </g>
        );
      })}

      <rect x="230" y="544" width="740" height="38" rx="10" fill="#1f1a10" stroke="#f59e0b" strokeWidth="1.4" />
      <text x="600" y="568" textAnchor="middle" fill="#fde68a" fontSize="15" fontWeight="700">
        if it must happen every time, it does not belong in CLAUDE.md
      </text>

      <text x="600" y="612" textAnchor="middle" fill="#64748b" fontSize="11.5">
        aiengineerinsights.com · from Anthropic's Claude Code docs, checked Nov 18 2026
      </text>
    </svg>
  </div>
);

export default ClaudeCodeSetupHeroDiagram;
