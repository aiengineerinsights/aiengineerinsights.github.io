// Hero for the CCAR-F (also written CCA-F) "traps" post: the exam's distractors are engineered to
// sound like best-practice engineering. This contrasts the answer that SOUNDS
// right with the one that IS right. Pure inline SVG — prerenders statically.
const CCATrapsHeroDiagram = () => {
  const pairs = [
    { sounds: "Strengthen the system prompt to enforce the rule", right: "Enforce it in code — a PreToolUse hook. Prompts are probabilistic." },
    { sounds: "Add a multi-agent orchestration layer", right: "Fix the tool description / config first. Favor the simplest architecture." },
    { sounds: "One capable agent with 15+ general tools", right: "4–5 focused tools per agent; delegate the overflow." },
    { sounds: 'Loop until the model says "I\'m done"', right: 'Branch on stop_reason: tool_use → continue, end_turn → stop.' },
  ];
  return (
    <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
      <svg
        viewBox="0 0 1200 560"
        role="img"
        aria-label="On the Claude Certified Architect exam the wrong answers are designed to sound like best-practice engineering. Examples: strengthening the system prompt sounds right, but rule enforcement belongs in code via a PreToolUse hook; adding a multi-agent layer sounds right, but fixing the tool description first is simpler; one agent with 15+ tools sounds capable, but 4-5 focused tools per agent is correct; looping until the model says 'I'm done' sounds fine, but you must branch on stop_reason."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="ctBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c0c0b" /><stop offset="55%" stopColor="#0c0c0b" /><stop offset="100%" stopColor="#11110f" />
          </linearGradient>
          <marker id="ctArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#6FD6A8" />
          </marker>
        </defs>
        <rect width="1200" height="560" fill="url(#ctBg)" />
        <g fill="#FF8F73" opacity="0.05">
          {Array.from({ length: 12 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={30 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="48" textAnchor="middle" fill="#FF8F73" fontSize="15" fontWeight="800" letterSpacing="1.5">
          THE WRONG ANSWER IS DESIGNED TO SOUND LIKE GOOD ENGINEERING
        </text>
        <text x="330" y="86" textAnchor="middle" fill="#FF8F73" fontSize="13" fontWeight="700">SOUNDS RIGHT (the trap)</text>
        <text x="880" y="86" textAnchor="middle" fill="#6FD6A8" fontSize="13" fontWeight="700">IS RIGHT (the principle)</text>

        {pairs.map((p, i) => {
          const y = 108 + i * 104;
          return (
            <g key={i}>
              <rect x="40" y={y} width="540" height="84" rx="12" fill="#0e0e0d" stroke="#623125" strokeWidth="1.3" />
              <foreignObject x="58" y={y + 12} width="504" height="64">
                <div style={{ color: "#e7e6e4", fontSize: "14.5px", lineHeight: "1.35", fontFamily: "sans-serif" }}>
                  {p.sounds}
                </div>
              </foreignObject>
              <path d={`M 584 ${y + 42} L 616 ${y + 42}`} stroke="#6FD6A8" strokeWidth="2.4" markerEnd="url(#ctArrow)" />
              <rect x="620" y={y} width="540" height="84" rx="12" fill="#121211" stroke="#296b4e" strokeWidth="1.3" />
              <foreignObject x="638" y={y + 12} width="504" height="64">
                <div style={{ color: "#dcdad6", fontSize: "14.5px", lineHeight: "1.35", fontFamily: "sans-serif" }}>
                  {p.right}
                </div>
              </foreignObject>
            </g>
          );
        })}

        <text x="600" y="544" textAnchor="middle" fill="#969287" fontSize="12">
          Passing the CCAR-F is spotting where probabilistic prompts get confused with deterministic code — and where complexity masquerades as rigor.
        </text>
      </svg>
    </div>
  );
};

export default CCATrapsHeroDiagram;
