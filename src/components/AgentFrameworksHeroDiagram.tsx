// Hero diagram for "Open-Source AI Agent Frameworks Compared". Pure inline SVG
// so it prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630). Shows four framework cards with their programming-model
// glyph, a high-level-vs-explicit-control spectrum underneath, and the
// "framework != runtime" reminder.
const AgentFrameworksHeroDiagram = () => {
  const frameworks = [
    { x: 40, t: "LangGraph", d: "graph of nodes + edges, explicit state", glyph: "graph", stroke: "#38bdf8" },
    { x: 325, t: "CrewAI", d: "role-based crews of agents + tasks", glyph: "crew", stroke: "#a78bfa" },
    { x: 610, t: "AutoGen / AG2", d: "conversational multi-agent chat", glyph: "chat", stroke: "#fbbf24" },
    { x: 895, t: "Pydantic AI", d: "type-safe, function-first agents", glyph: "typed", stroke: "#34d399" },
  ];

  const renderGlyph = (glyph: string, cx: number, cy: number, color: string) => {
    switch (glyph) {
      case "graph":
        return (
          <g>
            <line x1={cx - 36} y1={cy} x2={cx} y2={cy - 22} stroke="#33506a" strokeWidth="1.6" />
            <line x1={cx - 36} y1={cy} x2={cx} y2={cy + 22} stroke="#33506a" strokeWidth="1.6" />
            <line x1={cx} y1={cy - 22} x2={cx + 36} y2={cy} stroke="#33506a" strokeWidth="1.6" />
            <line x1={cx} y1={cy + 22} x2={cx + 36} y2={cy} stroke="#33506a" strokeWidth="1.6" />
            <line x1={cx + 36} y1={cy} x2={cx} y2={cy + 22} stroke="#33506a" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx={cx - 36} cy={cy} r="7" fill="#0e1a24" stroke={color} strokeWidth="1.8" />
            <circle cx={cx} cy={cy - 22} r="7" fill="#0e1a24" stroke={color} strokeWidth="1.8" />
            <circle cx={cx} cy={cy + 22} r="7" fill="#0e1a24" stroke={color} strokeWidth="1.8" />
            <circle cx={cx + 36} cy={cy} r="7" fill={color} stroke={color} strokeWidth="1.8" />
          </g>
        );
      case "crew":
        return (
          <g>
            {[-30, 0, 30].map((dx) => (
              <g key={dx}>
                <circle cx={cx + dx} cy={cy - 10} r="8" fill="#0e1a24" stroke={color} strokeWidth="1.8" />
                <path d={`M${cx + dx - 13},${cy + 20} a13,13 0 0 1 26,0`} fill="none" stroke={color} strokeWidth="1.8" />
              </g>
            ))}
            <rect x={cx - 44} y={cy + 26} width="88" height="4" rx="2" fill={color} opacity="0.6" />
          </g>
        );
      case "chat":
        return (
          <g>
            <path d={`M${cx - 44},${cy - 22} h50 a6,6 0 0 1 6,6 v18 a6,6 0 0 1 -6,6 h-30 l-10,9 v-9 h-10 a6,6 0 0 1 -6,-6 v-18 a6,6 0 0 1 6,-6 z`} fill="#0e1a24" stroke={color} strokeWidth="1.8" />
            <path d={`M${cx + 46},${cy - 6} h-50 a6,6 0 0 0 -6,6 v18 a6,6 0 0 0 6,6 h30 l10,9 v-9 h10 a6,6 0 0 0 6,-6 v-18 a6,6 0 0 0 -6,-6 z`} fill="#0e1a24" stroke={color} strokeWidth="1.8" opacity="0.85" />
          </g>
        );
      default:
        return (
          <g>
            <rect x={cx - 46} y={cy - 22} width="92" height="46" rx="8" fill="#0e1a24" stroke={color} strokeWidth="1.8" />
            <text x={cx} y={cy + 6} textAnchor="middle" fill={color} fontSize="15" fontWeight="700" fontFamily="ui-monospace, monospace">
              fn(x: T) → R
            </text>
          </g>
        );
    }
  };

  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="Open-source AI agent frameworks compared. Four cards show the main frameworks and their programming model: LangGraph (a graph of nodes and edges with explicit state), CrewAI (role-based crews of agents with tasks), AutoGen and its AG2 fork (conversational multi-agent chat), and Pydantic AI (type-safe, function-first agents). Below them a spectrum runs from high-level and fast to stand up, where CrewAI sits, to explicit control over state and flow, where LangGraph sits, with AutoGen and Pydantic AI in between. A footer note reminds the reader that a framework defines how you write the agent, not how it runs in production — that is the job of an agent runtime."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="afwBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <linearGradient id="afwSpectrum" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#0e1a24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.35" />
          </linearGradient>
          <marker id="afwArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#afwBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#eaf4fb" fontSize="19" fontWeight="800" letterSpacing="1">
          OPEN-SOURCE AI AGENT FRAMEWORKS
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#7dd3fc" fontSize="12.5">
          pick by programming model and how much control you need — not by feature list
        </text>

        {/* four framework cards */}
        {frameworks.map((f) => (
          <g key={f.t}>
            <rect x={f.x} y="100" width="265" height="230" rx="12" fill="#0e1a24" stroke={f.stroke} strokeWidth="1.6" />
            {renderGlyph(f.glyph, f.x + 132, 165, f.stroke)}
            <text x={f.x + 132} y="250" textAnchor="middle" fill="#eaf4fb" fontSize="17" fontWeight="700">{f.t}</text>
            <text x={f.x + 132} y="275" textAnchor="middle" fill="#8fb8cc" fontSize="11.5">{f.d}</text>
            <text x={f.x + 132} y="305" textAnchor="middle" fill={f.stroke} fontSize="10.5" opacity="0.9">
              open source · Python
            </text>
          </g>
        ))}

        {/* spectrum: high-level & fast vs explicit control */}
        <text x="600" y="395" textAnchor="middle" fill="#eaf4fb" fontSize="15" fontWeight="700">
          Abstraction vs control
        </text>
        <rect x="150" y="420" width="900" height="34" rx="8" fill="url(#afwSpectrum)" stroke="#33506a" strokeWidth="1.4" />
        <line x1="420" y1="420" x2="420" y2="454" stroke="#33506a" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="780" y1="420" x2="780" y2="454" stroke="#33506a" strokeWidth="1" strokeDasharray="3 3" />
        <text x="285" y="443" textAnchor="middle" fill="#e0d4ff" fontSize="12.5" fontWeight="600">CrewAI — high-level &amp; fast</text>
        <text x="600" y="443" textAnchor="middle" fill="#c9dfe9" fontSize="12">AutoGen / AG2 · Pydantic AI</text>
        <text x="915" y="443" textAnchor="middle" fill="#bae6fd" fontSize="12.5" fontWeight="600">LangGraph — explicit control</text>
        <line x1="150" y1="478" x2="1050" y2="478" stroke="#33506a" strokeWidth="1.4" markerStart="url(#afwArrow)" markerEnd="url(#afwArrow)" />
        <text x="235" y="500" textAnchor="middle" fill="#8fb8cc" fontSize="10.5">roles + tasks, less wiring</text>
        <text x="965" y="500" textAnchor="middle" fill="#8fb8cc" fontSize="10.5">you own the state and the flow</text>

        {/* footer note */}
        <rect x="200" y="540" width="800" height="48" rx="10" fill="#0e1a24" stroke="#33506a" strokeWidth="1.2" />
        <text x="600" y="560" textAnchor="middle" fill="#eaf4fb" fontSize="12.5" fontWeight="600">
          a framework defines how you write the agent — not how it runs in production
        </text>
        <text x="600" y="578" textAnchor="middle" fill="#8fb8cc" fontSize="10.5">
          sandboxing, scheduling, and persistence are the job of an agent runtime
        </text>
      </svg>
    </div>
  );
};

export default AgentFrameworksHeroDiagram;
