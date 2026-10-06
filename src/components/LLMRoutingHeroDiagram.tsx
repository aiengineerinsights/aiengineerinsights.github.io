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
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How LLM routing works. On the left, an incoming query: 'Reset my password' with metadata (user tier, token count, tool context). It flows into a router box in the middle that lists the four routing signals: rules and metadata, embedding similarity (semantic router), a learned difficulty or preference router (RouteLLM-style), and a calibrated decision model (Jev-style Choice plus confidence). The router emits a typed decision — label 'simple', confidence 0.96 — and the query is sent to the small, cheap model on the top right; a dotted escalation arrow shows that low-confidence or failed answers go to the frontier model on the bottom right instead. A bottom band summarizes: route on a decision you can threshold, default the uncertain middle to the stronger model, and log every decision so you can measure router accuracy and cost."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="routeBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="routeArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
          <marker id="routeArrowWarm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#b45309" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#routeBg)" />

        <text x="600" y="46" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          LLM ROUTING: SEND EACH QUERY TO THE CHEAPEST MODEL THAT CAN ANSWER IT
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          a cheap decision in front of expensive models · simple → small model · hard or uncertain → frontier model
        </text>

        {/* column headers */}
        <text x="170" y="112" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="800">INCOMING QUERY</text>
        <text x="600" y="112" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="800">ROUTER</text>
        <text x="1000" y="112" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="800">MODEL TIER</text>

        {/* input (left) */}
        <rect x="40" y="200" width="260" height="150" rx="12" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
        <rect x="40" y="200" width="6" height="150" rx="3" fill="#2563eb" />
        <text x="64" y="228" fill="#eaf4fb" fontSize="14.5" fontWeight="700">"How do I reset my password?"</text>
        <text x="64" y="254" fill="#93c5fd" fontSize="11.5" fontFamily="ui-monospace, monospace">tokens: 9 · tools: none</text>
        <text x="64" y="272" fill="#93c5fd" fontSize="11.5" fontFamily="ui-monospace, monospace">user_tier: free · history: 0 turns</text>
        <text x="64" y="290" fill="#93c5fd" fontSize="11.5" fontFamily="ui-monospace, monospace">labels: [simple, complex]</text>
        <text x="64" y="316" fill="#6f8da3" fontSize="11">structured fields your code assembled —</text>
        <text x="64" y="332" fill="#6f8da3" fontSize="11">not raw user text alone</text>

        {/* arrow into router */}
        <line x1="300" y1="275" x2="418" y2="275" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#routeArrow)" />

        {/* router (center) */}
        <rect x="420" y="150" width="360" height="250" rx="16" fill="#150e24" stroke="#7c3aed" strokeWidth="1.8" />
        <text x="600" y="180" textAnchor="middle" fill="#d6c7f5" fontSize="15" fontWeight="800">LLM ROUTER</text>
        <text x="600" y="200" textAnchor="middle" fill="#a99cc8" fontSize="11.5">one cheap decision per request — four ways to make it</text>

        <rect x="440" y="214" width="320" height="30" rx="7" fill="#1d1430" stroke="#4c3a7a" strokeWidth="0.9" />
        <text x="454" y="234" fill="#c4b5fd" fontSize="11.5"><tspan fontWeight="700">1 · Rules</tspan>  token count, user tier, tool needed</text>
        <rect x="440" y="250" width="320" height="30" rx="7" fill="#1d1430" stroke="#4c3a7a" strokeWidth="0.9" />
        <text x="454" y="270" fill="#c4b5fd" fontSize="11.5"><tspan fontWeight="700">2 · Embeddings</tspan>  nearest example utterance</text>
        <rect x="440" y="286" width="320" height="30" rx="7" fill="#1d1430" stroke="#4c3a7a" strokeWidth="0.9" />
        <text x="454" y="306" fill="#c4b5fd" fontSize="11.5"><tspan fontWeight="700">3 · Learned router</tspan>  predicted difficulty / win-rate</text>
        <rect x="440" y="322" width="320" height="30" rx="7" fill="#1d1430" stroke="#4c3a7a" strokeWidth="0.9" />
        <text x="454" y="342" fill="#c4b5fd" fontSize="11.5"><tspan fontWeight="700">4 · Decision model</tspan>  typed Choice + calibrated confidence</text>

        <text x="600" y="382" textAnchor="middle" fill="#5eead4" fontSize="12.5" fontWeight="700" fontFamily="ui-monospace, monospace">→ label: "simple" · confidence: 0.96</text>

        {/* arrows to tiers */}
        <line x1="780" y1="230" x2="838" y2="200" stroke="#0f766e" strokeWidth="1.8" markerEnd="url(#routeArrow)" />
        <text x="810" y="196" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="700">≥ 0.9</text>
        <line x1="780" y1="330" x2="838" y2="380" stroke="#5a4a2a" strokeWidth="1.6" markerEnd="url(#routeArrow)" />
        <text x="806" y="374" textAnchor="middle" fill="#c9b47a" fontSize="10" fontWeight="700">else</text>

        {/* small model (top right) */}
        <rect x="840" y="150" width="312" height="100" rx="12" fill="#0b1a15" stroke="#059669" strokeWidth="1.6" />
        <rect x="840" y="150" width="6" height="100" rx="3" fill="#059669" />
        <text x="864" y="176" fill="#eaf4fb" fontSize="13" fontWeight="700">SMALL / CHEAP MODEL</text>
        <text x="864" y="198" fill="#5eead4" fontSize="12" fontFamily="ui-monospace, monospace">handles the easy majority</text>
        <text x="864" y="218" fill="#9db6c6" fontSize="10.5">sub-second, a fraction of the cost per call</text>
        <text x="864" y="236" fill="#9db6c6" fontSize="10.5">FAQ, routing, extraction, short rewrites</text>

        {/* frontier model (bottom right) */}
        <rect x="840" y="330" width="312" height="100" rx="12" fill="#1a150e" stroke="#b45309" strokeWidth="1.6" />
        <rect x="840" y="330" width="6" height="100" rx="3" fill="#b45309" />
        <text x="864" y="356" fill="#eaf4fb" fontSize="13" fontWeight="700">FRONTIER MODEL</text>
        <text x="864" y="378" fill="#fde68a" fontSize="12" fontFamily="ui-monospace, monospace">handles the hard minority</text>
        <text x="864" y="398" fill="#c9b47a" fontSize="10.5">multi-step reasoning, long context, agent planning</text>
        <text x="864" y="416" fill="#c9b47a" fontSize="10.5">also the DEFAULT when the router is unsure</text>

        {/* escalation arrow small -> frontier */}
        <line x1="996" y1="250" x2="996" y2="328" stroke="#b45309" strokeWidth="1.4" strokeDasharray="5 4" markerEnd="url(#routeArrowWarm)" />
        <text x="1008" y="292" fill="#c9b47a" fontSize="10.5">escalate if the small</text>
        <text x="1008" y="306" fill="#c9b47a" fontSize="10.5">answer fails a check</text>

        {/* bottom band */}
        <rect x="48" y="470" width="1104" height="90" rx="14" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="600" y="498" textAnchor="middle" fill="#5eead4" fontSize="13.5" fontWeight="800">
          ROUTE ON A DECISION YOU CAN THRESHOLD — AND DEFAULT THE UNCERTAIN MIDDLE TO THE STRONGER MODEL
        </text>
        <text x="600" y="521" textAnchor="middle" fill="#9fe8da" fontSize="12">
          published results: RouteLLM &gt;2× cost reduction · Hybrid LLM up to 40% fewer large-model calls · FrugalGPT cascades up to 98% cheaper (on their benchmarks)
        </text>
        <text x="600" y="543" textAnchor="middle" fill="#9fe8da" fontSize="12">
          log every decision with its confidence and outcome · measure router accuracy and quality delta on YOUR traffic before trusting the savings
        </text>

        <text x="1152" y="596" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default LLMRoutingHeroDiagram;
