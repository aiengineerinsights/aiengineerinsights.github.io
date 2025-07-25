
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
import Resources from "./pages/Resources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/blog/google-a2a" element={<A2ABlogPost />} />
          <Route path="/blog/mlops-best-practices" element={<BlogPost1 />} />
          <Route path="/blog/llm-deployment-challenges" element={<BlogPost2 />} />
          <Route path="/blog/building-robust-ai-data-pipelines" element={<BlogPost3 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
