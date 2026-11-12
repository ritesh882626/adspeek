# AdsPeek — SEO content build instructions for Antigravity

This adds **seven guides** (blog articles) and **five city pages** to the AdsPeek site. Run it after Phases 1, 6 and 7 of `ADSPEEK-ANTIGRAVITY-BUILD.md` (foundation, city page template, guides index).

## How to work through this file
1. Do **Task C0**, then C1 → C5 in order, one at a time.
2. Stop after **C2** and after **C4**, report what you did, and wait for the user to say "continue".
3. The content files are final copy. Render them; never edit them.

## Content in this package
| File | What it is |
|---|---|
| `content/guides/shopify-store-cost-india.mdx` | How much does a Shopify store cost in India? (featured) |
| `content/guides/shopify-vs-woocommerce-india.mdx` | Shopify vs WooCommerce for Indian D2C brands |
| `content/guides/headless-shopify-when-worth-it.mdx` | Headless Shopify: when is it worth it? |
| `content/guides/cod-confirmation-whatsapp.mdx` | Cut fake COD orders with WhatsApp confirmation |
| `content/guides/meta-ads-new-shopify-store-first-90-days.mdx` | Meta ads for a new Shopify store: the first 90 days |
| `content/guides/abandoned-cart-recovery-whatsapp-vs-email.mdx` | Abandoned-cart recovery: WhatsApp vs email |
| `content/guides/woocommerce-to-shopify-migration-seo.mdx` | Move from WooCommerce to Shopify without losing SEO |
| `data/cities.ts` | Gurugram, Delhi, Noida, Mumbai, Bengaluru city pages |

---

## TASK C0 — Save the content files
### Files
- the eight files listed above, `CHANGELOG.md`

### Do this
If the files aren't already in the repo, copy each one from the **Appendix** — everything between its `~~~~~~` lines, unchanged — to the path shown. `data/cities.ts` **replaces** the existing file.

> Continue straight to C1.

---

## TASK C1 — Guide content pipeline (MDX)
### Rules for this task
- Create or edit **only** the files listed. Never touch other files.
- Never rewrite, shorten or "improve" the guide or city text. It was written for SEO and fact-checked; render it exactly as given. Text in [square brackets] is a placeholder — keep it.
- Same design language as the rest of the site: foundation tokens only, square corners, no animations, no arrows on buttons or links.
- Every layout rule below has a desktop (1024px+), tablet (640–1023px) and mobile (<640px) version — follow all three. Don't open a browser.
- Add one line to `CHANGELOG.md` when done.

### Files
- `package.json` (add `next-mdx-remote`, `gray-matter`, `remark-gfm`, `rehype-slug`)
- `lib/guides.ts` (new)
- `data/guides.ts` (replace its contents with a re-export from `lib/guides.ts`, so the Guides index keeps working)

### Do this
1. `lib/guides.ts` reads every `content/guides/*.mdx` at build time with `gray-matter`. Export:
   - `getAllGuides()` → array of frontmatter objects sorted by `date` (newest first), each with `slug`, `title`, `description`, `category`, `featured`, `readMinutes`, `date`, `updated`, `author`, `authorRole`, `faq`.
   - `getGuide(slug)` → `{ frontmatter, content }` or `null`.
   - `getRelatedGuides(slug, n = 3)` → same category first, then newest others.
2. `data/guides.ts`: keep the exported names the Guides index already uses (`Guide` type, the list, `CATEGORIES`) but source the list from `getAllGuides()` (map `readMinutes`/`date` into the fields the cards expect). The featured guide is the one with `featured: true`.
3. Categories stay: All, Shopify, Costs & pricing, Meta ads, Automation, Migration, Growth.

### Done when
- `/guides` shows the seven real guides with their real titles, summaries, categories and read times; the featured block shows "How much does a Shopify store cost in India? (2026 breakdown)".
- No guide text is hard-coded anywhere except the `.mdx` files.

---

## TASK C2 — Guide article page `/guides/[slug]`
### Rules for this task
- Create or edit **only** the files listed. Never touch other files.
- Never rewrite, shorten or "improve" the guide or city text. It was written for SEO and fact-checked; render it exactly as given. Text in [square brackets] is a placeholder — keep it.
- Same design language as the rest of the site: foundation tokens only, square corners, no animations, no arrows on buttons or links.
- Every layout rule below has a desktop (1024px+), tablet (640–1023px) and mobile (<640px) version — follow all three. Don't open a browser.
- Add one line to `CHANGELOG.md` when done.

### Files
- `app/guides/[slug]/page.tsx`
- `components/guides/ArticleHeader.tsx`
- `components/guides/ArticleBody.tsx`
- `components/guides/ArticleToc.tsx` (client — only for the mobile open/close)
- `components/guides/ArticleFaq.tsx`
- `components/guides/RelatedGuides.tsx`
- `components/guides/mdx-components.tsx`

### Page structure (top to bottom)
1. **Header** (`paper` background, padding 56px top / 64px bottom desktop; 40/48 mobile): breadcrumb Home / Guides / {category} (+ BreadcrumbList JSON-LD); category chip (mono 12px uppercase, accent background, 4px 8px padding); H1 = `title` (56px desktop, 40px tablet, 32px mobile, weight 800, max-width 900px); `description` as lead (20px / 18px / 17px, `body` colour, max-width 720px); meta row (mono 13px `muted`): author · authorRole · "Updated {updated, formatted 13 Nov 2026}" · "{readMinutes} min read".
2. **Body + table of contents** (white background):
   - Desktop: two columns inside the container — article column max **720px**; TOC column 260px on the right, `position: sticky; top: 104px`, listing every H2 as a link (mono label "On this page"; links 14px, 8px gap; current section not tracked — no scroll listeners).
   - Tablet: single column, TOC above the article as a bordered box.
   - Mobile: TOC is a closed `<details>` "On this page" box above the article.
3. **FAQ** from frontmatter `faq` (same layout as the homepage FAQ: question left / answer right on desktop, stacked on mobile) + FAQPage JSON-LD.
4. **Related guides**: 3 `GuideCard`s from `getRelatedGuides` (3 columns desktop, 2 tablet, 1 mobile).
5. **CtaBand**: heading "Want this done for your store?", primary "Build your package" → `/shopify-development#build`.

### Article typography (`mdx-components.tsx`)
- Body text 18px desktop / 17px mobile, line height 1.7, colour `body`, paragraphs 20px apart.
- **The first paragraph** (it starts with "**Short answer:**") renders as a callout: white background, 1px ink border, 4px accent block on the left edge drawn as a separate element (not a coloured border), padding 20px 24px.
- H2: 32px desktop / 26px mobile, weight 800, margin 56px top / 16px bottom, with `id` from `rehype-slug` (TOC targets). H3: 22px / 20px, weight 700, margin 32px / 12px.
- Lists: 8px between items. Task lists (`- [ ]`) render as unticked square boxes (decorative, `aria-hidden`), not real checkboxes.
- **Tables**: wrapped in a box with `overflow-x: auto` and 1px `line` border; header row ink background, white mono 12px uppercase text; cells padding 12px 16px, 1px `line` dividers; on mobile the table keeps its columns and scrolls sideways inside its box (the page itself never scrolls sideways).
- **Blockquotes** (used for message templates and formulas): `paper` background, 1px `line` border, mono 15px, padding 16px 20px, `white-space: pre-wrap`.
- Inline code: mono, `#EDEFE7` background, 2px 6px.
- Links: `forest`, underlined; internal links use Next `Link`; external links open normally with `rel="noopener"`.
- The "Sources" H3 and the italic note under it render at 15px `muted`.
- Horizontal rules: 1px `line`, 48px vertical margin.

### SEO
- `generateStaticParams` from `getAllGuides()`; unknown slug → `notFound()`.
- `generateMetadata`: title = `{title} | AdsPeek`, description, canonical `/guides/{slug}`, Open Graph type `article` with `publishedTime` and `modifiedTime`.
- **Article JSON-LD**: headline, description, datePublished, dateModified, author (Person: name, jobTitle), publisher (Organization AdsPeek, logo [LOGO URL]), mainEntityOfPage.

### Done when
- All seven guides open at `/guides/{slug}` with tables, quotes and checklists styled, and nothing scrolls sideways at 360px.
- Each guide outputs Article, FAQPage and BreadcrumbList JSON-LD.

> **STOP** — report and wait for "continue".

---

## TASK C3 — City pages: five cities from the new data file
### Rules for this task
- Create or edit **only** the files listed. Never touch other files.
- Never rewrite, shorten or "improve" the guide or city text. It was written for SEO and fact-checked; render it exactly as given. Text in [square brackets] is a placeholder — keep it.
- Same design language as the rest of the site: foundation tokens only, square corners, no animations, no arrows on buttons or links.
- Every layout rule below has a desktop (1024px+), tablet (640–1023px) and mobile (<640px) version — follow all three. Don't open a browser.
- Add one line to `CHANGELOG.md` when done.

### Files
- `data/cities.ts` (replace entirely with the provided file)
- `app/shopify-development/[city]/page.tsx`
- `components/city/CityHero.tsx`, `WhyLocal.tsx`, `MarketContent.tsx`, `CityFaq.tsx`, `OtherCities.tsx` (only to read the new fields below)
- `components/city/CityGuides.tsx` (new)
- `components/layout/Footer.tsx` (only the "Shopify by city" column)

### Do this
1. The new `City` type adds: `seoTitle`, `metaDescription`, `h1Lead` (text before the highlighted part), `whyLocalHeading`, `marketHeading`, `quote`. Use them: H1 = `h1Lead` + `Highlight(h1Highlight)`; section eyebrows use `whyLocalHeading` and `marketHeading`; spec box rows = Office (hide the row when `office` is null), Meetings, Stores built, Quote.
2. `generateStaticParams` from `CITY_ORDER` → five pages: gurugram, delhi, noida, mumbai, bangalore.
3. `generateMetadata`: `seoTitle`, `metaDescription`, canonical `/shopify-development/{slug}`.
4. JSON-LD: `LocalBusiness` only when `office` is set (Gurugram); every city gets `Service` with `areaServed` = city name; plus BreadcrumbList and FAQPage.
5. **Never render `sources`** — it's for fact-checking only.
6. `OtherCities`: links read "Shopify development in {name}" for each slug in `nearby`, using that city's `name` (so "bangalore" shows "Bengaluru").
7. **New `CityGuides` section** after the FAQ: eyebrow "Guides", H2 "Before you build", 3 `GuideCard`s — `shopify-store-cost-india`, `shopify-vs-woocommerce-india`, and `cod-confirmation-whatsapp` (Mumbai and Bengaluru: replace the third with `headless-shopify-when-worth-it`). 3 columns desktop / 2 tablet / 1 mobile.
8. Footer "Shopify by city": Gurugram, Delhi, Noida, Mumbai, Bengaluru — linking to the five real pages (remove Dubai and London until those pages exist).

### Done when
- Five city pages build; each has different hero, reasons, market text and FAQ.
- No footer or "Other cities" link points to a page that doesn't exist.

---

## TASK C4 — Sitemap, robots and internal links
### Rules for this task
- Create or edit **only** the files listed. Never touch other files.
- Never rewrite, shorten or "improve" the guide or city text. It was written for SEO and fact-checked; render it exactly as given. Text in [square brackets] is a placeholder — keep it.
- Same design language as the rest of the site: foundation tokens only, square corners, no animations, no arrows on buttons or links.
- Every layout rule below has a desktop (1024px+), tablet (640–1023px) and mobile (<640px) version — follow all three. Don't open a browser.
- Add one line to `CHANGELOG.md` when done.

### Files
- `app/sitemap.ts`
- `app/robots.ts`
- `components/home/Faq.tsx` (only to add one link, below)
- `components/shopify/Overview.tsx` (only to add one link, below)

### Do this
1. `sitemap.ts`: `/`, `/shopify-development`, `/contact`, `/about`, `/guides`, every `/guides/{slug}` (lastModified = `updated`), every `/shopify-development/{city}`. Base URL from `process.env.NEXT_PUBLIC_SITE_URL`.
2. `robots.ts`: allow all; point to the sitemap. Disallow nothing else.
3. Homepage FAQ: the answer to "How much does a Shopify store cost?" gets a final sentence: "See the full breakdown in our guide to Shopify costs in India." linking to `/guides/shopify-store-cost-india`.
4. Shopify service overview: under the lead paragraph add a small text link (15px, underlined): "How much does Shopify cost in India? Read the guide" → `/guides/shopify-store-cost-india`. No arrow.

### Done when
- `/sitemap.xml` lists 6 pages + 7 guides + 5 cities.

> **STOP** — report and wait for "continue".

---

## TASK C5 — Content QA report (read-only)
### Rules
- Change no files. Produce `CONTENT-QA.md` only.

### Report
1. **Links:** every internal link in the seven `.mdx` files and the city pages resolves to an existing route (list any that don't).
2. **Placeholders:** list every remaining `[…]` placeholder by page, so the owner can fill them before launch.
3. **Metadata:** each guide and city page has a unique title (under 65 characters) and description (under 160 characters) — list any over length.
4. **Structured data:** which JSON-LD types each page outputs.
5. **Duplicate text:** confirm no two city pages share a paragraph.

---

# APPENDIX — Content files

## `content/guides/abandoned-cart-recovery-whatsapp-vs-email.mdx`

<!-- BEGIN content/guides/abandoned-cart-recovery-whatsapp-vs-email.mdx -->
~~~~~~mdx
---
title: "Abandoned-cart recovery: WhatsApp vs email"
slug: "abandoned-cart-recovery-whatsapp-vs-email"
description: "Which channel recovers more abandoned carts for Indian and overseas buyers — WhatsApp or email? Costs, consent rules, timing, message examples and the setup we recommend."
category: "Automation"
featured: false
readMinutes: 7
date: "2026-11-13"
updated: "2026-11-13"
author: "Ritesh Kumar Singh"
authorRole: "Founder, AdsPeek"
primaryKeyword: "abandoned cart recovery whatsapp"
secondaryKeywords: ["abandoned cart email vs whatsapp", "shopify abandoned cart india", "cart recovery automation"]
faq:
  - q: "Is WhatsApp better than email for abandoned carts?"
    a: "For Indian buyers, WhatsApp usually gets seen faster because that's where people already chat. Email is cheaper per message and works well for overseas buyers and higher-priced, considered purchases. Most stores do best with both, in sequence."
  - q: "Can I send WhatsApp cart reminders to anyone?"
    a: "No. You need the customer's opt-in to receive WhatsApp messages from your business, and cart reminders are promotional, so they're sent as paid marketing templates."
  - q: "How soon should the first reminder go out?"
    a: "Within the first hour, while the purchase is still on the buyer's mind. Then a second reminder the next day. Stop after two or three."
---

**Short answer:** use **both, in sequence**. For Indian buyers, lead with **WhatsApp** (seen fast, where they already chat), then follow with **email**. For overseas buyers or higher-priced products, lead with **email** and use WhatsApp only where the buyer opted in and it's normal in that market. Stop after two or three reminders.

## Why bother: most carts are abandoned

Baymard Institute's average across 50 studies puts **online cart abandonment at about 70%** — roughly 7 in 10 carts never become orders. Many of those shoppers were only browsing, but a meaningful share left because of something you can fix or remind them about: unexpected costs, a slow checkout, a payment problem, or simply distraction.

Recovery messages won't save every cart. But they're automated, they run every day, and they target people who have already shown intent — usually the cheapest sales you'll ever make.

## WhatsApp vs email at a glance

| | WhatsApp | Email |
|---|---|---|
| Where Indian buyers see it | Immediately, in their main chat app | Often later, sometimes in Promotions |
| Cost per message | Paid per delivered marketing template (about ₹1 in India in 2026, plus provider fee and GST) | Very low per send |
| Consent | Explicit opt-in to WhatsApp messages required | Marketing consent rules apply; varies by country |
| Format | Short text, image, button | Long-form, product grid, multiple links |
| Best for | Fast nudges, questions, COD-heavy and mobile-first buyers | Considered purchases, overseas buyers, richer content |
| Risk | Feels intrusive if overused; users can block or report | Lower visibility; easy to ignore |

*WhatsApp rates change by quarter and country — check Meta's rate card before budgeting.*

## The sequence we recommend

**For Indian buyers (with WhatsApp opt-in):**
1. **After ~30–60 minutes — WhatsApp:** a friendly reminder with the product image and a button back to the cart.
2. **After ~24 hours — email:** the full cart, reviews, delivery and returns information.
3. **After ~48–72 hours — WhatsApp (optional):** only if your margins allow a small incentive, or to answer a likely objection (size, delivery date, COD available).

**For overseas buyers:**
1. **After ~1 hour — email** with the cart and key reassurance (shipping time, duties, returns).
2. **After ~24 hours — email** with reviews or a size/fit guide.
3. **WhatsApp only** where the buyer opted in and it's a normal channel in their country.

**Stop after the sequence.** Endless reminders train people to wait for discounts and get your number blocked.

## What to say

**WhatsApp (first reminder)** — short, helpful, no pressure:
> Hi {{name}}, you left **{{product}}** in your cart. It's still saved for you 👇
> **[ Complete my order ]**
> Questions about size or delivery? Just reply here.

That last line matters: a reply opens a conversation, and conversations close sales. Make sure someone — or an automated first reply — answers quickly.

**Email (second reminder)** — answer objections:
- Subject: *Still thinking about {{product}}?*
- The cart, with images and price
- Delivery time and returns policy in one line each
- Two or three short reviews
- One clear button back to checkout

## Discounts: use carefully

A discount in the first reminder teaches customers to abandon on purpose. If you use one, put it in the **last** reminder, keep it small, and consider limiting it to first-time buyers. Often, removing a surprise (shipping cost shown late) works better than a discount.

## Fix the leaks, not just the reminders

If many carts are abandoned at the same step, recovery messages are a bandage. Check:
- Is shipping cost or COD availability shown **before** checkout?
- Does checkout ask for anything unnecessary?
- Are UPI and the payment methods your buyers use available?
- Does the mobile checkout load fast?

## Cost reality check

WhatsApp cart reminders are **marketing** messages, so each delivered message is charged. Email is nearly free per send. That's fine — what matters is **revenue recovered ÷ cost of messages**. Track recovered orders from each channel for a month; if WhatsApp's extra recoveries comfortably exceed its message cost, keep it.

## Where this fits

Abandoned-cart recovery is part of the Growth System behind every store we build, together with [COD confirmation](/guides/cod-confirmation-whatsapp), order updates and review requests. Add it in the **Automations** step of the [package builder](/shopify-development#build).

---

### Sources
- Baymard Institute — [Cart abandonment rate statistics](https://baymard.com/lists/cart-abandonment-rate) (average 70.22% across 50 studies)
- Meta for Developers — [Pricing on the WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/pricing) (per-message pricing by category and country)
- MyOperator — [WhatsApp Business API pricing in India 2026](https://myoperator.com/blog/whatsapp-business-api-pricing-india-2026) (India marketing template rate in 2026)

*Checked in November 2026.*
~~~~~~
<!-- END content/guides/abandoned-cart-recovery-whatsapp-vs-email.mdx -->

## `content/guides/cod-confirmation-whatsapp.mdx`

<!-- BEGIN content/guides/cod-confirmation-whatsapp.mdx -->
~~~~~~mdx
---
title: "Cut fake COD orders with WhatsApp confirmation"
slug: "cod-confirmation-whatsapp"
description: "How Indian D2C stores reduce COD returns (RTO) by confirming cash-on-delivery orders on WhatsApp before shipping — the flow, the message, the maths and the setup."
category: "Automation"
featured: false
readMinutes: 7
date: "2026-11-13"
updated: "2026-11-13"
author: "Ritesh Kumar Singh"
authorRole: "Founder, AdsPeek"
primaryKeyword: "cod confirmation whatsapp"
secondaryKeywords: ["reduce rto india", "cod order verification shopify", "fake cod orders"]
faq:
  - q: "How much does a WhatsApp COD confirmation message cost?"
    a: "COD confirmations are sent as utility template messages, which Meta charges per delivered message at a fraction of a rupee in India. Since 1 October 2026, utility templates are charged even inside the 24-hour customer service window. Your WhatsApp provider may add its own platform fee."
  - q: "What should I do with orders that don't reply?"
    a: "Send one reminder, then hold the order instead of shipping it blind. Many stores call non-responders or offer a small prepaid discount; whatever you choose, apply one clear rule."
  - q: "Does COD confirmation reduce sales?"
    a: "It can lose a few orders that would never have been accepted anyway. That is the point: you stop paying shipping both ways on parcels that come back."
---

**Short answer:** before you ship a cash-on-delivery order, send the customer a WhatsApp message with the order details and two buttons — **Confirm** and **Cancel**. Ship only confirmed orders, chase the silent ones once, and cancel the rest. It's the simplest automation a COD-heavy Indian store can add, and usually the fastest to pay for itself.

## Why COD returns hurt so much

COD still drives a huge share of Indian e-commerce, especially for first orders and outside the metros. The problem is what comes back.

When a COD parcel is refused or can't be delivered, it goes **Return to Origin (RTO)**. You pay forward shipping, you pay return shipping, and your stock sits in transit for a week or two. You earn nothing.

How big is the gap? On ClickPost's FY2026 D2C network, **37.51% of COD orders ended as RTO, against 5.28% of prepaid orders**. Meesho's FY25 prospectus reported a different measure — orders undelivered — at **22.3% for COD and 2.7% for prepaid**. Different datasets, same message: COD orders fail many times more often than prepaid ones.

## Where confirmation helps (and where it doesn't)

COD orders fail for several reasons:
- **Fake or prank orders**, wrong numbers, duplicate orders.
- **Impulse orders** the buyer regrets before the parcel arrives.
- **Wrong or incomplete addresses.**
- **Buyer not available** or not carrying cash.
- **Product mismatch** — it isn't what they expected.

A confirmation message catches the first three well and helps with the fourth (you can share the expected delivery date). It won't fix product mismatch — better photos, size guides and honest descriptions do.

## The flow

1. **Order placed (COD).** Your store tags the order *Awaiting confirmation*.
2. **Within a few minutes:** a WhatsApp utility message goes out with the order summary and two quick-reply buttons.
3. **Customer taps Confirm:** the tag changes to *Confirmed*; the order is released to your shipping app.
4. **Customer taps Cancel:** the order is cancelled automatically and stock goes back.
5. **No reply after a few hours:** one reminder.
6. **Still no reply by your cut-off (for example, the next morning):** hold the order — call the customer, or cancel. Pick one rule and apply it every time.
7. **Optional:** in the confirmation message, offer a small discount to pay online instead. Every COD order that converts to prepaid is one less RTO risk.

## The message

Keep it short, clear and recognisably from your brand. Meta classifies order confirmations as **utility** messages — keep them transactional. Adding a sales pitch can get a template re-classified as marketing (more expensive) or rejected.

> Hi {{name}}, thanks for your order with **{{brand}}**!
> Order {{order_no}}: {{items}} — ₹{{amount}} (Cash on Delivery)
> Delivering to: {{short_address}}
>
> Please confirm so we can ship it today.
> **[ Confirm order ]   [ Cancel ]**

If you offer a prepaid incentive, put it in a **separate, clearly optional** line and check the template is approved as utility.

## What it costs

Meta charges per delivered **template message**, by category and country. Utility messages to Indian numbers cost a fraction of a rupee each, and **since 1 October 2026 utility templates are charged even inside the 24-hour customer service window** (they had been free there from July 2025). Your WhatsApp provider will add its own platform fee, and GST applies.

Do the maths for your store:

> **Monthly saving** ≈ COD orders × (RTO rate before − RTO rate after) × cost of one RTO
> **Monthly cost** ≈ COD orders × messages per order × price per message + provider fee

With one or two messages per order, the cost is tiny compared with even a few avoided round trips. Measure your RTO rate for a month before and after — that's your proof.

Also remember: **Shopify doesn't charge its third-party transaction fee on COD orders**, so every COD order you keep (and deliver) is cheap to process. The goal isn't to kill COD — it's to stop shipping orders that were never going to be accepted.

## How to set it up on Shopify

You need three things:
1. **WhatsApp Business Platform access** through an official provider (a Business Solution Provider). The plain WhatsApp Business app isn't built for automated confirmations at scale.
2. **An approved utility template** with Confirm / Cancel buttons.
3. **An automation** that sends the template on new COD orders and updates the order (tag, hold, cancel) based on the reply — either a Shopify app built for COD confirmation or a custom flow.

Then connect the result to shipping: only *Confirmed* orders should reach your courier panel.

## Mistakes to avoid

- **Shipping before confirmation "to save time."** The whole point is that unconfirmed orders wait.
- **Sending promotions in the confirmation template.** Keep utility messages utility.
- **No rule for silent customers.** Decide hold-or-cancel and stick to it.
- **Not measuring.** Track RTO rate on COD orders weekly.

## Where this fits

COD confirmation is one of the automations in our Growth System, alongside [abandoned-cart recovery](/guides/abandoned-cart-recovery-whatsapp-vs-email) and order updates. You can add it in the **Automations** step of our [package builder](/shopify-development#build).

---

### Sources
- ClickPost — [Ecommerce RTO statistics India 2026](https://www.clickpost.ai/blog/ecommerce-rto-statistics-india) (COD 37.51% vs prepaid 5.28% on ClickPost's FY2026 D2C network; Meesho FY25 22.3% vs 2.7% undelivered)
- Meta for Developers — [Pricing on the WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/pricing)
- Twilio — [Changes to WhatsApp's pricing, October 2026](https://support.twilio.com/hc/en-us/articles/53100462475931-Notice-Changes-to-WhatsApp-s-Pricing-October-2026) (utility templates in the service window charged from 1 October 2026)
- Razorpay — [Shopify payment gateway cost in India](https://razorpay.com/blog/razorpay-shopify-payment-gateway-pricing-explained/) (manual payment methods such as COD exempt from Shopify's third-party fee)

*Checked in November 2026. WhatsApp pricing changes quarterly; check Meta's rate card before budgeting.*
~~~~~~
<!-- END content/guides/cod-confirmation-whatsapp.mdx -->

## `content/guides/headless-shopify-when-worth-it.mdx`

<!-- BEGIN content/guides/headless-shopify-when-worth-it.mdx -->
~~~~~~mdx
---
title: "Headless Shopify: when is it worth it? (An honest guide)"
slug: "headless-shopify-when-worth-it"
description: "What headless Shopify actually is, what it costs, when it's worth it and when a well-built theme is the better choice — written for founders, not developers."
category: "Shopify"
featured: false
readMinutes: 7
date: "2026-11-13"
updated: "2026-11-13"
author: "Ritesh Kumar Singh"
authorRole: "Founder, AdsPeek"
primaryKeyword: "headless shopify"
secondaryKeywords: ["shopify hydrogen", "headless shopify development india", "is headless shopify worth it"]
faq:
  - q: "Do I need Shopify Plus for headless?"
    a: "No. Headless storefronts read data through Shopify's Storefront API, which works on standard paid plans. Plus adds extra capabilities but is not required."
  - q: "Does headless Shopify cost more?"
    a: "The software can be close to free — Hydrogen is open source and Shopify's Oxygen hosting is included on paid plans — but the build and ongoing development cost more, because you're running a custom website instead of a theme."
  - q: "Is headless faster?"
    a: "It can be, but speed comes from good engineering, not from the word headless. A lean, well-built theme is often fast enough. A badly built headless site can be slower than a good theme."
---

**Short answer:** headless Shopify is worth it when your storefront has to do things a theme genuinely can't — an app-like experience, content and commerce mixed deeply, multiple storefronts from one catalogue — **and** you have budget for ongoing development. For most D2C brands launching or rebuilding, a well-built theme with custom sections is faster to launch, cheaper to run and just as effective.

## What "headless" means

A normal Shopify store has two parts glued together:
1. **The back end** — products, inventory, orders, customers, checkout.
2. **The storefront** — the pages your customers see, built from a Shopify theme.

**Headless** cuts the glue. Shopify still runs the back end and checkout, but the storefront is a separate, custom website (usually built in React) that pulls data from Shopify through its **Storefront API**.

Shopify's own recommended way to do this is **Hydrogen** (its React framework) hosted on **Oxygen** (its hosting). You can also use other frameworks like Next.js and host elsewhere.

## What it costs

- **Framework:** Hydrogen is open source — free.
- **Hosting:** Oxygen is included at no extra charge on paid Shopify plans.
- **Shopify plan:** standard paid plans work; you don't need Plus.
- **The build:** this is where the cost is. You're commissioning a custom web application, not customising a theme.
- **Running it:** every change — a new section, a campaign page, a Shopify API update — needs a developer. Themes let your team change a lot through the editor; headless usually doesn't, unless you also add a content management system (CMS), which is another tool and another cost.

**So the honest summary:** headless is cheap in software and expensive in people.

## When headless is worth it

1. **Your storefront is really an app.** Heavy personalisation, configurators, saved builds, account-driven experiences that would need many apps and hacks on a theme.
2. **Content and commerce are deeply mixed.** Editorial, lookbooks, stories and shoppable content on every page, managed in a CMS by a content team.
3. **Several storefronts, one catalogue.** Different brands, regions or channels that share Shopify's back end but need different front ends.
4. **Performance is a measured problem.** You've already optimised your theme and still have a real, tracked speed issue on key pages.
5. **You have (or will pay for) developers long-term.** Not just for the build — for every change after it.

## When a theme is the better choice

- You're launching, or rebuilding after a messy first store.
- Your team needs to edit pages and run campaigns without a developer.
- You rely on many Shopify apps (most are built for themes first).
- Your real problems are conversion, traffic or retention — not what a theme can render.

A modern Shopify theme with **custom sections** can look entirely bespoke. It's where most of our builds land, because it gives brands a premium design *and* the ability to change things themselves.

## Speed: the most common misunderstanding

"Headless is faster" is only true when it's engineered well. Speed comes from light pages, good images, minimal scripts and smart caching — all achievable on a theme too. A headless site loaded with tracking scripts can be slower than a clean theme. Decide on measured problems, not on the label.

## A simple decision checklist

Answer yes or no:

- [ ] We need features a theme + apps genuinely can't do.
- [ ] We'll run more than one storefront off one catalogue, or need a CMS-driven editorial site.
- [ ] We have a measured performance problem a theme can't fix.
- [ ] We have budget for a developer after launch, every month.
- [ ] Our team is fine requesting changes instead of editing pages themselves.

**Four or five yes:** headless is worth a serious look. **Two or fewer:** build a strong theme with custom sections and revisit in a year.

## Our approach

We build both. We default to a theme with custom sections for most brands and recommend headless only when the checklist says so — in our [package builder](/shopify-development#build) it's one of the four build types, and we'll tell you on the call if we think a theme will do the job.

Related: [How much does a Shopify store cost in India?](/guides/shopify-store-cost-india)

---

### Sources
- Shopify.dev — [Hydrogen and Oxygen fundamentals](https://shopify.dev/docs/storefronts/headless/hydrogen/fundamentals) (Hydrogen and Oxygen as Shopify's recommended headless stack; Oxygen availability on paid plans)

*Checked in November 2026. Plan availability for Oxygen can change; confirm on shopify.dev.*
~~~~~~
<!-- END content/guides/headless-shopify-when-worth-it.mdx -->

## `content/guides/meta-ads-new-shopify-store-first-90-days.mdx`

<!-- BEGIN content/guides/meta-ads-new-shopify-store-first-90-days.mdx -->
~~~~~~mdx
---
title: "Meta ads for a new Shopify store: the first 90 days"
slug: "meta-ads-new-shopify-store-first-90-days"
description: "A practical 90-day plan for running Meta (Facebook and Instagram) ads for a new Shopify store in India: tracking, budget maths, campaign structure, creative testing and when to scale."
category: "Meta ads"
featured: false
readMinutes: 9
date: "2026-11-13"
updated: "2026-11-13"
author: "Ritesh Kumar Singh"
authorRole: "Founder, AdsPeek"
primaryKeyword: "meta ads for new shopify store"
secondaryKeywords: ["facebook ads shopify india", "meta ads learning phase budget", "instagram ads for d2c brand"]
faq:
  - q: "How much should I spend on Meta ads for a new store?"
    a: "Work backwards from the learning phase: Meta needs roughly 50 optimisation events in 7 days per ad set. Daily budget ≈ expected cost per event × 50 ÷ 7. If you can't afford that for purchases, optimise for a more frequent event (like add to cart) at first, and keep the number of ad sets small."
  - q: "How long before Meta ads work?"
    a: "Give a new account at least two to four weeks of steady spend before judging, and avoid big edits during the learning phase. Most of the first month is about learning which creative and offer works."
  - q: "Should I run Click-to-WhatsApp ads?"
    a: "For higher-priced or considered products in India, often yes. A conversation can close a sale that a product page alone wouldn't. Make sure someone (or an automation) replies fast."
---

**Short answer:** spend the first 2 weeks making sure tracking is right and finding creative that gets attention; weeks 3–6 finding which offer and audience actually sells; and weeks 7–12 scaling what works, slowly. The most common mistake is changing everything every few days, which keeps Meta's system permanently "learning".

## Before you spend ₹1: get tracking right

Meta's delivery system learns from the events your store sends it. If those events are wrong or missing, you're paying it to learn the wrong thing.

Checklist:
- **Meta Pixel** installed through Shopify's Facebook & Instagram channel (or your theme), firing *ViewContent*, *AddToCart*, *InitiateCheckout* and *Purchase*.
- **Conversions API** turned on, so events are sent server-to-server as well as from the browser — this recovers events that browsers and ad blockers drop.
- **Domain verified** in Meta Business Manager.
- **Purchase value** passing correctly (test with a real order).
- **GA4** running alongside, so you have a second view of what's happening.

COD needs a decision: a COD "purchase" fires when the order is placed, not when cash is collected. If your COD returns are high, Meta will happily optimise for buyers who later refuse delivery. Two fixes: [confirm COD orders on WhatsApp](/guides/cod-confirmation-whatsapp), and judge results on *delivered* revenue in your own reports, not only on Meta's dashboard.

## The budget maths that matters

Meta says an ad set usually exits the **learning phase** after about **50 optimisation events in a 7-day window**. Until then, results are unstable. If it never reaches that, it shows **Learning Limited** — not a penalty, but a sign the system doesn't have enough data.

So size budget from the event you optimise for:

> **Daily budget per ad set ≈ expected cost per event × 50 ÷ 7**

Example: if you expect a purchase to cost ₹700, one ad set needs about ₹700 × 50 ÷ 7 = **₹5,000 a day** to exit learning on purchases. Many new stores can't do that yet. Two honest options:

1. **Consolidate.** Fewer ad sets, each with more budget. Two well-funded ad sets beat eight starved ones.
2. **Optimise for a more frequent event first** (for example, add to cart), then switch to purchases once you have volume.

## Days 1–14: foundation and creative testing

**Goal:** find creative that stops the scroll and gets the right people to the store.

- **One prospecting campaign**, broad targeting (age, country and gender only if your product requires it). Let Meta find buyers — it's usually better at this than narrow interest stacks.
- **Test creative, not audiences.** 4–6 genuinely different ideas: a founder video, a problem/solution demo, a customer review, a product-in-use reel, a static with a single bold claim.
- **Keep the store ready:** fast product pages, clear price, delivery and return information, COD availability visible.
- **Don't edit daily.** Big changes (targeting, optimisation event, large budget jumps, adding ads) restart learning.

What to watch: thumb-stop rate (3-second views ÷ impressions), click-through rate, cost per landing page view, add-to-cart rate. Purchases will be noisy this early.

## Days 15–45: find the offer that sells

**Goal:** turn attention into orders at a cost you can live with.

- **Kill clear losers, keep winners running.** Add 2–3 new creatives a week based on what worked (same angle, new execution).
- **Test offers, one at a time:** free shipping threshold, bundle, first-order discount, prepaid discount. The offer often moves results more than the ad.
- **Start retargeting** people who viewed products or added to cart in the last 7–30 days, with reviews, FAQs and urgency that's real (stock, delivery time).
- **Try Click-to-WhatsApp** for considered or higher-priced products. Many Indian buyers want to ask one question before they pay. Reply fast — an [AI or automated first reply](/guides/abandoned-cart-recovery-whatsapp-vs-email) helps outside working hours.
- **Fix the store, not just the ads.** If add-to-cart is high but checkout completion is low, the problem is on the site.

## Days 46–90: scale carefully

**Goal:** spend more without breaking what works.

- **Raise budgets gradually** — small steps every few days rather than doubling overnight, which can restart learning.
- **Duplicate winners** into a new ad set when you want a big jump, rather than shocking the original.
- **Keep the creative pipeline going.** Winning ads tire. Plan new ones every week.
- **Retention starts paying back:** repeat-order reminders, review requests and loyalty bring cheaper second orders, which is what makes paid acquisition profitable.

## How to judge results honestly

- **Contribution margin per order** (after product cost, shipping, payment fees and returns) — not ROAS alone.
- **Delivered revenue**, not placed orders, if you sell COD.
- **Blended cost per acquisition** across all channels, because Meta's attribution and your store's numbers will never match exactly.
- **New-customer revenue vs returning** — scaling should grow new customers.

## The 90-day checklist

- [ ] Pixel + Conversions API verified with a real test order
- [ ] COD confirmation running (if you sell COD)
- [ ] One prospecting campaign, broad, few ad sets
- [ ] 4–6 different creative ideas live, 2–3 new each week
- [ ] One offer test at a time
- [ ] Retargeting on from week 3
- [ ] Budgets raised in small steps
- [ ] Weekly report on delivered revenue and contribution margin

We run this playbook as part of our [Meta ads service](/#services) and the Growth System that sits behind every store we build. Want the store, the tracking and the ads from one team? [Build your package](/shopify-development#build).

---

### Sources
- Meta for Business — Learning phase guidance (about 50 optimisation events in 7 days; Learning Limited), summarised by [AdManage](https://admanage.ai/blog/facebook-ads-learning-phase-guide) and [Lebesgue](https://lebesgue.io/blog/facebook-ads-learning-phase/) (what restarts learning)

*Checked in November 2026. Meta changes delivery and attribution regularly; treat budgets as starting points.*
~~~~~~
<!-- END content/guides/meta-ads-new-shopify-store-first-90-days.mdx -->

## `content/guides/shopify-store-cost-india.mdx`

<!-- BEGIN content/guides/shopify-store-cost-india.mdx -->
~~~~~~mdx
---
title: "How much does a Shopify store cost in India? (2026 breakdown)"
slug: "shopify-store-cost-india"
description: "Every cost of running a Shopify store in India in 2026: plan fees, the extra transaction fee Indian stores pay, payment gateway charges, apps, and build cost — with worked examples."
category: "Costs & pricing"
featured: true
readMinutes: 9
date: "2026-11-13"
updated: "2026-11-13"
author: "Ritesh Kumar Singh"
authorRole: "Founder, AdsPeek"
primaryKeyword: "shopify store cost in india"
secondaryKeywords: ["shopify pricing india", "shopify transaction fees india", "shopify development cost india"]
faq:
  - q: "How much does Shopify cost per month in India?"
    a: "On annual billing, Shopify's Basic plan is ₹1,499 a month, Grow is ₹5,599 and Advanced is ₹22,680, all before 18% GST. Monthly billing costs more. Check Shopify's India pricing page for the current figures before you commit."
  - q: "Does Shopify charge a transaction fee in India?"
    a: "Yes, on online payments. Shopify Payments is not available in India, so you must use a gateway like Razorpay or Cashfree, and Shopify adds a third-party transaction fee of 2% on Basic, 1% on Grow and 0.6% on Advanced. Cash on delivery orders are exempt."
  - q: "When should I upgrade from Basic to Grow?"
    a: "When your prepaid (online-paid) revenue goes above roughly ₹4.1 lakh a month. Above that, the 1% you save in transaction fees is more than the extra subscription cost."
  - q: "How much does it cost to get a Shopify store built in India?"
    a: "It depends on the number of pages, custom sections, integrations and automations, not on the platform. A store on a customised theme costs far less than a fully custom or headless build. Use a package builder or ask for an itemised quote rather than a single headline price."
---

**Short answer:** a Shopify store in India costs **₹1,499–₹22,680 a month for the plan** (annual billing, before 18% GST), **plus about 4% on every online payment** on the Basic plan once Shopify's extra fee and your gateway's fee are added together, **plus apps and a one-time build cost**. Cash on delivery orders don't attract Shopify's extra fee.

The plan price is the number everyone quotes. The transaction fee is the number that actually decides your margin. This guide covers both, with the maths.

## 1. Shopify plan prices in India

Shopify bills Indian stores in rupees. On **annual billing**, the main plans are:

| Plan | Price per month (annual billing, before GST) | Shopify's extra fee on online payments |
|---|---|---|
| Basic | ₹1,499 | 2% |
| Grow | ₹5,599 | 1% |
| Advanced | ₹22,680 | 0.6% |
| Plus | Custom (from about ₹1.75 lakh a month) | Negotiated |

Add **18% GST** to every Shopify charge. Monthly billing is more expensive than annual billing, and Shopify regularly runs trial offers (for example, a low first-three-months price), so always confirm on Shopify's own India pricing page before you sign up — these numbers move with exchange rates and promotions.

There is also a ₹399 **Starter** plan, but it is built for selling through social links, not for running a full online store. If you want your own branded website, start at Basic.

## 2. The fee most Indian founders miss

In many countries, Shopify stores use **Shopify Payments** and pay a single card rate. **Shopify Payments is not available in India.** That means every Indian store connects a third-party gateway — Razorpay, Cashfree, PayU, PhonePe and so on — and Shopify then adds its own **third-party transaction fee** on every online payment:

- **2%** on Basic
- **1%** on Grow
- **0.6%** on Advanced

That fee sits **on top of** the gateway's own charge. Razorpay's standard domestic rate, for example, is 2% plus 18% GST on that fee.

### What one ₹1,000 prepaid order actually costs you

| | Basic | Grow | Advanced |
|---|---|---|---|
| Shopify third-party fee | ₹20.00 | ₹10.00 | ₹6.00 |
| Gateway fee (2%) | ₹20.00 | ₹20.00 | ₹20.00 |
| GST on gateway fee (18%) | ₹3.60 | ₹3.60 | ₹3.60 |
| **Total** | **₹43.60 (4.36%)** | **₹33.60 (3.36%)** | **₹29.60 (2.96%)** |

Your exact gateway rate may be lower if you negotiate, and GST on fees can usually be claimed back if you are GST-registered. But as a planning number, **assume about 4.4% of online revenue on Basic**.

**Cash on delivery is different.** Manual payment methods such as COD are exempt from Shopify's third-party fee, because no gateway processes them. COD has its own cost — returns — which we cover in [our COD guide](/guides/cod-confirmation-whatsapp).

## 3. When to move from Basic to Grow (and Grow to Advanced)

Because the transaction fee drops as the plan price rises, there is a clear break-even point. Shopify's fee only applies to online-paid orders, so use your **prepaid revenue**, not total revenue.

- **Basic → Grow:** Grow costs ₹4,100 more a month and saves 1% of prepaid revenue. Break-even is **₹4.1 lakh of prepaid revenue a month**. Above that, Grow is cheaper overall.
- **Grow → Advanced:** Advanced costs ₹17,081 more a month and saves 0.4%. Break-even is roughly **₹42.7 lakh of prepaid revenue a month**.

(GST applies to both the subscription and the fee, so it doesn't change the break-even point.)

**Example:** a store doing ₹6 lakh a month, 60% prepaid, has ₹3.6 lakh of prepaid revenue. That's below ₹4.1 lakh, so Basic is still the cheaper plan. If prepaid share rises to 80% (₹4.8 lakh), Grow wins.

## 4. Apps: the quiet monthly bill

Shopify's apps add features the core platform doesn't have. A typical Indian D2C store pays for some of these:

- **Reviews** (photo reviews on product pages)
- **WhatsApp and email automation** (abandoned carts, order updates, COD confirmation)
- **Shipping** (Shiprocket or a courier aggregator — usually charged per shipment, not monthly)
- **GST invoicing**
- **Subscriptions or loyalty**, if you need them

Many apps charge in US dollars, and prices change often, so we don't list amounts here. Budget a fixed monthly line for apps from day one, and review it every quarter — stores often pay for apps they stopped using months ago.

## 5. The one-time build cost

The platform is the cheap part. What you pay an agency or freelancer depends on **what the store needs**, not on Shopify itself:

| What drives the price | Lower cost | Higher cost |
|---|---|---|
| Design | Customised existing theme | Fully custom design |
| Pages | Home, collection, product, cart | Plus lookbook, wholesale, quiz, landing pages |
| Catalogue setup | A few dozen products | Hundreds of products with variants |
| Integrations | Payments and shipping | ERP/Tally sync, multi-currency, loyalty |
| Automations | None | Cart recovery, COD confirmation, review requests |
| Architecture | Standard Shopify theme | [Headless](/guides/headless-shopify-when-worth-it) |

This is why a single "Shopify store from ₹X" price is rarely useful. At AdsPeek we price stores by component: you pick the pages, integrations and automations in our [package builder](/shopify-development#build) and get an itemised quote. Our builds start from [YOUR PRICE].

## 6. A realistic first-year budget

For a new brand on the Basic plan selling ₹3 lakh a month with 50% prepaid:

| Cost | How to estimate |
|---|---|
| Shopify Basic | ₹1,499 × 12 + 18% GST ≈ **₹21,226 a year** |
| Transaction + gateway fees | ~4.36% of ₹1.5 lakh prepaid × 12 ≈ **₹78,480 a year** |
| Apps | Your chosen apps × 12 |
| Domain | One yearly renewal |
| Build | One-time, from your quote |

Notice that **fees on payments cost several times more than the plan itself**. That's the number to watch as you grow — and the reason the Basic-to-Grow switch matters.

## 7. How to keep Shopify costs down in India

1. **Pay annually** once you're sure the store is staying — it's noticeably cheaper than monthly.
2. **Upgrade on the maths, not on features.** Use the break-even figures above.
3. **Negotiate your gateway rate** once you have steady volume.
4. **Grow your prepaid share carefully.** Prepaid orders cost more in fees but return far less often than COD. A small prepaid discount usually pays for itself.
5. **Audit apps every quarter.**
6. **Build only the pages you need now.** You can add a lookbook or wholesale page later.

## The bottom line

For most Indian D2C brands, Shopify's plan fee is a small line. The real costs are **payment fees on prepaid orders**, **returns on COD orders**, and **the build**. Plan for all three and choose your plan using the break-even numbers, not the feature list.

If you want a quote that's broken down by what you actually need, [build your package](/shopify-development#build) — it takes about two minutes. Based in NCR? Meet us for [Shopify development in Gurugram](/shopify-development/gurugram), [Delhi](/shopify-development/delhi) or [Noida](/shopify-development/noida).

---

### Sources
- Razorpay — [Shopify payment gateway cost in India](https://razorpay.com/blog/shopify-payment-gateway-cost-india/) and [cheapest payment gateway for Shopify in India](https://razorpay.com/blog/cheapest-payment-gateway-for-shopify-india/) (plan fees on annual billing, third-party fees, worked ₹1,000 example, COD exemption)
- Shopify Help Center — [Third-party transaction fees](https://help.shopify.com/en/manual/your-account/manage-billing/billing-charges/types-of-charges/third-party-charges/third-party-transaction-fees)
- Shopify — [Pricing (India)](https://www.shopify.com/in/pricing) — check for current prices and offers

*Prices and fees checked in November 2026. Shopify and payment gateways change pricing; confirm current figures before deciding.*
~~~~~~
<!-- END content/guides/shopify-store-cost-india.mdx -->

## `content/guides/shopify-vs-woocommerce-india.mdx`

<!-- BEGIN content/guides/shopify-vs-woocommerce-india.mdx -->
~~~~~~mdx
---
title: "Shopify vs WooCommerce for Indian D2C brands (2026)"
slug: "shopify-vs-woocommerce-india"
description: "Shopify or WooCommerce for an Indian D2C brand? An honest comparison of real costs, payment fees, COD, speed, SEO, maintenance and who each platform suits."
category: "Shopify"
featured: false
readMinutes: 8
date: "2026-11-13"
updated: "2026-11-13"
author: "Ritesh Kumar Singh"
authorRole: "Founder, AdsPeek"
primaryKeyword: "shopify vs woocommerce india"
secondaryKeywords: ["shopify or woocommerce for d2c", "woocommerce vs shopify cost india"]
faq:
  - q: "Is WooCommerce cheaper than Shopify in India?"
    a: "On paper, often yes: the WooCommerce plugin is free and Shopify adds a 0.6%–2% fee on online payments in India. But WooCommerce needs paid hosting, premium plugins, security and someone to maintain it. Once you count maintenance time, the gap is much smaller than it looks."
  - q: "Which is better for SEO, Shopify or WooCommerce?"
    a: "WooCommerce runs on WordPress and gives you more control over URLs and content. Shopify's SEO is good enough for most stores but uses fixed URL patterns like /products/ and /collections/. For a content-heavy brand, WordPress has the edge; for a product-led store, the difference rarely decides rankings."
  - q: "Can I switch from WooCommerce to Shopify later?"
    a: "Yes. Products, customers and order history can be moved, and 301 redirects protect your search rankings. See our WooCommerce to Shopify migration guide."
---

**Short answer:** choose **Shopify** if you want to spend your time selling, not maintaining a website, and you're fine paying a small fee on online payments. Choose **WooCommerce** if you have a developer on hand, need unusual custom functionality, or your brand runs on content and you already live in WordPress.

Most first-time D2C founders in India are better served by Shopify. Here's why, and when that changes.

## The core difference in one line

**Shopify is a hosted service** — you rent a store that Shopify runs, secures and updates. **WooCommerce is software** — a free WordPress plugin you install on hosting you pay for, and keep running yourself.

Everything else follows from that.

## Side-by-side

| | Shopify | WooCommerce |
|---|---|---|
| Software cost | Monthly plan (Basic ₹1,499/month on annual billing, before GST) | Free plugin |
| Hosting | Included | You buy and manage it |
| Security & updates | Handled by Shopify | Your job (or your developer's) |
| Extra fee on online payments in India | 2% / 1% / 0.6% by plan | None from WooCommerce |
| Cash on delivery | Built in; COD exempt from Shopify's fee | Built in |
| Checkout | Shopify's checkout, fast and consistent | Depends on theme and plugins |
| Speed out of the box | Generally good | Depends heavily on hosting and plugins |
| URL control (SEO) | Fixed patterns: /products/, /collections/ | Full control |
| Content / blogging | Basic built-in blog | WordPress — best in class |
| Customisation ceiling | High with apps, custom sections, or [headless](/guides/headless-shopify-when-worth-it) | Very high — it's open source |
| Who fixes it at 2am | Shopify's platform | You |

## Cost: the honest comparison

WooCommerce's main advantage in India is the **payment fee**. Because Shopify Payments isn't available in India, Shopify adds 2% (Basic), 1% (Grow) or 0.6% (Advanced) on every online payment, on top of your gateway's charge. WooCommerce doesn't add anything — you pay only the gateway.

On a store with ₹5 lakh of online payments a month on Shopify Basic, that's ₹10,000 a month to Shopify. That is real money. (We break down the full maths, including when to upgrade plans, in [How much does a Shopify store cost in India?](/guides/shopify-store-cost-india).)

But WooCommerce has costs that don't show up on a pricing page:

- **Hosting** that can handle sale-day traffic — cheap shared hosting is the most common reason WooCommerce stores feel slow.
- **Premium plugins** for things Shopify includes or does better (subscriptions, advanced shipping, some payment and invoicing features).
- **Maintenance:** WordPress core, theme and plugin updates; backups; security monitoring; fixing what an update breaks.
- **Developer time** — the biggest line, and the one most founders forget to price.

**Rule of thumb:** if you'd need to pay someone to keep WooCommerce healthy, compare *that monthly cost* against Shopify's fee. For most stores under a few lakh in monthly online revenue, Shopify comes out ahead once maintenance is counted.

## Payments and COD in India

Both platforms support Indian gateways (Razorpay, Cashfree, PayU, PhonePe) and cash on delivery.

Two India-specific points:
1. **COD orders are exempt from Shopify's third-party fee**, so a COD-heavy store pays less to Shopify than the headline 2% suggests.
2. **COD returns hurt both platforms equally.** The fix is process, not platform: confirming COD orders on WhatsApp before you ship. See [our COD confirmation guide](/guides/cod-confirmation-whatsapp).

## Speed and reliability

Shopify runs your store on its own infrastructure and checkout. You don't think about servers, and sale days are rarely a problem.

WooCommerce can be very fast — but only if someone sets it up well: good hosting, caching, a lean theme and few plugins. A poorly hosted WooCommerce store during a festive sale is a common horror story.

## SEO

This one is closer than people think.

- **WooCommerce** gives you full control of URLs, structured data and content, and WordPress is the best blogging tool there is.
- **Shopify** has solid technical SEO for stores, but its URL patterns are fixed (`/products/…`, `/collections/…`), and its blog is basic.

For a **product-led** brand — most D2C — the platform rarely decides your rankings. Product pages, collection pages, speed and content do. For a **content-led** brand that publishes a lot, WordPress has a genuine edge (and you can always run a WordPress blog alongside a Shopify store).

## Who should choose which

**Choose Shopify if:**
- You're launching your first store or rebuilding a messy one.
- You don't have (or don't want to pay) a developer on retainer.
- You want ads, automations and apps that plug in quickly.
- You plan to scale and want a platform that handles sale-day traffic.

**Choose WooCommerce if:**
- Your online payments are high and margins thin enough that 1–2% decides profitability — *and* you have reliable technical help.
- You need very custom functionality that's awkward on Shopify.
- Your business is content-first and already runs on WordPress.

## Our take

We build on both, and we recommend Shopify for most Indian D2C brands we meet — not because WooCommerce is bad, but because founders' time is the scarcest resource, and Shopify gives most of it back. The payment fee is a known, predictable cost; WooCommerce maintenance is an unpredictable one.

Already on WooCommerce and thinking of moving? Read [how to migrate from WooCommerce to Shopify without losing SEO](/guides/woocommerce-to-shopify-migration-seo), or [build your Shopify package](/shopify-development#build) and we'll quote the migration.

---

### Sources
- Razorpay — [Shopify payment gateway cost in India](https://razorpay.com/blog/shopify-payment-gateway-cost-india/) (Shopify Payments unavailable in India; third-party fees by plan; COD exemption)
- Shopify Help Center — [Third-party transaction fees](https://help.shopify.com/en/manual/your-account/manage-billing/billing-charges/types-of-charges/third-party-charges/third-party-transaction-fees)

*Checked in November 2026. Platform pricing changes; confirm current figures before deciding.*
~~~~~~
<!-- END content/guides/shopify-vs-woocommerce-india.mdx -->

## `content/guides/woocommerce-to-shopify-migration-seo.mdx`

<!-- BEGIN content/guides/woocommerce-to-shopify-migration-seo.mdx -->
~~~~~~mdx
---
title: "Move from WooCommerce to Shopify without losing SEO"
slug: "woocommerce-to-shopify-migration-seo"
description: "A step-by-step WooCommerce to Shopify migration plan that protects your Google rankings: URL mapping, 301 redirects, data migration, launch-day checks and what to monitor after."
category: "Migration"
featured: false
readMinutes: 9
date: "2026-11-13"
updated: "2026-11-13"
author: "Ritesh Kumar Singh"
authorRole: "Founder, AdsPeek"
primaryKeyword: "woocommerce to shopify migration"
secondaryKeywords: ["migrate woocommerce to shopify without losing seo", "woocommerce shopify redirects", "shopify migration india"]
faq:
  - q: "Will I lose Google rankings when I move to Shopify?"
    a: "Not if every old URL is 301-redirected to its new equivalent and your page titles, descriptions and content come across. Expect some movement for a few weeks while Google re-crawls; a properly mapped migration usually settles back."
  - q: "Do my URLs change?"
    a: "Yes. Shopify uses fixed patterns — /products/ for products and /collections/ for categories — so WooCommerce URLs like /product/… and /product-category/… must each be redirected."
  - q: "Can I move my order history and customers?"
    a: "Yes, with a migration app such as Shopify's Store Migration app or Matrixify. Customers can't bring their old passwords; they'll set a new one through an account invite."
  - q: "How long does a migration take?"
    a: "It depends on catalogue size, custom data and design work. The data move itself is quick; the planning, redirects, design and testing take most of the time."
---

**Short answer:** export everything, map every old URL to its new Shopify URL, move the data with a migration app, rebuild the design, set up **301 redirects for every changed URL**, test, then switch the domain and watch Google Search Console closely for a month. The redirect map is what protects your rankings — don't skip it.

## Why URLs are the risky part

WooCommerce and Shopify structure URLs differently, and Shopify's patterns can't be changed:

| Page | WooCommerce (default) | Shopify |
|---|---|---|
| Product | `/product/blue-kurta/` | `/products/blue-kurta` |
| Category | `/product-category/kurtas/` | `/collections/kurtas` |
| Page | `/about-us/` | `/pages/about-us` |
| Blog post | `/my-post/` (varies) | `/blogs/news/my-post` |

Every URL that Google has indexed, and every link other sites point to, needs a **301 redirect** to its new home. Without them, those pages return 404 and their rankings and link value disappear.

## Step 1: Audit before you touch anything

- **Crawl the current site** (Screaming Frog or a similar crawler) and export every URL with its title, meta description and H1.
- **Export from Google Search Console** your top pages by clicks, and pages with backlinks.
- **List every plugin** and what it does — each needs a Shopify equivalent (built-in feature, app, or custom code).
- **Note custom data** — product attributes, size charts, custom fields. On Shopify these usually become **metafields**.
- **Back up** the WooCommerce site and database.

## Step 2: Build the redirect map

A spreadsheet with two columns: **old URL → new URL**. Start with patterns, then fix exceptions:

- `/product/{slug}/` → `/products/{slug}`
- `/product-category/{slug}/` → `/collections/{slug}`
- Pages → `/pages/{slug}`
- Posts → `/blogs/{blog}/{slug}`

Then check by hand: your top 50 pages by traffic, anything with backlinks, and URLs whose slugs will change. Never redirect everything to the homepage — Google treats that like a broken page.

## Step 3: Move the data

Options:
- **Shopify's Store Migration app** — connects to WooCommerce and moves products; good for simpler stores.
- **Matrixify** — handles large catalogues, variants, custom fields to metafields, customers and order history, and can import redirects in bulk.
- **Paid migration services** (such as LitExtension or Cart2Cart) — hands-off moves for standard data.

Things to check after import: variants and options, images and alt text, prices and compare-at prices, inventory, SEO titles and descriptions, product reviews (export and import through your reviews app), customer accounts (customers will set new passwords via an account invite).

## Step 4: Rebuild the store, keep the SEO content

Design is the fun part, but protect what ranks:
- Keep **product and collection descriptions** — don't shorten text on pages that bring traffic.
- Carry over **page titles and meta descriptions**.
- Keep **image alt text**.
- Make sure **structured data** (product, price, availability, reviews) is output by the new theme.
- Recreate important **content pages** and blog posts at their new URLs.

## Step 5: Import redirects and test

- Import the redirect CSV into Shopify (**URL Redirects** in the admin, or via Matrixify for large files).
- Test a sample of old URLs — at least your top 50 — and confirm each returns a **301** to the right page, not a chain of redirects.
- Place real test orders, including COD and each payment method.
- Check tracking (Meta Pixel, Conversions API, GA4) before switching the domain.

## Step 6: Launch day

- **Point the domain** to Shopify and set it as primary.
- **Submit the new sitemap** in Google Search Console (`yourdomain.com/sitemap.xml`).
- **Use URL inspection** on key pages to request indexing.
- Keep the old WooCommerce site **offline but backed up** — don't leave a second copy live.

## Step 7: Monitor for 4–8 weeks

- **Search Console → Pages:** watch for spikes in "Not found (404)" and fix them with extra redirects.
- **Performance:** compare clicks and impressions for your top pages week by week.
- **Crawl the old URL list again** after launch to confirm every redirect still works.

Some ranking movement in the first weeks is normal while Google re-crawls. Steady declines on specific pages usually point to a missing redirect or lost content on that page.

## Common mistakes

- Redirecting everything to the homepage.
- Forgetting category, page and blog URLs (only redirecting products).
- Dropping product descriptions or page titles in the new design.
- Launching without testing redirects.
- Leaving the old site live on a subdomain, creating duplicate content.

## Should you migrate at all?

If WooCommerce is working and you have reliable technical help, you may not need to. Read [Shopify vs WooCommerce for Indian D2C brands](/guides/shopify-vs-woocommerce-india) first. If maintenance, speed or sale-day stability are costing you, migration is usually worth it.

We handle WooCommerce to Shopify migrations including the redirect map and post-launch monitoring — choose **Move to Shopify** in the [package builder](/shopify-development#build).

---

### Sources
- Shopify Help Center — URL redirects (Online Store → Navigation/Content → URL redirects)
- Shopify Community — [Migrating from WooCommerce to Shopify](https://community.shopify.com/t/migrating-from-woocommerce-to-shopify-looking-for-advice/653418) (301 redirects, Search Console checks)
- eSEOspace — [How to migrate from WooCommerce to Shopify](https://eseospace.com/blog/migrate-woocommerce-to-shopify/) (Shopify's fixed URL structure; bulk redirects)
- Fudge — [Migrate from WooCommerce to Shopify](https://www.fudge.ai/guides/migrate-from-woocommerce-to-shopify/) (migration apps; testing redirects; monitoring 404s)

*Checked in November 2026.*
~~~~~~
<!-- END content/guides/woocommerce-to-shopify-migration-seo.mdx -->

## `data/cities.ts`

<!-- BEGIN data/cities.ts -->
~~~~~~ts
// AdsPeek — city page content (Shopify development by city)
// Route: /shopify-development/[slug]
// Each city has its own hero, local reasons, market text and FAQ. Never reuse one city's
// marketText or faq for another — duplicate city pages are treated as doorway pages by Google.
// [Square-bracket] values are placeholders to replace with real figures before launch.
// `sources` is for fact-checking only — do not render it on the page.

export type City = {
  slug: string;
  name: string;
  seoTitle: string;
  metaDescription: string;
  h1Lead: string; // text before the highlighted city name
  h1Highlight: string;
  heroText: string;
  office: string | null; // only Gurugram has a physical office
  meetings: string;
  storesBuilt: string;
  quote: string;
  whyLocalHeading: string;
  whyLocal: { title: string; text: string }[];
  marketHeading: string;
  marketText: string[];
  areas: string[];
  work: { category: string; location: string }[];
  faq: { q: string; a: string }[];
  nearby: string[];
  sources: { label: string; url: string }[];
};

export const CITIES: Record<string, City> = {
  gurugram: {
    slug: 'gurugram',
    name: 'Gurugram',
    seoTitle: 'Shopify Development Company in Gurugram | AdsPeek',
    metaDescription:
      'Shopify store design, development and growth for Gurugram brands. Meet us at our Sector 22 office. Custom packages, Indian payments and COD set up, ads and automation after launch.',
    h1Lead: 'Shopify development company in',
    h1Highlight: 'Gurugram',
    heroText:
      'We design and build Shopify stores for Gurugram brands, then run the ads and automations that turn the launch into steady sales. Our office is in Sector 22 — come over, or we will come to you.',
    office: 'Sector 22, Gurugram',
    meetings: 'In person or online',
    storesBuilt: '[XX] across NCR',
    quote: 'Within [24 hours]',
    whyLocalHeading: 'Why a Gurugram team',
    whyLocal: [
      { title: 'Meet in person', text: 'Workshops, design reviews and handover happen at our Sector 22 office or at yours — no time-zone gaps, no week-long email threads.' },
      { title: 'Built for Indian buyers', text: 'UPI and card gateways, COD with WhatsApp confirmation, Shiprocket or your courier, and GST invoices set up from day one.' },
      { title: 'One team after launch', text: 'The people who build your store run your Meta ads and automations, so nothing is lost in a hand-off between vendors.' },
      { title: 'Ready for NCR fulfilment', text: 'We set up shipping rules and courier integrations that work with the warehouses and 3PLs Gurugram brands already use along NH-48.' },
    ],
    marketHeading: 'Selling from Gurugram',
    marketText: [
      'Delhi NCR is India\'s largest D2C hub. Inc42\'s D2C report counts more than $3.5 billion raised by NCR-based D2C startups across 434 deals between 2015 and early 2026 — the most of any region — and Gurugram is home to some of the category\'s best-known brands, including Lenskart. That also means Gurugram buyers see well-built stores every day; a store that looks or loads like a template stands out for the wrong reasons.',
      'Fulfilment is close at hand. Farukh Nagar and the NH-48 corridor are two of the country\'s busiest e-commerce warehousing clusters, so Gurugram brands can promise fast delivery across North India — if the store\'s shipping rules, COD settings and courier integration are set up to match.',
      'Most Gurugram brands sell to two very different buyers at once: metro shoppers who pay online and expect next-day delivery, and buyers in smaller cities who prefer cash on delivery. We build stores that handle both — prepaid incentives, COD confirmation on WhatsApp, and delivery estimates shown before checkout.',
    ],
    areas: ['Cyber City', 'Golf Course Road', 'Sohna Road', 'Udyog Vihar', 'DLF Phases 1–5', 'MG Road', 'Sector 29', 'Golf Course Extension Road', 'Manesar'],
    work: [
      { category: '[Category]', location: 'Gurugram' },
      { category: '[Category]', location: 'Delhi NCR' },
      { category: '[Category]', location: '[City]' },
    ],
    faq: [
      { q: 'How much does a Shopify store cost in Gurugram?', a: 'It depends on the pages, integrations and automations you choose in our package builder — you get an itemised quote within [24 hours]. Stores start from [₹ PRICE]. For platform costs, see our guide to Shopify pricing in India.' },
      { q: 'Can we meet at your office?', a: 'Yes. We are in Sector 22, Gurugram. Book a time and come over, or we can visit you anywhere in Gurugram.' },
      { q: 'Do you set up Indian payment gateways, COD and GST invoices?', a: 'Yes — Razorpay, PhonePe, UPI, COD with WhatsApp confirmation and automatic GST invoices are all available as part of the setup.' },
      { q: 'Do you only work with Gurugram brands?', a: 'No. We work with brands across India and abroad. Gurugram and NCR clients simply get in-person meetings.' },
    ],
    nearby: ['delhi', 'noida', 'mumbai', 'bangalore'],
    sources: [
      { label: 'Inc42 — Delhi NCR emerges as India\'s top D2C hub', url: 'https://inc42.com/buzz/delhi-ncr-emerges-as-indias-top-d2c-hub/' },
      { label: 'Colliers via Square Feat — 13 key warehousing clusters (Farukh Nagar, NH-48)', url: 'https://squarefeatindia.com/13-key-clusters-to-drive-80-of-india-warehousing-demand/' },
    ],
  },

  delhi: {
    slug: 'delhi',
    name: 'Delhi',
    seoTitle: 'Shopify Development Company in Delhi | AdsPeek',
    metaDescription:
      'Shopify stores for Delhi brands and wholesalers going direct to consumer. Catalogue setup, COD and Indian payments, ads and automation. Meet us in Gurugram or online.',
    h1Lead: 'Shopify development company in',
    h1Highlight: 'Delhi',
    heroText:
      'We help Delhi brands and family businesses build their own Shopify store — from first catalogue to first campaign — and keep it selling with ads and automation. Our team is a short drive away in Gurugram.',
    office: null,
    meetings: 'At our Gurugram office, at yours, or online',
    storesBuilt: '[XX] across NCR',
    quote: 'Within [24 hours]',
    whyLocalHeading: 'Why AdsPeek for Delhi',
    whyLocal: [
      { title: 'From wholesale to your own brand', text: 'Many Delhi businesses already make or trade great products. We turn that catalogue into a branded store with retail pricing, size guides and product photography that sells.' },
      { title: 'Big catalogues, handled', text: 'Hundreds of SKUs with sizes and colours? We structure products, variants and collections so customers can actually find things — and so your team can manage them.' },
      { title: 'COD without the losses', text: 'Delhi brands sell all over North India, where cash on delivery is expected. We add WhatsApp confirmation before shipping to cut returns.' },
      { title: 'Close enough to meet', text: 'Our team is in Gurugram, so planning sessions and handover can happen face to face.' },
    ],
    marketHeading: 'Selling from Delhi',
    marketText: [
      'Delhi has some of India\'s oldest and busiest trading markets. Garment clusters such as Gandhi Nagar, Tank Road, Karol Bagh and Seelampur supply retailers and brands across the country — which is why so many Delhi businesses we speak to already have the product, the suppliers and the margins, but not a direct channel to the end customer.',
      'Going direct changes the job. Wholesale buyers order by the dozen and don\'t need persuading; online shoppers buy one piece at a time and need photos, sizing, reviews, delivery dates and an easy return policy before they pay. The store has to do the selling a shopkeeper used to do.',
      'For Delhi brands we usually start with three things: a clean catalogue structure (collections that match how people shop, not how stock is stored), a checkout that handles both prepaid and cash on delivery, and Meta ads that test which products and offers sell before scaling spend.',
    ],
    areas: ['Connaught Place', 'Karol Bagh', 'Gandhi Nagar', 'Chandni Chowk', 'Lajpat Nagar', 'Okhla', 'Saket', 'Rajouri Garden', 'Dwarka'],
    work: [
      { category: '[Category]', location: 'Delhi' },
      { category: '[Category]', location: 'Delhi NCR' },
      { category: '[Category]', location: '[City]' },
    ],
    faq: [
      { q: 'We sell wholesale today. Can you help us start selling online to consumers?', a: 'Yes. We set up retail pricing, product content, size guides and a store structure built for single-piece buyers, then run ads to test which products sell direct.' },
      { q: 'Can you handle a large catalogue?', a: 'Yes. Choose the catalogue size in our package builder; we import products with variants, organise collections and set up filters so customers can find things quickly.' },
      { q: 'Do you meet clients in Delhi?', a: 'Our office is in Sector 22, Gurugram, a short drive from South and West Delhi. We meet there, at your place by arrangement, or online.' },
      { q: 'Should we keep selling on marketplaces?', a: 'Usually yes, at first. Your own store gives you margins, customer data and repeat buyers that marketplaces don\'t. Many brands run both and shift ad spend to their store as it starts converting.' },
    ],
    nearby: ['gurugram', 'noida', 'mumbai', 'bangalore'],
    sources: [
      { label: 'Apparel Resources — Indian domestic jeans hubs (Gandhi Nagar, Tank Road, Seelampur, Karol Bagh)', url: 'https://apparelresources.com/business-news/manufacturing/indian-domestic-jeans-hubs-have-more-potential-to-grow-bangladesh-eyeing-the-market-too' },
    ],
  },

  noida: {
    slug: 'noida',
    name: 'Noida',
    seoTitle: 'Shopify Development Company in Noida | AdsPeek',
    metaDescription:
      'Shopify stores for Noida brands and apparel exporters launching their own label — in India and overseas. Multi-currency, catalogue setup, ads and automation.',
    h1Lead: 'Shopify development company in',
    h1Highlight: 'Noida',
    heroText:
      'Noida makes clothes for the world. We help Noida manufacturers and brands sell under their own name — with Shopify stores built for Indian buyers, overseas buyers, or both.',
    office: null,
    meetings: 'At our Gurugram office, at yours by arrangement, or online',
    storesBuilt: '[XX] across NCR',
    quote: 'Within [24 hours]',
    whyLocalHeading: 'Why AdsPeek for Noida',
    whyLocal: [
      { title: 'Exporter to brand', text: 'You already make to international standards. We help you present that quality to end customers — brand story, product pages, fabric and fit details.' },
      { title: 'Sell in India and abroad', text: 'Multi-currency pricing, international shipping rules and duties messaging for overseas buyers, alongside UPI and COD for India.' },
      { title: 'Size and fit, solved online', text: 'Apparel returns are mostly about fit. We build size guides, fit notes and model measurements into every product page.' },
      { title: 'NCR team', text: 'Our team is in Gurugram — close enough for planning sessions in person when you need them.' },
    ],
    marketHeading: 'Selling from Noida',
    marketText: [
      'Noida is known as India\'s "City of Apparel". The district has around 1,500 garment manufacturers and exporters, the Noida Apparel Export Cluster represents them, and the central government named Noida a "Town of Export Excellence" for apparel. Many units around Sector 63 and the Phase 2 Hosiery Complex supply global fashion brands.',
      'That expertise is exactly what a D2C brand needs and rarely has: reliable production, quality control and short sampling times. What exporters usually lack is the retail side — a brand, product content, a store and paid acquisition. That\'s the part we build.',
      'For Noida clients we often set up a store that can sell in two directions: to Indian buyers with UPI and cash on delivery, and to overseas buyers in their own currency with clear delivery times and duties information. Apparel online lives or dies on fit, so size guides and fit notes are part of every product template.',
    ],
    areas: ['Sector 18', 'Sector 62', 'Sector 63', 'Phase 2 (Hosiery Complex)', 'Sector 135–144', 'Noida Extension', 'Greater Noida'],
    work: [
      { category: '[Category]', location: 'Noida' },
      { category: '[Category]', location: 'Delhi NCR' },
      { category: '[Category]', location: '[City]' },
    ],
    faq: [
      { q: 'We are an apparel exporter. Can we launch our own brand on Shopify?', a: 'Yes. We help with the store, product content, size guides and launch ads. Many exporters start with a small, focused range and grow from there.' },
      { q: 'Can one store sell in India and abroad?', a: 'Yes. Shopify can show prices in local currencies and apply different shipping rules by country, while Indian customers still get UPI and cash on delivery.' },
      { q: 'How do you reduce returns for clothing?', a: 'Detailed size charts, fit notes, model measurements, honest photos — and WhatsApp confirmation for COD orders before they ship.' },
      { q: 'Where do we meet?', a: 'At our Sector 22, Gurugram office, at your unit by arrangement, or online.' },
    ],
    nearby: ['delhi', 'gurugram', 'mumbai', 'bangalore'],
    sources: [
      { label: 'ALCHEMPro — YEIDA allots 150 acres for Noida apparel park (~1,500 garment manufacturers and exporters)', url: 'https://www.alchempro.com/news/apparel-news/yeida-allots-150-acres-for-construction-of-8365-cr-noida-apparel-park-274868-newsdetails.htm' },
      { label: 'Textile Excellence — Noida is Town of Export Excellence for apparel', url: 'https://textileexcellence.com/single-news/5152/noida-is-town-of-export-excellence-for-apparel' },
      { label: 'UP Niryat — Gautam Buddh Nagar, "City of Apparels"', url: 'https://niryatapi.uplive.in/Home/HamaraPradeshDetails/22/Gautam%20Buddh%20Nagar(Noida)' },
    ],
  },

  mumbai: {
    slug: 'mumbai',
    name: 'Mumbai',
    seoTitle: 'Shopify Development Company for Mumbai Brands | AdsPeek',
    metaDescription:
      'Shopify stores and growth for Mumbai D2C brands — premium design, fast checkout, Meta ads and automation. Remote-first from our Gurugram studio, with clear weekly reporting.',
    h1Lead: 'Shopify development for',
    h1Highlight: 'Mumbai brands',
    heroText:
      'Mumbai is one of India\'s fastest-growing D2C hubs. We build premium Shopify stores for Mumbai brands and run the ads and automation behind them — remotely, with a clear plan and a weekly report.',
    office: null,
    meetings: 'Online — video calls and shared dashboards',
    storesBuilt: '[XX] for Mumbai brands',
    quote: 'Within [24 hours]',
    whyLocalHeading: 'How we work with Mumbai brands',
    whyLocal: [
      { title: 'Remote, not distant', text: 'Fixed weekly calls, a shared project board and one point of contact. You always know what is being built and when.' },
      { title: 'Premium design that converts', text: 'Mumbai brands compete on brand and content. We design stores that feel premium and still load fast on a phone.' },
      { title: 'Content-led commerce', text: 'Lookbooks, campaign landing pages and shoppable content that your team can update without a developer.' },
      { title: 'Fulfilment-ready', text: 'Courier and 3PL integrations, delivery estimates and COD rules that match how and where you ship.' },
    ],
    marketHeading: 'Selling from Mumbai',
    marketText: [
      'Mumbai is the country\'s second-largest D2C hub by deal count and its fastest growing. Inc42\'s D2C report counts more than 362 deals for Mumbai-based D2C startups between 2015 and early 2026, and a 27% funding CAGR between 2020 and 2025 — faster than Delhi NCR or Bengaluru. The report describes Mumbai as the centre of media and distribution for the category.',
      'Logistics is a real advantage. Bhiwandi, on the city\'s edge, is India\'s largest warehousing hub and a base for e-commerce and 3PL operators, so Mumbai brands can ship nationally from close to home.',
      'Mumbai brands tend to lead with content — campaigns, creators and a strong visual identity. The risk is a beautiful store that is slow or hard to update. We build stores where campaign pages and lookbooks are easy for your team to change, and keep pages light enough to load quickly on mobile.',
    ],
    areas: ['Lower Parel', 'Bandra', 'Andheri', 'BKC', 'Powai', 'Malad', 'Thane', 'Navi Mumbai', 'Bhiwandi'],
    work: [
      { category: '[Category]', location: 'Mumbai' },
      { category: '[Category]', location: '[City]' },
      { category: '[Category]', location: '[City]' },
    ],
    faq: [
      { q: 'You are based in Gurugram. How do you work with Mumbai brands?', a: 'Remotely, with a fixed rhythm: a kickoff call, weekly progress calls, a shared project board, and design reviews over video. After launch you get one clear weekly report.' },
      { q: 'Can our team update campaign pages without a developer?', a: 'Yes. We build reusable sections so your team can create landing pages and lookbooks from Shopify\'s editor.' },
      { q: 'Do you work with our existing 3PL or courier?', a: 'Yes. We integrate your courier or 3PL, set delivery estimates and shipping rules, and configure COD where you offer it.' },
      { q: 'How much does it cost?', a: 'Pick what you need in our package builder and you get an itemised quote within [24 hours]. Stores start from [₹ PRICE].' },
    ],
    nearby: ['bangalore', 'delhi', 'gurugram', 'noida'],
    sources: [
      { label: 'Inc42 — Delhi NCR emerges as India\'s top D2C hub (Mumbai deal count and funding CAGR)', url: 'https://inc42.com/buzz/delhi-ncr-emerges-as-indias-top-d2c-hub/' },
      { label: 'Colliers via Square Feat — Bhiwandi India\'s largest warehousing hub', url: 'https://squarefeatindia.com/13-key-clusters-to-drive-80-of-india-warehousing-demand/' },
    ],
  },

  bangalore: {
    slug: 'bangalore',
    name: 'Bengaluru',
    seoTitle: 'Shopify Development Company for Bengaluru (Bangalore) Brands | AdsPeek',
    metaDescription:
      'Shopify and headless Shopify development for Bengaluru D2C brands — integrations, automation, analytics and Meta ads. Remote-first from our Gurugram studio.',
    h1Lead: 'Shopify development for',
    h1Highlight: 'Bengaluru brands',
    heroText:
      'Bengaluru brands are built on product and data. We build Shopify and headless Shopify stores with the integrations, automation and tracking a tech-first D2C team expects — and run the growth after launch.',
    office: null,
    meetings: 'Online — video calls and shared dashboards',
    storesBuilt: '[XX] for Bengaluru brands',
    quote: 'Within [24 hours]',
    whyLocalHeading: 'How we work with Bengaluru brands',
    whyLocal: [
      { title: 'Theme or headless — honestly', text: 'We build both and tell you which one your roadmap actually needs, instead of selling the most expensive option.' },
      { title: 'Clean integrations', text: 'ERP and inventory sync, CRM, analytics and custom apps — documented, so your engineers can own them later.' },
      { title: 'Tracking you can trust', text: 'Meta Pixel with Conversions API, GA4 and server-side events set up and tested with real orders before launch.' },
      { title: 'Remote by design', text: 'Shared project board, weekly calls, pull requests your team can review.' },
    ],
    marketHeading: 'Selling from Bengaluru',
    marketText: [
      'Bengaluru is India\'s second-largest D2C hub. According to Inc42\'s Datalabs, Bengaluru D2C brands raised about $3.4 billion across 342 deals between 2015 and early 2026, second only to Delhi NCR, and the city is home to some of the country\'s best-funded consumer brands. Inc42 describes it as the centre of technology and product innovation in the category.',
      'That shapes what Bengaluru brands ask for. They often have in-house engineers, a growth team that lives in dashboards, and a roadmap with features that go beyond a standard theme — subscriptions, personalisation, custom bundles, or several storefronts on one catalogue.',
      'For those brands we\'re a build-and-grow partner: we architect the store (theme with custom sections, or headless when it\'s justified), wire up clean tracking and integrations, document everything so your team can own it, and run Meta ads and retention automation on top.',
    ],
    areas: ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Electronic City', 'Bellandur', 'Jayanagar', 'MG Road'],
    work: [
      { category: '[Category]', location: 'Bengaluru' },
      { category: '[Category]', location: '[City]' },
      { category: '[Category]', location: '[City]' },
    ],
    faq: [
      { q: 'Should we go headless?', a: 'Only if your roadmap needs it — app-like features, several storefronts or a CMS-driven content site, plus budget for ongoing development. Our guide "Headless Shopify: when is it worth it?" has a five-question checklist.' },
      { q: 'Can our engineers take over the code later?', a: 'Yes. We use your repository, document integrations and hand over cleanly. Many clients keep us for ads and automation after their team takes over the code.' },
      { q: 'Can you integrate our ERP or inventory system?', a: 'Yes — choose "Inventory / ERP sync" in the package builder and we scope it on the call.' },
      { q: 'How do you work with Bengaluru teams remotely?', a: 'Kickoff call, weekly progress calls, a shared board and code reviews. After launch, a weekly growth report.' },
    ],
    nearby: ['mumbai', 'delhi', 'gurugram', 'noida'],
    sources: [
      { label: 'Inc42 — Top funded ecommerce & D2C startups in Bengaluru (2026)', url: 'https://inc42.com/lists/list-of-ecommerce-d2c-startups-in-bengaluru/' },
      { label: 'Inc42 — Delhi NCR emerges as India\'s top D2C hub (Bengaluru as tech and product centre)', url: 'https://inc42.com/buzz/delhi-ncr-emerges-as-indias-top-d2c-hub/' },
    ],
  },
};

export const CITY_ORDER = ['gurugram', 'delhi', 'noida', 'mumbai', 'bangalore'];
~~~~~~
<!-- END data/cities.ts -->
