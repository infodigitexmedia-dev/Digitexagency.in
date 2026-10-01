import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Code,
  Globe,
  Palette,
  Smartphone,
  ShoppingBag,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Users,
  Building2,
  Stethoscope,
  GraduationCap,
  Truck,
  Landmark,
  Sparkles,
  Search,
} from 'lucide-react';
import { DigitexLogo } from '../common/DigitexLogo';
import { useData } from '../../context/DataContext';

export const Navbar: React.FC = () => {
  const { services, industries } = useData();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [industriesMenuOpen, setIndustriesMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setServicesMenuOpen(false);
    setIndustriesMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const getServiceIcon = (key: string) => {
    const id = key.toLowerCase();
    if (id.includes('web')) {
      return <Globe className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
    }
    if (id.includes('ui') || id.includes('ux') || id.includes('palette')) {
      return <Palette className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
    }
    if (id.includes('commerce') || id.includes('ecommerce') || id.includes('shopping')) {
      return <ShoppingBag className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
    }
    if (id.includes('machine') || id.includes('ml')) {
      return <Cpu className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
    }
    if (id.includes('ai')) {
      return <Sparkles className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
    }
    if (id.includes('software') || id.includes('custom')) {
      return <Code className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
    }
    if (id.includes('mobile') || id.includes('app')) {
      return <Smartphone className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
    }
    if (id.includes('seo') || id.includes('search')) {
      return <Search className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
    }
    if (id.includes('market') || id.includes('growth')) {
      return <TrendingUp className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
    }
    if (id.includes('qa') || id.includes('test') || id.includes('quality')) {
      return <ShieldCheck className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
    }
    if (id.includes('hiring') || id.includes('staff') || id.includes('user')) {
      return <Users className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
    }
    return <Code className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
  };

  // Structured Service Categories matching exact DIGITEX capabilities
  const serviceCategories = [
    {
      name: 'Digital Experience',
      items: services.filter(
        (s) =>
          s.group === 'Digital Experience' ||
          ['web-development', 'ui-ux-design', 'ecommerce-development'].includes(s.slug)
      ),
    },
    {
      name: 'Technology',
      items: services.filter(
        (s) =>
          s.group === 'Technology' ||
          ['ai-solutions', 'machine-learning', 'custom-software', 'mobile-app-development'].includes(s.slug)
      ),
    },
    {
      name: 'Growth',
      items: services.filter(
        (s) =>
          s.group === 'Growth' ||
          ['digital-marketing', 'seo-digital-growth', 'dedicated-hiring'].includes(s.slug)
      ),
    },
    {
      name: 'Quality',
      items: services.filter(
        (s) =>
          s.group === 'Quality' ||
          ['testing-qa'].includes(s.slug)
      ),
    },
  ];

  const getIndustryIcon = (slug: string) => {
    switch (slug) {
      case 'fintech-banking':
        return <Landmark className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
      case 'healthcare-medtech':
        return <Stethoscope className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
      case 'ecommerce-retail':
        return <ShoppingBag className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
      case 'logistics-supply-chain':
        return <Truck className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
      case 'edtech-learning':
        return <GraduationCap className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
      default:
        return <Building2 className="w-4 h-4 text-[#111111] group-hover:text-[#E11D2E] transition-colors" />;
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#E5E5E3] py-3 shadow-xs'
          : 'bg-[#FAFAF8] border-b border-[#E5E5E3] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* LEFT: EXACT DIGITEX LOGO ASSET */}
          <div className="shrink-0">
            <DigitexLogo
              variant="light"
              size={isScrolled ? 'sm' : 'md'}
              withTagline={true}
            />
          </div>

          {/* CENTER: DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              to="/"
              className={`text-[13px] font-medium transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-[#E11D2E] font-semibold'
                  : 'text-[#2A2A2A] hover:text-[#111111]'
              }`}
              id="nav-home"
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`text-[13px] font-medium transition-colors ${
                isActive('/about')
                  ? 'text-[#E11D2E] font-semibold'
                  : 'text-[#2A2A2A] hover:text-[#111111]'
              }`}
              id="nav-about"
            >
              About
            </Link>

            {/* SERVICES DROPDOWN / MEGA-MENU */}
            <div
              className="relative"
              onMouseEnter={() => setServicesMenuOpen(true)}
              onMouseLeave={() => setServicesMenuOpen(false)}
            >
              <Link
                to="/services"
                className={`inline-flex items-center gap-1 text-[13px] font-medium transition-colors ${
                  isActive('/services')
                    ? 'text-[#E11D2E] font-semibold'
                    : 'text-[#2A2A2A] hover:text-[#111111]'
                }`}
                id="nav-services"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 opacity-70 group-hover:opacity-100 ${
                    servicesMenuOpen ? 'rotate-180 text-[#E11D2E]' : ''
                  }`}
                />
              </Link>

              {servicesMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[880px] xl:w-[940px] z-50">
                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#E5E5E3] text-[#111111] animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* 4-COLUMN ORGANIZED MEGA-MENU */}
                    <div className="grid grid-cols-4 gap-6">
                      {serviceCategories.map((cat) => (
                        <div key={cat.name} className="space-y-3">
                          <div className="pb-2 border-b border-[#E5E5E3] flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                              {cat.name}
                            </span>
                            <span className="text-[10px] font-semibold text-[#6B7280] bg-[#F7F7F5] px-1.5 py-0.5 rounded-md">
                              {cat.items.length}
                            </span>
                          </div>

                          <div className="space-y-1">
                            {cat.items.map((svc) => (
                              <Link
                                key={svc.id || svc.slug}
                                to={`/services/${svc.slug}`}
                                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAFAF8] transition-colors"
                              >
                                <div className="p-1.5 rounded-lg bg-[#F7F7F5] group-hover:bg-red-50/50 transition-colors shrink-0 mt-0.5">
                                  {getServiceIcon(svc.slug || svc.id)}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between text-xs font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors">
                                    <span className="truncate">{svc.title}</span>
                                    <ArrowRight className="w-3 h-3 text-[#6B7280] group-hover:text-[#E11D2E] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                  </div>
                                  <p className="text-[10px] text-[#6B7280] line-clamp-1 mt-0.5">
                                    {svc.shortDescription}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* BOTTOM EXPLORATION BAR */}
                    <div className="mt-5 pt-3.5 border-t border-[#E5E5E3] flex items-center justify-between text-xs px-2">
                      <div className="flex items-center gap-2 text-[#6B7280]">
                        <span className="w-2 h-2 rounded-full bg-[#E11D2E]" />
                        <span className="font-medium">Every subservice backed by dedicated engineering squads & SLAs</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Link
                          to="/services"
                          className="text-[#111111] font-bold hover:text-[#E11D2E] hover:underline inline-flex items-center gap-1.5"
                        >
                          <span>All Services Overview</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#E11D2E]" />
                        </Link>
                        <Link
                          to="/get-a-quote"
                          className="bg-[#E11D2E] hover:bg-[#B91C2B] text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-xs transition-colors"
                        >
                          Get a Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* INDUSTRIES DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setIndustriesMenuOpen(true)}
              onMouseLeave={() => setIndustriesMenuOpen(false)}
            >
              <Link
                to="/industries"
                className={`inline-flex items-center gap-1 text-[13px] font-medium transition-colors ${
                  isActive('/industries')
                    ? 'text-[#E11D2E] font-semibold'
                    : 'text-[#2A2A2A] hover:text-[#111111]'
                }`}
                id="nav-industries"
              >
                <span>Industries</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
              </Link>

              {industriesMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-96 z-50">
                  <div className="bg-white rounded-2xl p-4 shadow-xl border border-[#E5E5E3] space-y-1 text-[#111111]">
                    {industries.map((ind) => (
                      <Link
                        key={ind.id}
                        to={`/industries/${ind.slug}`}
                        className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#FAFAF8] transition-colors"
                      >
                        <div className="p-2 rounded-lg bg-[#F7F7F5] group-hover:bg-red-50/50 transition-colors shrink-0">
                          {getIndustryIcon(ind.slug)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between text-xs font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors">
                            <span className="truncate">{ind.title}</span>
                            <ArrowRight className="w-3 h-3 text-[#6B7280] group-hover:text-[#E11D2E] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <p className="text-[11px] text-[#6B7280] line-clamp-1">
                            {ind.shortDescription}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <div className="pt-2 border-t border-[#E5E5E3] flex items-center justify-between text-xs px-2">
                      <span className="text-[#6B7280] font-medium">Domain expertise</span>
                      <Link
                        to="/industries"
                        className="text-[#E11D2E] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/projects"
              className={`text-[13px] font-medium transition-colors ${
                isActive('/projects')
                  ? 'text-[#E11D2E] font-semibold'
                  : 'text-[#2A2A2A] hover:text-[#111111]'
              }`}
              id="nav-projects"
            >
              Projects
            </Link>

            <Link
              to="/testimonials"
              className={`text-[13px] font-medium transition-colors ${
                isActive('/testimonials')
                  ? 'text-[#E11D2E] font-semibold'
                  : 'text-[#2A2A2A] hover:text-[#111111]'
              }`}
              id="nav-testimonials"
            >
              Testimonials
            </Link>

            <Link
              to="/faq"
              className={`text-[13px] font-medium transition-colors ${
                isActive('/faq')
                  ? 'text-[#E11D2E] font-semibold'
                  : 'text-[#2A2A2A] hover:text-[#111111]'
              }`}
              id="nav-faq"
            >
              FAQ
            </Link>

            <Link
              to="/contact"
              className={`text-[13px] font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-[#E11D2E] font-semibold'
                  : 'text-[#2A2A2A] hover:text-[#111111]'
              }`}
              id="nav-contact"
            >
              Contact
            </Link>
          </nav>

          {/* RIGHT: ACTION BUTTON */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xs transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              id="nav-quote-cta"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] hover:text-[#E11D2E] transition-colors"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAFAF8] border-t border-[#E5E5E3] px-6 py-6 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#111111] hover:text-[#E11D2E]"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#111111] hover:text-[#E11D2E]"
            >
              About
            </Link>

            {/* SERVICES ACCORDION ON MOBILE */}
            <div className="border-y border-[#E5E5E3] py-2">
              <div className="flex items-center justify-between">
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-[#111111] hover:text-[#E11D2E]"
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="p-2 text-[#6B7280] hover:text-[#111111]"
                  aria-label="Toggle Services Submenu"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileServicesOpen ? 'rotate-180 text-[#E11D2E]' : ''
                    }`}
                  />
                </button>
              </div>

              {mobileServicesOpen && (
                <div className="mt-3 pl-2 pr-1 space-y-4 border-l-2 border-[#E11D2E] ml-2 animate-in fade-in duration-200">
                  <Link
                    to="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-bold text-[#E11D2E] hover:underline"
                  >
                    View All Services Overview →
                  </Link>

                  {serviceCategories.map((cat) => (
                    <div key={cat.name} className="space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#111111]">
                        {cat.name}
                      </div>
                      <div className="space-y-1 pl-2">
                        {cat.items.map((sub) => (
                          <Link
                            key={sub.slug}
                            to={`/services/${sub.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-xs font-medium text-[#6B7280] hover:text-[#E11D2E] transition-colors py-1"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/industries"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#111111] hover:text-[#E11D2E]"
            >
              Industries
            </Link>
            <Link
              to="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#111111] hover:text-[#E11D2E]"
            >
              Projects
            </Link>
            <Link
              to="/testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#111111] hover:text-[#E11D2E]"
            >
              Testimonials
            </Link>
            <Link
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#111111] hover:text-[#E11D2E]"
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#111111] hover:text-[#E11D2E]"
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-[#E5E5E3]">
              <Link
                to="/get-a-quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white text-sm font-bold py-3 rounded-full shadow-xs transition-colors"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
