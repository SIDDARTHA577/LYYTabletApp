import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Menu, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FieldShell } from './FieldShell';
import tokens from '../../theme/tokens';
import { useLanguage } from '../../i18n/LanguageContext';
import { DropdownOption } from './DropdownField';

export function MultiSelectDropdown({
  label,
  labelCn,
  required,
  values = [],
  options,
  onChangeValues,
  error,
  width,
  editable = true,
}: {
  label: string;
  labelCn?: string;
  required?: boolean;
  values?: string[];
  options: string[] | DropdownOption[];
  onChangeValues: (v: string[]) => void;
  error?: string;
  width?: number | `${number}%`;
  editable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();

  const normalizedOptions: DropdownOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const toggleOption = (value: string) => {
    if (values.includes(value)) {
      onChangeValues(values.filter((v) => v !== value));
    } else {
      onChangeValues([...values, value]);
    }
  };

  const selectAll = () => {
    onChangeValues(normalizedOptions.map(o => o.value));
  };

  const deselectAll = () => {
    onChangeValues([]);
  };

  const displayValue = values.length === 0
    ? 'Select options...'
    : values.length === normalizedOptions.length
      ? 'All Selected'
      : `${values.length} Selected`;

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
              <Text
                className="text-body flex-1"
                style={{ color: values.length > 0 ? tokens.color.textPrimary : tokens.color.textMuted }}
                numberOfLines={1}
              >
                {displayValue}
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
        <View className="flex-row items-center justify-between px-4 py-2 border-b border-border">
          <Button mode="text" compact onPress={selectAll}>Select All</Button>
          <Button mode="text" compact onPress={deselectAll}>Deselect All</Button>
        </View>
        <ScrollView style={{ maxHeight: 300 }}>
          {normalizedOptions.map((opt, idx) => {
            const isSelected = values.includes(opt.value);
            return (
              <Pressable
                key={opt.value + idx}
                onPress={() => toggleOption(opt.value)}
                className="flex-row items-center px-4 py-3"
                style={(({ pressed, hovered }: any) => ({
                  backgroundColor: (pressed || hovered || isSelected) ? tokens.color.background : 'transparent',
                  borderBottomWidth: idx < normalizedOptions.length - 1 ? 1 : 0,
                  borderBottomColor: tokens.color.border,
                })) as any}
              >
                <View className="flex-1 justify-center">
                  <Text
                    className="text-body font-medium"
                    style={{ color: isSelected ? tokens.color.primary : tokens.color.textPrimary }}
                  >
                    {opt.label}
                  </Text>
                </View>
                {isSelected && (
                  <MaterialCommunityIcons name="checkbox-marked" size={20} color={tokens.color.primary} />
                )}
                {!isSelected && (
                  <MaterialCommunityIcons name="checkbox-blank-outline" size={20} color={tokens.color.textSecondary} />
                )}
              </Pressable>
            );
          })}
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
