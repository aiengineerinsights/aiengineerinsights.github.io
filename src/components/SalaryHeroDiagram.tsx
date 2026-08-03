// Hero diagram for the AI engineer salary post: a salary ladder showing
// big-tech median total compensation by level (Levels.fyi, 2026), with the
// broad-market Glassdoor average base marked as a reference line.
// Pure inline SVG — prerenders statically, crawler-visible, zero JS.

const bars = [
  { label: "Entry", sub: "Google L3", value: 199, display: "$199K" },
  { label: "Mid-level", sub: "Google median", value: 302, display: "$302K" },
  { label: "Senior", sub: "Meta median", value: 457, display: "$457K" },
  { label: "Staff", sub: "Google L7", value: 743, display: "$743K" },
  { label: "Frontier lab", sub: "OpenAI median", value: 860, display: "$860K" },
];

const MAX = 860;
const PLOT_H = 300;
const BASE_Y = 452;
const BAR_W = 130;
const centers = [170, 385, 600, 815, 1030];

const SalaryHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0714]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="AI engineer pay ladder, 2026, US big tech, median total compensation per Levels.fyi: entry level around $199K (Google L3 machine learning engineer), mid-level around $302K (Google median), senior around $457K (Meta median), staff around $743K (Google L7), and frontier labs around $860K median (OpenAI software engineer). A dashed reference line marks the Glassdoor broad-market US average base salary of about $144K."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="salBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a0714" /><stop offset="55%" stopColor="#120b26" /><stop offset="100%" stopColor="#0c1a1a" />
        </linearGradient>
        <linearGradient id="salBarPurple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>
        <linearGradient id="salBarGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" /><stop offset="100%" stopColor="#065f46" />
        </linearGradient>
      </defs>

      <rect width="1200" height="560" fill="url(#salBg)" />
      <g fill="#a78bfa" opacity="0.06">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={30 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="48" textAnchor="middle" fill="#c4b5fd" fontSize="15" fontWeight="700" letterSpacing="2">
        THE AI ENGINEER PAY LADDER — US MEDIAN TOTAL COMP BY LEVEL (LEVELS.FYI, 2026)
      </text>

      {/* Baseline */}
      <line x1="70" y1={BASE_Y} x2="1130" y2={BASE_Y} stroke="#4c1d95" strokeWidth="1.5" />

      {/* Bars */}
      {bars.map((b, i) => {
        const h = (b.value / MAX) * PLOT_H;
        const x = centers[i] - BAR_W / 2;
        const y = BASE_Y - h;
        const isFrontier = i === bars.length - 1;
        return (
          <g key={b.label}>
            <rect
              x={x}
              y={y}
              width={BAR_W}
              height={h}
              rx="8"
              fill={isFrontier ? "url(#salBarGreen)" : "url(#salBarPurple)"}
              stroke={isFrontier ? "#34d399" : "#a78bfa"}
              strokeWidth="1.2"
            />
            <text x={centers[i]} y={y - 14} textAnchor="middle" fill={isFrontier ? "#6ee7b7" : "#ddd6fe"} fontSize="20" fontWeight="800">
              {b.display}
            </text>
            <text x={centers[i]} y={BASE_Y + 26} textAnchor="middle" fill="#e9d5ff" fontSize="14" fontWeight="700">
              {b.label}
            </text>
            <text x={centers[i]} y={BASE_Y + 46} textAnchor="middle" fill="#8b7bb8" fontSize="11.5" fontStyle="italic">
              {b.sub}
            </text>
          </g>
        );
      })}

      {/* Glassdoor broad-market reference line: $144K */}
      <line
        x1="70"
        y1={BASE_Y - (144 / MAX) * PLOT_H}
        x2="1130"
        y2={BASE_Y - (144 / MAX) * PLOT_H}
        stroke="#34d399"
        strokeWidth="1.4"
        strokeDasharray="7 6"
        opacity="0.75"
      />
      <text x="78" y={BASE_Y - (144 / MAX) * PLOT_H - 8} fill="#6ee7b7" fontSize="12.5" fontWeight="600">
        Glassdoor US average base: $144K (all employers, not just big tech)
      </text>

      <text x="600" y="532" textAnchor="middle" fill="#64748b" fontSize="11.5">
        Total compensation = base + stock + bonus. Sources: Levels.fyi company pages and Glassdoor, 2026. Point-in-time, self-reported data.
      </text>
    </svg>
  </div>
);

export default SalaryHeroDiagram;
