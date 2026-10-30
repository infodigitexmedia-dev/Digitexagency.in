import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Star,
  Globe,
  Smartphone,
  BrainCircuit,
  MessageSquare,
  Layers,
  FolderGit2,
  BookOpen,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import {
  PartnerEcosystemStrip,
  ReactLogo,
  NextjsLogo,
  TypeScriptLogo,
  PythonLogo,
  NodejsLogo,
  AwsLogo,
  PostgreSQLLogo,
  GeminiAiLogo,
} from '../components/common/TechAndPartnerLogos';

export const HomePage: React.FC = () => {
  const { contactConfig, homepage } = useData();
  const [techCategory, setTechCategory] = React.useState<string>('All');

  const heroData = homepage?.hero || {
    eyebrow: 'DIGITAL MARKETING & AI SOLUTIONS',
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

  const techCategories = [
    'All',
    'Frontend & Full-Stack',
    'Backend & Cloud',
    'AI & Databases',
  ];

  const technologiesList = [
    {
      name: 'React',
      category: 'Frontend & Full-Stack',
      badge: 'Frontend Standard',
      description: 'Declarative component trees, custom hooks state management, and high-performance reactive UI architecture.',
      logo: <ReactLogo className="w-8 h-8" />,
    },
    {
      name: 'Next.js',
      category: 'Frontend & Full-Stack',
      badge: 'Production Framework',
      description: 'React Server Components, Streaming SSR, and edge static rendering optimized for top Core Web Vitals.',
      logo: <NextjsLogo className="w-8 h-8" />,
    },
    {
      name: 'TypeScript',
      category: 'Frontend & Full-Stack',
      badge: 'Type-Safe Architecture',
      description: 'Strict compile-time verification across frontend and microservices preventing contract bugs.',
      logo: <TypeScriptLogo className="w-8 h-8" />,
    },
    {
      name: 'Python',
      category: 'Backend & Cloud',
      badge: 'AI & Data Services',
      description: 'Enterprise data pipelines, asynchronous computing, and machine learning inference backends.',
      logo: <PythonLogo className="w-8 h-8" />,
    },
    {
      name: 'Node.js',
      category: 'Backend & Cloud',
      badge: 'Event-Driven Runtime',
      description: 'Low-latency async I/O handling real-time WebSockets, microservices, and serverless compute.',
      logo: <NodejsLogo className="w-8 h-8" />,
    },
    {
      name: 'AWS Cloud',
      category: 'Backend & Cloud',
      badge: 'Cloud Platform',
      description: 'ECS, Aurora RDS, Lambda, CloudFront CDN, and SOC2-compliant VPC network boundaries.',
      logo: <AwsLogo className="h-6 w-auto" showText={false} />,
    },
    {
      name: 'PostgreSQL',
      category: 'AI & Databases',
      badge: 'ACID Relational Core',
      description: 'Battle-tested relational transactions, JSONB indexing, and pgvector semantic embeddings.',
      logo: <PostgreSQLLogo className="w-8 h-8" />,
    },
    {
      name: 'Gemini AI & LLMs',
      category: 'AI & Databases',
      badge: 'Multimodal AI',
      description: 'Advanced reasoning, multimodal document analysis, semantic search, and domain-tuned AI agents.',
      logo: <GeminiAiLogo className="w-8 h-8" />,
    },
  ];

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* ====================================================
          1. HERO SECTION (CORE ENTRY POINT & PRIMARY CTAs)
      ==================================================== */}
      <section className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center bg-[#FAFAF8] text-[#111111] overflow-hidden py-16 lg:py-24 border-b border-[#E5E5E3]">
        {/* Subtle background texture blend */}
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
          2. PARTNER ECOSYSTEM (PURE LOGO MARKS - NO TEXT NAMES)
      ==================================================== */}
      <PartnerEcosystemStrip />

      {/* ====================================================
          3. TECHNOLOGIES WE BUILD WITH (OFFICIAL LOGOS & NAMES)
      ==================================================== */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E3] relative overflow-hidden" id="homepage-technology">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] text-xs font-semibold text-[#111111] mb-4 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>ENGINEERING ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
              Technologies We Build With
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base mt-3 leading-relaxed">
              We engineer digital products with a modern, battle-tested stack. From intelligent AI pipelines and reactive frontends to resilient cloud infrastructure, every tool is chosen for speed, security, and enterprise scalability.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {techCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setTechCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    techCategory === cat
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'bg-[#FAFAF8] text-[#6B7280] hover:text-[#111111] hover:bg-neutral-100 border border-[#E5E5E3]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Technology Cards with Authentic Logos, Names & Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {technologiesList
              .filter((tech) => techCategory === 'All' || tech.category === techCategory)
              .map((tech) => (
                <div
                  key={tech.name}
                  className="group bg-[#FAFAF8] hover:bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E5E3] hover:border-[#E11D2E]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E5E3] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        {tech.logo}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] bg-white px-2.5 py-1 rounded-full border border-[#E5E5E3] truncate max-w-[150px]">
                        {tech.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-[#111111] group-hover:text-[#E11D2E] transition-colors">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-[#E5E5E3] flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span className="font-semibold text-[#111111]">{tech.category}</span>
                    <span className="text-[#E11D2E] font-bold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      Production Ready →
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* Architecture Guarantee Banner */}
          <div className="mt-12 p-6 rounded-2xl bg-[#FAFAF8] border border-[#E5E5E3] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E11D2E]/10 text-[#E11D2E] flex items-center justify-center shrink-0">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#111111]">
                  Zero Vendor Lock-in & 100% Intellectual Property Ownership
                </div>
                <div className="text-[11px] text-[#6B7280]">
                  All source code, Docker configs, CI/CD pipelines, and infrastructure scripts belong completely to your enterprise.
                </div>
              </div>
            </div>

            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#E11D2E] text-white text-xs font-bold transition-colors shrink-0 shadow-xs"
            >
              <span>Consult an Architect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. CORE CAPABILITIES (CONCISE PILLARS & NAVBAR NAVIGATION PROMPT)
      ==================================================== */}
      <section className="py-20 lg:py-24 bg-[#FAFAF8] relative overflow-hidden border-b border-[#E5E5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] mb-3 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              End-to-End Digital Engineering & Growth
            </h2>
            <p className="text-[#6B7280] text-base mt-3">
              We engineer custom software, scalable mobile platforms, and AI architectures tailored to your business roadmap.
            </p>
          </div>

          {/* 3 Streamlined Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#E5E5E3] shadow-xs flex flex-col justify-between hover:border-[#E11D2E]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] text-[#E11D2E] border border-[#E5E5E3] flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="text-xl font-bold text-[#111111]">
                  Web & Cloud Platforms
                </h3>
                <p className="text-[#6B7280] text-sm mt-3 leading-relaxed">
                  High-speed reactive frontends, streaming SSR with Next.js, resilient microservices, and distributed cloud backends.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E5E5E3]">
                <Link
                  to="/services/web-development"
                  className="group inline-flex items-center gap-2 text-xs font-bold text-[#E11D2E] hover:underline"
                >
                  <span>Explore Web Engineering</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#E5E5E3] shadow-xs flex flex-col justify-between hover:border-[#E11D2E]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] text-[#E11D2E] border border-[#E5E5E3] flex items-center justify-center mb-6">
                  <Smartphone className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="text-xl font-bold text-[#111111]">
                  Mobile & Cross-Platform
                </h3>
                <p className="text-[#6B7280] text-sm mt-3 leading-relaxed">
                  Smooth 120 FPS iOS and Android apps with Flutter and native runtimes, offline sync, and real-time backend integrations.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E5E5E3]">
                <Link
                  to="/services/mobile-app-development"
                  className="group inline-flex items-center gap-2 text-xs font-bold text-[#E11D2E] hover:underline"
                >
                  <span>Explore Mobile Apps</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#E5E5E3] shadow-xs flex flex-col justify-between hover:border-[#E11D2E]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] text-[#E11D2E] border border-[#E5E5E3] flex items-center justify-center mb-6">
                  <BrainCircuit className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="text-xl font-bold text-[#111111]">
                  AI Solutions & Machine Learning
                </h3>
                <p className="text-[#6B7280] text-sm mt-3 leading-relaxed">
                  Multi-tenant RAG pipelines, vector embedding retrieval, automated workflow agents, and custom fine-tuned LLM services.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E5E5E3]">
                <Link
                  to="/services/ai-solutions"
                  className="group inline-flex items-center gap-2 text-xs font-bold text-[#E11D2E] hover:underline"
                >
                  <span>Explore AI Capabilities</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Callout Strip (Directing users to other sections in navbar) */}
          <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E5E3] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center lg:text-left">
              <h4 className="text-base font-bold text-[#111111]">
                Explore Our Complete Solutions & Case Studies
              </h4>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Access detailed services, specialized industry solutions, client case studies, and engineering blogs directly from the navigation bar.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAFAF8] hover:bg-[#F7F7F5] border border-[#E5E5E3] text-[#111111] text-xs font-bold transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-[#E11D2E]" />
                <span>All Services</span>
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAFAF8] hover:bg-[#F7F7F5] border border-[#E5E5E3] text-[#111111] text-xs font-bold transition-colors"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-[#E11D2E]" />
                <span>Projects</span>
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAFAF8] hover:bg-[#F7F7F5] border border-[#E5E5E3] text-[#111111] text-xs font-bold transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#E11D2E]" />
                <span>Blog & Insights</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          5. CONVERSION / GET IN TOUCH CTA
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
