// Hero diagram for the "Hermes Agent troubleshooting" support post. Pure inline SVG:
// prerenders to static markup, zero runtime cost, crawler-visible. Shows the diagnostic
// flow — a symptom feeds into `hermes doctor`, which fans out to the common failure
// branches, each landing on a concrete fix.
const HermesTroubleshootingHeroDiagram = () => (
  <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="Hermes Agent troubleshooting flow: a symptom feeds into the hermes doctor diagnostic command, which branches into the five most common causes — PATH / shell reload, context-window too small, provider / auth keys, Windows / WSL2 install, and Docker persistence — and each branch resolves to a concrete fix."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="htBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0c0b" />
          <stop offset="55%" stopColor="#0f0f0e" />
          <stop offset="100%" stopColor="#151514" />
        </linearGradient>
        <linearGradient id="htCore" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4A6F5" />
          <stop offset="100%" stopColor="#3f2767" />
        </linearGradient>
        <marker id="htArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#C4A6F5" />
        </marker>
        <radialGradient id="htGlowR" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#C4A6F5" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#C4A6F5" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="560" fill="url(#htBg)" />
      <g fill="#C4A6F5" opacity="0.07">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={26 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="46" textAnchor="middle" fill="#efefed" fontSize="18" fontWeight="800" letterSpacing="1">
        SYMPTOM → HERMES DOCTOR → FIX
      </text>

      {/* Symptom (far left) */}
      <rect x="52" y="248" width="150" height="64" rx="12" fill="#121211" stroke="#C4A6F5" strokeWidth="1.4" />
      <text x="127" y="278" textAnchor="middle" fill="#f9f9f9" fontSize="15" fontWeight="700">Symptom</text>
      <text x="127" y="298" textAnchor="middle" fill="#C4A6F5" fontSize="12">something broke</text>
      <path d="M 202 280 L 258 280" stroke="#C4A6F5" strokeWidth="2.2" markerEnd="url(#htArrow)" />

      {/* hermes doctor core */}
      <ellipse cx="360" cy="280" rx="120" ry="96" fill="url(#htGlowR)" />
      <rect x="260" y="222" width="200" height="116" rx="18" fill="#121211" stroke="url(#htCore)" strokeWidth="2.4" />
      <text x="360" y="262" textAnchor="middle" fill="#f9f9f9" fontSize="17" fontWeight="800" fontFamily="monospace">hermes doctor</text>
      <text x="360" y="288" textAnchor="middle" fill="#C4A6F5" fontSize="12.5">run this first —</text>
      <text x="360" y="306" textAnchor="middle" fill="#C4A6F5" fontSize="12.5">diagnoses most issues</text>

      {/* Branches: cause card -> fix chip */}
      {[
        { y: 78, cause: "PATH / shell", fix: "source ~/.zshrc" },
        { y: 168, cause: "Context window", fix: "hermes model (64k+)" },
        { y: 258, cause: "Provider / auth", fix: "check ~/.hermes/.env" },
        { y: 348, cause: "Windows / WSL2", fix: "Admin PS or install.sh" },
        { y: 438, cause: "Docker persistence", fix: "-v ~/.hermes:/root/.hermes" },
      ].map((b) => (
        <g key={b.cause}>
          <path d={`M 460 280 C 540 280, 560 ${b.y + 26}, 640 ${b.y + 26}`} stroke="#4d2f7d" strokeWidth="1.5" fill="none" opacity="0.85" markerEnd="url(#htArrow)" />
          <rect x="640" y={b.y} width="228" height="52" rx="12" fill="#121211" stroke="#C4A6F5" strokeWidth="1.4" />
          <text x="662" y={b.y + 31} fill="#f9f9f9" fontSize="14.5" fontWeight="700">{b.cause}</text>
          <path d={`M 868 ${b.y + 26} L 908 ${b.y + 26}`} stroke="#C4A6F5" strokeWidth="2" markerEnd="url(#htArrow)" />
          <rect x="908" y={b.y} width="248" height="52" rx="12" fill="#121211" stroke="#3f2767" strokeWidth="1.4" />
          <text x="930" y={b.y + 31} fill="#C4A6F5" fontSize="12.5" fontFamily="monospace">{b.fix}</text>
        </g>
      ))}

      <text x="600" y="524" textAnchor="middle" fill="#a29f95" fontSize="12.5">
        Still stuck? hermes update, then re-run hermes doctor
      </text>
      <text x="1152" y="548" textAnchor="end" fill="#878376" fontSize="11">
        aiengineerinsights.com
      </text>
    </svg>
  </div>
);

export default HermesTroubleshootingHeroDiagram;
