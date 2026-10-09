'use client';

import { useRef, useState } from 'react';
import SmartImage from '@/components/SmartImage';
import Link from 'next/link';
import agencyInfo from '@/data/agency.json';
import { getAllServices, getServiceListText } from '@/lib/services';
import { ArrowUpRight } from 'lucide-react';

export default function ServiceRows() {
  const services = getAllServices();
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef(null);
  const active = services[activeIndex] || services[0];
  const serviceCount = services.length;

  const selectRow = (idx) => {
    setActiveIndex(idx);
    const el = panelRef.current;
    if (!el) return;
    const stacked = window.matchMedia('(max-width: 991px)').matches;
    el.scrollIntoView({ behavior: 'smooth', block: stacked ? 'center' : 'nearest' });
  };

  return (
    <section className="service-rows" id="services" aria-label="Service categories">
      <div className="container">
        <div style={{ maxWidth: 720, marginBottom: 36 }}>
          <span className="section-eyebrow">
            <span className="section-eyebrow-mark" />
            What we place
          </span>
          <h2 className="section-heading">
            {serviceCount} Services. <em>One Promise.</em>
          </h2>
          <p className="section-subline">
            {getServiceListText()} — matched by the founder, {agencyInfo.claims.placementSpeed.toLowerCase()}.
          </p>
        </div>

        <div className="service-rows-grid">
          <div className="service-rows-list" role="tablist" aria-label="Service categories">
            {services.map((svc, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={svc.id}
                  type="button"
                  role="tab"
                  id={`service-tab-${svc.id}`}
                  aria-selected={isActive}
                  aria-controls="service-detail-panel"
                  className={`service-row ${isActive ? 'is-active' : ''}`}
                  onClick={() => selectRow(idx)}
                >
                  <span className="service-row-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="service-row-title">{svc.shortName}</span>
                  <span className="service-row-arrow" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="service-rows-panel"
            role="tabpanel"
            id="service-detail-panel"
            aria-labelledby={`service-tab-${active.id}`}
            ref={panelRef}
          >
            <div className="service-rows-figure" key={active.id}>
              <SmartImage
                src={active.image}
                alt={active.alt}
                fill
                sizes="(max-width: 991px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <p className="service-rows-panel-desc">{active.shortDescription}</p>
            <Link href={active.path} className="service-rows-more">
              See more in detail
              <span className="service-rows-more-arrow" aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
