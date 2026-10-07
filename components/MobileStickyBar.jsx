'use client';

import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import { Phone, MessageCircle } from 'lucide-react';

export default function MobileStickyBar() {
  const whatsappUrl = getWhatsAppUrl(agencyInfo.defaultWhatsAppMessage);
  return (
    <div className="mobile-sticky" aria-label="Quick mobile actions">
      <a href={`tel:${agencyInfo.phone1}`} className="mobile-sticky-item mobile-sticky-call">
        <Phone size={16} aria-hidden="true" />
        Call
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-sticky-item mobile-sticky-whatsapp"
      >
        <MessageCircle size={16} aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}