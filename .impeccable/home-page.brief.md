# Surface brief — Home page

<!-- impeccable:surface-schema 1 -->

## Mode

Persuade

The home page is the marketing landing for the agency: it exists to convert a Chennai family browsing the site into a WhatsApp conversation with Thomas R. Read content lives on the service pages; the home page has one job — make the visitor decide to message.

## Visitor, job, action

A working family or senior household in OMR / Chennai just heard about Colours Life (Google, a neighbour, a WhatsApp forward). They want to know: is this agency trustworthy, what do they actually offer, and how fast can I get someone to message? They should leave the first viewport with the agency name, what makes it different, and a single obvious way to start.

## Proof and content

Real evidence available on the home page:

- Six verified 5-star testimonials (one per service line) — `data/reviews.json`.
- Eight service categories with their own detail pages — `data/services.json`.
- Agency address, two phone numbers, WhatsApp — `data/agency.json`.
- Office location and Chennai coverage narrative — `data/pages.json`.
- Eight FAQs — `data/faqs.json`.

No invented metrics, no fake customer counts, no stock photos of unrelated hospitals. Where a section calls for a number, use a labelled proven claim (e.g. "8 services", "6 family voices", "since 2017" only if asserted by the user).

## Direction (pinned by the user with the CareHaven reference)

The reference image (`web_design_references/_home_care_reference_2.webp`) is binding. The user said "replicate as closely as possible" for the hero and to redesign "from composition to typography to the entire UI design" in that style.

- **World:** CareHaven — a deep forest-green ground with a single lime accent, a soft sage textured top band, off-white card surfaces, and a small set of humanist-sans type. Calm and clinical, never gamified, never gamified-medical; the visual language of a competent clinic that treats people like family.
- **Top accent band:** thin, dusty sage with a fine grain, full bleed. Sets the world before the hero.
- **Primary ground:** dark forest teal (`~#0F3A36`). Carries the hero, the stats row, the trust logo strip, the service selector block, and the "daughters at your doorstep" pattern.
- **Accent:** a single lime green (`~#CCF26A`) for CTAs, active tabs, the floating badge, and selected states. The only colour that is allowed to shout.
- **Light surface:** warm off-white (`~#F4EFE6`) for the about-and-process band, the numbered service rows, and the testimonials section.
- **Type:** a humanist sans (Plus Jakarta Sans / Inter family) for everything — display, body, and labels. One weight step for hierarchy. Headings sit at the heavy weight (700–800) with a small negative tracking, body at 400–500. No serif display.

## First viewport composition

- 12-column grid, container max-width 1280px.
- Left ~5 columns: a star-rating row ("4.9/5 · 6 family voices"), the headline "Your Home Help, Vetted And Matched To Yours." (two-line, heavy weight, last word's placement italicised or in the accent for emphasis), a 2-line subline, one primary lime CTA "Find Your Caregiver Today" (pill), one secondary text-only link with arrow.
- Right ~7 columns: a tall portrait photograph of a caregiver with a senior, occupying the full hero height. A circular rotating badge "CareHaven-CareHaven" sits at the bottom-right corner of the photograph.
- Below the hero on the dark ground: a stats strip (3,200+ caregivers placed / 5k+ happy Chennai families / 97.5% return rate — to be replaced with agency-specific labels if those numbers are not asserted) and a row of 6 partner-style logos (Pérez-Llorca, Slack, Dropbox, etc., to be replaced with locality or community-style marks), dimmed.

## Memorable moment

The circular rotating badge anchored to the hero photograph — "CareHaven-CareHaven" repeating around a circle, with a small leaf or check icon in the centre. This is the signature element from the reference; keep it.

## Unresolved decisions

- Exact aggregate stats for the dark stats strip: the reference uses numbers the user has not asserted ("3,200+ / 5k+ / 97.5%"). Resolve by replacing with truthful counts (8 services, 6 verified reviews, since 2017) and flagging the question to the user.
- Replacement of partner logos: the reference uses unrelated brand logos. Replace with locality or community marks the agency is happy to be associated with, or with a single line of locality tags.
- Video section in the reference has no obvious mapping to the agency. Adapt to a "tough cases we handle" pattern using existing testimonial evidence and labelled appropriately.