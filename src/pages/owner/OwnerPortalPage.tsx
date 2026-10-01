import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  Info,
  Layers,
  Cpu,
  FolderGit2,
  MessageSquareQuote,
  HelpCircle,
  Image as ImageIcon,
  PhoneCall,
  Search,
  Settings,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Menu,
  X,
  Sparkles,
  Check,
  Building2,
  ChevronRight,
  Loader2,
  Mail,
  Calendar,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Globe,
  Star,
} from 'lucide-react';
import { useOwnerAuth } from '../../context/OwnerAuthContext';
import { useData } from '../../context/DataContext';
import { DigitexLogo, DigitexSymbol } from '../../components/common/DigitexLogo';
import { ImageSelectorModal } from '../../components/owner/ImageSelectorModal';
import {
  ServiceItem,
  ProjectItem,
  TestimonialItem,
  FAQItem,
  TechCategory,
  IndustryItem,
  MediaAsset,
  HomepageConfig,
  AboutConfig,
  ContactConfig,
  SEOConfig,
  EnquiryRecord,
} from '../../types';

// Helper to provide Authorization Bearer header for iframe compatibility
const getOwnerHeaders = (contentTypeJson = false): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (contentTypeJson) {
    headers['Content-Type'] = 'application/json';
  }
  const token = sessionStorage.getItem('digitex_owner_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const OwnerPortalPage: React.FC = () => {
  const { logout, user } = useOwnerAuth();
  const { refetchData } = useData();
  const navigate = useNavigate();

  // Navigation State
  const [activeSection, setActiveSection] = useState<
    | 'overview'
    | 'homepage'
    | 'about'
    | 'services'
    | 'industries'
    | 'technologies'
    | 'projects'
    | 'testimonials'
    | 'faq'
    | 'media'
    | 'contact'
    | 'seo'
    | 'settings'
  >('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Portal Data State
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // CMS Content Models
  const [homepage, setHomepage] = useState<HomepageConfig | null>(null);
  const [about, setAbout] = useState<AboutConfig | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [technologies, setTechnologies] = useState<TechCategory[]>([]);
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [contactConfig, setContactConfig] = useState<ContactConfig | null>(null);
  const [seo, setSeo] = useState<SEOConfig | null>(null);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [stats, setStats] = useState<any>({});

  // Image Picker Modal State
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageModalTitle, setImageModalTitle] = useState('Select Image');
  const [currentImageTarget, setCurrentImageTarget] = useState<{
    callback: (url: string, alt?: string) => void;
    currentUrl: string;
  } | null>(null);

  // Active Media Delete Warning Modal
  const [deleteMediaTarget, setDeleteMediaTarget] = useState<MediaAsset | null>(null);

  // Editing Modals / Form Drawers
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<TestimonialItem> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQItem> | null>(null);
  const [editingTech, setEditingTech] = useState<Partial<TechCategory> | null>(null);
  const [editingIndustry, setEditingIndustry] = useState<Partial<IndustryItem> | null>(null);
  const [activeSeoTab, setActiveSeoTab] = useState<string>('global');

  // Confirmation Modal
  const [confirmModal, setConfirmModal] = useState<{
    title: string;
    message: string;
    confirmText?: string;
    onConfirm: () => Promise<void> | void;
  } | null>(null);

  // Password Change Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load all data from protected Owner API
  const loadPortalData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/owner/data', {
        headers: getOwnerHeaders(),
        credentials: 'include',
      });
      if (res.ok) {
        const json = await res.json();
        setHomepage(json.homepage);
        setAbout(json.about);
        setServices(json.services || []);
        setProjects(json.projects || []);
        setTestimonials(json.testimonials || []);
        setFaqs(json.faqs || []);
        setTechnologies(json.technologies || []);
        setIndustries(json.industries || []);
        setContactConfig(json.contactConfig);
        setSeo(json.seo);
        setMedia(json.media || []);
        setEnquiries(json.enquiries || []);
        setStats(json.stats || {});
      } else if (res.status === 401) {
        logout();
        navigate('/owner/login');
      }
    } catch (err) {
      console.error('Error fetching owner data:', err);
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => {
    loadPortalData();
  }, [loadPortalData]);

  // Generic Save Helper to persist CMS changes to server
  const saveSectionData = async (endpoint: string, payload: any) => {
    setSaveStatus('saving');
    setErrorMessage('');
    try {
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: getOwnerHeaders(true),
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaveStatus('saved');
        await refetchData(); // Update public data context simultaneously
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        const err = await res.json();
        setSaveStatus('error');
        setErrorMessage(err.error || 'Failed to save changes to database');
      }
    } catch (err) {
      setSaveStatus('error');
      setErrorMessage('Network connection error while saving.');
    }
  };

  // Reorder items helper
  const moveItem = <T,>(list: T[], index: number, direction: 'up' | 'down'): T[] => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= list.length) return list;
    const copy = [...list];
    const temp = copy[index];
    copy[index] = copy[newIndex];
    copy[newIndex] = temp;
    return copy;
  };

  const handleReorder = async <T,>(
    list: T[],
    index: number,
    direction: 'up' | 'down',
    setter: (updated: T[]) => void,
    apiEndpoint: string,
    payloadKey: string
  ) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= list.length) return;
    const updated = [...list];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setter(updated);
    await saveSectionData(apiEndpoint, { [payloadKey]: updated });
  };

  // Trigger Image Selector Modal
  const openImagePicker = (
    title: string,
    currentUrl: string,
    onSelect: (url: string, alt?: string) => void
  ) => {
    setImageModalTitle(title);
    setCurrentImageTarget({ callback: onSelect, currentUrl });
    setImageModalOpen(true);
  };

  // Handle media deletion with active usage protection
  const handleDeleteMedia = async (asset: MediaAsset, force = false) => {
    if (asset.usageCount && asset.usageCount > 0 && !force) {
      setDeleteMediaTarget(asset);
      return;
    }

    try {
      const url = `/api/owner/media/${encodeURIComponent(asset.id)}${force ? '?force=true' : ''}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: getOwnerHeaders(),
        credentials: 'include',
      });
      if (res.ok) {
        setMedia((prev) => prev.filter((m) => m.id !== asset.id));
        setDeleteMediaTarget(null);
      } else {
        const json = await res.json();
        alert(json.error || 'Unable to delete media item.');
      }
    } catch (err) {
      alert('Error communicating with server.');
    }
  };

  // Handle Enquiry Status Update
  const handleEnquiryStatus = async (id: string, status: EnquiryRecord['status']) => {
    try {
      const res = await fetch(`/api/owner/enquiries/${id}`, {
        method: 'PUT',
        headers: getOwnerHeaders(true),
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    try {
      const res = await fetch('/api/owner/change-password', {
        method: 'POST',
        headers: getOwnerHeaders(true),
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setPasswordMsg({ type: 'success', text: 'Password updated successfully! It is hashed with bcrypt.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMsg({ type: 'error', text: json.error || 'Failed to update password' });
      }
    } catch (err) {
      setPasswordMsg({ type: 'error', text: 'Network communication error' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070B12] flex flex-col items-center justify-center text-white select-none">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-300">
          Loading DIGITEX Owner Portal...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B12] text-slate-100 flex flex-col antialiased">
      {/* Top Owner Header */}
      <header className="h-16 border-b border-white/10 bg-[#0B1220]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <DigitexSymbol size={32} theme="light-on-dark" />
            <div className="flex flex-col">
              <span className="font-black tracking-widest text-sm text-white uppercase flex items-center gap-2">
                <span>DIGITEX</span>
                <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-[#22D3EE] text-[10px] font-bold border border-cyan-500/30">
                  OWNER PORTAL
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Operations & Content Management System
              </span>
            </div>
          </div>
        </div>

        {/* Global Save Status Indicator & Quick Actions */}
        <div className="flex items-center gap-3">
          {saveStatus === 'saving' && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Saving...</span>
            </div>
          )}
          {saveStatus === 'saved' && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <CheckCircle className="w-3 h-3" />
              <span>Saved successfully</span>
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-semibold">
              <AlertCircle className="w-3 h-3" />
              <span>Unable to save</span>
            </div>
          )}

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors border border-white/10"
            title="Preview Public Website"
          >
            <span>View Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </a>

          <button
            type="button"
            onClick={async () => {
              await logout();
              navigate('/owner/login');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-300 hover:text-red-200 transition-colors border border-red-500/20 cursor-pointer"
            title="Securely Invalidate Session & Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Responsive Sidebar */}
        <aside
          className={`fixed lg:static inset-y-16 left-0 z-20 w-64 bg-[#0B1220] border-r border-white/10 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* OVERVIEW */}
            <div>
              <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                OVERVIEW
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveSection('overview');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-colors cursor-pointer ${
                  activeSection === 'overview'
                    ? 'bg-cyan-500/20 text-[#22D3EE] border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </div>
                {enquiries.filter((e) => e.status === 'new').length > 0 && (
                  <span className="px-1.5 py-0.5 text-[9px] font-black rounded-full bg-[#1677FF] text-white">
                    {enquiries.filter((e) => e.status === 'new').length}
                  </span>
                )}
              </button>
            </div>

            {/* WEBSITE CONTENT */}
            <div>
              <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                WEBSITE CONTENT
              </p>
              <nav className="space-y-1">
                {[
                  { id: 'homepage', label: 'Homepage', icon: Home },
                  { id: 'about', label: 'About', icon: Info },
                  { id: 'services', label: 'Services', icon: Layers, count: services.length },
                  { id: 'industries', label: 'Industries', icon: Building2, count: industries.length },
                  { id: 'technologies', label: 'Technologies', icon: Cpu, count: technologies.length },
                  { id: 'projects', label: 'Projects', icon: FolderGit2, count: projects.length },
                  { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, count: testimonials.length },
                  { id: 'faq', label: 'FAQ', icon: HelpCircle, count: faqs.length },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveSection(item.id as any);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-cyan-500/20 text-[#22D3EE] font-bold border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-slate-400 group-hover:text-white" />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className="text-[10px] text-slate-400 font-mono">{item.count}</span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* MEDIA */}
            <div>
              <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                MEDIA
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveSection('media');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeSection === 'media'
                    ? 'bg-cyan-500/20 text-[#22D3EE] font-bold border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ImageIcon className="w-4 h-4" />
                  <span>Media Library</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{media.length}</span>
              </button>
            </div>

            {/* CONTACT & BUSINESS */}
            <div>
              <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                CONTACT & BUSINESS
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveSection('contact');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeSection === 'contact'
                    ? 'bg-cyan-500/20 text-[#22D3EE] font-bold border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact & Socials</span>
              </button>
            </div>

            {/* SEO */}
            <div>
              <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                SEO
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveSection('seo');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeSection === 'seo'
                    ? 'bg-cyan-500/20 text-[#22D3EE] font-bold border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Global & Page SEO</span>
              </button>
            </div>

            {/* SETTINGS */}
            <div>
              <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                SETTINGS
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveSection('settings');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeSection === 'settings'
                    ? 'bg-cyan-500/20 text-[#22D3EE] font-bold border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Owner Account</span>
              </button>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10 bg-slate-950/40">
            <div className="flex items-center gap-2 text-xs text-slate-400 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shrink-0" />
              <span className="truncate">{user?.email || 'owner@digitex.media'}</span>
            </div>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-8 max-w-7xl mx-auto w-full">
          {/* ========================================================================= */}
          {/* 1. OVERVIEW SECTION */}
          {/* ========================================================================= */}
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Owner Portal Overview</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Real-time database statistics and client inquiry feed for DIGITEX.
                </p>
              </div>

              {/* Real Database Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {[
                  { label: 'Published Projects', val: stats.publishedProjects ?? projects.filter(p => p.status !== 'draft').length, total: projects.length },
                  { label: 'Published Services', val: stats.publishedServices ?? services.filter(s => s.status !== 'draft').length, total: services.length },
                  { label: 'Testimonials', val: testimonials.length },
                  { label: 'FAQs', val: faqs.length },
                  { label: 'Media Assets', val: media.length },
                  { label: 'New Enquiries', val: enquiries.filter((e) => e.status === 'new').length, highlight: true },
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border ${
                      card.highlight
                        ? 'bg-cyan-950/40 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                        : 'bg-[#0B1220] border-white/10'
                    }`}
                  >
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{card.label}</p>
                    <p className={`text-2xl font-black mt-2 ${card.highlight ? 'text-[#22D3EE]' : 'text-white'}`}>
                      {card.val}
                      {card.total !== undefined && (
                        <span className="text-xs font-normal text-slate-400 ml-1">/ {card.total}</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick Actions Bar */}
              <div className="p-6 rounded-2xl bg-[#0B1220] border border-white/10 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Quick Content Actions</h2>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveSection('homepage')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/15 transition-colors cursor-pointer"
                  >
                    <Home className="w-4 h-4 text-cyan-400" />
                    <span>Edit Homepage Hero</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingService({
                        title: '',
                        slug: '',
                        group: 'Digital Experience',
                        category: 'Digital Platforms',
                        shortDescription: '',
                        fullDescription: '',
                        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                        capabilities: ['Feature 1', 'Feature 2'],
                        deliverables: ['Deliverable 1'],
                        technologies: ['React', 'TypeScript'],
                        status: 'published',
                      });
                      setActiveSection('services');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/15 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-cyan-400" />
                    <span>Create New Service</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject({
                        title: '',
                        slug: '',
                        client: '',
                        category: 'Web App',
                        industry: 'Technology',
                        tagline: '',
                        overview: '',
                        challenge: '',
                        solution: '',
                        results: ['Improved performance by 50%'],
                        technologies: ['React', 'Node.js'],
                        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                        galleryImages: [],
                        year: '2026',
                        featured: false,
                        status: 'published',
                      });
                      setActiveSection('projects');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/15 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-cyan-400" />
                    <span>Create New Project</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('media')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/15 transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-cyan-400" />
                    <span>Upload Media Asset</span>
                  </button>
                </div>
              </div>

              {/* Client Inquiries Feed */}
              <div className="p-6 rounded-2xl bg-[#0B1220] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                      Recent Client Inquiries & Quote Requests
                    </h2>
                    <p className="text-xs text-slate-400">Direct inquiries received via public website forms</p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Total: {enquiries.length}</span>
                </div>

                {enquiries.length === 0 ? (
                  <p className="py-8 text-center text-xs text-slate-500 border border-dashed border-white/10 rounded-xl">
                    No client inquiries recorded yet.
                  </p>
                ) : (
                  <div className="divide-y divide-white/5">
                    {enquiries.map((inq) => (
                      <div key={inq.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1 max-w-2xl">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{inq.name}</span>
                            <span
                              className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-md ${
                                inq.status === 'new'
                                  ? 'bg-blue-500/20 text-[#38BDF8] border border-blue-500/30'
                                  : inq.status === 'contacted'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : inq.status === 'converted'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {inq.status}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {new Date(inq.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-4 text-xs text-slate-400">
                            <span>Phone: <strong className="text-slate-200">{inq.phone}</strong></span>
                            {inq.email && <span>Email: <strong className="text-slate-200">{inq.email}</strong></span>}
                            {inq.service && <span>Interest: <strong className="text-cyan-300">{inq.service}</strong></span>}
                          </div>
                          <p className="text-xs text-slate-300 italic pt-1">"{inq.message}"</p>
                        </div>

                        {/* Status Toggle buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={inq.status}
                            onChange={(e) => handleEnquiryStatus(inq.id, e.target.value as any)}
                            className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                          >
                            <option value="new" className="bg-[#0B1220]">New</option>
                            <option value="contacted" className="bg-[#0B1220]">Contacted</option>
                            <option value="converted" className="bg-[#0B1220]">Converted</option>
                            <option value="resolved" className="bg-[#0B1220]">Resolved</option>
                          </select>
                          <button
                            type="button"
                            onClick={async () => {
                              if (confirm('Delete this inquiry record?')) {
                                await fetch(`/api/owner/enquiries/${inq.id}`, {
                                  method: 'DELETE',
                                  headers: getOwnerHeaders(),
                                  credentials: 'include',
                                });
                                setEnquiries((prev) => prev.filter((e) => e.id !== inq.id));
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. HOMEPAGE EDITOR */}
          {/* ========================================================================= */}
          {activeSection === 'homepage' && homepage && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Homepage Content Editor</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Control the Hero, About preview, Services headline, Tech intro, and Final CTA without touching code.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => saveSectionData('/api/owner/homepage', homepage)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#1677FF] to-[#22D3EE] hover:from-[#1366DB] hover:to-[#1CB8D0] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] cursor-pointer shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Homepage Changes</span>
                </button>
              </div>

              {/* HERO SECTION */}
              <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Full-Background Hero Section</span>
                  </h2>
                  <span className="text-[11px] text-slate-400">Live on /</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Hero Eyebrow</label>
                      <input
                        type="text"
                        value={homepage.hero.eyebrow}
                        onChange={(e) =>
                          setHomepage({ ...homepage, hero: { ...homepage.hero, eyebrow: e.target.value } })
                        }
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Main Heading</label>
                      <input
                        type="text"
                        value={homepage.hero.heading}
                        onChange={(e) =>
                          setHomepage({ ...homepage, hero: { ...homepage.hero, heading: e.target.value } })
                        }
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Highlighted Heading Phrase (Gradient Text)
                      </label>
                      <input
                        type="text"
                        value={homepage.hero.highlightedText}
                        onChange={(e) =>
                          setHomepage({
                            ...homepage,
                            hero: { ...homepage.hero, highlightedText: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Supporting Description</label>
                      <textarea
                        rows={3}
                        value={homepage.hero.description}
                        onChange={(e) =>
                          setHomepage({ ...homepage, hero: { ...homepage.hero, description: e.target.value } })
                        }
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Primary CTA Label</label>
                        <input
                          type="text"
                          value={homepage.hero.primaryCtaText || ''}
                          onChange={(e) =>
                            setHomepage({
                              ...homepage,
                              hero: { ...homepage.hero, primaryCtaText: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Primary CTA Link</label>
                        <input
                          type="text"
                          value={homepage.hero.primaryCtaLink || ''}
                          onChange={(e) =>
                            setHomepage({
                              ...homepage,
                              hero: { ...homepage.hero, primaryCtaLink: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Secondary CTA Label</label>
                        <input
                          type="text"
                          value={homepage.hero.secondaryCtaText || ''}
                          onChange={(e) =>
                            setHomepage({
                              ...homepage,
                              hero: { ...homepage.hero, secondaryCtaText: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                          placeholder="View Our Work"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Secondary CTA Link</label>
                        <input
                          type="text"
                          value={homepage.hero.secondaryCtaLink || ''}
                          onChange={(e) =>
                            setHomepage({
                              ...homepage,
                              hero: { ...homepage.hero, secondaryCtaLink: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                          placeholder="/projects"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hero Background Image Preview & Picker */}
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-300">
                      Full-Background Hero Photograph
                    </label>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black">
                      <img
                        src={homepage.hero.heroImage}
                        alt="Hero Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                        <span className="text-[11px] text-slate-300 truncate">{homepage.hero.heroImage}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openImagePicker('Choose Hero Background Image', homepage.hero.heroImage, (url) => {
                          setHomepage({ ...homepage, hero: { ...homepage.hero, heroImage: url } });
                        })
                      }
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors cursor-pointer border border-white/15"
                    >
                      <ImageIcon className="w-4 h-4 text-cyan-400" />
                      <span>Replace Hero Image (Media Library / Upload)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ABOUT PREVIEW */}
              <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                  About Section Preview (Homepage)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Eyebrow</label>
                    <input
                      type="text"
                      value={homepage.aboutPreview?.eyebrow || ''}
                      onChange={(e) =>
                        setHomepage({
                          ...homepage,
                          aboutPreview: {
                            ...(homepage.aboutPreview || { heading: '', description: '', image: '', featureCards: [] }),
                            eyebrow: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Heading</label>
                    <input
                      type="text"
                      value={homepage.aboutPreview?.heading || ''}
                      onChange={(e) =>
                        setHomepage({
                          ...homepage,
                          aboutPreview: {
                            ...(homepage.aboutPreview || { eyebrow: '', description: '', image: '', featureCards: [] }),
                            heading: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={homepage.aboutPreview?.description || ''}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        aboutPreview: {
                          ...(homepage.aboutPreview || { eyebrow: '', heading: '', image: '', featureCards: [] }),
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <img
                    src={homepage.aboutPreview?.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80'}
                    alt="About Preview"
                    className="w-24 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      openImagePicker('Choose About Preview Image', homepage.aboutPreview?.image || '', (url) => {
                        setHomepage({
                          ...homepage,
                          aboutPreview: {
                            ...(homepage.aboutPreview || { eyebrow: '', heading: '', description: '', featureCards: [] }),
                            image: url,
                          },
                        });
                      })
                    }
                    className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl border border-white/10 transition-colors"
                  >
                    Replace Image from Media Library
                  </button>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">Highlight Feature Badges</label>
                    <button
                      type="button"
                      onClick={() => {
                        const currentCards = [...(homepage.aboutPreview?.featureCards || [])];
                        currentCards.push({ title: 'New Highlight Badge', description: '' });
                        setHomepage({
                          ...homepage,
                          aboutPreview: {
                            ...(homepage.aboutPreview || { eyebrow: '', heading: '', description: '', image: '' }),
                            featureCards: currentCards,
                          },
                        });
                      }}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      + Add Badge
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(homepage.aboutPreview?.featureCards || []).map((card, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            const updatedCards = [...(homepage.aboutPreview?.featureCards || [])];
                            updatedCards[cIdx] = { ...updatedCards[cIdx], title: e.target.value };
                            setHomepage({
                              ...homepage,
                              aboutPreview: {
                                ...(homepage.aboutPreview || { eyebrow: '', heading: '', description: '', image: '' }),
                                featureCards: updatedCards,
                              },
                            });
                          }}
                          className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                          placeholder="Feature highlight text"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updatedCards = (homepage.aboutPreview?.featureCards || []).filter((_, i) => i !== cIdx);
                            setHomepage({
                              ...homepage,
                              aboutPreview: {
                                ...(homepage.aboutPreview || { eyebrow: '', heading: '', description: '', image: '' }),
                                featureCards: updatedCards,
                              },
                            });
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SERVICES PREVIEW */}
              <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                  Services Section Preview (Homepage)
                </h2>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Section Heading</label>
                  <input
                    type="text"
                    value={homepage.servicesPreview?.heading || ''}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        servicesPreview: {
                          ...(homepage.servicesPreview || { description: '' }),
                          heading: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Section Subheading / Description</label>
                  <textarea
                    rows={2}
                    value={homepage.servicesPreview?.description || ''}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        servicesPreview: {
                          ...(homepage.servicesPreview || { heading: '' }),
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* TECHNOLOGY PREVIEW */}
              <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                  Technology Section Preview (Homepage)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Eyebrow</label>
                    <input
                      type="text"
                      value={homepage.technologyPreview?.eyebrow || ''}
                      onChange={(e) =>
                        setHomepage({
                          ...homepage,
                          technologyPreview: {
                            ...(homepage.technologyPreview || { heading: '', description: '' }),
                            eyebrow: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Heading</label>
                    <input
                      type="text"
                      value={homepage.technologyPreview?.heading || ''}
                      onChange={(e) =>
                        setHomepage({
                          ...homepage,
                          technologyPreview: {
                            ...(homepage.technologyPreview || { eyebrow: '', description: '' }),
                            heading: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={homepage.technologyPreview?.description || ''}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        technologyPreview: {
                          ...(homepage.technologyPreview || { eyebrow: '', heading: '' }),
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* PROJECTS PREVIEW */}
              <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                  Projects Section Preview (Homepage)
                </h2>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Heading</label>
                  <input
                    type="text"
                    value={homepage.projectsPreview?.heading || ''}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        projectsPreview: {
                          ...(homepage.projectsPreview || { description: '' }),
                          heading: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={homepage.projectsPreview?.description || ''}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        projectsPreview: {
                          ...(homepage.projectsPreview || { heading: '' }),
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* TESTIMONIALS PREVIEW */}
              <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                  Testimonials Section Preview (Homepage)
                </h2>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Heading</label>
                  <input
                    type="text"
                    value={homepage.testimonialsPreview?.heading || ''}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        testimonialsPreview: {
                          ...(homepage.testimonialsPreview || { description: '' }),
                          heading: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={homepage.testimonialsPreview?.description || ''}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        testimonialsPreview: {
                          ...(homepage.testimonialsPreview || { heading: '' }),
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* FAQ PREVIEW */}
              <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                  FAQ Section Preview (Homepage)
                </h2>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Heading</label>
                  <input
                    type="text"
                    value={homepage.faqPreview?.heading || ''}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        faqPreview: {
                          ...(homepage.faqPreview || { description: '' }),
                          heading: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={homepage.faqPreview?.description || ''}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        faqPreview: {
                          ...(homepage.faqPreview || { heading: '' }),
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* FINAL CALL TO ACTION */}
              <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                  Homepage Final CTA Banner
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Banner Heading</label>
                    <input
                      type="text"
                      value={homepage.finalCta.heading}
                      onChange={(e) =>
                        setHomepage({
                          ...homepage,
                          finalCta: { ...homepage.finalCta, heading: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">CTA Button Text</label>
                    <input
                      type="text"
                      value={homepage.finalCta.ctaText}
                      onChange={(e) =>
                        setHomepage({
                          ...homepage,
                          finalCta: { ...homepage.finalCta, ctaText: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Banner Description</label>
                  <textarea
                    rows={2}
                    value={homepage.finalCta.description}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        finalCta: { ...homepage.finalCta, description: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. ABOUT PAGE CMS */}
          {/* ========================================================================= */}
          {activeSection === 'about' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">About DIGITEX CMS</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage public About Page content, hero headline, story, core values, and process steps.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => saveSectionData('/api/owner/about', about)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#1677FF] to-[#22D3EE] hover:from-[#1366DB] hover:to-[#1CB8D0] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] cursor-pointer shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save About Changes</span>
                </button>
              </div>

              {!about ? (
                <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-3" />
                  <p className="text-sm">Loading About section content...</p>
                </div>
              ) : (
                <>
                  {/* Hero & Company Story */}
                  <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-5">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                      About Hero & Introduction
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Hero Eyebrow Badge</label>
                        <input
                          type="text"
                          value={about.heroEyebrow ?? 'ABOUT DIGITEX'}
                          onChange={(e) => setAbout({ ...about, heroEyebrow: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                          placeholder="ABOUT DIGITEX"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-300 mb-1">Hero Main Heading</label>
                        <input
                          type="text"
                          value={about.heading || ''}
                          onChange={(e) => setAbout({ ...about, heading: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                          placeholder="We are a modern digital agency engineering measurable growth."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Hero Introduction Paragraph</label>
                      <textarea
                        rows={3}
                        value={about.introduction || ''}
                        onChange={(e) => setAbout({ ...about, introduction: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="DIGITEX brings together creative strategy, user experience design, and robust full-stack software development to build enduring competitive advantage for our clients."
                      />
                    </div>

                    {/* Philosophy & Mission */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Core Philosophy & Mission Section
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Philosophy Eyebrow</label>
                          <input
                            type="text"
                            value={about.philosophyEyebrow ?? 'OUR CORE PHILOSOPHY'}
                            onChange={(e) => setAbout({ ...about, philosophyEyebrow: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                            placeholder="OUR CORE PHILOSOPHY"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Philosophy Subheading / Title</label>
                          <input
                            type="text"
                            value={about.philosophyHeading ?? about.subheading ?? ''}
                            onChange={(e) => setAbout({ ...about, philosophyHeading: e.target.value, subheading: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                            placeholder="Craftsmanship, code ownership, and real business results."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Mission Statement</label>
                        <textarea
                          rows={2}
                          value={about.mission || ''}
                          onChange={(e) => setAbout({ ...about, mission: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                          placeholder="We believe that software should be an enduring competitive asset..."
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <img
                        src={about.heroImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c'}
                        alt="About Hero"
                        className="w-24 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          openImagePicker('Choose About Hero Photograph', about.heroImage || '', (url) => {
                            setAbout({ ...about, heroImage: url });
                          })
                        }
                        className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl border border-white/10 transition-colors cursor-pointer"
                      >
                        Choose Image from Media Library
                      </button>
                    </div>
                  </div>

                  {/* Core Values */}
                  <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                        Core Values ({about.values?.length || 0})
                      </h2>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(about.values || [])];
                          updated.push({ title: 'New Core Value', description: 'Describe value impact here...' });
                          setAbout({ ...about, values: updated });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Value</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(about.values || []).map((val, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                          <div className="flex items-center justify-between gap-3">
                            <input
                              type="text"
                              value={val.title}
                              onChange={(e) => {
                                const updated = [...(about.values || [])];
                                updated[idx] = { ...updated[idx], title: e.target.value };
                                setAbout({ ...about, values: updated });
                              }}
                              className="flex-1 px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
                              placeholder="Value Title"
                            />
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => {
                                  const updated = moveItem(about.values || [], idx, 'up');
                                  setAbout({ ...about, values: updated });
                                }}
                                className="p-1 text-slate-400 hover:text-white disabled:opacity-20"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === (about.values?.length || 0) - 1}
                                onClick={() => {
                                  const updated = moveItem(about.values || [], idx, 'down');
                                  setAbout({ ...about, values: updated });
                                }}
                                className="p-1 text-slate-400 hover:text-white disabled:opacity-20"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setConfirmModal({
                                    title: 'Remove Core Value',
                                    message: `Are you sure you want to remove "${val.title}"?`,
                                    onConfirm: () => {
                                      const updated = (about.values || []).filter((_, i) => i !== idx);
                                      setAbout({ ...about, values: updated });
                                    },
                                  });
                                }}
                                className="p-1 text-slate-400 hover:text-red-400"
                                title="Delete Value"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <textarea
                            rows={2}
                            value={val.description}
                            onChange={(e) => {
                              const updated = [...(about.values || [])];
                              updated[idx] = { ...updated[idx], description: e.target.value };
                              setAbout({ ...about, values: updated });
                            }}
                            className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                            placeholder="Value Description"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5-Stage Process */}
                  <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                        Delivery Process Steps ({about.process?.length || 0})
                      </h2>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(about.process || [])];
                          updated.push({
                            step: updated.length + 1,
                            title: 'New Process Step',
                            description: 'Step breakdown details...',
                          });
                          setAbout({ ...about, process: updated });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Step</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(about.process || []).map((step, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 shrink-0">
                              0{step.step || idx + 1}
                            </span>
                            <input
                              type="text"
                              value={step.title}
                              onChange={(e) => {
                                const updated = [...(about.process || [])];
                                updated[idx] = { ...updated[idx], title: e.target.value };
                                setAbout({ ...about, process: updated });
                              }}
                              className="flex-1 px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
                              placeholder="Step Title"
                            />
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => {
                                  const updated = moveItem(about.process || [], idx, 'up');
                                  updated.forEach((s, i) => (s.step = i + 1));
                                  setAbout({ ...about, process: updated });
                                }}
                                className="p-1 text-slate-400 hover:text-white disabled:opacity-20"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === (about.process?.length || 0) - 1}
                                onClick={() => {
                                  const updated = moveItem(about.process || [], idx, 'down');
                                  updated.forEach((s, i) => (s.step = i + 1));
                                  setAbout({ ...about, process: updated });
                                }}
                                className="p-1 text-slate-400 hover:text-white disabled:opacity-20"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setConfirmModal({
                                    title: 'Remove Process Step',
                                    message: `Are you sure you want to remove Step ${step.step}: "${step.title}"?`,
                                    onConfirm: () => {
                                      const updated = (about.process || []).filter((_, i) => i !== idx);
                                      updated.forEach((s, i) => (s.step = i + 1));
                                      setAbout({ ...about, process: updated });
                                    },
                                  });
                                }}
                                className="p-1 text-slate-400 hover:text-red-400"
                                title="Delete Step"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <textarea
                            rows={2}
                            value={step.description}
                            onChange={(e) => {
                              const updated = [...(about.process || [])];
                              updated[idx] = { ...updated[idx], description: e.target.value };
                              setAbout({ ...about, process: updated });
                            }}
                            className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                            placeholder="Step Description"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. SERVICES MANAGEMENT */}
          {/* ========================================================================= */}
          {activeSection === 'services' && (
            <div className="space-y-6 w-full max-w-full min-w-0">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <h1 className="text-2xl font-black text-white tracking-tight">Services Management</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage DIGITEX services. Only items set to Published will appear on the public navigation and pages.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingService({
                      id: `service-${Date.now()}`,
                      title: '',
                      slug: '',
                      group: 'Digital Experience',
                      category: 'Digital Platforms',
                      shortDescription: '',
                      fullDescription: '',
                      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                      capabilities: ['Next.js Architecture', 'Interactive Web Apps'],
                      deliverables: ['Responsive Web Portal'],
                      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
                      status: 'published',
                    });
                    const main = document.querySelector('main');
                    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Service Editor Modal/Drawer */}
              {editingService && (
                <div
                  id="service-editor-section"
                  className="p-5 sm:p-7 rounded-3xl bg-[#0B1220] border-2 border-cyan-500/40 space-y-5 shadow-2xl w-full max-w-full min-w-0"
                >
                  {/* Top Bar with Title and Quick Save/Cancel Controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                        <Edit2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300 truncate">
                          {editingService.id && services.some((s) => s.id === editingService.id)
                            ? `Edit Service: ${editingService.title || 'Untitled'}`
                            : 'Create New Service'}
                        </h2>
                        <p className="text-[11px] text-slate-400">Configure service routing, copy, and publish status</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!editingService.title || !editingService.slug) {
                            setErrorMessage('Service Title and URL Slug are required.');
                            setSaveStatus('error');
                            return;
                          }
                          const updatedServices = [...services];
                          const idx = updatedServices.findIndex((s) => s.id === editingService.id || s.slug === editingService.slug);
                          if (idx >= 0) {
                            updatedServices[idx] = editingService as ServiceItem;
                          } else {
                            updatedServices.push(editingService as ServiceItem);
                          }
                          setServices(updatedServices);
                          await saveSectionData('/api/owner/services', { services: updatedServices });
                          setEditingService(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 transition-transform hover:scale-[1.02] cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Service</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer ml-1"
                        title="Close editor"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Form fields: Row 1 (Title & Slug) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0">
                    <div className="min-w-0">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Service Title *</label>
                      <input
                        type="text"
                        value={editingService.title || ''}
                        onChange={(e) =>
                          setEditingService({
                            ...editingService,
                            title: e.target.value,
                            slug: editingService.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. AI Solutions"
                      />
                    </div>
                    <div className="min-w-0">
                      <label className="block text-xs font-bold text-slate-300 mb-1">URL Slug *</label>
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl w-full min-w-0">
                        <span className="text-slate-500 text-xs font-mono shrink-0">/services/</span>
                        <input
                          type="text"
                          value={editingService.slug || ''}
                          onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                          className="flex-1 min-w-0 bg-transparent text-xs text-white font-mono focus:outline-none"
                          placeholder="ai-solutions"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form fields: Row 2 (Group, Category, Status) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full min-w-0">
                    <div className="min-w-0">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Navigation Group</label>
                      <select
                        value={editingService.group || 'Digital Experience'}
                        onChange={(e) => setEditingService({ ...editingService, group: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Digital Experience" className="bg-[#0B1220]">Digital Experience</option>
                        <option value="Technology" className="bg-[#0B1220]">Technology</option>
                        <option value="Growth" className="bg-[#0B1220]">Growth</option>
                        <option value="Quality" className="bg-[#0B1220]">Quality</option>
                      </select>
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Category Tag</label>
                      <input
                        type="text"
                        value={editingService.category || ''}
                        onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Artificial Intelligence"
                      />
                    </div>

                    <div className="min-w-0 sm:col-span-2 lg:col-span-1">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Status</label>
                      <select
                        value={editingService.status || 'published'}
                        onChange={(e) => setEditingService({ ...editingService, status: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="published" className="bg-[#0B1220]">PUBLISHED (Visible Publicly)</option>
                        <option value="draft" className="bg-[#0B1220]">DRAFT (Private)</option>
                      </select>
                    </div>
                  </div>

                  {/* Form fields: Descriptions */}
                  <div className="w-full min-w-0">
                    <label className="block text-xs font-bold text-slate-300 mb-1">Short Summary (Card Preview)</label>
                    <textarea
                      rows={2}
                      value={editingService.shortDescription || ''}
                      onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      placeholder="Brief overview displayed on directory cards and navigation teasers..."
                    />
                  </div>

                  <div className="w-full min-w-0">
                    <label className="block text-xs font-bold text-slate-300 mb-1">Full Service Description</label>
                    <textarea
                      rows={4}
                      value={editingService.fullDescription || ''}
                      onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      placeholder="Comprehensive breakdown of service deliverables, tech stack, and scope..."
                    />
                  </div>

                  {/* Image Picker */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 w-full min-w-0">
                    <img
                      src={editingService.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'}
                      alt="Service"
                      className="w-24 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-xs font-bold text-white">Cover Image</p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {editingService.image || 'No image set'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        openImagePicker('Choose Service Cover Image', editingService.image || '', (url) => {
                          setEditingService({ ...editingService, image: url });
                        })
                      }
                      className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl border border-white/10 transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
                    >
                      Choose Image from Media Library
                    </button>
                  </div>

                  {/* Bottom Footer Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                    <span className="text-[11px] text-slate-400">
                      * Required fields: Title and Slug
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!editingService.title || !editingService.slug) {
                            setErrorMessage('Service Title and URL Slug are required.');
                            setSaveStatus('error');
                            return;
                          }
                          const updatedServices = [...services];
                          const idx = updatedServices.findIndex((s) => s.id === editingService.id || s.slug === editingService.slug);
                          if (idx >= 0) {
                            updatedServices[idx] = editingService as ServiceItem;
                          } else {
                            updatedServices.push(editingService as ServiceItem);
                          }
                          setServices(updatedServices);
                          await saveSectionData('/api/owner/services', { services: updatedServices });
                          setEditingService(null);
                        }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Service</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Table / List Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-400">
                <span className="font-semibold text-white">All Services ({services.length})</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded-lg">
                  <ArrowRight className="w-3 h-3 text-cyan-400" />
                  <span>Actions & controls pinned to right edge for easy access</span>
                </span>
              </div>

              {/* Mobile / Small Screen Card Layout (Visible on < md) */}
              <div className="block md:hidden space-y-3.5 w-full min-w-0">
                {services.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3 shadow-lg"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-14 h-11 rounded-lg object-cover border border-white/10 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold text-white text-sm truncate">{svc.title}</p>
                          <button
                            type="button"
                            onClick={async () => {
                              const newStatus = svc.status === 'draft' ? 'published' : 'draft';
                              const updated = services.map((s) => (s.id === svc.id ? { ...s, status: newStatus as any } : s));
                              setServices(updated);
                              await saveSectionData('/api/owner/services', { services: updated });
                            }}
                            className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-transform active:scale-95 cursor-pointer shrink-0 ${
                              svc.status !== 'draft'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                            title="Toggle Published / Draft"
                          >
                            {svc.status !== 'draft' ? 'Published' : 'Draft'}
                          </button>
                        </div>
                        <p className="text-[10px] text-cyan-300 font-mono mt-0.5 truncate">/services/{svc.slug}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300">
                          {svc.group || 'Digital Experience'}
                        </span>
                      </div>
                    </div>

                    {svc.shortDescription && (
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {svc.shortDescription}
                      </p>
                    )}

                    {/* Mobile Action Controls */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-white/10">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={services.indexOf(svc) === 0}
                          onClick={() =>
                            handleReorder(
                              services,
                              services.indexOf(svc),
                              'up',
                              setServices,
                              '/api/owner/services',
                              'services'
                            )
                          }
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 disabled:opacity-20 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={services.indexOf(svc) === services.length - 1}
                          onClick={() =>
                            handleReorder(
                              services,
                              services.indexOf(svc),
                              'down',
                              setServices,
                              '/api/owner/services',
                              'services'
                            )
                          }
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 disabled:opacity-20 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingService(svc);
                            const main = document.querySelector('main');
                            if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/20 cursor-pointer transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmModal({
                              title: 'Delete Service',
                              message: `Are you sure you want to permanently delete the service "${svc.title}"?`,
                              confirmText: 'Delete Service',
                              onConfirm: async () => {
                                const updated = services.filter((s) => s.id !== svc.id);
                                setServices(updated);
                                await fetch(`/api/owner/services/${svc.id}`, {
                                  method: 'DELETE',
                                  headers: getOwnerHeaders(),
                                  credentials: 'include',
                                });
                                await refetchData();
                              },
                            });
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-semibold border border-red-500/20 cursor-pointer transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop / Tablet Services Table (Visible on >= md) with Sticky Actions & Smooth Scroll */}
              <div className="hidden md:block w-full min-w-0 rounded-2xl bg-[#0B1220] border border-white/10 overflow-x-auto shadow-xl scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-white/5">
                <table className="w-full min-w-[860px] text-left text-xs border-collapse">
                  <thead className="bg-[#090F1C] border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4 min-w-[240px]">Service</th>
                      <th className="p-4 min-w-[140px]">Group</th>
                      <th className="p-4 min-w-[160px]">Slug / Route</th>
                      <th className="p-4 min-w-[110px]">Status</th>
                      <th className="p-4 min-w-[170px] text-right sticky right-0 z-10 bg-[#090F1C] border-l border-white/10 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.5)]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {services.map((svc) => (
                      <tr key={svc.id} className="group hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={svc.image}
                              alt={svc.title}
                              className="w-10 h-8 rounded-lg object-cover border border-white/10 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-white truncate max-w-[220px]">{svc.title}</p>
                              <p className="text-[10px] text-slate-400 truncate max-w-[220px]">{svc.shortDescription}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300 font-medium whitespace-nowrap">{svc.group || 'Digital Experience'}</td>
                        <td className="p-4 font-mono text-cyan-300 whitespace-nowrap">/services/{svc.slug}</td>
                        <td className="p-4 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={async () => {
                              const newStatus = svc.status === 'draft' ? 'published' : 'draft';
                              const updated = services.map((s) => (s.id === svc.id ? { ...s, status: newStatus as any } : s));
                              setServices(updated);
                              await saveSectionData('/api/owner/services', { services: updated });
                            }}
                            className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-transform active:scale-95 cursor-pointer ${
                              svc.status !== 'draft'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                            }`}
                            title="Click to toggle Published / Draft"
                          >
                            {svc.status !== 'draft' ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="p-4 text-right sticky right-0 z-10 bg-[#0B1220] group-hover:bg-[#111A2E] border-l border-white/10 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.5)] transition-colors whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            <button
                              type="button"
                              disabled={services.indexOf(svc) === 0}
                              onClick={() =>
                                handleReorder(
                                  services,
                                  services.indexOf(svc),
                                  'up',
                                  setServices,
                                  '/api/owner/services',
                                  'services'
                                )
                              }
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-20 cursor-pointer"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={services.indexOf(svc) === services.length - 1}
                              onClick={() =>
                                handleReorder(
                                  services,
                                  services.indexOf(svc),
                                  'down',
                                  setServices,
                                  '/api/owner/services',
                                  'services'
                                )
                              }
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-20 cursor-pointer"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingService(svc);
                                const main = document.querySelector('main');
                                if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-white/10 cursor-pointer"
                              title="Edit Service"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setConfirmModal({
                                  title: 'Delete Service',
                                  message: `Are you sure you want to permanently delete the service "${svc.title}"?`,
                                  confirmText: 'Delete Service',
                                  onConfirm: async () => {
                                    const updated = services.filter((s) => s.id !== svc.id);
                                    setServices(updated);
                                    await fetch(`/api/owner/services/${svc.id}`, {
                                      method: 'DELETE',
                                      headers: getOwnerHeaders(),
                                      credentials: 'include',
                                    });
                                    await refetchData();
                                  },
                                });
                              }}
                              className="p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-white/10 cursor-pointer"
                              title="Delete Service"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. MEDIA LIBRARY */}
          {/* ========================================================================= */}
          {activeSection === 'media' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Media Library</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Upload and manage persistent assets. Actively used images are protected from accidental deletion.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openImagePicker('Upload or Select Media Asset', '', () => loadPortalData())}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Image</span>
                </button>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {media.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-[#0B1220] border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-cyan-500/40 transition-all shadow-md"
                  >
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.alt || item.filename}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      {item.usageCount !== undefined && item.usageCount > 0 ? (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-cyan-950/90 border border-cyan-400/50 text-[#38BDF8] text-[9px] font-bold">
                          In Use ({item.usageCount})
                        </div>
                      ) : (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-400 text-[9px]">
                          Unused
                        </div>
                      )}
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-xs text-white truncate" title={item.filename}>
                          {item.filename}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                          {Math.round(item.size / 1024)} KB &bull; {new Date(item.uploadedAt).toLocaleDateString()}
                        </p>
                        {item.usageLocations && item.usageLocations.length > 0 && (
                          <p className="text-[9px] text-cyan-300 mt-1 truncate" title={item.usageLocations.join(', ')}>
                            Used in: {item.usageLocations.join(', ')}
                          </p>
                        )}
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            alert('Copied image URL: ' + item.url);
                          }}
                          className="text-[10px] text-slate-400 hover:text-cyan-300 transition-colors"
                        >
                          Copy URL
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteMedia(item)}
                          className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                          title="Delete Asset"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. CONTACT & BUSINESS DETAILS */}
          {/* ========================================================================= */}
          {activeSection === 'contact' && contactConfig && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Contact & Business Details</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Central source of truth for DIGITEX contact information, WhatsApp integration, and social links.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => saveSectionData('/api/owner/contact', contactConfig)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] cursor-pointer shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact Details</span>
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Company / Studio Name</label>
                    <input
                      type="text"
                      value={contactConfig.companyName || ''}
                      onChange={(e) => setContactConfig({ ...contactConfig, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Primary Support Email</label>
                    <input
                      type="email"
                      value={contactConfig.email}
                      onChange={(e) => setContactConfig({ ...contactConfig, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Primary Phone Number</label>
                    <input
                      type="text"
                      value={contactConfig.phone}
                      onChange={(e) => setContactConfig({ ...contactConfig, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Direct Number</label>
                    <input
                      type="text"
                      value={contactConfig.whatsappNumber}
                      onChange={(e) => setContactConfig({ ...contactConfig, whatsappNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Quick Chat URL</label>
                    <input
                      type="url"
                      value={contactConfig.whatsappUrl}
                      onChange={(e) => setContactConfig({ ...contactConfig, whatsappUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Google Calendar Consultation URL</label>
                    <input
                      type="url"
                      value={contactConfig.calendarUrl}
                      onChange={(e) => setContactConfig({ ...contactConfig, calendarUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Operating Hours</label>
                  <input
                    type="text"
                    value={contactConfig.operatingHours}
                    onChange={(e) => setContactConfig({ ...contactConfig, operatingHours: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Studio Address</label>
                  <input
                    type="text"
                    value={contactConfig.address}
                    onChange={(e) => setContactConfig({ ...contactConfig, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 6. SETTINGS & OWNER ACCOUNT */}
          {/* ========================================================================= */}
          {activeSection === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Owner Account Settings</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage owner security credentials and session authentications.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">Change Owner Password</h2>
                <p className="text-xs text-slate-400">
                  Updates are processed on the server and secured with salted bcrypt password hashing.
                </p>

                {passwordMsg && (
                  <div
                    className={`p-3 rounded-xl text-xs ${
                      passwordMsg.type === 'success'
                        ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                        : 'bg-red-950/60 border border-red-800 text-red-300'
                    }`}
                  >
                    {passwordMsg.text}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Current Password *</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">New Password (min 6 characters) *</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Confirm New Password *</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 7. PROJECTS MANAGEMENT */}
          {/* ========================================================================= */}
          {activeSection === 'projects' && (
            <div className="space-y-6 w-full min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Projects Management</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage case studies and showcase projects.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProject({
                      id: `project-${Date.now()}`,
                      title: '',
                      slug: '',
                      client: '',
                      category: 'Enterprise Platform',
                      industry: 'Technology',
                      tagline: '',
                      overview: '',
                      challenge: '',
                      solution: '',
                      results: ['40% increase in performance'],
                      technologies: ['React', 'TypeScript', 'Node.js'],
                      servicesProvided: ['Web Development'],
                      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                      galleryImages: [],
                      year: '2026',
                      featured: true,
                      status: 'published',
                    });
                    const main = document.querySelector('main');
                    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Project</span>
                </button>
              </div>

              {/* Project Editor Drawer / Form */}
              {editingProject && (
                <div id="project-editor-section" className="p-6 rounded-3xl bg-[#0B1220] border-2 border-cyan-500/40 space-y-5 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                      {editingProject.id && projects.some((p) => p.id === editingProject.id)
                        ? `Edit Project: ${editingProject.title || 'Untitled'}`
                        : 'Create New Project'}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Project Title *</label>
                      <input
                        type="text"
                        value={editingProject.title || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingProject({
                            ...editingProject,
                            title: val,
                            slug: editingProject.slug || val.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                          });
                        }}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Apex Global Trading Platform"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Route Slug *</label>
                      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl">
                        <span className="text-slate-500 text-xs font-mono">/projects/</span>
                        <input
                          type="text"
                          value={editingProject.slug || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                          className="w-full bg-transparent text-xs text-white font-mono focus:outline-none"
                          placeholder="apex-global"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Client Name</label>
                      <input
                        type="text"
                        value={editingProject.client || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Apex Global Corp"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                      <input
                        type="text"
                        value={editingProject.category || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Enterprise Platform"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Industry</label>
                      <input
                        type="text"
                        value={editingProject.industry || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, industry: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Fintech / Technology"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Year / Timeline</label>
                      <input
                        type="text"
                        value={editingProject.year || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="2026"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Status</label>
                      <select
                        value={editingProject.status || 'published'}
                        onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="published" className="bg-slate-900 text-white">Published</option>
                        <option value="draft" className="bg-slate-900 text-white">Draft (Hidden)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">External Link (optional)</label>
                      <input
                        type="text"
                        value={editingProject.externalUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, externalUrl: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={editingProject.tagline || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      placeholder="One-line summary for project cards"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Project Overview</label>
                    <textarea
                      rows={2}
                      value={editingProject.overview || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, overview: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      placeholder="High-level project summary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">The Challenge</label>
                      <textarea
                        rows={3}
                        value={editingProject.challenge || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="What architectural or business obstacles did the client face?"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">The Solution</label>
                      <textarea
                        rows={3}
                        value={editingProject.solution || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="How DIGITEX engineered the resolution."
                      />
                    </div>
                  </div>

                  {/* Cover Image Picker */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-300">Project Cover Image</label>
                    <div className="flex items-center gap-4">
                      <img
                        src={editingProject.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'}
                        alt="Project Preview"
                        className="w-24 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          openImagePicker('Choose Project Cover Image', editingProject.coverImage || '', (url) => {
                            setEditingProject({ ...editingProject, coverImage: url });
                          })
                        }
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                      >
                        Select from Media Library
                      </button>
                    </div>
                  </div>

                  {/* Results & Metrics */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-300">Key Measurable Results</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(editingProject.results || []).map((res, rIdx) => (
                        <span key={rIdx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs">
                          <span>{res}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editingProject.results || []).filter((_, i) => i !== rIdx);
                              setEditingProject({ ...editingProject, results: updated });
                            }}
                            className="text-emerald-400 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="new-project-result"
                        placeholder="Add result metric (e.g. 50% lower cloud latency)"
                        className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const val = (e.currentTarget.value || '').trim();
                            if (val) {
                              setEditingProject({
                                ...editingProject,
                                results: [...(editingProject.results || []), val],
                              });
                              e.currentTarget.value = '';
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('new-project-result') as HTMLInputElement;
                          if (input && input.value.trim()) {
                            setEditingProject({
                              ...editingProject,
                              results: [...(editingProject.results || []), input.value.trim()],
                            });
                            input.value = '';
                          }
                        }}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl"
                      >
                        Add Result
                      </button>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-300">Technologies Used</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(editingProject.technologies || []).map((t, tIdx) => (
                        <span key={tIdx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs">
                          <span>{t}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editingProject.technologies || []).filter((_, i) => i !== tIdx);
                              setEditingProject({ ...editingProject, technologies: updated });
                            }}
                            className="text-cyan-400 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="new-project-tech"
                        placeholder="Add technology (e.g. Next.js, Postgres)"
                        className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const val = (e.currentTarget.value || '').trim();
                            if (val) {
                              setEditingProject({
                                ...editingProject,
                                technologies: [...(editingProject.technologies || []), val],
                              });
                              e.currentTarget.value = '';
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('new-project-tech') as HTMLInputElement;
                          if (input && input.value.trim()) {
                            setEditingProject({
                              ...editingProject,
                              technologies: [...(editingProject.technologies || []), input.value.trim()],
                            });
                            input.value = '';
                          }
                        }}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl"
                      >
                        Add Tech
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!editingProject.title || !editingProject.slug) {
                          alert('Project title and route slug are required.');
                          return;
                        }
                        const updated = [...projects];
                        const idx = updated.findIndex((p) => p.id === editingProject.id || p.slug === editingProject.slug);
                        if (idx >= 0) {
                          updated[idx] = editingProject as ProjectItem;
                        } else {
                          updated.push(editingProject as ProjectItem);
                        }
                        setProjects(updated);
                        await saveSectionData('/api/owner/projects', { projects: updated });
                        setEditingProject(null);
                      }}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Save Project
                    </button>
                  </div>
                </div>
              )}

              {/* Projects Table */}
              <div className="w-full min-w-0 rounded-2xl bg-[#0B1220] border border-white/10 overflow-x-auto shadow-xl scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <table className="w-full min-w-[800px] text-left text-xs">
                  <thead className="bg-slate-900/60 border-b border-white/10 text-slate-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4 min-w-[240px]">Project</th>
                      <th className="p-4 min-w-[140px]">Client</th>
                      <th className="p-4 min-w-[130px]">Category</th>
                      <th className="p-4 min-w-[110px]">Status</th>
                      <th className="p-4 min-w-[160px] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={proj.coverImage}
                              alt={proj.title}
                              className="w-12 h-9 rounded-lg object-cover border border-white/10 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-white">{proj.title}</p>
                              <p className="text-[10px] text-slate-400 font-mono">/projects/{proj.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300 font-medium">{proj.client}</td>
                        <td className="p-4 text-cyan-300">{proj.category}</td>
                        <td className="p-4">
                          <button
                            type="button"
                            onClick={async () => {
                              const newStatus = proj.status === 'draft' ? 'published' : 'draft';
                              const updated = projects.map((p) => (p.id === proj.id ? { ...p, status: newStatus as any } : p));
                              setProjects(updated);
                              await saveSectionData('/api/owner/projects', { projects: updated });
                            }}
                            className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider cursor-pointer transition-transform active:scale-95 ${
                              proj.status !== 'draft'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                            }`}
                            title="Click to toggle Published / Draft"
                          >
                            {proj.status !== 'draft' ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled={projects.indexOf(proj) === 0}
                              onClick={() =>
                                handleReorder(
                                  projects,
                                  projects.indexOf(proj),
                                  'up',
                                  setProjects,
                                  '/api/owner/projects',
                                  'projects'
                                )
                              }
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-20"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={projects.indexOf(proj) === projects.length - 1}
                              onClick={() =>
                                handleReorder(
                                  projects,
                                  projects.indexOf(proj),
                                  'down',
                                  setProjects,
                                  '/api/owner/projects',
                                  'projects'
                                )
                              }
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-20"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProject(proj);
                                const main = document.querySelector('main');
                                if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-white/5 cursor-pointer"
                              title="Edit Project"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setConfirmModal({
                                  title: 'Delete Project',
                                  message: `Are you sure you want to permanently delete the project "${proj.title}"?`,
                                  confirmText: 'Delete Project',
                                  onConfirm: async () => {
                                    const updated = projects.filter((p) => p.id !== proj.id);
                                    setProjects(updated);
                                    await fetch(`/api/owner/projects/${proj.id}`, {
                                      method: 'DELETE',
                                      headers: getOwnerHeaders(),
                                      credentials: 'include',
                                    });
                                    await refetchData();
                                  },
                                });
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 8. INDUSTRIES MANAGEMENT */}
          {/* ========================================================================= */}
          {activeSection === 'industries' && (
            <div className="space-y-6 w-full min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Industries Management</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage vertical industry solutions and key challenge architectures.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingIndustry({
                      id: `industry-${Date.now()}`,
                      slug: '',
                      title: '',
                      shortDescription: '',
                      fullDescription: '',
                      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
                      iconName: 'Building2',
                      keyChallenges: ['Legacy architecture bottlenecks'],
                      solutionsProvided: ['Scalable cloud engineering'],
                      featuredCapabilities: ['Digital Transformation'],
                      status: 'published',
                    });
                    const main = document.querySelector('main');
                    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Industry</span>
                </button>
              </div>

              {/* Industry Editor Drawer */}
              {editingIndustry && (
                <div id="industry-editor-section" className="p-6 rounded-3xl bg-[#0B1220] border-2 border-cyan-500/40 space-y-5 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                      {editingIndustry.id && industries.some((i) => i.id === editingIndustry.id)
                        ? `Edit Industry: ${editingIndustry.title || 'Untitled'}`
                        : 'Create New Industry'}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setEditingIndustry(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Industry Title *</label>
                      <input
                        type="text"
                        value={editingIndustry.title || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingIndustry({
                            ...editingIndustry,
                            title: val,
                            slug: editingIndustry.slug || val.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                          });
                        }}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Healthcare & Life Sciences"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Route Slug *</label>
                      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl">
                        <span className="text-slate-500 text-xs font-mono">/industries/</span>
                        <input
                          type="text"
                          value={editingIndustry.slug || ''}
                          onChange={(e) => setEditingIndustry({ ...editingIndustry, slug: e.target.value })}
                          className="w-full bg-transparent text-xs text-white font-mono focus:outline-none"
                          placeholder="healthcare"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Icon Name</label>
                      <input
                        type="text"
                        value={editingIndustry.iconName || 'Building2'}
                        onChange={(e) => setEditingIndustry({ ...editingIndustry, iconName: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="Activity, Hammer, Briefcase, Cpu, Shield"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Status</label>
                      <select
                        value={editingIndustry.status || 'published'}
                        onChange={(e) => setEditingIndustry({ ...editingIndustry, status: e.target.value as any })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="published" className="bg-slate-900 text-white">Published</option>
                        <option value="draft" className="bg-slate-900 text-white">Draft (Hidden)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Short Description</label>
                    <input
                      type="text"
                      value={editingIndustry.shortDescription || ''}
                      onChange={(e) => setEditingIndustry({ ...editingIndustry, shortDescription: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      placeholder="Brief overview for industry cards"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Full Detailed Description</label>
                    <textarea
                      rows={3}
                      value={editingIndustry.fullDescription || ''}
                      onChange={(e) => setEditingIndustry({ ...editingIndustry, fullDescription: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      placeholder="In-depth explanation of how DIGITEX serves this sector..."
                    />
                  </div>

                  {/* Industry Image Picker */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-300">Industry Banner Image</label>
                    <div className="flex items-center gap-4">
                      <img
                        src={editingIndustry.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d'}
                        alt="Industry Preview"
                        className="w-24 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          openImagePicker('Choose Industry Banner Image', editingIndustry.image || '', (url) => {
                            setEditingIndustry({ ...editingIndustry, image: url });
                          })
                        }
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                      >
                        Select from Media Library
                      </button>
                    </div>
                  </div>

                  {/* Key Challenges */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-300">Key Sector Challenges</label>
                    <div className="space-y-2">
                      {(editingIndustry.keyChallenges || []).map((ch, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={ch}
                            onChange={(e) => {
                              const updated = [...(editingIndustry.keyChallenges || [])];
                              updated[idx] = e.target.value;
                              setEditingIndustry({ ...editingIndustry, keyChallenges: updated });
                            }}
                            className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editingIndustry.keyChallenges || []).filter((_, i) => i !== idx);
                              setEditingIndustry({ ...editingIndustry, keyChallenges: updated });
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingIndustry({
                          ...editingIndustry,
                          keyChallenges: [...(editingIndustry.keyChallenges || []), 'New sector challenge'],
                        })
                      }
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      + Add Key Challenge
                    </button>
                  </div>

                  {/* Solutions Provided */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <label className="block text-xs font-bold text-slate-300">Solutions Provided (Displayed on Public Industry Card & Detail)</label>
                    <div className="space-y-2">
                      {(editingIndustry.solutionsProvided || []).map((sol, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={sol}
                            onChange={(e) => {
                              const updated = [...(editingIndustry.solutionsProvided || [])];
                              updated[idx] = e.target.value;
                              setEditingIndustry({ ...editingIndustry, solutionsProvided: updated });
                            }}
                            className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editingIndustry.solutionsProvided || []).filter((_, i) => i !== idx);
                              setEditingIndustry({ ...editingIndustry, solutionsProvided: updated });
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingIndustry({
                          ...editingIndustry,
                          solutionsProvided: [...(editingIndustry.solutionsProvided || []), 'New tailored solution'],
                        })
                      }
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      + Add Solution
                    </button>
                  </div>

                  {/* Featured Capabilities */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <label className="block text-xs font-bold text-slate-300">Featured Capabilities (Tags)</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(editingIndustry.featuredCapabilities || []).map((cap, cIdx) => (
                        <span key={cIdx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs">
                          <span>{cap}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editingIndustry.featuredCapabilities || []).filter((_, i) => i !== cIdx);
                              setEditingIndustry({ ...editingIndustry, featuredCapabilities: updated });
                            }}
                            className="text-cyan-400 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="new-industry-cap"
                        placeholder="Add capability tag (e.g. Telehealth Apps)"
                        className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const val = (e.currentTarget.value || '').trim();
                            if (val) {
                              setEditingIndustry({
                                ...editingIndustry,
                                featuredCapabilities: [...(editingIndustry.featuredCapabilities || []), val],
                              });
                              e.currentTarget.value = '';
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('new-industry-cap') as HTMLInputElement;
                          if (input && input.value.trim()) {
                            setEditingIndustry({
                              ...editingIndustry,
                              featuredCapabilities: [...(editingIndustry.featuredCapabilities || []), input.value.trim()],
                            });
                            input.value = '';
                          }
                        }}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl"
                      >
                        Add Tag
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setEditingIndustry(null)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!editingIndustry.title || !editingIndustry.slug) {
                          alert('Title and route slug are required.');
                          return;
                        }
                        const updated = [...industries];
                        const idx = updated.findIndex((i) => i.id === editingIndustry.id || i.slug === editingIndustry.slug);
                        if (idx >= 0) {
                          updated[idx] = editingIndustry as IndustryItem;
                        } else {
                          updated.push(editingIndustry as IndustryItem);
                        }
                        setIndustries(updated);
                        await saveSectionData('/api/owner/industries', { industries: updated });
                        setEditingIndustry(null);
                      }}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Save Industry
                    </button>
                  </div>
                </div>
              )}

              {/* Industries Table */}
              <div className="w-full min-w-0 rounded-2xl bg-[#0B1220] border border-white/10 overflow-x-auto shadow-xl scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <table className="w-full min-w-[780px] text-left text-xs">
                  <thead className="bg-slate-900/60 border-b border-white/10 text-slate-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4 min-w-[240px]">Industry</th>
                      <th className="p-4 min-w-[150px]">Slug / Route</th>
                      <th className="p-4 min-w-[140px]">Challenges</th>
                      <th className="p-4 min-w-[110px]">Status</th>
                      <th className="p-4 min-w-[160px] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {industries.map((ind) => (
                      <tr key={ind.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={ind.image}
                              alt={ind.title}
                              className="w-12 h-9 rounded-lg object-cover border border-white/10 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-white">{ind.title}</p>
                              <p className="text-[10px] text-slate-400 truncate max-w-xs">{ind.shortDescription}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-mono text-cyan-300">/industries/{ind.slug}</td>
                        <td className="p-4 text-slate-300">{(ind.keyChallenges || []).length} challenges</td>
                        <td className="p-4">
                          <button
                            type="button"
                            onClick={async () => {
                              const newStatus = ind.status === 'draft' ? 'published' : 'draft';
                              const updated = industries.map((item) => (item.id === ind.id ? { ...item, status: newStatus as any } : item));
                              setIndustries(updated);
                              await saveSectionData('/api/owner/industries', { industries: updated });
                            }}
                            className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider cursor-pointer transition-transform active:scale-95 ${
                              ind.status !== 'draft'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                            }`}
                            title="Click to toggle Published / Draft"
                          >
                            {ind.status !== 'draft' ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled={industries.indexOf(ind) === 0}
                              onClick={() =>
                                handleReorder(
                                  industries,
                                  industries.indexOf(ind),
                                  'up',
                                  setIndustries,
                                  '/api/owner/industries',
                                  'industries'
                                )
                              }
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-20"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={industries.indexOf(ind) === industries.length - 1}
                              onClick={() =>
                                handleReorder(
                                  industries,
                                  industries.indexOf(ind),
                                  'down',
                                  setIndustries,
                                  '/api/owner/industries',
                                  'industries'
                                )
                              }
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-20"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingIndustry({
                                  ...ind,
                                  keyChallenges: [...(ind.keyChallenges || [])],
                                  solutionsProvided: [...(ind.solutionsProvided || [])],
                                  featuredCapabilities: [...(ind.featuredCapabilities || [])],
                                });
                                const main = document.querySelector('main');
                                if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-white/5 cursor-pointer"
                              title="Edit Industry"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setConfirmModal({
                                  title: 'Delete Industry',
                                  message: `Are you sure you want to permanently delete the industry "${ind.title}"?`,
                                  confirmText: 'Delete Industry',
                                  onConfirm: async () => {
                                    const updated = industries.filter((i) => i.id !== ind.id);
                                    setIndustries(updated);
                                    await fetch(`/api/owner/industries/${ind.id}`, {
                                      method: 'DELETE',
                                      headers: getOwnerHeaders(),
                                      credentials: 'include',
                                    });
                                    await refetchData();
                                  },
                                });
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                              title="Delete Industry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 9. FAQ MANAGEMENT */}
          {/* ========================================================================= */}
          {activeSection === 'faq' && (
            <div className="space-y-6 w-full min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">FAQ Management</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage public frequently asked questions and technical answers.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingFaq({
                      id: `faq-${Date.now()}`,
                      question: '',
                      answer: '',
                      category: 'General',
                      status: 'published',
                    });
                    const main = document.querySelector('main');
                    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ Item</span>
                </button>
              </div>

              {/* FAQ Editor Drawer */}
              {editingFaq && (
                <div id="faq-editor-section" className="p-6 rounded-3xl bg-[#0B1220] border-2 border-cyan-500/40 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                      {editingFaq.id && faqs.some((f) => f.id === editingFaq.id) ? 'Edit FAQ' : 'Add New FAQ'}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setEditingFaq(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Question *</label>
                      <input
                        type="text"
                        value={editingFaq.question || ''}
                        onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. How does DIGITEX handle intellectual property rights?"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                      <input
                        type="text"
                        value={editingFaq.category || 'General'}
                        onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="General, Security, Pricing, Architecture"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Answer *</label>
                    <textarea
                      rows={3}
                      value={editingFaq.answer || ''}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      placeholder="Comprehensive answer..."
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-300 font-bold">Status:</label>
                      <select
                        value={editingFaq.status || 'published'}
                        onChange={(e) => setEditingFaq({ ...editingFaq, status: e.target.value as any })}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                      >
                        <option value="published" className="bg-slate-900 text-white">Published</option>
                        <option value="draft" className="bg-slate-900 text-white">Draft</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingFaq(null)}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!editingFaq.question || !editingFaq.answer) {
                            alert('Please provide both question and answer.');
                            return;
                          }
                          const updated = [...faqs];
                          const idx = updated.findIndex((f) => f.id === editingFaq.id);
                          if (idx >= 0) {
                            updated[idx] = editingFaq as FAQItem;
                          } else {
                            updated.push(editingFaq as FAQItem);
                          }
                          setFaqs(updated);
                          await saveSectionData('/api/owner/faqs', { faqs: updated });
                          setEditingFaq(null);
                        }}
                        className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Save FAQ
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQs List */}
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.id} className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-mono text-cyan-300 uppercase">
                          {faq.category}
                        </span>
                        <button
                          type="button"
                          onClick={async () => {
                            const newStatus = faq.status === 'draft' ? 'published' : 'draft';
                            const updated = faqs.map((f) => (f.id === faq.id ? { ...f, status: newStatus as any } : f));
                            setFaqs(updated);
                            await saveSectionData('/api/owner/faqs', { faqs: updated });
                          }}
                          className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider cursor-pointer ${
                            faq.status !== 'draft'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {faq.status !== 'draft' ? 'Published' : 'Draft'}
                        </button>
                      </div>
                      <h3 className="text-xs font-bold text-white">{faq.question}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        disabled={faqs.indexOf(faq) === 0}
                        onClick={() =>
                          handleReorder(
                            faqs,
                            faqs.indexOf(faq),
                            'up',
                            setFaqs,
                            '/api/owner/faqs',
                            'faqs'
                          )
                        }
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-20"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={faqs.indexOf(faq) === faqs.length - 1}
                        onClick={() =>
                          handleReorder(
                            faqs,
                            faqs.indexOf(faq),
                            'down',
                            setFaqs,
                            '/api/owner/faqs',
                            'faqs'
                          )
                        }
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-20"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingFaq(faq);
                          const main = document.querySelector('main');
                          if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-white/5 cursor-pointer"
                        title="Edit FAQ"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmModal({
                            title: 'Delete FAQ Item',
                            message: `Are you sure you want to permanently delete "${faq.question}"?`,
                            confirmText: 'Delete FAQ',
                            onConfirm: async () => {
                              const updated = faqs.filter((f) => f.id !== faq.id);
                              setFaqs(updated);
                              await fetch(`/api/owner/faqs/${faq.id}`, {
                                method: 'DELETE',
                                headers: getOwnerHeaders(),
                                credentials: 'include',
                              });
                              await refetchData();
                            },
                          });
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 10. TESTIMONIALS MANAGEMENT */}
          {/* ========================================================================= */}
          {activeSection === 'testimonials' && (
            <div className="space-y-6 w-full min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Testimonials Management</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage verified client testimonials, ratings, and social proof.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingTestimonial({
                      id: `test-${Date.now()}`,
                      name: '',
                      role: 'Chief Technology Officer',
                      company: 'Enterprise Client',
                      content: '',
                      rating: 5,
                      service: 'Web Development',
                      status: 'published',
                    });
                    const main = document.querySelector('main');
                    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              {/* Testimonial Editor Drawer */}
              {editingTestimonial && (
                <div id="testimonial-editor-section" className="p-6 rounded-3xl bg-[#0B1220] border-2 border-cyan-500/40 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                      {editingTestimonial.id && testimonials.some((t) => t.id === editingTestimonial.id)
                        ? 'Edit Testimonial'
                        : 'Add New Testimonial'}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setEditingTestimonial(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Client Name *</label>
                      <input
                        type="text"
                        value={editingTestimonial.name || ''}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Sarah Jenkins"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Role / Position</label>
                      <input
                        type="text"
                        value={editingTestimonial.role || ''}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. VP of Product"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Company</label>
                      <input
                        type="text"
                        value={editingTestimonial.company || ''}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Apex Health Systems"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Associated Service</label>
                      <input
                        type="text"
                        value={editingTestimonial.service || ''}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, service: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Web Development"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Star Rating (1-5)</label>
                      <select
                        value={editingTestimonial.rating || 5}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="5" className="bg-slate-900 text-white">★★★★★ (5 Stars)</option>
                        <option value="4" className="bg-slate-900 text-white">★★★★☆ (4 Stars)</option>
                        <option value="3" className="bg-slate-900 text-white">★★★☆☆ (3 Stars)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Status</label>
                      <select
                        value={editingTestimonial.status || 'published'}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, status: e.target.value as any })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="published" className="bg-slate-900 text-white">Published</option>
                        <option value="draft" className="bg-slate-900 text-white">Draft</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Testimonial Quote *</label>
                    <textarea
                      rows={3}
                      value={editingTestimonial.content || ''}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      placeholder="Enter client review quotation..."
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingTestimonial(null)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!editingTestimonial.name || !editingTestimonial.content) {
                          alert('Client name and review content are required.');
                          return;
                        }
                        const updated = [...testimonials];
                        const idx = updated.findIndex((t) => t.id === editingTestimonial.id);
                        if (idx >= 0) {
                          updated[idx] = editingTestimonial as TestimonialItem;
                        } else {
                          updated.push(editingTestimonial as TestimonialItem);
                        }
                        setTestimonials(updated);
                        await saveSectionData('/api/owner/testimonials', { testimonials: updated });
                        setEditingTestimonial(null);
                      }}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Save Testimonial
                    </button>
                  </div>
                </div>
              )}

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-5 rounded-2xl bg-[#0B1220] border border-white/10 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-bold text-sm text-white">{t.name}</span>
                          <p className="text-[11px] text-slate-400">{t.role ? `${t.role} · ` : ''}{t.company}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 text-xs font-bold">{'★'.repeat(t.rating || 5)}</span>
                          <button
                            type="button"
                            onClick={async () => {
                              const newStatus = t.status === 'draft' ? 'published' : 'draft';
                              const updated = testimonials.map((item) => (item.id === t.id ? { ...item, status: newStatus as any } : item));
                              setTestimonials(updated);
                              await saveSectionData('/api/owner/testimonials', { testimonials: updated });
                            }}
                            className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider cursor-pointer ${
                              t.status !== 'draft'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {t.status !== 'draft' ? 'Published' : 'Draft'}
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 italic leading-relaxed">"{t.content}"</p>
                      {t.service && (
                        <p className="text-[10px] text-cyan-300 font-mono mt-2">Service: {t.service}</p>
                      )}
                    </div>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={testimonials.indexOf(t) === 0}
                          onClick={() =>
                            handleReorder(
                              testimonials,
                              testimonials.indexOf(t),
                              'up',
                              setTestimonials,
                              '/api/owner/testimonials',
                              'testimonials'
                            )
                          }
                          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={testimonials.indexOf(t) === testimonials.length - 1}
                          onClick={() =>
                            handleReorder(
                              testimonials,
                              testimonials.indexOf(t),
                              'down',
                              setTestimonials,
                              '/api/owner/testimonials',
                              'testimonials'
                            )
                          }
                          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTestimonial(t);
                            const main = document.querySelector('main');
                            if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-white/5 cursor-pointer"
                          title="Edit Testimonial"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmModal({
                              title: 'Delete Testimonial',
                              message: `Are you sure you want to permanently delete the testimonial from "${t.name}"?`,
                              confirmText: 'Delete Testimonial',
                              onConfirm: async () => {
                                const updated = testimonials.filter((item) => item.id !== t.id);
                                setTestimonials(updated);
                                await fetch(`/api/owner/testimonials/${t.id}`, {
                                  method: 'DELETE',
                                  headers: getOwnerHeaders(),
                                  credentials: 'include',
                                });
                                await refetchData();
                              },
                            });
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                          title="Delete Testimonial"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 11. TECHNOLOGIES MANAGEMENT */}
          {/* ========================================================================= */}
          {activeSection === 'technologies' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Technology Stacks</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage verified technology categories, frameworks, and architecture toolchains.</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingTech({
                      id: `tech-${Date.now()}`,
                      category: '',
                      description: '',
                      status: 'published',
                      items: [
                        { name: 'React 19', level: 'Production Core', description: 'Concurrent UI' },
                        { name: 'TypeScript', level: 'Strict Strictness', description: 'Type Safety' },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Tech Stack</span>
                </button>
              </div>

              {/* Tech Stack Editor Drawer */}
              {editingTech && (
                <div className="p-6 rounded-3xl bg-[#0B1220] border-2 border-cyan-500/40 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                      {editingTech.category ? `Edit Stack: ${editingTech.category}` : 'Add New Tech Stack'}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setEditingTech(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Category Title *</label>
                      <input
                        type="text"
                        value={editingTech.category || ''}
                        onChange={(e) => setEditingTech({ ...editingTech, category: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Frontend & UI Engineering"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Status</label>
                      <select
                        value={editingTech.status || 'published'}
                        onChange={(e) => setEditingTech({ ...editingTech, status: e.target.value as any })}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="published" className="bg-slate-900 text-white">Published</option>
                        <option value="draft" className="bg-slate-900 text-white">Draft</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Category Description</label>
                    <textarea
                      rows={2}
                      value={editingTech.description || ''}
                      onChange={(e) => setEditingTech({ ...editingTech, description: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      placeholder="Brief overview of tools and frameworks..."
                    />
                  </div>

                  {/* Items in category */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-300">Toolchain Items</label>
                    <div className="space-y-2">
                      {(editingTech.items || []).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const updated = [...(editingTech.items || [])];
                              updated[idx] = { ...updated[idx], name: e.target.value };
                              setEditingTech({ ...editingTech, items: updated });
                            }}
                            className="w-1/3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                            placeholder="Tool Name"
                          />
                          <input
                            type="text"
                            value={item.level}
                            onChange={(e) => {
                              const updated = [...(editingTech.items || [])];
                              updated[idx] = { ...updated[idx], level: e.target.value };
                              setEditingTech({ ...editingTech, items: updated });
                            }}
                            className="w-1/3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                            placeholder="Proficiency Level"
                          />
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => {
                              const updated = [...(editingTech.items || [])];
                              updated[idx] = { ...updated[idx], description: e.target.value };
                              setEditingTech({ ...editingTech, items: updated });
                            }}
                            className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                            placeholder="Short description"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editingTech.items || []).filter((_, i) => i !== idx);
                              setEditingTech({ ...editingTech, items: updated });
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingTech({
                          ...editingTech,
                          items: [...(editingTech.items || []), { name: 'New Tool', level: 'Production', description: '' }],
                        })
                      }
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      + Add Tool Item
                    </button>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setEditingTech(null)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!editingTech.category) {
                          alert('Please enter a category title.');
                          return;
                        }
                        const updated = [...technologies];
                        const idx = updated.findIndex((t) => t.category === editingTech.category || (editingTech.id && t.id === editingTech.id));
                        if (idx >= 0) {
                          updated[idx] = editingTech as TechCategory;
                        } else {
                          updated.push(editingTech as TechCategory);
                        }
                        setTechnologies(updated);
                        await saveSectionData('/api/owner/technologies', { technologies: updated });
                        setEditingTech(null);
                      }}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Save Tech Category
                    </button>
                  </div>
                </div>
              )}

              {/* Technologies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {technologies.map((tech, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#0B1220] border border-white/10 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-bold text-cyan-300">{tech.category}</h3>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() =>
                              handleReorder(
                                technologies,
                                idx,
                                'up',
                                setTechnologies,
                                '/api/owner/technologies',
                                'technologies'
                              )
                            }
                            className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === technologies.length - 1}
                            onClick={() =>
                              handleReorder(
                                technologies,
                                idx,
                                'down',
                                setTechnologies,
                                '/api/owner/technologies',
                                'technologies'
                              )
                            }
                            className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingTech(tech)}
                            className="p-1 text-slate-300 hover:text-cyan-300"
                            title="Edit Category"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setConfirmModal({
                                title: 'Delete Tech Category',
                                message: `Are you sure you want to permanently delete the "${tech.category}" tech stack?`,
                                confirmText: 'Delete Category',
                                onConfirm: async () => {
                                  const updated = technologies.filter((_, i) => i !== idx);
                                  setTechnologies(updated);
                                  await saveSectionData('/api/owner/technologies', { technologies: updated });
                                },
                              });
                            }}
                            className="p-1 text-slate-400 hover:text-red-400"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">{tech.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {tech.items.map((item, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300 font-mono">
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 12. GLOBAL & PAGE-LEVEL SEO CONFIGURATION */}
          {/* ========================================================================= */}
          {activeSection === 'seo' && seo && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Search Engine Optimization (SEO)</h1>
                  <p className="text-xs text-slate-400 mt-1">Configure global search tags, OpenGraph social preview cards, and per-page metadata.</p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    await saveSectionData('/api/owner/seo', seo);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1677FF] to-[#22D3EE] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save SEO Config</span>
                </button>
              </div>

              {/* Sub-Tabs for SEO (Global vs Individual Pages) */}
              <div className="flex flex-wrap gap-2 p-1.5 bg-[#0B1220] border border-white/10 rounded-2xl">
                {[
                  { id: 'global', label: 'Global Metadata' },
                  { id: 'home', label: 'Homepage' },
                  { id: 'about', label: 'About Page' },
                  { id: 'services', label: 'Services Directory' },
                  { id: 'industries', label: 'Industries Directory' },
                  { id: 'projects', label: 'Projects Showcase' },
                  { id: 'contact', label: 'Contact Page' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveSeoTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      activeSeoTab === tab.id
                        ? 'bg-cyan-500/20 text-[#22D3EE] border border-cyan-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Global SEO Settings */}
              {activeSeoTab === 'global' && (
                <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                    Global Site Defaults
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Website Default Title</label>
                      <input
                        type="text"
                        value={seo.global.websiteTitle}
                        onChange={(e) =>
                          setSeo({
                            ...seo,
                            global: { ...seo.global, websiteTitle: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Canonical Base URL</label>
                      <input
                        type="text"
                        value={seo.global.canonicalBaseUrl}
                        onChange={(e) =>
                          setSeo({
                            ...seo,
                            global: { ...seo.global, canonicalBaseUrl: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="https://digitex.media"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Default Meta Description</label>
                    <textarea
                      rows={3}
                      value={seo.global.defaultDescription}
                      onChange={(e) =>
                        setSeo({
                          ...seo,
                          global: { ...seo.global, defaultDescription: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-slate-300">Default Social Share Image (OpenGraph)</label>
                    <div className="flex items-center gap-4">
                      <img
                        src={seo.global.defaultOgImage}
                        alt="OG Preview"
                        className="w-32 h-18 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          openImagePicker('Choose Global Social Share Image', seo.global.defaultOgImage, (url) => {
                            setSeo({
                              ...seo,
                              global: { ...seo.global, defaultOgImage: url },
                            });
                          })
                        }
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                      >
                        Select from Media Library
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Page-Specific SEO Settings */}
              {activeSeoTab !== 'global' && seo.pages && seo.pages[activeSeoTab] && (
                <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                    Metadata for {activeSeoTab.toUpperCase()}
                  </h2>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Browser Title Tag</label>
                    <input
                      type="text"
                      value={seo.pages[activeSeoTab].title || ''}
                      onChange={(e) => {
                        const updatedPages = { ...seo.pages };
                        updatedPages[activeSeoTab] = {
                          ...updatedPages[activeSeoTab],
                          title: e.target.value,
                        };
                        setSeo({ ...seo, pages: updatedPages });
                      }}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Search Engine Meta Description</label>
                    <textarea
                      rows={3}
                      value={seo.pages[activeSeoTab].description || ''}
                      onChange={(e) => {
                        const updatedPages = { ...seo.pages };
                        updatedPages[activeSeoTab] = {
                          ...updatedPages[activeSeoTab],
                          description: e.target.value,
                        };
                        setSeo({ ...seo, pages: updatedPages });
                      }}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">OpenGraph Title</label>
                      <input
                        type="text"
                        value={seo.pages[activeSeoTab].ogTitle || ''}
                        onChange={(e) => {
                          const updatedPages = { ...seo.pages };
                          updatedPages[activeSeoTab] = {
                            ...updatedPages[activeSeoTab],
                            ogTitle: e.target.value,
                          };
                          setSeo({ ...seo, pages: updatedPages });
                        }}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="Leave blank to use Browser Title"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">OpenGraph Description</label>
                      <input
                        type="text"
                        value={seo.pages[activeSeoTab].ogDescription || ''}
                        onChange={(e) => {
                          const updatedPages = { ...seo.pages };
                          updatedPages[activeSeoTab] = {
                            ...updatedPages[activeSeoTab],
                            ogDescription: e.target.value,
                          };
                          setSeo({ ...seo, pages: updatedPages });
                        }}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder="Leave blank to use Meta Description"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-slate-300">Page Social Share Image</label>
                    <div className="flex items-center gap-4">
                      <img
                        src={seo.pages[activeSeoTab].ogImage || seo.global.defaultOgImage}
                        alt="OG Preview"
                        className="w-32 h-18 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          openImagePicker(`Choose Social Image for ${activeSeoTab}`, seo.pages[activeSeoTab].ogImage || '', (url) => {
                            const updatedPages = { ...seo.pages };
                            updatedPages[activeSeoTab] = {
                              ...updatedPages[activeSeoTab],
                              ogImage: url,
                            };
                            setSeo({ ...seo, pages: updatedPages });
                          })
                        }
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                      >
                        Select from Media Library
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Reusable Image Selector Modal */}
      <ImageSelectorModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        title={imageModalTitle}
        currentImage={currentImageTarget?.currentUrl || ''}
        onSelect={(url, alt) => {
          if (currentImageTarget?.callback) {
            currentImageTarget.callback(url, alt);
          }
        }}
      />

      {/* Active Media Deletion Warning Modal */}
      {deleteMediaTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
          <div className="bg-[#0B1220] border border-red-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-white tracking-tight">
              Active Media Asset Warning
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              This media item (<strong>{deleteMediaTarget.filename}</strong>) is actively being used across your live website:
            </p>
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl space-y-1">
              {(deleteMediaTarget.usageLocations || []).map((loc, i) => (
                <div key={i} className="text-xs text-red-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>{loc}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400">
              Deleting this asset will remove the image from these live sections. Are you absolutely certain?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteMediaTarget(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
              >
                Cancel & Keep Asset
              </button>
              <button
                type="button"
                onClick={() => handleDeleteMedia(deleteMediaTarget, true)}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Universal Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
          <div className="bg-[#0B1220] border border-red-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-white tracking-tight">
                {confirmModal.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                {confirmModal.message}
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const action = confirmModal.onConfirm;
                  setConfirmModal(null);
                  await action();
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg shadow-red-600/30"
              >
                {confirmModal.confirmText || 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
