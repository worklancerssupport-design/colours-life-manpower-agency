import { getServiceMeta } from '@/lib/services';

export async function getServiceDetail(slug) {
  try {
    const mod = await import(`@/data/services/${slug}.json`);
    return mod.default ?? mod;
  } catch {
    return null;
  }
}

export async function getServiceBySlug(slug) {
  const meta = getServiceMeta(slug);
  if (!meta) return null;
  const detail = await getServiceDetail(slug);
  return detail ? { ...meta, ...detail } : null;
}
