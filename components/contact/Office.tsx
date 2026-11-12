import React from 'react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';

export const Office: React.FC = () => {
  return (
    <Section
      id="office"
      bg="paper"
      border={true}
      padTopDesktop={96}
      padBottomDesktop={96}
      padTopMobile={64}
      padBottomMobile={64}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 items-stretch w-full">
        {/* Left Column (about 35%) */}
        <div className="w-full lg:w-[35%] flex flex-col">
          <Eyebrow>Visit us</Eyebrow>
          <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0 mb-8">
            Sector 22, Gurugram
          </h2>

          <dl className="m-0 p-0 flex flex-col gap-5 border-t border-line pt-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
              <dt className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted shrink-0 sm:w-[120px]">
                Address
              </dt>
              <dd className="m-0 text-[15px] sm:text-[16px] leading-[1.5] text-body">
                [Full street address]
                <br />
                Sector 22, Gurugram, Haryana [PIN]
              </dd>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-t border-line pt-5">
              <dt className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted shrink-0 sm:w-[120px]">
                Hours
              </dt>
              <dd className="m-0 text-[15px] sm:text-[16px] leading-[1.5] text-body">
                [Mon–Sat, 10:00–19:00 IST]
              </dd>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-t border-line pt-5">
              <dt className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted shrink-0 sm:w-[120px]">
                Meetings
              </dt>
              <dd className="m-0 text-[15px] sm:text-[16px] leading-[1.5] text-body">
                In person by appointment; online for clients outside NCR
              </dd>
            </div>
          </dl>
        </div>

        {/* Right Column: Map Embed Placeholder (about 65%) */}
        <div className="w-full lg:w-[65%] min-w-0 flex items-center">
          <div className="w-full relative aspect-[4/3] sm:aspect-[16/9] bg-placeholder border border-line flex items-center justify-center p-4 text-center">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted">
              [Google Map embed]
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Office;
