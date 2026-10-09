import servicesIndex from '@/data/services/index.json';

export function getAllServices() {
  return servicesIndex;
}

export function getServiceSlugs() {
  return servicesIndex.map((service) => service.slug);
}

export function getAllServiceSlugs() {
  return getServiceSlugs();
}

export function getServiceMeta(slug) {
  return servicesIndex.find((service) => service.slug === slug) || null;
}

export function getServiceByReviewName(name) {
  return servicesIndex.find((service) => service.navTitle === name) || null;
}

export function getServiceListText() {
  return servicesIndex.map((service) => service.navTitle).join(', ');
}
