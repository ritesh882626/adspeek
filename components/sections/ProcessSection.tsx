import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  IconProcessScope,
  IconProcessDev,
  IconProcessLaunch,
} from '@/components/ui/PremiumIcons';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Discover & Scope',
      icon: IconProcessScope,
      tag: 'WEEK 1',
      desc: 'We deeply analyze your catalog, customer personas, competitive landscape, and technical requirements before writing a single line of code.',
      deliverables: [
        'Brand & customer journey mapping',
        'Information architecture & sitemap',
        'Technical stack & app review',
      ],
      uiMock: {
        heading: 'Architecture Blueprint',
        badge: 'SCOPE APPROVED',
        stat: '100% Tailored Scope',
      },
    },
    {
      number: '02',
      title: 'Design & Develop',
      icon: IconProcessDev,
      tag: 'WEEKS 2-4',
      desc: 'We craft high-fidelity Figma designs, then build clean, modular Shopify Liquid code with responsive touch optimization across all screen sizes.',
      deliverables: [
        'Custom modular theme sections',
        'Mobile-first UX prototypes',
        'Custom product & cart templates',
      ],
      uiMock: {
        heading: 'Clean Liquid Code',
        badge: 'ZERO BLOAT',
        stat: '< 45KB Theme CSS',
      },
    },
    {
      number: '03',
      title: 'Test & Launch',
      icon: IconProcessLaunch,
      tag: 'WEEK 5',
      desc: 'A comprehensive 40-point pre-launch checklist covering checkout flow, payment gateways, mobile performance, tracking pixels, and redirects.',
      deliverables: [
        'End-to-end checkout & payment QA',
        'Lighthouse 90+ speed audit',
        'GA4 & Meta CAPI verification',
      ],
      uiMock: {
        heading: '40-Point Pre-Flight QA',
        badge: 'READY TO LAUNCH',
        stat: 'Zero Downtime Handover',
      },
    },
  ];

  return (
    <section id="process" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-[#02090A] text-[#EFF8F0] border-b border-white/[0.08] relative overflow-hidden scroll-mt-20">
      {/* Background Subtle Teal Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#0B3A2D]/20 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider mb-3.5 border border-[#C5E1C5]/20 font-mono">
            <span>OUR PROCESS</span>
          </div>
          <h2 className="type-section text-[#EFF8F0] font-light">
            How We Build Stores That{' '}
            <span className="font-normal text-[#C5E1C5]">Actually Convert</span>
          </h2>
          <p className="type-body text-[#A8B1B1] mt-3 sm:mt-4 font-light">
            A disciplined, milestone-driven development process engineered to launch on time, on budget, and without post-launch bugs.
          </p>
        </div>

        {/* 3 Step Cards - 1-Col Mobile, 3-Col Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-7">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 md:p-8 rounded-2xl bg-[#061A1C] border border-white/[0.08] shadow-card-dark flex flex-col justify-between hover:border-[#C5E1C5]/30 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl sm:text-3xl font-mono font-light text-[#C5E1C5]/90">
                      {step.number}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded bg-[#02090A] text-[#C5E1C5] border border-white/[0.08]">
                      {step.tag}
                    </span>
                  </div>

                  {/* Illuminated Pedestal */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#06221E] via-[#041618] to-[#02090A] border border-[#36F4A4]/30 shadow-[0_0_20px_rgba(54,244,164,0.1),inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-center justify-center mb-4 sm:mb-5 group-hover:border-[#36F4A4]/60 group-hover:shadow-[0_0_28px_rgba(54,244,164,0.2)] group-hover:-translate-y-0.5 transition-all duration-300">
                    <Icon size={30} />
                  </div>

                  <h3 className="type-card text-[#EFF8F0] mb-2.5">{step.title}</h3>

                  <p className="text-xs sm:text-sm md:text-base text-[#A8B1B1] leading-relaxed mb-5 font-light">
                    {step.desc}
                  </p>

                  <ul className="space-y-2 mb-5 border-t border-white/[0.08] pt-3.5">
                    {step.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="text-xs sm:text-sm text-[#EFF8F0]/80 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C5E1C5] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compact UI Visual Mockup */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#02090A] border border-white/[0.08] mt-2">
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#A8B1B1] mb-1">
                    <span>{step.uiMock.heading}</span>
                    <span className="text-[#C5E1C5]">{step.uiMock.badge}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#EFF8F0]">
                    {step.uiMock.stat}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
