'use client';

import React, { useEffect, useState } from 'react';

interface MobileSummaryBarProps {
  itemCount: number;
}

export const MobileSummaryBar: React.FC<MobileSummaryBarProps> = ({ itemCount }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById('build');
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-ink text-white h-[64px] px-5 flex items-center justify-between border-t border-[#33372F]"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="font-mono text-[13px] text-paper">
        <span>{itemCount}</span> items selected
      </div>
      <a
        href="#package-summary"
        className="inline-flex items-center justify-center px-4 py-2 bg-accent text-ink font-semibold text-[14px] rounded-none hover:bg-[#b8e232] transition-colors"
      >
        Review package
      </a>
    </div>
  );
};

export default MobileSummaryBar;

