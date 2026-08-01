import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { DateField } from '../../../components/form/DateField';
import type { PpMeetingData } from '../../../features/ppMeeting/types';

type Data = PpMeetingData['production_plan'];

export function Section13ProductionPlan({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Production Plan" subtitle="生产计划">
        <FormRow>
          <TextField label="Factory Capacity (total)" labelCn="工厂总产能" value={data.factory_capacity} onChangeText={(v) => onChange({ factory_capacity: v })} />
          <TextField label="Capacity for Brand" labelCn="品牌产能" value={data.capacity_for_brand} onChangeText={(v) => onChange({ capacity_for_brand: v })} />
          <TextField label="Production Lead Time" labelCn="生产周期" value={data.production_lead_time} onChangeText={(v) => onChange({ production_lead_time: v })} />
          <TextField label="Total Production Lines" labelCn="总生产线" value={data.total_production_lines} onChangeText={(v) => onChange({ total_production_lines: v })} />
          <DateField label="Cut Date" labelCn="裁剪日期" value={data.cut_date} onChangeValue={(v) => onChange({ cut_date: v })} />
          <DateField label="Sew Date" labelCn="缝制日期" value={data.sew_date} onChangeValue={(v) => onChange({ sew_date: v })} />
          <DateField label="Finishing Date" labelCn="后整日期" value={data.finishing_date} onChangeValue={(v) => onChange({ finishing_date: v })} />
          <DateField label="Packing Date" labelCn="包装日期" value={data.packing_date} onChangeValue={(v) => onChange({ packing_date: v })} />
          <TextField label="Free-standing sub-contractor (name & date)" labelCn="独立外发(名称及日期)" value={data.sub_contractor} onChangeText={(v) => onChange({ sub_contractor: v })} width="100%" />
        </FormRow>
      </SectionCard>
    </View>
  );
}
