'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';

export default function FAQSection({ 
  faqs, 
  title = "Questions? We've got answers.", 
  subtitle = "Clear, straightforward details on how Colours Life Manpower Agency supports Chennai households."
}) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="section section-white" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="faq-two-col-grid">
          {/* Left Column: Editorial Sticky Sidebar */}
          <div className="faq-editorial-sidebar">
            <span className="eyebrow-pill eyebrow-warm">
              Clear Guidance
            </span>
            <h2 className="section-heading-serif" style={{ fontSize: '2.4rem' }}>
              {title}
            </h2>
            <p className="section-subtext" style={{ marginBottom: '28px' }}>
              {subtitle}
            </p>

            <div style={{
              background: 'linear-gradient(145deg, #FFF8F0 0%, #FFF3E8 100%)',
              border: '1px solid var(--border-warm)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(135deg, #D4541A 0%, #F07240 50%, #E8892A 100%)' }} />
              <div style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                Have a specific question?
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Thomas R is available daily on WhatsApp to discuss your home timings, dietary requirements, and candidate availability.
              </p>
              <a
                href={getWhatsAppUrl("Hello Thomas R, I have a specific question about your manpower services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-pill"
                style={{ justifyContent: 'center' }}
              >
                <MessageCircle size={16} /> Ask on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Accordion Container */}
          <div className="faq-accordion-container">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`faq-card-item ${isOpen ? 'open' : ''}`}
                >
                  <button
                    className="faq-trigger-btn"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <div className="faq-chevron-icon">
                      <ChevronDown size={16} />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="faq-body-content">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
