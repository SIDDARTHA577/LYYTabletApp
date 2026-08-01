const tokens = require('./src/theme/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: tokens.color,
      borderRadius: tokens.radius,
      fontSize: Object.fromEntries(Object.entries(tokens.fontSize).map(([k, v]) => [k, `${v}px`])),
      boxShadow: tokens.boxShadow,
    },
  },
  plugins: [],
};
