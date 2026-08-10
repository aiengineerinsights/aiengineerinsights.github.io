// Hero diagram for the "Is Hermes Agent safe?" security explainer. Pure inline SVG:
// prerenders to static markup, zero runtime cost, crawler-visible. Shows Hermes's
// five-layer defense-in-depth stack wrapping the agent's execution, plus the
// pluggable sandbox backends the isolation layer can run on.
const HermesSecurityHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0b0714]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="Hermes Agent security model: five concentric defense-in-depth layers wrap the agent's execution core — layer 1 user authorization, layer 2 dangerous-command approval, layer 3 container and sandbox isolation, layer 4 credential filtering, and layer 5 context scanning. The isolation layer runs on pluggable sandbox backends: Local, Docker, SSH, Singularity, Modal, and Daytona."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="hsBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b0714" />
          <stop offset="55%" stopColor="#120a26" />
          <stop offset="100%" stopColor="#1a0f33" />
        </linearGradient>
        <linearGradient id="hsCore" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <marker id="hsArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#a78bfa" />
        </marker>
      </defs>

      <rect width="1200" height="560" fill="url(#hsBg)" />
      <g fill="#a78bfa" opacity="0.07">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={26 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="46" textAnchor="middle" fill="#e9e4f8" fontSize="18" fontWeight="800" letterSpacing="1">
        DEFENSE IN DEPTH · SECURE BY DEFAULT
      </text>

      {/* Concentric defense-in-depth rings wrapping the execution core (left side) */}
      {[
        { rx: 250, ry: 210, stroke: "#3b1d6e", n: "1", label: "User authorization", lx: 400, ly: 92 },
        { rx: 205, ry: 172, stroke: "#4c1d95", n: "2", label: "Dangerous-command approval", lx: 400, ly: 132 },
        { rx: 160, ry: 134, stroke: "#5b21b6", n: "3", label: "Container / sandbox isolation", lx: 400, ly: 172 },
        { rx: 115, ry: 96, stroke: "#6d28d9", n: "4", label: "Credential filtering", lx: 400, ly: 212 },
        { rx: 70, ry: 58, stroke: "#7c3aed", n: "5", label: "Context scanning", lx: 400, ly: 252 },
      ].map((ring) => (
        <ellipse
          key={ring.n}
          cx="400"
          cy="300"
          rx={ring.rx}
          ry={ring.ry}
          fill="none"
          stroke={ring.stroke}
          strokeWidth="2.2"
          opacity="0.9"
        />
      ))}

      {/* Execution core at center of the rings */}
      <rect x="336" y="272" width="128" height="56" rx="14" fill="#150e2b" stroke="url(#hsCore)" strokeWidth="2.4" />
      <text x="400" y="298" textAnchor="middle" fill="#f5f3ff" fontSize="14" fontWeight="800">Agent</text>
      <text x="400" y="317" textAnchor="middle" fill="#cabff0" fontSize="11.5">runs commands + keys</text>

      {/* Ring legend (right of the rings, numbered layers) */}
      {[
        { y: 96, n: "1", label: "User authorization", sub: "who may drive the agent" },
        { y: 150, n: "2", label: "Dangerous-command approval", sub: "you confirm risky actions" },
        { y: 204, n: "3", label: "Container / sandbox isolation", sub: "sandboxed by default" },
        { y: 258, n: "4", label: "Credential filtering", sub: "secrets kept out of context" },
        { y: 312, n: "5", label: "Context scanning", sub: "inspects what flows in" },
      ].map((layer) => (
        <g key={layer.n}>
          <rect x="700" y={layer.y} width="440" height="46" rx="12" fill="#171226" stroke="#6d28d9" strokeWidth="1.3" />
          <circle cx="726" cy={layer.y + 23} r="13" fill="#4c1d95" stroke="#a78bfa" strokeWidth="1.3" />
          <text x="726" y={layer.y + 28} textAnchor="middle" fill="#f5f3ff" fontSize="14" fontWeight="800">{layer.n}</text>
          <text x="750" y={layer.y + 20} fill="#f5f3ff" fontSize="14" fontWeight="700">{layer.label}</text>
          <text x="750" y={layer.y + 38} fill="#b9aede" fontSize="12">{layer.sub}</text>
        </g>
      ))}

      {/* Pluggable sandbox backends (bottom band) — the layer-3 isolation options */}
      <text x="600" y="472" textAnchor="middle" fill="#c4b5fd" fontSize="12.5" fontWeight="700" letterSpacing="1">
        LAYER 3 · PLUGGABLE SANDBOX BACKENDS
      </text>
      {["Local", "Docker", "SSH", "Singularity", "Modal", "Daytona"].map((backend, i) => (
        <g key={backend}>
          <rect x={116 + i * 162} y="490" width="146" height="40" rx="10" fill="#150e2b" stroke="#6d28d9" strokeWidth="1.4" />
          <text x={116 + i * 162 + 73} y="515" textAnchor="middle" fill="#e9e4f8" fontSize="13.5" fontWeight="700" fontFamily="monospace">
            {backend}
          </text>
        </g>
      ))}

      <text x="1152" y="548" textAnchor="end" fill="#6d5f9e" fontSize="11">
        aiengineerinsights.com
      </text>
    </svg>
  </div>
);

export default HermesSecurityHeroDiagram;
