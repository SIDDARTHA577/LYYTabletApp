import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import type { FinalInspectionData } from '../../../features/finalInspection/types';

type Data = FinalInspectionData['keep_sample'];

export function Section13KeepSample({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Keep Sample" subtitle="Single-row data entry">
        <FormRow>
          <TextField label="Quantity" labelCn="数量" value={data.quantity} onChangeText={(v) => onChange({ quantity: v })} />
          <TextField label="Barcode" labelCn="条形码" value={data.barcode} onChangeText={(v) => onChange({ barcode: v })} />
        </FormRow>
      </SectionCard>
    </View>
  );
}
