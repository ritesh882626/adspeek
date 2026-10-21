import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '340px',
      sm: '640px',
      md: '900px',
      lg: '1200px',
      xl: '1600px',
      '2xl': '1800px',
    },
    extend: {
      maxWidth: {
        'site': '1800px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        coal: '#02090A',
        'teal-panel': '#061A1C',
        'navy-panel': '#000A1E',
        'navy-deep': '#050B27',
        'soft-white': '#EFF8F0',
        'pale-green': '#C5E1C5',
        'muted-body': '#A8B1B1',
        'brand-emerald': '#0C5A48',
        'brand-emerald-hover': '#084537',
        'accent-neon': '#36F4A4',
        'brand-cream': '#FAF9F5',
        'brand-offwhite': '#F4F5F6',
        border: {
          dark: 'rgba(255, 255, 255, 0.08)',
          'teal-dark': '#142528',
          light: 'rgba(0, 0, 0, 0.08)',
          'light-subtle': '#E5E7EB',
        },
      },
      borderRadius: {
        panel: '20px',
        card: '14px',
        full: '9999px',
      },
      boxShadow: {
        'card-dark': '0 8px 30px rgba(0, 0, 0, 0.35)',
        'card-light': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 16px 36px -4px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)',
        'mockup-light': '0 20px 48px -12px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'teal-glow': '0 0 60px -15px rgba(11, 58, 45, 0.3)',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        default: '220ms',
      },
    },
  },
  plugins: [],
};

export default config;
