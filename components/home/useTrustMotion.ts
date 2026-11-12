'use client';

import { RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { useSectionMotion } from '@/lib/motion/useSectionMotion';
import { scramble } from '@/lib/motion/scramble';

export function useTrustMotion<T extends HTMLElement = HTMLElement>(
  sectionRef: RefObject<T | null>
) {
  useSectionMotion(sectionRef, (conditions, scope) => {
    const section = scope.current;
    if (!section) return;

    const nums = Array.from(
      section.querySelectorAll<HTMLElement>('[data-motion="numbers"]')
    );
    const tools = section.querySelector<HTMLElement>('[data-motion="tools"]');
    const flaps = Array.from(
      section.querySelectorAll<HTMLElement>('[data-motion="tool-flap"]')
    );

    if (tools) {
      tools.style.perspective = '400px';
    }

    gsap.set(flaps, { rotateX: -90, opacity: 0, transformOrigin: '50% 50%' });

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        nums.forEach((n, i) => {
          scramble(n, { duration: 1, delay: i * 0.15 });
        });
        gsap.to(flaps, {
          rotateX: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(2)',
          stagger: 0.1,
          delay: 0.35,
        });
      },
    });

    return () => {
      st.kill();
      gsap.set(flaps, { clearProps: 'all' });
    };
  });
}

