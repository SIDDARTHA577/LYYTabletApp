import { create } from 'zustand';
import type { FinalInspectionData } from './types';

interface SectionInfo {
  key: keyof FinalInspectionData;
  title: string;
  icon: string;
}

interface FinalInspectionNavState {
  active: boolean;
  sections: SectionInfo[];
  activeSection: keyof FinalInspectionData;
  completedSections: (keyof FinalInspectionData)[];

  enter: (sections: SectionInfo[], initialSection: keyof FinalInspectionData) => void;
  exit: () => void;
  setActiveSection: (key: keyof FinalInspectionData) => void;
  markSectionComplete: (key: keyof FinalInspectionData) => void;
}

export const useFinalInspectionNavStore = create<FinalInspectionNavState>((set) => ({
  active: false,
  sections: [],
  activeSection: 'insp_time_po_info', // Default
  completedSections: [],

  enter: (sections, initialSection) => set({ active: true, sections, activeSection: initialSection, completedSections: [] }),
  exit: () => set({ active: false, sections: [], completedSections: [] }),
  setActiveSection: (key) => set({ activeSection: key }),
  markSectionComplete: (key) =>
    set((state) => ({
      completedSections: state.completedSections.includes(key) ? state.completedSections : [...state.completedSections, key],
    })),
}));
