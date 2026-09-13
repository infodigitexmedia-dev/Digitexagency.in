import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Lock, LayoutDashboard, Phone, Mail, Instagram, Calendar } from 'lucide-react';
import { Logo } from './Logo';
import { useWebsite } from '../context/WebsiteContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    data,
    setIsInquiryModalOpen,
    isAdminAuthenticated,
    setActiveView,
    setIsAdminLoginModalOpen,
  } = useWebsite();

  const { contact } = data;
  const officialPhone = contact.displayPhone || '9034242154';
  const cleanPhone = officialPhone.replace(/[^0-9]/g, '');
  const officialEmail = contact.email || 'info.digitex.media@gmail.com';
  const officialInstagram =
    contact.instagramUrl ||
    'https://www.instagram.com/digitexagency.in?stkn=MTY3cmxudzJ3dXEydA==';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xs border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] py-3'
          : 'bg-white border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group focus:outline-none"
            id="nav-logo"
          >
            <Logo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[14px] font-medium text-[#555555] hover:text-[#111111] py-1 nav-link-animated"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Direct Phone link */}
            <a
              href={`tel:${cleanPhone}`}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:text-[#E51B23] transition-colors px-2 py-1 rounded"
              id="header-phone-link"
              title="Call DIGITEX on mobile/dialer"
            >
              <Phone className="w-3.5 h-3.5 text-[#E51B23]" />
              <span>{officialPhone}</span>
            </a>

            {/* Official Instagram shortcut */}
            <a
              href={officialInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-500 hover:text-[#E51B23] hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 rounded"
              title="Official DIGITEX Instagram (@digitexagency.in)"
              aria-label="Official DIGITEX Instagram"
              id="header-instagram-link"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Owner Portal Shortcut */}
            {isAdminAuthenticated ? (
              <button
                onClick={() => setActiveView('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md btn-interactive"
                title="Open Owner Dashboard"
                id="header-admin-portal-btn"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#E51B23]" />
                <span>Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAdminLoginModalOpen(true)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md btn-interactive"
                title="Owner Portal Login"
                id="header-admin-login-icon"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Google Calendar Call CTA Button */}
            <a
              href="https://calendar.app.google/9FTypfkU2VspvcbY7"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#E51B23] bg-red-50/75 hover:bg-[#E51B23] hover:text-white border border-[#E51B23]/30 hover:border-[#c9141b] rounded-md shadow-2xs hover:-translate-y-[2px] hover:shadow-xs transition-all duration-200 tracking-wider whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#E51B23] focus:ring-offset-2"
              title="Book a consultation with DIGITEX"
              aria-label="Book a consultation with DIGITEX"
              id="header-book-call-btn"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>BOOK A CALL</span>
            </a>

            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 text-sm font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] rounded-md shadow-xs btn-interactive"
              id="header-get-started-btn"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#E51B23] rounded-md btn-interactive"
            >
              Get Started
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-black rounded-md focus:outline-none transition-colors duration-200"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with smooth fade + vertical slide */}
      <div
        className={`sm:hidden border-b border-gray-100 bg-white px-4 overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100 py-3' : 'max-h-0 opacity-0 py-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-2 text-base font-medium text-[#333333] hover:text-[#E51B23] hover:bg-gray-50 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Contact Information & Official Instagram */}
        <div className="pt-3 pb-2 border-t border-gray-100 flex items-center justify-between text-xs text-[#555555] px-1">
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-1.5 font-semibold text-[#111111] hover:text-[#E51B23] transition-colors py-1 px-1.5 rounded hover:bg-gray-50"
            id="mobile-nav-phone-link"
          >
            <Phone className="w-3.5 h-3.5 text-[#E51B23]" />
            <span>{officialPhone}</span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${officialEmail}`}
              className="p-1.5 text-gray-600 hover:text-[#E51B23] hover:bg-gray-50 rounded transition-colors"
              title="Email DIGITEX"
              aria-label="Email DIGITEX"
              id="mobile-nav-email-link"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={officialInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-600 hover:text-[#E51B23] hover:scale-105 transition-all"
              title="DIGITEX on Instagram (@digitexagency.in)"
              aria-label="DIGITEX on Instagram"
              id="mobile-nav-instagram-link"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
          {/* Google Calendar Call CTA Button in Mobile Menu */}
          <a
            href="https://calendar.app.google/9FTypfkU2VspvcbY7"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-center text-xs font-bold text-[#E51B23] bg-red-50 hover:bg-[#E51B23] hover:text-white border border-[#E51B23]/30 rounded-md shadow-2xs hover:-translate-y-[2px] hover:shadow-xs transition-all duration-200 tracking-wider focus:outline-none focus:ring-2 focus:ring-[#E51B23] focus:ring-offset-2"
            title="Book a consultation with DIGITEX"
            aria-label="Book a consultation with DIGITEX"
            id="mobile-nav-book-call-btn"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>BOOK A CALL</span>
          </a>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsInquiryModalOpen(true);
            }}
            className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] rounded-md btn-interactive"
          >
            Start a Project
          </button>

          {isAdminAuthenticated ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveView('admin');
              }}
              className="w-full py-2 px-4 text-center text-xs font-medium text-gray-600 bg-gray-100 rounded-md btn-interactive"
            >
              Go to Owner Dashboard
            </button>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminLoginModalOpen(true);
              }}
              className="w-full py-2 px-4 text-center text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Owner Portal Access
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
