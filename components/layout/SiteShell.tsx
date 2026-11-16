'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import Script from 'next/script';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStartQuiz = pathname === '/start' || pathname === '/start/';

  if (isStartQuiz) {
    return <>{children}</>;
  }

  return (
    <>
      <Script src="/embed/adspeek-estimate-modal.js" strategy="afterInteractive" />
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}

export default SiteShell;
