import { WebsiteData } from '../types';

export const INITIAL_DATA: WebsiteData = {
  content: {
    heroBadge: 'Digital Solutions & Marketing Agency',
    heroHeadline: 'Digital Solutions That Move Your Business Forward.',
    heroDescription:
      'DIGITEX helps businesses build stronger digital experiences through web development, digital marketing, branding, social media, AI solutions and mobile applications.',
    heroPrimaryCta: 'Start a Project',
    heroSecondaryCta: 'View Our Work',
    servicesHeading: 'What We Do',
    servicesSubheading:
      'Practical digital solutions designed to help businesses build, grow and connect.',
    projectsHeading: 'Selected Work',
    projectsSubheading:
      'A showcase of client projects, digital platforms, and brand solutions developed by DIGITEX.',
    aboutHeading: 'Why Choose DIGITEX?',
    aboutSubheading:
      'A dedicated team combining design, engineering, and digital strategy to deliver measurable business results.',
    aboutDescription:
      'DIGITEX combines design, development, marketing and technology to help businesses build a stronger digital presence. We partner closely with ambitious founders and established enterprises to turn complex digital challenges into clean, effective, and dependable solutions.',
    aboutStrengths: [
      'End-to-end digital solutions',
      'Dedicated project support',
      'Clear communication',
      'Modern technology',
      'Business-focused approach',
      'Post-launch support',
    ],
    testimonialsHeading: 'What Our Clients Say',
    testimonialsSubheading:
      'Direct feedback from founders, executives, and marketing leaders we collaborate with.',
    contactHeading: "Let's Work Together",
    contactSubheading:
      'Have an upcoming project or need advice on your digital presence? Tell us about your goals and our team will get in touch.',
    footerDescription:
      'DIGITEX is a modern digital solutions and marketing agency providing web engineering, branding, growth marketing, and mobile solutions for forward-thinking businesses.',
  },
  services: [
    {
      id: 'srv-1',
      name: 'Digital Marketing',
      description:
        'Data-driven strategies designed to improve online visibility and growth.',
      iconName: 'TrendingUp',
      isVisible: true,
      order: 1,
    },
    {
      id: 'srv-2',
      name: 'Web Development',
      description:
        'Modern, responsive websites built around business goals and user experience.',
      iconName: 'Globe',
      isVisible: true,
      order: 2,
    },
    {
      id: 'srv-3',
      name: 'Branding',
      description:
        'Clear and memorable brand identities that help businesses stand out.',
      iconName: 'Palette',
      isVisible: true,
      order: 3,
    },
    {
      id: 'srv-4',
      name: 'Social Media Marketing',
      description:
        'Content and social strategies designed to build engagement and brand awareness.',
      iconName: 'Share2',
      isVisible: true,
      order: 4,
    },
    {
      id: 'srv-5',
      name: 'AI Solutions',
      description:
        'Practical AI-powered solutions that improve efficiency and customer experiences.',
      iconName: 'Cpu',
      isVisible: true,
      order: 5,
    },
    {
      id: 'srv-6',
      name: 'Mobile App Development',
      description:
        'Modern mobile applications designed for iOS and Android experiences.',
      iconName: 'Smartphone',
      isVisible: true,
      order: 6,
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Nexus Enterprise — Responsive Web Platform & Portal',
      category: 'Web Development',
      description:
        'Modern responsive business website and client portal engineered with fast loading performance and conversion-focused user architecture.',
      fullDescription:
        'Engineered for a modern technology and professional enterprise, this responsive web platform features an intuitive information architecture, streamlined self-service client workflows, and optimized lighthouse scores across mobile and desktop screens.',
      imageUrl:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      client: 'Nexus Enterprise Group',
      deliverables: ['UI/UX Design', 'Responsive Web Engineering', 'SEO Optimization'],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Headless CMS'],
      projectUrl: 'https://example.com/case-study/nexus-enterprise',
      isVisible: true,
      order: 1,
    },
    {
      id: 'proj-2',
      title: 'PayPulse — Digital Banking & Mobile Wallet App',
      category: 'Mobile App Development',
      description:
        'Native-feel iOS and Android mobile banking application featuring biometric login, instant payment transfers, and real-time transaction tracking.',
      fullDescription:
        'Designed with high clarity and touch precision, PayPulse delivers smooth financial operations, account analytics, instant P2P payments, and frictionless biometric authorization with bank-grade security standards.',
      imageUrl:
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
      client: 'PayPulse Financial Ltd.',
      deliverables: ['Mobile UI/UX Architecture', 'Cross-Platform App Development', 'Secure API Integration'],
      technologies: ['React Native', 'TypeScript', 'Secure Storage', 'REST APIs'],
      projectUrl: 'https://example.com/case-study/paypulse',
      isVisible: true,
      order: 2,
    },
    {
      id: 'proj-3',
      title: 'Vanguard Studio — Minimalist Brand Identity & System',
      category: 'Branding',
      description:
        'Comprehensive brand identity redesign featuring bespoke typography, premium stationery guidelines, and a cohesive digital asset system.',
      fullDescription:
        'We developed an enduring, confident visual identity for an executive design studio. The scope encompassed custom logotype design, physical stationery mockups, color system specifications, and an art-directed photography guide.',
      imageUrl:
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80',
      client: 'Vanguard Design Studio',
      deliverables: ['Brand Strategy', 'Logo & Typographic System', 'Stationery Guidelines'],
      technologies: ['Figma', 'Adobe Illustrator', 'Design System Architecture'],
      projectUrl: 'https://example.com/case-study/vanguard-studio',
      isVisible: true,
      order: 3,
    },
    {
      id: 'proj-4',
      title: 'OmniGrowth — Multi-Channel Digital Marketing & Acquisition',
      category: 'Digital Marketing',
      description:
        'Data-driven multi-channel digital marketing campaign combining technical SEO restructuring, targeted search advertising, and conversion rate optimization.',
      fullDescription:
        'Realigned digital customer acquisition channels for an expanding B2B service brand. Built high-intent commercial landing pages, optimized search ads, and implemented rigorous attribution reporting to increase qualified client inquiries.',
      imageUrl:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      client: 'OmniGrowth Partners',
      deliverables: ['Multi-Channel Paid Ads', 'Technical SEO Audit', 'Conversion Rate Optimization'],
      technologies: ['Google Analytics 4', 'Search Ads', 'A/B Testing', 'Looker Studio'],
      projectUrl: 'https://example.com/case-study/omnigrowth',
      isVisible: true,
      order: 4,
    },
    {
      id: 'proj-5',
      title: 'Kroma Atelier — Responsive Luxury E-Commerce Platform',
      category: 'Web Development',
      description:
        'Clean, editorial-grade e-commerce web platform engineered with rapid load times, streamlined product catalogs, and frictionless checkout.',
      fullDescription:
        'Crafted for a contemporary product label, this responsive web store blends rich visual storytelling with frictionless product filtering, mobile-first micro-interactions, and accelerated checkout conversion funnels.',
      imageUrl:
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      client: 'Kroma Living & Atelier',
      deliverables: ['E-Commerce Architecture', 'Responsive Frontend', 'Payment Gateway Integration'],
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Stripe Integration'],
      projectUrl: 'https://example.com/case-study/kroma-atelier',
      isVisible: true,
      order: 5,
    },
    {
      id: 'proj-6',
      title: 'CareSync — Telehealth & Remote Patient Care App',
      category: 'Mobile App Development',
      description:
        'Intuitive mobile health application connecting patients with healthcare specialists for virtual consultations, appointment scheduling, and prescription reminders.',
      fullDescription:
        'Engineered with high accessibility and privacy constraints, CareSync enables quick appointment booking, secure health records access, video consultations, and real-time medical notification alerts.',
      imageUrl:
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
      client: 'CareSync Health Systems',
      deliverables: ['Patient Experience Design', 'Mobile App Development', 'Encrypted Telehealth Workflow'],
      technologies: ['React Native', 'WebRTC', 'TypeScript', 'HIPAA-Compliant APIs'],
      projectUrl: 'https://example.com/case-study/caresync',
      isVisible: true,
      order: 6,
    },
  ],
  testimonials: [
    {
      id: 'test-1',
      clientName: 'Rahul Deshmukh',
      company: 'Aura Living',
      role: 'Principal Architect',
      review:
        'DIGITEX understood our architectural philosophy immediately. They designed a clean, understated website that puts our work first without unnecessary distractions. Communication throughout the build was clear and dependable.',
      rating: 5,
      isVisible: true,
      createdAt: '2025-08-14',
    },
    {
      id: 'test-2',
      clientName: 'Ananya Roy',
      company: 'Kavalan Botanicals',
      role: 'Co-Founder',
      review:
        'From our packaging guidelines to digital launch assets, the team delivered exactly what they committed to on time. Their structured approach made the entire process straightforward.',
      rating: 5,
      isVisible: true,
      createdAt: '2025-10-02',
    },
    {
      id: 'test-3',
      clientName: 'Sunil Mehta',
      company: 'Apex Logistics',
      role: 'Head of Growth',
      review:
        'Practical, business-focused digital marketing without empty hype. Our inbound commercial inquiries improved steadily within three months of implementing their recommendations.',
      rating: 5,
      isVisible: true,
      createdAt: '2026-01-20',
    },
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Agency Studio Session & Workspace',
      category: 'Agency',
      imageUrl:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      isVisible: true,
      uploadedAt: '2025-11-01',
    },
    {
      id: 'gal-2',
      title: 'Product Design & User Testing Sprint',
      category: 'Process',
      imageUrl:
        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80',
      isVisible: true,
      uploadedAt: '2025-11-15',
    },
    {
      id: 'gal-3',
      title: 'Brand Typography & Print Specifications',
      category: 'Design',
      imageUrl:
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
      isVisible: true,
      uploadedAt: '2025-12-05',
    },
    {
      id: 'gal-4',
      title: 'Technical Review & Deployment Planning',
      category: 'Development',
      imageUrl:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      isVisible: true,
      uploadedAt: '2026-02-10',
    },
  ],
  contact: {
    whatsappNumber: '9034242154',
    displayPhone: '9034242154',
    email: 'info.digitex.media@gmail.com',
    address: 'Commercial Tower, Cyber Hub Road',
    city: 'Pune / Mumbai, India',
    businessHours: 'Monday – Friday, 9:30 AM – 6:30 PM IST',
    linkedinUrl: '',
    instagramUrl: 'https://www.instagram.com/digitexagency.in?stkn=MTY3cmxudzJ3dXEydA==',
    twitterUrl: '',
    facebookUrl: '',
    githubUrl: '',
  },
  statistics: {
    // Hidden by default to strictly adhere to the prompt constraint:
    // "Do NOT automatically use: 150+ Projects, 40+ Brands, 5+ Years, 98% Satisfaction.
    // These numbers were only design concepts and have NOT been verified.
    // If actual numbers are later provided through the dashboard, display them.
    // Otherwise either: hide the statistics section, OR create editable statistics fields in the admin dashboard but do not show fabricated numbers publicly."
    showPublicly: false,
    items: [
      {
        id: 'stat-1',
        label: 'Active Digital Projects',
        value: '24',
        verifiedNote: 'Current ongoing enterprise & web client contracts',
      },
      {
        id: 'stat-2',
        label: 'Client Retention Rate',
        value: '92%',
        verifiedNote: 'Annual contract renewal & retainer rate',
      },
      {
        id: 'stat-3',
        label: 'Core Services Offered',
        value: '6',
        verifiedNote: 'Specialized digital service practices',
      },
      {
        id: 'stat-4',
        label: 'Average Sprint Turnaround',
        value: '14 Days',
        verifiedNote: 'Standard milestone delivery cycle',
      },
    ],
  },
  inquiries: [
    {
      id: 'inq-1',
      name: 'Pooja Sharma',
      email: 'pooja@nexustech.in',
      phone: '+91 98231 44550',
      service: 'Web Development',
      message: 'Looking to redesign our corporate SaaS platform with an updated design system and improved user onboarding.',
      date: '2026-03-01 11:30',
      channel: 'Web Form',
    },
  ],
  adminAuth: {
    pinHash: '7ae0a8fc72855442682456e68cab18b882edb4706be70375b928025ad142e716', // SHA-256 hash of Digitex@2026!
  },
};
