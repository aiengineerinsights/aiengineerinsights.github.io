// Hero diagram for the "AI Engineer Skills" post. Pure inline SVG: prerenders to
// static markup, crawler-visible, zero runtime cost. A five-layer skill stack
// (software engineering base -> ML/DL -> the highlighted 2026 LLM/GenAI core ->
// MLOps -> judgment) with a "right-sized math" support rail. viewBox 1200x630 so
// it doubles as the OG image.
const AIEngineerSkillsHeroDiagram = () => {
  const layers = [
    { y: 86, t: "Judgment & Communication", s: "problem framing · product sense · clear writing", c: "#93c5fd", b: "#3b82f6", hi: false },
    { y: 162, t: "MLOps & Deployment", s: "serving · monitoring · cost & latency · CI/CD", c: "#a5b4fc", b: "#6366f1", hi: false },
    { y: 238, t: "LLM & GenAI  ·  the 2026 core", s: "prompting · RAG · agents · tool use · vector DBs · evals", c: "#67e8f9", b: "#06b6d4", hi: true },
    { y: 314, t: "ML / DL Foundations", s: "training · evaluation · embeddings · transformers", c: "#a5b4fc", b: "#6366f1", hi: false },
    { y: 390, t: "Software Engineering (base)", s: "Python · Git · APIs · testing · system design", c: "#93c5fd", b: "#3b82f6", hi: false },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#080d1c]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="The AI engineer skill stack for 2026, as five layers on a software-engineering base: software engineering (Python, Git, APIs, testing, system design), then ML/DL foundations, then the highlighted 2026 core of LLM and GenAI skills (prompting, RAG, agents, tool use, vector databases, evaluation), then MLOps and deployment, then judgment and communication at the top — with right-sized math as a support rail. Working competence across the stack beats mastery of any single layer."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="skBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#080d1c" />
            <stop offset="60%" stopColor="#0c1230" />
            <stop offset="100%" stopColor="#131038" />
          </linearGradient>
          <linearGradient id="skHi" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0e7490" />
            <stop offset="100%" stopColor="#155e75" />
          </linearGradient>
        </defs>

        <rect width="1200" height="630" fill="url(#skBg)" />
        <g fill="#818cf8" opacity="0.06">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#e8ecff" fontSize="19" fontWeight="800" letterSpacing="1">
          THE AI ENGINEER SKILL STACK — 2026
        </text>

        {/* right-sized math support rail */}
        <rect x="1096" y="86" width="56" height="380" rx="12" fill="#141a33" stroke="#334155" strokeWidth="1.3" />
        <text x="1124" y="276" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="700" transform="rotate(90 1124 276)">
          right-sized math (support)
        </text>

        {layers.map((l) => (
          <g key={l.t}>
            <rect
              x="48" y={l.y} width="1030" height="64" rx="13"
              fill={l.hi ? "#08222b" : "#111634"}
              stroke={l.b} strokeWidth={l.hi ? 2.4 : 1.5}
            />
            <text x="72" y={l.y + 28} fill={l.c} fontSize="16.5" fontWeight="800">{l.t}</text>
            <text x="72" y={l.y + 49} fill="#aeb8d4" fontSize="12.5">{l.s}</text>
            {l.hi && (
              <g>
                <rect x="946" y={l.y + 16} width="118" height="32" rx="16" fill="#062a33" stroke="#22d3ee" strokeWidth="1.4" />
                <text x="1005" y={l.y + 37} textAnchor="middle" fill="#67e8f9" fontSize="12.5" fontWeight="800">what defines it</text>
              </g>
            )}
          </g>
        ))}

        {/* takeaway band */}
        <rect x="48" y="480" width="1104" height="56" rx="13" fill="#0d1330" stroke="#4338ca" strokeWidth="1.3" />
        <text x="600" y="506" textAnchor="middle" fill="#a5b4fc" fontSize="13.5" fontWeight="700">
          Working competence across the stack beats mastery of any one layer
        </text>
        <text x="600" y="524" textAnchor="middle" fill="#8b95c9" fontSize="12">
          the LLM &amp; GenAI layer is what turns a software engineer into an AI engineer
        </text>

        <text x="1152" y="566" textAnchor="end" fill="#5b5f8e" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default AIEngineerSkillsHeroDiagram;
