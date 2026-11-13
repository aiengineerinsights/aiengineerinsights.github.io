// Hero diagram for the "Best Hermes Agent alternatives" shortlist. Pure inline SVG:
// prerenders to static markup, zero runtime cost, crawler-visible. Plots the landscape
// on two axes — turnkey personal agent vs build-your-own framework (x), and single-agent
// vs multi-agent/orchestration (y) — placing each tool where it actually sits.
const HermesAlternativesHeroDiagram = () => (
  <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="A two-axis map of open-source AI agents. The horizontal axis runs from turnkey personal agent on the left to build-your-own framework on the right; the vertical axis runs from single-agent at the bottom to multi-agent orchestration at the top. Hermes Agent and OpenClaw sit on the left as turnkey single-agent personal assistants. Open Interpreter sits lower-center as a local single-agent tool. LangGraph, CrewAI, and Microsoft AutoGen sit on the right as multi-agent frameworks, with Agent Zero as a general-purpose framework toward the center-right."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="haBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0c0b" />
          <stop offset="55%" stopColor="#0f0f0e" />
          <stop offset="100%" stopColor="#151514" />
        </linearGradient>
        <linearGradient id="haBaseline" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4A6F5" />
          <stop offset="100%" stopColor="#3f2767" />
        </linearGradient>
        <marker id="haArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#C4A6F5" />
        </marker>
      </defs>

      <rect width="1200" height="560" fill="url(#haBg)" />
      <g fill="#C4A6F5" opacity="0.07">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={26 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="42" textAnchor="middle" fill="#efefed" fontSize="18" fontWeight="800" letterSpacing="1">
        THE OPEN-SOURCE AGENT LANDSCAPE
      </text>

      {/* Axes */}
      <line x1="150" y1="480" x2="1080" y2="480" stroke="#4d2f7d" strokeWidth="1.6" markerEnd="url(#haArrow)" />
      <line x1="150" y1="480" x2="150" y2="90" stroke="#4d2f7d" strokeWidth="1.6" markerEnd="url(#haArrow)" />

      {/* X-axis labels */}
      <text x="200" y="508" fill="#dcdad6" fontSize="13" fontWeight="700">◀ turnkey personal agent</text>
      <text x="1030" y="508" textAnchor="end" fill="#dcdad6" fontSize="13" fontWeight="700">build-your-own framework ▶</text>

      {/* Y-axis labels */}
      <text x="132" y="110" textAnchor="end" fill="#dcdad6" fontSize="13" fontWeight="700" transform="rotate(-90 132 110)">multi-agent / orchestration ▲</text>
      <text x="132" y="470" textAnchor="end" fill="#dcdad6" fontSize="13" fontWeight="700" transform="rotate(-90 132 470)">◀ single-agent</text>

      {/* Midline guides */}
      <line x1="615" y1="90" x2="615" y2="480" stroke="#2d1c4a" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="150" y1="290" x2="1080" y2="290" stroke="#2d1c4a" strokeWidth="1" strokeDasharray="4 6" />

      {/* Tool nodes: cx, cy, label, sub, whether it is a baseline/highlight */}
      {[
        { cx: 300, cy: 360, label: "Hermes Agent", sub: "turnkey · self-improving", baseline: true },
        { cx: 430, cy: 330, label: "OpenClaw", sub: "multi-channel assistant", baseline: false },
        { cx: 470, cy: 430, label: "Open Interpreter", sub: "local code execution", baseline: false },
        { cx: 820, cy: 180, label: "LangGraph", sub: "stateful graph workflows", baseline: false },
        { cx: 960, cy: 210, label: "CrewAI", sub: "role-based crews", baseline: false },
        { cx: 900, cy: 320, label: "AutoGen", sub: "multi-agent conversation", baseline: false },
        { cx: 720, cy: 400, label: "Agent Zero", sub: "general-purpose framework", baseline: false },
      ].map((n) => (
        <g key={n.label}>
          <circle
            cx={n.cx}
            cy={n.cy}
            r={n.baseline ? 13 : 9}
            fill={n.baseline ? "url(#haBaseline)" : "#121211"}
            stroke={n.baseline ? "#dcdad6" : "#C4A6F5"}
            strokeWidth={n.baseline ? 2 : 1.4}
          />
          <text x={n.cx + 20} y={n.cy - 2} fill="#f9f9f9" fontSize="14.5" fontWeight={n.baseline ? 800 : 700}>{n.label}</text>
          <text x={n.cx + 20} y={n.cy + 16} fill="#C4A6F5" fontSize="12" fontFamily="monospace">{n.sub}</text>
        </g>
      ))}

      <text x="300" y="336" textAnchor="middle" fill="#ebeae7" fontSize="11" fontStyle="italic">baseline</text>

      <text x="1152" y="548" textAnchor="end" fill="#878376" fontSize="11">
        aiengineerinsights.com
      </text>
    </svg>
  </div>
);

export default HermesAlternativesHeroDiagram;
