import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { CheckGrid } from '../../../components/form/CheckGrid';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['fabric_trims_sourcing'];

import { COMMON_STATUS_OPTIONS as STATUS_OPTIONS } from '../../../constants/statusOptions';

const FABRIC_ITEMS = [
  'Fabric source — Trading Co. / Customer / Factory / Mill nominated',
  'Fabric mill name(s)',
  'Mill location (province / country)',
  'Mill business licence sighted? (Y/N)',
  'Fabric specifications documented (GSM, width, composition)',
  'Fabric MOQ per colour (typical)',
  'Fabric lead time (typical, weeks)',
  'Fabric inspection on receipt — 4-point or other',
  'Fabric origin declaration (Xinjiang / banned origins)'
];

const TRIMS_ITEMS = [
  'Trims source — Trading Co. / Customer / Factory',
  'Main trim suppliers (zips, buttons, labels, threads)',
  'Trim receipt inspection records? (Y/N)',
  'Trim lead time (typical, weeks)'
];

export function Section9FabricTrimsSourcing({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const buildGrid = (items: string[], sourceData: any) => {
    return items.reduce((acc, point) => {
      acc[point] = { status: sourceData[point]?.status || null, value: sourceData[point]?.notes || '' };
      return acc;
    }, {} as Record<string, any>);
  };

  const fabricGrid = buildGrid(FABRIC_ITEMS, data.fabric);
  const trimsGrid = buildGrid(TRIMS_ITEMS, data.trims);

  const handleChange = (category: keyof Data, item: string, row: any) => {
    onChange({ [category]: { ...data[category], [item]: { status: row.status, notes: row.value } } });
  };

  return (
    <View>
      <SectionCard title="9.1 Fabric Sourcing & QC" subtitle="Materials intake">
        <CheckGrid items={FABRIC_ITEMS} statusOptions={STATUS_OPTIONS} value={fabricGrid} onChangeRow={(i, r) => handleChange('fabric', i, r)} />
      </SectionCard>
      <SectionCard title="9.2 Trims Sourcing & QC" subtitle="Components intake">
        <CheckGrid items={TRIMS_ITEMS} statusOptions={STATUS_OPTIONS} value={trimsGrid} onChangeRow={(i, r) => handleChange('trims', i, r)} />
      </SectionCard>
    </View>
  );
}
