import React from 'react';
import { View, Text } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { DropdownField } from '../../../components/form/DropdownField';
import { TextField } from '../../../components/form/TextField';
import { FormRow } from '../../../components/form/FormRow';
import type { PpMeetingData } from '../../../features/ppMeeting/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = PpMeetingData['fabric_review'];

const FABRIC_REVIEW_ITEMS = [
  { id: 1, label: 'Shade band available during fabric inspection', labelCn: '面料检验时备有色档' },
  { id: 2, label: '100% shade grouping done', labelCn: '已做100%色组' },
  { id: 3, label: 'Fabric inspection done — average point count', labelCn: '已做面料检验—平均评分' },
  { id: 4, label: 'Fabric testing report', labelCn: '面料测试报告' },
  { id: 5, label: 'Garment testing report', labelCn: '成衣测试报告' },
  { id: 6, label: 'Skewing / Bowing test — Skew/Bow %', labelCn: '纬斜/弓纬测试—百分比' },
  { id: 7, label: 'Side/Center & End/End shading checked', labelCn: '边中差与缸差检查' },
  { id: 8, label: 'Shrinkage test done', labelCn: '缩率测试' },
  { id: 9, label: 'Approved wash standard available', labelCn: '批准洗水标准' },
  { id: 10, label: 'Wash recipe availability', labelCn: '洗水配方' },
  { id: 11, label: 'Colour blanket / shade grouping done', labelCn: '色卡/色组归类' }
];

export function Section7FabricReview({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const { language } = useLanguage();

  const updateChecklist = (id: number, field: 'status' | 'remarks', value: string) => {
    const key = String(id);
    const checklist = data.checklist || {};
    const current = checklist[key] || { status: '', remarks: '' };
    onChange({
      checklist: {
        ...checklist,
        [key]: { ...current, [field]: value }
      }
    });
  };

  const updateProperty = (field: string, value: string) => {
    onChange({
      properties: {
        ...(data.properties || {}),
        [field]: value
      }
    } as any);
  };

  const addShrinkage = () => {
    onChange({
      shrinkage_by_colour: [...(data.shrinkage_by_colour || []), { colour: '', shrinkage: '', notes: '' }]
    });
  };

  const updateShrinkage = (idx: number, field: string, value: string) => {
    const updated = [...(data.shrinkage_by_colour || [])];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange({ shrinkage_by_colour: updated });
  };

  const removeShrinkage = (idx: number) => {
    const updated = [...(data.shrinkage_by_colour || [])];
    updated.splice(idx, 1);
    onChange({ shrinkage_by_colour: updated });
  };

  const STATUS_OPTIONS = [
    { value: 'Yes', label: 'Yes / 是' },
    { value: 'No', label: 'No / 否' },
    { value: 'N/A', label: 'N/A / 不适用' }
  ];

  return (
    <View>
      <SectionCard title="Fabric Review Checklist" subtitle="面料评审清单">
        {FABRIC_REVIEW_ITEMS.map((item) => {
          const checklist = data.checklist || {};
          const current = checklist[String(item.id)] || { status: '', remarks: '' };
          return (
            <View key={item.id} className="mb-4 border-b border-border pb-3 flex-row flex-wrap items-center gap-4">
              <View className="w-[40%]">
                <Text className="text-body font-bold text-textPrimary">{item.id}. {item.label}</Text>
                <Text className="text-caption text-textSecondary">{item.labelCn}</Text>
              </View>
              <DropdownField label="Status" value={current.status} options={STATUS_OPTIONS} onChangeValue={(v) => updateChecklist(item.id, 'status', v || '')} width="25%" />
              <TextField label="Comments / Value" labelCn="评语/数值" value={current.remarks} onChangeText={(v) => updateChecklist(item.id, 'remarks', v)} width="30%" />
            </View>
          );
        })}
      </SectionCard>

      <SectionCard title="Fabric Properties" subtitle="面料特性">
        <FormRow>
          <TextField label="Bowing" labelCn="弓纬" value={data.properties?.bowing} onChangeText={(v) => updateProperty('bowing', v)} />
          <TextField label="Skewing" labelCn="纬斜" value={data.properties?.skewing} onChangeText={(v) => updateProperty('skewing', v)} />
          <TextField label="Repeat Variation" labelCn="循环差异" value={data.properties?.repeat_variation} onChangeText={(v) => updateProperty('repeat_variation', v)} />
          <TextField label="Fraying" labelCn="脱纱" value={data.properties?.fraying} onChangeText={(v) => updateProperty('fraying', v)} />
          <TextField label="Shade Variation" labelCn="色差" value={data.properties?.shade_variation} onChangeText={(v) => updateProperty('shade_variation', v)} />
          <TextField label="Yarn Pulling" labelCn="纱线抽丝" value={data.properties?.yarn_pulling} onChangeText={(v) => updateProperty('yarn_pulling', v)} />
          <TextField label="Visual Rejection %" labelCn="目视不良率" value={data.properties?.visual_rejection_pct} onChangeText={(v) => updateProperty('visual_rejection_pct', v)} />
        </FormRow>
      </SectionCard>

      <SectionCard title="Shrinkage by Colour" subtitle="各色缩率">
        {(data.shrinkage_by_colour || []).map((item, idx) => (
          <View key={idx} className="mb-3 flex-row items-center gap-3">
            <TextField label="Colour" labelCn="颜色" value={item.colour} onChangeText={(v) => updateShrinkage(idx, 'colour', v)} width="30%" />
            <TextField label="Shrinkage" labelCn="缩率" value={item.shrinkage} onChangeText={(v) => updateShrinkage(idx, 'shrinkage', v)} width="30%" />
            <TextField label="Patterns / Notes" labelCn="样板/备注" value={item.notes} onChangeText={(v) => updateShrinkage(idx, 'notes', v)} width="30%" />
            <IconButton icon="delete" iconColor={tokens.color.danger} style={{ marginTop: 24 }} onPress={() => removeShrinkage(idx)} />
          </View>
        ))}
        <Button mode="outlined" icon="plus" style={{ borderColor: tokens.color.primary, borderRadius: tokens.radius.md, alignSelf: 'flex-start', marginTop: 8 }} onPress={addShrinkage}>
          {language === 'en' ? 'Add Color Shrinkage' : '添加色缩率'}
        </Button>
      </SectionCard>
    </View>
  );
}
