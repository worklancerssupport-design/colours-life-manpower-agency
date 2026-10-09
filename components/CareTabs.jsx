'use client';

import { useState } from 'react';
import SmartImage from '@/components/SmartImage';
import Link from 'next/link';
import { getAllServices } from '@/lib/services';
import { ArrowUpRight } from 'lucide-react';

export default function CareTabs() {
  const [activeIndex, setActiveIndex] = useState(2);
  const services = getAllServices();
  const active = services[activeIndex] || services[0];

  return (
    <section className="section-dark" id="care-tabs" aria-label="Browse services">
      <div className="container">
        <div className="care-tabs-grid">
          <div>
            <span className="section-eyebrow section-eyebrow-dark">
              <span className="section-eyebrow-mark" />
              Your care, your way
            </span>
            <h2 className="section-heading section-heading-wide" style={{ color: 'var(--ink-on-dark)' }}>
              Delivered With <em>Trust</em>, Every Day.
            </h2>

            <div className="care-tabs-list" role="tablist" aria-label="Service categories">
              {services.map((svc, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={svc.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`care-tab ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveIndex(i)}
                  >
                    <span>{svc.shortName}</span>
                    <span className="care-tab-arrow" aria-hidden="true">
                      <ArrowUpRight size={14} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="care-tab-image">
            <SmartImage
              src={active.image}
              alt={active.alt}
              fill
              sizes="(max-width: 992px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
            <div className="image-label">
              {active.shortName} · {active.badge}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}