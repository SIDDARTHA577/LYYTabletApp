import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePreference = 'light' | 'dark';
const STORAGE_KEY = 'lyy.themePreference';

interface ThemeState {
  // null = no explicit choice yet — falls back to the OS/browser scheme.
  preference: ThemePreference | null;
  hydrate: () => Promise<void>;
  setPreference: (pref: ThemePreference) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  preference: null,
  hydrate: async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') set({ preference: stored });
  },
  setPreference: (preference) => {
    set({ preference });
    AsyncStorage.setItem(STORAGE_KEY, preference).catch(() => undefined);
  },
}));
