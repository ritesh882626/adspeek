import React from 'react';
import Link from 'next/link';
import { ArrowRight, Home, Layers, MapPin, HelpCircle, Briefcase } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  const hubs = [
    { label: 'Shopify Services', href: '/services/', icon: Layers },
    { label: 'Selected Work', href: '/work/', icon: Briefcase },
    { label: 'Locations & Hubs', href: '/locations/', icon: MapPin },
    { label: 'Questions & FAQs', href: '/questions/', icon: HelpCircle },
  ];

  return (
    <div className="bg-[#FAF9F5] min-h-[80vh] flex items-center justify-center py-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-semibold uppercase tracking-wider border border-[#D1EFE3] font-mono">
            <span>404 — PAGE NOT FOUND</span>
          </div>

          <h1 className="type-hero text-gray-950 font-light">
            Looking for a Shopify Page That Moved?
          </h1>

          <p className="type-body text-gray-600 font-light max-w-lg mx-auto">
            The link you followed may be outdated or mistyped. Explore our primary hubs below or head back to the homepage.
          </p>

          <div className="pt-4 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0C5A48] hover:bg-[#084537] text-white text-sm font-medium shadow-md transition-all min-h-[48px]"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>
          </div>

          <div className="pt-12 border-t border-gray-200/80">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block mb-4">
              Explore AdsPeek Hubs
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
              {hubs.map((hub) => {
                const Icon = hub.icon;
                return (
                  <Link
                    key={hub.href}
                    href={hub.href}
                    className="p-3.5 rounded-xl bg-white border border-gray-200/80 hover:border-[#0C5A48]/30 hover:bg-[#EBF7F2] transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-gray-800 group-hover:text-[#0C5A48]">
                      <Icon className="w-4 h-4 text-[#0C5A48]" />
                      <span>{hub.label}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
