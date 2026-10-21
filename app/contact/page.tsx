import React from 'react';
import type { Metadata } from 'next';
import { Mail, MapPin, MessageSquare, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HeroInquiryCard } from '@/components/sections/HeroInquiryCard';

export const metadata: Metadata = buildMetadata({
  title: 'Contact AdsPeek | Schedule a Free Shopify Consultation',
  description:
    'Get in touch with AdsPeek. Request a comprehensive Shopify store proposal, discovery call, or technical migration roadmap within 24 hours.',
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Header */}
      <section className="bg-gradient-teal text-[#EFF8F0] pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.12),rgba(2,9,10,0.8))]" />
        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: 'Contact Us', href: '/contact/' }]} />
          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono mb-4">
              <span>GET IN TOUCH</span>
            </div>
            <h1 className="type-hero text-[#EFF8F0] font-light">
              Start Your Shopify Project With{' '}
              <span className="font-normal text-[#C5E1C5]">AdsPeek</span>
            </h1>
            <p className="type-body text-[#A8B1B1] mt-4 font-light leading-relaxed">
              Tell us about your brand, store vision, or migration plans. We will review your requirements and deliver an honest scope, architectural roadmap, and pricing estimate within 24 hours.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Content & Form Grid */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Contact Info */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0C5A48] bg-[#EBF7F2] px-3.5 py-1 rounded-full border border-[#D1EFE3] inline-block mb-3">
                  DIRECT CONTACT
                </span>
                <h2 className="type-section text-gray-950 font-light mb-4">
                  Speak Directly With Our Engineering Lead
                </h2>
                <p className="type-body text-gray-600 font-light">
                  No junior sales reps. You will speak with a seasoned technical director who understands Shopify Liquid, checkout conversion, and eCommerce architecture.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF7F2] text-[#0C5A48] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Engineering Studio</h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-light mt-1">
                      Sector 22, Gurugram, Haryana, India (IST, UTC+5:30)
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      In-person discovery sessions available by appointment.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF7F2] text-[#0C5A48] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Email Inquiries</h3>
                    <a
                      href="mailto:hello@adspeek.in"
                      className="text-xs sm:text-sm text-[#0C5A48] font-medium hover:underline block mt-1"
                    >
                      hello@adspeek.in
                    </a>
                    <p className="text-xs text-gray-400 mt-1">
                      Guaranteed response within 24 business hours.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF7F2] text-[#0C5A48] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Client Support Hours</h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-light mt-1">
                      Monday to Friday: 9:00 AM – 6:00 PM IST
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Real-time overlapping hours for UAE, UK, and US East Coast clients.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#061A1C] text-white border border-[#142024] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#36F4A4] uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confidentiality Guaranteed</span>
                </div>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  We are happy to sign a mutual Non-Disclosure Agreement (NDA) before reviewing your proprietary product lines, financial metrics, or brand designs.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-6">
              <HeroInquiryCard />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
