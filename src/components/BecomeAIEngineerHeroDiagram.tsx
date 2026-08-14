// Hero diagram for the "How to Become an AI Engineer" post. Pure inline SVG:
// prerenders to static markup, crawler-visible, zero runtime cost. A rising
// five-step path — Foundations -> Core ML/DL -> AI Engineering -> Build &
// Specialize -> Get Hired — over a reassurance band (no PhD, ~6-18 months) and a
// roadmap-PDF call to action. viewBox 1200x630 so it doubles as the OG image.
const BecomeAIEngineerHeroDiagram = () => {
  const steps = [
    { x: 24, y: 352, n: "1", t: "Foundations", s1: "Python · Git · CS", s2: "right-sized math", c: "#10b981", b: "#059669" },
    { x: 262, y: 300, n: "2", t: "Core ML / DL", s1: "models · training", s2: "evaluation", c: "#14b8a6", b: "#0d9488" },
    { x: 500, y: 248, n: "3", t: "AI Engineering", s1: "LLMs · RAG · agents", s2: "prompting · evals", c: "#22d3ee", b: "#0e7490" },
    { x: 738, y: 196, n: "4", t: "Build & Specialize", s1: "projects · portfolio", s2: "a niche", c: "#60a5fa", b: "#2563eb" },
    { x: 976, y: 144, n: "5", t: "Get Hired", s1: "role · resume", s2: "salary", c: "#a78bfa", b: "#4f46e5" },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#07120f]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How to become an AI engineer — a rising five-step path: 1 Foundations (Python, Git, CS, right-sized math), 2 Core machine learning and deep learning, 3 AI engineering (LLMs, RAG, agents, prompting, evaluation), 4 Build and specialize with projects and a portfolio, 5 Get hired. No PhD required; roughly six to eighteen months of focused work; software-engineering and data backgrounds transition fastest. Download the free roadmap PDF."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="baeBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#07120f" />
            <stop offset="55%" stopColor="#0a1a1e" />
            <stop offset="100%" stopColor="#0c1630" />
          </linearGradient>
          <linearGradient id="bacPath" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <marker id="baeArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#7dd3fc" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#baeBg)" />
        <g fill="#34d399" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#eafff6" fontSize="19" fontWeight="800" letterSpacing="1">
          HOW TO BECOME AN AI ENGINEER — THE PATH
        </text>

        {/* rising connector path through the step cards */}
        <path
          d="M 129 352 L 367 300 L 605 248 L 843 196 L 1081 144"
          stroke="url(#bacPath)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6"
        />

        {steps.map((s, i) => (
          <g key={s.n}>
            {i < steps.length - 1 && (
              <path
                d={`M ${s.x + 210} ${s.y + 24} L ${steps[i + 1].x} ${steps[i + 1].y + 94}`}
                stroke="#3b82f6" strokeWidth="1.6" strokeDasharray="4 5" fill="none" opacity="0.5"
                markerEnd="url(#baeArrow)"
              />
            )}
            <rect x={s.x} y={s.y} width="210" height="118" rx="14" fill="#0e1a1c" stroke={s.b} strokeWidth="1.7" />
            <circle cx={s.x + 30} cy={s.y + 32} r="16" fill={s.b} />
            <text x={s.x + 30} y={s.y + 38} textAnchor="middle" fill="#04120e" fontSize="16" fontWeight="800">{s.n}</text>
            <text x={s.x + 56} y={s.y + 38} fill={s.c} fontSize="15.5" fontWeight="800">{s.t}</text>
            <text x={s.x + 18} y={s.y + 72} fill="#b7c6cc" fontSize="12">{s.s1}</text>
            <text x={s.x + 18} y={s.y + 92} fill="#b7c6cc" fontSize="12">{s.s2}</text>
          </g>
        ))}

        {/* reassurance band */}
        <rect x="24" y="474" width="1152" height="54" rx="13" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="600" y="500" textAnchor="middle" fill="#5eead4" fontSize="13.5" fontWeight="700">
          No PhD required · ~6–18 months of focused work · SWE &amp; data backgrounds transition fastest
        </text>
        <text x="600" y="518" textAnchor="middle" fill="#9fe8da" fontSize="12">
          the point isn't to learn everything — it's to learn the right things in the right order
        </text>

        {/* CTA strip */}
        <rect x="360" y="548" width="480" height="46" rx="23" fill="#052018" stroke="#10b981" strokeWidth="1.8" />
        <text x="600" y="576" textAnchor="middle" fill="#6ee7b7" fontSize="14.5" fontWeight="800">
          ↓ Download the free AI Engineering Roadmap (PDF)
        </text>

        <text x="1152" y="614" textAnchor="end" fill="#4b6f63" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default BecomeAIEngineerHeroDiagram;
