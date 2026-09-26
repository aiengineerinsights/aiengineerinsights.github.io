// Hero diagram for the "AI Agent Runtimes" deep-dive. Pure inline SVG so it
// prerenders to crawler-visible static markup and doubles as the OG image
// (viewBox 1200x630). Shows the request/execution lifecycle of an agent
// runtime: definition -> runtime core (scheduler/executor, state store, tool
// sandbox, memory, observability, guardrails) -> model + tool calls ->
// human-in-the-loop -> output, with swappable backend examples underneath.
const AgentRuntimesHeroDiagram = () => {
  const coreModules = [
    { t: "SCHEDULER / EXECUTOR", d: "runs steps, retries, resumes", c: "#93c5fd" },
    { t: "STATE STORE", d: "checkpoints long-running tasks", c: "#6ee7b7" },
    { t: "TOOL SANDBOX", d: "isolated code / shell execution", c: "#fcd34d" },
    { t: "MEMORY", d: "short + long-term context", c: "#c4b5fd" },
    { t: "OBSERVABILITY", d: "traces, tokens, cost", c: "#5eead4" },
    { t: "GUARDRAILS", d: "policy + approval gates", c: "#fca5a5" },
  ];
  const backends = ["LangGraph", "Temporal", "AWS Bedrock Agents", "Restate"];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="Lifecycle of an AI agent runtime: an agent definition is submitted to a runtime core containing a scheduler/executor, a durable state store for checkpointing, an isolated tool sandbox, memory, observability, and guardrails. The runtime drives model calls and tool calls, can pause for human-in-the-loop approval, and produces an output. The core is a swappable backend — examples shown are LangGraph, Temporal, AWS Bedrock Agents, and Restate — so the same agent definition can run on different durable-execution substrates."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="arBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="arArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#arBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="40" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          ANATOMY OF AN AI AGENT RUNTIME
        </text>
        <text x="600" y="62" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          durable execution for long-running, tool-using agents — not just a prompt loop
        </text>

        {/* left: agent definition */}
        <rect x="30" y="110" width="150" height="80" rx="12" fill="#0e1a24" stroke="#38bdf8" strokeWidth="1.7" />
        <text x="105" y="142" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="800">AGENT</text>
        <text x="105" y="160" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="800">DEFINITION</text>
        <text x="105" y="178" textAnchor="middle" fill="#9db6c6" fontSize="10.5">goal + tools + policy</text>
        <path d="M180,150 L214,150" stroke="#5b7488" strokeWidth="2.2" markerEnd="url(#arArrow)" />

        {/* runtime core box */}
        <rect x="220" y="88" width="590" height="270" rx="16" fill="#0e1a24" stroke="#22d3ee" strokeWidth="2" />
        <text x="515" y="112" textAnchor="middle" fill="#e6f6ff" fontSize="14" fontWeight="800">RUNTIME CORE (swappable backend)</text>
        {coreModules.map((m, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const x = 238 + col * 285;
          const y = 126 + row * 74;
          return (
            <g key={m.t}>
              <rect x={x} y={y} width="270" height="60" rx="10" fill="#0b1620" stroke={m.c} strokeWidth="1.4" />
              <text x={x + 14} y={y + 24} fill={m.c} fontSize="12" fontWeight="800">{m.t}</text>
              <text x={x + 14} y={y + 42} fill="#c3d4de" fontSize="10.5">{m.d}</text>
            </g>
          );
        })}

        {/* right: model + tool calls, then human-in-loop, then output */}
        <path d="M810,150 L844,150" stroke="#5b7488" strokeWidth="2.2" markerEnd="url(#arArrow)" />
        <rect x="850" y="110" width="160" height="80" rx="12" fill="#0e1a24" stroke="#7c3aed" strokeWidth="1.7" />
        <text x="930" y="142" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="800">MODEL +</text>
        <text x="930" y="160" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="800">TOOL CALLS</text>
        <text x="930" y="178" textAnchor="middle" fill="#9db6c6" fontSize="10.5">LLM · APIs · code exec</text>

        <path d="M1010,150 L1044,150" stroke="#5b7488" strokeWidth="2.2" markerEnd="url(#arArrow)" />
        <rect x="1050" y="110" width="120" height="80" rx="12" fill="#0e1a24" stroke="#f59e0b" strokeWidth="1.7" />
        <text x="1110" y="136" textAnchor="middle" fill="#fcd34d" fontSize="11.5" fontWeight="800">HUMAN-IN-</text>
        <text x="1110" y="152" textAnchor="middle" fill="#fcd34d" fontSize="11.5" fontWeight="800">THE-LOOP</text>
        <text x="1110" y="172" textAnchor="middle" fill="#9db6c6" fontSize="10">approval gate</text>

        {/* loop back into runtime core (durable retries / pause-resume) */}
        <path d="M1110,190 C1110,240 900,300 810,300" stroke="#5b7488" strokeWidth="1.8" fill="none" strokeDasharray="4 4" markerEnd="url(#arArrow)" />
        <text x="960" y="290" textAnchor="middle" fill="#7fb0c8" fontSize="10.5">retry / resume / checkpoint</text>

        {/* output */}
        <path d="M1110,190 L1110,230" stroke="#5b7488" strokeWidth="0" />
        <rect x="1010" y="230" width="160" height="60" rx="10" fill="#0b1a15" stroke="#10b981" strokeWidth="1.7" />
        <text x="1090" y="255" textAnchor="middle" fill="#6ee7b7" fontSize="12.5" fontWeight="800">OUTPUT</text>
        <text x="1090" y="273" textAnchor="middle" fill="#9db6c6" fontSize="10">result + audit trail</text>
        <path d="M1110,190 C1110,205 1100,220 1095,230" stroke="#5b7488" strokeWidth="2" fill="none" markerEnd="url(#arArrow)" />

        {/* backends band */}
        <rect x="30" y="548" width="1140" height="52" rx="13" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="52" y="570" fill="#5eead4" fontSize="12.5" fontWeight="800">SWAPPABLE BACKENDS</text>
        <text x="52" y="588" fill="#9fe8da" fontSize="11.5">
          {backends.join("  ·  ")}  ·  same agent definition, different durable-execution substrate
        </text>

        <text x="1152" y="536" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default AgentRuntimesHeroDiagram;
