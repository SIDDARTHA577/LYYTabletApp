import React, { useState } from 'react';
import { Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { FieldShell } from './FieldShell';
import tokens from '../../theme/tokens';

export function DateField({
  label,
  labelCn,
  required,
  value,
  onChangeValue,
  error,
  width,
}: {
  label: string;
  labelCn?: string;
  required?: boolean;
  value?: string | null; // ISO date, e.g. "2026-07-28"
  onChangeValue: (v: string | undefined) => void;
  error?: string;
  width?: number | `${number}%`;
}) {
  const [open, setOpen] = useState(false);

  if (Platform.OS === 'web') {
    return (
      <FieldShell label={label} labelCn={labelCn} required={required} error={error} width={width}>
        <input
          type="date"
          value={value || ''}
          onChange={(e) => onChangeValue(e.target.value)}
          style={{
            height: 40,
            width: '100%',
            padding: 8,
            borderWidth: 1,
            borderColor: error ? tokens.color.danger : tokens.color.border,
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.color.surface,
            outline: 'none',
            fontFamily: 'inherit',
            fontSize: 14
          }}
        />
      </FieldShell>
    );
  }

  return (
    <FieldShell label={label} labelCn={labelCn} required={required} error={error} width={width}>
      <TextInput
        mode="outlined"
        dense
        editable={false}
        value={value ? dayjs(value).format('YYYY-MM-DD') : ''}
        placeholder="YYYY-MM-DD"
        onPressIn={() => setOpen(true)}
        right={<TextInput.Icon icon="calendar" onPress={() => setOpen(true)} />}
        error={Boolean(error)}
        outlineColor={tokens.color.border}
        activeOutlineColor={tokens.color.primary}
        outlineStyle={{ borderRadius: tokens.radius.md }}
        style={{ backgroundColor: tokens.color.surface }}
      />
      {open && (
        <DateTimePicker
          value={value ? dayjs(value).toDate() : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, date) => {
            setOpen(Platform.OS === 'ios');
            if (event.type === 'set' && date) {
              onChangeValue(dayjs(date).format('YYYY-MM-DD'));
            }
            if (Platform.OS !== 'ios') setOpen(false);
          }}
        />
      )}
    </FieldShell>
  );
}
