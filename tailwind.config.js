/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#a08040',
          light: '#c0a060',
          dark: '#806020',
        },
        charcoal: '#1a1a1a',
        slate: '#2a2a2a',
        ash: '#404040',
        smoke: '#666666',
        fog: '#888888',
        mist: '#b0b0b0',
        pearl: '#d0d0d0',
        bone: '#e8e8e8',
        ivory: '#f5f5f5',
        blood: '#8b1a1a',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(160, 128, 64, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(160, 128, 64, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
