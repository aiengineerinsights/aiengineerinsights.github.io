// Hero diagram for the "Which LLM to run with Hermes Agent" decision guide. Pure
// inline SVG: prerenders to static markup, zero runtime cost, crawler-visible.
// Shows Hermes as model-agnostic — many providers plug into one agent through a
// "min 64k context" gate, with `hermes model` as the selector.
const HermesModelsHeroDiagram = () => (
  <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="Hermes Agent is model-agnostic: five providers — Nous Portal, OpenRouter, OpenAI, Anthropic, and any compatible endpoint — plug into one Hermes Agent core through a minimum 64k-token context gate. The hermes model command is the selector that chooses which provider and model the agent runs."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="hmBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0c0b" />
          <stop offset="55%" stopColor="#0f0f0e" />
          <stop offset="100%" stopColor="#151514" />
        </linearGradient>
        <linearGradient id="hmCore" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4A6F5" />
          <stop offset="100%" stopColor="#3f2767" />
        </linearGradient>
        <marker id="hmArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#C4A6F5" />
        </marker>
        <radialGradient id="hmGlowR" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#C4A6F5" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#C4A6F5" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="560" fill="url(#hmBg)" />
      <g fill="#C4A6F5" opacity="0.07">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={26 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="46" textAnchor="middle" fill="#efefed" fontSize="18" fontWeight="800" letterSpacing="1">
        MANY PROVIDERS · ONE MODEL-AGNOSTIC AGENT
      </text>

      {/* Provider cards (left column) */}
      {[
        { y: 88, label: "Nous Portal", sub: "300+ models · hosted gateway" },
        { y: 156, label: "OpenRouter", sub: "many models · one API key" },
        { y: 224, label: "OpenAI", sub: "your own API key" },
        { y: 292, label: "Anthropic", sub: "your own API key" },
        { y: 360, label: "Any endpoint", sub: "OpenAI-compatible URL" },
      ].map((m) => (
        <g key={m.label}>
          <rect x="52" y={m.y} width="288" height="52" rx="12" fill="#121211" stroke="#C4A6F5" strokeWidth="1.4" />
          <text x="74" y={m.y + 22} fill="#f9f9f9" fontSize="15" fontWeight="700">{m.label}</text>
          <text x="74" y={m.y + 41} fill="#C4A6F5" fontSize="12" fontFamily="monospace">{m.sub}</text>
          <path d={`M 340 ${m.y + 26} C 380 ${m.y + 26}, 400 286, 452 286`} stroke="#4d2f7d" strokeWidth="1.4" fill="none" opacity="0.85" />
        </g>
      ))}

      {/* Context gate */}
      <g>
        <rect x="452" y="250" width="70" height="72" rx="10" fill="#161514" stroke="#C4A6F5" strokeWidth="1.6" strokeDasharray="4 3" />
        <text x="487" y="280" textAnchor="middle" fill="#efefed" fontSize="13" fontWeight="800">GATE</text>
        <text x="487" y="298" textAnchor="middle" fill="#dcdad6" fontSize="10.5" fontFamily="monospace">min</text>
        <text x="487" y="312" textAnchor="middle" fill="#dcdad6" fontSize="10.5" fontFamily="monospace">64k ctx</text>
      </g>
      <path d="M 522 286 L 566 286" stroke="#C4A6F5" strokeWidth="2.2" markerEnd="url(#hmArrow)" />

      {/* Core */}
      <ellipse cx="710" cy="286" rx="180" ry="118" fill="url(#hmGlowR)" />
      <rect x="570" y="214" width="300" height="146" rx="18" fill="#121211" stroke="url(#hmCore)" strokeWidth="2.4" />
      <text x="720" y="252" textAnchor="middle" fill="#f9f9f9" fontSize="20" fontWeight="800">Hermes Agent</text>
      <text x="720" y="284" textAnchor="middle" fill="#C4A6F5" fontSize="13.5">model-agnostic core</text>
      <text x="720" y="308" textAnchor="middle" fill="#C4A6F5" fontSize="13.5">model choice = config</text>
      <text x="720" y="336" textAnchor="middle" fill="#a29f95" fontSize="12" fontStyle="italic">not lock-in</text>

      {/* Selector (right) */}
      <path d="M 870 286 L 946 286" stroke="#C4A6F5" strokeWidth="2.2" markerEnd="url(#hmArrow)" />
      <text x="1055" y="214" textAnchor="middle" fill="#dcdad6" fontSize="13" fontWeight="700" letterSpacing="1">THE SELECTOR</text>
      <rect x="950" y="238" width="210" height="96" rx="14" fill="#121211" stroke="#C4A6F5" strokeWidth="1.6" />
      <text x="1055" y="272" textAnchor="middle" fill="#f9f9f9" fontSize="16" fontWeight="800" fontFamily="monospace">hermes model</text>
      <text x="1055" y="298" textAnchor="middle" fill="#C4A6F5" fontSize="12">choose provider + model</text>
      <text x="1055" y="318" textAnchor="middle" fill="#C4A6F5" fontSize="12">or: hermes setup --portal</text>

      <text x="600" y="452" textAnchor="middle" fill="#a29f95" fontSize="12.5">
        Below 64k tokens, the first messages error — pick a model that clears the gate
      </text>
      <text x="1152" y="548" textAnchor="end" fill="#878376" fontSize="11">
        aiengineerinsights.com
      </text>
    </svg>
  </div>
);

export default HermesModelsHeroDiagram;
