import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tokens = require('./tokens');

export const lyyLightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: tokens.color.primary,
    onPrimary: '#FFFFFF',
    primaryContainer: tokens.color.primaryLight,
    onPrimaryContainer: tokens.color.primary,
    secondary: tokens.color.info,
    background: tokens.color.background,
    surface: tokens.color.surface,
    surfaceVariant: tokens.color.background,
    outline: tokens.color.border,
    error: tokens.color.danger,
    elevation: {
      level0: 'transparent',
      level1: tokens.color.surface,
      level2: tokens.color.surface,
      level3: tokens.color.surface,
      level4: tokens.color.surface,
      level5: tokens.color.surface,
    },
  },
  roundness: 3,
};

export const lyyDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#93C5FD',
    onPrimary: '#0F1115',
    primaryContainer: '#1F2937',
    onPrimaryContainer: '#DBEAFE',
    secondary: '#818CF8',
    background: '#111827',
    surface: '#1F2937',
    surfaceVariant: '#1F2937',
    outline: '#374151',
    error: '#F87171',
    elevation: {
      level0: 'transparent',
      level1: '#1F2937',
      level2: '#1F2937',
      level3: '#1F2937',
      level4: '#1F2937',
      level5: '#1F2937',
    },
  },
  roundness: 3,
};

// Single source of truth for status semantics is src/theme/tokens.js — these
// are thin re-exports so every consumer (incl. previously-hardcoded ones like
// InspectionListItem) reads from the same palette instead of drifting.
export const statusColors = {
  pass: tokens.color.success,
  screen: tokens.color.warning,
  reject: tokens.color.danger,
  info: tokens.color.info,
};

export const statTileColors = tokens.status as Record<
  'assigned' | 'inProgress' | 'pending' | 'completed' | 'overdue' | 'draft' | 'review',
  { fg: string; bg: string }
>;

export const brandColors = tokens.color;
