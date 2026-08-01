import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { CheckGrid } from '../../../components/form/CheckGrid';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['qc_equipment'];

const STATUS_OPTIONS = ['Pass', 'Present', 'Absent', 'Action Req', 'N/A', 'Not Recorded'];

const QC_ITEMS = [
  'Standard light box for shade-matching',
  'Needle detector',
  'Metal detector',
  'Fabric inspection station (4-point system)',
  'GSM cutter / fabric weight tester',
  'Shrinkage test setup (wash & measure)',
  'Crocking / colour rub tester',
  'Pull tester — button / snap tensile',
  'Digital seam-allowance gauge / measurement tools',
  'Dedicated QC room with ISO-compliant lighting',
  'AQL inspection sampling plan posted/used',
  'Broken needle register / log',
  '3-stage QC observed (inline / end-line / final)'
];

export function Section12QcEquipment({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const buildGrid = (items: string[], sourceData: any) => {
    return items.reduce((acc, point) => {
      acc[point] = { status: sourceData[point]?.status || null, value: sourceData[point]?.notes || '' };
      return acc;
    }, {} as Record<string, any>);
  };

  const qcGrid = buildGrid(QC_ITEMS, data);

  const handleChange = (item: string, row: any) => {
    onChange({ [item]: { status: row.status, notes: row.value } } as any);
  };

  return (
    <View>
      <SectionCard title="12. QC Equipment & Procedures" subtitle="Quality Assurance">
        <CheckGrid items={QC_ITEMS} statusOptions={STATUS_OPTIONS} value={qcGrid} onChangeRow={handleChange} />
      </SectionCard>
    </View>
  );
}
