// Hero diagram for the "AI Guardrails Explained" post. Pure inline SVG so it
// prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630, rasterised to public/og-ai-guardrails.png). Shows an
// agent loop with the three guardrail checkpoints — input, tool-call, output —
// the untrusted sources that feed it (user text, retrieved docs, tool results),
// and the four ways a check can be made (rules/schema, guard model, calibrated
// decision model, policy engine + human approval).
// Targets "ai guardrails" / "llm guardrails" / "agent guardrails" intent.
const AIGuardrailsHeroDiagram = () => {
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How AI guardrails fit around an LLM agent loop. On the left, three untrusted inputs: the user message, retrieved documents, and tool results. In the middle, the agent loop with three guardrail checkpoints: an input guardrail (moderation, injection scan, PII) before the LLM; a tool-call guardrail that asks 'should this action run?' before any tool executes, with uncertain cases escalated to a human; and an output guardrail (schema validation, PII redaction, judge, output encoding) before the answer reaches the user or downstream systems. A dashed arrow shows tool results re-entering the loop as untrusted context. On the right, the four ways a check is made: rules and schema validation, a guard or classifier model such as Llama Guard or a moderation API, a calibrated decision model with a typed verdict and confidence, and a policy engine with human approval. A bottom band summarizes: guardrails are a layer, not a fix; no single filter stops prompt injection; measure false positives and false negatives on your own traffic."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="guardBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="guardArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
          <marker id="guardArrowWarm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#b45309" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#guardBg)" />

        <text x="600" y="46" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          AI GUARDRAILS: THREE CHECKPOINTS AROUND THE MODEL, NOT ONE FILTER IN FRONT OF IT
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          input guardrail → LLM → tool-call guardrail → tools → output guardrail · every check made by rules, a guard model, a decision model, or a policy engine
        </text>

        {/* column headers */}
        <text x="155" y="112" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="800">UNTRUSTED INPUTS</text>
        <text x="570" y="112" textAnchor="middle" fill="#fcd34d" fontSize="13" fontWeight="800">AGENT LOOP + GUARDRAIL CHECKPOINTS</text>
        <text x="1020" y="112" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="800">HOW EACH CHECK IS MADE</text>

        {/* untrusted inputs (left) */}
        <rect x="40" y="150" width="230" height="270" rx="12" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
        <rect x="40" y="150" width="6" height="270" rx="3" fill="#2563eb" />
        <text x="64" y="180" fill="#eaf4fb" fontSize="13.5" fontWeight="700">1 · User message</text>
        <text x="64" y="198" fill="#93c5fd" fontSize="11" fontFamily="ui-monospace, monospace">"ignore prior rules and…"</text>
        <text x="64" y="232" fill="#eaf4fb" fontSize="13.5" fontWeight="700">2 · Retrieved documents</text>
        <text x="64" y="250" fill="#93c5fd" fontSize="11" fontFamily="ui-monospace, monospace">web pages · PDFs · tickets</text>
        <text x="64" y="284" fill="#eaf4fb" fontSize="13.5" fontWeight="700">3 · Tool results</text>
        <text x="64" y="302" fill="#93c5fd" fontSize="11" fontFamily="ui-monospace, monospace">API responses · file contents</text>
        <text x="64" y="340" fill="#6f8da3" fontSize="11">all three can carry injected</text>
        <text x="64" y="356" fill="#6f8da3" fontSize="11">instructions — treat them as data,</text>
        <text x="64" y="372" fill="#6f8da3" fontSize="11">never as authorization</text>
        <text x="64" y="402" fill="#93c5fd" fontSize="10.5" fontWeight="700">OWASP LLM01: direct + indirect injection</text>

        {/* arrow into input guardrail */}
        <line x1="270" y1="215" x2="298" y2="215" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#guardArrow)" />

        {/* A: input guardrail */}
        <rect x="300" y="180" width="160" height="70" rx="10" fill="#1a150e" stroke="#b45309" strokeWidth="1.6" />
        <text x="380" y="203" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="800">① INPUT GUARDRAIL</text>
        <text x="380" y="221" textAnchor="middle" fill="#c9b47a" fontSize="10">moderation · injection scan</text>
        <text x="380" y="236" textAnchor="middle" fill="#c9b47a" fontSize="10">PII · length · allow-lists</text>

        {/* A -> B */}
        <line x1="460" y1="215" x2="488" y2="215" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#guardArrow)" />

        {/* B: LLM */}
        <rect x="490" y="180" width="130" height="70" rx="10" fill="#150e24" stroke="#7c3aed" strokeWidth="1.6" />
        <text x="555" y="209" textAnchor="middle" fill="#d6c7f5" fontSize="14" fontWeight="800">LLM</text>
        <text x="555" y="230" textAnchor="middle" fill="#a99cc8" fontSize="10">plans · answers · calls tools</text>

        {/* B -> C */}
        <line x1="620" y1="215" x2="648" y2="215" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#guardArrow)" />
        <text x="634" y="206" textAnchor="middle" fill="#9db6c6" fontSize="9">tool call</text>

        {/* C: tool-call guardrail */}
        <rect x="650" y="180" width="190" height="70" rx="10" fill="#1a150e" stroke="#b45309" strokeWidth="1.6" />
        <text x="745" y="203" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="800">② TOOL-CALL GUARDRAIL</text>
        <text x="745" y="221" textAnchor="middle" fill="#c9b47a" fontSize="10">"should this action run?"</text>
        <text x="745" y="236" textAnchor="middle" fill="#c9b47a" fontSize="10">uncertain → human approval</text>

        {/* C -> D */}
        <line x1="745" y1="250" x2="745" y2="328" stroke="#0f766e" strokeWidth="1.6" markerEnd="url(#guardArrow)" />
        <text x="757" y="293" fill="#5eead4" fontSize="9.5" fontWeight="700">allowed</text>

        {/* D: tools */}
        <rect x="650" y="330" width="190" height="70" rx="10" fill="#0b1a15" stroke="#059669" strokeWidth="1.6" />
        <text x="745" y="355" textAnchor="middle" fill="#eaf4fb" fontSize="12.5" fontWeight="700">TOOLS / MCP SERVERS</text>
        <text x="745" y="373" textAnchor="middle" fill="#5eead4" fontSize="10" fontFamily="ui-monospace, monospace">shell · db · http · email</text>
        <text x="745" y="389" textAnchor="middle" fill="#9db6c6" fontSize="9.5">least privilege · sandboxed</text>

        {/* D -> B dashed (tool output re-enters) */}
        <line x1="650" y1="352" x2="600" y2="254" stroke="#b45309" strokeWidth="1.3" strokeDasharray="5 4" markerEnd="url(#guardArrowWarm)" />
        <text x="745" y="420" textAnchor="middle" fill="#c9b47a" fontSize="9.5">result re-enters the loop as UNTRUSTED context</text>

        {/* B -> E */}
        <line x1="545" y1="250" x2="545" y2="328" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#guardArrow)" />
        <text x="533" y="293" textAnchor="end" fill="#9db6c6" fontSize="9">final answer</text>

        {/* E: output guardrail */}
        <rect x="470" y="330" width="150" height="70" rx="10" fill="#1a150e" stroke="#b45309" strokeWidth="1.6" />
        <text x="545" y="353" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="800">③ OUTPUT GUARDRAIL</text>
        <text x="545" y="371" textAnchor="middle" fill="#c9b47a" fontSize="10">schema · PII redaction</text>
        <text x="545" y="386" textAnchor="middle" fill="#c9b47a" fontSize="10">judge · output encoding</text>

        {/* E -> F */}
        <line x1="470" y1="365" x2="442" y2="365" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#guardArrow)" />

        {/* F: user / downstream */}
        <rect x="300" y="330" width="140" height="70" rx="10" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
        <text x="370" y="355" textAnchor="middle" fill="#eaf4fb" fontSize="12" fontWeight="700">USER / DOWNSTREAM</text>
        <text x="370" y="373" textAnchor="middle" fill="#93c5fd" fontSize="10">browser · shell · SQL</text>
        <text x="370" y="388" textAnchor="middle" fill="#93c5fd" fontSize="9.5">treat output like user input</text>

        {/* right column: how each check is made */}
        <rect x="880" y="150" width="280" height="270" rx="16" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.8" />
        <text x="1020" y="178" textAnchor="middle" fill="#9fe8da" fontSize="11.5">four mechanisms — stack them, cheapest first</text>

        <rect x="896" y="192" width="248" height="46" rx="7" fill="#0e241d" stroke="#1f5e4e" strokeWidth="0.9" />
        <text x="908" y="210" fill="#6ee7b7" fontSize="11.5" fontWeight="700">1 · Rules &amp; schema</text>
        <text x="908" y="226" fill="#9fe8da" fontSize="10">regex · allow-lists · JSON validation · µs</text>

        <rect x="896" y="244" width="248" height="46" rx="7" fill="#0e241d" stroke="#1f5e4e" strokeWidth="0.9" />
        <text x="908" y="262" fill="#6ee7b7" fontSize="11.5" fontWeight="700">2 · Guard / classifier model</text>
        <text x="908" y="278" fill="#9fe8da" fontSize="10">Llama Guard · moderation API · ~100s of ms</text>

        <rect x="896" y="296" width="248" height="46" rx="7" fill="#0e241d" stroke="#1f5e4e" strokeWidth="0.9" />
        <text x="908" y="314" fill="#6ee7b7" fontSize="11.5" fontWeight="700">3 · Calibrated decision model</text>
        <text x="908" y="330" fill="#9fe8da" fontSize="10">typed verdict + confidence you can threshold</text>

        <rect x="896" y="348" width="248" height="46" rx="7" fill="#0e241d" stroke="#1f5e4e" strokeWidth="0.9" />
        <text x="908" y="366" fill="#6ee7b7" fontSize="11.5" fontWeight="700">4 · Policy engine + human approval</text>
        <text x="908" y="382" fill="#9fe8da" fontSize="10">hard limits · HITL for payments, deletes, sends</text>

        <text x="1020" y="410" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace">fail closed · log every verdict</text>

        {/* bottom band */}
        <rect x="48" y="470" width="1104" height="90" rx="14" fill="#1a150e" stroke="#b45309" strokeWidth="1.3" />
        <text x="600" y="498" textAnchor="middle" fill="#fde68a" fontSize="13.5" fontWeight="800">
          GUARDRAILS ARE A LAYER, NOT A FIX — NO SINGLE FILTER RELIABLY STOPS PROMPT INJECTION
        </text>
        <text x="600" y="521" textAnchor="middle" fill="#e8d9a8" fontSize="12">
          measured quality varies wildly: one 2025 test found 0.1%–13.1% of benign prompts blocked and 8%–47% of jailbreaks let through across three platforms
        </text>
        <text x="600" y="543" textAnchor="middle" fill="#e8d9a8" fontSize="12">
          measure false positives AND false negatives on YOUR traffic · default uncertain actions to approval · keep attacker-controlled text out of the decision input
        </text>

        <text x="1152" y="596" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default AIGuardrailsHeroDiagram;
