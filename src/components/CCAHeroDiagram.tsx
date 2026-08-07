// Hero diagram for the Claude Certified Architect (CCAR-F) exam post: the five
// exam domains as a horizontal weighted bar chart (27/20/20/18/15) with a
// pass-mark strip showing the 720/1000 scaled passing score.
// Pure inline SVG — prerenders statically, crawler-visible, zero JS.
const CCAHeroDiagram = () => {
  const domains = [
    { name: "Agentic Architecture & Orchestration", weight: 27, note: "loops, stop_reason, subagents" },
    { name: "Claude Code Configuration & Workflows", weight: 20, note: "CLAUDE.md, skills, CI/CD" },
    { name: "Prompt Engineering & Structured Output", weight: 20, note: "success criteria, JSON, retries" },
    { name: "Tool Design & MCP Integration", weight: 18, note: "tool descriptions, error contracts" },
    { name: "Context Management & Reliability", weight: 15, note: "rolling windows, provenance, escalation" },
  ];
  const barMax = 720; // px for a hypothetical 30%
  const barX = 60;

  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#100a1c]">
      <svg
        viewBox="0 0 1200 560"
        role="img"
        aria-label="The five Claude Certified Architect (CCAR-F) exam domains as a weighted bar chart: Agentic Architecture and Orchestration 27 percent, Claude Code Configuration and Workflows 20 percent, Prompt Engineering and Structured Output 20 percent, Tool Design and MCP Integration 18 percent, Context Management and Reliability 15 percent. Below, a score scale from 100 to 1000 with the passing mark at 720."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="ccaBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#100a1c" />
            <stop offset="60%" stopColor="#170f2a" />
            <stop offset="100%" stopColor="#241333" />
          </linearGradient>
          <linearGradient id="ccaBar1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#a855f7" /></linearGradient>
          <linearGradient id="ccaBar2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#6d28d9" /><stop offset="100%" stopColor="#9333ea" /></linearGradient>
          <linearGradient id="ccaPass" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#f97316" /><stop offset="100%" stopColor="#fb923c" /></linearGradient>
        </defs>

        <rect width="1200" height="560" fill="url(#ccaBg)" />
        <g fill="#c4b5fd" opacity="0.05">
          {Array.from({ length: 12 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={30 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#e9d5ff" fontSize="15" fontWeight="700" letterSpacing="2">
          CLAUDE CERTIFIED ARCHITECT (CCAR-F) — WHAT THE EXAM ACTUALLY WEIGHS
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#a78bfa" fontSize="12" fontStyle="italic">
          five domains, ~60 scenario-based questions, 120 minutes — agents + Claude Code are nearly half the exam
        </text>

        {domains.map((d, i) => {
          const y = 100 + i * 68;
          const w = (d.weight / 30) * barMax;
          return (
            <g key={d.name}>
              <text x={barX} y={y} fill="#f5f3ff" fontSize="14.5" fontWeight="700">
                {d.name}
              </text>
              <text x={1140} y={y} textAnchor="end" fill="#8b7bb8" fontSize="12" fontStyle="italic">
                {d.note}
              </text>
              <rect x={barX} y={y + 10} width="1080" height="26" rx="6" fill="#1e1533" />
              <rect x={barX} y={y + 10} width={w} height="26" rx="6" fill={i === 0 ? "url(#ccaBar1)" : "url(#ccaBar2)"} opacity={1 - i * 0.08} />
              <text x={barX + w + 12} y={y + 28} fill={i === 0 ? "#fdba74" : "#d8b4fe"} fontSize="15" fontWeight="800">
                {d.weight}%
              </text>
            </g>
          );
        })}

        {/* Pass-mark strip: scaled score 100–1000, pass = 720 */}
        <g>
          <text x={barX} y="462" fill="#e9d5ff" fontSize="13" fontWeight="700" letterSpacing="1">
            SCALED SCORE
          </text>
          <rect x={barX} y="474" width="1080" height="14" rx="7" fill="#1e1533" />
          <rect x={barX} y="474" width={((720 - 100) / 900) * 1080} height="14" rx="7" fill="url(#ccaPass)" opacity="0.85" />
          <text x={barX} y="514" fill="#8b7bb8" fontSize="12">100</text>
          <text x={barX + 1080} y="514" textAnchor="end" fill="#8b7bb8" fontSize="12">1000</text>
          <line
            x1={barX + ((720 - 100) / 900) * 1080}
            y1="466"
            x2={barX + ((720 - 100) / 900) * 1080}
            y2="496"
            stroke="#fb923c"
            strokeWidth="3"
          />
          <text x={barX + ((720 - 100) / 900) * 1080 + 10} y="512" fill="#fdba74" fontSize="14" fontWeight="800">
            PASS = 720
          </text>
        </g>

        <text x="600" y="546" textAnchor="middle" fill="#6b5c94" fontSize="11.5">
          Anthropic's first technical certification · launched March 2026 · delivered by Pearson VUE · closed-book
        </text>
      </svg>
    </div>
  );
};

export default CCAHeroDiagram;
