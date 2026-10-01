import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ServiceItem,
  ProjectItem,
  IndustryItem,
  TestimonialItem,
  TeamMember,
  ContactConfig,
  EnquiryRecord,
  HomepageConfig,
  AboutConfig,
  SEOConfig,
  FAQItem,
  TechCategory,
} from '../types';
import {
  INITIAL_CONTACT_CONFIG,
  INITIAL_SERVICES,
  INITIAL_PROJECTS,
  INITIAL_INDUSTRIES,
  INITIAL_TESTIMONIALS,
  INITIAL_TEAM,
  INITIAL_FAQS,
  TECH_CATEGORIES,
  INITIAL_ABOUT,
} from '../data/digitexData';

const DEFAULT_HOMEPAGE: HomepageConfig = {
  hero: {
    eyebrow: 'DIGITAL SOLUTIONS & MARKETING AGENCY',
    heading: 'We build digital experiences that drive',
    highlightedText: 'real growth.',
    description:
      'From strategy to execution, we craft innovative digital solutions that help brands grow, engage and lead in competitive global markets.',
    primaryCtaText: 'Get a Quote',
    primaryCtaLink: '/get-a-quote',
    secondaryCtaText: 'View Our Work',
    secondaryCtaLink: '/projects',
    heroImage:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=85',
  },
  aboutPreview: {
    eyebrow: 'ABOUT DIGITEX',
    heading: 'Engineering Scalable Digital Experiences That Transform Modern Businesses.',
    description:
      'DIGITEX is a modern digital agency specializing in scalable software engineering, AI solutions, high-converting e-commerce storefronts, and performance marketing. We operate at the intersection of aesthetic discipline and technical rigor.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    featureCards: [
      {
        title: 'End-to-End Delivery',
        description:
          'From initial discovery and Figma prototyping to production deployment, we manage the complete lifecycle.',
      },
      {
        title: 'Zero Technical Debt',
        description:
          'Clean TypeScript architecture, automated testing pipelines, and documented component libraries.',
      },
      {
        title: 'Client IP Ownership',
        description:
          '100% full intellectual property ownership transferred upon final milestone completion.',
      },
    ],
  },
  servicesPreview: {
    heading: 'COMPREHENSIVE DIGITAL SERVICES',
    description: 'Engineered for high velocity, security, and market impact across every screen.',
  },
  technologyPreview: {
    eyebrow: 'OUR TECHNOLOGY',
    heading: 'TECHNOLOGY THAT TURNS IDEAS INTO DIGITAL PRODUCTS.',
    description:
      'We engineer digital products with a modern, battle-tested stack. From intelligent AI pipelines and reactive frontends to resilient cloud infrastructure, every tool is chosen for speed, security, and enterprise scalability.',
  },
  projectsPreview: {
    heading: 'FEATURED CLIENT WORK',
    description:
      'A selection of recent digital products engineered by DIGITEX across logistics, luxury e-commerce, cloud platforms, and healthcare.',
  },
  testimonialsPreview: {
    heading: 'TRUSTED BY AMBITIOUS TEAMS',
    description: 'We are proud to be trusted by businesses that value innovation, quality and results.',
  },
  faqPreview: {
    heading: 'QUESTIONS, ANSWERED.',
    description:
      'Find quick answers to common questions about partnering with DIGITEX, our development standards, intellectual property ownership, and kickoff timelines.',
  },
  finalCta: {
    heading: 'READY TO ACCELERATE YOUR DIGITAL VISION?',
    description:
      'Connect with our solutions engineering team for an architectural consultation, timeline roadmap, and milestone scope breakdown.',
    ctaText: 'Get a Tailored Quote',
    ctaLink: '/get-a-quote',
    secondaryCtaText: 'Chat on WhatsApp',
    secondaryCtaLink: 'https://wa.me/919034242154',
  },
};

const DEFAULT_ABOUT: AboutConfig = INITIAL_ABOUT;

const DEFAULT_SEO: SEOConfig = {
  global: {
    websiteTitle: 'DIGITEX - Digital Solutions & Marketing Agency',
    defaultDescription:
      'Enterprise technology, custom software development, web & mobile applications, AI solutions, and digital marketing agency.',
    defaultOgImage: '/assets/digitex-icon.svg',
    favicon: '/favicon.svg',
    canonicalBaseUrl: 'https://digitex.media',
  },
  pages: {
    home: {
      title: 'DIGITEX - Digital Solutions & Marketing Agency',
      description:
        'Enterprise technology, custom software development, web & mobile applications, AI solutions, and digital marketing agency.',
    },
    about: {
      title: 'About Us | DIGITEX Digital Solutions',
      description: "Learn about DIGITEX's engineering culture, core values, and delivery standards.",
    },
    services: {
      title: 'Our Services | DIGITEX Digital Engineering',
      description:
        'Explore DIGITEX services: Web Development, AI Solutions, Custom Software, Mobile Apps, and SEO.',
    },
    projects: {
      title: 'Client Case Studies & Projects | DIGITEX',
      description: 'Explore real client products engineered by DIGITEX across global industries.',
    },
    contact: {
      title: 'Contact DIGITEX | Start Your Project',
      description:
        'Get in touch with our solutions engineering team. Receive a project proposal within 24-48 hours.',
    },
    quote: {
      title: 'Get a Tailored Quote | DIGITEX',
      description: 'Submit your digital project scope for an upfront architectural breakdown and quote.',
    },
  },
};

interface DataContextType {
  services: ServiceItem[];
  projects: ProjectItem[];
  industries: IndustryItem[];
  testimonials: TestimonialItem[];
  team: TeamMember[];
  faqs: FAQItem[];
  technologies: TechCategory[];
  contactConfig: ContactConfig;
  homepage: HomepageConfig;
  about: AboutConfig;
  seo: SEOConfig;
  enquiries: EnquiryRecord[];
  isLoading: boolean;

  // Actions
  refetchData: () => Promise<void>;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  updateService: (id: string, service: Partial<ServiceItem>) => void;

  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  updateContactConfig: (config: Partial<ContactConfig>) => void;

  submitEnquiry: (data: { name: string; phone: string; email?: string; service?: string; message: string }) => string;
  updateEnquiryStatus: (id: string, status: EnquiryRecord['status']) => void;
  deleteEnquiry: (id: string) => void;

  exportBackup: () => void;
  importBackup: (jsonData: string) => boolean;
  resetDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [industries, setIndustries] = useState<IndustryItem[]>(INITIAL_INDUSTRIES);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [technologies, setTechnologies] = useState<TechCategory[]>(TECH_CATEGORIES);
  const [contactConfig, setContactConfig] = useState<ContactConfig>(INITIAL_CONTACT_CONFIG);
  const [homepage, setHomepage] = useState<HomepageConfig>(DEFAULT_HOMEPAGE);
  const [about, setAbout] = useState<AboutConfig>(DEFAULT_ABOUT);
  const [seo, setSeo] = useState<SEOConfig>(DEFAULT_SEO);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch persistent public data from server
  const refetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/public/data', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.services) && data.services.length > 0) setServices(data.services);
        if (Array.isArray(data.projects) && data.projects.length > 0) setProjects(data.projects);
        if (Array.isArray(data.testimonials) && data.testimonials.length > 0) setTestimonials(data.testimonials);
        if (Array.isArray(data.industries) && data.industries.length > 0) setIndustries(data.industries);
        if (Array.isArray(data.faqs) && data.faqs.length > 0) setFaqs(data.faqs);
        if (Array.isArray(data.technologies) && data.technologies.length > 0) setTechnologies(data.technologies);
        if (Array.isArray(data.team) && data.team.length > 0) setTeam(data.team);
        if (data.contactConfig) setContactConfig(data.contactConfig);
        if (data.homepage) setHomepage(data.homepage);
        if (data.about) setAbout(data.about);
        if (data.seo) setSeo(data.seo);
      }
    } catch (err) {
      console.warn('[DIGITEX] Fetching public API failed, using cached default state:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchData();
  }, [refetchData]);

  // Submit client enquiry via persistent server API and return WhatsApp consultation link
  const submitEnquiry = (data: {
    name: string;
    phone: string;
    email?: string;
    service?: string;
    message: string;
  }): string => {
    const id = `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newRecord: EnquiryRecord = {
      id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service || 'General Inquiry',
      message: data.message,
      timestamp: new Date().toISOString(),
      status: 'new',
    };

    // Optimistic local update
    setEnquiries((prev) => [newRecord, ...prev]);

    // Persist to server API in background
    fetch('/api/public/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((err) => console.warn('Enquiry server persistence error:', err));

    // Construct direct WhatsApp consultation URL
    const text = encodeURIComponent(
      `Hello DIGITEX,\n\nI would like to discuss a project.\n\n*Name:* ${data.name}\n*Phone:* ${data.phone}${
        data.email ? `\n*Email:* ${data.email}` : ''
      }${data.service ? `\n*Service:* ${data.service}` : ''}\n\n*Requirement:*\n${data.message}`
    );
    const rawPhone = (contactConfig.whatsappNumber || '+919034242154').replace(/[^0-9]/g, '');
    return `https://wa.me/${rawPhone}?text=${text}`;
  };

  // Actions for backward compatibility
  const addProject = (item: Omit<ProjectItem, 'id'>) => {
    const newProject: ProjectItem = {
      ...item,
      id: item.slug || `proj-${Date.now()}`,
      status: 'published',
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const addTestimonial = (item: Omit<TestimonialItem, 'id'>) => {
    const newTestimonial: TestimonialItem = {
      ...item,
      id: `test-${Date.now()}`,
      status: 'published',
    };
    setTestimonials((prev) => [newTestimonial, ...prev]);
  };

  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const updateContactConfig = (config: Partial<ContactConfig>) => {
    setContactConfig((prev) => ({ ...prev, ...config }));
  };

  const updateEnquiryStatus = (id: string, status: EnquiryRecord['status']) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  const exportBackup = () => {
    const backup = {
      services,
      projects,
      testimonials,
      contactConfig,
      homepage,
      about,
      seo,
      enquiries,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digitex-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      if (data.services) setServices(data.services);
      if (data.projects) setProjects(data.projects);
      if (data.testimonials) setTestimonials(data.testimonials);
      if (data.contactConfig) setContactConfig(data.contactConfig);
      if (data.homepage) setHomepage(data.homepage);
      if (data.about) setAbout(data.about);
      if (data.seo) setSeo(data.seo);
      return true;
    } catch {
      return false;
    }
  };

  const resetDefaults = () => {
    setServices(INITIAL_SERVICES);
    setProjects(INITIAL_PROJECTS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setContactConfig(INITIAL_CONTACT_CONFIG);
    setHomepage(DEFAULT_HOMEPAGE);
    setAbout(DEFAULT_ABOUT);
    setSeo(DEFAULT_SEO);
    refetchData();
  };

  return (
    <DataContext.Provider
      value={{
        services,
        projects,
        industries,
        testimonials,
        team,
        faqs,
        technologies,
        contactConfig,
        homepage,
        about,
        seo,
        enquiries,
        isLoading,
        refetchData,
        addProject,
        updateProject,
        deleteProject,
        updateService,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateContactConfig,
        submitEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        exportBackup,
        importBackup,
        resetDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
