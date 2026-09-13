import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Layers, Smartphone, Globe } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';

export const HeroSection: React.FC = () => {
  const { data, setIsInquiryModalOpen, setSelectedProjectForModal } = useWebsite();
  const { content, projects } = data;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Find a representative project for the hero visual showcase
  const featuredProject = projects[0] || null;

  return (
    <section id="home" className="relative bg-white pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 max-w-2xl">
            {/* 1. Small Badge / Agency Identity */}
            <div
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translate3d(0,0,0)' : 'translate3d(0,18px,0)',
                transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 100ms',
              }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-[#555555] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E51B23]" />
              <span>{content.heroBadge || 'Digital Solutions & Marketing Agency'}</span>
            </div>

            {/* 2. Main Headline */}
            <h1
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translate3d(0,0,0)' : 'translate3d(0,22px,0)',
                transition: 'opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) 220ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) 220ms',
              }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#111111] leading-[1.12] tracking-[-0.02em] mb-6"
            >
              {content.heroHeadline}
            </h1>

            {/* 3. Supporting Text */}
            <p
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translate3d(0,0,0)' : 'translate3d(0,20px,0)',
                transition: 'opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) 360ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) 360ms',
              }}
              className="text-lg sm:text-xl text-[#555555] leading-relaxed mb-8 max-w-xl"
            >
              {content.heroDescription}
            </p>

            {/* 4. CTAs */}
            <div
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translate3d(0,0,0)' : 'translate3d(0,18px,0)',
                transition: 'opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) 500ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) 500ms',
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10"
            >
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] rounded-md shadow-xs btn-interactive group"
                id="hero-primary-cta"
              >
                <span>{content.heroPrimaryCta || 'Start a Project'}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold text-[#111111] bg-white hover:bg-[#F7F7F7] border border-gray-300 rounded-md btn-interactive"
                id="hero-secondary-cta"
              >
                <span>{content.heroSecondaryCta || 'View Our Work'}</span>
              </button>
            </div>

            {/* 5. Real Agency Trust Elements */}
            <div
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translate3d(0,0,0)' : 'translate3d(0,15px,0)',
                transition: 'opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) 620ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) 620ms',
              }}
              className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#555555]"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E51B23]" />
                <span>Full-Stack Engineering</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E51B23]" />
                <span>Brand & Identity Design</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E51B23]" />
                <span>Performance Marketing</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase: Tasteful Editorial Agency Work Composition */}
          <div
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translate3d(0,0,0)' : 'translate3d(0,22px,0)',
              transition: 'opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) 350ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) 350ms',
            }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Browser Card */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden card-hover-elevate">
                {/* Clean Browser Header */}
                <div className="bg-[#F7F7F7] px-4 py-2.5 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-0.5 rounded text-[11px] text-gray-500 font-mono border border-gray-200">
                    <Globe className="w-3 h-3 text-gray-400" />
                    <span>digitexagency.com/selected-work</span>
                  </div>
                  <div className="w-10" />
                </div>

                {/* Project Showcase Image */}
                <div className="relative group cursor-pointer overflow-hidden" onClick={() => featuredProject && setSelectedProjectForModal(featuredProject)}>
                  <img
                    src={featuredProject?.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'}
                    alt="DIGITEX Agency Portfolio Platform"
                    referrerPolicy="no-referrer"
                    className="w-full h-[260px] sm:h-[300px] object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Caption Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-3 rounded border border-gray-100 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-[#E51B23] tracking-wide uppercase">
                        {featuredProject?.category || 'Web Platform'}
                      </span>
                      <h4 className="text-sm font-bold text-[#111111] truncate max-w-[220px]">
                        {featuredProject?.title.split('—')[0] || 'Aura Living'}
                      </h4>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 group-hover:text-[#E51B23] transition-colors">
                      Case Study <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Micro Capabilities Bar */}
                <div className="p-4 bg-white grid grid-cols-2 gap-3 text-xs border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Layers className="w-4 h-4 text-[#E51B23]" />
                    <span>Cross-Device Responsive</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Smartphone className="w-4 h-4 text-[#E51B23]" />
                    <span>Modern Web Standards</span>
                  </div>
                </div>
              </div>

              {/* Sub-card floating badge */}
              <div className="hidden sm:block absolute -bottom-5 -left-5 bg-white p-3.5 rounded-lg border border-gray-200 shadow-md max-w-[210px] card-hover-elevate">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Agency Status</span>
                </div>
                <p className="text-xs font-bold text-[#111111]">
                  Accepting Selected Client Projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
