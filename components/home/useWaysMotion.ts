'use client';

import { RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { useSectionMotion } from '@/lib/motion/useSectionMotion';
import { scramble } from '@/lib/motion/scramble';

export function useWaysMotion<T extends HTMLElement = HTMLElement>(
  sectionRef: RefObject<T | null>
) {
  useSectionMotion(sectionRef, (conditions, scope) => {
    const section = scope.current;
    if (!section) return;

    const deck = section.querySelector<HTMLElement>('[data-motion="deck"]');
    if (!deck) return;

    const cards = Array.from(
      deck.querySelectorAll<HTMLElement>('[data-motion="card"]')
    );
    if (cards.length === 0) return;

    gsap.set(cards, { opacity: 0 });

    const angles = [-7, 5, -3];

    const st = ScrollTrigger.create({
      trigger: deck,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const g = deck.getBoundingClientRect();
        const cx = g.left + g.width / 2;
        const cy = g.top + Math.min(g.height, 360) / 2;

        cards.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const targetX = cx - (r.left + r.width / 2);
          const targetY = cy - (r.top + Math.min(r.height, 360) / 2) - 60;

          gsap.fromTo(
            c,
            {
              x: targetX,
              y: targetY,
              rotate: angles[i % angles.length],
              opacity: 1,
              zIndex: 3 - i,
            },
            {
              x: 0,
              y: 0,
              rotate: 0,
              duration: 0.9,
              delay: 0.15 + (cards.length - 1 - i) * 0.16,
              ease: 'power4.out',
              clearProps: 'zIndex',
            }
          );
        });

        const popular = deck.querySelector<HTMLElement>(
          '[data-popular="true"], [data-motion="popular"]'
        );
        if (popular) {
          const tag = popular.querySelector<HTMLElement>('[data-motion="popular-tag"]');
          const price = popular.querySelector<HTMLElement>('[data-motion="price"]');
          if (tag) scramble(tag, { delay: 0.9, duration: 0.6 });
          if (price) scramble(price, { delay: 1.05, duration: 0.7 });
        }
      },
    });

    const hoverCleanups: (() => void)[] = [];

    if (conditions.desktop || conditions.tablet) {
      cards.forEach((c) => {
        const price = c.querySelector<HTMLElement>('[data-motion="price"]');
        const onEnter = () => {
          if (price) scramble(price, { duration: 0.45 });
          gsap.to(c, { y: -6, duration: 0.3, ease: 'power2.out' });
        };
        const onLeave = () => {
          gsap.to(c, { y: 0, duration: 0.3, ease: 'power2.out' });
        };
        c.addEventListener('mouseenter', onEnter);
        c.addEventListener('mouseleave', onLeave);
        hoverCleanups.push(() => {
          c.removeEventListener('mouseenter', onEnter);
          c.removeEventListener('mouseleave', onLeave);
        });
      });
    }

    return () => {
      st.kill();
      hoverCleanups.forEach((h) => h());
      gsap.set(cards, { clearProps: 'all' });
    };
  });
}
