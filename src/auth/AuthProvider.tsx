import React, { createContext, useContext, useEffect, useState } from 'react';
import { tokenStore } from '../api/client';
import {
  fetchMe,
  login as loginRequest,
  loginWithMpin as loginWithMpinRequest,
  setMpin as setMpinRequest,
  logout as logoutRequest,
} from '../api/auth.api';
import { useAuthStore, type SessionUser } from './useAuthStore';
import { deviceAuth } from './deviceAuth';
import { useActivityStore } from '../features/activity/useActivityStore';
import { applyWebReviewDeepLink } from '../navigation/webDeepLinks';

interface AuthContextValue {
  signIn: (email: string, password: string) => Promise<void>;
  confirmMpinSetup: (mpin: string) => Promise<void>;
  signInWithMpin: (mpin: string) => Promise<void>;
  useDifferentLogin: () => void;
  forgetDevice: () => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  submitting: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function toSessionUser(u: { id: string; name: string; nameCn?: string; employeeId: string; email: string; role: string; language: 'en' | 'zh' }): SessionUser {
  return { id: u.id, name: u.name, nameCn: u.nameCn, employeeId: u.employeeId, email: u.email, role: u.role, language: u.language };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const store = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Cold start: if this device has a remembered MPIN pairing, always prompt
  // for the MPIN (app lock). Otherwise, try to restore an existing session via
  // access token, otherwise fall back to full login.
  useEffect(() => {
    useActivityStore.getState().hydrate();
    if (applyWebReviewDeepLink()) return;
    (async () => {
      const mpinConfigured = await deviceAuth.isMpinConfigured();
      const rememberedEmail = await deviceAuth.getRememberedEmail();

      if (mpinConfigured && rememberedEmail) {
        // App is locked with MPIN, require it on cold start
        store.showMpinEntry(rememberedEmail);
        return;
      }

      const token = await tokenStore.getAccessToken();
      if (token) {
        try {
          const me = await fetchMe();
          store.signIn({
            user: toSessionUser({ id: me.id, name: me.name, nameCn: me.nameCn, employeeId: me.employeeId, email: me.email, role: me.role, language: me.language }),
            permissions: me.permissions,
            assignedInspectionTypes: me.assignedInspectionTypes,
          });
          return;
        } catch {
          await tokenStore.clear();
        }
      }

      store.signOut();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (email: string, password: string) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await loginRequest(email, password);
      const session = { user: toSessionUser(res.user), permissions: res.permissions, assignedInspectionTypes: res.assignedInspectionTypes };
      if (res.mpinSet) {
        await deviceAuth.rememberMpinAccount(res.user.email);
        store.signIn(session);
        useActivityStore.getState().add({ type: 'signed_in', title: 'Signed in', detail: res.user.email });
      } else {
        store.requireMpinSetup(session);
      }
    } catch (e: any) {
      setError(e?.response?.data?.error?.message ?? 'Unable to sign in. Check your email and password and try again.');
      throw e;
    } finally {
      setSubmitting(false);
    }
  };

  const confirmMpinSetup = async (mpin: string) => {
    setSubmitting(true);
    setError(null);
    try {
      await setMpinRequest(mpin);
      if (store.user) await deviceAuth.rememberMpinAccount(store.user.email);
      store.signIn({ user: store.user!, permissions: store.permissions, assignedInspectionTypes: store.assignedInspectionTypes });
      useActivityStore.getState().add({ type: 'mpin_configured', title: 'MPIN configured for this device' });
    } catch (e: any) {
      setError(e?.response?.data?.error?.message ?? 'Could not save MPIN. Please try again.');
      throw e;
    } finally {
      setSubmitting(false);
    }
  };

  const signInWithMpin = async (mpin: string) => {
    const email = store.rememberedEmail;
    if (!email) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await loginWithMpinRequest(email, mpin);
      store.signIn({ user: toSessionUser(res.user), permissions: res.permissions, assignedInspectionTypes: res.assignedInspectionTypes });
      useActivityStore.getState().add({ type: 'signed_in', title: 'Signed in with MPIN', detail: res.user.email });
    } catch (e: any) {
      const code = e?.response?.data?.error?.code;
      if (code === 'MPIN_NOT_SET') {
        // Backend and device disagree (e.g. admin reset it) — fall back cleanly.
        await deviceAuth.forget();
        store.signOut();
      }
      setError(e?.response?.data?.error?.message ?? 'Incorrect MPIN. Please try again.');
      throw e;
    } finally {
      setSubmitting(false);
    }
  };

  // "Use email & password instead" on the MPIN screen — keeps this device's
  // MPIN pairing intact for next time, just falls back for this session.
  const useDifferentLogin = () => {
    setError(null);
    store.signOut();
  };

  // "Not you?" — forgets this device's MPIN pairing entirely.
  const forgetDevice = async () => {
    await deviceAuth.forget();
    store.signOut();
  };

  const signOut = async () => {
    await logoutRequest().catch(() => undefined);
    await deviceAuth.forget();
    store.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ signIn, confirmMpinSetup, signInWithMpin, useDifferentLogin, forgetDevice, signOut, error, submitting }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
