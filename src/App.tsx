import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";

const WorkflowsPage = lazy(() => import("./pages/WorkflowsPage"));
const BuyPage = lazy(() => import("./pages/BuyPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const BlogIndexPage = lazy(() => import("./pages/blog/BlogIndexPage"));
const BlogPostPage = lazy(() => import("./pages/blog/BlogPostPage"));
const AdminBlogList = lazy(() => import("./pages/admin/AdminBlogPage").then((m) => ({ default: m.AdminBlogList })));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogPage").then((m) => ({ default: m.AdminBlogEditor })));
const NotFound = lazy(() => import("./pages/NotFound"));
import ChatLauncher from "./components/ChatLauncher";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/workflows" element={<WorkflowsPage />} />
                <Route path="/buy/:id" element={<BuyPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogIndexPage />} />
                <Route path="/blog/page/:page" element={<BlogIndexPage />} />
                <Route path="/blog/tag/:tag" element={<BlogIndexPage tag />} />
                <Route path="/blog/tag/:tag/page/:page" element={<BlogIndexPage tag />} />
                <Route path="/blog/preview/:token" element={<BlogPostPage preview />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/admin/blog" element={<AdminBlogList />} />
                <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
                <Route path="/admin/blog/:id" element={<AdminBlogEditor />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ChatLauncher />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
