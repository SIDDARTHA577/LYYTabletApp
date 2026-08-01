import React from 'react';
import { View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { TextField } from '../../../components/form/TextField';
import { DropdownField } from '../../../components/form/DropdownField';
import type { PpMeetingData } from '../../../features/ppMeeting/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = PpMeetingData['participants'];

export function Section3Participants({ data, onChange }: { data: Data; onChange: (next: Data) => void }) {
  const { language } = useLanguage();

  const addParticipant = () => {
    onChange([...(data || []), { name: '', title: '', side: '', signature: '' }]);
  };

  const updateParticipant = (index: number, field: string, value: any) => {
    const updated = [...(data || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeParticipant = (index: number) => {
    const updated = [...(data || [])];
    updated.splice(index, 1);
    onChange(updated);
  };

  const SIDE_OPTIONS = [
    { value: 'Factory', label: 'Factory / 工厂' },
    { value: 'Brand', label: 'Brand / 品牌' },
    { value: 'Vendor', label: 'Vendor / 供应商' }
  ];

  return (
    <View>
      <SectionCard title="Participants" subtitle="参会人员 (List factory-side and brand/QA-side attendees)">
        {(data || []).map((item, idx) => (
          <View key={idx} className="mb-4 border border-border p-4 rounded-md bg-background flex-row flex-wrap items-center gap-4">
            <TextField label="Name" labelCn="姓名" value={item.name} onChangeText={(v) => updateParticipant(idx, 'name', v)} width="22%" />
            <TextField label="Title / Function" labelCn="职务/职能" value={item.title} onChangeText={(v) => updateParticipant(idx, 'title', v)} width="22%" />
            <TextField label="Side" labelCn="方" value={item.side} onChangeText={(v) => updateParticipant(idx, 'side', v)} width="22%" />
            <TextField label="Signature (Initial)" labelCn="签名" value={item.signature} onChangeText={(v) => updateParticipant(idx, 'signature', v)} width="22%" />
            <IconButton icon="delete" iconColor={tokens.color.danger} onPress={() => removeParticipant(idx)} />
          </View>
        ))}
        <Button mode="outlined" icon="plus" style={{ borderColor: tokens.color.primary, borderRadius: tokens.radius.md, alignSelf: 'flex-start' }} onPress={addParticipant}>
          {language === 'en' ? 'Add Participant' : '添加人员'}
        </Button>
      </SectionCard>
    </View>
  );
}
