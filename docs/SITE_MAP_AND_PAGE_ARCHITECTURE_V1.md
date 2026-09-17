# UPDATE CARD — Site Map & Page Architecture v1.0

**Status:** DRAFT / INFORMATION ARCHITECTURE BASELINE  
**Scope:** Multi-page informational website structure only.  
**Important:** This website is a company/profile website, not an online store.

---

## 1. Global layout rule

The website uses one unified **Header** and one unified **Footer** across all public pages.

They must be implemented as reusable shared components/partials, not duplicated independently in every page.

### Header

Recommended primary navigation:

- الرئيسية
- من نحن
- خدماتنا
- الأسئلة الشائعة
- تواصل معنا

The Services item may expose the main service families through a dropdown/mega-menu on desktop and a clear accordion/list on mobile.

Primary action in the header:

- WhatsApp contact

Header requirements:

- Same structure and styling on all pages.
- Current page state must be clear.
- Sticky behavior is allowed if lightweight and non-obstructive.
- Mobile navigation must remain simple and keyboard accessible.
- No duplicated or competing CTA buttons.

### Footer

The footer should contain:

- UPDATE CARD logo/identity
- Short company summary
- Quick links
- Main service families
- WhatsApp
- Phone
- Facebook
- Domain/email later when supplied
- Privacy / Terms links when published
- Copyright line

Do not overload the footer with every individual service.

---

## 2. Recommended site map

```text
/
├── about/
├── services/
│   ├── games/
│   ├── social-entertainment/
│   ├── gift-cards/
│   ├── subscriptions/
│   ├── software-licenses/
│   ├── digital-payments/
│   ├── international-shopping/
│   └── custom-request/
├── faq/
├── contact/
├── privacy/          [when ready]
├── terms/            [when ready]
└── 404/
```

Individual service-detail pages may be added later only when there is enough useful content and/or clear SEO value.

Examples:

```text
/services/games/pubg-mobile/
/services/gift-cards/playstation/
/services/subscriptions/netflix/
```

Do not create thin pages that contain only a name, logo and WhatsApp button.

---

# 3. Page responsibilities

## 3.1 Home `/`

### Purpose

Give the visitor a fast, confident understanding of UPDATE CARD, the breadth of services, and where to continue exploring.

### Recommended content order

1. **Opening / Hero**
   - Brand identity
   - Clear concise positioning statement
   - Short supporting text
   - Primary CTA to explore services
   - Secondary contact CTA where appropriate

2. **Short About introduction**
   - Brief company introduction only
   - Experience since 2018
   - Link to the full About page

3. **Main service families**
   - Show the 8 top-level service families
   - Short explanation for each
   - No pricing/cart UI
   - Link to each service-family page

4. **Representative platforms / service examples**
   - A restrained selection of recognizable examples from the real catalog
   - Used to communicate breadth, not as a product grid

5. **Why / working values**
   - Speed
   - Reliability
   - Clear execution
   - Retail and wholesale support
   - Use only supported, realistic statements

6. **How dealing with UPDATE CARD works**
   - Very short process overview
   - Discover / Ask / Confirm / Complete or equivalent wording after content refinement

7. **Custom request teaser**
   - "لم تجد الخدمة التي تبحث عنها؟"
   - Link to the custom-request page

8. **FAQ preview**
   - 3–5 important questions only
   - Link to the full FAQ page

9. **Final contact CTA**
   - WhatsApp
   - Phone

### Home-page rule

The homepage summarizes. It must not attempt to fully explain every service.

---

## 3.2 About `/about/`

### Purpose

Explain who UPDATE CARD is, its experience, operating scope and approach without marketing filler.

### Recommended sections

1. Page introduction
2. Company story / since 2018
3. What UPDATE CARD specializes in
4. Retail and wholesale customers
5. Operating values
   - Speed
   - Reliability
   - Clarity
   - Responsiveness to customer needs
6. Breadth of supported digital services
7. CTA to Services
8. CTA to Contact

### Avoid

- Invented mission/vision language
- Unsupported "leading / best / number one" claims
- Repeating the full services page

---

## 3.3 Services index `/services/`

### Purpose

Act as the main directory for the service portfolio.

### Recommended sections

1. Intro explaining the breadth of service categories
2. The 8 service families
3. A short explanation of each family
4. Representative examples under each family
5. Availability note where relevant
6. Custom-request block
7. Contact CTA

### Important

This page is an **informational service directory**, not a shop catalog.

No cart, checkout, quantity controls or product-price UI.

---

# 4. Service-family pages

Every service-family page should follow a shared structural system, while allowing content differences.

Shared framework:

1. Breadcrumb
2. Page title and clear family description
3. What this category covers
4. Supported examples / platforms
5. What UPDATE CARD can help with in this category
6. Important requirements / region or availability notes where relevant
7. Common questions for this category
8. Related service families
9. Custom-request fallback
10. Contact CTA

Do not repeat identical prose across every page.

---

## 4.1 Games `/services/games/`

Current examples include:

- PUBG Mobile
- PUBG: New State / current equivalent (verify name)
- Free Fire
- FIFA Mobile / current equivalent (verify name)
- eFootball / PES Mobile
- Call of Duty
- Clash of Clans
- Clash Royale
- Brawl Stars
- Clash of Kings
- Zynga Poker
- Jawaker

The page should explain the type of game-related recharge/service only after the exact offerings are verified.

---

## 4.2 Social & entertainment `/services/social-entertainment/`

Current examples include:

- TikTok
- TopTop
- BIGO LIVE
- Ludo Star
- Party Star
- WePlay
- Kafu
- Ya Ahlan

The exact provided service for each platform must be confirmed before final copy.

---

## 4.3 Gift cards `/services/gift-cards/`

Current examples include:

- Amazon: US / Saudi / UAE
- Walmart
- Google Play US
- Apple / iTunes US
- PlayStation: US / Saudi / UAE
- Xbox
- Razer Gold: US / Global

This page should explain region compatibility and supported card types/denominations once verified.

---

## 4.4 Subscriptions `/services/subscriptions/`

Current examples include:

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

The page must distinguish subscription/renewal/gift-code mechanisms only after operational confirmation.

---

## 4.5 Software & licenses `/services/software-licenses/`

Current examples include:

- Windows 10 / 11
- Microsoft Office
- Adobe products/services
- Kaspersky
- Other security software
- Game/software activation codes

This category remains separate from entertainment subscriptions.

---

## 4.6 Digital payments `/services/digital-payments/`

Current service areas include:

- USDT
- Other supported digital assets
- PayPal-related services
- Binance
- MEXC
- Supported electronic wallets/platforms
- VISA / Mastercard online payments
- Payment on supported third-party websites

### Publishing rule

Because these are financial/payment-related claims, final copy must be precise, operationally supportable and compliant with applicable requirements.

Avoid absolute wording such as "all currencies", "all wallets" or "all websites" unless verified.

---

## 4.7 International shopping `/services/international-shopping/`

### Purpose

Explain international purchasing from supported stores/markets and delivery to Yemen.

Current examples include:

- Amazon US / UAE / Saudi
- eBay
- Best Buy
- Walmart
- Samsung US / UAE / Saudi
- Apple US
- Razer US
- Dell / HP / ASUS / Acer
- SHEIN
- Noon
- Jarir
- Samma3a
- Supported perfume/accessory stores in UAE and Saudi Arabia

### Recommended content

- Supported markets
- Supported store examples
- How customer supplies the product link/request
- Purchasing/payment support
- Delivery-to-Yemen explanation once the actual process is confirmed
- Important exclusions/limitations
- Contact CTA

---

## 4.8 Custom request `/services/custom-request/`

### Purpose

Give customers a clear path when their needed service is not listed.

### Recommended content

- Short explanation that unlisted digital/purchase/payment requests may be reviewed individually
- Examples of useful request information:
  - Service/product name
  - Link, if applicable
  - Country/region
  - Quantity/plan where applicable
  - What exactly the customer needs
- Availability and price are confirmed after review
- WhatsApp CTA

### Rule

Do not imply that every request can be fulfilled.

Recommended wording concept:

**لم تجد خدمتك؟ أرسل طلبك وسنتحقق من إمكانية توفيرها.**

---

# 5. FAQ `/faq/`

### Purpose

Reduce repeated questions and remove uncertainty before contact.

Potential topics to confirm later:

- How to request a service
- Whether all services are always available
- Whether prices change
- What information is required
- How custom requests work
- Retail vs wholesale
- International purchasing process
- Service regions / country restrictions
- Contact channels

Only publish real answers after confirmation.

---

# 6. Contact `/contact/`

### Confirmed channels

- WhatsApp: `770498884`
- Phone: `770498884`
- Facebook: `https://www.facebook.com/Update.Cards.770498884/`

### Pending

- Official domain
- Official email
- Working hours
- Physical address, if published

### Recommended page structure

1. Simple contact introduction
2. WhatsApp primary CTA
3. Direct phone call
4. Facebook
5. Working hours later
6. Domain/email later
7. Optional short custom-request prompt

No fake contact forms are required if the business prefers direct WhatsApp contact.

---

# 7. Legal/supporting pages

## Privacy `/privacy/`

Create when the site begins using analytics, forms, cookies, embedded third-party services or other data processing that needs disclosure.

## Terms `/terms/`

Useful for service scope, changing availability/prices, third-party platforms, purchase/payment limitations and other relevant operating conditions once business policies are defined.

Do not publish generic legal copy without review.

---

# 8. 404 page

A lightweight custom 404 should:

- Explain that the page was not found
- Offer Home and Services links
- Offer WhatsApp contact if useful
- Reuse the same Header/Footer

---

# 9. Pages intentionally NOT created now

Do not create these unless the product scope changes:

- Cart
- Checkout
- User account
- Login/Register
- Order tracking dashboard
- Product inventory pages
- Pricing database
- Customer dashboard

UPDATE CARD is currently an informational/profile website.

---

# 10. Shared page system

All content pages should share:

- Header
- Footer
- Container/grid system
- Breadcrumb style
- Page-intro component
- CTA component
- Contact block
- Service-family card/list system
- Typography tokens
- Spacing tokens
- Button/link states

Avoid copying whole components per page with slightly different CSS.

---

# 11. Navigation behavior

## Desktop

Recommended:

`الرئيسية | من نحن | خدماتنا ▼ | الأسئلة الشائعة | تواصل معنا | واتساب`

Services dropdown should list service families, not every individual platform.

## Mobile

Use one clear menu with:

- Home
- About
- Services
  - service families nested or expanded
- FAQ
- Contact
- WhatsApp action

Avoid app-like bottom navigation unless later usability evidence supports it.

---

# 12. SEO architecture

Every indexable page should have:

- Unique URL
- Unique `<title>`
- Useful meta description
- One meaningful H1
- Logical H2/H3 hierarchy
- Crawlable text content
- Canonical URL
- Open Graph metadata
- Appropriate structured data only when valid

Service-family pages should target the actual subject of the page and not be duplicated with near-identical text.

---

# 13. Content-depth rule

A standalone page exists only if it answers a real user question or contains enough useful information to justify its existence.

If a potential page would contain only:

- Logo
- Service name
- One sentence
- WhatsApp button

then keep that item inside its parent service-family page instead.

---

# 14. Current architecture decision

The current recommended primary public pages are:

1. Home
2. About
3. Services
4. Games
5. Social & entertainment
6. Gift cards
7. Subscriptions
8. Software & licenses
9. Digital payments
10. International shopping
11. Custom request
12. FAQ
13. Contact
14. Privacy [when ready]
15. Terms [when ready]
16. 404

The next phase after approving this site map is **page-by-page content architecture / wireframe planning**, beginning with the Home page.