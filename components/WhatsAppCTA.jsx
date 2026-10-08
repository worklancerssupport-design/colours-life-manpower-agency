import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import { MessageCircle, Phone, ArrowRight, Sparkles } from 'lucide-react';

export default function WhatsAppCTA({
  title = 'Need a hand at home this week?',
  subtitle = 'Tell us what you need. The owner replies within the hour on WhatsApp — direct, no IVR, no bots.',
  customMessage,
  buttonText = 'Chat on WhatsApp',
}) {
  const whatsappUrl = getWhatsAppUrl(customMessage || agencyInfo.defaultWhatsAppMessage);
  return (
    <div className="container">
      <div className="cta-block">
        <span className="section-eyebrow section-eyebrow-dark" style={{ justifyContent: 'center' }}>
          <Sparkles size={13} />
          Founder-direct
        </span>
        <h3 className="cta-block-title">{title}</h3>
        <p className="cta-block-sub">{subtitle}</p>
        <div className="cta-block-actions">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-lime">
            <MessageCircle size={17} />
            {buttonText}
            <ArrowRight size={15} className="btn-lime-arrow" aria-hidden="true" />
          </a>
          <a
            href={`tel:${agencyInfo.phone1}`}
            className="btn-ghost-dark"
            style={{ border: '1px solid var(--line-dark-strong)', borderRadius: 'var(--r-pill)', padding: '13px 22px' }}
          >
            <Phone size={15} />
            Call {agencyInfo.phoneDisplay1}
          </a>
        </div>
        <p className="cta-block-meta">
          Office: {agencyInfo.address.locality}, {agencyInfo.address.city} · WhatsApp & Call: +91 {agencyInfo.whatsappNumber}
        </p>
      </div>
    </div>
  );
}