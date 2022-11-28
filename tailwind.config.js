/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'footer': "linear-gradient(to right bottom, rgba(43, 108, 176, 0.7), rgba(43, 108, 176, 0.7)), url('./assets/images/footerBG.png')",
      },
    },
  },
  plugins: [],
}