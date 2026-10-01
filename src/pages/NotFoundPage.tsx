import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DigitexSymbol } from '../components/common/DigitexLogo';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#FAFAF8] px-4 py-16 sm:py-24">
      <div className="max-w-md w-full bg-white border border-[#E5E5E3] rounded-2xl p-8 sm:p-12 text-center shadow-xs">
        {/* Optional DIGITEX Logo / Symbol */}
        <div className="flex justify-center mb-6">
          <DigitexSymbol size={44} theme="dark-on-light" />
        </div>

        {/* 404 Number */}
        <div className="text-6xl sm:text-7xl font-extrabold text-[#E11D2E] tracking-tight font-sans mb-3">
          404
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] font-sans tracking-tight mb-3">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#6B7280] font-sans leading-relaxed mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        {/* Primary CTA Button */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white bg-[#E11D2E] hover:bg-[#B91C2B] transition-colors shadow-xs font-sans"
            id="not-found-home-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
