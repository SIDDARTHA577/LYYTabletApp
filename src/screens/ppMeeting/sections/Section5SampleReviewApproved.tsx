import React from 'react';
import { View, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { DropdownField } from '../../../components/form/DropdownField';
import { TextField } from '../../../components/form/TextField';
import { TextAreaField } from '../../../components/form/TextAreaField';
import type { PpMeetingData } from '../../../features/ppMeeting/types';

type Data = PpMeetingData['sample_review_approved'];

const SAMPLE_REVIEW_ITEMS = [
  { id: 1, label: 'Sample & fitting vs final tech pack & measurement chart', labelCn: '样品试身对比工艺包与尺寸表' },
  { id: 2, label: 'Construction check (overall aesthetic)', labelCn: '工艺检查(整体外观)' },
  { id: 3, label: 'Product safety review', labelCn: '产品安全评审' },
  { id: 4, label: 'Raw materials against standard', labelCn: '原材料对比标准' },
  { id: 5, label: 'Handfeel / washing effect against standard', labelCn: '手感/洗水效果' },
  { id: 6, label: 'Label placement & information', labelCn: '标签位置与信息' },
  { id: 7, label: 'Trims against standard', labelCn: '辅料对比标准' },
  { id: 8, label: 'Pressing / folding / packing information', labelCn: '整烫/折叠/包装信息' },
  { id: 9, label: 'Measurement check & grading rule', labelCn: '尺寸检查与放码规则' },
  { id: 10, label: 'Embroidery / printing / colour combination', labelCn: '绣印/颜色组合' },
  { id: 11, label: 'Hardware functionality test (baby/kids)', labelCn: '硬件功能测试' }
];

export function Section5SampleReviewApproved({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
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

  return (
    <View>
      <SectionCard title="Sample Review vs Approved" subtitle="样品对比批准">
        {(SAMPLE_REVIEW_ITEMS).map((item) => {
          const checklist = data.checklist || {};
          const current = checklist[String(item.id)] || { status: '', remarks: '' };
          return (
            <View key={item.id} className="mb-4 border-b border-border pb-3 flex-row flex-wrap items-center gap-4">
              <View className="w-[40%]">
                <Text className="text-body font-bold text-textPrimary">{item.id}. {item.label}</Text>
                <Text className="text-caption text-textSecondary">{item.labelCn}</Text>
              </View>
              <DropdownField label="Status" value={current.status} options={STATUS_OPTIONS} onChangeValue={(v) => updateChecklist(item.id, 'status', v || '')} width="25%" />
              <TextField label="Comments / Observations" labelCn="评语/观察" value={current.remarks} onChangeText={(v) => updateChecklist(item.id, 'remarks', v)} width="30%" />
            </View>
          );
        })}
      </SectionCard>

      <SectionCard title="Others" subtitle="其他">
        <View className="mb-4 flex-row flex-wrap items-center gap-4">
          <DropdownField label="Status" value={data.others_status} options={STATUS_OPTIONS} onChangeValue={(v) => onChange({ others_status: v || '' })} width="30%" />
          <View style={{ width: '65%' }}>
            <TextAreaField label="Others / Remarks" labelCn="其他/备注" value={data.others} onChangeText={(v) => onChange({ others: v })} />
          </View>
        </View>
      </SectionCard>
    </View>
  );
}
