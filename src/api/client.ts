import AsyncStorage from '@react-native-async-storage/async-storage';

// This build has no backend — everything under src/api/*.ts is a mock. This
// file keeps just the two things screens still reach for: a place to stash
// the mock session marker (tokenStore) and a friendly error formatter
// (apiErrorMessage) for the handful of catch blocks that still call it.
const SESSION_KEY = 'lyy.mockSession';

export const tokenStore = {
  async getAccessToken() {
    return AsyncStorage.getItem(SESSION_KEY);
  },
  async getRefreshToken() {
    return AsyncStorage.getItem(SESSION_KEY);
  },
  async setTokens(accessToken: string, _refreshToken: string) {
    await AsyncStorage.setItem(SESSION_KEY, accessToken);
  },
  async clear() {
    await AsyncStorage.removeItem(SESSION_KEY);
  },
};

export function apiErrorMessage(error: unknown, fallback = 'Something went wrong.'): string {
  if (error instanceof Error) return error.message || fallback;
  return fallback;
}
