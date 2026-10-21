# AdsPeek SEO Plan: "Shopify Development Company"

Build spec for the AdsPeek website. One main keyword, supported by service pages, location pages (country, state, city) and question pages.

- **Main keyword:** `Shopify development company`
- **Main page:** Homepage (`/`)
- **Business:** AdsPeek, Shopify development agency, Sector 22, Gurugram, Haryana, India
- **Positioning:** Premium Shopify builds for D2C and luxury brands, India-based team serving India and overseas
- **Site URL placeholder:** `{{SITE_URL}}` (replace with the live domain, e.g. `https://www.example.com`)
- **Companion file:** `adspeek-seo-technical-guide.md` (how to code it)

> Search volumes in this file are estimates, not tool data. Verify in Google Keyword Planner or Semrush before final copy is written.

---

## 0. How to use this file (for Antigravity)

1. Don't read this whole file. Open only the sections `state/CONTEXT_INDEX.md` lists for the current task. Build **one phase at a time** (section 9). Do not build all pages in one pass.
2. Every page belongs to one **page type** (section 2). Each page type has a fixed template (section 4).
3. Every page must pass the **acceptance checklist** (section 8) before it is marked done.
4. Location and question pages are generated from **data files**, not hand-written HTML. A page whose data file is missing required fields must not be published (it stays `noindex` and out of the sitemap).
5. Never invent client names, results, numbers, addresses or reviews. If a field needs a fact you don't have, leave a `TODO:` marker and list it in the phase report.

---

## 1. Keyword strategy

### 1.1 The main keyword

| Item | Value |
| --- | --- |
| Main keyword | Shopify development company |
| Close variants (same page) | Shopify development agency, Shopify agency, Shopify experts, Shopify developers, Shopify web development company |
| Intent | Hire |
| Target page | `/` (homepage) |
| Est. volume, India | 300–1,000 / month |
| Est. volume, global | Several thousand / month |
| Difficulty | High globally; Medium in India |

**Why this keyword:** it is the phrase buyers use when they are ready to hire. It also extends cleanly to every location: "Shopify development company in Gurugram", "... in Dubai", "... in the UK". One keyword, one naming pattern, hundreds of rankable pages.

### 1.2 How the supporting pages feed the main keyword

```
                         HOMEPAGE  (Shopify development company)
                                        |
        +----------------+--------------+---------------+----------------+
        |                |              |               |                |
   SERVICE PAGES    LOCATION HUB    QUESTION HUB    MIGRATION HUB     CASE STUDIES
   (what we build)  (where)         (what buyers    (moving to        (proof)
                       |             ask)           Shopify)
                  COUNTRY pages
                       |
                  STATE pages (only where needed)
                       |
                  CITY pages
```

- Every supporting page links **up** to the homepage using the main keyword (or a close variant) as anchor text, at least once.
- Every supporting page links **across** to 2–4 related pages.
- The homepage links **down** to every hub and to the top service pages.

### 1.3 Keyword map by page type

| Page type | Keyword pattern | Example |
| --- | --- | --- |
| Homepage | Shopify development company | Shopify development company |
| Service | [service] + Shopify | Shopify Plus development company |
| Country | Shopify development company in [country] | Shopify development company in the UAE |
| State | Shopify development company in [state] | Shopify development company in California |
| City | Shopify development company in [city] | Shopify development company in Gurugram |
| Question | The exact question | How much does a Shopify store cost in India? |
| Migration | [platform] to Shopify migration | WooCommerce to Shopify migration |

Secondary variants for every location page (use naturally in body copy, H2s and FAQ, never stuffed):
- Shopify developer in [place]
- Shopify agency in [place]
- Shopify experts in [place]
- Shopify website development in [place]
- Hire Shopify developer [place]

Indian city pages also cover both spellings where buyers still search the old name (Gurgaon / Gurugram, Bangalore / Bengaluru).

---

## 2. Site architecture

### 2.1 URL structure

All URLs: lowercase, hyphens, trailing slash, no file extensions, no query strings for content.

| Page type | URL pattern | Count (all phases) |
| --- | --- | --- |
| Homepage | `/` | 1 |
| Services hub | `/services/` | 1 |
| Service | `/services/{service-slug}/` | 13 |
| Migration hub | `/services/shopify-migration/` | (counted in services) |
| Migration child | `/services/shopify-migration/{platform}-to-shopify/` | 6 |
| Location hub | `/locations/` | 1 |
| Country | `/locations/{country}/` | 7 |
| State | `/locations/{country}/{state}/` | 10 |
| City | `/locations/{country}/{city}/` | 25 |
| Question hub | `/questions/` | 1 |
| Question | `/questions/{question-slug}/` | 30 |
| Case studies hub + items | `/work/`, `/work/{client-slug}/` | 1 + per client |
| About, Contact | `/about/`, `/contact/` | 2 |
| Legal | `/privacy-policy/`, `/terms/` | 2 |

**City pages sit under the country, not under the state.** The state page links to its cities. This keeps city URLs short and stable even in countries with no state pages.

**Slug collisions:** if a state and a city share a name, the city gets the suffix: `/locations/usa/new-york/` (state) and `/locations/usa/new-york-city/` (city).

### 2.2 Breadcrumbs

Breadcrumbs follow the logical hierarchy, including the state where one exists, even though the URL skips it:

`Home > Locations > USA > California > Los Angeles`

### 2.3 Navigation

- **Header:** Services (mega menu), Locations, Work, Questions, About, Contact (button).
- **Footer:** all service pages; all country pages; top 8 city pages; question hub; contact details; legal links.
- Header and footer must be rendered in the server HTML (not injected by JavaScript).

---

## 3. Page inventory

### 3.1 Service pages

| # | Page | URL slug | Primary keyword | Est. volume (India) | Phase |
| --- | --- | --- | --- | --- | --- |
| 1 | Custom Shopify store development | `custom-shopify-store-development` | custom Shopify store development | 100–300 | 1 |
| 2 | Shopify store design | `shopify-store-design` | Shopify website design | 200–600 | 1 |
| 3 | Shopify theme development | `shopify-theme-development` | custom Shopify theme development | 100–300 | 1 |
| 4 | Shopify migration (hub) | `shopify-migration` | Shopify migration services | 100–300 | 1 |
| 5 | Shopify Plus development | `shopify-plus-development` | Shopify Plus agency | 50–150 | 2 |
| 6 | Headless Shopify development | `headless-shopify-development` | headless Shopify agency | 30–100 | 2 |
| 7 | Shopify B2B and wholesale | `shopify-b2b-wholesale` | Shopify B2B development | 20–100 | 2 |
| 8 | Shopify app development | `shopify-app-development` | custom Shopify app development | 50–150 | 2 |
| 9 | Shopify speed optimization | `shopify-speed-optimization` | Shopify speed optimization service | 50–200 | 2 |
| 10 | Shopify CRO | `shopify-cro` | Shopify CRO agency | 30–100 | 3 |
| 11 | Shopify SEO | `shopify-seo` | Shopify SEO services | 100–400 | 3 |
| 12 | Shopify maintenance and support | `shopify-maintenance-support` | Shopify maintenance services | 50–150 | 3 |
| 13 | Meta ads for Shopify stores | `meta-ads-for-shopify` | Meta ads agency for Shopify | 20–80 | 3 |

### 3.2 Migration child pages (under `/services/shopify-migration/`)

| Page | URL slug | Primary keyword | Phase |
| --- | --- | --- | --- |
| WooCommerce to Shopify | `woocommerce-to-shopify` | WooCommerce to Shopify migration | 1 |
| WordPress to Shopify | `wordpress-to-shopify` | WordPress to Shopify migration | 2 |
| Wix to Shopify | `wix-to-shopify` | Wix to Shopify migration | 2 |
| Magento to Shopify | `magento-to-shopify` | Magento to Shopify migration | 3 |
| BigCommerce to Shopify | `bigcommerce-to-shopify` | BigCommerce to Shopify migration | 3 |
| Amazon and Flipkart sellers to Shopify | `amazon-flipkart-to-shopify` | Shopify for Amazon sellers | 2 |

### 3.3 Country pages

| Country | URL slug | Has state pages | Phase |
| --- | --- | --- | --- |
| India | `india` | Yes | 1 |
| United States | `usa` | Yes | 3 |
| United Kingdom | `uk` | No | 3 |
| United Arab Emirates | `uae` | No | 2 |
| Australia | `australia` | Yes | 3 |
| Canada | `canada` | No (add Ontario, British Columbia later if searches justify it) | 4 |
| Singapore | `singapore` | No (city-state; country page only) | 4 |

### 3.4 State pages (only where they help)

State pages are built only where people search by state or the country has many target cities. They are not built for the UK, UAE or Singapore.

| Country | State / region | URL | Cities linked | Phase |
| --- | --- | --- | --- | --- |
| India | Haryana | `/locations/india/haryana/` | Gurugram, Faridabad | 1 |
| India | Delhi NCR | `/locations/india/delhi-ncr/` | Delhi, Noida, Gurugram | 1 |
| India | Maharashtra | `/locations/india/maharashtra/` | Mumbai, Pune | 2 |
| India | Karnataka | `/locations/india/karnataka/` | Bengaluru | 2 |
| USA | New York | `/locations/usa/new-york/` | New York City | 3 |
| USA | California | `/locations/usa/california/` | Los Angeles, San Francisco | 3 |
| USA | Florida | `/locations/usa/florida/` | Miami | 4 |
| USA | Texas | `/locations/usa/texas/` | Austin | 4 |
| Australia | New South Wales | `/locations/australia/new-south-wales/` | Sydney | 3 |
| Australia | Victoria | `/locations/australia/victoria/` | Melbourne | 4 |

Delhi NCR is a region, not a state, but it is how buyers search. Treat it as a state-level page.

### 3.5 City pages

| City | Country | URL | Spelling variants to cover | Phase |
| --- | --- | --- | --- | --- |
| Gurugram | India | `/locations/india/gurugram/` | Gurgaon | 1 |
| Delhi | India | `/locations/india/delhi/` | New Delhi | 1 |
| Noida | India | `/locations/india/noida/` | | 1 |
| Mumbai | India | `/locations/india/mumbai/` | | 2 |
| Bengaluru | India | `/locations/india/bengaluru/` | Bangalore | 2 |
| Pune | India | `/locations/india/pune/` | | 2 |
| Hyderabad | India | `/locations/india/hyderabad/` | | 3 |
| Jaipur | India | `/locations/india/jaipur/` | | 3 |
| Ahmedabad | India | `/locations/india/ahmedabad/` | | 3 |
| Chennai | India | `/locations/india/chennai/` | | 4 |
| Faridabad | India | `/locations/india/faridabad/` | | 4 |
| Dubai | UAE | `/locations/uae/dubai/` | | 2 |
| Abu Dhabi | UAE | `/locations/uae/abu-dhabi/` | | 3 |
| London | UK | `/locations/uk/london/` | | 3 |
| Manchester | UK | `/locations/uk/manchester/` | | 4 |
| Birmingham | UK | `/locations/uk/birmingham/` | | 4 |
| New York City | USA | `/locations/usa/new-york-city/` | New York, NYC | 3 |
| Los Angeles | USA | `/locations/usa/los-angeles/` | LA | 3 |
| San Francisco | USA | `/locations/usa/san-francisco/` | | 4 |
| Miami | USA | `/locations/usa/miami/` | | 4 |
| Austin | USA | `/locations/usa/austin/` | | 4 |
| Sydney | Australia | `/locations/australia/sydney/` | | 3 |
| Melbourne | Australia | `/locations/australia/melbourne/` | | 4 |
| Toronto | Canada | `/locations/canada/toronto/` | | 4 |
| Vancouver | Canada | `/locations/canada/vancouver/` | | 4 |
| Singapore | Singapore | country page only | | 4 |

Do not add more cities until the Phase 1–2 location pages show impressions in Google Search Console.

### 3.6 Question pages

Each question page answers one buyer question. Grouped by topic; each group links to its matching service page.

| # | Question (= H1 and primary keyword) | Slug | Links to | Phase |
| --- | --- | --- | --- | --- |
| **Cost and value** | | | | |
| 1 | How much does a Shopify store cost in India? | `shopify-store-cost-india` | Custom store development | 1 |
| 2 | How much does a custom Shopify theme cost? | `custom-shopify-theme-cost` | Theme development | 2 |
| 3 | How much does Shopify Plus cost, and is it worth it? | `shopify-plus-cost-worth-it` | Shopify Plus | 2 |
| 4 | What does a Shopify agency charge for monthly maintenance? | `shopify-maintenance-cost` | Maintenance | 3 |
| **Timelines and process** | | | | |
| 5 | How long does it take to build a Shopify store? | `how-long-to-build-shopify-store` | Custom store development | 1 |
| 6 | What happens in a Shopify development project, step by step? | `shopify-development-process` | Homepage | 2 |
| 7 | What do I need to prepare before hiring a Shopify agency? | `prepare-before-hiring-shopify-agency` | Contact | 2 |
| **Choosing a platform** | | | | |
| 8 | Shopify vs WooCommerce: which is better in India? | `shopify-vs-woocommerce-india` | WooCommerce migration | 1 |
| 9 | Shopify vs Amazon Smart Commerce for Indian sellers | `shopify-vs-amazon-smart-commerce` | Amazon and Flipkart migration | 2 |
| 10 | Shopify vs Shopify Plus: when should you upgrade? | `shopify-vs-shopify-plus` | Shopify Plus | 3 |
| 11 | Is headless Shopify worth it? | `is-headless-shopify-worth-it` | Headless | 2 |
| **Hiring an agency** | | | | |
| 12 | How to choose a Shopify development company | `how-to-choose-shopify-development-company` | Homepage | 1 |
| 13 | Questions to ask before hiring a Shopify developer | `questions-before-hiring-shopify-developer` | Homepage | 1 |
| 14 | Shopify agency vs freelancer: which should you hire? | `shopify-agency-vs-freelancer` | Homepage | 2 |
| 15 | Is it safe to hire a Shopify developer from India? | `hire-shopify-developer-from-india` | Country pages | 2 |
| 16 | Will I own my Shopify store after the agency builds it? | `own-shopify-store-after-agency` | Homepage | 3 |
| **Marketplace sellers (Amazon / Flipkart)** | | | | |
| 17 | Should Amazon sellers build their own Shopify store? | `should-amazon-sellers-build-shopify-store` | Amazon and Flipkart migration | 2 |
| 18 | How to sync inventory between Amazon, Flipkart and Shopify | `sync-inventory-amazon-flipkart-shopify` | Amazon and Flipkart migration | 2 |
| 19 | Can I use Amazon FBA to fulfil Shopify orders? | `amazon-fba-shopify-orders` | Amazon and Flipkart migration | 3 |
| 20 | Will Amazon penalise me for having my own website? | `amazon-own-website-rules` | Amazon and Flipkart migration | 3 |
| **India operations** | | | | |
| 21 | How to set up COD on Shopify in India | `shopify-cod-setup-india` | Custom store development | 2 |
| 22 | How to reduce RTO on Shopify COD orders | `reduce-rto-shopify-cod` | Shopify CRO | 2 |
| 23 | Best payment gateways for Shopify in India | `best-payment-gateway-shopify-india` | Custom store development | 3 |
| 24 | How to generate GST invoices on Shopify | `shopify-gst-invoice` | Maintenance | 3 |
| **Going global** | | | | |
| 25 | How to sell internationally from India with Shopify | `sell-internationally-from-india-shopify` | Country pages | 2 |
| 26 | How to set up multi-currency on Shopify | `shopify-multi-currency-setup` | Shopify Plus | 3 |
| **Migration** | | | | |
| 27 | Will I lose SEO rankings when moving to Shopify? | `shopify-migration-seo` | Migration hub | 1 |
| 28 | How long does a Shopify migration take? | `how-long-shopify-migration` | Migration hub | 2 |
| **B2B** | | | | |
| 29 | Can Shopify handle B2B and wholesale? | `shopify-b2b-wholesale-capabilities` | B2B | 2 |
| 30 | What is Shopify B2B and who needs it? | `what-is-shopify-b2b` | B2B | 3 |

---

## 4. Page templates

Each template lists: title tag, meta description, H1, sections in order, minimum unique word count, schema, internal links.

Formulas use `{placeholders}` filled from the page's data file.

### 4.1 Homepage (`/`)

- **Title:** `Shopify Development Company | Premium Shopify Stores | AdsPeek` (≤ 60 characters target; trim brand if needed)
- **Meta description:** `AdsPeek is a Shopify development company building premium, fast, conversion-led Shopify stores for D2C and luxury brands in India and worldwide.` (≤ 155 characters)
- **H1:** `Shopify Development Company for Premium D2C Brands`
- **Min words:** 1,200
- **Sections:**
  1. Hero: H1, one-line value proposition, primary CTA (book a call), secondary CTA (WhatsApp)
  2. Proof bar: client logos, real stats only
  3. Services grid: links to top 8 service pages
  4. Selected work: 3–6 case studies with real results
  5. Process: 4–5 steps
  6. Industries served: the industries AdsPeek has real projects in
  7. Locations: "Serving brands in India, UAE, UK, USA and Australia", links to country pages
  8. Why AdsPeek: 4–6 specific differentiators (no generic claims)
  9. Pricing guide teaser: price ranges, link to question page #1
  10. FAQ: 6–8 questions (answer-first)
  11. Final CTA
- **Schema:** `Organization`, `ProfessionalService` (with the Gurugram address), `WebSite`, `FAQPage`
- **Links down:** all hubs, top 8 services, all country pages, 4 question pages

### 4.2 Service page (`/services/{slug}/`)

- **Title:** `{Service Name} Company | {Benefit} | AdsPeek`
- **Meta description:** `{Service} by AdsPeek, a Shopify development company. {One specific outcome}. Serving India and worldwide. Get a free consultation.`
- **H1:** `{Service Name}` + short qualifier, e.g. `Shopify Plus Development for Fast-Growing Brands`
- **Min words:** 1,000
- **Sections:**
  1. Hero: H1, 40–60 word direct answer to "what is this and who is it for", CTA
  2. What's included: list of deliverables
  3. Who it's for: 3–4 buyer situations
  4. Process for this service
  5. Relevant case study (real)
  6. Pricing range or "what affects the price"
  7. Comparison table where useful (e.g. theme vs custom)
  8. FAQ: 5–8 service-specific questions
  9. Related services (2–4 links) and related question pages (2–3 links)
  10. CTA
- **Schema:** `Service` (provider = Organization), `FAQPage`, `BreadcrumbList`
- **Links up:** homepage with anchor "Shopify development company" (once, in body)

### 4.3 Country page (`/locations/{country}/`)

- **Title:** `Shopify Development Company in {Country} | AdsPeek`
- **Meta description:** `Shopify development for brands in {Country}: custom stores, migrations and Shopify Plus. {Country-specific detail}. Free consultation.`
- **H1:** `Shopify Development Company in {Country}`
- **Min words:** 900 unique (not counting shared blocks)
- **Required unique data fields:** see section 5
- **Sections:**
  1. Hero: H1, 40–60 word answer (who we serve there, how we work with them)
  2. How we work with {Country} brands: time-zone overlap, meeting hours, currency, contracts
  3. {Country}-specific Shopify needs (payments, shipping, tax, regulations)
  4. Services (grid, links)
  5. States or cities we serve (links)
  6. Relevant work (real case study from that country or region, or the closest one)
  7. Pricing in local currency (ranges)
  8. FAQ: 5–6 country-specific questions
  9. CTA
- **Schema:** `Service` with `areaServed` = `Country`, `FAQPage`, `BreadcrumbList`. No `LocalBusiness` (no office there).

### 4.4 State page (`/locations/{country}/{state}/`)

- **Title:** `Shopify Development Company in {State} | AdsPeek`
- **H1:** `Shopify Development Company in {State}`
- **Min words:** 700 unique
- **Sections:** hero answer → state-level detail (main ecommerce industries in the state, cities) → city links → services → work → FAQ (4–5) → CTA
- **Schema:** `Service` with `areaServed` = `State`, `FAQPage`, `BreadcrumbList`

### 4.5 City page (`/locations/{country}/{city}/`)

- **Title:** `Shopify Development Company in {City} | AdsPeek`
- **Meta description:** `Hire a Shopify development company in {City}. Custom Shopify stores, redesigns and migrations for {City} brands. {Unique hook}.`
- **H1:** `Shopify Development Company in {City}`
- **Min words:** 800 unique
- **Required:** the 4 local elements (section 5.2)
- **Sections:**
  1. Hero: H1, 40–60 word direct answer, CTA, WhatsApp
  2. Why {City} brands work with AdsPeek: specific to the city
  3. Local proof: client or project from the city, or the nearest market, clearly labelled
  4. Services for {City} brands (links)
  5. Industries common in {City} that we've built for
  6. How we work with you: meetings, time zone, on-site visits (only if true, e.g. NCR)
  7. Pricing (local currency ranges)
  8. FAQ: 5–6 local questions
  9. Nearby locations (links to 2–4 other city pages and the parent state/country)
  10. CTA
- **Schema:** `Service` with `areaServed` = `City`, `FAQPage`, `BreadcrumbList`
- **Exception, Gurugram:** this is the office city. Use `ProfessionalService` (LocalBusiness subtype) with the real address, opening hours, map embed and Google Business Profile link.

### 4.6 Question page (`/questions/{slug}/`)

- **Title:** `{Question} ({Year}) | AdsPeek` (keep the question as written)
- **Meta description:** the first 150 characters of the direct answer
- **H1:** the question, exactly
- **Min words:** 900
- **Sections:**
  1. Direct answer: 40–60 words, standalone, includes the key number or fact
  2. Key facts table (where the topic has numbers, options or comparisons)
  3. Detailed explanation in 3–6 H2s, each phrased as a follow-up question
  4. "What AdsPeek recommends": an opinion with a reason
  5. Related questions (3 links)
  6. CTA to the matching service page
  7. Author box: real person, role, short bio
  8. "Last updated" date (visible)
- **Schema:** `Article` (with `author` = `Person`, `dateModified`), `FAQPage` only if the page has a visible FAQ block, `BreadcrumbList`

### 4.7 Hub pages (`/services/`, `/locations/`, `/questions/`)

- One H1, a 2–3 sentence intro, a grid or list of every child page with a one-line description each.
- `/locations/` shows countries, then states and cities under each.
- `/questions/` groups questions by topic (the groups in section 3.6).
- Schema: `CollectionPage`, `BreadcrumbList`.

---

## 5. Making location pages unique (anti-doorway rules)

Google can ignore or demote pages that only swap a city name. Every location page must carry facts no other location page has.

### 5.1 Required data fields per location

Store one data file per location (see technical guide). The build fails or the page stays `noindex` if any **required** field is empty.

| Field | Required | Example (Dubai) |
| --- | --- | --- |
| `name`, `slug`, `type` (country/state/city), `parent` | Yes | Dubai, dubai, city, uae |
| `heroAnswer` (40–60 words, unique) | Yes | Written for Dubai buyers |
| `timeZoneNote` | Yes | "Dubai is 1.5 hours behind India; full overlap 9am–6pm GST" |
| `currency`, `priceRangeLocal` | Yes | AED, "AED 12,000–60,000" (from real AdsPeek pricing) |
| `localNeeds` (3–5 bullets) | Yes | Arabic/English storefront, AED and USD pricing, VAT invoices, Tabby/Tamara BNPL |
| `paymentGateways` | Yes | Local gateways buyers expect |
| `proof` (case study ref or nearest market, labelled) | Yes | Real project only |
| `industries` (2–4) | Yes | Industries common there that AdsPeek has built for |
| `faqs` (4–6 unique Q&As) | Yes | Questions specific to that place |
| `nearby` (2–4 slugs) | Yes | abu-dhabi, uae |
| `spellingVariants` | No | |
| `onSiteVisits` | No | true only for NCR |

Facts like gateways, tax rules and time zones must be checked at the time of writing; don't rely on memory.

### 5.2 The 4 local elements every city page needs

1. **Local proof:** a client, project or case study from that market or the nearest one, clearly labelled.
2. **Local buying details:** time-zone overlap and meeting hours, local currency pricing, payment gateways common there.
3. **Local FAQs:** questions a buyer there would actually ask.
4. **Local links:** 2–3 relevant industry or service pages, plus nearby locations.

### 5.3 Uniqueness check

Before publishing, compare each location page's body text against every other location page. If two pages are more than about 60% similar in body text (excluding shared header, footer and service grid), the newer page is rewritten. The technical guide describes an automated check.

---

## 6. Internal linking rules

| From | To | How many | Anchor text |
| --- | --- | --- | --- |
| Every page | Homepage | 1 in body | "Shopify development company" or a close variant |
| Homepage | Every hub, top 8 services, all countries | All | Page name |
| Service page | Related services | 2–4 | Service name |
| Service page | Related question pages | 2–3 | The question |
| Country page | Its states (or cities if no states) | All | "Shopify development company in {place}" |
| State page | Its cities | All | Same pattern |
| City page | Parent state/country + nearby cities | 2–4 | Place name |
| Question page | Matching service page | 1–2 | Service name |
| Question page | Related questions | 3 | The question |

Rules:
- Vary anchor text across pages; don't use the exact main keyword on every link.
- No orphan pages: every page must be linked from at least one hub and one other page.
- No link may point to `#`, a placeholder or a 404.

---

## 7. AEO (getting cited by AI answers)

Applies to every page, most of all question pages.

1. **Answer first.** The first block under each H1 and each H2 is a 40–60 word direct answer that makes sense on its own.
2. **Question headings.** H2s phrased the way buyers ask ("How long does a migration take?").
3. **Tables for comparisons and prices.**
4. **Specific numbers from AdsPeek's own work** (timelines, price ranges, results). Never invented.
5. **Named author** on question pages, with a short bio and role.
6. **Visible "Last updated" date**, and real updates every quarter for the top pages.
7. **Schema** matching visible content (see technical guide).
8. **Crawler access:** allow search and AI-search crawlers in `robots.txt` (technical guide).
9. **Off-site mentions** (not built in code, but part of the plan): Clutch, GoodFirms, DesignRush and Shopify Partner Directory profiles; useful answers on Reddit r/shopify and r/ecommerce; one original-data article per quarter.

---

## 8. Acceptance checklist (every page)

A page is done only when all of these pass:

- [ ] Title tag present, unique, contains the page's primary keyword, ≤ 60 characters target
- [ ] Meta description present, unique, ≤ 155 characters
- [ ] Exactly one H1, containing the primary keyword
- [ ] Headings in order (H2 under H1, H3 under H2), no skipped levels
- [ ] First block under H1 is a 40–60 word direct answer
- [ ] Minimum unique word count for its page type met
- [ ] Self-referencing canonical URL, absolute, with trailing slash
- [ ] JSON-LD schema for its page type, valid in Google's Rich Results Test / Schema.org validator
- [ ] Breadcrumbs visible and in schema
- [ ] Link up to homepage; required cross-links present; no `#` or broken links
- [ ] All images have descriptive `alt` text, width and height, modern formats
- [ ] Page in `sitemap.xml` (only if indexable)
- [ ] Lighthouse mobile: Performance ≥ 90, SEO = 100, Accessibility ≥ 95 (run by Ritesh or CI after deploy; Antigravity does not open a browser to check)
- [ ] Core Web Vitals in range: LCP < 2.5 s, INP < 200 ms, CLS < 0.1
- [ ] No `TODO:` markers left in published content
- [ ] Location pages: all required data fields filled; uniqueness check passed

---

## 9. Build phases

Build in this order. Finish and verify each phase before starting the next.

### Phase 1: Foundation and India core (weeks 1–4)

- Technical foundation (technical guide sections 1–8)
- Homepage
- Hubs: `/services/`, `/locations/`, `/questions/`
- Services: custom store development, store design, theme development, migration hub
- Migration: WooCommerce to Shopify
- Locations: India (country); Haryana, Delhi NCR (states); Gurugram, Delhi, Noida (cities)
- Questions: #1, #5, #8, #12, #13, #27
- About, Contact, Work hub + available case studies, legal pages
- Google Search Console + Bing Webmaster Tools, sitemap submitted

**Gate to Phase 2:** all Phase 1 pages indexed in Search Console.

### Phase 2: Depth and first overseas market (months 2–3)

- Services: Shopify Plus, headless, B2B, app development, speed optimization
- Migrations: WordPress, Wix, Amazon and Flipkart sellers
- Locations: Maharashtra, Karnataka (states); Mumbai, Bengaluru, Pune (cities); UAE (country), Dubai (city)
- Questions: #2, #3, #6, #7, #9, #11, #14, #15, #17, #18, #21, #22, #25, #28, #29

**Gate to Phase 3:** India city pages ranking in the top 20 for their primary keyword.

### Phase 3: Global expansion (months 4–6)

- Services: CRO, SEO, maintenance, Meta ads for Shopify
- Migrations: Magento, BigCommerce
- Locations: USA, UK, Australia (countries); New York, California, New South Wales (states); New York City, Los Angeles, London, Sydney, Abu Dhabi, Hyderabad, Jaipur, Ahmedabad (cities)
- Questions: #4, #10, #16, #19, #20, #23, #24, #26, #30

**Gate to Phase 4:** overseas location pages showing impressions in Search Console.

### Phase 4: Scale (months 7–12)

- Locations: Canada, Singapore (countries); Florida, Texas, Victoria (states); remaining cities in section 3.5
- New question pages based on Search Console queries that AdsPeek appears for but doesn't have a page for
- Quarterly refresh of the top 10 pages

Optional extension once Phase 3 is live: industry pages (`/industries/{industry}/`, e.g. luxury, jewellery and watches, fashion, home décor and rugs), each backed by a real case study.

---

## 10. KPIs

| KPI | Month 3 | Month 6 | Month 12 |
| --- | --- | --- | --- |
| Indexed pages | 25 | 60 | 100+ |
| Keywords in Google top 10 | 10 | 40 | 100+ |
| Organic enquiries / month | 3–5 | 10–15 | 25+ |
| Referring domains | 20 | 50 | 100+ |
| AI answers naming AdsPeek (of 20 test questions) | 1–2 | 5 | 10 |

These are starting targets. Reset them at month 3 against real Search Console data.
