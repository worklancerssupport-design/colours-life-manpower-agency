import Link from 'next/link';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import reviewsData from '@/data/reviews.json';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { Star, MessageCircle, Info, Heart, Sparkles, MapPin, CheckCircle2, Quote } from 'lucide-react';

export const metadata = {
  title: "Customer Reviews & Testimonials | Colours Life Manpower Agency Chennai",
  description: "Read client reviews for Colours Life Manpower Agency in Okkiyam Thoraipakkam, Chennai. Real feedback on home cooks, baby caretakers, maids, elderly attendants, and drivers.",
  alternates: {
    canonical: `${agencyInfo.siteUrl}/reviews/`,
  }
};

const cardPastelThemes = [
  {
    theme: 'peach',
    bg: 'linear-gradient(145deg, #FFF7F2 0%, #FFEFE6 100%)',
    borderColor: 'rgba(212, 84, 26, 0.18)',
    glowClass: 'glow-peach',
    accentColor: '#D4541A',
    avatarBg: 'linear-gradient(135deg, #F07240 0%, #D4541A 100%)',
    pillBg: 'rgba(212, 84, 26, 0.08)',
    pillColor: '#A33E10'
  },
  {
    theme: 'lavender',
    bg: 'linear-gradient(145deg, #FAF7FF 0%, #F1EAFF 100%)',
    borderColor: 'rgba(124, 58, 237, 0.18)',
    glowClass: 'glow-lavender',
    accentColor: '#7C3AED',
    avatarBg: 'linear-gradient(135deg, #9333EA 0%, #6D28D9 100%)',
    pillBg: 'rgba(124, 58, 237, 0.08)',
    pillColor: '#5B21B6'
  },
  {
    theme: 'sage',
    bg: 'linear-gradient(145deg, #F3FAF6 0%, #E6F5EC 100%)',
    borderColor: 'rgba(14, 140, 132, 0.18)',
    glowClass: 'glow-sage',
    accentColor: '#0E8C84',
    avatarBg: 'linear-gradient(135deg, #14B8AD 0%, #0A6B64 100%)',
    pillBg: 'rgba(14, 140, 132, 0.08)',
    pillColor: '#0A6B64'
  },
  {
    theme: 'blue',
    bg: 'linear-gradient(145deg, #F3F8FF 0%, #E8F2FF 100%)',
    borderColor: 'rgba(37, 99, 235, 0.16)',
    glowClass: 'glow-blue',
    accentColor: '#2563EB',
    avatarBg: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    pillBg: 'rgba(37, 99, 235, 0.08)',
    pillColor: '#1E40AF'
  },
  {
    theme: 'cream',
    bg: 'linear-gradient(145deg, #FFFDF8 0%, #FFF8E8 100%)',
    borderColor: 'rgba(217, 119, 6, 0.18)',
    glowClass: 'glow-warm',
    accentColor: '#D97706',
    avatarBg: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
    pillBg: 'rgba(217, 119, 6, 0.08)',
    pillColor: '#92400E'
  },
  {
    theme: 'coral',
    bg: 'linear-gradient(145deg, #FFF4F2 0%, #FFE9E4 100%)',
    borderColor: 'rgba(225, 29, 72, 0.16)',
    glowClass: 'glow-peach',
    accentColor: '#E11D48',
    avatarBg: 'linear-gradient(135deg, #FB7185 0%, #BE123C 100%)',
    pillBg: 'rgba(225, 29, 72, 0.08)',
    pillColor: '#9F1239'
  }
];

export default function ReviewsPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Reviews', url: '/reviews/' }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Section */}
      <section className="service-hero-editorial theme-cooking" style={{ paddingTop: '128px' }}>
        <div className="container">
          <nav className="breadcrumbs-pill" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span style={{ color: 'var(--text-light)' }}>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>Reviews</span>
          </nav>

          <div className="section-intro-header" style={{ marginBottom: '20px' }}>
            <span className="eyebrow-pill eyebrow-lavender">
              <Sparkles size={14} /> Client Feedback
            </span>
            <h1 className="hero-headline-serif" style={{ fontSize: '3.1rem' }}>
              Client Reviews & <em>Testimonials</em>
            </h1>
            <p className="section-subtext">
              We value honest relationships with Chennai households. Read authentic feedback from clients across Okkiyam Thoraipakkam, OMR, Velachery, and Adyar who rely on our domestic staffing services.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Grid (Pastel Ambient Layer) */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #F8F5FF 0%, #FFFDF8 45%, #FFF4ED 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Transparent Notice */}
          <div style={{
            maxWidth: '860px',
            margin: '0 auto 44px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(212, 84, 26, 0.12)',
            borderRadius: 'var(--radius-lg)',
            padding: '22px 28px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Info size={24} color="#7c3aed" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
              <strong>Transparent Testimonials Notice:</strong> We take genuine pride in ethical business practices. The cards below reflect structured client feedback received for domestic staff placements in Chennai. We warmly invite current and past clients to share their thoughts directly via WhatsApp.
            </div>
          </div>

          {/* Testimonial Cards Grid with Pastel Glows */}
          <div className="testimonials-editorial-grid">
            {reviewsData.map((rev, idx) => {
              const theme = cardPastelThemes[idx % cardPastelThemes.length];
              return (
                <div 
                  key={rev.id} 
                  className={`testimonial-card-pastel ${theme.glowClass}`}
                  style={{
                    background: theme.bg,
                    borderColor: theme.borderColor
                  }}
                >
                  <div className="card-quote-watermark" aria-hidden="true" style={{ position: 'absolute', top: '16px', right: '20px', pointerEvents: 'none' }}>
                    <Quote size={40} strokeWidth={1} color={theme.accentColor} opacity={0.25} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                    <div className="testimonial-stars" aria-label={`${rev.rating} out of 5 stars`}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <span 
                      style={{ 
                        fontSize: '0.74rem', 
                        fontWeight: '700', 
                        padding: '4px 12px', 
                        borderRadius: 'var(--radius-full)', 
                        background: theme.pillBg, 
                        color: theme.pillColor, 
                        border: `1px solid ${theme.borderColor}` 
                      }}
                    >
                      {rev.service}
                    </span>
                  </div>

                  <p className="testimonial-quote">
                    “{rev.comment}”
                  </p>

                  <div className="testimonial-author-box">
                    <div 
                      className="author-circle"
                      style={{ background: theme.avatarBg }}
                    >
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{rev.author}</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', fontSize: '0.7rem', fontWeight: '700', color: '#0E8C84', background: 'rgba(14, 140, 132, 0.1)', padding: '1px 6px', borderRadius: '999px' }}>
                          <CheckCircle2 size={11} color="#0E8C84" /> Verified
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <MapPin size={12} color="#D4541A" /> {rev.location}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Review Submission Invite */}
          <div style={{
            maxWidth: '740px',
            margin: '60px auto 0',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(212, 84, 26, 0.14)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)'
          }}>
            <Heart size={32} color="#ea580c" style={{ margin: '0 auto 14px' }} />
            <h2 className="section-heading-serif" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
              Are You a Client of Colours Life Manpower Agency?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Your feedback helps us continuously improve our service and assist other Chennai families in making informed domestic hiring decisions.
            </p>
            <a
              href={getWhatsAppUrl("Hello, I would like to submit my review for Colours Life Manpower Agency.")}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn-large"
            >
              <MessageCircle size={18} /> Submit Your Review on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="container" style={{ margin: '36px auto 68px' }}>
        <WhatsAppCTA 
          title="Looking for Experienced Domestic Help in Chennai?"
          subtitle="Join dozens of satisfied families in Okkiyam Thoraipakkam and OMR. Message us today."
        />
      </div>
    </>
  );
}
