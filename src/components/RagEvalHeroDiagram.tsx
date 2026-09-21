// Hero diagram for "RAG Evaluation Metrics". Pure inline SVG so it prerenders
// to crawler-visible markup and doubles as the OG image (viewBox 1200x630).
// Shows the RAG triad mapped onto a pipeline: retriever metrics (context
// precision / context recall) vs generator metrics (faithfulness / answer
// relevance), the two failure edges RAG evaluation exists to catch.
const RagEvalHeroDiagram = () => {
  const retrieverMetrics = [
    { y: 160, t: "Context Precision", d: "relevant chunks / retrieved chunks" },
    { y: 240, t: "Context Recall", d: "needed info actually retrieved?" },
  ];
  const generatorMetrics = [
    { y: 160, t: "Faithfulness", d: "claims grounded in context?" },
    { y: 240, t: "Answer Relevance", d: "does it address the question?" },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How RAG evaluation metrics map onto a retrieval-augmented generation pipeline. A query goes into a retriever, which pulls context chunks from a vector store, scored by Context Precision (are retrieved chunks relevant?) and Context Recall (was everything needed actually retrieved?). The context and query go into a generator LLM, which produces an answer, scored by Faithfulness (is every claim grounded in the retrieved context?) and Answer Relevance (does the answer address the question asked?). Together these four metrics form the standard RAG evaluation vocabulary used by frameworks like RAGAS, TruLens, and DeepEval."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="ragEvalBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="ragEvalArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#ragEvalBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          RAG EVALUATION: TWO FAILURE EDGES
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          the retriever can miss or dilute context — the generator can drift or hallucinate
        </text>

        {/* pipeline row */}
        <rect x="40" y="100" width="200" height="50" rx="10" fill="#0e1a24" stroke="#38bdf8" strokeWidth="1.6" />
        <text x="140" y="130" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Query</text>
        <line x1="240" y1="125" x2="298" y2="125" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#ragEvalArrow)" />

        <rect x="300" y="100" width="220" height="50" rx="10" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
        <text x="410" y="123" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Retriever</text>
        <text x="410" y="140" textAnchor="middle" fill="#93c5fd" fontSize="10.5">vector store / hybrid search</text>

        <rect x="700" y="100" width="220" height="50" rx="10" fill="#0e1a24" stroke="#059669" strokeWidth="1.6" />
        <text x="810" y="123" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Generator LLM</text>
        <text x="810" y="140" textAnchor="middle" fill="#6ee7b7" fontSize="10.5">answers with retrieved context</text>

        <rect x="960" y="100" width="200" height="50" rx="10" fill="#0e1a24" stroke="#c4b5fd" strokeWidth="1.6" />
        <text x="1060" y="130" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Answer</text>

        <line x1="520" y1="125" x2="698" y2="125" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#ragEvalArrow)" />
        <line x1="920" y1="125" x2="958" y2="125" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#ragEvalArrow)" />

        {/* retriever metrics column */}
        <text x="410" y="195" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="800">RETRIEVAL METRICS</text>
        {retrieverMetrics.map((m) => (
          <g key={m.t}>
            <rect x="300" y={m.y} width="220" height="66" rx="12" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.4" />
            <rect x="300" y={m.y} width="6" height="66" rx="3" fill="#2563eb" />
            <text x="322" y={m.y + 26} fill="#eaf4fb" fontSize="14" fontWeight="700">{m.t}</text>
            <text x="322" y={m.y + 46} fill="#9db6c6" fontSize="10.5">{m.d}</text>
          </g>
        ))}

        {/* generator metrics column */}
        <text x="810" y="195" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="800">GENERATION METRICS</text>
        {generatorMetrics.map((m) => (
          <g key={m.t}>
            <rect x="700" y={m.y} width="220" height="66" rx="12" fill="#0e1a24" stroke="#059669" strokeWidth="1.4" />
            <rect x="700" y={m.y} width="6" height="66" rx="3" fill="#059669" />
            <text x="722" y={m.y + 26} fill="#eaf4fb" fontSize="14" fontWeight="700">{m.t}</text>
            <text x="722" y={m.y + 46} fill="#9db6c6" fontSize="10.5">{m.d}</text>
          </g>
        ))}

        {/* judge in the middle-bottom */}
        <rect x="520" y="180" width="160" height="140" rx="16" fill="#150e24" stroke="#7c3aed" strokeWidth="1.8" />
        <text x="600" y="240" textAnchor="middle" fill="#d6c7f5" fontSize="13.5" fontWeight="800">LLM-as-</text>
        <text x="600" y="258" textAnchor="middle" fill="#d6c7f5" fontSize="13.5" fontWeight="800">Judge</text>
        <text x="600" y="280" textAnchor="middle" fill="#a99cc8" fontSize="10.5">scores each</text>
        <text x="600" y="295" textAnchor="middle" fill="#a99cc8" fontSize="10.5">metric 0–1</text>

        {/* bottom band */}
        <rect x="48" y="470" width="1104" height="70" rx="14" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="600" y="500" textAnchor="middle" fill="#5eead4" fontSize="13.5" fontWeight="800">
          RAGAS · TRULENS · DEEPEVAL SCORE THESE SAME FOUR SIGNALS
        </text>
        <text x="600" y="522" textAnchor="middle" fill="#9fe8da" fontSize="12">
          faithfulness below ~0.8 = the generator is inventing facts · low context recall = the retriever missed the answer entirely
        </text>

        <text x="1152" y="580" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default RagEvalHeroDiagram;
