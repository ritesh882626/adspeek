'use client';

import { RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { useSectionMotion } from '@/lib/motion/useSectionMotion';
import { LIME } from '@/lib/motion/conditions';

export function useComparisonMotion<T extends HTMLElement = HTMLElement>(
  sectionRef: RefObject<T | null>
) {
  useSectionMotion(sectionRef, (conditions, scope) => {
    const section = scope.current;
    if (!section) return;

    if (conditions.desktop || conditions.tablet) {
      const table = section.querySelector('table');
      const rows = Array.from(section.querySelectorAll('tbody tr'));
      if (!table || rows.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: table,
          start: 'top 78%',
          end: 'bottom 50%',
          scrub: 0.7,
        },
      });

      rows.forEach((row, i) => {
        const strike = row.querySelector<HTMLElement>('[data-motion="strike"]');
        const typ = row.querySelector<HTMLElement>('[data-motion="typical-text"]');
        const ads = row.querySelector<HTMLElement>('[data-motion="highlight"]');

        if (ads) {
          ads.style.backgroundImage = `linear-gradient(${LIME}, ${LIME})`;
          ads.style.backgroundRepeat = 'no-repeat';
          ads.style.backgroundPosition = '0 0';
          ads.style.backgroundSize = '0% 100%';
        }

        if (strike) {
          tl.fromTo(
            strike,
            { scaleX: 0 },
            { scaleX: 1, duration: 1, ease: 'power2.inOut' },
            i
          );
        }
        if (typ) {
          tl.to(typ, { color: '#9CA196', duration: 0.6 }, i + 0.4);
        }
        if (ads) {
          tl.to(
            ads,
            { backgroundSize: '100% 100%', duration: 1, ease: 'power2.inOut' },
            i + 0.5
          );
        }
      });

      return () => {
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
      };
    }

    if (conditions.mobile) {
      const cards = Array.from(
        section.querySelectorAll<HTMLElement>('[data-motion="cmp-card"]')
      );
      const triggers: ScrollTrigger[] = [];

      cards.forEach((card) => {
        const strike = card.querySelector<HTMLElement>('[data-motion="strike"]');
        const ads = card.querySelector<HTMLElement>('[data-motion="highlight"]');
        const badge = card.querySelector<HTMLElement>('[data-motion="badge"]');

        if (ads) {
          ads.style.backgroundImage = `linear-gradient(${LIME}, ${LIME})`;
          ads.style.backgroundRepeat = 'no-repeat';
          ads.style.backgroundPosition = '0 0';
          ads.style.backgroundSize = '0% 100%';
        }

        const st = ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (strike) {
              gsap.fromTo(
                strike,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }
              );
            }
            if (ads) {
              gsap.to(ads, {
                backgroundSize: '100% 100%',
                duration: 0.6,
                delay: 0.35,
                ease: 'power2.inOut',
              });
            }
            if (badge) {
              gsap.fromTo(
                badge,
                { scale: 1.4, rotate: -8 },
                {
                  scale: 1,
                  rotate: 0,
                  duration: 0.45,
                  delay: 0.35,
                  ease: 'back.out(3)',
                }
              );
            }
          },
        });
        triggers.push(st);
      });

      return () => {
        triggers.forEach((st) => st.kill());
      };
    }
  });
}
