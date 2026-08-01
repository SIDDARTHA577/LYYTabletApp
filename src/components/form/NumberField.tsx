import React from 'react';
import { TextInput } from 'react-native-paper';
import { FieldShell } from './FieldShell';
import tokens from '../../theme/tokens';

export function NumberField({
  label,
  labelCn,
  required,
  value,
  onChangeValue,
  error,
  suffix,
  width,
  editable = true,
}: {
  label: string;
  labelCn?: string;
  required?: boolean;
  value: number | null;
  onChangeValue: (v: number | undefined) => void;
  error?: string;
  suffix?: string;
  width?: number | `${number}%`;
  editable?: boolean;
}) {
  return (
    <FieldShell label={label} labelCn={labelCn} required={required} error={error} width={width}>
      <TextInput
        mode="outlined"
        dense
        keyboardType="numeric"
        editable={editable}
        value={value === null || value === undefined ? '' : String(value)}
        onChangeText={(t) => {
          const cleaned = t.replace(/[^0-9.\-]/g, '');
          onChangeValue(cleaned === '' ? undefined : Number(cleaned));
        }}
        right={suffix ? <TextInput.Affix text={suffix} /> : undefined}
        error={Boolean(error)}
        outlineColor={tokens.color.border}
        activeOutlineColor={tokens.color.primary}
        outlineStyle={{ borderRadius: tokens.radius.md }}
        style={{ backgroundColor: tokens.color.surface, textAlign: 'right' }}
      />
    </FieldShell>
  );
}
