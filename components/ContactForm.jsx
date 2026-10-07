'use client';

import { useState } from 'react';
import servicesData from '@/data/services.json';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import { MessageCircle, Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Cooking / Cook Service',
    timing: 'Day Shift (8-10 Hours)',
    locality: agencyInfo.address.locality,
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedMessage = `Hello Colours Life Manpower Agency,
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
      backgroundColor: '#ffffff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: '40px 32px',
      boxShadow: 'var(--shadow-md)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(135deg, #D4541A 0%, #F07240 50%, #E8892A 100%)' }} />
        <div className="eyebrow-pill eyebrow-warm" style={{ marginBottom: '10px' }}>
          <Sparkles size={12} /> Direct Enquiry
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
          Send a Service Enquiry
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: '1.6' }}>
          Fill in your details below to directly connect with Thomas R on WhatsApp with your requirements pre-filled.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px', marginBottom: '22px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
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
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-medium)',
              fontSize: '0.96rem',
              backgroundColor: 'var(--bg-subtle)'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', marginBottom: '6px', color: '#1c1917' }}>
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
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-medium)',
              fontSize: '0.96rem',
              backgroundColor: 'var(--bg-subtle)'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', marginBottom: '6px', color: '#1c1917' }}>
            Service Needed *
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-medium)',
              fontSize: '0.96rem',
              backgroundColor: '#ffffff'
            }}
          >
            {servicesData.map((svc) => (
              <option key={svc.id} value={svc.navTitle}>
                {svc.navTitle}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', marginBottom: '6px', color: '#1c1917' }}>
            Timing Requirement
          </label>
          <select
            name="timing"
            value={formData.timing}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-medium)',
              fontSize: '0.96rem',
              backgroundColor: '#ffffff'
            }}
          >
            <option value="Part-Time (Morning / Evening)">Part-Time (Morning / Evening)</option>
            <option value="Day Shift (8-10 Hours)">Day Shift (8-10 Hours)</option>
            <option value="Full Day (10-12 Hours)">Full Day (10-12 Hours)</option>
            <option value="24 Hours Live-In Attendant">24 Hours Live-In Attendant</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', marginBottom: '6px', color: '#1c1917' }}>
            Your Locality in Chennai *
          </label>
          <input
            type="text"
            name="locality"
            required
            value={formData.locality}
            onChange={handleChange}
            placeholder="e.g. Okkiyam Thoraipakkam, Perungudi, Sholinganallur..."
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-medium)',
              fontSize: '0.96rem',
              backgroundColor: 'var(--bg-subtle)'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', marginBottom: '6px', color: '#1c1917' }}>
            Additional Requirements (Optional)
          </label>
          <textarea
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            placeholder="e.g. Vegetarian cooking only, infant experience needed, live-in room available..."
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-medium)',
              fontSize: '0.96rem',
              backgroundColor: 'var(--bg-subtle)'
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        className="whatsapp-btn-large"
        style={{ width: '100%', justifyContent: 'center' }}
      >
        <MessageCircle size={20} /> Send Enquiry via WhatsApp
      </button>

      <div style={{ marginTop: '14px', fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        🔒 Directly connects to Thomas R (+91 {agencyInfo.whatsappNumber}). No spam.
      </div>
    </form>
  );
}
