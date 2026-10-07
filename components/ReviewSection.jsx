'use client';

import { useState, useEffect } from 'react';
import reviewsData from '@/data/reviews.json';
import { getWhatsAppUrl } from '@/lib/utils';
import { 
  Star, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Quote
} from 'lucide-react';

const serviceTags = {
  'Cooking / Cook Service': 'COOK SERVICE',
  'Newborn Baby Care': 'BABY CARE',
  'Baby Care': 'CHILDCARE',
  'Elderly Care': 'ELDERLY CARE',
  'Maid Work / Domestic Help': 'DOMESTIC HELP',
  'Brahmin Cook': 'BRAHMIN COOK',
  'Patient Care': 'PATIENT CARE',
  'Drivers': 'DRIVER SERVICE'
};

const paletteThemes = [
  {
    name: 'Warm Peach',
    bg: 'linear-gradient(145deg, #FFF3EB 0%, #FFE7DC 55%, #FFF9F5 100%)',
    borderColor: 'rgba(212, 84, 26, 0.18)',
    accentColor: '#D4541A',
    avatarBg: 'linear-gradient(135deg, #F07240 0%, #D4541A 100%)',
    tagBg: 'rgba(212, 84, 26, 0.09)',
    tagColor: '#A33E10',
    glow: '0 24px 60px rgba(212, 84, 26, 0.11), 0 0 45px rgba(255, 215, 195, 0.45)'
  },
  {
    name: 'Lavender',
    bg: 'linear-gradient(145deg, #F9F5FF 0%, #EFE8FF 55%, #FBF9FF 100%)',
    borderColor: 'rgba(124, 58, 237, 0.18)',
    accentColor: '#7C3AED',
    avatarBg: 'linear-gradient(135deg, #9333EA 0%, #6D28D9 100%)',
    tagBg: 'rgba(124, 58, 237, 0.09)',
    tagColor: '#5B21B6',
    glow: '0 24px 60px rgba(124, 58, 237, 0.11), 0 0 45px rgba(230, 215, 255, 0.45)'
  },
  {
    name: 'Sage',
    bg: 'linear-gradient(145deg, #F4FAF6 0%, #E3F3EA 55%, #F9FCFA 100%)',
    borderColor: 'rgba(14, 140, 132, 0.18)',
    accentColor: '#0E8C84',
    avatarBg: 'linear-gradient(135deg, #14B8AD 0%, #0A6B64 100%)',
    tagBg: 'rgba(14, 140, 132, 0.09)',
    tagColor: '#0A6B64',
    glow: '0 24px 60px rgba(14, 140, 132, 0.11), 0 0 45px rgba(215, 245, 230, 0.45)'
  },
  {
    name: 'Powder Blue',
    bg: 'linear-gradient(145deg, #F4F8FF 0%, #E4EFFF 55%, #FAF9FF 100%)',
    borderColor: 'rgba(37, 99, 235, 0.16)',
    accentColor: '#2563EB',
    avatarBg: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    tagBg: 'rgba(37, 99, 235, 0.09)',
    tagColor: '#1E40AF',
    glow: '0 24px 60px rgba(37, 99, 235, 0.10), 0 0 45px rgba(215, 235, 255, 0.45)'
  },
  {
    name: 'Warm Cream',
    bg: 'linear-gradient(145deg, #FFFDF8 0%, #FFF3D6 55%, #FFFDF9 100%)',
    borderColor: 'rgba(217, 119, 6, 0.18)',
    accentColor: '#D97706',
    avatarBg: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
    tagBg: 'rgba(217, 119, 6, 0.09)',
    tagColor: '#92400E',
    glow: '0 24px 60px rgba(217, 119, 6, 0.10), 0 0 45px rgba(255, 240, 200, 0.45)'
  },
  {
    name: 'Soft Rose',
    bg: 'linear-gradient(145deg, #FFF5F3 0%, #FFE9E5 55%, #FFFBF9 100%)',
    borderColor: 'rgba(225, 29, 72, 0.16)',
    accentColor: '#E11D48',
    avatarBg: 'linear-gradient(135deg, #FB7185 0%, #BE123C 100%)',
    tagBg: 'rgba(225, 29, 72, 0.09)',
    tagColor: '#9F1239',
    glow: '0 24px 60px rgba(225, 29, 72, 0.10), 0 0 45px rgba(255, 220, 220, 0.45)'
  }
];

export default function ReviewSection({ limit = 6, showBanner = true }) {
  const reviews = reviewsData.slice(0, limit);
  const [featuredIndex, setFeaturedIndex] = useState(1); // Divya & Rajesh (Newborn Baby Care) as default feature
  const [isPaused, setIsPaused] = useState(false);

  const totalReviews = reviews.length;

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % totalReviews);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  // Subtle auto-advance every 8 seconds, paused on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextFeatured();
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, totalReviews]);

  // Current featured review & secondary surrounding reviews
  const featuredReview = reviews[featuredIndex];
  const featuredTheme = paletteThemes[featuredIndex % paletteThemes.length];

  // Pick two distinct secondary reviews to flank the featured review
  const secondaryIndex1 = (featuredIndex + 1) % totalReviews;
  const secondaryIndex2 = (featuredIndex + 2) % totalReviews;
  const secondaryReview1 = reviews[secondaryIndex1];
  const secondaryReview2 = reviews[secondaryIndex2];
  const secondaryTheme1 = paletteThemes[secondaryIndex1 % paletteThemes.length];
  const secondaryTheme2 = paletteThemes[secondaryIndex2 % paletteThemes.length];

  return (
    <section 
      className="editorial-voices-section" 
      id="reviews"
      aria-label="Real Experiences — Customer Voices"
    >
      {/* Ambient background glow layers (peach, lavender, powder blue/sage, blur: 80px, opacity: 0.25) */}
      <div className="editorial-ambient-glow-layer" aria-hidden="true">
        <div className="glow-blob-peach" />
        <div className="glow-blob-lavender" />
        <div className="glow-blob-blue" />
        <div className="glow-blob-sage" />
      </div>

      {/* Decorative floating elements: tiny sparkles, circles, curved lines */}
      <svg className="editorial-svg-decorations" viewBox="0 0 1400 700" fill="none" aria-hidden="true">
        <path d="M60 160 C 260 70, 520 220, 760 110 C 980 0, 1160 130, 1340 70" stroke="rgba(212, 84, 26, 0.08)" strokeWidth="1.5" strokeDasharray="5 7" />
        <path d="M120 580 C 380 500, 720 620, 980 530 C 1160 460, 1260 540, 1380 510" stroke="rgba(124, 58, 237, 0.07)" strokeWidth="1.5" strokeDasharray="5 7" />
        <circle cx="290" cy="120" r="4" fill="#D4541A" opacity="0.25" />
        <circle cx="1060" cy="160" r="5" fill="#7C3AED" opacity="0.22" />
        <circle cx="1200" cy="480" r="4" fill="#0E8C84" opacity="0.25" />
        {/* Soft floating pastel rings */}
        <circle cx="820" cy="90" r="16" stroke="rgba(212, 84, 26, 0.12)" strokeWidth="1.5" fill="none" />
        <circle cx="480" cy="620" r="22" stroke="rgba(124, 58, 237, 0.10)" strokeWidth="1.5" fill="none" />
      </svg>

      <div className="container editorial-voices-container">
        
        {/* ========================================================
            1. LARGE EDITORIAL HEADING & STORY NAVIGATOR
            ======================================================== */}
        <div className="editorial-heading-block">
          <div className="giant-watermark-quote" aria-hidden="true">“</div>

          <div className="editorial-heading-inner">
            <div className="editorial-eyebrow-pill">
              <Sparkles size={13} className="eyebrow-sparkle" />
              <span>REAL EXPERIENCES</span>
            </div>

            <h2 className="editorial-main-headline">
              <span className="headline-line-1">What Families Say</span>
              <span className="headline-line-2">About Their Experience With Us</span>
            </h2>

            <div className="editorial-rating-row">
              <div className="editorial-stars-wrap" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span className="editorial-rating-tag">Trusted experiences</span>
            </div>

            <p className="editorial-lead-description">
              Real stories from families across Okkiyam Thoraipakkam, OMR, Velachery, and Chennai whom we’ve thoughtfully supported with cooks, newborn nannies, elderly attendants, and domestic staff.
            </p>
          </div>

          {/* Editorial Controls: Index Counter, Stories Switcher & Nav Buttons */}
          <div className="editorial-nav-panel">
            <div className="editorial-counter-box">
              <span className="counter-digit-current">0{featuredIndex + 1}</span>
              <span className="counter-slash">/</span>
              <span className="counter-digit-max">0{totalReviews}</span>
            </div>

            <div className="editorial-arrow-group">
              <button
                type="button"
                onClick={prevFeatured}
                className="editorial-circle-nav-btn prev-btn"
                aria-label="Previous family experience"
                title="Previous family experience"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={nextFeatured}
                className="editorial-circle-nav-btn next-btn"
                aria-label="Next family experience"
                title="Next family experience"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Family Story Pills Switcher */}
        <div className="editorial-story-tabs" role="tablist" aria-label="Select client experience">
          {reviews.map((rev, idx) => {
            const tag = serviceTags[rev.service] || 'DOMESTIC SERVICE';
            const isActive = idx === featuredIndex;
            return (
              <button
                key={rev.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFeaturedIndex(idx)}
                className={`story-tab-pill ${isActive ? 'active' : ''}`}
              >
                <span className="tab-pill-number">0{idx + 1}</span>
                <span className="tab-pill-tag">{tag}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            2. ASYMMETRIC COMPOSITION: FEATURED + SECONDARY FLOATING NOTES
            ======================================================== */}
        <div 
          className="editorial-asymmetric-composition"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* A. LARGE FEATURED TESTIMONIAL (55-60% width, soft organic shape, tilt) */}
          <article 
            className="featured-testimonial-hero"
            style={{
              background: featuredTheme.bg,
              borderColor: featuredTheme.borderColor,
              boxShadow: featuredTheme.glow
            }}
          >
            {/* Large Watermark Quote Inside Card */}
            <div className="featured-quote-watermark" aria-hidden="true">
              <Quote size={88} strokeWidth={1} color={featuredTheme.accentColor} opacity={0.16} />
            </div>

            {/* Header: Service Tag + Star Display */}
            <div className="featured-card-top">
              <span 
                className="editorial-service-tag"
                style={{
                  backgroundColor: featuredTheme.tagBg,
                  color: featuredTheme.tagColor,
                  borderColor: featuredTheme.borderColor
                }}
              >
                {serviceTags[featuredReview.service] || featuredReview.service.toUpperCase()}
              </span>

              <div className="featured-stars" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={17} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
            </div>

            {/* Main Featured Quote Text */}
            <blockquote className="featured-quote-body">
              “{featuredReview.comment}”
            </blockquote>

            {/* Customer Identity Bar */}
            <div className="featured-customer-bar">
              <div 
                className="featured-avatar-circle"
                style={{ background: featuredTheme.avatarBg }}
                aria-hidden="true"
              >
                {featuredReview.author.charAt(0)}
              </div>

              <div className="featured-customer-details">
                <div className="featured-customer-name-row">
                  <span className="featured-customer-name">{featuredReview.author}</span>
                  <span className="featured-verified-chip">
                    <CheckCircle2 size={13} color="#0E8C84" /> Verified Client
                  </span>
                </div>
                <div className="featured-customer-location">
                  <MapPin size={13} color="#D4541A" />
                  <span>{featuredReview.location}</span>
                  <span className="location-divider">•</span>
                  <span className="service-sub-name">{featuredReview.service}</span>
                </div>
              </div>

              {/* Direct WhatsApp connect icon for this service */}
              <a
                href={getWhatsAppUrl(`Hello Thomas R, I read ${featuredReview.author}'s review about ${featuredReview.service} and would like to enquire.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="featured-wa-action"
                title={`Enquire on WhatsApp about ${featuredReview.service}`}
              >
                <MessageCircle size={16} />
                <span className="wa-action-label">Enquire</span>
              </a>
            </div>
          </article>

          {/* B. SECONDARY EDITORIAL FLOATING CARDS (Asymmetric flanking notes) */}
          <aside className="secondary-floating-cluster" aria-label="Other client notes">
            
            {/* Small Review 1 (Pastel note, slightly rotated) */}
            <div 
              className="secondary-note-card note-top-tilt"
              style={{
                background: secondaryTheme1.bg,
                borderColor: secondaryTheme1.borderColor
              }}
              onClick={() => setFeaturedIndex(secondaryIndex1)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setFeaturedIndex(secondaryIndex1); }}
              title="Click to view full feature"
            >
              <div className="secondary-card-head">
                <span 
                  className="secondary-tag-pill"
                  style={{
                    backgroundColor: secondaryTheme1.tagBg,
                    color: secondaryTheme1.tagColor,
                    borderColor: secondaryTheme1.borderColor
                  }}
                >
                  {serviceTags[secondaryReview1.service] || 'SERVICE'}
                </span>
                <div className="secondary-stars">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={13} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
              </div>

              <p className="secondary-quote-text">
                “{secondaryReview1.comment.length > 130 ? `${secondaryReview1.comment.slice(0, 130)}...` : secondaryReview1.comment}”
              </p>

              <div className="secondary-author-row">
                <div 
                  className="secondary-avatar"
                  style={{ background: secondaryTheme1.avatarBg }}
                >
                  {secondaryReview1.author.charAt(0)}
                </div>
                <div>
                  <div className="secondary-author-name">{secondaryReview1.author}</div>
                  <div className="secondary-author-loc">📍 {secondaryReview1.location.split(',')[0]}</div>
                </div>
                <span className="secondary-read-link">Expand ↗</span>
              </div>
            </div>

            {/* Small Review 2 (Pastel note, counter-rotated) */}
            <div 
              className="secondary-note-card note-bottom-tilt"
              style={{
                background: secondaryTheme2.bg,
                borderColor: secondaryTheme2.borderColor
              }}
              onClick={() => setFeaturedIndex(secondaryIndex2)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setFeaturedIndex(secondaryIndex2); }}
              title="Click to view full feature"
            >
              <div className="secondary-card-head">
                <span 
                  className="secondary-tag-pill"
                  style={{
                    backgroundColor: secondaryTheme2.tagBg,
                    color: secondaryTheme2.tagColor,
                    borderColor: secondaryTheme2.borderColor
                  }}
                >
                  {serviceTags[secondaryReview2.service] || 'SERVICE'}
                </span>
                <div className="secondary-stars">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={13} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
              </div>

              <p className="secondary-quote-text">
                “{secondaryReview2.comment.length > 130 ? `${secondaryReview2.comment.slice(0, 130)}...` : secondaryReview2.comment}”
              </p>

              <div className="secondary-author-row">
                <div 
                  className="secondary-avatar"
                  style={{ background: secondaryTheme2.avatarBg }}
                >
                  {secondaryReview2.author.charAt(0)}
                </div>
                <div>
                  <div className="secondary-author-name">{secondaryReview2.author}</div>
                  <div className="secondary-author-loc">📍 {secondaryReview2.location.split(',')[0]}</div>
                </div>
                <span className="secondary-read-link">Expand ↗</span>
              </div>
            </div>

          </aside>

        </div>

        {/* ========================================================
            3. FOOTER TRUST & DIRECT WHATSAPP INVITATION
            ======================================================== */}
        <div className="editorial-voices-footer">
          <div className="voices-trust-badge">
            <CheckCircle2 size={16} color="#0E8C84" style={{ flexShrink: 0 }} />
            <span>
              <strong>Authentic Household Placements:</strong> All experiences shown reflect verified staff placed in homes across Chennai. We welcome you to share your feedback or enquire directly with Thomas R.
            </span>
          </div>

          <div className="voices-cta-wrap">
            <a
              href={getWhatsAppUrl("Hello Thomas R, I would like to enquire about your manpower services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-wa-button"
              title="Message Thomas R on WhatsApp"
            >
              <MessageCircle size={17} />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
