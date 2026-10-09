const CLOUDINARY_HOST = 'res.cloudinary.com';

// Cap the largest source variant so we never request an upscale (e.g. w_3840 on a
// 1200px original). 1920px covers 2x DPR at a 960px-wide render (the hero media).
const MAX_WIDTH = 1920;

export function isCloudinaryUrl(src) {
  return typeof src === 'string' && src.includes(CLOUDINARY_HOST);
}

/**
 * next/image loader that defers to Cloudinary for resizing and encoding.
 * Injects `f_auto` (best format per browser), `q_auto` (AI compression) and a
 * concrete `w_` right after `/upload/`. The returned URL is served straight from
 * Cloudinary's CDN — Next.js does not run it through its own image optimizer, so
 * there is no extra hop and no Vercel image-optimization cost.
 */
export function cloudinaryLoader({ src, width }) {
  if (!isCloudinaryUrl(src)) return src;
  const w = Math.min(Number(width) || MAX_WIDTH, MAX_WIDTH);
  return src.replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`);
}
