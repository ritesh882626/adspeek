'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

interface NavLinkItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLinkItem[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, links }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation-menu"
      className="lg:hidden absolute top-full left-0 right-0 w-full bg-paper border-b border-line shadow-sm z-50 px-5 sm:px-8 py-4"
    >
      <nav aria-label="Mobile Navigation" className="flex flex-col">
        {links.map((link, index) => (
          <Link
            key={link.href + index}
            href={link.href}
            onClick={onClose}
            className="flex items-center h-[56px] text-[18px] font-semibold text-ink border-b border-line hover:text-forest"
          >
            {link.label}
          </Link>
        ))}
        {/* On mobile (<640px), Book a call button is inside the menu */}
        <div className="pt-6 pb-2 sm:hidden">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center w-full px-6 py-4 bg-forest text-white text-[16px] font-semibold min-h-[44px] hover:bg-[#154d3b] transition-colors"
          >
            Book a call
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
