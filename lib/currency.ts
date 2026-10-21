export interface RegionCurrency {
  code: string;
  symbol: string;
  label: string;
  country: string;
  budgetOptions: string[];
}

export const REGION_CURRENCIES: Record<string, RegionCurrency> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    label: 'INR (₹)',
    country: 'India',
    budgetOptions: ['₹50,000 – ₹1,50,000', '₹1,50,000 – ₹3,00,000', '₹3,00,000 – ₹6,00,000', '₹6,00,000+ (Enterprise)'],
  },
  USD: {
    code: 'USD',
    symbol: '$',
    label: 'USD ($)',
    country: 'United States',
    budgetOptions: ['$2,000 – $5,000', '$5,000 – $10,000', '$10,000 – $20,000', '$20,000+ (Enterprise)'],
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    label: 'GBP (£)',
    country: 'United Kingdom',
    budgetOptions: ['£1,500 – £3,500', '£3,500 – £7,500', '£7,500 – £15,000', '£15,000+ (Enterprise)'],
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    label: 'AED (د.إ)',
    country: 'UAE & Middle East',
    budgetOptions: ['4,500 – 10,000 AED', '10,000 – 25,000 AED', '25,000 – 50,000 AED', '50,000+ AED'],
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    label: 'AUD (A$)',
    country: 'Australia',
    budgetOptions: ['A$2,500 – A$5,000', 'A$5,000 – A$12,000', 'A$12,000 – A$25,000', 'A$25,000+ (Enterprise)'],
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    label: 'EUR (€)',
    country: 'Europe',
    budgetOptions: ['€1,500 – €3,500', '€3,500 – €8,000', '€8,000 – €18,000', '€18,000+'],
  },
};

export function detectUserRegionCurrency(): RegionCurrency {
  if (typeof window === 'undefined') {
    return REGION_CURRENCIES.INR;
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const tzLower = tz.toLowerCase();

    // India & Subcontinent
    if (tzLower.includes('kolkata') || tzLower.includes('calcutta') || tzLower.includes('delhi') || tzLower.includes('mumbai') || tzLower.includes('asia/colombo') || tzLower.includes('asia/kathmandu')) {
      return REGION_CURRENCIES.INR;
    }

    // United Kingdom
    if (tzLower.includes('london') || tzLower.includes('europe/belfast') || tzLower.includes('europe/dublin')) {
      return REGION_CURRENCIES.GBP;
    }

    // UAE & Gulf
    if (tzLower.includes('dubai') || tzLower.includes('abu_dhabi') || tzLower.includes('muscat') || tzLower.includes('qatar') || tzLower.includes('riyadh') || tzLower.includes('kuwait') || tzLower.includes('bahrain')) {
      return REGION_CURRENCIES.AED;
    }

    // Australia & NZ
    if (tzLower.includes('sydney') || tzLower.includes('melbourne') || tzLower.includes('brisbane') || tzLower.includes('perth') || tzLower.includes('adelaide') || tzLower.includes('hobart') || tzLower.includes('auckland')) {
      return REGION_CURRENCIES.AUD;
    }

    // Europe (Eurozone)
    if (tzLower.includes('paris') || tzLower.includes('berlin') || tzLower.includes('madrid') || tzLower.includes('rome') || tzLower.includes('amsterdam') || tzLower.includes('brussels') || tzLower.includes('vienna')) {
      return REGION_CURRENCIES.EUR;
    }

    // Americas
    if (tzLower.includes('america') || tzLower.includes('new_york') || tzLower.includes('los_angeles') || tzLower.includes('chicago') || tzLower.includes('denver') || tzLower.includes('toronto') || tzLower.includes('vancouver')) {
      return REGION_CURRENCIES.USD;
    }
  } catch {
    // fallback
  }

  return REGION_CURRENCIES.INR;
}
