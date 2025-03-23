/** @type {import('tailwindcss').Config} */
import e from 'cors';
import daisyui from 'daisyui';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(22rem, 1fr))',
      },
      height: {
        112: '28rem',
        120: '30rem',
        128: '36rem',
      },
    },
    fontFamily: {
      primary: ['Playfair Display', 'serif'],
      body: ['Barlow', 'sans-serif'],
      logo: ['Great Vibes', 'cursive'],
      bodyAlt: ['Saira', 'sans-serif'],
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '3rem',
      },
    },
  },
  daisyui: {
    themes: [
      'emerald',
      {
        business: {
          ...require('daisyui/src/theming/themes')['business'],
          neutral: '#ffffff',
          accent: '#A16207',
          primary: '#1f1f1f',
          secondary: '#333c4d',
        },
        emerald: {
          ...require('daisyui/src/theming/themes')['emerald'],
          accent: '#A16207',
          secondary: '#fff',
          primary: '#faf9f6',
        },
      },
    ],
  },
  plugins: [
    daisyui,
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),
  ],
};
