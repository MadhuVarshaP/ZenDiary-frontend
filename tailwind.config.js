/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {colors: {
      lavender: "#FFD9FB",
      lightpink: "#FE8ABB",
      pink: "#FE3C8D",
      beige: "#FAF4E5",
      blue: "#7BBEEE",
      lightbrown: "#E7DAC2",
      green: "#74CECD",
      lightgreen: "#80D4D4",
      black: "#120008"
    },
    fontFamily: {
      jost: ['Jost', 'sans-serif'], // Set Jost as the default sans-serif font
    },},
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'),

  ],
}