import agencyInfo from '@/data/agency.json';
import { fillPlaceholders } from '@/lib/utils';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "@id": `${agencyInfo.siteUrl}/#organization`,
    "name": agencyInfo.name,
    "alternateName": agencyInfo.alternateName,
    "description": fillPlaceholders(agencyInfo.seo.schemaDescription),
    "url": agencyInfo.siteUrl,
    "telephone": [
      `+91-${agencyInfo.phone1}`,
      `+91-${agencyInfo.phone2}`
    ],
    "email": agencyInfo.email,
    "image": `${agencyInfo.siteUrl}/images/elderly-care-service-chennai.jpg`,
    "logo": `${agencyInfo.siteUrl}/icon-512.png`,
    "founder": {
      "@type": "Person",
      "name": agencyInfo.owner
    },
    "foundingDate": "2018",
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
    "hasMap": agencyInfo.maps?.embedUrl || undefined,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "21:00"
      }
    ],
    "areaServed": agencyInfo.serviceAreas.map(area => ({
      "@type": "Place",
      "name": area
    })),
    "priceRange": agencyInfo.priceRange,
    "knowsAbout": agencyInfo.seo.knowsAbout,
    "knowsLanguage": ["Tamil", "English", "Telugu"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "6",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      agencyInfo.socials?.whatsapp ? `https://wa.me/${agencyInfo.whatsappNumber}` : null,
      agencyInfo.socials?.facebook,
      agencyInfo.socials?.instagram
    ].filter(Boolean)
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
