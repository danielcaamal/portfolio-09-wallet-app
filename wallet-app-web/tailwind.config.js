/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: '#026d20',
          50: '#e6f5e6',
          100: '#ccebcc',
          200: '#99d299',
          300: '#66c266',
          400: '#32b732',
          500: '#026d20',
          600: '#005a1a',
          700: '#004612',
          800: '#00330b',
          900: '#001a05',
        },
        secondary: {
          DEFAULT: '#f3e043',
          50: '#ffffff',
          100: '#ffffff',
          200: '#fffef0',
          300: '#fffce0',
          400: '#fff9c1',
          500: '#fff6a2',
          600: '#fff383',
          700: '#fff064',
          800: '#ffed45',
          900: '#ffea26',
        },
        tertiary: {
          DEFAULT: '#545456',
        },
      },
    },
  },
  plugins: [],
}
