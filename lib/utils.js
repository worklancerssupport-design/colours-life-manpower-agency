import agencyInfo from '@/data/agency.json';
import servicesData from '@/data/services.json';

export function getWhatsAppUrl(customMessage) {
  const message = customMessage || agencyInfo.defaultWhatsAppMessage;
  return `https://wa.me/${agencyInfo.whatsappInternational}?text=${encodeURIComponent(message)}`;
}

export function getServiceBySlug(slug) {
  return servicesData.find((service) => service.slug === slug);
}

export function getAllServiceSlugs() {
  return servicesData.map((service) => service.slug);
}
