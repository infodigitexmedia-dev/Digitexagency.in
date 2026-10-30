import React from 'react';

// ==========================================
// PARTNER ECOSYSTEM LOGOS (HIGH-FIDELITY OFFICIAL BRAND MARKS)
// ==========================================

export const AwsLogo: React.FC<{ className?: string; showText?: boolean }> = ({
  className = 'h-7 w-auto',
  showText = true,
}) => (
  <div className="inline-flex items-center gap-2">
    <svg viewBox="0 0 65 39" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Amazon Web Services">
      {/* AWS Bold Letters */}
      <path
        d="M17.5 17.2c0-2.6-1.5-4-4.2-4-2.6 0-4.9 1.4-6.4 2.7l1.3 2.6c1.2-1 2.9-1.9 4.6-1.9 1.7 0 2.4.7 2.4 1.8v.5c-4.9.4-7.8 2-7.8 5.2 0 2.9 2.1 4.5 4.8 4.5 2.2 0 3.9-1 4.8-2.5v2.1h3.2l-.1-11h-2.6v.5zm-2.7 7.1c-.5 1.3-2 2.2-3.4 2.2-1.3 0-2.4-.8-2.4-2.2 0-1.7 1.7-2.8 5.3-3l.5 3zM33.8 28.5L29.7 13.8h-3.3l-4.1 14.7h3.2l1-4.1h4.1l1 4.1h3.4zm-6.4-6.8l1.3-5.6 1.3 5.6h-2.6zm21-7.8l-3 10.7-3.2-10.7h-3.2l-3.2 10.7-3-10.7h-3.5l4.8 14.7h3.4l3.2-10.3 3.2 10.3h3.4l4.8-14.7h-3.7z"
        fill="#111111"
      />
      {/* AWS Smile Arrow */}
      <path
        d="M43.4 29.5c-6.5 4.1-15.9 6.2-24 6.2-11.3 0-21.5-4.1-29.3-10.8-.5-.5-.1-1.3.6-.9 7.7 4.3 17.1 6.8 26.8 6.8 7.5 0 15.8-1.8 23.2-5.6 1.2-.6 2.2.8 1.3 1.7l1.4 2.6z"
        fill="#FF9900"
      />
      <path
        d="M45.7 27.4c-.6-.9-4.1-.5-5.7-.2-.4.1-.5-.4-.2-.6 2.4-1.7 6.3-.1.3 6.9-.4.5.7-.2 4.8-2.4 6.7-.4.3-.6.2-.5-.3.4-1.4 1.4-4.1 1.9-5.1z"
        fill="#FF9900"
      />
    </svg>
    {showText && (
      <span className="text-[11px] font-bold tracking-tight text-[#111111] hidden sm:inline">
        Cloud
      </span>
    )}
  </div>
);

export const GoogleCloudLogo: React.FC<{ className?: string; showText?: boolean }> = ({
  className = 'h-7 w-auto',
  showText = true,
}) => (
  <div className="inline-flex items-center gap-2">
    <svg viewBox="0 0 48 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Google Cloud">
      {/* Google 4-Color Cloud Mark */}
      <path
        d="M35.5 17c-.8-6.1-6-10.5-12.5-10.5-5.2 0-9.6 2.9-11.5 7.2C5 14.4 0.5 19.5 0.5 25.5 0.5 32 5.8 37.5 12.5 37.5h22c6 0 11-4.8 11-11 0-5.3-3.9-9.8-9.2-10.5z"
        fill="#4285F4"
        fillOpacity="0.15"
      />
      <path
        d="M23 6.5c5.1 0 9.5 3.3 11.1 7.8l1.6-.1c4.8 0 8.8 4 8.8 8.8 0 4.5-3.4 8.2-7.8 8.7H12.5C7.3 31.7 3 27.4 3 22.2c0-4.8 3.7-8.8 8.4-9.3 1.6-4 5.6-6.7 10-6.7z"
        stroke="#4285F4"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <circle cx="15.5" cy="22" r="3" fill="#EA4335" />
      <circle cx="23" cy="17" r="3" fill="#FBBC05" />
      <circle cx="30.5" cy="22" r="3" fill="#34A853" />
    </svg>
    {showText && (
      <span className="text-[11px] font-bold tracking-tight text-[#111111] hidden sm:inline">
        Google Cloud
      </span>
    )}
  </div>
);

export const MicrosoftLogo: React.FC<{ className?: string; showText?: boolean }> = ({
  className = 'h-6 w-auto',
  showText = true,
}) => (
  <div className="inline-flex items-center gap-2">
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Microsoft Azure">
      <rect x="2" y="2" width="13" height="13" rx="1.5" fill="#F25022" />
      <rect x="17" y="2" width="13" height="13" rx="1.5" fill="#7FBA00" />
      <rect x="2" y="17" width="13" height="13" rx="1.5" fill="#00A4EF" />
      <rect x="17" y="17" width="13" height="13" rx="1.5" fill="#FFB900" />
    </svg>
    {showText && (
      <span className="text-[11px] font-bold tracking-tight text-[#111111] hidden sm:inline">
        Azure
      </span>
    )}
  </div>
);

export const VercelLogo: React.FC<{ className?: string; showText?: boolean }> = ({
  className = 'h-6 w-auto',
  showText = true,
}) => (
  <div className="inline-flex items-center gap-2">
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Vercel">
      <path d="M16 4L30 28H2L16 4Z" fill="#111111" />
    </svg>
    {showText && (
      <span className="text-[11px] font-bold tracking-tight text-[#111111] hidden sm:inline">
        Vercel
      </span>
    )}
  </div>
);

export const ShopifyPlusLogo: React.FC<{ className?: string; showText?: boolean }> = ({
  className = 'h-7 w-auto',
  showText = true,
}) => (
  <div className="inline-flex items-center gap-2">
    <svg viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Shopify Plus">
      <rect x="2" y="7" width="32" height="31" rx="6" fill="#95BF47" />
      <path
        d="M23 7c0-3.3-2.2-6-5-6s-5 2.7-5 6"
        stroke="#5E8E3E"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M21.5 18.5c-.2-.2-1-.6-2.2-.6-2 0-3.3 1.1-3.3 2.7 0 2.8 4.8 2.2 4.8 5.2 0 1.6-1.3 2.7-3.4 2.7-2.1 0-3.3-1-3.5-1.2l.6-2.1c.4.3 1.4.8 2.5.8 1.4 0 2.1-.7 2.1-1.5 0-2.8-4.7-2.1-4.7-5.2 0-2.3 1.8-3.9 4.6-3.9 1.6 0 2.8.5 3.1.7l-.6 2.4z"
        fill="#FFFFFF"
      />
    </svg>
    {showText && (
      <span className="text-[11px] font-bold tracking-tight text-[#111111] hidden sm:inline">
        Shopify Plus
      </span>
    )}
  </div>
);

export const StripeLogo: React.FC<{ className?: string; showText?: boolean }> = ({
  className = 'h-7 w-auto',
  showText = true,
}) => (
  <div className="inline-flex items-center gap-2">
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Stripe">
      <rect width="36" height="36" rx="8" fill="#635BFF" />
      <path
        d="M23.5 15.2c0-2.6-1.5-3.8-3.8-3.8-2.6 0-4.3 1.5-4.3 3.6 0 4 5.7 3.2 5.7 6.1 0 1.4-1.2 2-2.5 2-1.7 0-3.3-.8-4-1.5l-.8 2.8c1 .8 2.8 1.4 4.7 1.4 3 0 4.9-1.5 4.9-4.1 0-4.3-5.7-3.3-5.7-6.2 0-1.1.9-1.6 2-1.6 1.4 0 2.7.6 3.4 1.1l.4-1.7z"
        fill="#FFFFFF"
      />
    </svg>
    {showText && (
      <span className="text-[11px] font-bold tracking-tight text-[#111111] hidden sm:inline">
        Stripe
      </span>
    )}
  </div>
);

export const MetaLogo: React.FC<{ className?: string; showText?: boolean }> = ({
  className = 'h-6 w-auto',
  showText = true,
}) => (
  <div className="inline-flex items-center gap-2">
    <svg viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Meta">
      <path
        d="M24.8 2.6c-3.1 0-5.8 1.8-7.8 4.4C15 4.4 12.3 2.6 9.2 2.6 4.3 2.6 0.5 6.7 0.5 11.8c0 6.2 5.1 11.5 11.5 11.5 3.9 0 7.1-1.9 8.8-4.8 1.7 2.9 4.9 4.8 8.8 4.8 6.4 0 11.5-5.3 11.5-11.5 0-5.1-3.9-9.2-8.7-9.2zm-15.5 16c-3.5 0-6.4-3.1-6.4-6.9 0-3.9 2.9-6.9 6.4-6.9 2.6 0 4.9 1.7 5.9 4.2-1.3 2.2-3.2 5.4-5.9 9.6zm15.5 0c-2.7-4.1-4.7-7.3-5.9-9.5 1-2.5 3.3-4.2 5.9-4.2 3.5 0 6.4 3.1 6.4 6.9 0 3.8-2.9 6.8-6.4 6.8z"
        fill="#0668E1"
      />
    </svg>
    {showText && (
      <span className="text-[11px] font-bold tracking-tight text-[#111111] hidden sm:inline">
        Meta
      </span>
    )}
  </div>
);

export const AppleLogo: React.FC<{ className?: string; showText?: boolean }> = ({
  className = 'h-6 w-auto',
  showText = true,
}) => (
  <div className="inline-flex items-center gap-2">
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Apple">
      <path
        d="M20.8 16.6c0-3.6 2.9-5.3 3-5.4-1.7-2.4-4.2-2.7-5.1-2.8-2.2-.2-4.3 1.3-5.4 1.3-1.1 0-2.8-1.3-4.6-1.3C6.3 8.4 4 10 2.9 12c-2.3 3.9-.6 9.8 1.6 13 1.1 1.6 2.4 3.3 4.1 3.2 1.6-.1 2.3-1 4.2-1s2.6 1 4.3 1c1.8 0 2.9-1.5 4-3.1 1.3-1.8 1.8-3.6 1.8-3.7-.1-.1-3.5-1.3-3.5-5.3z"
        fill="#111111"
      />
      <path
        d="M18.4 5.9c.9-1.2 1.6-2.8 1.4-4.4-1.4.1-3 1-3.9 2-.8 1-1.6 2.6-1.4 4.2 1.6.1 3.1-.7 3.9-1.8z"
        fill="#111111"
      />
    </svg>
    {showText && (
      <span className="text-[11px] font-bold tracking-tight text-[#111111] hidden sm:inline">
        Apple
      </span>
    )}
  </div>
);

// ==========================================
// INDIVIDUAL TECHNOLOGY LOGOS (CRISP OFFICIAL SVGs)
// ==========================================

export const ReactLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="React">
    <ellipse cx="50" cy="50" rx="46" ry="17" stroke="#61DAFB" strokeWidth="5.5" />
    <ellipse cx="50" cy="50" rx="46" ry="17" stroke="#61DAFB" strokeWidth="5.5" transform="rotate(60 50 50)" />
    <ellipse cx="50" cy="50" rx="46" ry="17" stroke="#61DAFB" strokeWidth="5.5" transform="rotate(120 50 50)" />
    <circle cx="50" cy="50" r="8" fill="#61DAFB" />
  </svg>
);

export const NextjsLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Next.js">
    <circle cx="50" cy="50" r="48" fill="#000000" />
    <path d="M68 69L38 31H32V69H38V41.5L64 74C65.4 72.5 66.8 70.8 68 69Z" fill="#FFFFFF" />
    <rect x="62" y="31" width="6" height="24" fill="#FFFFFF" />
  </svg>
);

export const TypeScriptLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="TypeScript">
    <rect width="100" height="100" rx="18" fill="#3178C6" />
    <path d="M42 38H22V30H66V38H46V74H36V38H42Z" fill="#FFFFFF" />
    <path d="M82 43C82 39 79 36 73 36C67 36 63 39 63 44C63 54 82 50 82 63C82 71 74 75 66 75C57 75 52 70 51 64L59 60C60 64 63 67 67 67C71 67 74 65 74 62C74 53 55 56 55 43C55 35 63 30 73 30C81 30 87 34 89 41L82 43Z" fill="#FFFFFF" />
  </svg>
);

export const PythonLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Python">
    <path d="M49 6C28 6 29 15 29 15L29 24H50V27H20C10 27 6 36 6 47C6 58 14 60 14 60H21V51C21 40 30 40 30 40H51C60 40 60 30 60 30V15C60 6 49 6 49 6ZM39 12C42 12 44 14 44 17C44 20 42 22 39 22C36 22 34 20 34 17C34 14 36 12 39 12Z" fill="#3776AB" />
    <path d="M51 94C72 94 71 85 71 85L71 76H50V73H80C90 73 94 64 94 53C94 42 86 40 86 40H79V49C79 60 70 60 70 60H49C40 60 40 70 40 70V85C40 94 51 94 51 94ZM61 88C58 88 56 86 56 83C56 80 58 78 61 78C64 78 66 80 66 83C66 86 64 88 61 88Z" fill="#FFD43B" />
  </svg>
);

export const TailwindLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Tailwind CSS">
    <path d="M26 13c5.3-7.5 12-10 20-7.5 5 1.5 8.6 5.2 12.6 9.3C65 21.2 72.8 29 88 29c-5.3 7.5-12 10-20 7.5-5-1.5-8.6-5.2-12.6-9.3C49 20.8 41.2 13 26 13zM6 34c5.3-7.5 12-10 20-7.5 5 1.5 8.6 5.2 12.6 9.3C45 42.2 52.8 50 68 50c-5.3 7.5-12 10-20 7.5-5-1.5-8.6-5.2-12.6-9.3C29 41.8 21.2 34 6 34z" fill="#06B6D4" />
  </svg>
);

export const FlutterLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Flutter">
    <path d="M57 6L14 49L27 62L83 6H57Z" fill="#47C5FB" />
    <path d="M57 56L34 79L47 92L83 56H57Z" fill="#47C5FB" />
    <path d="M47 92L62 77L83 98H57L47 92Z" fill="#00569E" />
    <path d="M46 78L62 77L46 61L34 73L46 78Z" fill="#02569B" />
  </svg>
);

export const DockerLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Docker">
    <rect x="24" y="22" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="37" y="22" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="50" y="22" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="24" y="10" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="37" y="10" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="50" y="10" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="37" y="-2" width="10" height="9" rx="1.5" fill="#2496ED" />
    <path d="M96 38c-2.4-1.8-7.7-1.4-11.2-.4-1.7-4.8-5.8-8-11-8.2l-2.2 0c-.5 0-1 .2-1.3.6l-5.3 7h-48c-2 0-3.6 1.6-3.6 3.6 0 10.5 7.6 19.3 17.8 21.2 13.8 2.6 37.8 2.7 48.6-8.2 8-8.1 16.6-8.6 16.6-8.6-.2-2.4-2.5-5.2-4.4-7z" fill="#2496ED" />
  </svg>
);

export const PostgreSQLLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="PostgreSQL">
    <path d="M49 8c-21 0-38 17-38 38 0 16 10 30 24 35v-13c-4-2-7-6-7-11 0-7 6-13 13-13s13 6 13 13c0 5-3 9-7 11v13c14-5 24-19 24-35 0-21-17-38-38-38z" fill="#336791" />
    <circle cx="43" cy="38" r="4" fill="#FFFFFF" />
    <circle cx="55" cy="38" r="4" fill="#FFFFFF" />
    <path d="M44 52c3 3 7 3 10 0" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const SupabaseLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Supabase">
    <path d="M53 6L11 58c-2 3 0 7 4 7h32l-3 29c-1 4 4 6 7 3l42-52c2-3 0-7-4-7H56l3-29c1-4-4-6-6-3z" fill="#3ECF8E" />
  </svg>
);

export const RedisLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Redis">
    <path d="M50 10L12 28v44l38 18 38-18V28L50 10z" fill="#DC382D" />
    <path d="M50 10L12 28l38 18 38-18L50 10z" fill="#F85E53" />
    <path d="M50 46v44l38-18V28L50 46z" fill="#BA241A" />
  </svg>
);

export const FigmaLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Figma">
    <path d="M0 25C0 11.2 11.2 0 25 0h25v50H25C11.2 50 0 38.8 0 25z" fill="#F24E1E" />
    <path d="M50 0h25c13.8 0 25 11.2 25 25S88.8 50 75 50H50V0z" fill="#FF7262" />
    <path d="M50 50h25c13.8 0 25 11.2 25 25s-11.2 25-25 25H50V50z" fill="#1ABCFE" />
    <path d="M0 75c0-13.8 11.2-25 25-25h25v50H25C11.2 100 0 88.8 0 75z" fill="#A259FF" />
    <path d="M0 125c0-13.8 11.2-25 25-25h25v25c0 13.8-11.2 25-25 25S0 138.8 0 125z" fill="#0ACF83" />
  </svg>
);

export const GeminiAiLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Google Gemini AI">
    <defs>
      <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1A73E8" />
        <stop offset="50%" stopColor="#8AB4F8" />
        <stop offset="100%" stopColor="#E11D2E" />
      </linearGradient>
    </defs>
    <path d="M50 0C50 27.6 27.6 50 0 50c27.6 0 50 22.4 50 50 0-27.6 22.4-50 50-50-27.6 0-50-22.4-50-50z" fill="url(#geminiGrad)" />
    <circle cx="50" cy="50" r="9" fill="#FFFFFF" />
  </svg>
);

export const FastApiLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="FastAPI">
    <circle cx="50" cy="50" r="48" fill="#059669" />
    <path d="M56 18L30 52h18L44 82l28-34H52l4-30z" fill="#FFFFFF" />
  </svg>
);

export const SwiftLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Swift">
    <rect width="100" height="100" rx="20" fill="#F05138" />
    <path d="M84 75C70 60 52 46 30 38c14 7 24 16 30 28-20-14-42-18-50-18 24 18 48 34 74 27z" fill="#FFFFFF" />
  </svg>
);

export const KotlinLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Kotlin">
    <path d="M94 6H6v88h88L50 50l44-44z" fill="#7F52FF" />
    <path d="M50 50L6 94h88L50 50z" fill="#C711E1" />
  </svg>
);

export const ShopifyMiniLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Shopify">
    <rect width="100" height="100" rx="20" fill="#95BF47" />
    <path d="M68 28c0-1-1-1-2-1l-8-1-6-7c-1-1-3-2-5-1l-5 2c-2-5-5-9-10-9-7 0-11 7-13 14l-6 2c-2 1-2 2-2 3l8 53c0 2 2 3 4 3h36c2 0 4-1 4-3l6-56zm-20-10c4 0 6 5 7 9l-14 4c2-6 4-13 7-13z" fill="#FFFFFF" />
  </svg>
);

export const StripeMiniLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Stripe">
    <rect width="100" height="100" rx="20" fill="#635BFF" />
    <path d="M48 37c0-3 2-4 6-4s9 1 13 3l2-11c-5-2-10-3-15-3-12 0-20 6-20 16 0 15 21 13 21 20 0 3-3 4-7 4-6 0-12-2-17-5l-2 11c6 3 12 4 19 4 13 0 21-6 21-17 0-16-21-14-21-19z" fill="#FFFFFF" />
  </svg>
);

export const NodejsLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Node.js">
    <path d="M50 6L88 28V72L50 94L12 72V28L50 6Z" fill="#5FA04E" />
    <path d="M50 20L76 35V65L50 80L24 65V35L50 20Z" fill="#FFFFFF" fillOpacity="0.25" />
    <path d="M44 40h12v20H44z" fill="#FFFFFF" />
  </svg>
);

export const KubernetesLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Kubernetes">
    <circle cx="50" cy="50" r="46" fill="#326CE5" />
    <path d="M50 20L76 35V65L50 80L24 65V35L50 20Z" stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" />
    <circle cx="50" cy="50" r="10" fill="#FFFFFF" />
  </svg>
);

export const GraphQLLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="GraphQL">
    <path d="M50 8L86 29V71L50 92L14 71V29L50 8Z" stroke="#E10098" strokeWidth="6" />
    <circle cx="50" cy="8" r="7" fill="#E10098" />
    <circle cx="86" cy="29" r="7" fill="#E10098" />
    <circle cx="86" cy="71" r="7" fill="#E10098" />
    <circle cx="50" cy="92" r="7" fill="#E10098" />
    <circle cx="14" cy="71" r="7" fill="#E10098" />
    <circle cx="14" cy="29" r="7" fill="#E10098" />
  </svg>
);

// ==========================================
// PARTNER ECOSYSTEM STRIP (WITH NAMES AND ELEVATED LOGOS)
// ==========================================
export const PartnerEcosystemStrip: React.FC = () => {
  const partners = [
    { name: 'Amazon Web Services', tag: 'AWS Cloud', icon: <AwsLogo className="h-6 w-auto" showText={false} /> },
    { name: 'Google Cloud Platform', tag: 'GCP Cloud', icon: <GoogleCloudLogo className="h-6 w-auto" showText={false} /> },
    { name: 'Microsoft Azure', tag: 'Enterprise Cloud', icon: <MicrosoftLogo className="h-5 w-auto" showText={false} /> },
    { name: 'Vercel Enterprise', tag: 'Edge Deployment', icon: <VercelLogo className="h-5 w-auto" showText={false} /> },
    { name: 'Shopify Plus', tag: 'Commerce Partner', icon: <ShopifyPlusLogo className="h-6 w-auto" showText={false} /> },
    { name: 'Stripe Verified', tag: 'Payments Infrastructure', icon: <StripeLogo className="h-6 w-auto" showText={false} /> },
    { name: 'Meta Business', tag: 'Partner Network', icon: <MetaLogo className="h-5 w-auto" showText={false} /> },
    { name: 'Apple Developer', tag: 'iOS & macOS Ecosystem', icon: <AppleLogo className="h-5 w-auto" showText={false} /> },
  ];

  return (
    <section className="bg-white border-b border-[#E5E5E3] py-7 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#E11D2E] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
              Technology & Partner Systems
            </span>
          </div>

          {/* Elevated Partner Brand Badges with Names & Marks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-4 w-full lg:w-auto">
            {partners.map((partner) => (
              <div
                key={partner.name}
                title={`${partner.name} - ${partner.tag}`}
                className="group flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#FAFAF8] hover:bg-white border border-[#E5E5E3] hover:border-[#E11D2E]/40 hover:shadow-xs transition-all duration-200 cursor-default"
              >
                <div className="shrink-0 flex items-center justify-center transition-transform group-hover:scale-110">
                  {partner.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors truncate">
                    {partner.name}
                  </div>
                  <div className="text-[10px] text-[#6B7280] truncate font-medium">
                    {partner.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to return authentic logo by technology name
export const getTechLogo = (techName: string, className = 'w-5 h-5'): React.ReactNode => {
  const norm = techName.toLowerCase().trim();
  if (norm.includes('react') && !norm.includes('native')) return <ReactLogo className={className} />;
  if (norm.includes('react native')) return <ReactLogo className={className} />;
  if (norm.includes('next')) return <NextjsLogo className={className} />;
  if (norm.includes('typescript') || norm === 'ts') return <TypeScriptLogo className={className} />;
  if (norm.includes('python')) return <PythonLogo className={className} />;
  if (norm.includes('tailwind')) return <TailwindLogo className={className} />;
  if (norm.includes('node')) return <NodejsLogo className={className} />;
  if (norm.includes('flutter')) return <FlutterLogo className={className} />;
  if (norm.includes('docker')) return <DockerLogo className={className} />;
  if (norm.includes('k8s') || norm.includes('kubernetes')) return <KubernetesLogo className={className} />;
  if (norm.includes('graphql')) return <GraphQLLogo className={className} />;
  if (norm.includes('postgres') || norm.includes('sql')) return <PostgreSQLLogo className={className} />;
  if (norm.includes('supabase')) return <SupabaseLogo className={className} />;
  if (norm.includes('redis')) return <RedisLogo className={className} />;
  if (norm.includes('figma')) return <FigmaLogo className={className} />;
  if (norm.includes('gemini') || norm.includes('ai') || norm.includes('llm')) return <GeminiAiLogo className={className} />;
  if (norm.includes('fastapi')) return <FastApiLogo className={className} />;
  if (norm.includes('swift')) return <SwiftLogo className={className} />;
  if (norm.includes('kotlin')) return <KotlinLogo className={className} />;
  if (norm.includes('shopify')) return <ShopifyMiniLogo className={className} />;
  if (norm.includes('stripe')) return <StripeMiniLogo className={className} />;
  if (norm.includes('aws')) return <AwsLogo className="w-5 h-auto text-[#111111]" showText={false} />;
  if (norm.includes('gcp') || norm.includes('google')) return <GoogleCloudLogo className="w-6 h-auto" showText={false} />;
  if (norm.includes('vercel')) return <VercelLogo className="w-5 h-auto" showText={false} />;
  return null;
};
