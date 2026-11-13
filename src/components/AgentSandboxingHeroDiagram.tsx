// Hero diagram for the "AI Agent Sandboxing" post. Pure inline SVG so it
// prerenders to crawler-visible static markup and doubles as the OG image
// (viewBox 1200x630). Shows an agent's tool call hitting three isolation
// boundaries of increasing strength (process sandbox -> container -> gVisor
// user-space kernel -> microVM), with the host kernel at the bottom guarded
// behind each layer.
const AgentSandboxingHeroDiagram = () => {
  const layers = [
    { t: ["PROCESS", "SANDBOX"], d: ["bubblewrap, seccomp", "shared kernel"], c: "#FF8F73" },
    { t: ["CONTAINER"], d: ["namespaces + cgroups", "shared kernel"], c: "#FFB454" },
    { t: ["gVISOR", "(USER-SPACE KERNEL)"], d: ["Sentry intercepts syscalls", "~60 host calls"], c: "#6FD6A8" },
    { t: ["microVM", "(FIRECRACKER)"], d: ["own guest kernel", "KVM hardware isolation"], c: "#7CC4F2" },
  ];
  return (
    <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How AI agent sandboxing works: an agent's tool call passes through increasingly strong isolation boundaries before reaching the host kernel. From weakest to strongest: a process sandbox (bubblewrap/seccomp, shared host kernel), a container (namespaces and cgroups, still a shared kernel), gVisor (a user-space kernel called the Sentry that intercepts syscalls and only forwards a small allowlisted set to the host), and a Firecracker microVM (its own guest kernel under hardware KVM isolation). The host kernel sits behind all of them, and each layer shrinks how much of it an escaped agent can reach."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="sbBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c0c0b" />
            <stop offset="60%" stopColor="#0e0e0d" />
            <stop offset="100%" stopColor="#10100f" />
          </linearGradient>
          <marker id="sbArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#79756a" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#sbBg)" />
        <g fill="#7CC4F2" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="40" textAnchor="middle" fill="#f3f3f2" fontSize="19" fontWeight="800" letterSpacing="1">
          AI AGENT SANDBOXING: ISOLATION BOUNDARIES, WEAKEST TO STRONGEST
        </text>
        <text x="600" y="62" textAnchor="middle" fill="#b3b0a8" fontSize="12.5">
          every boundary decides how far a bad or hijacked tool call can reach
        </text>

        {/* left: agent + tool call */}
        <rect x="30" y="250" width="130" height="80" rx="12" fill="#10100f" stroke="#7CC4F2" strokeWidth="1.7" />
        <text x="95" y="282" textAnchor="middle" fill="#7CC4F2" fontSize="13" fontWeight="800">AI AGENT</text>
        <text x="95" y="300" textAnchor="middle" fill="#7CC4F2" fontSize="13" fontWeight="800">TOOL CALL</text>
        <text x="95" y="318" textAnchor="middle" fill="#b7b4ac" fontSize="10">exec / write / fetch</text>
        <path d="M160,290 L182,290" stroke="#79756a" strokeWidth="2.2" markerEnd="url(#sbArrow)" />

        {/* layered boundary stack */}
        {layers.map((l, i) => {
          const W = 182;
          const GAP = 26;
          const x = 186 + i * (W + GAP);
          const cx = x + W / 2;
          // title block + description block, centred vertically on the arrow line (y=290)
          const ty = l.t.length === 2 ? 258 : 268;
          return (
            <g key={l.t.join(" ")}>
              <rect x={x} y={190} width={W} height="200" rx="14" fill="#10100f" stroke={l.c} strokeWidth="1.8" />
              <text x={cx} y={176} textAnchor="middle" fill="#8b8679" fontSize="10.5" fontWeight="700" letterSpacing="1.5">
                {`BOUNDARY ${i + 1}`}
              </text>
              {l.t.map((line, k) => (
                <text key={line} x={cx} y={ty + k * 19} textAnchor="middle" fill={l.c} fontSize="13" fontWeight="800">
                  {line}
                </text>
              ))}
              <line x1={cx - 22} y1={302} x2={cx + 22} y2={302} stroke={l.c} strokeWidth="1.2" opacity="0.5" />
              {l.d.map((line, k) => (
                <text key={line} x={cx} y={326 + k * 17} textAnchor="middle" fill="#b7b4ac" fontSize="11">
                  {line}
                </text>
              ))}
              <path d={`M${x + W},290 L${x + W + GAP - 4},290`} stroke="#79756a" strokeWidth="1.6" markerEnd="url(#sbArrow)" strokeDasharray="3 3" />
            </g>
          );
        })}

        {/* host kernel, guarded */}
        <rect x="1018" y="250" width="152" height="80" rx="12" fill="#0d0d0c" stroke="#FF8F73" strokeWidth="1.7" />
        <text x="1094" y="282" textAnchor="middle" fill="#FF8F73" fontSize="13" fontWeight="800">HOST</text>
        <text x="1094" y="300" textAnchor="middle" fill="#FF8F73" fontSize="13" fontWeight="800">KERNEL</text>
        <text x="1094" y="318" textAnchor="middle" fill="#b7b4ac" fontSize="10">the thing you're protecting</text>

        {/* bottom band: real numbers */}
        <rect x="30" y="548" width="1140" height="52" rx="13" fill="#0c0c0b" stroke="#1d4d38" strokeWidth="1.3" />
        <text x="52" y="570" fill="#6FD6A8" fontSize="12.5" fontWeight="800">COLD-START REALITY</text>
        <text x="52" y="588" fill="#6FD6A8" fontSize="11.5">
          Firecracker microVM ~125ms (AWS spec) · gVisor Sentry ~60 allowlisted host syscalls · Kubernetes Agent Sandbox warm pools: &lt;1s claim
        </text>

        <text x="1152" y="536" textAnchor="end" fill="#6c695e" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default AgentSandboxingHeroDiagram;
