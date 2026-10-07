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
    { y: 150, t: "Tool allowlist" },
    { y: 250, t: "Sandboxed execution" },
    { y: 350, t: "Human approval gate" },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How prompt injection attacks AI coding agents. On the left, untrusted content sources — a GitHub issue or PR comment, an MCP tool response, a fetched web page, an error log or changelog — flow into the agent's context. In the middle, a defense layer of tool allowlists, sandboxed execution, and human approval gates. On the right, without those defenses the agent executes attacker instructions with the developer's own credentials, leading to credential theft, arbitrary code execution, or data exfiltration. The lesson: untrusted content plus powerful tools plus standing credentials in the same context is the vulnerability; least-privilege scoping and human-in-the-loop gates are the fix."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="secBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#1a0b10" />
            <stop offset="100%" stopColor="#1f0d10" />
          </linearGradient>
          <marker id="secArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#secBg)" />
        <g fill="#f87171" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          HOW PROMPT INJECTION HIJACKS CODING AGENTS
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          untrusted content + powerful tools + standing credentials, in one context
        </text>

        <text x="150" y="112" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="800">UNTRUSTED CONTENT</text>
        <text x="600" y="112" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="800">DEFENSE LAYER</text>
        <text x="1010" y="96" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="800">WITHOUT DEFENSES</text>

        <rect x="520" y="128" width="160" height="300" rx="16" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.8" />
        <text x="600" y="268" textAnchor="middle" fill="#bfdbfe" fontSize="13" fontWeight="800">AGENT</text>
        <text x="600" y="286" textAnchor="middle" fill="#93c5fd" fontSize="11">reads context,</text>
        <text x="600" y="302" textAnchor="middle" fill="#93c5fd" fontSize="11">calls tools</text>

        {sources.map((s) => (
          <g key={s.t}>
            <rect x="40" y={s.y} width="240" height="60" rx="12" fill="#1a1012" stroke="#dc2626" strokeWidth="1.6" />
            <rect x="40" y={s.y} width="6" height="60" rx="3" fill="#dc2626" />
            <text x="64" y={s.y + 34} fill="#fecaca" fontSize="13" fontWeight="700">{s.t}</text>
            <line x1="280" y1={s.y + 30} x2="518" y2="278" stroke="#5a3030" strokeWidth="1.6" markerEnd="url(#secArrow)" />
          </g>
        ))}

        {defenses.map((d) => (
          <g key={d.t}>
            <rect x="800" y={d.y} width="352" height="60" rx="12" fill="#0e1a24" stroke="#059669" strokeWidth="1.6" />
            <rect x="800" y={d.y} width="6" height="60" rx="3" fill="#059669" />
            <text x="824" y={d.y + 26} fill="#eaf4fb" fontSize="14.5" fontWeight="700">{d.t}</text>
            <text x="824" y={d.y + 46} fill="#9db6c6" fontSize="11">blocks or confirms the action</text>
            <line x1="682" y1="278" x2="798" y2={d.y + 30} stroke="#2f5347" strokeWidth="1.6" markerEnd="url(#secArrow)" />
          </g>
        ))}

        <rect x="48" y="470" width="1104" height="60" rx="14" fill="#1f130a" stroke="#b45309" strokeWidth="1.3" />
        <text x="600" y="496" textAnchor="middle" fill="#fdba74" fontSize="13.5" fontWeight="800">
          NO ALLOWLIST + NO SANDBOX + STANDING CREDENTIALS = CREDENTIAL THEFT
        </text>
        <text x="600" y="516" textAnchor="middle" fill="#fcd9b3" fontSize="12">
          the agent performs only "authorized" actions with the developer's own identity — no policy is ever violated
        </text>

        <text x="1152" y="560" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default AgentSecurityHeroDiagram;
