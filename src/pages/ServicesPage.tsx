import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Smartphone,
  PenTool,
  BrainCircuit,
  Bot,
  ShoppingCart,
  Megaphone,
  Search,
  CloudCog,
  ShieldCheck,
  LockKeyhole,
  Blocks,
  UserCheck,
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const ServicesPage: React.FC = () => {
  const { services } = useData();

  const getServiceIcon = (key: string) => {
    const id = key.toLowerCase();
    if (id.includes('web')) return <Code2 className="w-6 h-6 stroke-[1.8]" />;
    if (id.includes('mobile') || id.includes('app')) return <Smartphone className="w-6 h-6 stroke-[1.8]" />;
    if (id.includes('ui') || id.includes('ux') || id.includes('design')) return <PenTool className="w-6 h-6 stroke-[1.8]" />;
    if (id.includes('commerce') || id.includes('shopping')) return <ShoppingCart className="w-6 h-6 stroke-[1.8]" />;
    if (id.includes('ai')) return <BrainCircuit className="w-6 h-6 stroke-[1.8]" />;
    if (id.includes('machine') || id.includes('ml')) return <Bot className="w-6 h-6 stroke-[1.8]" />;
    if (id.includes('software') || id.includes('custom')) return <Blocks className="w-6 h-6 stroke-[1.8]" />;
    if (id.includes('seo') || id.includes('search')) return <Search className="w-6 h-6 stroke-[1.8]" />;
    if (id.includes('market') || id.includes('growth')) return <Megaphone className="w-6 h-6 stroke-[1.8]" />;
    if (id.includes('cloud') || id.includes('devops')) return <CloudCog className="w-6 h-6 stroke-[1.8]" />;
    if (id.includes('security') || id.includes('cyber')) return <LockKeyhole className="w-6 h-6 stroke-[1.8]" />;
    if (id.includes('test') || id.includes('qa') || id.includes('quality')) return <ShieldCheck className="w-6 h-6 stroke-[1.8]" />;
    if (id.includes('hiring') || id.includes('staff')) return <UserCheck className="w-6 h-6 stroke-[1.8]" />;
    return <Code2 className="w-6 h-6 stroke-[1.8]" />;
  };

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* 1. HERO SECTION (LIGHT / WARM WHITE) */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 bg-[#FAFAF8] text-[#111111] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>DIGITEX CAPABILITIES</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Enterprise Digital Engineering &{' '}
              <span className="text-[#E11D2E]">
                Strategic Services.
              </span>
            </h1>

            <p className="text-[#2A2A2A] text-base sm:text-lg leading-relaxed">
              We design, architect, engineer, and scale modern software and digital solutions tailored to your operational goals and growth targets.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/get-a-quote"
                className="group inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs px-7 py-3.5 rounded-full shadow-xs transition-colors"
              >
                <span>Request Scope</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID (LIGHT SECTION WITH BRAND CARDS) */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <Link
                key={svc.id}
                to={`/services/${svc.slug}`}
                className="group bg-white rounded-2xl p-8 border border-[#E5E5E3] shadow-xs hover:shadow-md hover:border-[#E11D2E]/40 transition-all duration-200 flex flex-col justify-between transform hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] border border-[#E5E5E3] text-[#111111] group-hover:text-[#E11D2E] group-hover:bg-red-50/60 flex items-center justify-center transition-colors">
                      {getServiceIcon(svc.id)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] text-[#6B7280]">
                      {svc.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm mt-2 leading-relaxed">
                    {svc.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {svc.capabilities.slice(0, 3).map((cap, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E5E5E3] text-[#2A2A2A]"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E5E5E3] flex items-center justify-between text-xs font-bold text-[#E11D2E]">
                  <span>Explore Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DARK CTA SECTION */}
      <section className="py-20 lg:py-24 bg-[#111111] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Need a custom engineering squad?
          </h2>
          <p className="text-[#9CA3AF] text-base mt-4 max-w-xl mx-auto">
            We configure dedicated multi-disciplinary squads combining UI/UX designers, senior full-stack engineers, and cloud architects for unified roadmap execution.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-xs transition-colors"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
