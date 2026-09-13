import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false,
}) => {
  const sizeClasses = {
    sm: 'text-lg tracking-tight',
    md: 'text-xl tracking-tight',
    lg: 'text-2xl tracking-tight',
  };

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <div className="flex items-center gap-1.5 font-extrabold text-[#111111]">
        <span className={`font-black ${sizeClasses[size]}`}>DIGITEX</span>
        <span className="inline-block w-2 h-2 rounded-full bg-[#E51B23]" />
      </div>
      {showSubtitle && (
        <span className="text-[11px] font-medium tracking-wider uppercase text-[#777777] mt-0.5">
          Digital Solutions & Marketing
        </span>
      )}
    </div>
  );
};
