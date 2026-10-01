import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const FloatingQuoteButton: React.FC = () => {
  const location = useLocation();

  // Hide on quote page or owner portal to avoid redundancy/interference
  if (
    location.pathname === '/get-a-quote' ||
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/owner')
  ) {
    return null;
  }

  return (
    <aside
      aria-label="Quick Quote Access"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none pointer-events-auto"
    >
      <Link
        to="/get-a-quote"
        className="group flex flex-col items-center justify-center bg-white hover:bg-[#FAFAF8] text-[#111111] py-3 px-1.5 sm:py-4 sm:px-2.5 rounded-l-xl rounded-r-none border-y border-l border-[#E5E5E3] hover:border-[#E11D2E] shadow-[-2px_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[-4px_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-x-1 sm:hover:-translate-x-1.5 cursor-pointer"
        id="floating-edge-quote-btn"
        title="Get a Quote from DIGITEX"
      >
        {/* Pulsing Crimson Indicator Accent */}
        <span className="relative flex h-2 w-2 mb-2 sm:mb-2.5 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D2E] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E11D2E]" />
        </span>

        {/* Vertical Rotated Text */}
        <span
          className="[writing-mode:vertical-rl] font-bold text-[9px] sm:text-[11px] tracking-[0.24em] text-[#111111] group-hover:text-[#E11D2E] uppercase transition-colors select-none py-1"
        >
          GET A QUOTE
        </span>

        {/* Directional Arrow Accent */}
        <ArrowRight
          className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E11D2E] rotate-90 mt-1.5 sm:mt-2 group-hover:translate-y-0.5 transition-all shrink-0"
          aria-hidden="true"
        />
      </Link>
    </aside>
  );
};
