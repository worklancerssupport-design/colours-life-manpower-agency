import http from 'http';

function fetchRoute(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          path,
          statusCode: res.statusCode,
          data
        });
      });
    }).on('error', reject);
  });
}

const servicesToCheck = [
  { slug: 'cooking', expectedMsg: 'Hello Colours Life Manpower Agency, I would like to book/enquire about Cook Service.' },
  { slug: 'newborn-baby-care', expectedMsg: 'Hello Colours Life Manpower Agency, I would like to book/enquire about Newborn Baby Care.' },
  { slug: 'baby-care', expectedMsg: 'Hello Colours Life Manpower Agency, I would like to book/enquire about Baby Care.' },
  { slug: 'elderly-care', expectedMsg: 'Hello Colours Life Manpower Agency, I would like to book/enquire about Elderly Care.' },
  { slug: 'maid-work', expectedMsg: 'Hello Colours Life Manpower Agency, I would like to book/enquire about Maid / Domestic Help.' },
  { slug: 'brahmin-cook', expectedMsg: 'Hello Colours Life Manpower Agency, I would like to book/enquire about Brahmin Cook Service.' },
  { slug: 'patient-care', expectedMsg: 'Hello Colours Life Manpower Agency, I would like to book/enquire about Patient Care.' },
  { slug: 'drivers', expectedMsg: 'Hello Colours Life Manpower Agency, I would like to book/enquire about Driver Service.' },
];

async function validateSEO() {
  console.log('=== In-Depth SEO & Quality Audit ===\n');

  // 1. Audit Home Page
  const home = await fetchRoute('/');
  console.log('1. HOMEPAGE AUDIT:');
  console.log('  - Canonical Link:', home.data.includes('rel="canonical" href="https://colourslifemanpower.com/'));
  console.log('  - OpenGraph Title:', home.data.includes('og:title'));
  console.log('  - OpenGraph Image:', home.data.includes('og:image'));
  console.log('  - Phone 9884404444 tel link:', home.data.includes('tel:9884404444'));
  console.log('  - Phone 9884555533 tel link:', home.data.includes('tel:9884555533'));
  console.log('  - Email mailto link:', home.data.includes('mailto:colourslifemanpoweragency@gmail.com'));
  console.log('  - Owner name kept off homepage copy (expected: true):', !home.data.includes('Thomas R'));
  console.log('  - Okkiyam Thoraipakkam mentioned:', home.data.includes('Okkiyam Thoraipakkam'));
  console.log('  - Landmark (Back Side Cognizant):', home.data.includes('Back Side Cognizant'));

  // 2. Audit All 8 Services
  console.log('\n2. SERVICES DEDICATED PAGES AUDIT:');
  for (const svc of servicesToCheck) {
    const res = await fetchRoute(`/services/${svc.slug}/`);
    const encoded = encodeURIComponent(svc.expectedMsg);
    const hasServiceSpecificWA = res.data.includes(encoded);
    const hasFAQSchema = res.data.includes('"@type":"FAQPage"');
    const hasBreadcrumbSchema = res.data.includes('"@type":"BreadcrumbList"');
    const hasOtherServices = res.data.includes('Looking for Other Home Services?');

    console.log(`  [${svc.slug}]:`);
    console.log(`    - Status: ${res.statusCode}`);
    console.log(`    - Service-Specific WhatsApp Encoded Message: ${hasServiceSpecificWA}`);
    console.log(`    - FAQPage Schema: ${hasFAQSchema}`);
    console.log(`    - BreadcrumbList Schema: ${hasBreadcrumbSchema}`);
    console.log(`    - Other Services Section: ${hasOtherServices}`);
  }

  // 3. Contact Page Audit
  console.log('\n3. CONTACT PAGE AUDIT:');
  const contact = await fetchRoute('/contact/');
  console.log('  - Has Google Maps Embed:', contact.data.includes('maps.google.com/maps'));
  console.log('  - Has Interactive Form:', contact.data.includes('form') && contact.data.includes('name="locality"'));
  console.log('  - Address rendered in HTML:', contact.data.includes('Nehru Nagar, 13th Cross Street, Okkiyam Thoraipakkam'));

  console.log('\n=== In-Depth SEO Audit Completed Successfully ===');
}

validateSEO();
