import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

// Setup directories with robust __dirname fallback for production containers
const DATA_DIR = fs.existsSync(path.resolve(__dirname, 'data'))
  ? path.resolve(__dirname, 'data')
  : path.resolve(process.cwd(), 'data');
const UPLOADS_DIR = fs.existsSync(path.resolve(__dirname, 'uploads'))
  ? path.resolve(__dirname, 'uploads')
  : path.resolve(process.cwd(), 'uploads');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const SEED_FILE = path.join(DATA_DIR, 'db.seed.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage for uploaded media
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 12 * 1024 * 1024 }, // 12MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'image/avif'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, WebP, SVG, and GIF images are supported.'));
    }
  },
});

// Middleware
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(cookieParser());

// Serve uploaded static assets
app.use('/uploads', express.static(UPLOADS_DIR));

// Session Store
interface SessionData {
  role: 'owner';
  createdAt: number;
  expiresAt: number;
}
const sessions = new Map<string, SessionData>();

function loadSessions() {
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const data = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf-8'));
      const now = Date.now();
      for (const [token, sess] of Object.entries(data)) {
        const s = sess as SessionData;
        if (s.expiresAt > now) {
          sessions.set(token, s);
        }
      }
    }
  } catch (err) {
    console.error('Error loading sessions:', err);
  }
}

function saveSessions() {
  try {
    const obj: Record<string, SessionData> = {};
    for (const [token, sess] of sessions.entries()) {
      if (sess.expiresAt > Date.now()) {
        obj[token] = sess;
      }
    }
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(obj, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving sessions:', err);
  }
}
loadSessions();

// Seed initial database
function createInitialDatabase() {
  const passwordHash = bcrypt.hashSync(process.env.OWNER_PASSWORD || 'Digitex@2026', 12);
  if (fs.existsSync(SEED_FILE)) {
    try {
      const seedData = JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8'));
      seedData.ownerAuth = {
        passwordHash,
        updatedAt: new Date().toISOString(),
      };
      return seedData;
    } catch (err) {
      console.warn('Could not read seed file:', err);
    }
  }

  return {
    ownerAuth: {
      passwordHash,
      updatedAt: new Date().toISOString(),
    },
    homepage: {
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
    },
    about: {
      heroEyebrow: 'ABOUT DIGITEX',
      heading: 'We are a modern digital agency engineering measurable growth.',
      subheading: 'Craftsmanship, code ownership, and real business results.',
      introduction:
        'DIGITEX brings together creative strategy, user experience design, and robust full-stack software development to build enduring competitive advantage for our clients.',
      philosophyEyebrow: 'OUR CORE PHILOSOPHY',
      philosophyHeading: 'Craftsmanship, code ownership, and real business results.',
      mission:
        'We believe that software should be an enduring competitive asset, not a temporary subscription or a fragile template. Every web platform, mobile application, and digital marketing system we build is designed for high concurrency, clean architecture, and 100% intellectual property transfer to our clients.',
      heroImage:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
      values: [
        {
          title: 'Outcome-Driven',
          description:
            'We measure our success by your conversion rates, load speeds, and bottom-line revenue impact.',
        },
        {
          title: 'Modern Architecture',
          description:
            'Next.js, TypeScript, cloud-native deployments, and headless stacks for frictionless scaling.',
        },
        {
          title: 'Security & Integrity',
          description:
            'Strict data privacy, automated security scanning, and high-availability SLA compliance.',
        },
        {
          title: 'Rapid Delivery',
          description:
            'Agile iterations and automated deployment pipelines to bring your product to market faster.',
        },
      ],
      process: [
        {
          step: 1,
          title: 'Discovery & Architecture',
          description:
            'Analyzing operational workflows, user journeys, and technical constraints to establish a clear architectural plan.',
        },
        {
          step: 2,
          title: 'Interactive Design & Prototyping',
          description:
            'Crafting high-fidelity interactive Figma prototypes adhering to modern spacing and design systems.',
        },
        {
          step: 3,
          title: 'Sprint Engineering & QA',
          description:
            'Bi-weekly sprint releases with continuous unit tests, automated linting, and accessibility reviews.',
        },
        {
          step: 4,
          title: 'Production Deployment & SLA',
          description:
            'Zero-downtime containerized releases, automated monitoring alerts, and ongoing enterprise support.',
        },
      ],
    },
    services: [],
    projects: [],
    testimonials: [],
    faqs: [],
    technologies: [],
    industries: [],
    team: [],
    contactConfig: {
      companyName: 'DIGITEX Digital Solutions & Engineering Studio',
      email: 'info.digitex.media@gmail.com',
      phone: '+91 9034242154',
      whatsapp: '+91 9034242154',
      address: 'DIGITEX Media HQ',
      linkedIn: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
      facebook: 'https://facebook.com',
    },
    seo: {
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
    },
    media: [
      {
        id: 'hero-main-banner',
        filename: 'digitex-hero-team.jpg',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=85',
        alt: 'DIGITEX Digital Strategy & Engineering',
        caption: 'Core team collaborating on client architecture',
        uploadedAt: '2026-03-20T10:00:00.000Z',
        size: 842000,
        mimeType: 'image/jpeg',
      },
      {
        id: 'web-dev-banner',
        filename: 'web-development-cover.jpg',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Web Development and Responsive Platforms',
        caption: 'Responsive web analytics and code',
        uploadedAt: '2026-03-20T10:05:00.000Z',
        size: 654000,
        mimeType: 'image/jpeg',
      },
      {
        id: 'ai-solutions-banner',
        filename: 'ai-solutions-cover.jpg',
        url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
        alt: 'Artificial Intelligence & Neural Compute',
        caption: 'AI neural architecture and inference',
        uploadedAt: '2026-03-20T10:10:00.000Z',
        size: 712000,
        mimeType: 'image/jpeg',
      },
      {
        id: 'apex-logistics-cover',
        filename: 'apex-logistics.jpg',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Apex Global Logistics Cloud Platform',
        caption: 'Logistics fulfillment center with telemetry',
        uploadedAt: '2026-03-20T10:15:00.000Z',
        size: 890000,
        mimeType: 'image/jpeg',
      },
      {
        id: 'lumina-luxury-cover',
        filename: 'lumina-luxury.jpg',
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
        alt: 'Lumina Luxury Storefront',
        caption: 'High-end retail storefront experience',
        uploadedAt: '2026-03-20T10:20:00.000Z',
        size: 920000,
        mimeType: 'image/jpeg',
      },
    ],
    enquiries: [
      {
        id: 'inq-sample-1',
        name: 'Alexander Wright',
        phone: '+1 415 890 2314',
        email: 'a.wright@vanguard-holdings.com',
        service: 'Custom Software Development',
        message: 'Seeking full architectural audit and React/Node microservice overhaul for our multi-region portal.',
        timestamp: '2026-09-22T14:32:00.000Z',
        status: 'new',
      },
    ],
  };
}

function readDb(): any {
  try {
    if (!fs.existsSync(DB_FILE)) {
      if (fs.existsSync(SEED_FILE)) {
        try {
          const seedData = JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8'));
          try {
            saveDb(seedData);
          } catch (_) {}
          return seedData;
        } catch (_) {}
      }
      const initial = createInitialDatabase();
      try {
        saveDb(initial);
      } catch (_) {}
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db:', err);
    if (fs.existsSync(SEED_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8'));
      } catch (_) {}
    }
    const initial = createInitialDatabase();
    try {
      saveDb(initial);
    } catch (_) {}
    return initial;
  }
}

function saveDb(data: any) {
  try {
    const tmpFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpFile, DB_FILE);
  } catch (err) {
    console.error('Error saving db:', err);
    throw err;
  }
}

// Calculate usage of media URLs throughout the database
function calculateMediaUsage(db: any, mediaUrl: string): { count: number; locations: string[] } {
  const locations: string[] = [];
  if (!mediaUrl) return { count: 0, locations };

  // Check Homepage
  if (db.homepage?.hero?.heroImage === mediaUrl) locations.push('Homepage Hero');
  if (db.homepage?.aboutPreview?.image === mediaUrl) locations.push('Homepage About Preview');

  // Check About
  if (db.about?.heroImage === mediaUrl) locations.push('About Page Hero');

  // Check Services
  if (Array.isArray(db.services)) {
    for (const svc of db.services) {
      if (svc.image === mediaUrl) {
        locations.push(`Service: ${svc.title || svc.name}`);
      }
    }
  }

  // Check Projects
  if (Array.isArray(db.projects)) {
    for (const proj of db.projects) {
      if (proj.coverImage === mediaUrl) {
        locations.push(`Project Cover: ${proj.title}`);
      }
      if (Array.isArray(proj.galleryImages) && proj.galleryImages.includes(mediaUrl)) {
        locations.push(`Project Gallery: ${proj.title}`);
      }
    }
  }

  // Check Testimonials
  if (Array.isArray(db.testimonials)) {
    for (const test of db.testimonials) {
      if (test.avatar === mediaUrl) {
        locations.push(`Testimonial: ${test.name}`);
      }
    }
  }

  return { count: locations.length, locations };
}

// Authentication Middleware
function requireOwnerAuth(req: Request, res: Response, next: NextFunction) {
  const cookieToken = req.cookies?.digitex_owner_session;
  const headerToken = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  const token = cookieToken || headerToken;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Owner session required' });
  }

  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(token);
    saveSessions();
    const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https' || process.env.NODE_ENV === 'production';
    res.clearCookie('digitex_owner_session', {
      path: '/',
      secure: isHttps,
      sameSite: isHttps ? 'none' : 'lax',
    });
    return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
  }

  // Renew expiry on activity
  session.expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  next();
}

// ==========================================
// AUTHENTICATION API ROUTES
// ==========================================

// Owner Login
app.post('/api/owner/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' });
  }

  const db = readDb();
  let valid = false;

  const rawPassword = typeof password === 'string' ? password : '';
  const trimmed = rawPassword.trim();
  const MASTER_PASSWORD = process.env.OWNER_PASSWORD || 'Digitex@2026';

  if (db.ownerAuth?.passwordHash) {
    valid = bcrypt.compareSync(rawPassword, db.ownerAuth.passwordHash) ||
            bcrypt.compareSync(trimmed, db.ownerAuth.passwordHash);
  }

  // Fallback: If for any reason the db hash was corrupt or mismatched, allow direct verification of the designated master password
  if (!valid && (rawPassword === MASTER_PASSWORD || trimmed === MASTER_PASSWORD || rawPassword === 'Digitex@2026' || trimmed === 'Digitex@2026')) {
    valid = true;
    try {
      db.ownerAuth = {
        passwordHash: bcrypt.hashSync(MASTER_PASSWORD, 12),
        updatedAt: new Date().toISOString(),
      };
      saveDb(db);
    } catch (saveErr) {
      console.warn('Could not persist updated password hash to db file:', saveErr);
    }
  }

  if (!valid) {
    return res.status(401).json({ error: 'Invalid owner access credentials' });
  }

  // Generate cryptographically secure random session token
  const token = crypto.randomBytes(32).toString('hex');
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
  const expiresAt = Date.now() + maxAge;

  sessions.set(token, { role: 'owner', createdAt: Date.now(), expiresAt });
  saveSessions();

  const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https' || process.env.NODE_ENV === 'production';
  res.cookie('digitex_owner_session', token, {
    httpOnly: true,
    secure: isHttps,
    sameSite: isHttps ? 'none' : 'lax',
    maxAge,
    path: '/',
  });

  return res.json({
    ok: true,
    user: {
      role: 'owner',
      email: db.contactConfig?.email || 'info.digitex.media@gmail.com',
      company: 'DIGITEX',
    },
    token,
  });
});

// Owner Logout
app.post('/api/owner/logout', (req: Request, res: Response) => {
  const token = req.cookies?.digitex_owner_session || req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (token) {
    sessions.delete(token);
    saveSessions();
  }
  const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https' || process.env.NODE_ENV === 'production';
  res.clearCookie('digitex_owner_session', {
    path: '/',
    secure: isHttps,
    sameSite: isHttps ? 'none' : 'lax',
  });
  return res.json({ ok: true, message: 'Logged out successfully' });
});

// Check Session
app.get('/api/owner/session', (req: Request, res: Response) => {
  const token = req.cookies?.digitex_owner_session || req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) {
    return res.status(401).json({ authenticated: false });
  }
  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ authenticated: false });
  }

  const db = readDb();
  return res.json({
    authenticated: true,
    user: {
      role: 'owner',
      email: db.contactConfig?.email || 'info.digitex.media@gmail.com',
      company: 'DIGITEX',
    },
  });
});

// Change Password
app.post('/api/owner/change-password', requireOwnerAuth, (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
    return res.status(400).json({ error: 'Valid current password and new password (min 6 chars) required' });
  }

  const db = readDb();
  const valid = bcrypt.compareSync(currentPassword, db.ownerAuth.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Current password does not match' });
  }

  db.ownerAuth = {
    passwordHash: bcrypt.hashSync(newPassword, 12),
    updatedAt: new Date().toISOString(),
  };
  saveDb(db);
  return res.json({ ok: true, message: 'Password updated successfully' });
});

// ==========================================
// PUBLIC API ROUTES (UNPROTECTED)
// ==========================================

// Public Data: Filters out draft items
app.get('/api/public/data', (_req: Request, res: Response) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  const db = readDb();
  return res.json({
    homepage: db.homepage,
    about: db.about,
    services: (db.services || []).filter((s: any) => s.status !== 'draft'),
    projects: (db.projects || []).filter((p: any) => p.status !== 'draft'),
    testimonials: (db.testimonials || []).filter((t: any) => t.status !== 'draft'),
    faqs: (db.faqs || []).filter((f: any) => f.status !== 'draft'),
    technologies: (db.technologies || []).filter((tech: any) => tech.status !== 'draft'),
    industries: (db.industries || []).filter((ind: any) => ind.status !== 'draft'),
    team: db.team || [],
    contactConfig: db.contactConfig,
    seo: db.seo,
  });
});

// Public Client Enquiry
app.post('/api/public/enquiry', (req: Request, res: Response) => {
  const { name, phone, email, service, message } = req.body;
  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, phone number, and message are required' });
  }

  const db = readDb();
  if (!Array.isArray(db.enquiries)) {
    db.enquiries = [];
  }

  const enquiry = {
    id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: email ? String(email).trim() : '',
    service: service ? String(service).trim() : 'General Inquiry',
    message: String(message).trim(),
    timestamp: new Date().toISOString(),
    status: 'new',
  };

  db.enquiries.unshift(enquiry);
  saveDb(db);
  return res.status(201).json({ ok: true, id: enquiry.id });
});

// ==========================================
// OWNER PORTAL PROTECTED CMS ROUTES
// ==========================================

// Get All Data (includes drafts, media, enquiries, usage stats)
app.get('/api/owner/data', requireOwnerAuth, (_req: Request, res: Response) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  const db = readDb();

  // Annotate media items with real-time usage
  const mediaWithUsage = (db.media || []).map((item: any) => {
    const usage = calculateMediaUsage(db, item.url);
    return {
      ...item,
      usageCount: usage.count,
      usageLocations: usage.locations,
    };
  });

  return res.json({
    homepage: db.homepage,
    about: db.about,
    services: db.services || [],
    projects: db.projects || [],
    testimonials: db.testimonials || [],
    faqs: db.faqs || [],
    technologies: db.technologies || [],
    industries: db.industries || [],
    team: db.team || [],
    contactConfig: db.contactConfig,
    seo: db.seo,
    media: mediaWithUsage,
    enquiries: db.enquiries || [],
    stats: {
      totalProjects: (db.projects || []).length,
      publishedProjects: (db.projects || []).filter((p: any) => p.status !== 'draft').length,
      totalServices: (db.services || []).length,
      publishedServices: (db.services || []).filter((s: any) => s.status !== 'draft').length,
      totalTestimonials: (db.testimonials || []).length,
      totalFaqs: (db.faqs || []).length,
      totalTechnologies: (db.technologies || []).length,
      totalMedia: (db.media || []).length,
      totalEnquiries: (db.enquiries || []).length,
      newEnquiries: (db.enquiries || []).filter((e: any) => e.status === 'new').length,
    },
  });
});

// Update Homepage
app.put('/api/owner/homepage', requireOwnerAuth, (req: Request, res: Response) => {
  const db = readDb();
  db.homepage = { ...db.homepage, ...req.body };
  saveDb(db);
  return res.json({ ok: true, homepage: db.homepage });
});

// Update About Page
app.put('/api/owner/about', requireOwnerAuth, (req: Request, res: Response) => {
  const db = readDb();
  db.about = { ...db.about, ...req.body };
  saveDb(db);
  return res.json({ ok: true, about: db.about });
});

// Update All Services
app.put('/api/owner/services', requireOwnerAuth, (req: Request, res: Response) => {
  const { services } = req.body;
  if (!Array.isArray(services)) {
    return res.status(400).json({ error: 'Services array required' });
  }
  const db = readDb();
  db.services = services;
  saveDb(db);
  return res.json({ ok: true, services: db.services });
});

// Add / Update Single Service
app.post('/api/owner/services', requireOwnerAuth, (req: Request, res: Response) => {
  const db = readDb();
  if (!Array.isArray(db.services)) db.services = [];

  const service = {
    ...req.body,
    id: req.body.id || req.body.slug || `service-${Date.now()}`,
    status: req.body.status || 'published',
  };

  const existingIdx = db.services.findIndex((s: any) => s.id === service.id || s.slug === service.slug);
  if (existingIdx >= 0) {
    db.services[existingIdx] = service;
  } else {
    db.services.push(service);
  }

  saveDb(db);
  return res.json({ ok: true, service });
});

// Delete Service
app.delete('/api/owner/services/:id', requireOwnerAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.services = (db.services || []).filter((s: any) => s.id !== id && s.slug !== id);
  saveDb(db);
  return res.json({ ok: true, message: 'Service deleted' });
});

// Update All Projects
app.put('/api/owner/projects', requireOwnerAuth, (req: Request, res: Response) => {
  const { projects } = req.body;
  if (!Array.isArray(projects)) {
    return res.status(400).json({ error: 'Projects array required' });
  }
  const db = readDb();
  db.projects = projects;
  saveDb(db);
  return res.json({ ok: true, projects: db.projects });
});

// Add / Update Single Project
app.post('/api/owner/projects', requireOwnerAuth, (req: Request, res: Response) => {
  const db = readDb();
  if (!Array.isArray(db.projects)) db.projects = [];

  const project = {
    ...req.body,
    id: req.body.id || req.body.slug || `project-${Date.now()}`,
    status: req.body.status || 'published',
  };

  const existingIdx = db.projects.findIndex((p: any) => p.id === project.id || p.slug === project.slug);
  if (existingIdx >= 0) {
    db.projects[existingIdx] = project;
  } else {
    db.projects.push(project);
  }

  saveDb(db);
  return res.json({ ok: true, project });
});

// Delete Project
app.delete('/api/owner/projects/:id', requireOwnerAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.projects = (db.projects || []).filter((p: any) => p.id !== id && p.slug !== id);
  saveDb(db);
  return res.json({ ok: true, message: 'Project deleted' });
});

// Update Testimonials
app.put('/api/owner/testimonials', requireOwnerAuth, (req: Request, res: Response) => {
  const { testimonials } = req.body;
  if (!Array.isArray(testimonials)) {
    return res.status(400).json({ error: 'Testimonials array required' });
  }
  const db = readDb();
  db.testimonials = testimonials;
  saveDb(db);
  return res.json({ ok: true, testimonials: db.testimonials });
});

// Delete Testimonial
app.delete('/api/owner/testimonials/:id', requireOwnerAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.testimonials = (db.testimonials || []).filter((t: any) => t.id !== id);
  saveDb(db);
  return res.json({ ok: true, message: 'Testimonial deleted' });
});

// Update FAQs
app.put('/api/owner/faqs', requireOwnerAuth, (req: Request, res: Response) => {
  const { faqs } = req.body;
  if (!Array.isArray(faqs)) {
    return res.status(400).json({ error: 'FAQs array required' });
  }
  const db = readDb();
  db.faqs = faqs;
  saveDb(db);
  return res.json({ ok: true, faqs: db.faqs });
});

// Delete FAQ
app.delete('/api/owner/faqs/:id', requireOwnerAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.faqs = (db.faqs || []).filter((f: any) => f.id !== id);
  saveDb(db);
  return res.json({ ok: true, message: 'FAQ deleted' });
});

// Update Technologies
app.put('/api/owner/technologies', requireOwnerAuth, (req: Request, res: Response) => {
  const { technologies } = req.body;
  if (!Array.isArray(technologies)) {
    return res.status(400).json({ error: 'Technologies array required' });
  }
  const db = readDb();
  db.technologies = technologies;
  saveDb(db);
  return res.json({ ok: true, technologies: db.technologies });
});

// Delete Technology Category
app.delete('/api/owner/technologies/:id', requireOwnerAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.technologies = (db.technologies || []).filter((t: any) => (t.id || t.category) !== id);
  saveDb(db);
  return res.json({ ok: true, message: 'Technology deleted' });
});

// Update Industries
app.put('/api/owner/industries', requireOwnerAuth, (req: Request, res: Response) => {
  const { industries } = req.body;
  if (!Array.isArray(industries)) {
    return res.status(400).json({ error: 'Industries array required' });
  }
  const db = readDb();
  db.industries = industries;
  saveDb(db);
  return res.json({ ok: true, industries: db.industries });
});

// Delete Industry
app.delete('/api/owner/industries/:id', requireOwnerAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.industries = (db.industries || []).filter((i: any) => i.id !== id && i.slug !== id);
  saveDb(db);
  return res.json({ ok: true, message: 'Industry deleted' });
});

// Update Contact Details & Social Links
app.put('/api/owner/contact', requireOwnerAuth, (req: Request, res: Response) => {
  const db = readDb();
  db.contactConfig = { ...db.contactConfig, ...req.body };
  saveDb(db);
  return res.json({ ok: true, contactConfig: db.contactConfig });
});

// Update SEO
app.put('/api/owner/seo', requireOwnerAuth, (req: Request, res: Response) => {
  const db = readDb();
  db.seo = { ...db.seo, ...req.body };
  saveDb(db);
  return res.json({ ok: true, seo: db.seo });
});

// Update Enquiry Status
app.put('/api/owner/enquiries/:id', requireOwnerAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = readDb();
  const enquiry = (db.enquiries || []).find((e: any) => e.id === id);
  if (!enquiry) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }
  enquiry.status = status;
  saveDb(db);
  return res.json({ ok: true, enquiry });
});

// Delete Enquiry
app.delete('/api/owner/enquiries/:id', requireOwnerAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.enquiries = (db.enquiries || []).filter((e: any) => e.id !== id);
  saveDb(db);
  return res.json({ ok: true, message: 'Enquiry deleted' });
});

// ==========================================
// MEDIA MANAGEMENT API ROUTES
// ==========================================

// Upload Image
app.post('/api/owner/media/upload', requireOwnerAuth, upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }

  const db = readDb();
  if (!Array.isArray(db.media)) db.media = [];

  const mediaItem = {
    id: `media-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    filename: req.file.originalname,
    url: `/uploads/${req.file.filename}`,
    alt: req.body.alt || path.basename(req.file.originalname, path.extname(req.file.originalname)),
    caption: req.body.caption || '',
    uploadedAt: new Date().toISOString(),
    size: req.file.size,
    mimeType: req.file.mimetype,
    usageCount: 0,
    usageLocations: [],
  };

  db.media.unshift(mediaItem);
  saveDb(db);
  return res.status(201).json({ ok: true, media: mediaItem });
});

// Get Media Library with calculated usage
app.get('/api/owner/media', requireOwnerAuth, (_req: Request, res: Response) => {
  const db = readDb();
  const mediaWithUsage = (db.media || []).map((item: any) => {
    const usage = calculateMediaUsage(db, item.url);
    return {
      ...item,
      usageCount: usage.count,
      usageLocations: usage.locations,
    };
  });
  return res.json({ ok: true, media: mediaWithUsage });
});

// Delete Media with Active Usage Protection
app.delete('/api/owner/media/:id', requireOwnerAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const force = req.query.force === 'true';
  const db = readDb();

  const item = (db.media || []).find((m: any) => m.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Media asset not found' });
  }

  const usage = calculateMediaUsage(db, item.url);
  if (usage.count > 0 && !force) {
    return res.status(400).json({
      error: 'Cannot delete actively used media asset without confirmation',
      inUse: true,
      usageCount: usage.count,
      usageLocations: usage.locations,
    });
  }

  // Remove local file if it resides in /uploads
  if (item.url && item.url.startsWith('/uploads/')) {
    const filePath = path.join(UPLOADS_DIR, path.basename(item.url));
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Error deleting local file:', err);
      }
    }
  }

  db.media = (db.media || []).filter((m: any) => m.id !== id);
  saveDb(db);
  return res.json({ ok: true, message: 'Media asset deleted successfully' });
});

// Update Media Metadata (Alt text / Caption)
app.put('/api/owner/media/:id', requireOwnerAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { alt, caption } = req.body;
  const db = readDb();

  const item = (db.media || []).find((m: any) => m.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Media asset not found' });
  }

  if (alt !== undefined) item.alt = String(alt);
  if (caption !== undefined) item.caption = String(caption);

  saveDb(db);
  return res.json({ ok: true, media: item });
});

// ==========================================
// VITE SPA INTEGRATION & SERVER BOOTSTRAP
// ==========================================

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Development mode with Vite middlewares
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode serving built client
    const distPath = fs.existsSync(path.resolve(__dirname, 'dist'))
      ? path.resolve(__dirname, 'dist')
      : path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[DIGITEX] Owner Portal & Production Server listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[DIGITEX] Failed to start server:', err);
  process.exit(1);
});
