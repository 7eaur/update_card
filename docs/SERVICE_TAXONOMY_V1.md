# UPDATE CARD — Service Taxonomy v1.0

**Status:** DRAFT / STRUCTURE BASELINE  
**Purpose:** Define the service families for the informational multi-page website. This is not a store catalog and does not imply that every possible service is offered.

---

## 1. Recommended top-level service families

The website should organize services by the customer's intent, not by internal operational details.

### 1) Games & game top-ups

Examples currently supplied:
- PUBG Mobile
- PUBG: New State / current official equivalent (verify name)
- Free Fire
- FIFA Mobile / current official equivalent (verify name)
- eFootball / PES Mobile (verify display name)
- Call of Duty
- Clash of Clans
- Clash Royale
- Brawl Stars
- Clash of Kings / تحدي الملوك
- Zynga Poker
- Jawaker

### 2) Social & entertainment apps

Examples currently supplied:
- TikTok
- TopTop
- BIGO LIVE
- Ludo Star
- Party Star
- WePlay
- Kafu / كفو (verify official identity)
- Ya Ahlan / يا أهلاً (verify official identity)

Note: some services such as Ludo Star may be placed under Games if that better matches the customer's mental model.

### 3) Gift cards & prepaid digital cards

Examples currently supplied:
- Amazon (US / Saudi / UAE)
- Walmart (market to verify)
- Google Play US
- Apple / iTunes US (verify current card naming)
- PlayStation (US / Saudi / UAE)
- Xbox (regions to verify)
- Razer Gold (US / Global)

### 4) Digital subscriptions

Examples currently supplied:
- Netflix
- Shahid VIP
- YouTube Premium
- YouTube Music
- Amazon Prime
- Anghami
- PlayStation Plus
- ExpressVPN
- NordVPN
- Surfshark

### 5) Software, security & licenses

Examples currently supplied:
- Kaspersky and supported security products
- Windows 10 / Windows 11 activation products
- Microsoft Office
- Adobe products/services
- Game activation codes
- Other supported software licenses

### 6) Electronic payments, digital assets & wallets

Current supplied scope includes:
- USDT
- Supported digital currencies/assets
- PayPal-related services
- Binance
- MEXC
- Supported wallets/platforms
- Online card payments using VISA / Mastercard
- Payment on supported third-party websites

Important: final copy must avoid absolute claims such as “all currencies”, “all wallets”, or “all websites” unless operationally verified.

### 7) International purchasing & delivery to Yemen

Current supplied scope includes purchasing from supported stores/markets such as:
- Amazon (US / UAE / Saudi)
- eBay
- Best Buy
- Walmart
- Samsung (US / UAE / Saudi)
- Apple US
- Razer US
- Dell / HP / ASUS / Acer
- SHEIN
- Noon
- Jarir
- Samma3a
- Supported perfume/accessory stores in UAE and Saudi Arabia

The final page should explain the process, supported markets, expected information required from the customer, and any delivery/availability limitations once operational details are confirmed.

### 8) Custom request / Service on demand

This is an approved service family and an important part of the information architecture.

Suggested public label:
- **خدمة حسب الطلب**

Alternative CTA wording:
- **لم تجد خدمتك؟ اطلبها منا**
- **عندك طلب غير موجود؟ تواصل معنا**

Purpose:
- cover legitimate digital services that are not yet listed,
- allow the catalog to stay curated instead of trying to list every possible request,
- give visitors a clear path when their need falls outside the main categories.

This must not be presented as “we can do anything”. The page/copy should make clear that requests are reviewed for availability, feasibility, and applicable restrictions.

Recommended path:
`/services/custom-request`

Recommended page content:
1. Short explanation of the service.
2. Examples of the kinds of requests that may be considered (only once verified).
3. What the customer should send: service/site/product name, link if applicable, country/region, and what they need.
4. A note that availability and pricing are confirmed after reviewing the request.
5. Primary contact CTA.

---

## 2. Navigation / service architecture recommendation

Top-level public services navigation should expose the eight families above without turning the website into a store.

Recommended `/services` structure:

```text
/services
/services/games
/services/social-entertainment
/services/gift-cards
/services/subscriptions
/services/software-licenses
/services/payments-digital-assets
/services/international-shopping
/services/custom-request
```

Individual brand/product pages should only be created when there is enough useful content, SEO value, or customer need to justify them. Do not generate thin pages just to increase page count.

---

## 3. Potential gaps to verify before finalizing the catalog

The following are not approved services yet; they are questions to confirm with the business because they are common adjacent needs and may materially affect the site architecture:

- Mobile balance / telecom recharge.
- Mobile data or internet packages.
- Local payment or wallet services in Yemen.
- Dedicated shipping-only service where the customer has already purchased the item.
- Dedicated purchase-only service without delivery, if offered.
- Additional cloud/productivity/software subscriptions beyond those already listed.

If not offered, they should simply be omitted.

---

## 4. Classification rules

- Classify by customer intent first.
- Do not duplicate the same service across several categories unless there is a strong discoverability reason.
- Use cross-links when a service reasonably belongs to more than one family.
- Use clear Arabic labels; avoid internal/vendor jargon.
- Separate subscriptions from software licenses.
- Separate international shopping from electronic payments.
- Keep “Custom request” as the escape hatch for unlisted needs rather than bloating the catalog.
- Do not expose unverified prices, regions, turnaround times, or availability.

---

## 5. Current structural decision

The recommended service architecture currently contains **8 top-level families**:

1. Games & game top-ups
2. Social & entertainment apps
3. Gift cards & prepaid digital cards
4. Digital subscriptions
5. Software, security & licenses
6. Electronic payments, digital assets & wallets
7. International purchasing & delivery to Yemen
8. Custom request / Service on demand

This structure is suitable for a multi-page informational profile website and can expand later without changing the site's core information architecture.
