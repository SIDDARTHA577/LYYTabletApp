import React from 'react';
import { View, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { DropdownField } from '../../../components/form/DropdownField';
import { TextField } from '../../../components/form/TextField';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import type { PpMeetingData } from '../../../features/ppMeeting/types';

type Data = PpMeetingData['sewing_construction_review'];

const SEWING_REVIEW_ITEMS = [
  { id: 1, label: 'Seam construction reviewed', labelCn: '缝型工艺评审' },
  { id: 2, label: 'Needle size per operation defined', labelCn: '各工序针号确定' },
  { id: 3, label: 'Critical / CTQ operations identified', labelCn: '关键工序确认' },
  { id: 4, label: 'Mock-ups for critical operations', labelCn: '关键工序样办' },
  { id: 5, label: 'Reviewed how to measure', labelCn: '测量方法评审' }
];

export function Section10SewingConstructionReview({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
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

  const updateSPI = (field: string, value: string) => {
    onChange({
      spi: {
        ...(data.spi || {}),
        [field]: value
      }
    } as any);
  };

  const STATUS_OPTIONS = [
    { value: 'Yes', label: 'Yes / 是' },
    { value: 'No', label: 'No / 否' },
    { value: 'N/A', label: 'N/A / 不适用' }
  ];

  return (
    <View>
      <SectionCard title="Sewing / Construction Review" subtitle="缝制/工艺评审">
        {SEWING_REVIEW_ITEMS.map((item) => {
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

      <SectionCard title="Stitches Per Inch (SPI)" subtitle="针距 (SPI)">
        <FormRow>
          <TextField label="SNLS (single needle)" labelCn="单针" value={data.spi?.snls} onChangeText={(v) => updateSPI('snls', v)} />
          <TextField label="Overlock" labelCn="包缝" value={data.spi?.overlock} onChangeText={(v) => updateSPI('overlock', v)} />
          <TextField label="Flat Seam" labelCn="绷缝" value={data.spi?.flat_seam} onChangeText={(v) => updateSPI('flat_seam', v)} />
          <TextField label="Other" labelCn="其他" value={data.spi?.other} onChangeText={(v) => updateSPI('other', v)} />
        </FormRow>
      </SectionCard>

      <SectionCard title="Sewing Illustration & Critical Operation Photos" subtitle="缝制图示与关键工序照片">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          <PhotoSlot label="Sewing Illustration / 缝制图示" uri={data.photo_sewing_illustration} onChange={(uri) => onChange({ photo_sewing_illustration: uri })} />
          <PhotoSlot label="Critical Operation / 关键工序" uri={data.photo_critical_operation} onChange={(uri) => onChange({ photo_critical_operation: uri })} />
        </View>
      </SectionCard>
    </View>
  );
}
