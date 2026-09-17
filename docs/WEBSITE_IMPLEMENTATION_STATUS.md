# UPDATE CARD — Website Implementation Status

## Current batch

Foundation + shared layout + Home experience v1.

### Engineering decisions

- Multi-page static informational profile site.
- Zero runtime framework and zero third-party frontend dependencies.
- Build-time shared components for Header, Footer, service cards, CTA and page layout.
- Service-family pages are generated from one service data source instead of duplicated by hand.
- Brand colors are read from `brand/tokens/brand-tokens.css` during build and bundled into one production CSS file.
- Minimal client JavaScript: mobile navigation + current year only.
- Existing production brand assets are reused; no duplicate source logo package is created.
- Images for service artwork remain an art-direction task and can be added to the service data model without changing page architecture.

### Source structure

```text
src/
  config/      shared business/contact config
  data/        services + FAQ content models
  components/  reusable UI components
  templates/   shared document layout
  pages/       page content renderers
  styles/      tokens/base/layout/components
  client/      minimal browser JS
scripts/       build + local preview
brand/         approved identity assets (existing source of truth)
```

### Current routes

- `/`
- `/about/`
- `/services/`
- `/services/<8-family-slugs>/`
- `/faq/`
- `/contact/`
- `/404.html`

### Next visual batch

Generate/prepare responsive service artwork for the Home/service cards, then replace the CSS fallback artwork through the single `services` data model.
