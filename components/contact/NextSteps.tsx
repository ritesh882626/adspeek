import React from 'react';

export const NextSteps: React.FC = () => {
  const steps = [
    {
      num: '01',
      text: 'We read your message and look at your store or idea.',
    },
    {
      num: '02',
      text: 'You get a reply on WhatsApp or email with first thoughts.',
    },
    {
      num: '03',
      text: 'If it fits, we book a call and send a quote after it.',
    },
  ];

  return (
    <div className="w-full">
      <p className="text-[18px] font-bold text-ink m-0 mb-2">
        What happens next
      </p>
      <ol className="list-none m-0 p-0 border-t-2 border-ink">
        {steps.map((step, idx) => (
          <li
            key={idx}
            className="flex items-start gap-4 py-4.5 border-b border-line"
          >
            <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted shrink-0 pt-0.5">
              {step.num}
            </span>
            <span className="text-[15px] sm:text-[16px] leading-[1.5] text-body">
              {step.text}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default NextSteps;

