import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    borderRadius: {
      DEFAULT: '0px',
      none: '0px',
      sm: '0px',
      md: '0px',
      lg: '0px',
      xl: '0px',
      '2xl': '0px',
      '3xl': '0px',
      full: '0px',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#111410',
        paper: '#FAFAF7',
        white: '#FFFFFF',
        forest: '#0F3D2E',
        accent: '#C8F03C',
        line: '#D9DBD3',
        'line-strong': '#C9CCC3',
        muted: '#5B6159',
        body: '#3A3F38',
        placeholder: '#E7E9E1',
        'forest-line': '#3C6A5A',
        'forest-muted': '#B9CEC4',
        'forest-text': '#D3E0D9',
        'footer-text': '#D3D6CE',
        'footer-muted': '#9CA196',
        'footer-line': '#33372F',
      },
      fontSize: {
        display: ['clamp(44px, 5.5vw, 76px)', { lineHeight: '0.98', letterSpacing: '-0.035em', fontWeight: '800' }],
        h2: ['clamp(32px, 4vw, 48px)', { lineHeight: '1.04', letterSpacing: '-0.03em', fontWeight: '800' }],
        h3: ['clamp(22px, 2.5vw, 26px)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        lead: ['clamp(17px, 1.8vw, 20px)', { lineHeight: '1.5' }],
        body: ['clamp(15px, 1.5vw, 17px)', { lineHeight: '1.55' }],
        label: ['12px', { letterSpacing: '0.06em' }],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
