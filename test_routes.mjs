import http from 'http';

const routes = [
  '/',
  '/about/',
  '/contact/',
  '/faq/',
  '/reviews/',
  '/services/',
  '/services/cooking/',
  '/services/newborn-baby-care/',
  '/services/baby-care/',
  '/services/elderly-care/',
  '/services/maid-work/',
  '/services/brahmin-cook/',
  '/services/patient-care/',
  '/services/drivers/',
  '/sitemap.xml',
  '/robots.txt'
];

function fetchRoute(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          path,
          statusCode: res.statusCode,
          headers: res.headers,
          data
        });
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('--- Testing All Routes for Colours Life Manpower Agency ---');
  let passed = 0;
  let failed = 0;

  for (const r of routes) {
    try {
      const res = await fetchRoute(r);
      const isOk = res.statusCode === 200;
      if (isOk) {
        // Check for H1 on html pages
        let h1Match = res.data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        let h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'N/A';
        
        // Check for WhatsApp links
        let waCount = (res.data.match(/wa\.me\/919884555533/g) || []).length;
        
        // Check for Schema
        let hasSchema = res.data.includes('application/ld+json');
        
        console.log(`[PASS] ${r.padEnd(30)} Status: ${res.statusCode} | H1: "${h1Text.substring(0, 40)}" | WA links: ${waCount} | Schema: ${hasSchema}`);
        passed++;
      } else {
        console.error(`[FAIL] ${r.padEnd(30)} Status: ${res.statusCode}`);
        failed++;
      }
    } catch (e) {
      console.error(`[ERR]  ${r.padEnd(30)} ${e.message}`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} Passed, ${failed} Failed.`);
}

runTests();
