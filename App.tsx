import './global.css';
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import './src/utils/relativeTime';

if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.textContent = `
    html, body, #root {
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    * {
      box-sizing: border-box;
    }
    svg {
      overflow: visible !important;
      display: inline-block !important;
      vertical-align: middle !important;
    }
  `;
  document.head.appendChild(style);
}
import { AuthProvider } from './src/auth/AuthProvider';
import { LanguageProvider } from './src/i18n/LanguageContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { lyyDarkTheme, lyyLightTheme } from './src/theme/paperTheme';
import { useThemeStore } from './src/features/theme/useThemeStore';
import tokens from './src/theme/tokens';

export default function App() {
  const systemScheme = useColorScheme();
  const themePreference = useThemeStore((s) => s.preference);
  const hydrateTheme = useThemeStore((s) => s.hydrate);

  useEffect(() => {
    hydrateTheme();
  }, [hydrateTheme]);

  // Explicit Settings choice wins; otherwise follow the OS/browser scheme.
  const scheme = themePreference ?? systemScheme;
  const isDark = scheme === 'dark';
  const theme = isDark ? lyyDarkTheme : lyyLightTheme;

  // Mutated synchronously (not in an effect) so every screen that reads
  // tokens.color.x directly in a style prop — instead of a Tailwind
  // className — sees the right values on this very render pass, with no
  // first-paint flash of the previous theme's colors.
  tokens.setColorScheme(isDark ? 'dark' : 'light');

  // The `.dark` class on <html> is what the CSS variables behind Tailwind's
  // bg-surface/text-textPrimary/etc. classes key off of (see global.css +
  // tailwind.config.js) — this one's a real DOM side effect, so it stays in
  // an effect.
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [isDark]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <LanguageProvider>
              <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
              <RootNavigator />
            </LanguageProvider>
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
