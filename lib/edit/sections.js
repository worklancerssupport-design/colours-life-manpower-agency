// Editable-data registry — the single source of truth for the edit console.
// Imported by BOTH the client (hooks/forms) and the server (path allowlist).
// Pure data only: no env access, no imports from anything with secrets.

export const SERVICE_SLUGS = [
  'cooking',
  'newborn-baby-care',
  'baby-care',
  'elderly-care',
  'maid-work',
  'brahmin-cook',
  'patient-care',
  'drivers',
];

/**
 * @typedef {Object} EditSection
 * @property {string} id
 * @property {string} label
 * @property {string} path        repo-relative path, e.g. "data/agency.json"
 * @property {'object'|'array'} kind
 * @property {string} commitMessage
 * @property {string[]} [readOnlyKeys] keys that must never change (routing/identity)
 * @property {string} [notes]     free text the UI may surface as help copy
 * @property {SchemaGroup[]} [groups]     when kind: 'object' — declarative UI structure
 * @property {SchemaField[]} [itemFields] when kind: 'array'  — fields to show per item
 */

/**
 * @typedef {Object} SchemaGroup
 * @property {string} title
 * @property {string} [description]
 * @property {SchemaField[]} fields
 */

/**
 * @typedef {Object} SchemaField
 * @property {string} key           dot-path, e.g. "address.street" or "claims.idCheck"
 * @property {string} [label]       override the auto-generated label
 * @property {string} [hint]        help text shown under the field
 * @property {boolean} [span]       if true, field takes a full row in the grid
 * @property {boolean} [readOnly]   if true, the field is locked (in addition to section readOnlyKeys)
 */

/** @type {EditSection[]} */
export const EDIT_SECTIONS = [
  // -------------------------------------------------------------------------
  // Agency — the single source of truth for brand identity, contact, claims
  // -------------------------------------------------------------------------
  {
    id: 'agency',
    label: 'Agency profile',
    path: 'data/agency.json',
    kind: 'object',
    commitMessage: 'Update agency.json via edit console',
    notes:
      'The single source of truth for every phone number, address, claim, stat and SEO string. {{tokens}} elsewhere resolve against this file at build time.',
    groups: [
      {
        title: 'Identity & contact',
        description: 'The brand name, owner and phone numbers used across the site, JSON-LD and every CTA button.',
        fields: [
          { key: 'name', label: 'Brand name', span: true },
          { key: 'owner', label: 'Owner name', hint: 'Shown in page subtitles, JSON-LD and a few CTAs.' },
          { key: 'phone1', label: 'Phone 1 (digits)', hint: 'Used by tel: links and the {{phone1}} token.' },
          { key: 'phoneDisplay1', label: 'Phone 1 display', hint: 'e.g. +91 91765 55533 — shown next to the call buttons.' },
          { key: 'phone2', label: 'Phone 2 (digits)' },
          { key: 'phoneDisplay2', label: 'Phone 2 display' },
          { key: 'whatsappNumber', label: 'WhatsApp number (digits)', hint: 'Used by every wa.me link and the {{whatsapp}} token.' },
          { key: 'email' },
          { key: 'defaultWhatsAppMessage', label: 'Default WhatsApp message', span: true, hint: 'The opening line pre-filled on the WhatsApp button when no per-service message is set.' },
        ],
      },
      {
        title: 'Office address',
        description: 'The address card on the contact and about pages, plus the JSON-LD PostalAddress block.',
        fields: [
          { key: 'address.street' },
          { key: 'address.landmark', label: 'Landmark' },
          { key: 'address.locality' },
          { key: 'address.city' },
          { key: 'address.state' },
          { key: 'address.postalCode', label: 'Postal code' },
          { key: 'address.country' },
          { key: 'address.fullAddress', label: 'Full address (one line)', span: true, hint: 'Used by the {{addressLine}} token in some FAQ answers.' },
        ],
      },
      {
        title: 'Service areas & coverage',
        description: 'Where you place helpers. Shown as chips on the about, services, reviews and contact pages, and in JSON-LD as areaServed.',
        fields: [
          { key: 'serviceAreas', label: 'Areas served', hint: 'One per line. Order matters — they\'re shown in this order on the site.' },
          { key: 'coverageOutro', label: 'Coverage outro', span: true, hint: 'The closing line after the list on the services index page.' },
        ],
      },
      {
        title: 'Hours & response',
        description: 'The small "WhatsApp answered X, Y" line that appears on every page\'s hero.',
        fields: [
          { key: 'hours', label: 'Hours (e.g. 8am–9pm)' },
          { key: 'responseTime', label: 'Response time' },
          { key: 'about', label: 'About (one-liner)', span: true, hint: 'A short brand blurb — shown in the footer and trust strip.' },
        ],
      },
      {
        title: 'Trust claims',
        description: 'Short phrases used in the hero facts bars on the about, home, services, and FAQ pages. The micro/long variants are scoped to specific surfaces.',
        fields: [
          { key: 'claims.idCheck', label: 'ID check (short)' },
          { key: 'claims.idCheckDrivers', label: 'ID check — drivers only' },
          { key: 'claims.idCheckVerified', label: 'ID check — verified' },
          { key: 'claims.idCheckLong', label: 'ID check (long)', span: true },
          { key: 'claims.idCheckMicro', label: 'ID check (micro)' },
          { key: 'claims.founderDirect', label: 'Founder-direct (short)' },
          { key: 'claims.founderDirectLong', label: 'Founder-direct (long)', span: true },
          { key: 'claims.noIvr', label: 'No IVR claim' },
          { key: 'claims.placementSpeed', label: 'Placement speed (short)' },
          { key: 'claims.placementSpeedMicro', label: 'Placement speed — micro' },
          { key: 'claims.placementSpeedLong', label: 'Placement speed (long)' },
          { key: 'claims.noOfficeVisit', label: 'No office visit' },
          { key: 'claims.directLine', label: 'Direct line claim' },
        ],
      },
      {
        title: 'Vetting checklist',
        description: 'The 6 bullets shown on the About page under "Ethical Standards & Verification Approach".',
        fields: [
          { key: 'claims.vetting', label: 'Vetting points', hint: 'One per line.' },
        ],
      },
      {
        title: 'Rating & shifts',
        fields: [
          { key: 'stats.ratingLabel', label: 'Rating display (e.g. 4.9/5)' },
          { key: 'shiftCatalog', label: 'Shift options', hint: 'One per line. Used in the contact form\'s timing select.' },
        ],
      },
      {
        title: 'Social links',
        description: 'Leave a field blank to hide that icon in the footer and from the JSON-LD sameAs array.',
        fields: [
          { key: 'socials.facebook' },
          { key: 'socials.instagram' },
          { key: 'socials.youtube' },
          { key: 'socials.linkedin' },
        ],
      },
      {
        title: 'Map',
        fields: [
          { key: 'maps.embedUrl', label: 'Google Maps embed URL', span: true, hint: 'The full https://www.google.com/maps/embed?… URL rendered in the contact page map.' },
        ],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Services index
  // -------------------------------------------------------------------------
  {
    id: 'services-index',
    label: 'Services list',
    path: 'data/services/index.json',
    kind: 'array',
    commitMessage: 'Update services index via edit console',
    readOnlyKeys: ['id', 'slug', 'path'],
    notes:
      'id, slug and path are locked: slug must match the detail filename and path must match the public URL or the service page 404s. The reviews "service" field must match a navTitle from this list.',
    itemFields: [
      { key: 'id', label: 'ID (locked)', readOnly: true },
      { key: 'slug', label: 'Slug (locked — must match filename)', readOnly: true },
      { key: 'path', label: 'Path (locked — must match public URL)', readOnly: true },
      { key: 'navTitle', label: 'Nav title', hint: 'e.g. "Cooking / Cook Service". Used in nav, footer, and matched against reviews.' },
      { key: 'shortName', label: 'Short name', hint: 'e.g. "Cooking". Used in the header nav, related-service tags, and as the FAQ title seed.' },
      { key: 'badge', label: 'Badge', hint: 'e.g. "Daily Meals & Live-in Cooks". Shown above the service image.' },
      { key: 'accentColor', label: 'Accent color (hex)', hint: 'Drives the entire colour scheme of this service\'s page (CSS custom property --svc-accent).' },
      { key: 'image', label: 'Image URL', hint: 'Cloudinary URL or local /images/... path.' },
      { key: 'alt', label: 'Image alt text' },
      { key: 'shortDescription', label: 'Short description', span: true, hint: '~200 char summary shown on the bento cards.' },
      { key: 'tabLabel', label: 'Tab/uppercase label', hint: 'e.g. "Cook". Shown as the service tag on review cards.' },
      { key: 'ctaNoun', label: 'CTA noun', hint: 'e.g. "a cook", "an elderly attendant". Used in titles and CTAs across this service page.' },
      { key: 'whatsappMessage', label: 'Default WhatsApp message', span: true, hint: 'The message pre-filled on this service\'s Enquire button. [brackets] are filled at click time.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Service details (one section per slug)
  // -------------------------------------------------------------------------
  ...SERVICE_SLUGS.map((slug) => ({
    id: `service-${slug}`,
    label: `Service — ${slug}`,
    path: `data/services/${slug}.json`,
    kind: 'object',
    commitMessage: `Update ${slug} service detail via edit console`,
    notes: 'Contains {{token}} placeholders — leave them intact, they are resolved at build time.',
    groups: [
      {
        title: 'Hero',
        description: 'The first thing visitors see on the service page.',
        fields: [
          { key: 'h1', label: 'H1 (main heading)', span: true },
          { key: 'h1Scope', label: 'H1 scope', hint: 'The em part shown just under the H1, e.g. "— daily meals, part-time or live-in".' },
          { key: 'eyebrowText', label: 'Eyebrow', span: true, hint: 'The small all-caps label above the H1.' },
          { key: 'heroSubtitle', label: 'Hero subtitle', span: true },
          { key: 'heroFactAreas', label: 'Hero fact areas', hint: 'The thin line shown under the subtitle, e.g. "OMR · Perungudi · Velachery".' },
        ],
      },
      {
        title: "Who it's for",
        description: 'Bullet list shown in the "who is it for" section. Each entry should be one household scenario.',
        fields: [
          { key: 'whoIsItFor', label: 'Scenarios', hint: 'One per line.' },
        ],
      },
      {
        title: 'How placements work',
        description: 'A short paragraph shown just under the "who it\'s for" list. Kept for SEO and to set context.',
        fields: [
          { key: 'availableWorkers', label: 'Placements paragraph', span: true },
        ],
      },
      {
        title: "What's included / excluded",
        fields: [
          { key: 'scopeIncluded', label: 'Included', hint: 'One per line.' },
          { key: 'scopeExcluded', label: 'Excluded', hint: 'One per line.' },
        ],
      },
      {
        title: 'Shifts',
        description: 'Each shift becomes a card on the service page with type, hours, description and "best for".',
        fields: [
          { key: 'shiftOptions', label: 'Shift cards', hint: 'Each card has type, hours, description and best-for.', span: true },
        ],
      },
      {
        title: 'Key responsibilities',
        fields: [
          { key: 'keyResponsibilities', label: 'Responsibilities', hint: 'One per line.', span: true },
        ],
      },
      {
        title: 'Verification & risk',
        fields: [
          { key: 'verificationFacts', label: 'Verification facts', hint: 'One per line.' },
          { key: 'riskPolicies', label: 'Risk policies', hint: 'One per line.' },
        ],
      },
      {
        title: 'Local coverage & disclaimer',
        fields: [
          { key: 'localCoverage', label: 'Local coverage paragraph', span: true },
          { key: 'disclaimer', label: 'Disclaimer', span: true },
        ],
      },
      {
        title: 'Unasked Q&A',
        description: 'A grid of Q&A cards answering the questions visitors hesitate to ask. Distinct from the FAQ accordion below.',
        fields: [
          { key: 'unaskedQAs', label: 'Unasked Q&A cards', hint: 'Each card has a question and answer.', span: true },
        ],
      },
      {
        title: 'FAQs',
        description: 'The accordion at the bottom of the service page. Same structure as the global FAQs.',
        fields: [
          { key: 'faqs', label: 'FAQ items', hint: 'Each item has a question and answer.', span: true },
        ],
      },
    ],
  })),

  // -------------------------------------------------------------------------
  // FAQs
  // -------------------------------------------------------------------------
  {
    id: 'faqs',
    label: 'FAQs',
    path: 'data/faqs.json',
    kind: 'array',
    commitMessage: 'Update FAQs via edit console',
    notes: 'Answers contain {{token}} placeholders — leave them intact.',
    itemFields: [
      { key: 'question', label: 'Question', span: true },
      { key: 'answer', label: 'Answer', span: true },
    ],
  },

  // -------------------------------------------------------------------------
  // Reviews
  // -------------------------------------------------------------------------
  {
    id: 'reviews',
    label: 'Reviews',
    path: 'data/reviews.json',
    kind: 'array',
    commitMessage: 'Update reviews via edit console',
    readOnlyKeys: ['id'],
    notes:
      'service must match a navTitle in Services list to pick up that service accent colour. rating drives the star display (1–5).',
    itemFields: [
      { key: 'id', label: 'ID (locked)', readOnly: true },
      { key: 'author', label: 'Author' },
      { key: 'location', label: 'Location', hint: 'e.g. "Kottivakkam, Chennai".' },
      { key: 'service', label: 'Service', hint: 'Must match a navTitle from the Services list.' },
      { key: 'rating', label: 'Rating (1–5)' },
      { key: 'date', label: 'Date (YYYY-MM)' },
      { key: 'comment', label: 'Comment', span: true },
      { key: 'isVerified', label: 'Verified', hint: 'When true, this review also shows in the per-service proof band.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Toughest cases
  // -------------------------------------------------------------------------
  {
    id: 'cases',
    label: 'Toughest cases',
    path: 'data/cases.json',
    kind: 'object',
    commitMessage: 'Update toughest cases via edit console',
    notes: 'The "stories[].body" is hidden in the UI but indexed by Google — keep it substantial.',
    groups: [
      {
        title: 'Section header',
        description: 'Shown above the case cards on the home page.',
        fields: [
          { key: 'section.eyebrow', label: 'Eyebrow' },
          { key: 'section.heading', label: 'Heading', span: true, hint: 'Wrap the trailing phrase in <em>…</em> to italicise it.' },
          { key: 'section.subline', label: 'Subline', span: true },
        ],
      },
      {
        title: 'Stories',
        description: 'Each story becomes a card on the home page. The body is in the HTML for SEO but not visible.',
        fields: [
          {
            key: 'stories',
            label: 'Story cards',
            hint: 'Each card has slug, tag, title, image, alt and a long body. id is hidden — it\'s just a React key.',
            itemFields: [
              { key: 'slug', label: 'Slug', hint: 'Must match a service slug or the link 404s.' },
              { key: 'tag', label: 'Tag (e.g. "Cook · 5 yrs")' },
              { key: 'title', label: 'Title', span: true },
              { key: 'img', label: 'Image path' },
              { key: 'alt', label: 'Image alt text' },
              { key: 'body', label: 'Body (paragraphs separated by blank lines)', span: true, hint: 'Long-form. Hidden in UI but indexed by Google.' },
            ],
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Page copy (about, home, service template)
  // -------------------------------------------------------------------------
  {
    id: 'pages',
    label: 'Page copy',
    path: 'data/pages.json',
    kind: 'object',
    commitMessage: 'Update page copy via edit console',
    notes: 'Contains {{token}} placeholders — leave them intact. Icon/circle colours and step numbers are fixed in code and not editable here.',
    groups: [
      {
        title: 'About page — Mission',
        fields: [
          { key: 'aboutPage.mission.heading', label: 'Heading' },
          { key: 'aboutPage.mission.intro', label: 'Intro', span: true },
          { key: 'aboutPage.mission.story', label: 'Story paragraph (supports HTML)', span: true, hint: 'You can use <strong>…</strong> to emphasise. Tokens like {{name}} are filled at build time.' },
        ],
      },
      {
        title: 'About page — Leadership',
        fields: [
          { key: 'aboutPage.leadership.heading', label: 'Heading' },
          { key: 'aboutPage.leadership.p1', label: 'Paragraph 1 (supports HTML)', span: true },
          { key: 'aboutPage.leadership.p2', label: 'Paragraph 2 (supports HTML)', span: true },
        ],
      },
      {
        title: 'About page — Verification steps',
        description: '4 cards shown on the about page under "Ethical Standards & Verification Approach".',
        fields: [
          { key: 'aboutPage.verification.heading', label: 'Section heading' },
          { key: 'aboutPage.verification.intro', label: 'Section intro', span: true },
          {
            key: 'aboutPage.verification.steps',
            label: 'Verification steps',
            itemFields: [
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description', span: true },
            ],
          },
        ],
      },
      {
        title: 'About page — Coverage',
        fields: [
          { key: 'aboutPage.coverage.heading', label: 'Heading' },
          { key: 'aboutPage.coverage.intro', label: 'Address line (shown beside the map pin)', span: true, hint: 'Use the {{name}} token to pull in the brand name.' },
          { key: 'aboutPage.coverage.outro', label: 'Outro', span: true },
        ],
      },
      {
        title: 'Home — Why choose us',
        description: 'The 4-card section under "The {{name}} Difference". Icons are fixed in code (MapPin, HeartHandshake, ShieldCheck, MessageCircle).',
        fields: [
          { key: 'homePage.whyChooseUs.eyebrow', label: 'Eyebrow' },
          { key: 'homePage.whyChooseUs.heading', label: 'Heading', span: true, hint: 'The last 3 words are italicised automatically.' },
          { key: 'homePage.whyChooseUs.subtext', label: 'Subtext', span: true },
          {
            key: 'homePage.whyChooseUs.items',
            label: 'Feature cards',
            itemFields: [
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description', span: true },
            ],
          },
        ],
      },
      {
        title: 'Home — How it works',
        description: 'The 4-step "From first message to a helper at home" section. Step numbers are fixed in code.',
        fields: [
          { key: 'homePage.howItWorks.eyebrow', label: 'Eyebrow' },
          { key: 'homePage.howItWorks.heading', label: 'Heading (lead)' },
          { key: 'homePage.howItWorks.headingEm', label: 'Heading (em part)' },
          { key: 'homePage.howItWorks.subtext', label: 'Subtext', span: true },
          {
            key: 'homePage.howItWorks.steps',
            label: 'Steps',
            itemFields: [
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description', span: true },
            ],
          },
        ],
      },
      {
        title: 'Service page template',
        description: 'Reused across every service page — the hiring steps band, the dark verify band, the final CTA.',
        fields: [
          {
            key: 'servicePage.hiringSteps.steps',
            label: 'Hiring steps (3 cards)',
            hint: 'num is the display badge and is fixed in code; only title and desc are editable.',
            itemFields: [
              { key: 'title', label: 'Title' },
              { key: 'desc', label: 'Description', span: true },
            ],
          },
          {
            key: 'servicePage.hiringSteps.strip',
            label: 'Hiring strip (4 chips)',
            hint: 'Plain strings shown as chips between the steps and the verify band. One per line.',
          },
          { key: 'servicePage.verifyBand.heading', label: 'Verify band heading' },
          { key: 'servicePage.verifyBand.subline', label: 'Verify band subline', span: true },
          { key: 'servicePage.faqSubtitle', label: 'FAQ section subtitle', span: true },
          { key: 'servicePage.finalCta.eyebrow', label: 'Final CTA eyebrow' },
          { key: 'servicePage.finalCta.titlePrefix', label: 'Final CTA title — prefix' },
          { key: 'servicePage.finalCta.titleSuffix', label: 'Final CTA title — suffix' },
          { key: 'servicePage.finalCta.subtitle', label: 'Final CTA subtitle', span: true },
          { key: 'servicePage.finalCta.buttonText', label: 'Final CTA button text' },
        ],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Blog articles
  // -------------------------------------------------------------------------
  {
    id: 'articles',
    label: 'Blog articles',
    path: 'data/articles.json',
    kind: 'array',
    commitMessage: 'Update blog articles via edit console',
    readOnlyKeys: ['slug'],
    notes:
      'slug is locked: it must match the public URL /blog/{slug}/ or the article page 404s. relatedServices entries should match service slugs.',
    itemFields: [
      { key: 'slug', label: 'Slug (locked — must match /blog/{slug}/)', readOnly: true },
      { key: 'title', label: 'Title', span: true, hint: 'Used in the blog index card, the breadcrumb and JSON-LD headline.' },
      { key: 'h1', label: 'H1 (article header)', span: true },
      { key: 'excerpt', label: 'Excerpt', span: true, hint: 'Short summary shown on the index card and under the H1.' },
      { key: 'date', label: 'Date (YYYY-MM-DD)' },
      { key: 'readTime', label: 'Read time (e.g. "8 min read")' },
      { key: 'relatedServices', label: 'Related services', hint: 'One service slug per line. Shown as "Related services" buttons at the bottom.' },
      { key: 'sections', label: 'Sections', hint: 'Each section has a heading and a body (separate paragraphs with a blank line).' },
    ],
  },

  // -------------------------------------------------------------------------
  // Areas
  // -------------------------------------------------------------------------
  {
    id: 'areas',
    label: 'Areas',
    path: 'data/areas.json',
    kind: 'array',
    commitMessage: 'Update areas via edit console',
    readOnlyKeys: ['slug'],
    notes:
      'slug is locked: it must match the public URL /areas/{slug}/ or the area page 404s. services[].link should point to existing service paths.',
    itemFields: [
      { key: 'slug', label: 'Slug (locked — must match /areas/{slug}/)', readOnly: true },
      { key: 'name', label: 'Name', hint: 'e.g. "Adyar". Shown in the eyebrow, button labels and as the headline subject.' },
      { key: 'h1', label: 'H1 (hero)', span: true, hint: 'The last word is automatically italicised.' },
      { key: 'heroSubtitle', label: 'Hero subtitle', span: true },
      { key: 'about', label: 'About the area', span: true, hint: 'Long paragraph shown in the "About the area" section.' },
      { key: 'services', label: 'Services in this area', hint: 'Each service card has a name, link and description.' },
      { key: 'nearby', label: 'Nearby areas', hint: 'One per line. First 5 are shown in the hero, all of them in the "We also serve nearby" section.' },
    ],
  },
];

export const ALLOWED_PATHS = EDIT_SECTIONS.map((section) => section.path);

export function isAllowedPath(path) {
  return ALLOWED_PATHS.includes(path);
}

export function getSectionByPath(path) {
  return EDIT_SECTIONS.find((section) => section.path === path) || null;
}

export function getSectionById(id) {
  return EDIT_SECTIONS.find((section) => section.id === id) || null;
}

/** Accepts a section id ("agency"), a repo path ("data/agency.json") or the object. */
export function resolveSection(idOrPathOrSection) {
  if (!idOrPathOrSection) return null;
  if (typeof idOrPathOrSection !== 'string') return idOrPathOrSection;
  return getSectionById(idOrPathOrSection) || getSectionByPath(idOrPathOrSection);
}

// ---------------------------------------------------------------------------
// Field inference — used for unconfigured fields and for the auto-renderer
// fallback in nested arrays of objects.
// ---------------------------------------------------------------------------

/**
 * @param {unknown} value
 * @returns {'text'|'textarea'|'number'|'boolean'|'stringArray'|'objectList'|'group'|'json'}
 */
export function inferFieldKind(value) {
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') {
    return value.length > 80 || value.includes('\n') ? 'textarea' : 'text';
  }
  if (value == null) return 'text';
  if (Array.isArray(value)) {
    if (value.length === 0) return 'stringArray';
    if (value.every((item) => typeof item === 'string')) return 'stringArray';
    if (value.every((item) => isPlainObject(item))) return 'objectList';
    return 'json';
  }
  if (isPlainObject(value)) return 'group';
  return 'json';
}

export function isPlainObject(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

const TOKEN_RE = /\{\{[a-zA-Z0-9]+\}\}/;

export function containsTokens(value) {
  return typeof value === 'string' && TOKEN_RE.test(value);
}

// ---------------------------------------------------------------------------
// Path helpers — the section schema uses dot-paths like "address.street" or
// "aboutPage.verification.steps" to address values deep in the JSON tree.
// ---------------------------------------------------------------------------

/** Parse "a.b.c" / "items[0].name" into ["a", "b", "c"] / ["items", "0", "name"]. */
export function pathToArray(key) {
  if (Array.isArray(key)) return key.filter((segment) => segment !== '');
  if (typeof key !== 'string') return [];
  return key
    .replace(/\[(\w+)\]/g, '.$1')
    .split('.')
    .filter((segment) => segment !== '');
}

/** Walk a dot-path through a JSON value. Returns undefined if any segment is missing. */
export function getByPath(value, key) {
  const segments = pathToArray(key);
  if (!segments.length) return value;
  let node = value;
  for (const segment of segments) {
    if (node == null) return undefined;
    node = node[segment];
  }
  return node;
}

const LABEL_OVERRIDES = {
  id: 'ID',
  slug: 'Slug',
  path: 'Path',
  h1: 'H1',
  h1Scope: 'H1 scope',
  alt: 'Alt text',
  seo: 'SEO',
  geo: 'Geo',
  ctaNoun: 'CTA noun',
  phone1: 'Phone 1',
  phone2: 'Phone 2',
  phoneDisplay1: 'Phone display 1',
  phoneDisplay2: 'Phone display 2',
  whatsappNumber: 'WhatsApp number',
  defaultWhatsAppMessage: 'Default WhatsApp message',
  metaTitle: 'Meta title',
  metaDescription: 'Meta description',
  navTitle: 'Nav title',
  shortName: 'Short name',
  readTime: 'Read time',
  relatedServices: 'Related services',
  heroSubtitle: 'Hero subtitle',
};

/** Human label for a camelCase / PascalCase JSON key (last segment of a dot-path). */
export function fieldLabel(key) {
  if (LABEL_OVERRIDES[key]) return LABEL_OVERRIDES[key];
  return String(key)
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}
