import React, { useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const LENGTH = 4;

// Classic "hidden real input behind visual boxes" PIN entry: a single
// invisible TextInput handles focus/keyboard/paste, four boxes render the
// filled state on top of it. Works identically on native and web.
export function MpinInput({
  value,
  onChangeValue,
  autoFocus,
  error,
}: {
  value: string;
  onChangeValue: (v: string) => void;
  autoFocus?: boolean;
  error?: boolean;
}) {
  const theme = useTheme();
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable onPress={() => inputRef.current?.focus()} style={styles.wrap}>
      <View style={styles.boxRow}>
        {Array.from({ length: LENGTH }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.box,
              { borderColor: error ? theme.colors.error : '#CCD3E3' },
              i < value.length && { borderColor: theme.colors.primary, backgroundColor: theme.colors.primaryContainer },
            ]}
          >
            <View style={[styles.dot, i < value.length && { backgroundColor: theme.colors.primary }]} />
          </View>
        ))}
      </View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(t) => onChangeValue(t.replace(/[^0-9]/g, '').slice(0, LENGTH))}
        keyboardType="number-pad"
        maxLength={LENGTH}
        autoFocus={autoFocus}
        secureTextEntry
        style={styles.hiddenInput}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { alignSelf: 'center' },
  boxRow: { flexDirection: 'row', gap: 14 },
  box: {
    width: 52, height: 60, borderRadius: 12, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFBFD',
  },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'transparent' },
  hiddenInput: { position: 'absolute', opacity: 0, height: 1, width: 1 },
});
