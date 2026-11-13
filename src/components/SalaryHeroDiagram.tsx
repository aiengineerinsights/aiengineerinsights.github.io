// Hero diagram for the AI engineer salary post: a salary ladder showing
// big-tech median total compensation by level (Levels.fyi, Nov 2026), with the
// broad-market Glassdoor median total pay marked as a reference line.
// Pure inline SVG — prerenders statically, crawler-visible, zero JS.

const bars = [
  { label: "Entry", sub: "Google L3 ML engineer", value: 208, display: "$208K" },
  { label: "Mid-level", sub: "Google L4 ML engineer", value: 312, display: "$312K" },
  { label: "Senior", sub: "Meta E5 ML engineer", value: 457, display: "$457K" },
  { label: "Staff", sub: "Meta E6 ML engineer", value: 809, display: "$809K" },
  { label: "Frontier lab", sub: "Anthropic SWE median", value: 883, display: "$883K" },
];

const MAX = 883;
const PLOT_H = 300;
const BASE_Y = 452;
const BAR_W = 130;
const centers = [170, 385, 600, 815, 1030];

const SalaryHeroDiagram = () => (
  <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="AI engineer pay ladder, November 2026, US median total compensation per Levels.fyi: entry level about $208K (Google L3 machine learning engineer), mid-level about $312K (Google L4), senior about $457K (Meta E5), staff about $809K (Meta E6), and frontier labs about $883K (Anthropic software engineer median). A dashed reference line marks Glassdoor's broad-market US median total pay of about $169K."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="salBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0c0b" /><stop offset="55%" stopColor="#10100f" /><stop offset="100%" stopColor="#0c0c0b" />
        </linearGradient>
        <linearGradient id="salBarPurple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C4A6F5" /><stop offset="100%" stopColor="#4d2f7d" />
        </linearGradient>
        <linearGradient id="salBarGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6FD6A8" /><stop offset="100%" stopColor="#1c4a35" />
        </linearGradient>
      </defs>

      <rect width="1200" height="560" fill="url(#salBg)" />
      <g fill="#C4A6F5" opacity="0.06">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={30 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="48" textAnchor="middle" fill="#dcdad6" fontSize="15" fontWeight="700" letterSpacing="2">
        THE AI ENGINEER PAY LADDER — US MEDIAN TOTAL COMP BY LEVEL (LEVELS.FYI, NOV 2026)
      </text>

      {/* Baseline */}
      <line x1="70" y1={BASE_Y} x2="1130" y2={BASE_Y} stroke="#3f2767" strokeWidth="1.5" />

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
              stroke={isFrontier ? "#6FD6A8" : "#C4A6F5"}
              strokeWidth="1.2"
            />
            <text x={centers[i]} y={y - 14} textAnchor="middle" fill={isFrontier ? "#6FD6A8" : "#ebebe9"} fontSize="20" fontWeight="800">
              {b.display}
            </text>
            <text x={centers[i]} y={BASE_Y + 26} textAnchor="middle" fill="#ebebe9" fontSize="14" fontWeight="700">
              {b.label}
            </text>
            <text x={centers[i]} y={BASE_Y + 46} textAnchor="middle" fill="#a19d92" fontSize="11.5" fontStyle="italic">
              {b.sub}
            </text>
          </g>
        );
      })}

      {/* Glassdoor broad-market reference line: $169K */}
      <line
        x1="70"
        y1={BASE_Y - (169 / MAX) * PLOT_H}
        x2="1130"
        y2={BASE_Y - (169 / MAX) * PLOT_H}
        stroke="#6FD6A8"
        strokeWidth="1.4"
        strokeDasharray="7 6"
        opacity="0.75"
      />
      {/* legend for the reference line, parked in the empty top-left of the plot */}
      <line x1="78" y1="112" x2="126" y2="112" stroke="#6FD6A8" strokeWidth="1.4" strokeDasharray="7 6" opacity="0.75" />
      <text x="138" y="116" fill="#6FD6A8" fontSize="12.5" fontWeight="600">
        Glassdoor US median total pay: $169K (all employers, not just big tech)
      </text>

      <text x="600" y="532" textAnchor="middle" fill="#807c6f" fontSize="11.5">
        Total compensation = base + stock + bonus. Sources: Levels.fyi company pages and Glassdoor, November 2026. Point-in-time, self-reported data.
      </text>
    </svg>
  </div>
);

export default SalaryHeroDiagram;
