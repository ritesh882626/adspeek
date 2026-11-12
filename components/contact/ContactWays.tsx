import React from 'react';
import Section from '../ui/Section';

export const ContactWays: React.FC = () => {
  const ways = [
    {
      id: 'call',
      num: '01',
      title: 'Book a call',
      desc: '30-minute strategy call. Pick a time that suits you.',
      val: '[Calendar link]',
      linkText: 'Pick a time',
      href: '#calendar',
    },
    {
      id: 'whatsapp',
      num: '02',
      title: 'WhatsApp',
      desc: 'Fastest reply. Send us your store link or idea.',
      val: '[+91 XXXXX XXXXX]',
      linkText: 'Open WhatsApp',
      href: 'https://wa.me/[NUMBER]',
    },
    {
      id: 'email',
      num: '03',
      title: 'Email',
      desc: 'Send a brief, RFP or question. We reply in [24 hours].',
      val: '[hello@adspeek.in]',
      linkText: 'Send an email',
      href: 'mailto:[hello@adspeek.in]',
    },
  ];

  // Mobile order: WhatsApp first, then Book a call, then Email
  const mobileWays = [ways[1], ways[0], ways[2]];

  return (
    <Section
      id="contact-ways"
      bg="paper"
      border={true}
      padTopDesktop={64}
      padBottomDesktop={64}
      padTopMobile={48}
      padBottomMobile={48}
    >
      {/* Desktop & Tablet 3-column Grid (640px and up) */}
      <div className="hidden sm:grid sm:grid-cols-3 border border-ink bg-white w-full">
        {ways.map((item, idx) => (
          <div
            key={item.id}
            className={`p-5 lg:p-7 flex flex-col gap-3 relative ${
              idx < 2 ? 'border-r border-line' : ''
            }`}
          >
            <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted">
              {item.num}
            </span>
            <h3 className="text-[22px] lg:text-[26px] font-bold text-ink m-0">
              {item.title}
            </h3>
            <p className="m-0 text-[15px] leading-[1.5] text-body">
              {item.desc}
            </p>
            <p className="m-0 text-[17px] font-semibold text-ink">
              {item.val}
            </p>
            <a
              href={item.href}
              className="font-semibold text-[15px] lg:text-[16px] text-ink underline hover:text-forest transition-colors min-h-[44px] inline-flex items-center mt-auto pt-2"
            >
              {item.linkText}
            </a>
          </div>
        ))}
      </div>

      {/* Mobile Stacked List (below 640px, WhatsApp first) */}
      <div className="sm:hidden border border-ink bg-white divide-y divide-line">
        {mobileWays.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="p-6 flex flex-col gap-2.5 text-ink no-underline block hover:bg-black/[0.02] transition-colors"
          >
            <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted">
              {item.num}
            </span>
            <h3 className="text-[22px] font-bold text-ink m-0">
              {item.title}
            </h3>
            <p className="m-0 text-[15px] leading-[1.5] text-body">
              {item.desc}
            </p>
            <p className="m-0 text-[17px] font-semibold text-ink">
              {item.val}
            </p>
            <span className="font-semibold text-[15px] text-ink underline pt-1 min-h-[44px] flex items-center">
              {item.linkText}
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
};

export default ContactWays;
