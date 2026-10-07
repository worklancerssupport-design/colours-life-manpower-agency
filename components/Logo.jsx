import Link from 'next/link';

export default function Logo({ variant = 'default' }) {
  return (
    <Link
      href="/"
      className="brand-link"
      aria-label="Colours Life Manpower Agency home"
      title="Colours Life Manpower Agency"
    >
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 3 L19 9 C19 14 16 19 12 21 C8 19 5 14 5 9 Z"
            fill="currentColor"
            opacity="0.18"
          />
          <path
            d="M12 6.5 L16.6 10.4 C16.6 13.6 14.8 16.6 12 18 C9.2 16.6 7.4 13.6 7.4 10.4 Z"
            fill="currentColor"
          />
          <circle cx="12" cy="11.5" r="2.2" fill="#0B2A26" />
        </svg>
      </span>
      <span className="brand-wordmark">
        <span className="brand-wordmark-name">
          Colours <span className="brand-wordmark-life">Life</span>
        </span>
        <span className="brand-wordmark-tag">Manpower Agency</span>
      </span>
    </Link>
  );
}