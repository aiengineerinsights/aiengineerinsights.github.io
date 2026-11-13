// Hero diagram for the "Is Hermes Agent safe?" security explainer. Pure inline SVG:
// prerenders to static markup, zero runtime cost, crawler-visible. Shows Hermes's
// five-layer defense-in-depth stack wrapping the agent's execution, plus the
// pluggable sandbox backends the isolation layer can run on.
const HermesSecurityHeroDiagram = () => (
  <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="Hermes Agent security model: five concentric defense-in-depth layers wrap the agent's execution core — layer 1 user authorization, layer 2 dangerous-command approval, layer 3 container and sandbox isolation, layer 4 credential filtering, and layer 5 context scanning. The isolation layer runs on pluggable sandbox backends: Local, Docker, SSH, Singularity, Modal, and Daytona."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="hsBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0c0b" />
          <stop offset="55%" stopColor="#0f0f0e" />
          <stop offset="100%" stopColor="#151514" />
        </linearGradient>
        <linearGradient id="hsCore" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4A6F5" />
          <stop offset="100%" stopColor="#3f2767" />
        </linearGradient>
        <marker id="hsArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#C4A6F5" />
        </marker>
      </defs>

      <rect width="1200" height="560" fill="url(#hsBg)" />
      <g fill="#C4A6F5" opacity="0.07">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={26 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="46" textAnchor="middle" fill="#efefed" fontSize="18" fontWeight="800" letterSpacing="1">
        DEFENSE IN DEPTH · SECURE BY DEFAULT
      </text>

      {/* Concentric defense-in-depth rings wrapping the execution core (left side) */}
      {[
        { rx: 244, ry: 180, o: 0.3, n: "1" },
        { rx: 204, ry: 148, o: 0.45, n: "2" },
        { rx: 164, ry: 116, o: 0.6, n: "3" },
        { rx: 124, ry: 84, o: 0.8, n: "4" },
        { rx: 84, ry: 52, o: 1, n: "5" },
      ].map((ring) => (
        <ellipse
          key={ring.n}
          cx="400"
          cy="265"
          rx={ring.rx}
          ry={ring.ry}
          fill="none"
          stroke="#C4A6F5"
          strokeWidth="2.2"
          opacity={ring.o}
        />
      ))}

      {/* Execution core at center of the rings */}
      <rect x="336" y="237" width="128" height="56" rx="14" fill="#121211" stroke="url(#hsCore)" strokeWidth="2.4" />
      <text x="400" y="263" textAnchor="middle" fill="#f9f9f9" fontSize="14" fontWeight="800">Agent</text>
      <text x="400" y="282" textAnchor="middle" fill="#C4A6F5" fontSize="11.5">runs commands + keys</text>

      {/* Ring legend (right of the rings, numbered layers) */}
      {[
        { y: 96, n: "1", label: "User authorization", sub: "who may drive the agent" },
        { y: 150, n: "2", label: "Dangerous-command approval", sub: "you confirm risky actions" },
        { y: 204, n: "3", label: "Container / sandbox isolation", sub: "sandboxed by default" },
        { y: 258, n: "4", label: "Credential filtering", sub: "secrets kept out of context" },
        { y: 312, n: "5", label: "Context scanning", sub: "inspects what flows in" },
      ].map((layer) => (
        <g key={layer.n}>
          <rect x="700" y={layer.y} width="440" height="46" rx="12" fill="#121211" stroke="#C4A6F5" strokeWidth="1.3" />
          <circle cx="726" cy={layer.y + 23} r="13" fill="#3f2767" stroke="#C4A6F5" strokeWidth="1.3" />
          <text x="726" y={layer.y + 28} textAnchor="middle" fill="#f9f9f9" fontSize="14" fontWeight="800">{layer.n}</text>
          <text x="750" y={layer.y + 20} fill="#f9f9f9" fontSize="14" fontWeight="700">{layer.label}</text>
          <text x="750" y={layer.y + 38} fill="#C4A6F5" fontSize="12">{layer.sub}</text>
        </g>
      ))}

      {/* Pluggable sandbox backends (bottom band) — the layer-3 isolation options */}
      <text x="600" y="472" textAnchor="middle" fill="#dcdad6" fontSize="12.5" fontWeight="700" letterSpacing="1">
        LAYER 3 · PLUGGABLE SANDBOX BACKENDS
      </text>
      {["Local", "Docker", "SSH", "Singularity", "Modal", "Daytona"].map((backend, i) => (
        <g key={backend}>
          <rect x={116 + i * 162} y="490" width="146" height="40" rx="10" fill="#121211" stroke="#C4A6F5" strokeWidth="1.4" />
          <text x={116 + i * 162 + 73} y="515" textAnchor="middle" fill="#efefed" fontSize="13.5" fontWeight="700" fontFamily="monospace">
            {backend}
          </text>
        </g>
      ))}

      <text x="1152" y="548" textAnchor="end" fill="#878376" fontSize="11">
        aiengineerinsights.com
      </text>
    </svg>
  </div>
);

export default HermesSecurityHeroDiagram;
