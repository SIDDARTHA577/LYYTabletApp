// Single source of truth for the enterprise redesign's design tokens.
// Consumed by both tailwind.config.js (Tailwind/NativeWind, via CSS
// variables — see global.css's `.dark` block) and paperTheme.ts
// (react-native-paper's MD3Theme) so the two styling systems never drift.
//
// `color` is mutated in place (not reassigned) by setColorScheme() so every
// existing `tokens.color.x` read across the app — and the `brandColors`
// alias in paperTheme.ts, which points at this same object — picks up the
// active theme's values without each call site needing to be a hook.
const lightColors = {
  primary: '#0F172A',
  primaryHover: '#1E293B',
  primaryLight: '#F1F5F9',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
};

// Matches react-native-paper's lyyDarkTheme (theme/paperTheme.ts) so Paper
// components and everything reading tokens.color agree on the same palette.
const darkColors = {
  primary: '#93C5FD',
  primaryHover: '#60A5FA',
  primaryLight: '#1F2937',
  success: '#34D399',
  warning: '#FBBF24',
  danger: '#F87171',
  info: '#60A5FA',
  background: '#111827',
  surface: '#1F2937',
  border: '#374151',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
};

const tokens = {
  color: { ...lightColors },
  radius: { sm: 6, md: 10, lg: 16, xl: 20, pill: 999 },
  fontSize: { title: 32, sectionTitle: 22, cardTitle: 16, body: 15, label: 14, caption: 12 },
  boxShadow: {
    card: '0 1px 2px rgba(15,23,42,0.03)', // Extremely subtle, mostly relying on borders
    elevated: '0 10px 15px -3px rgba(15,23,42,0.05), 0 4px 6px -4px rgba(15,23,42,0.05)', // Softer elevation
  },
  status: {
    assigned: { fg: '#0F172A', bg: '#F1F5F9' },
    inProgress: { fg: '#3B82F6', bg: '#EFF6FF' },
    pending: { fg: '#D97706', bg: '#FEF3C7' },
    completed: { fg: '#059669', bg: '#D1FAE5' },
    overdue: { fg: '#DC2626', bg: '#FEE2E2' },
    draft: { fg: '#64748B', bg: '#F8FAFC' },
    review: { fg: '#7C3AED', bg: '#F3E8FF' },
  },
  setColorScheme(scheme) {
    Object.assign(tokens.color, scheme === 'dark' ? darkColors : lightColors);
  },
};

module.exports = tokens;
