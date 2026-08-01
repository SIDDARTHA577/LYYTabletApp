import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { TextInput as PaperTextInput, Menu } from 'react-native-paper';
import { FieldShell } from './FieldShell';
import tokens from '../../theme/tokens';

// A text field that also remembers what's been typed into it before —
// pick a prior entry from the dropdown, or just type a new one.
export function ComboBoxField({
  label,
  labelCn,
  value,
  onChangeText,
  onCommit,
  suggestions = [],
  width,
}: {
  label: string;
  labelCn?: string;
  value: string;
  onChangeText: (v: string) => void;
  // Called when a value should be added to `suggestions` for next time
  // (on blur, or immediately when a suggestion is picked).
  onCommit?: (v: string) => void;
  suggestions?: string[];
  width?: number | `${number}%`;
}) {
  const [open, setOpen] = useState(false);

  return (
    <FieldShell label={label} labelCn={labelCn} width={width}>
      <Menu
        visible={open}
        onDismiss={() => setOpen(false)}
        anchor={
          <PaperTextInput
            mode="outlined"
            value={value}
            onChangeText={onChangeText}
            onBlur={() => onCommit?.(value)}
            right={<PaperTextInput.Icon icon={open ? 'chevron-up' : 'chevron-down'} onPress={() => setOpen((o) => !o)} forceTextInputFocus={false} />}
            style={{ height: 44 }}
          />
        }
        contentStyle={{ backgroundColor: tokens.color.surface, borderRadius: tokens.radius.md, paddingVertical: 4 }}
      >
        <ScrollView style={{ maxHeight: 260, minWidth: 220 }}>
          {suggestions.length === 0 ? (
            <Menu.Item disabled title="No previous entries yet" />
          ) : (
            suggestions.map((s, i) => (
              <Menu.Item
                key={`${s}-${i}`}
                title={s}
                onPress={() => {
                  onChangeText(s);
                  onCommit?.(s);
                  setOpen(false);
                }}
              />
            ))
          )}
        </ScrollView>
      </Menu>
    </FieldShell>
  );
}
