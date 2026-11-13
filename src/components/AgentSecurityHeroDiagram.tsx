// Hero diagram for the "AI Agent Security" post. Pure inline SVG so it
// prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630). Shows the injection path: untrusted content -> agent
// context -> tool execution -> credential exfiltration, with the defense
// layer (allowlists, sandboxing, human approval) sitting in between.
const AgentSecurityHeroDiagram = () => {
  const sources = [
    { y: 130, t: "GitHub issue / PR comment" },
    { y: 210, t: "MCP tool response" },
    { y: 290, t: "Fetched web page" },
    { y: 370, t: "Error log / changelog" },
  ];
  const defenses = [
    { y: 150, t: "Tool allowlist", d: "explicit allowed tools, not a blocklist" },
    { y: 250, t: "Sandboxed execution", d: "ephemeral environment, scoped short-lived credentials" },
    { y: 350, t: "Human approval gate", d: "before shell, network egress, or credential actions" },
  ];
  return (
    <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How prompt injection attacks AI coding agents. On the left, untrusted content sources — a GitHub issue or PR comment, an MCP tool response, a fetched web page, an error log or changelog — flow into the agent's context. In the middle, the agent reads that context and calls tools. On the right, the defense layer between the agent and its actions: a tool allowlist (explicit allowed tools, not a blocklist), sandboxed execution (an ephemeral environment with scoped, short-lived credentials), and a human approval gate (before shell, network egress, or credential actions). A banner below shows the case without defenses: no allowlist plus no sandbox plus standing credentials equals credential theft, because the agent performs only authorized actions with the developer's own identity. The lesson: untrusted content plus powerful tools plus standing credentials in the same context is the vulnerability; least-privilege scoping and human-in-the-loop gates are the fix."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="secBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c0c0b" />
            <stop offset="60%" stopColor="#0c0c0b" />
            <stop offset="100%" stopColor="#0e0e0d" />
          </linearGradient>
          <marker id="secArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#79756a" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#secBg)" />
        <g fill="#FF8F73" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#f3f3f2" fontSize="19" fontWeight="800" letterSpacing="1">
          HOW PROMPT INJECTION HIJACKS CODING AGENTS
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#b3b0a8" fontSize="12.5">
          untrusted content + powerful tools + standing credentials, in one context
        </text>

        <text x="150" y="112" textAnchor="middle" fill="#FF8F73" fontSize="13" fontWeight="800">UNTRUSTED CONTENT</text>
        <text x="600" y="112" textAnchor="middle" fill="#7CC4F2" fontSize="13" fontWeight="800">AGENT CONTEXT</text>
        <text x="976" y="112" textAnchor="middle" fill="#6FD6A8" fontSize="13" fontWeight="800">DEFENSE LAYER</text>

        <rect x="520" y="128" width="160" height="300" rx="16" fill="#10100f" stroke="#7CC4F2" strokeWidth="1.8" />
        <text x="600" y="268" textAnchor="middle" fill="#e1e0dc" fontSize="13" fontWeight="800">AGENT</text>
        <text x="600" y="286" textAnchor="middle" fill="#7CC4F2" fontSize="11">reads context,</text>
        <text x="600" y="302" textAnchor="middle" fill="#7CC4F2" fontSize="11">calls tools</text>

        {sources.map((s) => (
          <g key={s.t}>
            <rect x="40" y={s.y} width="240" height="60" rx="12" fill="#0e0d0c" stroke="#FF8F73" strokeWidth="1.6" />
            <rect x="40" y={s.y} width="6" height="60" rx="3" fill="#FF8F73" />
            <text x="64" y={s.y + 34} fill="#e6e5e2" fontSize="13" fontWeight="700">{s.t}</text>
            <line x1="280" y1={s.y + 30} x2="518" y2="278" stroke="#4a4740" strokeWidth="1.6" markerEnd="url(#secArrow)" />
          </g>
        ))}

        {defenses.map((d) => (
          <g key={d.t}>
            <rect x="800" y={d.y} width="352" height="60" rx="12" fill="#10100f" stroke="#225a41" strokeWidth="1.6" />
            <rect x="800" y={d.y} width="6" height="60" rx="3" fill="#225a41" />
            <text x="824" y={d.y + 26} fill="#f3f3f2" fontSize="14.5" fontWeight="700">{d.t}</text>
            <text x="824" y={d.y + 46} fill="#b7b4ac" fontSize="11">{d.d}</text>
            <line x1="682" y1="278" x2="798" y2={d.y + 30} stroke="#46433c" strokeWidth="1.6" markerEnd="url(#secArrow)" />
          </g>
        ))}

        <rect x="48" y="470" width="1104" height="60" rx="14" fill="#0d0d0c" stroke="#6e502a" strokeWidth="1.3" />
        <text x="600" y="496" textAnchor="middle" fill="#FFB454" fontSize="13.5" fontWeight="800">
          WITHOUT DEFENSES: NO ALLOWLIST + NO SANDBOX + STANDING CREDENTIALS = CREDENTIAL THEFT
        </text>
        <text x="600" y="516" textAnchor="middle" fill="#FFB454" fontSize="12">
          the agent performs only "authorized" actions with the developer's own identity — no policy is ever violated
        </text>

        <text x="1152" y="560" textAnchor="end" fill="#6c695e" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default AgentSecurityHeroDiagram;
