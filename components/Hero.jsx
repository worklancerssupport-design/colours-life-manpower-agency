'use client';

import Image from 'next/image';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const defaultMsg = "Hello Colours Life Manpower Agency, I'd like to find a caregiver matched to my family.";
const whatsappUrl = getWhatsAppUrl(defaultMsg);

export default function Hero() {
  return (
    <section className="hero" aria-label="Trusted home help and caregivers in Chennai">
      <div className="container hero-grid">
        <div className="hero-content">
          <h1 className="hero-headline">
            Your Home Help,<br />
            <em>Vetted</em> and <span className="hero-headline-accent">Matched to Yours.</span>
          </h1>

          <p className="hero-subline">
            Compassionate, ID-verified cooks, nannies, elderly attendants, maids and drivers — chosen for your family by Thomas R and placed within days, not weeks.
          </p>

          <div className="hero-cta-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime"
            >
              Find Your Caregiver Today
              <ArrowRight size={17} className="btn-lime-arrow" aria-hidden="true" />
            </a>
            <a href={`tel:${agencyInfo.phone1}`} className="btn-ghost-dark">
              Call {agencyInfo.phoneDisplay1}
            </a>
          </div>
        </div>

        <div className="hero-media">
          <div
            className="hero-image-frame"
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4 / 5',
              maxHeight: '640px',
              borderRadius: '24px',
              overflow: 'hidden',
              background: '#134039',
            }}
          >
            <Image
              src="https://res.cloudinary.com/akjmqvws/image/upload/v1791353138/hero-right.png"
              alt="Colours Life domestic caregivers in Chennai"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 992px) 100vw, 60vw"
              className="hero-image"
              style={{ objectFit: 'cover', objectPosition: '95% 50%' }}
            />
          </div>
        </div>
      </div>

      <div className="logo-strip">
        <div className="container">
          <div className="logo-strip-row" aria-label="Service areas and communities">
            <span>OMR Corridor</span>
            <span>Thoraipakkam</span>
            <span>Perungudi</span>
            <span>Sholinganallur</span>
            <span>Velachery</span>
            <span>Adyar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
