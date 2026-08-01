import React from 'react';
import { View, Text } from 'react-native';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = InlineInspectionData['check_point_list'];

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
      onChange(CHECK_POINTS.map(point => ({ point, result: '', desc: '', photo: '' })));
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
          <View key={idx} className="mb-4 border border-border p-4 rounded-md bg-background flex-row items-center justify-between">
            <View className="w-1/4 pr-2">
              <Text className="font-bold text-textPrimary">{item.point}</Text>
            </View>
            <View className="w-1/3 px-2">
              <SegmentedButtons
                value={item.result}
                onValueChange={(v) => updateItem(idx, 'result', v)}
                buttons={[
                  { value: 'OK', label: 'OK' },
                  { value: 'Not OK', label: 'Not OK' },
                  { value: 'N/A', label: 'N/A' },
                ]}
                density="small"
              />
            </View>
            <View className="w-1/4 px-2">
              <TextInput
                mode="outlined"
                value={item.desc || ''}
                onChangeText={(t) => updateItem(idx, 'desc', t)}
                style={{ backgroundColor: 'transparent', height: 40 }}
                placeholder={language === 'en' ? 'Remark' : '备注'}
              />
            </View>
            <View className="w-1/6 items-end">
              <PhotoSlot label="Image" uri={item.photo} onChange={(uri) => updateItem(idx, 'photo', uri)} />
            </View>
          </View>
        ))}
      </SectionCard>
    </View>
  );
}
