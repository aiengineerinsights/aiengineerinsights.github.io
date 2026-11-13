// Hero diagram for "RAG Evaluation Metrics". Pure inline SVG so it prerenders
// to crawler-visible markup and doubles as the OG image (viewBox 1200x630).
// Shows the RAG triad mapped onto a pipeline: retriever metrics (context
// precision / context recall) vs generator metrics (faithfulness / answer
// relevance), the two failure edges RAG evaluation exists to catch.
const RagEvalHeroDiagram = () => {
  const retrieverMetrics = [
    { y: 212, t: "Context Precision", d: "relevant chunks / retrieved chunks" },
    { y: 292, t: "Context Recall", d: "needed info actually retrieved?" },
  ];
  const generatorMetrics = [
    { y: 212, t: "Faithfulness", d: "claims grounded in context?" },
    { y: 292, t: "Answer Relevance", d: "does it address the question?" },
  ];
  return (
    <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How RAG evaluation metrics map onto a retrieval-augmented generation pipeline. A query goes into a retriever, which pulls context chunks from a vector store, scored by Context Precision (are retrieved chunks relevant?) and Context Recall (was everything needed actually retrieved?). The context and query go into a generator LLM, which produces an answer, scored by Faithfulness (is every claim grounded in the retrieved context?) and Answer Relevance (does the answer address the question asked?). Together these four metrics form the standard RAG evaluation vocabulary used by frameworks like RAGAS, TruLens, and DeepEval."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="ragEvalBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c0c0b" />
            <stop offset="60%" stopColor="#0e0e0d" />
            <stop offset="100%" stopColor="#10100f" />
          </linearGradient>
          <marker id="ragEvalArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#79756a" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#ragEvalBg)" />
        <g fill="#7CC4F2" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#f3f3f2" fontSize="19" fontWeight="800" letterSpacing="1">
          RAG EVALUATION: TWO FAILURE EDGES
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#b3b0a8" fontSize="12.5">
          the retriever can miss or dilute context — the generator can drift or hallucinate
        </text>

        {/* pipeline row */}
        <rect x="40" y="100" width="200" height="50" rx="10" fill="#10100f" stroke="#7CC4F2" strokeWidth="1.6" />
        <text x="140" y="130" textAnchor="middle" fill="#f3f3f2" fontSize="14" fontWeight="700">Query</text>
        <line x1="240" y1="125" x2="298" y2="125" stroke="#545149" strokeWidth="1.6" markerEnd="url(#ragEvalArrow)" />

        <rect x="300" y="100" width="220" height="50" rx="10" fill="#10100f" stroke="#7CC4F2" strokeWidth="1.6" />
        <text x="410" y="123" textAnchor="middle" fill="#f3f3f2" fontSize="14" fontWeight="700">Retriever</text>
        <text x="410" y="140" textAnchor="middle" fill="#7CC4F2" fontSize="10.5">vector store / hybrid search</text>

        <rect x="700" y="100" width="220" height="50" rx="10" fill="#10100f" stroke="#225a41" strokeWidth="1.6" />
        <text x="810" y="123" textAnchor="middle" fill="#f3f3f2" fontSize="14" fontWeight="700">Generator LLM</text>
        <text x="810" y="140" textAnchor="middle" fill="#6FD6A8" fontSize="10.5">answers with retrieved context</text>

        <rect x="960" y="100" width="200" height="50" rx="10" fill="#10100f" stroke="#dcdad6" strokeWidth="1.6" />
        <text x="1060" y="130" textAnchor="middle" fill="#f3f3f2" fontSize="14" fontWeight="700">Answer</text>

        <line x1="520" y1="125" x2="698" y2="125" stroke="#545149" strokeWidth="1.6" markerEnd="url(#ragEvalArrow)" />
        <line x1="920" y1="125" x2="958" y2="125" stroke="#545149" strokeWidth="1.6" markerEnd="url(#ragEvalArrow)" />

        {/* retriever metrics column */}
        <text x="410" y="195" textAnchor="middle" fill="#7CC4F2" fontSize="13" fontWeight="800">RETRIEVAL METRICS</text>
        {retrieverMetrics.map((m) => (
          <g key={m.t}>
            <rect x="300" y={m.y} width="220" height="66" rx="12" fill="#10100f" stroke="#7CC4F2" strokeWidth="1.4" />
            <rect x="300" y={m.y} width="6" height="66" rx="3" fill="#7CC4F2" />
            <text x="322" y={m.y + 26} fill="#f3f3f2" fontSize="14" fontWeight="700">{m.t}</text>
            <text x="322" y={m.y + 46} fill="#b7b4ac" fontSize="10.5">{m.d}</text>
          </g>
        ))}

        {/* generator metrics column */}
        <text x="810" y="195" textAnchor="middle" fill="#6FD6A8" fontSize="13" fontWeight="800">GENERATION METRICS</text>
        {generatorMetrics.map((m) => (
          <g key={m.t}>
            <rect x="700" y={m.y} width="220" height="66" rx="12" fill="#10100f" stroke="#225a41" strokeWidth="1.4" />
            <rect x="700" y={m.y} width="6" height="66" rx="3" fill="#225a41" />
            <text x="722" y={m.y + 26} fill="#f3f3f2" fontSize="14" fontWeight="700">{m.t}</text>
            <text x="722" y={m.y + 46} fill="#b7b4ac" fontSize="10.5">{m.d}</text>
          </g>
        ))}

        {/* judge in the middle-bottom */}
        <rect x="544" y="212" width="132" height="146" rx="16" fill="#10100f" stroke="#C4A6F5" strokeWidth="1.8" />
        <text x="610" y="270" textAnchor="middle" fill="#e0dfdc" fontSize="13.5" fontWeight="800">LLM-as-</text>
        <text x="610" y="288" textAnchor="middle" fill="#e0dfdc" fontSize="13.5" fontWeight="800">Judge</text>
        <text x="610" y="310" textAnchor="middle" fill="#b7b5ad" fontSize="10.5">scores each</text>
        <text x="610" y="325" textAnchor="middle" fill="#b7b5ad" fontSize="10.5">metric 0–1</text>
        <line x1="520" y1="285" x2="544" y2="285" stroke="#545149" strokeWidth="1.4" />
        <line x1="676" y1="285" x2="700" y2="285" stroke="#545149" strokeWidth="1.4" />

        {/* bottom band */}
        <rect x="48" y="470" width="1104" height="70" rx="14" fill="#0c0c0b" stroke="#1d4d38" strokeWidth="1.3" />
        <text x="600" y="500" textAnchor="middle" fill="#6FD6A8" fontSize="13.5" fontWeight="800">
          RAGAS · TRULENS · DEEPEVAL SCORE THESE SAME FOUR SIGNALS
        </text>
        <text x="600" y="522" textAnchor="middle" fill="#6FD6A8" fontSize="12">
          faithfulness below ~0.8 = the generator is inventing facts · low context recall = the retriever missed the answer entirely
        </text>

        <text x="1152" y="580" textAnchor="end" fill="#6c695e" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default RagEvalHeroDiagram;
