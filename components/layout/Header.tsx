'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { useHeaderMotion } from './useHeaderMotion';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  useHeaderMotion(headerRef, mobileMenuOpen);

  const navLinks = [
    { label: 'Services', href: '/shopify-development' },
    { label: 'Growth System', href: '/#system' },
    { label: 'Work', href: '/work' },
    { label: 'Guides', href: '/guides' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full bg-paper border-b border-line">
      <Container className="flex items-center justify-between h-[64px] lg:h-[80px]">
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Center: Desktop Nav Links (1024px and up) */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-ink hover:text-forest transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          {/* "Book a call" on Desktop & Tablet (640px and up) */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[15px] font-semibold bg-forest text-white hover:bg-[#154d3b] transition-colors min-h-[44px]"
          >
            Book a call
          </Link>

          {/* Menu button on Mobile & Tablet (<1024px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            className="lg:hidden flex items-center justify-center w-[44px] h-[44px] text-ink hover:bg-black/5 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="4" y1="16" x2="16" y2="4" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="19" y2="6" />
                <line x1="3" y1="11" x2="19" y2="11" />
                <line x1="3" y1="16" x2="19" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Dropdown Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </header>
  );
};

export default Header;
