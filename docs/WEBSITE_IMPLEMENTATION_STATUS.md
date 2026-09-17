# UPDATE CARD — Website Implementation Status

## Release

**Website Profile v1 — deployed to Vercel production**

Production URL during the temporary-domain stage:

- `https://update-card-six.vercel.app/`

Custom domain and company email remain pending client input and must not be invented.

## Product shape

- Multi-page static informational company/profile site.
- Not an e-commerce store.
- Primary conversion path is direct contact through WhatsApp/phone/Facebook.
- Shared Header and Footer are generated once and reused across all routes.

## Engineering decisions

- Zero runtime framework and zero third-party frontend dependencies.
- Build-time shared components for Header, Footer, service cards, CTA and page layout.
- Service-family pages are generated from a single service data source instead of duplicated by hand.
- Company/contact values live in one shared configuration source.
- Brand colors are read from `brand/tokens/brand-tokens.css` and bundled into production CSS.
- Minimal browser JavaScript: mobile navigation + current year only.
- Approved brand assets and visual media are reused; no duplicate identity system is created inside the website.
- The approved Hero keeps the visual subject on the left and the Arabic text-safe area on the right.
- Hero has a dedicated mobile crop rather than blindly shrinking desktop composition.
- Service cards and service-family pages reuse the same service image reference from the shared data model.
- Web media uses optimized WebP assets; non-critical media is lazy-loaded.
- Vercel runs `npm run build` and publishes `dist/`.
- Toolchain is pinned to Node 24 across local metadata, GitHub Actions and Vercel.

## Source structure

```text
src/
  assets/media/ approved optimized website media
  config/       shared company/contact config
  data/         services + FAQ content models
  components/   reusable UI components
  templates/    shared document layout
  pages/        page content renderers
  styles/       tokens/base/layout/components/media
  client/       minimal browser JavaScript
scripts/        build + preview + route/asset checks
brand/          approved identity source of truth
```

## Published routes

- `/`
- `/about/`
- `/services/`
- `/services/games/`
- `/services/social-entertainment/`
- `/services/gift-cards/`
- `/services/subscriptions/`
- `/services/software-licenses/`
- `/services/digital-payments/`
- `/services/international-shopping/`
- `/services/custom-request/`
- `/faq/`
- `/contact/`
- `/404.html`

## Current content baseline

- Operating since: 2018
- WhatsApp / phone: `770498884`
- International phone URI: `+967770498884`
- Facebook: `https://www.facebook.com/Update.Cards.770498884/`
- Retail + wholesale positioning
- Eight documented service families
- Custom-request service included

## Verification completed

- 14 static pages generated successfully.
- Local route and asset checker passed in GitHub Site CI.
- GitHub Site CI passed on the release head before merge.
- Vercel Preview built successfully from the exact reviewed head.
- Pull Request #4 was squash-merged into `main`.
- Vercel production deployment completed successfully.
- Production build logs show `Built 14 static pages into dist/` with no build error.
- Production HTTP checks returned `200 OK` for:
  - Home
  - About
  - Services directory
  - Games service-family page
  - Contact
- Production HTML contains RTL Arabic semantics, responsive media paths, organization structured data, favicon/manifest references and the official contact links.

## SEO / discoverability status

Implemented now:

- unique page titles and meta descriptions
- semantic headings and landmarks
- index/follow production robots meta
- Organization JSON-LD
- Open Graph title/description baseline
- favicon and web app manifest
- crawlable static HTML routes

Deferred until the final custom domain is provided:

- canonical URLs using the real domain
- final `sitemap.xml`
- final `robots.txt` sitemap reference
- Search Console setup
- domain-based Open Graph URL/image declarations where appropriate

## Legal/content items still pending client input

Not release blockers for the current profile preview/production stage:

- final custom domain
- official company email
- approved privacy-policy copy if required
- approved terms/conditions copy if required
- any additional verified service details or business claims

Do not invent these items. Add them only after the client supplies or approves them.
