import React from 'react';
import { View, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { DropdownField } from '../../../components/form/DropdownField';
import { TextField } from '../../../components/form/TextField';
import type { PpMeetingData } from '../../../features/ppMeeting/types';

type Data = PpMeetingData['finishing_pressing_packing_review'];

const FINISHING_REVIEW_ITEMS = [
  { id: 1, label: 'Pressing standard reviewed', labelCn: '整烫标准评审' },
  { id: 2, label: 'Special handling (light steam / no iron / drying room)', labelCn: '特殊处理' },
  { id: 3, label: 'Folding method reviewed', labelCn: '折叠方式评审' },
  { id: 4, label: 'Hanger reviewed & acceptable', labelCn: '衣架评审且可接受' },
  { id: 5, label: 'Price ticket / size sticker placement', labelCn: '价格标/尺码贴位置' }
];

export function Section11FinishingPressingPackingReview({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const updateChecklist = (id: number, field: 'status' | 'remarks', value: string) => {
    const key = String(id);
    const checklist = data.checklist || {};
    const current = checklist[key] || { status: '', remarks: '' };
    onChange({
      checklist: {
        ...checklist,
        [key]: { ...current, [field]: value }
      }
    });
  };

  const STATUS_OPTIONS = [
    { value: 'Yes', label: 'Yes / 是' },
    { value: 'No', label: 'No / 否' },
    { value: 'N/A', label: 'N/A / 不适用' }
  ];

  const PACKING_METHOD_OPTIONS = [
    { value: 'GOHH', label: 'GOHH' },
    { value: 'GOHF', label: 'GOHF' },
    { value: 'FLAT PACK', label: 'FLAT PACK' },
    { value: 'ffP', label: 'ffP' },
    { value: 'OTHER', label: 'OTHER' }
  ];

  return (
    <View>
      <SectionCard title="Finishing / Pressing / Packing Review" subtitle="整烫/包装评审">
        {FINISHING_REVIEW_ITEMS.map((item) => {
          const checklist = data.checklist || {};
          const current = checklist[String(item.id)] || { status: '', remarks: '' };
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

      <SectionCard title="Packing Details" subtitle="包装详情">
        <FormRow>
          <DropdownField label="Packing Method" labelCn="包装方式" value={data.packing_method} options={PACKING_METHOD_OPTIONS} onChangeValue={(v) => onChange({ packing_method: v || '' })} />
          <TextField label="Fold Code (by region)" labelCn="折码(按地区)" value={data.fold_code} onChangeText={(v) => onChange({ fold_code: v })} />
          <TextField label="Carton Dimension / Packing Notes" labelCn="箱规/包装备注" value={data.carton_dimension} onChangeText={(v) => onChange({ carton_dimension: v })} width="100%" />
        </FormRow>
      </SectionCard>
    </View>
  );
}
