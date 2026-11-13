// Hero diagram for the MLOps best-practices post: an impact-tiered stack of
// the practice categories. Pure inline SVG — prerenders statically, crawler-
// visible, zero JS.
const MLOpsHeroDiagram = () => (
  <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="MLOps best practices ordered by impact: a foundation of versioning, reproducible environments and experiment tracking; a reliability layer of monitoring, data validation, evaluation gates and a model registry; a scale layer of safe rollouts, feature consistency, lineage and retraining loops; and a governance cap of cost control, security and compliance."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="mlopsBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0c0b" />
          <stop offset="60%" stopColor="#0f0f0e" />
          <stop offset="100%" stopColor="#151514" />
        </linearGradient>
        <linearGradient id="tierA" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5e36a1" /><stop offset="100%" stopColor="#3f246b" />
        </linearGradient>
        <linearGradient id="tierB" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#35769f" /><stop offset="100%" stopColor="#244f6b" />
        </linearGradient>
        <linearGradient id="tierC" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#246b4b" /><stop offset="100%" stopColor="#246b4b" />
        </linearGradient>
        <linearGradient id="tierD" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6f4e25" /><stop offset="100%" stopColor="#6b4c24" />
        </linearGradient>
      </defs>

      <rect width="1200" height="560" fill="url(#mlopsBg)" />
      <g fill="#C4A6F5" opacity="0.07">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={30 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="50" textAnchor="middle" fill="#dcdad6" fontSize="15" fontWeight="700" letterSpacing="2">
        MLOPS BEST PRACTICES — ORDERED BY IMPACT
      </text>
      <text x="70" y="300" textAnchor="middle" fill="#a29f95" fontSize="12" transform="rotate(-90 70 300)" letterSpacing="2">
        HIGHER IMPACT →
      </text>

      {[
        { y: 78, grad: "tierA", tier: "FOUNDATION", items: "Version everything · Reproducible envs · Experiment tracking", w: 1010 },
        { y: 190, grad: "tierB", tier: "RELIABILITY", items: "Production monitoring · Data validation · Eval gates · Model registry", w: 900 },
        { y: 302, grad: "tierC", tier: "SCALE", items: "Safe rollouts · Feature consistency · Lineage · Retraining loops", w: 790 },
        { y: 414, grad: "tierD", tier: "GOVERNANCE", items: "Cost control · Security · Compliance & audit", w: 680 },
      ].map((row) => (
        <g key={row.tier}>
          <rect x={(1200 - row.w) / 2} y={row.y} width={row.w} height="92" rx="14" fill={`url(#${row.grad})`} opacity="0.9" />
          <text x="600" y={row.y + 36} textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="800" letterSpacing="1">
            {row.tier}
          </text>
          <text x="600" y={row.y + 64} textAnchor="middle" fill="#f7f7f6" fontSize="13.5">
            {row.items}
          </text>
        </g>
      ))}

      <text x="600" y="540" textAnchor="middle" fill="#a29f95" fontSize="12">
        Build the base first — versioning and reproducibility make every layer above it possible.
      </text>
    </svg>
  </div>
);

export default MLOpsHeroDiagram;
