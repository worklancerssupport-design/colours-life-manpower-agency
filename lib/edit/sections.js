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
 */

/** @type {EditSection[]} */
export const EDIT_SECTIONS = [
  {
    id: 'agency',
    label: 'Agency profile',
    path: 'data/agency.json',
    kind: 'object',
    commitMessage: 'Update agency.json via edit console',
    notes:
      'Single source of truth for every phone number, address, claim, stat and SEO string. {{tokens}} elsewhere in the data resolve against this file at build time.',
  },
  {
    id: 'services-index',
    label: 'Services list',
    path: 'data/services/index.json',
    kind: 'array',
    commitMessage: 'Update services index via edit console',
    readOnlyKeys: ['id', 'slug', 'path'],
    notes:
      'id, slug and path are locked: slug must match the detail filename and path must match the public URL or the service page 404s. navTitle is matched against Reviews > service.',
  },
  ...SERVICE_SLUGS.map((slug) => ({
    id: `service-${slug}`,
    label: `Service detail — ${slug}`,
    path: `data/services/${slug}.json`,
    kind: 'object',
    commitMessage: `Update ${slug} service detail via edit console`,
    notes: 'Contains {{token}} placeholders — leave them intact, they are resolved at build time.',
  })),
  {
    id: 'faqs',
    label: 'FAQs',
    path: 'data/faqs.json',
    kind: 'array',
    commitMessage: 'Update FAQs via edit console',
    notes: 'Answers contain {{token}} placeholders — leave them intact.',
  },
  {
    id: 'reviews',
    label: 'Reviews',
    path: 'data/reviews.json',
    kind: 'array',
    commitMessage: 'Update reviews via edit console',
    readOnlyKeys: ['id'],
    notes:
      'service must match a navTitle in Services list to pick up that service accent colour. rating drives the star display.',
  },
  {
    id: 'cases',
    label: 'Toughest cases',
    path: 'data/cases.json',
    kind: 'object',
    commitMessage: 'Update toughest cases via edit console',
  },
  {
    id: 'pages',
    label: 'Page copy',
    path: 'data/pages.json',
    kind: 'object',
    commitMessage: 'Update page copy via edit console',
    notes: 'Contains {{token}} placeholders — leave them intact.',
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
// Field inference — lets the UI render any JSON value without per-section code.
// ---------------------------------------------------------------------------

/**
 * @param {unknown} value
 * @returns {'text'|'textarea'|'boolean'|'stringArray'|'objectList'|'group'|'json'}
 */
export function inferFieldKind(value) {
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'text';
  if (typeof value === 'string') {
    return value.length > 80 || value.includes('\n') ? 'textarea' : 'text';
  }
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
  metaTitle: 'Meta title',
  metaDescription: 'Meta description',
  navTitle: 'Nav title',
  shortName: 'Short name',
};

/** Human label for a camelCase / PascalCase JSON key. */
export function fieldLabel(key) {
  if (LABEL_OVERRIDES[key]) return LABEL_OVERRIDES[key];
  return String(key)
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}
