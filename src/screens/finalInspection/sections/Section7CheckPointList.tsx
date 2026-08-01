import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import { DropdownField, DropdownOption } from '../../../components/form/DropdownField';
import { TextField } from '../../../components/form/TextField';
import type { FinalInspectionData } from '../../../features/finalInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = FinalInspectionData['check_point_list'];

const RESULT_OPTIONS: DropdownOption[] = [
  { value: 'Nothing', label: 'Nothing', icon: 'minus-circle-outline' },
  { value: 'OK', label: 'OK', icon: 'check-circle', color: tokens.color.success },
  { value: 'Not Conform', label: 'Not Conform', icon: 'close-circle', color: tokens.color.danger },
  { value: 'DDP', label: 'DDP', icon: 'alert-circle', color: tokens.color.warning },
  { value: 'NO', label: 'NO', icon: 'close-octagon', color: tokens.color.danger }
];

export function Section7CheckPointList({ data, onChange }: { data: Data; onChange: (next: Data) => void }) {
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
      onChange(CHECK_POINTS.map(point => ({ point, result: 'Nothing', photo: '' })));
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
          <View key={idx} className="mb-4 border border-border p-4 rounded-md bg-background flex-col gap-4">
            <View className="flex-row items-center justify-between">
              <View className="w-1/3">
                <Text className="font-bold text-textPrimary">{item.point}</Text>
              </View>
              <View className="w-1/3">
                <DropdownField label="Result" value={item.result} options={RESULT_OPTIONS} onChangeValue={(v) => updateItem(idx, 'result', v)} width="100%" />
              </View>
              <View className="w-1/4">
                <PhotoSlot label="Upload Image" uri={item.photo} onChange={(uri) => updateItem(idx, 'photo', uri)} />
              </View>
            </View>
            <View className="flex-row items-center justify-between gap-4">
              <View className="flex-1">
                <TextField label="Description (CN)" labelCn="中文描述" value={item.comment_cn || ''} onChangeText={(v) => updateItem(idx, 'comment_cn', v)} width="100%" />
              </View>
              <View className="flex-1">
                <TextField label="Description (EN)" labelCn="英文描述" value={item.comment_en || ''} onChangeText={(v) => updateItem(idx, 'comment_en', v)} width="100%" />
              </View>
            </View>
          </View>
        ))}
      </SectionCard>
    </View>
  );
}
