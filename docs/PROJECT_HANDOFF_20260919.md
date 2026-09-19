# UPDATE CARD — Live Project Handoff

Last verified: 2026-09-19  
Repository: `7eaur/update_card`  
Official branch: `main`  
Verified main HEAD at handoff: `85cca024eb7a061ce0b85f62cc6c8552f210ae6c`  
Site CI for that exact HEAD: **PASS**

> On resume, always fetch live `main` first. If HEAD is newer than the SHA above, the live repository wins.

## Source of truth

1. live `main` code
2. `src/data/services.js`
3. `src/data/serviceCatalog.js`
4. `src/components/SubserviceCard.js`
5. `src/components/ResponsiveImage.js`
6. actual CSS in `src/styles/`
7. `scripts/build.mjs` and `scripts/check.mjs`
8. `.github/workflows/site-ci.yml`
9. current docs
10. newly supplied source images, only as input assets

Never infer an image/service mapping from a filename alone when the visual content disagrees. Inspect the image and the live catalog.

## Architecture

Multi-page static informational profile site; not an e-commerce checkout.

- Node 24 build.
- Zero runtime frontend framework.
- Shared build-time components.
- Eight service-family routes generated from service data/catalog.
- Production output: `dist/`.
- Vercel deploys from `main`.
- Primary conversion: WhatsApp.

Key structure:

```text
src/
  assets/
    media/services/                 category images
    media/subservices/<service>/    dedicated subservice images
    images/home/                    shared/supporting visuals
  data/
    services.js
    serviceCatalog.js
  components/
    SubserviceCard.js
    ResponsiveImage.js
  styles/
scripts/
  build.mjs
  check.mjs
.github/workflows/site-ci.yml
docs/
```

## Subservice image contract

A catalog item with `image: 'example'` resolves through `SubserviceCard.js` to:

`/assets/media/subservices/<service-slug>/example.avif`

Without a dedicated `image`, the card intentionally falls back to:

`/assets/media/services/<service-slug>.avif`

Dedicated card images use 480×360 intrinsic markup, 4:3 framing, native lazy loading, async decoding, low fetch priority, and responsive `sizes`.

### Performance rules

- Every production content image must remain under **50 KB**.
- New subservice imagery should normally target roughly **4–15 KB** where quality permits.
- Prefer AVIF for dedicated subservice cards.
- Strip unnecessary metadata.
- Crop only irrelevant outer whitespace.
- Do not upscale weak sources just to hit a nominal size.
- Do not commit large source PNG/JPEG files merely because they were supplied.

## Current dedicated subservice coverage

Production currently contains **31 referenced dedicated subservice AVIF assets**.

Completed groups:

- Social & entertainment: **8/8**
- Gift cards: **7/7**
- Software & licenses: **6/6**
- Digital payments: **6/6**
- Custom request: **4/4**

Still missing dedicated images:

- Games: **12**
- Subscriptions: **10**
- International shopping: **13**

Total remaining dedicated images: **35**.

These 35 cards are **not broken**; they intentionally use the parent category fallback until dedicated images are supplied.

### Games — missing slugs

`pubg-mobile`, `pubg-new-state`, `free-fire`, `fc-mobile`, `efootball`, `call-of-duty`, `clash-of-clans`, `clash-royale`, `brawl-stars`, `clash-of-kings`, `zynga-poker`, `jawaker`.

### Subscriptions — missing slugs

`netflix`, `shahid-vip`, `youtube-premium`, `youtube-music`, `amazon-prime`, `anghami`, `playstation-plus`, `expressvpn`, `nordvpn`, `surfshark`.

### International shopping — missing slugs

`amazon-global`, `ebay`, `best-buy`, `walmart-shopping`, `samsung`, `apple-store`, `razer-store`, `computer-stores`, `shein`, `noon`, `jarir`, `samma3a`, `gcc-stores`.

Do not invent dedicated imagery for missing items. Use supplied source images unless the user explicitly requests generation.

## Completed image work

Previously completed:
- Gift cards: 7 AVIF.
- Social & entertainment: 8 AVIF.

Recently completed and connected:
- Software/licenses: 6 AVIF.
- Digital payments: 6 AVIF.
- Custom request: 4 AVIF.

The earlier broken-image problem was caused by catalog paths pointing to files that had not actually been committed. It is fixed on `main`.

Three uploaded assets were intentionally removed because no production card referenced them:
- `digital-payments/mastercard.avif`
- `custom-request/gift-card-bundle.avif`
- `custom-request/technical-setup.avif`

Do not restore orphan assets unless the product/catalog is deliberately changed to use them.

## CI protections

Site CI now:

1. builds the static site
2. checks required routes and local references
3. requires all eight service-family routes
4. verifies every production subservice AVIF can be decoded
5. fails on orphaned/unreferenced production subservice media
6. captures visual QA for every service-family page
7. captures at 360 px, 390 px, and 1440 px
8. enforces performance budgets, including 50 KB max per content image
9. uploads the `visual-qa` artifact

Exact main HEAD `85cca024eb7a061ce0b85f62cc6c8552f210ae6c` passed Site CI.

## How to process future image batches

Work batch by batch.

1. Fetch live `main`; verify HEAD.
2. Inspect supplied images visually.
3. Inventory them before code changes.
4. Match each image to a real `serviceCatalog.js` item using visual evidence and catalog semantics.
5. Mark ambiguous/unmatched files instead of guessing.
6. Crop irrelevant outer whitespace only.
7. Convert/optimize to lightweight AVIF.
8. Prefer the catalog slug as filename.
9. Store under `src/assets/media/subservices/<service-slug>/`.
10. Add/update `image` and accurate `imageAlt` in `serviceCatalog.js`.
11. Ensure no orphan assets remain.
12. Run build/check.
13. Let CI decode-test all subservice AVIF files and enforce budgets.
14. Review mobile + desktop visual-QA screenshots.
15. Merge only after exact-head CI is green.
16. Re-fetch `main` and verify post-merge CI.

Never claim an image is uploaded/connected until the file exists in the branch, its catalog reference resolves, and CI verifies it.

## Mobile behavior

Subservice cards intentionally remain **two columns on mobile**, including narrow layouts. Do not regress to a featured first card or single-column layout while adding images.

## Deployment caveat

GitHub repository/CI state and public Vercel deployment are separate facts.

A previous Vercel deployment was rate-limited. That was an external deployment quota issue, not an image/build failure. Production is updated only after the exact deployed commit is verified publicly.

## Next execution order

1. Receive the next source-image batch.
2. Prefer completing one missing family at a time: subscriptions, then games, then international-shopping (unless the user supplies another order).
3. Optimize, map, connect, test, visually review, and merge.
4. Update this handoff/counts after each completed family.
5. When all 35 dedicated images are complete, run all-route visual QA and verify production deployment.

## Resume rule

Do not restart or redo completed families. Continue from live `main`. This handoff is orientation; live code and executable CI always override stale documentation.
