import agencyInfo from '@/data/agency.json';
import { fillPlaceholders } from '@/lib/utils';

export default function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${agencyInfo.siteUrl}/#website`,
    name: fillPlaceholders(agencyInfo.name),
    url: agencyInfo.siteUrl,
    publisher: {
      '@id': `${agencyInfo.siteUrl}/#organization`,
    },
    inLanguage: 'en-IN',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
