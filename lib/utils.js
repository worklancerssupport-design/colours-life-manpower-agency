import agencyInfo from '@/data/agency.json';
import { getAllServices } from '@/lib/services';

function toWhatsAppDigits(raw) {
  const digits = String(raw ?? '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits;
  if (digits.length === 11 && digits.startsWith('0')) return `91${digits.slice(1)}`;
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export function getWhatsAppNumber() {
  return toWhatsAppDigits(agencyInfo.whatsappNumber);
}

export function getWhatsAppDisplay() {
  const digits = toWhatsAppDigits(agencyInfo.whatsappNumber);
  const local = digits.startsWith('91') ? digits.slice(2) : digits;
  return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
}

export function getWhatsAppUrl(customMessage) {
  const message = customMessage || agencyInfo.defaultWhatsAppMessage;
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
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
    whatsappDisplay: getWhatsAppDisplay(),
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
