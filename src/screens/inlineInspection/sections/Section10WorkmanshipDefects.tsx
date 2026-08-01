import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, IconButton, Switch, Modal, Portal, TextInput as PaperTextInput } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { NumberField } from '../../../components/form/NumberField';
import { DropdownField } from '../../../components/form/DropdownField';
import { ComboBoxField } from '../../../components/form/ComboBoxField';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

const TYPE_OPTIONS = [
  'Labelling', 'Safety', 'Presentation', 'Fabric', 'Stitching', 'Componentry', 'Hang tag', 'Packing'
].map(t => ({ label: t, value: t }));

const INITIAL_POSITION_OPTIONS = [
  'SLEEVE', 'BUTTON', 'UNDER PLACKET', 'SIDESEAM', 'UNDER SLEEVE SEAM', 'PLACKET', 'FRONT LENGTH', 'BUTTONHOLE',
  'SMALL SHOULDER', 'STANDCOLLAR', 'SLEEVE CAP/SLEEVEHEAD', 'BACKPART', 'SIDE SLIT', 'HEM/BOTTOM', 'SLEEVE OPENING',
  'ARMHOLE', 'TOPCOLLAR', 'BACK LENGTH', 'ACROSS SHOULDER', 'ACROSS FRONT',
].map(p => ({ label: p, value: p }));

const DESC_EN_OPTIONS = [
  'GLAZING', 'CRUSHING', 'STAIN', 'PEN MARK', 'CHALK MARK', 'GLUE MARKS', 'STICKER MARKS', 'DYE DEFECT', 'PRINT DEFECT',
].map(d => ({ label: d, value: d }));

const IMPROVEMENT_MEASURES_CN = [
  { label: '加强培训', value: '加强培训' },
  { label: '更换机器', value: '更换机器' },
  { label: '增加QC检查', value: '增加QC检查' }
];

const IMPROVEMENT_MEASURES_EN = [
  { label: 'Enhance training', value: 'Enhance training' },
  { label: 'Replace machine', value: 'Replace machine' },
  { label: 'Increase QC checks', value: 'Increase QC checks' }
];

type Data = InlineInspectionData['workmanship_defects'];

export function Section10WorkmanshipDefects({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const { language } = useLanguage();
  const [positionOptions, setPositionOptions] = useState(INITIAL_POSITION_OPTIONS);
  const [positionModalVisible, setPositionModalVisible] = useState(false);
  const [newPosCn, setNewPosCn] = useState('');
  const [newPosEn, setNewPosEn] = useState('');
  const [improvementCnHistory, setImprovementCnHistory] = useState(IMPROVEMENT_MEASURES_CN.map((o) => o.value));
  const [improvementEnHistory, setImprovementEnHistory] = useState(IMPROVEMENT_MEASURES_EN.map((o) => o.value));

  const commitImprovementCn = (v: string) => {
    if (v && !improvementCnHistory.includes(v)) setImprovementCnHistory([...improvementCnHistory, v]);
  };
  const commitImprovementEn = (v: string) => {
    if (v && !improvementEnHistory.includes(v)) setImprovementEnHistory([...improvementEnHistory, v]);
  };

  const addDefect = (isCustom = false) => {
    onChange({ defects: [...data.defects, { type: '', position: '', content_cn: '', content_en: '', desc_cn: '', desc_en: '', corrective_cn: '', corrective_en: '', pre_alert: false, is_custom: isCustom }] });
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

  const saveNewPosition = () => {
    if (newPosCn || newPosEn) {
      const val = newPosEn || newPosCn;
      setPositionOptions([...positionOptions, { label: val, value: val }]);
    }
    setPositionModalVisible(false);
    setNewPosCn('');
    setNewPosEn('');
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
              <DropdownField label="Type" value={defect.type} options={TYPE_OPTIONS} onChangeValue={(v) => updateDefect(idx, 'type', v)} />
              <DropdownField label="Position" value={defect.position} options={positionOptions} onChangeValue={(v) => updateDefect(idx, 'position', v)} />

              <DropdownField label="Defect Content EN" value={defect.desc_en} options={DESC_EN_OPTIONS} onChangeValue={(v) => updateDefect(idx, 'desc_en', v)} />
              <ComboBoxField
                label="Improvement Measures CN"
                value={defect.corrective_cn}
                onChangeText={(v) => updateDefect(idx, 'corrective_cn', v)}
                onCommit={commitImprovementCn}
                suggestions={improvementCnHistory}
              />
              <ComboBoxField
                label="Improvement Measures EN"
                value={defect.corrective_en}
                onChangeText={(v) => updateDefect(idx, 'corrective_en', v)}
                onCommit={commitImprovementEn}
                suggestions={improvementEnHistory}
              />
              
              <View className="flex-row items-center min-w-[200px] mt-2">
                <Switch value={defect.pre_alert} onValueChange={(v) => updateDefect(idx, 'pre_alert', v)} color={tokens.color.primary} />
                <Text className="text-body text-textPrimary ml-2">{language === 'en' ? 'Pre-Alert' : '预警'}</Text>
              </View>
            </FormRow>
          </View>
        ))}
        
        <View className="flex-row flex-wrap gap-2 mt-2">
          <Button mode="outlined" icon="plus" onPress={() => addDefect(false)} style={{ borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{language === 'en' ? 'Add Defect' : '添加缺陷'}</Button>
          <Button mode="outlined" icon="plus" onPress={() => addDefect(true)} style={{ borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{language === 'en' ? 'Add Custom Defect' : '自定义缺陷'}</Button>
          <Button mode="outlined" icon="plus" onPress={() => setPositionModalVisible(true)} style={{ borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{language === 'en' ? 'Add Defect Position' : '添加缺陷位置'}</Button>
        </View>
      </SectionCard>

      <Portal>
        <Modal visible={positionModalVisible} onDismiss={() => setPositionModalVisible(false)} contentContainerStyle={{ backgroundColor: tokens.color.surface, padding: 20, margin: 20, borderRadius: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>{language === 'en' ? 'Add Defect Position' : '添加缺陷位置'}</Text>
          <PaperTextInput mode="outlined" label={language === 'en' ? 'Second Level Product Type' : '二级产品类别'} value="Auto-filled" disabled style={{ marginBottom: 12 }} />
          <PaperTextInput mode="outlined" label={language === 'en' ? 'Defect Position CN' : '缺陷位置(中)'} value={newPosCn} onChangeText={setNewPosCn} style={{ marginBottom: 12 }} />
          <PaperTextInput mode="outlined" label={language === 'en' ? 'Defect Position EN' : '缺陷位置(英)'} value={newPosEn} onChangeText={setNewPosEn} style={{ marginBottom: 16 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
            <Button onPress={() => setPositionModalVisible(false)}>{language === 'en' ? 'Cancel' : '取消'}</Button>
            <Button mode="contained" onPress={saveNewPosition}>{language === 'en' ? 'Save' : '保存'}</Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}
