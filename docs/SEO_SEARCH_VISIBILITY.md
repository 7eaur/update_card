# UPDATE CARD — Search Visibility & SEO Program

**Status:** ACTIVE  
**Started:** 2026-10-08  
**Production:** https://updatecard.net  
**Scope:** Google/Bing discoverability, local relevance, social sharing, AI/search understanding, technical performance, and measurement.

## 1. Baseline

The site is technically crawlable:
- HTTPS production domain is live.
- `www` redirects permanently to the apex domain.
- Canonicals use `https://updatecard.net`.
- `robots.txt` allows crawling.
- `sitemap.xml` exposes all public pages.
- Pages are static HTML and readable without client-side rendering.
- Arabic `lang` and RTL are present.
- One H1 per page is enforced by CI.

External search checks on 2026-10-08 did not surface the new domain prominently for brand/site queries, so discovery should be treated as early-stage until Search Console confirms indexing and impressions.

## 2. Technical foundation

Required on every public page:
- Distinct title and meta description.
- Canonical URL on the apex domain.
- Open Graph title, description, URL, image and image alt.
- Twitter/X card metadata.
- Organization + WebSite + WebPage structured data.
- Service/breadcrumb structured data on service-family pages.
- FAQ structured data on the FAQ page.
- `max-image-preview:large` and full snippet controls.
- Sitemap and robots on the canonical domain.

Social preview asset:
`https://updatecard.net/assets/social/update-card-share.png`

The social preview image is copied from the approved brand package and is not part of normal page rendering, so it does not add page-load weight for ordinary visitors.

## 3. Search intent strategy

Priority clusters:
- أبديت كارد / UPDATE CARD / updatecard.net
- خدمات رقمية في اليمن
- شحن ألعاب في اليمن
- بطاقات رقمية في اليمن
- اشتراكات رقمية في اليمن
- تراخيص برامج في اليمن
- شراء من المواقع العالمية إلى اليمن
- خدمة رقمية حسب الطلب
- خدمات رقمية صنعاء

Rules:
- No keyword stuffing.
- No doorway pages.
- No duplicated city/service pages without genuinely different content.
- No unsupported “best / cheapest / guaranteed” claims.
- No search campaign or landing-page optimization for age-restricted or gambling-related services.

## 4. Content program

Phase A:
- Give each service-family page unique explanatory copy.
- Explain what information the customer should provide.
- Explain what changes by region, account, plan or availability.
- Add natural internal links to related service families.

Phase B:
- كيف تختار منطقة البطاقة الرقمية المناسبة لحسابك؟
- ما المعلومات المطلوبة قبل طلب شحن لعبة أو خدمة رقمية؟
- خطوات الشراء من موقع عالمي والتوصيل إلى اليمن.
- الفرق بين شراء بطاقة رقمية وطلب تفعيل مباشر.
- كيف تتأكد من توافق الترخيص مع إصدار البرنامج؟

Each guide must answer a real user question and avoid unsupported guarantees.

## 5. Indexing and measurement

After Search Console is connected:
1. Verify the domain property.
2. Submit `https://updatecard.net/sitemap.xml`.
3. Inspect the home page and main service-family URLs.
4. Request indexing only for final pages.
5. Monitor indexing, impressions, clicks, CTR, query position and Core Web Vitals.

Search Console is the authority for indexing and query data.

## 6. Local/entity visibility

- Keep brand name, phone, domain, email and location consistent across the website and official public profiles.
- Use the same Arabic/English spelling everywhere.
- Use a Google Business Profile only if the business is eligible and the represented real-world/service-area information is accurate.
- Earn legitimate mentions and links from relevant local/business sources rather than buying spam backlinks.

## 7. Social sharing

Every public page must expose:
- `og:title`
- `og:description`
- `og:url`
- `og:image`
- `og:image:alt`
- Twitter/X equivalents

Goal: sharing `updatecard.net` should show a clear brand image, title and concise description instead of a bare URL.

## 8. Performance watchlist

Current strengths:
- Static HTML.
- Very small JavaScript payload.
- CSS budget enforced by CI.
- AVIF content imagery.
- Lazy loading below the fold.
- High-priority loading for hero/service-hero imagery.

Watchlist:
- Google Fonts remains the main external render dependency.
- Sticky-header `backdrop-filter` has a small GPU cost on weaker phones.
- Duplicate source-format media can grow deployment size even when not downloaded by visitors.
- Third-party analytics/chat widgets can become the biggest regression if added without budgets.
- Social preview images must stay outside normal page rendering.
- New imagery must remain within the existing per-image and per-family budgets.

## 9. KPIs

Weekly:
- Indexed pages.
- Search impressions.
- Organic clicks.
- CTR.
- Average position by query cluster.
- Branded vs non-branded traffic.
- Organic landing pages.
- Contact/WhatsApp conversions where measurable.

Monthly:
- New ranking queries.
- Pages gaining or losing visibility.
- Core Web Vitals.
- Referring domains and legitimate mentions.
- Search referrals by device/country.
- AI/search referrals if analytics supports them.

## 10. 30/60/90-day program

### Days 0–30
- Connect Search Console.
- Submit sitemap.
- Inspect/index core pages.
- Confirm social previews.
- Establish search baseline.
- Finish missing international-shopping imagery without compromising performance.
- Improve thin service-family copy where needed.

### Days 31–60
- Publish 2–4 useful guides based on real query demand.
- Strengthen internal linking.
- Build consistent official business citations/profiles.
- Rewrite titles/descriptions where impressions are high but CTR is weak.

### Days 61–90
- Expand only query clusters showing real demand.
- Merge or improve pages that compete for the same intent.
- Earn relevant mentions/backlinks.
- Compare search visibility and Core Web Vitals with month-1 baseline.

## 11. Definition of success

- intended public pages are indexed,
- branded searches find the official domain,
- non-branded service queries begin generating impressions and clicks,
- social shares render consistently,
- technical SEO regressions are blocked by CI,
- performance remains within budget,
- search traffic produces legitimate service inquiries.
