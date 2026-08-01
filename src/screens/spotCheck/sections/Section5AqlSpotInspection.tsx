import React from 'react';
import { View, Text } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { NumberField } from '../../../components/form/NumberField';
import { DropdownField } from '../../../components/form/DropdownField';
import tokens from '../../../theme/tokens';
import type { SpotCheckData } from '../../../features/spotCheck/types';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = SpotCheckData['aql_spot_inspection'];

import { DropdownOption } from '../../../components/form/DropdownField';

const RESULT_OPTIONS: DropdownOption[] = [
  { value: 'Pass', label: 'Pass', icon: 'check-circle', color: tokens.color.success, description: 'Meets AQL standard' },
  { value: 'Fail', label: 'Fail', icon: 'close-circle', color: tokens.color.danger, description: 'Exceeds defect limit' },
  { value: 'Hold', label: 'Hold', icon: 'pause-circle', color: tokens.color.warning, description: 'Pending further review' }
];

export function Section5AqlSpotInspection({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const addFinding = () => {
    onChange({ findings: [...data.findings, { defect: '', severity: '', qty: 0, immediate_action: '' }] });
  };

  const updateFinding = (index: number, field: string, value: any) => {
    const newFindings = [...data.findings];
    newFindings[index] = { ...newFindings[index], [field]: value };
    onChange({ findings: newFindings });
  };

  const removeFinding = (index: number) => {
    const newFindings = [...data.findings];
    newFindings.splice(index, 1);
    onChange({ findings: newFindings });
  };

  return (
    <View>
      <SectionCard title="AQL Spot Inspection & Findings" subtitle="Summary and list of defects">
        <FormRow>
          <NumberField label="Pcs Inspected" labelCn="抽检数" value={data.pcs_inspected} onChangeValue={(v) => onChange({ pcs_inspected: v })} />
          <DropdownField label="AQL Level" labelCn="检验水平" value={data.aql_level} options={['1.0', '1.5', '2.5', '4.0', '6.5']} onChangeValue={(v) => onChange({ aql_level: v })} />
          <NumberField label="Total Majors" labelCn="主要缺陷" value={data.total_majors} onChangeValue={(v) => onChange({ total_majors: v })} />
          <NumberField label="Total Minors" labelCn="次要缺陷" value={data.total_minors} onChangeValue={(v) => onChange({ total_minors: v })} />
          <TextField label="Defective %" labelCn="不良率" value={data.defective_percent} onChangeText={(v) => onChange({ defective_percent: v })} />
          <DropdownField label="AQL Result" labelCn="判定" value={data.aql_result} options={RESULT_OPTIONS} onChangeValue={(v) => onChange({ aql_result: v as any })} />
        </FormRow>
      </SectionCard>

      <SectionCard title="Findings / Defects" subtitle="List of individual findings">
        {data.findings.length === 0 && (
          <Text className="text-body text-textSecondary italic py-4">No findings recorded. Add a finding below.</Text>
        )}
        {data.findings.map((finding, idx) => (
          <View key={idx} className="mb-4 border border-border p-4 rounded-md bg-background">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-bold text-textPrimary">Finding #{idx + 1}</Text>
              <IconButton icon="delete-outline" iconColor={tokens.color.danger} size={20} onPress={() => removeFinding(idx)} />
            </View>
            <FormRow>
              <TextField label="Defect" labelCn="缺陷" value={finding.defect} onChangeText={(v) => updateFinding(idx, 'defect', v)} />
              <DropdownField label="Severity" labelCn="严重度" value={finding.severity} options={['Critical', 'Major', 'Minor']} onChangeValue={(v) => updateFinding(idx, 'severity', v)} />
              <NumberField label="Qty" labelCn="数量" value={finding.qty} onChangeValue={(v) => updateFinding(idx, 'qty', v)} />
              <TextField label="Immediate Action" labelCn="即时措施" value={finding.immediate_action} onChangeText={(v) => updateFinding(idx, 'immediate_action', v)} />
            </FormRow>
          </View>
        ))}
        <Button mode="outlined" icon="plus" onPress={addFinding} style={{ marginTop: 8, borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{useLanguage().language === 'en' ? 'Add Finding' : '添加发现'}</Button>
      </SectionCard>
    </View>
  );
}
