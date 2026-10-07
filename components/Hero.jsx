'use client';

import { useState } from 'react';
import Image from 'next/image';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import { ArrowRight, Phone } from 'lucide-react';

export default function Hero() {
  const [need, setNeed] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = need.trim();
    const message = text
      ? `Hello Colours Life, ${text}. Please share availability.`
      : "Hello Colours Life, I'd like to enquire about a domestic service.";
    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="hero-cards" aria-label="Trusted domestic help in Chennai">
      <div className="container hero-cards-grid">
        <div className="hero-card hero-card-text">
          <h1 className="hero-headline">
            Home Care Staffing.<br />
            <span className="hero-headline-accent">Chennai&rsquo;s Trusted Experts.</span>
          </h1>

          <p className="hero-body">
            Cooks, maids, baby-care, patient-care, and drivers — verified, matched to your home, ready when you need them.
          </p>

          <form className="hero-form" onSubmit={handleSubmit}>
            <label className="hero-form-label" htmlFor="hero-need">
              *Tell us what you need
            </label>
            <div className="hero-form-field">
              <input
                id="hero-need"
                type="text"
                className="hero-form-input"
                placeholder="e.g., Brahmin cook for family of 4 in OMR"
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                autoComplete="off"
              />
              <button type="submit" className="hero-form-submit" aria-label="Send enquiry on WhatsApp">
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </form>

          <a href={`tel:${agencyInfo.phone1}`} className="hero-secondary-link">
            <Phone size={14} aria-hidden="true" />
            <span>Or call Thomas R · {agencyInfo.phoneDisplay1}</span>
          </a>
        </div>

        <div className="hero-card hero-card-image">
          <svg className="hero-card-blob" viewBox="0 0 600 600" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
            <path
              fill="#DCE9F4"
              d="M300,55 C418,55 510,128 542,238 C574,348 538,460 442,514 C346,568 200,560 110,478 C46,420 36,302 86,202 C136,108 200,55 300,55 Z"
            />
          </svg>
          <Image
            src="https://res.cloudinary.com/akjmqvws/image/upload/v1791353138/hero-right.png"
            alt="Colours Life domestic help team — cook, maid, baby-care attendant, driver and cleaner in Chennai"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 992px) 100vw, 50vw"
            className="hero-card-img"
          />
        </div>
      </div>
    </section>
  );
}
