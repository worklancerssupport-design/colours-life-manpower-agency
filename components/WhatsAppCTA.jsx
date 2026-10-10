import agencyInfo from '@/data/agency.json';
import EnquireWhatsAppButton from '@/components/EnquireWhatsAppButton';
import { MessageCircle, Phone, ArrowRight, Sparkles } from 'lucide-react';

export default function WhatsAppCTA({
  title = 'Need a hand at home this week?',
  subtitle = `Tell us what you need. ${agencyInfo.owner} replies ${agencyInfo.responseTime} on WhatsApp — direct, ${agencyInfo.claims.noIvr}.`,
  customMessage,
  buttonText = 'Chat on WhatsApp',
  eyebrow = agencyInfo.claims.founderDirect,
}) {
  const template = customMessage || agencyInfo.defaultWhatsAppMessage;
  return (
    <div className="container">
      <div className="cta-block">
        <span className="section-eyebrow section-eyebrow-dark" style={{ justifyContent: 'center' }}>
          <Sparkles size={13} />
          {eyebrow}
        </span>
        <h3 className="cta-block-title">{title}</h3>
        <p className="cta-block-sub">{subtitle}</p>
        <div className="cta-block-actions">
          <EnquireWhatsAppButton
            template={template}
            className="btn-lime"
          >
            {buttonText}
            <ArrowRight size={15} className="btn-lime-arrow" aria-hidden="true" />
          </EnquireWhatsAppButton>
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