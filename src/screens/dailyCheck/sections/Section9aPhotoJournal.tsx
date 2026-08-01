import React from 'react';
import { View, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import type { DailyCheckData } from '../../../features/dailyCheck/types';
import tokens from '../../../theme/tokens';

type Data = DailyCheckData['photo_journal'];

const PHOTO_CATEGORIES = [
  { key: 'cutting_floor', label: 'Cutting Floor', labelCn: '裁剪车间' },
  { key: 'sewing_line', label: 'Sewing Line', labelCn: '缝制线' },
  { key: 'pressing_finishing', label: 'Pressing / Finishing', labelCn: '整烫/后整' },
  { key: 'labelling', label: 'Labelling', labelCn: '标签' },
  { key: 'packing_carton', label: 'Packing / Carton', labelCn: '包装/纸箱' },
  { key: 'defect', label: 'Defect', labelCn: '缺陷' },
  { key: 'colour_shading', label: 'Colour / Shading', labelCn: '色差' },
  { key: 'measurement', label: 'Measurement', labelCn: '尺寸测量' },
] as const;

export function Section9aPhotoJournal({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  // Render in pairs for 2-column layout
  const rows = [];
  for (let i = 0; i < PHOTO_CATEGORIES.length; i += 2) {
    rows.push(PHOTO_CATEGORIES.slice(i, i + 2));
  }

  return (
    <View>
      <SectionCard title="Photo Journal" subtitle="照片记录">
        <View className="flex-col gap-6 mt-4">
          {rows.map((row, idx) => (
            <View key={idx} className="flex-row justify-around border-b border-border pb-6" style={{ borderColor: tokens.color.border }}>
              {row.map((cat) => (
                <View key={cat.key} className="flex-1 items-center">
                  <View className="w-full bg-surface border-b border-border py-2 mb-4" style={{ backgroundColor: tokens.color.background, borderColor: tokens.color.border }}>
                    <Text className="text-center text-body font-medium" style={{ color: tokens.color.textPrimary }}>
                      {cat.label} {cat.labelCn}
                    </Text>
                  </View>
                  <PhotoSlot
                    label="Attach photo here 粘贴照片"
                    uri={data[cat.key] || null}
                    onChange={(uri) => onChange({ [cat.key]: uri })}
                  />
                </View>
              ))}
              {/* Pad if odd number of items, though we have 8 so it's even */}
              {row.length === 1 && <View className="flex-1" />}
            </View>
          ))}
        </View>
      </SectionCard>
    </View>
  );
}
