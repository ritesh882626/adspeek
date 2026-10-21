import React from 'react';
import {
  Code,
  Layers,
  Cpu,
  Database,
  CreditCard,
  Mail,
  Search,
  BarChart2,
  Terminal,
  Zap,
  Globe,
  Settings,
} from 'lucide-react';

export function TechIntegrationsSection() {
  const technologies = [
    { name: 'Shopify / Plus', category: 'Platform Core', icon: Layers },
    { name: 'Liquid Templating', category: 'Theme Engine', icon: Code },
    { name: 'TypeScript & JS', category: 'Frontend Logic', icon: Terminal },
    { name: 'Next.js & React', category: 'Headless Stack', icon: Cpu },
    { name: 'Storefront API', category: 'GraphQL Engine', icon: Database },
    { name: 'Tailwind CSS', category: 'Design System', icon: Zap },
    { name: 'Klaviyo', category: 'Marketing Automation', icon: Mail },
    { name: 'Recharge', category: 'Subscriptions', icon: Settings },
    { name: 'Gorgias', category: 'Customer Support', icon: Globe },
    { name: 'Stripe & Shop Pay', category: 'Payments & Checkout', icon: CreditCard },
    { name: 'Meta Pixel & CAPI', category: 'Ad Attribution', icon: BarChart2 },
    { name: 'Google Analytics 4', category: 'eCommerce Analytics', icon: Search },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-[#02090A] text-[#EFF8F0] border-b border-white/[0.08] relative overflow-hidden scroll-mt-20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider mb-3.5 border border-[#C5E1C5]/20 font-mono">
            <span>ECOSYSTEM INTEGRATIONS</span>
          </div>
          <h2 className="type-section text-[#EFF8F0] font-light">
            Built on the{' '}
            <span className="font-normal text-[#C5E1C5]">Right Technology</span>
          </h2>
          <p className="type-body text-[#A8B1B1] mt-3 sm:mt-4 font-light">
            We build with standard, robust technologies supported by the official Shopify ecosystem—preventing vendor lock-in and brittle dependencies.
          </p>
        </div>

        {/* 2-Col Mobile, 3-Col Tablet, 4-Col Desktop, 6-Col Wide */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {technologies.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div
                key={i}
                className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-[#061A1C] border border-white/[0.08] hover:border-[#C5E1C5]/30 hover:bg-[#082224] transition-all text-center flex flex-col items-center justify-center group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#02090A] border border-white/[0.08] text-[#C5E1C5] flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-medium text-[#EFF8F0] group-hover:text-[#C5E1C5] transition-colors truncate max-w-full">
                  {tech.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] font-mono text-[#A8B1B1] mt-0.5 truncate max-w-full">
                  {tech.category}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
