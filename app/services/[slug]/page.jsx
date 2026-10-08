import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import servicesData from '@/data/services.json';
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/utils';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import OtherServices from '@/components/OtherServices';
import FAQSection from '@/components/FAQSection';
import FAQSchema from '@/components/FAQSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake,
  AlertTriangle,
  ArrowRight,
  Check,
  Building,
  UserCheck
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

const themeClassMap = {
  'cooking': 'theme-cooking',
  'newborn-baby-care': 'theme-newborn',
  'baby-care': 'theme-baby',
  'elderly-care': 'theme-elderly',
  'maid-work': 'theme-maid',
  'brahmin-cook': 'theme-brahmin',
  'patient-care': 'theme-patient',
  'drivers': 'theme-drivers'
};

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const whatsappUrl = getWhatsAppUrl(service.whatsappMessage);
  const themeClass = themeClassMap[service.slug] || 'theme-cooking';

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/' },
    { name: service.shortName, url: service.path }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={service.faqs} />

      {/* 1. Dedicated Service Hero with Custom Pastel Background */}
      <section className={`service-hero-editorial ${themeClass}`} style={{ paddingTop: '128px' }}>
        <div className="container">
          {/* Breadcrumbs Pill */}
          <nav className="breadcrumbs-pill" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span style={{ color: 'var(--text-light)' }}>/</span>
            <Link href="/services/">Services</Link>
            <span style={{ color: 'var(--text-light)' }}>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{service.shortName}</span>
          </nav>

          <div className="hero-editorial-grid">
            <div>
              <div className="eyebrow-pill eyebrow-warm">
                <Sparkles size={14} /> {service.badge}
              </div>

              <h1 className="hero-headline-serif" style={{ fontSize: '2.8rem' }}>
                {service.h1}
              </h1>

              <p className="hero-body-text">
                {service.heroSubtitle}
              </p>

              <div className="hero-location-notice">
                📍 <strong>Available across Okkiyam Thoraipakkam, OMR, and residential Chennai.</strong>
              </div>

              <div className="hero-button-group">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn-large"
                >
                  <MessageCircle size={20} /> Book {service.shortName}
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

              <div className="hero-pill-badges">
                <div className="pill-feature">
                  <div className="pill-check">✓</div>
                  <span>Local Chennai Coordination</span>
                </div>
                <div className="pill-feature">
                  <div className="pill-check">✓</div>
                  <span>Aadhaar Identity Checked</span>
                </div>
                <div className="pill-feature">
                  <div className="pill-check">✓</div>
                  <span>Full-Time & Part-Time Shifts</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hero-composition">
              <div className="composition-main-card">
                <Image
                  src={service.image}
                  alt={service.alt}
                  width={680}
                  height={450}
                  priority
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <div className="composition-badge-float badge-float-bottom">
                <div style={{ backgroundColor: '#fff7ed', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#1c1917' }}>Owner · Agency Lead</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{agencyInfo.address.locality}, {agencyInfo.address.city}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual Storytelling Narrative Section */}
      <section className="section section-cream">
        <div className="container">
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>

            {/* Medical / Care Disclaimer Notice if applicable */}
            {service.disclaimer && (
              <div style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: 'var(--radius-md)',
                padding: '20px 24px',
                marginBottom: '36px',
                display: 'flex',
                gap: '14px',
                color: '#92400e',
                fontSize: '0.94rem',
                lineHeight: '1.6'
              }}>
                <AlertTriangle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Important Caregiving Notice:</strong> {service.disclaimer}
                </div>
              </div>
            )}

            {/* Card 1: Introduction */}
            <div className="service-narrative-card">
              <h2>
                <Sparkles size={24} color="#ea580c" />
                Reliable {service.shortName} Support for Chennai Households
              </h2>
              <p>{service.intro}</p>
              <p>
                At Colours Life Manpower Agency, we take a personalized approach to household staffing. We recognize that every home operates with its own rhythms, family expectations, and daily meal or care routines. Whether you are living in a multi-storey apartment complex on Old Mahabalipuram Road (OMR), a villa in Perungudi, or an independent home in Velachery, our team ensures that you receive dedicated assistance suited specifically to your lifestyle.
              </p>
            </div>

            {/* Card 2: Who It Is For */}
            <div className="service-narrative-card">
              <h2>
                <HeartHandshake size={24} color="#0d9488" />
                Who Can Benefit From Our {service.shortName} Services?
              </h2>
              <p>
                Our clients in Chennai include families from diverse walks of life who require extra assistance to keep their households running smoothly and comfortably:
              </p>
              <div className="service-duties-grid">
                {service.whoIsItFor.map((item, index) => (
                  <div key={index} className="duty-pill-item">
                    <Check size={18} color="#0d9488" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Worker Profiles & Verification */}
            <div className="service-narrative-card">
              <h2>
                <ShieldCheck size={24} color="#ea580c" />
                What Type of Workers Are Available?
              </h2>
              <p>{service.availableWorkers}</p>
              <p>
                All staff registered through Colours Life Manpower Agency are interviewed personally by the owner. We verify government identification documents, contact previous employers or character references where available, and clarify expected work ethics, cleanliness standards, and punctual habits. We prioritize individuals with genuine willingness to assist families with patience, care, and respectful communication.
              </p>
            </div>

            {/* Card 4: Key Duties & Responsibilities */}
            <div className="service-narrative-card">
              <h2>
                <CheckCircle2 size={24} color="#15803d" />
                Key Duties & Household Responsibilities
              </h2>
              <p>
                When you hire through our agency, you receive structured, dependable daily help. Typical responsibilities handled include:
              </p>
              <div className="service-duties-grid">
                {service.keyResponsibilities.map((duty, index) => (
                  <div key={index} className="duty-pill-item">
                    <Check size={18} color="#15803d" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{duty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mid-Page WhatsApp CTA */}
            <div style={{ margin: '48px 0' }}>
              <WhatsAppCTA 
                title={`Need a Reliable ${service.shortName} Worker in Chennai?`}
                subtitle={`Message us directly on WhatsApp with your locality and requirements to check immediate availability.`}
                customMessage={service.whatsappMessage}
                buttonText={`Book ${service.shortName} on WhatsApp`}
              />
            </div>

            {/* Card 5: Local Area Service Coverage */}
            <div className="service-narrative-card">
              <h2>
                <MapPin size={24} color="#ea580c" />
                Service Coverage Across Okkiyam Thoraipakkam, OMR & Chennai
              </h2>
              <p>{service.localCoverage}</p>
              <p>
                Because our agency headquarters is located right at {agencyInfo.address.street}, {agencyInfo.address.locality} (Landmark: {agencyInfo.address.landmark}), we have quick access to the major residential hubs along the IT corridor. Whether you require part-time assistance, a standard 8 to 12-hour day helper, or a 24-hour live-in attendant who resides in your home, we provide flexible arrangements to match your family&apos;s schedule.
              </p>
              <div className="local-tag-cloud" style={{ marginTop: '20px' }}>
                {agencyInfo.serviceAreas.map((area, idx) => (
                  <span key={idx} className="local-locality-tag">📍 {area}</span>
                ))}
              </div>
            </div>

            {/* Card 6: How Booking Works */}
            <div className="service-narrative-card">
              <h2>
                <Clock size={24} color="#0d9488" />
                How the Booking & Placement Process Works
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '14px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="process-number-circle" style={{ width: '40px', height: '40px', fontSize: '1rem', backgroundColor: '#fff7ed', color: '#ea580c', flexShrink: 0 }}>
                    1
                  </div>
                  <div>
                    <strong style={{ fontSize: '1.05rem', color: '#1c1917' }}>Direct Requirement Discussion:</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>
                      Contact us via WhatsApp or phone. Share your family size, timing preferences (day-time vs. live-in), preferred language, and any specific dietary or caregiving requirements.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="process-number-circle" style={{ width: '40px', height: '40px', fontSize: '1rem', backgroundColor: '#f0fdfa', color: '#0d9488', flexShrink: 0 }}>
                    2
                  </div>
                  <div>
                    <strong style={{ fontSize: '1.05rem', color: '#1c1917' }}>Worker Profile Matching:</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>
                      We review our database and recommend a candidate whose experience, proximity, and temperament match your needs. We arrange a phone interview or introductory meeting.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="process-number-circle" style={{ width: '40px', height: '40px', fontSize: '1rem', backgroundColor: '#ecfdf5', color: '#15803d', flexShrink: 0 }}>
                    3
                  </div>
                  <div>
                    <strong style={{ fontSize: '1.05rem', color: '#1c1917' }}>Trial & Ongoing Agency Support:</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>
                      Once terms are finalized, the helper commences duty. Colours Life Manpower Agency remains your point of contact for ongoing peace of mind and replacement assistance if needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Service-Specific 2-Column FAQ Section */}
      <FAQSection 
        faqs={service.faqs}
        title={`Questions About ${service.shortName} in Chennai`}
        subtitle={`Practical information on hiring, daily duties, schedules, and policies for ${service.shortName.toLowerCase()} support.`}
      />

      {/* 4. Other Services Cross-Linking (Pastel Grid) */}
      <OtherServices currentServiceSlug={service.slug} />

      {/* 5. Final Bottom WhatsApp CTA */}
      <div className="container" style={{ margin: '48px auto 72px' }}>
        <WhatsAppCTA 
          title={`Ready to Book Your ${service.shortName} Worker?`}
          subtitle={`Contact Colours Life Manpower Agency in Okkiyam Thoraipakkam, Chennai. We are ready to assist you today with prompt, courteous service.`}
          customMessage={service.whatsappMessage}
          buttonText={`Enquire for ${service.shortName} on WhatsApp`}
        />
      </div>
    </>
  );
}
