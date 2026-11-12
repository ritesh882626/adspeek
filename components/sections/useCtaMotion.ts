'use client';

import { RefObject } from 'react';
import { gsap, ScrollTrigger, SplitText } from '@/lib/motion/gsap';
import { useSectionMotion } from '@/lib/motion/useSectionMotion';

function splitChars(el: HTMLElement): HTMLElement[] {
  try {
    const split = new SplitText(el, { type: 'chars,words', aria: 'auto' });
    if (split.chars && split.chars.length > 0) {
      return split.chars as HTMLElement[];
    }
  } catch (e) {}

  const text = el.textContent || '';
  el.textContent = '';
  const out: HTMLElement[] = [];
  for (let i = 0; i < text.length; i++) {
    const s = document.createElement('span');
    s.className = 'ch';
    s.textContent = text[i];
    if (text[i] === ' ') s.innerHTML = '&nbsp;';
    el.appendChild(s);
    out.push(s);
  }
  return out;
}

export function useCtaMotion<T extends HTMLElement = HTMLElement>(
  sectionRef: RefObject<T | null>,
  playful = false
) {
  useSectionMotion(
    sectionRef,
    (conditions, scope) => {
      if (!playful) return;
      const section = scope.current;
      if (!section) return;

      const ctaH = section.querySelector<HTMLElement>('[data-motion="cta-heading"]');
      const ctaBtns = Array.from(
        section.querySelectorAll<HTMLElement>('[data-motion="cta-btn"]')
      );
      if (!ctaH) return;

      const originalHTML = ctaH.innerHTML;
      const cc = splitChars(ctaH);

      const entrySt = ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.from(cc, {
            y: () => -140 - Math.random() * 120,
            rotate: () => gsap.utils.random(-40, 40),
            opacity: 0,
            duration: 1.1,
            ease: 'bounce.out',
            stagger: { each: 0.018, from: 'random' },
          });
          gsap.from(ctaBtns, {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            delay: 0.9,
            ease: 'back.out(2.5)',
            stagger: 0.1,
          });
        },
      });

      const cleanups: (() => void)[] = [];

      if (conditions.desktop && conditions.finePointer) {
        const qx = cc.map((c) => gsap.quickTo(c, 'x', { duration: 0.5, ease: 'power3.out' }));
        const qy = cc.map((c) => gsap.quickTo(c, 'y', { duration: 0.5, ease: 'power3.out' }));
        let centers: { x: number; y: number }[] = [];

        function measure() {
          centers = cc.map((c) => {
            const r = c.getBoundingClientRect();
            return {
              x: r.left + r.width / 2,
              y: r.top + r.height / 2 + window.scrollY,
            };
          });
        }

        function onMouseMove(e: MouseEvent) {
          if (!centers.length) measure();
          cc.forEach((c, i) => {
            if (!centers[i]) return;
            const dx = centers[i].x - e.clientX;
            const dy = centers[i].y - (e.clientY + window.scrollY);
            const d = Math.sqrt(dx * dx + dy * dy);
            const R = 140;
            if (d < R) {
              const f = ((R - d) / R) * 26;
              qx[i]((dx / (d || 1)) * f);
              qy[i]((dy / (d || 1)) * f);
            } else {
              qx[i](0);
              qy[i](0);
            }
          });

          ctaBtns.forEach((b) => {
            const r = b.getBoundingClientRect();
            const bx = r.left + r.width / 2;
            const by = r.top + r.height / 2;
            const ddx = e.clientX - bx;
            const ddy = e.clientY - by;
            if (Math.abs(ddx) < r.width / 2 + 40 && Math.abs(ddy) < r.height / 2 + 40) {
              gsap.to(b, {
                x: ddx * 0.25,
                y: ddy * 0.35,
                duration: 0.4,
                ease: 'power3.out',
              });
            } else {
              gsap.to(b, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
            }
          });
        }

        function onMouseLeave() {
          qx.forEach((f) => f(0));
          qy.forEach((f) => f(0));
          gsap.to(ctaBtns, { x: 0, y: 0, duration: 0.5 });
        }

        const onScroll = () => {
          centers = [];
        };

        section.addEventListener('mousemove', onMouseMove);
        section.addEventListener('mouseleave', onMouseLeave);
        ScrollTrigger.addEventListener('refresh', measure);
        window.addEventListener('scroll', onScroll, { passive: true });

        cleanups.push(() => {
          section.removeEventListener('mousemove', onMouseMove);
          section.removeEventListener('mouseleave', onMouseLeave);
          ScrollTrigger.removeEventListener('refresh', measure);
          window.removeEventListener('scroll', onScroll);
          onMouseLeave();
        });
      }

      // Tap to jump
      const onHeadingClick = () => {
        gsap.fromTo(
          cc,
          { y: 0 },
          {
            y: -18,
            duration: 0.22,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out',
            stagger: { each: 0.015, from: 'start' },
          }
        );
      };

      ctaH.addEventListener('click', onHeadingClick);
      cleanups.push(() => {
        ctaH.removeEventListener('click', onHeadingClick);
      });

      return () => {
        entrySt.kill();
        cleanups.forEach((c) => c());
        ctaH.innerHTML = originalHTML;
        gsap.set(ctaBtns, { clearProps: 'all' });
      };
    },
    [playful]
  );
}

