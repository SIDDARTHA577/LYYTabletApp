import React from 'react';
import { View, Text } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { TextField } from '../../../components/form/TextField';
import { DateField } from '../../../components/form/DateField';
import type { PpMeetingData } from '../../../features/ppMeeting/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = PpMeetingData['follow_up_actions'];

const THINGS_TO_FOLLOW_ITEMS = [
  'QA Lab Top Sample',
  'Merchant Top Sample',
  'Wash & Wear Garments',
  'GPT Closure',
  'GPT Counter'
];

export function Section14FollowUpActions({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const { language } = useLanguage();

  const addAction = () => {
    onChange({
      actions: [...(data.actions || []), { action: '', responsible: '', due_date: '' }]
    });
  };

  const updateAction = (index: number, field: string, value: string) => {
    const updated = [...(data.actions || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ actions: updated });
  };

  const removeAction = (index: number) => {
    const updated = [...(data.actions || [])];
    updated.splice(index, 1);
    onChange({ actions: updated });
  };

  const updateThingToFollow = (item: string, field: 'responsibility' | 'due_date', value: string) => {
    const things = data.things_to_follow || {};
    const current = things[item] || { responsibility: '', due_date: '' };
    onChange({
      things_to_follow: {
        ...things,
        [item]: { ...current, [field]: value }
      }
    });
  };

  const addFptStatus = () => {
    onChange({
      fpt_status_by_colour: [...(data.fpt_status_by_colour || []), { colour: '', status: '' }]
    });
  };

  const updateFptStatus = (index: number, field: string, value: string) => {
    const updated = [...(data.fpt_status_by_colour || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ fpt_status_by_colour: updated });
  };

  const removeFptStatus = (index: number) => {
    const updated = [...(data.fpt_status_by_colour || [])];
    updated.splice(index, 1);
    onChange({ fpt_status_by_colour: updated });
  };

  return (
    <View>
      <SectionCard title="Follow-up Actions" subtitle="跟进事项">
        {(data.actions || []).map((item, idx) => (
          <View key={idx} className="mb-3 flex-row items-center gap-3">
            <TextField label="Action" labelCn="事项" value={item.action} onChangeText={(v) => updateAction(idx, 'action', v)} width="35%" />
            <TextField label="Responsible" labelCn="责任人" value={item.responsible} onChangeText={(v) => updateAction(idx, 'responsible', v)} width="30%" />
            <DateField label="Due Date" labelCn="完成日期" value={item.due_date} onChangeValue={(v) => updateAction(idx, 'due_date', v || '')} width="25%" />
            <IconButton icon="delete" iconColor={tokens.color.danger} style={{ marginTop: 24 }} onPress={() => removeAction(idx)} />
          </View>
        ))}
        <Button mode="outlined" icon="plus" style={{ borderColor: tokens.color.primary, borderRadius: tokens.radius.md, alignSelf: 'flex-start' }} onPress={addAction}>
          {language === 'en' ? 'Add Action' : '添加事项'}
        </Button>
      </SectionCard>

      <SectionCard title="Things to follow" subtitle="待跟进样品/报告">
        {THINGS_TO_FOLLOW_ITEMS.map((item) => {
          const current = data.things_to_follow?.[item] || { responsibility: '', due_date: '' };
          return (
            <View key={item} className="mb-4 border-b border-border pb-3 flex-row flex-wrap items-center gap-4">
              <View className="w-[35%]">
                <Text className="text-body font-bold text-textPrimary">{item}</Text>
              </View>
              <TextField label="Responsibility" labelCn="责任" value={current.responsibility} onChangeText={(v) => updateThingToFollow(item, 'responsibility', v)} width="30%" />
              <DateField label="Due Date" labelCn="完成日期" value={current.due_date} onChangeValue={(v) => updateThingToFollow(item, 'due_date', v || '')} width="30%" />
            </View>
          );
        })}
      </SectionCard>

      <SectionCard title="FPT Report Status by Colour" subtitle="各色面料测试状态">
        {(data.fpt_status_by_colour || []).map((item, idx) => (
          <View key={idx} className="mb-3 flex-row items-center gap-3">
            <TextField label="Colour" labelCn="颜色" value={item.colour} onChangeText={(v) => updateFptStatus(idx, 'colour', v)} width="45%" />
            <TextField label="FPT Status" labelCn="状态" value={item.status} onChangeText={(v) => updateFptStatus(idx, 'status', v)} width="45%" />
            <IconButton icon="delete" iconColor={tokens.color.danger} style={{ marginTop: 24 }} onPress={() => removeFptStatus(idx)} />
          </View>
        ))}
        <Button mode="outlined" icon="plus" style={{ borderColor: tokens.color.primary, borderRadius: tokens.radius.md, alignSelf: 'flex-start', marginTop: 8 }} onPress={addFptStatus}>
          {language === 'en' ? 'Add FPT Status' : '添加FPT状态'}
        </Button>
      </SectionCard>
    </View>
  );
}
