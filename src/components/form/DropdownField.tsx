import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Platform } from 'react-native';
import { Menu, IconButton, SegmentedButtons } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FieldShell } from './FieldShell';
import tokens from '../../theme/tokens';
import { useLanguage } from '../../i18n/LanguageContext';

export type DropdownOption = {
  value: string;
  label: string;
  icon?: string;
  description?: string;
  color?: string;
};

export function DropdownField({
  label,
  labelCn,
  required,
  value,
  options,
  onChangeValue,
  error,
  width,
  editable = true,
}: {
  label: string;
  labelCn?: string;
  required?: boolean;
  value?: string | null;
  options: string[] | DropdownOption[];
  onChangeValue: (v: any) => void;
  error?: string;
  width?: number | `${number}%`;
  editable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();

  // Normalize options array
  const normalizedOptions: DropdownOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((o) => o.value === value);

  // Check if options match the button-style criteria
  const optionValues = normalizedOptions.map(o => String(o.value).toUpperCase().trim());
  const isOkNotOkNa = optionValues.length === 3 && 
    optionValues[0] === 'OK' && 
    (optionValues[1] === 'NOT OK' || optionValues[1] === 'NOT_OK' || optionValues[1] === 'NOTOK') && 
    (optionValues[2] === 'N/A' || optionValues[2] === 'NA');
  const isOkDefectNa = optionValues.length === 3 && 
    optionValues[0] === 'OK' && 
    (optionValues[1] === 'DEFECT' || optionValues[1] === 'DEFECTIVE') && 
    (optionValues[2] === 'N/A' || optionValues[2] === 'NA');
  const isYesNoNa = optionValues.length === 3 && 
    optionValues[0] === 'YES' && 
    optionValues[1] === 'NO' && 
    (optionValues[2] === 'N/A' || optionValues[2] === 'NA');
  const isButtonsStyle = isOkNotOkNa || isOkDefectNa || isYesNoNa;

  if (isButtonsStyle) {
    return (
      <FieldShell label={label} labelCn={labelCn} required={required} error={error} width={width}>
        <View style={{ marginTop: 4 }}>
          <SegmentedButtons
            value={value ?? ''}
            onValueChange={onChangeValue}
            density="small"
            buttons={normalizedOptions.map((opt) => ({
              value: opt.value,
              label: opt.label,
              disabled: !editable,
              style: {
                borderColor: tokens.color.border,
              },
              labelStyle: {
                fontSize: 13,
                fontWeight: value === opt.value ? '700' : '500',
              }
            }))}
          />
        </View>
      </FieldShell>
    );
  }

  return (
    <FieldShell label={label} labelCn={labelCn} required={required} error={error} width={width}>
      <Menu
        visible={open}
        onDismiss={() => setOpen(false)}
        anchor={
          <Pressable
            onPress={() => editable && setOpen(true)}
            className={`flex-row items-center justify-between border rounded-md px-3 py-2.5 ${open ? 'border-primary' : 'border-border'}`}
            style={{ 
              backgroundColor: editable ? tokens.color.surface : tokens.color.background,
              borderColor: error ? tokens.color.danger : (open ? tokens.color.primary : tokens.color.border),
              opacity: editable ? 1 : 0.6 
            }}
          >
            <View className="flex-row items-center flex-1">
              {selectedOption?.icon && (
                <MaterialCommunityIcons 
                  name={selectedOption.icon as any} 
                  size={20} 
                  color={selectedOption.color || tokens.color.textSecondary} 
                  style={{ marginRight: 8 }} 
                />
              )}
              <Text 
                className="text-body flex-1" 
                style={{ color: selectedOption ? tokens.color.textPrimary : tokens.color.textMuted }}
                numberOfLines={1}
              >
                {selectedOption ? selectedOption.label : 'Select an option...'}
              </Text>
            </View>
            <MaterialCommunityIcons 
              name={open ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color={tokens.color.textSecondary} 
            />
          </Pressable>
        }
        contentStyle={{ backgroundColor: tokens.color.surface, borderRadius: tokens.radius.md, paddingVertical: 4 }}
        style={{ marginTop: 8 }}
      >
        <ScrollView style={{ maxHeight: 300 }}>
          {normalizedOptions.map((opt, idx) => (
            <Pressable
              key={opt.value + idx}
              onPress={() => {
                onChangeValue(opt.value);
                setOpen(false);
              }}
              className="flex-row items-center px-4 py-3"
              style={(({ pressed, hovered }: any) => ({
                backgroundColor: (pressed || hovered || value === opt.value) ? tokens.color.background : 'transparent',
                borderBottomWidth: idx < normalizedOptions.length - 1 ? 1 : 0,
                borderBottomColor: tokens.color.border,
              })) as any}
            >
              {opt.icon && (
                <MaterialCommunityIcons 
                  name={opt.icon as any} 
                  size={24} 
                  color={opt.color || tokens.color.textSecondary} 
                  style={{ marginRight: 12 }} 
                />
              )}
              <View className="flex-1 justify-center">
                <Text 
                  className="text-body font-medium" 
                  style={{ color: value === opt.value ? tokens.color.primary : tokens.color.textPrimary }}
                >
                  {opt.label}
                </Text>
                {opt.description && (
                  <Text className="text-caption mt-0.5" style={{ color: tokens.color.textSecondary }}>
                    {opt.description}
                  </Text>
                )}
              </View>
              {value === opt.value && (
                <MaterialCommunityIcons name="check" size={20} color={tokens.color.primary} />
              )}
            </Pressable>
          ))}
          {normalizedOptions.length === 0 && (
            <View className="px-4 py-3">
              <Text className="text-body" style={{ color: tokens.color.textMuted }}>
                {language === 'en' ? 'No options available' : '暂无选项'}
              </Text>
            </View>
          )}
        </ScrollView>
      </Menu>
    </FieldShell>
  );
}
