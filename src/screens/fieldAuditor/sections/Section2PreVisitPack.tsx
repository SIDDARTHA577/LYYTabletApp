import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { CheckGrid } from '../../../components/form/CheckGrid';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['pre_visit_pack'];

import { COMMON_STATUS_OPTIONS as STATUS_OPTIONS } from '../../../constants/statusOptions';
const DOC_ITEMS = [
  'NDA & Code of Conduct sign-off',
  'Business licence registry check (online verification)',
  'Digital presence sanity check (Alibaba/website/social)'
];
const STRUCT_ITEMS = [
  'Trading co. / factory relationship map',
  'Geopolitical sourcing declaration (Xinjiang/Uzbekistan/etc.)'
];

export function Section2PreVisitPack({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const docGrid = DOC_ITEMS.reduce((acc, point) => {
    acc[point] = { status: data.documentation_compliance[point]?.status || null, value: data.documentation_compliance[point]?.notes || '' };
    return acc;
  }, {} as Record<string, any>);

  const structGrid = STRUCT_ITEMS.reduce((acc, point) => {
    acc[point] = { status: data.structural_geopolitical[point]?.status || null, value: data.structural_geopolitical[point]?.notes || '' };
    return acc;
  }, {} as Record<string, any>);

  const handleDocChange = (item: string, row: any) => {
    onChange({ documentation_compliance: { ...data.documentation_compliance, [item]: { status: row.status, notes: row.value } } });
  };
  
  const handleStructChange = (item: string, row: any) => {
    onChange({ structural_geopolitical: { ...data.structural_geopolitical, [item]: { status: row.status, notes: row.value } } });
  };

  return (
    <View>
      <SectionCard title="Documentation Compliance" subtitle="Certificates and licenses">
        <CheckGrid items={DOC_ITEMS} statusOptions={STATUS_OPTIONS} value={docGrid} onChangeRow={handleDocChange} />
      </SectionCard>
      <SectionCard title="Structural & Geopolitical" subtitle="Regional considerations">
        <CheckGrid items={STRUCT_ITEMS} statusOptions={STATUS_OPTIONS} value={structGrid} onChangeRow={handleStructChange} />
      </SectionCard>
    </View>
  );
}
