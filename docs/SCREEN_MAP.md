# AdsPeek Package Builder — Screen Mapping

This document maps all reference images in the `./AdspeekQuoteform_screens/` folder to the screens specified in the project specification (Section 7).

---

## Screen Reference Matrix

| File Name | Heading Text in Image | Specification Section | Screen Name & Description | Visual Layout & Highlights |
|---|---|---|---|---|
| `screen1.png` | **How would you like to start?** | Section 7.1 | **Welcome Screen** | Split card layout. Left panel: "Get your store estimate", 3 value bullet points with checkmarks, live price card (₹0). Right panel: Role selection with two tiles ("I'm a business owner" [selected] and "AdsPeek team" [lock icon]). Mobile preview on right. |
| *Missing from folder* | *N/A (Built per spec)* | Section 7.2 | **Staff Login Screen** | Split card layout matching the system style. Left panel: Staff portal info. Right panel: Password input with show/hide eye toggle, submit button, soft red inline error handling, and link back to Welcome. |
| `screen2.png` | **Choose a service** | Section 7.3 | **Choose a Service (Step 1 of 7)** | 7 step dots (dot 1 active). Grid of service cards: "Shopify Store" active (From ₹19,499) with black border + check badge; inactive services ("Custom Website", "App Development", "Marketing", "Something else") greyed out with "Coming soon" pill badges. "Previous step" link, black "Continue" button. |
| `screen3.png` | **Products and categories** | Section 7.4 | **Products & Categories (Step 2 of 7)** | 7 step dots (dot 2 active). Stepper cards (`-` / input / `+`) for Number of Products and Number of Categories. Dynamic helper text showing included vs chargeable batch/unit calculations. Info callout banner: *"Not sure yet? You can change this later with our team."* |
| `screen4.png` | **Choose your pages** | Section 7.5 | **Pages (Step 3 of 7)** | 7 step dots (dot 3 active). Group 1: "Included in your package" shows 8 locked chips (About Us, Contact, FAQ, Shipping Policy, Returns Policy, Privacy Policy, Terms, Track Order) with tick & lock icons. Group 2: "Add more pages" with selectable page tiles and pricing. |
| `screen5.png` | **Add features** | Section 7.6 | **Features (Step 4 of 7)** | 7 step dots (dot 4 active). Category filter pills at the top (`All`, `Design`, `Sales`, `Customer loyalty`). 2-column feature tiles with icons, titles, short descriptions, and prices. Selected tiles show black border + check badge. |
| `screen6.png` | **Connect your tools** | Section 7.7 | **Integrations (Step 5 of 7)** | 7 step dots (dot 5 active). Subheading notes WhatsApp chat button included. Tool tiles with setup price and monthly subscription cost note (`Tool: ...`). "Amazon / Flipkart sync" displays "Price on request" pill. Primary CTA label: **Review package**. |
| `screen7a.png` | **Review your package** | Section 7.8 | **Summary — Client View (Step 6 of 7)** | 7 step dots (dot 6 active). Itemized breakdown grouped by step with "Edit" links for each section. Live totals: Subtotal, GST 18%, Grand Total. Left panel lists delivery timeline and support perks. Primary CTA: **Get my estimate**. |
| `screen7b.png` | **Review and adjust** | Section 7.9 | **Summary — Staff View (Step 6 of 7)** | Top black strip: "Staff mode" with "Log out" link. Grouped itemized list. Dashed button: `+ Add custom line item`. Pricing card with Expected price, editable Final price input, Discount pill (`Discount 9.5%`), GST 18%, and Total. CTA: **Save quote** / **Continue to client details**. |
| `screen8.png` | **Your details** | Section 7.10 | **Your Details (Step 7 of 7)** | 7 step dots (all 7 filled). Input fields: Full name, Business name, Mobile (+91 prefix), Email, GSTIN (optional), State dropdown, Address textarea, and WhatsApp updates checkbox. CTA: **Send my estimate** (or **Save quote** in staff mode). |
| `Screen9.png` | **Estimate sent** | Section 7.11 | **Estimate Sent / Quote Saved (Confirmation)** | Success checkmark circle. Subheading with submission ID (`EST-041126-01`) and grand total. "What happens next" 3-step process card. Hidden "Download estimate (PDF)" button. "Chat with us on WhatsApp" button. "Build another package" link. |

---

## Design Tokens Extracted from Screens

### 1. Color Palette
- **Page Background:** `#D9DEEA` (muted slate/lavender background)
- **Container / Main Card Background:** `#FFFFFF`
- **Left Panel Gradient:** `linear-gradient(145deg, #E6F6ED 0%, #EBF0FA 50%, #E2E8F8 100%)`
- **Right Panel Background:** `#F7F8FB`
- **Text Primary:** `#111827` (near-black)
- **Text Secondary / Muted:** `#6B7280`
- **Text Tertiary / Placeholder:** `#9CA3AF`
- **Borders & Dividers:** `#E5E7EB`
- **Tile Selected Border:** `#111827` (1.5px solid)
- **Tile Selected Background:** `#EEF0FA`
- **Primary Button Background:** `#111827` (hover: `#1F2937`)
- **Primary Button Text:** `#FFFFFF`
- **Pill / Badge Inactive:** Background `#F3F4F6`, Text `#4B5563`, Border `#E5E7EB`
- **Pill / Badge Active:** Background `#111827`, Text `#FFFFFF`
- **Discount Badge (Staff):** Background `#FEF3C7`, Text `#B45309`
- **Error Red:** `#EF4444` / soft red `#DC2626`
- **Info Callout:** Background `#EEF2FF`, Border `#E0E7FF`, Text `#3730A3`

### 2. Typography
- **Font Family:** `Inter`, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Card Headings:** 24px–28px, Bold (700), tracking -0.02em
- **Section / Step Headings:** 22px–24px, Bold (700)
- **Subheadings / Descriptions:** 14px–15px, Regular (400) / Medium (500)
- **Body & Tile Titles:** 14px–15px, Semi-bold (600)
- **Tile Descriptions & Captions:** 12px–13px, Regular (400)
- **Live Price Display:** 32px, Bold (700), tracking -0.03em

### 3. Spacing & Elevation
- **Card Outer Border Radius:** `24px`
- **Tile Border Radius:** `14px`
- **Input / Button Border Radius:** `10px`–`12px`
- **Pill Border Radius:** `9999px`
- **Card Shadow:** `0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.12)`
- **Price Card Shadow:** `0 4px 12px rgba(0, 0, 0, 0.04)`

### 4. Layout Structure
- **Desktop (≥ 900px):** Split card layout with left panel (~38–40%) and right panel (~60–62%).
- **Mobile (< 900px):** Stacked layout with top header banner (gradient background, logo, title, description, step progress) and scrollable content below. Sticky bottom bar with live estimate amount and primary CTA button.

