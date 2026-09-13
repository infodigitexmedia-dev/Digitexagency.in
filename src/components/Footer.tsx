import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { useWebsite } from '../context/WebsiteContext';
import {
  ArrowUpRight,
  ArrowUp,
  Lock,
  LayoutDashboard,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Phone,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, isAdminAuthenticated, activeView, setActiveView, setIsAdminLoginModalOpen } = useWebsite();
  const { content, contact, services } = data;

  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (activeView === 'admin') {
      setActiveView('public');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const officialPhone = contact.displayPhone || '9034242154';
  const cleanPhone = officialPhone.replace(/[^0-9]/g, '');
  const waCountryPrefix = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
  const whatsappUrl = `https://wa.me/${waCountryPrefix}?text=${encodeURIComponent(
    'Hello DIGITEX team, I would like to discuss a digital project.'
  )}`;

  const officialInstagramUrl =
    contact.instagramUrl ||
    'https://www.instagram.com/digitexagency.in?stkn=MTY3cmxudzJ3dXEydA==';

  const socialLinks = [
    {
      name: 'Instagram',
      url: officialInstagramUrl,
      icon: Instagram,
      ariaLabel: 'Visit DIGITEX on Instagram (@digitexagency.in)',
      handle: '@digitexagency.in',
    },
    {
      name: 'WhatsApp',
      url: whatsappUrl,
      icon: MessageCircle,
      ariaLabel: `Chat with DIGITEX on WhatsApp (${officialPhone})`,
      handle: officialPhone,
    },
    ...(contact.linkedinUrl
      ? [
          {
            name: 'LinkedIn',
            url: contact.linkedinUrl,
            icon: Linkedin,
            ariaLabel: 'Visit DIGITEX on LinkedIn',
            handle: 'LinkedIn Profile',
          },
        ]
      : []),
    ...(contact.twitterUrl
      ? [
          {
            name: 'X (Twitter)',
            url: contact.twitterUrl,
            icon: Twitter,
            ariaLabel: 'Visit DIGITEX on X',
            handle: 'X Profile',
          },
        ]
      : []),
    ...(contact.facebookUrl
      ? [
          {
            name: 'Facebook',
            url: contact.facebookUrl,
            icon: Facebook,
            ariaLabel: 'Visit DIGITEX on Facebook',
            handle: 'Facebook Page',
          },
        ]
      : []),
  ];

  const navigationLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Projects (Selected Work)', href: '#projects' },
    { label: 'About (Why DIGITEX)', href: '#about' },
    { label: 'Testimonials (Client Reviews)', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer id="agency-footer" className="bg-[#FAFAFA] border-t border-gray-200 text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-gray-200">
          {/* 1. Brand Info & Direct Contact */}
          <div className="lg:col-span-4 space-y-5">
            <Logo size="lg" />
            <p className="text-sm text-[#555555] leading-relaxed max-w-sm">
              {content.footerDescription ||
                'DIGITEX is a modern digital solutions and marketing agency providing web engineering, branding, growth marketing, and mobile solutions.'}
            </p>

            <div className="space-y-2.5 text-xs text-[#666666] pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E51B23] shrink-0 mt-0.5" />
                <span>
                  {contact.address}, {contact.city}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E51B23] shrink-0" />
                <a
                  href={`mailto:${contact.email || 'info.digitex.media@gmail.com'}`}
                  className="font-medium text-[#111111] hover:text-[#E51B23] transition-colors"
                  id="footer-email-link"
                >
                  {contact.email || 'info.digitex.media@gmail.com'}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E51B23] shrink-0" />
                <a
                  href={`tel:${cleanPhone}`}
                  className="font-medium text-[#111111] hover:text-[#E51B23] transition-colors"
                  id="footer-phone-link"
                >
                  {officialPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#777777] shrink-0" />
                <span>{contact.businessHours}</span>
              </div>
            </div>
          </div>

          {/* 2. Main Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-5 pb-1 border-b border-gray-200 inline-block">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {navigationLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-[#555555] hover:text-[#E51B23] transition-colors inline-flex items-center gap-1.5 py-0.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#E51B23] group-hover:scale-125 transition-all duration-200" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Core Capabilities */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-5 pb-1 border-b border-gray-200 inline-block">
              Capabilities
            </h4>
            <ul className="space-y-3 text-sm text-[#555555]">
              {services
                .filter((s) => s.isVisible)
                .slice(0, 6)
                .map((service) => (
                  <li key={service.id}>
                    <a
                      href="#services"
                      onClick={(e) => handleNavClick(e, '#services')}
                      className="hover:text-[#E51B23] hover:translate-x-0.5 transition-all duration-200 inline-block py-0.5"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* 4. Social Media & Channels */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-5 pb-1 border-b border-gray-200 inline-block">
                Connect With Us
              </h4>
              <p className="text-xs text-[#666666] mb-4">
                Follow our case studies, client updates, and direct messaging channels.
              </p>

              {/* Clear, highly visible icon buttons with smooth hover interaction */}
              <div className="flex flex-wrap items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      title={social.name}
                      className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-[#333333] hover:text-white hover:bg-[#E51B23] hover:border-[#E51B23] social-icon-btn shadow-2xs flex items-center justify-center group"
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Structured Social Text Links */}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={`list-${social.name}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs text-[#555555] hover:text-[#E51B23] transition-colors py-1 group"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E51B23] transition-colors" />
                      <span>{social.name}</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-[#E51B23] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Copyright, Back to Top & Owner CMS Access */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <div>
            © {currentYear} DIGITEX Digital Solutions & Marketing Agency. All rights reserved.
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-gray-500 hover:text-[#111111] transition-colors py-1 px-2 rounded hover:bg-gray-100 btn-interactive group"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Back to Top</span>
            </button>

            {/* Owner Portal Link */}
            {isAdminAuthenticated ? (
              <button
                id="footer-owner-dashboard-btn"
                onClick={() => setActiveView('admin')}
                className="inline-flex items-center gap-1.5 font-semibold text-[#111111] hover:text-[#E51B23] transition-colors py-1 px-2 rounded hover:bg-gray-100 btn-interactive"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#E51B23]" />
                <span>Owner Dashboard</span>
              </button>
            ) : (
              <button
                id="footer-owner-login-btn"
                onClick={() => setIsAdminLoginModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-[#111111] transition-colors py-1 px-2 rounded hover:bg-gray-100 btn-interactive"
                title="Owner Portal Access"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Owner Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
