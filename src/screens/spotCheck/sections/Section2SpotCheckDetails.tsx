import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { DateField } from '../../../components/form/DateField';
import { DropdownField, DropdownOption } from '../../../components/form/DropdownField';
import type { SpotCheckData } from '../../../features/spotCheck/types';
import tokens from '../../../theme/tokens';

type Data = SpotCheckData['spot_check_details'];

const FACTORY_TYPE_OPTIONS = ['In-House', 'Sub-contract', 'Both'];
const AREA_STAGE_OPTIONS = ['Cutting', 'Sewing', 'Pressing', 'Finishing', 'Packing', 'Mixed'];

const TRIGGER_REASON_OPTIONS: DropdownOption[] = [
  { value: 'Routine random', label: 'Routine random', icon: 'calendar-refresh', description: 'Standard randomized quality sweep' },
  { value: 'Follow-up on prior issue', label: 'Follow-up on prior issue', icon: 'alert-circle-outline', description: 'Re-checking a previously failed inspection' },
  { value: 'New line or operator', label: 'New line or operator', icon: 'account-hard-hat', description: 'Evaluating a new setup or new team members' },
  { value: 'Customer complaint', label: 'Customer complaint', icon: 'message-alert-outline', description: 'Investigating a customer-reported issue', color: tokens.color.danger },
  { value: 'Pre-shipment', label: 'Pre-shipment', icon: 'truck-outline', description: 'Final spot check before dispatch' }
];

export function Section2SpotCheckDetails({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Spot Check Details" subtitle="Inspection time and area">
        <FormRow>
          <DateField label="Date" labelCn="日期" value={data.date} onChangeValue={(v) => onChange({ date: v })} />
          <TextField label="Time" labelCn="时间" value={data.time} onChangeText={(v) => onChange({ time: v })} />
          <TextField label="Inspector" labelCn="检验员" value={data.inspector} onChangeText={(v) => onChange({ inspector: v })} />
          <DropdownField label="Factory Type" labelCn="工厂类型" value={data.factory_type} options={FACTORY_TYPE_OPTIONS} onChangeValue={(v) => onChange({ factory_type: v })} />
          <DropdownField label="Area / Stage" labelCn="区域/阶段" value={data.area_stage} options={AREA_STAGE_OPTIONS} onChangeValue={(v) => onChange({ area_stage: v })} />
          <DropdownField label="Trigger / Reason" labelCn="触发/原因" value={data.trigger_reason} options={TRIGGER_REASON_OPTIONS} onChangeValue={(v) => onChange({ trigger_reason: v })} />
          <TextField label="Prior Report Ref (if follow-up)" labelCn="关联报告" value={data.prior_report_ref} onChangeText={(v) => onChange({ prior_report_ref: v })} />
        </FormRow>
      </SectionCard>
    </View>
  );
}
