// Hero diagram for the AI data-pipelines post: the medallion flow (raw ->
// validated -> modeled -> serving) with quality gates and observability.
// Pure inline SVG — prerenders statically, crawler-visible, zero JS.
const DataPipelineHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0b0714]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="A robust AI data pipeline: sources flow into a raw (bronze) landing zone, through a validation gate into a cleaned (silver) layer, then into modeled features (gold) that feed model training and serving. Data-quality monitoring and lineage span every stage, and validation gates fail bad data before it reaches the model."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="dpBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b0714" /><stop offset="60%" stopColor="#120a26" /><stop offset="100%" stopColor="#1a0f33" />
        </linearGradient>
        <linearGradient id="bronze" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b45309" /><stop offset="100%" stopColor="#7c2d12" /></linearGradient>
        <linearGradient id="silver" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#475569" /><stop offset="100%" stopColor="#1e293b" /></linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a16207" /><stop offset="100%" stopColor="#713f12" /></linearGradient>
        <linearGradient id="serve" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#4c1d95" /></linearGradient>
        <marker id="dpArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#a78bfa" />
        </marker>
      </defs>

      <rect width="1200" height="560" fill="url(#dpBg)" />
      <g fill="#a78bfa" opacity="0.07">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={30 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="50" textAnchor="middle" fill="#c4b5fd" fontSize="15" fontWeight="700" letterSpacing="2">
        A ROBUST AI DATA PIPELINE
      </text>

      {/* Sources */}
      <rect x="46" y="150" width="150" height="150" rx="12" fill="#171226" stroke="#6d28d9" strokeWidth="1.4" />
      <text x="121" y="212" textAnchor="middle" fill="#f5f3ff" fontSize="15" fontWeight="700">Sources</text>
      <text x="121" y="236" textAnchor="middle" fill="#b9aede" fontSize="11.5">APIs · DBs · events</text>
      <path d="M 196 225 L 224 225" stroke="#a78bfa" strokeWidth="2.2" markerEnd="url(#dpArrow)" />

      {[
        { x: 226, grad: "bronze", name: "Raw (Bronze)", sub: "land as-is, immutable" },
        { x: 470, grad: "silver", name: "Clean (Silver)", sub: "validated, deduped" },
        { x: 714, grad: "gold", name: "Modeled (Gold)", sub: "features, aggregates" },
        { x: 958, grad: "serve", name: "Train + Serve", sub: "same features both sides" },
      ].map((s, i) => (
        <g key={s.name}>
          <rect x={s.x} y="150" width="196" height="150" rx="12" fill={`url(#${s.grad})`} stroke="#7c3aed" strokeWidth="1.3" />
          <text x={s.x + 98} y="212" textAnchor="middle" fill="#ffffff" fontSize="15.5" fontWeight="800">{s.name}</text>
          <text x={s.x + 98} y="236" textAnchor="middle" fill="#eef0ff" fontSize="11.5">{s.sub}</text>
          {i < 3 && <path d={`M ${s.x + 196} 225 L ${s.x + 224} 225`} stroke="#a78bfa" strokeWidth="2.2" markerEnd="url(#dpArrow)" />}
          {(i === 0 || i === 1) && (
            <g>
              <circle cx={s.x + 210} cy="150" r="15" fill="#2a1015" stroke="#dc2626" strokeWidth="1.4" />
              <text x={s.x + 210} y="155" textAnchor="middle" fill="#fca5a5" fontSize="14" fontWeight="800">!</text>
            </g>
          )}
        </g>
      ))}
      <text x="580" y="128" textAnchor="middle" fill="#fca5a5" fontSize="11.5" fontWeight="600">validation gates — fail bad data here</text>

      {/* Spanning observability + lineage */}
      <rect x="46" y="360" width="1108" height="66" rx="12" fill="#150e2b" stroke="#2563eb" strokeWidth="1.5" />
      <text x="600" y="388" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="800" letterSpacing="1">
        DATA-QUALITY MONITORING · LINEAGE · ORCHESTRATION (retries, backfills)
      </text>
      <text x="600" y="410" textAnchor="middle" fill="#cbd5e1" fontSize="12">
        freshness · volume · distribution · schema — tracked across every stage, re-runnable and idempotent
      </text>
      {[300, 560, 810, 1050].map((x) => (
        <path key={x} d={`M ${x} 300 L ${x} 360`} stroke="#3b82f6" strokeWidth="1.3" strokeDasharray="4 4" opacity="0.7" />
      ))}

      <text x="600" y="470" textAnchor="middle" fill="#8b7fb8" fontSize="12">
        Reliability comes from gates, idempotency, and observability — not from a fancier transform.
      </text>
    </svg>
  </div>
);

export default DataPipelineHeroDiagram;
