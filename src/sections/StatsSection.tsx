import React from 'react';
import { useWebsite } from '../context/WebsiteContext';
import { CheckCircle } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export const StatsSection: React.FC = () => {
  const { data } = useWebsite();
  const { statistics } = data;

  // Respect constraint: Do not show unverified metrics publicly unless toggled by owner
  if (!statistics.showPublicly) {
    return null;
  }

  return (
    <section className="py-14 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {statistics.items.map((stat, idx) => (
            <ScrollReveal key={stat.id} delay={idx * 75} yOffset={15}>
              <div className="p-6 bg-[#F7F7F7] rounded-lg border border-gray-200/80 card-hover-elevate transition-all duration-300">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#111111] mb-1 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-[#E51B23] uppercase tracking-wider mb-2">
                  {stat.label}
                </div>
                {stat.verifiedNote && (
                  <div className="flex items-center gap-1 text-[11px] text-[#777777]">
                    <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                    <span>{stat.verifiedNote}</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
