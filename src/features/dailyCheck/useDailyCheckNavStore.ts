import { create } from 'zustand';
import type { DailyCheckData } from './types';

interface SectionInfo {
  key: keyof DailyCheckData;
  title: string;
  icon: string;
}

interface DailyCheckNavState {
  active: boolean;
  sections: SectionInfo[];
  activeSection: keyof DailyCheckData;
  completedSections: (keyof DailyCheckData)[];

  enter: (sections: SectionInfo[], initialSection: keyof DailyCheckData) => void;
  exit: () => void;
  setActiveSection: (key: keyof DailyCheckData) => void;
  markSectionComplete: (key: keyof DailyCheckData) => void;
}

export const useDailyCheckNavStore = create<DailyCheckNavState>((set) => ({
  active: false,
  sections: [],
  activeSection: 'style_po_info', // Default
  completedSections: [],

  enter: (sections, initialSection) => set({ active: true, sections, activeSection: initialSection, completedSections: [] }),
  exit: () => set({ active: false, sections: [], completedSections: [] }),
  setActiveSection: (key) => set({ activeSection: key }),
  markSectionComplete: (key) =>
    set((state) => ({
      completedSections: state.completedSections.includes(key) ? state.completedSections : [...state.completedSections, key],
    })),
}));
