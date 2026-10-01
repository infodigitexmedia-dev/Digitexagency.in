import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  ArrowRight,
  Linkedin,
  Instagram,
  MessageSquare,
} from 'lucide-react';
import { DigitexLogo } from '../common/DigitexLogo';
import { useData } from '../../context/DataContext';

export const Footer: React.FC = () => {
  const { contactConfig, services } = useData();

  return (
    <footer className="bg-[#111111] text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-5">
            <DigitexLogo variant="dark" size="md" withTagline={true} />
            <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-sm">
              We help businesses grow through innovative digital solutions, creative design, high-performance web platforms, and engineering technology.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={contactConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#E11D2E] hover:border-[#E11D2E] transition-all"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#E11D2E] hover:border-[#E11D2E] transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#E11D2E] hover:border-[#E11D2E] transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9CA3AF]">
              <li>
                <Link to="/" className="hover:text-[#E11D2E] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E11D2E] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#E11D2E] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-[#E11D2E] transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#E11D2E] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-[#E11D2E] transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#E11D2E] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9CA3AF]">
              {services.slice(0, 6).map((svc) => (
                <li key={svc.id}>
                  <Link
                    to={`/services/${svc.slug}`}
                    className="hover:text-[#E11D2E] transition-colors truncate block"
                  >
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us & CTA */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-[#9CA3AF]">
              <li>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#E11D2E] shrink-0" />
                  <span className="truncate">{contactConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactConfig.phone}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#E11D2E] shrink-0" />
                  <span>+91 {contactConfig.phone}</span>
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-xs font-medium text-[#9CA3AF] block mb-3">
                Ready to elevate your digital presence?
              </span>
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xs transition-colors"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#9CA3AF]">
          <div>
            © {new Date().getFullYear()} DIGITEX. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/owner" className="hover:text-white transition-colors">
              Owner Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
