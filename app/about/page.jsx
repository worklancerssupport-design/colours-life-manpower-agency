import Image from 'next/image';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl, fillPlaceholders } from '@/lib/utils';
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
  title: `About Us | ${agencyInfo.name} | ${agencyInfo.address.city} & ${agencyInfo.address.locality}`,
  description: `Learn about ${agencyInfo.name} in ${agencyInfo.address.locality}, ${agencyInfo.address.city}. Dedicated to connecting ${agencyInfo.address.city} families with trusted domestic staff and care attendants.`,
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
            Manpower agency · {agencyInfo.address.locality}, {agencyInfo.address.city}
          </span>

          <h1 className="hero-headline-serif">
            Domestic help, <em>minus the guesswork.</em>
          </h1>

          <p className="hero-body-text">
            We match {agencyInfo.address.city} families with cooks, maids, nannies, attendants and drivers.{' '}
            {agencyInfo.claims.idCheckLong} {agencyInfo.claims.founderDirectLong}
          </p>

          <div className="hero-facts-bar">
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><ShieldCheck size={13} /></span>
              {agencyInfo.claims.idCheck}
            </span>
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><MessageCircle size={13} /></span>
              {agencyInfo.claims.directLine}
            </span>
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><Clock size={13} /></span>
              {agencyInfo.claims.placementSpeed}
            </span>
          </div>

          <div className="hero-button-group">
            <a
              href={getWhatsAppUrl(`Hello ${agencyInfo.name}, I'd like to know how you can help my home.`)}
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
            WhatsApp answered {agencyInfo.hours}, {agencyInfo.responseTime}
          </p>
        </div>

        <div className="svc-hero-media">
          <Image
            src="/images/about-agency-chennai.jpg"
            alt={`${agencyInfo.name} office and team in ${agencyInfo.address.locality}, ${agencyInfo.address.city}`}
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
              <h2 className="section-heading">{fillPlaceholders(aboutPage.mission.heading)}</h2>
            </div>

            <div className="about-story-body">
              <p>{fillPlaceholders(aboutPage.mission.intro)}</p>
              <p dangerouslySetInnerHTML={{ __html: fillPlaceholders(aboutPage.mission.story) }} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Verification — the trust band, mirroring service pages */}
      <section className="section-dark verify-band">
        <div className="container">
          <h2 className="section-heading verify-heading">
            {fillPlaceholders(aboutPage.verification.heading)}
          </h2>
          <p className="verify-subline">{fillPlaceholders(aboutPage.verification.intro)}</p>

          <div className="about-verify-grid">
            {aboutPage.verification.steps.map((step) => (
              <div className="about-verify-item" key={step.title}>
                <span className="verify-item-mark" aria-hidden="true">
                  <Check size={14} strokeWidth={3} />
                </span>
                <div>
                  <h3 className="about-verify-title">{fillPlaceholders(step.title)}</h3>
                  <p className="about-verify-desc">{fillPlaceholders(step.description)}</p>
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
              <h2 className="section-heading">{fillPlaceholders(aboutPage.leadership.heading)}</h2>
              <p className="section-subline" dangerouslySetInnerHTML={{ __html: fillPlaceholders(aboutPage.leadership.p1) }} />
              <p className="section-subline" dangerouslySetInnerHTML={{ __html: fillPlaceholders(aboutPage.leadership.p2) }} />
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
                  <em>{agencyInfo.hours}, {agencyInfo.responseTime}</em>
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 5. Coverage — where we work */}
      <section className="section-light coverage-section about-coverage-section">
        <div className="container">
          <h2 className="section-heading">{fillPlaceholders(aboutPage.coverage.heading)}</h2>

          <div className="local-tag-cloud coverage-tags">
            {agencyInfo.serviceAreas.map((area) => (
              <span key={area} className="local-locality-tag">{area}</span>
            ))}
          </div>

          <div className="about-address-card">
            <MapPin size={18} aria-hidden="true" />
            <div>
              <strong>{agencyInfo.name}</strong>
              <span>{fillPlaceholders(aboutPage.coverage.intro)}</span>
              <span>
                {agencyInfo.address.street}, {agencyInfo.address.locality}, {agencyInfo.address.city} - {agencyInfo.address.postalCode}
              </span>
              <span>Landmark: {agencyInfo.address.landmark}</span>
            </div>
          </div>

          <p className="section-subline">{fillPlaceholders(aboutPage.coverage.outro)}</p>
        </div>
      </section>

      {/* 6. Proof — verified client families */}
      <ReviewSection limit={3} />

      {/* 7. Final CTA */}
      <WhatsAppCTA
        eyebrow={`Replies ${agencyInfo.responseTime}`}
        title="Tell us what your home needs."
        subtitle={`Share your area and shift on WhatsApp. You reach the owner directly — ${agencyInfo.claims.noIvr}.`}
      />
    </div>
  );
}
