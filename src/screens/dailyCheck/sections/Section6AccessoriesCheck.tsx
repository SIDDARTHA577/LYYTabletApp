import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { DropdownField } from '../../../components/form/DropdownField';
import type { DailyCheckData } from '../../../features/dailyCheck/types';

type Data = DailyCheckData['accessories_check'];

import { COMMON_STATUS_OPTIONS as STATUS_OPTIONS } from '../../../constants/statusOptions';
const ACCESSORIES = [
  { key: 'Main Label', label: 'Main Label', labelCn: '主唛' },
  { key: 'Care Label', label: 'Care Label', labelCn: '洗水唛' },
  { key: 'Price Ticket', label: 'Price Ticket', labelCn: '价格标' },
  { key: 'Hang Tag', label: 'Hang Tag', labelCn: '吊牌' },
  { key: 'Hanger', label: 'Hanger', labelCn: '衣架' },
  { key: 'Security Label', label: 'Security Label', labelCn: '防伪标' },
  { key: 'Interlining', label: 'Interlining', labelCn: '衬布' },
  { key: 'Fold Method', label: 'Fold Method', labelCn: '折叠方式' },
  { key: 'Polybag', label: 'Polybag', labelCn: '胶袋' },
  { key: 'Polybag Sticker', label: 'Polybag Sticker', labelCn: '胶袋贴' },
  { key: 'Lot Sticker', label: 'Lot Sticker', labelCn: '缸号贴' },
  { key: 'Carton Markings', label: 'Carton Markings', labelCn: '箱唛' },
  { key: 'Spare Button', label: 'Spare Button', labelCn: '备用纽扣' },
  { key: 'Pre-pack', label: 'Pre-pack', labelCn: '预包装' },
  { key: 'Button', label: 'Button', labelCn: '纽扣' },
  { key: 'Hook / Eye', label: 'Hook / Eye', labelCn: '钩扣' },
  { key: 'Buckle', label: 'Buckle', labelCn: '带扣' },
  { key: 'Sewing Thread', label: 'Sewing Thread', labelCn: '缝线' },
  { key: 'Emb Thread', label: 'Emb Thread', labelCn: '绣花线' },
  { key: 'Lining', label: 'Lining', labelCn: '里布' },
  { key: 'Rivet', label: 'Rivet', labelCn: '铆钉' },
];

export function Section6AccessoriesCheck({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Accessories Check" subtitle="Select OK / Not OK / N/A per item">
        <FormRow>
          {ACCESSORIES.map((acc) => (
            <DropdownField
              key={acc.key}
              label={acc.label}
              labelCn={acc.labelCn}
              value={data[acc.key] || ''}
              options={STATUS_OPTIONS}
              onChangeValue={(v) => onChange({ [acc.key]: v as any })}
            />
          ))}
        </FormRow>
      </SectionCard>
    </View>
  );
}
