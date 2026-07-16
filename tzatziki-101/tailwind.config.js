/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'olive-deep': '#0A2E1C',
        'olive-mid': '#1B4D2E',
        'olive-bright': '#2D6A3F',
        'olive-light': '#4A8C5C',
        'cucumber': '#E8F0E3',
        'cream': '#F5F1E8',
        'gold-warm': '#C4A35A',
      },
      fontFamily: {
        display: ['"Rubik Bubbles"', 'cursive'],
        body: ['"DM Sans"', 'sans-serif'],
        accent: ['"Caveat"', 'cursive'],
      },
    },
  },
  plugins: [],
}