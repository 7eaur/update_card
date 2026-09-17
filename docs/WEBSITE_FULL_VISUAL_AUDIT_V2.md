# UPDATE CARD — Full Website Visual Audit & Refresh v2

**Audit date:** 2026-09-18  
**Scope:** Full public website — Home, About, Services, 8 service-family pages, FAQ, Contact, 404, shared Header/Footer/CTA.  
**Design reference:** The approved Home visual system and the approved UPDATE CARD brand identity.

## Goal

Bring every public page into one coherent product and visual system instead of treating the Home page as a polished exception and the inner pages as generic templates.

The refresh preserves the approved information architecture and business content. It changes presentation, hierarchy, reusable components, responsive behavior and approved imagery only.

## Findings before the refresh

1. Inner-page heroes did not visually match the rebuilt Home hero.
2. About, FAQ, Contact and service-family pages felt sparse and generic compared with Home.
3. FAQ had no meaningful visual entry point and its accordion treatment was visually weak.
4. The shared inner-page contact CTA did not reuse the branded closing visual from Home.
5. Service-directory cards and service-detail media used different visual proportions.
6. Mobile service-directory layout did not consistently follow Home's two-card rhythm.
7. Service-detail process steps stacked differently from the mobile-first horizontal language approved for Home.
8. Contact page repeated generic content without a strong visual hierarchy.
9. Page-hero markup was duplicated instead of shared.
10. The previous component stylesheet contained stale/duplicated rules after several redesign passes.
11. Service image intrinsic dimensions still reflected older 4:3 assets while the newly approved media is widescreen.
12. Visual verification existed as ad-hoc screenshots rather than a repeatable CI artifact.

## Implemented visual-system changes

### Shared page hero

A reusable `PageHero` component now drives About, Services, FAQ and Contact. It uses the same language as Home:

- white / soft-blue surface
- restrained border and shadow
- brand-blue headings
- clear eyebrow hierarchy
- mobile-first text-first reading order
- widescreen visual
- two-column desktop layout

### About

- Hero uses the approved UPDATE CARD building visual.
- Story copy moved into a clear shared content panel.
- Speed / clarity / reliability are presented as a consistent three-card system.
- Closing section reuses the same CTA language as the rest of the site.

### Services directory

- Hero visually matches Home.
- All eight categories reuse the same service-card component and approved imagery.
- Mobile uses two service cards per row where the viewport allows.
- Desktop returns to a four-column grid.
- A clear note explains that service availability and pricing are confirmed at contact time.

### Service-family pages

All eight family routes now share one design contract:

- breadcrumb
- category eyebrow
- strong H1 and intro
- approved category image
- primary enquiry CTA
- examples grid
- three-step process
- category-specific caution where applicable
- related-service links
- branded contact CTA

This keeps content DRY while allowing each category to retain its own image, examples and note.

### FAQ

- New visual hero uses the approved question-mark visual.
- Questions are presented as individual accordion cards.
- Open/closed state has a clear rotating plus indicator.
- Spacing and typography match the rest of the site.

### Contact

- Shared visual hero.
- WhatsApp remains the primary channel and occupies the strongest mobile position.
- Phone and Facebook form the secondary pair.
- “Before you message us” guidance is separated from “custom request” information.
- No invented email, address or business hours were added.

### Shared CTA

The shared `ContactCTA` now reuses the approved Earth/space closing visual instead of a generic blue rectangle. Text remains real HTML for accessibility and SEO.

## Approved refreshed imagery

Service imagery is standardized to optimized AVIF at 640×360:

- Games → character + controller
- Social & entertainment → TikTok / Instagram / Discord / Spotify / YouTube visual
- Gift cards → PlayStation / Xbox / Netflix / Steam cards
- Subscriptions → Netflix / Spotify / Disney+ visual
- Software & licenses → Windows laptop
- Digital payments → mobile payments / Visa / Mastercard / PayPal visual
- International shopping → Amazon / shopping parcels
- Custom request → glowing bulb

Supporting Home/shared visuals:

- Closing CTA → Earth/space banner
- FAQ / service-not-found → question-mark cube
- Existing approved Home hero, About, Retail and Wholesale visuals remain in use.

## Responsive rules

### Mobile first

- Core page layout starts from the phone viewport.
- Service cards are two-up where practical.
- Important process steps stay horizontal where they remain understandable.
- Very narrow screens reduce secondary copy before reducing legibility.
- Shared heroes keep text before imagery in reading order.
- Header, CTA, cards and contact surfaces avoid horizontal overflow.

### Tablet / desktop

- Shared heroes become two-column compositions.
- Service directory expands to four cards per row on desktop.
- Content panels increase spacing without changing hierarchy.
- Footer returns to a four-column desktop layout.

## Engineering cleanup

- Added a shared `PageHero` component.
- Kept all eight service-family pages generated from one data source.
- Kept one shared contact configuration.
- Removed stale/duplicated component-style rules.
- Normalized service-image dimensions to 640×360.
- Kept zero runtime framework and minimal browser JavaScript.

## Visual QA

Site CI now builds the complete static site, validates local routes/assets, starts a local server and captures visual QA screenshots for representative routes:

- Home
- About
- Services
- Games service-family page
- FAQ
- Contact

Each representative route is captured at:

- Mobile: 390 px wide
- Desktop: 1440 px wide

The screenshots are uploaded as the `visual-qa` GitHub Actions artifact so every future design change can be reviewed against the same baseline.

## Functional / content boundaries retained

The refresh does **not** introduce:

- cart or checkout
- login/dashboard
- fake pricing
- unsupported service guarantees
- invented domain, email, address or opening hours
- legal-policy content that has not been approved

## Pending external inputs

The following remain intentionally pending:

- final custom domain
- official company email
- approved privacy-policy copy if needed
- approved terms/conditions copy if needed
- Search Console and domain-dependent canonical/sitemap configuration

## Source of truth

For the website implementation, the source of truth remains:

1. live repository code
2. build/check automation
3. approved brand package and design standard
4. approved company/service content baselines
5. verified runtime/deployment state

Production deployment status must be reported separately from repository/CI status. A green repository build does not by itself mean the public Vercel URL has received the same commit.
