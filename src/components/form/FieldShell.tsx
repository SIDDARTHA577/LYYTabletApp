import React from 'react';
import { Text, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import { useLanguage } from '../../i18n/LanguageContext';

// Common label/required-asterisk/error wrapper every field type shares, so
// individual field components only implement their input control.
export function FieldShell({
  label,
  labelCn,
  required,
  error,
  children,
  width,
}: {
  label: string;
  labelCn?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  width?: number | `${number}%`;
}) {
  const { language } = useLanguage();

  return (
    <View
      className={`mb-4 px-1.5 ${width ? '' : 'flex-grow basis-[46%] min-w-[220px]'}`}
      style={width ? { width } : undefined}
    >
      <Text className="mb-1.5 text-label font-medium text-textSecondary">
        {language === 'zh' && labelCn ? labelCn : label}
        {required ? <Text className="text-danger"> *</Text> : null}
      </Text>
      {children}
      {error ? (
        <HelperText type="error" style={{ paddingHorizontal: 0 }}>
          {error}
        </HelperText>
      ) : null}
    </View>
  );
}
