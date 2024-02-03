/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bgColor: 'rgb(var(--color-bg) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        blue: 'rgb(var(--color-blue) / <alpha-value>)',
        white: 'rgb(var(--color-white) / <alpha-value>)',
        ascent: {
          1: 'rgb(var(--color-ascent1) / <alpha-value>)',
          2: 'rgb(var(--color-ascent2) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
}
