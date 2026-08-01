import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, useTheme } from 'react-native-paper';
import { MpinInput } from '../../components/MpinInput';
import { useAuth } from '../../auth/AuthProvider';
import { useAuthStore } from '../../auth/useAuthStore';

// Shown once, right after the first successful email/password login (see
// useAuthStore's 'needsMpinSetup' status) — asks the inspector to pick a
// 4-digit MPIN so future app opens on this device can skip the password.
export function CreateMpinScreen() {
  const theme = useTheme();
  const { confirmMpinSetup, submitting } = useAuth();
  const user = useAuthStore((s) => s.user);

  const [step, setStep] = useState<'enter' | 'confirm'>('enter');
  const [mpin, setMpin] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onMpinChange = (v: string) => {
    setError(null);
    setMpin(v);
    if (v.length === 4) setTimeout(() => setStep('confirm'), 150);
  };

  const onConfirmChange = async (v: string) => {
    setError(null);
    setConfirm(v);
    if (v.length === 4) {
      if (v !== mpin) {
        setError("MPINs don't match. Please try again.");
        setConfirm('');
        return;
      }
      try {
        await confirmMpinSetup(mpin);
      } catch {
        setError('Could not save MPIN. Please try again.');
        setStep('enter');
        setMpin('');
        setConfirm('');
      }
    }
  };

  return (
    <View style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <View style={styles.centerRow}>
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text variant="headlineSmall" style={styles.heading}>
            Create your MPIN
          </Text>
          <Text variant="bodyMedium" style={styles.subheading}>
            {step === 'enter'
              ? `Hi ${user?.name?.split(' ')[0] ?? ''}, set a 4-digit MPIN for quick sign-in on this device.`
              : 'Re-enter your MPIN to confirm.'}
          </Text>

          <MpinInput
            key={step}
            value={step === 'enter' ? mpin : confirm}
            onChangeValue={step === 'enter' ? onMpinChange : onConfirmChange}
            autoFocus
            error={Boolean(error)}
          />

          {error ? (
            <HelperText type="error" style={styles.error}>
              {error}
            </HelperText>
          ) : (
            <Text style={styles.hint}>{step === 'enter' ? 'Choose 4 digits' : 'Confirm your 4 digits'}</Text>
          )}

          {step === 'confirm' && (
            <Button
              mode="text"
              onPress={() => {
                setStep('enter');
                setConfirm('');
                setError(null);
              }}
              disabled={submitting}
            >
              Start over
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centerRow: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 420, borderRadius: 20, padding: 32, alignItems: 'center' },
  heading: { fontWeight: '700', textAlign: 'center' },
  subheading: { opacity: 0.6, marginTop: 8, marginBottom: 28, textAlign: 'center' },
  hint: { marginTop: 16, opacity: 0.5, textAlign: 'center' },
  error: { textAlign: 'center' },
});
