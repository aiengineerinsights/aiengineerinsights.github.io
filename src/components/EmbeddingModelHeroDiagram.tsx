// Hero diagram for "How to Choose an Embedding Model for RAG". Pure inline
// SVG so it prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630). Shows text -> embedding model -> vector, the trade-off
// axes (quality / dimensions / context / cost), and a short shortlist.
const EmbeddingModelHeroDiagram = () => {
  const models = ["OpenAI text-embedding-3", "Voyage voyage-3 / 3-large", "Cohere Embed v4", "Gemini Embedding", "BGE-M3 (open)", "Qwen3-Embedding (open)"];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How to choose an embedding model for RAG. Text chunks go into an embedding model and come out as a fixed-length vector. The choice is driven by four trade-offs: retrieval quality on the MTEB benchmark, embedding dimensions (which drive vector database cost), max context length, and price per million tokens. A shortlist below spans API models (OpenAI text-embedding-3, Voyage voyage-3 and voyage-3-large, Cohere Embed v4, Google Gemini Embedding) and open-weight models you can self-host (BGE-M3, Qwen3-Embedding)."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="embBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="embArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#embBg)" />
        <g fill="#a78bfa" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#f1e9ff" fontSize="19" fontWeight="800" letterSpacing="1">
          CHOOSING AN EMBEDDING MODEL FOR RAG
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#c4b5fd" fontSize="12.5">
          quality (MTEB) vs dimensions vs context length vs price per million tokens
        </text>

        {/* pipeline */}
        <rect x="60" y="110" width="190" height="64" rx="10" fill="#0e1a24" stroke="#a78bfa" strokeWidth="1.6" />
        <text x="155" y="138" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Text chunk</text>
        <text x="155" y="157" textAnchor="middle" fill="#c4b5fd" fontSize="10.5">query or document</text>
        <line x1="250" y1="142" x2="320" y2="142" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#embArrow)" />

        <rect x="330" y="105" width="220" height="74" rx="10" fill="#0e1a24" stroke="#059669" strokeWidth="2" />
        <text x="440" y="135" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="800">Embedding model</text>
        <text x="440" y="154" textAnchor="middle" fill="#6ee7b7" fontSize="10.5">API or self-hosted</text>
        <text x="440" y="170" textAnchor="middle" fill="#8fb8cc" fontSize="10">one model for ingest + query</text>
        <line x1="550" y1="142" x2="620" y2="142" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#embArrow)" />

        <rect x="630" y="110" width="190" height="64" rx="10" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
        <text x="725" y="138" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Vector</text>
        <text x="725" y="157" textAnchor="middle" fill="#93c5fd" fontSize="10.5">fixed length, e.g. 1024 dims</text>
        <line x1="820" y1="142" x2="890" y2="142" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#embArrow)" />

        <rect x="900" y="110" width="250" height="64" rx="10" fill="#0e1a24" stroke="#7c3aed" strokeWidth="1.6" />
        <text x="1025" y="138" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Vector database</text>
        <text x="1025" y="157" textAnchor="middle" fill="#c4b5fd" fontSize="10.5">stores + searches it (dims = cost)</text>

        {/* trade-off axes */}
        <text x="600" y="235" textAnchor="middle" fill="#eaf4fb" fontSize="15" fontWeight="700">
          Four things to trade off
        </text>
        {[
          { label: "Quality", sub: "MTEB retrieval score", color: "#6ee7b7" },
          { label: "Dimensions", sub: "drives vector DB cost", color: "#93c5fd" },
          { label: "Context", sub: "8K–32K+ tokens", color: "#c4b5fd" },
          { label: "Price", sub: "$ / 1M tokens", color: "#fca5a5" },
        ].map((a, i) => (
          <g key={a.label}>
            <rect x={90 + i * 260} y="252" width="230" height="54" rx="10" fill="#0e1a24" stroke="#33506a" strokeWidth="1.4" />
            <text x={205 + i * 260} y="275" textAnchor="middle" fill={a.color} fontSize="13.5" fontWeight="700">{a.label}</text>
            <text x={205 + i * 260} y="293" textAnchor="middle" fill="#8fb8cc" fontSize="10.5">{a.sub}</text>
          </g>
        ))}

        {/* shortlist */}
        <text x="600" y="355" textAnchor="middle" fill="#eaf4fb" fontSize="15" fontWeight="700">
          Shortlist (API + open-weight)
        </text>
        {models.map((o, i) => {
          const row = Math.floor(i / 3);
          const col = i % 3;
          return (
            <g key={o}>
              <rect x={90 + col * 350} y={375 + row * 56} width="320" height="42" rx="20" fill="#0e1a24" stroke="#33506a" strokeWidth="1.4" />
              <text x={250 + col * 350} y={401 + row * 56} textAnchor="middle" fill="#eaf4fb" fontSize="12.5" fontWeight="700">{o}</text>
            </g>
          );
        })}

        <text x="600" y="520" textAnchor="middle" fill="#8fb8cc" fontSize="11.5">
          Pick by task + budget, verify on your own corpus — public benchmarks are a shortlist, not a verdict
        </text>
        <text x="600" y="545" textAnchor="middle" fill="#6b8299" fontSize="10.5">
          Ingest and query must always use the same embedding model and the same input_type convention
        </text>
      </svg>
    </div>
  );
};

export default EmbeddingModelHeroDiagram;
