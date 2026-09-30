// Hero diagram for "Vector Databases for RAG". Pure inline SVG so it prerenders
// to crawler-visible markup and doubles as the OG image (viewBox 1200x630).
// Shows the ingest path (chunks → embedding model → vector database) and the
// query path (query → embed → top-k similarity search → retrieved context)
// meeting at the vector database, with the main options laid out on a
// self-hosted-open-source ↔ fully-managed spectrum underneath.
const VectorDbRagHeroDiagram = () => {
  const options = ["pgvector", "Chroma", "Qdrant", "Weaviate", "Milvus", "Pinecone"];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How a vector database fits into a RAG pipeline. On the ingest path, document chunks flow into an embedding model and the resulting vectors are stored in a vector database with an approximate nearest neighbour index such as HNSW or IVFFlat. On the query path, the user's query is embedded with the same model, the vector database runs a top-k similarity search, and the retrieved chunks become the context passed to the language model. Underneath, six common options are listed — pgvector, Chroma, Qdrant, Weaviate, Milvus and Pinecone — on a spectrum from self-hosted open source on the left to fully managed on the right."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="vdbRagBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <linearGradient id="vdbRagSpectrum" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <marker id="vdbRagArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#vdbRagBg)" />
        <g fill="#a78bfa" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#f1e9ff" fontSize="19" fontWeight="800" letterSpacing="1">
          VECTOR DATABASES FOR RAG
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#c4b5fd" fontSize="12.5">
          where the index sits, what it does on ingest and on query, and which one to pick
        </text>

        {/* ingest path */}
        <text x="40" y="112" fill="#6ee7b7" fontSize="11" fontWeight="700" letterSpacing="1">INGEST (OFFLINE)</text>
        <rect x="40" y="122" width="150" height="60" rx="10" fill="#0e1a24" stroke="#a78bfa" strokeWidth="1.6" />
        <text x="115" y="148" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Chunks</text>
        <text x="115" y="167" textAnchor="middle" fill="#c4b5fd" fontSize="10.5">from your chunking step</text>
        <line x1="190" y1="152" x2="240" y2="152" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#vdbRagArrow)" />

        <rect x="250" y="122" width="180" height="60" rx="10" fill="#0e1a24" stroke="#a78bfa" strokeWidth="1.6" />
        <text x="340" y="148" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Embedding model</text>
        <text x="340" y="167" textAnchor="middle" fill="#c4b5fd" fontSize="10.5">text → vector</text>
        <line x1="430" y1="152" x2="478" y2="195" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#vdbRagArrow)" />

        {/* query path */}
        <text x="40" y="262" fill="#93c5fd" fontSize="11" fontWeight="700" letterSpacing="1">QUERY (ONLINE)</text>
        <rect x="40" y="272" width="150" height="60" rx="10" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
        <text x="115" y="298" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Query</text>
        <text x="115" y="317" textAnchor="middle" fill="#93c5fd" fontSize="10.5">user question</text>
        <line x1="190" y1="302" x2="240" y2="302" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#vdbRagArrow)" />

        <rect x="250" y="272" width="180" height="60" rx="10" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
        <text x="340" y="298" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Embed</text>
        <text x="340" y="317" textAnchor="middle" fill="#93c5fd" fontSize="10.5">same model as ingest</text>
        <line x1="430" y1="302" x2="478" y2="262" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#vdbRagArrow)" />

        {/* vector database (centre) */}
        <rect x="485" y="150" width="240" height="160" rx="12" fill="#0e1a24" stroke="#059669" strokeWidth="2" />
        <ellipse cx="605" cy="150" rx="120" ry="14" fill="#0e1a24" stroke="#059669" strokeWidth="2" />
        <text x="605" y="200" textAnchor="middle" fill="#eaf4fb" fontSize="16" fontWeight="800">Vector database</text>
        <text x="605" y="224" textAnchor="middle" fill="#6ee7b7" fontSize="11.5">index: HNSW / IVFFlat</text>
        <text x="605" y="243" textAnchor="middle" fill="#8fb8cc" fontSize="10.5">vectors + ids + metadata</text>
        <text x="605" y="262" textAnchor="middle" fill="#8fb8cc" fontSize="10.5">approximate nearest-neighbour search</text>
        <text x="605" y="290" textAnchor="middle" fill="#c4b5fd" fontSize="10.5">filter by metadata · optional hybrid (BM25 + vector)</text>

        {/* results path */}
        <line x1="725" y1="230" x2="775" y2="230" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#vdbRagArrow)" />
        <rect x="785" y="195" width="190" height="70" rx="10" fill="#0e1a24" stroke="#7c3aed" strokeWidth="1.6" />
        <text x="880" y="224" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Top-k similarity</text>
        <text x="880" y="243" textAnchor="middle" fill="#c4b5fd" fontSize="10.5">nearest chunks by distance</text>
        <line x1="975" y1="230" x2="1015" y2="230" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#vdbRagArrow)" />
        <rect x="1025" y="195" width="140" height="70" rx="10" fill="#0e1a24" stroke="#7c3aed" strokeWidth="1.6" />
        <text x="1095" y="224" textAnchor="middle" fill="#eaf4fb" fontSize="14" fontWeight="700">Retrieved</text>
        <text x="1095" y="243" textAnchor="middle" fill="#c4b5fd" fontSize="10.5">context → LLM</text>

        {/* options row */}
        <text x="600" y="400" textAnchor="middle" fill="#eaf4fb" fontSize="15" fontWeight="700">
          The main options
        </text>
        {options.map((o, i) => (
          <g key={o}>
            <rect x={90 + i * 170} y="418" width="150" height="40" rx="20" fill="#0e1a24" stroke="#33506a" strokeWidth="1.4" />
            <text x={165 + i * 170} y="443" textAnchor="middle" fill="#eaf4fb" fontSize="13" fontWeight="700">{o}</text>
          </g>
        ))}

        {/* spectrum */}
        <rect x="150" y="500" width="900" height="10" rx="5" fill="url(#vdbRagSpectrum)" opacity="0.85" />
        <text x="150" y="535" textAnchor="start" fill="#c9f7e3" fontSize="12" fontWeight="700">Self-hosted, open source</text>
        <text x="150" y="552" textAnchor="start" fill="#8fb8cc" fontSize="10.5">pgvector · Chroma · Qdrant · Weaviate · Milvus — you run it, you tune it</text>
        <text x="1050" y="535" textAnchor="end" fill="#bfdbfe" fontSize="12" fontWeight="700">Fully managed</text>
        <text x="1050" y="552" textAnchor="end" fill="#8fb8cc" fontSize="10.5">Pinecone — plus cloud tiers of most OSS options</text>

        <text x="600" y="596" textAnchor="middle" fill="#8fb8cc" fontSize="11.5">
          Prototype on pgvector or Chroma · scale + filtering on Qdrant / Weaviate / Milvus · zero-ops on a managed service
        </text>
      </svg>
    </div>
  );
};

export default VectorDbRagHeroDiagram;
