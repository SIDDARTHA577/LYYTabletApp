import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { DropdownField } from '../../../components/form/DropdownField';
import type { DailyCheckData } from '../../../features/dailyCheck/types';

type Data = DailyCheckData['defect_checklist'];

const STATUS_OPTIONS = ['OK', 'Defect', 'N/A'];

const FABRIC_DEFECTS = [
  { key: 'Holes / Damage', label: 'Holes / Damage', labelCn: '破洞/损伤' },
  { key: 'Soiling', label: 'Soiling', labelCn: '污染' },
  { key: 'Flaws', label: 'Flaws', labelCn: '瑕疵' },
  { key: 'Dyeing Defects', label: 'Dyeing Defects', labelCn: '染色缺陷' },
  { key: 'Barre', label: 'Barre', labelCn: '横档' },
  { key: 'Embroidery', label: 'Embroidery', labelCn: '绣花' },
  { key: 'Layout', label: 'Layout', labelCn: '排版' },
  { key: 'Emb Thread Colour', label: 'Emb Thread Colour', labelCn: '绣线颜色' },
  { key: 'Placement', label: 'Placement', labelCn: '位置' },
  { key: 'Broken Emb', label: 'Broken Emb', labelCn: '断绣' },
  { key: 'Beads / Sequins', label: 'Beads / Sequins', labelCn: '珠片' },
];

const SEWING_DEFECTS = [
  { key: 'Open Seams', label: 'Open Seams', labelCn: '爆缝' },
  { key: 'Weak Seams', label: 'Weak Seams', labelCn: '弱缝' },
  { key: 'Raw Edges', label: 'Raw Edges', labelCn: '毛边' },
  { key: 'Puckering', label: 'Puckering', labelCn: '起皱' },
  { key: 'Wavy Stitches', label: 'Wavy Stitches', labelCn: '波浪线迹' },
  { key: 'Skip / Broken Stitches', label: 'Skip / Broken Stitches', labelCn: '跳针/断线' },
  { key: 'Uneven Hem', label: 'Uneven Hem', labelCn: '下摆不齐' },
  { key: 'Mis-Aligned Parts', label: 'Mis-Aligned Parts', labelCn: '部件错位' },
  { key: 'After Treatment', label: 'After Treatment', labelCn: '后处理' },
  { key: 'Lot Segregation', label: 'Lot Segregation', labelCn: '分缸' },
  { key: 'Handfeel', label: 'Handfeel', labelCn: '手感' },
  { key: 'PH', label: 'PH', labelCn: '酸碱值' },
];

const GARMENT_DEFECTS = [
  { key: 'Colour Variation', label: 'Colour Variation', labelCn: '色差' },
  { key: 'Defective Zip / Puller', label: 'Defective Zip / Puller', labelCn: '拉链/拉头不良' },
  { key: 'Loose Buttons', label: 'Loose Buttons', labelCn: '纽扣松动' },
  { key: 'Unclean Button Hole', label: 'Unclean Button Hole', labelCn: '扣眼不洁' },
  { key: 'Uncut Threads', label: 'Uncut Threads', labelCn: '未剪线头' },
  { key: 'Defective Snaps', label: 'Defective Snaps', labelCn: '四合扣不良' },
  { key: 'Dead Crease', label: 'Dead Crease', labelCn: '死折' },
  { key: 'Poor Pressing', label: 'Poor Pressing', labelCn: '整烫不良' },
  { key: 'Poor Tie End', label: 'Poor Tie End', labelCn: '打结不良' },
];

export function Section7DefectChecklist({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Fabric Defects" subtitle="Select OK / Defect / N/A">
        <FormRow>
          {FABRIC_DEFECTS.map((def) => (
            <DropdownField
              key={def.key}
              label={def.label}
              labelCn={def.labelCn}
              value={data[def.key] || ''}
              options={STATUS_OPTIONS}
              onChangeValue={(v) => onChange({ [def.key]: v as any })}
            />
          ))}
        </FormRow>
      </SectionCard>
      
      <SectionCard title="Sewing Defects" subtitle="Select OK / Defect / N/A">
        <FormRow>
          {SEWING_DEFECTS.map((def) => (
            <DropdownField
              key={def.key}
              label={def.label}
              labelCn={def.labelCn}
              value={data[def.key] || ''}
              options={STATUS_OPTIONS}
              onChangeValue={(v) => onChange({ [def.key]: v as any })}
            />
          ))}
        </FormRow>
      </SectionCard>
      
      <SectionCard title="Garment Defects" subtitle="Select OK / Defect / N/A">
        <FormRow>
          {GARMENT_DEFECTS.map((def) => (
            <DropdownField
              key={def.key}
              label={def.label}
              labelCn={def.labelCn}
              value={data[def.key] || ''}
              options={STATUS_OPTIONS}
              onChangeValue={(v) => onChange({ [def.key]: v as any })}
            />
          ))}
        </FormRow>
      </SectionCard>
    </View>
  );
}
