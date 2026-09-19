# UPDATE CARD — Performance, Delivery & Motion Audit v1

**Date:** 2026-09-19  
**Scope:** Public static website, including Home, About, Services, eight service-family pages, FAQ and Contact.

## Executive summary

The current site is already lightweight by static-site standards. The main performance work in this pass focused on protecting that advantage while adding motion:

- no animation framework
- no runtime UI framework
- lightweight IntersectionObserver motion
- motion disabled for reduced-motion users and constrained connections
- AVIF service imagery
- lazy loading for non-critical images
- eager + high fetch priority only for page/service hero images
- explicit image dimensions to prevent layout shift
- static-asset caching on Vercel
- CI performance budgets to stop future regressions
- canonical URLs, sitemap, robots, Organization structured data and social metadata

## Measured build baseline

Exact CI measurements on the full motion/performance branch before merge:

| Asset | Uncompressed size |
| --- | ---: |
| Shared CSS | 37,515 bytes |
| Shared JavaScript | 3,087 bytes |
| Home HTML | 27,247 bytes |
| All content media in dist | 249,445 bytes |
| Largest content image | 15,009 bytes |

These values are source/static sizes before HTTP compression. Vercel can serve compressible text assets with transport compression, so CSS/JS/HTML transfer sizes should be lower in normal production delivery.

## Image audit

### Current strengths

- Primary service visuals are AVIF.
- Service assets are standardized around 640×360.
- Every content image is below the enforced 50 KB budget.
- The current largest content image is only ~15 KB.
- Home LCP image is ~8 KB.
- Width and height attributes are present on rendered images.
- Non-critical visuals use native lazy loading and async decoding.
- Hero images use eager loading.
- Hero images now explicitly use high fetch priority.

### Weak-network behavior

The site deliberately avoids downloading all visuals during initial render. Images below the fold remain lazy and are requested as the user approaches them.

This means the repository's total media size is **not** the initial page payload.

### Current trade-off

Service images use one optimized 640px AVIF source instead of multiple tiny responsive variants. Because the individual files are already exceptionally small (roughly 5–15 KB), additional 320px variants would add build/repository complexity for relatively small bandwidth savings. Revisit this only if future imagery becomes materially larger.

## Motion audit

Motion is now a progressive enhancement across public pages.

### Rules

- reveal distance: 10–16px
- reveal duration: 400ms
- stagger: 50ms per child, capped at 250ms
- animation properties: transform + opacity
- no parallax
- no scroll hijacking
- no autoplay carousel
- no looping decorative motion
- no animation framework

### Accessibility / constrained conditions

Motion is disabled when:

- `prefers-reduced-motion: reduce` is active
- browser/network reports `Save-Data`
- connection reports `slow-2g` or `2g`
- IntersectionObserver is unavailable

Because motion is opt-in through a runtime class, content remains visible and usable when JavaScript is unavailable or motion is disabled.

## Rendering and Core Web Vitals protections

### LCP

- primary hero image is small
- primary hero is eager
- page/service heroes receive high fetch priority
- no hero image is lazy loaded

### CLS

- image intrinsic width/height is declared
- cards and hero media use stable aspect ratios
- no late animation changes layout geometry
- motion uses transforms instead of layout-changing properties

### INP

- JavaScript remains very small
- IntersectionObserver replaces scroll-event animation listeners
- elements are unobserved after first reveal
- no third-party animation runtime
- menu interaction remains small/native

## Fonts

Cairo continues to load from Google Fonts with `display=swap`.

Improvements in this pass:

- requested font weights reduced from five to four
- preconnect to Google Fonts remains
- system/Arabic fallback fonts remain in the stack

Under poor connectivity, text can render using fallback fonts instead of waiting for Cairo.

A fully self-hosted font would remove the external font dependency, but should only be introduced if the approved licensed font files are intentionally added to the project and their additional payload is justified.

## CDN / caching

Vercel now receives explicit caching rules for static assets:

- browser max-age: 1 day
- stale-while-revalidate: 7 days

This improves repeat visits without making browser caches excessively sticky during active design iterations.

## SEO / crawlability

Implemented:

- semantic static HTML
- Arabic language + RTL document metadata
- unique titles and descriptions
- canonical URLs on `https://updatecard.net`
- sitemap.xml
- robots.txt sitemap reference
- Organization JSON-LD
- email, phone and Sanaa/Yemen organization data
- Open Graph title/description/url/site name
- Twitter summary metadata
- crawlable links without JS routing
- no framework hydration dependency

## Runtime stability

Vercel production runtime error review found no runtime error clusters in the inspected 24-hour window.

The product is primarily static, so runtime risk is inherently low compared with server-rendered or client-heavy applications.

## CI regression gates

Site CI now fails when any of these limits are exceeded:

- CSS > 55 KB
- JavaScript > 12 KB
- Home HTML > 40 KB
- all content media > 350 KB
- any single content image > 50 KB

These are repository-specific guardrails, not universal web standards. Their purpose is to protect UPDATE CARD from gradually becoming heavy as new content is added.

## Remaining practical risks

1. Google Fonts is still an external dependency; fallback rendering prevents blank text.
2. Real-user Core Web Vitals depend on device, geography, ISP, Vercel edge availability and final DNS/domain setup. Static build sizes alone cannot prove field CWV.
3. Future images must continue through the image budget gate; raw uploads must never be inserted directly into production pages.
4. The final custom domain should be verified after DNS connection, including HTTPS, redirects, canonical URLs, sitemap and Search Console.

## Rule for future media

Before adding a new production visual:

1. crop unused canvas/space
2. resize to its realistic display requirement
3. prefer AVIF for photographic/illustrative content
4. use SVG for suitable vector identity/UI assets
5. include width + height
6. lazy load unless it is the actual LCP image
7. keep the production content image below 50 KB unless a documented visual-quality exception is approved
8. do not lazy-load the LCP image
9. verify mobile first under a constrained-network mindset
