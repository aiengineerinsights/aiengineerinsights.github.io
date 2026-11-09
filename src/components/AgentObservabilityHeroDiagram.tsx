// Hero diagram for "AI Agent Observability". Pure inline SVG so it prerenders
// to crawler-visible markup and doubles as the OG image (viewBox 1200x630).
// Shows why agent observability isn't classic APM: one user request fans out
// into a nested span tree (invoke_agent -> chat -> execute_tool / plan /
// sub-agent handoff), each span carrying OpenTelemetry GenAI semconv
// attributes (gen_ai.agent.name, gen_ai.request.model, gen_ai.usage.*).
const AgentObservabilityHeroDiagram = () => {
  const spans = [
    { y: 150, w: 980, x: 110, depth: 0, label: "invoke_agent  ·  gen_ai.agent.name=researcher", color: "#7c3aed", fill: "#1b1030" },
    { y: 220, w: 420, x: 150, depth: 1, label: "chat  ·  gen_ai.request.model=claude-opus", color: "#2563eb", fill: "#0e1a2c" },
    { y: 280, w: 300, x: 150, depth: 1, label: "execute_tool  ·  gen_ai.tool.name=web_search", color: "#059669", fill: "#0d1f1a" },
    { y: 340, w: 520, x: 150, depth: 1, label: "invoke_agent  ·  gen_ai.agent.name=writer (handoff)", color: "#db2777", fill: "#260f1e" },
    { y: 400, w: 260, x: 190, depth: 2, label: "chat  ·  gen_ai.usage.output_tokens=842", color: "#2563eb", fill: "#0e1a2c" },
    { y: 400, w: 200, x: 470, depth: 2, label: "execute_tool  ·  gen_ai.tool.name=file_write", color: "#059669", fill: "#0d1f1a" },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 560"
        role="img"
        aria-label="A span tree for one AI agent request, the shape agent observability captures that classic APM misses. The root span is invoke_agent for a researcher agent, carrying OpenTelemetry GenAI semantic convention attributes like gen_ai.agent.name. Nested under it: a chat span to claude-opus with gen_ai.request.model and gen_ai.usage token counts, an execute_tool span calling web_search, and a handoff to a second invoke_agent span for a writer agent, which itself nests a chat span and an execute_tool span calling file_write. A single end-to-end request duration hides this whole tree; agent observability tools reconstruct it from OpenTelemetry GenAI spans so you can see exactly which model call, tool call, or sub-agent handoff caused a slow or wrong answer."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="aoBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="aoArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="560" fill="url(#aoBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 12 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 42} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="42" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          AI AGENT OBSERVABILITY: ONE REQUEST, A SPAN TREE
        </text>
        <text x="600" y="65" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          OpenTelemetry GenAI semantic conventions — invoke_agent → chat / execute_tool / handoff, not one HTTP timing
        </text>

        {/* connecting lines from root to children, children to grandchildren */}
        <line x1="150" y1="180" x2="150" y2="220" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#aoArrow)" />
        <line x1="150" y1="180" x2="150" y2="280" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#aoArrow)" />
        <line x1="150" y1="180" x2="150" y2="340" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#aoArrow)" />
        <line x1="190" y1="370" x2="190" y2="400" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#aoArrow)" />
        <line x1="190" y1="370" x2="470" y2="400" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#aoArrow)" />

        {spans.map((s) => (
          <g key={s.label}>
            <rect x={s.x} y={s.y} width={s.w} height="44" rx="10" fill={s.fill} stroke={s.color} strokeWidth="1.6" />
            <rect x={s.x} y={s.y} width="6" height="44" rx="3" fill={s.color} />
            <text x={s.x + 22} y={s.y + 27} fill="#eaf4fb" fontSize="13.5" fontWeight="600">{s.label}</text>
          </g>
        ))}

        <rect x="48" y="470" width="1104" height="56" rx="14" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="600" y="495" textAnchor="middle" fill="#5eead4" fontSize="13.5" fontWeight="800">
          A SINGLE REQUEST DURATION HIDES ALL OF THIS
        </text>
        <text x="600" y="514" textAnchor="middle" fill="#9fe8da" fontSize="12">
          agent observability reconstructs the full tree — which model call, tool call, or sub-agent handoff caused the slow or wrong answer
        </text>

        <text x="1152" y="548" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default AgentObservabilityHeroDiagram;
