import type { Config } from 'tailwindcss';

const colors = {
  background: '#050816',
  panel: '#0C1124',
  line: 'rgba(175, 193, 255, 0.16)',
  accent: '#89A7FF',
  accent2: '#5FF2D6',
  text: '#EEF2FF',
  muted: '#9AA6C7',
};

const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
};

const borderRadius = {
  none: '0',
  sm: '0.25rem',
  DEFAULT: '0.5rem',
  md: '0.625rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '3rem',
};

const shadows = {
  glow: '0 0 0 1px rgba(137,167,255,0.12), 0 16px 80px rgba(17, 24, 39, 0.48)',
};

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors,
      spacing,
      borderRadius,
      boxShadow: shadows,
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(137,167,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(137,167,255,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
} satisfies Config;

export { colors, spacing, borderRadius, shadows };
