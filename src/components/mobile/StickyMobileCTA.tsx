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
    <div className="fixed bottom-3 left-3 right-3 z-40 rounded-2xl border border-white/70 bg-white/90 p-2 shadow-[0_12px_35px_rgba(15,23,42,0.2)] backdrop-blur-xl lg:hidden">
      <a
        href="/contact"
        className="no-select flex min-h-11 w-full items-center justify-center rounded-xl bg-[var(--foreground)] px-4 py-2.5 text-center text-[13px] font-bold text-white transition-colors active:bg-[var(--foreground)]/90"
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
