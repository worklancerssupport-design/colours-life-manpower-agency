'use client';

import Link from 'next/link';
import servicesData from '@/data/services.json';
import { ArrowUpRight } from 'lucide-react';

export default function ServiceRows() {
  return (
    <section className="service-rows" id="services" aria-label="Service categories">
      <div className="container">
        <div style={{ maxWidth: 720, marginBottom: 36 }}>
          <span className="section-eyebrow">
            <span className="section-eyebrow-mark" />
            What we place
          </span>
          <h2 className="section-heading">
            Eight Services. <em>One Promise.</em>
          </h2>
          <p className="section-subline">
            Cooks, nannies, attendants, maids and drivers — matched by the founder, placed in days.
          </p>
        </div>

        <div>
          {servicesData.map((svc, idx) => (
            <Link
              key={svc.id}
              href={svc.path}
              className="service-row"
              aria-label={`Explore ${svc.navTitle}`}
            >
              <span className="service-row-num">{String(idx + 1).padStart(2, '0')}</span>
              <span className="service-row-title">{svc.shortName}</span>
              <span className="service-row-desc">{svc.shortDescription}</span>
              <span className="service-row-arrow" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}