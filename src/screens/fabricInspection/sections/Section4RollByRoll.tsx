import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { RepeatableTable, TableColumn } from '../../../components/form/RepeatableTable';
import { RESULT_OPTIONS } from '../../../features/fabricInspection/options';
import type { RollRow } from '../../../features/fabricInspection/types';
import tokens from '../../../theme/tokens';

const COLUMNS: TableColumn[] = [
  { key: 'rollNo', label: 'Roll #', type: 'text', width: 100 },
  { key: 'lotDia', label: 'Lot / Dia', type: 'text', width: 110 },
  { key: 'lengthYd', label: 'Length (yd)', type: 'number', width: 110 },
  { key: 'widthIn', label: 'Width (in)', type: 'number', width: 100 },
  { key: 'weightKg', label: 'Weight (kg)', type: 'number', width: 110 },
  { key: 'totalPts', label: 'Total Pts', type: 'computed', width: 100 },
  { key: 'ptsPer100yd2', label: 'Pts/100yd²', type: 'computed', width: 110 },
  { key: 'result', label: 'Result', type: 'select', options: RESULT_OPTIONS, width: 130 },
  // Two columns called out explicitly in FABRIC INSPECTION.txt §4, beyond
  // the base 8-column table: the supplier's own label figures (for
  // cross-checking against what the inspector actually measured) and a
  // photo of that label.
  { key: 'labelLengthWeight', label: 'Label Length / Weight', type: 'text', width: 160 },
  { key: 'labelPhotoUri', label: 'Label Photo', type: 'photo', width: 90 },
];

const EMPTY_ROLL: Omit<RollRow, '_rowId'> = {
  rollNo: '', lotDia: '', lengthYd: null, widthIn: null, weightKg: null,
  totalPts: null, ptsPer100yd2: null, result: '', labelLengthWeight: '', labelPhotoUri: null,
};

// "Total Pts" is auto-summed from the Defect Log (Section 5) and
// "Pts/100yd²" is derived from it — see
// FabricInspectionFormScreen's recomputeAll() for where that happens. This
// component only owns the editable columns.
export function Section4RollByRoll({ rolls, onChangeRolls }: { rolls: RollRow[]; onChangeRolls: (rolls: RollRow[]) => void }) {
  return (
    <View>
      <Text variant="bodySmall" style={{ color: tokens.color.textSecondary, marginBottom: 10 }}>
        Total Pts sums matching rows from the Defect Log (Section 5) by Roll #. Pts/100yd² and Result update
        automatically. Label Length/Weight and Label Photo record the supplier's own figures for cross-checking.
      </Text>
      <RepeatableTable columns={COLUMNS} rows={rolls as any} onChangeRows={(r) => onChangeRolls(r as RollRow[])} emptyRow={EMPTY_ROLL} />
    </View>
  );
}
