// Hero diagram for "AI Agent Observability". Pure inline SVG so it prerenders
// to crawler-visible markup and doubles as the OG image (viewBox 1200x630).
// Drawn as a trace waterfall, the view every tracing tool (Langfuse, LangSmith,
// Phoenix, Jaeger) shows: one agent request broken into nested OpenTelemetry
// GenAI spans (invoke_agent, chat, execute_tool) on a shared time axis, with
// the slow span highlighted to show what a single request duration hides.
type Span = {
  op: string;
  name: string;
  depth: number;
  start: number; // seconds
  dur: number; // seconds
  color: string;
  slow?: boolean;
};

const SPANS: Span[] = [
  { op: "invoke_agent", name: "researcher", depth: 0, start: 0, dur: 8.2, color: "#C4A6F5" },
  { op: "chat", name: "claude-opus-5-5", depth: 1, start: 0.1, dur: 1.8, color: "#7CC4F2" },
  { op: "execute_tool", name: "web_search", depth: 1, start: 1.9, dur: 0.8, color: "#6FD6A8" },
  { op: "invoke_agent", name: "writer (handoff)", depth: 1, start: 2.8, dur: 5.3, color: "#FF8F73" },
  { op: "chat", name: "claude-sonnet-5-5", depth: 2, start: 2.9, dur: 3.5, color: "#FFB454", slow: true },
  { op: "execute_tool", name: "file_write", depth: 2, start: 6.5, dur: 1.5, color: "#6FD6A8" },
];

const ROW_Y = 172; // first row centre
const ROW_H = 54;
const T0 = 480; // x of t=0
const PX_PER_S = 58; // 9 s -> 522 px, axis ends at 1002
const NAME_X = 56;
const INDENT = 28;

const AgentObservabilityHeroDiagram = () => {
  const rowY = (i: number) => ROW_Y + i * ROW_H;
  const indentX = (d: number) => NAME_X + d * INDENT;
  return (
    <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        fontFamily="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        aria-label="Trace waterfall of one AI agent request, using OpenTelemetry GenAI span names. The root span invoke_agent researcher runs 8.2 seconds. Under it: a chat span to claude-opus-5-5 (1.8 s), an execute_tool span for web_search (0.8 s), and a handoff to invoke_agent writer (5.3 s). Under the writer: a chat span to claude-sonnet-5-5 that takes 3.5 seconds, 43% of the request and the bottleneck, then execute_tool file_write (1.5 s). Classic APM sees only one 8.2 second request; the trace shows where the time went."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="aoBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c0c0b" />
            <stop offset="100%" stopColor="#10100f" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#aoBg)" />

        {/* Title */}
        <text x="600" y="50" textAnchor="middle" fill="#f7f7f6" fontSize="25" fontWeight="800" letterSpacing="0.6">
          AI Agent Observability: One Request Is a Tree of Spans
        </text>
        <text x="600" y="80" textAnchor="middle" fill="#afaca4" fontSize="15">
          A trace of one agent run, with OpenTelemetry GenAI span names
        </text>

        {/* Column headers */}
        <text x={NAME_X} y="128" fill="#8b8679" fontSize="12" fontWeight="700" letterSpacing="1.4">SPAN</text>
        <text x="1144" y="128" textAnchor="end" fill="#8b8679" fontSize="12" fontWeight="700" letterSpacing="1.4">DURATION</text>

        {/* Time axis */}
        {Array.from({ length: 10 }).map((_, s) => {
          const x = T0 + s * PX_PER_S;
          return (
            <g key={s}>
              <line x1={x} y1="140" x2={x} y2={rowY(SPANS.length - 1) + 24} stroke="#2d2b27" strokeWidth="1" />
              {s % 3 === 0 && (
                <text x={x} y="128" textAnchor="middle" fill="#8b8679" fontSize="12">{s} s</text>
              )}
            </g>
          );
        })}

        {/* Tree guides */}
        <g stroke="#545149" strokeWidth="1.5" fill="none">
          <path d={`M ${indentX(0) + 10} ${rowY(0) + 12} V ${rowY(3)}`} />
          {[1, 2, 3].map((i) => (
            <path key={i} d={`M ${indentX(0) + 10} ${rowY(i)} H ${indentX(1) - 6}`} />
          ))}
          <path d={`M ${indentX(1) + 10} ${rowY(3) + 12} V ${rowY(5)}`} />
          {[4, 5].map((i) => (
            <path key={i} d={`M ${indentX(1) + 10} ${rowY(i)} H ${indentX(2) - 6}`} />
          ))}
        </g>

        {SPANS.map((s, i) => {
          const y = rowY(i);
          const bx = T0 + s.start * PX_PER_S;
          const bw = s.dur * PX_PER_S;
          return (
            <g key={`${s.op}-${s.name}`}>
              {s.slow && (
                <rect x="40" y={y - 22} width="1120" height="44" rx="8" fill="#10100f" opacity="0.55" stroke="#FFB454" strokeWidth="1.2" />
              )}
              <text x={indentX(s.depth)} y={y + 5} fontSize="15.5">
                <tspan fill={s.color} fontWeight="700">{s.op}</tspan>
                <tspan fill="#e9e8e5" dx="8">{s.name}</tspan>
              </text>
              <rect x={bx} y={y - 9} width={bw} height="18" rx="4" fill={s.color} opacity={s.slow ? 1 : 0.85} />
              <text x="1144" y={y + 5} textAnchor="end" fill={s.slow ? "#FFB454" : "#d7d6d2"} fontSize="15" fontWeight={s.slow ? 800 : 600}>
                {s.dur.toFixed(1)} s{s.slow ? "  (43%)" : ""}
              </text>
            </g>
          );
        })}

        {/* Takeaway */}
        <rect x="140" y="508" width="920" height="66" rx="12" fill="#0f0f0e" stroke="#FFB454" strokeWidth="1.4" />
        <text x="600" y="535" textAnchor="middle" fill="#FFB454" fontSize="16.5" fontWeight="800">
          Classic APM sees one 8.2 s request.
        </text>
        <text x="600" y="560" textAnchor="middle" fill="#FFB454" fontSize="14.5">
          The trace shows where it went: the writer's model call took 3.5 s, 43% of the total.
        </text>

        <text x="1144" y="610" textAnchor="end" fill="#716e63" fontSize="12">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default AgentObservabilityHeroDiagram;
