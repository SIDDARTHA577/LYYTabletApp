import { create } from 'zustand';
import type { FieldAuditorData } from './types';

interface SectionInfo {
  key: keyof FieldAuditorData;
  title: string;
  icon: string;
}

interface FieldAuditorNavState {
  active: boolean;
  sections: SectionInfo[];
  activeSection: keyof FieldAuditorData;
  completedSections: (keyof FieldAuditorData)[];

  enter: (sections: SectionInfo[], initialSection: keyof FieldAuditorData) => void;
  exit: () => void;
  setActiveSection: (key: keyof FieldAuditorData) => void;
  markSectionComplete: (key: keyof FieldAuditorData) => void;
}

export const useFieldAuditorNavStore = create<FieldAuditorNavState>((set) => ({
  active: false,
  sections: [],
  activeSection: 'cover_summary', // Default
  completedSections: [],

  enter: (sections, initialSection) => set({ active: true, sections, activeSection: initialSection, completedSections: [] }),
  exit: () => set({ active: false, sections: [], completedSections: [] }),
  setActiveSection: (key) => set({ activeSection: key }),
  markSectionComplete: (key) =>
    set((state) => ({
      completedSections: state.completedSections.includes(key) ? state.completedSections : [...state.completedSections, key],
    })),
}));
