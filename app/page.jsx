import Image from 'next/image';
import Link from 'next/link';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import servicesData from '@/data/services.json';
import generalFaqs from '@/data/faqs.json';
import pagesData from '@/data/pages.json';
import ReviewSection from '@/components/ReviewSection';
import FAQSection from '@/components/FAQSection';
import FAQSchema from '@/components/FAQSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import ServicesTicker from '@/components/ServicesTicker';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  HeartHandshake, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Home,
  Check,
  Navigation
} from 'lucide-react';

const { homePage } = pagesData;

export const metadata = {
  title: "Manpower Agency in Thoraipakkam | Colours Life Manpower Agency",
  description: "Colours Life Manpower Agency provides cooks, maids, baby care, newborn care, elderly care, patient care, Brahmin cooks and drivers in Thoraipakkam and Chennai.",
  alternates: {
    canonical: `${agencyInfo.siteUrl}/`,
  }
};

const uspIcons = {
  MapPin,
  HeartHandshake,
  ShieldCheck,
  MessageCircle
};

export default function HomePage() {
  const defaultWhatsAppMsg = agencyInfo.defaultWhatsAppMessage;
  const whatsappUrl = getWhatsAppUrl(defaultWhatsAppMsg);

  // Bento arrangement: 1 large feature card + 7 distinctive cards
  const featureService = servicesData[0]; // Cooking
  const secondaryService = servicesData[1]; // Newborn
  const otherServices = servicesData.slice(2);

  return (
    <>
      <FAQSchema faqs={generalFaqs} />

      {/* 1. HERO — full-bleed image, single headline, one primary action */}
      <section className="hero" aria-label="Trusted domestic help in Chennai">
        <Image
          src="https://res.cloudinary.com/akjmqvws/image/upload/v1791353138/hero-right.png"
          alt="Cook, maid, baby-care attendant, driver and cleaner — Colours Life Manpower Agency, Chennai"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="hero-bg-image"
        />
        <div className="hero-overlay" aria-hidden="true" />

        <div className="container hero-inner">
          <div className="hero-content">
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              Chennai · OMR · Thoraipakkam
            </span>

            <h1 className="hero-headline">
              Home Care.<br />
              <span className="hero-headline-italic">Trusted in<br/>Chennai.</span>
            </h1>

            <p className="hero-subline">
              Cooks, maids, baby-care attendants, patient-care, elderly companions and drivers — verified, introduced directly by the agency, ready when you are.
            </p>

            <div className="hero-actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-primary"
              >
                <MessageCircle size={19} />
                <span>WhatsApp us</span>
              </a>

              <a
                href={`tel:${agencyInfo.phone1}`}
                className="hero-btn-secondary"
              >
                <Phone size={18} />
                <span>Call {agencyInfo.phoneDisplay1}</span>
              </a>
            </div>

            <p className="hero-trust">
              <span className="hero-trust-dot" aria-hidden="true" />
              Direct reply from Thomas R · no bots, no call routing
            </p>
          </div>
        </div>
      </section>

      {/* 1b. QUIET SCOPE STRIP — grounds the hero with service breadth, no animation */}
      <ServicesTicker />

      {/* 2. CREATIVE BENTO-STYLE SERVICE GRID */}
      <section className="section section-peach" id="services">
        <div className="container">
          <div className="section-intro-header">
            <span className="eyebrow-pill eyebrow-warm">
              Tailored Domestic Staffing
            </span>
            <h2 className="section-heading-serif">
              Thoughtfully Matched Home Services
            </h2>
            <p className="section-subtext">
              Every home operates with its own rhythms. From daily morning cooking to tender newborn care and senior companionship, explore our specialized domestic support categories:
            </p>
          </div>

          <div className="bento-services-grid">
            {/* Bento Card 1: Featured Cooking (Span 7) */}
            <div className="bento-card bento-span-7">
              <div className="bento-card-media height-large">
                <Image
                  src={featureService.image}
                  alt={featureService.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  style={{ objectFit: 'cover' }}
                />
                <span className="bento-badge">Featured • Daily & Live-in</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">
                  <Link href={featureService.path}>{featureService.navTitle}</Link>
                </h3>
                <p className="bento-card-desc">
                  Wholesome, hygienic home cooking tailored to your family's taste and daily meal schedule in Chennai and OMR. Skilled in South Indian, North Indian, and vegetarian dishes.
                </p>
                <div className="bento-card-footer">
                  <Link href={featureService.path} className="bento-explore-link">
                    Explore Service <ArrowRight size={15} />
                  </Link>
                  <a 
                    href={getWhatsAppUrl(featureService.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bento-whatsapp-btn"
                  >
                    <MessageCircle size={15} /> Book Cook
                  </a>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Newborn Baby Care (Span 5) */}
            <div className="bento-card bento-span-5">
              <div className="bento-card-media height-large">
                <Image
                  src={secondaryService.image}
                  alt={secondaryService.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: 'cover' }}
                />
                <span className="bento-badge">Gentle Postnatal Care</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">
                  <Link href={secondaryService.path}>{secondaryService.navTitle}</Link>
                </h3>
                <p className="bento-card-desc">
                  Gentle, compassionate infant caregiving: newborn sponge baths, traditional oil massage, burping, sterilization, and soothing support.
                </p>
                <div className="bento-card-footer">
                  <Link href={secondaryService.path} className="bento-explore-link">
                    Explore Service <ArrowRight size={15} />
                  </Link>
                  <a 
                    href={getWhatsAppUrl(secondaryService.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bento-whatsapp-btn"
                  >
                    <MessageCircle size={15} /> Book Care
                  </a>
                </div>
              </div>
            </div>

            {/* Bento Cards 3 to 8: Remaining Services (Span 4 each across two rows) */}
            {otherServices.map((svc) => (
              <div key={svc.id} className="bento-card bento-span-4">
                <div className="bento-card-media height-std">
                  <Image
                    src={svc.image}
                    alt={svc.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="bento-badge">{svc.badge}</span>
                </div>
                <div className="bento-card-body">
                  <h3 className="bento-card-title" style={{ fontSize: '1.2rem' }}>
                    <Link href={svc.path}>{svc.navTitle}</Link>
                  </h3>
                  <p className="bento-card-desc">
                    {svc.shortDescription}
                  </p>
                  <div className="bento-card-footer">
                    <Link href={svc.path} className="bento-explore-link">
                      Explore <ArrowRight size={14} />
                    </Link>
                    <a 
                      href={getWhatsAppUrl(svc.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bento-whatsapp-btn"
                    >
                      <MessageCircle size={14} /> Book
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CREATIVE "WHY CHOOSE US" STORYTELLING SECTION (Pastel Sage) */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-intro-header">
            <span className="eyebrow-pill eyebrow-sage">
              {homePage.whyChooseUs.eyebrow}
            </span>
            <h2 className="section-heading-serif">
              {homePage.whyChooseUs.heading}
            </h2>
            <p className="section-subtext">
              {homePage.whyChooseUs.subtext}
            </p>
          </div>

          <div className="story-grid">
            {homePage.whyChooseUs.items.map((item, idx) => {
              const Icon = uspIcons[item.icon];
              return (
                <div className="story-card" style={{ backgroundColor: '#ffffff', borderColor: '#d0e7dc' }} key={idx}>
                  <div className="story-icon-box" style={{ backgroundColor: item.iconBg, color: item.iconColor }}>
                    <Icon size={26} />
                  </div>
                  <h3 className="story-card-title">{item.title}</h3>
                  <p className="story-card-desc">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS - Horizontal Connected Process (Warm Cream) */}
      <section className="section section-cream">
        <div className="container">
          <div className="section-intro-header">
            <span className="eyebrow-pill eyebrow-warm">
              {homePage.howItWorks.eyebrow}
            </span>
            <h2 className="section-heading-serif">
              {homePage.howItWorks.heading}
            </h2>
            <p className="section-subtext">
              {homePage.howItWorks.subtext}
            </p>
          </div>

          <div className="process-timeline">
            {homePage.howItWorks.steps.map((step, idx) => (
              <div className="process-step-card" key={idx}>
                <div className="process-number-circle" style={{ backgroundColor: step.circleBg, color: step.circleColor }}>
                  {step.number}
                </div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOCAL CHENNAI SECTION (Powder Blue) */}
      <section className="section section-blue">
        <div className="container">
          <div className="local-partner-card">
            <div className="local-partner-grid">
              <div>
                <span className="eyebrow-pill eyebrow-blue">
                  Local Chennai Coverage
                </span>
                <h2 className="section-heading-serif" style={{ fontSize: '2.4rem' }}>
                  Your Local Manpower Partner in Chennai
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
                  Colours Life Manpower Agency is based right in <strong>Nehru Nagar, Okkiyam Thoraipakkam</strong> (Landmark: <em>Back Side Cognizant</em>) on the Old Mahabalipuram Road (OMR) tech corridor. We actively place domestic helpers across:
                </p>

                <div className="local-tag-cloud">
                  {agencyInfo.serviceAreas.map((area, idx) => (
                    <span key={idx} className="local-locality-tag">
                      📍 {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Office Details Card */}
              <div className="office-info-box">
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', marginBottom: '14px', color: 'var(--text-primary)' }}>
                  Agency Office Details
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  <div><strong>Agency:</strong> {agencyInfo.name}</div>
                  <div><strong>Founder / In-Charge:</strong> {agencyInfo.owner}</div>
                  <div><strong>Address:</strong> {agencyInfo.address.fullAddress}</div>
                  <div style={{ marginTop: '6px' }}>
                    <strong>Phones:</strong>{' '}
                    <a href={`tel:${agencyInfo.phone1}`} style={{ color: 'var(--brand-primary)', fontWeight: '700' }}>{agencyInfo.phoneDisplay1}</a> /{' '}
                    <a href={`tel:${agencyInfo.phone2}`} style={{ color: 'var(--brand-primary)', fontWeight: '700' }}>{agencyInfo.phoneDisplay2}</a>
                  </div>
                  <div>
                    <strong>WhatsApp:</strong>{' '}
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a', fontWeight: '700' }}>
                      +91 {agencyInfo.whatsappNumber}
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-pill"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <MessageCircle size={16} /> Message Thomas R on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION (Soft Lavender) */}
      <ReviewSection limit={6} />

      {/* 7. TWO-COLUMN EDITORIAL FAQ SECTION (White) */}
      <FAQSection 
        faqs={generalFaqs} 
        title="Questions? We've got answers."
        subtitle="Practical information on hiring domestic help, background checks, live-in options, and agency policies in Chennai."
      />

      {/* 8. WHATSAPP CTA SECTION (Pastel Green) */}
      <div className="container" style={{ margin: '48px auto 72px' }}>
        <WhatsAppCTA 
          title="Need help at home?"
          subtitle="Tell us what you need. Our team is just a WhatsApp message away to discuss cook, nanny, maid, elder care, and driver availability."
          customMessage={defaultWhatsAppMsg}
          buttonText="Chat on WhatsApp"
        />
      </div>
    </>
  );
}
