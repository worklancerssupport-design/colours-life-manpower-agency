import agencyInfo from '@/data/agency.json';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "name": agencyInfo.name,
    "alternateName": "Colours Life Manpower Services Chennai",
    "description": "Colours Life Manpower Agency provides reliable home cooks, newborn baby caretakers, baby care, elderly caregivers, maids, Brahmin cooks, patient care attendants, and personal drivers in Okkiyam Thoraipakkam, OMR, and Chennai.",
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
    "knowsAbout": [
      "Domestic help agency in Chennai",
      "Cook service in Thoraipakkam",
      "Newborn baby care in Chennai",
      "Baby care services in Chennai",
      "Elderly care services in Chennai",
      "Maid service in Thoraipakkam",
      "Brahmin cook service in Chennai",
      "Patient care service in Chennai",
      "Driver service in Chennai",
      "Manpower agency in Okkiyam Thoraipakkam"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
