'use client';

import { useState } from 'react';
import Link from 'next/link';
import reviewsData from '@/data/reviews.json';
import agencyInfo from '@/data/agency.json';
import { getServiceByReviewName } from '@/lib/services';
import { Star, ArrowUpRight } from 'lucide-react';

const palette = [
  { tag: 'rgba(204, 242, 106, 0.18)', tagColor: '#3F6212' },
  { tag: 'rgba(204, 242, 106, 0.18)', tagColor: '#3F6212' },
  { tag: 'rgba(204, 242, 106, 0.18)', tagColor: '#3F6212' },
  { tag: 'rgba(204, 242, 106, 0.18)', tagColor: '#3F6212' },
  { tag: 'rgba(204, 242, 106, 0.18)', tagColor: '#3F6212' },
  { tag: 'rgba(204, 242, 106, 0.18)', tagColor: '#3F6212' },
];

export default function ReviewSection({ limit = 6, seeMoreHref }) {
  const reviews = (reviewsData || []).slice(0, limit);
  if (reviews.length === 0) return null;

  return (
    <section className="section-light section-light-tight" id="reviews" aria-label="Family reviews">
      <div className="container">
        <div style={{ maxWidth: 720, marginBottom: 36 }}>
          <span className="section-eyebrow">
            <span className="section-eyebrow-mark" />
            Real families
          </span>
          <h2 className="section-heading">
            What {agencyInfo.address.city} Families <em>Are Saying.</em>
          </h2>
          <p className="section-subline">
            Every voice below is verified. Real names, real localities, real placements.
          </p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((rev, i) => {
            const tag = palette[i % palette.length];
            const svc = getServiceByReviewName(rev.service);
            return (
              <article className="testimonial-card" key={rev.id}>
                <header className="testimonial-card-head">
                  <span
                    className="testimonial-card-service"
                    style={{ background: tag?.tag, color: tag?.tagColor }}
                  >
                    {svc ? svc.tabLabel.toUpperCase() : rev.service}
                  </span>
                  <span className="testimonial-card-stars" aria-label={`${rev.rating} out of 5 stars`}>
                    {[...Array(rev.rating)].map((_, s) => (
                      <Star key={s} size={14} fill="currentColor" />
                    ))}
                  </span>
                </header>
                <blockquote className="testimonial-card-quote">
                  &ldquo;{rev.comment}&rdquo;
                </blockquote>
                <footer className="testimonial-card-author">
                  <span className="testimonial-card-avatar" aria-hidden="true">
                    {rev.author.charAt(0)}
                  </span>
                  <div>
                    <div className="testimonial-card-name">{rev.author}</div>
                    <div className="testimonial-card-loc">{rev.location}</div>
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
        {seeMoreHref && (
          <div className="review-section-more-wrap">
            <Link href={seeMoreHref} className="review-section-more">
              See more reviews
              <ArrowUpRight size={16} className="review-section-more-arrow" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
