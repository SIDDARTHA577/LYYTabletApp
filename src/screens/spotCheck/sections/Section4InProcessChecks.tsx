import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { CheckGrid } from '../../../components/form/CheckGrid';
import type { SpotCheckData } from '../../../features/spotCheck/types';

type Data = SpotCheckData['in_process_checks'];

import { COMMON_STATUS_OPTIONS as STATUS_OPTIONS } from '../../../constants/statusOptions';

const CHECK_POINTS = [
  'Cutting layer height & flatness',
  'Cutting panel size & top/bottom offset',
  'Plaid / stripe alignment',
  'Sewing workmanship vs tech pack',
  'Bulk pressing meets requirement',
  'Final process meets requirement',
  'Labelling / placement / sizes / colours / folding / carton mark',
  'Packaging — no bulging / dead space'
];

export function Section4InProcessChecks({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  // Convert SpotCheckData format into CheckGridRowValue format
  const gridValue = CHECK_POINTS.reduce((acc, point) => {
    acc[point] = {
      status: data[point]?.status || null,
      value: data[point]?.comments || ''
    };
    return acc;
  }, {} as Record<string, any>);

  const handleRowChange = (item: string, row: any) => {
    onChange({
      ...data,
      [item]: {
        status: row.status as any,
        comments: row.value
      }
    });
  };

  return (
    <View>
      <SectionCard title="In-Process Checks" subtitle="Verification of production processes">
        <CheckGrid
          items={CHECK_POINTS}
          statusOptions={STATUS_OPTIONS}
          value={gridValue}
          onChangeRow={handleRowChange}
        />
      </SectionCard>
    </View>
  );
}
