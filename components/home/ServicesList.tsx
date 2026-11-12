import React from 'react';
import Link from 'next/link';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';

export const ServicesList: React.FC = () => {
  const services = [
    {
      code: 'S1',
      name: 'Shopify Development',
      href: '/shopify-development',
      description:
        'Custom themes, headless storefronts, migrations from WooCommerce or marketplaces.',
      forAudience: 'Brands launching or rebuilding their store',
    },
    {
      code: 'S2',
      name: 'Website Development',
      href: '#',
      description:
        'Business and brand sites in Next.js or WordPress — fast, editable, built to rank.',
      forAudience: 'Companies that need leads, not a template',
    },
    {
      code: 'S3',
      name: 'App Development',
      href: '#',
      description:
        'Custom apps, Shopify apps and internal tools that remove manual work.',
      forAudience: 'Teams outgrowing spreadsheets and plugins',
    },
    {
      code: 'S4',
      name: 'Meta Ads',
      href: '#',
      description:
        'Sales, retargeting and Click-to-WhatsApp campaigns, with creatives made in-house.',
      forAudience: 'Stores ready to scale paid traffic',
    },
  ];

  return (
    <Section
      id="services"
      bg="white"
      border={true}
      padTopDesktop={96}
      padBottomDesktop={96}
      padTopTablet={72}
      padBottomTablet={72}
      padTopMobile={56}
      padBottomMobile={56}
    >
      <Eyebrow>02 — Services</Eyebrow>
      <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0 mb-12">
        Four things we do.
        <span className="hidden sm:inline">
          <br />
        </span>{' '}
        All of them connect.
      </h2>

      <div className="border-t-2 border-ink">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.href}
            className="group block border-b border-line py-6 sm:py-8 transition-colors text-ink"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] gap-4 sm:gap-6 items-baseline">
              {/* Col 1: Code + Title */}
              <div className="flex items-baseline gap-4 sm:gap-5">
                <span className="font-mono text-[13px] sm:text-[14px] text-muted shrink-0">
                  {service.code}
                </span>
                <span className="text-[24px] sm:text-[28px] lg:text-[30px] font-bold tracking-[-0.02em] text-ink group-hover:text-forest transition-colors">
                  {service.name}
                </span>
              </div>

              {/* Col 2: Description */}
              <p className="m-0 text-[15px] sm:text-[16px] leading-[1.55] text-body">
                {service.description}
              </p>

              {/* Col 3: For audience */}
              <div className="md:col-start-2 lg:col-start-3">
                <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted block mb-1">
                  For
                </span>
                <p className="m-0 text-[14px] sm:text-[15px] leading-[1.55] text-muted">
                  {service.forAudience}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default ServicesList;

