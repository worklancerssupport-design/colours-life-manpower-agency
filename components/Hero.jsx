'use client';

import Image from 'next/image';
import Link from 'next/link';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import servicesData from '@/data/services.json';
import { ArrowRight } from 'lucide-react';

const shortLabels = {
  'Cooking': 'Cook',
  'Newborn Care': 'Newborn',
  'Baby Care': 'Baby',
  'Elderly Care': 'Elderly',
  'Maid Work': 'Maid',
  'Patient Care': 'Patient',
  'Brahmin Cook': 'Brahmin Cook',
  'Drivers': 'Drivers',
};

const defaultMsg = "Hello Colours Life Manpower Agency, I'd like to find a caregiver matched to my family.";
const whatsappUrl = getWhatsAppUrl(defaultMsg);

export default function Hero() {
  return (
    <section className="hero" aria-label="Trusted home help and caregivers in Chennai">
      <div className="hero-row">
        <div className="hero-content-wrap">
          <div className="hero-content">
            <h1 className="hero-headline">
              Your Home Help,<br />
              <em>Vetted</em> and <span className="hero-headline-accent">Matched to Yours.</span>
            </h1>

            <p className="hero-subline">
              Compassionate, ID-verified cooks, nannies, elderly attendants, maids and drivers — chosen for your family and placed within days, not weeks.
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
          <Image
            src="https://res.cloudinary.com/akjmqvws/image/upload/v1791447169/hero-hopefully.png"
            alt="Colours Life domestic caregivers in Chennai"
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
            {servicesData.map((svc) => (
              <Link key={svc.id} href={svc.path}>{shortLabels[svc.shortName] || svc.shortName}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
