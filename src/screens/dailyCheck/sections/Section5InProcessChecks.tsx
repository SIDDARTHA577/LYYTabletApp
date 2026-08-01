import React from 'react';
import { View, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { DropdownField } from '../../../components/form/DropdownField';
import { TextField } from '../../../components/form/TextField';
import type { DailyCheckData } from '../../../features/dailyCheck/types';
import tokens from '../../../theme/tokens';

type Data = DailyCheckData['in_process_checks'];

const CHECK_POINTS = [
  { key: 'Cutting layer height & flatness', label: 'Cutting layer height & flatness', labelCn: '裁剪层高度与平整度' },
  { key: 'Cutting panel size & top/bottom offset', label: 'Cutting panel size & top/bottom offset', labelCn: '裁片尺寸与上下偏移' },
  { key: 'Plaid / stripe alignment', label: 'Plaid / stripe alignment', labelCn: '格子/条纹对位' },
  { key: 'Cutting data / progress', label: 'Cutting data / progress', labelCn: '裁剪数据/进度' },
  { key: 'Sewing workmanship vs tech pack', label: 'Sewing workmanship vs tech pack', labelCn: '缝制工艺对照工艺包' },
  { key: 'Sewing data / schedule / headcount', label: 'Sewing data / schedule / headcount', labelCn: '缝制数据/排期/人数' },
  { key: 'Bulk pressing meets requirement', label: 'Bulk pressing meets requirement', labelCn: '大货整烫符合要求' },
  { key: 'Final process meets requirement', label: 'Final process meets requirement', labelCn: '后道工序符合要求' },
  { key: 'Labelling / placement / sizes / colours / folding / carton mark', label: 'Labelling / placement / sizes / colours / folding / carton mark', labelCn: '标签/位置/尺码/颜色/折叠/箱唛' },
  { key: 'Packaging — no bulging / dead space', label: 'Packaging — no bulging / dead space', labelCn: '包装—无鼓胀/无空隙' },
  { key: 'Final packing 100% in carton', label: 'Final packing 100% in carton', labelCn: '100%入箱包装' },
  { key: 'Sub-contract packing recorded back to factory', label: 'Sub-contract packing recorded back to factory', labelCn: '外发包装回厂记录' },
];

export function Section5InProcessChecks({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="In-Process Checks" subtitle="Verification of production processes">
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
