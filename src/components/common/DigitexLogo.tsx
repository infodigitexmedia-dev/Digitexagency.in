import React from 'react';
import { Link } from 'react-router-dom';

interface DigitexLogoProps {
  variant?: 'light' | 'dark' | 'symbol-only' | 'icon-badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withTagline?: boolean;
  className?: string;
  clickable?: boolean;
}

export const DigitexSymbol: React.FC<{
  className?: string;
  theme?: 'dark-on-light' | 'light-on-dark';
  size?: number;
  useBadge?: boolean;
}> = ({ className = '', theme = 'dark-on-light', size = 36, useBadge = false }) => {
  const isLightOnDark = theme === 'light-on-dark';
  const symbolSrc = isLightOnDark ? '/assets/digitex-symbol-dark.png' : '/assets/digitex-symbol-light.png';

  if (useBadge) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 aspect-square rounded-[22%] bg-[#111111] flex items-center justify-center p-[14%] transition-transform duration-200 ${className}`}
        aria-hidden="true"
      >
        <img
          src="/assets/digitex-symbol-dark.png"
          alt="DIGITEX"
          width={Math.round(size * 0.72)}
          height={Math.round(size * 0.72)}
          className="w-full h-full object-contain pointer-events-none select-none"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <img
      src={symbolSrc}
      alt="DIGITEX"
      style={{ width: size, height: 'auto' }}
      className={`shrink-0 transition-transform duration-200 object-contain pointer-events-none select-none ${className}`}
      loading="eager"
      decoding="async"
      aria-hidden="true"
    />
  );
};

export const DigitexLogo: React.FC<DigitexLogoProps> = ({
  variant = 'dark',
  size = 'md',
  withTagline = true,
  className = '',
  clickable = true,
}) => {
  // 'dark' variant = displayed on dark backgrounds (uses the white+red logo version)
  // 'light' variant = displayed on light backgrounds (uses the charcoal+red logo version)
  const isDarkBg = variant === 'dark';
  const isIconOnly = variant === 'symbol-only' || variant === 'icon-badge';

  const sizeConfigs = {
    sm: { height: 32, symbolSize: 28 },
    md: { height: 38, symbolSize: 34 },
    lg: { height: 48, symbolSize: 42 },
    xl: { height: 60, symbolSize: 52 },
  };

  const { height, symbolSize } = sizeConfigs[size];

  if (isIconOnly) {
    const symbolElement = (
      <DigitexSymbol
        size={symbolSize}
        theme={isDarkBg ? 'light-on-dark' : 'dark-on-light'}
        useBadge={variant === 'icon-badge'}
        className={className}
      />
    );

    if (clickable) {
      return (
        <Link
          to="/"
          className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E] rounded"
          title="DIGITEX - Home"
        >
          {symbolElement}
        </Link>
      );
    }
    return symbolElement;
  }

  // Official logo image assets
  const logoSrc = isDarkBg
    ? withTagline
      ? '/assets/digitex-logo-dark.png'
      : '/assets/digitex-wordmark-dark.png'
    : withTagline
      ? '/assets/digitex-logo-light.png'
      : '/assets/digitex-wordmark-light.png';

  const content = withTagline ? (
    <div className={`inline-flex items-center select-none group ${className}`}>
      <img
        src={logoSrc}
        alt="DIGITEX - Digital Solutions & Marketing Agency"
        style={{ height }}
        className="w-auto max-w-[70vw] sm:max-w-none object-contain transition-transform duration-200 group-hover:scale-[1.02] pointer-events-none select-none"
        loading="eager"
        decoding="async"
      />
    </div>
  ) : (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}>
      <DigitexSymbol
        size={symbolSize}
        theme={isDarkBg ? 'light-on-dark' : 'dark-on-light'}
        className="group-hover:scale-105"
      />
      <img
        src={logoSrc}
        alt="DIGITEX"
        style={{ height: Math.round(height * 0.65) }}
        className="w-auto object-contain pointer-events-none select-none"
        loading="eager"
        decoding="async"
      />
    </div>
  );

  if (clickable) {
    return (
      <Link
        to="/"
        className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E] rounded"
        title="DIGITEX - Home"
        id="nav-logo-link"
      >
        {content}
      </Link>
    );
  }

  return content;
};

