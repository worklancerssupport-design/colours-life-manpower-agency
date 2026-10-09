import agencyInfo from '@/data/agency.json';

export default function ServiceSchema({ service }) {
  if (!service) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.h1,
    serviceType: service.shortName,
    description: service.metaDescription,
    image: `${agencyInfo.siteUrl}${service.image}`,
    areaServed: agencyInfo.serviceAreas,
    provider: {
      '@type': 'Organization',
      name: agencyInfo.name,
      url: agencyInfo.siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
