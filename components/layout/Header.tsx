'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export function Header({ onOpenConsultation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const servicesList = [
    {
      title: 'Shopify Store Development',
      desc: 'End-to-end bespoke storefronts built to scale.',
      href: '#services',
    },
    {
      title: 'Shopify Store Design',
      desc: 'High-converting UI/UX design with deliberate shopping journeys.',
      href: '#services',
    },
    {
      title: 'Store Redesign & Migration',
      desc: 'Seamless data migration from WooCommerce, Magento & custom stacks.',
      href: '#migration',
    },
    {
      title: 'Custom Theme Sections',
      desc: 'Tailored Liquid sections built directly into your theme editor.',
      href: '#services',
    },
    {
      title: 'Conversion Rate Optimization',
      desc: 'Audit product pages, cart flows, and mobile checkout friction.',
      href: '#speed',
    },
    {
      title: 'Shopify Plus & Enterprise',
      desc: 'Advanced B2B wholesale, multi-currency, and API architectures.',
      href: '#shopify-plus',
    },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
          scrolled || mobileMenuOpen
            ? 'bg-white shadow-sm border-b border-gray-200/80 py-3 sm:py-3.5'
            : 'bg-white/95 backdrop-blur-sm border-b border-gray-100 py-3.5 sm:py-4 md:py-5'
        }`}
      >
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2 group text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C5A48] rounded-md min-h-[44px]"
          >
            <span className="text-xl sm:text-2xl font-light tracking-tight text-gray-950 font-sans flex items-center">
              <span className="font-semibold">ads</span>peek
              <span className="w-1.5 h-1.5 rounded-full bg-[#0C5A48] ml-0.5 inline-block" />
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#EBF7F2] text-[#0C5A48] border border-[#D1EFE3]">
              Shopify Agency
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-normal text-gray-700"
          >
            <Link
              href="/"
              className="px-3.5 py-2 rounded-full hover:text-gray-950 hover:bg-gray-100/70 transition-colors min-h-[40px] flex items-center"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') setServicesDropdownOpen(true);
                }}
                aria-expanded={servicesDropdownOpen}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:text-gray-950 hover:bg-gray-100/70 transition-colors cursor-pointer min-h-[40px]"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-[#0C5A48]' : 'text-gray-400'
                  }`}
                />
              </button>

              {servicesDropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white rounded-2xl shadow-card-hover border border-gray-200/80 p-4 grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1.5 border-b border-gray-100 mb-1 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-400">
                      Our Shopify Services
                    </span>
                    <span className="text-xs text-[#0C5A48] font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Specialized Shopify Focus
                    </span>
                  </div>
                  {servicesList.map((service, i) => (
                    <a
                      key={i}
                      href={service.href}
                      onClick={() => setServicesDropdownOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-gray-50 transition-colors group block min-h-[44px]"
                    >
                      <div className="text-sm font-medium text-gray-900 group-hover:text-[#0C5A48] flex items-center justify-between">
                        <span>{service.title}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{service.desc}</p>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/#process"
              className="px-3.5 py-2 rounded-full hover:text-gray-950 hover:bg-gray-100/70 transition-colors min-h-[40px] flex items-center"
            >
              Process
            </a>

            <a
              href="/#portfolio"
              className="px-3.5 py-2 rounded-full hover:text-gray-950 hover:bg-gray-100/70 transition-colors min-h-[40px] flex items-center"
            >
              Portfolio
            </a>

            <a
              href="/#testimonials"
              className="px-3.5 py-2 rounded-full hover:text-gray-950 hover:bg-gray-100/70 transition-colors min-h-[40px] flex items-center"
            >
              Clients
            </a>

            <a
              href="/#blog"
              className="px-3.5 py-2 rounded-full hover:text-gray-950 hover:bg-gray-100/70 transition-colors min-h-[40px] flex items-center"
            >
              Resources
            </a>
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center justify-center px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-medium rounded-full bg-[#0C5A48] hover:bg-[#084537] text-white shadow-sm hover:shadow transition-all duration-200 cursor-pointer min-h-[44px]"
            >
              Get a Free Consultation
            </button>

            {/* Mobile Hamburger Toggle (44px touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl text-gray-800 hover:text-gray-950 hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0C5A48]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Navigation Drawer (Escapes backdrop-filter containing block constraint) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="md:hidden fixed inset-x-0 top-[65px] sm:top-[69px] bottom-0 z-40 bg-white flex flex-col justify-between overflow-y-auto border-t border-gray-200/80 shadow-2xl p-5 sm:p-6"
          style={{ height: 'calc(100dvh - 65px)' }}
        >
          <div className="space-y-4">
            <div className="text-[11px] font-mono uppercase text-gray-400 font-semibold tracking-wider">
              Navigation Menu
            </div>
            <nav className="space-y-1">
              <Link
                href="/"
                onClick={handleLinkClick}
                className="flex items-center px-3.5 py-3 text-base font-normal text-gray-900 rounded-xl hover:bg-gray-50 min-h-[44px]"
              >
                Home
              </Link>
              <a
                href="/#services"
                onClick={handleLinkClick}
                className="flex items-center px-3.5 py-3 text-base font-normal text-gray-900 rounded-xl hover:bg-gray-50 min-h-[44px]"
              >
                Services
              </a>
              <a
                href="/#migration"
                onClick={handleLinkClick}
                className="flex items-center px-3.5 py-3 text-base font-normal text-gray-900 rounded-xl hover:bg-gray-50 min-h-[44px]"
              >
                Store Migration
              </a>
              <a
                href="/#process"
                onClick={handleLinkClick}
                className="flex items-center px-3.5 py-3 text-base font-normal text-gray-900 rounded-xl hover:bg-gray-50 min-h-[44px]"
              >
                Our Process
              </a>
              <a
                href="/#shopify-plus"
                onClick={handleLinkClick}
                className="flex items-center px-3.5 py-3 text-base font-normal text-gray-900 rounded-xl hover:bg-gray-50 min-h-[44px]"
              >
                Shopify Plus
              </a>
              <a
                href="/#portfolio"
                onClick={handleLinkClick}
                className="flex items-center px-3.5 py-3 text-base font-normal text-gray-900 rounded-xl hover:bg-gray-50 min-h-[44px]"
              >
                Portfolio &amp; Work
              </a>
              <a
                href="/#testimonials"
                onClick={handleLinkClick}
                className="flex items-center px-3.5 py-3 text-base font-normal text-gray-900 rounded-xl hover:bg-gray-50 min-h-[44px]"
              >
                Client Reviews
              </a>
              <a
                href="/#blog"
                onClick={handleLinkClick}
                className="flex items-center px-3.5 py-3 text-base font-normal text-gray-900 rounded-xl hover:bg-gray-50 min-h-[44px]"
              >
                Blog &amp; Guides
              </a>
              <Link
                href="/about"
                onClick={handleLinkClick}
                className="flex items-center px-3.5 py-3 text-base font-normal text-gray-900 rounded-xl hover:bg-gray-50 min-h-[44px]"
              >
                About AdsPeek
              </Link>
              <Link
                href="/contact"
                onClick={handleLinkClick}
                className="flex items-center px-3.5 py-3 text-base font-normal text-gray-900 rounded-xl hover:bg-gray-50 min-h-[44px]"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="pt-6 border-t border-gray-100 space-y-3 pb-8">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3.5 px-6 rounded-full bg-[#0C5A48] text-white text-center font-medium shadow-sm hover:bg-[#084537] transition-all min-h-[48px] flex items-center justify-center text-sm cursor-pointer"
            >
              Get a Free Consultation
            </button>
            <p className="text-xs text-center text-gray-500 font-mono">
              Gurugram, India &bull; Response in &le; 24 hours
            </p>
          </div>
        </div>
      )}
    </>
  );
}
