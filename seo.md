# SEO AUDIT & IMPLEMENTATION PLAN — Colours Life Manpower Agency
> **Primary locality: Kottivakkam, Chennai.** All geo signals, titles, schema, and content should target Kottivakkam as the primary, with Thiruvanmiyur, OMR, and greater Chennai as secondary coverage.
> **Delete this file after implementation is complete.**

---

## Target Outcomes

| # | Target | Channel |
|---|---|---|
| 1 | Rank higher on business profile (Google Local Pack / Maps) | GBP + NAP + reviews + schema |
| 2 | Rank higher in website organic results | Technical SEO + on-page content |
| 3 | Hit all keywords with real search traffic | Content + keyword gaps |
| 4 | Hit AI crawlers and search fetches (ChatGPT, Perplexity, Claude, Gemini) | robots.txt + llms.txt + schema + SSR |

---

## TARGET 1: Business Profile (Google Local Pack / Maps)

**2026 ranking factors (Whitespark/BrightLocal):** GBP signals = **32%**. Review signals = **20%**. Primary category = **#1 individual factor**. Business hours = **#5**. Review *velocity* (fresh reviews) > review *volume*.

### Current state

| Signal | Status | Issue |
|---|---|---|
| Google Business Profile | ⚠️ Unknown | Maps embed points to "2K Car Care" (landmark) — not the agency's own GBP |
| NAP consistency | ❌ CRITICAL | Address says Kottivakkam / fullAddress says Thiruvanmiyur / SEO targets Thoraipakkam / pages.json says "Nehru Nagar, Okkiyam Thoraipakkam" — 4 conflicting localities |
| Opening hours in schema | ❌ Missing | `hours: "8am–9pm"` in data but no `openingHoursSpecification` in JSON-LD |
| AggregateRating / Review schema | ❌ Missing | 4.9★ + 6 reviews exist but zero markup |
| `sameAs` / GBP link | ❌ Missing | `socials` all empty. No GBP Place ID. No `hasMap` |
| GBP categories | ⚠️ Unknown | Must include `Employment Agency` + secondary categories per service |

### Action items

- [ ] **Reconcile NAP to ONE primary locality: Kottivakkam.** Update all: `agency.json` seo fields, `data/pages.json`, service `localCoverage` fields, schema description. Secondary: Thiruvanmiyur, OMR, greater Chennai.
- [ ] **Add `openingHoursSpecification`** to `LocalBusinessSchema.jsx` — `Mo-Su 08:00-21:00`
- [ ] **Add `AggregateRating` + `Review` schema** (rating 4.9, reviewCount 6) to `LocalBusinessSchema.jsx` and/or `app/reviews/page.jsx`
- [ ] **Add `hasMap`, `sameAs`, `logo`, `image`, `foundingDate`, `knowsLanguage`** to LocalBusiness schema
- [ ] **Fix Maps embed** — replace "2K Car Care" with the agency's own GBP place URL
- [ ] **GBP optimization (off-code):** primary category `Employment Agency`, secondary categories for all 8 services, fill services section, photos weekly, posts 2×/week, seed Q&A, review request cadence

---

## TARGET 2: Website Organic Rankings

**2026 factors (local organic):** On-page = **33%**, links = **24%**, behavioral = **10%**. AI Overviews weight on-page **24%** vs GBP **12%**.

### Technical SEO bugs (code-level)

| # | Severity | Issue | File |
|---|---|---|---|
| 1 | CRITICAL | **Double brand in `<title>`** on every page except home — `title.template` appends `\| {{name}}` AND each page already ends with `\| {{name}}`. Titles 94–121 chars → SERP truncation. | `app/layout.jsx:11` + every `generateMetadata` |
| 2 | CRITICAL | **`/favicon.ico` 404** — `layout.jsx:64` links a file that doesn't exist in `public/` | `app/layout.jsx:64` |
| 3 | CRITICAL | **Duplicate `<meta viewport>`** — manual tag + Next auto-injected default | `app/layout.jsx:62` |
| 4 | CRITICAL | **Broken Service schema `image` URLs** — `siteUrl + cloudinaryURL` → `https://colourslifemanpower.comhttps://res.cloudinary.com/...`. Affects 6/8 services | `components/ServiceSchema.jsx:12` |
| 5 | CRITICAL | **`public/robots.txt` conflicts with `app/robots.js`** — static file silently ignored. `/api/` disallow lost | `public/robots.txt` vs `app/robots.js` |
| 6 | HIGH | **`/services/` index orphaned** — zero internal links to it | `components/Header.jsx` (Services is a button, not a link) |
| 7 | HIGH | **FAQ answers not server-rendered** — only 1 of 8 in DOM (JS-collapsed accordion) | `components/FAQSection.jsx:65` |
| 8 | HIGH | **FAQPage duplicated** on `/` and `/faq/` — same 8 Q&As + JSON-LD on two URLs | `app/page.jsx:29` + `app/faq/page.jsx:32` |
| 9 | HIGH | **Google Fonts via render-blocking `@import`** — no preconnect, no `next/font`. 7+ weights × 2 families | `app/globals.css:7` |
| 10 | HIGH | **BreadcrumbList schema without visible breadcrumbs** on 5 of 6 pages | `app/about\|contact\|faq\|reviews\|services/[slug]` |
| 11 | MEDIUM | Sitemap `lastModified` = `new Date()` every build — meaningless lastmod | `app/sitemap.js` |
| 12 | MEDIUM | `lang="en"` should be `en-IN`. Layout canonical missing trailing slash | `app/layout.jsx:52,58` |
| 13 | MEDIUM | OG image dims declared 1200×675 but actual 1200×896. Homepage OG = elderly-care photo (irrelevant) | `app/layout.jsx:39-40` |
| 14 | MEDIUM | Meta descriptions 161–180 chars (over ~155). MetaTitles 80–89 chars (over ~65) on all 8 service pages | `data/services/*.json` |
| 15 | MEDIUM | Reviews page text bug: "across and All Over Chennai" — broken sentence | `app/reviews/page.jsx:23-24` |
| 16 | MEDIUM | 404 page inherits default meta title — no tailored `metadata` | `app/not-found.jsx` |
| 17 | LOW | `availableWorkers`, `keyResponsibilities`, `localCoverage` exist in ALL 8 service JSONs but never rendered — wasted unique geo copy | `data/services/*.json` |
| 18 | LOW | `verificationFacts` byte-identical on 7/8 files. Templated sections identical on all 8 pages (~25-30% boilerplate) | `data/pages.json` + `data/services/*.json` |
| 19 | LOW | `data/pages.json` `homePage.whyChooseUs` has old address "Nehru Nagar, Okkiyam Thoraipakkam (Back Side Cognizant)" | `data/pages.json` |
| 20 | LOW | Review #5 "Vegetarian Cook" maps to no service — `ProofInline` never shows it | `data/reviews.json:46` |

### Content / keyword issues

| # | Issue | Impact |
|---|---|---|
| 21 | **Keyword-less H1s** on about/contact/faq/reviews — no "manpower agency", "domestic help", "maid", "cook" + geo | Weak on-page signals |
| 22 | **Generic anchor text** — "View Details" (7×/page), "View Service Details" (8×), "Book", "See more in detail" | Weak internal link equity |
| 23 | **No contextual in-body links** — zero editorial hyperlinks in paragraphs | Weak topic cluster signal |
| 24 | **`shortDescription`s have zero geo/intent keywords** — no "Chennai", "part-time", "live-in", "hire", "agency" | Missed keyword surface |
| 25 | **61-tag area cloud duplicated** on 10 pages + "Kottivakkam" listed twice | Stuffing risk |
| 26 | **No blog / knowledge hub** — 0 articles | Massive content gap |
| 27 | **No pricing/salary pages** — "cook salary in Chennai", "maid charges per month" untouched | High-value keyword gap |
| 28 | **No area landing pages** — 62 localities only as a tag cloud | Geo long-tail gap |
| 29 | **Missing keywords:** "cook maid", "nanny", "baby sitter", "japa maid", "24 hour maid", "senior citizen care at home", "nursing attendant", "hire maid Chennai", "how to find reliable maid in Chennai", "maid charges in Chennai" | Traffic left on table |

### Action items — technical (code)

- [ ] Fix title template duplication — remove `\| {{name}}` from `title.template` OR from every page's `metaTitle`
- [ ] Add `favicon.ico` to `public/` + `apple-touch-icon` + `manifest.json`
- [ ] Remove manual viewport meta; use `export const viewport`
- [ ] Fix `ServiceSchema.jsx` image concatenation (detect absolute URL vs relative)
- [ ] Delete `public/robots.txt`; merge rules into `app/robots.js` (add `/api/` disallow)
- [ ] Make `/services/` linked from Header (convert dropdown button to link + dropdown)
- [ ] Server-render all FAQ answers (remove conditional `openIndex` or add crawlable hidden content)
- [ ] Remove FAQPage schema from homepage (keep only on `/faq/`)
- [ ] Switch to `next/font` for Plus Jakarta Sans + Spectral; add preconnect
- [ ] Add visible breadcrumbs on service detail pages (match existing BreadcrumbSchema)
- [ ] Fix sitemap `lastModified` — use real dates or static value
- [ ] `lang="en-IN"`; fix layout canonical trailing slash
- [ ] Fix OG image dimensions; add per-page OG for home/about/contact/faq/reviews
- [ ] Trim meta descriptions to ≤155 chars, titles to ≤65 chars across all service JSONs
- [ ] Fix reviews page text bug
- [ ] Add `metadata` export to `app/not-found.jsx`
- [ ] Render `localCoverage` + `keyResponsibilities` + `availableWorkers` on service pages
- [ ] Deduplicate `verificationFacts` per service; vary templated sections per service
- [ ] Update stale NAP in `data/pages.json` + `validate_seo.mjs`
- [ ] Map review #5 "Vegetarian Cook" to `brahmin-cook` or `cooking`
- [ ] Rewrite keyword-less H1s on about/contact/faq/reviews (include service + geo terms)
- [ ] Rewrite generic anchors: "View Details" → "Cook services in Chennai" etc.
- [ ] Add 2–3 contextual in-body links per service page (FAQ answers linking to related services)

### Action items — content (new pages/sections)

- [ ] Add geo/intent keywords to `shortDescription`s in `data/services/index.json`
- [ ] Expand `faqs.json` from 8 → 20+ items (cook salary, maid charges, how to hire, replacement policy, part-time vs full-time)
- [ ] Add pricing/salary guide page (`/charges/` or `/pricing/`)
- [ ] Add 3–4 area landing pages (`/areas/adyar/`, `/areas/velachery/`, `/areas/omr-thoraipakkam/`, `/areas/thiruvanmiyur/`)
- [ ] Add 4–6 blog/guide articles ("How to Hire a Maid in Chennai", "Maid vs Cook vs Cook-Maid", "How Agencies Verify Helpers", "NRI Guide: Hiring Help for Parents in Chennai")
- [ ] Give `cases.json` stories real body copy (300–500 words each)
- [ ] Add dates to `reviews.json` (replace "Recent Feedback")
- [ ] Add NRI landing page ("Parents in Chennai, you're abroad?")
- [ ] Diversify `verificationFacts` per service (currently identical on 7/8)

---

## TARGET 3: Keyword Coverage

### Highest-value keyword gaps (by service)

| Service | MISSING high-volume keywords |
|---|---|
| Cooking | "cook for home in Chennai", "home cook Chennai", **"cook maid"**, "part time cook Chennai", "cook salary in Chennai" |
| Maid work | **"maid in Chennai"**, **"part time maid Chennai"**, **"full time maid"**, **"housemaid"**, **"domestic help near me"**, **"maid charges in Chennai"** |
| Baby care | **"nanny in Chennai"**, **"babysitter Chennai"**, **"baby sitter"**, "nanny for toddler" |
| Newborn | **"japa maid Chennai"**, **"postnatal care at home"**, **"night nanny newborn"**, **"24 hour newborn caretaker"** |
| Elderly care | **"senior citizen care at home"**, **"attendant for old age parents"**, **"elderly caregiver Chennai"** |
| Patient care | **"patient care at home"**, **"nursing attendant"**, **"bedside attendant"**, **"post operative care at home"** |
| Brahmin cook | "Iyer cook", "Iyengar cook", "satvik cook", "Brahmin cook without onion garlic" |
| Drivers | **"personal driver"**, **"monthly driver Chennai"**, **"driver for hire"** |
| Agency-wide | **"hire maid Chennai"**, **"domestic help agency Chennai"**, **"verified maid agency"**, **"how to find reliable maid in Chennai"** |

### Long-tail + geo opportunities

- "part time maid in Adyar", "elderly attendant in Velachery", "cook in Anna Nagar", "nanny for school pickup Adyar"
- "24 hour attendant for bedridden father", "attendant for parents while NRI/abroad"
- "how much does a cook cost in Chennai", "maid salary Chennai 2026"
- Tamil: "வேலைக்காரி சென்னை" (maid Chennai), "சமையல்காரர் வேண்டும்" (need cook)

### Action items

- [ ] Weave missing keywords into H1s, meta descriptions, `shortDescription`s, FAQ answers, blog content
- [ ] Create dedicated content for highest-volume commercial clusters (pricing/salary page)
- [ ] Use area landing pages for geo+service long-tails
- [ ] Add `knowsLanguage: ["Tamil", "English", "Telugu"]` in schema

---

## TARGET 4: AI Crawlers & Search Fetches

**2026 landscape:** AI crawlers split into **training** (GPTBot, ClaudeBot, CCBot), **search/index** (OAI-SearchBot, Claude-SearchBot, PerplexityBot), and **user-fetch** (ChatGPT-User, Claude-User). Google confirms `llms.txt` has **zero effect** on Google rankings but may help ChatGPT/Perplexity. AI Overviews weight on-page **24%** > GBP **12%**.

### Current state

| Signal | Status |
|---|---|
| robots.txt | ⚠️ Only `User-agent: *` — no named AI rules. `/api/` disallow lost |
| llms.txt | ❌ Missing |
| Structured data | ⚠️ Partial — missing WebSite, Organization, AggregateRating |
| SSR / static HTML | ✅ Fully static SSG — AI bots see complete HTML |
| Heading hierarchy | ✅ One H1 per page, proper nesting |
| Schema image URLs | ❌ Broken (concatenation bug) |
| Sitemap | ✅ Complete (14 URLs) but fake lastmod |
| FAQ answers in DOM | ❌ 1 of 8 visible (JS-collapsed) |

### Action items

- [ ] **Rewrite `app/robots.js`** with explicit named AI crawler rules:
  - `Allow` search/citation bots: `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Amazonbot`
  - `Allow` user-fetch bots: `ChatGPT-User`, `Claude-User`, `Perplexity-User`
  - **Decision: allow all training bots** (`GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`) — content isn't premium IP; being in AI answers drives calls
  - `Disallow: /edit/` + `Disallow: /api/` for ALL bots
- [ ] **Create `/public/llms.txt`** — markdown H1 + summary + links to all service pages, FAQ, contact
- [ ] **Add `WebSite` + `Organization` schema** with `@id` entity linking
- [ ] **Fix schema image URLs** (also fixes AI image parsing)
- [ ] **Server-render FAQ answers** (AI bots currently see 1/8)
- [ ] **Add `speakable` schema** to FAQ answers (voice search)

---

## Implementation Priority

### P0 — Critical bugs (~1-2 hours code)

1. Fix title template duplication
2. Fix `/favicon.ico` 404
3. Fix duplicate viewport meta
4. Fix ServiceSchema image URL concatenation
5. Delete `public/robots.txt`, rewrite `app/robots.js` (AI rules + `/api/` disallow)
6. Fix NAP → **Kottivakkam primary** everywhere
7. Add `openingHoursSpecification` + `AggregateRating`/`Review` to LocalBusiness schema

### P1 — High-impact (code + content, ~half a day)

8. Link `/services/` from Header
9. Server-render all FAQ answers
10. Remove FAQPage duplication from homepage
11. `next/font` + preconnect
12. Visible breadcrumbs on service pages
13. Trim meta lengths on all 8 service JSONs
14. Add geo keywords to `shortDescription`s
15. Create `llms.txt`
16. Fix reviews page text bug

### P2 — Content expansion (days, high ROI)

17. Pricing/salary guide page
18. 3-4 area landing pages
19. 4-6 blog articles
20. Expand FAQs to 20+
21. NRI landing page
22. Render `localCoverage` + `keyResponsibilities` on service pages

### P3 — Off-code (GBP optimization)

23. Claim/optimize Google Business Profile
24. Set categories (Employment Agency + secondaries)
25. Weekly photos + posts
26. Review request cadence
27. Citation cleanup (JustDial, Sulekha, etc.)

---

## Notes

- Per-service accent colors (`data/services/index.json`) are **unchanged** by any of this.
- `data/agency.json` is the single source of truth for NAP, contact, geo, socials.
- All `{{token}}` strings are filled at build time via `fillPlaceholders()` — SEO strings in `agency.json` use tokens too.
- `validate_seo.mjs` and `test_routes.mjs` have stale assertions (old phone 9884404444, old address) — update when touching NAP.
