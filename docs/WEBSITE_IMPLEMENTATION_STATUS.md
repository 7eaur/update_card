# UPDATE CARD — Website Implementation Status

## Current batch

Foundation + shared layout + Home experience v1 + approved Hero media integration.

### Engineering decisions

- Multi-page static informational profile site.
- Zero runtime framework and zero third-party frontend dependencies.
- Build-time shared components for Header, Footer, service cards, CTA and page layout.
- Service-family pages are generated from one service data source instead of duplicated by hand.
- Brand colors are read from `brand/tokens/brand-tokens.css` during build and bundled into one production CSS file.
- Minimal client JavaScript: mobile navigation + current year only.
- Existing production brand assets are reused; no duplicate source logo package is created.
- The approved Hero composition keeps the visual subject on the left and a calm text-safe area on the right for RTL content.
- The Hero uses a dedicated mobile crop instead of shrinking the desktop composition blindly.

### Source structure

```text
src/
  assets/media/ approved optimized visual media
  config/       shared business/contact config
  data/         services + FAQ content models
  components/   reusable UI components
  templates/    shared document layout
  pages/        page content renderers
  styles/       tokens/base/layout/components/media
  client/       minimal browser JS
scripts/        build + local preview
brand/          approved identity assets (existing source of truth)
```

### Media performance

- Hero desktop is an optimized WebP under 20 KB.
- Hero mobile crop is an optimized WebP around 13 KB.
- Hero is eagerly loaded as the expected LCP visual.
- Intrinsic dimensions are present to reduce layout shifts.
- Other service artwork remains approved for the next media-integration batch.

### Current routes

- `/`
- `/about/`
- `/services/`
- `/services/<8-family-slugs>/`
- `/faq/`
- `/contact/`
- `/404.html`

### Next verification batch

Run the build/route checks, inspect the Hero at desktop/mobile widths, then integrate the approved service artwork through the single `services` data model.
