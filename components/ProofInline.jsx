import reviewsData from '@/data/reviews.json';
import { Star, BadgeCheck } from 'lucide-react';

const reviewServiceMap = {
  cooking: 'Cooking / Cook Service',
  'newborn-baby-care': 'Newborn Baby Care',
  'elderly-care': 'Elderly Care',
  'maid-work': 'Maid Work / Domestic Help',
  'brahmin-cook': 'Brahmin Cook',
  'patient-care': 'Patient Care',
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

export default function ProofInline({ serviceSlug }) {
  const serviceName = reviewServiceMap[serviceSlug];
  if (!serviceName) return null;

  const reviews = reviewsData.filter((r) => r.service === serviceName && r.isVerified);
  if (!reviews.length) return null;

  return (
    <section className="section-light proof-section">
      <div className="container">
        <h2 className="section-heading">What Chennai families say</h2>

        <div className="proof-inline-grid">
          {reviews.map((review) => (
            <figure key={review.id} className="proof-card">
              <div className="proof-stars" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                ))}
              </div>

              <blockquote className="proof-quote">&ldquo;{review.comment}&rdquo;</blockquote>

              <figcaption className="proof-author">
                <span className="proof-avatar" aria-hidden="true">{initials(review.author)}</span>
                <div>
                  <div className="proof-name">
                    {review.author}
                    <BadgeCheck size={15} aria-label="Verified review" />
                  </div>
                  <div className="proof-loc">{review.location}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
