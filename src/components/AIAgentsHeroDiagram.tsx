// Hero diagram for the "AI Agents Explained" post. Pure inline SVG so it
// prerenders to crawler-visible static markup and doubles as the OG image
// (viewBox 1200x630). Shows the canonical agent loop — perceive → plan → act →
// observe, cycling around an LLM reasoning core wired to memory and tools —
// which is what "ai agent architecture diagram" searchers are looking for.
const AIAgentsHeroDiagram = () => {
  // Diamond loop: 4 stages at N/E/S/W, arrows clockwise, LLM core in the middle.
  const stages = [
    { x: 470, y: 92, w: 260, h: 62, t: "① PERCEIVE", d: "goal + new observations", c: "#93c5fd", b: "#2563eb" },
    { x: 902, y: 269, w: 250, h: 62, t: "② PLAN", d: "break the goal into steps", c: "#c4b5fd", b: "#7c3aed" },
    { x: 470, y: 446, w: 260, h: 62, t: "③ ACT", d: "call a tool / take a step", c: "#6ee7b7", b: "#059669" },
    { x: 48, y: 269, w: 250, h: 62, t: "④ OBSERVE", d: "read the result, then loop", c: "#fcd34d", b: "#b45309" },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="Anatomy of an AI agent: a loop around an LLM reasoning core. The agent PERCEIVES its goal and new observations, PLANS by breaking the goal into steps, ACTS by calling a tool or taking a step, and OBSERVES the result — then repeats until the goal is met. The core reads and writes memory (short-term context window plus a long-term vector store) and acts through tools (web search, code execution, APIs, and RAG retrieval). Built with frameworks such as LangGraph, CrewAI, the Claude Agent SDK, and the OpenAI Agents SDK, with MCP for tools. An agent is an LLM that plans, uses tools, and loops on feedback — not a single prompt."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="agBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="agArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#agBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          ANATOMY OF AN AI AGENT
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          an LLM that plans, uses tools, and loops on feedback — not a single prompt
        </text>

        {/* clockwise loop arrows between the four cardinal stages */}
        <g stroke="#5b7488" strokeWidth="2.2" fill="none" markerEnd="url(#agArrow)">
          <path d="M735,132 C830,150 880,210 905,262" />
          <path d="M905,338 C880,392 830,452 735,472" />
          <path d="M465,472 C370,452 320,392 295,338" />
          <path d="M295,262 C320,210 370,150 465,132" />
        </g>

        {/* center LLM core + memory */}
        <rect x="440" y="248" width="320" height="104" rx="16" fill="#0e1a24" stroke="#38bdf8" strokeWidth="2" />
        <text x="600" y="284" textAnchor="middle" fill="#e6f6ff" fontSize="17" fontWeight="800">LLM REASONING CORE</text>
        <text x="600" y="308" textAnchor="middle" fill="#9db6c6" fontSize="12.5">decide the next action</text>
        <rect x="470" y="318" width="260" height="24" rx="7" fill="#12202b" stroke="#334b59" strokeWidth="1" />
        <text x="600" y="335" textAnchor="middle" fill="#9fe8da" fontSize="11.5">MEMORY · context window + long-term store</text>

        {/* four stages */}
        {stages.map((s) => (
          <g key={s.t}>
            <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="13" fill="#0e1a24" stroke={s.b} strokeWidth="1.7" />
            <rect x={s.x} y={s.y} width="6" height={s.h} rx="3" fill={s.b} />
            <text x={s.x + 24} y={s.y + 27} fill={s.c} fontSize="15" fontWeight="800">{s.t}</text>
            <text x={s.x + 24} y={s.y + 48} fill="#c3d4de" fontSize="12.5">{s.d}</text>
          </g>
        ))}

        {/* tools band */}
        <rect x="48" y="548" width="1104" height="52" rx="13" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="70" y="570" fill="#5eead4" fontSize="12.5" fontWeight="800">TOOLS</text>
        <text x="70" y="588" fill="#9fe8da" fontSize="11.5">web search · code execution · APIs · RAG retrieval — often via MCP</text>
        <text x="1130" y="570" textAnchor="end" fill="#7fb0c8" fontSize="12">FRAMEWORKS</text>
        <text x="1130" y="588" textAnchor="end" fill="#9db6c6" fontSize="11.5">LangGraph · CrewAI · Claude Agent SDK · OpenAI Agents SDK</text>

        <text x="1152" y="536" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default AIAgentsHeroDiagram;
