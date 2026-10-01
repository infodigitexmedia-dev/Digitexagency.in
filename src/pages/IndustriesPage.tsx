import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Stethoscope,
  Landmark,
  ShoppingBag,
  Truck,
  GraduationCap,
  Home,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const IndustriesPage: React.FC = () => {
  const { industries } = useData();

  const getIndustryIcon = (slug: string) => {
    switch (slug) {
      case 'healthcare':
      case 'healthcare-medtech':
        return <Stethoscope className="w-6 h-6 stroke-[1.8]" />;
      case 'construction':
      case 'real-estate':
        return <Home className="w-6 h-6 stroke-[1.8]" />;
      case 'retail':
      case 'ecommerce-retail':
        return <ShoppingBag className="w-6 h-6 stroke-[1.8]" />;
      case 'education':
      case 'edtech-learning':
        return <GraduationCap className="w-6 h-6 stroke-[1.8]" />;
      case 'travel':
      case 'hospitality':
      case 'logistics':
      case 'logistics-supply-chain':
        return <Truck className="w-6 h-6 stroke-[1.8]" />;
      case 'fintech':
      case 'fintech-banking':
        return <Landmark className="w-6 h-6 stroke-[1.8]" />;
      default:
        return <Building2 className="w-6 h-6 stroke-[1.8]" />;
    }
  };

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* 1. HERO SECTION (LIGHT / WARM WHITE) */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 bg-[#FAFAF8] text-[#111111] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>INDUSTRY SPECIALIZATIONS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Domain Expertise &{' '}
              <span className="text-[#E11D2E]">
                Vertical Solutions.
              </span>
            </h1>

            <p className="text-[#2A2A2A] text-base sm:text-lg leading-relaxed">
              We engineer specialized digital platforms tailored to complex regulatory standards, compliance frameworks, and industry workflows.
            </p>
          </div>
        </div>
      </section>

      {/* 2. INDUSTRIES LIST (LIGHT SECTION WITH BRAND CARDS) */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <div
                key={ind.id}
                className="group bg-white rounded-2xl p-8 border border-[#E5E5E3] shadow-xs hover:shadow-md hover:border-[#E11D2E]/40 transition-all duration-200 flex flex-col justify-between transform hover:-translate-y-0.5"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] border border-[#E5E5E3] text-[#111111] group-hover:text-[#E11D2E] group-hover:bg-red-50/60 flex items-center justify-center mb-6 transition-colors">
                    {getIndustryIcon(ind.slug)}
                  </div>
                  <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-[#6B7280] text-xs sm:text-sm mt-2 leading-relaxed">
                    {ind.shortDescription}
                  </p>

                  <div className="mt-6 pt-4 border-t border-[#E5E5E3] space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
                      Core Solutions
                    </span>
                    {(ind.solutionsProvided || []).slice(0, 3).map((sol: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#2A2A2A]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E11D2E] shrink-0" />
                        <span className="truncate">{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E5E5E3]">
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="group/link inline-flex items-center gap-1.5 text-xs font-bold text-[#E11D2E] hover:underline transition-colors"
                  >
                    <span>Explore Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DARK CTA */}
      <section className="py-20 lg:py-24 bg-[#111111] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Need compliance-hardened architecture?
          </h2>
          <p className="text-[#9CA3AF] text-base mt-4 max-w-xl mx-auto">
            Our engineering team builds with strict SOC2, HIPAA, and GDPR compliance guidelines.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-xs transition-colors"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
