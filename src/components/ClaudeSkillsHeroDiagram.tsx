// Hero diagram for the "Claude Code Skills" post. Pure inline SVG so it
// prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630, rasterised to public/og-claude-code-skills.png).
// Shows a skill folder, the three progressive-disclosure levels Anthropic
// documents (metadata always loaded, SKILL.md on trigger, bundled files on
// demand), where skills live, and how they're installed from marketplaces.
// Targets "claude code skills" / "claude skills marketplace" / "best claude skills".
const levels = [
  { y: 150, n: "1", title: "Metadata", sub: "name + description · always loaded · ~100 tokens per skill", color: "#38bdf8" },
  { y: 250, n: "2", title: "SKILL.md body", sub: "instructions · loaded when the task matches · under 5k tokens", color: "#a78bfa" },
  { y: 350, n: "3", title: "Bundled files", sub: "reference docs, scripts · loaded or run only when needed", color: "#f472b6" },
];

const ClaudeSkillsHeroDiagram = () => {
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        fontFamily="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        aria-label="How Claude Code skills work. A skill is a folder containing a SKILL.md file with a name and description, plus optional reference files and scripts. Claude loads skills in three levels: the metadata (name and description, about 100 tokens per skill) is always loaded; the SKILL.md instructions load only when a task matches the description; bundled files and scripts load or run only when needed. Skills live in your personal folder ~/.claude/skills, in a project's .claude/skills folder, or inside plugins. You can install skills from plugin marketplaces with /plugin install, such as the official claude-plugins-official marketplace or Anthropic's skills repository, or create your own with the skill-creator skill."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="skillsBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c0f14" />
            <stop offset="100%" stopColor="#141b26" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#skillsBg)" />

        <text x="600" y="48" textAnchor="middle" fill="#eef4ff" fontSize="23" fontWeight="800" letterSpacing="1">
          CLAUDE CODE SKILLS, EXPLAINED
        </text>
        <text x="600" y="74" textAnchor="middle" fill="#9fb3d1" fontSize="13.5">
          a folder of instructions + scripts that Claude loads only when the task needs it
        </text>

        {/* skill folder */}
        <rect x="40" y="120" width="300" height="310" rx="12" fill="#121a26" stroke="#64748b" strokeWidth="1.3" />
        <text x="62" y="152" fill="#e2e8f0" fontSize="14" fontWeight="800">A SKILL IS A FOLDER</text>
        <text x="62" y="190" fill="#93c5fd" fontSize="14" fontFamily="ui-monospace, monospace">my-skill/</text>
        <text x="84" y="218" fill="#e2e8f0" fontSize="14" fontFamily="ui-monospace, monospace">├─ SKILL.md</text>
        <text x="84" y="246" fill="#94a3b8" fontSize="14" fontFamily="ui-monospace, monospace">├─ reference.md</text>
        <text x="84" y="274" fill="#94a3b8" fontSize="14" fontFamily="ui-monospace, monospace">└─ scripts/</text>
        <rect x="62" y="300" width="256" height="108" rx="8" fill="#0b1220" stroke="#334155" />
        <text x="76" y="324" fill="#64748b" fontSize="12.5" fontFamily="ui-monospace, monospace">---</text>
        <text x="76" y="344" fill="#e2e8f0" fontSize="12.5" fontFamily="ui-monospace, monospace">name: my-skill</text>
        <text x="76" y="364" fill="#e2e8f0" fontSize="12.5" fontFamily="ui-monospace, monospace">description: what + when</text>
        <text x="76" y="384" fill="#64748b" fontSize="12.5" fontFamily="ui-monospace, monospace">---  then instructions</text>

        {/* progressive disclosure */}
        <text x="680" y="118" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="800" letterSpacing="0.8">
          PROGRESSIVE DISCLOSURE: WHAT ENTERS CONTEXT, AND WHEN
        </text>
        {levels.map((l) => (
          <g key={l.n}>
            <rect x="380" y={l.y - 16} width="600" height="76" rx="12" fill="#151b28" stroke={l.color} strokeWidth="1.5" />
            <circle cx="420" cy={l.y + 22} r="18" fill={l.color} />
            <text x="420" y={l.y + 28} textAnchor="middle" fill="#0c0f14" fontSize="17" fontWeight="800">{l.n}</text>
            <text x="456" y={l.y + 16} fill="#f1f5f9" fontSize="17" fontWeight="800">{l.title}</text>
            <text x="456" y={l.y + 40} fill="#cbd5e1" fontSize="13">{l.sub}</text>
          </g>
        ))}

        {/* where they live */}
        <rect x="1000" y="120" width="170" height="310" rx="12" fill="#10201a" stroke="#22c55e" strokeWidth="1.3" />
        <text x="1085" y="150" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="800">WHERE THEY LIVE</text>
        {["~/.claude/skills", "(personal)", ".claude/skills", "(project)", "plugins", "(installed)"].map((t, i) => (
          <text key={t + i} x="1085" y={190 + i * 26} textAnchor="middle" fill={i % 2 ? "#8fbfa5" : "#d1fae5"} fontSize={i % 2 ? "12" : "13"} fontFamily={i % 2 ? undefined : "ui-monospace, monospace"}>{t}</text>
        ))}
        <text x="1085" y="372" textAnchor="middle" fill="#d1fae5" fontSize="12.5">auto-loaded by</text>
        <text x="1085" y="392" textAnchor="middle" fill="#d1fae5" fontSize="12.5">description, or</text>
        <text x="1085" y="412" textAnchor="middle" fill="#d1fae5" fontSize="12.5" fontFamily="ui-monospace, monospace">/skill-name</text>

        {/* install bar */}
        <rect x="40" y="462" width="1130" height="88" rx="12" fill="#1f1a10" stroke="#f59e0b" strokeWidth="1.4" />
        <text x="62" y="494" fill="#fde68a" fontSize="14.5" fontWeight="800">GET SKILLS FROM A MARKETPLACE, OR BUILD YOUR OWN</text>
        <text x="62" y="522" fill="#fef3c7" fontSize="13.5" fontFamily="ui-monospace, monospace">/plugin install skill-creator@claude-plugins-official</text>
        <text x="62" y="542" fill="#e5d3a8" fontSize="13.5" fontFamily="ui-monospace, monospace">/plugin marketplace add anthropics/skills</text>
        <text x="1148" y="532" textAnchor="end" fill="#e5d3a8" fontSize="12.5">only install skills you trust: they can run code</text>

        <text x="600" y="602" textAnchor="middle" fill="#64748b" fontSize="12">
          aiengineerinsights.com · from Anthropic's Agent Skills and Claude Code docs, Oct 2026
        </text>
      </svg>
    </div>
  );
};

export default ClaudeSkillsHeroDiagram;
