import React from 'react';
import { Check, ShieldCheck, Clock, MessageSquare, Cpu, TrendingUp, Headphones } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { ScrollReveal } from '../components/ScrollReveal';

const STRENGTH_ICONS = [
  ShieldCheck,
  Headphones,
  MessageSquare,
  Cpu,
  TrendingUp,
  Clock,
];

export const AboutSection: React.FC = () => {
  const { data, setIsInquiryModalOpen } = useWebsite();
  const { content } = data;

  const strengthDescriptions: Record<string, string> = {
    'End-to-end digital solutions':
      'From initial brand identity and UI design to production-grade engineering and growth marketing, we handle every stage of your digital build under one roof.',
    'Dedicated project support':
      'Direct coordination with our core engineers and designers. No multiple account layers or lost requirements.',
    'Clear communication':
      'Regular sprint demos, transparent milestone timelines, and structured updates so you always know where your project stands.',
    'Modern technology':
      'High-performance frameworks, clean component architectures, robust cloud tooling, and maintainable codebases built to scale.',
    'Business-focused approach':
      'Every interface and feature is built around your commercial objectives, conversion funnels, and real customer usability.',
    'Post-launch support':
      'Reliable handover documentation, infrastructure monitoring, and continuous technical maintenance to protect your investment.',
  };

  return (
    <section id="about" className="py-20 sm:py-24 bg-[#F7F7F7] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative & Philosophy */}
          <ScrollReveal className="lg:col-span-5" yOffset={20}>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E51B23] uppercase tracking-wider mb-2.5">
              <span>About DIGITEX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-[-0.02em] mb-6">
              {content.aboutHeading || 'Why Choose DIGITEX?'}
            </h2>

            <p className="text-base text-[#555555] leading-relaxed mb-6">
              {content.aboutDescription}
            </p>

            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs mb-8 card-hover-elevate">
              <h4 className="text-sm font-bold text-[#111111] mb-2">Our Operating Philosophy</h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                We avoid tech jargon and inflated promises. We believe great digital products come from disciplined design, clean architecture, and clear human communication between client and agency.
              </p>
            </div>

            <div>
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#111111] hover:bg-black rounded-md btn-interactive"
              >
                <span>Partner With DIGITEX</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Right Column: 6 Strengths Grid with Staggered Scroll Reveal */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {content.aboutStrengths.map((strength, index) => {
                const IconComponent = STRENGTH_ICONS[index % STRENGTH_ICONS.length];
                const detail = strengthDescriptions[strength] || 'Engineered with precision for dependable commercial performance.';
                return (
                  <ScrollReveal
                    key={strength}
                    delay={index * 80}
                    className="h-full"
                  >
                    <div
                      className="group bg-white p-6 rounded-lg border border-gray-200/90 shadow-xs hover:border-gray-300 card-hover-elevate transition-all duration-300 flex flex-col justify-between h-full"
                    >
                      <div>
                        <div className="w-8 h-8 rounded bg-gray-50 border border-gray-100 flex items-center justify-center text-[#E51B23] group-hover:bg-[#E51B23] group-hover:text-white group-hover:border-[#E51B23] group-hover:-translate-y-0.5 group-hover:scale-105 transition-all duration-200 mb-4">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h3 className="text-base font-bold text-[#111111] mb-2 group-hover:text-[#E51B23] transition-colors duration-200">
                          {strength}
                        </h3>
                        <p className="text-xs text-[#555555] leading-relaxed">
                          {detail}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
