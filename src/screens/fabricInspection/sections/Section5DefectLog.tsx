import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { RepeatableTable, TableColumn } from '../../../components/form/RepeatableTable';
import { BAND_OPTIONS, defectCodeOptions } from '../../../features/fabricInspection/options';
import type { DefectRow } from '../../../features/fabricInspection/types';
import tokens from '../../../theme/tokens';

const COLUMNS: TableColumn[] = [
  { key: 'rollNo', label: 'Roll #', type: 'text', width: 90 },
  { key: 'code', label: 'Code', type: 'select', options: defectCodeOptions(), width: 220 },
  { key: 'defectName', label: 'Defect Name', type: 'text', width: 160 },
  { key: 'band', label: 'Band', type: 'select', options: BAND_OPTIONS, width: 90 },
  { key: 'pts', label: 'Pts', type: 'computed', width: 70 },
  { key: 'locationRemark', label: 'Location / Remark', type: 'text', width: 200 },
];

const EMPTY_DEFECT: Omit<DefectRow, '_rowId'> = {
  rollNo: '', code: '', defectName: '', band: '', pts: null, locationRemark: '',
};

// Code options come from the combined Woven/General (F1-F18) + Knit
// (F1-F21) reference lists (docs/FIELD_MAPPING.md "Fabric Defect Codes").
// Defect Name auto-fills from the selected code and Pts auto-fills from
// Band — both handled in FabricInspectionFormScreen's recomputeAll().
export function Section5DefectLog({ defects, onChangeDefects }: { defects: DefectRow[]; onChangeDefects: (defects: DefectRow[]) => void }) {
  return (
    <View>
      <Text variant="bodySmall" style={{ color: tokens.color.textSecondary, marginBottom: 10 }}>
        Defect Name auto-fills from Code; Pts auto-fills from Band (1–4 pts, capped per the rules in Section 3).
      </Text>
      <RepeatableTable columns={COLUMNS} rows={defects as any} onChangeRows={(r) => onChangeDefects(r as DefectRow[])} emptyRow={EMPTY_DEFECT} />
    </View>
  );
}
