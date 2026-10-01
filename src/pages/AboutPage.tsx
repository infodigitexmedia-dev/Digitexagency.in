import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const AboutPage: React.FC = () => {
  const { about, contactConfig } = useData();

  const valuesList =
    about?.values && about.values.length > 0
      ? about.values
      : [
          {
            title: 'Outcome-Driven',
            description: 'We measure our success by your conversion rates, load speeds, and bottom-line revenue impact.',
          },
          {
            title: 'Modern Architecture',
            description: 'Next.js, TypeScript, cloud-native deployments, and headless stacks for frictionless scaling.',
          },
          {
            title: 'Security & Integrity',
            description: 'Strict data privacy, automated security scanning, and high-availability SLA compliance.',
          },
          {
            title: 'Rapid Delivery',
            description: 'Agile iterations and automated deployment pipelines to bring your product to market faster.',
          },
        ];

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* 1. HERO SECTION (LIGHT / EDITORIAL) */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 bg-[#FAFAF8] text-[#111111] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>{about?.heroEyebrow || 'ABOUT DIGITEX'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight">
              {about?.heading || 'We are a modern digital agency engineering measurable growth.'}
            </h1>

            <p className="text-[#2A2A2A] text-base sm:text-lg leading-relaxed">
              {about?.introduction ||
                'DIGITEX brings together creative strategy, user experience design, and robust full-stack software development to build enduring competitive advantage for our clients.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/get-a-quote"
                className="group inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs px-7 py-3.5 rounded-full shadow-xs transition-colors"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP (WHITE) */}
      <section className="bg-white border-b border-[#E5E5E3] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#111111]">5+</div>
              <span className="text-xs font-medium text-[#6B7280] mt-1 block">Years of Industry Service</span>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#111111]">50+</div>
              <span className="text-xs font-medium text-[#6B7280] mt-1 block">Production Projects Shipped</span>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#111111]">99%</div>
              <span className="text-xs font-medium text-[#6B7280] mt-1 block">On-Time Sprint Completion</span>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#111111]">30+</div>
              <span className="text-xs font-medium text-[#6B7280] mt-1 block">Active Enterprise Clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ETHOS & LAYERED IMAGE SECTION */}
      <section className="py-20 lg:py-24 bg-[#FAFAF8] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-sm border border-[#E5E5E3] aspect-[4/3] bg-white p-2">
                <img
                  src={about?.heroImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80'}
                  alt="DIGITEX Engineering"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                <span>{about?.philosophyEyebrow || 'OUR CORE PHILOSOPHY'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight">
                {about?.philosophyHeading || about?.subheading || 'Craftsmanship, code ownership, and real business results.'}
              </h2>

              <p className="text-[#6B7280] text-base leading-relaxed">
                {about?.mission ||
                  'We believe that software should be an enduring competitive asset, not a temporary subscription or a fragile template. Every web platform, mobile application, and digital marketing system we build is designed for high concurrency, clean architecture, and 100% intellectual property transfer to our clients.'}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#E5E5E3] shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#E11D2E] shrink-0" />
                  <span className="text-sm font-semibold text-[#111111]">Complete code ownership with zero vendor lock-in</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#E5E5E3] shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#E11D2E] shrink-0" />
                  <span className="text-sm font-semibold text-[#111111]">Direct access to experienced senior engineers</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#E5E5E3] shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#E11D2E] shrink-0" />
                  <span className="text-sm font-semibold text-[#111111]">Transparent bi-weekly sprint cadence and public PRs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUES CARDS (WHITE SECTION) */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] text-xs font-semibold text-[#111111] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>HOW WE OPERATE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Our Operating Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesList.map((val, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E5E5E3] border-t-2 border-t-[#E11D2E] shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAFAF8] border border-[#E5E5E3] text-[#E11D2E] flex items-center justify-center mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#111111]">{val.title}</h3>
                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DELIVERY PROCESS SECTION (CMS about.process) */}
      {about?.process && about.process.length > 0 && (
        <section className="py-20 lg:py-24 bg-[#111111] text-white border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                <span>DELIVERY PROCESS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Our Proven Engineering Framework
              </h2>
              <p className="text-[#9CA3AF] text-sm mt-2">
                A disciplined delivery model built for predictability, code ownership, and rapid milestone iteration.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {about.process.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 space-y-3 hover:border-[#E11D2E]/40 transition-colors"
                >
                  <span className="text-xs font-mono font-bold text-[#E11D2E] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 inline-block">
                    0{step.step || idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. DARK CTA SECTION */}
      <section className="py-20 lg:py-24 bg-[#111111] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to build something great?
          </h2>
          <p className="text-[#9CA3AF] text-base mt-4 max-w-xl mx-auto">
            Partner with our experienced engineering leads to scope, architect, and launch your next digital milestone.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-xs transition-colors"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={contactConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs px-8 py-3.5 rounded-full transition-colors"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
