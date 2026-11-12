'use client';

import { gsap } from './gsap';
import { SCRAMBLE_CHARS } from './conditions';

export function scramble(
  el: HTMLElement,
  opts: { duration?: number; delay?: number; speed?: number } = {}
) {
  const final = el.getAttribute('data-final') || el.textContent || '';
  el.setAttribute('data-final', final);
  const o = { p: 0 };
  const glyphs = SCRAMBLE_CHARS;
  return gsap.to(o, {
    p: 1,
    duration: opts.duration || 0.8,
    delay: opts.delay || 0,
    ease: 'none',
    onUpdate: () => {
      const n = Math.floor(o.p * final.length);
      let s = final.slice(0, n);
      for (let i = n; i < final.length; i++) {
        s += final[i] === ' ' ? ' ' : glyphs[(Math.random() * glyphs.length) | 0];
      }
      el.textContent = s;
    },
    onComplete: () => {
      el.textContent = final;
    },
  });
}

