import React from 'react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Placeholder from '../ui/Placeholder';

export const Story: React.FC = () => {
  return (
    <Section
      id="story"
      bg="white"
      border={true}
      padTopDesktop={96}
      padBottomDesktop={96}
      padTopMobile={64}
      padBottomMobile={64}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 items-start w-full">
        {/* Photo: Desktop/Tablet left (40%), Mobile after text */}
        <div className="hidden lg:block w-[38%] shrink-0">
          <Placeholder
            ratio="4/5"
            label="[Founder / team photo at the Gurugram office]"
            className="w-full"
          />
        </div>

        {/* Text: Desktop right (60%), Mobile first */}
        <div className="w-full lg:w-[62%] min-w-0 flex flex-col">
          <Eyebrow>Why AdsPeek exists</Eyebrow>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0 mb-8">
            Too many good stores
            <span className="hidden sm:inline">
              <br />
            </span>{' '}
            were left alone.
          </h2>

          <div className="text-[17px] sm:text-[18px] leading-[1.65] text-body flex flex-col gap-5 max-w-[640px]">
            <p className="m-0">
              [Your story in 2–3 short paragraphs: what you saw while selling ads and building stores — brands paying for a beautiful store, then being handed over with no traffic, no follow-up and no tracking.]
            </p>
            <p className="m-0">
              [Why you started AdsPeek to fix that: one team that builds the store and stays on to grow it.]
            </p>
            <p className="m-0">
              [Where you are today: the brands you work with, in India and abroad.]
            </p>
          </div>

          <p className="mt-8 mb-0 text-[16px] font-bold text-ink">
            Ritesh Kumar Singh{' '}
            <span className="font-normal text-muted">· Founder</span>
          </p>

          {/* Photo on Mobile & Tablet (<1024px) placed after text */}
          <div className="lg:hidden mt-8 w-full max-w-[420px]">
            <Placeholder
              ratio="4/5"
              label="[Founder / team photo at the Gurugram office]"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Story;
