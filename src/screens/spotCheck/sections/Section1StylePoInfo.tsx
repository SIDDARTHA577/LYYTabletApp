import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import type { SpotCheckData } from '../../../features/spotCheck/types';

type Data = SpotCheckData['style_po_info'];

export function Section1StylePoInfo({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Style & PO Info" subtitle="Style and purchase order details">
        <FormRow>
          <TextField label="Style" labelCn="款号" value={data.style} onChangeText={(v) => onChange({ style: v })} />
          <TextField label="PO" labelCn="订单号" value={data.po} onChangeText={(v) => onChange({ po: v })} />
          <TextField label="CPO" labelCn="客户订单号" value={data.cpo} onChangeText={(v) => onChange({ cpo: v })} />
          <TextField label="Brand" labelCn="品牌" value={data.brand} onChangeText={(v) => onChange({ brand: v })} />
          <TextField label="Colour(s)" labelCn="颜色" value={data.colors} onChangeText={(v) => onChange({ colors: v })} />
          <TextField label="Factory" labelCn="工厂" value={data.factory} onChangeText={(v) => onChange({ factory: v })} />
          <TextField label="Description" labelCn="描述" value={data.description} onChangeText={(v) => onChange({ description: v })} width="100%" />
        </FormRow>
      </SectionCard>
    </View>
  );
}
