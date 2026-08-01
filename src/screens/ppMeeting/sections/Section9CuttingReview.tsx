import React from 'react';
import { View, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { DropdownField } from '../../../components/form/DropdownField';
import { TextField } from '../../../components/form/TextField';
import type { PpMeetingData } from '../../../features/ppMeeting/types';

type Data = PpMeetingData['cutting_review'];

const CUTTING_REVIEW_ITEMS = [
  { id: 1, label: 'Fabric relaxation before cutting (hours)', labelCn: '裁剪前面料松弛(小时)' },
  { id: 2, label: 'Spreading ply / max lay height', labelCn: '铺布层数/最大铺布高度' },
  { id: 3, label: 'Special handling required', labelCn: '需特殊处理' },
  { id: 4, label: 'Stripe / check matching', labelCn: '条格对位' },
  { id: 5, label: 'Fabric direction & face followed', labelCn: '布向与正面' },
  { id: 6, label: 'Dyed lot & numbering controlled', labelCn: '缸号与编号管控' }
];

export function Section9CuttingReview({ data, onChange }: { data: Data; onChange: (next: Data) => void }) {
  const updateChecklist = (id: number, field: 'status' | 'remarks', value: string) => {
    const key = String(id);
    const current = data[key] || { status: '', remarks: '' };
    onChange({
      ...data,
      [key]: { ...current, [field]: value }
    });
  };

  const STATUS_OPTIONS = [
    { value: 'Yes', label: 'Yes / 是' },
    { value: 'No', label: 'No / 否' },
    { value: 'N/A', label: 'N/A / 不适用' }
  ];

  return (
    <View>
      <SectionCard title="Cutting Review" subtitle="裁剪评审">
        {CUTTING_REVIEW_ITEMS.map((item) => {
          const current = data[String(item.id)] || { status: '', remarks: '' };
          return (
            <View key={item.id} className="mb-4 border-b border-border pb-3 flex-row flex-wrap items-center gap-4">
              <View className="w-[40%]">
                <Text className="text-body font-bold text-textPrimary">{item.id}. {item.label}</Text>
                <Text className="text-caption text-textSecondary">{item.labelCn}</Text>
              </View>
              <DropdownField label="Status" value={current.status} options={STATUS_OPTIONS} onChangeValue={(v) => updateChecklist(item.id, 'status', v || '')} width="25%" />
              <TextField label="Comments / Value" labelCn="评语/数值" value={current.remarks} onChangeText={(v) => updateChecklist(item.id, 'remarks', v)} width="30%" />
            </View>
          );
        })}
      </SectionCard>
    </View>
  );
}
