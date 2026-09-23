// Hero diagram for the "What is Jev?" post. Pure inline SVG so it prerenders to
// crawler-visible markup and doubles as the OG image (viewBox 1200x630). Shows
// the core idea of a "System One" model: the same input goes to Jev, which
// returns one typed decision plus a calibrated confidence score in a single
// parallel pass, versus a normal LLM that emits a token-by-token paragraph.
// Targets "what is jev" / "system one model" intent.
const WhatIsJevHeroDiagram = () => {
  const tokens = ["Based", "on", "the", "trans-", "action", "details,", "this", "appears", "to", "be", "…"];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="What Jev, TypeSafe AI's System One model, does compared with a normal LLM. On the left, one input: a transaction payload with the question 'Is this fraud?'. The input fans out to two paths. Top path: Jev (System One) runs a single non-autoregressive forward pass and returns a typed decision — label 'fraud' with a calibrated confidence of 0.87 — that software can consume directly. Bottom path: a normal LLM (System Two) generates a paragraph token by token: 'Based on the transaction details, this appears to be…', which then has to be parsed. A bottom band summarizes: System One returns a decision plus a confidence score in one pass; it cannot return a malformed shape, but it can still be wrong within a valid type."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="jevBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="jevArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#jevBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          SYSTEM ONE: A DECISION, NOT A PARAGRAPH
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          Jev returns a typed value + a calibrated confidence in one pass · an LLM writes text one token at a time
        </text>

        {/* column headers */}
        <text x="170" y="112" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="800">INPUT</text>
        <text x="600" y="112" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="800">MODEL</text>
        <text x="1000" y="112" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="800">OUTPUT</text>

        {/* input (left) */}
        <rect x="40" y="220" width="260" height="120" rx="12" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
        <rect x="40" y="220" width="6" height="120" rx="3" fill="#2563eb" />
        <text x="64" y="248" fill="#eaf4fb" fontSize="14.5" fontWeight="700">"Is this transaction fraud?"</text>
        <text x="64" y="274" fill="#93c5fd" fontSize="11.5" fontFamily="ui-monospace, monospace">amount: 4,980.00</text>
        <text x="64" y="292" fill="#93c5fd" fontSize="11.5" fontFamily="ui-monospace, monospace">country: new · card: 3 days old</text>
        <text x="64" y="310" fill="#93c5fd" fontSize="11.5" fontFamily="ui-monospace, monospace">labels: [fraud, legit, review]</text>
        <text x="64" y="330" fill="#6f8da3" fontSize="11">same input to both models</text>

        {/* fan-out arrows */}
        <line x1="300" y1="262" x2="438" y2="185" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#jevArrow)" />
        <line x1="300" y1="298" x2="438" y2="400" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#jevArrow)" />

        {/* Jev / System One (top center) */}
        <rect x="440" y="140" width="320" height="100" rx="16" fill="#150e24" stroke="#7c3aed" strokeWidth="1.8" />
        <text x="600" y="170" textAnchor="middle" fill="#d6c7f5" fontSize="15" fontWeight="800">JEV · SYSTEM ONE</text>
        <text x="600" y="192" textAnchor="middle" fill="#a99cc8" fontSize="11.5">one parallel forward pass</text>
        <text x="600" y="210" textAnchor="middle" fill="#a99cc8" fontSize="11.5">non-autoregressive · trained with RLCD</text>
        <text x="600" y="228" textAnchor="middle" fill="#7c6f9c" fontSize="10.5">TypeSafe claims ~70–500 ms</text>

        {/* LLM / System Two (bottom center) */}
        <rect x="440" y="350" width="320" height="100" rx="16" fill="#0e1a24" stroke="#f59e0b" strokeWidth="1.8" />
        <text x="600" y="380" textAnchor="middle" fill="#fde68a" fontSize="15" fontWeight="800">LLM · SYSTEM TWO</text>
        <text x="600" y="402" textAnchor="middle" fill="#c9b47a" fontSize="11.5">autoregressive decoding</text>
        <text x="600" y="420" textAnchor="middle" fill="#c9b47a" fontSize="11.5">predicts the next token, then the next…</text>
        <text x="600" y="438" textAnchor="middle" fill="#8a7a55" fontSize="10.5">text you then have to parse</text>

        {/* arrows to outputs */}
        <line x1="760" y1="190" x2="838" y2="190" stroke="#3a5a7a" strokeWidth="1.6" markerEnd="url(#jevArrow)" />
        <line x1="760" y1="400" x2="838" y2="400" stroke="#5a4a2a" strokeWidth="1.6" markerEnd="url(#jevArrow)" />

        {/* typed decision output (top right) */}
        <rect x="840" y="140" width="312" height="100" rx="12" fill="#0b1a15" stroke="#059669" strokeWidth="1.6" />
        <rect x="840" y="140" width="6" height="100" rx="3" fill="#059669" />
        <text x="864" y="166" fill="#eaf4fb" fontSize="13" fontWeight="700">TYPED DECISION + CONFIDENCE</text>
        <text x="864" y="192" fill="#5eead4" fontSize="15" fontWeight="800" fontFamily="ui-monospace, monospace">label: "fraud"</text>
        <text x="864" y="214" fill="#5eead4" fontSize="15" fontWeight="800" fontFamily="ui-monospace, monospace">confidence: 0.87</text>
        <text x="864" y="232" fill="#9db6c6" fontSize="10.5">Choice · Score · probability — software reads it directly</text>

        {/* token stream output (bottom right) */}
        <rect x="840" y="350" width="312" height="100" rx="12" fill="#1a150e" stroke="#b45309" strokeWidth="1.6" />
        <rect x="840" y="350" width="6" height="100" rx="3" fill="#b45309" />
        <text x="864" y="376" fill="#eaf4fb" fontSize="13" fontWeight="700">TOKEN-BY-TOKEN TEXT</text>
        {tokens.map((t, i) => {
          const col = i % 6;
          const row = Math.floor(i / 6);
          return (
            <g key={`${t}-${i}`}>
              <rect x={864 + col * 46} y={388 + row * 24} width="42" height="18" rx="4" fill="#2a2113" stroke="#7c5a1e" strokeWidth="0.8" />
              <text x={885 + col * 46} y={401 + row * 24} textAnchor="middle" fill="#fde68a" fontSize="8.5" fontFamily="ui-monospace, monospace">{t}</text>
            </g>
          );
        })}
        <text x="864" y="442" fill="#c9b47a" fontSize="10.5">a paragraph, then regex / JSON parsing / retries</text>

        {/* bottom band */}
        <rect x="48" y="490" width="1104" height="70" rx="14" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="600" y="516" textAnchor="middle" fill="#5eead4" fontSize="13.5" fontWeight="800">
          SYSTEM ONE = A VALUE + A CONFIDENCE SCORE, IN ONE PASS
        </text>
        <text x="600" y="538" textAnchor="middle" fill="#9fe8da" fontSize="12">
          it cannot return a malformed shape (never broken JSON or a label off the list) · it can still pick the wrong value — check the confidence
        </text>

        <text x="1152" y="596" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default WhatIsJevHeroDiagram;
