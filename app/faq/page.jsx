import Link from 'next/link';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import generalFaqs from '@/data/faqs.json';
import servicesData from '@/data/services.json';
import FAQSection from '@/components/FAQSection';
import FAQSchema from '@/components/FAQSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { HelpCircle, MessageCircle, Phone, ArrowRight, Sparkles } from 'lucide-react';

export const metadata = {
  title: "Frequently Asked Questions (FAQ) | Colours Life Manpower Agency Chennai",
  description: "Common questions and clear answers about hiring cooks, maids, baby caretakers, elderly attendants, patient care, and drivers from Colours Life Manpower Agency in Chennai.",
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
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={generalFaqs} />

      {/* Hero Section */}
      <section className="service-hero-editorial theme-cooking">
        <div className="container">
          <nav className="breadcrumbs-pill" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span style={{ color: 'var(--text-light)' }}>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>FAQ</span>
          </nav>

          <div className="section-intro-header" style={{ marginBottom: '20px' }}>
            <span className="eyebrow-pill eyebrow-warm">
              <Sparkles size={14} /> Knowledge Base
            </span>
            <h1 className="hero-headline-serif" style={{ fontSize: '3rem' }}>
              Frequently Asked <em>Questions</em>
            </h1>
            <p className="section-subtext">
              Everything you need to know about our domestic staffing process, service coverage across Chennai, worker verification, and agency support.
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column FAQ Section */}
      <FAQSection 
        faqs={generalFaqs}
        title="Questions? We've got answers."
        subtitle="Answers regarding hiring terms, placement procedures, and customer support in Chennai."
      />

      {/* Service-Specific Links Section (Pastel Sage) */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-intro-header" style={{ marginBottom: '36px' }}>
            <h2 className="section-heading-serif" style={{ fontSize: '2.2rem' }}>
              Service-Specific Questions
            </h2>
            <p className="section-subtext">
              Looking for detailed FAQs tailored to a specific domestic category? Visit our dedicated service pages:
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '18px',
            maxWidth: '980px',
            margin: '0 auto'
          }}>
            {servicesData.map((svc) => (
              <Link 
                key={svc.id}
                href={svc.path}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-subtle)',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <span>{svc.navTitle} FAQs</span>
                <ArrowRight size={16} color="#ea580c" />
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
    </>
  );
}
