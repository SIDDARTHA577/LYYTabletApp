import React from 'react';
import { View, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { NumberField } from '../../../components/form/NumberField';
import { TextField } from '../../../components/form/TextField';
import { DropdownField } from '../../../components/form/DropdownField';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';

type Data = InlineInspectionData['production_status'];

export function Section6ProductionStatus({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Production Status" subtitle="Production tracking numbers">
        <FormRow>
          <View className="flex-1 w-full flex-row flex-wrap gap-4">
            <View className="w-[30%]">
              <Text className="font-bold text-textPrimary mb-4">Quantity</Text>
              <NumberField label="* Order" value={data.order} onChangeValue={(v) => onChange({ order: v })} width="100%" />
              <NumberField label="* Cutting" value={data.cutting} onChangeValue={(v) => onChange({ cutting: v })} width="100%" />
              <NumberField label="Sampling Size" value={data.sampling_size} onChangeValue={(v) => onChange({ sampling_size: v })} width="100%" />
              <DropdownField 
                label="In House or Sub" 
                value={data.in_house_subcontracted} 
                options={[
                  { value: 'In House', label: 'In House', icon: 'home-city-outline' },
                  { value: 'Subcontracted', label: 'Subcontracted', icon: 'account-group-outline' }
                ]} 
                onChangeValue={(v) => onChange({ in_house_subcontracted: v as any })} 
                width="100%" 
              />
            </View>

            <View className="w-[30%]">
              <Text className="font-bold text-textPrimary mb-4">Sewing Process Status</Text>
              <NumberField label="* Emb/Print out" value={data.emb_out} onChangeValue={(v) => onChange({ emb_out: v })} width="100%" />
              <NumberField label="* Emb/Print back" value={data.emb_back} onChangeValue={(v) => onChange({ emb_back: v })} width="100%" />
              <NumberField label="* Cutting pieces" value={data.cutting_pieces} onChangeValue={(v) => onChange({ cutting_pieces: v })} width="100%" />
              <NumberField label="* Semi finished" value={data.semi_finished} onChangeValue={(v) => onChange({ semi_finished: v })} width="100%" />
            </View>

            <View className="w-[30%]">
              <Text className="font-bold text-textPrimary mb-4">Final Process Status</Text>
              <NumberField label="* Trimming" value={data.trimming} onChangeValue={(v) => onChange({ trimming: v })} width="100%" />
              <NumberField label="* Final Pressing" value={data.final_pressing} onChangeValue={(v) => onChange({ final_pressing: v })} width="100%" />
              <NumberField label="* Packing" value={data.packing} onChangeValue={(v) => onChange({ packing: v })} width="100%" />
              <NumberField label="* Finished" value={data.finished} onChangeValue={(v) => onChange({ finished: v })} width="100%" />
            </View>
          </View>
        </FormRow>
      </SectionCard>
      
      <SectionCard title="Remarks" subtitle="Any additional comments">
        <FormRow>
          <TextField label="Remark CN" value={data.remark_cn} onChangeText={(v) => onChange({ remark_cn: v })} width="100%" />
          <TextField label="Remark EN" value={data.remark_en} onChangeText={(v) => onChange({ remark_en: v })} width="100%" />
        </FormRow>
      </SectionCard>
    </View>
  );
}
