// Hero diagram for the "How to Become an AI Engineer" post. Pure inline SVG:
// prerenders to static markup, crawler-visible, zero runtime cost. A rising
// five-step path — Foundations -> Core ML/DL -> AI Engineering -> Build &
// Specialize -> Get Hired — over a reassurance band (no PhD, ~6-18 months) and a
// roadmap-PDF call to action. viewBox 1200x630 so it doubles as the OG image.
const BecomeAIEngineerHeroDiagram = () => {
  const steps = [
    { x: 40, y: 334, n: "1", t: "Foundations", s1: "Python · Git · CS", s2: "right-sized math", c: "#6FD6A8", b: "#6FD6A8" },
    { x: 270, y: 282, n: "2", t: "Core ML / DL", s1: "models · training", s2: "evaluation", c: "#6FD6A8", b: "#6FD6A8" },
    { x: 500, y: 230, n: "3", t: "AI Engineering", s1: "LLMs · RAG · agents", s2: "prompting · evals", c: "#7CC4F2", b: "#7CC4F2" },
    { x: 730, y: 178, n: "4", t: "Build & Specialize", s1: "projects · portfolio", s2: "a niche", c: "#7CC4F2", b: "#7CC4F2" },
    { x: 960, y: 126, n: "5", t: "Get Hired", s1: "role · resume", s2: "salary", c: "#C4A6F5", b: "#C4A6F5" },
  ];
  return (
    <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How to become an AI engineer — a rising five-step path: 1 Foundations (Python, Git, CS, right-sized math), 2 Core machine learning and deep learning, 3 AI engineering (LLMs, RAG, agents, prompting, evaluation), 4 Build and specialize with projects and a portfolio, 5 Get hired. No PhD required; roughly six to eighteen months of focused work; software-engineering and data backgrounds transition fastest. Download the free roadmap PDF."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="baeBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c0c0b" />
            <stop offset="55%" stopColor="#0d0d0c" />
            <stop offset="100%" stopColor="#131312" />
          </linearGradient>
          <linearGradient id="bacPath" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#6FD6A8" />
            <stop offset="50%" stopColor="#7CC4F2" />
            <stop offset="100%" stopColor="#C4A6F5" />
          </linearGradient>
          <marker id="baeArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#7CC4F2" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#baeBg)" />
        <g fill="#6FD6A8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#f5f5f4" fontSize="19" fontWeight="800" letterSpacing="1">
          HOW TO BECOME AN AI ENGINEER — THE PATH
        </text>

        {/* rising connector path through the step cards */}
        <path
          d="M 140 334 L 370 282 L 600 230 L 830 178 L 1060 126"
          stroke="url(#bacPath)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6"
        />

        {steps.map((s, i) => (
          <g key={s.n}>
            {i < steps.length - 1 && (
              <path
                d={`M ${s.x + 200} ${s.y + 24} L ${steps[i + 1].x} ${steps[i + 1].y + 94}`}
                stroke="#7CC4F2" strokeWidth="1.6" strokeDasharray="4 5" fill="none" opacity="0.5"
                markerEnd="url(#baeArrow)"
              />
            )}
            <rect x={s.x} y={s.y} width="200" height="118" rx="14" fill="#0e0d0c" stroke={s.b} strokeWidth="1.7" />
            <circle cx={s.x + 30} cy={s.y + 32} r="16" fill={s.b} />
            <text x={s.x + 30} y={s.y + 38} textAnchor="middle" fill="#0c0c0b" fontSize="16" fontWeight="800">{s.n}</text>
            <text x={s.x + 56} y={s.y + 38} fill={s.c} fontSize="15.5" fontWeight="800">{s.t}</text>
            <text x={s.x + 18} y={s.y + 72} fill="#c6c4bd" fontSize="12">{s.s1}</text>
            <text x={s.x + 18} y={s.y + 92} fill="#c6c4bd" fontSize="12">{s.s2}</text>
          </g>
        ))}

        {/* reassurance band */}
        <rect x="40" y="474" width="1120" height="54" rx="13" fill="#0c0c0b" stroke="#1d4d38" strokeWidth="1.3" />
        <text x="600" y="500" textAnchor="middle" fill="#6FD6A8" fontSize="13.5" fontWeight="700">
          No PhD required · ~6–18 months of focused work · SWE &amp; data backgrounds transition fastest
        </text>
        <text x="600" y="518" textAnchor="middle" fill="#6FD6A8" fontSize="12">
          the point isn't to learn everything — it's to learn the right things in the right order
        </text>

        {/* CTA strip */}
        <rect x="360" y="548" width="480" height="46" rx="23" fill="#0c0c0b" stroke="#2c7554" strokeWidth="1.8" />
        <text x="600" y="576" textAnchor="middle" fill="#6FD6A8" fontSize="14.5" fontWeight="800">
          ↓ Download the free AI Engineering Roadmap (PDF)
        </text>

        <text x="1152" y="614" textAnchor="end" fill="#646056" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default BecomeAIEngineerHeroDiagram;
