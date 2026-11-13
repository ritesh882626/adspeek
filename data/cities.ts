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
  work: { category: string; location: string; projectId?: string }[];
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
    storesBuilt: '50+ across NCR',
    quote: 'Within 24 hours',
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
      { category: 'Rugs & home', location: 'Gurugram / NCR', projectId: 'arhan-rugs' },
      { category: 'Clothing & intimates', location: 'Delhi NCR', projectId: 'miamour' },
      { category: 'Pet nutrition', location: 'Delhi NCR', projectId: 'pawnourish' },
    ],
    faq: [
      { q: 'How much does a Shopify store cost in Gurugram?', a: 'It depends on the pages, integrations and automations you choose in our package builder — you get an itemised quote within 24 hours. Stores start from ₹14,999. For platform costs, see our guide to Shopify pricing in India.' },
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
    storesBuilt: '50+ across NCR',
    quote: 'Within 24 hours',
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
      { category: 'Rugs & carpets', location: 'Delhi NCR', projectId: 'arhan-rugs' },
      { category: 'Clothing & apparel', location: 'Delhi NCR', projectId: 'miamour' },
      { category: 'Activewear', location: 'India', projectId: 'stance' },
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
    storesBuilt: '50+ across NCR',
    quote: 'Within 24 hours',
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
      { category: 'Clothing & fashion', location: 'Delhi NCR', projectId: 'miamour' },
      { category: 'Activewear', location: 'India', projectId: 'stance' },
      { category: 'Footwear & shoes', location: 'India', projectId: 'yellow' },
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
    storesBuilt: '50+ for Mumbai brands',
    quote: 'Within 24 hours',
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
      { category: 'Clothing & intimates', location: 'Mumbai & NCR', projectId: 'miamour' },
      { category: 'Footwear & shoes', location: 'Mumbai & overseas', projectId: 'yellow' },
      { category: 'Activewear', location: 'Mumbai', projectId: 'stance' },
    ],
    faq: [
      { q: 'You are based in Gurugram. How do you work with Mumbai brands?', a: 'Remotely, with a fixed rhythm: a kickoff call, weekly progress calls, a shared project board, and design reviews over video. After launch you get one clear weekly report.' },
      { q: 'Can our team update campaign pages without a developer?', a: 'Yes. We build reusable sections so your team can create landing pages and lookbooks from Shopify\'s editor.' },
      { q: 'Do you work with our existing 3PL or courier?', a: 'Yes. We integrate your courier or 3PL, set delivery estimates and shipping rules, and configure COD where you offer it.' },
      { q: 'How much does it cost?', a: 'Pick what you need in our package builder and you get an itemised quote within 24 hours. Stores start from ₹14,999.' },
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
    storesBuilt: '50+ for Bengaluru brands',
    quote: 'Within 24 hours',
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
      { category: 'Fine art gallery', location: 'Bengaluru & overseas', projectId: 'reliquary' },
      { category: 'Home decor', location: 'Bengaluru', projectId: 'adaore' },
      { category: 'Architectural lighting', location: 'Bengaluru & overseas', projectId: 'articture' },
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
