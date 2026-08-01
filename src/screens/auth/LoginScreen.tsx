import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text, TextInput, useTheme } from 'react-native-paper';
import { useAuth } from '../../auth/AuthProvider';
import { useAuthStore } from '../../auth/useAuthStore';

export function LoginScreen() {
  const { signIn, submitting } = useAuth();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [secure, setSecure] = useState(true);

  const onSubmit = async () => {
    setError(null);
    try {
      await signIn(email.trim(), password);
    } catch (e: any) {
      setError(e?.response?.data?.error?.message ?? 'Unable to sign in. Check your email and password.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.centerRow}>
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.logo, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.logoText}>LYY</Text>
          </View>
          <Text variant="headlineSmall" style={styles.heading}>
            Inspector Sign In
          </Text>
          <Text variant="bodyMedium" style={styles.subheading}>
            Fabric Inspection · 4-Point System
          </Text>

          <TextInput
            label="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            autoComplete="off"
            textContentType="none"
            importantForAutofill="no"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={secure}
            autoComplete="new-password"
            textContentType="none"
            importantForAutofill="no"
            right={<TextInput.Icon icon={secure ? 'eye' : 'eye-off'} onPress={() => setSecure(!secure)} />}
            style={styles.input}
            onSubmitEditing={onSubmit}
          />

          <Portal>
            <Dialog visible={!!error} onDismiss={() => setError(null)} style={{ maxWidth: 400, alignSelf: 'center', width: '100%' }}>
              <Dialog.Title>Login Failed</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">Invalid credentials. {error}</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setError(null)}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <Button
            mode="contained"
            onPress={onSubmit}
            loading={submitting}
            disabled={submitting || !email || !password}
            style={styles.submit}
            contentStyle={{ paddingVertical: 6 }}
          >
            Sign In
          </Button>
          <Button
            mode="text"
            onPress={() => useAuthStore.getState().setSignUp()}
            disabled={submitting}
            style={{ marginTop: 8 }}
          >
            Create an account
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centerRow: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 420, borderRadius: 20, padding: 32 },
  logo: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  logoText: { color: '#fff', fontWeight: '800', fontSize: 18 },
  heading: { fontWeight: '700' },
  subheading: { opacity: 0.6, marginBottom: 24 },
  input: { marginBottom: 14 },
  submit: { marginTop: 8, borderRadius: 10 },
  hint: { marginTop: 18, textAlign: 'center', opacity: 0.5 },
});
