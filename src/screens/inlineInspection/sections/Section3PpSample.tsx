import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { DateField } from '../../../components/form/DateField';
import { TextField } from '../../../components/form/TextField';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = InlineInspectionData['pp_sample'];

export function Section3PpSample({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const addPhoto = () => {
    onChange({ photos: [...data.photos, ''] });
  };

  const updatePhoto = (index: number, uri: string) => {
    const newPhotos = [...data.photos];
    newPhotos[index] = uri;
    onChange({ photos: newPhotos });
  };

  return (
    <View>
      <SectionCard title="PP Sample" subtitle="Pre-production sample details">
        <FormRow>
          <DateField label="Date" labelCn="日期" value={data.date} onChangeValue={(v) => onChange({ date: v })} />
          <TextField label="Comment (Chinese)" labelCn="备注（中文）" value={data.comment_cn} onChangeText={(v) => onChange({ comment_cn: v })} width="100%" />
          <TextField label="Comment (English)" labelCn="备注（英文）" value={data.comment_en} onChangeText={(v) => onChange({ comment_en: v })} width="100%" />
        </FormRow>
      </SectionCard>

      <SectionCard title="PP Sample Photos" subtitle="Upload PP sample image files">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {data.photos.map((photo, idx) => (
            <PhotoSlot
              key={idx}
              label={`Photo ${idx + 1}`}
              uri={photo}
              onChange={(uri) => updatePhoto(idx, uri)}
            />
          ))}
        </View>
        <Button mode="outlined" icon="plus" onPress={addPhoto} style={{ marginTop: 8, alignSelf: 'flex-start', borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{useLanguage().language === 'en' ? 'Add Photo' : '添加照片'}</Button>
      </SectionCard>
    </View>
  );
}
