# Web Design & Engineering Standard v1.1

**Status:** APPROVED BASELINE  
**Scope:** UX, UI, information architecture, responsive design, accessibility, frontend architecture, code quality, performance, media optimization, animation, SEO, security basics, testing, and release quality.  
**Purpose:** A reusable engineering and design standard for professional websites, landing pages, portfolio/profile sites, and lightweight marketing websites.  

> This document intentionally contains **no product-specific idea, services, business model, CTA destination, or page copy**. It is a general standard used to judge future design and implementation decisions.

---

## 1. Golden rule

Before adding any element, section, interaction, animation, dependency, image, or line of copy, ask:

1. **Does the user need it?**
2. **Will the user understand it quickly?**
3. **Does it help the user complete the next useful action?**
4. **Does it justify its visual, cognitive, and performance cost?**

If the answer is no, remove it or simplify it.

---

## 2. Human-centered design principles

### 2.1 Task before appearance

Design starts from the user task, context, and expected outcome—not from cards, gradients, devices, effects, or trends.

### 2.2 Clarity before impressiveness

A visually impressive interface that is difficult to understand is a failed interface.

The first viewport should quickly communicate:

- what this website/entity is,
- what value/content it offers,
- what the primary next action is.

### 2.3 Information architecture before UI

Before drawing screens, define:

- content groups,
- content priority,
- navigation,
- primary vs secondary information,
- page/section purpose,
- what should appear first and what can be progressively disclosed.

### 2.4 Recognition over recall

Prefer visible, direct, understandable choices. Do not force users to remember where something appeared or decode ambiguous icons.

### 2.5 Familiar interaction patterns

Innovation is encouraged in composition and visual identity, but common interaction patterns should remain predictable.

- Buttons must look actionable.
- Links must be recognizable.
- Navigation must behave consistently.
- Interactive states must be visible.
- Do not invent a custom interaction model for a simple website.

### 2.6 Reduce cognitive load

- Group related content.
- Limit simultaneous choices.
- Prefer short, direct labels.
- Remove duplicate sections.
- Use progressive disclosure for secondary details.
- Avoid excessive visual competition.

---

## 3. Visual hierarchy and composition

Every viewport must have a clear reading order.

Recommended priority:

1. Current task / primary message
2. Primary action or key content
3. Supporting explanation
4. Secondary information

### Rules

- Do not give every element equal visual weight.
- Use whitespace as structure, not unused space to fill.
- Use scale, alignment, contrast, spacing, and grouping intentionally.
- A section should have one dominant visual idea.
- Avoid overly symmetrical card grids when content importance is not equal.
- Asymmetry is allowed only if reading order remains obvious.
- Avoid template-like repetition.

---

## 4. Design system and element consistency

The interface must feel like one product, not a collection of independently styled sections.

### 4.1 Single source of truth

Define design tokens centrally for:

- colors,
- typography,
- spacing,
- radii,
- borders,
- shadows,
- container widths,
- breakpoints,
- motion durations/easing,
- z-index layers.

Do not scatter the same values as repeated magic numbers throughout the codebase.

### 4.2 Component consistency

If the same UI pattern appears more than once, it should normally share the same component/pattern and tokens.

Examples:

- buttons,
- chips,
- cards,
- section headers,
- navigation items,
- badges,
- icon containers,
- CTA blocks,
- form controls.

Do not duplicate the same component markup and styling with small arbitrary differences.

### 4.3 Reuse without over-abstraction

Avoid both extremes:

- copy/pasting the same implementation repeatedly,
- creating complex abstractions for one-off elements.

Extract reusable components when they represent a repeated concept, repeated behavior, or repeated visual contract.

---

## 5. Typography

Typography is a usability system.

### Requirements

- Use screen-readable typefaces.
- Keep font families and weights limited.
- Maintain a clear heading/body/label hierarchy.
- Use comfortable line-height.
- Avoid overly long lines.
- Do not shrink text to force it into a component.
- Keep Arabic/Latin combinations visually balanced when both are used.
- Use real text instead of text embedded in images whenever possible.

### Semantic headings

Use headings according to document structure, not visual size:

- a meaningful page `h1`,
- `h2` for major sections,
- `h3` for real subsections.

---

## 6. Color, contrast, and visual restraint

### Color roles

Create explicit roles rather than choosing colors ad hoc:

- primary,
- secondary,
- accent,
- background/surface,
- text,
- muted text,
- borders/dividers,
- semantic success/warning/error.

### Accessibility

- Do not communicate meaning by color alone.
- Target at least **4.5:1** contrast for normal text.
- Target at least **3:1** for large text.
- Ensure interactive boundaries and focus states remain perceivable.

### Visual restraint

Avoid by default unless there is a clear purpose:

- excessive neon/glow,
- decorative glassmorphism everywhere,
- random 3D objects,
- excessive gradients,
- too many shadows,
- uncontrolled decorative particles,
- fake dashboards/UI,
- visual clutter,
- generic AI-looking technology scenes.

---

## 7. Accessibility baseline

Target **WCAG 2.2 AA** as the minimum production baseline.

### Required practices

- Semantic HTML.
- Keyboard-accessible controls.
- Visible focus states.
- Logical DOM/source order.
- Useful `alt` text for meaningful images.
- Empty `alt=""` for decorative images when appropriate.
- Labels for form fields.
- Clear link/button names.
- No essential hover-only interaction.
- No color-only meaning.
- Reflow and readable content when zoomed.
- Do not hide focused elements behind sticky/fixed UI.
- Respect reduced-motion preferences.

### Touch targets

WCAG 2.2 AA includes a minimum target-size requirement of **24×24 CSS px** with exceptions/spacing rules. For important touch controls, prefer approximately **44×44 CSS px or larger** whenever practical for comfort.

---

## 8. Mobile-first and responsive design

Design from the smallest realistic viewport upward.

### Mobile-first rules

- Put the most important content/actions early.
- Avoid dense multi-column layouts.
- Do not require precision tapping.
- Avoid tiny cards with long text.
- Make sticky UI non-obstructive.
- Account for safe-area insets when needed.

### Responsive rules

Responsive design is continuous, not just three screenshots.

Test across narrow phones, large phones, tablets, laptops, and wide desktops.

Requirements:

- no horizontal overflow,
- no clipped text,
- no fixed-height containers that break with real content,
- no unreadably wide paragraphs,
- no oversized empty areas on large displays,
- components adapt to content,
- images remain responsive,
- spacing/type may scale fluidly where appropriate.

---

## 9. Clean code and frontend engineering standard

### 9.1 Separation of concerns

Keep content/data, structure, styling, and behavior separated enough that each can be understood and changed safely.

### 9.2 Single responsibility

Functions, modules, and components should have a clear responsibility.

Avoid giant components/files that contain unrelated concerns.

### 9.3 DRY, but not at any cost

Do not repeat:

- the same data in multiple places,
- the same HTML structure repeatedly,
- the same CSS declarations as scattered magic values,
- the same JavaScript behavior in several handlers.

Prefer shared data models, utility functions, reusable components, and design tokens.

Do **not** create abstractions that make simple code harder to read.

### 9.4 Naming

Use consistent, descriptive names.

Avoid meaningless names such as `box1`, `box2`, `newStyle`, `testFinal`, `x2` in production code.

### 9.5 Dependency discipline

For lightweight/static sites:

- prefer native HTML/CSS/JS when sufficient,
- avoid large frameworks/libraries for trivial behavior,
- avoid loading a whole icon library for a few icons,
- avoid duplicate libraries that solve the same problem,
- remove unused dependencies.

Every dependency has download, parsing, execution, maintenance, and security cost.

### 9.6 CSS discipline

- Centralize tokens/custom properties.
- Avoid uncontrolled specificity wars.
- Avoid repeated one-off overrides.
- Avoid excessive `!important`.
- Prefer predictable component styles.
- Remove unused CSS.

### 9.7 JavaScript discipline

- Keep initial JavaScript minimal.
- Defer non-critical behavior.
- Do not use JavaScript for behavior CSS/HTML can handle cleanly.
- Avoid heavy scroll listeners; use platform APIs such as `IntersectionObserver` where appropriate.
- Remove debug logs and dead code before release.
- Do not expose private secrets/API keys in client-side code.

### 9.8 Content/data reuse

Repeated lists such as services, projects, features, social links, testimonials, or navigation items should be driven from one source of truth when the stack supports it rather than duplicated manually across several templates.

---

## 10. Performance standard

Performance is part of UX, accessibility, conversion, and engineering quality.

### 10.1 Core Web Vitals targets

At the **75th percentile** of real-user visits, target:

- **LCP ≤ 2.5 s**
- **INP ≤ 200 ms**
- **CLS ≤ 0.1**

For lightweight static/profile/landing websites, aim to perform comfortably better than the minimum when practical.

### 10.2 Critical rendering path

- Keep render-blocking CSS small.
- Inline only genuinely critical CSS when justified.
- Defer non-critical scripts.
- Avoid heavy third-party scripts.
- Preload only critical resources; excessive preloading can hurt performance.
- Use `preconnect` only for necessary external origins.
- Avoid loading assets that are not used on the current page.

### 10.3 JavaScript performance

- Ship as little JavaScript as the experience needs.
- Split or defer non-critical code when useful.
- Avoid long tasks on the main thread.
- Avoid hydration/framework overhead when a static page does not need it.
- Do not use heavy animation frameworks for simple transitions.

### 10.4 CSS performance

- Remove unused CSS.
- Avoid expensive visual effects over large areas when unnecessary.
- Avoid continuous animations that keep the browser/GPU busy.
- Prefer simple composited animation properties.

### 10.5 Fonts

- Use the fewest font families/weights required.
- Prefer WOFF2.
- Subset fonts where licensing/tooling allows.
- Use sensible `font-display` behavior.
- Preload only fonts required for above-the-fold text.
- Avoid downloading unused weights/styles.

### 10.6 Caching and compression

Production hosting should enable where supported:

- Brotli and/or gzip for text assets,
- long-lived caching for fingerprinted static assets,
- sensible cache invalidation/versioning,
- HTTPS.

### 10.7 Third-party code budget

Analytics, chat widgets, trackers, embeds, maps, social widgets, and external fonts must be justified.

Do not load a third-party script merely because it is common.

---

## 11. Image and media standard

Images are often the heaviest assets on marketing/profile websites. They must be treated as a performance budget, not decoration with unlimited cost.

### 11.1 Choose the right format

Preferred guidance:

- **SVG:** logos, icons, simple vector illustrations.
- **AVIF:** preferred for many photographic/raster assets when supported by the delivery pipeline.
- **WebP:** excellent modern raster format and practical fallback/primary option.
- **JPEG:** fallback for photographic content when necessary.
- **PNG:** use when true lossless quality/transparency is required and SVG/WebP/AVIF is not appropriate.
- **GIF:** avoid for large animations; prefer CSS animation or suitable video formats when animation is actually necessary.

Do not convert every asset to one format blindly; choose based on content and browser/delivery needs.

### 11.2 Compression

- Compress every raster image before release.
- Remove unnecessary metadata.
- Do not ship source-resolution images when they render much smaller.
- Do not upscale small images and then serve oversized files.
- Visually inspect compression to preserve acceptable quality.

### 11.3 Responsive images

Use `srcset`/`sizes` and `<picture>` where useful so small screens do not download desktop-sized images.

### 11.4 Dimensions and CLS

Set intrinsic `width` and `height` (or a reliable aspect ratio) for images/media to reserve layout space and reduce layout shifts.

### 11.5 Loading strategy

- Above-the-fold/LCP image: load eagerly when it is the LCP candidate; do **not** lazily load it if that delays LCP.
- Below-the-fold images: use native `loading="lazy"` when appropriate.
- Consider `decoding="async"` for non-critical images.
- Use `fetchpriority="high"` sparingly for a known critical image when justified.

### 11.6 Alt text

- Meaningful image → concise useful `alt` text.
- Decorative image → empty `alt=""` when appropriate.
- Do not stuff SEO keywords into alt text.

### 11.7 Internal media budgets for lightweight sites

These are engineering targets, not universal web standards:

- Prefer hero/LCP raster assets around **150–250 KB or less** when acceptable quality allows.
- Prefer ordinary card/section images around **40–120 KB or less** when practical.
- Avoid multi-megabyte images in normal page delivery.
- Keep the first viewport especially lean.

When quality or content requires larger files, measure the real performance impact rather than following a number blindly.

---

## 12. Animation and motion standard

Animation must communicate state, hierarchy, continuity, or feedback. It must not exist merely to prove that the website is animated.

### 12.1 Preferred motion

Use subtle motion for:

- hover/press feedback,
- menu/dialog transitions,
- state changes,
- small section reveals when they do not delay content,
- orientation/continuity cues.

### 12.2 Avoid

- heavy parallax,
- scroll hijacking,
- continuous decorative motion,
- delayed content entrances,
- auto-moving carousels without strong reason/control,
- large-scale zoom/panning effects,
- animations that block user input,
- many elements animating simultaneously.

### 12.3 Performance

Prefer animating properties that avoid layout work—commonly `transform` and `opacity`—rather than repeatedly animating layout-affecting properties such as `width`, `height`, `top`, `left`, and margins.

Avoid applying `will-change` everywhere; use it only when measured and justified.

### 12.4 Timing

As a design default, micro-interactions should feel immediate. Typical short UI transitions are often in the **120–250 ms** range, while larger transitions may take longer if needed. These are design defaults, not accessibility standards.

No animation should make the user wait before reading or interacting.

### 12.5 Reduced motion

Respect `prefers-reduced-motion` and provide a reduced/non-motion experience for non-essential animation.

---

## 13. SEO / Search visibility standard

SEO is not a trick for ranking first. The goal is to help search engines crawl, understand, index, and present useful pages while keeping the site excellent for humans.

### 13.1 Crawlable content

- Important content must exist as real HTML/DOM text.
- Use semantic HTML.
- Do not put essential content only inside canvas, images, CSS generated content, or inaccessible script-only UI.
- Important pages should be reachable through normal links.

### 13.2 Page titles and descriptions

Every indexable page should have:

- a unique, descriptive `<title>`,
- a concise, accurate meta description,
- content that matches the promise of the title/description.

Do not stuff keywords or repeat the same title across all pages.

### 13.3 Heading structure

Use meaningful headings that describe page content. Do not create headings only for visual styling.

### 13.4 URLs

Use stable, readable, descriptive URLs where multiple pages exist.

Avoid unnecessary query-string duplicates and multiple URLs for the same content.

### 13.5 Canonical URLs

Use a correct self-referential canonical on indexable canonical pages where appropriate, and use canonicalization/redirects consistently when duplicate URL variants exist.

### 13.6 Sitemap

Provide `sitemap.xml` when useful, especially for discoverability and multi-page sites. A sitemap helps discovery; it does not guarantee indexing or ranking.

### 13.7 robots.txt and noindex

Use `robots.txt` to manage crawler access—not as a secure way to hide pages from search results. Use the correct indexing controls (`noindex`, authentication, or removal) when a page should not appear in search.

### 13.8 Structured data

Add only structured data that truthfully matches visible page content and is relevant to the website/entity.

- Prefer JSON-LD when suitable.
- Do not invent reviews, ratings, prices, locations, or business claims solely for rich results.
- Validate supported structured data before release.

### 13.9 Images and SEO

- Use descriptive filenames when reasonable.
- Provide useful alt text.
- Serve crawlable image URLs.
- Do not embed important searchable text inside images.

### 13.10 Social/search presentation

Provide where appropriate:

- favicon,
- Open Graph metadata,
- social preview image,
- correct site name/brand metadata.

### 13.11 Language and internationalization

- Set correct `lang`.
- Set correct text direction (`dir`) where needed.
- Use `hreflang` only when true alternate-language/regional versions exist.

### 13.12 Search Console and monitoring

After deployment:

- verify the property in Google Search Console when available,
- submit/verify sitemap if used,
- inspect important URLs,
- monitor indexing and Core Web Vitals,
- fix crawl/indexing errors rather than guessing.

---

## 14. Content quality for profile/marketing websites

### 14.1 Above the fold

The first viewport should usually make the site's identity, purpose/value, and primary next step clear without requiring excessive scrolling.

### 14.2 Section purpose

Every section must answer a user question.

Before adding one, define:

- What question does it answer?
- Why is it here?
- Why is it in this position?
- What becomes easier after reading it?

If two sections answer the same question, combine or remove one.

### 14.3 Writing

- Use direct human language.
- Avoid corporate filler.
- Avoid repeated promises.
- Avoid fake urgency.
- Avoid unsupported claims such as “best”, “fastest”, “100% guaranteed” unless genuinely substantiated and appropriate.
- Supporting copy should add information, not repeat the heading.

### 14.4 Trust

Prefer real trust signals:

- real identity/contact information,
- accurate service/content descriptions,
- real portfolio/work/examples where relevant,
- clear policies/notes when needed,
- consistent branding,
- professional writing,
- secure HTTPS delivery.

Never fabricate metrics, testimonials, reviews, partners, client logos, or guarantees.

---

## 15. Navigation and interaction usability

- Keep navigation short and understandable.
- Prioritize what users need most.
- Provide clear active/focus/hover/pressed states.
- Avoid mystery icons without labels when meaning is not universal.
- Do not open unexpected interactions.
- Avoid nested navigation complexity on simple sites.
- Use real links for navigation and real buttons for actions.
- Keep primary actions consistent across the experience.

---

## 16. Semantic HTML baseline

Prefer native semantic elements:

- `header`
- `nav`
- `main`
- `section`
- `article` when semantically appropriate
- `footer`
- `button` for actions
- `a` for navigation/links
- real headings
- real lists

Avoid “div soup”.

Native semantics improve accessibility, maintainability, and search understanding.

---

## 17. Security and privacy basics for static/profile sites

Even a simple site must follow basic hygiene.

- Use HTTPS only.
- Avoid mixed content.
- Never expose private secrets in client code.
- Keep dependencies current and minimal.
- Sanitize/validate any externally supplied content if forms or dynamic content are added later.
- Limit third-party trackers/widgets.
- Use appropriate privacy disclosure when analytics/tracking or data collection requires it.
- Configure security headers where hosting supports them (for example CSP as appropriate).
- Keep external links and embeds intentional.

---

## 18. Performance and SEO do not justify bad UX

Do not:

- keyword-stuff headings,
- create duplicate pages only for keywords,
- hide text,
- add unnecessary content blocks only for search engines,
- remove important imagery solely to chase a score,
- use tiny fonts or awkward layouts to fit more keywords,
- replace readable content with markup tricks.

Human usability remains the primary quality bar.

---

## 19. QA and verification workflow

Mandatory workflow:

**UNDERSTAND → IA → USER FLOW → WIREFRAME → VISUAL DIRECTION → IMPLEMENT → RUN → VISUALLY INSPECT → USABILITY CRITIQUE → ACCESSIBILITY → PERFORMANCE → SEO/TECHNICAL QA → FIX → VERIFY**

### Visual QA

Inspect real implementation at representative sizes such as:

- 320 px
- 360/375 px
- 390/430 px
- 768 px
- 1024 px
- 1280/1440 px
- wider desktop when relevant

These are inspection points, not the only supported widths.

### Browser/device QA

Test current major engines where practical:

- Chromium-based browsers,
- Safari/WebKit,
- Firefox.

### Usability QA

Check:

- Can a new user understand the page quickly?
- Is the primary action obvious?
- Are labels understandable?
- Can content be scanned?
- Is anything duplicated or unnecessary?
- Are tap targets comfortable?

### Accessibility QA

Check at minimum:

- keyboard navigation,
- focus visibility,
- heading hierarchy,
- landmarks,
- image alternatives,
- color contrast,
- zoom/reflow,
- reduced motion,
- sticky overlays not hiding focused content.

### Performance QA

Measure with tools such as browser performance tooling, Lighthouse/PageSpeed Insights, and real-user monitoring when traffic exists.

Do not accept a page because a single synthetic score is high; inspect actual bottlenecks and Core Web Vitals.

### SEO QA

Check:

- title,
- meta description,
- canonical,
- indexability,
- robots rules,
- sitemap if used,
- structured data if used,
- correct language/direction,
- crawlable links/content,
- no broken internal links.

---

## 20. Definition of done

A website/page is not approved because a screenshot looks attractive.

It is ready only when:

- purpose is clear,
- content hierarchy is clear,
- mobile use is comfortable,
- desktop layout is balanced,
- primary actions are obvious,
- typography is readable,
- repeated elements are unified,
- duplicated code/data is minimized,
- semantic HTML is used,
- keyboard and focus behavior work,
- contrast is acceptable,
- animations are restrained and reduced-motion is respected,
- there is no horizontal overflow,
- images are compressed and responsive,
- LCP media is loaded correctly,
- layout shifts are controlled,
- JavaScript/dependencies are justified,
- SEO metadata/indexing basics are correct,
- the implementation has been visually inspected on real breakpoints,
- performance/accessibility issues have been fixed at the root cause,
- final verification has been repeated after fixes.

---

## 21. Permanent decision filter

Evaluate future decisions in this order:

1. **Comprehension** — Can the user understand it quickly?
2. **Findability** — Can the user find what matters?
3. **Actionability** — Is the next step obvious?
4. **Comfort** — Is reading, tapping, and navigation comfortable?
5. **Consistency** — Does it follow the shared design/component system?
6. **Accessibility** — Can more users operate it successfully?
7. **Performance** — Is it lightweight and responsive?
8. **Maintainability** — Is the code clean, reusable, and understandable?
9. **Searchability** — Can search engines correctly crawl and understand it?
10. **Aesthetics** — Only after the previous requirements are satisfied.

A visually impressive proposal that weakens the earlier criteria should be rejected or revised.

---

## 22. Primary references

This standard is informed by current official/primary guidance including:

- W3C Web Content Accessibility Guidelines (WCAG) 2.2 and WAI guidance: https://www.w3.org/TR/WCAG22/
- W3C WAI accessibility principles: https://www.w3.org/WAI/fundamentals/accessibility-principles/
- Google/web.dev Core Web Vitals guidance: https://web.dev/articles/defining-core-web-vitals-thresholds
- web.dev image format guidance: https://web.dev/articles/choose-the-right-image-format
- MDN web performance guidance: https://developer.mozilla.org/en-US/docs/Web/Performance
- MDN animation/CSS performance guidance: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS
- MDN responsive images and `<img>` guidance: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img
- Google Search Central SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central SEO guide for developers: https://developers.google.com/search/docs/fundamentals/get-started-developers
- Google Search Central canonicalization guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google Search Central sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google Search Central robots.txt guidance: https://developers.google.com/search/docs/crawling-indexing/robots/intro

---

**Standard version:** 1.1  
**Rule:** These are baseline quality rules. Product-specific decisions must be documented separately rather than mixed into this standard.
