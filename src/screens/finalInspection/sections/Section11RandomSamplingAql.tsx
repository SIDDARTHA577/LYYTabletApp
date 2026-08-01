import React from 'react';
import { View, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { NumberField } from '../../../components/form/NumberField';
import { TextField } from '../../../components/form/TextField';
import { DropdownField, DropdownOption } from '../../../components/form/DropdownField';
import type { FinalInspectionData } from '../../../features/finalInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = FinalInspectionData['random_sampling_aql'];

const RESULTS_OPTIONS: DropdownOption[] = [
  { value: 'Pass', label: 'Pass', icon: 'check-circle', color: tokens.color.success },
  { value: 'Fail', label: 'Fail', icon: 'close-circle', color: tokens.color.danger },
  { value: 'Hold', label: 'Hold', icon: 'pause-circle', color: tokens.color.warning }
];

function ComplexFieldGroup({ 
  label, 
  data, 
  onChange, 
  showPcs = false 
}: { 
  label: string; 
  data: any; 
  onChange: (key: string, v: number) => void;
  showPcs?: boolean;
}) {
  return (
    <View className="mb-4 border border-border p-4 rounded-md bg-background w-full">
      <Text className="font-bold text-textPrimary mb-4">{label}</Text>
      <View className="flex-row flex-wrap gap-4">
        {showPcs && (
          <NumberField label="PCs" value={data.pcs || 0} onChangeValue={(v) => onChange('pcs', v || 0)} />
        )}
        <NumberField label="Major" labelCn="主要" value={data.major || 0} onChangeValue={(v) => onChange('major', v || 0)} />
        <NumberField label="Minor" labelCn="次要" value={data.minor || 0} onChangeValue={(v) => onChange('minor', v || 0)} />
      </View>
    </View>
  );
}

export function Section11RandomSamplingAql({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const { language } = useLanguage();
  return (
    <View>
      <SectionCard title="Random Sampling - AQL" subtitle="AQL levels and results">
        <FormRow>
          <ComplexFieldGroup 
            label="Sampling Size / 抽样数量" 
            data={data.sampling_size} 
            onChange={(k, v) => onChange({ sampling_size: { ...data.sampling_size, [k]: v } })} 
            showPcs={true}
          />
          <ComplexFieldGroup 
            label="Accept Level / 接收水平" 
            data={data.accept_level} 
            onChange={(k, v) => onChange({ accept_level: { ...data.accept_level, [k]: v } })} 
          />
          <ComplexFieldGroup 
            label="Reject Level / 拒收水平" 
            data={data.reject_level} 
            onChange={(k, v) => onChange({ reject_level: { ...data.reject_level, [k]: v } })} 
          />
          <ComplexFieldGroup 
            label="Rejected Pieces / 不良品数量" 
            data={data.rejected_pieces} 
            onChange={(k, v) => onChange({ rejected_pieces: { ...data.rejected_pieces, [k]: v } })} 
          />
          
          <DropdownField label="Results" labelCn="结果" value={data.results} options={RESULTS_OPTIONS} onChangeValue={(v) => onChange({ results: v })} width="100%" />
          <TextField label="Comment" labelCn="备注" value={data.comment} onChangeText={(v) => onChange({ comment: v })} width="100%" />
        </FormRow>
      </SectionCard>
    </View>
  );
}
