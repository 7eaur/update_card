# UPDATE CARD — Website Implementation Status

## Current release state

**Website Profile v2 — full visual-system refresh implemented in repository**

Public production URL during the temporary-domain stage:

- `https://update-card-six.vercel.app/`

The repository and CI state must be distinguished from the public Vercel deployment. The production URL may temporarily lag behind `main` when the Vercel deployment quota blocks a new deployment.

Custom domain and company email remain pending client input and must not be invented.

## Product shape

- Multi-page static informational company/profile site.
- Not an e-commerce store.
- Primary conversion path: WhatsApp, with phone and Facebook as secondary channels.
- Shared Header, Footer, Page Hero, service cards and Contact CTA are reused across routes.
- Home and all inner pages now use one visual system.

## Design system status

Implemented across the public site:

- Cairo web typography.
- Approved UPDATE CARD brand colors and identity assets.
- Mobile-first responsive hierarchy.
- Shared white / soft-blue page surfaces, borders, radii and restrained shadows.
- Two-up service cards on mobile where practical and four-up on desktop.
- Shared inner-page hero system aligned with the Home design.
- Horizontal process patterns where they remain readable.
- Branded Earth/space closing CTA shared across inner pages.
- Consistent FAQ, contact, content-panel, notice and related-link treatments.
- Document-level overflow protection on narrow screens.

Full audit and decisions:

- `docs/WEBSITE_FULL_VISUAL_AUDIT_V2.md`

## Approved media state

### Service media

Optimized AVIF, standardized at 640×360:

- `games.avif`
- `social-entertainment.avif`
- `gift-cards.avif`
- `subscriptions.avif`
- `software-licenses.avif`
- `digital-payments.avif`
- `international-shopping.avif`
- `custom-request.avif`

### Supporting visuals

- Home hero: approved Home hero AVIF.
- About: approved building visual.
- Retail: approved retail visual.
- Wholesale: approved warehouse visual.
- Closing CTA: refreshed Earth/space WebP.
- FAQ / service-not-found: refreshed question-mark WebP.

Non-critical images are lazy-loaded. Primary hero media is loaded eagerly.

## Engineering decisions

- Zero runtime frontend framework.
- Zero third-party runtime UI dependencies.
- Build-time shared components.
- One service data source generates all eight service-family routes.
- One shared company/contact configuration.
- Brand tokens are bundled from the approved brand package.
- Minimal browser JavaScript for navigation/current year.
- Vercel build remains `npm run build` with `dist/` output.
- Toolchain remains Node 24.
- Service visuals use a shared 640×360 image contract.

## Source structure

```text
src/
  assets/
    images/home/ shared Home/supporting imagery
    media/services/ approved category imagery
  config/       shared company/contact config
  data/         services + FAQ content models
  components/   Header, Footer, PageHero, ServiceCard, ContactCTA, icons
  templates/    shared document layout
  pages/        Home, About, Services, FAQ, Contact, service-family renderer
  styles/       tokens/base/layout/components/media
  client/       minimal browser JavaScript
scripts/        build + preview + route/asset checks
brand/          approved identity source of truth
docs/           content/design/implementation source documents
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

## Verification pipeline

Every Site CI run performs:

1. static build
2. route/local-asset validation
3. representative mobile visual screenshots at 390 px
4. representative desktop visual screenshots at 1440 px
5. upload of the `visual-qa` screenshot artifact
6. production asset-size reporting

Representative visual routes:

- Home
- About
- Services
- Games service detail
- FAQ
- Contact

The screenshot artifact is a visual-review aid; the build/check step remains the executable routing/asset gate.

## SEO / discoverability status

Implemented:

- unique page titles and meta descriptions
- semantic headings and landmarks
- RTL Arabic semantics
- index/follow production robots meta
- Organization JSON-LD
- Open Graph baseline
- favicon and web app manifest
- crawlable static HTML routes

Deferred until the final custom domain is provided:

- canonical URLs using the real domain
- final `sitemap.xml`
- final `robots.txt` sitemap reference
- Search Console setup
- domain-based Open Graph URL/image declarations where appropriate

## Pending client inputs

- final custom domain
- official company email
- approved privacy-policy copy if required
- approved terms/conditions copy if required
- additional verified business/service claims

Do not invent these items.

## Deployment reporting rule

Repository/CI status and public deployment status are separate facts.

- A commit can be complete and CI-green while Vercel still serves an older deployment.
- Production is considered updated only after the exact deployed commit is verified and the public routes return successfully.
