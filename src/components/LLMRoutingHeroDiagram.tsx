// Hero diagram for the "LLM Routing Explained" post. Pure inline SVG so it
// prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630, rasterised to public/og-llm-routing.png). Shows the core
// idea of an LLM router: one incoming query, a cheap routing decision (rules,
// embeddings, a learned router, or a calibrated decision model), and the
// query landing on the cheapest model that can answer it — with an escalation
// path to the frontier model when confidence is low.
// Targets "llm routing" / "llm router" / "model routing" intent.
const LLMRoutingHeroDiagram = () => {
  return (
    <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How LLM routing works. On the left, an incoming query: 'Reset my password' with metadata (user tier, token count, tool context). It flows into a router box in the middle that lists the four routing signals: rules and metadata, embedding similarity (semantic router), a learned difficulty or preference router (RouteLLM-style), and a calibrated decision model (Jev-style Choice plus confidence). The router emits a typed decision — label 'simple', confidence 0.96 — and the query is sent to the small, cheap model on the top right; a dotted escalation arrow shows that low-confidence or failed answers go to the frontier model on the bottom right instead. A bottom band summarizes: route on a decision you can threshold, default the uncertain middle to the stronger model, and log every decision so you can measure router accuracy and cost."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="routeBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c0c0b" />
            <stop offset="60%" stopColor="#0e0e0d" />
            <stop offset="100%" stopColor="#10100f" />
          </linearGradient>
          <marker id="routeArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#79756a" />
          </marker>
          <marker id="routeArrowWarm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#6e502a" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#routeBg)" />

        <text x="600" y="46" textAnchor="middle" fill="#f3f3f2" fontSize="19" fontWeight="800" letterSpacing="1">
          LLM ROUTING: SEND EACH QUERY TO THE CHEAPEST MODEL THAT CAN ANSWER IT
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#b3b0a8" fontSize="12.5">
          a cheap decision in front of expensive models · simple → small model · hard or uncertain → frontier model
        </text>

        {/* column headers */}
        <text x="170" y="112" textAnchor="middle" fill="#7CC4F2" fontSize="13" fontWeight="800">INCOMING QUERY</text>
        <text x="600" y="112" textAnchor="middle" fill="#dcdad6" fontSize="13" fontWeight="800">ROUTER</text>
        <text x="1000" y="112" textAnchor="middle" fill="#6FD6A8" fontSize="13" fontWeight="800">MODEL TIER</text>

        {/* input (left) */}
        <rect x="40" y="200" width="260" height="150" rx="12" fill="#10100f" stroke="#7CC4F2" strokeWidth="1.6" />
        <rect x="40" y="200" width="6" height="150" rx="3" fill="#7CC4F2" />
        <text x="64" y="228" fill="#f3f3f2" fontSize="14.5" fontWeight="700">"How do I reset my password?"</text>
        <text x="64" y="254" fill="#7CC4F2" fontSize="11.5" fontFamily="ui-monospace, monospace">tokens: 9 · tools: none</text>
        <text x="64" y="272" fill="#7CC4F2" fontSize="11.5" fontFamily="ui-monospace, monospace">user_tier: free · history: 0 turns</text>
        <text x="64" y="290" fill="#7CC4F2" fontSize="11.5" fontFamily="ui-monospace, monospace">labels: [simple, complex]</text>
        <text x="64" y="316" fill="#918d81" fontSize="11">structured fields your code assembled —</text>
        <text x="64" y="332" fill="#918d81" fontSize="11">not raw user text alone</text>

        {/* arrow into router */}
        <line x1="300" y1="275" x2="418" y2="275" stroke="#545149" strokeWidth="1.6" markerEnd="url(#routeArrow)" />

        {/* router (center) */}
        <rect x="420" y="150" width="360" height="250" rx="16" fill="#10100f" stroke="#C4A6F5" strokeWidth="1.8" />
        <text x="600" y="180" textAnchor="middle" fill="#e0dfdc" fontSize="15" fontWeight="800">LLM ROUTER</text>
        <text x="600" y="200" textAnchor="middle" fill="#b7b5ad" fontSize="11.5">one cheap decision per request — four ways to make it</text>

        <rect x="440" y="214" width="320" height="30" rx="7" fill="#161614" stroke="#605d54" strokeWidth="0.9" />
        <text x="454" y="234" fill="#dcdad6" fontSize="11.5"><tspan fontWeight="700">1 · Rules</tspan>  token count, user tier, tool needed</text>
        <rect x="440" y="250" width="320" height="30" rx="7" fill="#161614" stroke="#605d54" strokeWidth="0.9" />
        <text x="454" y="270" fill="#dcdad6" fontSize="11.5"><tspan fontWeight="700">2 · Embeddings</tspan>  nearest example utterance</text>
        <rect x="440" y="286" width="320" height="30" rx="7" fill="#161614" stroke="#605d54" strokeWidth="0.9" />
        <text x="454" y="306" fill="#dcdad6" fontSize="11.5"><tspan fontWeight="700">3 · Learned router</tspan>  predicted difficulty / win-rate</text>
        <rect x="440" y="322" width="320" height="30" rx="7" fill="#161614" stroke="#605d54" strokeWidth="0.9" />
        <text x="454" y="342" fill="#dcdad6" fontSize="11.5"><tspan fontWeight="700">4 · Decision model</tspan>  typed Choice + calibrated confidence</text>

        <text x="600" y="382" textAnchor="middle" fill="#6FD6A8" fontSize="12.5" fontWeight="700" fontFamily="ui-monospace, monospace">→ label: "simple" · confidence: 0.96</text>

        {/* arrows to tiers */}
        <line x1="780" y1="230" x2="838" y2="200" stroke="#1d4d38" strokeWidth="1.8" markerEnd="url(#routeArrow)" />
        <text x="810" y="196" textAnchor="middle" fill="#6FD6A8" fontSize="10" fontWeight="700">≥ 0.9</text>
        <line x1="780" y1="330" x2="838" y2="380" stroke="#47443d" strokeWidth="1.6" markerEnd="url(#routeArrow)" />
        <text x="806" y="374" textAnchor="middle" fill="#FFB454" fontSize="10" fontWeight="700">else</text>

        {/* small model (top right) */}
        <rect x="840" y="150" width="312" height="100" rx="12" fill="#0c0c0b" stroke="#225a41" strokeWidth="1.6" />
        <rect x="840" y="150" width="6" height="100" rx="3" fill="#225a41" />
        <text x="864" y="176" fill="#f3f3f2" fontSize="13" fontWeight="700">SMALL / CHEAP MODEL</text>
        <text x="864" y="198" fill="#6FD6A8" fontSize="12" fontFamily="ui-monospace, monospace">handles the easy majority</text>
        <text x="864" y="218" fill="#b7b4ac" fontSize="10.5">sub-second, a fraction of the cost per call</text>
        <text x="864" y="236" fill="#b7b4ac" fontSize="10.5">FAQ, routing, extraction, short rewrites</text>

        {/* frontier model (bottom right) */}
        <rect x="840" y="330" width="312" height="100" rx="12" fill="#0d0d0c" stroke="#6e502a" strokeWidth="1.6" />
        <rect x="840" y="330" width="6" height="100" rx="3" fill="#6e502a" />
        <text x="864" y="356" fill="#f3f3f2" fontSize="13" fontWeight="700">FRONTIER MODEL</text>
        <text x="864" y="378" fill="#FFB454" fontSize="12" fontFamily="ui-monospace, monospace">handles the hard minority</text>
        <text x="864" y="398" fill="#FFB454" fontSize="10.5">multi-step reasoning, long context, agent planning</text>
        <text x="864" y="416" fill="#FFB454" fontSize="10.5">also the DEFAULT when the router is unsure</text>

        {/* escalation arrow small -> frontier */}
        <line x1="996" y1="250" x2="996" y2="328" stroke="#6e502a" strokeWidth="1.4" strokeDasharray="5 4" markerEnd="url(#routeArrowWarm)" />
        <text x="1008" y="292" fill="#FFB454" fontSize="10.5">escalate if the small</text>
        <text x="1008" y="306" fill="#FFB454" fontSize="10.5">answer fails a check</text>

        {/* bottom band */}
        <rect x="48" y="470" width="1104" height="90" rx="14" fill="#0c0c0b" stroke="#1d4d38" strokeWidth="1.3" />
        <text x="600" y="498" textAnchor="middle" fill="#6FD6A8" fontSize="13.5" fontWeight="800">
          ROUTE ON A DECISION YOU CAN THRESHOLD — AND DEFAULT THE UNCERTAIN MIDDLE TO THE STRONGER MODEL
        </text>
        <text x="600" y="521" textAnchor="middle" fill="#6FD6A8" fontSize="12">
          published results: RouteLLM &gt;2× cost reduction · Hybrid LLM up to 40% fewer large-model calls · FrugalGPT cascades up to 98% cheaper (on their benchmarks)
        </text>
        <text x="600" y="543" textAnchor="middle" fill="#6FD6A8" fontSize="12">
          log every decision with its confidence and outcome · measure router accuracy and quality delta on YOUR traffic before trusting the savings
        </text>

        <text x="1152" y="596" textAnchor="end" fill="#6c695e" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default LLMRoutingHeroDiagram;
