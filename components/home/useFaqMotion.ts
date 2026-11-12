'use client';

import { RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { useSectionMotion } from '@/lib/motion/useSectionMotion';
import { LIME } from '@/lib/motion/conditions';

export function useFaqMotion<T extends HTMLElement = HTMLElement>(
  sectionRef: RefObject<T | null>
) {
  useSectionMotion(sectionRef, (conditions, scope) => {
    const section = scope.current;
    if (!section) return;

    const items = Array.from(
      section.querySelectorAll<HTMLElement>('[data-motion="faq-item"]')
    );

    const triggers: ScrollTrigger[] = [];

    items.forEach((item) => {
      const q = item.querySelector<HTMLElement>('[data-motion="faq-q"]');
      const a = item.querySelector<HTMLElement>('[data-motion="faq-a"]');
      if (!q || !a) return;

      q.style.backgroundImage = `linear-gradient(${LIME}, ${LIME})`;
      q.style.backgroundRepeat = 'no-repeat';
      q.style.backgroundPosition = '0 0';
      q.style.backgroundSize = '0% 100%';

      gsap.set(a, { clipPath: 'inset(0 0 100% 0)' });

      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap
            .timeline()
            .to(q, {
              backgroundSize: '100% 100%',
              duration: 0.45,
              ease: 'power2.in',
            })
            .to(q, {
              backgroundPosition: '100% 0',
              backgroundSize: '0% 100%',
              duration: 0.45,
              ease: 'power2.out',
            })
            .to(
              a,
              {
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.6,
                ease: 'power3.out',
              },
              0.35
            );
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
      items.forEach((item) => {
        const q = item.querySelector<HTMLElement>('[data-motion="faq-q"]');
        const a = item.querySelector<HTMLElement>('[data-motion="faq-a"]');
        if (q) gsap.set(q, { clearProps: 'all' });
        if (a) gsap.set(a, { clearProps: 'all' });
      });
    };
  });
}

