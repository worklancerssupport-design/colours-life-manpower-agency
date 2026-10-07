import Image from 'next/image';
import Link from 'next/link';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import pagesData from '@/data/pages.json';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { 
  HeartHandshake, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Phone, 
  MessageCircle,
  Clock,
  CheckCircle2,
  Check
} from 'lucide-react';

const { aboutPage } = pagesData;

export const metadata = {
  title: "About Us | Colours Life Manpower Agency | Chennai & Thoraipakkam",
  description: "Learn about Colours Life Manpower Agency, led by Thomas R in Okkiyam Thoraipakkam, Chennai. Dedicated to connecting Chennai families with trusted domestic staff and care attendants.",
  alternates: {
    canonical: `${agencyInfo.siteUrl}/about/`,
  }
};

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about/' }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Section */}
      <section className="service-hero-editorial theme-cooking">
        <div className="container">
          <nav className="breadcrumbs-pill" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span style={{ color: 'var(--text-light)' }}>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>About Us</span>
          </nav>

          <div className="hero-editorial-grid">
            <div>
              <div className="eyebrow-pill eyebrow-warm">
                <Sparkles size={14} /> Family-First Domestic Care
              </div>

              <h1 className="hero-headline-serif" style={{ fontSize: '3rem' }}>
                About Colours Life <em>Manpower Agency</em>
              </h1>

              <p className="hero-body-text">
                A local Chennai manpower agency dedicated to connecting families and dependable domestic helpers with transparency, compassion, and personal care.
              </p>

              <div className="hero-location-notice">
                📍 <strong>Headquartered in {agencyInfo.address.street}, {agencyInfo.address.locality} ({agencyInfo.address.landmark}), {agencyInfo.address.city} - {agencyInfo.address.postalCode}.</strong>
              </div>

              <div className="hero-button-group">
                <a
                  href={getWhatsAppUrl("Hello Thomas R, I would like to learn more about Colours Life Manpower Agency.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn-large"
                >
                  <MessageCircle size={18} /> WhatsApp Thomas R
                </a>
                <a
                  href={`tel:${agencyInfo.phone1}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 24px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#ffffff',
                    border: '1.5px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    fontWeight: '700',
                    fontSize: '0.95rem'
                  }}
                >
                  <Phone size={16} color="var(--brand-primary)" /> Call {agencyInfo.phoneDisplay1}
                </a>
              </div>
            </div>

            <div className="hero-composition">
              <div className="composition-main-card">
                <Image
                  src="/images/about-agency-chennai.jpg"
                  alt="Colours Life Manpower Agency office consultation and friendly team in Chennai"
                  width={640}
                  height={420}
                  priority
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <div className="composition-badge-float badge-float-bottom">
                <div style={{ backgroundColor: '#fff7ed', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#1c1917' }}>{agencyInfo.address.locality}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Nehru Nagar ({agencyInfo.address.landmark})</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main About Story Section (Pastel Cream) */}
      <section className="section section-cream">
        <div className="container">
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>

            <div className="service-narrative-card">
              <h2>
                <HeartHandshake size={24} color="#ea580c" />
                {aboutPage.mission.heading}
              </h2>
              <p>
                {aboutPage.mission.intro}
              </p>
              <p dangerouslySetInnerHTML={{ __html: aboutPage.mission.story }} />
            </div>

            <div className="service-narrative-card">
              <h2>
                <Users size={24} color="#0d9488" />
                {aboutPage.leadership.heading}
              </h2>
              <p dangerouslySetInnerHTML={{ __html: aboutPage.leadership.p1 }} />
              <p dangerouslySetInnerHTML={{ __html: aboutPage.leadership.p2 }} />
            </div>

            <div className="service-narrative-card">
              <h2>
                <ShieldCheck size={24} color="#15803d" />
                {aboutPage.verification.heading}
              </h2>
              <p>
                {aboutPage.verification.intro}
              </p>
              <div className="service-duties-grid">
                {aboutPage.verification.steps.map((step, idx) => (
                  <div className="duty-pill-item" key={idx}>
                    <Check size={18} color="#15803d" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span><strong>{step.title}:</strong> {step.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="service-narrative-card">
              <h2>
                <MapPin size={24} color="#ea580c" />
                {aboutPage.coverage.heading}
              </h2>
              <p>
                {aboutPage.coverage.intro}
              </p>
              <div style={{ background: 'linear-gradient(145deg, #FFF8F0 0%, #FFF3E8 100%)', padding: '20px 24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-warm)', marginBottom: '16px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{agencyInfo.name}</strong><br />
                {agencyInfo.address.street},<br />
                {agencyInfo.address.locality}, {agencyInfo.address.city} - {agencyInfo.address.postalCode}, {agencyInfo.address.state}, {agencyInfo.address.country}.<br />
                <span style={{ color: 'var(--brand-primary)', fontWeight: '700' }}>Landmark: {agencyInfo.address.landmark}</span>
              </div>
              <p>
                {aboutPage.coverage.outro}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="container" style={{ margin: '32px auto 64px' }}>
        <WhatsAppCTA 
          title="Looking to Connect with Colours Life Manpower Agency?"
          subtitle="Call or message Thomas R today to discuss your household helper needs in Chennai."
        />
      </div>
    </>
  );
}
