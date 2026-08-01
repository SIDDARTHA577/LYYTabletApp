import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import { RadioGroupField } from '../../../components/form/RadioGroupField';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = InlineInspectionData['pre_packaged'];

export function Section8PrePackaged({ data, onChange }: { data: Data; onChange: (next: Data) => void }) {
  const addPhoto = () => onChange([...data, { file: '', status: '' }]);
  const updatePhoto = (idx: number, field: string, value: any) => {
    const arr = [...data];
    arr[idx] = { ...arr[idx], [field]: value };
    onChange(arr);
  };

  return (
    <View>
      <SectionCard title="Pre-Packaged" subtitle="Upload pre-packaged image and status">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          {data.map((item, idx) => (
            <View key={idx} className="mb-4 border border-border p-4 rounded-md bg-background w-[250px]">
              <RadioGroupField label="Status" value={item.status} options={['Pass', 'Fail']} onChangeValue={(v) => updatePhoto(idx, 'status', v)} />
              <View className="mt-4">
                <PhotoSlot label={`Image ${idx + 1}`} uri={item.file} onChange={(uri) => updatePhoto(idx, 'file', uri)} />
              </View>
            </View>
          ))}
        </View>
        <Button mode="outlined" icon="plus" onPress={addPhoto} style={{ marginTop: 8, alignSelf: 'flex-start', borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{useLanguage().language === 'en' ? 'Add Image' : '添加预包装图片'}</Button>
      </SectionCard>
    </View>
  );
}
