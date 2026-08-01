import { create } from 'zustand';
import type { SpotCheckData } from './types';

interface SectionInfo {
  key: keyof SpotCheckData;
  title: string;
  icon: string;
}

interface SpotCheckNavState {
  active: boolean;
  sections: SectionInfo[];
  activeSection: keyof SpotCheckData;
  completedSections: (keyof SpotCheckData)[];

  enter: (sections: SectionInfo[], initialSection: keyof SpotCheckData) => void;
  exit: () => void;
  setActiveSection: (key: keyof SpotCheckData) => void;
  markSectionComplete: (key: keyof SpotCheckData) => void;
}

export const useSpotCheckNavStore = create<SpotCheckNavState>((set) => ({
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
