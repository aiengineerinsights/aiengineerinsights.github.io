// Hero diagram for the AI architect reading map: a three-circle Venn of
// Fundamentals of Software Architecture (2e), Software Architecture: The Hard
// Parts, and AI Engineering, showing what each book alone covers, what two
// share, the four ideas in all three, and what none of them teach.
// Pure inline SVG so it prerenders to crawler-visible markup and doubles as the
// OG image (viewBox 1200x630).

const F = { cx: 500, cy: 262, color: "#5eb8c8" }; // Fundamentals
const H = { cx: 700, cy: 262, color: "#e0935f" }; // The Hard Parts
const A = { cx: 600, cy: 412, color: "#8b9cf0" }; // AI Engineering
const R = 180;

const lines = (x: number, y: number, items: string[], opts: { size?: number; gap?: number; fill?: string; weight?: number } = {}) =>
  items.map((t, i) => (
    <text key={t} x={x} y={y + i * (opts.gap ?? 19)} textAnchor="middle" fill={opts.fill ?? "#dbe7f3"} fontSize={opts.size ?? 12.5} fontWeight={opts.weight ?? 500}>
      {t}
    </text>
  ));

const BookMapHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f16]">
    <svg
      viewBox="0 0 1200 630"
      role="img"
      fontFamily="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
      aria-label="Venn diagram of three books for AI architects. Fundamentals of Software Architecture, second edition, alone covers architecture characteristics, cohesion and coupling metrics, nine architecture styles, choosing a style, and risk storming and leadership. Software Architecture: The Hard Parts alone covers granularity drivers, decomposing monoliths, pulling apart data, eight saga patterns and data mesh. AI Engineering by Chip Huyen alone covers foundation models and evals, prompting, RAG and agents, finetuning and datasets, inference optimization, and guardrails, routers and feedback. Both architecture books share ADRs, stamp coupling and the architecture quantum. Fundamentals and AI Engineering share observability, latency and cost as characteristics, the layered AI stack, and evolving in small steps. The Hard Parts and AI Engineering share dataset ownership, exact and semantic caching, the shared model gateway and the data flywheel. All three share four ideas: every choice is a trade-off, fitness functions are roughly evals, orchestrated workflows, and schemas as contracts. Beyond all three: MCP and agent protocols, durable long-running agents, AI governance, GPU capacity and FinOps, on-call for probabilistic systems, and AI product sense."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="bmBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a0f16" />
          <stop offset="100%" stopColor="#111a24" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bmBg)" />

      <text x="600" y="40" textAnchor="middle" fill="#eef6ff" fontSize="23" fontWeight="800" letterSpacing="1">
        THE AI ARCHITECT'S READING MAP
      </text>
      <text x="600" y="62" textAnchor="middle" fill="#9fb3c8" fontSize="13">
        three books · what overlaps · what none of them teach
      </text>

      {[F, H, A].map((c) => (
        <circle key={c.color} cx={c.cx} cy={c.cy} r={R} fill={c.color} fillOpacity="0.09" stroke={c.color} strokeWidth="2" />
      ))}

      {/* Book labels */}
      <text x="60" y="118" fill={F.color} fontSize="21" fontWeight="800">Fundamentals</text>
      <text x="60" y="140" fill="#9fb3c8" fontSize="12" letterSpacing="1.2">RICHARDS &amp; FORD · 2E</text>
      <text x="1140" y="118" textAnchor="end" fill={H.color} fontSize="21" fontWeight="800">The Hard Parts</text>
      <text x="1140" y="140" textAnchor="end" fill="#9fb3c8" fontSize="12" letterSpacing="1.2">FORD · RICHARDS · SADALAGE · DEHGHANI</text>
      <text x="60" y="500" fill={A.color} fontSize="21" fontWeight="800">AI Engineering</text>
      <text x="60" y="522" fill="#9fb3c8" fontSize="12" letterSpacing="1.2">CHIP HUYEN</text>

      {/* Each book alone */}
      {lines(408, 196, ["Architecture characteristics", "Cohesion · coupling metrics", "Nine architecture styles", "Choosing a style", "Risk storming · leadership"])}
      {lines(792, 196, ["Granularity drivers", "Decomposing monoliths", "Pulling apart data", "Eight saga patterns", "Data mesh"])}
      {lines(600, 478, ["Foundation models · evals", "Prompting · RAG · agents", "Finetuning · datasets", "Inference optimization", "Guardrails · routers · feedback"])}

      {/* Two-book overlaps */}
      <text x="600" y="128" textAnchor="middle" fill="#c4b5fd" fontSize="10.5" fontWeight="700" letterSpacing="1.4">ARCH BOOKS</text>
      {lines(600, 148, ["ADRs", "Stamp coupling", "Architecture quantum"], { size: 12, gap: 18 })}
      {lines(488, 368, ["Observability", "Latency · cost -ilities", "Layered AI stack", "Evolve in small steps"], { size: 12, gap: 18 })}
      {lines(712, 368, ["Dataset ownership", "Exact · semantic cache", "Shared model gateway", "Data flywheel"], { size: 12, gap: 18 })}

      {/* All three */}
      <text x="600" y="252" textAnchor="middle" fill="#c4b5fd" fontSize="10.5" fontWeight="700" letterSpacing="1.4">ALL THREE</text>
      {lines(600, 272, ["Every choice a trade-off", "Fitness functions ≈ evals", "Orchestrated workflows", "Schemas as contracts"], { size: 12.5, gap: 18, fill: "#ffffff", weight: 800 })}

      {/* Beyond all three */}
      <rect x="884" y="418" width="262" height="168" rx="12" fill="#101a14" stroke="#86c98f" strokeWidth="1.4" />
      <text x="1015" y="442" textAnchor="middle" fill="#86c98f" fontSize="11" fontWeight="700" letterSpacing="1.4">BEYOND ALL THREE</text>
      {lines(1015, 464, ["MCP · agent protocols", "Durable, long-running agents", "AI governance · EU AI Act", "GPU capacity · FinOps", "On-call for probabilistic systems", "AI product sense"], { size: 12, gap: 20, fill: "#b8e0bd" })}

      <text x="600" y="616" textAnchor="middle" fill="#55707f" fontSize="11.5">
        aiengineerinsights.com · mapping is ours, from the three books' tables of contents, Nov 2026
      </text>
    </svg>
  </div>
);

export default BookMapHeroDiagram;
