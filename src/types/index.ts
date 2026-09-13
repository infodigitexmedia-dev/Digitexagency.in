export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  isVisible: boolean;
  order: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web Development' | 'Branding' | 'Digital Marketing' | 'Mobile App Development' | 'AI Solutions' | string;
  description: string;
  fullDescription?: string;
  imageUrl: string;
  client?: string;
  deliverables?: string[];
  technologies?: string[];
  projectUrl?: string;
  isVisible: boolean;
  order: number;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  role?: string;
  avatarUrl?: string;
  review: string;
  rating: number; // 1 to 5
  isVisible: boolean;
  createdAt?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  isVisible: boolean;
  uploadedAt: string;
}

export interface ContactInfo {
  whatsappNumber: string;
  displayPhone: string;
  email: string;
  address: string;
  city: string;
  businessHours: string;
  linkedinUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  facebookUrl?: string;
  githubUrl?: string;
}

export interface WebsiteContent {
  heroBadge: string;
  heroHeadline: string;
  heroDescription: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  servicesHeading: string;
  servicesSubheading: string;
  projectsHeading: string;
  projectsSubheading: string;
  aboutHeading: string;
  aboutSubheading: string;
  aboutDescription: string;
  aboutStrengths: string[];
  testimonialsHeading: string;
  testimonialsSubheading: string;
  contactHeading: string;
  contactSubheading: string;
  footerDescription: string;
}

export interface StatisticsData {
  showPublicly: boolean;
  items: {
    id: string;
    label: string;
    value: string;
    verifiedNote?: string;
  }[];
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  channel: 'WhatsApp' | 'Web Form';
}

export interface WebsiteData {
  content: WebsiteContent;
  services: ServiceItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  gallery: GalleryItem[];
  contact: ContactInfo;
  statistics: StatisticsData;
  inquiries: ContactInquiry[];
  adminAuth: {
    pinHash: string; // default pin or password
    lastLogin?: string;
  };
}
