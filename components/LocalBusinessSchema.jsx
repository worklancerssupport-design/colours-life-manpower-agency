import agencyInfo from '@/data/agency.json';
import { fillPlaceholders } from '@/lib/utils';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "name": agencyInfo.name,
    "alternateName": agencyInfo.alternateName,
    "description": fillPlaceholders(agencyInfo.seo.schemaDescription),
    "url": agencyInfo.siteUrl,
    "telephone": [
      `+91-${agencyInfo.phone1}`,
      `+91-${agencyInfo.phone2}`
    ],
    "email": agencyInfo.email,
    "founder": {
      "@type": "Person",
      "name": agencyInfo.owner
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": agencyInfo.address.street,
      "addressLocality": agencyInfo.address.locality,
      "addressRegion": agencyInfo.address.state,
      "postalCode": agencyInfo.address.postalCode,
      "addressCountry": agencyInfo.address.countryCode
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": agencyInfo.geo.latitude,
      "longitude": agencyInfo.geo.longitude
    },
    "areaServed": agencyInfo.serviceAreas.map(area => ({
      "@type": "Place",
      "name": area
    })),
    "priceRange": agencyInfo.priceRange,
    "knowsAbout": agencyInfo.seo.knowsAbout
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
