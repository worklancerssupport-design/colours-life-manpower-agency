import Link from 'next/link';
import areasData from '@/data/areas.json';
import agencyInfo from '@/data/agency.json';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { MapPin, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Areas We Serve | Domestic Help Across Chennai',
  description: 'Domestic help services across Chennai — Adyar, Velachery, OMR, Thiruvanmiyur, and more. Verified cooks, maids, nannies, and caregivers in your neighbourhood.',
  alternates: {
    canonical: `${agencyInfo.siteUrl}/areas/`,
  },
};

export default function AreasPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Areas', url: '/areas/' },
  ];

  return (
    <div className="svc-page" style={{ '--svc-accent': 'var(--blue-500)' }}>
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="service-hero-editorial svc-hero svc-hero-split">
        <div className="svc-hero-content">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-mark" aria-hidden="true" />
            Service areas
          </span>
          <h1 className="hero-headline-serif" style={{ fontSize: '2.6rem' }}>
            Domestic help across <em>Chennai.</em>
          </h1>
          <p className="hero-body-text">
            We place verified home cooks, maids, nannies, caregivers, and drivers across Chennai and OMR. Find your neighbourhood below or message us to check availability.
          </p>
          <div className="hero-button-group">
            <a href={`tel:${agencyInfo.phone1}`} className="btn-lime">
              Call {agencyInfo.phoneDisplay1}
            </a>
          </div>
        </div>
        <div className="svc-hero-media">
          <div style={{ width: '100%', height: '100%', minHeight: '360px', background: 'var(--ink-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px', padding: '40px' }}>
            <div style={{ color: '#fff', textAlign: 'center' }}>
              <MapPin size={48} style={{ opacity: 0.6, marginBottom: '16px' }} />
              <div style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.4 }}>All of Chennai<br />& OMR Corridor</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container">
          <h2 className="section-heading">Choose your <em>area</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '32px' }}>
            {areasData.map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}/`} style={{ display: 'block', padding: '28px', background: '#fff', borderRadius: '16px', border: '1px solid var(--line-light)', textDecoration: 'none', color: 'var(--ink-900)' }}>
                <div style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {area.name} <ArrowRight size={15} style={{ color: 'var(--blue-500)' }} />
                </div>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--ink-600)', marginBottom: '12px' }}>
                  {area.about.slice(0, 120)}...
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {area.nearby.slice(0, 4).map((n) => (
                    <span key={n} style={{ padding: '4px 10px', background: 'var(--sage-50)', borderRadius: '12px', fontSize: '0.78rem', color: 'var(--ink-600)' }}>{n}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '40px', padding: '24px', background: 'var(--sage-50)', borderRadius: '16px', textAlign: 'center' }}>
            <p style={{ fontSize: '1rem', color: 'var(--ink-700)' }}>
              We also serve: {agencyInfo.serviceAreas.filter((a) => a !== 'All Over Chennai' && !areasData.some((ar) => a === ar.name)).slice(0, 15).join(' · ')} and more.
            </p>
          </div>
        </div>
      </section>

      <WhatsAppCTA
        eyebrow="Serving all of Chennai"
        title="Don't see your area? We probably cover it."
        subtitle={`Call ${agencyInfo.phoneDisplay1} or message on WhatsApp to confirm availability in your locality.`}
        customMessage="Hello, do you provide domestic help services in my area?"
        buttonText="Check My Area on WhatsApp"
      />
    </div>
  );
}
