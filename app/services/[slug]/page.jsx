import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs, getWhatsAppUrl } from '@/lib/utils';
import agencyInfo from '@/data/agency.json';
import OtherServices from '@/components/OtherServices';
import FAQSection from '@/components/FAQSection';
import FAQSchema from '@/components/FAQSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import ScopeSplit from '@/components/ScopeSplit';
import ShiftCards from '@/components/ShiftCards';
import BeforeYouDecide from '@/components/BeforeYouDecide';
import ProofInline from '@/components/ProofInline';
import ServiceSchema from '@/components/ServiceSchema';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Check,
  ShieldCheck,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  const canonicalUrl = `${agencyInfo.siteUrl}${service.path}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 675,
          alt: service.alt,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.image],
    }
  };
}

const ctaNounMap = {
  'cooking': 'a cook',
  'newborn-baby-care': 'newborn care',
  'baby-care': 'a baby care helper',
  'elderly-care': 'an elderly attendant',
  'maid-work': 'domestic help',
  'brahmin-cook': 'a Brahmin cook',
  'patient-care': 'a patient attendant',
  'drivers': 'a driver'
};

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const whatsappUrl = getWhatsAppUrl(service.whatsappMessage);
  const ctaNoun = ctaNounMap[service.slug] || service.shortName.toLowerCase();
  const idCheckFact = service.slug === 'drivers' ? 'Licence + Aadhaar checked' : 'Aadhaar + references checked';

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/' },
    { name: service.shortName, url: service.path }
  ];

  return (
    <div className="svc-page" style={{ '--svc-accent': service.accentColor }}>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema service={service} />
      <FAQSchema faqs={service.faqs} />

      {/* 1. Service Hero — full-bleed image fills the right half, mirroring the home hero */}
      <section className="service-hero-editorial svc-hero svc-hero-split">
        <div className="svc-hero-content">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-mark" aria-hidden="true" />
            {service.eyebrowText}
          </span>

          <h1 className="hero-headline-serif" style={{ fontSize: '2.8rem' }}>
            {service.h1}
            <em className="hero-h1-scope">{service.h1Scope}</em>
          </h1>

          <p className="hero-body-text">
            {service.heroSubtitle}
          </p>

          <div className="hero-facts-bar">
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><Clock size={13} /></span>
              Usually placed in days
            </span>
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><Check size={13} strokeWidth={3} /></span>
              {idCheckFact}
            </span>
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><MapPin size={13} /></span>
              {service.heroFactAreas}
            </span>
          </div>

          <div className="hero-button-group">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn-large"
            >
              <MessageCircle size={20} /> Enquire on WhatsApp
            </a>

            <a
              href={`tel:${agencyInfo.phone1}`}
              className="btn-secondary-pill"
            >
              <Phone size={16} /> Call {agencyInfo.phoneDisplay1}
            </a>
          </div>

          <p className="hero-cta-micro">
            WhatsApp answered 8am–9pm, usually within the hour
          </p>
        </div>

        <div className="svc-hero-media">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            priority
            sizes="(max-width: 991px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: '60% 100%' }}
          />
        </div>
      </section>

      {/* 2. What You Get — scope split */}
      <ScopeSplit
        title={<>What you get with {ctaNoun} in Chennai</>}
        included={service.scopeIncluded}
        excluded={service.scopeExcluded}
        note={service.disclaimer}
      />

      {/* 3. Is This For You? — self-identification */}
      <section className="section-light situations-section">
        <div className="container">
          <h2 className="section-heading">Is this for <em>you</em>?</h2>
          <ul className="situations-list">
            {service.whoIsItFor.map((situation, i) => (
              <li key={i}>
                <span className="situations-check" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                <span>{situation}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Shift Options */}
      <ShiftCards
        title={service.shiftHeading || 'Part-time, full-time or live-in — choose your shift'}
        options={service.shiftOptions}
      />

      {/* 5. How Hiring Works */}
      <section className="section-light hiring-section">
        <div className="container">
          <h2 className="section-heading">How hiring <em>works</em></h2>

          <ol className="hiring-steps">
            <li className="hiring-step">
              <div className="hiring-step-num" aria-hidden="true">1</div>
              <h3 className="hiring-step-title">Tell us what you need</h3>
              <p className="hiring-step-desc">
                WhatsApp your locality, your shift and the duties that matter. Thirty seconds of typing is the whole first step.
              </p>
            </li>
            <li className="hiring-step">
              <div className="hiring-step-num" aria-hidden="true">2</div>
              <h3 className="hiring-step-title">See matched profiles</h3>
              <p className="hiring-step-desc">
                You get verified candidates whose experience and locality fit your home. You talk to them before deciding — never a blind assignment.
              </p>
            </li>
            <li className="hiring-step">
              <div className="hiring-step-num" aria-hidden="true">3</div>
              <h3 className="hiring-step-title">Start with an introduction</h3>
              <p className="hiring-step-desc">
                Once you choose, the person starts. You keep one number for anything that comes after.
              </p>
            </li>
          </ol>

          <div className="hiring-strip">
            <span>You send your locality + shift</span>
            <ArrowRight className="hiring-strip-sep" size={16} aria-hidden="true" />
            <span>hear back within the hour</span>
            <ArrowRight className="hiring-strip-sep" size={16} aria-hidden="true" />
            <span>see verified profiles</span>
            <ArrowRight className="hiring-strip-sep" size={16} aria-hidden="true" />
            <span>you choose</span>
            <span className="hiring-strip-muted">No office visit needed.</span>
          </div>
        </div>
      </section>

      {/* 6. What's Checked & What If It Goes Wrong — dark band */}
      <section className="section-dark verify-band">
        <div className="container">
          <h2 className="section-heading verify-heading">What&apos;s checked before anyone enters your home</h2>
          <p className="verify-subline">
            Whoever is placed with you has had their ID checked, references spoken to, and duties clarified with you before day one. You see the verification details before they start.
          </p>

          <div className="verify-grid">
            <div className="verify-col">
              <h3 className="verify-col-title">
                <ShieldCheck size={17} aria-hidden="true" />
                Checked before day one
              </h3>
              <ul className="verify-list">
                {service.verificationFacts.map((fact, i) => (
                  <li key={i} className="verify-item">
                    <span className="verify-item-mark" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="verify-col">
              <h3 className="verify-col-title">
                <HeartHandshake size={17} aria-hidden="true" />
                If it isn&apos;t working out
              </h3>
              <ul className="verify-list">
                {service.riskPolicies.map((policy, i) => (
                  <li key={i} className="verify-item">
                    <span className="verify-item-mark" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                    <span>{policy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Proof — real family reviews */}
      <ProofInline serviceSlug={service.slug} />

      {/* 8. Before You Decide — unasked questions */}
      <BeforeYouDecide qas={service.unaskedQAs} />

      {/* 9. Coverage */}
      <section className="section-light coverage-section">
        <div className="container">
          <h2 className="section-heading">Areas we <em>cover</em></h2>
          <div className="local-tag-cloud coverage-tags">
            {agencyInfo.serviceAreas.map((area, idx) => (
              <span key={idx} className="local-locality-tag">{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Service FAQ */}
      <FAQSection
        faqs={service.faqs}
        title={`Questions about ${service.shortName.toLowerCase()} in Chennai`}
        subtitle="Practical answers on shifts, duties, verification, and what happens after you message."
      />

      {/* 11. Related Services */}
      <OtherServices currentServiceSlug={service.slug} />

      {/* 12. Final CTA */}
      <WhatsAppCTA
        eyebrow="Replies within the hour"
        title={`Need ${ctaNoun} this week?`}
        subtitle="Tell us your area and shift. You'll hear back within the hour — a real person, no bots."
        customMessage={service.whatsappMessage}
        buttonText="Enquire on WhatsApp"
      />
    </div>
  );
}
