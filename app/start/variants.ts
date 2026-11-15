export interface QuizVariant {
  eyebrow: string;
  headline: string;
  sub: string;
  cta: string;
  image: string | null;
}

export const variants: Record<string, QuizVariant> = {
  default: {
    eyebrow: 'For Amazon, Flipkart & Instagram sellers',
    headline: 'Get your own Shopify store that sells — from ₹25k',
    sub: 'Answer 4 quick taps. Get a custom store plan for your brand on WhatsApp.',
    cta: 'Check my store fit — 30 sec',
    image: null,
  },
  home: {
    eyebrow: 'For Home & Decor Brands',
    headline: 'Get a Shopify store built to sell room collections & bundles',
    sub: 'Answer 4 quick taps. Get your custom store blueprint on WhatsApp.',
    cta: 'Check my store fit — 30 sec',
    image: null,
  },
  fashion: {
    eyebrow: 'For Fashion & Streetwear Brands',
    headline: 'Get your own Shopify store that sells — from ₹25k',
    sub: 'Answer 4 quick taps. Get a custom store plan for your brand on WhatsApp.',
    cta: 'Check my store fit — 30 sec',
    image: null,
  },
  skincare: {
    eyebrow: 'For Skincare & D2C Beauty Brands',
    headline: 'Get a Shopify store engineered for repeat orders & subscriptions',
    sub: 'Answer 4 quick taps. Get your custom brand store plan on WhatsApp.',
    cta: 'Check my store fit — 30 sec',
    image: null,
  },
};

export function getVariant(key?: string | null): QuizVariant {
  if (key && variants[key]) {
    return variants[key];
  }
  return variants.default;
}
