# AdsPeek website — Antigravity build prompts

Six pages, built section by section in Next.js 14 (App Router, TypeScript, Tailwind CSS).

## How to use
1. Put the folder `design-reference/` (from this zip) in the root of the repo. It holds the six approved designs as HTML files. Antigravity reads them only for **text and structure** — it never opens them in a browser.
2. Run the prompts **one at a time, in folder order**. Finish and check one before starting the next.
3. After each prompt, check the page at phone width and desktop width yourself, then commit **only the files that prompt touched**.
4. If you ask for a fix, ask it inside the same prompt's scope ("In Hero.tsx only, …") so other sections are never rewritten.

## Order
| Folder | What it builds | Prompts |
|---|---|---|
| 01-foundation | Tokens, fonts, shared components, header, footer, CTA band | 5 |
| 02-home | Homepage `/` | 11 |
| 03-shopify-service | Shopify Development + package builder `/shopify-development` | 9 |
| 04-contact | Contact `/contact` | 5 |
| 05-about | About `/about` | 6 |
| 06-city-page | City page template, first city Gurugram `/shopify-development/gurugram` | 9 |
| 07-guides | Blog index `/guides` | 6 |
| 08-final-qa | Responsive and link audit across all pages | 1 |

## Reference files
| Page | Route | Reference |
|---|---|---|
| Homepage | `/` | `design-reference/index.html` |
| Shopify Development | `/shopify-development` | `design-reference/shopify-development.html` |
| Contact | `/contact` | `design-reference/contact.html` |
| About | `/about` | `design-reference/about.html` |
| City — Gurugram | `/shopify-development/gurugram` | `design-reference/shopify-development-gurugram.html` |
| Guides | `/guides` | `design-reference/guides.html` |

## Breakpoints used in every prompt
- **Mobile:** below 640px (Tailwind default, no prefix)
- **Tablet:** 640–1023px (`sm:` and `md:`)
- **Desktop:** 1024px and wider (`lg:`); content never wider than 1280px

## Note on the reference files
The reference HTML shows arrows (→) on some buttons and links. **Leave them out** — your build rule is no arrows on buttons or links. Every prompt repeats this.

## About the reference files
The six files in `design-reference/` are fully responsive. Each one contains a `<style>` block with the exact tablet (max-width 1023px) and phone (max-width 639px) rules, and the class names on each element (`wrap sec`, `h1`, `h2`, `btnrow`, `swipe`, `cmp-cards`, `mbar` …) show which rule applies where. If a prompt and the reference ever disagree on a mobile detail, follow the prompt.

To see them yourself, open any file in a browser and make the window narrower; at 1023px the tablet layout kicks in, at 639px the phone layout.
