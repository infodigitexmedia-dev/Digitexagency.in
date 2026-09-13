import React from 'react';
import { Star, Quote, MessageSquarePlus } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { ScrollReveal } from '../components/ScrollReveal';

export const TestimonialsSection: React.FC = () => {
  const { data, setIsInquiryModalOpen } = useWebsite();
  const { content, testimonials } = data;

  const visibleTestimonials = testimonials.filter((t) => t.isVisible);

  // For a seamless infinite marquee, ensure the track has enough cards
  // so that each stream is wider than any ultra-wide viewport before repeating
  const baseItems = visibleTestimonials.length > 0 ? visibleTestimonials : [];

  let singleTrack = [...baseItems];
  while (singleTrack.length < 8 && baseItems.length > 0) {
    singleTrack = [...singleTrack, ...baseItems];
  }

  const renderCard = (t: typeof testimonials[0], uniqueKey: string) => (
    <div
      key={uniqueKey}
      className="w-[290px] sm:w-[350px] md:w-[380px] shrink-0 bg-white rounded-lg p-7 border border-gray-200 shadow-xs hover:border-gray-300 card-hover-elevate flex flex-col justify-between select-none cursor-default transition-all duration-300"
    >
      <div>
        {/* Rating Stars & Quote Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < t.rating
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <Quote className="w-5 h-5 text-gray-300" />
        </div>

        {/* Review Text */}
        <p className="text-[14px] text-[#333333] leading-relaxed mb-6 italic">
          "{t.review}"
        </p>
      </div>

      {/* Client Profile */}
      <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
        {t.avatarUrl ? (
          <img
            src={t.avatarUrl}
            alt={t.clientName}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-xs text-[#111111]">
            {t.clientName.charAt(0)}
          </div>
        )}

        <div>
          <h4 className="text-sm font-bold text-[#111111]">{t.clientName}</h4>
          <p className="text-xs text-[#777777]">
            {t.role ? `${t.role}, ` : ''}
            <span className="font-semibold text-[#555555]">{t.company}</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E51B23] uppercase tracking-wider mb-2.5">
              <span>Client Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-[-0.02em] mb-3">
              {content.testimonialsHeading || 'What Our Clients Say'}
            </h2>
            <p className="text-base text-[#555555] leading-relaxed">
              {content.testimonialsSubheading ||
                'Direct feedback from founders, executives, and marketing leaders we collaborate with.'}
            </p>
          </div>

          {/* Micro interaction hint */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Hover review card to pause reading</span>
          </div>
        </ScrollReveal>
      </div>

      {/* Content Area */}
      {visibleTestimonials.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 bg-[#F7F7F7] rounded-lg border border-gray-200 text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto mb-4 text-[#E51B23]">
              <MessageSquarePlus className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#111111] mb-2">Verified Client Reviews</h3>
            <p className="text-sm text-[#555555] mb-6 leading-relaxed">
              Client testimonials are curated and updated directly through the agency management dashboard.
            </p>
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#E51B23] rounded-md btn-interactive"
            >
              <span>Work With DIGITEX</span>
            </button>
          </div>
        </div>
      ) : (
        /* Infinite Marquee Container moving strictly RIGHT to LEFT */
        <div className="relative w-full marquee-container overflow-hidden py-4 select-none">
          {/* Subtle Side Fade Overlays for smooth edge transitions */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 z-10 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 z-10 bg-gradient-to-l from-white via-white/80 to-transparent" />

          {/* The continuous animated tracks streaming strictly Right -> Left */}
          <div className="flex w-max">
            {/* Primary Track Set */}
            <div className="flex shrink-0 items-stretch gap-6 pr-6 marquee-track-rtl">
              {singleTrack.map((t, index) => renderCard(t, `primary-${t.id}-${index}`))}
            </div>
            {/* Duplicate Track Set for seamless infinite streaming */}
            <div className="flex shrink-0 items-stretch gap-6 pr-6 marquee-track-rtl" aria-hidden="true">
              {singleTrack.map((t, index) => renderCard(t, `duplicate-${t.id}-${index}`))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
