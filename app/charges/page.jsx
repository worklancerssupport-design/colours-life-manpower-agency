import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl, fillPlaceholders } from '@/lib/utils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import Link from 'next/link';
import { Phone, MessageCircle, Clock, ShieldCheck, Check, ArrowRight, Users, Home, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Domestic Help Charges in Chennai | Cook, Maid & Caregiver Costs',
  description: 'Understand domestic help charges in Chennai — cook salary, maid charges, nanny costs, and caregiver rates. What affects pricing and how to get a transparent quote.',
  alternates: {
    canonical: `${agencyInfo.siteUrl}/charges/`,
  },
};

const costFactors = [
  {
    icon: Clock,
    title: 'Shift type & hours',
    desc: 'Part-time (2–5 hours) costs less than full-day (8–10 hours). Live-in arrangements include food and accommodation, which affects the monthly structure.',
  },
  {
    icon: Users,
    title: 'Experience & skill level',
    desc: 'A cook with 10 years of restaurant experience commands more than a home cook with 2 years. Specialized skills — newborn care, post-operative nursing, Brahmin cooking — are priced accordingly.',
  },
  {
    icon: Home,
    title: 'Scope of work',
    desc: 'A maid who only cleans costs less than one who cooks, cleans, and manages laundry. Broader responsibility means higher compensation.',
  },
  {
    icon: MapPin,
    title: 'Locality & travel',
    desc: 'Some areas have higher demand. Travel distance and local cost of living can influence rates across Chennai neighbourhoods.',
  },
];

const services = [
  {
    name: 'Home Cook',
    link: '/services/cooking/',
    factors: 'Cuisine type, meals per day, veg/non-veg, live-in vs day shift',
  },
  {
    name: 'Maid / Domestic Help',
    link: '/services/maid-work/',
    factors: 'Home size, tasks included, shift timing, frequency',
  },
  {
    name: 'Baby Care / Nanny',
    link: '/services/baby-care/',
    factors: "Child's age, hours needed, school pickup, live-in availability",
  },
  {
    name: 'Newborn Care (Japa)',
    link: '/services/newborn-baby-care/',
    factors: 'Day/night shifts, postnatal experience, duration of care',
  },
  {
    name: 'Elderly Care',
    link: '/services/elderly-care/',
    factors: "Mobility level, medical needs, companionship vs full assistance, live-in",
  },
  {
    name: 'Patient Care',
    link: '/services/patient-care/',
    factors: 'Post-surgical vs chronic care, nursing experience, equipment familiarity',
  },
  {
    name: 'Brahmin Cook',
    link: '/services/brahmin-cook/',
    factors: 'Satvik restrictions, festival cooking, daily vs occasional',
  },
  {
    name: 'Driver',
    link: '/services/drivers/',
    factors: 'Monthly vs part-time, vehicle type, route complexity',
  },
];

export default function ChargesPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Charges', url: '/charges/' },
  ];

  return (
    <div className="svc-page" style={{ '--svc-accent': 'var(--blue-500)' }}>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="service-hero-editorial svc-hero svc-hero-split">
        <div className="svc-hero-content">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-mark" aria-hidden="true" />
            Transparent pricing
          </span>
          <h1 className="hero-headline-serif" style={{ fontSize: '2.6rem' }}>
            What domestic help costs in <em>Chennai.</em>
          </h1>
          <p className="hero-body-text">
            No hidden fees, no surprise charges. Understand what drives the cost of hiring a cook, maid, nanny, or caregiver — then get a clear quote tailored to your home.
          </p>
          <div className="hero-button-group">
            <a href={getWhatsAppUrl("Hello, I'd like a quotation for domestic help services.")} target="_blank" rel="noopener noreferrer" className="btn-lime">
              <MessageCircle size={16} /> Get a Free Quote
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
          <div style={{ width: '100%', height: '100%', minHeight: '400px', background: 'var(--ink-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px', padding: '40px' }}>
            <div style={{ color: '#fff', maxWidth: '360px' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '16px' }}>₹</div>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.6, opacity: 0.85 }}>
                Every quote is customised to your household — shift, scope, and skill level. No generic rate cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Affects Cost */}
      <section className="section-light">
        <div className="container">
          <h2 className="section-heading">What affects the <em>cost?</em></h2>
          <p className="section-subline" style={{ maxWidth: '720px' }}>
            Domestic help pricing in Chennai isn&apos;t one-size-fits-all. These four factors determine the monthly or daily rate for any placement.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginTop: '32px' }}>
            {costFactors.map((factor, i) => (
              <div key={i} style={{ padding: '28px', background: '#fff', borderRadius: '16px', border: '1px solid var(--line-light)' }}>
                <factor.icon size={22} style={{ color: 'var(--blue-500)', marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--ink-900)' }}>{factor.title}</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--ink-600)' }}>{factor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service-wise Guide */}
      <section className="section-dark verify-band">
        <div className="container">
          <h2 className="section-heading verify-heading">Cost factors by service</h2>
          <p className="verify-subline">
            Each service has its own pricing dynamics. Here&apos;s what to consider when budgeting for each type of domestic help in Chennai.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '32px' }}>
            {services.map((svc, i) => (
              <Link key={i} href={svc.link} style={{ display: 'block', padding: '20px 24px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', color: '#fff', transition: 'background 0.2s' }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {svc.name} <ArrowRight size={14} style={{ opacity: 0.6 }} />
                </div>
                <div style={{ fontSize: '0.85rem', opacity: 0.65, lineHeight: 1.5 }}>{svc.factors}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why transparent pricing */}
      <section className="section-light">
        <div className="container">
          <h2 className="section-heading">Why our pricing stays <em>transparent</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '32px' }}>
            {[
              { title: 'No hidden agency markups', desc: 'The rate you agree to is the rate you pay. Any agency charges are disclosed upfront before you commit.' },
              { title: 'Quoted per your needs', desc: 'We don\'t use generic rate cards. Your quote reflects the exact shift, scope, and experience level you require.' },
              { title: 'Direct communication', desc: 'You discuss expectations and compensation directly with the helper before finalising — no middleman surprises.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '28px', background: '#fff', borderRadius: '16px', border: '1px solid var(--line-light)' }}>
                <Check size={20} style={{ color: 'var(--blue-500)', marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px', color: 'var(--ink-900)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--ink-600)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <WhatsAppCTA
        eyebrow="Ready to get a quote?"
        title="Tell us what you need. We'll send a clear quotation."
        subtitle={`Message us on WhatsApp or call ${agencyInfo.phoneDisplay1}. Share your service, timings, and locality — we'll respond with a transparent, no-obligation quote.`}
        customMessage="Hello, I'd like a quotation for domestic help services in Chennai."
        buttonText="Get My Quote on WhatsApp"
      />
    </div>
  );
}
