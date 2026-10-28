const RagPillarHeroDiagram = () => {
  return (
    <div className="mb-8 sm:mb-10 rounded-xl overflow-hidden border border-border bg-gradient-to-br from-background to-muted/30">
      <svg
        viewBox="0 0 1200 560"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label="RAG pipeline diagram: a user query is embedded, matched against a vector database holding chunked documents, the top chunks are retrieved, and an LLM generates a cited answer from the query plus retrieved context"
      >
        <defs>
          <linearGradient id="ragBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a1025" />
            <stop offset="100%" stopColor="#120a1c" />
          </linearGradient>
          <linearGradient id="ragNode" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#5b21b6" />
          </linearGradient>
        </defs>
        <rect width="1200" height="560" fill="url(#ragBg)" />

        <text x="40" y="50" fill="#e9d5ff" fontSize="22" fontWeight="700" fontFamily="sans-serif">Retrieval-Augmented Generation (RAG)</text>

        <rect x="40" y="220" width="180" height="90" rx="12" fill="url(#ragNode)" />
        <text x="130" y="255" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="600" fontFamily="sans-serif">User Query</text>
        <text x="130" y="280" textAnchor="middle" fill="#e9d5ff" fontSize="12" fontFamily="sans-serif">"How does X work?"</text>

        <path d="M220 265 L300 265" stroke="#a78bfa" strokeWidth="3" markerEnd="url(#arrow)" />

        <rect x="300" y="220" width="180" height="90" rx="12" fill="#2e1065" stroke="#7c3aed" strokeWidth="2" />
        <text x="390" y="255" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="600" fontFamily="sans-serif">Embedding Model</text>
        <text x="390" y="280" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontFamily="sans-serif">query → vector</text>

        <path d="M480 265 L560 265" stroke="#a78bfa" strokeWidth="3" markerEnd="url(#arrow)" />

        <rect x="560" y="140" width="200" height="110" rx="12" fill="#2e1065" stroke="#7c3aed" strokeWidth="2" />
        <text x="660" y="170" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="600" fontFamily="sans-serif">Vector Database</text>
        <text x="660" y="195" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontFamily="sans-serif">chunked documents</text>
        <text x="660" y="215" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontFamily="sans-serif">similarity search (ANN)</text>
        <text x="660" y="235" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontFamily="sans-serif">top-k chunks returned</text>

        <path d="M660 250 L660 300" stroke="#a78bfa" strokeWidth="3" markerEnd="url(#arrow)" />

        <rect x="560" y="310" width="200" height="90" rx="12" fill="url(#ragNode)" />
        <text x="660" y="345" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="600" fontFamily="sans-serif">Retrieved Context</text>
        <text x="660" y="370" textAnchor="middle" fill="#e9d5ff" fontSize="12" fontFamily="sans-serif">k relevant chunks + metadata</text>

        <path d="M760 355 L840 355" stroke="#a78bfa" strokeWidth="3" markerEnd="url(#arrow)" />
        <path d="M130 310 L130 420 L840 420 L840 400" stroke="#6d28d9" strokeWidth="2" fill="none" strokeDasharray="4 4" />

        <rect x="840" y="300" width="220" height="110" rx="12" fill="#2e1065" stroke="#7c3aed" strokeWidth="2" />
        <text x="950" y="330" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="600" fontFamily="sans-serif">LLM Generator</text>
        <text x="950" y="355" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontFamily="sans-serif">query + retrieved chunks</text>
        <text x="950" y="375" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontFamily="sans-serif">→ grounded, cited answer</text>
        <text x="950" y="395" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontFamily="sans-serif">in the prompt, not the weights</text>

        <path d="M950 410 L950 460" stroke="#a78bfa" strokeWidth="3" markerEnd="url(#arrow)" />

        <rect x="840" y="460" width="220" height="70" rx="12" fill="url(#ragNode)" />
        <text x="950" y="500" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="600" fontFamily="sans-serif">Cited Answer</text>

        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#a78bfa" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default RagPillarHeroDiagram;
