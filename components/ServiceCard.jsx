import Link from 'next/link';
import SmartImage from '@/components/SmartImage';
import EnquireWhatsAppButton from '@/components/EnquireWhatsAppButton';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <div className="service-card-media">
        <SmartImage
          src={service.image}
          alt={service.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{ objectFit: 'cover' }}
        />
        {service.badge && (
          <span className="service-card-badge">{service.badge}</span>
        )}
      </div>

      <div className="service-card-body">
        <h3 className="service-card-title">
          <Link href={service.path}>{service.navTitle}</Link>
        </h3>
        <p className="service-card-desc">{service.shortDescription}</p>

        <div className="service-card-footer">
          <Link 
            href={service.path} 
            className="btn btn-outline btn-sm"
            title={`View ${service.navTitle} details`}
          >
            View Service <ArrowRight size={14} />
          </Link>
          <EnquireWhatsAppButton
            template={service.whatsappMessage}
            className="btn btn-whatsapp btn-sm"
            title={`Book ${service.navTitle} via WhatsApp`}
          >
            Book Now
          </EnquireWhatsAppButton>
        </div>
      </div>
    </div>
  );
}
