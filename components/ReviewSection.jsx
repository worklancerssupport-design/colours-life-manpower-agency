'use client';

import { useState } from 'react';
import reviewsData from '@/data/reviews.json';
import { Star } from 'lucide-react';

const palette = [
  { tag: 'rgba(204, 242, 106, 0.18)', tagColor: '#3F6212', tagText: 'NEWBORN' },
  { tag: 'rgba(204, 242, 106, 0.18)', tagColor: '#3F6212', tagText: 'COOK' },
  { tag: 'rgba(204, 242, 106, 0.18)', tagColor: '#3F6212', tagText: 'ELDERLY' },
  { tag: 'rgba(204, 242, 106, 0.18)', tagColor: '#3F6212', tagText: 'MAID' },
  { tag: 'rgba(204, 242, 106, 0.18)', tagColor: '#3F6212', tagText: 'BRAHMIN COOK' },
  { tag: 'rgba(204, 242, 106, 0.18)', tagColor: '#3F6212', tagText: 'PATIENT CARE' },
];

export default function ReviewSection({ limit = 6 }) {
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
            What Chennai Families <em>Are Saying.</em>
          </h2>
          <p className="section-subline">
            Every voice below is verified. Real names, real localities, real placements.
          </p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((rev, i) => {
            const tag = palette[i % palette.length];
            return (
              <article className="testimonial-card" key={rev.id}>
                <header className="testimonial-card-head">
                  <span
                    className="testimonial-card-service"
                    style={{ background: tag?.tag, color: tag?.tagColor }}
                  >
                    {tag?.tagText || rev.service}
                  </span>
                  <span className="testimonial-card-stars" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, s) => (
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
      </div>
    </section>
  );
}