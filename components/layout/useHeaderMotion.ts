'use client';

import { RefObject, useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { useSectionMotion } from '@/lib/motion/useSectionMotion';

export function useHeaderMotion(
  headerRef: RefObject<HTMLElement | null>,
  isMobileMenuOpen: boolean
) {
  const menuOpenRef = useRef(isMobileMenuOpen);
  menuOpenRef.current = isMobileMenuOpen;

  useEffect(() => {
    if (isMobileMenuOpen && headerRef.current) {
      gsap.to(headerRef.current, { yPercent: 0, duration: 0.25, overwrite: true });
    }
  }, [isMobileMenuOpen, headerRef]);

  useSectionMotion(
    headerRef,
    (conditions, scope) => {
      const header = scope.current;
      if (!header) return;

      const logoSq = header.querySelector('[data-motion="logo-square"]');
      if (!logoSq) return;

      let hidden = false;
      let idleTimer: gsap.core.Tween | null = null;

      function blink() {
        gsap.fromTo(
          logoSq,
          { scaleY: 1 },
          {
            scaleY: 0.12,
            duration: 0.09,
            yoyo: true,
            repeat: 3,
            repeatDelay: 0.04,
            ease: 'power1.inOut',
            transformOrigin: '50% 50%',
          }
        );
      }

      const st = ScrollTrigger.create({
        start: 'top -140',
        end: 'max',
        onUpdate: (self) => {
          const menuOpen = menuOpenRef.current;
          const hide = self.direction === 1 && !menuOpen;
          if (hide !== hidden) {
            hidden = hide;
            gsap.to(header, {
              yPercent: hide ? -100 : 0,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: true,
            });
            if (!hide) {
              blink();
            }
          }
        },
        onLeaveBack: () => {
          if (hidden) {
            hidden = false;
            gsap.to(header, { yPercent: 0, duration: 0.3 });
          }
        },
      });

      const initialCall = gsap.delayedCall(0.2, blink);

      function scheduleIdleBlink() {
        idleTimer = gsap.delayedCall(5 + Math.random() * 4, () => {
          if (!hidden) {
            blink();
          }
          scheduleIdleBlink();
        });
      }
      scheduleIdleBlink();

      return () => {
        st.kill();
        initialCall.kill();
        if (idleTimer) idleTimer.kill();
        gsap.set(header, { yPercent: 0 });
        gsap.set(logoSq, { scaleY: 1 });
      };
    },
    []
  );
}

