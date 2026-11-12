'use client';

import { RefObject } from 'react';
import { gsap, SplitText } from '@/lib/motion/gsap';
import { useSectionMotion } from '@/lib/motion/useSectionMotion';
import { LIME, SCRAMBLE_CHARS } from '@/lib/motion/conditions';

function scramble(el: HTMLElement, opts: { duration?: number; delay?: number } = {}) {
  const final = el.getAttribute('data-final') || el.textContent || '';
  el.setAttribute('data-final', final);
  const o = { p: 0 };
  const glyphs = SCRAMBLE_CHARS;
  return gsap.to(o, {
    p: 1,
    duration: opts.duration || 0.7,
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

function splitChars(el: HTMLElement): HTMLElement[] {
  try {
    const split = new SplitText(el, { type: 'chars,words', aria: 'auto' });
    if (split.chars && split.chars.length > 0) {
      return split.chars as HTMLElement[];
    }
  } catch (e) {
    // fallback
  }
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

function splitWords(el: HTMLElement): HTMLElement[] {
  try {
    const split = new SplitText(el, { type: 'words', aria: 'auto' });
    if (split.words && split.words.length > 0) {
      return split.words as HTMLElement[];
    }
  } catch (e) {
    // fallback
  }
  const wordsArr = (el.textContent || '').trim().split(/\s+/);
  el.textContent = '';
  const out: HTMLElement[] = [];
  wordsArr.forEach((w, i) => {
    const s = document.createElement('span');
    s.className = 'w';
    s.textContent = w;
    el.appendChild(s);
    out.push(s);
    if (i < wordsArr.length - 1) el.appendChild(document.createTextNode(' '));
  });
  return out;
}

export function useHeroMotion<T extends HTMLElement = HTMLElement>(
  sectionRef: RefObject<T | null>
) {
  useSectionMotion(sectionRef, (conditions, scope) => {
    const section = scope.current;
    if (!section) return;

    const heroWrap = section.querySelector<HTMLElement>('[data-motion="hero"]');
    const eyebrow = section.querySelector<HTMLElement>('[data-motion="eyebrow"]');
    const line1 = section.querySelector<HTMLElement>('[data-motion="line1"]');
    const highlight = section.querySelector<HTMLElement>('[data-motion="highlight"]');
    const line3 = section.querySelector<HTMLElement>('[data-motion="line3"]');
    const lead = section.querySelector<HTMLElement>('[data-motion="lead"]');
    const btns = Array.from(section.querySelectorAll<HTMLElement>('[data-motion="cta"]'));
    const spec = section.querySelector<HTMLElement>('[data-motion="spec"]');
    const specCode =
      section.querySelector<HTMLElement>('[data-motion="spec-code"]') ||
      spec?.querySelector<HTMLElement>('div > span:last-child');
    const specValues = Array.from(
      section.querySelectorAll<HTMLElement>('[data-motion="spec-value"]')
    );

    if (!heroWrap || !eyebrow || !line1 || !highlight || !line3 || !lead || !spec) {
      return;
    }

    // Save originals for clean revert
    const line1Original = line1.innerHTML;
    const hlOriginal = highlight.innerHTML;
    const line3Original = line3.innerHTML;

    // Split text
    const c1 = splitChars(line1);
    const cHl = splitChars(highlight);
    const w3 = splitWords(line3);

    // Setup initial highlight background
    highlight.style.backgroundImage = `linear-gradient(${LIME}, ${LIME})`;
    highlight.style.backgroundRepeat = 'no-repeat';
    highlight.style.backgroundPosition = '0 0';
    highlight.style.backgroundSize = '0% 100%';

    const tl = gsap.timeline({
      delay: 0.15,
      onStart: () => {
        document.documentElement.setAttribute('data-hero-ready', 'true');
      },
    });

    tl.set(heroWrap, { opacity: 1 })
      .add(scramble(eyebrow, { duration: 0.7 }), 0)
      .from(
        c1,
        {
          scaleY: 0,
          y: 24,
          opacity: 0,
          transformOrigin: '50% 100%',
          duration: 0.55,
          ease: 'back.out(2.4)',
          stagger: { each: 0.028, from: 'random' },
        },
        0.1
      )
      .to(
        highlight,
        {
          backgroundSize: '100% 100%',
          duration: 0.6,
          ease: 'power3.inOut',
        },
        '-=0.2'
      )
      .from(
        cHl,
        {
          yPercent: 70,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
          stagger: 0.022,
        },
        '<0.25'
      )
      .from(
        w3,
        {
          rotateX: -100,
          opacity: 0,
          transformOrigin: '50% 0%',
          duration: 0.7,
          ease: 'back.out(1.7)',
          stagger: 0.08,
        },
        '-=0.15'
      )
      .from(
        lead,
        {
          clipPath: 'inset(0 0 100% 0)',
          y: 10,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.35'
      )
      .from(
        btns,
        {
          y: 18,
          opacity: 0,
          scale: 0.94,
          duration: 0.45,
          ease: 'back.out(2)',
          stagger: 0.08,
        },
        '-=0.3'
      );

    // Receipt printer
    tl.fromTo(
      spec,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: 'steps(16)' },
      0.55
    );

    specValues.forEach((val, i) => {
      tl.add(scramble(val, { duration: 0.5 }), 0.75 + i * 0.25);
    });

    if (specCode) {
      tl.add(scramble(specCode, { duration: 0.6 }), 0.6);
    }

    tl.to(
      spec,
      {
        rotate: -0.9,
        duration: 0.12,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      },
      '>-0.1'
    );

    // Desktop tilt effect
    let cleanupTilt: (() => void) | undefined;
    if (conditions.desktop && conditions.finePointer) {
      const rx = gsap.quickTo(spec, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      const ry = gsap.quickTo(spec, 'rotationY', { duration: 0.6, ease: 'power3.out' });

      const onMouseMove = (e: MouseEvent) => {
        const r = section.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 12);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 9);
      };

      const onMouseLeave = () => {
        rx(0);
        ry(0);
      };

      section.addEventListener('mousemove', onMouseMove);
      section.addEventListener('mouseleave', onMouseLeave);

      cleanupTilt = () => {
        section.removeEventListener('mousemove', onMouseMove);
        section.removeEventListener('mouseleave', onMouseLeave);
        gsap.set(spec, { rotationX: 0, rotationY: 0 });
      };
    }

    return () => {
      tl.kill();
      if (cleanupTilt) cleanupTilt();
      line1.innerHTML = line1Original;
      highlight.innerHTML = hlOriginal;
      line3.innerHTML = line3Original;
      highlight.style.backgroundImage = '';
      highlight.style.backgroundSize = '';
      gsap.set([heroWrap, spec, lead, ...btns], { clearProps: 'all' });
    };
  });
}
