import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export const TeamPage: React.FC = () => {
  const { team } = useData();

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* 1. HERO SECTION (LIGHT / WARM WHITE) */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 bg-[#FAFAF8] text-[#111111] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>DIGITEX SQUAD</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight">
              The Engineers, Architects &{' '}
              <span className="text-[#E11D2E]">
                Strategists.
              </span>
            </h1>

            <p className="text-[#2A2A2A] text-base sm:text-lg leading-relaxed">
              We are a close-knit collective of seasoned developers, creative directors, and performance marketers combining deep technical rigor with commercial awareness.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TEAM ROSTER GRID (LIGHT SECTION WITH BRAND CARDS) */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-[#E5E5E3] rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#E11D2E]/40 transition-all duration-200 flex flex-col justify-between group transform hover:-translate-y-0.5"
              >
                <div>
                  <div className="h-72 overflow-hidden bg-[#FAFAF8] relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#111111]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                      {member.role}
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#E11D2E] uppercase tracking-wider mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-4">
                      {member.bio}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {member.expertise?.slice(0, 3).map((exp: string, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E5E5E3] text-[#2A2A2A]"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
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
            Work directly with our leads
          </h2>
          <p className="text-[#9CA3AF] text-base mt-4 max-w-xl mx-auto">
            Initiate a discovery request to review scope and technical feasibility.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/get-a-quote"
              className="group inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-xs transition-colors"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
