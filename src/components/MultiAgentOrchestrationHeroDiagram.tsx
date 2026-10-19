// Hero diagram for the "Multi-Agent Orchestration Patterns" post. Pure inline
// SVG so it prerenders to crawler-visible static markup and doubles as the OG
// image (viewBox 1200x630). Shows the four dominant coordination patterns —
// sequential, concurrent, handoff, and hierarchical (orchestrator-worker) —
// which is what "multi-agent orchestration patterns" searchers want to see.
const MultiAgentOrchestrationHeroDiagram = () => {
  const panels = [
    { x: 40, y: 96, w: 540, h: 190, t: "① SEQUENTIAL", d: "A → B → C, fixed pipeline order", c: "#93c5fd", b: "#2563eb" },
    { x: 620, y: 96, w: 540, h: 190, t: "② CONCURRENT", d: "fan-out to N agents, fan-in results", c: "#6ee7b7", b: "#059669" },
    { x: 40, y: 320, w: 540, h: 190, t: "③ HANDOFF", d: "control passes agent → agent by context", c: "#fcd34d", b: "#b45309" },
    { x: 620, y: 320, w: 540, h: 190, t: "④ HIERARCHICAL", d: "orchestrator plans, workers execute", c: "#c4b5fd", b: "#7c3aed" },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="Four multi-agent orchestration patterns. SEQUENTIAL chains agents A to B to C in a fixed pipeline order. CONCURRENT fans a task out to several agents in parallel and fans the results back in. HANDOFF passes control from one agent to another based on context, each owning a slice of the conversation. HIERARCHICAL uses an orchestrator (supervisor or manager) agent that plans and dispatches tasks to specialized worker agents and assembles their results. Frameworks implementing these patterns in 2026 include LangGraph, Microsoft Agent Framework, CrewAI, AutoGen, and Google ADK."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="maoBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="maoArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#maoBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="38" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          MULTI-AGENT ORCHESTRATION PATTERNS
        </text>
        <text x="600" y="62" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          four ways to coordinate more than one agent on a task
        </text>

        {panels.map((p) => (
          <g key={p.t}>
            <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="14" fill="#0e1a24" stroke={p.b} strokeWidth="1.7" />
            <text x={p.x + 24} y={p.y + 34} fill={p.c} fontSize="16" fontWeight="800">{p.t}</text>
            <text x={p.x + 24} y={p.y + 56} fill="#c3d4de" fontSize="12.5">{p.d}</text>
          </g>
        ))}

        {/* sequential nodes */}
        {["A", "B", "C"].map((n, i) => (
          <g key={n}>
            <circle cx={120 + i * 170} cy={210} r="26" fill="#12202b" stroke="#2563eb" strokeWidth="2" />
            <text x={120 + i * 170} y={216} textAnchor="middle" fill="#93c5fd" fontSize="16" fontWeight="800">{n}</text>
            {i < 2 && <path d={`M${146 + i * 170},210 L${264 + i * 170},210`} stroke="#5b7488" strokeWidth="2" markerEnd="url(#maoArrow)" />}
          </g>
        ))}

        {/* concurrent fan out/in */}
        <circle cx="700" cy="210" r="22" fill="#12202b" stroke="#059669" strokeWidth="2" />
        <text x="700" y="215" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="800">IN</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M722,210 L${880},${180 + i * 30}`} stroke="#5b7488" strokeWidth="1.6" markerEnd="url(#maoArrow)" />
            <circle cx="910" cy={180 + i * 30} r="18" fill="#12202b" stroke="#059669" strokeWidth="2" />
          </g>
        ))}
        <text x="1040" y="215" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="800">OUT</text>

        {/* handoff */}
        <circle cx="130" cy="430" r="24" fill="#12202b" stroke="#b45309" strokeWidth="2" />
        <text x="130" y="435" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="800">AGENT 1</text>
        <path d="M156,430 C230,410 260,440 330,430" stroke="#5b7488" strokeWidth="2" markerEnd="url(#maoArrow)" fill="none" />
        <circle cx="360" cy="430" r="24" fill="#12202b" stroke="#b45309" strokeWidth="2" />
        <text x="360" y="435" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="800">AGENT 2</text>
        <text x="245" y="400" textAnchor="middle" fill="#9db6c6" fontSize="10.5">context + control</text>

        {/* hierarchical */}
        <rect x="860" y="408" width="140" height="40" rx="10" fill="#12202b" stroke="#7c3aed" strokeWidth="2" />
        <text x="930" y="433" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="800">ORCHESTRATOR</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M930,448 L${790 + i * 140},480`} stroke="#5b7488" strokeWidth="1.6" markerEnd="url(#maoArrow)" />
            <rect x={760 + i * 140} y="480" width="90" height="30" rx="8" fill="#12202b" stroke="#7c3aed" strokeWidth="1.6" />
            <text x={805 + i * 140} y="500" textAnchor="middle" fill="#c4b5fd" fontSize="10.5">WORKER</text>
          </g>
        ))}

        <text x="1152" y="600" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default MultiAgentOrchestrationHeroDiagram;
