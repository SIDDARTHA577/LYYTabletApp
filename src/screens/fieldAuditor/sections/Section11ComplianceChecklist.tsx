import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { CheckGrid } from '../../../components/form/CheckGrid';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['compliance_checklist'];

const STATUS_OPTIONS = ['Pass', 'Present', 'Absent', 'Action Req', 'N/A', 'Not Recorded'];

const SAFETY_ITEMS = [
  'Fire exits / escape routes (clear, unlocked)',
  'Emergency lighting & floor-level exit signs',
  'Fire extinguishers (present, inspected, in date)',
  'Fire hose cabinet / hydrant',
  'Fire alarm system',
  'First aid / medical supplies',
  'Drinking water provision',
  'Security guard at factory main gate',
  'Security guard at packing department entrance',
  'Factory perimeter wall / enclosure',
  'All doors lockable',
  'Sample room on-site',
  'ISO / GS / OEKO-TEX / BSCI / SMETA / other certifications',
  'Other safety item (specify)'
];

const MAT_ITEMS = [
  'Incoming yarn / fabric / materials records (warehouse receipts)',
  'Incoming fabric inspection records (separate from receipt)',
  'Yarn / fabric storage condition (off floor, pallets)',
  'Finished goods storage condition (off floor, pallets)',
  'Knitted panel / cut panel staging area',
  'Workshop hygiene / cleanliness / housekeeping',
  'WIP tracking / daily production records',
  'Outbound sub-contracting records',
  'Sub-contractor disclosure list provided',
  'Remaining material returns process',
  'Cutting area safety — scissors secured, gloves worn',
  'Other materials issue (specify)'
];

export function Section11ComplianceChecklist({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const buildGrid = (items: string[], sourceData: any) => {
    return items.reduce((acc, point) => {
      acc[point] = { status: sourceData[point]?.status || null, value: sourceData[point]?.notes || '' };
      return acc;
    }, {} as Record<string, any>);
  };

  const safetyGrid = buildGrid(SAFETY_ITEMS, data.safety_facilities);
  const matGrid = buildGrid(MAT_ITEMS, data.materials_inventory);

  const handleChange = (category: keyof Data, item: string, row: any) => {
    onChange({ [category]: { ...data[category], [item]: { status: row.status, notes: row.value } } });
  };

  return (
    <View>
      <SectionCard title="11.1 Safety & Facilities" subtitle="Health and Safety">
        <CheckGrid items={SAFETY_ITEMS} statusOptions={STATUS_OPTIONS} value={safetyGrid} onChangeRow={(i, r) => handleChange('safety_facilities', i, r)} />
      </SectionCard>
      <SectionCard title="11.2 Materials & Inventory" subtitle="Storage and handling">
        <CheckGrid items={MAT_ITEMS} statusOptions={STATUS_OPTIONS} value={matGrid} onChangeRow={(i, r) => handleChange('materials_inventory', i, r)} />
      </SectionCard>
    </View>
  );
}
