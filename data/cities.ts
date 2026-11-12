export interface CityWhyLocalItem {
  number: string;
  title: string;
  text: string;
}

export interface CityWorkItem {
  category: string;
  location: string;
  name: string;
}

export interface CityFaqItem {
  question: string;
  answer: string;
}

export interface CityNearbyLink {
  name: string;
  slug: string;
}

export interface City {
  slug: string;
  name: string;
  h1Highlight: string;
  heroText: string;
  office: string | null;
  meetings: string;
  storesBuilt: string;
  quoteTime: string;
  whyLocal: CityWhyLocalItem[];
  marketEyebrow: string;
  marketHeading: string;
  marketText: string[];
  areasEyebrow: string;
  areasHeading: string;
  areas: string[];
  workEyebrow: string;
  workHeading: string;
  work: CityWorkItem[];
  faqEyebrow: string;
  faqHeading: string;
  faq: CityFaqItem[];
  otherCitiesHeading: string;
  nearby: CityNearbyLink[];
}

export const CITIES: Record<string, City> = {
  gurugram: {
    slug: 'gurugram',
    name: 'Gurugram',
    h1Highlight: 'Gurugram',
    heroText:
      'We design and build Shopify stores for Gurugram brands — then run the ads and automations that bring in sales. Meet us at our Sector 22 office.',
    office: 'Sector 22, Gurugram',
    meetings: 'In person or Google Meet',
    storesBuilt: '[NUMBER]',
    quoteTime: 'Within [24 hours]',
    whyLocal: [
      {
        number: '01',
        title: 'Meet in person',
        text: 'Our office is in Sector 22. Workshops and handovers happen at your desk or ours.'
      },
      {
        number: '02',
        title: 'Built for Indian buyers',
        text: 'UPI, Razorpay, COD confirmation, Shiprocket and GST invoicing set up from day one.'
      },
      {
        number: '03',
        title: 'Same time zone, same team',
        text: 'No overnight hand-offs. The person you meet is the person building your store.'
      },
      {
        number: '04',
        title: 'Ready to sell abroad too',
        text: 'Multi-currency and international shipping when you want to reach buyers outside India.'
      }
    ],
    marketEyebrow: 'Gurugram market',
    marketHeading: 'Selling to Gurugram\nbuyers.',
    marketText: [
      '[2–3 paragraphs of genuinely local content — what Gurugram D2C brands sell, how local buyers shop (mobile-first, UPI, fast delivery expectations), and what that means for store design. Each city page needs its own text; copy-pasted city pages get treated as spam by Google.]',
      '[A short local example: a Gurugram brand you built for and what changed.]'
    ],
    areasEyebrow: 'Areas we serve',
    areasHeading: 'Across Gurugram and NCR.',
    areas: [
      'Cyber City',
      'Golf Course Road',
      'Sohna Road',
      'Udyog Vihar',
      'DLF Phases 1–5',
      'MG Road',
      'Sector 29',
      'Golf Course Extension',
      'Manesar'
    ],
    workEyebrow: 'Work in NCR',
    workHeading: "Stores we've built nearby.",
    work: [
      {
        category: '[Category]',
        location: 'Gurugram',
        name: '[Project name]'
      },
      {
        category: '[Category]',
        location: 'Delhi NCR',
        name: '[Project name]'
      },
      {
        category: '[Category]',
        location: '[City]',
        name: '[Project name]'
      }
    ],
    faqEyebrow: 'Questions',
    faqHeading: 'Gurugram FAQs',
    faq: [
      {
        question: 'How much does a Shopify store cost in Gurugram?',
        answer:
          'It depends on what you choose in the package builder. Stores start from [₹ PRICE]; you get an itemised quote within [24 hours].'
      },
      {
        question: 'Can we meet at your office?',
        answer:
          'Yes. We are in Sector 22, Gurugram. Book a time and come over, or we can visit you anywhere in Gurugram.'
      },
      {
        question: 'Do you set up GST invoices and Indian payment gateways?',
        answer:
          'Yes — Razorpay, PhonePe, UPI, COD and automatic GST invoices are part of the setup if you select them.'
      },
      {
        question: 'Do you only work with Gurugram brands?',
        answer:
          'No. We work with brands across India and abroad; Gurugram clients simply get in-person meetings.'
      }
    ],
    otherCitiesHeading: 'Other cities',
    nearby: [
      { name: 'Delhi', slug: 'delhi' },
      { name: 'Noida', slug: 'noida' },
      { name: 'Faridabad', slug: 'faridabad' },
      { name: 'Mumbai', slug: 'mumbai' },
      { name: 'Bangalore', slug: 'bangalore' },
      { name: 'Dubai', slug: 'dubai' },
      { name: 'London', slug: 'london' },
      { name: 'New York', slug: 'new-york' }
    ]
  }
};
