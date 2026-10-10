import Link from 'next/link';
import agencyInfo from '@/data/agency.json';

const brandNameHead = agencyInfo.name.split(' ').slice(0, 2);
const brandNameTail = agencyInfo.name.split(' ').slice(2).join(' ');

export default function Logo({ variant = 'default' }) {
  return (
    <Link
      href="/"
      className="brand-link"
      aria-label={`${agencyInfo.name} home`}
      title={agencyInfo.name}
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
          <circle cx="12" cy="11.5" r="2.2" fill="var(--ink-900)" />
        </svg>
      </span>
      <span className="brand-wordmark">
        <span className="brand-wordmark-name">
          {brandNameHead[0]} <span className="brand-wordmark-life">{brandNameHead[1]}</span>
        </span>
        <span className="brand-wordmark-tag">{brandNameTail}</span>
      </span>
    </Link>
  );
}
