import React from 'react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Highlight from '../ui/Highlight';
import Button from '../ui/Button';
import SpecList from '../ui/SpecList';

export const Hero: React.FC = () => {
  const specItems = [
    {
      label: 'Platform',
      value: <span className="font-medium">Shopify · Shopify Plus · Headless</span>,
    },
    {
      label: 'Build time',
      value: <span className="font-medium">[X–Y] weeks</span>,
    },
    {
      label: 'After launch',
      value: <span className="font-medium">Meta ads, WhatsApp automation, tracking</span>,
    },
    {
      label: 'Best for',
      value: <span className="font-medium">Premium D2C brands, India &amp; overseas</span>,
    },
    {
      label: 'Starts from',
      value: <span className="font-bold">[YOUR PRICE]</span>,
    },
  ];

  return (
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
      <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-12 lg:gap-14">
        {/* Left Column */}
        <div className="w-full lg:w-[60%] flex flex-col justify-end">
          <Eyebrow className="mb-7">
            Shopify development &amp; growth · Gurugram → worldwide
          </Eyebrow>

          <h1 className="text-[42px] sm:text-[56px] lg:text-[76px] leading-[1.02] sm:leading-[0.98] tracking-[-0.035em] font-extrabold text-ink m-0">
            We build your store.
            <span className="hidden sm:inline">
              <br />
            </span>{' '}
            <Highlight>Then the system</Highlight>
            <span className="hidden sm:inline">
              <br />
            </span>{' '}
            that sells from it.
          </h1>

          <p className="text-[17px] sm:text-[18px] lg:text-[20px] leading-[1.5] text-body max-w-[560px] my-8 lg:mt-8 lg:mb-10">
            Most agencies hand over the store and leave. AdsPeek stays on — running the ads, automations and tracking that turn a launch into steady sales.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto">
            <Button href="/contact" variant="dark">
              Book a free strategy call
            </Button>
            <Button href="#system" variant="outline">
              How the system works
            </Button>
          </div>
        </div>

        {/* Right Column: Spec sheet */}
        <div className="w-full lg:w-[40%] flex">
          <SpecList
            headerLeft="Engagement spec"
            headerRight="AP-01"
            items={specItems}
            className="self-end"
          />
        </div>
      </div>
    </Section>
  );
};

export default Hero;

