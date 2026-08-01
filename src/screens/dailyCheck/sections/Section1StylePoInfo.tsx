import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { DateField } from '../../../components/form/DateField';
import type { DailyCheckData } from '../../../features/dailyCheck/types';

type Data = DailyCheckData['style_po_info'];

export function Section1StylePoInfo({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Style & PO Info" subtitle="Style and purchase order details">
        <FormRow>
          <TextField label="Style" labelCn="款号" value={data.style} onChangeText={(v) => onChange({ style: v })} />
          <TextField label="PO" labelCn="订单号" value={data.po} onChangeText={(v) => onChange({ po: v })} />
          <TextField label="CPO" labelCn="客户订单号" value={data.cpo} onChangeText={(v) => onChange({ cpo: v })} />
          <TextField label="Brand" labelCn="品牌" value={data.brand} onChangeText={(v) => onChange({ brand: v })} />
          <TextField label="Description" labelCn="描述" value={data.description} onChangeText={(v) => onChange({ description: v })} />
          <TextField label="Colours / Qty" labelCn="颜色/数量" value={data.colors_qty} onChangeText={(v) => onChange({ colors_qty: v })} />
          <TextField label="Division" labelCn="部门" value={data.division} onChangeText={(v) => onChange({ division: v })} />
          <DateField label="Last X-factory date" labelCn="最晚出厂日期" value={data.last_x_factory_date} onChangeValue={(v) => onChange({ last_x_factory_date: v })} />
        </FormRow>
      </SectionCard>
    </View>
  );
}
