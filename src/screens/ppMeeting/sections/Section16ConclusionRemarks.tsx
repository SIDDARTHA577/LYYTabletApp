import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { DateField } from '../../../components/form/DateField';
import { DropdownField } from '../../../components/form/DropdownField';
import { TextAreaField } from '../../../components/form/TextAreaField';
import { SignaturePad } from '../../../components/form/SignaturePad';
import type { PpMeetingData } from '../../../features/ppMeeting/types';

type Data = PpMeetingData['conclusion_remarks'];

export function Section16ConclusionRemarks({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const RESULT_OPTIONS = [
    { value: 'Approved to Proceed', label: 'Approved to Proceed / 批准生产' },
    { value: 'Conditional', label: 'Conditional / 有条件' },
    { value: 'On Hold', label: 'On Hold / 暂停' }
  ];

  return (
    <View>
      <SectionCard title="Conclusion & Remarks" subtitle="结论与备注">
        <TextAreaField
          label="Critical defects to avoid (e.g. skip stitch / broken stitch / untrimmed threads / raw edge / open seam / oil stain)"
          labelCn="须避免的关键缺陷"
          value={data.critical_defects_to_avoid}
          onChangeText={(v) => onChange({ critical_defects_to_avoid: v })}
        />
        <TextAreaField
          label="Carryover style — past production lessons learnt"
          labelCn="翻单款—过往生产经验"
          value={data.carryover_style_lessons}
          onChangeText={(v) => onChange({ carryover_style_lessons: v })}
        />
        <DropdownField
          label="New Style"
          labelCn="新款"
          value={data.new_style}
          options={[
            { value: 'Yes', label: 'Yes / 是' },
            { value: 'No', label: 'No / 否' }
          ]}
          onChangeValue={(v) => onChange({ new_style: v || '' })}
        />
        <FormRow>
          <DropdownField label="Overall PP Result" labelCn="总判定" value={data.overall_pp_result} options={RESULT_OPTIONS} onChangeValue={(v) => onChange({ overall_pp_result: v || '' })} />
          <TextField label="Prepared By" labelCn="编制人" value={data.prepared_by} onChangeText={(v) => onChange({ prepared_by: v })} />
          <TextField label="QA Manager" labelCn="QA经理" value={data.qa_manager} onChangeText={(v) => onChange({ qa_manager: v })} />
          <DateField label="Date" labelCn="日期" value={data.date} onChangeValue={(v) => onChange({ date: v })} />
        </FormRow>
      </SectionCard>

      <SectionCard title="Vendor Sign-off" subtitle="供应商签名确认">
        <SignaturePad label="Vendor Signature" labelCn="供应商签名" value={data.vendor_signature} onChange={(v) => onChange({ vendor_signature: v })} />
      </SectionCard>
    </View>
  );
}
