import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import { MessageCircle, PhoneCall, Sparkles } from 'lucide-react';

export default function WhatsAppCTA({ 
  title = "Need help at home?",
  subtitle = "Tell us what you need. Our team is just a WhatsApp message away to assist with reliable domestic staff in Chennai.",
  customMessage,
  buttonText = "Chat on WhatsApp"
}) {
  const whatsappUrl = getWhatsAppUrl(customMessage);

  return (
    <div className="whatsapp-conversion-panel">
      <div className="whatsapp-panel-content">
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#ffffff',
          padding: '4px 14px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.78rem',
          fontWeight: '800',
          color: '#15803d',
          marginBottom: '14px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
        }}>
          <Sparkles size={13} color="#22c55e" /> Direct Owner Access • Thomas R
        </div>

        <h3>{title}</h3>
        <p>{subtitle}</p>

        <div style={{ marginTop: '14px', fontSize: '0.9rem', color: '#065f46', fontWeight: '600' }}>
          WhatsApp & Call: <strong>+91 {agencyInfo.whatsappNumber}</strong> • Office: {agencyInfo.address.locality}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', smDirection: 'row', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn-large"
        >
          <MessageCircle size={22} /> {buttonText}
        </a>

        <a
          href={`tel:${agencyInfo.phone1}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            fontSize: '0.9rem',
            fontWeight: '700'
          }}
        >
          <PhoneCall size={15} /> Call {agencyInfo.phoneDisplay1}
        </a>
      </div>
    </div>
  );
}
