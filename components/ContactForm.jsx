'use client';

import { useState } from 'react';
import agencyInfo from '@/data/agency.json';
import { getAllServices } from '@/lib/services';
import { getWhatsAppUrl } from '@/lib/utils';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: getAllServices()[0].navTitle,
    timing: agencyInfo.shiftCatalog[1],
    locality: agencyInfo.address.locality,
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedMessage = `Hello ${agencyInfo.name},
My Name: ${formData.name}
Phone: ${formData.phone}
Service Required: ${formData.service}
Preferred Timing: ${formData.timing}
My Locality: ${formData.locality}
Details: ${formData.notes || 'None'}`;

    const url = getWhatsAppUrl(formattedMessage);
    window.open(url, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'var(--paper-200)',
      border: '1px solid var(--line-light)',
      borderRadius: 'var(--r-xl)',
      padding: '40px 32px',
      boxShadow: 'var(--shadow-sm)',
      position: 'relative'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <span className="section-eyebrow" style={{ marginBottom: '10px' }}>
          <MessageCircle size={13} />
          WhatsApp Enquiry
        </span>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>
          Tell us what you need
        </h3>
        <p style={{ color: 'var(--ink-on-light-muted)', lineHeight: '1.7' }}>
          Fill the form — it pre-fills a WhatsApp message and goes straight to {agencyInfo.owner}.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px', marginBottom: '22px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px', color: 'var(--ink-on-light)' }}>
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. S. Ramanathan"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 'var(--r-md)',
              border: '1px solid var(--line-light-strong)',
              fontSize: '0.98rem',
              backgroundColor: 'var(--paper-100)',
              fontFamily: 'var(--font-sans)'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px', color: 'var(--ink-on-light)' }}>
            Your Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 98840 12345"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 'var(--r-md)',
              border: '1px solid var(--line-light-strong)',
              fontSize: '0.98rem',
              backgroundColor: 'var(--paper-100)',
              fontFamily: 'var(--font-sans)'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px', color: 'var(--ink-on-light)' }}>
            Service Needed *
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 'var(--r-md)',
              border: '1px solid var(--line-light-strong)',
              fontSize: '0.98rem',
              backgroundColor: 'var(--paper-200)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            {getAllServices().map((svc) => (
              <option key={svc.id} value={svc.navTitle}>
                {svc.navTitle}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px', color: 'var(--ink-on-light)' }}>
            Timing Requirement
          </label>
          <select
            name="timing"
            value={formData.timing}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 'var(--r-md)',
              border: '1px solid var(--line-light-strong)',
              fontSize: '0.98rem',
              backgroundColor: 'var(--paper-200)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            {agencyInfo.shiftCatalog.map((shift) => (
              <option key={shift} value={shift}>{shift}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px', color: 'var(--ink-on-light)' }}>
            Your Locality in {agencyInfo.address.city} *
          </label>
          <input
            type="text"
            name="locality"
            required
            value={formData.locality}
            onChange={handleChange}
            placeholder={`e.g. ${agencyInfo.serviceAreas.slice(0, 3).join(', ')}...`}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 'var(--r-md)',
              border: '1px solid var(--line-light-strong)',
              fontSize: '0.98rem',
              backgroundColor: 'var(--paper-100)',
              fontFamily: 'var(--font-sans)'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px', color: 'var(--ink-on-light)' }}>
            Additional Requirements (Optional)
          </label>
          <textarea
            name="notes"
            rows="4"
            value={formData.notes}
            onChange={handleChange}
            placeholder="e.g. Vegetarian cooking only, infant experience needed, live-in room available..."
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 'var(--r-md)',
              border: '1px solid var(--line-light-strong)',
              fontSize: '0.98rem',
              backgroundColor: 'var(--paper-100)',
              fontFamily: 'var(--font-sans)',
              resize: 'vertical'
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn-lime"
        style={{ width: '100%', justifyContent: 'center', padding: '14px 22px' }}
      >
        <MessageCircle size={18} /> Send Enquiry via WhatsApp
        <ArrowRight size={16} className="btn-lime-arrow" />
      </button>

      <p style={{ marginTop: '12px', fontSize: '0.86rem', color: 'var(--ink-on-light-muted)', textAlign: 'center' }}>
        Connects directly to {agencyInfo.owner} (+91 {agencyInfo.whatsappNumber})
      </p>
    </form>
  );
}
