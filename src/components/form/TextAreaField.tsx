import React from 'react';
import { TextInput } from 'react-native-paper';
import { FieldShell } from './FieldShell';
import tokens from '../../theme/tokens';

export function TextAreaField({
  label,
  labelCn,
  required,
  value,
  onChangeText,
  error,
}: {
  label: string;
  labelCn?: string;
  required?: boolean;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
}) {
  return (
    <FieldShell label={label} labelCn={labelCn} required={required} error={error} width="100%">
      <TextInput
        mode="outlined"
        multiline
        numberOfLines={4}
        value={value}
        onChangeText={onChangeText}
        error={Boolean(error)}
        outlineColor={tokens.color.border}
        activeOutlineColor={tokens.color.primary}
        outlineStyle={{ borderRadius: tokens.radius.md }}
        style={{ backgroundColor: tokens.color.surface }}
      />
    </FieldShell>
  );
}
