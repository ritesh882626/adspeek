'use client';

import { RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { useSectionMotion } from '@/lib/motion/useSectionMotion';
import { scramble } from '@/lib/motion/scramble';

export function useWorkMotion<T extends HTMLElement = HTMLElement>(
  sectionRef: RefObject<T | null>
) {
  useSectionMotion(sectionRef, (conditions, scope) => {
    const section = scope.current;
    if (!section) return;

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>('[data-motion="work-card"]')
    );

    // Initial state
    cards.forEach((card) => {
      const img = card.querySelector<HTMLElement>('[data-motion="work-image"]');
      if (img) {
        gsap.set(img, { clipPath: 'circle(0% at 50% 50%)' });
      }
      const corners = Array.from(
        card.querySelectorAll<HTMLElement>('[data-motion="corner"]')
      );
      corners.forEach((c) => gsap.set(c, { opacity: 0 }));
    });

    function getCornersOffset(card: HTMLElement) {
      const frame = card.querySelector<HTMLElement>('[data-motion="frame"]');
      const r = (frame || card).getBoundingClientRect();
      const dx = r.width / 2 - 26;
      const dy = r.height / 2 - 26;
      return [
        { x: dx, y: dy },
        { x: -dx, y: dy },
        { x: dx, y: -dy },
        { x: -dx, y: -dy },
      ];
    }

    const isMobile = !!conditions.mobile;

    const st = ScrollTrigger.create({
      trigger: section.querySelector('.grid') || section,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        cards.forEach((card, i) => {
          const delay = isMobile ? 0 : i * 0.18;
          const offsets = getCornersOffset(card);
          const corners = Array.from(
            card.querySelectorAll<HTMLElement>('[data-motion="corner"]')
          );
          const img = card.querySelector<HTMLElement>('[data-motion="work-image"]');
          const metas = Array.from(
            card.querySelectorAll<HTMLElement>('[data-motion="work-meta"]')
          );

          corners.forEach((c, k) => {
            const off = offsets[k] || { x: 0, y: 0 };
            gsap.fromTo(
              c,
              { x: off.x, y: off.y, opacity: 0 },
              {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(2.2)',
                delay: delay + 0.15,
              }
            );
          });

          if (img) {
            gsap.to(img, {
              clipPath: 'circle(75% at 50% 50%)',
              duration: 1.2,
              ease: 'expo.inOut',
              delay: delay + 0.35,
            });
          }

          metas.forEach((m, idx) => {
            scramble(m, { duration: 0.6, delay: delay + 0.6 + idx * 0.1 });
          });
        });
      },
    });

    const hoverCleanups: (() => void)[] = [];

    if (conditions.desktop && conditions.finePointer) {
      cards.forEach((card) => {
        const frame = card.querySelector<HTMLElement>('[data-motion="frame"]');
        const corners = Array.from(
          card.querySelectorAll<HTMLElement>('[data-motion="corner"]')
        );
        const img = card.querySelector<HTMLElement>('[data-motion="work-image"]');

        const onEnter = () => {
          corners.forEach((c) => {
            const cornerType = c.getAttribute('data-corner');
            let ox = 0;
            let oy = 0;
            if (cornerType === 'tl') {
              ox = -8;
              oy = -8;
            } else if (cornerType === 'tr') {
              ox = 8;
              oy = -8;
            } else if (cornerType === 'bl') {
              ox = -8;
              oy = 8;
            } else if (cornerType === 'br') {
              ox = 8;
              oy = 8;
            }
            gsap.to(c, { x: ox, y: oy, duration: 0.4, ease: 'expo.out' });
          });
          if (img) {
            gsap.to(img, { scale: 1.03, duration: 0.4, ease: 'expo.out' });
          }
        };

        const onLeave = () => {
          corners.forEach((c) => {
            gsap.to(c, { x: 0, y: 0, duration: 0.4, ease: 'expo.out' });
          });
          if (img) {
            gsap.to(img, { scale: 1, duration: 0.4, ease: 'expo.out' });
          }
        };

        (frame || card).addEventListener('mouseenter', onEnter);
        (frame || card).addEventListener('mouseleave', onLeave);

        hoverCleanups.push(() => {
          (frame || card).removeEventListener('mouseenter', onEnter);
          (frame || card).removeEventListener('mouseleave', onLeave);
        });
      });
    }

    return () => {
      st.kill();
      hoverCleanups.forEach((c) => c());
      cards.forEach((card) => {
        const img = card.querySelector<HTMLElement>('[data-motion="work-image"]');
        if (img) gsap.set(img, { clearProps: 'all' });
        const corners = Array.from(
          card.querySelectorAll<HTMLElement>('[data-motion="corner"]')
        );
        corners.forEach((c) => gsap.set(c, { clearProps: 'all' }));
      });
    };
  });
}
