import Image from 'next/image';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import pagesData from '@/data/pages.json';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ReviewSection from '@/components/ReviewSection';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import {
  MapPin,
  ShieldCheck,
  Phone,
  MessageCircle,
  Clock,
  Check
} from 'lucide-react';

const { aboutPage } = pagesData;

export const metadata = {
  title: "About Us | Colours Life Manpower Agency | Chennai & Thoraipakkam",
  description: "Learn about Colours Life Manpower Agency in Okkiyam Thoraipakkam, Chennai. Dedicated to connecting Chennai families with trusted domestic staff and care attendants.",
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
    <div className="svc-page about-page" style={{ '--svc-accent': 'var(--lime-500)' }}>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* 1. Hero — split: value first, image fills the right half */}
      <section className="service-hero-editorial svc-hero svc-hero-split">
        <div className="svc-hero-content">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-mark" aria-hidden="true" />
            Manpower agency · OMR, Chennai
          </span>

          <h1 className="hero-headline-serif">
            Domestic help, <em>minus the guesswork.</em>
          </h1>

          <p className="hero-body-text">
            We match Chennai families with cooks, maids, nannies, attendants and drivers whose
            ID and references are checked before they enter your home. No listings, no call
            centre — you reach the owner directly on WhatsApp.
          </p>

          <div className="hero-facts-bar">
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><ShieldCheck size={13} /></span>
              Aadhaar + references checked
            </span>
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><MessageCircle size={13} /></span>
              You reach the owner, not a bot
            </span>
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><Clock size={13} /></span>
              Placed in days
            </span>
          </div>

          <div className="hero-button-group">
            <a
              href={getWhatsAppUrl("Hello Colours Life Manpower Agency, I'd like to know how you can help my home.")}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn-large"
            >
              <MessageCircle size={20} /> Enquire on WhatsApp
            </a>
            <a href={`tel:${agencyInfo.phone1}`} className="btn-secondary-pill">
              <Phone size={16} /> Call {agencyInfo.phoneDisplay1}
            </a>
          </div>

          <p className="hero-cta-micro">
            WhatsApp answered 8am–9pm, usually within the hour
          </p>
        </div>

        <div className="svc-hero-media">
          <Image
            src="/images/about-agency-chennai.jpg"
            alt="Colours Life Manpower Agency office and team in Okkiyam Thoraipakkam, Chennai"
            fill
            priority
            sizes="(max-width: 991px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: '60% 45%' }}
          />
        </div>
      </section>

      {/* 2. Story — why families call, in your words */}
      <section className="section-light about-story-section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-head">
              <h2 className="section-heading">{aboutPage.mission.heading}</h2>
            </div>

            <div className="about-story-body">
              <p>{aboutPage.mission.intro}</p>
              <p dangerouslySetInnerHTML={{ __html: aboutPage.mission.story }} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Verification — the trust band, mirroring service pages */}
      <section className="section-dark verify-band">
        <div className="container">
          <h2 className="section-heading verify-heading">
            {aboutPage.verification.heading}
          </h2>
          <p className="verify-subline">{aboutPage.verification.intro}</p>

          <div className="about-verify-grid">
            {aboutPage.verification.steps.map((step) => (
              <div className="about-verify-item" key={step.title}>
                <span className="verify-item-mark" aria-hidden="true">
                  <Check size={14} strokeWidth={3} />
                </span>
                <div>
                  <h3 className="about-verify-title">{step.title}</h3>
                  <p className="about-verify-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Reachability — the person, not a process */}
      <section className="section-light about-reach-section">
        <div className="container">
          <div className="about-reach-grid">
            <div>
              <h2 className="section-heading">{aboutPage.leadership.heading}</h2>
              <p className="section-subline" dangerouslySetInnerHTML={{ __html: aboutPage.leadership.p1 }} />
              <p className="section-subline" dangerouslySetInnerHTML={{ __html: aboutPage.leadership.p2 }} />
            </div>

            <aside className="about-contact-card" aria-label="Talk to the agency directly">
              <span className="about-contact-eyebrow">Direct line</span>
              <h3 className="about-contact-title">Talk to the person who runs it</h3>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="about-contact-row"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>
                  <strong>WhatsApp</strong>
                  <em>+91 {agencyInfo.whatsappNumber}</em>
                </span>
              </a>

              <a href={`tel:${agencyInfo.phone1}`} className="about-contact-row">
                <Phone size={18} aria-hidden="true" />
                <span>
                  <strong>Call the office</strong>
                  <em>{agencyInfo.phoneDisplay1}</em>
                </span>
              </a>

              <div className="about-contact-row">
                <Clock size={18} aria-hidden="true" />
                <span>
                  <strong>When you&apos;ll hear back</strong>
                  <em>8am–9pm, usually within the hour</em>
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 5. Coverage — where we work */}
      <section className="section-light coverage-section about-coverage-section">
        <div className="container">
          <h2 className="section-heading">{aboutPage.coverage.heading}</h2>

          <div className="local-tag-cloud coverage-tags">
            {agencyInfo.serviceAreas.map((area) => (
              <span key={area} className="local-locality-tag">{area}</span>
            ))}
          </div>

          <div className="about-address-card">
            <MapPin size={18} aria-hidden="true" />
            <div>
              <strong>{agencyInfo.name}</strong>
              <span>{aboutPage.coverage.intro}</span>
              <span>
                {agencyInfo.address.street}, {agencyInfo.address.locality}, {agencyInfo.address.city} - {agencyInfo.address.postalCode}
              </span>
              <span>Landmark: {agencyInfo.address.landmark}</span>
            </div>
          </div>

          <p className="section-subline">{aboutPage.coverage.outro}</p>
        </div>
      </section>

      {/* 6. Proof — verified Chennai families */}
      <ReviewSection limit={3} />

      {/* 7. Final CTA */}
      <WhatsAppCTA
        eyebrow="Replies within the hour"
        title="Tell us what your home needs."
        subtitle="Share your area and shift on WhatsApp. You reach the owner directly — no IVR, no bots."
      />
    </div>
  );
}
