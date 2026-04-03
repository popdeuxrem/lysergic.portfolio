import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        panel: '#0C1124',
        line: 'rgba(175, 193, 255, 0.16)',
        accent: '#89A7FF',
        accent2: '#5FF2D6',
        text: '#EEF2FF',
        muted: '#9AA6C7',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(137,167,255,0.12), 0 16px 80px rgba(17, 24, 39, 0.48)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(137,167,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(137,167,255,0.08) 1px, transparent 1px)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
