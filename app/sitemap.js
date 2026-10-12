import agencyInfo from '@/data/agency.json';
import { getAllServices } from '@/lib/services';
import areasData from '@/data/areas.json';
import articlesData from '@/data/articles.json';

export default function sitemap() {
  const baseUrl = agencyInfo.siteUrl;
  const currentDate = '2026-10-12T00:00:00.000Z';

  // Core pages
  const routes = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/charges/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/areas/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...areasData.map((area) => ({
      url: `${baseUrl}/areas/${area.slug}/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    })),
    {
      url: `${baseUrl}/blog/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...articlesData.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    })),
  ];

  // Dedicated service pages
  const serviceRoutes = getAllServices().map((svc) => ({
    url: `${baseUrl}${svc.path}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.95,
  }));

  return [...routes, ...serviceRoutes];
}
