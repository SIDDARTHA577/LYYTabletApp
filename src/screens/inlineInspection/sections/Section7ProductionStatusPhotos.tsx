import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import { DropdownField } from '../../../components/form/DropdownField';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = InlineInspectionData['production_status_photos'];

import { DropdownOption } from '../../../components/form/DropdownField';

const STATUS_OPTIONS: DropdownOption[] = [
  'SEWING WORKSHOP', 'SEMI-FINISHED PRODUCT', 'HAND-OVER LIST', 'SUB-CONTRACTION LIST',
  'BULK UNDER BUTTON ATTACHING', 'BULK AWAIT TRIMMING', 'BULK UNDER PRESSING', 'BULK AWAIT PACKING',
  'A WORK IN PROGRESS', 'BULK IN PACKAGE', 'BULK UNDER TICKERING', 'BULK AFTER TRIMMING & PRESSING',
  'BULK UNDER TRIMMING', 'UNPACKED BULK', 'CUTTING DEPARTMENT', 'BULK AFTER TRIMMING', 'CUTTING PIECE'
].map(opt => ({ value: opt, label: opt, icon: 'camera-outline' }));

export function Section7ProductionStatusPhotos({ data, onChange }: { data: Data; onChange: (next: Data) => void }) {
  const addPhoto = () => onChange([...data, { file: '', status: '' }]);
  const updatePhoto = (idx: number, field: string, value: any) => {
    const arr = [...data];
    arr[idx] = { ...arr[idx], [field]: value };
    onChange(arr);
  };

  return (
    <View>
      <SectionCard title="Production Status Photos" subtitle="Upload photos per production stage">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          {data.map((item, idx) => (
            <View key={idx} className="mb-4 border border-border p-4 rounded-md bg-background w-[300px]">
              <DropdownField label="Status" value={item.status} options={STATUS_OPTIONS} onChangeValue={(v) => updatePhoto(idx, 'status', v)} width="100%" />
              <View className="mt-4">
                <PhotoSlot label={`Photo ${idx + 1}`} uri={item.file} onChange={(uri) => updatePhoto(idx, 'file', uri)} />
              </View>
            </View>
          ))}
        </View>
        <Button mode="outlined" icon="plus" onPress={addPhoto} style={{ marginTop: 8, alignSelf: 'flex-start', borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{useLanguage().language === 'en' ? 'Add Photo' : '添加照片'}</Button>
      </SectionCard>
    </View>
  );
}
