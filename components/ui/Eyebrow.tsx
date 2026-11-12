'use client';

import React, { useRef } from 'react';
import { ScrollTrigger } from '@/lib/motion/gsap';
import { useSectionMotion } from '@/lib/motion/useSectionMotion';
import { scramble } from '@/lib/motion/scramble';

interface EyebrowProps {
  children: React.ReactNode;
  tone?: 'default' | 'onDark';
  className?: string;
  decode?: boolean;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  tone = 'default',
  className = '',
  decode = false,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const toneClass = tone === 'onDark' ? 'text-forest-muted' : 'text-muted';

  useSectionMotion(
    pRef,
    (conditions, scope) => {
      if (!decode) return;
      const el = scope.current;
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          scramble(el, { duration: 0.8 });
        },
      });

      return () => {
        st.kill();
      };
    },
    [decode]
  );

  return (
    <p
      ref={pRef}
      className={`font-mono text-[12px] lg:text-[13px] uppercase tracking-[0.06em] mb-4 ${toneClass} ${className}`}
    >
      {children}
    </p>
  );
};

export default Eyebrow;
