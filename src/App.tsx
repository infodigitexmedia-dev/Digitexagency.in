import React from 'react';
import { WebsiteProvider, useWebsite } from './context/WebsiteContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { AboutSection } from './sections/AboutSection';
import { StatsSection } from './sections/StatsSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { ContactSection } from './sections/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { InquiryModal } from './components/InquiryModal';
import { AdminLoginModal } from './admin/AdminLoginModal';
import { AdminLayout } from './admin/AdminLayout';

const MainAppContent: React.FC = () => {
  const { activeView, isAdminAuthenticated, toastMessage } = useWebsite();

  // If in admin view and authenticated, display the admin layout
  if (activeView === 'admin' && isAdminAuthenticated) {
    return <AdminLayout />;
  }

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#E51B23]/10 selection:text-[#E51B23]">
      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ProjectModal />
      <InquiryModal />
      <AdminLoginModal />

      {/* Floating System Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#111111] text-white px-4 py-2.5 rounded-md shadow-lg text-xs font-semibold flex items-center gap-2 border border-gray-700 animate-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#E51B23]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <WebsiteProvider>
      <MainAppContent />
    </WebsiteProvider>
  );
}
