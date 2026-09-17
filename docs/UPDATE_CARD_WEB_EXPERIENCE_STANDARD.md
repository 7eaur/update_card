# UPDATE CARD — Web Experience Standard v1.0

**Status:** APPROVED / PROJECT STANDARD  
**Scope:** UX, UI, information architecture, content hierarchy, responsive behavior, accessibility, frontend implementation, performance, and visual QA.  
**Product type:** Static Arabic profile website that presents services and routes the customer to WhatsApp.  
**Primary language direction:** Arabic RTL.  
**Primary conversion:** WhatsApp contact/request.

---

## 1. Purpose

This document is the design and implementation source of truth for the UPDATE CARD website.

The project must not be judged only by whether a screen "looks modern". Every design decision must be checked against four outcomes:

1. The customer understands what UPDATE CARD offers quickly.
2. The customer can find the needed service without confusion.
3. The interface feels trustworthy, calm, readable, and easy to use.
4. The customer can reach WhatsApp with minimal friction.

The website is intentionally simple at this stage. It is **not** an e-commerce system, dashboard, account system, or checkout flow.

---

## 2. Golden rule

Before adding any element, section, effect, icon, card, label, interaction, or line of copy, ask:

> **Does the user need it?**  
> **Will the user understand it immediately?**  
> **Does it help the user reach the next useful action?**

If an element fails these questions, it should not be added simply because it looks attractive.

---

## 3. Core principles

### 3.1 Task before appearance

The user task comes before visual decoration.

Primary journey:

**Understand the business → Find the needed service → Understand what to do → Contact on WhatsApp**

Every major section must support this journey directly or provide necessary trust/context.

### 3.2 Clarity before impressiveness

The first viewport should make these points obvious:

- Who UPDATE CARD is.
- What type of digital services are available.
- What the user can do next.

Do not rely on vague marketing headlines, decorative gaming scenes, or visual effects to communicate the core offer.

### 3.3 Innovate in composition, not in usability conventions

The website may be visually distinctive, editorial, asymmetrical, or modern, but familiar interaction patterns must remain familiar.

Examples:

- A button must look actionable.
- A service option must look selectable/clickable when it is clickable.
- Navigation should behave predictably.
- WhatsApp actions must be immediately recognizable.

Do not force users to learn a custom interaction model for a simple profile website.

### 3.4 Information architecture before UI

Do not begin by drawing cards.

First define:

- Service groups.
- Naming.
- Priority.
- What is primary vs secondary.
- What belongs on the first screen.
- What belongs deeper in the page.

Service categories should match the customer's mental model, not internal business terminology.

### 3.5 Recognition over recall

The interface should make choices visible and understandable. The user should not need to remember where a service was shown earlier or interpret ambiguous symbols.

Labels should be explicit whenever an icon alone may be unclear.

### 3.6 One clear primary action

The primary conversion is WhatsApp.

Avoid competing primary CTAs such as:

- Start now
- Learn more
- Buy now
- Discover
- Register
- Shop
- Contact us

when all of them ultimately lead to the same action.

Contextual wording may change, but the action hierarchy should remain clear.

---

## 4. Information architecture standard

The final service taxonomy must be validated against the actual services offered by UPDATE CARD.

The current conceptual groups may include:

- Game top-ups
- Digital cards / gift cards
- Digital subscriptions
- USDT-related services
- Other digital services

These are working categories, not permission to invent services that the business does not provide.

### Architecture rules

- Prefer 4–6 top-level groups maximum on the primary surface.
- Show the most useful and frequent choices first.
- Use progressive disclosure for secondary options.
- Avoid repeating the same service in several sections unless there is a strong navigation reason.
- Do not expose the internal business structure if it does not help the customer.

---

## 5. Visual hierarchy

Every viewport should have a dominant reading order.

Recommended priority:

1. Current task/message
2. Main action or service choice
3. Supporting explanation
4. Secondary information

### Rules

- Do not make headline, illustration, badges, decorative shapes, service cards, and CTA compete at equal visual weight.
- Use whitespace as structure, not as empty space to be filled.
- Avoid too many simultaneous accent colors.
- A section must have one main visual idea.
- Decorative elements must never obscure hierarchy.

---

## 6. Layout and composition

The page does **not** have to use the conventional pattern:

`Hero → Services cards → Why us → Steps → CTA`

A more product-like or editorial composition is allowed if it improves comprehension.

Possible patterns include:

- Bento-style service discovery
- Editorial split layouts
- Priority-based service clusters
- Horizontal "most requested" strips
- WhatsApp-oriented request guidance
- Mixed-size service surfaces based on importance

### Constraints

- Asymmetry is allowed only when reading order remains obvious.
- Layout novelty must not reduce discoverability.
- Repetition should create rhythm, not template fatigue.
- Avoid identical cards for every concept when importance differs.

---

## 7. Minimalism and visual restraint

Minimalism means reducing unnecessary cognitive and visual load. It does not mean making the website empty.

### Avoid by default

- Excessive neon
- Heavy glow
- Decorative glassmorphism everywhere
- Random 3D objects
- Fake product UI
- Large gaming scenes that dominate the actual service message
- Unnecessary gradients
- Decorative particles
- Too many floating elements
- Repeated badges
- Excessive shadows
- Generic "AI-generated technology" aesthetics

Effects may be used only when they support hierarchy, identity, interaction, or meaning.

---

## 8. Typography standard

Arabic typography is a primary UX system, not decoration.

### Requirements

- Use a highly readable Arabic typeface suitable for screens.
- Keep the number of font weights limited.
- Maintain clear heading/body/label hierarchy.
- Use comfortable line-height.
- Avoid excessively long text lines.
- Do not shrink text to force it inside a component.
- Do not use all-caps style treatments that harm English readability.
- Arabic and Latin text should visually coexist without awkward weight or baseline mismatch.

### Semantic structure

Use a logical heading hierarchy:

- One meaningful `h1`
- `h2` for main sections
- `h3` only when subsections genuinely require it

Do not choose heading levels based on visual size alone.

---

## 9. Color system

The brand may draw from the existing UPDATE CARD logo, but the interface should not use every logo color at equal intensity.

### Color roles

Define explicit roles such as:

- Primary brand color
- Secondary brand color
- Accent color
- Surface/background neutrals
- Text colors
- Border/divider colors
- Semantic success/warning/error colors

### WhatsApp

WhatsApp green should remain clearly associated with WhatsApp actions, rather than becoming a general brand accent across unrelated UI.

### Accessibility

- Do not communicate meaning by color alone.
- Normal text should target at least **4.5:1** contrast.
- Large text should target at least **3:1** contrast.
- Interactive boundaries and focus indicators must remain perceivable.

---

## 10. Accessibility baseline

Target: **WCAG 2.2 AA**.

Accessibility is part of the design definition of done.

### Required practices

- Keyboard-accessible interactive elements.
- Visible focus states.
- Correct semantic HTML.
- Sufficient contrast.
- Useful image alternative text where applicable.
- Decorative images should not create redundant screen-reader noise.
- Content order must remain logical without CSS.
- Text should remain usable at 200% zoom.
- Avoid interactions that depend only on hover.
- Respect `prefers-reduced-motion`.
- Avoid unexpected movement that may impair readability.

### Touch targets

WCAG 2.2 AA target-size constraints must be respected. For important touch interactions, use approximately **44×44 CSS px or larger** whenever practical for better comfort.

---

## 11. Mobile-first standard

The design process starts with the mobile user journey, not a desktop layout that is later compressed.

### Mobile rules

- Important service choices should appear early.
- Primary WhatsApp action must be easy to reach.
- Tap targets must be comfortable.
- Avoid dense multi-column structures.
- Avoid tiny cards containing several lines of text.
- Do not require precision tapping.
- Sticky WhatsApp UI is allowed only if it does not cover content, browser controls, form elements, or focus targets.
- Account for safe-area insets where needed.

Mobile and desktop may use different composition while preserving the same content model and priority.

---

## 12. Responsive behavior

Responsive design is not limited to three fixed screenshots.

The website must work continuously across narrow phones, large phones, tablets, laptops, and wide desktops.

### Rules

- No horizontal overflow.
- No clipped Arabic text.
- No broken logos.
- No unreadably wide paragraphs.
- No oversized empty regions on large displays.
- Use fluid spacing and sizing where appropriate.
- Components should adapt to content rather than rely on fixed heights.

---

## 13. Cognitive load

The website should minimize unnecessary choices and interpretation.

### Rules

- Do not show all services at equal prominence.
- Group related options.
- Prefer direct labels over clever wording.
- Avoid forcing users to compare many nearly identical cards.
- Use progressive disclosure for secondary items.
- Keep copy concise without becoming vague.
- Remove sections that only repeat earlier information.

---

## 14. Trust design

Trust must be created through clarity, consistency, realistic information, and professional execution.

Do not rely on unsupported claims such as:

- "100% safe"
- "The fastest"
- "Number one"
- "Best price"
- "Guaranteed"

unless the business can substantiate the claim and it is appropriate to display it.

### Prefer

- Clear service naming
- Clear contact method
- Accurate availability/status information
- Realistic response expectations
- Consistent branding
- Good writing
- Visible business identity
- Clear policies/notes where needed

---

## 15. Motion and feedback

Motion should communicate state and provide feedback, not perform for the user.

### Allowed examples

- Small hover/press feedback
- Navigation state transitions
- Subtle section reveal when it does not delay access
- Clear button state feedback

### Avoid

- Heavy parallax
- Continuous decorative movement
- Long entrance animations
- Auto-moving carousels that impair control
- Motion that delays primary content

Respect reduced-motion preferences.

---

## 16. Semantic frontend implementation

Use native semantic elements whenever appropriate:

- `header`
- `nav`
- `main`
- `section`
- `article` when semantically justified
- `footer`
- real `button` elements for actions
- real `a` elements for navigation/WhatsApp links

Avoid "div soup" and avoid implementing buttons as generic containers.

The DOM order should follow the intended reading order.

---

## 17. Performance standard

Performance is a UX requirement.

### Core Web Vitals targets

At the 75th percentile, target:

- **LCP ≤ 2.5 seconds**
- **INP ≤ 200 ms**
- **CLS ≤ 0.1**

Because UPDATE CARD is a static profile website, implementation should aim to exceed these thresholds when practical.

### Implementation expectations

- Prefer static HTML/CSS/JS or an equally lightweight architecture.
- Keep JavaScript minimal.
- Optimize and properly size images.
- Prefer modern formats such as AVIF/WebP where suitable.
- Use responsive images.
- Lazy-load non-critical media below the fold.
- Do not lazy-load the primary LCP asset if doing so delays it.
- Preload only truly critical resources.
- Avoid large UI/framework dependencies without justification.
- Prevent layout shifts by reserving media dimensions.
- Keep third-party scripts to an absolute minimum.

---

## 18. Content standard

Copy must help the customer act.

### Writing rules

- Use simple Arabic.
- Keep headings direct.
- Avoid corporate filler.
- Avoid repeating the same promise in several sections.
- Avoid exaggerated claims.
- Use customer language instead of technical/internal language.
- Supporting text should clarify, not restate the headline.
- Service labels should be immediately recognizable.

The interface must not invent prices, availability, guarantees, turnaround times, supported platforms, or policies.

---

## 19. WhatsApp conversion rules

WhatsApp is the current conversion destination.

### Requirements

- Use one recognizable WhatsApp interaction pattern throughout the site.
- Primary WhatsApp CTA must remain visually prominent without dominating every section.
- Context-specific prefilled messages may be used where they reduce customer effort.
- Avoid multiple visually competing WhatsApp buttons within the same viewport unless justified.
- The user should know what will happen before tapping.

---

## 20. Visual identity integration

The current logo is an input to the identity system, not a command to reproduce all its visual complexity everywhere.

The UI should derive a restrained system from the brand:

- controlled color usage
- consistent typography
- intentional geometric motifs if useful
- consistent icon style
- predictable radius/border/shadow rules

The final experience should feel like one designed product, not a collection of independent sections.

---

## 21. Anti-template rule

A professional page should not be assembled by mechanically repeating generic website sections.

Before adding a section, define:

- its purpose
- the user question it answers
- why it appears at that position
- what action becomes easier after seeing it

If two sections answer the same question, combine or remove one.

---

## 22. Anti-AI-look rule

The final site must not look like a generic AI-generated technology landing page.

Avoid patterns such as:

- random glossy 3D tokens
- floating game logos without hierarchy
- generic futuristic phone mockups
- excessive purple/blue glow
- fake holographic dashboards
- decorative crypto coins everywhere
- ungrounded futuristic scenes

Prefer deliberate composition, real brand assets, clean typography, real service data, purposeful imagery, and strong spacing.

---

## 23. Design workflow

The mandatory workflow is:

**UNDERSTAND → IA → USER FLOW → WIREFRAME → VISUAL DIRECTION → IMPLEMENT → RUN → VISUALLY INSPECT → USABILITY CRITIQUE → ACCESSIBILITY → PERFORMANCE → FIX → VERIFY**

### UNDERSTAND

Confirm the business goal, target customer, real services, constraints, and desired conversion.

### IA

Define categories, content priority, navigation, and section purpose.

### USER FLOW

Verify the shortest useful path to a service and WhatsApp.

### WIREFRAME

Solve structure without relying on visual polish.

### VISUAL DIRECTION

Explore a small number of intentional visual directions and choose one based on usability and brand fit.

### IMPLEMENT

Build the actual responsive interface.

### RUN

Test the real implementation, not only static mockups.

### VISUALLY INSPECT

Inspect key breakpoints and real content.

### USABILITY CRITIQUE

Check hierarchy, comprehension, interaction clarity, cognitive load, and conversion friction.

### ACCESSIBILITY

Run manual and automated checks against the WCAG 2.2 AA baseline.

### PERFORMANCE

Measure load behavior and Core Web Vitals-related implementation quality.

### FIX

Correct root causes, not cosmetic symptoms only.

### VERIFY

Re-test after fixes before approval.

---

## 24. Definition of done for a page

A page/section is not approved because its screenshot looks good.

It is ready only when:

- Purpose is clear.
- Reading order is clear.
- Mobile use is comfortable.
- Desktop composition is balanced.
- The primary action is obvious.
- Text is readable.
- Service names are understandable.
- No unnecessary section remains.
- Interaction states are clear.
- Focus and keyboard behavior work.
- Contrast is acceptable.
- Motion is restrained.
- No horizontal overflow exists.
- Images are optimized.
- Layout shift is controlled.
- The real implementation has been visually inspected.

---

## 25. Project-specific decision filter

For every future design proposal, evaluate it in this order:

1. **Comprehension** — Can the user understand the offer quickly?
2. **Findability** — Can the user find the needed service easily?
3. **Actionability** — Is the next action obvious?
4. **Comfort** — Is reading/tapping/navigation comfortable?
5. **Trust** — Does the interface feel credible and controlled?
6. **Accessibility** — Can more users operate it successfully?
7. **Performance** — Is the experience fast and stable?
8. **Brand expression** — Does it feel distinctly UPDATE CARD?
9. **Visual polish** — Is it elegant and refined?

Visual polish is important, but it comes after the experience works.

---

## 26. Authoritative references

The project standard is informed by the following references:

- W3C Web Content Accessibility Guidelines (WCAG) 2.2: https://www.w3.org/TR/WCAG22/
- W3C WAI Page Structure Tutorials: https://www.w3.org/WAI/tutorials/page-structure/
- W3C WAI Designing for Web Accessibility: https://www.w3.org/WAI/tips/designing/
- Nielsen Norman Group — 10 Usability Heuristics for User Interface Design: https://www.nngroup.com/articles/ten-usability-heuristics/
- web.dev — Core Web Vitals thresholds: https://web.dev/articles/defining-core-web-vitals-thresholds
- ISO 9241-210 — Human-centred design for interactive systems: https://www.iso.org/standard/77520.html

These references inform the rules; this document defines how they are applied to UPDATE CARD.

---

## 27. Change control

This standard is the current project baseline.

Future changes should:

1. Identify the rule being changed.
2. Explain the user/product reason.
3. Check accessibility/performance impact where relevant.
4. Update the version number when the change is material.

Do not silently override this document during visual implementation.

---

**Current baseline:** `UPDATE CARD Web Experience Standard v1.0`
