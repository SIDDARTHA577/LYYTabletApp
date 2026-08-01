import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, IconButton, Switch, Modal, Portal } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { NumberField } from '../../../components/form/NumberField';
import { DropdownField } from '../../../components/form/DropdownField';
import type { FinalInspectionData } from '../../../features/finalInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = FinalInspectionData['workmanship_defects'];

const DEFECT_TYPES = [
  'Labelling', 'Safety', 'Presentation', 'Fabric', 'Stitching', 'Componentry', 'Hang tag', 'Packing'
].map(t => ({ label: t, value: t }));

const DEFECT_POSITIONS = [
  'HOOK & EYES', 'BACK TOP EDGE', 'SHOULDER STRAP', 'WIRE', 'SLIDER', 'ARMHOLE', 'UPPER CUP', 'LOWER CUP', 'FRONT LOOP', 'CUP NECKLINE', 'CENTER FRONT', 'SIDE WING', 'BONING', 'BACK WING', 'UNDERBUST', 'BOTTOM BAND', 'WIRE CASING', 'PAD', 'DART', 'SCALLOP'
].map(t => ({ label: t, value: t }));

const SYSTEM_DEFECT_CONTENTS = [
  'Missing Label', 'Broken Stitch', 'Wrong Color', 'Hole', 'Stain'
].map(t => ({ label: t, value: t }));

const IMPROVEMENT_MEASURES_CN = [
  '加强培训', '检查机器', '更换原材料'
].map(t => ({ label: t, value: t }));

const IMPROVEMENT_MEASURES_EN = [
  'Enhance Training', 'Check Machine', 'Change Raw Material'
].map(t => ({ label: t, value: t }));

export function Section8WorkmanshipDefects({ data, onChange, productSecondaryCategory }: { data: Data; onChange: (next: Partial<Data>) => void; productSecondaryCategory?: string }) {
  const { language } = useLanguage();
  const [positionModalVisible, setPositionModalVisible] = useState(false);
  const [newPositionCn, setNewPositionCn] = useState('');
  const [newPositionEn, setNewPositionEn] = useState('');
  const [currentDefectIndex, setCurrentDefectIndex] = useState<number | null>(null);

  const addDefect = (isCustom: boolean = false) => {
    onChange({ defects: [...data.defects, { type: '', position: '', content: '', content_cn: '', content_en: '', desc_cn: '', desc_en: '', corrective_cn: '', corrective_en: '', improvement_cn: '', improvement_en: '', pre_alert: false, is_custom: isCustom }] });
  };

  const updateDefect = (index: number, field: string, value: any) => {
    const newDefects = [...data.defects];
    newDefects[index] = { ...newDefects[index], [field]: value };
    onChange({ defects: newDefects });
  };

  const removeDefect = (index: number) => {
    const newDefects = [...data.defects];
    newDefects.splice(index, 1);
    onChange({ defects: newDefects });
  };

  const openPositionModal = (index: number) => {
    setCurrentDefectIndex(index);
    setNewPositionCn('');
    setNewPositionEn('');
    setPositionModalVisible(true);
  };

  const saveNewPosition = () => {
    if (currentDefectIndex !== null) {
      updateDefect(currentDefectIndex, 'position', `${newPositionEn} / ${newPositionCn}`);
    }
    setPositionModalVisible(false);
  };

  return (
    <View>
      <SectionCard title="Defect Totals" subtitle="Total count by severity">
        <FormRow>
          <NumberField label="Critical" labelCn="严重" value={data.critical} onChangeValue={(v) => onChange({ critical: v })} />
          <NumberField label="Major" labelCn="主要" value={data.major} onChangeValue={(v) => onChange({ major: v })} />
          <NumberField label="Minor" labelCn="次要" value={data.minor} onChangeValue={(v) => onChange({ minor: v })} />
        </FormRow>
      </SectionCard>

      <SectionCard title="Workmanship Defects" subtitle="List of individual defects">
        {data.defects.length === 0 && (
          <Text className="text-body text-textSecondary italic py-4">No defects recorded.</Text>
        )}
        {data.defects.map((defect, idx) => (
          <View key={idx} className="mb-4 border border-border p-4 rounded-md bg-background">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-bold text-textPrimary">Defect #{idx + 1} {defect.is_custom ? '(Custom)' : ''}</Text>
              <IconButton icon="delete-outline" iconColor={tokens.color.danger} size={20} onPress={() => removeDefect(idx)} />
            </View>
            <FormRow>
              <DropdownField label="Type" labelCn="缺陷类型" value={defect.type} options={DEFECT_TYPES} onChangeValue={(v) => updateDefect(idx, 'type', v)} width="100%" />
              
              <View className="w-full flex-row items-end gap-2 mb-4">
                <View className="flex-1">
                  <DropdownField label="Position" labelCn="缺陷位置" value={defect.position} options={DEFECT_POSITIONS} onChangeValue={(v) => updateDefect(idx, 'position', v)} width="100%" />
                </View>
                <Button mode="outlined" onPress={() => openPositionModal(idx)} style={{ height: 44, justifyContent: 'center' }}>Add Position</Button>
              </View>

              {defect.is_custom ? (
                <>
                  <TextField label="Defect Content CN" labelCn="缺陷内容(中)" value={defect.content_cn} onChangeText={(v) => updateDefect(idx, 'content_cn', v)} width="100%" />
                  <TextField label="Defect Content EN" labelCn="缺陷内容(英)" value={defect.content_en} onChangeText={(v) => updateDefect(idx, 'content_en', v)} width="100%" />
                </>
              ) : (
                <DropdownField label="Defect Content" labelCn="缺陷内容" value={defect.content} options={SYSTEM_DEFECT_CONTENTS} onChangeValue={(v) => { updateDefect(idx, 'content', v); updateDefect(idx, 'content_en', v); updateDefect(idx, 'content_cn', v); }} width="100%" />
              )}

              <TextField label="Desc CN" labelCn="缺陷描述(中)" value={defect.desc_cn} onChangeText={(v) => updateDefect(idx, 'desc_cn', v)} width="100%" />
              <TextField label="Desc EN" labelCn="缺陷描述(英)" value={defect.desc_en} onChangeText={(v) => updateDefect(idx, 'desc_en', v)} width="100%" />
              
              <DropdownField label="Improvement CN" labelCn="改善措施(中)" value={defect.improvement_cn} options={IMPROVEMENT_MEASURES_CN} onChangeValue={(v) => updateDefect(idx, 'improvement_cn', v)} width="100%" />
              <DropdownField label="Improvement EN" labelCn="改善措施(英)" value={defect.improvement_en} options={IMPROVEMENT_MEASURES_EN} onChangeValue={(v) => updateDefect(idx, 'improvement_en', v)} width="100%" />

              <View className="flex-row items-center min-w-[200px] mt-2">
                <Switch value={defect.pre_alert} onValueChange={(v) => updateDefect(idx, 'pre_alert', v)} color={tokens.color.primary} />
                <Text className="text-body text-textPrimary ml-2">{language === 'en' ? 'Pre-Alert' : '预警'}</Text>
              </View>
            </FormRow>
          </View>
        ))}
        <View className="flex-row gap-4 mt-2">
          <Button mode="contained" icon="plus" onPress={() => addDefect(false)} style={{ borderRadius: tokens.radius.md }}>{language === 'en' ? 'Add Defect' : '添加缺陷'}</Button>
          <Button mode="outlined" icon="plus" onPress={() => addDefect(true)} style={{ borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{language === 'en' ? 'Add Custom Defect' : '添加自定义缺陷'}</Button>
        </View>
      </SectionCard>

      <Portal>
        <Modal visible={positionModalVisible} onDismiss={() => setPositionModalVisible(false)} contentContainerStyle={{ backgroundColor: tokens.color.surface, padding: 20, margin: 20, borderRadius: tokens.radius.md }}>
          <Text className="text-h3 font-bold mb-4">Add Defect Position</Text>
          <TextField label="Second Level Product Type" value={productSecondaryCategory || ''} editable={false} onChangeText={() => {}} width="100%" />
          <View className="mt-4">
            <TextField label="Defect Position CN" value={newPositionCn} onChangeText={setNewPositionCn} width="100%" />
          </View>
          <View className="mt-4 mb-6">
            <TextField label="Defect Position EN" value={newPositionEn} onChangeText={setNewPositionEn} width="100%" />
          </View>
          <View className="flex-row justify-end gap-2">
            <Button mode="text" onPress={() => setPositionModalVisible(false)}>Cancel</Button>
            <Button mode="contained" onPress={saveNewPosition}>Save</Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}
