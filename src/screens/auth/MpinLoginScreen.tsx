import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, useTheme } from 'react-native-paper';
import { MpinInput } from '../../components/MpinInput';
import { useAuth } from '../../auth/AuthProvider';
import { useAuthStore } from '../../auth/useAuthStore';

// Shown instead of the full LoginScreen when this device has a remembered,
// MPIN-configured account (see AuthProvider's cold-start check) — trades
// off password entry for a 4-digit PIN, verified server-side every time.
export function MpinLoginScreen() {
  const theme = useTheme();
  const { signInWithMpin, useDifferentLogin, forgetDevice, error, submitting } = useAuth();
  const rememberedEmail = useAuthStore((s) => s.rememberedEmail);

  const [mpin, setMpin] = useState('');

  const onChange = async (v: string) => {
    setMpin(v);
    if (v.length === 4) {
      try {
        await signInWithMpin(v);
      } catch {
        setMpin('');
      }
    }
  };

  return (
    <View style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <View style={styles.centerRow}>
        <View style={styles.card}>
          <View style={[styles.logo, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.logoText}>LYY</Text>
          </View>
          <Text variant="headlineSmall" style={styles.heading}>
            Enter your MPIN
          </Text>
          <Text variant="bodyMedium" style={styles.subheading}>
            {rememberedEmail}
          </Text>

          <MpinInput value={mpin} onChangeValue={onChange} autoFocus error={Boolean(error)} />

          {error ? (
            <HelperText type="error" style={styles.error}>
              {error}
            </HelperText>
          ) : (
            <View style={{ height: 20 }} />
          )}

          {submitting && <Text style={styles.hint}>Checking…</Text>}

          <View style={styles.links}>
            <Button mode="text" onPress={() => {}} disabled={submitting} textColor="#96A0B8">
              Reset MPIN
            </Button>
            <Button mode="text" onPress={useDifferentLogin} disabled={submitting}>
              Use email &amp; password instead
            </Button>
            <Button mode="text" onPress={forgetDevice} disabled={submitting} textColor="#96A0B8">
              Not you?
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centerRow: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 20, padding: 32, alignItems: 'center' },
  logo: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  logoText: { color: '#fff', fontWeight: '800', fontSize: 18 },
  heading: { fontWeight: '700', textAlign: 'center' },
  subheading: { opacity: 0.6, marginTop: 4, marginBottom: 28, textAlign: 'center' },
  hint: { opacity: 0.5, marginBottom: 8 },
  error: { textAlign: 'center' },
  links: { marginTop: 12, alignItems: 'center' },
});
