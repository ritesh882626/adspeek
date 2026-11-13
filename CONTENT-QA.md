# Content QA Report

Generated for AdsPeek build system (Tasks C0–C5).

---

## 1. Internal Links Verification

All internal links in the 7 guide MDX files, the 5 city pages, and cross-site navigation have been verified against existing Next.js routes.

### Guides Links
| Guide | Link Target | Status |
|---|---|---|
| `abandoned-cart-recovery-whatsapp-vs-email.mdx` | `/guides/cod-confirmation-whatsapp` | PASS (Resolves) |
| `abandoned-cart-recovery-whatsapp-vs-email.mdx` | `/shopify-development#build` | PASS (Resolves) |
| `cod-confirmation-whatsapp.mdx` | `/guides/abandoned-cart-recovery-whatsapp-vs-email` | PASS (Resolves) |
| `cod-confirmation-whatsapp.mdx` | `/shopify-development#build` | PASS (Resolves) |
| `headless-shopify-when-worth-it.mdx` | `/shopify-development#build` | PASS (Resolves) |
| `headless-shopify-when-worth-it.mdx` | `/guides/shopify-store-cost-india` | PASS (Resolves) |
| `meta-ads-new-shopify-store-first-90-days.mdx` | `/guides/cod-confirmation-whatsapp` | PASS (Resolves) |
| `meta-ads-new-shopify-store-first-90-days.mdx` | `/guides/abandoned-cart-recovery-whatsapp-vs-email` | PASS (Resolves) |
| `meta-ads-new-shopify-store-first-90-days.mdx` | `/#services` | PASS (Resolves) |
| `meta-ads-new-shopify-store-first-90-days.mdx` | `/shopify-development#build` | PASS (Resolves) |
| `shopify-store-cost-india.mdx` | `/guides/cod-confirmation-whatsapp` | PASS (Resolves) |
| `shopify-store-cost-india.mdx` | `/guides/headless-shopify-when-worth-it` | PASS (Resolves) |
| `shopify-store-cost-india.mdx` | `/shopify-development#build` | PASS (Resolves) |
| `shopify-store-cost-india.mdx` | `/shopify-development/gurugram` | PASS (Resolves) |
| `shopify-store-cost-india.mdx` | `/shopify-development/delhi` | PASS (Resolves) |
| `shopify-store-cost-india.mdx` | `/shopify-development/noida` | PASS (Resolves) |
| `shopify-vs-woocommerce-india.mdx` | `/guides/headless-shopify-when-worth-it` | PASS (Resolves) |
| `shopify-vs-woocommerce-india.mdx` | `/guides/shopify-store-cost-india` | PASS (Resolves) |
| `shopify-vs-woocommerce-india.mdx` | `/guides/cod-confirmation-whatsapp` | PASS (Resolves) |
| `shopify-vs-woocommerce-india.mdx` | `/guides/woocommerce-to-shopify-migration-seo` | PASS (Resolves) |
| `shopify-vs-woocommerce-india.mdx` | `/shopify-development#build` | PASS (Resolves) |
| `woocommerce-to-shopify-migration-seo.mdx` | `/guides/shopify-vs-woocommerce-india` | PASS (Resolves) |
| `woocommerce-to-shopify-migration-seo.mdx` | `/shopify-development#build` | PASS (Resolves) |

### City Pages Cross-Links
- All 5 city pages link to their 4 neighboring city hubs (`/shopify-development/[city]`) -> PASS.
- All 5 city pages link to 3 relevant guides -> PASS.
- Footer column 3 links to all 5 cities -> PASS.
- Homepage FAQ links to `/guides/shopify-store-cost-india` -> PASS.
- Service Overview links to `/guides/shopify-store-cost-india` -> PASS.
- Homepage Selected Work links to `/work` and case studies (`/work/krave-apparel`, `/work/aurora-skincare`, `/work/nova-tech`) -> PASS.

**Broken link count:** 0.

---

## 2. Remaining `[...]` Placeholders (By Page)

The following placeholders remain from source fact-checked copy and are awaiting owner business input before final public announcement:

### Guides
- `shopify-store-cost-india.mdx`:
  - `[YOUR PRICE]` (Placeholder for specific base build starting price)
- `meta-ads-new-shopify-store-first-90-days.mdx`:
  - Checkbox items `[ ]` (8 checklist boxes in the 90-day checklist)
- `headless-shopify-when-worth-it.mdx`:
  - Checkbox items `[ ]` (5 checklist boxes in the decision rubric)

### City Pages (`data/cities.ts`)
- **Gurugram:**
  - `storesBuilt`: `[XX] in Gurugram & Delhi NCR`
  - `faq`: `[₹ PRICE]` in pricing answer
  - `work`: 3 placeholder project items (`[Category]`, `[Client Name]`, `[Result]`)
- **Delhi:**
  - `storesBuilt`: `[XX] for Delhi brands`
  - `work`: 3 placeholder project items
- **Noida:**
  - `storesBuilt`: `[XX] for Noida brands`
  - `work`: 3 placeholder project items
- **Mumbai:**
  - `storesBuilt`: `[XX] for Mumbai brands`
  - `faq`: `[₹ PRICE]` in pricing answer
  - `work`: 3 placeholder project items
- **Bengaluru:**
  - `storesBuilt`: `[XX] for Bengaluru brands`
  - `work`: 3 placeholder project items

---

## 3. Metadata Length Audit

Target constraints: Title < 65 characters, Meta Description < 160 characters.

### City Pages
| Page | Title (Length) | Description (Length) | Notes |
|---|---|---|---|
| Gurugram | 49 chars | 180 chars | Description exceeds 160 chars (from source copy) |
| Delhi | 46 chars | 166 chars | Description exceeds 160 chars (from source copy) |
| Noida | 46 chars | 157 chars | PASS |
| Mumbai | 55 chars | 173 chars | Description exceeds 160 chars (from source copy) |
| Bengaluru | 70 chars | 156 chars | Title exceeds 65 chars (from source copy: "Shopify Development Company for Bengaluru (Bangalore) Brands \| AdsPeek") |

### Guides
| Guide | Title (Length) | Description (Length) | Notes |
|---|---|---|---|
| `abandoned-cart-recovery-whatsapp-vs-email` | 52 chars | 170 chars | Description exceeds 160 chars (from source frontmatter) |
| `cod-confirmation-whatsapp` | 56 chars | 162 chars | Description exceeds 160 chars (from source frontmatter) |
| `headless-shopify-when-worth-it` | 66 chars | 157 chars | Title exceeds 65 chars by 1 char |
| `meta-ads-new-shopify-store-first-90-days` | 61 chars | 183 chars | Description exceeds 160 chars (from source frontmatter) |
| `shopify-store-cost-india` | 71 chars | 181 chars | Title & desc exceed target (from source frontmatter) |
| `shopify-vs-woocommerce-india` | 61 chars | 155 chars | PASS |
| `woocommerce-to-shopify-migration-seo` | 61 chars | 177 chars | Description exceeds 160 chars (from source frontmatter) |

*Note: As per Golden Rule and Task instructions, source copy and frontmatter descriptions were preserved verbatim without alteration.*

---

## 4. Structured Data (JSON-LD) Output

Each page category outputs appropriate Schema.org structured data:

1. **Guide Articles (`/guides/[slug]`):**
   - `@type: "Article"` (headline, description, author, datePublished, dateModified, publisher)
   - `@type: "BreadcrumbList"` (hierarchical trail: Home > Guides > [Article Title])
   - `@type: "FAQPage"` (when `faq` exists in MDX frontmatter)

2. **City Landing Pages (`/shopify-development/[city]`):**
   - `@type: "ProfessionalService"` (name, url, address, areaServed, description)
   - `@type: "FAQPage"` (localized questions and answers)
   - `@type: "BreadcrumbList"` (Home > Shopify Development > [City Name])

3. **Homepage (`/`):**
   - `@type: "Organization"`
   - `@type: "WebSite"`
   - `@type: "FAQPage"` (including link to cost breakdown guide)

4. **Service Hub (`/shopify-development`):**
   - `@type: "Service"`
   - `@type: "BreadcrumbList"`

5. **Case Studies (`/work/[slug]`):**
   - `@type: "CreativeWork"` / `"Article"`
   - `@type: "BreadcrumbList"`

---

## 5. Duplicate Content Audit Across City Pages

- **Market Commentary Comparison:** Scanned all paragraphs in `marketText` across Gurugram, Delhi, Noida, Mumbai, and Bengaluru.
- **Result:** **0 duplicate paragraphs**. 100% unique city-specific context and local data (citing Inc42, Colliers, Delhi NCR hubs, Bhiwandi warehousing, Bengaluru D2C funding).

