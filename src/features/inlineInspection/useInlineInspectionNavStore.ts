import { create } from 'zustand';
import type { InlineInspectionData } from './types';

interface SectionInfo {
  key: keyof InlineInspectionData;
  title: string;
  icon: string;
}

interface InlineInspectionNavState {
  active: boolean;
  sections: SectionInfo[];
  activeSection: keyof InlineInspectionData;
  completedSections: (keyof InlineInspectionData)[];

  enter: (sections: SectionInfo[], initialSection: keyof InlineInspectionData) => void;
  exit: () => void;
  setActiveSection: (key: keyof InlineInspectionData) => void;
  markSectionComplete: (key: keyof InlineInspectionData) => void;
}

export const useInlineInspectionNavStore = create<InlineInspectionNavState>((set) => ({
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
