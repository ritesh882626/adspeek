'use client';

import { RefObject } from 'react';
import { gsap } from '@/lib/motion/gsap';
import { useSectionMotion } from '@/lib/motion/useSectionMotion';
import { LIME, INK } from '@/lib/motion/conditions';

export function useProcessMotion<T extends HTMLElement = HTMLElement>(
  sectionRef: RefObject<T | null>
) {
  useSectionMotion(sectionRef, (conditions, scope) => {
    const section = scope.current;
    if (!section) return;

    const isMobile = !!conditions.mobile;
    const ols = Array.from(
      section.querySelectorAll<HTMLElement>('[data-motion="process-list"]')
    );
    const activeOl = isMobile ? ols[1] || ols[0] : ols[0];
    if (!activeOl) return;

    const steps = Array.from(activeOl.querySelectorAll<HTMLLIElement>('li'));
    const pbars = steps.map((li) => li.querySelector<HTMLElement>('[data-motion="pbar"]'));
    const badges = steps.map((li) =>
      li.querySelector<HTMLElement>(
        '[data-motion="process-step"], [data-motion="process-monthly"]'
      )
    );
    const monthly = activeOl.querySelector<HTMLElement>('[data-motion="process-monthly"]');

    if (monthly && monthly.parentElement) {
      monthly.parentElement.style.perspective = '300px';
    }

    const pt = gsap.timeline({
      scrollTrigger: {
        trigger: activeOl,
        start: 'top 78%',
        end: 'bottom 45%',
        scrub: 0.6,
      },
    });

    steps.forEach((li, i) => {
      const bar = pbars[i];
      const badge = badges[i];

      if (bar) {
        pt.fromTo(
          bar,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'none' },
          i
        );
      }

      if (badge) {
        const isLast = i === steps.length - 1;
        pt.fromTo(
          badge,
          {
            scale: 1,
            rotate: 0,
            backgroundColor: isLast ? LIME : 'rgba(200,240,60,0)',
          },
          {
            keyframes: [
              { scale: 1.45, rotate: -7, backgroundColor: LIME, duration: 0.15 },
              { scale: 1, rotate: 0, duration: 0.25, ease: 'back.out(3)' },
            ],
          },
          i + 0.85
        ).to(badge, { color: INK, duration: 0.1 }, i + 0.85);

        if (isLast && monthly) {
          pt.to(
            monthly,
            { rotateX: 360, duration: 1.2, ease: 'back.out(1.8)' },
            i + 0.85
          );
        }
      }
    });

    return () => {
      if (pt.scrollTrigger) pt.scrollTrigger.kill();
      pt.kill();
      pbars.forEach((bar) => {
        if (bar) gsap.set(bar, { clearProps: 'all' });
      });
      badges.forEach((b) => {
        if (b) gsap.set(b, { clearProps: 'all' });
      });
      if (monthly) gsap.set(monthly, { clearProps: 'all' });
    };
  });
}
