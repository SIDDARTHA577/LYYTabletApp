import { tokenStore } from './client';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    nameCn?: string;
    employeeId: string;
    email: string;
    role: string;
    avatarUrl: string | null;
    language: 'en' | 'zh';
  };
  permissions: string[];
  assignedInspectionTypes: string[];
  mpinSet: boolean;
}

export interface MeResponse {
  id: string;
  name: string;
  nameCn?: string;
  employeeId: string;
  email: string;
  avatarUrl: string | null;
  language: 'en' | 'zh';
  role: string;
  permissions: string[];
  assignedInspectionTypes: string[];
  mpinSet: boolean;
}

// No backend in this build — every export below is a mock that always
// succeeds, so the client can sign in with any credentials and reach every
// implemented screen. All seven inspection modules are pre-assigned so
// nothing is hidden behind RBAC that no longer exists.
const MOCK_PERMISSIONS = ['inspections:create', 'inspections:update', 'inspections:submit', 'inspections:view'];
const MOCK_ASSIGNED_TYPES = [
  'daily_check',
  'fabric_inspection',
  'final_inspection',
  'inline_inspection',
  'pp_meeting',
  'spot_check',
  'factory_check',
];

// Tracks which emails have "configured" an MPIN this session, so
// CreateMpinScreen (first login) and MpinLoginScreen (subsequent logins) are
// both reachable, matching the original online-backend flow.
const mpinConfiguredEmails = new Set<string>();
let currentEmail = 'inspector@lyy-quality.com';

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildUser(email: string): LoginResponse['user'] {
  const trimmed = email.trim();
  const localPart = trimmed.split('@')[0] || 'inspector';
  const name = localPart
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ') || 'Inspector Demo';

  return {
    id: 'mock-user-1',
    name,
    employeeId: 'LYY-INS-0002',
    email: trimmed || 'inspector@lyy-quality.com',
    role: 'inspector',
    avatarUrl: null,
    language: 'en',
  };
}

export async function login(email: string, _password: string): Promise<LoginResponse> {
  await delay();
  const user = buildUser(email);
  currentEmail = user.email;
  await tokenStore.setTokens('mock-access-token', 'mock-refresh-token');
  return {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    user,
    permissions: MOCK_PERMISSIONS,
    assignedInspectionTypes: MOCK_ASSIGNED_TYPES,
    mpinSet: mpinConfiguredEmails.has(user.email),
  };
}

export async function register(_email: string, _password: string, _name: string): Promise<void> {
  await delay();
}

export async function loginWithMpin(email: string, _mpin: string): Promise<LoginResponse> {
  await delay(250);
  const user = buildUser(email);
  currentEmail = user.email;
  await tokenStore.setTokens('mock-access-token', 'mock-refresh-token');
  return {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    user,
    permissions: MOCK_PERMISSIONS,
    assignedInspectionTypes: MOCK_ASSIGNED_TYPES,
    mpinSet: true,
  };
}

export async function setMpin(_mpin: string): Promise<{ mpinSet: true }> {
  await delay(250);
  mpinConfiguredEmails.add(currentEmail);
  return { mpinSet: true };
}

export async function logout(): Promise<void> {
  await tokenStore.clear();
}

export async function fetchMe(): Promise<MeResponse> {
  await delay(150);
  const user = buildUser(currentEmail);
  return {
    ...user,
    permissions: MOCK_PERMISSIONS,
    assignedInspectionTypes: MOCK_ASSIGNED_TYPES,
    mpinSet: mpinConfiguredEmails.has(currentEmail),
  };
}
