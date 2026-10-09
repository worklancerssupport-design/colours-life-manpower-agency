import Link from 'next/link';
import SmartImage from '@/components/SmartImage';
import agencyInfo from '@/data/agency.json';
import { getAllServices } from '@/lib/services';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function OtherServices({ currentServiceSlug }) {
  // Exclude current service from the list
  const otherServices = getAllServices().filter((svc) => svc.slug !== currentServiceSlug);

  return (
    <section className="section section-cream" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-intro-header">
          <span className="eyebrow-pill eyebrow-warm">
            <Sparkles size={13} /> Complete Domestic Staffing
          </span>
          <h2 className="section-heading-serif">
            Looking for Other Home Services?
          </h2>
          <p className="section-subtext">
            Looking for additional household assistance in {agencyInfo.address.city}? Discover our other dedicated home care and domestic support categories:
          </p>
        </div>

        <div className="other-services-grid">
          {otherServices.map((service) => (
            <div
              key={service.id}
              className="other-service-card"
              style={{ '--svc-accent': service.accentColor }}
            >
              <div className="other-service-card-media">
                <SmartImage
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(6px)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)'
                }}>
                  {service.shortName}
                </span>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>
                  <Link href={service.path} style={{ transition: 'var(--transition-smooth)' }}>
                    {service.navTitle}
                  </Link>
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px', flexGrow: 1 }}>
                  {service.shortDescription}
                </p>

                <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                  <Link 
                    href={service.path}
                    className="bento-explore-link"
                    style={{ fontSize: '0.88rem' }}
                  >
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
