import Image from 'next/image';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import reviewsData from '@/data/reviews.json';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { Star, MessageCircle, Info, Heart, MapPin, BadgeCheck, ShieldCheck, Phone } from 'lucide-react';

export const metadata = {
  title: "Customer Reviews & Testimonials | Colours Life Manpower Agency Chennai",
  description: "Read client reviews for Colours Life Manpower Agency in Okkiyam Thoraipakkam, Chennai. Real feedback on home cooks, baby caretakers, maids, elderly attendants, and drivers.",
  alternates: {
    canonical: `${agencyInfo.siteUrl}/reviews/`,
  }
};

const serviceShort = {
  'Cooking / Cook Service': 'Cook',
  'Newborn Baby Care': 'Newborn Care',
  'Elderly Care': 'Elderly Care',
  'Maid Work / Domestic Help': 'Maid',
  'Brahmin Cook': 'Brahmin Cook',
  'Patient Care': 'Patient Care',
};

function initials(name) {
  return name
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function ReviewsPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Reviews', url: '/reviews/' }
  ];

  const [lead, ...rest] = reviewsData;

  return (
    <div className="svc-page reviews-page" style={{ '--svc-accent': 'var(--lime-500)' }}>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* 1. Hero — value first, image fills the right half */}
      <section className="service-hero-editorial svc-hero svc-hero-split">
        <div className="svc-hero-content">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-mark" aria-hidden="true" />
            Client feedback · verified placements
          </span>

          <h1 className="hero-headline-serif">
            What families say after <em>the help arrives.</em>
          </h1>

          <p className="hero-body-text">
            Real feedback from homes across Okkiyam Thoraipakkam, OMR, Velachery and Adyar — the
            same families we place cooks, caretakers, maids and attendants with every week.
          </p>

          <div className="hero-facts-bar">
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><BadgeCheck size={13} /></span>
              Every review from a real family
            </span>
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><MapPin size={13} /></span>
              Okkiyam Thoraipakkam · OMR · Adyar
            </span>
            <span className="hero-fact">
              <span className="hero-fact-mark" aria-hidden="true"><ShieldCheck size={13} /></span>
              Names and localities as shared
            </span>
          </div>

          <div className="hero-button-group">
            <a
              href={getWhatsAppUrl("Hello Colours Life Manpower Agency, I'd like to enquire about domestic help for my home.")}
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
            src="/images/hero-chennai-manpower.jpg"
            alt="A Chennai household with a domestic helper placed by Colours Life Manpower Agency"
            fill
            priority
            sizes="(max-width: 991px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: '60% 50%' }}
          />
        </div>
      </section>

      {/* 2. Reviews — the proof, led by one, then the rest */}
      <section className="section-light reviews-section">
        <div className="container">
          <article className="reviews-lead">
            <div className="reviews-lead-main">
              <div className="reviews-lead-head">
                <span className="reviews-tag">{serviceShort[lead.service] || lead.service}</span>
                <span className="reviews-stars" aria-label={`${lead.rating} out of 5 stars`}>
                  {Array.from({ length: lead.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
              </div>
              <blockquote className="reviews-quote-lead">&ldquo;{lead.comment}&rdquo;</blockquote>
            </div>

            <div className="reviews-lead-aside">
              <div className="reviews-lead-author">
                <span className="reviews-avatar" aria-hidden="true">{initials(lead.author)}</span>
                <div>
                  <div className="reviews-name reviews-name-dark">
                    {lead.author}
                    <BadgeCheck size={15} aria-label="Verified client" />
                  </div>
                  <div className="reviews-loc reviews-loc-dark">
                    <MapPin size={12} /> {lead.location}
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div className="testimonials-grid reviews-grid">
            {rest.map((rev) => (
              <article className="testimonial-card" key={rev.id}>
                <header className="testimonial-card-head">
                  <span className="testimonial-card-service">{serviceShort[rev.service] || rev.service}</span>
                  <span className="testimonial-card-stars" aria-label={`${rev.rating} out of 5 stars`}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </span>
                </header>
                <blockquote className="testimonial-card-quote">&ldquo;{rev.comment}&rdquo;</blockquote>
                <footer className="testimonial-card-author">
                  <span className="testimonial-card-avatar" aria-hidden="true">{initials(rev.author)}</span>
                  <div>
                    <div className="reviews-name">
                      {rev.author}
                      <BadgeCheck size={14} aria-label="Verified client" />
                    </div>
                    <div className="reviews-loc">
                      <MapPin size={12} /> {rev.location}
                    </div>
                  </div>
                </footer>
              </article>
            ))}
          </div>

          <div className="scope-note reviews-note">
            <Info size={16} aria-hidden="true" />
            <p>
              These reviews are structured client feedback for real Chennai placements — no bought
              ratings, no invented names. If you&apos;re a past client, we&apos;d welcome your experience too.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Review invite — for existing clients */}
      <section className="section-light-tight reviews-invite-section">
        <div className="container">
          <div className="reviews-invite">
            <div className="reviews-invite-copy">
              <span className="reviews-invite-icon" aria-hidden="true"><Heart size={18} /></span>
              <div>
                <h2 className="reviews-invite-title">Already a client? Share how it went.</h2>
                <p>Your words help other Chennai families decide with confidence.</p>
              </div>
            </div>
            <a
              href={getWhatsAppUrl("Hello, I would like to submit my review for Colours Life Manpower Agency.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-pill"
            >
              <MessageCircle size={16} /> Submit Your Review
            </a>
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <WhatsAppCTA
        eyebrow="Replies within the hour"
        title="Tell us what your home needs."
        subtitle="Share your area and shift on WhatsApp. You reach the owner directly — no IVR, no bots."
      />
    </div>
  );
}
