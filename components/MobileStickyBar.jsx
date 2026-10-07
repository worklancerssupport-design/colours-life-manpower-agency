'use client';

import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';

export default function MobileStickyBar({ customWhatsAppMessage }) {
  const whatsappUrl = getWhatsAppUrl(customWhatsAppMessage || agencyInfo.defaultWhatsAppMessage);

  return (
    <div className="mobile-action-bar-fixed" aria-label="Quick mobile action bar">
      <a 
        href={`tel:${agencyInfo.phone1}`} 
        className="mobile-action-item mobile-action-call"
        title="Call agency phone"
      >
        <Phone size={16} color="var(--brand-primary)" />
        <span>Call</span>
      </a>

      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mobile-action-item mobile-action-whatsapp"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={17} color="#ffffff" />
        <span>WhatsApp</span>
      </a>

      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-action-item mobile-action-book"
        title="Book domestic help"
      >
        <CalendarCheck size={16} color="#ffffff" />
        <span>Book</span>
      </a>
    </div>
  );
}
