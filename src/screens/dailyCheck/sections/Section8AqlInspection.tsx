import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { NumberField } from '../../../components/form/NumberField';
import { DropdownField } from '../../../components/form/DropdownField';
import type { DailyCheckData } from '../../../features/dailyCheck/types';

type Data = DailyCheckData['aql_inspection'];

import { DropdownOption } from '../../../components/form/DropdownField';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

const RESULT_OPTIONS: DropdownOption[] = [
  { value: 'Pass', label: 'Pass', icon: 'check-circle', color: tokens.color.success },
  { value: 'Fail', label: 'Fail', icon: 'close-circle', color: tokens.color.danger },
  { value: 'Pending', label: 'Pending', icon: 'clock-outline', color: tokens.color.warning }
];
const ACCEPTANCE_OPTIONS: DropdownOption[] = [
  { value: 'Ac', label: 'Ac (Accept)', icon: 'check-circle-outline', color: tokens.color.success },
  { value: 'Re', label: 'Re (Reject)', icon: 'close-circle-outline', color: tokens.color.danger }
];

export function Section8AqlInspection({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title={useLanguage().language === 'en' ? 'AQL Inspection' : 'AQL 检验'} subtitle="AQL sampling results">
        <FormRow>
          <NumberField label="Pcs Available" labelCn="可检数" value={data.pcs_available} onChangeValue={(v) => onChange({ pcs_available: v })} />
          <NumberField label="Pcs Inspected" labelCn="抽检数" value={data.pcs_inspected} onChangeValue={(v) => onChange({ pcs_inspected: v })} />
          <TextField label="AQL Level" labelCn="检验水平" value={data.aql_level} onChangeText={(v) => onChange({ aql_level: v })} />
          <TextField label="Sample Source" labelCn="抽样来源 (line / cartons)" value={data.sample_source} onChangeText={(v) => onChange({ sample_source: v })} />
          <NumberField label="Total Majors" labelCn="主要缺陷" value={data.total_majors} onChangeValue={(v) => onChange({ total_majors: v })} />
          <NumberField label="Total Minors" labelCn="次要缺陷" value={data.total_minors} onChangeValue={(v) => onChange({ total_minors: v })} />
          <NumberField label="No. of Pcs Rejected" labelCn="拒收件数" value={data.pcs_rejected} onChangeValue={(v) => onChange({ pcs_rejected: v })} />
          <TextField label="Defective %" labelCn="不良率" value={data.defective_percent} onChangeText={(v) => onChange({ defective_percent: v })} />
          <DropdownField label="Inspection Result" labelCn="检验判定" value={data.inspection_result} options={RESULT_OPTIONS} onChangeValue={(v) => onChange({ inspection_result: v as any })} />
          <DropdownField label="Acceptance (Ac / Re)" labelCn="接收/拒收" value={data.acceptance} options={ACCEPTANCE_OPTIONS} onChangeValue={(v) => onChange({ acceptance: v as any })} />
        </FormRow>
      </SectionCard>
    </View>
  );
}
