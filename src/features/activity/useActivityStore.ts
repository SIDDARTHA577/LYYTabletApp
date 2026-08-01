import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'lyy.activityLog';
const MAX_ENTRIES = 50;

export type ActivityType = 'signed_in' | 'mpin_configured' | 'inspection_created' | 'inspection_saved' | 'inspection_submitted';

export interface ActivityEntry {
  id: string;
  type: ActivityType;
  title: string;
  detail?: string;
  timestamp: string; // ISO
  read: boolean;
}

const ICONS: Record<ActivityType, string> = {
  signed_in: 'login',
  mpin_configured: 'shield-check-outline',
  inspection_created: 'file-plus-outline',
  inspection_saved: 'content-save-outline',
  inspection_submitted: 'check-circle-outline',
};
export function activityIcon(type: ActivityType) {
  return ICONS[type];
}

interface ActivityState {
  entries: ActivityEntry[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  add: (entry: { type: ActivityType; title: string; detail?: string }) => Promise<void>;
  markAllRead: () => Promise<void>;
  clearAll: () => Promise<void>;
  unreadCount: () => number;
}

// Local, on-device activity feed of real actions the inspector took in this
// app (sign-in, drafts saved, inspections submitted, MPIN set up) — not a
// server-pushed notification system (no push infra exists yet), but a
// genuine record of what happened, persisted so it survives app restarts.
export const useActivityStore = create<ActivityState>((set, get) => ({
  entries: [],
  hydrated: false,

  hydrate: async () => {
    if (get().hydrated) return;
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      set({ entries: raw ? JSON.parse(raw) : [], hydrated: true });
    } catch {
      set({ entries: [], hydrated: true });
    }
  },

  add: async (entry) => {
    const next: ActivityEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      read: false,
      ...entry,
    };
    const entries = [next, ...get().entries].slice(0, MAX_ENTRIES);
    set({ entries });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries)).catch(() => undefined);
  },

  markAllRead: async () => {
    const entries = get().entries.map((e) => ({ ...e, read: true }));
    set({ entries });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries)).catch(() => undefined);
  },

  clearAll: async () => {
    set({ entries: [] });
    await AsyncStorage.removeItem(STORAGE_KEY).catch(() => undefined);
  },

  unreadCount: () => get().entries.filter((e) => !e.read).length,
}));
