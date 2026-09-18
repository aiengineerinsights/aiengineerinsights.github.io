// Hero diagram for the "RAG vs Fine-Tuning" post. Pure inline SVG so it
// prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630). Shows the core distinction: RAG changes what the model
// sees (retrieval at inference time), fine-tuning changes the model itself
// (weights updated ahead of time) — plus the hybrid pattern most 2026
// production systems land on.
const RagVsFineTuningHeroDiagram = () => {
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="RAG vs fine-tuning compared. Left column: RAG — a user query is embedded, a retriever searches a vector database for relevant document chunks, and those chunks are injected into the prompt so a frozen, unchanged model generates a grounded, citable answer. RAG changes what the model sees at inference time and updates instantly when the underlying documents change. Right column: fine-tuning — labeled input/output examples are used in a training run that updates the model's own weights ahead of time, producing a model that has internalized a tone, format, or narrow task, but whose knowledge is frozen at training time. Bottom band: the 2026 production default is a hybrid — fine-tune for behavior (tone, structured output), RAG for facts (current, cited knowledge)."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="ragBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="ragArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#ragBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          RAG VS FINE-TUNING
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          RAG changes what the model sees · fine-tuning changes the model itself
        </text>

        {/* Column headers */}
        <text x="300" y="106" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="800">RAG — inference time</text>
        <text x="900" y="106" textAnchor="middle" fill="#f0abfc" fontSize="14" fontWeight="800">FINE-TUNING — training time</text>

        {/* RAG pipeline (left) */}
        <g>
          <rect x="80" y="130" width="440" height="52" rx="10" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
          <text x="100" y="162" fill="#eaf4fb" fontSize="14" fontWeight="700">1. User query → embedded to a vector</text>

          <line x1="300" y1="182" x2="300" y2="206" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#ragArrow)" />
          <rect x="80" y="206" width="440" height="52" rx="10" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
          <text x="100" y="238" fill="#eaf4fb" fontSize="14" fontWeight="700">2. Retriever searches the vector database</text>

          <line x1="300" y1="258" x2="300" y2="282" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#ragArrow)" />
          <rect x="80" y="282" width="440" height="52" rx="10" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
          <text x="100" y="314" fill="#eaf4fb" fontSize="14" fontWeight="700">3. Relevant chunks injected into the prompt</text>

          <line x1="300" y1="334" x2="300" y2="358" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#ragArrow)" />
          <rect x="80" y="358" width="440" height="58" rx="10" fill="#0b1a15" stroke="#059669" strokeWidth="1.8" />
          <text x="100" y="384" fill="#6ee7b7" fontSize="14" fontWeight="800">4. Frozen model generates a cited answer</text>
          <text x="100" y="402" fill="#9fe8da" fontSize="11">weights unchanged · knowledge updates instantly</text>
        </g>

        {/* Fine-tuning pipeline (right) */}
        <g>
          <rect x="680" y="130" width="440" height="52" rx="10" fill="#180e24" stroke="#a855f7" strokeWidth="1.6" />
          <text x="700" y="162" fill="#eaf4fb" fontSize="14" fontWeight="700">1. Labeled input/output example pairs</text>

          <line x1="900" y1="182" x2="900" y2="206" stroke="#4a3a63" strokeWidth="1.6" markerEnd="url(#ragArrow)" />
          <rect x="680" y="206" width="440" height="52" rx="10" fill="#180e24" stroke="#a855f7" strokeWidth="1.6" />
          <text x="700" y="238" fill="#eaf4fb" fontSize="14" fontWeight="700">2. Training run updates model weights</text>

          <line x1="900" y1="258" x2="900" y2="282" stroke="#4a3a63" strokeWidth="1.6" markerEnd="url(#ragArrow)" />
          <rect x="680" y="282" width="440" height="52" rx="10" fill="#180e24" stroke="#a855f7" strokeWidth="1.6" />
          <text x="700" y="314" fill="#eaf4fb" fontSize="14" fontWeight="700">3. New checkpoint: a specialized model</text>

          <line x1="900" y1="334" x2="900" y2="358" stroke="#4a3a63" strokeWidth="1.6" markerEnd="url(#ragArrow)" />
          <rect x="680" y="358" width="440" height="58" rx="10" fill="#241328" stroke="#d946ef" strokeWidth="1.8" />
          <text x="700" y="384" fill="#f0abfc" fontSize="14" fontWeight="800">4. Consistent tone/format, no retrieval hop</text>
          <text x="700" y="402" fill="#e2bdf0" fontSize="11">behavior locked in · knowledge frozen at training time</text>
        </g>

        {/* bottom band: hybrid */}
        <rect x="48" y="470" width="1104" height="66" rx="14" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="600" y="497" textAnchor="middle" fill="#5eead4" fontSize="13.5" fontWeight="800">
          2026 PRODUCTION DEFAULT: HYBRID
        </text>
        <text x="600" y="519" textAnchor="middle" fill="#9fe8da" fontSize="12">
          fine-tune for behavior (tone, structured output) · RAG for facts (current, cited knowledge)
        </text>

        <text x="1152" y="570" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default RagVsFineTuningHeroDiagram;
