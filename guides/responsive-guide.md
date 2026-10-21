# Responsive Guide

How every AdsPeek page and section behaves on mobile, tablet and desktop. Used by the Responsive Agent and the Section Builder.

Antigravity does **not** open a browser, DevTools or device emulator to check layouts. Responsiveness is achieved by following these rules in code and verified by reading the code (section 10).

All sizes, colours and spacing come from `ui-ux-design-guide.md`. This file only decides **how layouts change** between screen sizes.

---

## 1. Device classes and breakpoints

| Device class | Width range | Breakpoints inside it | Tailwind prefix |
| --- | --- | --- | --- |
| Mobile | 0–639px | base, `xs` (340px) | none |
| Tablet | 640–1199px | `sm` (640px), `md` (900px) | `sm:`, `md:` |
| Desktop | 1200–1599px | `lg` (1200px) | `lg:` |
| Wide desktop | 1600px+ | `xl` (1600px) | `xl:` |

These are the design system's breakpoints, **not Tailwind defaults**. Configure them in the Tailwind theme before building anything.

Widths to reason about when writing code (no live testing; think through each):

| Mobile | Tablet | Desktop |
| --- | --- | --- |
| 340, 360, 390, 430 | 640, 768, 820, 1024 | 1280, 1440, 1600, 1920 |

---

## 2. Core rules

1. **Mobile first.** Base classes describe mobile. Add `sm:`, `md:`, `lg:` only where the layout changes.
2. **Fluid between breakpoints.** Use percentages, `fr`, `flex`, `max-width`. No fixed pixel widths on layout containers.
3. **No horizontal page scroll** at any width. Only deliberate carousels scroll sideways, inside their own container.
4. **Type and spacing scale through tokens.** Never hand-write a font size or gap per breakpoint inside a section; the tokens already change at 900px and 1200px.
5. **Same content on every device.** Don't hide meaningful content on mobile. Reorder or collapse it instead (accordion, carousel).
6. **No device detection** in JavaScript to change layout. CSS only. JS is allowed only for behaviour (menu open/close, carousel).
7. **Touch first.** Nothing important may depend on hover.

---

## 3. Choosing how an element adapts

When a row of items doesn't fit, pick the first option that works:

| Situation | Behaviour | How |
| --- | --- | --- |
| 2–4 items, each needs full reading width on mobile | **Stack** | `grid-cols-1 md:grid-cols-3` |
| Many small items (logos, tags, chips) | **Wrap** | `flex flex-wrap gap-…` |
| 4+ similar cards people browse, not compare | **Scroll** (carousel) on mobile/tablet, grid on desktop | `flex overflow-x-auto snap-x snap-mandatory` below `lg`, `lg:grid lg:grid-cols-4` |
| Data people compare across columns | **Scroll the table** inside its own container, first column sticky; or convert each row to a card on mobile | section 6 |
| Long secondary content (FAQ answers, specs) | **Collapse** (accordion) | `<details>` |
| Decorative visual that crowds the layout | **Shrink or reposition** (never remove if it carries meaning) | smaller aspect ratio, move below text |
| Purely decorative element with no meaning | **Hide** on mobile | `hidden md:block` |

Never shrink text below the token sizes to make something fit.

---

## 4. Section patterns

Each section type below states its mobile → tablet → desktop behaviour. When a reference image shows a section, find its type here and apply these rules.

| Section type | Mobile (< 640) | Tablet (640–1199) | Desktop (≥ 1200) |
| --- | --- | --- | --- |
| **Header** | Logo + menu button + primary CTA (if it fits; else CTA inside menu). Full-screen menu panel | Same as mobile (hamburger below 1200px) | Full nav with mega menus, Log in + primary CTA on the right |
| **Hero** | Left-aligned stack: eyebrow → H1 (`dsp`) → subhead → buttons full width → visual below | Buttons auto width side by side; visual below or beside from `md` | Text and visual side by side or text over visual, per reference |
| **Logo strip** | Wrap 2–3 per row, or one auto-scrolling row | Single row, wrap if needed | Single row |
| **Feature cards (3)** | Stack, 1 column | 1 column at `sm`; 3 columns from `md` | 3 columns |
| **Feature cards (4+)** | Carousel with snap, card width ~85% so the next card peeks | Carousel, card width ~45% | Grid, 4 columns |
| **Image + text (split)** | Image above text (unless reference puts text first for a reason) | Side by side from `md`, 6/6 or 7/5 of 12 | Same |
| **Alternating split rows** | All rows image-then-text (don't alternate on mobile) | Alternate from `md` | Alternate |
| **Statistics** | 2 columns | 2 columns at `sm`, 4 from `md` | 4 columns |
| **Steps (1-2-3)** | Stack with number above each step | Stack at `sm`, 3 columns from `md` | 3 columns |
| **Testimonials / stories** | Carousel, one card at a time with peek | Carousel, 2 visible | 3-column grid |
| **Case study grid** | 1 column | 2 columns | 3 columns |
| **Tabs** | Horizontal scrollable tab bar, or accordion if labels are long | Tab bar | Tab bar |
| **FAQ** | Accordion, full width | Accordion, max width `container-4xl` | Heading left (4 cols), accordion right (8 cols) |
| **Pricing / plan cards** | Stack, featured plan first | 2 columns or carousel | 3–4 columns |
| **Comparison table** | Scrollable table with sticky first column, or card per row | Scrollable table | Full table |
| **Form + text** | Text above form; form full width | Side by side from `md` | Side by side |
| **CTA band** | Stack, buttons full width | Buttons auto width | Same, centred if reference is centred |
| **Footer** | 1 column; link groups as accordions | 2 columns at `sm`, 4 from `md` | 4 link columns + bottom bar |

Grid columns follow the design system: 4 on mobile, 8 from `sm`, 12 from `md`.

---

## 5. Typography and spacing

- Use the type tokens (`dsp`, `t1`–`t8`, `body-*`). They already change at 900px and 1200px. Don't add per-section breakpoint font sizes.
- If a headline is too long for mobile, **edit the copy** (shorter headline) before considering a smaller token.
- Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.
- Long words and URLs: `overflow-wrap: anywhere` on body text containers.
- Line length: body text max ~70 characters per line on desktop (`max-w-[65ch]` or the container tokens).
- Spacing tokens scale at 900px automatically. Page side margins: 16 / 30 / 50 / 90px (UI guide section 4.2).

---

## 6. Tables

| Option | When |
| --- | --- |
| Scroll container | Comparison tables people read across. Wrap the table in `overflow-x-auto`, set `min-width` on the table, make the first column `sticky left-0` with the section background colour |
| Card per row | Tables with ≤ 4 columns where each row is one item (e.g. service, price, time). Below `md`, render each row as a card with label: value pairs |

Always keep a real `<table>` in the HTML for SEO; switch presentation with CSS where possible.

---

## 7. Images and media

| Rule | Detail |
| --- | --- |
| `next/image` `sizes` | Must match the layout. Full-width hero: `100vw`. 3-column grid from `md`: `(min-width: 900px) 33vw, 100vw`. Split section: `(min-width: 900px) 50vw, 100vw` |
| Aspect ratio | Set with `aspect-[…]` on the wrapper so space is reserved (no layout shift) |
| Art direction | If the desktop image doesn't crop well on mobile, use a separate mobile image (`<picture>` with `media`) rather than squeezing |
| Hero height | Use `min-h-[…dvh]` (dynamic viewport), never `100vh`, so mobile browser bars don't cut content |
| Video | Poster image on mobile; no autoplay on mobile data |
| Background images | Avoid for content images; use `<img>` so they can be sized and lazy-loaded |

---

## 8. Touch and interaction

- Tap targets ≥ 44 × 44px with ≥ 8px between targets.
- Hover effects are enhancements only. Anything revealed on hover must also be reachable by tap or visible by default on touch screens (`@media (hover: hover)` for hover-only styling).
- Carousels: swipe with CSS scroll snap; visible next-card peek; arrows only from `lg`; keyboard accessible.
- Accordions and menus: work with tap, Enter and Space; `aria-expanded` set.
- Sticky elements: at most one sticky element on mobile (the header). No sticky sidebars below `lg`.
- Respect `env(safe-area-inset-*)` for anything fixed to the bottom of the screen.
- Forms on mobile: correct `type` and `inputmode` (`email`, `tel`), `autocomplete` attributes, inputs at 16px text so iOS doesn't zoom.

---

## 9. Common bugs to prevent in code

| Bug | Prevention |
| --- | --- |
| Horizontal overflow from `100vw` | Use `w-full`, not `w-screen`, inside the page |
| Flex children overflowing | Add `min-w-0` to flex/grid children that contain text |
| Fixed widths on cards | Use `w-full max-w-[…]` or grid tracks |
| Absolute elements spilling off screen | Contain with `relative overflow-hidden` on the section |
| Content hidden behind sticky header | `scroll-margin-top` equal to header height (72px) on anchor targets |
| Text over images unreadable on small screens | Add an overlay or move text below the image on mobile |
| Carousel showing full cards with no peek | Card width < 100% so users see there's more |
| Tiny tap targets in footers | Footer links get `py-2` minimum |

---

## 10. Verification without a browser

The Responsive Agent checks code, not screenshots. For every section, confirm:

- [ ] Base (mobile) classes exist for layout; `sm:`/`md:`/`lg:` only where the pattern in section 4 changes it
- [ ] Breakpoints used are only `xs`, `sm`, `md`, `lg`, `xl` from this system
- [ ] No fixed pixel width on any layout container wider than 320px without `max-w` and `w-full`
- [ ] No `w-screen` / `100vw` inside page content
- [ ] Every grid and flex row has a mobile column count or wrap rule
- [ ] Text-containing flex/grid children have `min-w-0`
- [ ] Every `next/image` has `sizes` matching the layout and a reserved aspect ratio
- [ ] Hover-only reveals have a touch fallback
- [ ] Tap targets ≥ 44px (buttons use the design-system button component)
- [ ] Tables use one of the two patterns in section 6
- [ ] No per-section font-size overrides; only type tokens
- [ ] The section's responsive spec (from its reference brief) is implemented for all three device classes

Final visual review on real devices is done by Ritesh after deploy. Issues he reports are fixed through the Responsive Agent.
