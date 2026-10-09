import agencyInfo from '@/data/agency.json';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/edit/'],
      },
    ],
    sitemap: `${agencyInfo.siteUrl}/sitemap.xml`,
  };
}
