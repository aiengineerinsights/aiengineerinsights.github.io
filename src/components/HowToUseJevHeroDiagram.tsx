// Hero diagram for the "How to Use Jev" post. Pure inline SVG so it prerenders
// to crawler-visible markup and doubles as the OG image (viewBox 1200x630).
// Shows Jev as a decision point inside an agent loop: inputs (a user query, a
// proposed tool call, a piece of content) flow into Jev, Jev returns a typed
// decision with a calibrated confidence (ROUTE / BLOCK-ALLOW / CLASSIFY), and
// ordinary software acts on that decision. Targets "how to use jev" intent.
const HowToUseJevHeroDiagram = () => {
  const inputs = [
    { y: 150, t: "User query", s: "\"cancel my order and refund me\"" },
    { y: 250, t: "Proposed tool call", s: "rm -rf ./build  (from the agent)" },
    { y: 350, t: "Content to check", s: "a support ticket / chat message" },
  ];
  const decisions = [
    { y: 130, t: "ROUTE", v: "complex", c: "0.91", act: "→ send to the big model", stroke: "#2563eb", fill: "#93c5fd" },
    { y: 210, t: "BLOCK / ALLOW", v: "block", c: "0.76", act: "→ do not execute the tool call", stroke: "#dc2626", fill: "#fca5a5" },
    { y: 290, t: "CLASSIFY", v: "urgent", c: "0.83", act: "→ escalate the ticket", stroke: "#059669", fill: "#6ee7b7" },
    { y: 370, t: "SCORE", v: "0.42", c: "mid-range", act: "→ fall back to a rule / human", stroke: "#d97706", fill: "#fcd34d" },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="Jev as the decision point in an agent loop. On the left, inputs arrive: a user query, a proposed tool call, and a piece of content to check. In the middle, Jev — TypeSafe AI's System One model — returns a typed decision instead of text. On the right, the typed decisions each carry a confidence score: ROUTE returns 'complex' at 0.91 so the query is sent to the big model; BLOCK/ALLOW returns 'block' at 0.76 so the tool call is not executed; CLASSIFY returns 'urgent' at 0.83 so the ticket is escalated; SCORE returns a mid-range value so the system falls back to a rule or a human. Bottom band: your code acts on the decision directly, no parsing; the type is guaranteed, the value is not, and untrusted input can move the verdict."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="jevUseBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="jevUseArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#jevUseBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          JEV AS THE DECISION POINT IN YOUR AGENT LOOP
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          inputs go in · a typed decision plus a confidence comes out · your code acts on it — no text to parse
        </text>

        {/* column headers */}
        <text x="160" y="112" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="800">INPUTS</text>
        <text x="600" y="112" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="800">JEV (SYSTEM ONE)</text>
        <text x="1000" y="96" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="800">TYPED DECISION + CONFIDENCE</text>

        {/* center Jev band */}
        <rect x="520" y="128" width="160" height="300" rx="16" fill="#150e24" stroke="#7c3aed" strokeWidth="1.8" />
        <text x="600" y="252" textAnchor="middle" fill="#d6c7f5" fontSize="14" fontWeight="800">JEV</text>
        <text x="600" y="274" textAnchor="middle" fill="#a99cc8" fontSize="11">non-autoregressive</text>
        <text x="600" y="290" textAnchor="middle" fill="#a99cc8" fontSize="11">Choice · Score · probability</text>
        <text x="600" y="312" textAnchor="middle" fill="#8b7fb0" fontSize="10.5">no text, no reasoning</text>

        {/* inputs (left), arrows into the band */}
        {inputs.map((h) => (
          <g key={h.t}>
            <rect x="40" y={h.y} width="240" height="60" rx="12" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
            <rect x="40" y={h.y} width="6" height="60" rx="3" fill="#2563eb" />
            <text x="64" y={h.y + 26} fill="#eaf4fb" fontSize="14.5" fontWeight="700">{h.t}</text>
            <text x="64" y={h.y + 46} fill="#93c5fd" fontSize="11">{h.s}</text>
            <line x1="280" y1={h.y + 30} x2="518" y2="278" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#jevUseArrow)" />
          </g>
        ))}

        {/* decisions (right), arrows from the band */}
        {decisions.map((d) => (
          <g key={d.t}>
            <rect x="800" y={d.y} width="352" height="60" rx="12" fill="#0e1a24" stroke={d.stroke} strokeWidth="1.6" />
            <rect x="800" y={d.y} width="6" height="60" rx="3" fill={d.stroke} />
            <text x="824" y={d.y + 24} fill="#eaf4fb" fontSize="13.5" fontWeight="800">{d.t}</text>
            <text x="824" y={d.y + 46} fill={d.fill} fontSize="11.5" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
              {`{ value: "${d.v}", confidence: ${d.c} }`}
            </text>
            <text x="1140" y={d.y + 24} textAnchor="end" fill="#9db6c6" fontSize="10.5">{d.act}</text>
            <line x1="682" y1="278" x2="798" y2={d.y + 30} stroke="#2f5347" strokeWidth="1.6" markerEnd="url(#jevUseArrow)" />
          </g>
        ))}

        {/* bottom band */}
        <rect x="48" y="470" width="1104" height="60" rx="14" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="600" y="496" textAnchor="middle" fill="#5eead4" fontSize="13.5" fontWeight="800">
          YOUR CODE ACTS ON THE DECISION DIRECTLY — NO PARSING, NO PROMPT FOR "JUST ANSWER YES OR NO"
        </text>
        <text x="600" y="516" textAnchor="middle" fill="#9fe8da" fontSize="12">
          the type is guaranteed, the value is not · untrusted text can move the verdict · keep a hard rule or a human on high-impact gates
        </text>

        <text x="1152" y="560" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default HowToUseJevHeroDiagram;
