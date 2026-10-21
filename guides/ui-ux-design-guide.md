# UI/UX Design Guide

Visual system for the **AdsPeek website**. AdsPeek follows Shopify's colour scheme and styling; this guide replaces the earlier Electric Blue `#0057FF` system. Use AdsPeek's own logo, photography and copy; never Shopify's logo, product names or Shop Pay purple.

Visual system for every page and section Antigravity builds. Values are extracted from the CSS of shopify.com/in (saved page, October 2026).

A few values the source page doesn't define (form fields, error colour, card padding, reveal-animation length) were added to make the system complete. They are marked **(added)**; everything else comes straight from the source CSS.

---

## 0. The rule about references

References arrive as **images** of pages or sections, saved in `references/`. Antigravity never opens the reference site in a browser. When a reference image is provided:

**Take from the reference ONLY:**
- Section order and what each section contains
- Layout: columns, grid splits, element placement, alignment, image vs text position
- Content hierarchy: which element is the headline, subheadline, eyebrow, body, CTA
- Interaction patterns: tabs, accordions, carousels, sticky elements

**Take from THIS GUIDE, ALWAYS, with no exceptions:**
- Fonts, font sizes, weights, line heights, letter spacing
- Colours (backgrounds, text, borders, gradients)
- Button shapes, sizes, padding, borders and states
- Spacing between and inside elements
- Border radius
- Shadows
- Motion timing

**Never** sample a colour, font, shadow or radius from a reference. If the reference has a red button, the build has this guide's button. If the reference uses a serif headline, the build uses this guide's headline style.

### 0.1 Mapping a reference to tokens

For each element in the reference, pick the token by its **role**, not its look:

| Reference element | Use |
| --- | --- |
| Biggest hero headline | `dsp` (section 2.3) |
| Main section heading | `t2` (or `t1` for a single closing statement) |
| Sub-section / feature heading | `t3` or `t4` |
| Card title | `t7` |
| Small label above a heading | Eyebrow (section 2.4) |
| Paragraph | `body-base` (or `body-lg` for intro paragraphs) |
| Small supporting text | Caption (section 2.4) |
| Main call to action | Primary button |
| Second action next to it | Secondary button |
| Any gap between elements | Nearest spacing token (section 4) |
| Any card / panel | Card spec (section 6.3) |
| Any section background | Section backgrounds (section 3.2) |

When the reference spacing falls between two tokens, use the **larger** token.

---

## 1. Breakpoints

These are **not** Tailwind's defaults. Configure them explicitly.

| Name | Min width | Notes |
| --- | --- | --- |
| base | 0 | Mobile |
| xs | 340px | Small phones |
| sm | 640px | Large phones / small tablets |
| md | 900px | Tablet / small laptop — type and spacing scale up here |
| lg | 1200px | Desktop — type scales up again here |
| xl | 1600px | Content stops widening |

Mobile-first: write base styles, then `md:` and `lg:` overrides.

---

## 2. Typography

### 2.1 Font

| Role | Family | Stack |
| --- | --- | --- |
| Everything (headings, body, buttons) | **Inter Variable** | `"Inter", Helvetica, Arial, sans-serif` |
| Code | System mono | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` |

- One family only. No second display font.
- Must be the **variable** font: the system uses in-between weights (300, 330, 360, 420, 450, 550) that static font files don't have.
- Load Inter from Google Fonts / `next/font/google` (variable, all weights). Do **not** hotlink Shopify's own font files from `cdn.shopify.com`.
- `font-display: swap`.

### 2.2 Weights

| Token | Value | Used for |
| --- | --- | --- |
| light | 300 | Display at ≥1200px |
| display | 330 | Display (below 1200px), t1–t4 |
| — | 360 | t5 at ≥900px |
| normal | 400 | t5 (mobile), t6, body-lg, body-base at ≥1200px |
| — | 420 | body-base, body-sm, t6 (mobile) |
| medium | 450 | t7, t8, footer column titles |
| bold | 550 | Buttons, emphasis in body |
| semibold | 600 | Rare; small UI labels only |

Headlines are **light**. Never bold a heading (no 600/700 on dsp–t4).

### 2.3 Type scale

Values: size / line height / letter spacing. Weight in its own column.

| Token | Base (< 900px) | md (≥ 900px) | lg (≥ 1200px) | Weight | Use |
| --- | --- | --- | --- | --- | --- |
| `dsp` | 56px / 60.5px / -0.01em | 70px / 75.6px / -0.015em | 96px / 103.7px / -0.025em | 330 → **300** at lg | Hero H1 only |
| `t1` | 44px / 47.5px / -0.005em | 54px / 58.2px / -0.005em | 64px / 69.1px / -0.02em | 330 | Big statement headings |
| `t2` | 36px / 40.3px / 0 | 48px / 52.8px / -0.005em | 56px / 60.5px / -0.01em | 330 | Section headings (default H2) |
| `t3` | 30px / 34.2px / 0 | 36px / 40.3px / -0.005em | 44px / 48.4px / -0.01em | 330 | Sub-section headings |
| `t4` | 26px / 29.6px / 0 | 30px / 34.2px / 0 | 34px / 38.8px / 0 | 330 | Smaller headings |
| `t5` | 22px / 26px / -0.005em | 26px / 31.2px / -0.01em | 28px / 33.6px / -0.01em | 400 → 360 at md | Large card titles |
| `t6` | 18px / 23.4px / 0 | 22px / 26.4px / -0.005em | 24px / 31.2px / -0.01em | 420 → 400 at md | Lead-ins |
| `t7` | 16px / 20.8px / 0 | 18px / 23.4px / -0.005em | 20px / 26px / 0 | 450 | Card and feature titles (H4) |
| `t8` | 14px / 18.2px / 0 | 14px / 18.2px / 0 | 16px / 22.4px / 0 | 450 | Small titles |
| `body-lg` | 18px / 25.2px / 0 | 18px / 25.2px / 0 | 20px / 28px / 0 | 400 | Intro paragraphs |
| `body-base` | 16px / 22.4px / -0.006em | 16px / 22.4px / -0.006em | 18px / 25.2px / 0 | 420 → 400 at lg | Default paragraph |
| `body-sm` | 14px / 18.2px / 0 | 14px / 18.2px / 0 | 14px / 18.2px / 0 | 420 | Small body |

Hero H1 on the source page also sets `letter-spacing: -0.02em` on the element, overriding the token.

Heading rules:
- `text-wrap: balance` on headings; `text-wrap: pretty` on paragraphs and card titles.
- Use non-breaking spaces to keep the last two words of a headline together (no single orphan word).
- Headings and type size are separate: an H2 can use `t2`, an H3 can use `t2` too if the layout calls for it. Pick the size by visual role, the tag by document structure.

### 2.4 Small text styles

| Style | Size / line height | Weight | Spacing | Case | Colour (on dark) |
| --- | --- | --- | --- | --- | --- |
| Eyebrow | 12px / 1.2 | 400 | 0.72px | UPPERCASE | `#36F4A4` (neon green) |
| Caption | 14px / 18px | 400 | 0 | Sentence | `#A1A1AA` |
| Body copy (muted) | `body-base` | per scale | per scale | Sentence | `#9797A2` |
| Footer column title | 20px / 20px | 450 | 0 | Sentence | `#FFFFFF` |
| Fine print | 12px / 16px | 400 | 0 | Sentence | `#71717A` |

Eyebrow spacing to heading below: 14px (`mb-3.5`).

---

## 3. Colour

The default experience is **dark**. A light track exists for headers, forms and transactional areas.

### 3.1 Neutrals (shade scale)

| Token | Hex |
| --- | --- |
| shade-10 | `#F4F4F5` |
| shade-20 | `#E4E4E7` |
| shade-30 | `#D4D4D8` |
| shade-40 | `#A1A1AA` |
| shade-50 | `#71717A` |
| shade-60 | `#52525B` |
| shade-70 | `#3F3F46` |
| shade-90 | `#18181B` |
| white | `#FFFFFF` |
| black | `#000000` |

### 3.2 Section backgrounds (dark track)

| Token | Value | Use |
| --- | --- | --- |
| coal-black (default) | `#02090A` | Default page and section background, dark header |
| deep-green | `#061A1C` | Card and panel fills on coal-black |
| deep-pine | `#041E18` | Alternate section band |
| deep-navy | `#000A1E` | Alternate section band |
| forest | `#102620` | Small feature fills |
| purple band | `linear-gradient(to bottom, #2C007F 42.49%, #000A1D)` | One feature section per page at most |
| conversion gradient | see section 3.6 | Proof / statistics section |

Rhythm: alternate coal-black with **one** of deep-pine / deep-navy for contrast between major sections. Don't use more than three different section backgrounds on one page.

### 3.3 Text on dark

| Role | Hex |
| --- | --- |
| Primary text, headings | `#FFFFFF` |
| Body copy | `#9797A2` |
| Caption / secondary | `#A1A1AA` |
| Fine print / disabled | `#71717A` |
| Eyebrow / accent text | `#36F4A4` |

### 3.4 Text on light

| Role | Hex |
| --- | --- |
| Primary text | `#000000` (header text `#18181B`) |
| Secondary | `#52525B` |
| Muted | `#71717A` |

### 3.5 Accents (use sparingly)

| Token | Hex | Use |
| --- | --- | --- |
| neon green | `#36F4A4` | Eyebrows, small highlights, icon accents, hover underline. Never a large fill |
| aloe-10 | `#C1FBD4` | Light-track highlight fills, tags |
| pistachio-10 | `#D4F9E0` | Light-track highlight bands |
| focus purple | `#751BE9` | Focus outlines only |
| shop purple | `#5433EB` | Do not use (Shopify's Shop Pay brand colour) |

Max one accent colour visible per viewport besides white.

### 3.6 Gradients and glows

```css
/* Proof / conversion section */
background-image:
  linear-gradient(#02080880, #0000 20% 90%, #02080880),
  radial-gradient(at 87% 84%, #020808e6 0, #0000 50%),
  radial-gradient(at 10% 8%,  #020808e6 0, #0000 50%),
  radial-gradient(at 65% 36%, #3f3f4b80 0, #0000 50%),
  radial-gradient(at 38% 61%, #3f3f4b80 0, #0000 50%),
  radial-gradient(at 99% 36%, #3f3f4b80 0, #0000 50%),
  radial-gradient(at 0 62%,   #3f3f4b80 0, #0000 50%),
  linear-gradient(#09090a, #09090a);

/* Teal glow behind a card or visual */
background: radial-gradient(rgba(21,112,118,0.4), rgb(6 26 28) 75%, #061a1c);

/* Blue glow */
background: radial-gradient(rgba(18,96,255,0.35), transparent 50%, transparent);

/* Green glow */
background: radial-gradient(circle at center, #6cd48480, #6cd48424 44%, transparent 68%);

/* Raised dark button / chip fill */
background-image: linear-gradient(#244749 0%, #182e2f 100%);
```

### 3.7 Borders and dividers

| Context | Hex |
| --- | --- |
| Dark header / dividers on dark | `#1A292C` |
| Card border on dark (mobile cards) | `#142024` |
| Dividers on light | `#E4E4E7` |
| Translucent chip on dark | `rgba(255,255,255,0.10)` fill |

---

## 4. Spacing

### 4.1 Spacing tokens

Scale steps up at **900px**.

| Token | Base | md (≥ 900px) |
| --- | --- | --- |
| `xs` | 4px | 8px |
| `sm` | 8px | 16px |
| `md` | 16px | 24px |
| `lg` | 24px | 32px |
| `xl` | 32px | 40px |
| `2xl` | 40px | 64px |
| `3xl` | 64px | 80px |
| `4xl` | 80px | 128px |
| `5xl` | 128px | 160px |

Base unit for anything not in the table: **4px** (`--spacing: 0.25rem`).

### 4.2 Page margins (side gutter)

| Viewport | Side margin |
| --- | --- |
| base | 16px |
| ≥ 640px | 30px |
| ≥ 900px | 50px |
| ≥ 1200px | 90px |
| ≥ 1600px | Content stops at 1600px; margins grow: `calc((50% - 800px) + 90px)` |

### 4.3 Section spacing

| Situation | Value |
| --- | --- |
| Gap between blocks inside a section | `2xl` (40 → 64px) |
| Standard section padding top / bottom | `2xl` (40 → 64px) |
| Last section before a background change | bottom `4xl` (80 → 128px) |
| Feature band with its own background | 64px top/bottom, 100px at ≥ 900px |
| Hero top padding | header height (72px) |
| Heading → paragraph | `md` (16 → 24px) |
| Card title → card text | 8px (`sm` on mobile, `xs` at ≥ 900px) |
| Headline (`t2`) → its content block | `2xl` |
| Hero H1 → subheading | `lg` mobile, `2xl` at ≥ 900px |

### 4.4 Containers

| Token | Width |
| --- | --- |
| container-xs | 320px |
| container-sm | 384px |
| container-lg | 512px |
| container-4xl | 896px |
| container-6xl | 1152px |

Centred statement headings are constrained to: full width on mobile, 75% at md, 66% at lg, 50% at xl.

---

## 5. Radius

| Token | Value | Use |
| --- | --- | --- |
| `rounded-[5px]` | 5px | Small tags, inline chips, thumbnails |
| `md` | 6px | Inputs (small), small images |
| `lg` | 8px | Inputs, small cards, menu panels |
| `xl` | 12px | **Default card radius** |
| `2xl` | 16px | Large cards, mobile panels |
| `4xl` | 32px | Section top corners (sections that overlap the previous one) |
| top photo frame | 20px top corners only | Image frames sitting on a card |
| `full` | 9999px | **All buttons**, pills, avatars, badges |

Sections with their own background band get rounded top corners (`rounded-t-4xl`) and sit flush on the section above, creating a stacked-sheet look.

---

## 6. Components

### 6.1 Buttons

All buttons: pill (`border-radius: 9999px`), **2px border**, Inter **550**, letter spacing 0, `transition: all 150ms cubic-bezier(.4,0,.2,1)`.

**Size**

| Size | Padding | Font size / line height |
| --- | --- | --- |
| Default (< 900px) | 8px 20px | 16px / 24px |
| Large (≥ 900px) | 12px 24px | 18px / 28px |

Buttons are `width: 100%` below 640px and `width: auto` from 640px.

**On dark backgrounds**

| State | Primary (fill) | Secondary (outline) |
| --- | --- | --- |
| Default | bg `#FFFFFF`, text `#000000`, border transparent | bg transparent, text `#FFFFFF`, border `#FFFFFF` |
| Hover | bg `#D4D4D8`, text `#000000` | border `#D4D4D8` + 1px inset ring `#D4D4D8`, text `#FFFFFF` |
| Active | bg `#A1A1AA` | border `#A1A1AA`, ring `#A1A1AA` |
| Focus-visible | 2px outline `#751BE9`, offset 2px | same |
| Disabled | bg `#52525B`, text `#71717A` | border `#71717A`, text `#71717A` |

**On light backgrounds**

| State | Primary (fill) | Secondary (outline) |
| --- | --- | --- |
| Default | bg `#000000`, text `#FFFFFF`, border transparent | bg transparent, text `#000000`, border `#000000` |
| Hover | bg `#3F3F46` | border `#3F3F46` + 1px inset ring `#3F3F46` |
| Active | bg `#71717A` | border `#71717A` |
| Focus-visible | 2px outline `#751BE9`, offset 2px | same |
| Disabled | bg `#D4D4D8`, text `#A1A1AA` | border `#D4D4D8`, text `#A1A1AA` |

Rules:
- Max **one primary** button per section. A secondary can sit beside it.
- Button text is short: 2–4 words, sentence case ("Start for free", not "START FOR FREE").
- No icons inside buttons unless the reference structure has one; if so, 16px, same colour as text.
- No gradients, shadows or glows on buttons.

### 6.2 Text links

| Context | Default | Hover | Active | Disabled |
| --- | --- | --- | --- | --- |
| On dark | `#9797A2` | `#D4D4D8` | `#A1A1AA` | `#71717A` |
| Nav link on dark | `#FFFFFF`, underline on hover | | | |
| On light | `#000000` | `#3F3F46` | `#71717A` | `#A1A1AA` |

Inline links in body copy: underlined. Nav and footer links: underline on hover only.

### 6.3 Cards

Padding values are **(added)**; fills, borders, radius and shadows are from the source.

| Variant | Fill | Border | Radius | Padding | Shadow |
| --- | --- | --- | --- | --- | --- |
| Feature card (dark) | `#061A1C` | none (≥ 900px); `#142024` 1px on mobile | 12px | 24px mobile, 32px desktop | none |
| Mobile card (dark) | `#051517` | `#142024` 1px | 16px | 24px | none |
| Raised card (dark) | `#061A1C` | — | 12px | 32px | `shadow-card` (section 7) |
| Card on light | `#FFFFFF` | `#E4E4E7` 1px | 12px | 32px | `theme-shadow-1` light (section 7) |
| Highlight card (light) | `#C1FBD4` | none | 12px | 32px | none |
| Photo frame | image | none | 20px top corners | 0 | none |

Card content order: optional eyebrow → title (`t7`) → text (`body-sm` or caption, `#A1A1AA`) → optional link or button.

### 6.4 Badges and tags

| Variant | Style |
| --- | --- |
| Chip on dark | bg `rgba(255,255,255,0.10)`, text `#FFFFFF`, radius 9999px, padding 4px 12px, 14px |
| Tag on light | bg `#C1FBD4`, text `#000000`, radius 9999px, padding 4px 12px, 14px |
| Small label | bg `#F4F4F5`, text `#000`, radius 5px, padding 2px 8px, 12px (padding **added**) |

### 6.5 Header

| Property | Dark | Light |
| --- | --- | --- |
| Height | 72px | 72px |
| Background | `#02090A` | `#FFFFFF` |
| Text | `#FFFFFF` | `#18181B` |
| Bottom border (mobile menu levels) | `#1A292C` | `#E4E4E7` |
| Side padding | page margin (section 4.2) | same |
| CTA | Primary button (default size) | Primary button (default size) |
| Menu panel shadow | `theme-shadow-1` dark | `theme-shadow-1` light |

Nav link text: 16px, weight 550. Mega menu panels: radius 8px.

### 6.6 Footer

- Background `#02090A`, text `#9797A2` links, `#FFFFFF` column titles (20px, 450, line height 20px, 24px below).
- 4 link columns at ≥ 900px, 2 columns at sm, 1 column on mobile.
- Bottom bar: region selector, legal links, social icons; 12–14px text in `#71717A`.

### 6.7 Forms (added)

| Property | Value |
| --- | --- |
| Input height | 48px |
| Padding | 12px 16px |
| Radius | 8px |
| Border | 1px `#3F3F46` on dark, `#D4D4D8` on light |
| Fill | `#061A1C` on dark, `#FFFFFF` on light |
| Text | 16px, 420 |
| Placeholder | `#71717A` |
| Focus | 2px outline `#751BE9`, offset 2px |
| Label | 14px, 450, 8px above input |
| Error | text and border `#DC2626` (not in source CSS; added for usability) |

### 6.8 Statistics

- Number: `t3` or `t2`, weight 330, `#FFFFFF`.
- Label: caption style (14px / 18px, `#A1A1AA`), 8px below.
- Footnote marker for any claim, with the source in fine print at the section end.

---

## 7. Shadows

The system is mostly **flat**. Shadows only on raised cards, menus and overlays.

| Token | Value | Use |
| --- | --- | --- |
| `shadow-card` | `0 8px 8px 0 #0000001a, 0 4px 4px 0 #0000001a, 0 2px 2px 0 #0000001a, 0 0 0 1px #0000001a, 0 1px 0 0 #ffffff08 inset` | Raised cards on dark |
| `theme-shadow-1` (dark) | `0 8px 48px #18181b3d, 0 4px 8px #18181b29, 0 0 2px #ffffff85` | Menus, popovers on dark |
| `theme-shadow-1` (light) | `0 8px 48px #06060814, 0 4px 8px #18181b0a, 0 0 2px #18181b40` | Menus, popovers, cards on light |
| `shadow-raised-chip` | `0 0.929px 0 0 #ffffff08 inset, 0 0 0 0.929px #0000001a, 0 1.858px 1.858px 0 #0000001a, 0 3.717px 3.717px 0 #0000001a` | Small raised chips with the teal gradient fill |
| `shadow-ui-mockup` | `0 0 0 1px rgba(255,255,255,0.08), 0 1px 3px 0 rgba(0,0,0,0.3), 0 5px 10px 0 rgba(0,0,0,0.2)` | Product / UI screenshots on dark |
| `shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | Modals only |

Never use coloured shadows or glows on text or buttons.

---

## 8. Motion

| Token | Value |
| --- | --- |
| Default duration | 150ms |
| Default easing | `cubic-bezier(.4, 0, .2, 1)` |
| Ease out | `cubic-bezier(0, 0, .2, 1)` |
| Ease in | `cubic-bezier(.4, 0, 1, 1)` |
| Expressive easing (reveals) | `cubic-bezier(.22, 1, .36, 1)` |

- Hover and state changes: 150ms, default easing, colour and border only.
- Scroll reveals: opacity 0 → 1 and translateY(24px) → 0, expressive easing, stagger 50ms (from source). Duration 400–600ms **(added)**. Once only.
- Honour `prefers-reduced-motion: reduce`: no movement, instant opacity.

---

## 9. Layout patterns

| Pattern | Mobile | ≥ 900px | ≥ 1200px |
| --- | --- | --- | --- |
| Hero | Stacked, left-aligned, full-width button | Same, larger type | `dsp` at 96px |
| Section heading + intro | Stacked | Heading left, intro right (2 columns) or stacked | — |
| Feature cards | 1 column, cards stacked | 3 columns, gap `md` | gap `lg` |
| Image + text | Image above text | 2 columns, 50/50 or 7/5 of 12 | — |
| Customer stories | Horizontal scroll | 3 columns | — |
| Statistics | 2 columns | 4 columns | — |
| Steps (1-2-3) | Stacked | 3 columns | — |
| Centred statement | Left-aligned | Centred, 75% width | 66% width (50% at xl) |

Grid: 4 columns on mobile (gap 16px), 8 at sm, 12 at md and up (gap 16px at md, 24px at lg).

Alignment: **left-aligned by default.** Centre only single statement headings and their CTAs.

---

## 10. Accessibility

- Text contrast ≥ 4.5:1. `#9797A2` on `#02090A` passes for body; don't put `#71717A` on dark for anything a user must read except fine print.
- Every interactive element: visible focus (`#751BE9` 2px outline, offset 2px).
- Tap targets ≥ 44px tall (default button is 40px + 2px borders = 44px).
- Never convey meaning by colour alone.
- Respect reduced motion (section 8).

---

## 11. Implementation tokens (CSS)

Drop-in custom properties. Map Tailwind theme values to these names.

```css
:root {
  /* Font */
  --font-sans: "Inter", Helvetica, Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

  /* Neutrals */
  --shade-10:#f4f4f5; --shade-20:#e4e4e7; --shade-30:#d4d4d8; --shade-40:#a1a1aa;
  --shade-50:#71717a; --shade-60:#52525b; --shade-70:#3f3f46; --shade-90:#18181b;

  /* Backgrounds */
  --bg-coal:#02090a; --bg-deep-green:#061a1c; --bg-deep-pine:#041e18;
  --bg-deep-navy:#000a1e; --bg-forest:#102620;

  /* Text on dark */
  --text-primary:#ffffff; --text-body:#9797a2; --text-caption:#a1a1aa; --text-fine:#71717a;

  /* Accents */
  --accent-neon:#36f4a4; --aloe-10:#c1fbd4; --pistachio-10:#d4f9e0; --focus:#751be9;

  /* Borders */
  --border-dark:#1a292c; --border-card-dark:#142024; --border-light:#e4e4e7;

  /* Radius */
  --radius-chip:5px; --radius-md:6px; --radius-lg:8px; --radius-xl:12px;
  --radius-2xl:16px; --radius-4xl:32px; --radius-full:9999px;

  /* Layout */
  --header-height:72px; --margin:16px; --spacing:4px;

  /* Spacing (base) */
  --space-xs:4px; --space-sm:8px; --space-md:16px; --space-lg:24px; --space-xl:32px;
  --space-2xl:40px; --space-3xl:64px; --space-4xl:80px; --space-5xl:128px;

  /* Buttons */
  --btn-px:20px; --btn-py:8px; --btn-size:16px; --btn-lh:24px; --btn-weight:550;

  /* Motion */
  --ease:cubic-bezier(.4,0,.2,1); --ease-out:cubic-bezier(0,0,.2,1);
  --ease-in:cubic-bezier(.4,0,1,1); --ease-expressive:cubic-bezier(.22,1,.36,1);
  --duration:150ms;

  /* Shadows */
  --shadow-card:0 8px 8px 0 #0000001a,0 4px 4px 0 #0000001a,0 2px 2px 0 #0000001a,0 0 0 1px #0000001a,0 1px 0 0 #ffffff08 inset;
  --shadow-menu-dark:0 8px 48px #18181b3d,0 4px 8px #18181b29,0 0 2px #ffffff85;
  --shadow-menu-light:0 8px 48px #06060814,0 4px 8px #18181b0a,0 0 2px #18181b40;
  --shadow-ui-mockup:0 0 0 1px rgba(255,255,255,.08),0 1px 3px 0 rgba(0,0,0,.3),0 5px 10px 0 rgba(0,0,0,.2);
  --shadow-modal:0 25px 50px -12px rgb(0 0 0 / .25);
}

@media (min-width:640px)  { :root { --margin:30px; } }

@media (min-width:900px)  {
  :root {
    --margin:50px;
    --space-xs:8px; --space-sm:16px; --space-md:24px; --space-lg:32px; --space-xl:40px;
    --space-2xl:64px; --space-3xl:80px; --space-4xl:128px; --space-5xl:160px;
    --btn-px:24px; --btn-py:12px; --btn-size:18px; --btn-lh:28px;
  }
}

@media (min-width:1200px) { :root { --margin:90px; } }
```

Type tokens (section 2.3) are set the same way: one value set at base, overridden at 900px and 1200px.

---

## 12. QA checklist (every section)

- [ ] Only Inter used; weights match the scale (headings 300/330, never bold)
- [ ] Every font size is a token from section 2.3 / 2.4 at the right breakpoint
- [ ] Every colour is from section 3; no colour sampled from a reference
- [ ] Buttons are pills with 2px border, correct padding per breakpoint, all states styled
- [ ] Max one primary button per section
- [ ] Every gap is a spacing token; page margins match section 4.2
- [ ] Radius from section 5 only (cards 12px, buttons 9999px)
- [ ] Shadows only where section 7 allows
- [ ] Focus outline `#751BE9` visible on every interactive element
- [ ] Breakpoints are 640 / 900 / 1200 / 1600, not Tailwind defaults
- [ ] Layout matches the reference's structure; nothing else from the reference carried over
- [ ] Reduced-motion respected
