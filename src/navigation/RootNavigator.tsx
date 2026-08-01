import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../auth/useAuthStore';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { CreateMpinScreen } from '../screens/auth/CreateMpinScreen';
import { MpinLoginScreen } from '../screens/auth/MpinLoginScreen';
import { AppDrawer } from './AppDrawer';

// These three auth-status screens are full swaps driven entirely by
// useAuthStore.status, not a navigable stack — there's no "back" between
// "enter your email" and "enter your MPIN", so plain conditional rendering
// is simpler and more correct here than registering them as stack screens.
function AuthGate() {
  const status = useAuthStore((s) => s.status);
  if (status === 'signUp') return <SignUpScreen />;
  if (status === 'mpinEntry') return <MpinLoginScreen />;
  if (status === 'needsMpinSetup') return <CreateMpinScreen />;
  return <LoginScreen />;
}

// Switches Auth gate vs the permanent AppDrawer purely on auth status —
// see docs/IMPLEMENTATION_PLAN.md §8.
export function RootNavigator() {
  const status = useAuthStore((s) => s.status);

  if (status === 'checking') {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <NavigationContainer>{status === 'signedIn' ? <AppDrawer /> : <AuthGate />}</NavigationContainer>;
}
