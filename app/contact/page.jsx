import Image from 'next/image';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import { getServiceListText } from '@/lib/services';
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
  Navigation
} from 'lucide-react';

export const metadata = {
  title: `Contact Us | ${agencyInfo.name} | ${agencyInfo.address.locality}, ${agencyInfo.address.city}`,
  description: `Contact ${agencyInfo.name} directly. Phone: ${agencyInfo.phone1} / ${agencyInfo.phone2}, WhatsApp: ${agencyInfo.whatsappNumber}. Office: ${agencyInfo.address.street}, ${agencyInfo.address.locality}, ${agencyInfo.address.city} ${agencyInfo.address.postalCode} (${agencyInfo.address.landmark}).`,
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
      <section className="service-hero-editorial svc-hero svc-hero-split" aria-label={`Contact ${agencyInfo.name}`}>
        <div className="svc-hero-content">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-mark" aria-hidden="true" />
            Speak directly to the person who runs it
          </span>

          <h1 className="hero-headline-serif">
            Find the right help. <em>Start with one message.</em>
          </h1>

          <p className="hero-body-text">
            Tell us what you need. Speak directly to {agencyInfo.owner} — {agencyInfo.claims.noIvr}. We&apos;ll help you shortlist vetted {getServiceListText()}.
          </p>

          <div className="hero-facts-bar">
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><User size={13} /></span>
              You reach {agencyInfo.owner}, not a bot
            </span>
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><Clock size={13} /></span>
              Replies {agencyInfo.responseTime} ({agencyInfo.hours})
            </span>
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><MapPin size={13} /></span>
              {agencyInfo.address.locality}, {agencyInfo.address.city}
            </span>
          </div>

          <div className="hero-button-group">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn-large"
            >
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>
            <a href={`tel:${agencyInfo.phone1}`} className="btn-secondary-pill">
              <Phone size={16} /> Call {agencyInfo.phoneDisplay1}
            </a>
          </div>
        </div>

        <div className="svc-hero-media">
          <Image
            src="https://res.cloudinary.com/akjmqvws/image/upload/v1791540373/contact.png"
            alt={`Contact ${agencyInfo.name} - ${agencyInfo.address.locality}, ${agencyInfo.address.city}`}
            fill
            priority
            sizes="(max-width: 991px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: '100% 50%' }}
          />
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-light" style={{ background: 'var(--paper-100)' }}>
        <div className="container">
          <div className="grid" style={{ alignItems: 'start' }}>
            <div className="col-span-full">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px'
              }}>
                {/* Office details */}
                <div style={{
                  background: 'var(--paper-200)',
                  border: '1px solid var(--line-light)',
                  borderRadius: 'var(--r-xl)',
                  padding: '36px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}>
                  <div>
                    <span className="hero-eyebrow" style={{ marginBottom: '10px' }}>
                      <span className="hero-eyebrow-mark" aria-hidden="true" />
                      Direct access
                    </span>
                    <h2 className="section-heading" style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
                      {agencyInfo.name}
                    </h2>
                    <p style={{ color: 'var(--ink-on-light-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <User size={16} /> {agencyInfo.owner}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <MapPin size={20} style={{ flexShrink: 0, marginTop: '3px', color: 'var(--ink-700)' }} />
                      <div style={{ color: 'var(--ink-on-light-muted)', lineHeight: '1.8' }}>
                        <strong style={{ color: 'var(--ink-on-light)' }}>Office Address</strong><br />
                        {agencyInfo.address.street},<br />
                        {agencyInfo.address.locality},<br />
                        {agencyInfo.address.city} - {agencyInfo.address.postalCode}, {agencyInfo.address.state}, {agencyInfo.address.country}.<br />
                        <span style={{ color: 'var(--ink-700)', fontWeight: '600' }}>
                          Landmark: {agencyInfo.address.landmark}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <Phone size={20} style={{ flexShrink: 0, color: 'var(--ink-700)' }} />
                      <div>
                        <strong style={{ color: 'var(--ink-on-light)' }}>Phone</strong><br />
                        <a href={`tel:${agencyInfo.phone1}`} style={{ color: 'var(--ink-700)', fontWeight: '600' }}>
                          {agencyInfo.phoneDisplay1}
                        </a>
                        {' / '}
                        <a href={`tel:${agencyInfo.phone2}`} style={{ color: 'var(--ink-700)', fontWeight: '600' }}>
                          {agencyInfo.phoneDisplay2}
                        </a>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <MessageCircle size={20} style={{ flexShrink: 0, color: 'var(--ink-700)' }} />
                      <div>
                        <strong style={{ color: 'var(--ink-on-light)' }}>WhatsApp</strong><br />
                        <a 
                          href={getWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--ink-700)', fontWeight: '600' }}
                        >
                          +91 {agencyInfo.whatsappNumber}
                        </a>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <Mail size={20} style={{ flexShrink: 0, color: 'var(--ink-700)' }} />
                      <div>
                        <strong style={{ color: 'var(--ink-on-light)' }}>Email</strong><br />
                        <a href={`mailto:${agencyInfo.email}`} style={{ color: 'var(--ink-700)', fontWeight: '600' }}>
                          {agencyInfo.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid var(--line-light)' }}>
                     <a href={`tel:${agencyInfo.phone1}`} className="btn-secondary-pill" style={{ padding: '11px 18px', fontSize: '0.95rem' }}>
                       <Phone size={16} /> Call
                     </a>
                     <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="whatsapp-btn-large" style={{ padding: '11px 18px', fontSize: '0.95rem' }}>
                       <MessageCircle size={16} /> WhatsApp
                     </a>
                  </div>

                  <div style={{
                    background: 'var(--sage-50)',
                    border: '1px solid var(--line-light)',
                    borderRadius: 'var(--r-lg)',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}>
                    <Clock size={18} style={{ flexShrink: 0, color: 'var(--ink-700)', marginTop: '2px' }} />
                    <p style={{ fontSize: '0.92rem', color: 'var(--ink-on-light-muted)', lineHeight: '1.7', margin: 0 }}>
                      <strong style={{ color: 'var(--ink-on-light)' }}>Direct reply.</strong> {agencyInfo.owner} replies promptly on WhatsApp and over the phone during {agencyInfo.hours}.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div>
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="col-span-full" style={{ marginTop: '48px' }}>
              <div style={{ marginBottom: '18px' }}>
                <span className="hero-eyebrow" style={{ marginBottom: '10px' }}>
                  <span className="hero-eyebrow-mark" aria-hidden="true" />
                  Visit our office
                </span>
                <h3 className="section-heading" style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
                  {agencyInfo.address.locality}, {agencyInfo.address.city}
                </h3>
                <p style={{ color: 'var(--ink-on-light-muted)', maxWidth: '52ch' }}>
                  {agencyInfo.address.street}, {agencyInfo.address.locality} ({agencyInfo.address.landmark})
                </p>
              </div>

              <div style={{
                borderRadius: 'var(--r-2xl)',
                overflow: 'hidden',
                border: '1px solid var(--line-light)',
                boxShadow: 'var(--shadow-sm)',
                height: '440px',
                width: '100%',
                position: 'relative'
              }}>
                <iframe
                  title={`${agencyInfo.name} Location Map in ${agencyInfo.address.locality} ${agencyInfo.address.city}`}
                  src={agencyInfo.maps.embedUrl}
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
