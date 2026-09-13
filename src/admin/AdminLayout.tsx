import React, { useState } from 'react';
import { useWebsite } from '../context/WebsiteContext';
import { Logo } from '../components/Logo';
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Image as ImageIcon,
  Layers,
  FileText,
  PhoneCall,
  BarChart3,
  Settings,
  Eye,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

import { OverviewTab } from './tabs/OverviewTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { ServicesTab } from './tabs/ServicesTab';
import { TestimonialsTab } from './tabs/TestimonialsTab';
import { GalleryTab } from './tabs/GalleryTab';
import { ContentTab } from './tabs/ContentTab';
import { ContactTab } from './tabs/ContactTab';
import { StatsTab } from './tabs/StatsTab';
import { SettingsTab } from './tabs/SettingsTab';

export const AdminLayout: React.FC = () => {
  const { setActiveView, logoutAdmin, toastMessage } = useWebsite();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: '1. Overview', icon: LayoutDashboard },
    { id: 'testimonials', label: '2. Testimonials', icon: MessageSquare },
    { id: 'projects', label: '3. Projects', icon: Briefcase },
    { id: 'gallery', label: '4. Gallery', icon: ImageIcon },
    { id: 'services', label: '5. Services', icon: Layers },
    { id: 'content', label: '6. Website Content', icon: FileText },
    { id: 'contact', label: '7. Contact Info', icon: PhoneCall },
    { id: 'statistics', label: '8. Statistics', icon: BarChart3 },
    { id: 'settings', label: '9. Settings', icon: Settings },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab onNavigate={(tabId) => setActiveTab(tabId)} />;
      case 'testimonials':
        return <TestimonialsTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'gallery':
        return <GalleryTab />;
      case 'services':
        return <ServicesTab />;
      case 'content':
        return <ContentTab />;
      case 'contact':
        return <ContactTab />;
      case 'statistics':
        return <StatsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab onNavigate={(tabId) => setActiveTab(tabId)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col antialiased">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-1.5 text-gray-600 hover:text-black rounded"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="hidden sm:inline-block text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono font-semibold">
              Owner CMS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('public')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#E51B23]" />
            <span>View Website</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 rounded transition-colors"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar Desktop */}
        <aside className="hidden md:block w-64 border-r border-gray-200 bg-white p-4 shrink-0">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
            Owner Management
          </div>
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-md transition-colors text-left ${
                    isActive
                      ? 'bg-[#E51B23] text-white shadow-xs'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 bg-white p-4 z-50 flex flex-col h-full shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-3">
                <span className="text-xs font-bold uppercase text-gray-500">Dashboard Menu</span>
                <button onClick={() => setMobileSidebarOpen(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <nav className="space-y-1 flex-1 overflow-y-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-md text-left ${
                        isActive
                          ? 'bg-[#E51B23] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {renderActiveTab()}
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#111111] text-white px-4 py-2.5 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-2 border border-gray-700 animate-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#E51B23]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
