const tokens = require('./src/theme/tokens');

// Resolves each semantic color to a CSS variable (see global.css) instead of
// a fixed hex value, so `bg-surface`/`text-textPrimary`/etc. respond live to
// the `.dark` class App.tsx toggles on <html> — without editing every
// className usage across the app. Falls back to a plain rgb() when Tailwind
// isn't asked for an alpha variant.
function withOpacity(cssVar) {
  return ({ opacityValue }) =>
    opacityValue === undefined ? `rgb(var(${cssVar}))` : `rgb(var(${cssVar}) / ${opacityValue})`;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: withOpacity('--color-primary'),
        primaryHover: withOpacity('--color-primary-hover'),
        primaryLight: withOpacity('--color-primary-light'),
        success: withOpacity('--color-success'),
        warning: withOpacity('--color-warning'),
        danger: withOpacity('--color-danger'),
        info: withOpacity('--color-info'),
        background: withOpacity('--color-background'),
        surface: withOpacity('--color-surface'),
        border: withOpacity('--color-border'),
        textPrimary: withOpacity('--color-text-primary'),
        textSecondary: withOpacity('--color-text-secondary'),
        textMuted: withOpacity('--color-text-muted'),
      },
      borderRadius: tokens.radius,
      fontSize: Object.fromEntries(Object.entries(tokens.fontSize).map(([k, v]) => [k, `${v}px`])),
      boxShadow: tokens.boxShadow,
    },
  },
  plugins: [],
};
