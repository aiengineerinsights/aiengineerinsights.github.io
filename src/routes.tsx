import { Suspense } from "react";
import { lazyWithReload } from "@/lib/lazyWithReload";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy routes split each page into its own chunk, keeping the initial
// bundle small. The prerender entry renders through the same table so
// client and static output can never drift.
const Index = lazyWithReload(() => import("./pages/Index"));
const NotFound = lazyWithReload(() => import("./pages/NotFound"));
const BlogsPage = lazyWithReload(() => import("./pages/BlogsPage"));
const BlogPost1 = lazyWithReload(() => import("./pages/BlogPost1"));
const A2ABlogPost = lazyWithReload(() => import("./pages/A2ABlogPost"));
const AgenticLLMPost = lazyWithReload(() => import("./pages/AgenticLLMPost"));
const GDPvalBlogPost = lazyWithReload(() => import("./pages/GDPvalBlogPost"));
const BlogPost2 = lazyWithReload(() => import("./pages/BlogPost2"));
const BlogPost3 = lazyWithReload(() => import("./pages/BlogPost3"));
const OllamaBlogPost = lazyWithReload(() => import("./pages/OllamaBlogPost"));
const HermesAgentPost = lazyWithReload(() => import("./pages/HermesAgentPost"));
const HermesOpenClawPost = lazyWithReload(() => import("./pages/HermesOpenClawPost"));
const ClaudeWatermarkPost = lazyWithReload(() => import("./pages/ClaudeWatermarkPost"));
const AIDetectorsPost = lazyWithReload(() => import("./pages/AIDetectorsPost"));
const HowToBecomeAIEngineerPost = lazyWithReload(() => import("./pages/HowToBecomeAIEngineerPost"));
const AIEngineerSkillsPost = lazyWithReload(() => import("./pages/AIEngineerSkillsPost"));
const AICodingAgentsPost = lazyWithReload(() => import("./pages/AICodingAgentsPost"));
const HermesInstallPost = lazyWithReload(() => import("./pages/HermesInstallPost"));
const HermesSkillsPost = lazyWithReload(() => import("./pages/HermesSkillsPost"));
const HermesDesktopPost = lazyWithReload(() => import("./pages/HermesDesktopPost"));
const HermesModelsPost = lazyWithReload(() => import("./pages/HermesModelsPost"));
const HermesSecurityPost = lazyWithReload(() => import("./pages/HermesSecurityPost"));
const HermesAlternativesPost = lazyWithReload(() => import("./pages/HermesAlternativesPost"));
const HermesTroubleshootingPost = lazyWithReload(() => import("./pages/HermesTroubleshootingPost"));
const AgentSecurityPost = lazyWithReload(() => import("./pages/AgentSecurityPost"));
const MCPTrustPost = lazyWithReload(() => import("./pages/MCPTrustPost"));
const OpenAIHuggingFacePost = lazyWithReload(() => import("./pages/OpenAIHuggingFacePost"));
const GithubBugBountyPost = lazyWithReload(() => import("./pages/GithubBugBountyPost"));
const ForwardDeployedEngineerPost = lazyWithReload(() => import("./pages/ForwardDeployedEngineerPost"));
const ClaudeCertifiedArchitectPost = lazyWithReload(() => import("./pages/ClaudeCertifiedArchitectPost"));
const CCATrapsPost = lazyWithReload(() => import("./pages/CCATrapsPost"));
const ContextEngineeringGrapeRootPost = lazyWithReload(() => import("./pages/ContextEngineeringGrapeRootPost"));
const AIEngineerSalaryPost = lazyWithReload(() => import("./pages/AIEngineerSalaryPost"));
const RagChunkingStrategiesPost = lazyWithReload(() => import("./pages/RagChunkingStrategiesPost"));
const VectorDatabaseForRagPost = lazyWithReload(() => import("./pages/VectorDatabaseForRagPost"));
const AgentFrameworksComparedPost = lazyWithReload(() => import("./pages/AgentFrameworksComparedPost"));
const AIEngineerInterviewQuestionsPost = lazyWithReload(() => import("./pages/AIEngineerInterviewQuestionsPost"));
const WhatIsMCPPost = lazyWithReload(() => import("./pages/WhatIsMCPPost"));
const Resources = lazyWithReload(() => import("./pages/Resources"));
const Projects = lazyWithReload(() => import("./pages/Projects"));
const Authors = lazyWithReload(() => import("./pages/Authors"));
const PrivacyPolicy = lazyWithReload(() => import("./pages/PrivacyPolicy"));
const RoadmapPage = lazyWithReload(() => import("./pages/RoadmapPage"));
const NewsletterPage = lazyWithReload(() => import("./pages/NewsletterPage"));
const SubscribedPage = lazyWithReload(() => import("./pages/SubscribedPage"));
const AIAgentsExplainedPost = lazyWithReload(() => import("./pages/AIAgentsExplainedPost"));
const MCPvsAPIPost = lazyWithReload(() => import("./pages/MCPvsAPIPost"));
const RagVsFineTuningPost = lazyWithReload(() => import("./pages/RagVsFineTuningPost"));
const HermesClaudeCodePost = lazyWithReload(() => import("./pages/HermesClaudeCodePost"));
const RagEvaluationMetricsPost = lazyWithReload(() => import("./pages/RagEvaluationMetricsPost"));
const WhatIsJevPost = lazyWithReload(() => import("./pages/WhatIsJevPost"));
const JevVsLLMPost = lazyWithReload(() => import("./pages/JevVsLLMPost"));
const HowToUseJevPost = lazyWithReload(() => import("./pages/HowToUseJevPost"));
const LLMvsMLClassificationPost = lazyWithReload(() => import("./pages/LLMvsMLClassificationPost"));
const LLMRoutingPost = lazyWithReload(() => import("./pages/LLMRoutingPost"));
const AIGuardrailsPost = lazyWithReload(() => import("./pages/AIGuardrailsPost"));
const AgentRuntimesPost = lazyWithReload(() => import("./pages/AgentRuntimesPost"));
const EmbeddingModelForRagPost = lazyWithReload(() => import("./pages/EmbeddingModelForRagPost"));

const AppRoutes = () => (
  <Suspense fallback={<div className="min-h-screen bg-background" />}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/ai-engineering-roadmap" element={<RoadmapPage />} />
      <Route path="/newsletter" element={<NewsletterPage />} />
      <Route path="/subscribed" element={<SubscribedPage />} />
      <Route path="/blog/what-are-ai-agents" element={<AIAgentsExplainedPost />} />
      <Route path="/blog/mcp-vs-api" element={<MCPvsAPIPost />} />
      <Route path="/blog/rag-vs-fine-tuning" element={<RagVsFineTuningPost />} />
      <Route path="/blog/hermes-claude-code-orchestration" element={<HermesClaudeCodePost />} />
      <Route path="/blog/rag-evaluation-metrics" element={<RagEvaluationMetricsPost />} />
      <Route path="/blog/what-is-jev" element={<WhatIsJevPost />} />
      <Route path="/blog/jev-vs-llm" element={<JevVsLLMPost />} />
      <Route path="/blog/how-to-use-jev" element={<HowToUseJevPost />} />
      <Route path="/blog/jev-vs-ml-classification" element={<LLMvsMLClassificationPost />} />
      <Route path="/blog/llm-routing" element={<LLMRoutingPost />} />
      <Route path="/blog/ai-guardrails" element={<AIGuardrailsPost />} />
      {/* Renamed from the original slug; keep the old URL redirecting so early links/indexing don't 404. */}
      <Route path="/blog/llm-vs-traditional-ml-classification" element={<Navigate to="/blog/jev-vs-ml-classification" replace />} />
      <Route path="/blog/agent-runtimes-explained" element={<AgentRuntimesPost />} />
      <Route path="/blog/does-claude-watermark-text" element={<ClaudeWatermarkPost />} />
      <Route path="/blog/ai-detectors-vs-humanizers" element={<AIDetectorsPost />} />
      <Route path="/blog/how-to-become-an-ai-engineer" element={<HowToBecomeAIEngineerPost />} />
      <Route path="/blog/ai-engineer-skills" element={<AIEngineerSkillsPost />} />
      <Route path="/blog/best-ai-coding-agents" element={<AICodingAgentsPost />} />
      <Route path="/blog/claude-certified-architect-exam" element={<ClaudeCertifiedArchitectPost />} />
      <Route path="/blog/claude-certified-architect-exam-traps" element={<CCATrapsPost />} />
      <Route path="/blog/ai-engineer-salary" element={<AIEngineerSalaryPost />} />
      <Route path="/blog/forward-deployed-ai-engineer" element={<ForwardDeployedEngineerPost />} />
      <Route path="/blog/context-engineering-graperoot" element={<ContextEngineeringGrapeRootPost />} />
      <Route path="/blog/ai-agent-security-prompt-injection" element={<AgentSecurityPost />} />
      <Route path="/blog/mcp-server-trust-permissions" element={<MCPTrustPost />} />
      <Route path="/blog/openai-models-hacked-hugging-face" element={<OpenAIHuggingFacePost />} />
      <Route path="/blog/github-bug-bounty-ai-slop" element={<GithubBugBountyPost />} />
      <Route path="/blog/hermes-agent-nous-research-guide" element={<HermesAgentPost />} />
      <Route path="/blog/hermes-agent-vs-openclaw" element={<HermesOpenClawPost />} />
      <Route path="/blog/how-to-install-hermes-agent" element={<HermesInstallPost />} />
      <Route path="/blog/hermes-agent-skills" element={<HermesSkillsPost />} />
      <Route path="/blog/hermes-agent-desktop-web-ui" element={<HermesDesktopPost />} />
      <Route path="/blog/hermes-agent-models" element={<HermesModelsPost />} />
      <Route path="/blog/hermes-agent-security" element={<HermesSecurityPost />} />
      <Route path="/blog/hermes-agent-alternatives" element={<HermesAlternativesPost />} />
      <Route path="/blog/hermes-agent-troubleshooting" element={<HermesTroubleshootingPost />} />
      <Route path="/blog/google-a2a" element={<A2ABlogPost />} />
      <Route path="/blog/ollama-mac-local-ai-2025" element={<OllamaBlogPost />} />
      <Route path="/blog/what-makes-llms-agentic" element={<AgenticLLMPost />} />
      <Route path="/blog/openai-gdpval" element={<GDPvalBlogPost />} />
      <Route path="/blog/mlops-best-practices" element={<BlogPost1 />} />
      <Route path="/blog/llm-deployment-challenges" element={<BlogPost2 />} />
      <Route path="/blog/building-robust-ai-data-pipelines" element={<BlogPost3 />} />
      <Route path="/blog/rag-chunking-strategies" element={<RagChunkingStrategiesPost />} />
      <Route path="/blog/vector-database-for-rag" element={<VectorDatabaseForRagPost />} />
      <Route path="/blog/open-source-ai-agent-frameworks" element={<AgentFrameworksComparedPost />} />
      <Route path="/blog/embedding-model-for-rag" element={<EmbeddingModelForRagPost />} />
      <Route path="/blog/ai-engineer-interview-questions" element={<AIEngineerInterviewQuestionsPost />} />
      <Route path="/blog/what-is-mcp" element={<WhatIsMCPPost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
