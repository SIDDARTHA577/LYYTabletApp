import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Button, IconButton, Menu, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import tokens from '../../theme/tokens';

export interface TableColumn {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'computed' | 'photo';
  options?: string[];
  width?: number;
}

// Generic add/remove-row table used by Roll-by-Roll and Defect Log (and, in
// later phases, every other module's repeatable_table fields — see
// docs/FIELD_MAPPING.md). `computed` columns are rendered read-only; the
// caller is responsible for keeping their values up to date in `rows`.
export function RepeatableTable({
  columns,
  rows,
  onChangeRows,
  emptyRow,
  minRows = 0,
}: {
  columns: TableColumn[];
  rows: Array<Record<string, any>>;
  onChangeRows: (rows: Array<Record<string, any>>) => void;
  emptyRow: Record<string, any>;
  minRows?: number;
}) {
  const [openMenuFor, setOpenMenuFor] = useState<string | null>(null);

  const setCell = (rowIndex: number, key: string, value: any) => {
    const next = rows.slice();
    next[rowIndex] = { ...next[rowIndex], [key]: value };
    onChangeRows(next);
  };

  const addRow = () => onChangeRows([...rows, { ...emptyRow, _rowId: `${Date.now()}-${rows.length}` }]);
  const removeRow = (rowIndex: number) => onChangeRows(rows.filter((_, i) => i !== rowIndex));

  return (
    <View className="overflow-hidden rounded-md border border-border">
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View>
          <View className="flex-row bg-background">
            {columns.map((col) => (
              <Text
                key={col.key}
                className="px-1 py-2.5 text-caption font-bold uppercase tracking-wide text-textSecondary"
                style={{ width: col.width ?? 140 }}
              >
                {col.label}
              </Text>
            ))}
            <Text className="px-1 py-2.5" style={{ width: 48 }}>
              {' '}
            </Text>
          </View>

          {rows.map((row, rowIndex) => (
            <View key={row._rowId ?? rowIndex} className="flex-row border-t border-border">
              {columns.map((col) => {
                const cellKey = `${row._rowId ?? rowIndex}-${col.key}`;
                if (col.type === 'computed') {
                  return (
                    <View key={col.key} className="justify-center px-1 py-1.5" style={{ width: col.width ?? 140 }}>
                      <Text className="font-semibold text-textPrimary">{row[col.key] ?? '—'}</Text>
                    </View>
                  );
                }
                if (col.type === 'photo') {
                  const uri = row[col.key] as string | null;
                  const pick = async () => {
                    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (!permission.granted) return;
                    const result = await ImagePicker.launchImageLibraryAsync({
                      mediaTypes: ImagePicker.MediaTypeOptions.Images,
                      quality: 0.7,
                    });
                    if (!result.canceled && result.assets?.[0]) setCell(rowIndex, col.key, result.assets[0].uri);
                  };
                  return (
                    <View key={col.key} className="justify-center px-1 py-1.5" style={{ width: col.width ?? 140 }}>
                      <Pressable
                        onPress={pick}
                        className="h-9 w-11 items-center justify-center overflow-hidden rounded-sm border border-dashed border-border bg-background"
                      >
                        {uri ? (
                          <Image source={{ uri }} className="h-full w-full" />
                        ) : (
                          <IconButton icon="camera-plus-outline" size={18} style={{ margin: 0 }} />
                        )}
                      </Pressable>
                    </View>
                  );
                }
                if (col.type === 'select') {
                  return (
                    <View key={col.key} className="justify-center px-1 py-1.5" style={{ width: col.width ?? 140 }}>
                      <Menu
                        visible={openMenuFor === cellKey}
                        onDismiss={() => setOpenMenuFor(null)}
                        anchor={
                          <TextInput
                            mode="outlined"
                            dense
                            editable={false}
                            value={row[col.key] ?? ''}
                            onPressIn={() => setOpenMenuFor(cellKey)}
                            right={<TextInput.Icon icon="chevron-down" onPress={() => setOpenMenuFor(cellKey)} />}
                            outlineColor={tokens.color.border}
                            activeOutlineColor={tokens.color.primary}
                            outlineStyle={{ borderRadius: tokens.radius.md }}
                            style={{ backgroundColor: tokens.color.surface }}
                          />
                        }
                      >
                        {(col.options ?? []).map((opt) => (
                          <Menu.Item
                            key={opt}
                            title={opt}
                            onPress={() => {
                              setCell(rowIndex, col.key, opt);
                              setOpenMenuFor(null);
                            }}
                          />
                        ))}
                      </Menu>
                    </View>
                  );
                }
                return (
                  <View key={col.key} className="justify-center px-1 py-1.5" style={{ width: col.width ?? 140 }}>
                    <TextInput
                      mode="outlined"
                      dense
                      keyboardType={col.type === 'number' ? 'numeric' : 'default'}
                      value={row[col.key] !== undefined && row[col.key] !== null ? String(row[col.key]) : ''}
                      outlineColor={tokens.color.border}
                      activeOutlineColor={tokens.color.primary}
                      outlineStyle={{ borderRadius: tokens.radius.md }}
                      style={{ backgroundColor: tokens.color.surface, textAlign: col.type === 'number' ? 'right' : 'left' }}
                      onChangeText={(t) => {
                        if (col.type === 'number') {
                          const cleaned = t.replace(/[^0-9.\-]/g, '');
                          setCell(rowIndex, col.key, cleaned === '' ? null : Number(cleaned));
                        } else {
                          setCell(rowIndex, col.key, t);
                        }
                      }}
                    />
                  </View>
                );
              })}
              <View className="justify-center px-1 py-1.5" style={{ width: 48 }}>
                <IconButton
                  icon="trash-can-outline"
                  size={24}
                  disabled={rows.length <= minRows}
                  onPress={() => removeRow(rowIndex)}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Button mode="text" icon="plus" onPress={addRow} style={{ alignSelf: 'flex-start', marginTop: 4 }}>
        Add Row
      </Button>
    </View>
  );
}
