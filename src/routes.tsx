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
const OpenAIHuggingFacePost = lazy(() => import("./pages/OpenAIHuggingFacePost"));
const GithubBugBountyPost = lazy(() => import("./pages/GithubBugBountyPost"));
const Resources = lazy(() => import("./pages/Resources"));
const Projects = lazy(() => import("./pages/Projects"));
const Authors = lazy(() => import("./pages/Authors"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage"));

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
      <Route path="/blog/openai-models-hacked-hugging-face" element={<OpenAIHuggingFacePost />} />
      <Route path="/blog/github-bug-bounty-ai-slop" element={<GithubBugBountyPost />} />
      <Route path="/blog/hermes-agent-nous-research-guide" element={<HermesAgentPost />} />
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
