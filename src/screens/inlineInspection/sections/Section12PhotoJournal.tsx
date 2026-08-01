import React from 'react';
import { View } from 'react-native';
import { Button, Checkbox, Text } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import { DropdownField } from '../../../components/form/DropdownField';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';

import { useLanguage } from '../../../i18n/LanguageContext';

type Data = InlineInspectionData['photo_journal'];

import { DropdownOption } from '../../../components/form/DropdownField';
import tokens from '../../../theme/tokens';

const TYPE_OPTIONS: DropdownOption[] = [
  'CARE LABEL', 'MAIN LABEL', 'DOCUMENT', 'ODOR CHECK', 'HANDOVER LIST', 'PULLING TEST', 'COMPARISON',
  'BULK', 'LABEL', 'FABRIC/GARMENT WEIGHT', 'TEST', 'EMEBROIDER / PRINTING / RHINESTONE', 'COLOR SHADING CHECK'
].map(opt => ({ value: opt, label: opt, icon: 'tag-outline' }));

const STATUS_OPTIONS: DropdownOption[] = [
  { value: 'Pass', label: 'Pass', icon: 'check-circle', color: tokens.color.success },
  { value: 'Fail', label: 'Fail', icon: 'close-circle', color: tokens.color.danger }
];

export function Section12PhotoJournal({ data, onChange }: { data: Data; onChange: (next: Data) => void }) {
  const addPhoto = () => onChange([...data, { type: '', internal_data: false, status: '', photo: '' }]);
  const updatePhoto = (idx: number, field: string, value: any) => {
    const arr = [...data];
    arr[idx] = { ...arr[idx], [field]: value };
    onChange(arr);
  };

  return (
    <View>
      <SectionCard title={useLanguage().language === 'en' ? 'Photo Journal' : '照片日志'} subtitle="Inspection photos and documents">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          {data.map((item, idx) => (
            <View key={idx} className="mb-4 border border-border p-4 rounded-md bg-background w-[300px]">
              <DropdownField label="Type" value={item.type} options={TYPE_OPTIONS} onChangeValue={(v) => updatePhoto(idx, 'type', v)} width="100%" />
              <DropdownField label="Status" value={item.status} options={STATUS_OPTIONS} onChangeValue={(v) => updatePhoto(idx, 'status', v)} width="100%" />
              <View className="flex-row items-center mt-2 mb-2">
                <Checkbox.Android status={item.internal_data ? 'checked' : 'unchecked'} onPress={() => updatePhoto(idx, 'internal_data', !item.internal_data)} />
                <Text className="text-body text-textPrimary ml-2">Internal Data?</Text>
              </View>
              <View className="mt-2">
                <PhotoSlot label="Upload Photo" uri={item.photo} onChange={(uri) => updatePhoto(idx, 'photo', uri)} />
              </View>
            </View>
          ))}
        </View>
        <Button mode="outlined" icon="plus" onPress={addPhoto} style={{ marginTop: 8, alignSelf: 'flex-start', borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{useLanguage().language === 'en' ? 'Add Photo Journal Type' : '添加图片日志'}</Button>
      </SectionCard>
    </View>
  );
}
