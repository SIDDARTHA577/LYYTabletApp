import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { NumberField } from '../../../components/form/NumberField';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';

type Data = InlineInspectionData['random_sampling_meas'];

export function Section11RandomSamplingMeas({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Random Sampling for Measurements" subtitle="Random sample measurement quantities">
        <FormRow>
          <NumberField label="Measurements Qty" labelCn="测量数量" value={data.qty} onChangeValue={(v) => onChange({ qty: v })} />
          <NumberField label="Major" labelCn="主要" value={data.major} onChangeValue={(v) => onChange({ major: v })} />
          <NumberField label="Minor" labelCn="次要" value={data.minor} onChangeValue={(v) => onChange({ minor: v })} />
        </FormRow>
      </SectionCard>
    </View>
  );
}
