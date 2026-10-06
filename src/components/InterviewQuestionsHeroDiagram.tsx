// Hero diagram for "AI Engineer Interview Questions". Pure inline SVG so it
// prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630). Shows the six rounds of a typical 2026 AI engineer
// interview loop as a connected pipeline, with what each round probes
// underneath, and a note on how the loop is weighted.
const InterviewQuestionsHeroDiagram = () => {
  const rounds = [
    { x: 40, t: "Recruiter", sub: "screen", probe: "role fit, projects,", probe2: "comp expectations", stroke: "#64748b", accent: "#cbd5e1" },
    { x: 230, t: "Coding", sub: "round", probe: "DSA + practical", probe2: "LLM glue code", stroke: "#2563eb", accent: "#93c5fd" },
    { x: 420, t: "ML", sub: "fundamentals", probe: "bias-variance, eval,", probe2: "optimizers, embeddings", stroke: "#0891b2", accent: "#67e8f9" },
    { x: 610, t: "LLM & GenAI", sub: "depth", probe: "RAG, agents, prompts,", probe2: "hallucination, cost", stroke: "#7c3aed", accent: "#c4b5fd" },
    { x: 800, t: "System", sub: "design", probe: "retrieval, eval,", probe2: "cost, safety", stroke: "#d97706", accent: "#fcd34d" },
    { x: 990, t: "Behavioral", sub: "& role fit", probe: "failures in prod,", probe2: "build vs API, learning", stroke: "#059669", accent: "#6ee7b7" },
  ];
  const cardW = 170;
  const cardY = 150;
  const cardH = 150;
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="The rounds of an AI engineer interview in 2026, shown as a left-to-right pipeline of six connected cards. Recruiter screen probes role fit, projects, and compensation expectations. Coding round covers data structures and algorithms plus practical LLM glue code. ML fundamentals covers bias-variance, evaluation, optimizers, and embeddings. LLM and GenAI depth covers RAG, agents, prompting, hallucination, and cost. System design covers retrieval, evaluation, cost, and safety. Behavioral and role fit covers handling failures in production, build versus API decisions, and how you keep learning. A note underneath says 2026 loops weight LLM, RAG, and agent depth and applied system design, not just DSA."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="iqBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#120f0b" />
            <stop offset="100%" stopColor="#1a1208" />
          </linearGradient>
          <marker id="iqArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#8a7050" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#iqBg)" />
        <g fill="#fbbf24" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#fff4e0" fontSize="19" fontWeight="800" letterSpacing="1">
          AI ENGINEER INTERVIEW: THE ROUNDS
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#fcd34d" fontSize="12.5">
          what each stage of a 2026 loop actually probes
        </text>

        {/* round cards */}
        {rounds.map((r, i) => (
          <g key={r.t}>
            <rect x={r.x} y={cardY} width={cardW} height={cardH} rx="10" fill="#0e1a24" stroke={r.stroke} strokeWidth="1.6" />
            <circle cx={r.x + 22} cy={cardY + 26} r="11" fill={r.stroke} opacity="0.9" />
            <text x={r.x + 22} y={cardY + 30} textAnchor="middle" fill="#0a0f14" fontSize="11" fontWeight="800">
              {i + 1}
            </text>
            <text x={r.x + 42} y={cardY + 24} fill="#eaf4fb" fontSize="14" fontWeight="700">{r.t}</text>
            <text x={r.x + 42} y={cardY + 40} fill={r.accent} fontSize="11">{r.sub}</text>
            <line x1={r.x + 16} y1={cardY + 58} x2={r.x + cardW - 16} y2={cardY + 58} stroke="#33506a" strokeWidth="1" />
            <text x={r.x + 16} y={cardY + 86} fill="#8fb8cc" fontSize="10.5">{r.probe}</text>
            <text x={r.x + 16} y={cardY + 104} fill="#8fb8cc" fontSize="10.5">{r.probe2}</text>
            {i < rounds.length - 1 && (
              <line
                x1={r.x + cardW}
                y1={cardY + cardH / 2}
                x2={rounds[i + 1].x - 2}
                y2={cardY + cardH / 2}
                stroke="#5b4a32"
                strokeWidth="1.6"
                markerEnd="url(#iqArrow)"
              />
            )}
          </g>
        ))}

        {/* weighting bar */}
        <text x="600" y="380" textAnchor="middle" fill="#eaf4fb" fontSize="15" fontWeight="700">
          Where the weight sits in a 2026 loop
        </text>
        <rect x="150" y="410" width="900" height="34" rx="8" fill="#0e1a24" stroke="#33506a" strokeWidth="1.4" />
        <rect x="150" y="410" width="200" height="34" rx="8" fill="#2563eb" opacity="0.25" />
        <rect x="350" y="410" width="400" height="34" fill="#7c3aed" opacity="0.25" />
        <rect x="750" y="410" width="300" height="34" rx="8" fill="#d97706" opacity="0.25" />
        <text x="250" y="433" textAnchor="middle" fill="#dbeafe" fontSize="12">DSA / coding</text>
        <text x="550" y="433" textAnchor="middle" fill="#e9ddff" fontSize="12">LLM, RAG &amp; agent depth</text>
        <text x="900" y="433" textAnchor="middle" fill="#fef3c7" fontSize="12">Applied AI system design</text>

        <text x="600" y="490" textAnchor="middle" fill="#8fb8cc" fontSize="11.5">
          2026 loops weight LLM/RAG/agent depth and applied system design, not just DSA.
        </text>
        <text x="600" y="512" textAnchor="middle" fill="#6b8699" fontSize="10.5">
          Exact round order and count vary by company — the probes above are what shows up almost everywhere.
        </text>
      </svg>
    </div>
  );
};

export default InterviewQuestionsHeroDiagram;
