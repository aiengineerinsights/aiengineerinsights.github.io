// Hero diagram for the "Hermes Desktop app & Web UI" how-to. Pure inline SVG:
// prerenders to static markup, zero runtime cost, crawler-visible. Shows the three
// ways to use Hermes — CLI/TUI, Desktop app (GUI), and the Web dashboard in a browser
// at 127.0.0.1:9119 — all sitting on top of one shared agent core and one memory.
const HermesDesktopHeroDiagram = () => (
  <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="Three ways to use Hermes Agent — a terminal CLI/TUI, a native Desktop app (GUI), and a Web dashboard opened in a browser at http://127.0.0.1:9119 via the hermes dashboard command — all sit on top of one shared Hermes agent core and one memory stored in ~/.hermes."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="hdBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0c0b" />
          <stop offset="55%" stopColor="#0f0f0e" />
          <stop offset="100%" stopColor="#151514" />
        </linearGradient>
        <linearGradient id="hdCore" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4A6F5" />
          <stop offset="100%" stopColor="#3f2767" />
        </linearGradient>
        <marker id="hdArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#C4A6F5" />
        </marker>
        <radialGradient id="hdGlowR" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#C4A6F5" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#C4A6F5" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="560" fill="url(#hdBg)" />
      <g fill="#C4A6F5" opacity="0.07">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={26 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="46" textAnchor="middle" fill="#efefed" fontSize="18" fontWeight="800" letterSpacing="1">
        THREE WAYS TO USE HERMES · ONE CORE · ONE MEMORY
      </text>

      {/* Three surfaces (top row) */}
      {[
        { x: 90, label: "CLI / TUI", sub: "hermes --tui", note: "terminal, keyboard-first" },
        { x: 450, label: "Desktop app", sub: "GUI installer · macOS / Windows", note: "preview pane · voice · no terminal" },
        { x: 810, label: "Web dashboard", sub: "hermes dashboard", note: "127.0.0.1:9119 · browser UI" },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x} y="82" width="300" height="96" rx="14" fill="#121211" stroke="#C4A6F5" strokeWidth="1.6" />
          <text x={s.x + 24} y="116" fill="#f9f9f9" fontSize="17" fontWeight="800">{s.label}</text>
          <text x={s.x + 24} y="140" fill="#dcdad6" fontSize="13" fontFamily="monospace">{s.sub}</text>
          <text x={s.x + 24} y="162" fill="#C4A6F5" fontSize="12">{s.note}</text>
          <path d={`M ${s.x + 150} 178 C ${s.x + 150} 226, 600 236, 600 286`} stroke="#4d2f7d" strokeWidth="1.5" fill="none" opacity="0.85" markerEnd="url(#hdArrow)" />
        </g>
      ))}

      {/* Shared core */}
      <ellipse cx="600" cy="360" rx="230" ry="120" fill="url(#hdGlowR)" />
      <rect x="410" y="292" width="380" height="150" rx="18" fill="#121211" stroke="url(#hdCore)" strokeWidth="2.4" />
      <text x="600" y="332" textAnchor="middle" fill="#f9f9f9" fontSize="21" fontWeight="800">Hermes Agent core</text>
      <text x="600" y="364" textAnchor="middle" fill="#C4A6F5" fontSize="13.5">one agent · one memory</text>
      <text x="600" y="388" textAnchor="middle" fill="#C4A6F5" fontSize="13.5">config &amp; secrets in ~/.hermes/</text>
      <text x="600" y="416" textAnchor="middle" fill="#a29f95" fontSize="12" fontStyle="italic">MIT · free · runs locally</text>

      {/* Local server note under the dashboard path */}
      <rect x="836" y="466" width="316" height="60" rx="12" fill="#121211" stroke="#3f2767" strokeWidth="1.3" />
      <text x="994" y="490" textAnchor="middle" fill="#dcdad6" fontSize="12.5" fontWeight="700">Web dashboard = local server</text>
      <text x="994" y="510" textAnchor="middle" fill="#C4A6F5" fontSize="12" fontFamily="monospace">FastAPI + React 19 · data stays local</text>

      <text x="600" y="510" textAnchor="middle" fill="#a29f95" fontSize="12.5">
        Switch surfaces anytime — the same sessions, skills, and memory follow you
      </text>
      <text x="48" y="510" fill="#878376" fontSize="11">aiengineerinsights.com</text>
    </svg>
  </div>
);

export default HermesDesktopHeroDiagram;
