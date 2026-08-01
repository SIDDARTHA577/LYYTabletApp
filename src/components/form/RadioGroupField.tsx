import React from 'react';
import { Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { FieldShell } from './FieldShell';

export function RadioGroupField({
  label,
  labelCn,
  required,
  value,
  options,
  onChangeValue,
  error,
  width,
}: {
  label: string;
  labelCn?: string;
  required?: boolean;
  value?: string | null;
  options: string[] | { label: string; value: string }[];
  onChangeValue: (v: any) => void;
  error?: string;
  width?: number | `${number}%`;
}) {
  return (
    <FieldShell label={label} labelCn={labelCn} required={required} error={error} width={width}>
      <View className="flex-row flex-wrap">
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const lbl = typeof opt === 'string' ? opt : opt.label;
          return (
            <View key={val} className="mr-3 flex-row items-center">
              <RadioButton value={val} status={value === val ? 'checked' : 'unchecked'} onPress={() => onChangeValue(val)} />
              <Text className="text-body text-textPrimary" onPress={() => onChangeValue(val)}>
                {lbl}
              </Text>
            </View>
          );
        })}
      </View>
    </FieldShell>
  );
}
