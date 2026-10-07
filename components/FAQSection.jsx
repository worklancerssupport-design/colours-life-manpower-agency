'use client';

import { useState } from 'react';
import generalFaqs from '@/data/faqs.json';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import { Plus, MessageCircle, Phone, ArrowRight } from 'lucide-react';

export default function FAQSection({
  faqs = generalFaqs,
  title = 'Questions? We have answers.',
  subtitle = 'Practical answers on hiring domestic help in Chennai, background checks, live-in options, and agency policies.',
}) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <section className="section-light" id="faq" aria-label="Frequently asked questions">
      <div className="container">
        <div className="faq-grid">
          <div className="faq-side">
            <span className="section-eyebrow">
              <span className="section-eyebrow-mark" />
              Common questions
            </span>
            <h2 className="section-heading">{title}</h2>
            <p className="section-subline">{subtitle}</p>
            <a
              href={getWhatsAppUrl("Hello Thomas R, I have a specific question about your manpower services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime"
            >
              <MessageCircle size={16} />
              Ask Thomas on WhatsApp
              <ArrowRight size={15} className="btn-lime-arrow" aria-hidden="true" />
            </a>
            <a
              href={`tel:${agencyInfo.phone1}`}
              className="btn-ghost-dark"
              style={{ marginLeft: 12, color: 'var(--ink-on-light)' }}
            >
              <Phone size={15} />
              Call {agencyInfo.phoneDisplay1}
            </a>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openIndex === idx ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={openIndex === idx}
                  onClick={() => toggle(idx)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-trigger-icon" aria-hidden="true">
                    <Plus size={14} />
                  </span>
                </button>
                {openIndex === idx && (
                  <div className="faq-body">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}