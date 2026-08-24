import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy routes split each page into its own chunk, keeping the initial
// bundle small. The prerender entry renders through the same table so
// client and static output can never drift.
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const BlogPost1 = lazy(() => import("./pages/BlogPost1"));
const A2ABlogPost = lazy(() => import("./pages/A2ABlogPost"));
const AgenticLLMPost = lazy(() => import("./pages/AgenticLLMPost"));
const GDPvalBlogPost = lazy(() => import("./pages/GDPvalBlogPost"));
const BlogPost2 = lazy(() => import("./pages/BlogPost2"));
const BlogPost3 = lazy(() => import("./pages/BlogPost3"));
const OllamaBlogPost = lazy(() => import("./pages/OllamaBlogPost"));
const HermesAgentPost = lazy(() => import("./pages/HermesAgentPost"));
const HermesOpenClawPost = lazy(() => import("./pages/HermesOpenClawPost"));
const ClaudeWatermarkPost = lazy(() => import("./pages/ClaudeWatermarkPost"));
const AIDetectorsPost = lazy(() => import("./pages/AIDetectorsPost"));
const HowToBecomeAIEngineerPost = lazy(() => import("./pages/HowToBecomeAIEngineerPost"));
const AIEngineerSkillsPost = lazy(() => import("./pages/AIEngineerSkillsPost"));
const AICodingAgentsPost = lazy(() => import("./pages/AICodingAgentsPost"));
const HermesInstallPost = lazy(() => import("./pages/HermesInstallPost"));
const HermesSkillsPost = lazy(() => import("./pages/HermesSkillsPost"));
const HermesDesktopPost = lazy(() => import("./pages/HermesDesktopPost"));
const HermesModelsPost = lazy(() => import("./pages/HermesModelsPost"));
const HermesSecurityPost = lazy(() => import("./pages/HermesSecurityPost"));
const HermesAlternativesPost = lazy(() => import("./pages/HermesAlternativesPost"));
const HermesTroubleshootingPost = lazy(() => import("./pages/HermesTroubleshootingPost"));
const OpenAIHuggingFacePost = lazy(() => import("./pages/OpenAIHuggingFacePost"));
const GithubBugBountyPost = lazy(() => import("./pages/GithubBugBountyPost"));
const ForwardDeployedEngineerPost = lazy(() => import("./pages/ForwardDeployedEngineerPost"));
const ClaudeCertifiedArchitectPost = lazy(() => import("./pages/ClaudeCertifiedArchitectPost"));
const CCATrapsPost = lazy(() => import("./pages/CCATrapsPost"));
const ContextEngineeringGrapeRootPost = lazy(() => import("./pages/ContextEngineeringGrapeRootPost"));
const AIEngineerSalaryPost = lazy(() => import("./pages/AIEngineerSalaryPost"));
const Resources = lazy(() => import("./pages/Resources"));
const Projects = lazy(() => import("./pages/Projects"));
const Authors = lazy(() => import("./pages/Authors"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage"));
const NewsletterPage = lazy(() => import("./pages/NewsletterPage"));
const SubscribedPage = lazy(() => import("./pages/SubscribedPage"));

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
