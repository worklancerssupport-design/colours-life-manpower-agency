import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import servicesData from '@/data/services.json';

export default function ServicesTicker() {
  const total = servicesData.length;
  const list = servicesData.map((s) => s.navTitle).join(' · ');

  return (
    <div className="services-strip" aria-label="Services offered by Colours Life Manpower Agency">
      <div className="container services-strip-inner">
        <p className="services-strip-text">
          <span className="services-strip-count">{total} services</span>
          <span className="services-strip-list">{list}</span>
        </p>
        <Link href="/services/" className="services-strip-link">
          Explore all
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}