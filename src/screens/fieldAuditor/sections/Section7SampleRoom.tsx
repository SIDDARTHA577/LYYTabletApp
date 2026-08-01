import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { CheckGrid } from '../../../components/form/CheckGrid';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['sample_room'];

import { COMMON_STATUS_OPTIONS as STATUS_OPTIONS } from '../../../constants/statusOptions';

const SETUP_ITEMS = [
  'Sample room on-site (Y/N)',
  'Sample room dedicated / shared with bulk floor',
  'Sample room area (sqm)',
  'Number of sample sewers',
  'Number of pattern makers / designers',
  'Number of pattern graders',
  'Number of marker makers',
  'Pattern / CAD software in use',
  'Marker software (if separate)',
  'Sample equipment dedicated vs shared with line',
  'Sample documentation / records sighted'
];

const PP_ITEMS = [
  'PP meeting held before bulk start? (Y/N)',
  'PP meeting attendees (factory + trading co. + brand?)',
  'PP meeting minutes sighted? (Y/N)',
  'PP sample approved before bulk cutting? (Y/N)',
  'Pilot run / size-set sample produced? (Y/N)',
  'Top-of-Production (TOP) sample submitted? (Y/N)',
  'Tech pack handling — sighted with version control?',
  'Lab dip / strike-off process documented? (Y/N)'
];

export function Section7SampleRoom({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const buildGrid = (items: string[], sourceData: any) => {
    return items.reduce((acc, point) => {
      acc[point] = { status: sourceData[point]?.status || null, value: sourceData[point]?.notes || '' };
      return acc;
    }, {} as Record<string, any>);
  };

  const setupGrid = buildGrid(SETUP_ITEMS, data.setup);
  const ppGrid = buildGrid(PP_ITEMS, data.pre_production);

  const handleChange = (category: keyof Data, item: string, row: any) => {
    onChange({ [category]: { ...data[category], [item]: { status: row.status, notes: row.value } } });
  };

  return (
    <View>
      <SectionCard title="7.1 Sample Room Setup" subtitle="Development capabilities">
        <CheckGrid items={SETUP_ITEMS} statusOptions={STATUS_OPTIONS} value={setupGrid} onChangeRow={(i, r) => handleChange('setup', i, r)} />
      </SectionCard>
      <SectionCard title="7.2 Pre-Production (PP) Process" subtitle="Bulk preparation">
        <CheckGrid items={PP_ITEMS} statusOptions={STATUS_OPTIONS} value={ppGrid} onChangeRow={(i, r) => handleChange('pre_production', i, r)} />
      </SectionCard>
    </View>
  );
}
