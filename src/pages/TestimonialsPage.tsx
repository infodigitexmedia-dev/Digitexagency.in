import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { TestimonialsMarquee } from '../components/common/TestimonialsMarquee';

export const TestimonialsPage: React.FC = () => {
  const { testimonials, contactConfig } = useData();

  const getClientAvatar = (index: number) => {
    const avatarList = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    ];
    return avatarList[index % avatarList.length];
  };

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* 1. HERO SECTION (LIGHT / WARM WHITE) */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 bg-[#FAFAF8] text-[#111111] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>CLIENT TESTIMONIALS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Trusted by Ambitious{' '}
              <span className="text-[#E11D2E]">
                Founders & Teams.
              </span>
            </h1>

            <p className="text-[#2A2A2A] text-base sm:text-lg leading-relaxed">
              Read direct verbatim feedback from the founders, enterprise directors, and product leaders who partner with DIGITEX to build mission-critical digital products.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <div className="flex items-center gap-1 text-[#E11D2E]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#111111]">5.0 / 5.0 Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTINUOUS STREAM MARQUEE */}
      <section className="bg-white border-b border-[#E5E5E3] py-10">
        <TestimonialsMarquee />
      </section>

      {/* 3. TESTIMONIALS GRID (LIGHT SECTION WITH BRAND CARDS) */}
      <section className="py-20 lg:py-24 bg-[#FAFAF8] border-b border-[#E5E5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] mb-3 shadow-xs">
              <span>ALL ENDORSEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Verified Client Feedback
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-8 border border-[#E5E5E3] shadow-xs hover:shadow-md hover:border-[#E11D2E]/40 transition-all duration-200 flex flex-col justify-between transform hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 text-[#E11D2E]">
                      <div className="flex items-center gap-0.5">
                        {[...Array(Math.max(1, Math.min(5, Number(item.rating) || 5)))].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-[#111111] ml-1">
                        {Math.max(1, Math.min(5, Number(item.rating) || 5))}/5
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] flex items-center justify-center text-[#E11D2E]">
                      <Quote className="w-4 h-4 text-[#E11D2E]" />
                    </div>
                  </div>

                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E5E5E3] flex items-center gap-3">
                  <img
                    src={getClientAvatar(index)}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#E5E5E3] shadow-xs shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-[#111111]">{item.name}</h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E11D2E] shrink-0" />
                    </div>
                    <p className="text-[11px] text-[#6B7280]">
                      {item.role}, <span className="font-semibold text-[#2A2A2A]">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DARK CTA */}
      <section className="py-20 lg:py-24 bg-[#111111] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to join our success stories?
          </h2>
          <p className="text-[#9CA3AF] text-base mt-4 max-w-xl mx-auto">
            Experience the difference of partnering with an engineering agency dedicated to your growth metrics.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-xs transition-colors"
            >
              <span>Start Your Project</span>
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
