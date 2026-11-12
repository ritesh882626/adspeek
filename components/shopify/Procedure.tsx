import React from 'react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';

export const Procedure: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Quote & call',
      youGet: 'Itemised quote for your package, then a call to confirm scope.',
      youGiveLabel: 'You give',
      youGive: 'Brand assets, product list, any reference stores you like.',
    },
    {
      num: '02',
      title: 'Design',
      youGet: 'Homepage and key page designs, desktop and mobile.',
      youGiveLabel: 'You give',
      youGive: 'Feedback and approval, up to [2] revision rounds.',
    },
    {
      num: '03',
      title: 'Build & set up',
      youGet: 'Store built, products uploaded, integrations and automations connected.',
      youGiveLabel: 'You give',
      youGive: 'Access to payment, shipping and app accounts.',
    },
    {
      num: '04',
      title: 'Test & launch',
      youGet: 'Test orders on every device, tracking checked, store goes live.',
      youGiveLabel: 'You give',
      youGive: 'Final sign-off.',
    },
    {
      num: '05',
      title: 'Handover or grow',
      youGet:
        'Training session and [X] days of support — or we keep running ads and automations monthly.',
      youGiveLabel: 'You choose',
      youGive: 'Run it yourself, or keep us on the Growth plan.',
    },
  ];

  return (
    <Section
      id="process"
      bg="paper"
      border={true}
      padTopDesktop={96}
      padBottomDesktop={96}
      padTopMobile={64}
      padBottomMobile={64}
    >
      <Eyebrow>After you send it</Eyebrow>
      <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0 mb-14">
        From package to live store.
      </h2>

      <ol className="list-none m-0 p-0 border-t-2 border-ink">
        {steps.map((step, idx) => (
          <li
            key={idx}
            className="py-7 border-b border-line grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1.2fr] gap-4 md:gap-6 lg:gap-8 items-baseline"
          >
            {/* Col 1: Num + Title */}
            <div className="flex items-baseline gap-4 sm:gap-5">
              <span className="font-mono text-[14px] text-muted shrink-0">
                {step.num}
              </span>
              <span className="text-[20px] sm:text-[22px] font-bold text-ink tracking-tight">
                {step.title}
              </span>
            </div>

            {/* Col 2: You get */}
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-muted block mb-1">
                You get
              </span>
              <p className="m-0 text-[15px] leading-[1.55] text-body">
                {step.youGet}
              </p>
            </div>

            {/* Col 3: You give / You choose */}
            <div className="md:col-start-2 lg:col-start-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-muted block mb-1">
                {step.youGiveLabel}
              </span>
              <p className="m-0 text-[15px] leading-[1.55] text-body">
                {step.youGive}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
};

export default Procedure;
