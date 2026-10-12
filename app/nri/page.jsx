import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl, fillPlaceholders } from '@/lib/utils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import Link from 'next/link';
import { Phone, MessageCircle, Globe, ShieldCheck, Check, ArrowRight, HeartHandshake, Clock, MapPin, Users } from 'lucide-react';

export const metadata = {
  title: 'NRI Domestic Help Services in Chennai | Care for Parents Abroad',
  description: 'Living abroad? Arrange verified cooks, maids, elderly care, and patient care for your parents or family in Chennai. Trusted by NRI families worldwide.',
  alternates: {
    canonical: `${agencyInfo.siteUrl}/nri/`,
  },
};

const challenges = [
  {
    icon: Globe,
    title: 'You\'re 8,000 miles away',
    desc: 'Managing your parents\' daily needs from another timezone is exhausting. You need someone local you can trust to handle it.',
  },
  {
    icon: ShieldCheck,
    title: 'You can\'t verify in person',
    desc: 'You can\'t walk into a kitchen or meet candidates face-to-face. Background checks and reference verification aren\'t optional — they\'re essential.',
  },
  {
    icon: Clock,
    title: 'Emergencies don\'t wait',
    desc: 'A fall at midnight, a missed medication, a sudden hospital visit — when you\'re abroad, response time matters more than anything.',
  },
  {
    icon: HeartHandshake,
    title: 'Guilt of not being there',
    desc: 'You want the best for your parents, but distance makes it hard. The right local support team is the next best thing to being home.',
  },
];

const services = [
  { name: 'Elderly Care Attendants', link: '/services/elderly-care/', desc: 'Companionship, mobility support, medication reminders, and daily assistance for aging parents.' },
  { name: 'Patient Care at Home', link: '/services/patient-care/', desc: 'Post-surgical recovery, nursing support, and bedside care — right at home in Chennai.' },
  { name: 'Home Cooks', link: '/services/cooking/', desc: 'Fresh, home-cooked meals tailored to dietary needs — South Indian, vegetarian, or custom.' },
  { name: 'Maid & Domestic Help', link: '/services/maid-work/', desc: 'Sweeping, mopping, dishwashing, laundry, and home upkeep so the house stays in order.' },
];

export default function NriPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'NRI Services', url: '/nri/' },
  ];

  return (
    <div className="svc-page" style={{ '--svc-accent': 'var(--blue-500)' }}>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="service-hero-editorial svc-hero svc-hero-split">
        <div className="svc-hero-content">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-mark" aria-hidden="true" />
            For NRI families
          </span>
          <h1 className="hero-headline-serif" style={{ fontSize: '2.6rem' }}>
            Parents in Chennai. <em>You&apos;re abroad.</em>
          </h1>
          <p className="hero-body-text">
            Arrange verified home cooks, maids, elderly caregivers, and patient care attendants for your family in Chennai — without flying home. Trusted by NRI families across the US, UK, UAE, Singapore, and Australia.
          </p>
          <div className="hero-button-group">
            <a href={getWhatsAppUrl("Hello, I'm an NRI looking for domestic help / care for my parents in Chennai.")} target="_blank" rel="noopener noreferrer" className="btn-lime">
              <MessageCircle size={16} /> WhatsApp Us Now
            </a>
            <a href={`tel:${agencyInfo.phone1}`} className="btn-secondary-pill">
              <Phone size={16} /> Call {agencyInfo.phoneDisplay1}
            </a>
          </div>
          <p className="hero-cta-micro">
            WhatsApp answered {agencyInfo.hours}, {agencyInfo.responseTime} — we accommodate your timezone
          </p>
        </div>
        <div className="svc-hero-media">
          <div style={{ width: '100%', height: '100%', minHeight: '400px', background: 'var(--ink-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px', padding: '40px' }}>
            <div style={{ color: '#fff', maxWidth: '340px', textAlign: 'center' }}>
              <Globe size={56} style={{ opacity: 0.7, marginBottom: '20px' }} />
              <p style={{ fontSize: '1.2rem', lineHeight: 1.6, opacity: 0.9, fontWeight: 500 }}>
                &ldquo;I arranged a full-time attendant for my mother in Adyar from San Francisco. They handle everything — I just get updates on WhatsApp.&rdquo;
              </p>
              <p style={{ fontSize: '0.85rem', opacity: 0.5, marginTop: '16px' }}>— NRI family, California</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why it's hard */}
      <section className="section-light">
        <div className="container">
          <h2 className="section-heading">We understand what you&apos;re <em>dealing with.</em></h2>
          <p className="section-subline" style={{ maxWidth: '720px' }}>
            Being an NRI caring for family in Chennai comes with unique challenges. Here&apos;s how we help bridge the distance.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginTop: '32px' }}>
            {challenges.map((item, i) => (
              <div key={i} style={{ padding: '28px', background: '#fff', borderRadius: '16px', border: '1px solid var(--line-light)' }}>
                <item.icon size={22} style={{ color: 'var(--blue-500)', marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--ink-900)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--ink-600)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services for NRI families */}
      <section className="section-dark verify-band">
        <div className="container">
          <h2 className="section-heading verify-heading">Services for your family in Chennai</h2>
          <p className="verify-subline">
            Whether it&apos;s daily meals, elderly companionship, or post-hospital care — we place verified helpers across Chennai and OMR.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '32px' }}>
            {services.map((svc, i) => (
              <Link key={i} href={svc.link} style={{ display: 'block', padding: '24px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', color: '#fff' }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {svc.name} <ArrowRight size={14} style={{ opacity: 0.6 }} />
                </div>
                <div style={{ fontSize: '0.88rem', opacity: 0.65, lineHeight: 1.6 }}>{svc.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works for NRIs */}
      <section className="section-light">
        <div className="container">
          <h2 className="section-heading">How it works <em>from abroad</em></h2>
          <ol className="hiring-steps" style={{ marginTop: '32px' }}>
            {[
              { num: '01', title: 'WhatsApp or call us', desc: 'Share your parents\' address in Chennai, their needs, and your preferred timings. We work across timezones.' },
              { num: '02', title: 'We shortlist verified helpers', desc: 'Background-checked candidates with relevant experience — cooking, elder care, patient care, or household work.' },
              { num: '03', title: 'You approve (video call if needed)', desc: 'We arrange a phone or video call so you can speak with the candidate before confirming. No surprises.' },
              { num: '04', title: 'Helper starts. We keep you updated.', desc: 'Once placed, we stay in touch via WhatsApp. Any issues? We handle replacements promptly.' },
            ].map((step) => (
              <li key={step.num} className="hiring-step">
                <div className="hiring-step-num" aria-hidden="true">{step.num}</div>
                <h3 className="hiring-step-title">{step.title}</h3>
                <p className="hiring-step-desc">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Trust band */}
      <section className="section-light-tight" style={{ background: 'var(--sage-50)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px' }}>
          <ShieldCheck size={32} style={{ color: 'var(--blue-500)', marginBottom: '16px' }} />
          <h2 className="section-heading" style={{ justifyContent: 'center' }}>Verified. Background-checked. <em>Local.</em></h2>
          <p className="section-subline" style={{ margin: '16px auto 0' }}>
            Every helper we place goes through Aadhaar identity verification, residential background checks, and prior-work reference calls. You get a helper you can trust — even from 8,000 miles away.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
            {['Aadhaar Verified', 'Background Checked', 'Reference Verified', 'Replacement Support'].map((tag) => (
              <span key={tag} style={{ padding: '8px 16px', background: '#fff', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-700)', border: '1px solid var(--line-light)' }}>
                <Check size={13} style={{ marginRight: 6, verticalAlign: '-2px' }} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <WhatsAppCTA
        eyebrow="For NRI families worldwide"
        title="Your parents deserve reliable help. You deserve peace of mind."
        subtitle={`Message us on WhatsApp at ${agencyInfo.phoneDisplay1} or call ${agencyInfo.phoneDisplay1}. Share your parents' address in Chennai and their needs — we'll handle the rest.`}
        customMessage="Hello, I'm an NRI looking for domestic help / care for my parents in Chennai."
        buttonText="Arrange Help on WhatsApp"
      />
    </div>
  );
}
