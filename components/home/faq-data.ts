export interface FaqItem {
  question: string;
  answer: string;
}

export const HOME_FAQS: FaqItem[] = [
  {
    question: 'How much does a Shopify store cost?',
    answer:
      'Builds start from [PRICE]. The final quote depends on pages, custom features and integrations — fixed before we start.',
  },
  {
    question: 'How long does it take?',
    answer: 'Most stores go live in [X–Y] weeks from the first call.',
  },
  {
    question: 'Do you work with brands outside India?',
    answer:
      "Yes. We're based in Gurugram and work remotely with brands in [COUNTRIES].",
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

