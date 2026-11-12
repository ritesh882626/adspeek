'use client';

import { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin } from 'gsap/all';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin);
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }
}

export { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP };

