'use client';

import React, { useRef } from 'react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';
import SpecList from '../ui/SpecList';
import { useHeroMotion } from './useHeroMotion';

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useHeroMotion(sectionRef);

  const specItems = [
    {
      label: 'Platform',
      value: (
        <span data-motion="spec-value" className="font-medium">
          Shopify · Shopify Plus · Headless
        </span>
      ),
    },
    {
      label: 'Build time',
      value: (
        <span data-motion="spec-value" className="font-medium">
          3–4 weeks
        </span>
      ),
    },
    {
      label: 'After launch',
      value: (
        <span data-motion="spec-value" className="font-medium">
          Meta ads, WhatsApp automation, tracking
        </span>
      ),
    },
    {
      label: 'Best for',
      value: (
        <span data-motion="spec-value" className="font-medium">
          Premium D2C brands, India &amp; overseas
        </span>
      ),
    },
    {
      label: 'Starts from',
      value: (
        <span data-motion="spec-value" className="font-bold">
          ₹14,999
        </span>
      ),
    },
  ];

  return (
    <div ref={sectionRef}>
      <Section
        id="top"
        bg="paper"
        border={true}
        padTopDesktop={88}
        padBottomDesktop={80}
        padTopTablet={72}
        padBottomTablet={72}
        padTopMobile={40}
        padBottomMobile={56}
      >
        <div
          data-motion="hero"
          className="flex flex-col lg:flex-row items-stretch lg:items-end gap-12 lg:gap-14"
        >
          {/* Left Column */}
          <div className="w-full lg:w-[60%] flex flex-col justify-end">
            <div data-motion="eyebrow" className="mb-7">
              <Eyebrow>
                Shopify development &amp; growth · Gurugram → worldwide
              </Eyebrow>
            </div>

            <h1
              aria-label="We build your store. Then the system that sells from it."
              className="text-[42px] sm:text-[56px] lg:text-[76px] leading-[1.02] sm:leading-[0.98] tracking-[-0.035em] font-extrabold text-ink m-0"
              style={{ perspective: 700 }}
            >
              <span data-motion="line1" className="inline">
                We build your store.
              </span>
              <span className="hidden sm:inline">
                <br />
              </span>{' '}
              <span
                data-motion="highlight"
                className="bg-accent text-ink px-[10px] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] inline-block"
              >
                Then the system
              </span>
              <span className="hidden sm:inline">
                <br />
              </span>{' '}
              <span data-motion="line3" className="inline-block">
                that sells from it.
              </span>
            </h1>

            <p
              data-motion="lead"
              className="text-[17px] sm:text-[18px] lg:text-[20px] leading-[1.5] text-body max-w-[560px] my-8 lg:mt-8 lg:mb-10"
            >
              Most agencies hand over the store and leave. AdsPeek stays on — running the ads, automations and tracking that turn a launch into steady sales.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto">
              <div data-motion="cta">
                <Button href="/contact" variant="dark">
                  Book a free strategy call
                </Button>
              </div>
              <div data-motion="cta">
                <Button href="#system" variant="outline">
                  How the system works
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Spec sheet */}
          <div className="w-full lg:w-[40%] flex" style={{ perspective: 900 }}>
            <div data-motion="spec" className="w-full self-end">
              <SpecList
                headerLeft="Engagement spec"
                headerRight="AP-01"
                items={specItems}
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Hero;
