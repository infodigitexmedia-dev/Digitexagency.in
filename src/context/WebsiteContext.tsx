import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  WebsiteData,
  WebsiteContent,
  ContactInfo,
  ProjectItem,
  ServiceItem,
  TestimonialItem,
  GalleryItem,
  StatisticsData,
  ContactInquiry,
} from '../types';
import { INITIAL_DATA } from '../data/initialData';

interface WebsiteContextType {
  data: WebsiteData;
  isAdminAuthenticated: boolean;
  activeView: 'public' | 'admin';
  setActiveView: (view: 'public' | 'admin') => void;
  selectedProjectForModal: ProjectItem | null;
  setSelectedProjectForModal: (project: ProjectItem | null) => void;
  isInquiryModalOpen: boolean;
  setIsInquiryModalOpen: (open: boolean) => void;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Authentication
  loginAdmin: (pin: string) => Promise<boolean>;
  logoutAdmin: () => void;
  changeAdminPin: (oldPin: string, newPin: string) => Promise<boolean>;

  // Data Actions
  updateContent: (content: Partial<WebsiteContent>) => void;
  updateContact: (contact: Partial<ContactInfo>) => void;
  updateStatistics: (stats: Partial<StatisticsData>) => void;

  // Projects
  addProject: (project: Omit<ProjectItem, 'id' | 'order'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;

  // Services
  addService: (service: Omit<ServiceItem, 'id' | 'order'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  // Testimonials
  addTestimonial: (test: Omit<TestimonialItem, 'id' | 'createdAt'>) => void;
  updateTestimonial: (id: string, test: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'uploadedAt'>) => void;
  deleteGalleryItem: (id: string) => void;
  toggleGalleryVisibility: (id: string) => void;

  // Inquiries
  addInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'date'>) => void;
  deleteInquiry: (id: string) => void;

  // System
  exportDataAsJSON: () => void;
  importDataFromJSON: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'digitex_agency_website_data_v1';
const AUTH_STORAGE_KEY = 'digitex_admin_auth_session';

// Helper for SHA-256 cryptographic hashing (Web Crypto API)
async function computeSha256(message: string): Promise<string> {
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const msgUint8 = new TextEncoder().encode(message);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch {
    // Fallback if subtle crypto unavailable
  }
  return '';
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const WebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<WebsiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);

        // Migrate projects if user previously had old generic placeholder images
        let projects = parsed.projects || INITIAL_DATA.projects;
        if (Array.isArray(projects) && projects.length > 0) {
          const hasOldImage = projects.some(
            (p: ProjectItem) =>
              p.imageUrl && (p.imageUrl.includes('photo-1600585154340') || p.imageUrl.includes('photo-1556228720'))
          );
          if (hasOldImage) {
            projects = INITIAL_DATA.projects;
          }
        }

        // Migrate admin auth pinHash if it contains the old plain passcode
        let adminAuth = { ...INITIAL_DATA.adminAuth, ...(parsed.adminAuth || {}) };
        if (adminAuth.pinHash === 'digitex2026') {
          adminAuth.pinHash = INITIAL_DATA.adminAuth.pinHash;
        }

        // Migrate contact info to official DIGITEX details if old placeholders exist
        let contact = { ...INITIAL_DATA.contact, ...(parsed.contact || {}) };
        if (
          !contact.email ||
          contact.email.includes('digitexagency.com') ||
          contact.email.includes('example.com')
        ) {
          contact.email = INITIAL_DATA.contact.email;
        }
        if (
          !contact.displayPhone ||
          contact.displayPhone.includes('98765') ||
          contact.whatsappNumber?.includes('98765')
        ) {
          contact.displayPhone = INITIAL_DATA.contact.displayPhone;
          contact.whatsappNumber = INITIAL_DATA.contact.whatsappNumber;
        }
        if (
          !contact.instagramUrl ||
          contact.instagramUrl.includes('instagram.com/digitex.agency') ||
          !contact.instagramUrl.includes('digitexagency.in')
        ) {
          contact.instagramUrl = INITIAL_DATA.contact.instagramUrl;
        }

        return {
          ...INITIAL_DATA,
          ...parsed,
          projects,
          adminAuth,
          content: { ...INITIAL_DATA.content, ...(parsed.content || {}) },
          contact,
          statistics: { ...INITIAL_DATA.statistics, ...(parsed.statistics || {}) },
        };
      }
    } catch {
      // Fallback
    }
    return INITIAL_DATA;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });

  const [activeView, setActiveView] = useState<'public' | 'admin'>('public');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const loginAdmin = async (pin: string): Promise<boolean> => {
    const trimmed = pin.trim();
    if (!trimmed) return false;

    // 1. Check secure backend server endpoint first
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey: trimmed }),
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setIsAdminAuthenticated(true);
          sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
          setIsAdminLoginModalOpen(false);
          setActiveView('admin');
          showToast('Welcome back, Owner. Admin session authenticated.');
          return true;
        }
      }
    } catch {
      // Server endpoint not reachable or running in static preview
    }

    // 2. Cryptographic SHA-256 fallback comparison (no plain-text key stored or exposed)
    const hashed = await computeSha256(trimmed);
    // Hash of default passkey Digitex@2026!
    const defaultHash = '7ae0a8fc72855442682456e68cab18b882edb4706be70375b928025ad142e716';
    const validHashes = [defaultHash, data.adminAuth.pinHash];

    if (validHashes.includes(hashed)) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAdminLoginModalOpen(false);
      setActiveView('admin');
      showToast('Welcome back, Owner. Admin session authenticated.');
      return true;
    }

    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setActiveView('public');
    showToast('Logged out of Owner Dashboard successfully.');
  };

  const changeAdminPin = async (oldPin: string, newPin: string): Promise<boolean> => {
    const oldHashed = await computeSha256(oldPin.trim());
    const defaultHash = '7ae0a8fc72855442682456e68cab18b882edb4706be70375b928025ad142e716';
    const validOldHashes = [defaultHash, data.adminAuth.pinHash];

    if (!validOldHashes.includes(oldHashed)) {
      return false;
    }

    const newHashed = await computeSha256(newPin.trim());
    setData((prev) => ({
      ...prev,
      adminAuth: {
        ...prev.adminAuth,
        pinHash: newHashed,
      },
    }));
    showToast('Owner administrative passkey updated successfully.');
    return true;
  };

  const updateContent = (content: Partial<WebsiteContent>) => {
    setData((prev) => ({
      ...prev,
      content: { ...prev.content, ...content },
    }));
    showToast('Website content updated.');
  };

  const updateContact = (contact: Partial<ContactInfo>) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contact },
    }));
    showToast('Contact details updated.');
  };

  const updateStatistics = (stats: Partial<StatisticsData>) => {
    setData((prev) => ({
      ...prev,
      statistics: { ...prev.statistics, ...stats },
    }));
    showToast('Statistics settings updated.');
  };

  // Projects
  const addProject = (projectData: Omit<ProjectItem, 'id' | 'order'>) => {
    const newProject: ProjectItem = {
      ...projectData,
      id: 'proj-' + Date.now(),
      order: data.projects.length + 1,
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
    showToast('New project created.');
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
    showToast('Project updated.');
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    showToast('Project removed.');
  };

  const reorderProjects = (startIndex: number, endIndex: number) => {
    const result = [...data.projects];
    const removed = result.splice(startIndex, 1)[0];
    if (!removed) return;
    result.splice(endIndex, 0, removed);
    const reordered: ProjectItem[] = result.map((item, idx) => ({ ...item, order: idx + 1 }));
    setData((prev) => ({ ...prev, projects: reordered }));
    showToast('Projects reordered.');
  };

  // Services
  const addService = (serviceData: Omit<ServiceItem, 'id' | 'order'>) => {
    const newService: ServiceItem = {
      ...serviceData,
      id: 'srv-' + Date.now(),
      order: data.services.length + 1,
    };
    setData((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
    showToast('Service added.');
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
    showToast('Service updated.');
  };

  const deleteService = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
    showToast('Service removed.');
  };

  // Testimonials
  const addTestimonial = (testData: Omit<TestimonialItem, 'id' | 'createdAt'>) => {
    const newTest: TestimonialItem = {
      ...testData,
      id: 'test-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setData((prev) => ({
      ...prev,
      testimonials: [newTest, ...prev.testimonials],
    }));
    showToast('Testimonial added.');
  };

  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    }));
    showToast('Testimonial updated.');
  };

  const deleteTestimonial = (id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
    showToast('Testimonial removed.');
  };

  // Gallery
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id' | 'uploadedAt'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: 'gal-' + Date.now(),
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setData((prev) => ({
      ...prev,
      gallery: [newItem, ...prev.gallery],
    }));
    showToast('Gallery image added.');
  };

  const deleteGalleryItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
    showToast('Gallery image deleted.');
  };

  const toggleGalleryVisibility = (id: string) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === id ? { ...g, isVisible: !g.isVisible } : g)),
    }));
  };

  // Inquiries
  const addInquiry = (inquiryData: Omit<ContactInquiry, 'id' | 'date'>) => {
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: 'inq-' + Date.now(),
      date: dateStr,
    };
    setData((prev) => ({
      ...prev,
      inquiries: [newInquiry, ...prev.inquiries],
    }));
  };

  const deleteInquiry = (id: string) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.filter((i) => i.id !== id),
    }));
    showToast('Inquiry removed.');
  };

  // System
  const exportDataAsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `digitex_website_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported backup JSON file.');
  };

  const importDataFromJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.content && parsed.services) {
        setData(parsed);
        showToast('Website data imported successfully.');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all website content, projects and services back to initial defaults?')) {
      setData(INITIAL_DATA);
      showToast('All website content restored to defaults.');
    }
  };

  return (
    <WebsiteContext.Provider
      value={{
        data,
        isAdminAuthenticated,
        activeView,
        setActiveView,
        selectedProjectForModal,
        setSelectedProjectForModal,
        isInquiryModalOpen,
        setIsInquiryModalOpen,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        toastMessage,
        showToast,
        loginAdmin,
        logoutAdmin,
        changeAdminPin,
        updateContent,
        updateContact,
        updateStatistics,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        addService,
        updateService,
        deleteService,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addGalleryItem,
        deleteGalleryItem,
        toggleGalleryVisibility,
        addInquiry,
        deleteInquiry,
        exportDataAsJSON,
        importDataFromJSON,
        resetToDefaults,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsite = () => {
  const ctx = useContext(WebsiteContext);
  if (!ctx) throw new Error('useWebsite must be used within a WebsiteProvider');
  return ctx;
};
