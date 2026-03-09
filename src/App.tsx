import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GuideLayout } from "@/components/layout/GuideLayout";
import Index from "./pages/Index";
import IndustryOverview from "./pages/IndustryOverview";
import DesignGuide from "./pages/DesignGuide";
import UiGuide from "./pages/UiGuide";
import UxGuide from "./pages/UxGuide";
import PageTemplates from "./pages/PageTemplates";
import ContentGuide from "./pages/ContentGuide";
import ProofSystem from "./pages/ProofSystem";
import SeoGeo from "./pages/SeoGeo";
import Checklist from "./pages/Checklist";
import ClientBrief from "./pages/ClientBrief";
import SiteBlueprint from "./pages/SiteBlueprint";
import ImplementationRules from "./pages/ImplementationRules";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<GuideLayout><Index /></GuideLayout>} path="/" />
          <Route element={<GuideLayout><IndustryOverview /></GuideLayout>} path="/industry-overview" />
          <Route element={<GuideLayout><DesignGuide /></GuideLayout>} path="/design-guide" />
          <Route element={<GuideLayout><UiGuide /></GuideLayout>} path="/ui-guide" />
          <Route element={<GuideLayout><UxGuide /></GuideLayout>} path="/ux-guide" />
          <Route element={<GuideLayout><PageTemplates /></GuideLayout>} path="/page-templates" />
          <Route element={<GuideLayout><ContentGuide /></GuideLayout>} path="/content-guide" />
          <Route element={<GuideLayout><ProofSystem /></GuideLayout>} path="/proof-system" />
          <Route element={<GuideLayout><SeoGeo /></GuideLayout>} path="/seo-geo" />
          <Route element={<GuideLayout><Checklist /></GuideLayout>} path="/checklist" />
          <Route element={<GuideLayout><ClientBrief /></GuideLayout>} path="/client-brief" />
          <Route element={<GuideLayout><SiteBlueprint /></GuideLayout>} path="/site-blueprint" />
          <Route element={<GuideLayout><ImplementationRules /></GuideLayout>} path="/implementation-rules" />
          <Route path="*" element={<GuideLayout><NotFound /></GuideLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
