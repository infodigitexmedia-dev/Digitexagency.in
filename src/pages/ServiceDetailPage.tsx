import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services, projects } = useData();

  const normalizedSlug = slug?.toLowerCase();
  const service = services.find(
    (s) =>
      s.slug.toLowerCase() === normalizedSlug ||
      s.id.toLowerCase() === normalizedSlug ||
      s.aliases?.some((a) => a.toLowerCase() === normalizedSlug)
  );

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Filter relevant projects
  const relevantProjects = projects.filter(
    (p) =>
      p.category.toLowerCase().includes(service.category.toLowerCase()) ||
      p.servicesProvided?.some((s) => s.toLowerCase().includes(service.title.toLowerCase())) ||
      p.technologies.some((t) => service.technologies.includes(t))
  ).slice(0, 2);

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* 1. HERO SECTION (LIGHT / WARM WHITE) */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 bg-[#FAFAF8] text-[#111111] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
              <Link to="/services" className="hover:text-[#111111] transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-[#E11D2E]">{service.title}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>{service.category}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-[#2A2A2A] text-base sm:text-lg leading-relaxed">
              {service.fullDescription}
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

      {/* 2. IMAGE & CAPABILITIES (LIGHT SECTION) */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Main Photography */}
          <div className="rounded-3xl overflow-hidden shadow-sm border border-[#E5E5E3] bg-[#FAFAF8] p-2">
            <div className="aspect-[21/9] sm:aspect-[24/10] rounded-2xl overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Capabilities & Deliverables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Capabilities */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] text-xs font-semibold text-[#111111]">
                <span>CORE CAPABILITIES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Engineered Specifications
              </h2>
              <div className="space-y-3 pt-2">
                {service.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#FAFAF8] p-4 rounded-xl border border-[#E5E5E3]">
                    <CheckCircle2 className="w-5 h-5 text-[#E11D2E] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-[#111111]">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Deliverables */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] text-xs font-semibold text-[#111111]">
                <span>DELIVERABLES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                What We Ship
              </h2>
              <div className="space-y-3 pt-2">
                {service.deliverables.map((del, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#FAFAF8] p-4 rounded-xl border border-[#E5E5E3]">
                    <CheckCircle2 className="w-5 h-5 text-[#E11D2E] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-[#111111]">{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROCESS TIMELINE */}
      <section className="py-20 lg:py-24 bg-[#FAFAF8] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] mb-3 shadow-xs">
              <span>METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Implementation Phases
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E5E5E3] border-t-2 border-t-[#E11D2E] shadow-xs hover:shadow-md transition-all space-y-3 transform hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E11D2E] flex items-center justify-center font-bold text-sm">
                  0{step.step}
                </div>
                <h3 className="text-base font-bold text-[#111111]">{step.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RELEVANT WORK */}
      {relevantProjects.length > 0 && (
        <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                  Case Studies
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight mt-1">
                  Relevant Production Work
                </h2>
              </div>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#E11D2E] hover:underline transition-colors"
              >
                <span>All Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relevantProjects.map((p) => (
                <div
                  key={p.id}
                  className="group bg-[#FAFAF8] rounded-2xl overflow-hidden border border-[#E5E5E3] shadow-xs hover:shadow-md hover:border-[#E11D2E]/40 transition-all flex flex-col justify-between transform hover:-translate-y-0.5"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 left-3.5 bg-[#111111]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/15">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors">{p.title}</h3>
                    <p className="text-xs text-[#6B7280] line-clamp-2">{p.overview}</p>
                    <div className="pt-2">
                      <Link
                        to={`/projects/${p.slug}`}
                        className="group/btn text-xs font-bold text-[#E11D2E] hover:underline inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>View Study</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. DARK CTA */}
      <section className="py-20 lg:py-24 bg-[#111111] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to commission {service.title}?
          </h2>
          <p className="text-[#9CA3AF] text-base mt-4 max-w-xl mx-auto">
            Submit your requirements for an immediate architectural assessment and project roadmap.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-xs transition-colors"
            >
              <span>Request Scope</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
