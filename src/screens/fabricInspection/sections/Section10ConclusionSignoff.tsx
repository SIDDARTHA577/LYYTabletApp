import React from 'react';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { TextAreaField } from '../../../components/form/TextAreaField';
import { DateField } from '../../../components/form/DateField';
import { DropdownField } from '../../../components/form/DropdownField';
import { RadioGroupField } from '../../../components/form/RadioGroupField';
import { SignaturePad } from '../../../components/form/SignaturePad';
import { DISPOSITION_OPTIONS, RESULT_OPTIONS } from '../../../features/fabricInspection/options';
import type { FabricInspectionData } from '../../../features/fabricInspection/types';

type Data = FabricInspectionData['conclusion_signoff'];

export function Section10ConclusionSignoff({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <>
      <FormRow>
        <RadioGroupField
          label="Overall Result"
          labelCn="总判定"
          required
          value={data.overallResult || null}
          options={RESULT_OPTIONS}
          onChangeValue={(v) => onChange({ overallResult: v as any })}
          width="100%"
        />
        <DropdownField
          label="Disposition"
          labelCn="处置"
          value={data.disposition || null}
          options={DISPOSITION_OPTIONS.map(o => ({ value: o, label: o, icon: 'clipboard-list-outline' }))}
          onChangeValue={(v) => onChange({ disposition: v })}
        />
        <TextField label="Quality Controller" labelCn="质检员" value={data.qualityController} onChangeText={(v) => onChange({ qualityController: v })} />
        <TextField label="Warehouse In-charge" labelCn="仓库负责人" value={data.warehouseInCharge} onChangeText={(v) => onChange({ warehouseInCharge: v })} />
        <DateField label="Date" labelCn="日期" value={data.date} onChangeValue={(v) => onChange({ date: v })} />
      </FormRow>
      <TextAreaField
        label="Remarks / Corrective action"
        labelCn="备注/纠正措施"
        value={data.remarks}
        onChangeText={(v) => onChange({ remarks: v })}
      />
      <SignaturePad label="Signature" labelCn="签名" value={data.signature} onChange={(v) => onChange({ signature: v })} />
    </>
  );
}
