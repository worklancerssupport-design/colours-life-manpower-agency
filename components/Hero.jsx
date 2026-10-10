'use client';

import SmartImage from '@/components/SmartImage';
import Link from 'next/link';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import { getAllServices } from '@/lib/services';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const whatsappUrl = getWhatsAppUrl(agencyInfo.defaultWhatsAppMessage);

export default function Hero() {
  return (
    <section className="hero" aria-label={`Trusted home help and caregivers in ${agencyInfo.address.city}`}>
      <div className="hero-row">
        <div className="hero-content-wrap">
          <div className="hero-content">
            <h1 className="hero-headline">
              Your Home Help,<br />
              <em>Vetted</em> and <span className="hero-headline-accent">Matched to Yours.</span>
            </h1>

            <p className="hero-subline">
              Compassionate, {agencyInfo.claims.idCheckMicro} cooks, nannies, elderly attendants, maids and drivers — chosen for your family and {agencyInfo.claims.placementSpeed.toLowerCase()}, not weeks.
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
        </div>

        <div className="hero-media">
          <SmartImage
            src="https://res.cloudinary.com/akjmqvws/image/upload/v1791447169/hero-hopefully.png"
            alt={`${agencyInfo.name} domestic caregivers in ${agencyInfo.address.city}`}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 991px) 100vw, 50vw"
            className="hero-image"
            style={{ objectFit: 'cover', objectPosition: '90% 50%' }}
          />
        </div>
      </div>

      <div className="logo-strip">
        <div className="container">
          <div className="logo-strip-row" aria-label="Services offered">
              {getAllServices().map((svc) => (
                <Link key={svc.id} href={svc.path} className="logo-strip-chip">
                  <span className="logo-strip-chip-label">{svc.tabLabel}</span>
                  <ArrowUpRight size={14} className="logo-strip-chip-arrow" aria-hidden="true" />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
