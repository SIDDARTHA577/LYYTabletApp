import AsyncStorage from '@react-native-async-storage/async-storage';

// Device-local, non-sensitive flags that drive "log in with MPIN instead of
// email/password" — the MPIN itself is never stored here, only verified
// server-side (POST /auth/mpin/login). This is deliberately AsyncStorage,
// not SecureStore: nothing sensitive lives in it, just which account (if
// any) this device has previously set an MPIN for.
const REMEMBERED_EMAIL_KEY = 'lyy.rememberedEmail';
const MPIN_CONFIGURED_KEY = 'lyy.mpinConfigured';

export const deviceAuth = {
  async getRememberedEmail(): Promise<string | null> {
    return AsyncStorage.getItem(REMEMBERED_EMAIL_KEY);
  },
  async isMpinConfigured(): Promise<boolean> {
    return (await AsyncStorage.getItem(MPIN_CONFIGURED_KEY)) === 'true';
  },
  async rememberMpinAccount(email: string): Promise<void> {
    await AsyncStorage.setItem(REMEMBERED_EMAIL_KEY, email);
    await AsyncStorage.setItem(MPIN_CONFIGURED_KEY, 'true');
  },
  async forget(): Promise<void> {
    await AsyncStorage.removeItem(REMEMBERED_EMAIL_KEY);
    await AsyncStorage.removeItem(MPIN_CONFIGURED_KEY);
  },
};
