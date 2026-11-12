'use client';

import { RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { useSectionMotion } from '@/lib/motion/useSectionMotion';
import { scramble } from '@/lib/motion/scramble';

export function useServicesMotion<T extends HTMLElement = HTMLElement>(
  sectionRef: RefObject<T | null>
) {
  useSectionMotion(sectionRef, (conditions, scope) => {
    const section = scope.current;
    if (!section) return;

    const rows = Array.from(
      section.querySelectorAll<HTMLElement>('[data-motion="svc-row"]')
    );

    rows.forEach((row) => {
      const fill = row.querySelector<HTMLElement>('[data-motion="svc-fill"]');
      if (fill) {
        gsap.set(fill, { scaleX: 0, transformOrigin: '0% 50%' });
      }
    });

    function svcOn(row: HTMLElement) {
      const fill = row.querySelector<HTMLElement>('[data-motion="svc-fill"]');
      const name = row.querySelector<HTMLElement>('[data-motion="svc-name"]');
      const code = row.querySelector<HTMLElement>('[data-motion="svc-code"]');

      if (fill) {
        gsap.to(fill, {
          scaleX: 1,
          transformOrigin: '0% 50%',
          duration: 0.5,
          ease: 'expo.out',
          overwrite: true,
        });
      }
      if (name) {
        gsap.to(name, { x: 14, duration: 0.5, ease: 'expo.out' });
      }
      if (code) {
        scramble(code, { duration: 0.4 });
      }
    }

    function svcOff(row: HTMLElement) {
      const fill = row.querySelector<HTMLElement>('[data-motion="svc-fill"]');
      const name = row.querySelector<HTMLElement>('[data-motion="svc-name"]');

      if (fill) {
        gsap.to(fill, {
          scaleX: 0,
          transformOrigin: '100% 50%',
          duration: 0.45,
          ease: 'expo.inOut',
          overwrite: true,
        });
      }
      if (name) {
        gsap.to(name, { x: 0, duration: 0.45, ease: 'expo.out' });
      }
    }

    const entryTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        rows.forEach((row, i) => {
          const code = row.querySelector<HTMLElement>('[data-motion="svc-code"]');
          if (code) {
            scramble(code, { duration: 0.5, delay: i * 0.12 });
          }
        });
      },
    });

    if (conditions.desktop || conditions.tablet) {
      const cleanups: (() => void)[] = [];
      rows.forEach((row) => {
        const onEnter = () => svcOn(row);
        const onLeave = () => svcOff(row);
        row.addEventListener('mouseenter', onEnter);
        row.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          row.removeEventListener('mouseenter', onEnter);
          row.removeEventListener('mouseleave', onLeave);
        });
      });

      return () => {
        entryTrigger.kill();
        cleanups.forEach((c) => c());
        rows.forEach((row) => svcOff(row));
      };
    }

    if (conditions.mobile) {
      const rowTriggers: ScrollTrigger[] = [];
      rows.forEach((row) => {
        const st = ScrollTrigger.create({
          trigger: row,
          start: 'top 65%',
          end: 'bottom 45%',
          onEnter: () => svcOn(row),
          onEnterBack: () => svcOn(row),
          onLeave: () => svcOff(row),
          onLeaveBack: () => svcOff(row),
        });
        rowTriggers.push(st);
      });

      return () => {
        entryTrigger.kill();
        rowTriggers.forEach((st) => st.kill());
        rows.forEach((row) => svcOff(row));
      };
    }
  });
}
