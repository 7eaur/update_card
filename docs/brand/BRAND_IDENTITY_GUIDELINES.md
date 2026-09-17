# UPDATE CARD — Brand Identity Guidelines v1.0

**Status:** APPROVED ASSET SYSTEM / DERIVED FROM SUPPLIED RASTER SOURCE

## 1. Source of truth

The canonical source is `brand/source/originals/update-card-logo-reference.jpeg`.

All production assets in this package are derived from the supplied artwork. No replacement typeface, invented symbol, or redesigned UC geometry is used in the canonical assets.

Because the supplied master is a JPEG, this package does not claim a native vector master. SVG/EPS path files are intentionally omitted rather than providing an inaccurate auto-trace.

## 2. Logo system

### Primary horizontal lockup

Approved website lockup:
- UC mark on the **right**.
- Wordmark on the **left**.
- `UPDATE` on the first line.
- `CARD` on the second line.
- The two words keep the original custom letterforms and relative letter height.

Production file: `brand/logo/horizontal/update-card-horizontal-transparent.png`

Recommended web derivatives:
- `brand/web/logo-horizontal-320.avif`
- `brand/web/logo-horizontal-640.avif`
- `brand/web/logo-horizontal-320.webp`
- `brand/web/logo-horizontal-640.webp`

### UC mark

Use the full UC mark for service artwork, larger compact placements, social profile art and app/PWA icons.

`brand/logo/icon/update-card-uc-transparent.png`

### Original source composition

The original supplied artwork remains the archival source and is retained under `brand/source/originals/`.

### Wordmark only

`brand/logo/wordmark/update-card-wordmark-transparent.png`

### Stacked lockup

For narrow branded areas where a vertical composition is more suitable:

`brand/logo/stacked/update-card-stacked-transparent.png`

## 3. Small-size mark

For browser favicons, the full UC mark becomes too wide and its internal details become unreadable. The favicon therefore uses the **U portion extracted directly from the original UC artwork** as a micro mark. It is a source-derived crop, not a redrawn symbol.

Use the full UC mark again when enough pixel space is available.

## 4. Color palette

The following operational colors are sampled from the supplied raster logo and are intended for consistent web/UI usage. They are derived values, not claimed as original designer specification values.

- Brand red: `#950331`
- Deep red: `#8F1B2A`
- Purple: `#2B057D`
- Plum: `#680646`
- Deep blue: `#031877`
- Accent blue: `#236BA9`
- Charcoal: `#353B43`
- White: `#FFFFFF`

Machine-readable files:
- `brand/tokens/brand-colors.json`
- `brand/tokens/brand-tokens.css`

## 5. Gradient

For interface accents only:

`linear-gradient(135deg, #8F1B2A 0%, #950331 30%, #680646 62%, #031877 100%)`

Do not replace the logo artwork with this CSS gradient.

## 6. Background usage

### Light surfaces

Transparent or on-white production assets may be used directly.

### Dark or photographic surfaces

Do not invent a recolored logo. Prefer a calm/light image area or a white/neutral logo container so the original colors remain unchanged.

## 7. Clear space

Keep clear space around the logo equal to at least **15% of the displayed logo height** on every side. Increase this in hero or editorial placements when possible.

## 8. Minimum practical sizes

Implementation guidance:
- Primary horizontal lockup: prefer `>= 180 CSS px` width in headers.
- UC icon: prefer `>= 72 CSS px` width when displayed alone.
- For tiny browser sizes use the prepared favicon assets rather than shrinking the full horizontal logo.

## 9. Web image strategy

- AVIF or WebP for optimized modern delivery when a fallback strategy is in place.
- PNG as the faithful fallback and transparent source derivative.
- ICO for browser favicon compatibility.
- Do not use JPEG for transparent UI logo delivery.

## 10. Do / don't

### Do
- Preserve aspect ratio.
- Preserve source colors.
- Use prepared lockups.
- Use the horizontal lockup in the main header.
- Use the UC mark for compact branded areas.
- Use the micro favicon asset at tiny browser sizes.

### Don't
- Do not retype UPDATE CARD using a substitute font.
- Do not stretch or compress the mark.
- Do not rotate or skew it.
- Do not recolor it arbitrarily.
- Do not add glow, bevel, shadow, or outline directly to production logo files.
- Do not place busy artwork immediately behind the logo without enough contrast.
- Do not claim an auto-traced SVG as the master vector.

## 11. Asset roles

### Website header
`brand/web/logo-horizontal-640.avif` / WebP fallback.

### Small mobile header
Use `brand/web/logo-horizontal-320.avif` if space allows. Otherwise use `brand/web/logo-icon-256.webp` and keep the accessible brand name in HTML.

### Footer
Use the horizontal lockup. On dark footer backgrounds, place it inside a light/neutral brand-safe container or use a light footer surface.

### Browser
`brand/favicon/favicon.ico`
`brand/favicon/favicon-32x32.png`

### Apple / PWA
See `brand/app-icons/`.

### Social
See `brand/social/`.

## 12. Accessibility

The logo image should use appropriate alternative text when it identifies the site, for example `UPDATE CARD`. If adjacent visible text already names the brand and the image is decorative, use an empty alt attribute to avoid duplicate announcements.
