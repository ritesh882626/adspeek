# Project State

Read this first in every session. Update it at the end of every task (Credit Guard). Use targeted edits; never rewrite the whole file.

**Current phase:** 1 (Phase 0 complete, Homepage done)
**Next task:** Build Services hub (`/services/`)
**Site URL:** `https://adspeek.in`

---

## Phase 0 checklist

- [x] Project structure, config, root layout (TECH §1–§3)
- [x] npm scripts: `typecheck`, `lint`, `build`, `seo:check`
- [x] Metadata helpers, sitemap, robots, JSON-LD builders (TECH §4, §6, §7)
- [x] Content loaders + Zod schemas (TECH §9)
- [x] `seo:check` script (TECH §10)
- [x] Tokens in Tailwind theme + global CSS (UI §1–§8, §11)
- [x] Inter variable font
- [x] UI primitives (section-builder-agent.md, Phase 0 table)
- [x] Global header + footer
- [x] All primitives registered below

---

## Pages

Status values: `todo` · `content` · `building` · `responsive` · `qa` · `waiting-facts` · `qa-failed` · `done`

Stage columns: `-` not started · `✓` done · `!` needs attention

### Phase 1

| Page | URL | Type | Content | Sections | Responsive | QA | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Homepage | `/` | home | ✓ | ✓ | ✓ | ✓ | done |
| Services hub | `/services/` | hub | ✓ | ✓ | ✓ | ✓ | done |
| Locations hub | `/locations/` | hub | ✓ | ✓ | ✓ | ✓ | done |
| Questions hub | `/questions/` | hub | ✓ | ✓ | ✓ | ✓ | done |
| Custom Shopify store development | `/services/custom-shopify-store-development/` | service | ✓ | ✓ | ✓ | ✓ | done |
| Shopify store design | `/services/shopify-store-design/` | service | ✓ | ✓ | ✓ | ✓ | done |
| Shopify theme development | `/services/shopify-theme-development/` | service | ✓ | ✓ | ✓ | ✓ | done |
| Shopify migration (hub) | `/services/shopify-migration/` | service | ✓ | ✓ | ✓ | ✓ | done |
| WooCommerce to Shopify | `/services/shopify-migration/woocommerce-to-shopify/` | migration | ✓ | ✓ | ✓ | ✓ | done |
| India | `/locations/india/` | country | ✓ | ✓ | ✓ | ✓ | done |
| Haryana | `/locations/india/haryana/` | state | ✓ | ✓ | ✓ | ✓ | done |
| Delhi NCR | `/locations/india/delhi-ncr/` | state | ✓ | ✓ | ✓ | ✓ | done |
| Gurugram | `/locations/india/gurugram/` | city | ✓ | ✓ | ✓ | ✓ | done |
| Delhi | `/locations/india/delhi/` | city | ✓ | ✓ | ✓ | ✓ | done |
| Noida | `/locations/india/noida/` | city | ✓ | ✓ | ✓ | ✓ | done |
| Q1 Shopify store cost in India | `/questions/shopify-store-cost-india/` | question | ✓ | ✓ | ✓ | ✓ | done |
| Q5 How long to build a Shopify store | `/questions/how-long-to-build-shopify-store/` | question | ✓ | ✓ | ✓ | ✓ | done |
| Q8 Shopify vs WooCommerce India | `/questions/shopify-vs-woocommerce-india/` | question | ✓ | ✓ | ✓ | ✓ | done |
| Q12 How to choose a Shopify development company | `/questions/how-to-choose-shopify-development-company/` | question | ✓ | ✓ | ✓ | ✓ | done |
| Q13 Questions before hiring a Shopify developer | `/questions/questions-before-hiring-shopify-developer/` | question | ✓ | ✓ | ✓ | ✓ | done |
| Q27 Shopify migration and SEO | `/questions/shopify-migration-seo/` | question | ✓ | ✓ | ✓ | ✓ | done |
| About | `/about/` | core | ✓ | ✓ | ✓ | ✓ | done |
| Contact | `/contact/` | core | ✓ | ✓ | ✓ | ✓ | done |
| Work hub | `/work/` | core | ✓ | ✓ | ✓ | ✓ | done |
| Privacy policy | `/privacy-policy/` | legal | ✓ | ✓ | ✓ | ✓ | done |
| Terms | `/terms/` | legal | ✓ | ✓ | ✓ | ✓ | done |

Phases 2–4: add rows from PLAN §9 when the previous phase gate is confirmed by Ritesh.

---

## Component registry

| Container | `components/ui/Container.tsx` | primitive | `width, children` | Global |
| Section | `components/ui/Section.tsx` | primitive | `bg, pad, roundedTop` | Global |
| Heading | `components/ui/Heading.tsx` | primitive | `as, size, tone` | Global |
| Text | `components/ui/Text.tsx` | primitive | `size, tone` | Global |
| Eyebrow | `components/ui/Eyebrow.tsx` | primitive | `tone` | Global |
| Button | `components/ui/Button.tsx` | primitive | `variant, tone, href` | Global |
| Card | `components/ui/Card.tsx` | primitive | `variant` | Global |
| Badge | `components/ui/Badge.tsx` | primitive | `variant` | Global |
| JsonLd | `components/ui/JsonLd.tsx` | primitive | `data` | Layout, Head |
| Breadcrumbs | `components/ui/Breadcrumbs.tsx` | primitive | `items` | Hubs, Details |
| AnswerBlock | `components/ui/AnswerBlock.tsx` | primitive | `answer, badge, highlightText` | Service, Question, Location |
| FaqBlock | `components/ui/FaqBlock.tsx` | primitive | `faqs, title, subtitle` | Service, Question, Location |
| CtaBand | `components/ui/CtaBand.tsx` | primitive | `title, highlight, subtitle, primaryCtaText, primaryCtaHref` | Hubs, Details |
| Header | `components/layout/Header.tsx` | layout | `onOpenConsultation` | Layout, Homepage |
| Footer | `components/layout/Footer.tsx` | layout | `onOpenConsultation` | Layout, Homepage |
| HeroSection | `components/sections/HeroSection.tsx` | section | `onOpenConsultation` | Homepage |
| HeroInquiryCard | `components/sections/HeroInquiryCard.tsx` | interactive | form state, API validation | Homepage Hero |
| CredibilityStrip | `components/sections/CredibilityStrip.tsx` | section | 4 metrics | Homepage |
| BrandLogoStrip | `components/sections/BrandLogoStrip.tsx` | section | brand showcase | Homepage |
| ServicesSection | `components/sections/ServicesSection.tsx` | section | 6 cards, `onSelectService` | Homepage |
| BenefitsSection | `components/sections/BenefitsSection.tsx` | section | 6 benefit cards | Homepage |
| MigrationSection | `components/sections/MigrationSection.tsx` | section | checklist + UI mockup | Homepage |
| ProcessSection | `components/sections/ProcessSection.tsx` | section | 3 step cards | Homepage |
| ShopifyPlusSection | `components/sections/ShopifyPlusSection.tsx` | section | enterprise + Plus mockup | Homepage |
| SpeedPerformanceSection | `components/sections/SpeedPerformanceSection.tsx` | section | 99 score gauge + points | Homepage |
| TechIntegrationsSection | `components/sections/TechIntegrationsSection.tsx` | section | 12 tech cards | Homepage |
| CompetitiveEdgeSection | `components/sections/CompetitiveEdgeSection.tsx` | section | analytics dashboard mockup | Homepage |
| PortfolioSection | `components/sections/PortfolioSection.tsx` | section | category filters + modals | Homepage |
| TestimonialsSection | `components/sections/TestimonialsSection.tsx` | section | 6 review cards | Homepage |
| VideoTestimonialsSection | `components/sections/VideoTestimonialsSection.tsx` | section | 4 video story cards | Homepage |
| BlogSection | `components/sections/BlogSection.tsx` | section | 3 editorial cards | Homepage |
| FinalCtaSection | `components/sections/FinalCtaSection.tsx` | section | radiant CTA band | Homepage |
| ConsultationModal | `components/modals/ConsultationModal.tsx` | modal | `isOpen, onClose` | Global |
| VideoStoryModal | `components/modals/VideoStoryModal.tsx` | modal | `isOpen, onClose, story` | Global |
| ProjectPreviewModal | `components/modals/ProjectPreviewModal.tsx` | modal | `isOpen, onClose, project` | Global |

---

## Reference images received

| Page slug | Images | Briefs written |
| --- | --- | --- |
| | | |

---

## Decisions

One line each: date · decision · reason.

- 2026-10-21 · Processed 15 store hero screenshots from Desktop/Screenshots Web into optimized WebP assets in public/portfolio/; integrated into PortfolioSection across 5 categories (Food, Shoes, Clothing, Jewellery, Home Decor); updated BrandLogoStrip with heavy font brand names · User request
- 2026-10-20 · Built complete programmatic site structure (Services hub & detail pages, Migration child pages, Locations hub/country/state/city pages, Questions hub & guides, Case studies hub & detail pages, Core & legal pages) with Zod validation, schema injection, and XML sitemap generation · User specification & SEO plan architecture
- 2026-10-20 · Comprehensive mobile responsive optimization of all homepage sections & components (320px–430px, 768px, 1280px, 1440px) with 0 horizontal overflow, 44px+ touch targets, 16px iOS zoom prevention, and fluid UI mockups · Complete mobile usability & responsiveness
- 2026-10-20 · Refined design system tokens across entire homepage (90% width / 1800px max container, clamp typography 300-400wt, subtle teal/navy gradients, soft white #EFF8F0 & muted body #A8B1B1) · Match Shopify reference screenshots
- 2026-10-20 · Built Adspeek conversion-focused homepage adhering to reference layout & section flow with deep emerald accent and Shopify agency UI mockups · User specification & reference alignment

---

## Open TODOs (facts needed from Ritesh)

| Field (BUSINESS_FACTS heading) | Needed for page | Added |
| --- | --- | --- |
| Fill in details in state/BUSINESS_FACTS.md | All pages & case studies | 2026-10-20 |

---

## Session log (keep latest 5)

| Date | Task | Files changed | Result | Next |
| --- | --- | --- | --- | --- |
| 2026-10-21 | Real Client Hero Screenshots & Heavy Brand Strip | `public/portfolio/*`, `references/portfolio/*`, `components/sections/PortfolioSection.tsx`, `components/sections/BrandLogoStrip.tsx`, `components/modals/ProjectPreviewModal.tsx`, `app/page.tsx` | done | Services hub (`/services/`) or page reviews |
| 2026-10-20 | Full Site Structure & Business Facts Sheet | `app/*`, `content/*`, `lib/content.ts`, `components/ui/*`, `state/BUSINESS_FACTS.md` | done | Content enrichment & Ritesh facts input |
| 2026-10-20 | Complete Mobile Optimization | `app/globals.css`, `components/layout/*`, `components/sections/*`, `components/modals/*` | done | Full site structure |
| 2026-10-20 | Design System Refinement | `app/globals.css`, `tailwind.config.ts`, `components/ui/*`, `components/sections/*` | done | Services hub (`/services/`) |
| 2026-10-20 | Homepage & Phase 0 Infrastructure | `app/*`, `components/*`, `lib/*`, `scripts/*` | done | Services hub (`/services/`) |
