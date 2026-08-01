import { create } from 'zustand';

export interface SessionUser {
  id: string;
  name: string;
  nameCn?: string;
  employeeId: string;
  email: string;
  role: string;
  language: 'en' | 'zh';
}

// - checking: bootstrapping, restoring a prior session (or not)
// - signedOut: show the email/password LoginScreen
// - mpinEntry: this device remembers an MPIN-configured account — show
//   MpinLoginScreen instead of asking for the password again
// - needsMpinSetup: just completed email/password login but has no MPIN yet
//   — tokens are already valid, show CreateMpinScreen before entering the app
// - signedIn: fully in
type AuthStatus = 'checking' | 'signedOut' | 'mpinEntry' | 'needsMpinSetup' | 'signedIn' | 'signUp';

interface AuthState {
  status: AuthStatus;
  user: SessionUser | null;
  permissions: string[];
  assignedInspectionTypes: string[];
  rememberedEmail: string | null;
  signIn: (session: { user: SessionUser; permissions: string[]; assignedInspectionTypes: string[] }) => void;
  requireMpinSetup: (session: { user: SessionUser; permissions: string[]; assignedInspectionTypes: string[] }) => void;
  showMpinEntry: (email: string) => void;
  signOut: () => void;
  setSignUp: () => void;
  setChecking: () => void;
  can: (permissionKey: string) => boolean;
  isAssigned: (inspectionTypeKey: string) => boolean;
}

// Ephemeral session/UI state only (per docs/IMPLEMENTATION_PLAN.md §9) — the
// resolved RBAC snapshot is re-fetched from GET /users/me on app start via
// AuthProvider, this store just holds it for the current app session.
export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'checking',
  user: null,
  permissions: [],
  assignedInspectionTypes: [],
  rememberedEmail: null,
  signIn: ({ user, permissions, assignedInspectionTypes }) =>
    set({ status: 'signedIn', user, permissions, assignedInspectionTypes }),
  requireMpinSetup: ({ user, permissions, assignedInspectionTypes }) =>
    set({ status: 'needsMpinSetup', user, permissions, assignedInspectionTypes }),
  showMpinEntry: (email) => set({ status: 'mpinEntry', rememberedEmail: email }),
  signOut: () => set({ status: 'signedOut', user: null, permissions: [], assignedInspectionTypes: [] }),
  setSignUp: () => set({ status: 'signUp' }),
  setChecking: () => set({ status: 'checking' }),
  can: (permissionKey) => get().permissions.includes(permissionKey),
  isAssigned: (inspectionTypeKey) => get().assignedInspectionTypes.includes(inspectionTypeKey),
}));
