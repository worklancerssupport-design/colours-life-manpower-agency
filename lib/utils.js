import agencyInfo from '@/data/agency.json';
import { getAllServices } from '@/lib/services';

export function getWhatsAppUrl(customMessage) {
  const message = customMessage || agencyInfo.defaultWhatsAppMessage;
  return `https://wa.me/${agencyInfo.whatsappInternational}?text=${encodeURIComponent(message)}`;
}

const ADDRESS_LINE = agencyInfo.address.fullAddress.replace(/\s*\(Landmark:[^)]*\)/, '');

export function buildTokenContext() {
  const services = getAllServices();
  return {
    name: agencyInfo.name,
    alternateName: agencyInfo.alternateName,
    owner: agencyInfo.owner,
    phone1: agencyInfo.phone1,
    phone2: agencyInfo.phone2,
    phoneDisplay1: agencyInfo.phoneDisplay1,
    phoneDisplay2: agencyInfo.phoneDisplay2,
    whatsapp: agencyInfo.whatsappNumber,
    whatsappDisplay: agencyInfo.phoneDisplay2,
    email: agencyInfo.email,
    address: agencyInfo.address.fullAddress,
    addressLine: ADDRESS_LINE,
    street: agencyInfo.address.street,
    landmark: agencyInfo.address.landmark,
    locality: agencyInfo.address.locality,
    city: agencyInfo.address.city,
    state: agencyInfo.address.state,
    postalCode: agencyInfo.address.postalCode,
    siteUrl: agencyInfo.siteUrl,
    hours: agencyInfo.hours,
    responseTime: agencyInfo.responseTime,
    noIvr: agencyInfo.claims.noIvr,
    idCheck: agencyInfo.claims.idCheck,
    rating: agencyInfo.stats.ratingLabel,
    yearsExperience: agencyInfo.stats.yearsOfExperience,
    serviceCount: String(services.length),
    serviceList: services.map((service) => service.navTitle).join(', '),
    serviceAreas: agencyInfo.serviceAreas.join(', '),
    priceRange: agencyInfo.priceRange,
  };
}

export function fillPlaceholders(value, ctx = buildTokenContext()) {
  if (typeof value === 'string') {
    return value.replace(/\{\{(\w+)\}\}/g, (match, key) => (key in ctx ? ctx[key] : match));
  }
  if (Array.isArray(value)) return value.map((item) => fillPlaceholders(item, ctx));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, item] of Object.entries(value)) out[key] = fillPlaceholders(item, ctx);
    return out;
  }
  return value;
}

export {
  getServiceSlugs,
  getAllServiceSlugs,
  getServiceMeta,
  getAllServices,
  getServiceListText,
  getServiceByReviewName,
} from '@/lib/services';
