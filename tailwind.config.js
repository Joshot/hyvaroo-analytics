/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter','system-ui','sans-serif'] },
      colors: {
        navy: { 900:'#0A0F1C', 800:'#0D1424', 700:'#111827' },
        indigo: { 500:'#4F46E5', 600:'#4338CA' },
        violet: { 500:'#8B5CF6' },
        cyan: { 400:'#22D3EE' },
      },
      keyframes: {
        fadeUp:  { from:{ opacity:'0', transform:'translateY(16px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        fadeIn:  { from:{ opacity:'0' }, to:{ opacity:'1' } },
        scaleIn: { from:{ opacity:'0', transform:'scale(0.96)' }, to:{ opacity:'1', transform:'scale(1)' } },
        shimmer: { '0%':{ backgroundPosition:'-200% 0' }, '100%':{ backgroundPosition:'200% 0' } },
        glow:    { '0%,100%':{ opacity:'0.4' }, '50%':{ opacity:'1' } },
      },
      animation: {
        'fade-up':  'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':  'fadeIn 0.4s ease both',
        'scale-in': 'scaleIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'glow':     'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
