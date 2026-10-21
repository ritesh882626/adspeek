'use client';

import React from 'react';
import { Play } from 'lucide-react';

interface VideoStory {
  clientName: string;
  brand: string;
  role: string;
  title: string;
  summary: string;
  highlight: string;
}

interface VideoTestimonialsSectionProps {
  onSelectStory: (story: VideoStory) => void;
}

export function VideoTestimonialsSection({ onSelectStory }: VideoTestimonialsSectionProps) {
  const stories: VideoStory[] = [
    {
      clientName: 'Marcus Vance',
      brand: 'Krave Apparel',
      role: 'Founder',
      title: 'How Krave Rebuilt on Shopify Plus and Grew 42%',
      summary:
        'Marcus shares how switching from a bloated pre-made theme to a custom Liquid architecture eliminated customer drop-off on mobile PDPs and boosted checkout conversion.',
      highlight: 'Our mobile conversion rate jumped by 42% in month one.',
    },
    {
      clientName: 'Elena Rostova',
      brand: 'Nordic Living Co.',
      role: 'Head of eCommerce',
      title: 'Migrating 4,500 SKUs from WooCommerce with Zero Downtime',
      summary:
        'Elena discusses how the AdsPeek technical team mapped 100% of product URLs and customer records, allowing a frictionless midnight launch without losing a single order.',
      highlight: 'Zero downtime and not a single lost organic ranking.',
    },
    {
      clientName: 'Rohan Mehra',
      brand: 'Botanica Wellness',
      role: 'Co-Founder',
      title: 'Custom B2B Wholesale & Subscriptions on One Storefront',
      summary:
        'Rohan explains how AdsPeek integrated Recharge recurring billing and Shopify B2B wholesale rules directly into their flagship storefront, simplifying backend operations.',
      highlight: 'Wholesale and D2C now run smoothly on a unified platform.',
    },
    {
      clientName: 'David Harrison',
      brand: 'Zenith Audio',
      role: 'Growth Lead',
      title: '98/100 Mobile Speed Audit: The ROI of Fast Liquid Code',
      summary:
        'David shares before-and-after conversion metrics after AdsPeek pruned third-party script bloat, lazy-loaded off-screen elements, and configured next-gen AVIF images.',
      highlight: 'Page load dropped to 0.8s and ad ROAS noticeably improved.',
    },
  ];

  const cardGradients = [
    'from-emerald-950 via-zinc-900 to-black',
    'from-slate-900 via-neutral-900 to-stone-900',
    'from-zinc-900 via-teal-950 to-black',
    'from-stone-900 via-neutral-900 to-zinc-950',
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white border-b border-gray-100 scroll-mt-20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-semibold uppercase tracking-wider mb-3.5 border border-[#D1EFE3]">
            <span>CLIENT STORIES</span>
          </div>
          <h2 className="type-section text-gray-950 font-light">
            Hear It Directly From{' '}
            <span className="font-normal text-[#0C5A48]">Our Clients</span>
          </h2>
          <p className="type-body text-gray-600 mt-3 sm:mt-4 font-light">
            Watch real founders and eCommerce operators discuss their store build process, milestones, and measurable results with Adspeek.
          </p>
        </div>

        {/* 1-Col Small Mobile, 2-Col Tablet, 4-Col Desktop */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stories.map((story, i) => (
            <div
              key={i}
              onClick={() => onSelectStory(story)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] xs:aspect-[3/4] bg-zinc-900 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between p-5 sm:p-6 text-white border border-gray-200"
            >
              {/* Background gradient simulating video frame */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${cardGradients[i]} opacity-90 group-hover:opacity-100 transition-opacity`}
              />

              {/* Video Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-[#36F4A4] border border-[#36F4A4]/20">
                  CASE STORY
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-white/60">2:15</span>
              </div>

              {/* Center Play Button (min 44px) */}
              <div className="relative z-10 self-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0C5A48] group-hover:border-[#0C5A48] transition-all duration-200">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-0.5" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="relative z-10">
                <p className="text-[11px] sm:text-xs font-mono text-[#36F4A4] uppercase tracking-wider mb-1">
                  {story.brand}
                </p>
                <h4 className="text-sm sm:text-base font-medium text-white leading-snug group-hover:text-emerald-200 transition-colors line-clamp-2">
                  &ldquo;{story.highlight}&rdquo;
                </h4>
                <p className="text-[11px] sm:text-xs text-white/70 mt-1.5 sm:mt-2 truncate">
                  {story.clientName} &bull; {story.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
