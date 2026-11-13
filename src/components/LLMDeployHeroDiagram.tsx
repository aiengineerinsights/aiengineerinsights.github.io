// Hero diagram for the LLM deployment-challenges post: the serving path from
// request to response, with the main failure point at each stage. Pure inline
// SVG — prerenders statically, crawler-visible, zero JS.
const LLMDeployHeroDiagram = () => (
  <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="The LLM serving path and where it breaks: the gateway stage faces rate limits and provider outages; prompt and context assembly faces prompt injection and token limits; model inference faces cost, latency and GPU memory limits; the output stage faces hallucinations and broken structured output; and the whole path needs observability for cost, quality and drift."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="lldBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0c0b" /><stop offset="60%" stopColor="#0f0f0e" /><stop offset="100%" stopColor="#151514" />
        </linearGradient>
        <linearGradient id="lldStage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f246b" /><stop offset="100%" stopColor="#3f246b" />
        </linearGradient>
        <marker id="lldArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#C4A6F5" />
        </marker>
      </defs>

      <rect width="1200" height="560" fill="url(#lldBg)" />
      <g fill="#C4A6F5" opacity="0.07">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={30 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="50" textAnchor="middle" fill="#dcdad6" fontSize="15" fontWeight="700" letterSpacing="2">
        THE LLM SERVING PATH — AND WHERE IT BREAKS
      </text>

      {[
        { x: 60, stage: "Request / Gateway", fail: "Rate limits · provider outage" },
        { x: 336, stage: "Prompt + Context", fail: "Injection · token limits" },
        { x: 612, stage: "Model Inference", fail: "Cost · latency · GPU memory" },
        { x: 888, stage: "Output", fail: "Hallucination · broken JSON" },
      ].map((s, i) => (
        <g key={s.stage}>
          <rect x={s.x} y="150" width="252" height="150" rx="14" fill="url(#lldStage)" stroke="#5e36a1" strokeWidth="1.5" />
          <text x={s.x + 126} y="188" textAnchor="middle" fill="#f9f9f9" fontSize="16.5" fontWeight="800">{s.stage}</text>
          <line x1={s.x + 30} y1="208" x2={s.x + 222} y2="208" stroke="#583296" strokeWidth="1" />
          <text x={s.x + 126} y="238" textAnchor="middle" fill="#FF8F73" fontSize="12.5" fontWeight="600">FAILS ON</text>
          <text x={s.x + 126} y="262" textAnchor="middle" fill="#dbd9d5" fontSize="12.5">{s.fail.split(' · ')[0]}</text>
          <text x={s.x + 126} y="282" textAnchor="middle" fill="#dbd9d5" fontSize="12.5">{s.fail.split(' · ').slice(1).join(' · ')}</text>
          {i < 3 && <path d={`M ${s.x + 252} 225 L ${s.x + 276} 225`} stroke="#C4A6F5" strokeWidth="2.2" markerEnd="url(#lldArrow)" />}
        </g>
      ))}

      {/* Observability spanning the whole path */}
      <rect x="60" y="360" width="1080" height="70" rx="14" fill="#121211" stroke="#35769f" strokeWidth="1.6" />
      <text x="600" y="390" textAnchor="middle" fill="#7CC4F2" fontSize="14.5" fontWeight="800" letterSpacing="1">
        OBSERVABILITY ACROSS EVERY STAGE
      </text>
      <text x="600" y="413" textAnchor="middle" fill="#d9d7d3" fontSize="12.5">
        Trace requests · track tokens &amp; cost · monitor quality and drift · alert on regressions
      </text>
      {[300, 500, 700, 900].map((x) => (
        <path key={x} d={`M ${x} 300 L ${x} 360`} stroke="#7CC4F2" strokeWidth="1.4" strokeDasharray="4 4" opacity="0.7" />
      ))}

      <text x="600" y="474" textAnchor="middle" fill="#a29f95" fontSize="12">
        Most LLM-in-production pain lands on cost, latency, and output reliability — design for all three up front.
      </text>
    </svg>
  </div>
);

export default LLMDeployHeroDiagram;
