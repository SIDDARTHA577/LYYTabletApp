import React from 'react';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { NumberField } from '../../../components/form/NumberField';
import { DateField } from '../../../components/form/DateField';
import { DropdownField } from '../../../components/form/DropdownField';
import { RadioGroupField } from '../../../components/form/RadioGroupField';
import { LIGHT_SOURCE_OPTIONS, METHOD_OPTIONS, YES_NO_OPTIONS } from '../../../features/fabricInspection/options';
import type { FabricInspectionData } from '../../../features/fabricInspection/types';

type Data = FabricInspectionData['inspection_details'];

export function Section2InspectionDetails({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <FormRow>
      <DateField label="Inspection Date" labelCn="检验日期" required value={data.inspectionDate} onChangeValue={(v) => onChange({ inspectionDate: v })} />
      <TextField label="Checker / Inspector" labelCn="检验员" value={data.checker} onChangeText={(v) => onChange({ checker: v })} />
      <TextField label="Inspection Method" labelCn="检验方法" required value={data.inspectionMethod} onChangeText={(v) => onChange({ inspectionMethod: v })} />
      <TextField label="Sampling Plan" labelCn="抽样方案" value={data.samplingPlan} onChangeText={(v) => onChange({ samplingPlan: v })} />
      <NumberField label="Total Rolls" labelCn="总卷数" value={data.totalRolls} onChangeValue={(v) => onChange({ totalRolls: v })} />
      <NumberField label="Total Quantity" labelCn="总数量" value={data.totalQuantity} onChangeValue={(v) => onChange({ totalQuantity: v })} suffix="yd/m" />
      <DropdownField label="Light Source" labelCn="光源" value={data.lightSource || null} options={LIGHT_SOURCE_OPTIONS.map(o => ({ value: o, label: o, icon: 'lightbulb-on-outline' }))} onChangeValue={(v) => onChange({ lightSource: v })} />
      <TextField label="Location" labelCn="地点" value={data.location} onChangeText={(v) => onChange({ location: v })} />
      <DropdownField label="Method" labelCn="方法" value={data.method || null} options={METHOD_OPTIONS.map(o => ({ value: o, label: o, icon: 'ruler' }))} onChangeValue={(v) => onChange({ method: v })} />
      <RadioGroupField
        label="Shade band available"
        labelCn="备有色档"
        value={data.shadeBandAvailable || null}
        options={YES_NO_OPTIONS}
        onChangeValue={(v) => onChange({ shadeBandAvailable: v as 'Yes' | 'No' })}
      />
    </FormRow>
  );
}
