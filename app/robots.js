import agencyInfo from '@/data/agency.json';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/edit/', '/api/'],
      },
      {
        userAgent: ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot', 'Amazonbot'],
        allow: '/',
      },
      {
        userAgent: ['ChatGPT-User', 'Claude-User', 'Perplexity-User'],
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'CCBot', 'Google-Extended'],
        allow: '/',
      },
    ],
    sitemap: `${agencyInfo.siteUrl}/sitemap.xml`,
  };
}
