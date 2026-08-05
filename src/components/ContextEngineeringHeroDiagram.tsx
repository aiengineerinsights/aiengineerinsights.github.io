// Hero diagram for the context-engineering / GrapeRoot post: the contrast
// between an AI assistant EXPLORING a codebase (default) vs having the right
// context PRELOADED (GrapeRoot). Pure inline SVG — prerenders statically.
const ContextEngineeringHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0b0714]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="Two approaches to giving an AI coding assistant context. Default: the AI explores the codebase itself — reading files and calling tools across many turns before it can answer, burning tokens. GrapeRoot: a semantic graph of the codebase preloads exactly the relevant files into the prompt, so the AI reasons from turn one. Benchmarks: cost per prompt drops from $0.49 to $0.27 and turns from 11.7 to 3.5."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="ceBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b0714" /><stop offset="60%" stopColor="#140a26" /><stop offset="100%" stopColor="#1a0f33" />
        </linearGradient>
        <linearGradient id="ceExplore" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7c2d3a" /><stop offset="100%" stopColor="#4a1220" /></linearGradient>
        <linearGradient id="ceGraph" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#15803d" /></linearGradient>
        <linearGradient id="cePreload" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#166534" /><stop offset="100%" stopColor="#14532d" /></linearGradient>
        <marker id="ceArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#a78bfa" />
        </marker>
        <marker id="ceArrowR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#f87171" />
        </marker>
      </defs>

      <rect width="1200" height="560" fill="url(#ceBg)" />
      <g fill="#a78bfa" opacity="0.06">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={30 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="46" textAnchor="middle" fill="#c4b5fd" fontSize="15" fontWeight="700" letterSpacing="2">
        CONTEXT ENGINEERING — CURATE THE CONTEXT, DON'T MAKE THE AI HUNT FOR IT
      </text>
      <line x1="600" y1="70" x2="600" y2="500" stroke="#312152" strokeWidth="1.5" strokeDasharray="4 6" />

      {/* LEFT — default: explore */}
      <text x="300" y="98" textAnchor="middle" fill="#fca5a5" fontSize="15" fontWeight="800">DEFAULT · your AI explores</text>
      <rect x="70" y="118" width="460" height="52" rx="10" fill="#171226" stroke="#7c2d3a" strokeWidth="1.2" />
      <text x="300" y="150" textAnchor="middle" fill="#e7c9c9" fontSize="13.5">You ask a question — the AI has no idea where anything is</text>
      {[
        { y: 186, t: "grep / search the repo" },
        { y: 232, t: "read a file → call a tool → read more" },
        { y: 278, t: "decide what else to look up → repeat" },
        { y: 324, t: "finally has enough context to answer" },
      ].map((s, i) => (
        <g key={s.y}>
          <rect x="110" y={s.y} width="380" height="36" rx="8" fill="url(#ceExplore)" stroke="#9f1239" strokeWidth="1" />
          <text x="300" y={s.y + 23} textAnchor="middle" fill="#fecdd3" fontSize="13">{s.t}</text>
          {i < 3 && <path d={`M 300 ${s.y + 36} L 300 ${s.y + 46}`} stroke="#f87171" strokeWidth="1.8" markerEnd="url(#ceArrowR)" />}
        </g>
      ))}
      <rect x="110" y="374" width="380" height="44" rx="8" fill="#2a1015" stroke="#dc2626" strokeWidth="1.3" />
      <text x="300" y="401" textAnchor="middle" fill="#fca5a5" fontSize="13.5" fontWeight="700">~11.7 turns · $0.49 / prompt · tokens burned exploring</text>

      {/* RIGHT — GrapeRoot: preload */}
      <text x="900" y="98" textAnchor="middle" fill="#86efac" fontSize="15" fontWeight="800">GRAPEROOT · context preloaded</text>
      <rect x="670" y="118" width="460" height="52" rx="10" fill="#171226" stroke="#15803d" strokeWidth="1.2" />
      <text x="900" y="150" textAnchor="middle" fill="#cff0d8" fontSize="13.5">Semantic graph of the codebase (files · symbols · imports)</text>
      <path d="M 900 170 L 900 190" stroke="#a78bfa" strokeWidth="1.8" markerEnd="url(#ceArrow)" />

      <rect x="740" y="192" width="320" height="70" rx="12" fill="url(#ceGraph)" stroke="#a78bfa" strokeWidth="1.6" />
      <text x="900" y="222" textAnchor="middle" fill="#ffffff" fontSize="14.5" fontWeight="800">Graph ranks the RELEVANT files</text>
      <text x="900" y="244" textAnchor="middle" fill="#ede9fe" fontSize="12.5">and packs them into the prompt — before the AI sees it</text>
      <path d="M 900 262 L 900 282" stroke="#a78bfa" strokeWidth="1.8" markerEnd="url(#ceArrow)" />

      <rect x="740" y="284" width="320" height="50" rx="10" fill="url(#cePreload)" stroke="#22c55e" strokeWidth="1.3" />
      <text x="900" y="314" textAnchor="middle" fill="#dcfce7" fontSize="13.5" fontWeight="700">AI reasons from turn one — no hunting</text>

      <rect x="740" y="352" width="320" height="44" rx="8" fill="#0f2a1a" stroke="#22c55e" strokeWidth="1.3" />
      <text x="900" y="373" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700">~3.5 turns · $0.27 / prompt · savings compound</text>
      <text x="900" y="388" textAnchor="middle" fill="#4ade80" fontSize="11">each turn remembers what was already loaded</text>

      <text x="600" y="470" textAnchor="middle" fill="#c4b5fd" fontSize="13.5" fontWeight="700">
        Same model, same question — the difference is what's already in the context window.
      </text>
      <text x="600" y="496" textAnchor="middle" fill="#7c6f9e" fontSize="11.5">
        Benchmarks: 7,700+ files, 50+ prompts · GrapeRoot (Apache 2.0, local). Source: graperoot.dev
      </text>
    </svg>
  </div>
);

export default ContextEngineeringHeroDiagram;
