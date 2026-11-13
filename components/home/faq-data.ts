export interface FaqItem {
  question: string;
  answer: string;
  link?: {
    text: string;
    href: string;
  };
}

export const HOME_FAQS: FaqItem[] = [
  {
    question: 'How much does a Shopify store cost?',
    answer:
      'Builds start from ₹14,999. The final quote depends on pages, custom features and integrations — fixed before we start.',
    link: {
      text: 'See the full breakdown in our guide to Shopify costs in India.',
      href: '/guides/shopify-store-cost-india',
    },
  },
  {
    question: 'How long does it take?',
    answer: 'Most stores go live in 3–4 weeks from the first call.',
  },
  {
    question: 'Do you work with brands outside India?',
    answer:
      "Yes. We're based in Gurugram and work remotely with brands across 4+ countries including India, UAE, USA and the UK.",
  },
  {
    question: 'What happens after launch?',
    answer:
      'On the Growth plan we run your ads, automations and tracking, and send one report a week.',
  },
  {
    question: 'Can you move my store from WooCommerce?',
    answer:
      'Yes — products, customers and order history move across, with redirects so you keep your search rankings.',
  },
];

