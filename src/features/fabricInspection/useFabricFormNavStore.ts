import { create } from 'zustand';

export interface FormNavSection {
  key: string;
  title: string;
  icon: string;
}

interface FabricFormNavState {
  active: boolean; // true while FabricInspectionFormScreen is mounted
  activeSection: string;
  sections: FormNavSection[];
  completedSections: string[];
  enter: (sections: FormNavSection[], initialSection: string) => void;
  exit: () => void;
  setActiveSection: (key: string) => void;
  markSectionComplete: (key: string) => void;
}

// Bridges the inspection form's "which section am I editing" state up to
// AppDrawer's CustomDrawerContent, which needs it to swap the primary left
// navigation from the app-level menu (Dashboard/Reports/...) to the
// form's 10 section jumps while an inspection is open — see AppDrawer.tsx.
// A single global slot is fine: only one form screen is ever mounted at a
// time (it's a stack screen), so there's never more than one "current" form.
export const useFabricFormNavStore = create<FabricFormNavState>((set) => ({
  active: false,
  activeSection: '',
  sections: [],
  completedSections: [],
  enter: (sections, initialSection) => set({ active: true, sections, activeSection: initialSection, completedSections: [] }),
  exit: () => set({ active: false, sections: [], activeSection: '', completedSections: [] }),
  setActiveSection: (key) => set({ activeSection: key }),
  markSectionComplete: (key) => set((state) => ({
    completedSections: state.completedSections.includes(key) ? state.completedSections : [...state.completedSections, key]
  })),
}));
