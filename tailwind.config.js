/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter','system-ui','sans-serif'] },
      colors: {
        navy: { 900:'#0A0F1C', 800:'#0D1424', 700:'#111827' },
        brand: { 400:'#818cf8', 500:'#4f46e5', 600:'#4338ca' },
        accent: { 400:'#a78bfa', 500:'#8b5cf6' },
        cyan: { 400:'#22d3ee', 500:'#06b6d4' },
      },
      keyframes: {
        fadeUp:  { from:{ opacity:'0', transform:'translateY(16px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        fadeIn:  { from:{ opacity:'0' }, to:{ opacity:'1' } },
        scaleIn: { from:{ opacity:'0', transform:'scale(0.96)' }, to:{ opacity:'1', transform:'scale(1)' } },
        shimmer: { '0%':{ backgroundPosition:'-200% 0' }, '100%':{ backgroundPosition:'200% 0' } },
        pulse2:  { '0%,100%':{ opacity:'1' }, '50%':{ opacity:'0.4' } },
      },
      animation: {
        'fade-up':  'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':  'fadeIn 0.4s ease both',
        'scale-in': 'scaleIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'shimmer':  'shimmer 2s linear infinite',
        'pulse2':   'pulse2 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
