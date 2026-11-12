'use client';

import { RefObject } from 'react';
import { gsap, useGSAP } from './gsap';
import { MOTION_CONDITIONS } from './conditions';

export type MotionConditions = {
  desktop?: boolean;
  tablet?: boolean;
  mobile?: boolean;
  finePointer?: boolean;
  reduceMotion?: boolean;
  [key: string]: boolean | undefined;
};

export function useSectionMotion<T extends HTMLElement = HTMLElement>(
  scopeRef: RefObject<T | null>,
  setup: (
    conditions: MotionConditions,
    scopeRef: RefObject<T | null>
  ) => void | (() => void),
  dependencies: unknown[] = []
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_CONDITIONS, (ctx) => {
        const conditions = (ctx.conditions || {}) as MotionConditions;
        if (conditions.reduceMotion) {
          return;
        }
        return setup(conditions, scopeRef);
      });
      return () => {
        mm.revert();
      };
    },
    { scope: scopeRef, dependencies }
  );
}
