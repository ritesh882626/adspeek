'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, MessageSquare, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenConsultation?: () => void;
}

export function Footer({ onOpenConsultation }: FooterProps) {
  return (
    <footer className="bg-[#02090A] text-[#EFF8F0] border-t border-white/[0.08] pt-16 sm:pt-20 md:pt-28 pb-12">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Top 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12 pb-12 sm:pb-16 border-b border-white/[0.08]">
          {/* Brand Info (2 cols on lg) */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block py-1">
              <span className="text-2xl font-light tracking-tight text-[#EFF8F0] font-sans flex items-center">
                <span className="font-semibold">ads</span>peek
                <span className="w-1.5 h-1.5 rounded-full bg-[#36F4A4] ml-0.5 inline-block" />
              </span>
            </Link>
            <p className="text-sm sm:text-base text-[#A8B1B1] leading-relaxed max-w-sm font-light">
              AdsPeek is a specialized Shopify store development and eCommerce solutions agency. We build, design, and scale high-converting Shopify and Shopify Plus storefronts for direct-to-consumer brands globally.
            </p>

            <div className="pt-2 space-y-2.5 text-xs sm:text-sm text-[#A8B1B1]">
              <div className="flex items-start sm:items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5E1C5] shrink-0 mt-0.5 sm:mt-0" />
                <span>Sector 22, Gurugram, Haryana, India (IST)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5E1C5] shrink-0" />
                <a href="mailto:hello@adspeek.in" className="hover:text-white transition-colors break-all sm:break-normal py-1">
                  hello@adspeek.in
                </a>
              </div>
              <div className="flex items-start sm:items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#C5E1C5] shrink-0 mt-0.5 sm:mt-0" />
                <span>WhatsApp support available for active retainers</span>
              </div>
            </div>

            <div className="pt-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061A1C] border border-[#36F4A4]/20 text-xs text-[#C5E1C5] font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#36F4A4] shrink-0" />
                <span>Shopify Ecosystem Specialists</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#EFF8F0] font-semibold mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8B1B1]">
              <li>
                <a href="#services" className="hover:text-white transition-colors inline-block py-1">
                  Shopify Store Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors inline-block py-1">
                  Shopify Store Design
                </a>
              </li>
              <li>
                <a href="#migration" className="hover:text-white transition-colors inline-block py-1">
                  WooCommerce to Shopify
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors inline-block py-1">
                  Custom Theme Sections
                </a>
              </li>
              <li>
                <a href="#speed" className="hover:text-white transition-colors inline-block py-1">
                  Speed &amp; Performance Optimization
                </a>
              </li>
              <li>
                <a href="#shopify-plus" className="hover:text-white transition-colors inline-block py-1">
                  Shopify Plus &amp; Enterprise
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#EFF8F0] font-semibold mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8B1B1]">
              <li>
                <a href="#process" className="hover:text-white transition-colors inline-block py-1">
                  Development Process
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors inline-block py-1">
                  Selected Work &amp; Portfolio
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors inline-block py-1">
                  Founder Testimonials
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-white transition-colors inline-block py-1">
                  Why Choose AdsPeek
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors inline-block py-1">
                  Shopify Strategy Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Consultation / Action Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#EFF8F0] font-semibold mb-4">
              Get Started
            </h4>
            <p className="text-xs sm:text-sm text-[#A8B1B1] mb-4 leading-relaxed font-light">
              Ready to build, redesign, or migrate your Shopify store? Schedule a free discovery session.
            </p>
            {onOpenConsultation ? (
              <button
                onClick={onOpenConsultation}
                className="w-full py-3.5 px-4 rounded-full bg-[#0C5A48] hover:bg-[#084537] text-white text-xs sm:text-sm font-medium transition-all shadow-sm flex items-center justify-center cursor-pointer min-h-[44px]"
              >
                <span>Request Consultation</span>
              </button>
            ) : (
              <a
                href="#hero-inquiry"
                className="w-full py-3.5 px-4 rounded-full bg-[#0C5A48] hover:bg-[#084537] text-white text-xs sm:text-sm font-medium transition-all shadow-sm flex items-center justify-center cursor-pointer min-h-[44px]"
              >
                <span>Request Consultation</span>
              </a>
            )}

            <div className="mt-6 pt-4 border-t border-white/[0.08]">
              <span className="text-[11px] font-mono text-[#71717A] uppercase block mb-1">
                Serving Brands In
              </span>
              <p className="text-xs text-[#A8B1B1]">
                India &bull; UAE &bull; USA &bull; UK &bull; Australia &bull; Canada
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>
            &copy; {new Date().getFullYear()} AdsPeek Technologies. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="#hero-inquiry" className="hover:text-white transition-colors py-1">
              Privacy Policy
            </a>
            <a href="#hero-inquiry" className="hover:text-white transition-colors py-1">
              Terms of Service
            </a>
            <span className="inline-flex items-center gap-1.5 text-[#C5E1C5]/80 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#36F4A4] animate-pulse shrink-0" />
              <span>Taking new projects for Q2</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
