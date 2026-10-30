import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';

export const IndustryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { industries } = useData();

  const industry = industries.find((ind) => ind.slug === slug);

  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* 1. HERO SECTION (LIGHT / WARM WHITE) */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 bg-[#FAFAF8] text-[#111111] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
              <Link to="/industries" className="hover:text-[#111111] transition-colors">
                Industries
              </Link>
              <span>/</span>
              <span className="text-[#E11D2E]">{industry.title}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight">
              {industry.title}
            </h1>

            <p className="text-[#2A2A2A] text-base sm:text-lg leading-relaxed">
              {industry.shortDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/get-a-quote"
                className="group inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs px-7 py-3.5 rounded-full shadow-xs transition-colors"
              >
                <span>Request Industry Brief</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOLUTIONS & CAPABILITIES (LIGHT SECTION) */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Solutions */}
            <div className="bg-[#FAFAF8] rounded-2xl p-8 sm:p-10 border border-[#E5E5E3] border-t-2 border-t-[#E11D2E] shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                Tailored Implementations
              </span>
              <h2 className="text-2xl font-extrabold text-[#111111]">
                Industry-Specific Capabilities
              </h2>
              <div className="space-y-3 pt-2">
                {(industry.solutionsProvided || []).map((sol: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#E5E5E3] shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-[#E11D2E] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-[#111111]">{sol}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance & Standards */}
            <div className="bg-[#FAFAF8] rounded-2xl p-8 sm:p-10 border border-[#E5E5E3] border-t-2 border-t-[#E11D2E] shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                Security & Reliability
              </span>
              <h2 className="text-2xl font-extrabold text-[#111111]">
                Enterprise Standards
              </h2>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Every platform engineered for {industry.title} incorporates strict access governance, encrypted data transit, audit logging, and automated backups to satisfy strict regulatory standards.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#E5E5E3] shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-[#E11D2E] shrink-0" />
                  <span className="text-sm font-semibold text-[#111111]">End-to-end data encryption and key management</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#E5E5E3] shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-[#E11D2E] shrink-0" />
                  <span className="text-sm font-semibold text-[#111111]">Automated uptime monitoring with 99.9% SLAs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DARK CTA */}
      <section className="py-20 lg:py-24 bg-[#111111] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Consult on {industry.title} Solutions
          </h2>
          <p className="text-[#9CA3AF] text-base mt-4 max-w-xl mx-auto">
            Schedule a strategy session to discuss custom technical requirements and delivery schedules.
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
