import Link from 'next/link';

export default function Logo({ variant = 'default', isFooter = false }) {
  return (
    <Link 
      href="/" 
      className={`brand-logo-link ${isFooter ? 'logo-footer' : ''}`}
      title="Colours Life Manpower Agency - Chennai"
      aria-label="Colours Life Manpower Agency Homepage"
    >
      <div className="brand-logo-container">
        {/* Abstract Emblem: People + Connection + Care + Home */}
        <div className="brand-logo-emblem">
          <svg 
            viewBox="0 0 44 44" 
            width="28" 
            height="28" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="brand-logo-svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="logoGradPrimary" x1="4" y1="4" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FFF2EB" />
              </linearGradient>
              <linearGradient id="logoHeartGrad" x1="16" y1="20" x2="28" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFF4ED" />
                <stop offset="100%" stopColor="#FFE0D2" />
              </linearGradient>
            </defs>
            
            {/* Protective Home Arch (Care & Shelter) */}
            <path 
              d="M6 21C6 12.1634 13.1634 5 22 5C30.8366 5 38 12.1634 38 21C38 22.1 37.1 23 36 23C34.9 23 34 22.1 34 21C34 14.3726 28.6274 9 22 9C15.3726 9 10 14.3726 10 21C10 22.1 9.1 23 8 23C6.9 23 6 22.1 6 21Z" 
              fill="url(#logoGradPrimary)" 
              opacity="0.95"
            />
            
            {/* Left Caring Figure (Head & Body Curve) */}
            <circle cx="16.5" cy="17.5" r="3.2" fill="url(#logoGradPrimary)" />
            <path 
              d="M11 29.5C11 25.5 13.8 23 16.5 23C19.2 23 21 24.8 21.5 26.5" 
              stroke="url(#logoGradPrimary)" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
            />

            {/* Right Caring Figure (Head & Body Curve, Interconnected) */}
            <circle cx="27.5" cy="17.5" r="3.2" fill="url(#logoGradPrimary)" />
            <path 
              d="M33 29.5C33 25.5 30.2 23 27.5 23C24.8 23 23 24.8 22.5 26.5" 
              stroke="url(#logoGradPrimary)" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
            />

            {/* Central Heart of Care & Warmth */}
            <path 
              d="M22 34.5C22 34.5 17 31 17 28C17 26.3431 18.3431 25 20 25C20.9 25 21.6 25.4 22 26C22.4 25.4 23.1 25 24 25C25.6569 25 27 26.3431 27 28C27 31 22 34.5 22 34.5Z" 
              fill="url(#logoHeartGrad)" 
            />

            {/* Soft Sparkle of Quality / Joy */}
            <circle cx="22" cy="8.5" r="1.5" fill="#FFE5D6" />
          </svg>
        </div>

        {/* Brand Name Typography */}
        <div className="brand-logo-text-group">
          <div className="brand-title">
            <span className="brand-title-colours">Colours</span>
            <span className="brand-title-life">Life</span>
          </div>
          <span className="brand-subtitle">
            MANPOWER AGENCY
          </span>
        </div>
      </div>
    </Link>
  );
}
