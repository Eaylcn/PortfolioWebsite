import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './**/*.{ts,tsx}',
    '!./node_modules/**',
    '!./dist/**',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#135bec',
        'primary-glow': '#3b82f6',
        'background-dark': '#101622',
        'card-dark': '#161e2e',
        'input-bg': '#192233',
        'border-dark': '#324467',
        'text-muted': '#92a4c9',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Noto Sans', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px -5px rgba(19, 91, 236, 0.5)',
        'glow-hover': '0 0 30px -5px rgba(19, 91, 236, 0.7)',
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'shimmer-text': 'shimmer-text 4s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'shimmer-text': {
          '0%': { 'text-shadow': '0 0 0px rgba(19, 91, 236, 0)' },
          '50%': { 'text-shadow': '0 0 15px rgba(19, 91, 236, 0.8)' },
          '100%': { 'text-shadow': '0 0 0px rgba(19, 91, 236, 0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [forms, containerQueries],
};

export default config;
