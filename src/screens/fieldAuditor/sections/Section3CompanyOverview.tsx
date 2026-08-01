import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { CheckGrid } from '../../../components/form/CheckGrid';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['company_overview'];

import { COMMON_STATUS_OPTIONS as STATUS_OPTIONS } from '../../../constants/statusOptions';

const IDENTIFICATION_ITEMS = [
  'Factory Name',
  'P.O. Vendor',
  'Factory Address (full)',
  'Date Established',
  'Business Licence No.',
  'Ownership Type (Private / State / JV / Sole Prop.)',
  'Factory Size (sqm) — building breakdown if multiple'
];

const CONTACT_ITEMS = [
  'Contact Person / Legal Rep.',
  'Contact Number',
  'Factory Director / Owner (if separate)',
  'Trading Co. Representative Present'
];

const PROFILE_ITEMS = [
  'Main Product',
  'Production Model (CMP / OEM / ODM / FOB)',
  'Prior Customer Cooperation',
  'Cooperation with P.O. Vendor (years)',
  'Existing Clients (via P.O. Vendor)',
  'Audit Date'
];

export function Section3CompanyOverview({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const buildGrid = (items: string[], sourceData: any) => {
    return items.reduce((acc, point) => {
      acc[point] = { status: sourceData[point]?.status || null, value: sourceData[point]?.notes || '' };
      return acc;
    }, {} as Record<string, any>);
  };

  const identGrid = buildGrid(IDENTIFICATION_ITEMS, data.identification);
  const contactGrid = buildGrid(CONTACT_ITEMS, data.key_contacts);
  const profileGrid = buildGrid(PROFILE_ITEMS, data.business_profile);

  const handleChange = (category: keyof Data, item: string, row: any) => {
    onChange({ [category]: { ...data[category], [item]: { status: row.status, notes: row.value } } });
  };

  return (
    <View>
      <SectionCard title="3.1 Identification" subtitle="Factory identifying details">
        <CheckGrid items={IDENTIFICATION_ITEMS} statusOptions={STATUS_OPTIONS} value={identGrid} onChangeRow={(i, r) => handleChange('identification', i, r)} />
      </SectionCard>
      <SectionCard title="3.2 Key Contacts" subtitle="Personnel and presence">
        <CheckGrid items={CONTACT_ITEMS} statusOptions={STATUS_OPTIONS} value={contactGrid} onChangeRow={(i, r) => handleChange('key_contacts', i, r)} />
      </SectionCard>
      <SectionCard title="3.3 Business Profile" subtitle="Operations and model">
        <CheckGrid items={PROFILE_ITEMS} statusOptions={STATUS_OPTIONS} value={profileGrid} onChangeRow={(i, r) => handleChange('business_profile', i, r)} />
      </SectionCard>
    </View>
  );
}
