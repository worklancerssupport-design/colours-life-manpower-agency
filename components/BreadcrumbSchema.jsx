import agencyInfo from '@/data/agency.json';

export default function BreadcrumbSchema({ items }) {
  // items: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/' }, { name: 'Cooking', url: '/services/cooking/' }]
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${agencyInfo.siteUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
