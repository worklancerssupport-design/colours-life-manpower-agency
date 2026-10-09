# Service Page Redesign — Implementation Brief

> **For the implementing agent.** Research and technical planning are complete. Read this file and implement as specified. Do not re-research. Do not invent business claims. Ask only if a hard rule conflicts with the code.

---

## 1. Goal

Redesign `app/services/[slug]/page.jsx` (all 8 service pages) so each page is a **clean, high-converting SEO entry point**. Someone lands here from Google with a problem at home (no cook tonight, mother needs an attendant, newborn next month). They are comparing 3 agency tabs and silently asking one question: *"What exactly do I get, what does it cost me, and what happens if it goes wrong?"*

The page is a **decision document**, not a company profile.

**Three jobs, in order:**
1. **Curiosity** — hero + first sections make them think "this page gets my situation"
2. **Attention** — every section answers the NEXT question they would have asked out loud
3. **Convert** — the needy hit WhatsApp before finishing the page

---

## 2. Hard Rules (non-negotiable)

| Rule | Detail |
|---|---|
| **ZERO pricing content** | No section on pricing. No numbers. No market rates. No "what your quote depends on". No price ranges. No "charges start at". Prices are negotiated on further contact — never shown on the page. |
| **ZERO about-us content** | No "At Colours Life Manpower Agency we…", no "our team ensures", no "our agency headquarters is located", no "we take a personalized approach", no owner/brand name in body copy. Delete any sentence about the agency's feelings, history, or self-description. |
| **No unverifiable superlatives** | No "most trusted", "number 1 in Chennai", "best", "100% verified", "reliable" as bare adjectives. If it can't be checked, cut it. |
| **Single-viewer voice** | Write for ONE person (let's call her Priya — a Chennai family person comparing options on her phone). Second person "you/your". Every pixel must answer *"what do I get from this that benefits me?"* |
| **Never fabricate business claims** | Only use facts already in `data/agency.json`, `data/services.json`, `data/reviews.json`. Aadhaar ID check + residential background + prior-work references are approved. "Replacement support" (not guaranteed replacement) is approved. |
| **Owner name** | Must NOT appear anywhere on service pages. Only visible mention is `app/contact/page.jsx`. |
| **No booking/scheduling concept** | This is inquiry → WhatsApp conversation → placement. Never "book now", "schedule", "appointment". |

---

## 3. Current Problems (what we're fixing)

| Problem | Location | Fix |
|---|---|---|
| About-us paragraphs in 4 of 6 narrative cards | Card 1 ("At Colours Life Manpower Agency, we take a personalized approach…"), Card 3 ("All staff registered through… interviewed personally by the owner…"), Card 5 ("Because our agency headquarters is located…"), Card 6 ("Colours Life Manpower Agency remains your point of contact…") | Delete. Replace with visitor-outcome copy |
| "Who Can Benefit From OUR Services" framing | Card 2 H2 | → "Is this for you?" with situations, not "our clients include…" |
| "Owner · Agency Lead" float badge | Hero image | Delete entirely |
| No "what if it goes wrong" section | Missing (buried in FAQ) | New dark band section |
| No proof on the page | Missing (6 real reviews unused) | New mid-page ProofInline |
| No unasked-questions section | Missing | New "Before you decide" section |
| No scope (included / not included) | Missing | New "What you get" split section |
| No shift-options section | Missing | New 3-column shift cards |
| All 6 narrative cards identical layout | Page-wide | Vary section treatments (cards, splits, dark band, grids) |
| Template content with nouns swapped | `intro`, `availableWorkers`, `localCoverage` | Rewrite per-service, genuinely divergent |
| Theme gradients nearly identical | `.theme-*` classes | Activate per-service `accentColor` from `services.json` |
| Weak CTA copy | "Book {Service}", "Enquire for {Service}" | First-person, specific, with response-time promise |
| Location pill + 3 check pills clutter hero | Hero left column | Replace with single Quick Facts bar |

---

## 4. New Page Structure (section by section)

Total: **12 sections**, psychological order (each answers the next question).

### §1 — Compact Service Hero (redesigned)
**Job:** Confirm "right place" in 3 seconds. First CTA.

| Element | Content |
|---|---|
| Breadcrumbs | `Home / Services / {shortName}` (keep existing) |
| Eyebrow | `{category} · {shift types} · OMR & Chennai` e.g. `Home Cook · Part-time & Live-in · OMR & Chennai` |
| H1 | Keep existing `service.h1` (already SEO-good) + optional scope clause appended: `— daily meals, part-time or live-in` |
| Subtitle (2 lines) | Benefit-first + their immediate worry + action prompt. Example: *"A vetted home cook matched to your family's timing and food habits — usually placed within a week. Tell us your area and shift on WhatsApp and we'll check availability today."* |
| **Quick facts bar** (NEW) | 3 compact chips in a horizontal strip, replacing the location pill AND the 3 checkmark pills. Verifiable only: `Usually placed in days` · `Aadhaar + references checked` · `OMR · Perungudi · Velachery` (use real `serviceAreas` subset) |
| CTA row | **Primary:** `Ask about a cook on WhatsApp` (first-person, specific). **Secondary:** `Call {phone}`. **Micro-copy below:** `WhatsApp answered 8am–9pm, usually within the hour` |
| Image | Service photo (keep `service.image`). **Remove the `composition-badge-float` owner badge.** Small accent-color corner mark on image |

**NO price anchor. NO "quote depends on". NO pricing language anywhere.**

**Design:** Keep 2-column `hero-editorial-grid`. Tighten left column from 6 stacked blocks to 4 (eyebrow+h1, subtitle, facts bar, CTA). Per-service `accentColor` on eyebrow mark + button accent + image corner mark.

---

### §2 — What You Get (Scope)
**H2:** `What you get with a {service} in Chennai`
**Layout:** 2-column split — **Left: "Handled for you"** (checkmarks) / **Right: "You arrange"** (neutral markers).

- **Handled for you:** condensed from `keyResponsibilities` (the actual duties performed)
- **You arrange:** from `disclaimer` content + industry norms. E.g. for cooking: groceries, ingredients, vessels, menu decisions. For elder care: medical decisions remain with family.

**Copy rule:** Every bullet should pass the "this means you can…" test where natural.

---

### §3 — Is This For You? (Self-Identification)
**H2:** `Is this for you?`
**Layout:** Checklist of SITUATIONS in second person. Rewrite `whoIsItFor` entries. Example: *"Both adults in your home leave for work by 8am and dinner is still an open question."* Soft sage/cream background.

**Do NOT use:** "Our clients include…", "Who can benefit from our services" framing.

---

### §4 — Shift Options
**H2:** `Part-time, full-time or live-in — choose your shift`
**Layout:** 3-column cards.

| Card | Hours | What it looks like | Best for |
|---|---|---|---|
| Part-time | 2–4 hrs, morning or evening | Specific tasks in a fixed window | Working couples, small households |
| Full-time | 8–12 hrs, day shift | Extended daily coverage | Families with kids/elders home all day |
| Live-in | Stays in your home | Structured shift with rest hours (NOT 24h on-call) | Round-the-clock needs, recovery, newborn |

Make these service-specific (a driver's shifts ≠ an elder attendant's shifts). New data field `shiftOptions[]`.

---

### §5 — How Hiring Works
**H2:** `How hiring works`
**Layout:** 3 numbered steps (horizontal on desktop) + a "What happens after you message" strip.

Rewrite current steps to visitor voice:
1. **Tell us what you need** — WhatsApp your locality, shift, and duties. (Not "Contact us via WhatsApp or phone. Share your family size…")
2. **See matched profiles** — You get verified candidates whose experience and locality fit. You talk to them before deciding.
3. **Start with an introduction** — Once you choose, the person starts. You have one number for anything after.

**"What happens after you message" strip:** *You send your locality + shift → you hear back within the hour → you see verified profiles → you choose. No office visit needed.*

---

### §6 — What's Checked & What If It Goes Wrong (DARK BAND)
**H2:** `What's checked before anyone enters your home`
**Layout:** Full-width DARK section (`--ink-900` background, light text). This is the emotional core — make it visually prominent.

**Left half — Verification** (only true facts):
- Aadhaar government identity check
- Residential background verification
- Prior-work / character reference where available

**Right half — Risk policies** (visitor-outcome framing):
- Replacement support if the arrangement doesn't work
- Clear notice expectations on both sides
- You meet / speak with the person before they start

> **⚠️ DATA NOTE:** Do NOT invent a trial period, notice period length, or salary-payment model. If `riskPolicies` data isn't confirmed, use only the three bullets above (all already approved). Do not state "you pay the worker's salary directly" unless it's added to `services.json` by the business owner.

**Copy reframe:** NOT "All staff registered through Colours Life Manpower Agency are interviewed personally by the owner." → "Whoever is placed with you has had their ID checked, references spoken to, and duties clarified with you before day one. You see the verification details before they start."

---

### §7 — Proof (mid-page)
**H2:** `What Chennai families say`
**Layout:** 1–2 testimonial cards matching THIS service. Filter `data/reviews.json` by `service` field.

**Review ↔ service mapping** (existing `data/reviews.json`):
| Service slug | Review author | Service field |
|---|---|---|
| `cooking` | S. Swaminathan | "Cooking / Cook Service" |
| `newborn-baby-care` | Divya & Rajesh K. | "Newborn Baby Care" |
| `elderly-care` | R. Venkatesh | "Elderly Care" |
| `maid-work` | Anitha M. | "Maid Work / Domestic Help" |
| `brahmin-cook` | Narayanan S. | "Brahmin Cook" |
| `patient-care` | Dr. Arun Kumar | "Patient Care" |
| `baby-care` | *(none)* | Show a general review or skip section |
| `drivers` | *(none)* | Show a general review or skip section |

Do NOT fabricate reviews. If no matching review, omit the section or show one general review.

---

### §8 — Before You Decide (Unasked Questions)
**H2:** `Before you decide`
**Layout:** Q/A card grid (2-column). 6–8 questions per service. These answer what they wouldn't know to ask.

**Question templates (adapt per service):**
- Do I pay the salary to you or directly to the person? → *(Only answer if confirmed. Otherwise omit this Q.)*
- Is there a trial or introduction before I commit?
- What if the person doesn't work out or leaves suddenly?
- How soon can someone start?
- Do I need to visit your office?
- What do you need from me in the first message?
- What languages do they speak?
- What if I need to change timings or duties later?
- Weekly off / festival leave — how does that work?

**This section is the differentiator.** It turns a brochure into a guide. Must be genuinely service-specific across all 8 pages (NOT template-with-nouns-swapped).

---

### §9 — Coverage
**H2:** `Areas we cover`
**Layout:** Tag cloud only (`agencyInfo.serviceAreas`). **DELETE the about-us paragraph** about office location, "quick access to major residential hubs", "our agency headquarters is located right at…".

---

### §10 — FAQ
Keep existing `FAQSection` with `service.faqs`. Rewrite ANSWERS to visitor voice (keep questions). Remove "Our team will check available cooks…" → "You'll hear back within the hour with matching options."

---

### §11 — Related Services
Keep existing `OtherServices` component. Fine as-is.

---

### §12 — Final CTA
**Title:** `Need a {service} this week?` (NOT "Ready to Book Your…")
**Subtitle:** `Tell us your area and shift. You'll hear back within the hour — a real person, no bots.` (NOT "Contact Colours Life Manpower Agency in Okkiyam Thoraipakkam… prompt, courteous service.")
Same WhatsApp + Call buttons. Remove all agency-name references.

---

## 5. Content Flow (the conversation)

```
Hero              → "Am I in the right place?"         → YES, and here's the CTA
What you get      → "What exactly do I receive?"       → Concrete scope
Is this for you   → "Is this for MY situation?"        → They see themselves
Shifts            → "How would this work in my flat?"  → Logistics clear
How hiring works  → "What happens if I message?"       → No unknowns
What's checked    → "What if it goes wrong?"           → Risk neutralized (DARK)
Proof             → "Do others trust this?"            → Belief
Before you decide → "What haven't I thought of?"       → They feel understood
Coverage          → "Do you serve my area?"            → Self-qualify
FAQ               → "Any last doubts?"                 → Cleanup
Related           → "What else do you offer?"          → Onward path
Final CTA         → "OK, I'm convinced"                → WhatsApp
```

---

## 6. Data Changes (`data/services.json`)

Add these fields to **all 8 services** (content must be genuinely divergent per service — elder care ≠ drivers ≠ brahmin cook):

| Field | Type | Content |
|---|---|---|
| `eyebrowText` | string | e.g. `"Home Cook · Part-time & Live-in · OMR & Chennai"` |
| `heroSubtitle` | string | **REWRITE** — benefit-first, ~2 lines, ends with action prompt |
| `scopeIncluded[]` | string[] | What's handled (condensed duties, 5–7 items) |
| `scopeExcluded[]` | string[] | What you arrange (3–5 items) |
| `shiftOptions[]` | object[] | `[{type, hours, description, bestFor}]` × 3 (part-time/full-time/live-in, service-specific) |
| `verificationFacts[]` | string[] | Only true checks: Aadhaar, residential background, prior references |
| `riskPolicies` | string[] | Replacement support, introduction-before-start, clear communication. Only confirmed facts |
| `unaskedQAs[]` | object[] | `[{question, answer}]` × 6–8, service-specific |
| `whatsappMessage` | string | **REWRITE** — qualifying pre-fill (see below) |

**REWRITE (remove about-us):**

| Field | Fix |
|---|---|
| `intro` | **DELETE** (pure about-us) OR fold the useful bits into `heroSubtitle` |
| `availableWorkers` | Rewrite to visitor-outcome: "The person placed with you is experienced in…" NOT "Our cooking staff include…" |
| `localCoverage` | Keep the areas list. **DELETE** the office/location paragraph |
| `whoIsItFor` | Rewrite as second-person situations |
| `faqs[].answer` | Rewrite to visitor voice. Keep questions |
| `heroSubtitle` | Benefit-first + worry + action prompt |

**KEEP AS-IS:** `keyResponsibilities[]`, `disclaimer`, `image`, `alt`, `h1`, `metaTitle`, `metaDescription`, `shortName`, `navTitle`, `badge`, `accentColor`, `path`, `slug`, `id`, `shortDescription`.

**`whatsappMessage` template** (qualifying pre-fill — this is the VISITOR's message, leads to conversation where pricing is negotiated):
```
Hi, I need a [cook] in [your area] — [part-time/full-time/live-in], around [hours] per day. Please share availability and next steps.
```
Adapt nouns per service. This is a message the visitor sends — it is NOT page copy. It's fine to include "availability and next steps" since pricing is negotiated in the ensuing conversation (which is exactly the business's requirement).

---

## 7. Component & CSS Changes

| File | Change |
|---|---|
| `app/services/[slug]/page.jsx` | Full restructure to new 12-section order. Delete about-us JSX |
| **NEW** `components/ScopeSplit.jsx` | 2-col included/not-included (§2) |
| **NEW** `components/ShiftCards.jsx` | 3-col shift options (§4) |
| **NEW** `components/BeforeYouDecide.jsx` | Unasked Q/A grid (§8) |
| **NEW** `components/ProofInline.jsx` | Filtered testimonial cards from `reviews.json` (§7) |
| `components/WhatsAppCTA.jsx` | Accept `eyebrow` prop (service-specific vs "Founder-direct") |
| `components/OtherServices.jsx` | Keep as-is |
| `components/FAQSection.jsx` | Keep as-is (accepts `faqs`, `title`, `subtitle`) |
| `app/globals.css` | **NEW:** `.hero-facts-bar`, `.scope-grid`, `.shift-cards`, `.verify-band` (dark), `.unasked-grid`, `.proof-inline`. **DELETE usage:** `.composition-badge-float`. **ACTIVATE:** per-service `accentColor` via CSS custom property on the hero section |
| Schema | Add `Service` JSON-LD per page (`areaServed` = `agencyInfo.serviceAreas`). `LocalBusiness` already sitewide in `app/layout.jsx`. `FAQPage` + `BreadcrumbSchema` already present — verify FAQ schema matches rendered Q&A 1:1 |

---

## 8. Visual Design Direction

- **Section rhythm:** alternate light (`paper-50`) / cream (`paper-100` or sage) / one DARK band (§6 verification) like the homepage's dark emphasis sections
- **No monotony:** do NOT use the same `.service-narrative-card` for every section. Vary: splits, 3-col grids, dark band, Q/A grid
- **Accent colors:** each service has `accentColor` in `services.json` — use it on the eyebrow mark, image corner accent, and hover states
- **Typography:** use the existing `em` italic accent pattern (`heading <em>italic</em>`) used on the homepage
- **Spacing:** generous (96px section padding desktop, 72px mobile) — anti-cramped, matching homepage
- **Theme backgrounds:** clean up `.theme-*` so they actually differ per service (currently nearly identical)

---

## 9. Implementation Order

1. **Data layer** — add new fields to all 8 services in `services.json` (content-heavy, biggest job)
2. **Hero redesign** — restructure hero JSX + `.hero-facts-bar` CSS, remove owner badge
3. **New components** — `ScopeSplit`, `ShiftCards`, `BeforeYouDecide`, `ProofInline`
4. **Page restructure** — rewire `app/services/[slug]/page.jsx` to the 12-section order
5. **Copy rewrite** — kill about-us in `availableWorkers`, `localCoverage`, FAQ answers, CTA subtitles
6. **CSS polish** — accent colors, dark verify band, spacing rhythm
7. **Verify** — `npm run lint` then `npm run verify` (all 8 pages must build)

---

## 10. Dev Environment Rules (hard)

- User runs their own `npm run dev`. **NEVER leave a dev server running** — `pkill -9 -f "next dev"; pkill -9 -f "next-server"` after tests
- **Never `npm install`** while their dev runs (only shared resource = `node_modules`)
- Verify via `npm run verify` only (never `npm run build` while dev is live)
- Artifact isolation: `next.config.js` `distDir` = `.next-dev` (dev) / `.next` (build) / `NEXT_DIST_DIR=.next-verify` (verify)
- `npm run lint` must stay clean (`next/core-web-vitals`)

---

## 11. What NOT To Do

- ❌ Any pricing section, numbers, rates, ranges, "quote depends on", "charges", "fees" on the page
- ❌ About-us paragraphs, agency name in body copy, owner name anywhere
- ❌ "Most trusted", "number 1", "best in Chennai", "100% verified"
- ❌ "Book now", "Schedule an appointment", "Booking process"
- ❌ Fabricated reviews, fabricated policies, fabricated salary-payment model
- ❌ Template-with-nouns-swapped content across the 8 services
- ❌ Reusing the identical `.service-narrative-card` for all sections
