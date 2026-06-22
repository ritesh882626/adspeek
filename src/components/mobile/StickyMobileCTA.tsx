"use client";

import { useEffect, useState } from "react";

type Gtag = (
  command: "event",
  eventName: string,
  parameters?: Record<string, string>,
) => void;

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight ?? 600;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 120;
      setVisible(window.scrollY > heroHeight);
      setAtBottom(nearBottom);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible || atBottom) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-[var(--border)] px-4 py-3 pb-safe">
      <a
        href="/contact"
        className="no-select block w-full bg-[var(--foreground)] text-white text-center font-bold text-[15px] py-4 rounded-[11px] active:bg-[var(--foreground)]/90 transition-colors"
        onClick={() => {
          const gtag = (window as typeof window & { gtag?: Gtag }).gtag;
          if (gtag) {
            gtag("event", "sticky_cta_click", {
              event_category: "mobile_engagement",
            });
          }
        }}
      >
        Get a Free Growth Audit →
      </a>
    </div>
  );
}
