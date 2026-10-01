import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Globe,
  Smartphone,
  ShoppingBag,
  Code,
  Users,
  Award,
  Clock,
  Sparkles,
  ShieldCheck,
  Search,
  Target,
  PenTool,
  Rocket,
  Star,
  Zap,
  Plus,
  Minus,
  Database,
  Cloud,
  Cpu,
  Code2,
  BrainCircuit,
  Bot,
  ShoppingCart,
  Megaphone,
  CloudCog,
  LockKeyhole,
  Blocks,
  UserCheck,
  TrendingUp,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { TestimonialsMarquee } from '../components/common/TestimonialsMarquee';

export const HomePage: React.FC = () => {
  const { services, projects, contactConfig, homepage, technologies: cmsTech, faqs: cmsFaqs } = useData();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const heroData = homepage?.hero || {
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
  };

  // Pick real DIGITEX projects and services from CMS
  const publishedProjects = (projects || []).filter((p) => p.status !== 'draft');
  const publishedServices = (services || []).filter((s) => s.status !== 'draft');
  const featuredMain = publishedProjects.find((p) => p.featured) || publishedProjects[0];
  const projectTwo = publishedProjects.filter((p) => p.id !== featuredMain?.id)[0] || publishedProjects[1];
  const projectThree = publishedProjects.filter((p) => p.id !== featuredMain?.id && p.id !== projectTwo?.id)[0] || publishedProjects[2] || publishedProjects[0];

  // Real DIGITEX Technology Categories backed by project services
  const defaultTechCategories = [
    {
      name: 'AI & Machine Learning',
      description: 'Foundation models, vector embeddings, and custom inference microservices for automated intelligence.',
      icon: <Cpu className="w-5 h-5" />,
      items: ['Python', 'FastAPI', 'Gemini LLMs', 'Pinecone', 'Qdrant'],
      link: '/services/ai-solutions',
    },
    {
      name: 'Web Development',
      description: 'Modern reactive frontends, streaming server-side rendering, and scalable component architecture.',
      icon: <Globe className="w-5 h-5" />,
      items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      link: '/services/web-development',
    },
    {
      name: 'Mobile Engineering',
      description: 'Native-grade iOS and Android applications delivering fluid 60fps execution and offline data sync.',
      icon: <Smartphone className="w-5 h-5" />,
      items: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      link: '/services/mobile-app-development',
    },
    {
      name: 'E-Commerce Platforms',
      description: 'High-conversion headless storefronts, multi-vendor platforms, and automated payment orchestrations.',
      icon: <ShoppingBag className="w-5 h-5" />,
      items: ['Shopify Plus', 'Headless Commerce', 'Stripe', 'WooCommerce'],
      link: '/services/ecommerce-development',
    },
    {
      name: 'Databases & Storage',
      description: 'ACID transactional schemas, sub-millisecond caching layers, and high-dimensional vector search.',
      icon: <Database className="w-5 h-5" />,
      items: ['PostgreSQL', 'Supabase', 'Redis', 'ClickHouse'],
      link: '/services/custom-software',
    },
    {
      name: 'Cloud & Deployment',
      description: 'Automated container orchestration, zero-downtime CI/CD pipelines, and enterprise edge caching.',
      icon: <Cloud className="w-5 h-5" />,
      items: ['AWS', 'GCP Cloud Run', 'Docker', 'Cloudflare Edge'],
      link: '/services/custom-software',
    },
    {
      name: 'UI/UX Design Systems',
      description: 'Accessible WCAG-compliant design tokens, rapid prototyping, and high-fidelity interface engineering.',
      icon: <PenTool className="w-5 h-5" />,
      items: ['Figma', 'Tokens Studio', 'Prototyping', 'WCAG AA'],
      link: '/services/ui-ux-design',
    },
    {
      name: 'Marketing Technology',
      description: 'Full-funnel attribution, technical SEO telemetry, conversion tracking, and automated growth funnels.',
      icon: <TrendingUp className="w-5 h-5" />,
      items: ['GA4', 'Google Tag Manager', 'Semrush', 'Meta Ads'],
      link: '/services/digital-marketing',
    },
  ];

  // Real DIGITEX FAQs supported by verified company data
  const homepageFaqs = [
    {
      question: 'What services does DIGITEX provide?',
      answer:
        'DIGITEX provides end-to-end digital solutions across four core areas: Digital Experience (Web Development, UI/UX Design, E-Commerce), Technology (AI Solutions, Machine Learning, Custom Software, Mobile App Development), Growth (Digital Marketing, SEO, Dedicated Hiring), and Quality (Testing & QA).',
    },
    {
      question: 'How do I start a project with DIGITEX?',
      answer:
        'You can start by submitting our Get a Quote form with your project details. Our team reviews your technical and business requirements within 24 to 48 hours and presents a clear architectural proposal.',
    },
    {
      question: 'How does the project process work?',
      answer:
        'We follow a structured 5-stage agile delivery model: 01 Discovery (analyzing goals and technical scope), 02 Strategy (roadmapping milestones and architecture), 03 Design (interactive Figma prototypes), 04 Develop (clean-code engineering in 2-week sprints), and 05 Launch (automated testing, zero-downtime deployment, and SLA support).',
    },
    {
      question: 'Can DIGITEX build a custom website or web application?',
      answer:
        'Yes. We build tailored web applications and corporate platforms using React, Next.js, and TypeScript paired with scalable cloud backends. Every product is engineered for high performance, Core Web Vitals, and responsive cross-device experiences.',
    },
    {
      question: 'Does DIGITEX provide AI solutions and machine learning?',
      answer:
        'Yes. We engineer intelligent AI solutions including Gemini foundation models, RAG retrieval pipelines, vector embeddings with Pinecone and Qdrant, custom Python/FastAPI microservices, and automated business workflows.',
    },
    {
      question: 'How can I request a quote or get in touch?',
      answer:
        'You can request a tailored quote using our Get a Quote page or connect immediately with our solutions team on WhatsApp at +91 9034242154.',
    },
  ];

  const techCategories =
    cmsTech && cmsTech.length > 0
      ? cmsTech
          .filter((t) => t.status !== 'draft')
          .map((t) => ({
            name: t.category,
            description: t.description,
            icon: <Cpu className="w-5 h-5" />,
            items: (t.items || []).map((item: any) =>
              typeof item === 'string' ? item : item.name
            ),
            link: '/services',
          }))
      : defaultTechCategories;

  const activeFaqs =
    cmsFaqs && cmsFaqs.length > 0
      ? cmsFaqs.filter((f) => f.status !== 'draft')
      : homepageFaqs;

  const getServiceCardIcon = (keyOrTitle: string) => {
    const k = (keyOrTitle || '').toLowerCase();
    if (k.includes('web')) return <Code2 className="w-6 h-6 stroke-[1.8]" />;
    if (k.includes('mobile') || k.includes('app')) return <Smartphone className="w-6 h-6 stroke-[1.8]" />;
    if (k.includes('ui') || k.includes('ux') || k.includes('design')) return <PenTool className="w-6 h-6 stroke-[1.8]" />;
    if (k.includes('commerce') || k.includes('shopping')) return <ShoppingCart className="w-6 h-6 stroke-[1.8]" />;
    if (k.includes('ai')) return <BrainCircuit className="w-6 h-6 stroke-[1.8]" />;
    if (k.includes('machine') || k.includes('ml')) return <Bot className="w-6 h-6 stroke-[1.8]" />;
    if (k.includes('software') || k.includes('custom')) return <Blocks className="w-6 h-6 stroke-[1.8]" />;
    if (k.includes('seo') || k.includes('search')) return <Search className="w-6 h-6 stroke-[1.8]" />;
    if (k.includes('market') || k.includes('growth')) return <Megaphone className="w-6 h-6 stroke-[1.8]" />;
    if (k.includes('cloud') || k.includes('devops')) return <CloudCog className="w-6 h-6 stroke-[1.8]" />;
    if (k.includes('security') || k.includes('cyber')) return <LockKeyhole className="w-6 h-6 stroke-[1.8]" />;
    if (k.includes('test') || k.includes('qa') || k.includes('quality')) return <ShieldCheck className="w-6 h-6 stroke-[1.8]" />;
    if (k.includes('hiring') || k.includes('staff')) return <UserCheck className="w-6 h-6 stroke-[1.8]" />;
    return <Code2 className="w-6 h-6 stroke-[1.8]" />;
  };

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* ====================================================
          1. HERO SECTION (LIGHT / WARM WHITE / EDITORIAL)
      ==================================================== */}
      <section className="relative min-h-[82vh] lg:min-h-[86vh] flex items-center justify-center bg-[#FAFAF8] text-[#111111] overflow-hidden py-16 lg:py-24 border-b border-[#E5E5E3]">
        {/* Subtle background texture / image blend with high legibility */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <img
            src={heroData.heroImage}
            alt="DIGITEX Digital Strategy & Engineering"
            className="w-full h-full object-cover object-center filter grayscale contrast-125"
          />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl space-y-6 lg:space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold tracking-wider text-[#111111] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E11D2E] inline-block" />
              <span>{heroData.eyebrow}</span>
            </div>

            {/* Large Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#111111]">
              {heroData.heading}{' '}
              <span className="text-[#E11D2E]">
                {heroData.highlightedText}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-[#2A2A2A] font-normal leading-relaxed max-w-2xl">
              {heroData.description}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to={heroData.primaryCtaLink}
                className="group inline-flex items-center gap-2.5 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-sm px-8 py-4 rounded-full shadow-xs transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                id="hero-cta-quote"
              >
                <span>{heroData.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to={heroData.secondaryCtaLink}
                className="group inline-flex items-center gap-2.5 bg-white hover:bg-[#F7F7F5] border border-[#E5E5E3] hover:border-[#111111] text-[#111111] font-semibold text-sm px-7 py-4 rounded-full transition-all duration-200 transform hover:-translate-y-0.5"
                id="hero-cta-work"
              >
                <span>{heroData.secondaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#111111] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>

            {/* Social Proof Strip */}
            <div className="pt-6 border-t border-[#E5E5E3] flex flex-wrap items-center gap-4">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                />
                <div className="inline-flex h-10 w-10 rounded-full ring-2 ring-white bg-[#111111] text-white text-[11px] font-bold items-center justify-center">
                  +30
                </div>
              </div>

              <div className="text-xs">
                <div className="flex items-center gap-1 text-[#E11D2E] mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-[#111111] font-bold ml-1.5">5.0 Rating</span>
                </div>
                <span className="text-[#6B7280]">Trusted by ambitious brands worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. TRUST / PARTNER ECOSYSTEM STRIP
      ==================================================== */}
      <section className="bg-white border-b border-[#E5E5E3] py-6 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] shrink-0">
              Technology & Partner Ecosystem
            </span>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-8 sm:gap-12 opacity-75 hover:opacity-100 transition-opacity">
              <span className="text-sm font-bold font-mono text-[#111111] flex items-center gap-1.5">
                <span className="font-black text-base">AWS</span>
              </span>
              <span className="text-sm font-bold text-[#111111] flex items-center gap-1.5">
                <span className="font-black">▲ Vercel</span>
              </span>
              <span className="text-sm font-bold text-[#111111] flex items-center gap-1.5">
                <span>Shopify</span><span className="text-xs font-semibold text-[#6B7280]">Plus</span>
              </span>
              <span className="text-sm font-bold text-[#111111] flex items-center gap-1.5">
                Google Cloud
              </span>
              <span className="text-sm font-bold text-[#111111]">
                Meta Business
              </span>
              <span className="text-sm font-bold text-[#111111]">
                Stripe Partner
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. ABOUT DIGITEX
      ==================================================== */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] text-xs font-semibold text-[#111111]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                <span>{homepage?.aboutPreview?.eyebrow || 'ABOUT DIGITEX'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
                {homepage?.aboutPreview?.heading || 'We are a digital studio focused on strategy, design and technology.'}
              </h2>

              <p className="text-[#6B7280] text-base leading-relaxed">
                {homepage?.aboutPreview?.description || 'DIGITEX is a modern digital agency helping businesses build powerful online experiences. We combine creativity with engineering rigor to deliver solutions that create measurable impact, drive conversions, and unlock new operational scale.'}
              </p>

              {/* Value Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(homepage?.aboutPreview?.featureCards && homepage.aboutPreview.featureCards.length > 0
                  ? homepage.aboutPreview.featureCards
                  : [
                      { title: 'Engineered for conversion', description: 'Conversion-first digital execution' },
                      { title: 'High-speed deployment', description: 'Rapid agile milestones' },
                      { title: 'Enterprise ROI focus', description: 'Clear business impact' },
                      { title: 'Dedicated post-launch SLA', description: 'Continuous uptime support' },
                    ]
                ).map((card, i) => {
                  const icons = [
                    <CheckCircle2 key="1" className="w-3.5 h-3.5" />,
                    <Zap key="2" className="w-3.5 h-3.5" />,
                    <Target key="3" className="w-3.5 h-3.5" />,
                    <ShieldCheck key="4" className="w-3.5 h-3.5" />,
                  ];
                  return (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-[#111111] bg-[#FAFAF8] p-3 rounded-xl border border-[#E5E5E3]">
                      <div className="w-5 h-5 rounded-full bg-red-50 text-[#E11D2E] flex items-center justify-center shrink-0">
                        {icons[i % icons.length]}
                      </div>
                      <span className="truncate">{card.title}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs px-6 py-3.5 rounded-full shadow-xs transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Image Composition + Stat Counters */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-sm border border-[#E5E5E3] bg-[#FAFAF8] p-2">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={homepage?.aboutPreview?.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80"}
                    alt="DIGITEX Digital Solutions Studio"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 3 Stat Cards with Restrained Minimal Borders */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-[#FAFAF8] rounded-2xl p-4 border border-[#E5E5E3] border-t-2 border-t-[#E11D2E] text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                    5+
                  </div>
                  <span className="text-[11px] font-medium text-[#6B7280] mt-1 block">
                    Years of Experience
                  </span>
                </div>

                <div className="bg-[#FAFAF8] rounded-2xl p-4 border border-[#E5E5E3] border-t-2 border-t-[#E11D2E] text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                    50+
                  </div>
                  <span className="text-[11px] font-medium text-[#6B7280] mt-1 block">
                    Projects Delivered
                  </span>
                </div>

                <div className="bg-[#FAFAF8] rounded-2xl p-4 border border-[#E5E5E3] border-t-2 border-t-[#E11D2E] text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                    30+
                  </div>
                  <span className="text-[11px] font-medium text-[#6B7280] mt-1 block">
                    Happy Clients
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. SERVICES (WARM WHITE SECTION WITH BRAND CARDS)
      ==================================================== */}
      <section className="py-20 lg:py-24 bg-[#FAFAF8] relative overflow-hidden border-b border-[#E5E5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] mb-3 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>OUR SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
              {homepage?.servicesPreview?.heading || 'Everything you need to grow digitally.'}
            </h2>
            <p className="text-[#6B7280] text-base mt-3">
              {homepage?.servicesPreview?.description || 'From websites to marketing, we offer end-to-end digital solutions tailored to your business goals.'}
            </p>
          </div>

          {/* Service Cards adhering to new Brand Design Tokens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedServices.slice(0, 6).map((svc) => (
              <Link
                key={svc.id || svc.slug}
                to={`/services/${svc.slug}`}
                className="group bg-white rounded-2xl p-8 border border-[#E5E5E3] shadow-xs hover:shadow-md hover:border-[#E11D2E]/40 transition-all duration-200 flex flex-col justify-between transform hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] text-[#111111] group-hover:bg-red-50/60 group-hover:text-[#E11D2E] border border-[#E5E5E3] flex items-center justify-center transition-colors">
                      {getServiceCardIcon(`${svc.id} ${svc.slug || ''} ${svc.title || ''}`)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAFAF8] text-[#6B7280] border border-[#E5E5E3]">
                      {svc.category || svc.group || 'Digital Engineering'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm mt-2 leading-relaxed">
                    {svc.shortDescription}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#E5E5E3] flex items-center gap-2 text-xs font-bold text-[#E11D2E]">
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Center Button */}
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-[#E5E5E3] text-[#111111] hover:border-[#111111] text-xs font-bold transition-all shadow-xs transform hover:-translate-y-0.5"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#E11D2E]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================
          5. OUR TECHNOLOGY (CLEAN WHITE SECTION)
      ==================================================== */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E3] relative overflow-hidden" id="homepage-technology">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* LEFT: 4 Columns on Desktop */}
            <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] text-xs font-semibold text-[#111111]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                <span>{homepage?.technologyPreview?.eyebrow || 'OUR TECHNOLOGY'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-[1.12]">
                {homepage?.technologyPreview?.heading || 'TECHNOLOGY THAT TURNS IDEAS INTO DIGITAL PRODUCTS.'}
              </h2>

              <p className="text-[#6B7280] text-base leading-relaxed">
                {homepage?.technologyPreview?.description || 'We engineer digital products with a modern, battle-tested stack. From intelligent AI pipelines and reactive frontends to resilient cloud infrastructure, every tool is chosen for speed, security, and enterprise scalability.'}
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs font-medium text-[#2A2A2A]">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D2E] shrink-0" />
                  <span>100% intellectual property & code ownership</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-[#2A2A2A]">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D2E] shrink-0" />
                  <span>Modern TypeScript & automated CI/CD pipelines</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-[#2A2A2A]">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D2E] shrink-0" />
                  <span>Cloud architectures built for zero vendor lock-in</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  to="/get-a-quote"
                  className="group inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-xs transition-colors"
                  id="tech-stack-cta"
                >
                  <span>Discuss Your Tech Stack</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* RIGHT: 8 Columns on Desktop (Clean Cards) */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {techCategories.map((tech) => (
                  <Link
                    key={tech.name}
                    to={tech.link}
                    className="group bg-[#FAFAF8] rounded-2xl p-6 border border-[#E5E5E3] hover:border-[#E11D2E]/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between transform hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E5E3] text-[#111111] group-hover:text-[#E11D2E] transition-colors flex items-center justify-center shrink-0 shadow-xs">
                          {tech.icon}
                        </div>
                        <div className="w-7 h-7 rounded-full bg-white border border-[#E5E5E3] flex items-center justify-center transition-colors">
                          <ArrowRight className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-[#E11D2E] group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors tracking-tight">
                        {tech.name}
                      </h3>

                      <p className="text-[#6B7280] text-xs mt-1.5 leading-relaxed">
                        {tech.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#E5E5E3] flex flex-wrap gap-1.5">
                      {tech.items.map((item, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium text-[#2A2A2A] bg-white border border-[#E5E5E3] px-2 py-0.5 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          6. FEATURED PROJECTS (DARK SECTION WITH CHARCOAL CARDS)
      ==================================================== */}
      <section className="py-20 lg:py-24 bg-[#111111] text-white border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                <span>FEATURED PROJECTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {homepage?.projectsPreview?.heading || 'Real Solutions. Measurable Impact.'}
              </h2>
              <p className="text-[#9CA3AF] text-base mt-2 max-w-xl">
                {homepage?.projectsPreview?.description || 'Explore some of our recent work and see how we helped brands achieve their goals.'}
              </p>
            </div>

            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#E11D2E] transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#E11D2E]" />
            </Link>
          </div>

          {/* Project Composition: 1 Large Top/Hero Card + 2 Smaller Cards */}
          <div className="space-y-8">
            {/* Top Large Featured Project */}
            {featuredMain && (
              <div className="group rounded-3xl overflow-hidden bg-[#1A1A1A] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-[#E11D2E]/40 transition-colors">
                <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 relative">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={featuredMain.coverImage}
                      alt={featuredMain.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* Floating metric badge on image */}
                  <div className="absolute bottom-4 left-4 z-20 bg-[#111111]/90 backdrop-blur-md border border-white/20 text-white rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-xl">
                    <div className="w-6 h-6 rounded-lg bg-[#E11D2E] flex items-center justify-center text-white">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#9CA3AF] block font-medium">Impact</span>
                      <span className="text-xs font-bold text-white">
                        {featuredMain.results?.[0] || '+140% Dispatch Speed'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#9CA3AF]">
                    <span>{featuredMain.category}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#E11D2E] transition-colors">
                    {featuredMain.title}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    {featuredMain.overview}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {featuredMain.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#9CA3AF]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="pt-3">
                    <Link
                      to={`/projects/${featuredMain.slug}`}
                      className="group/btn inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-xs transition-colors"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom 2 Smaller Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectTwo && (
                <div className="group rounded-3xl overflow-hidden bg-[#1A1A1A] border border-white/10 p-6 shadow-xl flex flex-col justify-between hover:border-[#E11D2E]/40 transition-colors">
                  <div className="rounded-2xl overflow-hidden border border-white/10 mb-6 relative">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={projectTwo.coverImage}
                        alt={projectTwo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-[#111111]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/15 text-[10px] font-bold text-white">
                      {projectTwo.category}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#E11D2E] transition-colors">
                      {projectTwo.title}
                    </h3>
                    <p className="text-[#9CA3AF] text-xs leading-relaxed line-clamp-2">
                      {projectTwo.overview}
                    </p>
                    <div className="pt-2">
                      <Link
                        to={`/projects/${projectTwo.slug}`}
                        className="group/link inline-flex items-center gap-1.5 text-xs font-bold text-[#E11D2E] group-hover:text-white transition-colors"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {projectThree && (
                <div className="group rounded-3xl overflow-hidden bg-[#1A1A1A] border border-white/10 p-6 shadow-xl flex flex-col justify-between hover:border-[#E11D2E]/40 transition-colors">
                  <div className="rounded-2xl overflow-hidden border border-white/10 mb-6 relative">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={projectThree.coverImage}
                        alt={projectThree.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-[#111111]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/15 text-[10px] font-bold text-white">
                      {projectThree.category}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#E11D2E] transition-colors">
                      {projectThree.title}
                    </h3>
                    <p className="text-[#9CA3AF] text-xs leading-relaxed line-clamp-2">
                      {projectThree.overview}
                    </p>
                    <div className="pt-2">
                      <Link
                        to={`/projects/${projectThree.slug}`}
                        className="group/link inline-flex items-center gap-1.5 text-xs font-bold text-[#E11D2E] group-hover:text-white transition-colors"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          7. WHY CHOOSE DIGITEX
      ==================================================== */}
      <section className="py-20 lg:py-24 bg-[#FAFAF8] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Circular Image Composition */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-72 h-72 sm:w-88 sm:h-88 rounded-full overflow-hidden shadow-md border-4 border-white relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                  alt="Why Choose DIGITEX Team"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Trust Badge */}
              <div className="absolute -bottom-2 z-20 bg-white rounded-full py-2 px-4 shadow-md border border-[#E5E5E3] flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#E11D2E] flex items-center justify-center text-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-[#111111]">100% Quality & SLA Guarantee</span>
              </div>
            </div>

            {/* Right: Headings & 4 Feature Cards */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] mb-3 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                  <span>WHY CHOOSE US</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                  Why Choose DIGITEX
                </h2>
                <p className="text-[#6B7280] text-base mt-2">
                  We bring together strategy, creativity and technology to deliver digital solutions that make a difference.
                </p>
              </div>

              {/* 4 Feature Cards with Restrained Clean System */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white rounded-2xl p-5 border border-[#E5E5E3] border-l-4 border-l-[#E11D2E] shadow-xs flex items-start gap-4 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-[#E11D2E] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111111]">
                      Experienced Team
                    </h4>
                    <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                      Skilled engineers and designers with proven enterprise track records.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#E5E5E3] border-l-4 border-l-[#E11D2E] shadow-xs flex items-start gap-4 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-[#E11D2E] flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111111]">
                      Result-Driven Strategy
                    </h4>
                    <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                      Architected directly around your commercial growth metrics and ROI.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#E5E5E3] border-l-4 border-l-[#E11D2E] shadow-xs flex items-start gap-4 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-[#E11D2E] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111111]">
                      Transparent Pricing
                    </h4>
                    <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                      High-end technical deliverables at clear, milestone-based rates.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#E5E5E3] border-l-4 border-l-[#E11D2E] shadow-xs flex items-start gap-4 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-[#E11D2E] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111111]">
                      On-Time Delivery
                    </h4>
                    <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                      Strict sprint governance backed by dedicated delivery guarantees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          8. PROCESS (DARK SECTION WITH 5-STAGE TIMELINE)
      ==================================================== */}
      <section className="py-20 lg:py-24 bg-[#111111] text-white border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>HOW WE WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Our Process
            </h2>
            <p className="text-[#9CA3AF] text-base mt-2">
              A simple, transparent and effective process to turn your ideas into impactful digital solutions.
            </p>
          </div>

          {/* 5-Stage Horizontal Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {/* Connecting Line across desktop */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-white/10 z-0" />

            {/* Stage 01: Discover */}
            <div className="relative z-10 bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-[#E11D2E]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#E11D2E] text-white flex items-center justify-center font-bold shadow-xs">
                <Search className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono font-bold text-[#E11D2E]">
                01 • DISCOVERY
              </div>
              <h3 className="text-base font-bold text-white">
                Discover
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Understand your goals, audience expectations, and technical stack.
              </p>
            </div>

            {/* Stage 02: Strategy */}
            <div className="relative z-10 bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-[#E11D2E]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#E11D2E] text-white flex items-center justify-center font-bold shadow-xs">
                <Target className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono font-bold text-[#E11D2E]">
                02 • ROADMAP
              </div>
              <h3 className="text-base font-bold text-white">
                Strategy
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Plan the right architecture, roadmap, and milestone targets.
              </p>
            </div>

            {/* Stage 03: Design */}
            <div className="relative z-10 bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-[#E11D2E]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#E11D2E] text-white flex items-center justify-center font-bold shadow-xs">
                <PenTool className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono font-bold text-[#E11D2E]">
                03 • PROTOTYPING
              </div>
              <h3 className="text-base font-bold text-white">
                Design
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Create intuitive UI/UX design systems and engaging prototypes.
              </p>
            </div>

            {/* Stage 04: Develop */}
            <div className="relative z-10 bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-[#E11D2E]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#E11D2E] text-white flex items-center justify-center font-bold shadow-xs">
                <Code className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono font-bold text-[#E11D2E]">
                04 • CODING
              </div>
              <h3 className="text-base font-bold text-white">
                Develop
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Build with modern frameworks, clean code, and automated CI/CD.
              </p>
            </div>

            {/* Stage 05: Launch */}
            <div className="relative z-10 bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-[#E11D2E]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#E11D2E] text-white flex items-center justify-center font-bold shadow-xs">
                <Rocket className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono font-bold text-[#E11D2E]">
                05 • DEPLOYMENT
              </div>
              <h3 className="text-base font-bold text-white">
                Launch
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Go live with zero downtime and ongoing technical support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          9. TESTIMONIALS
      ==================================================== */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] text-xs font-semibold text-[#111111] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              {homepage?.testimonialsPreview?.heading || 'What Our Clients Say'}
            </h2>
            <p className="text-[#6B7280] text-sm mt-2">
              {homepage?.testimonialsPreview?.description || "We're proud to be trusted by businesses that value innovation, quality and results."}
            </p>
          </div>
        </div>

        {/* Continuous Seamless Marquee */}
        <TestimonialsMarquee />
      </section>

      {/* ====================================================
          10. FAQ SECTION
      ==================================================== */}
      <section className="py-20 lg:py-24 bg-[#FAFAF8] border-b border-[#E5E5E3] relative overflow-hidden" id="homepage-faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* LEFT: Eyebrow + Large Heading + Supporting Text + CTA */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                <span>FAQ</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
                {homepage?.faqPreview?.heading || 'QUESTIONS, ANSWERED.'}
              </h2>

              <p className="text-[#6B7280] text-base leading-relaxed">
                {homepage?.faqPreview?.description || 'Find quick answers to common questions about partnering with DIGITEX, our development standards, intellectual property ownership, and kickoff timelines.'}
              </p>

              {/* Optional CTA */}
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 text-xs font-bold text-[#E11D2E] hover:underline transition-colors"
                  id="faq-another-question-cta"
                >
                  <span className="tracking-wider uppercase">HAVE ANOTHER QUESTION?</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Quick Trust Note */}
              <div className="pt-4 border-t border-[#E5E5E3]">
                <p className="text-xs text-[#6B7280] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E11D2E]" />
                  <span>Direct consultation with lead solutions architects — no sales pressure.</span>
                </p>
              </div>
            </div>

            {/* RIGHT: Accordion FAQ List */}
            <div className="lg:col-span-7">
              <div className="space-y-3.5" role="region" aria-label="Frequently Asked Questions">
                {activeFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl transition-all duration-200 border ${
                        isOpen
                          ? 'bg-white border-[#E11D2E]/40 shadow-sm ring-1 ring-[#E11D2E]/20'
                          : 'bg-white border-[#E5E5E3] shadow-xs hover:border-[#111111]/30'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        aria-controls={`home-faq-answer-${idx}`}
                        id={`home-faq-question-${idx}`}
                        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer group"
                      >
                        <span
                          className={`text-sm sm:text-base font-bold transition-colors ${
                            isOpen ? 'text-[#E11D2E]' : 'text-[#111111] group-hover:text-[#E11D2E]'
                          }`}
                        >
                          {faq.question}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isOpen
                              ? 'bg-red-50 text-[#E11D2E]'
                              : 'bg-[#FAFAF8] text-[#6B7280] group-hover:bg-red-50 group-hover:text-[#E11D2E]'
                          }`}
                          aria-hidden="true"
                        >
                          {isOpen ? (
                            <Minus className="w-4 h-4 transition-transform" />
                          ) : (
                            <Plus className="w-4 h-4 transition-transform" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div
                          id={`home-faq-answer-${idx}`}
                          role="region"
                          aria-labelledby={`home-faq-question-${idx}`}
                          className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#6B7280] leading-relaxed border-t border-[#E5E5E3] animate-in fade-in slide-in-from-top-1 duration-200"
                        >
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          11. CONTACT CTA (DARK PREMIUM CTA)
      ==================================================== */}
      <section className="py-20 lg:py-24 bg-[#111111] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Copy & 2 Action Cards */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                <span>GET IN TOUCH</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {homepage?.finalCta?.heading || "Let's build something great together."}
              </h2>

              <p className="text-[#9CA3AF] text-base max-w-lg">
                {homepage?.finalCta?.description || 'Have a project in mind? Our team is here to help. Choose your preferred way to get in touch.'}
              </p>

              {/* 2 Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Action Card 1: Get a Quote */}
                <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/10 shadow-lg flex flex-col justify-between hover:border-[#E11D2E]/40 transition-colors">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#E11D2E]" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      Request a Detailed Quote
                    </h3>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      Submit your project scope and receive an architectural assessment and sprint proposal within 24-48 hours.
                    </p>
                  </div>
                  <div className="mt-6 pt-3">
                    <Link
                      to="/get-a-quote"
                      className="group/btn w-full inline-flex items-center justify-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white text-xs font-bold py-3 rounded-full shadow-xs transition-colors"
                    >
                      <span>Get a Quote</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Action Card 2: WhatsApp Chat */}
                <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/10 shadow-lg flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#22C55E] flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      WhatsApp Us
                    </h3>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      Send us a quick message on WhatsApp and our solutions team will respond promptly.
                    </p>
                  </div>
                  <div className="mt-6 pt-3">
                    <a
                      href={contactConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold py-3 rounded-full shadow-xs transition-colors"
                    >
                      <span>Chat on WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Smartphone Mockup */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Smartphone Frame */}
              <div className="relative z-10 w-64 rounded-3xl bg-[#1A1A1A] border-4 border-neutral-700 p-3 shadow-2xl">
                <div className="w-20 h-4 bg-neutral-800 rounded-full mx-auto mb-3" />
                <div className="bg-[#111111] rounded-2xl p-4 text-white space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                    <div className="w-7 h-7 rounded-full bg-[#22C55E] flex items-center justify-center text-white">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">DIGITEX Support</div>
                      <span className="text-[10px] text-[#22C55E]">Online • Active</span>
                    </div>
                  </div>

                  <div className="bg-neutral-800 rounded-xl p-3 text-[11px] text-neutral-200">
                    Hello! How can we help transform your digital presence today?
                  </div>

                  <div className="bg-[#E11D2E] text-white rounded-xl p-3 text-[11px] ml-auto max-w-[85%] text-right font-medium">
                    We&apos;d like to discuss a custom web & mobile project.
                  </div>

                  <div className="pt-2">
                    <a
                      href={contactConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-[#22C55E] hover:bg-[#20bd5a] text-white font-bold text-[11px] py-2 rounded-lg transition-colors"
                    >
                      Connect on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
