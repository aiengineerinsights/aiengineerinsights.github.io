// Hero diagram for the agentic AI system design guide: a reference
// architecture. A request is routed either down a fixed workflow or into an
// agent loop; both reach the outside world only through tools, with write
// tools behind an approval gate. State, guardrails and traces sit underneath
// everything. Pure inline SVG so it prerenders to crawler-visible markup and
// doubles as the OG image (viewBox 1200x630).

const Box = ({ x, y, w, h, color, title, lines }: { x: number; y: number; w: number; h: number; color: string; title: string; lines: string[] }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="12" fill="#121b27" stroke={color} strokeWidth="1.8" />
    <text x={x + w / 2} y={y + 28} textAnchor="middle" fill={color} fontSize="15" fontWeight="800" letterSpacing="1">{title}</text>
    {lines.map((l, i) => (
      <text key={l} x={x + w / 2} y={y + 52 + i * 20} textAnchor="middle" fill="#d6e1ee" fontSize="13">{l}</text>
    ))}
  </g>
);

const Arrow = ({ d }: { d: string }) => <path d={d} fill="none" stroke="#7f93a8" strokeWidth="1.8" markerEnd="url(#asdArrow)" />;

const AgenticSystemDesignHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f16]">
    <svg
      viewBox="0 0 1200 630"
      role="img"
      fontFamily="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
      aria-label="Reference architecture for an agentic AI system. A request enters a router, which classifies it and picks a path. Known tasks go down a fixed workflow of predefined steps with checks between them. Open-ended tasks go into an agent loop that plans, acts and observes until a stop condition or a step limit. Both paths reach the outside world only through tools: read tools such as search and lookup run freely, while write tools such as refund, email or deploy sit behind an approval gate. Three layers sit under everything: state and memory, covering session state, checkpoints and long-term memory; guardrails and permissions, covering input checks, tool allowlists and spend limits; and traces and evals, covering every step logged, task success and cost per task. Design rule: use the simplest path that passes your evals."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="asdBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a0f16" />
          <stop offset="100%" stopColor="#111a24" />
        </linearGradient>
        <marker id="asdArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#7f93a8" />
        </marker>
      </defs>
      <rect width="1200" height="630" fill="url(#asdBg)" />

      <text x="600" y="44" textAnchor="middle" fill="#eef6ff" fontSize="25" fontWeight="800" letterSpacing="1">
        AGENTIC AI SYSTEM DESIGN
      </text>
      <text x="600" y="68" textAnchor="middle" fill="#9fb3c8" fontSize="14">
        a reference architecture: route, then a workflow or an agent loop, all through tools
      </text>

      <Box x={40} y={190} w={150} h={96} color="#9fb3c8" title="REQUEST" lines={["user or event", "with a task"]} />
      <Box x={236} y={190} w={170} h={96} color="#f97316" title="ROUTER" lines={["classify the task", "pick the path"]} />

      <Box x={470} y={104} w={300} h={110} color="#5eb8c8" title="WORKFLOW" lines={["fixed steps in code", "a check between steps", "for tasks you can predict"]} />
      <Box x={470} y={262} w={300} h={110} color="#8b9cf0" title="AGENT LOOP" lines={["plan → act → observe", "stops on a condition or step limit", "for tasks you cannot predict"]} />

      <Box x={840} y={104} w={320} h={110} color="#86c98f" title="READ TOOLS" lines={["search, lookup, fetch", "safe to retry", "run without asking"]} />
      <Box x={840} y={262} w={320} h={110} color="#f59e0b" title="WRITE TOOLS" lines={["refund, email, deploy", "idempotent, behind an approval gate", "a person signs off"]} />

      <Arrow d="M190 238 H232" />
      <Arrow d="M406 222 C440 222 436 160 466 160" />
      <Arrow d="M406 254 C440 254 436 316 466 316" />
      <Arrow d="M770 160 H836" />
      <Arrow d="M770 316 H836" />
      <Arrow d="M770 180 C806 180 800 296 836 296" />
      <Arrow d="M770 296 C806 296 800 180 836 180" />

      <rect x="40" y="410" width="1120" height="118" rx="12" fill="#0e1620" stroke="#263241" strokeWidth="1.2" />
      {[
        { x: 60, color: "#c4a6f5", title: "STATE AND MEMORY", lines: ["session state · checkpoints", "long-term memory"] },
        { x: 430, color: "#ff8f73", title: "GUARDRAILS AND PERMISSIONS", lines: ["input checks · tool allowlists", "spend and step limits"] },
        { x: 800, color: "#7cc4f2", title: "TRACES AND EVALS", lines: ["every step logged", "task success · cost per task"] },
      ].map((b) => (
        <g key={b.title}>
          <rect x={b.x} y="426" width="340" height="86" rx="10" fill="#121b27" stroke={b.color} strokeWidth="1.5" />
          <text x={b.x + 170} y="452" textAnchor="middle" fill={b.color} fontSize="13.5" fontWeight="800" letterSpacing="1">{b.title}</text>
          {b.lines.map((l, i) => (
            <text key={l} x={b.x + 170} y={474 + i * 19} textAnchor="middle" fill="#d6e1ee" fontSize="13">{l}</text>
          ))}
        </g>
      ))}

      <rect x="300" y="546" width="600" height="36" rx="10" fill="#1f1a10" stroke="#f59e0b" strokeWidth="1.4" />
      <text x="600" y="569" textAnchor="middle" fill="#fde68a" fontSize="15" fontWeight="700">
        design rule: the simplest path that passes your evals
      </text>

      <text x="600" y="612" textAnchor="middle" fill="#64748b" fontSize="11.5">
        aiengineerinsights.com · our reference architecture, building on Anthropic's "Building effective agents"
      </text>
    </svg>
  </div>
);

export default AgenticSystemDesignHeroDiagram;
