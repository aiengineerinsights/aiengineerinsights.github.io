// Hero diagram for the "Best AI Coding Agents" post. Pure inline SVG: prerenders
// to static markup, crawler-visible, zero runtime cost. The landscape split into
// four categories (terminal/CLI, AI IDEs, autonomous/cloud, open-source BYO-key)
// with the leading tools in each, over a "how to pick" band. viewBox 1200x630 so
// it doubles as the OG image.
const CodingAgentsHeroDiagram = () => {
  const cats = [
    { x: 48, y: 96, t: "TERMINAL / CLI AGENTS", tools: "Claude Code · Aider · OpenCode", d: "delegate outcomes · git-native · scriptable", c: "#34d399", b: "#059669" },
    { x: 616, y: 96, t: "AI IDEs", tools: "Cursor · GitHub Copilot · Zed", d: "edit with you · real-time · on every keystroke", c: "#60a5fa", b: "#2563eb" },
    { x: 48, y: 266, t: "AUTONOMOUS / CLOUD", tools: "Devin · Amp · Google Jules", d: "background & async · headless runs", c: "#c4b5fd", b: "#7c3aed" },
    { x: 616, y: 266, t: "OPEN-SOURCE / BYO-KEY", tools: "Aider · Cline · OpenCode", d: "own your keys · cost control · privacy", c: "#fbbf24", b: "#b45309" },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="The AI coding agent landscape in 2026, in four categories: terminal/CLI agents (Claude Code, Aider, OpenCode) for delegating outcomes and git workflows; AI IDEs (Cursor, GitHub Copilot, Zed) for real-time editing; autonomous/cloud agents (Devin, Amp, Google Jules) for async background work; and open-source BYO-key tools (Aider, Cline, OpenCode) for cost control and privacy. There is no single winner — match the tool to your workflow; many engineers run an IDE daily plus a terminal agent for heavy work."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="caBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
        </defs>

        <rect width="1200" height="630" fill="url(#caBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          THE AI CODING AGENT LANDSCAPE — 2026
        </text>
        <text x="600" y="72" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          four categories · pick by how you want to work, not by hype
        </text>

        {cats.map((c) => (
          <g key={c.t}>
            <rect x={c.x} y={c.y} width="536" height="150" rx="15" fill="#0e1a24" stroke={c.b} strokeWidth="1.7" />
            <rect x={c.x} y={c.y} width="6" height="150" rx="3" fill={c.b} />
            <text x={c.x + 26} y={c.y + 36} fill={c.c} fontSize="15.5" fontWeight="800">{c.t}</text>
            <text x={c.x + 26} y={c.y + 74} fill="#eaf4fb" fontSize="17" fontWeight="700">{c.tools}</text>
            <text x={c.x + 26} y={c.y + 108} fill="#9db6c6" fontSize="13">{c.d}</text>
          </g>
        ))}

        {/* how-to-pick band */}
        <rect x="48" y="438" width="1104" height="60" rx="14" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="600" y="464" textAnchor="middle" fill="#5eead4" fontSize="13.5" fontWeight="800">
          NO SINGLE WINNER — MATCH THE TOOL TO YOUR WORKFLOW
        </text>
        <text x="600" y="484" textAnchor="middle" fill="#9fe8da" fontSize="12">
          most engineers run an AI IDE daily + a terminal agent for heavy, delegated work
        </text>

        <text x="600" y="530" textAnchor="middle" fill="#7fb0c8" fontSize="12.5">
          Benchmarks move monthly · in 2026 Claude models lead SWE-bench Verified — but fit &gt; leaderboard
        </text>

        <text x="1152" y="600" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default CodingAgentsHeroDiagram;
