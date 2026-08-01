import React from 'react';
import { View, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { DropdownField } from '../../../components/form/DropdownField';
import { TextField } from '../../../components/form/TextField';
import type { DailyCheckData } from '../../../features/dailyCheck/types';
import tokens from '../../../theme/tokens';

type Data = DailyCheckData['bulk_conformity'];

const CHECK_POINTS = [
  { key: 'Fit on dummy', label: 'Fit on dummy', labelCn: '人台试身' },
  { key: 'Bulk vs tech pack workmanship', label: 'Bulk vs tech pack workmanship', labelCn: '大货对照工艺包' },
  { key: 'Bulk fabric / material', label: 'Bulk fabric / material', labelCn: '大货面料/物料' },
  { key: 'Colour / shading by size (XS–XL)', label: 'Colour / shading by size (XS–XL)', labelCn: '各尺码色差' },
  { key: 'Emb / print & placement', label: 'Emb / print & placement', labelCn: '绣印及位置' },
  { key: 'Product measurement', label: 'Product measurement', labelCn: '成衣尺寸' },
  { key: 'Bulk label / labelling vs TP', label: 'Bulk label / labelling vs TP', labelCn: '大货标签对照工艺包' },
  { key: 'Carton mark / prepack / polybag warning / packing vs document', label: 'Carton mark / prepack / polybag warning / packing vs document', labelCn: '箱唛/预包装/胶袋警示/包装对照文件' },
  { key: 'Silica gel quantity', label: 'Silica gel quantity', labelCn: '干燥剂数量' },
  { key: 'Measurement Result', label: 'Measurement Result', labelCn: '尺寸结果' },
];

export function Section9BulkConformity({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Bulk Conformity" subtitle="Conformity to standard requirements">
        <View className="flex-col gap-6 mt-2">
          {CHECK_POINTS.map((cp) => (
            <View key={cp.key} className="flex-col gap-2">
              <Text className="text-body font-medium" style={{ color: tokens.color.textPrimary }}>
                {cp.label}
              </Text>
              <Text className="text-caption" style={{ color: tokens.color.textSecondary, marginTop: -4 }}>
                {cp.labelCn}
              </Text>
              <View className="flex-row gap-4 items-start z-10" style={{ zIndex: 100 - CHECK_POINTS.indexOf(cp) }}>
                <View style={{ flex: 1 }}>
                  <DropdownField
                    label="Status"
                    labelCn="状态"
                    value={data[cp.key]?.status || ''}
                    options={['OK', 'Not OK', 'N/A']}
                    onChangeValue={(v) => onChange({ [cp.key]: { ...(data[cp.key] || { comment: '' }), status: v } })}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <TextField
                    label="Comment"
                    labelCn="备注"
                    value={data[cp.key]?.comment || ''}
                    onChangeText={(v) => onChange({ [cp.key]: { ...(data[cp.key] || { status: '' }), comment: v } })}
                    width="100%"
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </SectionCard>
    </View>
  );
}
