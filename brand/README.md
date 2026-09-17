# UPDATE CARD — Brand Identity Asset Package v1.0

Production-oriented visual identity assets derived from the supplied original logo artwork.

## Canonical source

- `source/originals/update-card-logo-reference.jpeg`

This raster artwork is the source of truth for geometry, colors, lettering and the UC mark.

## Primary lockup

The approved horizontal website lockup is:

- **UC icon on the right**
- **UPDATE / CARD on two lines on the left**

The letters are not retyped: they are extracted from the supplied custom wordmark and recomposed without changing the character shapes.

## Recommended web files

- Header / desktop: `web/logo-horizontal-640.webp`
- High-density / large use: `web/logo-horizontal-1280.webp`
- Header / small screens: `web/logo-horizontal-320.webp`
- Compact mobile use: `web/logo-icon-256.webp`
- Transparent source-quality horizontal lockup: `logo/horizontal/update-card-horizontal-transparent.png`
- Footer: `web/logo-horizontal-640.webp`
- Favicon: `favicon/favicon.ico` plus `favicon/favicon-32x32.png`
- Apple touch: `app-icons/apple-touch-icon.png`
- PWA: `app-icons/icon-192.png`, `icon-512.png`, and maskable variants
- Social avatar: `social/social-avatar-1024.png`

## Format note

A genuine editable vector master (SVG/EPS/PDF paths) is **not claimed** in this package because the supplied source is a raster JPEG. The package intentionally prefers faithful raster derivatives over inaccurate auto-traced vectors.

Web delivery currently uses optimized WebP plus PNG/ICO where transparency or platform compatibility requires them. AVIF may be produced later in the deployment image pipeline when useful; it is not required for the logo system to be valid.

## Reproducibility

- `build_identity_assets.py` regenerates the core logo, web, favicon and app/PWA files from the canonical source.
- `build_social_assets.py` regenerates the social-avatar files from the generated canonical UC icon.
- `.github/workflows/build-brand-assets.yml` verifies and regenerates the production assets on the identity branch.

## Important

Do not recolor, stretch, skew, rotate, retype, or redraw the logo. Use the supplied derivatives and the rules in `docs/brand/BRAND_IDENTITY_GUIDELINES.md`.
