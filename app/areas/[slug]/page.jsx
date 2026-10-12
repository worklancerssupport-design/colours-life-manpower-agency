import { notFound } from 'next/navigation';
import Link from 'next/link';
import areasData from '@/data/areas.json';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { Phone, MessageCircle, Check, ArrowRight, MapPin, ShieldCheck, Clock } from 'lucide-react';

export async function generateStaticParams() {
  return areasData.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }) {
  const area = areasData.find((a) => a.slug === params.slug);
  if (!area) return {};
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: {
      canonical: `${agencyInfo.siteUrl}/areas/${area.slug}/`,
    },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `${agencyInfo.siteUrl}/areas/${area.slug}/`,
    },
  };
}

export default function AreaPage({ params }) {
  const area = areasData.find((a) => a.slug === params.slug);
  if (!area) notFound();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Areas', url: '/areas/' },
    { name: area.name, url: `/areas/${area.slug}/` },
  ];

  return (
    <div className="svc-page" style={{ '--svc-accent': 'var(--blue-500)' }}>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="service-hero-editorial svc-hero svc-hero-split">
        <div className="svc-hero-content">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-mark" aria-hidden="true" />
            <MapPin size={13} /> {area.name}, Chennai
          </span>
          <h1 className="hero-headline-serif" style={{ fontSize: '2.6rem' }}>
            {area.h1.split(' ').slice(0, -1).join(' ')}{' '}
            <em>{area.h1.split(' ').slice(-1)}</em>
          </h1>
          <p className="hero-body-text">{area.heroSubtitle}</p>
          <div className="hero-button-group">
            <a href={getWhatsAppUrl(`Hello, I need domestic help services in ${area.name}, Chennai.`)} target="_blank" rel="noopener noreferrer" className="btn-lime">
              <MessageCircle size={16} /> Get Help in {area.name}
            </a>
            <a href={`tel:${agencyInfo.phone1}`} className="btn-secondary-pill">
              <Phone size={16} /> Call {agencyInfo.phoneDisplay1}
            </a>
          </div>
          <p className="hero-cta-micro">
            WhatsApp answered {agencyInfo.hours}, {agencyInfo.responseTime}
          </p>
        </div>
        <div className="svc-hero-media">
          <div style={{ width: '100%', height: '100%', minHeight: '400px', background: 'var(--ink-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px', padding: '40px' }}>
            <div style={{ color: '#fff', textAlign: 'center' }}>
              <MapPin size={48} style={{ opacity: 0.6, marginBottom: '16px' }} />
              <div style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2 }}>{area.name}</div>
              <div style={{ opacity: 0.6, marginTop: '8px', fontSize: '1rem' }}>Chennai, Tamil Nadu</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
                {area.nearby.slice(0, 5).map((n) => (
                  <span key={n} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '0.8rem' }}>{n}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the area */}
      <section className="section-light">
        <div className="container">
          <h2 className="section-heading">Domestic help in <em>{area.name}</em></h2>
          <p className="section-subline" style={{ maxWidth: '760px' }}>{area.about}</p>
        </div>
      </section>

      {/* Services available in this area */}
      <section className="section-light" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="section-heading">Services available in <em>{area.name}</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '32px' }}>
            {area.services.map((svc, i) => (
              <Link key={i} href={svc.link} style={{ display: 'block', padding: '28px', background: '#fff', borderRadius: '16px', border: '1px solid var(--line-light)', textDecoration: 'none', color: 'var(--ink-900)', transition: 'border-color 0.2s' }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {svc.name} <ArrowRight size={15} style={{ color: 'var(--blue-500)' }} />
                </div>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--ink-600)' }}>{svc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us in this area */}
      <section className="section-dark verify-band">
        <div className="container">
          <h2 className="section-heading verify-heading">Why {area.name} families choose us</h2>
          <div className="verify-grid">
            <div className="verify-col">
              <h3 className="verify-col-title">
                <ShieldCheck size={17} aria-hidden="true" />
                Every helper is verified
              </h3>
              <ul className="verify-list">
                {[
                  'Aadhaar government identity check',
                  'Residential background verification',
                  'Prior-work references spoken to, where available',
                  'Local candidates familiar with the area',
                ].map((item, i) => (
                  <li key={i} className="verify-item">
                    <span className="verify-item-mark" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="verify-col">
              <h3 className="verify-col-title">
                <Clock size={17} aria-hidden="true" />
                Fast placement
              </h3>
              <ul className="verify-list">
                {[
                  `Placements typically within days in ${area.name}`,
                  'Part-time, full-time, and live-in options',
                  'Direct WhatsApp communication',
                  'Replacement support if the fit isn\'t right',
                ].map((item, i) => (
                  <li key={i} className="verify-item">
                    <span className="verify-item-mark" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="section-light">
        <div className="container">
          <h2 className="section-heading">We also serve nearby <em>areas</em></h2>
          <div className="local-tag-cloud coverage-tags" style={{ marginTop: '20px' }}>
            {area.nearby.map((n) => (
              <span key={n} className="local-locality-tag">{n}</span>
            ))}
          </div>
          <p style={{ marginTop: '20px', fontSize: '0.92rem', color: 'var(--ink-600)' }}>
            Don&apos;t see your area? <Link href="/contact/" style={{ color: 'var(--blue-500)', fontWeight: 600 }}>Contact us</Link> — we likely cover your locality too.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <WhatsAppCTA
        eyebrow={`${area.name}, Chennai`}
        title={`Need domestic help in ${area.name}?`}
        subtitle={`Message us on WhatsApp or call ${agencyInfo.phoneDisplay1}. Tell us your requirements and we'll shortlist verified helpers in ${area.name} and surrounding areas.`}
        customMessage={`Hello, I need domestic help services in ${area.name}, Chennai.`}
        buttonText={`Get Help in ${area.name}`}
      />
    </div>
  );
}
