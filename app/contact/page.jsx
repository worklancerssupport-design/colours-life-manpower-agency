import Link from 'next/link';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ContactForm from '@/components/ContactForm';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  User, 
  Building2,
  Navigation,
  Sparkles
} from 'lucide-react';

export const metadata = {
  title: "Contact Us | Colours Life Manpower Agency | Okkiyam Thoraipakkam, Chennai",
  description: "Contact Colours Life Manpower Agency directly. Phone: 9884404444 / 9884555533, WhatsApp: 9884555533. Office: Nehru Nagar, Okkiyam Thoraipakkam, Chennai 600097 (Back Side Cognizant).",
  alternates: {
    canonical: `${agencyInfo.siteUrl}/contact/`,
  }
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact/' }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Section */}
      <section className="service-hero-editorial theme-cooking" style={{ paddingTop: '128px' }}>
        <div className="container">
          <nav className="breadcrumbs-pill" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span style={{ color: 'var(--text-light)' }}>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>Contact Us</span>
          </nav>

          <div className="section-intro-header" style={{ marginBottom: '20px' }}>
            <span className="eyebrow-pill eyebrow-warm">
              <Sparkles size={14} /> Get In Touch
            </span>
            <h1 className="hero-headline-serif" style={{ fontSize: '3rem' }}>
              Contact Colours Life <em>Manpower Agency</em>
            </h1>
            <p className="section-subtext">
              Reach out directly to enquire about available cooks, maids, baby caretakers, elderly attendants, patient caregivers, and drivers in Chennai.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content Grid (Pastel Cream Background) */}
      <section className="section section-cream">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '36px',
            alignItems: 'start'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px'
            }}>
              {/* Col 1: Business Details & Contact Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px',
                  boxShadow: 'var(--shadow-md)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(135deg, #D4541A 0%, #F07240 50%, #E8892A 100%)' }} />
                  <div className="eyebrow-pill eyebrow-warm" style={{ marginBottom: '14px' }}>
                    <Building2 size={14} /> Official Agency Office
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
                    {agencyInfo.name}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brand-primary)', fontWeight: '800', fontSize: '0.98rem', marginBottom: '24px' }}>
                    <User size={16} /> Founder & In-Charge: {agencyInfo.owner}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <MapPin size={22} color="#ea580c" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Office Address:</strong><br />
                        {agencyInfo.address.street},<br />
                        {agencyInfo.address.locality},<br />
                        {agencyInfo.address.city} - {agencyInfo.address.postalCode}, {agencyInfo.address.state}, {agencyInfo.address.country}.<br />
                        <span style={{ color: 'var(--brand-primary)', fontWeight: '800' }}>
                          Landmark: {agencyInfo.address.landmark}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <Phone size={20} color="#ea580c" style={{ flexShrink: 0 }} />
                      <div style={{ fontSize: '0.95rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Phone Numbers:</strong><br />
                        <a href={`tel:${agencyInfo.phone1}`} style={{ color: 'var(--brand-primary)', fontWeight: '800' }}>
                          {agencyInfo.phoneDisplay1}
                        </a>
                        {' / '}
                        <a href={`tel:${agencyInfo.phone2}`} style={{ color: 'var(--brand-primary)', fontWeight: '800' }}>
                          {agencyInfo.phoneDisplay2}
                        </a>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <MessageCircle size={20} color="#22c55e" style={{ flexShrink: 0 }} />
                      <div style={{ fontSize: '0.95rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>WhatsApp (Direct):</strong><br />
                        <a 
                          href={getWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#0D7A43', fontWeight: '800' }}
                        >
                          +91 {agencyInfo.whatsappNumber}
                        </a>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <Mail size={20} color="#0d9488" style={{ flexShrink: 0 }} />
                      <div style={{ fontSize: '0.95rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Email Address:</strong><br />
                        <a href={`mailto:${agencyInfo.email}`} style={{ color: 'var(--brand-teal)', fontWeight: '700' }}>
                          {agencyInfo.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Fast Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                    <a
                      href={`tel:${agencyInfo.phone1}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '11px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: '#ffffff',
                        border: '1.5px solid var(--border-medium)',
                        color: 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '0.88rem'
                      }}
                    >
                      <Phone size={15} color="#ea580c" /> Call Office
                    </a>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp-pill"
                      style={{ justifyContent: 'center', fontSize: '0.88rem' }}
                    >
                      <MessageCircle size={15} /> WhatsApp
                    </a>
                  </div>
                </div>

                {/* Direct Availability Notice */}
                <div style={{
                  background: 'linear-gradient(145deg, #F0FCF9 0%, #E8F5EB 100%)',
                  border: '1px solid rgba(14, 140, 132, 0.2)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}>
                  <Clock size={24} color="var(--brand-teal)" style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: '0.92rem', color: '#134e4a', lineHeight: '1.6' }}>
                    <strong>Direct Agency Access:</strong> {agencyInfo.owner} is available daily to answer queries. Messages received on WhatsApp are typically addressed promptly within the hour.
                  </div>
                </div>
              </div>

              {/* Col 2: Interactive Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>

            {/* Google Maps Embed Section */}
            <div style={{ marginTop: '28px' }}>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Navigation size={22} color="#ea580c" />
                  Agency Location Map: Okkiyam Thoraipakkam, Chennai
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Visit our office at {agencyInfo.address.street}, {agencyInfo.address.locality} ({agencyInfo.address.landmark}, OMR {agencyInfo.address.city} - {agencyInfo.address.postalCode}).
                </p>
              </div>

              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-md)',
                height: '420px',
                width: '100%',
                position: 'relative'
              }}>
                <iframe
                  title="Colours Life Manpower Agency Location Map in Okkiyam Thoraipakkam Chennai"
                  src="https://maps.google.com/maps?q=Nehru+Nagar+13th+Cross+Street+Okkiyam+Thoraipakkam+Chennai+600097&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
