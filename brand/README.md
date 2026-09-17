# UPDATE CARD — asset package

This folder is the production asset package for UPDATE CARD. Use files from `web/` in product interfaces; use `logo/` for brand, print, and design tooling.

## Choose the right file

| Context | Use |
| --- | --- |
| Website header / footer | `web/logo-horizontal.min.svg` |
| Compact mobile header | `web/logo-icon.min.svg` |
| Dark website surface | `web/logo-white.svg` |
| Light website surface | `web/logo-dark.svg` or `web/logo-horizontal.min.svg` |
| Favicon | `favicon/favicon.svg` plus `favicon/favicon.ico` fallback |
| Apple browser icon | `app-icons/apple-touch-icon.png` |
| PWA manifest | `app-icons/icon-192.png`, `app-icons/icon-512.png`, and both `maskable-*` files |
| Social avatar | `social/social-avatar-1024.png` |
| Print / vendor delivery | `logo/primary/pdf/logo-horizontal-full-color.pdf` or the matching SVG |

## Implementation

```html
<link rel="icon" href="/brand/favicon/favicon.svg" type="image/svg+xml">
<link rel="alternate icon" href="/brand/favicon/favicon.ico">
<link rel="apple-touch-icon" href="/brand/app-icons/apple-touch-icon.png">
<img src="/brand/web/logo-horizontal.min.svg" width="140" height="55" alt="Update Card">
```

SVG is the default for logos: it is sharp, compact, transparent, and has no external font dependency. PNG is for platforms that do not accept SVG. WebP/AVIF are intentionally not supplied as logo substitutes; they are useful for photographic previews, not vector marks. ICO is only a favicon fallback.

## Rebuild

Run `./scripts/build-brand-assets.sh` from the repository root after changing an editable master. It recreates generated files and preserves the supplied reference in `source/originals/`.
