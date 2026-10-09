import Image from 'next/image';
import Link from 'next/link';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl, fillPlaceholders } from '@/lib/utils';
import { getAllServices, getServiceListText } from '@/lib/services';
import generalFaqs from '@/data/faqs.json';
import FAQSection from '@/components/FAQSection';
import FAQSchema from '@/components/FAQSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { MessageCircle, Phone, ArrowRight, Clock, ShieldCheck, User } from 'lucide-react';

const faqs = fillPlaceholders(generalFaqs);

export const metadata = {
  title: `Frequently Asked Questions (FAQ) | ${agencyInfo.name} ${agencyInfo.address.city}`,
  description: `Common questions and clear answers about hiring ${getServiceListText()} from ${agencyInfo.name} in ${agencyInfo.address.city}.`,
  alternates: {
    canonical: `${agencyInfo.siteUrl}/faq/`,
  }
};

export default function FAQPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq/' }
  ];

  return (
    <div className="svc-page faq-page" style={{ '--svc-accent': 'var(--lime-500)' }}>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />

      {/* Hero — split: answers first, image fills the right half */}
      <section className="service-hero-editorial svc-hero svc-hero-split">
        <div className="svc-hero-content">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-mark" aria-hidden="true" />
            Knowledge base
          </span>

          <h1 className="hero-headline-serif">
            Frequently asked <em>questions.</em>
          </h1>

          <p className="hero-body-text">
            Everything you need to know about our domestic staffing process, service coverage
            across {agencyInfo.address.city}, worker verification, and agency support.
          </p>

          <div className="hero-facts-bar">
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><ShieldCheck size={13} /></span>
              {agencyInfo.claims.idCheck}
            </span>
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><User size={13} /></span>
              {agencyInfo.claims.directLine}
            </span>
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><Clock size={13} /></span>
              Replies {agencyInfo.responseTime} ({agencyInfo.hours})
            </span>
          </div>

          <div className="hero-button-group">
            <a
              href={getWhatsAppUrl("Hello, I have a specific question about your manpower services.")}
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
        </div>

        <div className="svc-hero-media">
          <Image
            src="/images/faq-questions.svg"
            alt="Illustration of common questions answered in a message thread"
            fill
            priority
            unoptimized
            sizes="(max-width: 991px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: '50% 42%' }}
          />
        </div>
      </section>

      {/* FAQ accordion — light surface */}
      <FAQSection
        faqs={faqs}
        title="Questions? We've got answers."
        subtitle={`Answers regarding hiring terms, placement procedures, and customer support in ${agencyInfo.address.city}.`}
      />

      {/* Service-specific questions */}
      <section className="section-light faq-service-section">
        <div className="container">
          <div className="section-intro-header" style={{ marginBottom: '36px' }}>
            <h2 className="section-heading-serif" style={{ fontSize: '2.2rem' }}>
              Service-Specific Questions
            </h2>
            <p className="section-subtext">
              Looking for detailed FAQs tailored to a specific domestic category? Visit our dedicated service pages:
            </p>
          </div>

          <div className="faq-service-links">
            {getAllServices().map((svc) => (
              <Link key={svc.id} href={svc.path} className="faq-service-link">
                <span>{svc.navTitle} FAQs</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ margin: '48px auto 72px' }}>
        <WhatsAppCTA
          title="Have a Question Not Answered Here?"
          subtitle="The owner is available on WhatsApp to answer any specific queries about timings, rates, or candidate profiles."
          buttonText="Ask on WhatsApp"
        />
      </div>
    </div>
  );
}
