'use client';

import { RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { useSectionMotion } from '@/lib/motion/useSectionMotion';
import { LIME, FOREST, INK } from '@/lib/motion/conditions';

export function useGrowthLoopMotion<T extends HTMLElement = HTMLElement>(
  sectionRef: RefObject<T | null>
) {
  useSectionMotion(sectionRef, (conditions, scope) => {
    const section = scope.current;
    if (!section) return;

    // Pick desktop grid or mobile grid depending on viewport
    const isMobile = !!conditions.mobile;
    const grid = isMobile
      ? section.querySelector<HTMLElement>('[data-motion="mobile-grid"]')
      : section.querySelector<HTMLElement>('[data-motion="grid"]');

    if (!grid) return;

    const svg = grid.querySelector<SVGSVGElement>('[data-motion="loop-svg"]');
    const base = grid.querySelector<SVGPathElement>('[data-motion="loop-base"]');
    const prog = grid.querySelector<SVGPathElement>('[data-motion="loop-prog"]');
    const halo = grid.querySelector<SVGCircleElement>('[data-motion="loop-halo"]');
    const dot = grid.querySelector<SVGCircleElement>('[data-motion="loop-dot"]');

    if (!svg || !base || !prog || !halo || !dot) return;

    const cols = Array.from(
      grid.querySelectorAll<HTMLElement>('[data-motion="col"]')
    );
    const chips = Array.from(
      grid.querySelectorAll<HTMLElement>('[data-motion="chip"]')
    );
    const marks = Array.from(
      grid.querySelectorAll<HTMLElement>('[data-motion="marker"]')
    );
    const ticks = Array.from(
      grid.querySelectorAll<HTMLElement>('[data-motion="tick"]')
    );

    // Initial state
    cols.forEach((c) => {
      const h3 = c.querySelector('h3');
      const ul = c.querySelector('ul');
      if (h3 && ul) {
        gsap.set([h3, ul], { opacity: 0.32 });
      }
    });
    gsap.set(marks, { opacity: 0 });
    gsap.set(ticks, { scale: 0, opacity: 0 });

    let L = 1;
    let fr = [0, 0.25, 0.5, 0.75];
    const state = [false, false, false, false];
    let loopTween: gsap.core.Tween | null = null;
    const proxy = { p: 0 };

    function buildLoop() {
      if (!grid || !prog || !base || !svg) return;
      const g = grid.getBoundingClientRect();
      const W = g.width;
      const H = g.height;
      if (W === 0 || H === 0) return;

      const pts = chips.map((ch) => {
        const r = ch.getBoundingClientRect();
        return {
          x: r.left - g.left + r.width / 2,
          y: r.top - g.top + r.height / 2,
        };
      });

      if (pts.length < 4) return;

      const oneRow = pts.every((p) => Math.abs(p.y - pts[0].y) < 6);
      let path: { x: number; y: number }[] = [];
      let reach: (i: number) => number;

      if (oneRow) {
        // along the chip row, then back around inside edge of the box
        const e = 14;
        path = [
          pts[0],
          pts[3],
          { x: W - e, y: pts[3].y },
          { x: W - e, y: H - e },
          { x: e, y: H - e },
          { x: e, y: pts[0].y },
          pts[0],
        ];
        reach = (i: number) => Math.abs(pts[i].x - pts[0].x);
      } else {
        // stacked or 2x2: a spine down the left padding, back up right padding
        const chipWidth = chips[0].getBoundingClientRect().width;
        const s = Math.max(8, Math.min(12, pts[0].x - chipWidth / 2 - 10));
        const top = 10;
        const bot = H - 10;
        const right = W - 10;
        path = [
          { x: s, y: pts[0].y },
          { x: s, y: bot },
          { x: right, y: bot },
          { x: right, y: top },
          { x: s, y: top },
          { x: s, y: pts[0].y },
        ];
        reach = (i: number) => Math.max(0, pts[i].y - pts[0].y);
      }

      let d = '';
      let total = 0;
      path.forEach((p, i) => {
        d += (i ? ' L' : 'M') + p.x + ' ' + p.y;
        if (i) {
          total += Math.abs(p.x - path[i - 1].x) + Math.abs(p.y - path[i - 1].y);
        }
      });

      fr = [0, 1, 2, 3].map((i) => (total > 0 ? reach(i) / total : i * 0.25));
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      base.setAttribute('d', d);
      prog.setAttribute('d', d);

      try {
        L = prog.getTotalLength() || 1;
      } catch (e) {
        L = total || 1;
      }
      prog.style.strokeDasharray = `${L}`;
      render();
    }

    function activate(i: number, on: boolean) {
      if (state[i] === on) return;
      state[i] = on;
      const c = cols[i];
      if (!c) return;

      gsap.to(chips[i], {
        backgroundColor: on ? LIME : FOREST,
        color: on ? INK : LIME,
        duration: 0.25,
      });

      if (on) {
        gsap.fromTo(
          chips[i],
          { scale: 1.5, rotate: -10 },
          { scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(3)' }
        );
      }

      const h3 = c.querySelector('h3');
      const ul = c.querySelector('ul');
      if (h3 && ul) {
        gsap.to([h3, ul], { opacity: on ? 1 : 0.32, duration: 0.35 });
      }

      const colTicks = Array.from(c.querySelectorAll<HTMLElement>('[data-motion="tick"]'));
      gsap.to(colTicks, {
        scale: on ? 1 : 0,
        opacity: on ? 1 : 0,
        duration: 0.3,
        ease: 'back.out(3)',
        stagger: on ? 0.08 : 0,
      });
    }

    function placeDot(p: number) {
      if (!prog || !dot || !halo) return;
      try {
        const len = (((p % 1) + 1) % 1) * L;
        const pt = prog.getPointAtLength(len);
        dot.setAttribute('cx', `${pt.x}`);
        dot.setAttribute('cy', `${pt.y}`);
        halo.setAttribute('cx', `${pt.x}`);
        halo.setAttribute('cy', `${pt.y}`);
      } catch (e) {}
    }

    function render() {
      const p = proxy.p;
      if (prog) {
        prog.style.strokeDashoffset = `${L * (1 - p)}`;
      }
      placeDot(p);
      for (let i = 0; i < 4; i++) {
        activate(i, p > 0 && p >= fr[i] - 0.001);
      }
    }

    function startLoop() {
      if (loopTween) return;
      const lp = { p: 0 };
      loopTween = gsap.to(lp, {
        p: 1,
        duration: 7,
        ease: 'none',
        repeat: -1,
        onUpdate: () => {
          placeDot(lp.p);
        },
        onRepeat: () => {
          if (chips[0]) {
            gsap.fromTo(
              chips[0],
              { scale: 1.4 },
              { scale: 1, duration: 0.5, ease: 'back.out(3)' }
            );
          }
        },
      });
    }

    function stopLoop() {
      if (loopTween) {
        loopTween.kill();
        loopTween = null;
      }
    }

    const haloAnim = gsap.to(halo, {
      attr: { r: 18 },
      opacity: 0,
      duration: 1.1,
      repeat: -1,
      ease: 'power1.out',
    });

    buildLoop();
    ScrollTrigger.addEventListener('refresh', buildLoop);

    let scrollTween: gsap.core.Tween | null = null;

    if (conditions.desktop) {
      scrollTween = gsap.to(proxy, {
        p: 1,
        ease: 'none',
        onUpdate: render,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.8,
          onLeave: startLoop,
          onEnterBack: stopLoop,
        },
      });
    } else {
      scrollTween = gsap.to(proxy, {
        p: 1,
        ease: 'none',
        onUpdate: render,
        scrollTrigger: {
          trigger: grid,
          start: 'top 72%',
          end: 'bottom 55%',
          scrub: 0.8,
          onLeave: startLoop,
          onEnterBack: stopLoop,
        },
      });
    }

    return () => {
      stopLoop();
      haloAnim.kill();
      if (scrollTween) {
        if (scrollTween.scrollTrigger) scrollTween.scrollTrigger.kill();
        scrollTween.kill();
      }
      ScrollTrigger.removeEventListener('refresh', buildLoop);
      cols.forEach((c, i) => {
        const h3 = c.querySelector('h3');
        const ul = c.querySelector('ul');
        if (h3 && ul) gsap.set([h3, ul], { clearProps: 'opacity' });
        if (chips[i]) gsap.set(chips[i], { clearProps: 'all' });
      });
      gsap.set(marks, { clearProps: 'opacity' });
      gsap.set(ticks, { clearProps: 'all' });
    };
  });
}
