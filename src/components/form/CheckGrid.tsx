import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { SegmentedButtons, TextInput } from 'react-native-paper';
import tokens from '../../theme/tokens';

export interface CheckGridRowValue {
  status: string | null;
  value: string;
}

// Section 7 "Shade / Width / Physical Checks" shape: Check item | Status |
// Comments/Value — reused as-is for any future module's checkbox_grid
// sections that also carry a free-text column (most templates' grids are
// status-only; this variant is the superset).
export function CheckGrid({
  items,
  statusOptions,
  value,
  onChangeRow,
}: {
  items: string[];
  statusOptions: any[];
  value?: Record<string, CheckGridRowValue>;
  onChangeRow: (item: string, row: CheckGridRowValue) => void;
}) {
  return (
    <View className="overflow-hidden rounded-md border border-border">
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={{ minWidth: 1400, width: '100%' }}>
          <View className="flex-row items-center border-b border-border bg-background p-2">
            <Text style={{ width: 400, paddingHorizontal: 4 }} className="text-caption font-bold uppercase text-textSecondary">Check</Text>
            <Text style={{ width: 650, paddingHorizontal: 4 }} className="text-caption font-bold uppercase text-textSecondary">Status</Text>
            <Text style={{ flex: 1, minWidth: 300, paddingHorizontal: 4 }} className="text-caption font-bold uppercase text-textSecondary">Comments / Value</Text>
          </View>
          {items.map((item) => {
            const row = (value || {})[item] ?? { status: null, value: '' };
            return (
              <View key={item} className="flex-row items-center border-b border-border p-2">
                <Text style={{ width: 400, paddingHorizontal: 4 }} className="text-label text-textPrimary">{item}</Text>
                <View style={{ width: 650, paddingHorizontal: 4 }}>
                  <SegmentedButtons
                    value={row.status ?? ''}
                    onValueChange={(v) => onChangeRow(item, { ...row, status: v })}
                    density="small"
                    buttons={statusOptions.map((opt) => {
                      if (typeof opt === 'string') return { value: opt, label: opt };
                      return { value: opt.value, label: opt.label };
                    })}
                  />
                </View>
                <View style={{ flex: 1, minWidth: 300, paddingHorizontal: 4 }}>
                  <TextInput
                    mode="outlined"
                    dense
                    value={row.value}
                    onChangeText={(v) => onChangeRow(item, { ...row, value: v })}
                    outlineColor={tokens.color.border}
                    activeOutlineColor={tokens.color.primary}
                    outlineStyle={{ borderRadius: tokens.radius.md }}
                    style={{ backgroundColor: tokens.color.surface }}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
