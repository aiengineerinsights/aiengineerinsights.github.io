// Hero diagram for the "AI Agent Sandboxing" post. Pure inline SVG so it
// prerenders to crawler-visible static markup and doubles as the OG image
// (viewBox 1200x630). Shows an agent's tool call hitting three isolation
// boundaries of increasing strength (process sandbox -> container -> gVisor
// user-space kernel -> microVM), with the host kernel at the bottom guarded
// behind each layer.
const AgentSandboxingHeroDiagram = () => {
  const layers = [
    { t: "PROCESS SANDBOX", d: "bubblewrap, seccomp — shared kernel", c: "#fca5a5", w: 230 },
    { t: "CONTAINER", d: "namespaces + cgroups — shared kernel", c: "#fcd34d", w: 230 },
    { t: "gVISOR (USER-SPACE KERNEL)", d: "Sentry intercepts syscalls — ~60 host calls", c: "#6ee7b7", w: 300 },
    { t: "microVM (FIRECRACKER)", d: "own guest kernel, KVM hardware isolation", c: "#93c5fd", w: 300 },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How AI agent sandboxing works: an agent's tool call passes through increasingly strong isolation boundaries before reaching the host kernel. From weakest to strongest: a process sandbox (bubblewrap/seccomp, shared host kernel), a container (namespaces and cgroups, still a shared kernel), gVisor (a user-space kernel called the Sentry that intercepts syscalls and only forwards a small allowlisted set to the host), and a Firecracker microVM (its own guest kernel under hardware KVM isolation). The host kernel sits behind all of them, and each layer shrinks how much of it an escaped agent can reach."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="sbBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="sbArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#sbBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="40" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          AI AGENT SANDBOXING: ISOLATION BOUNDARIES, WEAKEST TO STRONGEST
        </text>
        <text x="600" y="62" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          every boundary decides how far a bad or hijacked tool call can reach
        </text>

        {/* left: agent + tool call */}
        <rect x="30" y="250" width="140" height="80" rx="12" fill="#0e1a24" stroke="#38bdf8" strokeWidth="1.7" />
        <text x="100" y="282" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="800">AI AGENT</text>
        <text x="100" y="300" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="800">TOOL CALL</text>
        <text x="100" y="318" textAnchor="middle" fill="#9db6c6" fontSize="10">exec / write / fetch</text>
        <path d="M170,290 L200,290" stroke="#5b7488" strokeWidth="2.2" markerEnd="url(#sbArrow)" />

        {/* layered boundary stack */}
        {layers.map((l, i) => {
          const x = 206 + i * 232;
          const y = 90 + Math.abs(2 - i) * 6;
          return (
            <g key={l.t}>
              <rect x={x} y={110} width={l.w - 20} height="340" rx="14" fill="#0e1a24" stroke={l.c} strokeWidth="1.8" opacity={0.95} />
              <text x={x + (l.w - 20) / 2} y={150} textAnchor="middle" fill={l.c} fontSize="12" fontWeight="800">
                {l.t.split(" ").slice(0, 2).join(" ")}
              </text>
              <text x={x + (l.w - 20) / 2} y={168} textAnchor="middle" fill={l.c} fontSize="12" fontWeight="800">
                {l.t.split(" ").slice(2).join(" ")}
              </text>
              <text x={x + (l.w - 20) / 2} y={400} textAnchor="middle" fill="#9db6c6" fontSize="10">{l.d}</text>
              {i < layers.length - 1 && (
                <path d={`M${x + l.w - 20},290 L${x + l.w},290`} stroke="#5b7488" strokeWidth="1.6" markerEnd="url(#sbArrow)" strokeDasharray="3 3" />
              )}
            </g>
          );
        })}

        {/* host kernel, guarded */}
        <path d="M1110,290 L1148,290" stroke="#5b7488" strokeWidth="1.6" markerEnd="url(#sbArrow)" strokeDasharray="3 3" />
        <rect x="1030" y="250" width="140" height="80" rx="12" fill="#1a0f12" stroke="#f87171" strokeWidth="1.7" />
        <text x="1100" y="282" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="800">HOST</text>
        <text x="1100" y="300" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="800">KERNEL</text>
        <text x="1100" y="318" textAnchor="middle" fill="#9db6c6" fontSize="10">the thing you're protecting</text>

        {/* bottom band: real numbers */}
        <rect x="30" y="548" width="1140" height="52" rx="13" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="52" y="570" fill="#5eead4" fontSize="12.5" fontWeight="800">COLD-START REALITY</text>
        <text x="52" y="588" fill="#9fe8da" fontSize="11.5">
          Firecracker microVM ~125ms (AWS spec) · gVisor Sentry ~60 allowlisted host syscalls · Kubernetes Agent Sandbox warm pools: &lt;1s claim
        </text>

        <text x="1152" y="536" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default AgentSandboxingHeroDiagram;
