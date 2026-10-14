// Hero diagram for the "AI Agent Memory" post. Pure inline SVG (prerenders
// to crawler-visible markup, doubles as the OG image at 1200x630). Shows the
// short-term vs long-term memory split around an agent core: context window
// (sliding window + summarization) feeding the LLM, backed by long-term
// stores (vector retrieval, knowledge graph) that read/write through a
// memory manager — the architecture "ai agent memory" searchers want.
const AgentMemoryHeroDiagram = () => {
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 560"
        role="img"
        aria-label="AI agent memory architecture: short-term memory (the context window, managed with sliding windows and summarization/compression) feeds the LLM reasoning core on every turn. A memory manager reads and writes long-term memory, split between a vector store for semantic retrieval and a knowledge graph for temporal, relationship-aware facts (the approach used by Zep/Graphiti). Tools like Mem0, Letta (MemGPT), and LangMem implement this loop so an agent can recall relevant facts across sessions without re-reading its entire history."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="amBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="amArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="560" fill="url(#amBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 12 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 42} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="42" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          AI AGENT MEMORY ARCHITECTURE
        </text>
        <text x="600" y="65" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          short-term context window + long-term retrieval, read and written by a memory manager
        </text>

        {/* Short-term memory block (left) */}
        <rect x="48" y="96" width="330" height="190" rx="14" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.8" />
        <text x="68" y="126" fill="#93c5fd" fontSize="15" fontWeight="800">SHORT-TERM MEMORY</text>
        <text x="68" y="146" fill="#9db6c6" fontSize="11.5">the context window — bounded, in every call</text>
        <rect x="68" y="160" width="290" height="40" rx="8" fill="#12202b" stroke="#334b59" />
        <text x="82" y="176" fill="#c3d4de" fontSize="11.5">Sliding window</text>
        <text x="82" y="192" fill="#8fa6b4" fontSize="10.5">keep only the most recent N turns</text>
        <rect x="68" y="208" width="290" height="40" rx="8" fill="#12202b" stroke="#334b59" />
        <text x="82" y="224" fill="#c3d4de" fontSize="11.5">Summarization / compression</text>
        <text x="82" y="240" fill="#8fa6b4" fontSize="10.5">an LLM rewrites older turns into a summary</text>
        <text x="68" y="268" fill="#f0a35b" fontSize="11">↳ loses detail; everything still costs tokens</text>

        {/* Center LLM core */}
        <rect x="430" y="140" width="340" height="110" rx="16" fill="#0e1a24" stroke="#38bdf8" strokeWidth="2" />
        <text x="600" y="178" textAnchor="middle" fill="#e6f6ff" fontSize="17" fontWeight="800">LLM REASONING CORE</text>
        <text x="600" y="200" textAnchor="middle" fill="#9db6c6" fontSize="12">reads memory, decides the next action</text>
        <text x="600" y="222" textAnchor="middle" fill="#9fe8da" fontSize="11">current turn + retrieved context only</text>

        <g stroke="#5b7488" strokeWidth="2.2" fill="none" markerEnd="url(#amArrow)">
          <path d="M380,195 L428,195" />
          <path d="M772,195 L870,195" />
        </g>

        {/* Memory manager */}
        <rect x="870" y="150" width="282" height="90" rx="14" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.5" />
        <text x="1011" y="180" textAnchor="middle" fill="#5eead4" fontSize="13.5" fontWeight="800">MEMORY MANAGER</text>
        <text x="1011" y="200" textAnchor="middle" fill="#9fe8da" fontSize="10.5">extracts, writes, retrieves facts</text>
        <text x="1011" y="217" textAnchor="middle" fill="#7fb0c8" fontSize="10">Mem0 · Letta · LangMem · Zep</text>

        <g stroke="#0f766e" strokeWidth="2" fill="none" markerEnd="url(#amArrow)">
          <path d="M1011,240 C1011,300 1011,320 900,340" />
          <path d="M900,420 C1011,440 1011,460 1011,480" />
        </g>

        {/* Long-term memory: vector store + knowledge graph */}
        <rect x="48" y="340" width="520" height="150" rx="14" fill="#0e1a24" stroke="#059669" strokeWidth="1.8" />
        <text x="68" y="370" fill="#6ee7b7" fontSize="15" fontWeight="800">LONG-TERM MEMORY</text>
        <text x="68" y="390" fill="#9db6c6" fontSize="11.5">persists across sessions, retrieved on demand</text>

        <rect x="68" y="404" width="230" height="68" rx="10" fill="#12202b" stroke="#334b59" />
        <text x="82" y="424" fill="#c3d4de" fontSize="12" fontWeight="700">Vector retrieval</text>
        <text x="82" y="442" fill="#8fa6b4" fontSize="10.5">embed + nearest-neighbour search</text>
        <text x="82" y="458" fill="#8fa6b4" fontSize="10.5">e.g. Mem0's extracted facts</text>

        <rect x="310" y="404" width="230" height="68" rx="10" fill="#12202b" stroke="#334b59" />
        <text x="324" y="424" fill="#c3d4de" fontSize="12" fontWeight="700">Knowledge graph</text>
        <text x="324" y="442" fill="#8fa6b4" fontSize="10.5">entities, relationships, time-stamped facts</text>
        <text x="324" y="458" fill="#8fa6b4" fontSize="10.5">e.g. Zep / Graphiti</text>

        {/* Tools band */}
        <rect x="620" y="340" width="532" height="150" rx="14" fill="#140e24" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="640" y="370" fill="#c4b5fd" fontSize="15" fontWeight="800">WHEN TO REACH FOR EACH</text>
        <text x="640" y="396" fill="#c3d4de" fontSize="11.5">• Context/RAG alone: single session, facts don't need to persist</text>
        <text x="640" y="418" fill="#c3d4de" fontSize="11.5">• Long-term memory: multi-session personalization, facts that change</text>
        <text x="640" y="440" fill="#c3d4de" fontSize="11.5">• Knowledge graph: relationships matter and facts need a "when"</text>
        <text x="640" y="462" fill="#c3d4de" fontSize="11.5">• Hybrid: most production agents use short + long term together</text>

        <text x="1152" y="520" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default AgentMemoryHeroDiagram;
