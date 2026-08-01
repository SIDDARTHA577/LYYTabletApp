import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { DateField } from '../../../components/form/DateField';
import { DropdownField } from '../../../components/form/DropdownField';
import type { PpMeetingData } from '../../../features/ppMeeting/types';

type Data = PpMeetingData['meeting_details'];

export function Section2MeetingDetails({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const STATUS_OPTIONS = [
    { value: 'Yes', label: 'Yes / 是' },
    { value: 'No', label: 'No / 否' },
    { value: 'Pending', label: 'Pending / 待定' }
  ];

  return (
    <View>
      <SectionCard title="Meeting Details" subtitle="会议信息">
        <FormRow>
          <DateField label="PPM Date" labelCn="会议日期" value={data.ppm_date} onChangeValue={(v) => onChange({ ppm_date: v })} />
          <DropdownField label="PP Approved" labelCn="产前样批准" value={data.pp_approved} options={STATUS_OPTIONS} onChangeValue={(v) => onChange({ pp_approved: v || '' })} />
          <DropdownField label="Green Tag Sample" labelCn="绿标样" value={data.green_tag} options={STATUS_OPTIONS} onChangeValue={(v) => onChange({ green_tag: v || '' })} />
          <DropdownField label="Size Set Status" labelCn="码组状态" value={data.size_set_status} options={STATUS_OPTIONS} onChangeValue={(v) => onChange({ size_set_status: v || '' })} />
          <DateField label="Plan Cut Date" labelCn="计划裁剪日" value={data.plan_cut_date} onChangeValue={(v) => onChange({ plan_cut_date: v })} />
          <DateField label="Actual Cut Date" labelCn="实际裁剪日" value={data.actual_cut_date} onChangeValue={(v) => onChange({ actual_cut_date: v })} />
          <DateField label="Plan Sew Date" labelCn="计划缝制日" value={data.plan_sew_date} onChangeValue={(v) => onChange({ plan_sew_date: v })} />
          <DateField label="Actual Sew Date" labelCn="实际缝制日" value={data.actual_sew_date} onChangeValue={(v) => onChange({ actual_sew_date: v })} />
          <DateField label="Finishing Date" labelCn="后整日期" value={data.finishing_date} onChangeValue={(v) => onChange({ finishing_date: v })} />
          <DateField label="Packing Date" labelCn="包装日期" value={data.packing_date} onChangeValue={(v) => onChange({ packing_date: v })} />
        </FormRow>
      </SectionCard>
    </View>
  );
}
