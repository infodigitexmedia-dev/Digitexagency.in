/**
 * DIGITEX - Application Types and Interfaces
 */

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  group?: 'Digital Experience' | 'Technology' | 'Growth' | 'Quality' | string;
  aliases?: string[];
  iconName: string;
  image: string;
  capabilities: string[];
  technologies: string[];
  deliverables: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  benefits: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  status?: 'published' | 'draft';
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
  ctaText?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  industry: string;
  tagline: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  servicesProvided: string[];
  technologies: string[];
  coverImage: string;
  galleryImages: string[];
  year: string;
  timeline?: string;
  featured?: boolean;
  externalUrl?: string;
  status?: 'published' | 'draft';
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  iconName: string;
  keyChallenges: string[];
  solutionsProvided: string[];
  featuredCapabilities: string[];
  relevantServices?: string[];
  status?: 'published' | 'draft';
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  service: string;
  avatar?: string;
  featured?: boolean;
  status?: 'published' | 'draft';
  order?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  linkedIn?: string;
}

export interface ContactConfig {
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappUrl: string;
  calendarUrl: string;
  address: string;
  operatingHours: string;
  companyName?: string;
  linkedIn?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
}

export interface EnquiryRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'converted' | 'resolved';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  status?: 'published' | 'draft';
  order?: number;
}

export interface TechCategory {
  id?: string;
  category: string;
  description: string;
  iconName?: string;
  accent?: string;
  badgeColor?: string;
  link?: string;
  status?: 'published' | 'draft';
  order?: number;
  items: {
    name: string;
    level: string;
    description: string;
  }[];
}

export interface HomepageConfig {
  hero: {
    eyebrow: string;
    heading: string;
    highlightedText: string;
    description: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    heroImage: string;
  };
  aboutPreview: {
    eyebrow: string;
    heading: string;
    description: string;
    image: string;
    featureCards: { title: string; description: string }[];
  };
  servicesPreview: {
    heading: string;
    description: string;
  };
  technologyPreview: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  projectsPreview: {
    heading: string;
    description: string;
  };
  testimonialsPreview: {
    heading: string;
    description: string;
  };
  faqPreview: {
    heading: string;
    description: string;
  };
  finalCta: {
    heading: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
  };
}

export interface AboutConfig {
  heroEyebrow?: string;
  heading: string;
  subheading: string;
  introduction: string;
  philosophyEyebrow?: string;
  philosophyHeading?: string;
  mission: string;
  heroImage: string;
  values: { title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
}

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  alt: string;
  caption?: string;
  uploadedAt: string;
  size: number;
  mimeType: string;
  usageCount?: number;
  usageLocations?: string[];
}

export interface SEOConfig {
  global: {
    websiteTitle: string;
    defaultDescription: string;
    defaultOgImage: string;
    favicon: string;
    canonicalBaseUrl: string;
  };
  pages: Record<string, {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  }>;
}
