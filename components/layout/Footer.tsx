import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import Logo from './Logo';

interface FooterProps {
  onOpenConsultation?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-ink text-footer-text w-full mt-auto">
      <Container className="pt-16 pb-8">
        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-footer-line">
          {/* Column 1: Brand & Address */}
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center">
              <Logo tone="onDark" />
            </div>
            <p className="m-0 text-[15px] leading-[1.55] text-footer-text">
              Sector 22, Gurugram
              <br />
              Haryana, India
            </p>
          </div>

          {/* Column 2: Services */}
          <nav aria-label="Services" className="flex flex-col gap-2.5 sm:gap-2.5">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-footer-muted mb-1">
              Services
            </span>
            <Link
              href="/shopify-development"
              className="text-[15px] text-footer-text hover:text-white py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center transition-colors"
            >
              Shopify Development
            </Link>
            <Link
              href="#"
              className="text-[15px] text-footer-text hover:text-white py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center transition-colors"
            >
              Website Development
            </Link>
            <Link
              href="#"
              className="text-[15px] text-footer-text hover:text-white py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center transition-colors"
            >
              App Development
            </Link>
            <Link
              href="#"
              className="text-[15px] text-footer-text hover:text-white py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center transition-colors"
            >
              Meta Ads
            </Link>
          </nav>

          {/* Column 3: Shopify by city */}
          <nav aria-label="Shopify by city" className="flex flex-col gap-2.5 sm:gap-2.5">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-footer-muted mb-1">
              Shopify by city
            </span>
            <Link
              href="/shopify-development/gurugram"
              className="text-[15px] text-footer-text hover:text-white py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center transition-colors"
            >
              Gurugram
            </Link>
            <Link
              href="/shopify-development/delhi"
              className="text-[15px] text-footer-text hover:text-white py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center transition-colors"
            >
              Delhi
            </Link>
            <Link
              href="/shopify-development/noida"
              className="text-[15px] text-footer-text hover:text-white py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center transition-colors"
            >
              Noida
            </Link>
            <Link
              href="/shopify-development/mumbai"
              className="text-[15px] text-footer-text hover:text-white py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center transition-colors"
            >
              Mumbai
            </Link>
            <Link
              href="/shopify-development/bangalore"
              className="text-[15px] text-footer-text hover:text-white py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center transition-colors"
            >
              Bengaluru
            </Link>
          </nav>

          {/* Column 4: Company */}
          <nav aria-label="Company" className="flex flex-col gap-2.5 sm:gap-2.5">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-footer-muted mb-1">
              Company
            </span>
            <Link
              href="/work"
              className="text-[15px] text-footer-text hover:text-white py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center transition-colors"
            >
              Work
            </Link>
            <Link
              href="/about"
              className="text-[15px] text-footer-text hover:text-white py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center transition-colors"
            >
              About
            </Link>
            <Link
              href="/guides"
              className="text-[15px] text-footer-text hover:text-white py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center transition-colors"
            >
              Guides
            </Link>
            <Link
              href="/contact"
              className="text-[15px] text-footer-text hover:text-white py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 text-[13px] text-footer-muted">
          <span>© 2026 AdsPeek</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="text-footer-muted hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-footer-muted hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
