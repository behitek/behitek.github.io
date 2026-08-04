/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f3f2f2',
        surface: '#eae9e9',
        ink: '#201e1d',
        border: {
          DEFAULT: '#201e1d',
          light: '#c9c5c1',
        },
        accent: {
          DEFAULT: '#ec3013',
          hover: '#c9280f',
          100: '#fff2ef',
          200: '#ffe0d9',
          300: '#ffc4b8',
          400: '#ff9783',
          500: '#ff563c',
          600: '#dd2b0f',
          700: '#ae1800',
          800: '#7c1405',
          900: '#4d170e',
        },
        'accent-2': {
          DEFAULT: '#e15b47',
          100: '#fff2ef',
          200: '#ffe0da',
          300: '#ffc4b9',
          400: '#ff9784',
          500: '#ef6853',
          600: '#c94b39',
          700: '#9e3526',
          800: '#71261b',
          900: '#471d16',
        },
        neutral: {
          100: '#f8f4f4',
          200: '#eae7e7',
          300: '#d7d3d3',
          400: '#bab6b6',
          500: '#9b9797',
          600: '#7d7979',
          700: '#605d5d',
          800: '#444141',
          900: '#2d2b2b',
        },
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Archivo', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'Menlo', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '0px',
        DEFAULT: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        full: '9999px',
      },
      boxShadow: {
        none: 'none',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1.1s steps(1) infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
