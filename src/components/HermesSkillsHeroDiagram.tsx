// Hero diagram for the "Hermes Agent Skills" how-to. Pure inline SVG:
// prerenders to static markup, zero runtime cost, crawler-visible. Shows the
// self-improving skills loop: solve a task, a background review distills a
// SKILL.md into ~/.hermes/skills/, and the skill is reused next time.
const HermesSkillsHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0b0714]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="How Hermes Agent skills self-improve: the agent completes a task, a background self-improvement review runs after the turn, it distills a reusable SKILL.md into ~/.hermes/skills/, and the skill is reused next time to short-circuit the exploration phase — solve, distill, reuse. When write_approval is enabled, every skill write is staged for your review instead of being committed automatically."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="hsBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b0714" />
          <stop offset="55%" stopColor="#120a26" />
          <stop offset="100%" stopColor="#1a0f33" />
        </linearGradient>
        <linearGradient id="hsCore" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <marker id="hsArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#a78bfa" />
        </marker>
      </defs>

      <rect width="1200" height="560" fill="url(#hsBg)" />
      <g fill="#a78bfa" opacity="0.07">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={26 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="46" textAnchor="middle" fill="#e9e4f8" fontSize="18" fontWeight="800" letterSpacing="1">
        SOLVE · DISTILL · REUSE — SKILLS THAT SELF-IMPROVE
      </text>

      {/* Step 1: solve */}
      <g>
        <rect x="70" y="118" width="280" height="96" rx="16" fill="#150e2b" stroke="#6d28d9" strokeWidth="1.6" />
        <circle cx="104" cy="150" r="15" fill="#4c1d95" stroke="#a78bfa" strokeWidth="1.4" />
        <text x="104" y="155" textAnchor="middle" fill="#f5f3ff" fontSize="15" fontWeight="800">1</text>
        <text x="130" y="150" fill="#f5f3ff" fontSize="16" fontWeight="700">Solve a task</text>
        <text x="94" y="182" fill="#b9aede" fontSize="12.5">agent plans, calls tools,</text>
        <text x="94" y="201" fill="#b9aede" fontSize="12.5">explores, completes the turn</text>
      </g>

      {/* Step 2: distill (background review) */}
      <g>
        <rect x="460" y="118" width="280" height="96" rx="16" fill="#150e2b" stroke="#6d28d9" strokeWidth="1.6" />
        <circle cx="494" cy="150" r="15" fill="#4c1d95" stroke="#a78bfa" strokeWidth="1.4" />
        <text x="494" y="155" textAnchor="middle" fill="#f5f3ff" fontSize="15" fontWeight="800">2</text>
        <text x="520" y="150" fill="#f5f3ff" fontSize="16" fontWeight="700">Distill a skill</text>
        <text x="484" y="182" fill="#b9aede" fontSize="12.5">background self-improvement</text>
        <text x="484" y="201" fill="#b9aede" fontSize="12.5">review runs after the turn</text>
      </g>

      {/* Step 3: reuse */}
      <g>
        <rect x="850" y="118" width="280" height="96" rx="16" fill="#150e2b" stroke="#6d28d9" strokeWidth="1.6" />
        <circle cx="884" cy="150" r="15" fill="#4c1d95" stroke="#a78bfa" strokeWidth="1.4" />
        <text x="884" y="155" textAnchor="middle" fill="#f5f3ff" fontSize="15" fontWeight="800">3</text>
        <text x="910" y="150" fill="#f5f3ff" fontSize="16" fontWeight="700">Reuse next time</text>
        <text x="874" y="182" fill="#b9aede" fontSize="12.5">skill short-circuits the</text>
        <text x="874" y="201" fill="#b9aede" fontSize="12.5">exploration — faster, cheaper</text>
      </g>

      {/* Arrows between steps */}
      <path d="M 350 166 L 456 166" stroke="#a78bfa" strokeWidth="2.2" markerEnd="url(#hsArrow)" />
      <path d="M 740 166 L 846 166" stroke="#a78bfa" strokeWidth="2.2" markerEnd="url(#hsArrow)" />

      {/* SKILL.md store in the middle */}
      <ellipse cx="600" cy="360" rx="230" ry="96" fill="#7c3aed" opacity="0.12" />
      <rect x="410" y="292" width="380" height="136" rx="18" fill="#150e2b" stroke="url(#hsCore)" strokeWidth="2.4" />
      <text x="600" y="328" textAnchor="middle" fill="#f5f3ff" fontSize="18" fontWeight="800">SKILL.md</text>
      <text x="600" y="354" textAnchor="middle" fill="#cabff0" fontSize="13" fontFamily="monospace">YAML frontmatter + procedure</text>
      <text x="600" y="380" textAnchor="middle" fill="#cabff0" fontSize="13" fontFamily="monospace">~/.hermes/skills/</text>
      <text x="600" y="408" textAnchor="middle" fill="#8b7fb8" fontSize="12" fontStyle="italic">versioned procedural memory</text>

      {/* Write down into store, read back up */}
      <path d="M 600 214 L 600 288" stroke="#a78bfa" strokeWidth="2.2" markerEnd="url(#hsArrow)" />
      <text x="618" y="256" fill="#c4b5fd" fontSize="12" fontFamily="monospace">write</text>
      <path d="M 780 360 C 900 360, 990 300, 990 218" stroke="#a78bfa" strokeWidth="2.2" fill="none" markerEnd="url(#hsArrow)" />
      <text x="960" y="292" fill="#c4b5fd" fontSize="12" fontFamily="monospace">reuse</text>

      {/* write_approval gate */}
      <rect x="150" y="470" width="900" height="46" rx="12" fill="#171226" stroke="#6d28d9" strokeWidth="1.3" />
      <text x="600" y="498" textAnchor="middle" fill="#cabff0" fontSize="13">
        write_approval enabled → every skill_manage write is STAGED for your review, not committed automatically
      </text>

      <text x="1152" y="548" textAnchor="end" fill="#6d5f9e" fontSize="11">
        aiengineerinsights.com
      </text>
    </svg>
  </div>
);

export default HermesSkillsHeroDiagram;
