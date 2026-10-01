import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { OwnerAuthProvider } from './context/OwnerAuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppQuickButton } from './components/common/WhatsAppQuickButton';
import { FloatingQuoteButton } from './components/common/FloatingQuoteButton';
import { ScrollToTop } from './components/common/ScrollToTop';
import { SeoHead } from './components/common/SeoHead';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { IndustryDetailPage } from './pages/IndustryDetailPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { GetAQuotePage } from './pages/GetAQuotePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Owner Portal CMS Pages
import { OwnerLoginPage } from './pages/owner/OwnerLoginPage';
import { OwnerPortalPage } from './pages/owner/OwnerPortalPage';
import { OwnerProtectedRoute } from './components/owner/OwnerProtectedRoute';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isOwnerPortal =
    location.pathname.startsWith('/owner') ||
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/portal');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#111111] font-sans antialiased selection:bg-[#E11D2E] selection:text-white">
      <ScrollToTop />
      <SeoHead />
      {!isOwnerPortal && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isOwnerPortal && <Footer />}
      {!isOwnerPortal && <WhatsAppQuickButton />}
      {!isOwnerPortal && <FloatingQuoteButton />}
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <OwnerAuthProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              {/* Primary Multi-Page Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/industries/:slug" element={<IndustryDetailPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/get-a-quote" element={<GetAQuotePage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Owner Portal CMS Routes */}
              <Route path="/owner/login" element={<OwnerLoginPage />} />
              <Route
                path="/owner/*"
                element={
                  <OwnerProtectedRoute>
                    <OwnerPortalPage />
                  </OwnerProtectedRoute>
                }
              />
              <Route
                path="/owner"
                element={
                  <OwnerProtectedRoute>
                    <OwnerPortalPage />
                  </OwnerProtectedRoute>
                }
              />

              {/* Redirects from previous legacy dashboard/portal routes */}
              <Route path="/portal" element={<Navigate to="/owner" replace />} />
              <Route path="/dashboard" element={<Navigate to="/owner" replace />} />

              {/* Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </OwnerAuthProvider>
    </DataProvider>
  );
}
