
import { ArrowLeft, Clock, User, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import profilePic from '@/assets/vishnu_lanka.jpg';
import coverPic from '@/assets/a2a_cover.png';
import ssePic from '@/assets/a2a_sse.png';
import { BarChart3 } from "lucide-react";
import TableOfContents from "@/components/TableOfContents";

const A2ABlogPostFull = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pythonCodeSnippet = `
class FileContent(BaseModel):
    name: str | None = None
    mimeType: str | None = None
    bytes: str | None = None    # base64 content
    uri: str | None = None      # link to content

    @model_validator(mode='after')
    def check_content(self):
        if not (self.bytes or self.uri):
            raise ValueError("Either 'bytes' or 'uri' must be present in the file data")
        if self.bytes and self.uri:
            raise ValueError("Only one of 'bytes' or 'uri' can be present in the file data")
        return self
`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20">
      <div className="flex gap-8">
        <TableOfContents />
        <div className="flex-1 max-w-4xl">
          {/* Back Button */}
          <Link to="/blogs">
            <Button variant="ghost" className="mb-8 group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Insights
            </Button>
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-2 mb-4">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-glow rounded-full px-3 py-1">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">Agentic AI</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Architectural Insights: A2A as a Protocol for Peer AI Agents
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              An open standard from Google for inter-agent communication, enabling AI agents to collaborate as peers without exposing their internal workings.
            </p>

            {/* Author Info */}
            <Card className="p-6 bg-gradient-card border-border">
              <div className="flex items-center space-x-4">
              <img 
                    src={profilePic}
                    alt="Vishnu Vardhan Sai Lanka"
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Vishnu Vardhan Sai Lanka</h3>
                  <p className="text-muted-foreground">AI Engineer</p>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Intermediate
                </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    July 25, 2025
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    15 min read
                  </div>
                </div>
              </div>
            </Card>
          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none text-justify">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Agent2Agent (A2A) <sup>[1]</sup> protocol is an open standard from Google for inter-agent communication. It enables AI agents (regardless of framework or vendor) to talk to each other as peers, without exposing their internal workings. Under the hood, A2A's design reveals a series of details that go beyond a typical API. This outline attempts to detail some fundamental (maybe non-obvious) design choices in A2A, highlighting why they're clever or architecturally significant for AI engineers.
              </p>
            </section>

            {/* Representative Image */}
            <div className="mb-8">
                <img
                  src={coverPic}
                  alt="A2A Protocol Illustration"
                  className="w-full rounded-xl shadow-md object-cover"
                />
                <p className="text-center text-muted-foreground text-sm italic mt-2">
                  Illustration of the A2A Protocol Architecture; Source: AI-generated :XD
                </p>

            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">JSON-RPC 2.0</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                One immediate design choice is A2A's communication protocol: it runs on plain <strong>HTTP</strong> using JSON-RPC 2.0<sup>[2]</sup> as the message format. Instead of inventing a custom protocol or using heavyweight gRPC, A2A piggybacks on a well-understood JSON RPC schema. This has several subtle advantages:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                <li><strong>Uniform Interface:</strong> JSON-RPC provides a standard envelope (<code>jsonrpc</code>, <code>method</code>, <code>params</code>, <code>id</code>) for all calls. A2A uses this to define methods like `"tasks/send"`, `"tasks/get"`, etc., without needing multiple REST endpoints. Every request and response conforms to one structure, simplifying client and server implementation.</li>
                <li><strong>Ease of Implementation:</strong> By using JSON over HTTP, A2A is instantly compatible with web infrastructure (proxies, auth headers, etc.) and developers can leverage existing JSON-RPC libraries. The spec explicitly notes the goal of reusing "well-understood standards (HTTP, JSON-RPC 2.0, Server-Sent Events)" to keep things simple.</li>
                <li><strong>Built-in Error Semantics:</strong> JSON-RPC defines error objects and codes. A2A extends these with agent-specific codes (e.g. <code>TaskNotFoundError</code>) within the reserved range. This reuse means error handling is consistent and easily extensible without a bespoke error format.</li>
                <li><strong>RPC Flexibility:</strong> Method names are strings, so adding new capabilities (e.g. a future `"tasks/resume"`) doesn't require a protocol overhaul – just define a new method. This matches A2A's extensibility philosophy.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Task Lifecycle: Long-Running, Stateful Interactions</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A2A introduces the concept of a <strong>Task</strong> as the fundamental unit of work. This is more than a single request/response; a Task is a stateful conversation or job that can involve multiple messages and steps. Designing around tasks allows A2A to handle complex, long-running or multi-turn interactions gracefully:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                  <li><strong>Client-Generated Task IDs:</strong> Unusually, the client is responsible for generating a unique Task ID when starting a new task. The server then uses that ID for all future references. This inversion (versus typical server-generated IDs) means the client can create an ID (e.g., a UUID) and immediately use it in a request. It avoids an extra "create task" call – the first `tasks/send` both creates and identifies the task. It also guarantees the client can correlate any responses or events to the correct task without confusion. The server <strong>must</strong> stick to that ID in all updates. This design trades a bit of responsibility to the client for a simpler protocol flow. In practice, it works like starting a conversation: the client says "New Task #123: do X", and the agent replies referencing "Task #123."</li>
                  <li><strong>Explicit Task State Machine:</strong> Every task has a <strong>state</strong> that the protocol tracks (e.g. `submitted`, `working`, `input-required`, `completed`, `failed`, etc.). Instead of implicit status, A2A makes the status visible and structured. For example, if an agent needs more information or a user decision to continue, it can transition the task to `input-required` state. The client sees this state and knows the task is waiting on it to send additional input (perhaps credentials or clarification). This explicit pause/resume mechanism is a clever way to support human-in-the-loop workflows. It's not just request-response; it's request <em>… maybe more requests …</em> then response. An AI agent can ask for missing info in a formal way, and the client can resume the task by sending another message with the same task ID.</li>
                  <li><strong>Long-Running Tasks & Sessions:</strong> Tasks can naturally span a long time (minutes, hours, even days if needed). A2A was built "async first," meaning it anticipates tasks that don't finish immediately. The task remains addressable via its ID for its lifetime, and the server can send intermediate updates (more on that in streaming). Additionally, tasks have an optional <strong>sessionId</strong> for grouping. A session can tie multiple task IDs together (for example, a user's ongoing session might involve several related tasks with a common sessionId). This is useful for context: an agent might maintain some shared context or preferences across tasks in the same session. It's an architectural nod to conversation continuity, without hard-coding any particular approach to context sharing.</li>
                  <li><strong>Embedded History and Metadata:</strong> Each Task can carry a <strong>history</strong> of recent messages and <strong>artifacts</strong> (outputs) produced. The client can request the server to include N latest messages in any response by setting `historyLength` in a request. This is subtle but important: it means if a client loses context (say it restarted), it can ask the agent to return some context with the next reply, avoiding complete resends. It also helps logging or debugging – the protocol itself can return conversation snippets. Arbitrary metadata on tasks is also allowed for extensibility (e.g. to attach trace IDs, domain-specific info, etc.).</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Multimodal Messages via Part Unions</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A2A is built to be <strong>modality-agnostic</strong> from the ground up. Rather than assume all agent communication is text-based, it supports rich content like files and structured data. The way it does this is elegant: each message is composed of one or more <strong>Parts</strong>, where each Part is a typed content unit. This design allows a single message to include text, images, JSON data, etc., in combination. Key aspects include:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                <li><strong>Discriminated Union of Part Types:</strong> The protocol defines a union of `TextPart`, `FilePart`, and `DataPart` (and could be extended with more). Each part has a `type` field as a discriminator and a content field. For example, a TextPart has `text` content, a FilePart has a `file` (with file details), and a DataPart carries a JSON object/array in a `data` field. By structuring messages this way, A2A can carry multimodal info in a single turn. An agent's reply could include a `TextPart` "Here is the chart:" and a `FilePart` with an image file of the chart – all as one message. This is more powerful than just sending a URL or a separate message for the image.</li>
                <li><strong>Structured Data Exchanges:</strong> The <strong>DataPart</strong> is particularly notable. It allows agents to exchange JSON data structures directly, which is useful for forms, parameters, or any machine-readable info. Instead of forcing every piece of information through natural language, agents can send a JSON payload when appropriate (for instance, one agent might send another a structured knowledge graph or a set of key-value results from a database). The DataPart comes with an optional `metadata` that could include a schema reference or version. This hints at future interoperability – an agent could declare "I'm sending you data of type X schema" and the other agent could validate or parse accordingly. For AI engineers, this design prompts interesting possibilities: agents could dynamically agree on data formats or fall back to JSON Schema to understand each other's data structures. It moves agent communication closer to API-like data exchange when needed, rather than everything being free-form text.</li>
                <li><strong>File Transfer Flexibility:</strong> Handling files between agents is tricky (images, PDFs, etc.). A2A's <strong>FilePart</strong> design smartly provides two ways to send a file: either embed it as Base64 bytes, or provide a URI where the file can be fetched. The protocol insists that exactly one of these is used to avoid ambiguity. This dual approach is subtle but powerful – small files or quick data (like a thumbnail or a short text snippet) can be inlined for simplicity, whereas large files can be hosted elsewhere (cloud storage, etc.) and just referenced to avoid bloat. The Agent Card even allows the agent to specify if it prefers certain file transfer methods or size limits (not explicitly in the snippet, but implied by capabilities). Notably, the reference can be any URI the agents agree on (could be an HTTP link, or an internal reference if they share a storage system). The decision to not mandate one single method (like always base64 in JSON) is an engineering pragmatism: it preserves performance and bandwidth when dealing with big media.</li>
                <li><strong>Multi-Part Messages:</strong> By allowing multiple Parts in one message, A2A anticipates richer interactions. An agent could send a primary answer as text and an additional context as structured data, or multiple files at once (e.g. a ZIP plus a textual summary). The protocol defines that a `Message` <strong>must contain at least one part</strong>, but can have many. This avoids the need for separate channels for attachments or out-of-band data – everything stays in one conversational context (one Task). For AI systems, this is architecturally neat: it means you can upgrade an agent to handle images or PDFs simply by adding new part types, without redesigning the control flow.</li>
              </ul>
              <h3 className="text-xl font-semibold mt-6 mb-2">
                Example – FilePart Enforcement in Code
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                In the Python reference implementation, this rule is enforced with a validator that ensures only one of `bytes` or `uri` is non-null, raising an error if both or neither are provided. This prevents mistakes where an agent might accidentally send a huge file both inline and by link. Below is a snippet illustrating this check:
              </p>
              <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto my-4"><code>{pythonCodeSnippet}</code></pre>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Streaming and Async Patterns: SSE, Long Polling, and Webhooks</h2>

              <div className="mb-8">
                <img
                  src={ssePic}
                  alt="A2A Protocol Illustration"
                  className="w-full rounded-xl shadow-md object-cover"
                />
                <p className="text-center text-muted-foreground text-sm italic mt-2">
                Modes of Interaction for task management.
                </p>

            </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Real-time responsiveness and asynchronous processing are crucial in multi-agent settings. A2A's designers recognized that some tasks will produce incremental results (e.g., streaming a large language model's output) and some tasks will take a long time where a client can't just hang the HTTP call open. To handle this, A2A builds in multiple interaction modes:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                  <li><strong>Synchronous Call (Blocking):</strong> The simplest mode is just calling `tasks/send` and getting a response when the task is done. This works if the agent can complete the task quickly. But A2A doesn't stop there – it treats this as just one possibility.</li>
                  <li><strong>Server-Sent Events<sup>[3]</sup> (Streaming):</strong> For real-time updates, A2A uses <strong>SSE (Server-Sent Events)</strong>, a unidirectional streaming mechanism over HTTP. If an agent's <strong>Agent Card sets</strong> `capabilities.streaming: true`, clients can invoke `tasks/sendSubscribe` to initiate a task and keep the HTTP connection open for a stream of results. The server responds with `Content-Type: text/event-stream` and then sends events as the task progresses. Each event is essentially a JSON-RPC Response chunk (with the same `id` as the original request) carrying either a status update or a new artifact chunk. This design piggybacks JSON-RPC over SSE – the events are just JSON text in the SSE channel.</li>
                  <li><strong>Resuming Streams:</strong> Recognizing that network hiccups happen, A2A even provides a `tasks/resubscribe` method. If a client gets disconnected mid-stream, it can call `tasks/resubscribe` (with the same Task ID) to reopen the SSE stream for that task. The spec leaves it to the server whether it will replay missed events or just continue with new ones, but the capability is there. This is a thoughtful addition for robustness – it acknowledges real-world issues like dropped connections or clients moving between networks.</li>
                  <li><strong>Asynchronous via Webhook (Push):</strong> Not all clients can keep a connection open. For example, a client might be a backend service that wants the result whenever it's ready, or an agent that handles many tasks in parallel and doesn't want a thread per task. A2A handles this with <strong>push notifications</strong>. If an agent's card says `pushNotifications: true`, the client can register a <strong>webhook URL</strong> for a task. Once set, the agent will, upon task completion (or significant updates), perform an HTTP POST to that URL with the task outcome. In effect, the agent becomes a client briefly, "pushing" the result out.</li>
                  <li><strong>Polling as Fallback:</strong> If neither SSE nor push is available (or if a client simply prefers), there's always polling. The `tasks/get` method allows a client to ask for the current status and results of a task at any time. A typical pattern might be: client calls `tasks/send` (which returns immediately with task initial state), then the client periodically calls `tasks/get` until the task's `status.state` is `"completed"` or another terminal state.</li>
              </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Preserving Opacity and Security Boundaries</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                    A driving principle of A2A is that agents can collaborate <strong>without revealing their secret sauce</strong>. Agents remain opaque to each other, sharing only what they choose to via the protocol. Several design decisions enforce or encourage this separation, which has implications for security and IP protection:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                    <li><strong>No Internal State Leakage:</strong> The protocol explicitly avoids any requirement for an agent to divulge its internal chain-of-thought, memory, or tooling. Agents communicate through Tasks, Messages, and Artifacts – outward-facing representations of their actions. The design goal is stated clearly: agents should achieve goals "<strong>without needing access to each other's internal state, memory, or tools</strong>".</li>
                    <li><strong>No Implicit Identity Sharing:</strong> A2A deliberately <strong>keeps identity and auth at the HTTP layer</strong> instead of inside the JSON payload. There's no "user_id" or API key field in the JSON-RPC calls; instead, standard HTTP Auth (bearer tokens, Basic auth, mTLS, etc.) is used as per the Agent Card's instructions. This design choice decouples the protocol logic from authentication logic.</li>
                    <li><strong>Fine-Grained Authorization via Skills:</strong> While A2A doesn't transmit who the user is in JSON, an agent can enforce policy on what another agent is allowed to do based on the <strong>skill or action invoked</strong>. The spec suggests that servers <em>may</em> authorize requests based on "the specific skills requested" and other factors like OAuth scopes of the client's token.</li>
                    <li><strong>Security Considerations in Discovery:</strong> The Agent Card itself might contain sensitive data (like internal endpoint URLs or OAuth info). The spec recommends securing the Agent Card endpoint (e.g., require auth to fetch it, or restrict it) if needed. It also discourages putting any actual secrets in the card (like not embedding raw API keys).</li>
                    <li><strong>Opaque vs Transparent Collaboration – A Philosophical Stance:</strong> It's worth noting that A2A's approach to keep internal reasoning hidden is a choice. One could imagine an alternative where agents share their intermediate thoughts or chain-of-thought to better coordinate. A2A explicitly <em>does not</em> do that – it treats agents more like microservices than like co-running processes. This has architectural benefits (clear interfaces, encapsulation) but also invites debate: might agents achieve deeper synergy if they shared more of their internal state?</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Extensibility and Future-Proofing the Protocol</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                    A2A is labeled version 0.1.0 – it's early days. Yet the design shows signs that the authors intended it to evolve and integrate with other standards, rather than be a closed solution. Some notable extensibility decisions:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                    <li><strong>Metadata Everywhere:</strong> Almost every major object in the A2A schema has a `metadata` field for arbitrary key-value pairs (Task, Message, Part, Artifact, etc.). This is a classic forward-compatibility move. It means if future versions of A2A (or private extensions) need to include extra info – say a language code on a message, or a trace ID for monitoring – they can drop it into metadata without breaking the protocol.</li>
                    <li><strong>Generic Method Space:</strong> The JSON-RPC method naming scheme (`"tasks/..."`) gives a namespace where new methods can live. Already, we see placeholders or potential for more: e.g., `tasks/cancel` exists, and the Agent Card has a flag `stateTransitionHistory` reserved for a future feature. One could imagine new methods like `tasks/pause` or `tasks/list` being added later.</li>
                    <li><strong>Complementary Protocols, Not One Protocol to Rule Them All:</strong> A2A's scope is intentionally limited to agent-to-agent <strong>communication</strong> and task delegation. It consciously does <em>not</em> cover how an agent connects to its own tools or large language model. That's the domain of another emerging standard, <strong>Model Context Protocol (MCP)</strong><sup>[4]</sup>, which A2A is designed to complement rather than replace. This separation of concerns is an architectural decision: it keeps A2A focused and simpler.</li>
                    <li><strong>Community and Open Evolution:</strong> While not a technical facet of the protocol itself, it's worth noting that A2A is open-sourced and clearly inviting community contributions. The design decisions we've highlighted (JSON-based, metadata fields, skill descriptors) all suggest an intent to make the protocol <strong>general-purpose</strong> and not tied to Google's internal needs alone.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Agent Cards for Discovery and Capability Negotiation</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                    How do agents find each other and know what they can do? A2A's answer is the <strong>Agent Card</strong>, a small JSON manifest each agent publishes. Every A2A agent <strong>must provide an Agent Card</strong> describing itself. This design echoes practices like OpenAPI docs or service discovery, but tailored to AI agents:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                    <li><strong>Discovery as First-Class:</strong> The Agent Card is typically hosted at a well-known URL (by default `/.well-known/agent.json` on the agent's server). This means an agent can be "found" if you know its domain. Alternatively, Agent Cards can be listed in registries or exchanged out-of-band. By not hard-coding a central directory, A2A stays flexible.</li>
                    <li><strong>Capabilities Advertisement:</strong> The Agent Card contains fields for the agent's <strong>protocol capabilities</strong> like `streaming` and `pushNotifications` support. This is a subtle negotiation mechanism. For example, if `streaming: true` is advertised, a client knows it can use SSE realtime updates with this agent; if false, the client will stick to polling or synchronous calls.</li>
                    <li><strong>Skills and Modalities:</strong> Each agent lists its <strong>skills</strong> – essentially the tasks or domains it can handle – in the card. A skill comes with a name, description, example usage, and even preferred input/output formats. Listing skills transforms the black-box agent into something discoverable and invokable by other agents.</li>
                    <li><strong>Default I/O Formats:</strong> The Agent Card can specify default input and output content types (MIME types) that the agent expects, plus overrides per skill. This is a clever way to set expectations on how to communicate. For example, an agent might generally take `text/plain` input, but for a particular skill it might also accept `application/json`.</li>
                </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                In sum, A2A's design shows a maturation in the agent space: moving from ad-hoc integrations to protocol-driven interoperability. It carries lessons from software engineering into the AI realm, and it does so with a mix of conceptual simplicity and technical nuance. As AI practitioners, understanding these decisions helps us design better systems and perhaps contribute to the conversation of how agents should talk to each other. The hope is that by embracing protocols like A2A, we enable a richer AI ecosystem where <strong>specialized agents can freely cooperate</strong> – each secure in its own box, yet working together through a common language to achieve what none could do alone.
              </p>
            </section>
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Citations</h2>
              <ul className="list-none pl-0 space-y-3 text-muted-foreground">
                <li>
                  [1] Google. (2024). <strong>Agent2Agent (A2A) Protocol Specification</strong>. 
                  <a 
                    href="https://github.com/google/A2A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors ml-1"
                  >
                    GitHub Repository
                  </a>.
                </li>
                <li>
                  [2] JSON-RPC Working Group. (2013). <strong>JSON-RPC 2.0 Specification</strong>. 
                  <a 
                    href="https://www.jsonrpc.org/specification"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors ml-1"
                  >
                    jsonrpc.org
                  </a>.
                </li>
                <li>
                  [3] WHATWG. (2024). <strong>Server-Sent Events (SSE)</strong>. 
                  <a 
                    href="https://html.spec.whatwg.org/multipage/server-sent-events.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors ml-1"
                  >
                    HTML Living Standard
                  </a>.
                </li>
                <li>
                  [4] Model Context Protocol (MCP). (2024). <strong>AI Tooling & Context Protocol</strong>. 
                  <a 
                    href="https://github.com/modelcontextprotocol/specification"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors ml-1"
                  >
                    GitHub Specification
                  </a>.
                </li>
              </ul>
            </section>
          </article>
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );
};

export default A2ABlogPostFull;
