'use client';

import React, { useRef } from 'react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import { useWaysMotion } from './useWaysMotion';

export const WaysToWork: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useWaysMotion(sectionRef);

  const plans = [
    {
      id: 'store-build',
      tag: 'One-time',
      tagTone: 'default',
      title: 'Store build',
      price: 'from ₹14,999',
      desc: 'Design and build of your Shopify store, tracking set up, handed over ready to sell.',
      featured: false,
    },
    {
      id: 'store-growth',
      tag: 'Most chosen',
      tagTone: 'forest',
      title: 'Store + Growth',
      price: 'from ₹13,999 + ₹5,999/mo',
      desc: 'The build plus ads, automations and monthly reporting — the full system.',
      featured: true,
    },
    {
      id: 'growth-only',
      tag: 'Monthly',
      tagTone: 'default',
      title: 'Growth only',
      price: 'from ₹7,999/mo',
      desc: 'Already have a store? We run ads, automations and tracking on it.',
      featured: false,
    },
  ];

  // Mobile order: put "Store + Growth" first
  const mobilePlans = [plans[1], plans[0], plans[2]];

  return (
    <div ref={sectionRef}>
      <Section
        id="ways-to-work"
        bg="paper"
        border={true}
        padTopDesktop={96}
        padBottomDesktop={96}
        padTopTablet={72}
        padBottomTablet={72}
        padTopMobile={56}
        padBottomMobile={56}
      >
        <Eyebrow decode>06 — Ways to work with us</Eyebrow>
        <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0 mb-12">
          Pick where to start.
        </h2>

        {/* Desktop & Tablet 3-column Grid (640px and up) */}
        <div
          data-motion="deck"
          className="hidden sm:grid sm:grid-cols-3 border border-ink w-full"
        >
          {plans.map((plan, idx) => (
            <div
              key={plan.id}
              data-motion="card"
              {...(plan.featured ? { 'data-popular': 'true' } : {})}
              className={`p-6 lg:p-8 flex flex-col gap-4 relative ${
                idx < 2 ? 'border-r border-line' : ''
              } ${plan.featured ? 'bg-white' : 'bg-paper'}`}
            >
              {plan.featured && (
                <div
                  className="absolute top-0 left-0 right-0 h-[6px] bg-accent"
                  aria-hidden="true"
                />
              )}
              <p
                {...(plan.featured ? { 'data-motion': 'popular-tag' } : {})}
                className={`font-mono text-[12px] uppercase tracking-[0.06em] m-0 ${
                  plan.tagTone === 'forest'
                    ? 'text-forest font-semibold'
                    : 'text-muted'
                }`}
              >
                {plan.tag}
              </p>
              <h3 className="text-[24px] lg:text-[26px] font-bold text-ink m-0">
                {plan.title}
              </h3>
              <p
                data-motion="price"
                className="text-[26px] lg:text-[32px] font-extrabold tracking-[-0.02em] text-ink m-0"
              >
                {plan.price}
              </p>
              <p className="text-[15px] leading-[1.55] text-body m-0">
                {plan.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Stack (below 640px, Store + Growth first) */}
        <div className="sm:hidden border border-ink divide-y divide-line">
          {mobilePlans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 flex flex-col gap-3 relative ${
                plan.featured ? 'bg-white' : 'bg-paper'
              }`}
            >
              {plan.featured && (
                <div
                  className="absolute top-0 left-0 right-0 h-[6px] bg-accent"
                  aria-hidden="true"
                />
              )}
              <p
                className={`font-mono text-[12px] uppercase tracking-[0.06em] m-0 ${
                  plan.tagTone === 'forest'
                    ? 'text-forest font-semibold'
                    : 'text-muted'
                }`}
              >
                {plan.tag}
              </p>
              <h3 className="text-[22px] font-bold text-ink m-0">
                {plan.title}
              </h3>
              <p className="text-[28px] font-extrabold tracking-[-0.02em] text-ink m-0">
                {plan.price}
              </p>
              <p className="text-[14px] leading-[1.55] text-body m-0">
                {plan.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default WaysToWork;
