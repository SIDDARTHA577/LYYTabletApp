import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { Button, Checkbox, Modal, Portal, Text } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { DateField } from '../../../components/form/DateField';
import { TextField } from '../../../components/form/TextField';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = InlineInspectionData['pp_sample'];

// Common PP-sample comment pairs an inspector can import instead of typing
// both languages out by hand.
const COMMENT_PRESETS = [
  { cn: 'PP版仓工厂提供，工厂没有模拟试身', en: 'PPS IS FROM FTY,NOT M.E. FTY FAILS TO PROVIDE DUMMY FOR CHECKING FITTING.' },
  { cn: 'PP版仓工厂提供，不是M.E.', en: 'PPS IS FROM FTY,NOT M.E.' },
];

function ImportCommentModal({
  visible,
  onDismiss,
  onSubmit,
}: {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (preset: { cn: string; en: string }) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{ backgroundColor: tokens.color.surface, margin: 20, borderRadius: tokens.radius.md, maxWidth: 720, alignSelf: 'center', width: '100%' }}
      >
        <View className="flex-row items-center justify-between border-b border-border px-5 py-4">
          <Text className="text-h3 font-bold text-textPrimary">PP Sample Comment</Text>
        </View>
        <View className="flex-row border-b border-border bg-background px-5 py-2">
          <RNText className="w-10" />
          <RNText className="flex-1 font-semibold text-textSecondary">Chinese Comment</RNText>
          <RNText className="flex-1 font-semibold text-textSecondary">English Comment</RNText>
        </View>
        {COMMENT_PRESETS.map((preset, idx) => (
          <View
            key={idx}
            className="flex-row items-center border-b border-border px-5 py-3"
            style={{ backgroundColor: selected === idx ? tokens.color.background : 'transparent' }}
          >
            <View className="w-10">
              <Checkbox.Android status={selected === idx ? 'checked' : 'unchecked'} onPress={() => setSelected(idx)} />
            </View>
            <RNText className="flex-1 pr-3 text-body text-textPrimary" onPress={() => setSelected(idx)}>
              {preset.cn}
            </RNText>
            <RNText className="flex-1 text-body text-textPrimary" onPress={() => setSelected(idx)}>
              {preset.en}
            </RNText>
          </View>
        ))}
        <View className="flex-row justify-end gap-2 px-5 py-4">
          <Button mode="text" onPress={onDismiss}>
            Close
          </Button>
          <Button
            mode="contained"
            disabled={selected === null}
            onPress={() => {
              if (selected !== null) onSubmit(COMMENT_PRESETS[selected]);
              setSelected(null);
            }}
          >
            Submit
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

export function Section3PpSample({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const [importVisible, setImportVisible] = useState(false);

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
          <View className="w-full flex-row items-end gap-2 mb-4 px-1.5">
            <View className="flex-1">
              <TextField label="Comment (Chinese)" labelCn="备注（中文）" value={data.comment_cn} onChangeText={(v) => onChange({ comment_cn: v })} width="100%" />
            </View>
            <Button mode="outlined" icon="import" onPress={() => setImportVisible(true)} style={{ height: 44, justifyContent: 'center' }}>
              Import
            </Button>
          </View>
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

      <ImportCommentModal
        visible={importVisible}
        onDismiss={() => setImportVisible(false)}
        onSubmit={(preset) => {
          onChange({ comment_cn: preset.cn, comment_en: preset.en });
          setImportVisible(false);
        }}
      />
    </View>
  );
}
