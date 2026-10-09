import Link from 'next/link';
import Image from 'next/image';
import reviewsData from '@/data/reviews.json';
import casesData from '@/data/cases.json';
import agencyInfo from '@/data/agency.json';
import { fillPlaceholders } from '@/lib/utils';
import { Star } from 'lucide-react';

export default function ToughestCases() {
  const [headingLead, headingEmPart] = fillPlaceholders(casesData.section.heading).split('<em>');
  const headingEm = (headingEmPart || '').replace('</em>', '').replace(/&apos;/g, "'");

  return (
    <section className="section-light" id="toughest" aria-label="Toughest placements we handle">
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <span className="section-eyebrow">
            <span className="section-eyebrow-mark" />
            {fillPlaceholders(casesData.section.eyebrow)}
          </span>
          <h2 className="section-heading">
            {headingLead}
            <em>{headingEm}</em>
          </h2>
          <p className="section-subline">
            {fillPlaceholders(casesData.section.subline)}
          </p>
        </div>

        <div className="cases-grid">
          {casesData.stories.map((c) => (
            <Link
              key={c.id}
              href={`/services/${c.slug}/`}
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
              {agencyInfo.stats.ratingLabel} from {reviewsData.length} verified {agencyInfo.address.city} families
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
