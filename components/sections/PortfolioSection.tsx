'use client';

import React, { useState } from 'react';
import { Check, Sparkles, ExternalLink } from 'lucide-react';

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  industry: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  metrics: string;
  imageUrl: string;
  liveUrl: string;
  imageColor?: string;
  accentColor?: string;
}

interface PortfolioSectionProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // 1. FOOD
  {
    id: 'tatva-hills',
    title: 'Tatva Hills Superfoods',
    category: 'Food',
    industry: 'Organic Superfoods & Pantry',
    description:
      'Artisan organic superfoods and condiment brand storefront engineered for high-speed DTC checkout, recipe storytelling, and subscription bundles.',
    deliverables: ['Custom Shopify Storefront', 'Sticky Cart Bundle Drawer', 'Sub-second Mobile Checkout'],
    techStack: ['Shopify OS 2.0', 'Liquid', 'Tailwind', 'Klaviyo'],
    metrics: '+36% Lift in Mobile Conversion Rate',
    imageUrl: '/portfolio/tatva-hills.webp',
    liveUrl: 'https://www.tatvahills-superfoods.com/',
    accentColor: '#36F4A4',
  },
  {
    id: 'aapka-bazar',
    title: 'Aapka Bazar',
    category: 'Food',
    industry: 'Daily Grocery & Essentials',
    description:
      'High-velocity daily grocery eCommerce platform serving over 100,000 households with real-time pincode serviceability checks and one-tap COD.',
    deliverables: ['Pincode Geo-Delivery Checker', 'Automated One-Tap COD Flow', 'Bulk Monthly Basket Reordering'],
    techStack: ['Shopify 2.0', 'Automated OTP Verification', 'Custom Liquid'],
    metrics: '100,000+ Satisfied Families Served',
    imageUrl: '/portfolio/aapka-bazar.webp',
    liveUrl: 'https://aapkabazar.co/',
    accentColor: '#F59E0B',
  },
  {
    id: 'nourish-store',
    title: 'Nourish Store',
    category: 'Food',
    industry: 'Organic Nutrition & Staples',
    description:
      'Clean organic pantry and healthy snacking DTC storefront engineered for repeat subscription deliveries, tier-based volume discounts, and recipes.',
    deliverables: ['Recurring Pantry Subscriptions', 'Tiered Volume Discount Engine', 'Pincode Service Validator'],
    techStack: ['Shopify OS 2.0', 'Recharge API', 'Liquid'],
    metrics: '+41% Repeat Customer Purchase Rate',
    imageUrl: '/portfolio/nourish-store.webp',
    liveUrl: 'https://nourishstore.in/',
    accentColor: '#10B981',
  },
  {
    id: 'true-hunt',
    title: 'True Hunt',
    category: 'Food',
    industry: 'Raw Diet & Pet Nutrition',
    description:
      'High-protein natural wet food brand storefront featuring a breed-specific pet meal calculator, ingredient transparency tabs, and auto-shipment routines.',
    deliverables: ['Pet Nutrition Calculation Quiz', 'Monthly Auto-Ship Schedule', 'Ingredient Transparency Accordions'],
    techStack: ['Shopify OS 2.0', 'Subscription API', 'Liquid'],
    metrics: '+48% Subscription Enrollment Rate',
    imageUrl: '/portfolio/true-hunt.webp',
    liveUrl: 'https://truehunt.store/',
    accentColor: '#EF4444',
  },
  {
    id: 'acana-india',
    title: 'Acana India',
    category: 'Food',
    industry: 'Biologically Appropriate Pet Food',
    description:
      'Official Indian eCommerce storefront for biologically appropriate dog and cat food with an interactive recipe comparison matrix and authorized dealer locator.',
    deliverables: ['Interactive Food Comparison Matrix', 'Authorised Store & Vet Locator', 'Zero-Downtime Catalog Sync'],
    techStack: ['Shopify OS 2.0', 'Mapbox Store Locator', 'Liquid'],
    metrics: '99/100 Mobile Core Web Vitals Score',
    imageUrl: '/portfolio/acana-india.webp',
    liveUrl: 'https://acana.in/',
    accentColor: '#3B82F6',
  },
  {
    id: 'heapwell',
    title: 'Heapwell Superfoods',
    category: 'Food',
    industry: 'Matcha & Japanese Superfoods',
    description:
      'Authentic Japanese ceremonial matcha and superfoods storefront featuring interactive whisk preparation guides, auto-gift flows, and café wholesale portals.',
    deliverables: ['Matcha Grade Tasting Guide', 'Whisk Bundle Auto-Gift Flow', 'Wholesale B2B Inquiry Gate'],
    techStack: ['Shopify OS 2.0', 'Liquid', 'Recharge Subscriptions'],
    metrics: '+63% Lift in Matcha Kit Sales',
    imageUrl: '/portfolio/heapwell.webp',
    liveUrl: 'https://heapwell.in/',
    accentColor: '#059669',
  },

  // 2. SHOES
  {
    id: 'pedro-shoes',
    title: 'Pedro Shoes',
    category: 'Shoes',
    industry: 'Footwear & Fashion Accessories',
    description:
      'Contemporary international footwear and bag storefront featuring high-density catalog filtering, interactive size guides, and international currency switching.',
    deliverables: ['Interactive Footwear Size Guide', 'Multi-Currency Global Checkout', 'High-Density Catalog Architecture'],
    techStack: ['Shopify Plus', 'Shopify Markets', 'Custom Liquid'],
    metrics: '1.1s Sub-second Mobile Load Speed',
    imageUrl: '/portfolio/pedro-shoes.webp',
    liveUrl: 'https://www.pedroshoes.com/ph',
    accentColor: '#6366F1',
  },

  // 3. CLOTHING
  {
    id: 'simons',
    title: 'Simons',
    category: 'Clothing',
    industry: 'Fashion & Department Apparel',
    description:
      'Editorial fashion destination storefront with curated seasonal lookbooks, multi-tier department mega-menus, and VIP member loyalty workflows.',
    deliverables: ['Department Mega-Menu Architecture', 'Editorial Collection Lookbooks', 'Loyalty Program Integration'],
    techStack: ['Shopify Plus', 'Custom Filter Engine', 'Algolia'],
    metrics: '+44% Mobile Engagement Depth',
    imageUrl: '/portfolio/simons.webp',
    liveUrl: 'https://www.simons.ca/en',
    accentColor: '#8B5CF6',
  },
  {
    id: 'ott-tarun-tahiliani',
    title: 'OTT by Tarun Tahiliani',
    category: 'Clothing',
    industry: 'Designer Pret & Couture',
    description:
      'Celebrated Indian couture designer brand storefront showcasing contemporary pret collections with rich runway video embeds and private client consultations.',
    deliverables: ['Editorial Runway Video Sections', 'Custom Made-to-Measure Selector', 'VIP Private Client Portal'],
    techStack: ['Shopify Plus', 'Liquid OS 2.0', 'Global Currency Gateway'],
    metrics: '+52% Mobile Pageview Depth',
    imageUrl: '/portfolio/ott-tarun-tahiliani.webp',
    liveUrl: 'https://otttaruntahiliani.com/',
    accentColor: '#D97706',
  },
  {
    id: 'margerita',
    title: 'Margerita',
    category: 'Clothing',
    industry: 'DTC Apparel & Resortwear',
    description:
      'Vibrant contemporary fashion and resortwear storefront with Instagram lookbook feeds, real-time clearance countdowns, and quick-add mobile drawers.',
    deliverables: ['Shoppable Instagram Lookbook Feed', 'Instant Flash Sale Timer', 'Mobile-First Filter Drawer'],
    techStack: ['Shopify 2.0', 'Liquid Sections', 'Meta Pixel'],
    metrics: '1.2s First Contentful Paint',
    imageUrl: '/portfolio/margerita.webp',
    liveUrl: 'https://margerita.in/',
    accentColor: '#EC4899',
  },

  // 4. JEWELLERY
  {
    id: 'virani-jewels',
    title: 'Virani Fine Jewelry',
    category: 'Jewellery',
    industry: 'Luxury Bridal & Fine Diamonds',
    description:
      'Luxury bridal diamond and fine jewelry boutique featuring bespoke engagement ring configurators, high-resolution macro zoom, and concierge appointment booking.',
    deliverables: ['Bespoke Ring Configurator', 'Concierge VIP Booking Flow', 'High-Definition Macro PDP Zoom'],
    techStack: ['Shopify Plus', 'Liquid OS 2.0', 'Gorgias Concierge'],
    metrics: '+31% Average Order Value (AOV)',
    imageUrl: '/portfolio/virani-jewels.webp',
    liveUrl: 'https://virabyani.com/',
    accentColor: '#14B8A6',
  },
  {
    id: 'welldunn',
    title: 'WellDunn Jewelry',
    category: 'Jewellery',
    industry: 'Handmade Artisan Jewelry',
    description:
      'Montreal-crafted demi-fine jewelry brand with modular necklace layering bundles, custom gift box unboxing personalization, and slide-out cart drawers.',
    deliverables: ['Dynamic Layering Bundle Builder', 'Gift Packaging Customization Drawer', 'Fast Cart Sliding Drawer'],
    techStack: ['Shopify OS 2.0', 'Custom Liquid', 'Klaviyo'],
    metrics: '+28% Bundle Attach Rate',
    imageUrl: '/portfolio/welldunn.webp',
    liveUrl: 'https://welldunnjewelry.com/',
    accentColor: '#F43F5E',
  },
  {
    id: 'bluboho',
    title: 'Bluboho Fine Jewelry',
    category: 'Jewellery',
    industry: 'Ethical & Conscious Jewelry',
    description:
      'Conscious fine jewelry storefront built with recycled gold storytelling, custom ring sizing guides, virtual appointment scheduling, and Shop Pay checkout.',
    deliverables: ['Ethical Sourcing Story Tabs', 'Virtual Consultation Scheduler', 'Shop Pay One-Click Checkout'],
    techStack: ['Shopify Plus', 'Shop Pay', 'Klaviyo'],
    metrics: '+38% Mobile Conversion Lift',
    imageUrl: '/portfolio/bluboho.webp',
    liveUrl: 'https://www.bluboho.com/',
    accentColor: '#06B6D4',
  },
  {
    id: 'adaore',
    title: 'Adaore Jewelry',
    category: 'Jewellery',
    industry: 'Waterproof Everyday Jewelry',
    description:
      'High-velocity DTC waterproof jewelry storefront with automated "Buy 2 Save 20%, Buy 3 Save 40%" dynamic pricing logic and sticky mobile buy bar.',
    deliverables: ['Dynamic Multi-Tier Volume Discount', 'Sticky Mobile Buy Bar', 'Instant Reviews Showcase'],
    techStack: ['Shopify 2.0', 'Custom Liquid JS', 'Judge.me'],
    metrics: '+55% AOV via Multi-Tier Offers',
    imageUrl: '/portfolio/adaore.webp',
    liveUrl: 'https://adaore.com/',
    accentColor: '#A855F7',
  },

  // 5. HOME DECOR
  {
    id: 'articture',
    title: 'Articture',
    category: 'Home Decor',
    industry: 'Modern Home Decor & Living',
    description:
      'Contemporary design-led home decor and furniture boutique with room visualizers, curated aesthetic collections, and high-AOV checkout protection.',
    deliverables: ['Interactive Room Style Guides', 'High-Res Texture Zoom', 'Custom Freight Delivery Calculation'],
    techStack: ['Shopify Plus', 'Three.js Visualizer', 'Liquid'],
    metrics: '+46% Lift in Home Decor Bundles',
    imageUrl: '/portfolio/articture.webp',
    liveUrl: 'https://articture.com/',
    accentColor: '#CA8A04',
  },
];

export function PortfolioSection({ onSelectProject }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Food', 'Shoes', 'Clothing', 'Jewellery', 'Home Decor'];

  const filteredProjects =
    activeCategory === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white border-b border-gray-100 scroll-mt-20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-semibold uppercase tracking-wider mb-3.5 border border-[#D1EFE3]">
            <span>VERIFIED PORTFOLIO</span>
          </div>
          <h2 className="type-section text-gray-950 font-light">
            Stores We&apos;ve Built &amp;{' '}
            <span className="font-normal text-[#0C5A48]">Transformed</span>
          </h2>
          <p className="type-body text-gray-600 mt-3 sm:mt-4 font-light">
            Explore live storefronts across food, footwear, designer apparel, luxury jewellery, and home decor engineered for speed and scale.
          </p>
        </div>

        {/* Category Filter Pills - Scrollable horizontally on small screens */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-0 mb-8 sm:mb-12 no-scrollbar sm:flex-wrap sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap min-h-[40px] shrink-0 ${
                activeCategory === category
                  ? 'bg-[#0C5A48] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200/80 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile Horizontal Swipe Carousel & Desktop Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="snap-center shrink-0 w-[84vw] max-w-[340px] md:w-auto md:max-w-none group rounded-2xl border border-gray-200/80 bg-white shadow-card-light hover:shadow-card-hover hover:border-[#0C5A48]/30 transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Visual Header / Hero Screenshot Preview */}
                <div className="h-52 sm:h-60 relative overflow-hidden bg-gray-950">
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} Hero Section`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle vignette gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute inset-x-0 top-0 p-4 sm:p-5 flex items-center justify-between z-10">
                    <span className="text-[10px] sm:text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/15 shadow-sm">
                      {project.industry}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-[#0C5A48] text-white shadow-sm">
                      Live Store
                    </span>
                  </div>

                  {/* Bottom Title on Banner */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10">
                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white mb-0.5 drop-shadow-sm">
                      {project.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#C5E1C5] font-mono">
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-7 md:p-8">
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-light mb-5 sm:mb-6">
                    {project.description}
                  </p>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-[#EBF7F2] border border-[#D1EFE3] mb-5 sm:mb-6">
                    <p className="text-xs sm:text-sm font-mono text-[#0C5A48] font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="truncate">{project.metrics}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    {project.deliverables.slice(0, 2).map((del, i) => (
                      <div key={i} className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#0C5A48] shrink-0" />
                        <span className="truncate">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action (No Arrow) */}
              <div className="px-5 sm:px-7 md:px-8 py-3.5 sm:py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm font-medium text-[#0C5A48] group-hover:bg-[#EBF7F2]/50 transition-colors min-h-[44px]">
                <span>View Full Store Case &amp; Live Site</span>
                <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">NDA Protected</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="md:hidden flex items-center justify-center gap-1.5 text-xs text-gray-400 font-mono mt-4">
          <span>← Swipe to explore stores →</span>
        </div>
      </div>
    </section>
  );
}
