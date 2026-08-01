import React from 'react';
import { View, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { DropdownField } from '../../../components/form/DropdownField';
import { TextField } from '../../../components/form/TextField';
import type { PpMeetingData } from '../../../features/ppMeeting/types';

type Data = PpMeetingData['ppm_document_checklist'];

const DOCUMENT_ITEMS = [
  { id: 1, label: 'PO Copy', labelCn: '订单副本' },
  { id: 2, label: 'Approved Fabric Swatch', labelCn: '批准面料小样' },
  { id: 3, label: 'Approved Fabric Shade Lots', labelCn: '批准色样缸差' },
  { id: 4, label: 'FPT – Fabric Performance Test (across colours)', labelCn: '面料性能测试' },
  { id: 5, label: 'GPT – Garment Performance Test', labelCn: '成衣性能测试' },
  { id: 6, label: 'Approved Sealed PP Sample', labelCn: '批准封样产前样' },
  { id: 7, label: 'Approved Sealed Tech Pack', labelCn: '批准封样工艺包' },
  { id: 8, label: 'Approved Print / Embroidery Strike-off', labelCn: '批准印绣样' },
  { id: 9, label: 'Roll-wise GSM Card & Colour Group', labelCn: '卷别克重卡及色组' },
  { id: 10, label: 'Fabric Quality Status – Colour Continuity & GSM 100%', labelCn: '面料质量(色差与克重100%)' },
  { id: 11, label: 'Sewability Test', labelCn: '可缝性测试' },
  { id: 12, label: 'Bulk Trim Quality Status', labelCn: '大货辅料质量' },
  { id: 13, label: 'Size Set Review & Query', labelCn: '码组评审与疑问' },
  { id: 14, label: 'Critical-to-Quality Operation', labelCn: '关键质量工序' },
  { id: 15, label: 'Approved Sewing & Packing Trim Card', labelCn: '批准缝制与包装辅料卡' },
  { id: 16, label: 'Packing Method', labelCn: '包装方式' },
  { id: 17, label: 'Production Plan', labelCn: '生产计划' },
  { id: 18, label: 'Pre-Final Inspection Plan', labelCn: '预终检计划' },
  { id: 19, label: 'Inspection Plan', labelCn: '检验计划' }
];

export function Section4PpmDocumentChecklist({ data, onChange }: { data: Data; onChange: (next: Data) => void }) {
  const updateChecklist = (id: number, field: 'status' | 'remarks', value: string) => {
    const key = String(id);
    const current = data[key] || { status: '', remarks: '' };
    onChange({
      ...data,
      [key]: { ...current, [field]: value }
    });
  };

  const STATUS_OPTIONS = [
    { value: 'Available', label: 'Available / 具备' },
    { value: 'Not Available', label: 'Not Available / 缺失' },
    { value: 'N/A', label: 'N/A / 不适用' }
  ];

  return (
    <View>
      <SectionCard title="PPM Document Checklist" subtitle="产前会议文件清单">
        {DOCUMENT_ITEMS.map((item) => {
          const current = data[String(item.id)] || { status: '', remarks: '' };
          return (
            <View key={item.id} className="mb-4 border-b border-border pb-3 flex-row flex-wrap items-center gap-4">
              <View className="w-[40%]">
                <Text className="text-body font-bold text-textPrimary">{item.id}. {item.label}</Text>
                <Text className="text-caption text-textSecondary">{item.labelCn}</Text>
              </View>
              <DropdownField label="Status" value={current.status} options={STATUS_OPTIONS} onChangeValue={(v) => updateChecklist(item.id, 'status', v || '')} width="25%" />
              <TextField label="Remarks" labelCn="备注" value={current.remarks} onChangeText={(v) => updateChecklist(item.id, 'remarks', v)} width="30%" />
            </View>
          );
        })}
      </SectionCard>
    </View>
  );
}
