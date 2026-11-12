'use client';

import React, { useRef } from 'react';
import { gsap } from '@/lib/motion/gsap';
import { useSectionMotion } from '@/lib/motion/useSectionMotion';

export const ViewfinderCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useSectionMotion(cursorRef, (conditions, scope) => {
    // Only desktop && finePointer and not reduceMotion
    if (!conditions.desktop || !conditions.finePointer) {
      if (scope.current) {
        gsap.set(scope.current, { display: 'none' });
      }
      return;
    }

    const vf = scope.current;
    if (!vf) return;

    gsap.set(vf, { display: 'block', width: 28, height: 28, opacity: 0 });

    const vx = gsap.quickTo(vf, 'x', { duration: 0.25, ease: 'power3.out' });
    const vy = gsap.quickTo(vf, 'y', { duration: 0.25, ease: 'power3.out' });

    let locked: HTMLElement | null = null;
    const SIZE = 28;
    const PAD = 6;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(vf, { opacity: 1, duration: 0.2, overwrite: 'auto' });
      if (!locked) {
        vx(e.clientX - SIZE / 2);
        vy(e.clientY - SIZE / 2);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const t = target?.closest('a, button') as HTMLElement | null;
      if (!t || t === locked) return;
      locked = t;
      const r = t.getBoundingClientRect();
      gsap.to(vf, {
        x: r.left - PAD,
        y: r.top - PAD,
        width: r.width + PAD * 2,
        height: r.height + PAD * 2,
        duration: 0.35,
        ease: 'expo.out',
        overwrite: 'auto',
      });
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const t = target?.closest('a, button') as HTMLElement | null;
      if (!t || (e.relatedTarget && t.contains(e.relatedTarget as Node))) return;
      locked = null;
      gsap.to(vf, {
        width: SIZE,
        height: SIZE,
        duration: 0.3,
        ease: 'expo.out',
      });
    };

    const onScroll = () => {
      if (locked) {
        const r = locked.getBoundingClientRect();
        gsap.set(vf, { x: r.left - PAD, y: r.top - PAD });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
      gsap.set(vf, { opacity: 0, display: 'none' });
    };
  });

  return (
    <div
      ref={cursorRef}
      data-motion="cursor"
      aria-hidden="true"
      style={{ display: 'none' }}
    >
      <i />
      <i />
      <i />
      <i />
    </div>
  );
};

export default ViewfinderCursor;

