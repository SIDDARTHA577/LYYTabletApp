import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { NumberField } from '../../../components/form/NumberField';
import type { DailyCheckData } from '../../../features/dailyCheck/types';

type Data = DailyCheckData['production_status'];

export function Section4ProductionStatus({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Production Status" subtitle="Current progress across stages">
        <FormRow>
          <NumberField label="Order Qty" labelCn="订单数量" value={data.order_qty} onChangeValue={(v) => onChange({ order_qty: v })} />
          <NumberField label="Cutting" labelCn="裁剪" value={data.cutting} onChangeValue={(v) => onChange({ cutting: v })} />
          <NumberField label="Sewing" labelCn="缝制" value={data.sewing} onChangeValue={(v) => onChange({ sewing: v })} />
          <NumberField label="Finishing" labelCn="后整" value={data.finishing} onChangeValue={(v) => onChange({ finishing: v })} />
          <NumberField label="Packed" labelCn="已包装" value={data.packed} onChangeValue={(v) => onChange({ packed: v })} />
          <NumberField label="Balance in Workshop" labelCn="车间余量" value={data.balance_workshop} onChangeValue={(v) => onChange({ balance_workshop: v })} />
          <TextField label="In-House vs Sub-contract" labelCn="自产/外发" value={data.in_house_vs_sub} onChangeText={(v) => onChange({ in_house_vs_sub: v })} />
          <TextField label="Ex-Factory Date" labelCn="出货日期" value={data.ex_factory_date} onChangeText={(v) => onChange({ ex_factory_date: v })} />
        </FormRow>
      </SectionCard>
    </View>
  );
}
