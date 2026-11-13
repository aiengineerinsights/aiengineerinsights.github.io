// Hero diagram for the "How to install Hermes Agent" how-to. Pure inline SVG:
// prerenders to static markup, zero runtime cost, crawler-visible. Shows the five
// install paths converging on one agent core, then the first-run sequence.
const HermesInstallHeroDiagram = () => (
  <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="How to install Hermes Agent: five install paths — Desktop app, CLI install script, pip, Docker, and Windows PowerShell — all converge on one Hermes Agent core, then first run: pick a model with hermes model, then start with hermes --tui."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="hiBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0c0b" />
          <stop offset="55%" stopColor="#0f0f0e" />
          <stop offset="100%" stopColor="#151514" />
        </linearGradient>
        <linearGradient id="hiCore" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4A6F5" />
          <stop offset="100%" stopColor="#3f2767" />
        </linearGradient>
        <marker id="hiArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#C4A6F5" />
        </marker>
        <radialGradient id="hiGlowR" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#C4A6F5" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#C4A6F5" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="560" fill="url(#hiBg)" />
      <g fill="#C4A6F5" opacity="0.07">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={26 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="46" textAnchor="middle" fill="#efefed" fontSize="18" fontWeight="800" letterSpacing="1">
        FIVE WAYS TO INSTALL · ONE AGENT
      </text>

      {/* Install method cards (left column) */}
      {[
        { y: 88, label: "Desktop app", sub: "macOS / Windows installer" },
        { y: 156, label: "CLI script", sub: "curl install.sh | bash" },
        { y: 224, label: "pip", sub: "pip install hermes-agent" },
        { y: 292, label: "Docker", sub: "nousresearch/hermes-agent" },
        { y: 360, label: "Windows PowerShell", sub: "iex (irm install.ps1)" },
      ].map((m) => (
        <g key={m.label}>
          <rect x="60" y={m.y} width="300" height="52" rx="12" fill="#121211" stroke="#C4A6F5" strokeWidth="1.4" />
          <text x="82" y={m.y + 22} fill="#f9f9f9" fontSize="15" fontWeight="700">{m.label}</text>
          <text x="82" y={m.y + 41} fill="#C4A6F5" fontSize="12.5" fontFamily="monospace">{m.sub}</text>
          <path d={`M 360 ${m.y + 26} C 430 ${m.y + 26}, 470 286, 540 286`} stroke="#4d2f7d" strokeWidth="1.4" fill="none" opacity="0.85" />
        </g>
      ))}

      {/* Core */}
      <ellipse cx="700" cy="286" rx="200" ry="120" fill="url(#hiGlowR)" />
      <rect x="540" y="212" width="320" height="148" rx="18" fill="#121211" stroke="url(#hiCore)" strokeWidth="2.4" />
      <text x="700" y="250" textAnchor="middle" fill="#f9f9f9" fontSize="20" fontWeight="800">Hermes Agent</text>
      <text x="700" y="284" textAnchor="middle" fill="#C4A6F5" fontSize="13.5">one core · one memory</text>
      <text x="700" y="308" textAnchor="middle" fill="#C4A6F5" fontSize="13.5">config in ~/.hermes/</text>
      <text x="700" y="336" textAnchor="middle" fill="#a29f95" fontSize="12" fontStyle="italic">MIT · free · self-hosted</text>

      {/* First run sequence (right) */}
      <path d="M 860 286 L 936 286" stroke="#C4A6F5" strokeWidth="2.2" markerEnd="url(#hiArrow)" />
      <text x="1050" y="150" textAnchor="middle" fill="#dcdad6" fontSize="13" fontWeight="700" letterSpacing="1">FIRST RUN</text>
      {[
        { y: 176, n: "1", cmd: "hermes model", note: "pick provider + key" },
        { y: 244, n: "2", cmd: "hermes --tui", note: "start chatting" },
        { y: 312, n: "3", cmd: "hermes doctor", note: "verify / debug" },
      ].map((s) => (
        <g key={s.n}>
          <rect x="940" y={s.y} width="220" height="56" rx="12" fill="#121211" stroke="#C4A6F5" strokeWidth="1.3" />
          <circle cx="966" cy={s.y + 28} r="13" fill="#3f2767" stroke="#C4A6F5" strokeWidth="1.3" />
          <text x="966" y={s.y + 33} textAnchor="middle" fill="#f9f9f9" fontSize="14" fontWeight="800">{s.n}</text>
          <text x="988" y={s.y + 24} fill="#f9f9f9" fontSize="14" fontWeight="700" fontFamily="monospace">{s.cmd}</text>
          <text x="988" y={s.y + 43} fill="#C4A6F5" fontSize="12">{s.note}</text>
        </g>
      ))}
      <path d="M 1050 232 L 1050 244" stroke="#C4A6F5" strokeWidth="2" markerEnd="url(#hiArrow)" />
      <path d="M 1050 300 L 1050 312" stroke="#C4A6F5" strokeWidth="2" markerEnd="url(#hiArrow)" />

      <text x="600" y="452" textAnchor="middle" fill="#a29f95" fontSize="12.5">
        Windows: native PowerShell install, or run the Linux script under WSL2
      </text>
      <text x="1152" y="548" textAnchor="end" fill="#878376" fontSize="11">
        aiengineerinsights.com
      </text>
    </svg>
  </div>
);

export default HermesInstallHeroDiagram;
