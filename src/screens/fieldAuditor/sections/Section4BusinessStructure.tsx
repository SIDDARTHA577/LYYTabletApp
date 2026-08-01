import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { CheckGrid } from '../../../components/form/CheckGrid';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['business_structure'];

import { COMMON_STATUS_OPTIONS as STATUS_OPTIONS } from '../../../constants/statusOptions';

const ENTITY_ITEMS = [
  'P.O. Vendor — Entity Name',
  'P.O. Vendor — Role / Responsibilities',
  'Factory — Entity Name',
  'Factory — Role / Responsibilities'
];

const OVERLAP_ITEMS = [
  'Same beneficial owner? (Y/N + detail)',
  'Family relationship between entities? (Y/N + detail)',
  'Distance between entities (km, if separate sites)',
  'Sub-contracted facilities — Tier 1 list provided?',
  'Cross-references / Notes'
];

export function Section4BusinessStructure({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const buildGrid = (items: string[], sourceData: any) => {
    return items.reduce((acc, point) => {
      acc[point] = { status: sourceData[point]?.status || null, value: sourceData[point]?.notes || '' };
      return acc;
    }, {} as Record<string, any>);
  };

  const entitiesGrid = buildGrid(ENTITY_ITEMS, data.entities);
  const overlapGrid = buildGrid(OVERLAP_ITEMS, data.ownership_overlap);

  const handleChange = (category: keyof Data, item: string, row: any) => {
    onChange({ [category]: { ...data[category], [item]: { status: row.status, notes: row.value } } });
  };

  return (
    <View>
      <SectionCard title="4.1 Entities" subtitle="Vendor and Factory roles">
        <CheckGrid items={ENTITY_ITEMS} statusOptions={STATUS_OPTIONS} value={entitiesGrid} onChangeRow={(i, r) => handleChange('entities', i, r)} />
      </SectionCard>
      <SectionCard title="4.2 Ownership Overlap & Notes" subtitle="Relationships between entities">
        <CheckGrid items={OVERLAP_ITEMS} statusOptions={STATUS_OPTIONS} value={overlapGrid} onChangeRow={(i, r) => handleChange('ownership_overlap', i, r)} />
      </SectionCard>
    </View>
  );
}
