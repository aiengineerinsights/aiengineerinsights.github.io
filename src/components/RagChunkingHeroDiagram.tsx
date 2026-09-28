// Hero diagram for "RAG Chunking Strategies". Pure inline SVG so it prerenders
// to crawler-visible markup and doubles as the OG image (viewBox 1200x630).
// Shows a document flowing through three chunking approaches into a vector
// store, with the too-small / too-large trade-off called out underneath.
const RagChunkingHeroDiagram = () => {
  const strategies = [
    { y: 130, t: "Fixed-size", d: "N tokens/chars + overlap — fast, ignores structure" },
    { y: 210, t: "Recursive", d: "paragraph → sentence → word fallback — LangChain default" },
    { y: 290, t: "Semantic", d: "splits where embedding similarity drops — costs embedding calls" },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How RAG chunking strategies work. A source document is split by one of three strategies: fixed-size (split every N tokens with overlap), recursive (try paragraph breaks, then sentences, then words), or semantic (split where consecutive sentence embeddings diverge). The resulting chunks are embedded and stored in a vector database for retrieval. Below, a trade-off bar shows chunks too small lose context and return fragments, while chunks too large add noise and dilute retrieval precision — the sweet spot for most prose is 200 to 500 tokens with 10 to 20 percent overlap."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="ragChunkBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="ragChunkArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#ragChunkBg)" />
        <g fill="#a78bfa" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#f1e9ff" fontSize="19" fontWeight="800" letterSpacing="1">
          RAG CHUNKING STRATEGIES
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#c4b5fd" fontSize="12.5">
          how you split a document decides what your retriever can ever find
        </text>

        {/* source doc */}
        <rect x="40" y="100" width="180" height="220" rx="10" fill="#0e1a24" stroke="#a78bfa" strokeWidth="1.6" />
        <text x="130" y="130" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Source</text>
        <text x="130" y="148" textAnchor="middle" fill="#c4b5fd" fontSize="11">document</text>
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1="60" y1={175 + i * 18} x2="200" y2={175 + i * 18} stroke="#33506a" strokeWidth="2" />
        ))}

        <line x1="220" y1="210" x2="290" y2="210" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#ragChunkArrow)" />

        {/* three strategies */}
        {strategies.map((s) => (
          <g key={s.t}>
            <rect x="300" y={s.y} width="330" height="60" rx="10" fill="#0e1a24" stroke="#7c3aed" strokeWidth="1.6" />
            <text x="320" y={s.y + 25} fill="#eaf4fb" fontSize="14" fontWeight="700">{s.t}</text>
            <text x="320" y={s.y + 44} fill="#c4b5fd" fontSize="10.5">{s.d}</text>
            <line x1="630" y1={s.y + 30} x2="700" y2="210" stroke="#33506a" strokeWidth="1.4" markerEnd="url(#ragChunkArrow)" />
          </g>
        ))}

        {/* vector store */}
        <rect x="710" y="160" width="220" height="100" rx="10" fill="#0e1a24" stroke="#059669" strokeWidth="1.6" />
        <text x="820" y="200" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Chunks →</text>
        <text x="820" y="220" textAnchor="middle" fill="#6ee7b7" fontSize="12">Vector store</text>
        <text x="820" y="238" textAnchor="middle" fill="#8fb8cc" fontSize="10.5">embedded &amp; indexed</text>

        <line x1="930" y1="210" x2="1000" y2="210" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#ragChunkArrow)" />
        <rect x="1010" y="160" width="150" height="100" rx="10" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
        <text x="1085" y="205" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Retriever</text>
        <text x="1085" y="225" textAnchor="middle" fill="#93c5fd" fontSize="10.5">top-k search</text>

        {/* trade-off bar */}
        <text x="600" y="410" textAnchor="middle" fill="#eaf4fb" fontSize="15" fontWeight="700">
          Chunk size trade-off
        </text>
        <rect x="150" y="440" width="900" height="34" rx="8" fill="#0e1a24" stroke="#33506a" strokeWidth="1.4" />
        <rect x="150" y="440" width="300" height="34" rx="8" fill="#7c3aed" opacity="0.25" />
        <rect x="450" y="440" width="300" height="34" fill="#059669" opacity="0.25" />
        <rect x="750" y="440" width="300" height="34" rx="8" fill="#dc2626" opacity="0.25" />
        <text x="300" y="463" textAnchor="middle" fill="#e0d4ff" fontSize="12">Too small: fragments</text>
        <text x="600" y="463" textAnchor="middle" fill="#c9f7e3" fontSize="12">Sweet spot: 200–500 tok</text>
        <text x="900" y="463" textAnchor="middle" fill="#ffd7d7" fontSize="12">Too large: noisy context</text>

        <text x="600" y="510" textAnchor="middle" fill="#8fb8cc" fontSize="11.5">
          Optimal size and overlap depend on document type — prose, code, and tables behave differently.
        </text>
      </svg>
    </div>
  );
};

export default RagChunkingHeroDiagram;
