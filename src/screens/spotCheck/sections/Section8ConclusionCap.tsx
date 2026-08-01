import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { DropdownField } from '../../../components/form/DropdownField';
import { RadioGroupField } from '../../../components/form/RadioGroupField';
import { DateField } from '../../../components/form/DateField';
import type { SpotCheckData } from '../../../features/spotCheck/types';

type Data = SpotCheckData['conclusion_cap'];

import { DropdownOption } from '../../../components/form/DropdownField';
import tokens from '../../../theme/tokens';

const RESULT_OPTIONS: DropdownOption[] = [
  { value: 'Pass', label: 'Pass', icon: 'check-circle', color: tokens.color.success },
  { value: 'Fail', label: 'Fail', icon: 'close-circle', color: tokens.color.danger },
  { value: 'Hold', label: 'Hold', icon: 'pause-circle', color: tokens.color.warning }
];
const ESCALATION_OPTIONS: DropdownOption[] = [
  { value: 'none', label: 'None', icon: 'check-circle-outline' },
  { value: 're-check', label: 'Re-check', icon: 'calendar-refresh' },
  { value: 'call full in-line inspection', label: 'Call full in-line inspection', icon: 'magnify-scan' },
  { value: 'hold production', label: 'Hold production', icon: 'pause-octagon-outline', color: tokens.color.danger },
  { value: 'notify (whom)', label: 'Notify (whom)', icon: 'account-alert' }
];

export function Section8ConclusionCap({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Conclusion & CAP" subtitle="Findings, CAP and Escalation">
        <FormRow>
          <TextField label="Findings summary" labelCn="发现汇总" value={data.findings_summary} onChangeText={(v) => onChange({ findings_summary: v })} width="100%" />
          <TextField label="Factory-manager meeting / CAP agreed" labelCn="工厂经理会议/商定纠正措施" value={data.meeting_cap} onChangeText={(v) => onChange({ meeting_cap: v })} width="100%" />
        </FormRow>
      </SectionCard>
      
      <SectionCard title="Result & Sign-off" subtitle="Overall result, escalation and signatures">
        <FormRow>
          <DropdownField label="Overall Result" labelCn="总判定" value={data.overall_result} options={RESULT_OPTIONS} onChangeValue={(v) => onChange({ overall_result: v as any })} />
          <DropdownField label="Escalation" labelCn="升级处理" value={data.escalation} options={ESCALATION_OPTIONS} onChangeValue={(v) => onChange({ escalation: v })} />
          <RadioGroupField 
            label="System Report Issued" 
            labelCn="系统报告已发" 
            value={data.system_report_issued ? 'Yes' : 'No'} 
            options={['Yes', 'No']} 
            onChangeValue={(v) => onChange({ system_report_issued: v === 'Yes' })} 
          />
          <TextField label="Notify (whom)" labelCn="通知对象" value={data.notify} onChangeText={(v) => onChange({ notify: v })} />
          <TextField label="Inspector Signature" labelCn="检验员签名" value={data.inspector_signature} onChangeText={(v) => onChange({ inspector_signature: v })} />
          <TextField label="Factory / Vendor Signature" labelCn="工厂/供应商签名" value={data.factory_signature} onChangeText={(v) => onChange({ factory_signature: v })} />
          <DateField label="Date (Inspector)" labelCn="日期" value={data.date_inspector} onChangeValue={(v) => onChange({ date_inspector: v })} />
          <DateField label="Date (Factory)" labelCn="日期" value={data.date_factory} onChangeValue={(v) => onChange({ date_factory: v })} />
        </FormRow>
      </SectionCard>
    </View>
  );
}
