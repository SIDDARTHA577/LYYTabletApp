import React from 'react';
import { View, Text } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { DateField } from '../../../components/form/DateField';
import { NumberField } from '../../../components/form/NumberField';
import { DropdownField } from '../../../components/form/DropdownField';
import { TextField } from '../../../components/form/TextField';
import { TextAreaField } from '../../../components/form/TextAreaField';
import type { PpMeetingData } from '../../../features/ppMeeting/types';

type Data = PpMeetingData['size_set_inspection'];

const ACCESSORY_ITEMS = [
  'Main Label', 'Book Fold', 'Factory Code', 'Hang Tag', 'Hanger', 'Washcare', 'Interlining',
  'Polybag', 'Poly Bag Sticker', 'Lot Sticker', 'Pre-pack Sticker', 'Carton Markings',
  'Placement UPC / P.Pack', 'Folding', 'Spare Button Position', 'Button', 'Hook Eye / Bar',
  'Lace', 'Buckle', 'Snap', 'Thread', 'Lining', 'Zipper', 'Print', 'Layout',
  'Emb Thread Colour', 'Placement', 'Beads / Sequins', 'Beads/Sequins Layout', 'After Treatment', 'PH', 'Pattern Check'
];

const PATTERN_ITEMS = [
  'Grain Line', 'Notches', 'Graded Nest', 'Corrections Implemented', 'YY / Mini Marker'
];

const MEASUREMENT_ITEMS = [
  { key: 'Measurement Result', label: 'Measurement Result', labelCn: '尺寸结果', options: [{ value: 'Pass', label: 'Pass / 通过' }, { value: 'Fail', label: 'Fail / 不通过' }, { value: 'N/A', label: 'N/A / 不适用' }] },
  { key: 'Graded Nest', label: 'Graded Nest', labelCn: '放码套图', options: [{ value: 'OK', label: 'OK / 合格' }, { value: 'Not OK', label: 'Not OK / 不合格' }, { value: 'N/A', label: 'N/A / 不适用' }] },
  { key: 'Cutting Check', label: 'Cutting Check', labelCn: '裁剪检查', options: [{ value: 'OK', label: 'OK / 合格' }, { value: 'Not OK', label: 'Not OK / 不合格' }, { value: 'N/A', label: 'N/A / 不适用' }] },
  { key: 'Seam Allowance', label: 'Seam Allowance', labelCn: '缝份', options: [{ value: 'OK', label: 'OK / 合格' }, { value: 'Not OK', label: 'Not OK / 不合格' }, { value: 'N/A', label: 'N/A / 不适用' }] },
  { key: 'Corrections Implemented', label: 'Corrections Implemented', labelCn: '已实施修正', options: [] },
  { key: 'Shrinkage', label: 'Shrinkage', labelCn: '缩率', options: [{ value: 'OK', label: 'OK / 合格' }, { value: 'Not OK', label: 'Not OK / 不合格' }, { value: 'N/A', label: 'N/A / 不适用' }] }
];

export function Section12SizeSetInspection({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const ACCESSORY_OPTIONS = [
    { value: 'Missing', label: 'Missing / 缺失' },
    { value: 'Alternative', label: 'Alternative / 替代' },
    { value: 'Actual', label: 'Actual / 实际' },
    { value: 'Placement', label: 'Placement / 仅标记位置' }
  ];

  const OK_NOT_OK_OPTIONS = [
    { value: 'OK', label: 'OK / 合格' },
    { value: 'Not OK', label: 'Not OK / 不合格' },
    { value: 'N/A', label: 'N/A / 不适用' }
  ];

  const updateAccessory = (item: string, val: string) => {
    onChange({
      accessories_check: {
        ...(data.accessories_check || {}),
        [item]: val
      }
    });
  };

  const updatePattern = (item: string, val: string) => {
    onChange({
      pattern_check: {
        ...(data.pattern_check || {}),
        [item]: val
      }
    });
  };

  const updateMeasurement = (item: string, val: string) => {
    onChange({
      measurement_and_result: {
        ...(data.measurement_and_result || {}),
        [item]: val
      }
    });
  };

  return (
    <View>
      <SectionCard title="Size Set Dates & Quantities" subtitle="码组时间与数量">
        <FormRow>
          <DateField label="Size Set Planned Date" labelCn="码组计划日" value={data.size_set_planned_date} onChangeValue={(v) => onChange({ size_set_planned_date: v })} />
          <DateField label="Actual Submission Date" labelCn="实际提交日" value={data.actual_submission_date} onChangeValue={(v) => onChange({ actual_submission_date: v })} />
          <DateField label="PCD" labelCn="生产协调日" value={data.pcd_date} onChangeValue={(v) => onChange({ pcd_date: v })} />
          <NumberField label="Cut Quantity" labelCn="裁剪数量" value={data.cut_qty} onChangeValue={(v) => onChange({ cut_qty: v })} />
        </FormRow>
      </SectionCard>

      <SectionCard title="Accessories Check" subtitle="辅料检查">
        {ACCESSORY_ITEMS.map((item) => (
          <View key={item} className="mb-4 border-b border-border pb-3 flex-row flex-wrap items-center justify-between gap-4">
            <Text className="text-body font-bold text-textPrimary">{item}</Text>
            {item === 'After Treatment' ? (
              <View className="w-[40%]">
                <SegmentedButtons
                  value={data.accessories_check?.[item] || ''}
                  onValueChange={(v) => updateAccessory(item, v)}
                  buttons={ACCESSORY_OPTIONS}
                  density="small"
                />
              </View>
            ) : (
              <DropdownField label="Finding" value={data.accessories_check?.[item] || ''} options={ACCESSORY_OPTIONS} onChangeValue={(v) => updateAccessory(item, v || '')} width="40%" />
            )}
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Pattern Check" subtitle="纸样检查">
        {PATTERN_ITEMS.map((item) => (
          <View key={item} className="mb-4 border-b border-border pb-3 flex-row flex-wrap items-center justify-between gap-4">
            <Text className="text-body font-bold text-textPrimary">{item}</Text>
            {item === 'Corrections Implemented' ? (
              <TextField label="Result" value={data.pattern_check?.[item] || ''} onChangeText={(v) => updatePattern(item, v)} width="40%" />
            ) : (
              <DropdownField label="Result" value={data.pattern_check?.[item] || ''} options={OK_NOT_OK_OPTIONS} onChangeValue={(v) => updatePattern(item, v || '')} width="40%" />
            )}
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Measurement & Result" subtitle="尺寸与结果">
        {MEASUREMENT_ITEMS.map((item) => (
          <View key={item.key} className="mb-4 border-b border-border pb-3 flex-row flex-wrap items-center justify-between gap-4">
            <View>
              <Text className="text-body font-bold text-textPrimary">{item.label}</Text>
              <Text className="text-caption text-textSecondary">{item.labelCn}</Text>
            </View>
            {item.key === 'Corrections Implemented' ? (
              <TextField label="Result" value={data.measurement_and_result?.[item.key] || ''} onChangeText={(v) => updateMeasurement(item.key, v)} width="40%" />
            ) : (
              <DropdownField label="Result" value={data.measurement_and_result?.[item.key] || ''} options={item.options} onChangeValue={(v) => updateMeasurement(item.key, v || '')} width="40%" />
            )}
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Corrections" subtitle="待修正/恢复至规格">
        <TextAreaField label="Corrections to be done / bring back to specs" labelCn="待修正/恢复至规格" value={data.corrections_to_be_done} onChangeText={(v) => onChange({ corrections_to_be_done: v })} />
      </SectionCard>
    </View>
  );
}
