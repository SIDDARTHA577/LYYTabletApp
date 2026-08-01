import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { FormRow } from '../../../components/form/FormRow';
import { RadioGroupField } from '../../../components/form/RadioGroupField';
import { TextAreaField } from '../../../components/form/TextAreaField';
import { RESULT_OPTIONS } from '../../../features/fabricInspection/options';
import type { FabricInspectionData } from '../../../features/fabricInspection/types';
import tokens from '../../../theme/tokens';

type Data = FabricInspectionData['defect_summary_result'];

function StatTile({ label, labelCn, value, suffix }: { label: string; labelCn: string; value: number | null; suffix?: string }) {
  return (
    <View className="min-w-[150px] flex-grow basis-[22%] rounded-lg p-4" style={{ backgroundColor: tokens.color.background }}>
      <Text variant="bodySmall" style={{ color: tokens.color.textSecondary, marginBottom: 6 }}>
        {label} · {labelCn}
      </Text>
      <Text variant="headlineSmall" style={{ fontWeight: '700', color: tokens.color.textPrimary }}>
        {value !== null && value !== undefined ? value : '—'}
        {value !== null && suffix ? <Text style={{ fontSize: 13, fontWeight: '400', color: tokens.color.textSecondary }}> {suffix}</Text> : null}
      </Text>
    </View>
  );
}

// Every value here except Overall Result and Summary remarks is computed
// upstream in FabricInspectionFormScreen.recomputeAll() from Section 4's
// roll rows — this component is purely a read-only summary + the two
// editable fields.
export function Section6DefectSummaryResult({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <View className="mb-4 flex-row flex-wrap gap-3">
        <StatTile label="Total Inspected Qty" labelCn="检验总码数" value={data.totalInspectedQty} suffix="yd" />
        <StatTile label="Total Penalty Points" labelCn="总扣分" value={data.totalPenaltyPoints} />
        <StatTile label="Average Pts/100yd²" labelCn="平均每百平方码" value={data.avgPtsPer100yd2} />
        <StatTile label="Rolls Inspected" labelCn="检验卷数" value={data.rollsInspected} />
      </View>

      <FormRow>
        <RadioGroupField
          label="Overall Result"
          labelCn="总判定"
          required
          value={data.overallResult || null}
          options={RESULT_OPTIONS}
          onChangeValue={(v) => onChange({ overallResult: v as any })}
          width="100%"
        />
      </FormRow>
      <TextAreaField label="Summary remarks" labelCn="汇总备注" value={data.summaryRemarks} onChangeText={(v) => onChange({ summaryRemarks: v })} />
    </View>
  );
}
