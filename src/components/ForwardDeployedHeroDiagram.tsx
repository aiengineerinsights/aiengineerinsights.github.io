// Hero diagram for the forward-deployed AI engineer post: the FDE sits between
// the AI lab's model expertise and the customer's domain knowledge, embeds, and
// ships a production system while routing feedback back to the product team.
// Pure inline SVG — prerenders statically, crawler-visible, zero JS.
const ForwardDeployedHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#07101a]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="The forward-deployed engineer sits between two bodies of knowledge neither side has alone: the AI lab knows model behavior, RAG patterns, evals and failure modes; the customer knows their domain, data schemas, compliance and edge cases. The FDE embeds with the customer, owns end-to-end production delivery, and routes product feedback back to the platform team."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="fdBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#07101a" /><stop offset="60%" stopColor="#0b1626" /><stop offset="100%" stopColor="#111a33" />
        </linearGradient>
        <linearGradient id="fdLab" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0891b2" /><stop offset="100%" stopColor="#155e75" /></linearGradient>
        <linearGradient id="fdCust" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4f46e5" /><stop offset="100%" stopColor="#3730a3" /></linearGradient>
        <linearGradient id="fdFde" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#6366f1" /></linearGradient>
        <marker id="fdArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#67e8f9" />
        </marker>
      </defs>

      <rect width="1200" height="560" fill="url(#fdBg)" />
      <g fill="#67e8f9" opacity="0.06">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={30 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="50" textAnchor="middle" fill="#a5f3fc" fontSize="15" fontWeight="700" letterSpacing="2">
        THE FORWARD-DEPLOYED ENGINEER — THE BRIDGE NEITHER SIDE CAN STAFF ALONE
      </text>

      {/* AI Lab */}
      <rect x="60" y="120" width="270" height="200" rx="14" fill="url(#fdLab)" stroke="#22d3ee" strokeWidth="1.4" />
      <text x="195" y="156" textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="800">The AI Lab</text>
      <text x="195" y="176" textAnchor="middle" fill="#cffafe" fontSize="12" fontStyle="italic">knows how models behave</text>
      {["Model behavior at scale", "RAG + retrieval patterns", "Evaluation frameworks", "Failure modes"].map((t, i) => (
        <text key={t} x="86" y={210 + i * 26} fill="#ecfeff" fontSize="13">• {t}</text>
      ))}

      {/* Customer */}
      <rect x="870" y="120" width="270" height="200" rx="14" fill="url(#fdCust)" stroke="#818cf8" strokeWidth="1.4" />
      <text x="1005" y="156" textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="800">The Customer</text>
      <text x="1005" y="176" textAnchor="middle" fill="#e0e7ff" fontSize="12" fontStyle="italic">knows the domain</text>
      {["Business + domain logic", "Data schemas", "Compliance + security", "The real edge cases"].map((t, i) => (
        <text key={t} x="896" y={210 + i * 26} fill="#eef2ff" fontSize="13">• {t}</text>
      ))}

      {/* FDE center */}
      <rect x="410" y="150" width="380" height="140" rx="16" fill="#0b1626" stroke="url(#fdFde)" strokeWidth="2.5" />
      <text x="600" y="192" textAnchor="middle" fill="#a5f3fc" fontSize="19" fontWeight="800">Forward-Deployed Engineer</text>
      <text x="600" y="218" textAnchor="middle" fill="#e2e8f0" fontSize="13">Embeds with the customer · writes production code</text>
      <text x="600" y="240" textAnchor="middle" fill="#e2e8f0" fontSize="13">Owns delivery end to end — maps it, ships it, keeps it running</text>
      <text x="600" y="266" textAnchor="middle" fill="#94a3b8" fontSize="12" fontStyle="italic">the same engineer on day 1 and at 3am six months later</text>

      <path d="M 330 220 L 408 220" stroke="#67e8f9" strokeWidth="2.4" markerEnd="url(#fdArrow)" />
      <path d="M 870 220 L 792 220" stroke="#67e8f9" strokeWidth="2.4" markerEnd="url(#fdArrow)" />

      {/* Output */}
      <rect x="410" y="360" width="380" height="60" rx="12" fill="#052e2b" stroke="#14b8a6" strokeWidth="1.6" />
      <text x="600" y="388" textAnchor="middle" fill="#5eead4" fontSize="15" fontWeight="800">A PRODUCTION SYSTEM THAT ACTUALLY RUNS</text>
      <text x="600" y="408" textAnchor="middle" fill="#99f6e4" fontSize="12">not a slide deck, not a demo, not a report</text>
      <path d="M 600 290 L 600 358" stroke="#67e8f9" strokeWidth="2.2" markerEnd="url(#fdArrow)" />

      {/* Feedback loop */}
      <path d="M 410 250 C 250 250, 250 470, 600 470 C 950 470, 950 250, 790 250" stroke="#818cf8" strokeWidth="1.6" strokeDasharray="6 5" fill="none" markerEnd="url(#fdArrow)" />
      <text x="600" y="492" textAnchor="middle" fill="#a5b4fc" fontSize="12.5" fontWeight="600">
        feedback loop → what breaks in the field becomes the platform's roadmap
      </text>

      <text x="600" y="524" textAnchor="middle" fill="#64748b" fontSize="11.5">
        Origin: Palantir, 2005. Now hired by OpenAI, Anthropic, and Google.
      </text>
    </svg>
  </div>
);

export default ForwardDeployedHeroDiagram;
