/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '8.5': '2.125rem',
      },
      colors: {
        paper: '#FAF9F6',
        paperAlt: '#F3F1EA',
        ink: '#0F172A',
        inkSoft: '#475569',
        inkFaint: '#94A3B8',
        hairline: '#E8E4DC',
        hairlineStrong: '#DDD8CC',
        teal: { DEFAULT: '#0D9488', deep: '#0B7A70', soft: '#E4F5F3' },
        amber: { DEFAULT: '#F59E0B', deep: '#D97E06', soft: '#FDF0DA' },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      transitionDuration: {
        '350': '350ms',
        '400': '400ms',
      },
      boxShadow: {
        sm2: '0 2px 8px rgba(15,23,42,0.04), 0 1px 2px rgba(15,23,42,0.03)',
        md2: '0 8px 24px rgba(15,23,42,0.06), 0 2px 6px rgba(15,23,42,0.04)',
        lg2: '0 24px 64px rgba(15,23,42,0.10), 0 8px 24px rgba(15,23,42,0.06)',
        glowTeal: '0 8px 32px rgba(13,148,136,0.18)',
      },
    },
  },
  plugins: [],
}
