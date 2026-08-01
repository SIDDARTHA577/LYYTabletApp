// Single source of truth for the enterprise redesign's design tokens.
// Consumed by both tailwind.config.js (Tailwind/NativeWind) and paperTheme.ts
// (react-native-paper's MD3Theme) so the two styling systems never drift.
module.exports = {
  color: {
    primary: '#0F172A', // Crisp dark navy/black for primary actions
    primaryHover: '#1E293B',
    primaryLight: '#F1F5F9', // Very subtle gray-blue for accents
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6', // Clear blue for info
    background: '#F8FAFC', // Very soft off-white background
    surface: '#FFFFFF', // Pure white for cards
    border: '#E2E8F0', // Soft, modern border
    textPrimary: '#0F172A', // High contrast text
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
  },
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
};
