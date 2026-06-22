"use client";

import { useCallback, useLayoutEffect, useRef, type ReactNode, type UIEvent } from "react";

export default function InfiniteMobileRail({ children, label }: { children: ReactNode; label: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  const centerRail = useCallback(() => {
    const rail = railRef.current;
    const group = groupRef.current;
    if (rail && group) rail.scrollLeft = group.offsetWidth;
  }, []);

  useLayoutEffect(() => {
    centerRail();
    const frame = requestAnimationFrame(centerRail);
    window.addEventListener("resize", centerRail);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", centerRail);
    };
  }, [centerRail]);

  const keepLoopContinuous = (event: UIEvent<HTMLDivElement>) => {
    const rail = event.currentTarget;
    const groupWidth = groupRef.current?.offsetWidth ?? 0;
    if (!groupWidth) return;
    if (rail.scrollLeft < groupWidth * 0.45) rail.scrollLeft += groupWidth;
    if (rail.scrollLeft > groupWidth * 1.55) rail.scrollLeft -= groupWidth;
  };

  return (
    <div
      ref={railRef}
      aria-label={label}
      onScroll={keepLoopContinuous}
      className="mobile-momentum-scroll snap-x snap-mandatory overflow-x-auto scrollbar-hide md:hidden"
    >
      <div className="flex w-max">
        <div aria-hidden className="flex gap-3 pr-3">{children}</div>
        <div ref={groupRef} className="flex gap-3 pr-3">{children}</div>
        <div aria-hidden className="flex gap-3 pr-3">{children}</div>
      </div>
    </div>
  );
}
