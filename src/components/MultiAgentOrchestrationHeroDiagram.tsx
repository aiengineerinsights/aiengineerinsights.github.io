// Hero diagram for the "Multi-Agent Orchestration Patterns" post. Pure inline
// SVG so it prerenders to crawler-visible static markup and doubles as the OG
// image (viewBox 1200x630). Shows the four dominant coordination patterns —
// sequential, concurrent, handoff, and hierarchical (orchestrator-worker) —
// which is what "multi-agent orchestration patterns" searchers want to see.
const MultiAgentOrchestrationHeroDiagram = () => {
  const panels = [
    { x: 40, y: 96, w: 540, h: 190, t: "① SEQUENTIAL", d: "A → B → C, fixed pipeline order", c: "#7CC4F2", b: "#7CC4F2" },
    { x: 620, y: 96, w: 540, h: 190, t: "② CONCURRENT", d: "fan-out to N agents, fan-in results", c: "#6FD6A8", b: "#225a41" },
    { x: 40, y: 320, w: 540, h: 190, t: "③ HANDOFF", d: "control passes agent → agent by context", c: "#FFB454", b: "#6e502a" },
    { x: 620, y: 320, w: 540, h: 190, t: "④ HIERARCHICAL", d: "orchestrator plans, workers execute", c: "#dcdad6", b: "#C4A6F5" },
  ];
  return (
    <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="Four multi-agent orchestration patterns. SEQUENTIAL chains agents A to B to C in a fixed pipeline order. CONCURRENT fans a task out to several agents in parallel and fans the results back in. HANDOFF passes control from one agent to another based on context, each owning a slice of the conversation. HIERARCHICAL uses an orchestrator (supervisor or manager) agent that plans and dispatches tasks to specialized worker agents and assembles their results. Frameworks implementing these patterns in 2026 include LangGraph, Microsoft Agent Framework, CrewAI, AutoGen, and Google ADK."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="maoBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c0c0b" />
            <stop offset="60%" stopColor="#0e0e0d" />
            <stop offset="100%" stopColor="#10100f" />
          </linearGradient>
          <marker id="maoArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#79756a" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#maoBg)" />
        <g fill="#7CC4F2" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="38" textAnchor="middle" fill="#f3f3f2" fontSize="19" fontWeight="800" letterSpacing="1">
          MULTI-AGENT ORCHESTRATION PATTERNS
        </text>
        <text x="600" y="62" textAnchor="middle" fill="#b3b0a8" fontSize="12.5">
          four ways to coordinate more than one agent on a task
        </text>

        {panels.map((p) => (
          <g key={p.t}>
            <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="14" fill="#10100f" stroke={p.b} strokeWidth="1.7" />
            <text x={p.x + 24} y={p.y + 34} fill={p.c} fontSize="16" fontWeight="800">{p.t}</text>
            <text x={p.x + 24} y={p.y + 56} fill="#d4d2cd" fontSize="12.5">{p.d}</text>
          </g>
        ))}

        {/* sequential nodes */}
        {["A", "B", "C"].map((n, i) => (
          <g key={n}>
            <circle cx={120 + i * 170} cy={210} r="26" fill="#141312" stroke="#7CC4F2" strokeWidth="2" />
            <text x={120 + i * 170} y={216} textAnchor="middle" fill="#7CC4F2" fontSize="16" fontWeight="800">{n}</text>
            {i < 2 && <path d={`M${146 + i * 170},210 L${264 + i * 170},210`} stroke="#79756a" strokeWidth="2" markerEnd="url(#maoArrow)" />}
          </g>
        ))}

        {/* concurrent fan out/in */}
        <circle cx="700" cy="210" r="22" fill="#141312" stroke="#225a41" strokeWidth="2" />
        <text x="700" y="215" textAnchor="middle" fill="#6FD6A8" fontSize="11" fontWeight="800">IN</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M722,210 L850,${170 + i * 40}`} stroke="#79756a" strokeWidth="1.6" markerEnd="url(#maoArrow)" />
            <circle cx="870" cy={170 + i * 40} r="16" fill="#141312" stroke="#225a41" strokeWidth="2" />
            <path d={`M886,${170 + i * 40} L1016,210`} stroke="#79756a" strokeWidth="1.6" markerEnd="url(#maoArrow)" />
          </g>
        ))}
        <circle cx="1040" cy="210" r="22" fill="#141312" stroke="#225a41" strokeWidth="2" />
        <text x="1040" y="215" textAnchor="middle" fill="#6FD6A8" fontSize="11" fontWeight="800">OUT</text>

        {/* handoff */}
        <circle cx="140" cy="430" r="36" fill="#141312" stroke="#6e502a" strokeWidth="2" />
        <text x="140" y="434" textAnchor="middle" fill="#FFB454" fontSize="11" fontWeight="800">AGENT 1</text>
        <path d="M178,430 C250,410 280,440 350,430" stroke="#79756a" strokeWidth="2" markerEnd="url(#maoArrow)" fill="none" />
        <circle cx="390" cy="430" r="36" fill="#141312" stroke="#6e502a" strokeWidth="2" />
        <text x="390" y="434" textAnchor="middle" fill="#FFB454" fontSize="11" fontWeight="800">AGENT 2</text>
        <text x="265" y="404" textAnchor="middle" fill="#b7b4ac" fontSize="10.5">context + control</text>

        {/* hierarchical */}
        <rect x="860" y="384" width="140" height="40" rx="10" fill="#141312" stroke="#C4A6F5" strokeWidth="2" />
        <text x="930" y="409" textAnchor="middle" fill="#dcdad6" fontSize="12" fontWeight="800">ORCHESTRATOR</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M930,424 L${805 + i * 125},456`} stroke="#79756a" strokeWidth="1.6" markerEnd="url(#maoArrow)" />
            <rect x={760 + i * 125} y="458" width="90" height="30" rx="8" fill="#141312" stroke="#C4A6F5" strokeWidth="1.6" />
            <text x={805 + i * 125} y="478" textAnchor="middle" fill="#dcdad6" fontSize="10.5">WORKER</text>
          </g>
        ))}

        <text x="1152" y="600" textAnchor="end" fill="#6c695e" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default MultiAgentOrchestrationHeroDiagram;
