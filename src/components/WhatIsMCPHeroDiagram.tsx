// Hero diagram for "What Is MCP (Model Context Protocol)?". Pure inline SVG so
// it prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630). Left: the M×N tangle of AI apps wired directly to every
// tool. Right: the same apps and tools connecting through one MCP layer (M+N).
// Bottom: host → client → server roles plus the primitives and transports.
const WhatIsMCPHeroDiagram = () => {
  const apps = ["Chat assistant", "IDE / coding agent", "Custom agent"];
  const tools = ["GitHub", "Postgres", "Slack", "Filesystem"];

  // Left panel (without MCP): every app wired to every tool.
  const leftAppYs = [160, 230, 300];
  const leftToolYs = [150, 200, 250, 300];

  // Right panel (with MCP): apps → MCP layer → tools.
  const rightAppYs = [160, 230, 300];
  const rightToolYs = [150, 200, 250, 300];

  const roles = [
    { x: 150, t: "MCP Host", d: "the AI app — Claude Desktop, an IDE, your agent" },
    { x: 470, t: "MCP Client", d: "one per server, created and owned by the host" },
    { x: 790, t: "MCP Server", d: "exposes: tools · resources · prompts" },
  ];

  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="What is MCP, the Model Context Protocol. On the left, labelled 'without MCP', three AI applications — a chat assistant, an IDE coding agent and a custom agent — are each wired directly to four tools — GitHub, Postgres, Slack and a filesystem — producing twelve tangled, bespoke integrations: M times N. On the right, labelled 'with MCP', the same three apps and four tools each connect once to a single box in the middle labelled 'MCP — one open standard', giving seven clean connections: M plus N. Below, three boxes show the MCP roles: the MCP host is the AI application, it creates one MCP client per server, and each MCP server exposes tools, resources and prompts. A final row notes that messages use JSON-RPC 2.0 over stdio for local servers or Streamable HTTP for remote servers, and that MCP is an open standard introduced by Anthropic in November 2024 with the specification at modelcontextprotocol.io."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="wmcpBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0d1222" />
            <stop offset="100%" stopColor="#120f2a" />
          </linearGradient>
          <marker id="wmcpArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#6b7fa3" />
          </marker>
          <linearGradient id="wmcpCore" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#6b21a8" />
          </linearGradient>
        </defs>

        <rect width="1200" height="630" fill="url(#wmcpBg)" />
        <g fill="#818cf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#eef2ff" fontSize="19" fontWeight="800" letterSpacing="1">
          WHAT IS MCP? (MODEL CONTEXT PROTOCOL)
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#c7d2fe" fontSize="12.5">
          one open standard for connecting AI apps to tools and data — M×N integrations become M+N
        </text>

        {/* ---------- LEFT: without MCP (M × N) ---------- */}
        <rect x="40" y="100" width="500" height="275" rx="12" fill="#0e1322" stroke="#3b3f5c" strokeWidth="1.4" />
        <text x="290" y="124" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="700" letterSpacing="0.5">
          WITHOUT MCP — M × N
        </text>

        {/* tangle lines first so boxes sit on top */}
        <g stroke="#7f1d1d" strokeWidth="1.1" opacity="0.75">
          {leftAppYs.map((ay, i) =>
            leftToolYs.map((ty, j) => (
              <line key={`l-${i}-${j}`} x1="180" y1={ay} x2="400" y2={ty} />
            ))
          )}
        </g>

        {apps.map((a, i) => (
          <g key={`la-${a}`}>
            <rect x="70" y={leftAppYs[i] - 17} width="110" height="34" rx="7" fill="#0e1a24" stroke="#818cf8" strokeWidth="1.3" />
            <text x="125" y={leftAppYs[i] + 4} textAnchor="middle" fill="#e0e7ff" fontSize="10.5" fontWeight="600">{a}</text>
          </g>
        ))}
        {tools.map((t, j) => (
          <g key={`lt-${t}`}>
            <rect x="400" y={leftToolYs[j] - 15} width="110" height="30" rx="7" fill="#0e1a24" stroke="#f59e0b" strokeWidth="1.3" />
            <text x="455" y={leftToolYs[j] + 4} textAnchor="middle" fill="#fde68a" fontSize="10.5" fontWeight="600">{t}</text>
          </g>
        ))}
        <text x="290" y="356" textAnchor="middle" fill="#fecaca" fontSize="11">
          3 apps × 4 tools = 12 bespoke integrations — every pair needs its own code
        </text>

        {/* arrow between panels */}
        <line x1="552" y1="237" x2="648" y2="237" stroke="#6b7fa3" strokeWidth="1.8" markerEnd="url(#wmcpArrow)" />

        {/* ---------- RIGHT: with MCP (M + N) ---------- */}
        <rect x="660" y="100" width="500" height="275" rx="12" fill="#0e1322" stroke="#3b3f5c" strokeWidth="1.4" />
        <text x="910" y="124" textAnchor="middle" fill="#a7f3d0" fontSize="13" fontWeight="700" letterSpacing="0.5">
          WITH MCP — M + N
        </text>

        <g stroke="#4c6b8a" strokeWidth="1.4">
          {rightAppYs.map((ay, i) => (
            <line key={`ra-${i}`} x1="800" y1={ay} x2="845" y2={230} />
          ))}
          {rightToolYs.map((ty, j) => (
            <line key={`rt-${j}`} x1="975" y1={230} x2="1020" y2={ty} />
          ))}
        </g>

        {apps.map((a, i) => (
          <g key={`ra-${a}`}>
            <rect x="690" y={rightAppYs[i] - 17} width="110" height="34" rx="7" fill="#0e1a24" stroke="#818cf8" strokeWidth="1.3" />
            <text x="745" y={rightAppYs[i] + 4} textAnchor="middle" fill="#e0e7ff" fontSize="10.5" fontWeight="600">{a}</text>
          </g>
        ))}
        {tools.map((t, j) => (
          <g key={`rt-${t}`}>
            <rect x="1020" y={rightToolYs[j] - 15} width="110" height="30" rx="7" fill="#0e1a24" stroke="#f59e0b" strokeWidth="1.3" />
            <text x="1075" y={rightToolYs[j] + 4} textAnchor="middle" fill="#fde68a" fontSize="10.5" fontWeight="600">{t}</text>
          </g>
        ))}

        {/* MCP core */}
        <rect x="845" y="175" width="130" height="110" rx="12" fill="url(#wmcpCore)" stroke="#c4b5fd" strokeWidth="1.6" />
        <text x="910" y="214" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="800" letterSpacing="1">MCP</text>
        <text x="910" y="236" textAnchor="middle" fill="#ede9fe" fontSize="10.5">one open standard</text>
        <text x="910" y="254" textAnchor="middle" fill="#ddd6fe" fontSize="9.5">client ↔ server protocol</text>

        <text x="910" y="356" textAnchor="middle" fill="#bbf7d0" fontSize="11">
          3 + 4 = 7 connections — expose a tool once, any MCP client can use it
        </text>

        {/* ---------- BOTTOM: roles ---------- */}
        <text x="600" y="412" textAnchor="middle" fill="#eef2ff" fontSize="15" fontWeight="700">
          Inside the MCP layer
        </text>

        {roles.map((r, i) => (
          <g key={r.t}>
            <rect x={r.x} y="430" width="260" height="62" rx="10" fill="#0e1a24" stroke="#7c3aed" strokeWidth="1.5" />
            <text x={r.x + 130} y="455" textAnchor="middle" fill="#eef2ff" fontSize="14" fontWeight="700">{r.t}</text>
            <text x={r.x + 130} y="476" textAnchor="middle" fill="#c7d2fe" fontSize="10.5">{r.d}</text>
            {i < roles.length - 1 && (
              <line x1={r.x + 262} y1="461" x2={r.x + 316} y2="461" stroke="#6b7fa3" strokeWidth="1.6" markerEnd="url(#wmcpArrow)" />
            )}
          </g>
        ))}

        {/* protocol chips */}
        <rect x="330" y="516" width="230" height="30" rx="15" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.2" />
        <text x="445" y="536" textAnchor="middle" fill="#e0e7ff" fontSize="11.5" fontWeight="600">JSON-RPC 2.0 messages</text>

        <rect x="610" y="516" width="260" height="30" rx="15" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.2" />
        <text x="740" y="536" textAnchor="middle" fill="#e0e7ff" fontSize="11.5" fontWeight="600">stdio (local) · Streamable HTTP (remote)</text>

        <text x="600" y="588" textAnchor="middle" fill="#94a3b8" fontSize="11.5">
          Open standard introduced and open-sourced by Anthropic (Nov 2024) — specification at modelcontextprotocol.io
        </text>
      </svg>
    </div>
  );
};

export default WhatIsMCPHeroDiagram;
