"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";

const services = [
  { label: "Performance Marketing", href: "/services/performance-marketing" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "App Development", href: "/services/app-development" },
  { label: "SEO & Content", href: "/services/seo-content" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

function CollapsibleGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 md:border-none">
      {/* Mobile: toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="no-select md:hidden flex items-center justify-between w-full py-4 text-left min-h-[44px]"
        aria-expanded={open}
      >
        <span className="text-[12px] font-extrabold uppercase tracking-[0.09em] text-white/40">
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`text-white/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Desktop: always visible heading */}
      <h3 className="hidden md:block font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
        {title}
      </h3>

      {/* Links — always visible on desktop, toggle on mobile */}
      <div className={`md:block ${open ? "block pb-4" : "hidden"}`}>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-10">
          {/* Brand — always expanded */}
          <div className="lg:col-span-1 pb-6 mb-6 border-b border-white/10 md:border-none md:mb-0 md:pb-0">
            <Link href="/" className="flex items-center mb-5">
              <Image
                src="/logo-blue.svg"
                alt="AdsPeek"
                width={120}
                height={34}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Performance marketing for India&apos;s next big brands — strategy, creative, media buying, and optimisation under one roof.
            </p>
            <div className="space-y-2.5 text-sm text-white/60">
              <a
                href="mailto:support@adspeek.in"
                className="flex items-center gap-2 hover:text-white transition-colors min-h-[44px]"
              >
                <Mail size={14} className="text-[var(--accent)] flex-shrink-0" />
                <span>support@adspeek.in</span>
              </a>
              <a
                href="tel:+919310713151"
                className="flex items-center gap-2 hover:text-white transition-colors min-h-[44px]"
              >
                <Phone size={14} className="text-[var(--accent)] flex-shrink-0" />
                <span>+91 93107 13151</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <span>Gurugram, Haryana 122015</span>
              </div>
            </div>
          </div>

          {/* Services — collapsible on mobile */}
          <CollapsibleGroup title="Services">
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="flex items-center text-sm text-white/70 hover:text-white transition-colors py-1 min-h-[44px] md:min-h-0 md:py-0"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleGroup>

          {/* Company — collapsible on mobile */}
          <CollapsibleGroup title="Company">
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="flex items-center text-sm text-white/70 hover:text-white transition-colors py-1 min-h-[44px] md:min-h-0 md:py-0"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleGroup>

          {/* CTA */}
          <div className="pt-6 md:pt-0 border-t border-white/10 md:border-none">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Ready to grow?
            </h3>
            <p className="text-sm text-white/60 mb-5 leading-relaxed">
              Get a free growth audit and discover where your next stage of growth will come from.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors w-full md:w-auto min-h-[44px]"
            >
              Get a Free Growth Audit
            </Link>
            <div className="mt-5 pt-5 border-t border-white/10 space-y-1">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Get in touch</p>
              <a href="mailto:support@adspeek.in" className="flex items-center text-xs text-white/50 hover:text-white transition-colors py-1 min-h-[44px] md:min-h-0 md:py-0">
                support@adspeek.in
              </a>
              <a href="tel:+919310713151" className="flex items-center text-xs text-white/50 hover:text-white transition-colors py-1 min-h-[44px] md:min-h-0 md:py-0">
                +91 93107 13151
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} AdsPeek. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors min-h-[44px] flex items-center">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors min-h-[44px] flex items-center">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
