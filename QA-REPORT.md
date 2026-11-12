# QA Report — Responsive, Rules & Link Audit

Generated: 2026-11-13
Scope: Home (`/`), Shopify Service (`/shopify-development`), Contact (`/contact`), About (`/about`), City Gurugram (`/shopify-development/gurugram`), Guides (`/guides`).

---

## 1. Responsive Check

| Page | Section | 360px | 768px | 1280px | Problem (if any) | Prompt file to fix it |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Global | Header & MobileMenu | Pass | Pass | Pass | None. Mobile menu drawer 100vw, clean nav | — |
| Global | Footer | Pass | Pass | Pass | None. Responsive 4-col to 1-col grid | — |
| `/` | Hero | Pass | Pass | Pass | None. Typography scales 44px to 74px, full-width mobile CTAs | — |
| `/` | TrustStrip | Pass | Pass | Pass | None. Flex-wrap with proper gap | — |
| `/` | Comparison | Pass | Pass | Pass | None. Mobile renders card view; desktop renders semantic table | — |
| `/` | ServicesList | Pass | Pass | Pass | None. Responsive flex/grid with 1px border dividers | — |
| `/` | GrowthSystem | Pass | Pass | Pass | None. 4 steps grid with responsive stack | — |
| `/` | SelectedWork | Pass | Pass | Pass | None. Desktop 3-col grid; mobile snap-scroll carousel | — |
| `/` | ProcessTimeline | Pass | Pass | Pass | None. 4-step process cards stack on mobile | — |
| `/` | WaysToWork | Pass | Pass | Pass | None. 2 columns stack on mobile | — |
| `/` | Faq | Pass | Pass | Pass | None. Accordion blocks stack cleanly | — |
| `/` | CtaBand | Pass | Pass | Pass | None. Mobile stacks heading and buttons | — |
| `/shopify-development` | Overview | Pass | Pass | Pass | None. Breadcrumb and spec card responsive | — |
| `/shopify-development` | BuilderSection | Pass | Pass | Pass | None. Steps 1-6 with sticky desktop summary panel and fixed mobile bottom bar | — |
| `/shopify-development` | Procedure | Pass | Pass | Pass | None. Responsive step grid | — |
| `/shopify-development` | RelatedWork | Pass | Pass | Pass | None. 3 cards stack on mobile | — |
| `/contact` | ContactHero | Pass | Pass | Pass | None. Breadcrumb and H1 responsive | — |
| `/contact` | ContactWays | Pass | Pass | Pass | None. WhatsApp first on mobile (<640px) | — |
| `/contact` | BriefForm | Pass | Pass | Pass | None. Form inputs 16px font, 48px height | — |
| `/contact` | NextSteps | Pass | Pass | Pass | None. 3 steps stack cleanly | — |
| `/contact` | Office | Pass | Pass | Pass | None. Sector 22 Gurugram card + map placeholder | — |
| `/about` | AboutHero | Pass | Pass | Pass | None. Typography scales properly | — |
| `/about` | Story | Pass | Pass | Pass | None. Text and photo placeholder stack on mobile | — |
| `/about` | Beliefs | Pass | Pass | Pass | None. 4 rules grid stacks cleanly | — |
| `/about` | Numbers | Pass | Pass | Pass | None. Forest band with 4 stats responsive | — |
| `/about` | Team | Pass | Pass | Pass | None. Founder and team cards responsive | — |
| `/shopify-development/gurugram` | CityHero | Pass | Pass | Pass | None. Local Gurugram H1 and spec card responsive | — |
| `/shopify-development/gurugram` | WhyLocal | Pass | Pass | Pass | None. 4 local NCR reasons grid | — |
| `/shopify-development/gurugram` | MarketContent | Pass | Pass | Pass | None. 2 columns stack on mobile | — |
| `/shopify-development/gurugram` | Areas | Pass | Pass | Pass | None. Flex-wrap tags with safe padding | — |
| `/shopify-development/gurugram` | BuilderBand | Pass | Pass | Pass | None. Forest band links to #build | — |
| `/shopify-development/gurugram` | NearbyWork | Pass | Pass | Pass | None. 3 NCR project cards responsive | — |
| `/shopify-development/gurugram` | CityFaq | Pass | Pass | Pass | None. Gurugram FAQs with FAQPage JSON-LD schema | — |
| `/shopify-development/gurugram` | OtherCities | Pass | Pass | Pass | None. Links to key hubs | — |
| `/guides` | GuidesHero | Pass | Pass | Pass | None. Left H1, right search box 48px tall | — |
| `/guides` | CategoryBar | Pass | Pass | Pass | None. Horizontal swipeable snap row on mobile | — |
| `/guides` | FeaturedGuide | Pass | Pass | Pass | None. 16:9 cover stacks above copy on mobile | — |
| `/guides` | GuideGrid | Pass | Pass | Pass | None. 3-col to 1-col grid with Load More | — |
| `/guides` | Newsletter | Pass | Pass | Pass | None. Responsive email input and button | — |

---

## 2. Rule Check

| Rule | Pass / Fail | Where |
| :--- | :--- | :--- |
| No animations or transitions | Pass | No transform animations, zoom, or smooth scroll. Hover changes color only. |
| No arrows on buttons or links | Pass | All arrow characters (`→`, `->`) stripped from CTAs and links across all pages. |
| Square corners only | Pass | Radius 0 everywhere (`rounded-none`, `--radius-card: 0`). |
| Only foundation colours used | Pass | `ink`, `paper`, `white`, `forest`, `accent`, `line`, `muted`, `body`. |
| Header sticky on all pages | Pass | Global sticky top bar with border-line and high contrast. |
| One `<h1>` per page | Pass | Each page template has exactly one primary semantic `<h1>`. |
| Every page has metadata | Pass | Unique `title`, `description`, and canonical `alternates` set on all routes. |

---

## 3. Link Audit

| Page | Link / button text | Destination | Exists? | Logic / why it goes there |
| :--- | :--- | :--- | :--- | :--- |
| Header | AdsPeek logo | `/` | Yes | Home |
| Header | Services | `/shopify-development` | Yes | Main service route |
| Header | Growth System | `/#growth` | Yes | Homepage Growth System section |
| Header | Work | `/#work` | Yes | Homepage Selected Work section |
| Header | Guides | `/guides` | Yes | Guides knowledge hub |
| Header | About | `/about` | Yes | About company page |
| Header | Book a call | `/contact` | Yes | Consultation booking page |
| `/` | Build your package | `/shopify-development#build` | Yes | Direct jump to interactive builder |
| `/` | Book a call | `/contact` | Yes | Contact page |
| `/` | View package details | `/shopify-development` | Yes | Service details page |
| `/` | View our services | `/shopify-development` | Yes | Service list |
| `/shopify-development` | Build your package | `/shopify-development#build` | Yes | Builder section |
| `/shopify-development` | Book a call | `/contact` | Yes | Contact page |
| `/contact` | WhatsApp us | `https://wa.me/919999999999` | External | WhatsApp direct chat |
| `/contact` | Book a call | `#cal` / `#brief` | In-page | Meeting and brief anchors |
| `/about` | Build your package | `/shopify-development#build` | Yes | Builder section |
| `/about` | Book a call | `/contact` | Yes | Contact page |
| `/shopify-development/gurugram` | Build your package | `/shopify-development#build` | Yes | Builder section |
| `/shopify-development/gurugram` | Visit our office | `/contact` | Yes | Contact / office details |
| `/guides` | Search / Category chips | `/guides?q=...&category=...` | Yes | Search & filter parameters |
| `/guides` | Read the guide | `/questions/shopify-store-cost-india` | Yes | Question / article route |
| Footer | Gurugram | `/shopify-development/gurugram` | Yes | Localized city page |
| Footer | Privacy / Terms | `/privacy-policy` / `/terms` | Yes | Legal compliance pages |

Audit Result: PASSED. All routes compile and generate static HTML without errors.
