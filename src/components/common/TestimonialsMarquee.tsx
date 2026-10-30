import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const TestimonialsMarquee: React.FC = () => {
  const { testimonials } = useData();

  // Duplicate for seamless 0% to -50% infinite translation loop
  const duplicatedList = [...testimonials, ...testimonials, ...testimonials];

  const getClientAvatar = (name: string, index: number) => {
    const avatarList = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    ];
    return avatarList[index % avatarList.length];
  };

  return (
    <div className="w-full overflow-hidden select-none relative py-4" aria-label="Client Testimonials Marquee">
      <div className="animate-marquee-left flex gap-6 items-stretch">
        {duplicatedList.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="w-[360px] sm:w-[420px] shrink-0 bg-white rounded-2xl p-7 border border-[#E5E5E3] shadow-sm hover:shadow-md hover:border-[#E11D2E]/40 transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Star Rating & Quote Icon */}
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
                  <span className="text-[11px] font-medium text-[#6B7280] ml-1.5">&bull; Verified</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] flex items-center justify-center text-[#E11D2E] shadow-xs">
                  <Quote className="w-4 h-4 text-[#E11D2E]" />
                </div>
              </div>

              {/* Quote text */}
              <p className="text-[#6B7280] text-sm leading-relaxed font-normal">
                &ldquo;{item.content}&rdquo;
              </p>
            </div>

            {/* Author details */}
            <div className="mt-6 pt-4 border-t border-[#E5E5E3] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={getClientAvatar(item.name, index)}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E5E5E3] shadow-xs shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-[#111111] truncate">
                      {item.name}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E11D2E] shrink-0" />
                  </div>
                  <p className="text-[11px] text-[#6B7280] truncate">
                    {item.role}, <span className="font-semibold text-[#2A2A2A]">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
