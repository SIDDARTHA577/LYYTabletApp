import { Platform } from 'react-native';
import { useAuthStore, type SessionUser } from '../auth/useAuthStore';

// Client-review links: a URL like /dashboard or /inspections/daily-check
// should render that screen directly, without a reviewer having to click
// through the (fake) sign-in flow first. Since there's no real backend,
// this reuses the same mock session shape as src/api/auth.api.ts.
const REVIEW_USER: SessionUser = {
  id: 'mock-user-1',
  name: 'Siddartha',
  employeeId: 'LYY-INS-0002',
  email: 'inspector@lyy-quality.com',
  role: 'inspector',
  language: 'en',
};
const REVIEW_PERMISSIONS = ['inspections:create', 'inspections:update', 'inspections:submit', 'inspections:view'];
const REVIEW_ASSIGNED_TYPES = [
  'daily_check',
  'fabric_inspection',
  'final_inspection',
  'inline_inspection',
  'pp_meeting',
  'spot_check',
  'factory_check',
];
const REVIEW_SESSION = { user: REVIEW_USER, permissions: REVIEW_PERMISSIONS, assignedInspectionTypes: REVIEW_ASSIGNED_TYPES };

// These match the `linking.config.screens` paths in RootNavigator.tsx —
// anything under AppDrawer needs status forced to 'signedIn' before that
// navigator mounts, since it isn't reachable while signed out.
const APP_DRAWER_PATHS = [
  '/dashboard',
  '/reports',
  '/notifications',
  '/settings',
  '/inspections/daily-check',
  '/inspections/spot-check',
  '/inspections/fabric-inspection',
  '/inspections/final-inspection',
  '/inspections/inline-inspection',
  '/inspections/factory-check',
  '/inspections/pp-meeting',
];

// Returns true if it resolved and applied a review link, in which case
// AuthProvider's normal cold-start check (device MPIN pairing / stored
// token) should be skipped for this load.
export function applyWebReviewDeepLink(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const store = useAuthStore.getState();

  if (path === '/signup') {
    store.setSignUp();
    return true;
  }
  if (path === '/mpin') {
    store.showMpinEntry(REVIEW_USER.email);
    return true;
  }
  if (path === '/mpin/setup') {
    store.requireMpinSetup(REVIEW_SESSION);
    return true;
  }
  if (APP_DRAWER_PATHS.some((p) => path === p || path.startsWith(`${p}/`))) {
    store.signIn(REVIEW_SESSION);
    return true;
  }
  return false;
}
