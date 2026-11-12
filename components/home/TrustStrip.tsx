import React from 'react';
import Container from '../ui/Container';

export const TrustStrip: React.FC = () => {
  return (
    <section
      aria-label="At a glance"
      className="border-b border-line bg-white w-full"
    >
      <Container className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Cell 1 */}
          <div className="py-7 px-5 sm:px-6 border-b sm:border-b-0 border-r-0 sm:border-r border-line flex flex-col justify-center">
            <p className="text-[32px] sm:text-[40px] font-extrabold tracking-[-0.03em] text-ink m-0 leading-none">
              [XX]
            </p>
            <p className="mt-1.5 mb-0 text-muted text-[15px]">
              Stores launched
            </p>
          </div>

          {/* Cell 2 */}
          <div className="py-7 px-5 sm:px-6 border-b sm:border-b-0 lg:border-r border-line flex flex-col justify-center">
            <p className="text-[32px] sm:text-[40px] font-extrabold tracking-[-0.03em] text-ink m-0 leading-none">
              [X]+ yrs
            </p>
            <p className="mt-1.5 mb-0 text-muted text-[15px]">
              Building and running D2C brands
            </p>
          </div>

          {/* Cell 3 */}
          <div className="py-7 px-5 sm:px-6 border-b sm:border-b-0 sm:border-t lg:border-t-0 border-r-0 sm:border-r border-line flex flex-col justify-center">
            <p className="text-[32px] sm:text-[40px] font-extrabold tracking-[-0.03em] text-ink m-0 leading-none">
              [X] countries
            </p>
            <p className="mt-1.5 mb-0 text-muted text-[15px]">
              Clients across India, UAE, UK, US
            </p>
          </div>

          {/* Cell 4 */}
          <div className="py-7 px-5 sm:px-6 sm:border-t lg:border-t-0 border-line flex flex-col justify-center">
            <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted mb-3 m-0">
              Built with
            </p>
            <p className="m-0 text-[17px] font-semibold text-ink leading-[1.6]">
              Shopify · Meta · Google · Next.js · WhatsApp API
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrustStrip;
