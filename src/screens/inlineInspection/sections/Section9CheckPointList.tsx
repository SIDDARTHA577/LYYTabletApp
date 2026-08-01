import React from 'react';
import { View, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import { DropdownField } from '../../../components/form/DropdownField';
import { TextField } from '../../../components/form/TextField';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = InlineInspectionData['check_point_list'];

const RESULT_OPTIONS = ['Ok', 'Not conform', 'DDP', 'No'].map((v) => ({ label: v, value: v }));

export function Section9CheckPointList({ data, onChange }: { data: Data; onChange: (next: Data) => void }) {
  const { language } = useLanguage();
  const CHECK_POINTS = [
    (language === 'en' ? 'Sewing Conformity' : '缝制合规性'),
    (language === 'en' ? 'Trimming Conformity' : '修剪合规性'),
    (language === 'en' ? 'Labelling Conformity' : '标签合规性'),
    (language === 'en' ? 'Measurements' : '测量'),
    (language === 'en' ? 'Packing' : '包装'),
    (language === 'en' ? 'Fabric' : '面料'),
    (language === 'en' ? 'Vacuum Pack-Requirement' : '真空包装要求'),
    (language === 'en' ? 'Vacuum Pack-Bulk' : '真空包装散货'),
    (language === 'en' ? 'Vacuum Pack-Result' : '真空包装结果'),
  ];

  const safeData = data || [];

  // Initialize with default points if empty
  React.useEffect(() => {
    if (safeData.length === 0) {
      onChange(CHECK_POINTS.map(point => ({ point, result: '', desc: '', remark_cn: '', remark_en: '', photo: '' })));
    }
  }, [safeData.length]);

  const updateItem = (idx: number, field: string, value: any) => {
    const arr = [...safeData];
    arr[idx] = { ...arr[idx], [field]: value };
    onChange(arr);
  };

  return (
    <View>
      <SectionCard title={language === 'en' ? 'Check Point List' : '检查点列表'} subtitle={language === 'en' ? 'Inspection check points' : '检验检查点'}>
        {safeData.map((item, idx) => (
          <View key={idx} className="mb-4 border border-border p-4 rounded-md bg-background">
            <Text className="mb-3 font-bold text-textPrimary">{item.point}</Text>
            <View className="flex-row flex-wrap items-end gap-3">
              <View style={{ width: 180 }}>
                <DropdownField label="Result" value={item.result} options={RESULT_OPTIONS} onChangeValue={(v) => updateItem(idx, 'result', v)} width="100%" />
              </View>
              <View style={{ width: 200 }}>
                <TextField label="Remark (Chinese)" value={item.remark_cn || ''} onChangeText={(v) => updateItem(idx, 'remark_cn', v)} width="100%" />
              </View>
              <View style={{ width: 200 }}>
                <TextField label="Remark (English)" value={item.remark_en || ''} onChangeText={(v) => updateItem(idx, 'remark_en', v)} width="100%" />
              </View>
              <PhotoSlot label="Image" uri={item.photo} onChange={(uri) => updateItem(idx, 'photo', uri)} />
            </View>
          </View>
        ))}
      </SectionCard>
    </View>
  );
}
