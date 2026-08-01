import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { CheckGrid } from '../../../components/form/CheckGrid';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['sampling_cycle'];

import { COMMON_STATUS_OPTIONS as STATUS_OPTIONS } from '../../../constants/statusOptions';

const CYCLE_ITEMS = [
  'Proto sample (initial design proof)',
  'Fit sample (size-set evaluation)',
  'Lab dip / strike-off (colour approval)',
  'Pre-Production Sample (PPS) — most critical',
  'Size-set sample (1 pc per size)',
  'Top-of-Production (TOP) sample',
  'Sample lead time — Proto to PPS (typical days)',
  'Sample lead time — PPS to bulk start (typical days)'
];

export function Section8SamplingCycle({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const buildGrid = (items: string[], sourceData: any) => {
    return items.reduce((acc, point) => {
      acc[point] = { status: sourceData[point]?.status || null, value: sourceData[point]?.notes || '' };
      return acc;
    }, {} as Record<string, any>);
  };

  const cycleGrid = buildGrid(CYCLE_ITEMS, data);

  const handleChange = (item: string, row: any) => {
    onChange({ [item]: { status: row.status, notes: row.value } } as any);
  };

  return (
    <View>
      <SectionCard title="8. Sampling Cycle Times" subtitle="Expected turnaround times">
        <CheckGrid items={CYCLE_ITEMS} statusOptions={STATUS_OPTIONS} value={cycleGrid} onChangeRow={handleChange} />
      </SectionCard>
    </View>
  );
}
