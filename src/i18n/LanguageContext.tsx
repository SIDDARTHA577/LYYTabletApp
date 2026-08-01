import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, type Lang, type TranslationKey } from './translations';
import { useAuthStore } from '../auth/useAuthStore';

const STORAGE_KEY = 'lyy.language';

interface LanguageContextValue {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Lang>('en');
  const storeUser = useAuthStore((s) => s.user);

  // Priority: the signed-in user's saved preference (server) > whatever this
  // device last used locally > default 'en'.
  useEffect(() => {
    (async () => {
      if (storeUser?.language) {
        setLanguageState(storeUser.language);
        return;
      }
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'zh') setLanguageState(stored);
    })();
  }, [storeUser?.language]);

  const setLanguage = useCallback((lang: Lang) => {
    setLanguageState(lang);
    AsyncStorage.setItem(STORAGE_KEY, lang).catch(() => undefined);
  }, []);

  const t = useCallback((key: TranslationKey) => translations[key][language], [language]);

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
