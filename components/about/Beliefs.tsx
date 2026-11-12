import React from 'react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';

export const Beliefs: React.FC = () => {
  const beliefs = [
    {
      num: '01',
      title: 'Launch is the start.',
      desc: 'A store with no traffic, follow-up or tracking is a cost, not an asset. We plan the selling before we design the store.',
    },
    {
      num: '02',
      title: 'One team, not three vendors.',
      desc: 'The people who build your store run your ads and automations, so nothing gets lost in a hand-off.',
    },
    {
      num: '03',
      title: 'Pay for what you use.',
      desc: 'Every project is built from the parts you need. No padded packages.',
    },
    {
      num: '04',
      title: 'Show the numbers.',
      desc: "One clear weekly report. If something isn't working, you hear it from us first.",
    },
  ];

  return (
    <Section
      id="beliefs"
      bg="paper"
      border={true}
      padTopDesktop={96}
      padBottomDesktop={96}
      padTopTablet={72}
      padBottomTablet={72}
      padTopMobile={56}
      padBottomMobile={56}
    >
      <Eyebrow>What we believe</Eyebrow>
      <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0 mb-12">
        Four rules we work by.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {beliefs.map((b, idx) => (
          <div key={idx} className="border-t-2 border-ink pt-7 flex flex-col gap-3">
            <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted">
              {b.num}
            </span>
            <h3 className="text-[22px] sm:text-[24px] font-bold tracking-[-0.01em] text-ink m-0">
              {b.title}
            </h3>
            <p className="m-0 text-[15px] leading-[1.55] text-body">
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Beliefs;

