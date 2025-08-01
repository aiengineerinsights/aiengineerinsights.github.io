
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogsPage from "./pages/BlogsPage";
import BlogPost1 from "./pages/BlogPost1";
import A2ABlogPost from "./pages/A2ABlogPost";
import BlogPost2 from "./pages/BlogPost2";
import BlogPost3 from "./pages/BlogPost3";
import OllamaBlogPost from "./pages/OllamaBlogPost";
import Resources from "./pages/Resources";
import Projects from "./pages/Projects";
import Authors from "./pages/Authors";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/blog/google-a2a" element={<A2ABlogPost />} />
            <Route path="/blog/ollama-mac-local-ai-2025" element={<OllamaBlogPost />} />
            <Route path="/blog/mlops-best-practices" element={<BlogPost1 />} />
            <Route path="/blog/llm-deployment-challenges" element={<BlogPost2 />} />
            <Route path="/blog/building-robust-ai-data-pipelines" element={<BlogPost3 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
