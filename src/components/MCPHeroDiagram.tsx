// Hero diagram for the "MCP vs API" post. Pure inline SVG so it prerenders to
// crawler-visible markup and doubles as the OG image (viewBox 1200x630). Shows
// MCP's core value: AI hosts talk to any tool through one standard protocol
// (client -> MCP -> server exposing tools/resources/prompts), turning the M×N
// custom-integration problem into M+N. Targets "mcp architecture" intent.
const MCPHeroDiagram = () => {
  const hosts = [
    { y: 150, t: "Claude / ChatGPT" },
    { y: 250, t: "Cursor / IDE" },
    { y: 350, t: "Your AI agent" },
  ];
  const servers = [
    { y: 130, t: "Files server" },
    { y: 210, t: "GitHub server" },
    { y: 290, t: "Postgres server" },
    { y: 370, t: "Search / RAG server" },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How MCP (Model Context Protocol) connects AI to tools. On the left, AI hosts such as Claude, ChatGPT, Cursor, and custom agents each run an MCP client. In the middle, a single standard MCP protocol layer (JSON-RPC over stdio or HTTP). On the right, MCP servers — a files server, GitHub server, Postgres server, and search/RAG server — each exposing standard Tools, Resources, and Prompts. Because every host speaks the same protocol, you write one server and any host can use it: MCP turns the M×N custom-integration problem into M+N. An API is a general interface you code against per app; MCP is one model-facing protocol that makes tools self-describing and reusable across every AI app."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="mcpBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="mcpArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#mcpBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          HOW MCP CONNECTS AI TO TOOLS
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          one standard protocol, not a custom integration for every app × every tool
        </text>

        {/* column headers */}
        <text x="150" y="112" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="800">AI HOSTS</text>
        <text x="600" y="112" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="800">MCP PROTOCOL</text>
        <text x="1000" y="96" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="800">MCP SERVERS</text>

        {/* center MCP protocol band */}
        <rect x="520" y="128" width="160" height="300" rx="16" fill="#150e24" stroke="#7c3aed" strokeWidth="1.8" />
        <text x="600" y="268" textAnchor="middle" fill="#d6c7f5" fontSize="14" fontWeight="800">MCP</text>
        <text x="600" y="290" textAnchor="middle" fill="#a99cc8" fontSize="11">JSON-RPC</text>
        <text x="600" y="306" textAnchor="middle" fill="#a99cc8" fontSize="11">stdio / HTTP</text>

        {/* hosts (left) with MCP client, arrows into the band */}
        {hosts.map((h) => (
          <g key={h.t}>
            <rect x="40" y={h.y} width="240" height="60" rx="12" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
            <rect x="40" y={h.y} width="6" height="60" rx="3" fill="#2563eb" />
            <text x="64" y={h.y + 26} fill="#eaf4fb" fontSize="14.5" fontWeight="700">{h.t}</text>
            <text x="64" y={h.y + 46} fill="#93c5fd" fontSize="11.5">MCP client</text>
            <line x1="280" y1={h.y + 30} x2="518" y2="278" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#mcpArrow)" />
          </g>
        ))}

        {/* servers (right), arrows from the band */}
        {servers.map((s) => (
          <g key={s.t}>
            <rect x="800" y={s.y} width="352" height="60" rx="12" fill="#0e1a24" stroke="#059669" strokeWidth="1.6" />
            <rect x="800" y={s.y} width="6" height="60" rx="3" fill="#059669" />
            <text x="824" y={s.y + 26} fill="#eaf4fb" fontSize="14.5" fontWeight="700">{s.t}</text>
            <text x="824" y={s.y + 46} fill="#9db6c6" fontSize="11">exposes Tools · Resources · Prompts</text>
            <line x1="682" y1="278" x2="798" y2={s.y + 30} stroke="#2f5347" strokeWidth="1.6" markerEnd="url(#mcpArrow)" />
          </g>
        ))}

        {/* bottom band: M×N -> M+N */}
        <rect x="48" y="470" width="1104" height="60" rx="14" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="600" y="496" textAnchor="middle" fill="#5eead4" fontSize="13.5" fontWeight="800">
          WRITE A SERVER ONCE — ANY MCP HOST CAN USE IT
        </text>
        <text x="600" y="516" textAnchor="middle" fill="#9fe8da" fontSize="12">
          MCP turns M×N custom integrations into M+N · an API is coded per app, MCP is one protocol for all of them
        </text>

        <text x="1152" y="560" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default MCPHeroDiagram;
