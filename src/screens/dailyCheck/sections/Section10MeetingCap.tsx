import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { DropdownField } from '../../../components/form/DropdownField';
import type { DailyCheckData } from '../../../features/dailyCheck/types';

type Data = DailyCheckData['meeting_cap'];

import { DropdownOption } from '../../../components/form/DropdownField';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

const RESULT_OPTIONS: DropdownOption[] = [
  { value: 'Pass', label: 'Pass', icon: 'check-circle', color: tokens.color.success },
  { value: 'Fail', label: 'Fail', icon: 'close-circle', color: tokens.color.danger },
  { value: 'Pending', label: 'Pending', icon: 'clock-outline', color: tokens.color.warning }
];

export function Section10MeetingCap({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Meeting & CAP" subtitle="Corrective actions and meeting notes">
        <FormRow>
          <TextField label="Factory-manager meeting notes" labelCn="工厂经理会议记录" value={data.meeting_notes} onChangeText={(v) => onChange({ meeting_notes: v })} width="100%" />
          <TextField label="CAP / Corrective actions agreed" labelCn="商定的纠正措施(CAP)" value={data.cap} onChangeText={(v) => onChange({ cap: v })} width="100%" />
          <TextField label="Detailed Comments" labelCn="详细评语" value={data.detailed_comments} onChangeText={(v) => onChange({ detailed_comments: v })} width="100%" />
          <TextField label="Action to be taken by Vendor" labelCn="供应商需采取的行动" value={data.action_by_vendor} onChangeText={(v) => onChange({ action_by_vendor: v })} width="100%" />
        </FormRow>
      </SectionCard>
      
      <SectionCard title={useLanguage().language === 'en' ? 'Conclusion & Sign-off' : '结论与签名'} subtitle="Overall result and signatures">
        <FormRow>
          <DropdownField label="Overall Result" labelCn="总判定" value={data.overall_result} options={RESULT_OPTIONS} onChangeValue={(v) => onChange({ overall_result: v as any })} />
          <TextField label="Inspector Signature" labelCn="检验员签名" value={data.inspector_signature} onChangeText={(v) => onChange({ inspector_signature: v })} />
          <TextField label="Factory / Vendor Signature" labelCn="工厂/供应商签名" value={data.factory_signature} onChangeText={(v) => onChange({ factory_signature: v })} />
          <TextField label="Date" labelCn="日期" value={data.date} onChangeText={(v) => onChange({ date: v })} />
        </FormRow>
      </SectionCard>
    </View>
  );
}
