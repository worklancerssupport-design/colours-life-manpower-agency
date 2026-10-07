import Link from 'next/link';
import Image from 'next/image';
import servicesData from '@/data/services.json';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Domestic Help & Manpower Services in Chennai | Colours Life Manpower Agency",
  description: "Explore all domestic manpower services in Chennai: cooks, newborn baby care, baby caretakers, elderly attendants, maids, Brahmin cooks, patient caregivers, and drivers.",
  alternates: {
    canonical: `${agencyInfo.siteUrl}/services/`,
  }
};

export default function ServicesIndexPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/' }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Services Header */}
      <section className="service-hero-editorial theme-cooking">
        <div className="container">
          <nav className="breadcrumbs-pill" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span style={{ color: 'var(--text-light)' }}>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>Services</span>
          </nav>

          <div className="section-intro-header" style={{ marginBottom: '20px' }}>
            <span className="eyebrow-pill eyebrow-warm">
              <Sparkles size={14} /> Complete Domestic Staffing
            </span>
            <h1 className="hero-headline-serif" style={{ fontSize: '3rem' }}>
              Household & Manpower Services in <em>Chennai</em>
            </h1>
            <p className="section-subtext">
              Colours Life Manpower Agency connects families in Okkiyam Thoraipakkam, OMR, and Chennai with reliable, experienced domestic helpers tailored to your specific family requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid (Pastel Peach Background) */}
      <section className="section section-peach">
        <div className="container">
          <div className="bento-services-grid">
            {servicesData.map((svc) => (
              <div key={svc.id} className="bento-card bento-span-6">
                <div className="bento-card-media height-std">
                  <Image
                    src={svc.image}
                    alt={svc.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="bento-badge">{svc.badge}</span>
                </div>
                <div className="bento-card-body">
                  <h2 className="bento-card-title">
                    <Link href={svc.path}>{svc.navTitle}</Link>
                  </h2>
                  <p className="bento-card-desc">
                    {svc.shortDescription}
                  </p>
                  <div className="bento-card-footer">
                    <Link href={svc.path} className="bento-explore-link">
                      View Service Details <ArrowRight size={15} />
                    </Link>
                    <a
                      href={getWhatsAppUrl(svc.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bento-whatsapp-btn"
                    >
                      <MessageCircle size={15} /> Book
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Banner (Powder Blue) */}
      <section className="section section-blue">
        <div className="container">
          <div className="local-partner-card">
            <h2 className="section-heading-serif" style={{ fontSize: '2rem', marginBottom: '14px' }}>
              Serving Families Across Chennai's Residential Corridors
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '20px' }}>
              From IT corridors on OMR (Thoraipakkam, Perungudi, Sholinganallur, Karapakkam, Semmancheri, Siruseri) to South Chennai residential colonies in Velachery, Adyar, Besant Nagar, Pallavaram, and Tambaram, we coordinate domestic staff matching your preferred language, timing, and household requirements.
            </p>
            <div className="local-tag-cloud">
              {agencyInfo.serviceAreas.map((area, idx) => (
                <span key={idx} className="local-locality-tag">📍 {area}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ margin: '48px auto 72px' }}>
        <WhatsAppCTA 
          title="Need Help Deciding Which Service Fits Best?"
          subtitle="Speak directly with Thomas R at Colours Life Manpower Agency. We will help assess your domestic routine and match suitable workers."
        />
      </div>
    </>
  );
}
