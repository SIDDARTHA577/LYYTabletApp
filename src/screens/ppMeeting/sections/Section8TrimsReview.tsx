import React from 'react';
import { View, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { NumberField } from '../../../components/form/NumberField';
import { DropdownField } from '../../../components/form/DropdownField';
import type { PpMeetingData } from '../../../features/ppMeeting/types';

type Data = PpMeetingData['trims_review'];

const TRIM_ITEMS = [
  'Main Label', 'Size Label', 'Washcare Label', 'Security Label', 'Price Ticket',
  'Thread TEX', 'Elastic', 'Smocking Elastic', 'Drawcord', 'Mobilon',
  'Hook & Eye', 'Zipper', 'Button', 'Lining', 'Interlining'
];

export function Section8TrimsReview({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const YES_NO_NA_OPTIONS = [
    { value: 'Yes', label: 'Yes / 是' },
    { value: 'No', label: 'No / 否' },
    { value: 'N/A', label: 'N/A / 不适用' }
  ];

  const STATUS_OPTIONS = [
    { value: 'Approved', label: 'Approved / 批准' },
    { value: 'Not approved', label: 'Not approved / 不批准' },
    { value: 'N/A', label: 'N/A / 不适用' }
  ];

  const updateTrimStatus = (item: string, field: 'status' | 'remarks', value: string) => {
    const trimStatus = data.trim_status || {};
    const current = trimStatus[item] || { status: '', remarks: '' };
    onChange({
      trim_status: {
        ...trimStatus,
        [item]: { ...current, [field]: value }
      }
    });
  };

  return (
    <View>
      <SectionCard title="Trims Card Approval" subtitle="辅料卡批准">
        <FormRow>
          <DropdownField label="Trim Card Approved" labelCn="辅料卡批准" value={data.trim_card_approved} options={YES_NO_NA_OPTIONS} onChangeValue={(v) => onChange({ trim_card_approved: v || '' })} />
          <NumberField label="Copies for Distribution" labelCn="分发份数" value={data.copies_distributed} onChangeValue={(v) => onChange({ copies_distributed: v })} />
        </FormRow>
      </SectionCard>

      <SectionCard title="Trims Status" subtitle="辅料状态">
        {TRIM_ITEMS.map((item) => {
          const trimStatus = data.trim_status || {};
          const current = trimStatus[item] || { status: '', remarks: '' };
          return (
            <View key={item} className="mb-4 border-b border-border pb-3 flex-row flex-wrap items-center gap-4">
              <View className="w-[40%]">
                <Text className="text-body font-bold text-textPrimary">{item}</Text>
              </View>
              <DropdownField label="Status" value={current.status} options={STATUS_OPTIONS} onChangeValue={(v) => updateTrimStatus(item, 'status', v || '')} width="25%" />
              <TextField label="Remarks / Specs" labelCn="备注/规格" value={current.remarks} onChangeText={(v) => updateTrimStatus(item, 'remarks', v)} width="30%" />
            </View>
          );
        })}
      </SectionCard>

      <SectionCard title="Fusible Interlining Fusing Standard" subtitle="粘衬熔接标准">
        <FormRow>
          <TextField label="Time (s)" labelCn="时间 (秒)" value={data.fusible_time} onChangeText={(v) => onChange({ fusible_time: v })} />
          <TextField label="Temp (°C)" labelCn="温度 (°C)" value={data.fusible_temp} onChangeText={(v) => onChange({ fusible_temp: v })} />
          <TextField label="Pressure" labelCn="压力" value={data.fusible_pressure} onChangeText={(v) => onChange({ fusible_pressure: v })} />
          <TextField label="Bond Strength" labelCn="粘合强度" value={data.fusible_strength} onChangeText={(v) => onChange({ fusible_strength: v })} />
        </FormRow>
      </SectionCard>

      <SectionCard title="HT (Heat-Transfer) Label Fusing" subtitle="烫画/热转印标熔接">
        <FormRow>
          <TextField label="Area" labelCn="部位" value={data.ht_area} onChangeText={(v) => onChange({ ht_area: v })} />
          <TextField label="Temp (°C)" labelCn="温度 (°C)" value={data.ht_temp} onChangeText={(v) => onChange({ ht_temp: v })} />
          <TextField label="Pressure" labelCn="压力" value={data.ht_pressure} onChangeText={(v) => onChange({ ht_pressure: v })} />
          <TextField label="Time (s)" labelCn="时间 (秒)" value={data.ht_time} onChangeText={(v) => onChange({ ht_time: v })} />
        </FormRow>
      </SectionCard>
    </View>
  );
}
