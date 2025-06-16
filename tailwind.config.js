/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // scan inside src folder
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-anton)'],
        body: ['var(--font-manrope)'],
      },
    },
  },
  plugins: [],
};
