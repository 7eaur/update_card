# UPDATE CARD — Brand Identity Guidelines v1.0

## 1. Overview

This guide governs the supplied UPDATE CARD logo only. It does not define positioning, services, a slogan, or a UI design system. The supplied raster reference is retained at `brand/source/originals/update-card-logo-reference.jpeg`; the package reconstructs its UC symbol, geometric typography character, and red–violet–blue palette in clean vectors.

## 2. Primary horizontal logo

The approved primary composition is deliberately RTL-aware:

- UC icon on the **right**.
- `UPDATE` on the first line and `CARD` on the second line, on the **left**.
- Never set the primary logo as one horizontal `UPDATE CARD` line.

Use `brand/web/logo-horizontal.min.svg` for normal web placement.

## 3. Logo variants

| Variant | Intended use |
| --- | --- |
| Full color horizontal | Default light-surface logo |
| White horizontal | Dark, photographic, or saturated surfaces |
| Dark / single-color horizontal | One-ink production or restricted-color contexts |
| Stacked | Centered layouts and square compositions |
| Icon only | Compact UI, avatars, and app contexts |
| Micro mark | 16–32px favicon only; simplified to preserve legibility |
| Wordmark only | Rare cases where the UC icon is established nearby |

## 4. Light and dark backgrounds

Use the full-color or dark version on white and very light neutral backgrounds. Use the white version over dark backgrounds. Do not add shadows, glows, outlines, or a coloured panel inside the SVG. Keep enough contrast around the mark.

## 5. Clear space and minimum sizes

Keep a clear space equal to at least **12.5% of the horizontal logo height** around every edge. This is the `x` reference in the tokens.

- Horizontal logo: 120px minimum digitally; 30mm in print.
- Icon: 24px minimum digitally; 7mm in print.
- Favicon: use the dedicated micro mark at 16px and 32px, not the full horizontal logo.

## 6. Palette

| Role | HEX | RGB |
| --- | --- | --- |
| Primary red | `#A91535` | 169, 21, 53 |
| Primary blue | `#173B8F` | 23, 59, 143 |
| Accent blue | `#1F83B6` | 31, 131, 182 |
| Gradient midpoint | `#7B0B4B` | 123, 11, 75 |
| Ink | `#303845` | 48, 56, 69 |
| White | `#FFFFFF` | 255, 255, 255 |

The brand gradient runs 135° from `#B21D35` (0%) through `#7B0B4B` (48%) to `#102B82` (100%). Use it only where a full-color UC icon is approved; do not invent new gradient directions or stops.

## 7. Incorrect usage

Do not stretch, skew, rotate, redraw, arbitrarily recolor, reorder the icon and text, change their scale relationship, put the mark on a low-contrast background, or apply shadows/glows. Do not replace the primary composition with a one-line wordmark.

## 8. File selection

- **SVG:** first choice for websites, product UI, and scalable digital design.
- **PNG:** platform fallback or bitmap-only use; transparent unless the icon canvas is explicitly white.
- **PDF vector:** print proofing and vendor handoff.
- **ICO:** browser fallback only.
- **AVIF/WebP:** not logo source formats; use only for preview imagery if needed.

## 9. Favicons and app icons

`favicon.svg` and `favicon.ico` use the dedicated micro mark. App/PWA icons place the primary UC icon on a white canvas with approximately 18% inset safe area, which remains usable for rounded-square and Android maskable crops. The social avatar follows the same icon-only principle.

## 10. Developer notes

Production SVGs have their lettering converted to paths, have no embedded raster images, and use a tight viewBox. Prefer minified SVG files in application bundles. Brand colours and spacing reference are exposed in `brand/tokens/` and are not a wider component design system.
