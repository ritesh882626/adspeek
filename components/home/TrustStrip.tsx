import React from 'react';
import Container from '../ui/Container';

export const TrustStrip: React.FC = () => {
  return (
    <section
      aria-label="At a glance"
      className="border-b border-line bg-white w-full"
    >
      <Container className="px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-line">
          {/* Cell 1 */}
          <div className="py-5 pr-3 sm:p-6 lg:py-7 lg:pl-0 lg:pr-6 border-b sm:border-b sm:border-r-0 lg:border-b-0 lg:border-r border-line flex flex-col justify-center">
            <p className="text-[30px] sm:text-[40px] font-extrabold tracking-[-0.03em] text-ink m-0 leading-none">
              [XX]
            </p>
            <p className="mt-1.5 mb-0 text-muted text-[15px]">
              Stores launched
            </p>
          </div>

          {/* Cell 2 */}
          <div className="py-5 pl-3 sm:p-6 lg:py-7 lg:px-6 border-b sm:border-b sm:border-r-0 lg:border-b-0 lg:border-r border-line flex flex-col justify-center">
            <p className="text-[30px] sm:text-[40px] font-extrabold tracking-[-0.03em] text-ink m-0 leading-none">
              [X]+ yrs
            </p>
            <p className="mt-1.5 mb-0 text-muted text-[15px]">
              Building and running D2C brands
            </p>
          </div>

          {/* Cell 3 */}
          <div className="py-5 pr-3 sm:p-6 lg:py-7 lg:px-6 border-b sm:border-b-0 lg:border-b-0 lg:border-r border-line flex flex-col justify-center">
            <p className="text-[30px] sm:text-[40px] font-extrabold tracking-[-0.03em] text-ink m-0 leading-none">
              [X] countries
            </p>
            <p className="mt-1.5 mb-0 text-muted text-[15px]">
              Clients across India, UAE, UK, US
            </p>
          </div>

          {/* Cell 4 - spans full width on phone, 1 col on desktop */}
          <div className="col-span-2 lg:col-span-1 py-5 sm:p-6 lg:py-7 lg:pl-6 lg:pr-0 border-line flex flex-col justify-center">
            <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted mb-3 m-0">
              Built with
            </p>
            <p className="m-0 text-[16px] sm:text-[17px] font-semibold text-ink leading-[1.6]">
              Shopify · Meta · Google · Next.js · WhatsApp API
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrustStrip;
