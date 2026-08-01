import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, ScrollView } from 'react-native';
import { Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { useAuthStore } from '../../auth/useAuthStore';
import { register } from '../../api/auth.api';
import { PasswordStrengthIndicator } from '../../components/PasswordStrengthIndicator';

export function SignUpScreen() {
  const theme = useTheme();
  const signOut = useAuthStore((s) => s.signOut);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [secure, setSecure] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await register(email.trim(), password, name.trim());
      setSuccess(true);
    } catch (e: any) {
      setError(e?.response?.data?.error?.message ?? 'Unable to sign up. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isPasswordStrong = hasMinLength && hasUpper && hasNumber && hasSpecial;

  if (success) {
    return (
      <View style={[styles.flex, styles.centerRow, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text variant="headlineSmall" style={styles.heading}>
            Account Created
          </Text>
          <Text variant="bodyMedium" style={{ marginTop: 16, textAlign: 'center', opacity: 0.8 }}>
            Your account has been successfully created. However, it requires admin approval before you can log in.
          </Text>
          <Button
            mode="contained"
            onPress={() => signOut()}
            style={styles.submit}
            contentStyle={{ paddingVertical: 6 }}
          >
            Back to Sign In
          </Button>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.centerRow}>
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.logo, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.logoText}>LYY</Text>
          </View>
          <Text variant="headlineSmall" style={styles.heading}>
            Create an Account
          </Text>
          <Text variant="bodyMedium" style={styles.subheading}>
            Fabric Inspection · 4-Point System
          </Text>

          <TextInput
            label="Name"
            autoCapitalize="words"
            autoCorrect={false}
            autoComplete="off"
            textContentType="none"
            importantForAutofill="no"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />

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
          />
          
          <PasswordStrengthIndicator password={password} />

          {error ? <HelperText type="error">{error}</HelperText> : null}

          <Button
            mode="contained"
            onPress={onSubmit}
            loading={submitting}
            disabled={submitting || !email || !password || !name || !isPasswordStrong}
            style={styles.submit}
            contentStyle={{ paddingVertical: 6 }}
          >
            Sign Up
          </Button>
          
          <Button
            mode="text"
            onPress={() => signOut()}
            disabled={submitting}
            style={{ marginTop: 8 }}
          >
            Back to Sign In
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centerRow: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 420, borderRadius: 20, padding: 32 },
  logo: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  logoText: { color: '#fff', fontWeight: '800', fontSize: 18 },
  heading: { fontWeight: '700' },
  subheading: { opacity: 0.6, marginBottom: 24 },
  input: { marginBottom: 14 },
  submit: { marginTop: 24, borderRadius: 10 },
});
