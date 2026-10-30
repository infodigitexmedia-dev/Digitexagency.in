import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = useData();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* 1. HERO SECTION (LIGHT / WARM WHITE) */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 bg-[#FAFAF8] text-[#111111] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
              <Link to="/projects" className="hover:text-[#111111] transition-colors">
                Projects
              </Link>
              <span>/</span>
              <span className="text-[#E11D2E]">{project.title}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>{project.category}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-[#2A2A2A] text-base sm:text-lg leading-relaxed">
              {project.overview}
            </p>

            {/* Metadata Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-[#E5E5E3]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">Client</span>
                <span className="text-sm font-semibold text-[#111111]">{project.client}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">Year</span>
                <span className="text-sm font-semibold text-[#111111]">{project.year}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">Timeline</span>
                <span className="text-sm font-semibold text-[#111111]">{project.timeline || '8 Weeks'}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">Services</span>
                <span className="text-sm font-semibold text-[#111111] truncate block">
                  {project.servicesProvided?.[0] || 'Engineering'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COVER IMAGE & ARCHITECTURE (LIGHT SECTION) */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Main Full-width Screen Mockup */}
          <div className="rounded-3xl overflow-hidden shadow-sm border border-[#E5E5E3] bg-[#FAFAF8] p-2">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#FAFAF8] rounded-2xl p-8 sm:p-10 border border-[#E5E5E3] border-t-2 border-t-[#E11D2E] shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111]">
                <span>THE CHALLENGE</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#111111]">
                Friction Points & Scope
              </h2>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="bg-[#FAFAF8] rounded-2xl p-8 sm:p-10 border border-[#E5E5E3] border-t-2 border-t-[#E11D2E] shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111]">
                <span>THE ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#111111]">
                Engineered Solution
              </h2>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Results / Metrics */}
          {project.results && project.results.length > 0 && (
            <div className="bg-[#FAFAF8] rounded-3xl p-8 sm:p-12 border border-[#E5E5E3] shadow-xs">
              <div className="max-w-xl mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E11D2E] block mb-1">
                  IMPACT & METRICS
                </span>
                <h3 className="text-2xl font-extrabold text-[#111111]">
                  Measurable Business Outcomes
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {project.results.map((res, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-[#E5E5E3] shadow-xs">
                    <TrendingUp className="w-6 h-6 text-[#E11D2E] mb-3" />
                    <p className="text-sm font-bold text-[#111111]">{res}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div className="pt-8 border-t border-[#E5E5E3]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block mb-4">
              Technology Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] text-[#2A2A2A]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. DARK CTA */}
      <section className="py-20 lg:py-24 bg-[#111111] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Inspired by this project?
          </h2>
          <p className="text-[#9CA3AF] text-base mt-4 max-w-xl mx-auto">
            Let&apos;s build an equally high-performance digital solution for your business.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/get-a-quote"
              className="group inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-xs transition-colors"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
