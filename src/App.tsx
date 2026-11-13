
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import CardapioFutsal from "./pages/CardapioFutsal";
import TeamMember from "./pages/TeamMember";
import CapiAprende from "./pages/CapiAprende";
import CadernosTecnicos from "./pages/CadernosTecnicos";
import Rifa from "./pages/Rifa";
import RifaPedido from "./pages/RifaPedido";
import RifaAdmin from "./pages/RifaAdmin";
import Imprensa from "./pages/Imprensa";
import ImprensaRelease from "./pages/ImprensaRelease";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import LinkTracker from "./components/LinkTracker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <LinkTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/projetos" element={<Projects />} />
          <Route path="/projetos/:slug" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/cardapio-futsal" element={<CardapioFutsal />} />
          <Route path="/capi-aprende" element={<CapiAprende />} />
          <Route path="/equipe/:slug" element={<TeamMember />} />
          <Route path="/2026/cadernos-tecnicos" element={<CadernosTecnicos />} />
          <Route path="/imprensa" element={<Imprensa />} />
          <Route path="/imprensa/:slug" element={<ImprensaRelease />} />
          <Route path="/rifa" element={<Rifa />} />
          <Route path="/rifa/pedido/:id" element={<RifaPedido />} />
          <Route path="/rifa/admin" element={<RifaAdmin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
