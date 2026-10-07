import Link from 'next/link';
import Image from 'next/image';
import reviewsData from '@/data/reviews.json';
import { ArrowRight, Play, Star } from 'lucide-react';

const caseStories = [
  {
    id: 'cooking',
    tag: 'Cook · 5 yrs',
    title: "A Mother's First Day Home, Fed By Team",
    img: '/images/cooking-service-chennai.jpg',
    alt: 'A home cook preparing a warm South Indian meal',
    href: '/services/cooking/',
  },
  {
    id: 'newborn',
    tag: 'Newborn · 12 hr',
    title: 'From NICU To Garden Smiles Again',
    img: '/images/newborn-baby-care-chennai.jpg',
    alt: 'A newborn baby sleeping peacefully under care',
    href: '/services/newborn-baby-care/',
  },
  {
    id: 'elderly',
    tag: 'Elderly · Live-in',
    title: "Richard's 80th, Our Hands",
    img: '/images/elderly-care-service-chennai.jpg',
    alt: 'An elderly gentleman smiling with his caregiver',
    href: '/services/elderly-care/',
  },
  {
    id: 'patient',
    tag: 'Patient · Recovery',
    title: "A Hip Surgery, Home Safe",
    img: '/images/patient-care-service-chennai.jpg',
    alt: 'A patient being assisted during recovery',
    href: '/services/patient-care/',
  },
];

export default function ToughestCases() {
  return (
    <section className="section-light" id="toughest" aria-label="Toughest placements we handle">
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <span className="section-eyebrow">
            <span className="section-eyebrow-mark" />
            Toughest placements
          </span>
          <h2 className="section-heading">
            We Handle The <em>Toughest Home Placements.</em>
          </h2>
          <p className="section-subline">
            Dementia? Post-ICU? A first-time grandparent? A strict Brahmin kitchen with onion-and-garlic-free rules? A family that has tried two helpers already this year. We take the calls other agencies return.
          </p>
          <Link href="/contact/" className="btn-lime" style={{ marginTop: 24 }}>
            See All Placements
            <ArrowRight size={16} className="btn-lime-arrow" aria-hidden="true" />
          </Link>
        </div>

        <div className="cases-grid">
          {caseStories.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="case-card"
              aria-label={`Read about ${c.title}`}
            >
              <div className="case-card-image">
                <Image
                  src={c.img}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="case-card-overlay" />
              <span className="case-card-play" aria-hidden="true">
                <Play size={16} fill="currentColor" />
              </span>
              <div className="case-card-body">
                <span className="case-card-tag">{c.tag}</span>
                <span className="case-card-title">{c.title}</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{
          marginTop: 56,
          paddingTop: 28,
          borderTop: '1px solid var(--line-light)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 4, color: 'var(--lime-600)' }} aria-label="5 stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} />
            ))}
            <span style={{ marginLeft: 10, color: 'var(--ink-on-light)', fontWeight: 700 }}>
              4.9/5 from {reviewsData.length} verified Chennai families
            </span>
          </div>
          <Link
            href="/reviews/"
            className="btn-ghost-dark"
            style={{ color: 'var(--ink-on-light)', padding: '12px 4px' }}
          >
            Read All Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}