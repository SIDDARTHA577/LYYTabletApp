import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { FileUploadRow } from '../../../components/form/FileUploadRow';
import type { FabricInspectionData } from '../../../features/fabricInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = FabricInspectionData['lab_test_reports'];
type FileVal = { name: string; uri: string } | null;

export function Section8LabTestReports({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const { language } = useLanguage();
  const ROWS: Array<{ key: keyof Data & string; reportKey: keyof Data & string; label: string; labelCn: string }> = [
    { key: 'shrinkageResult', reportKey: 'shrinkageReport', label: 'Shrinkage (wash / dry)', labelCn: (language === 'en' ? '缩水' : '洗涤/烘干') },
    { key: 'crockingResult', reportKey: 'crockingReport', label: 'Colourfastness – crocking / rubbing', labelCn: '摩擦色牢度' },
    { key: 'washResult', reportKey: 'washReport', label: 'Colourfastness – wash', labelCn: '水洗色牢度' },
    { key: 'gsmResult', reportKey: 'gsmReport', label: 'GSM / Weight', labelCn: '克重' },
    { key: 'spiralityResult', reportKey: 'spiralityReport', label: 'Spirality / Torque', labelCn: '扭曲度' },
    { key: 'phResult', reportKey: 'phReport', label: 'pH / Other', labelCn: '酸碱值/其他' },
  ];

  return (
    <View className="overflow-hidden rounded-md border border-border">
      <View className="flex-row bg-background p-2.5">
        <Text className="basis-[38%] text-caption font-bold text-textSecondary">Test</Text>
        <Text className="basis-[27%] text-caption font-bold text-textSecondary">Result</Text>
        <Text className="flex-1 text-caption font-bold text-textSecondary">Report</Text>
      </View>
      {ROWS.map((row) => (
        <View key={row.key} className="flex-row items-center border-t border-border p-2.5">
          <Text className="basis-[38%] text-label text-textPrimary">
            {row.label}
            {'\n'}
            <Text className="text-caption text-textMuted">{row.labelCn}</Text>
          </Text>
          <TextInput
            mode="outlined"
            dense
            style={{ backgroundColor: tokens.color.surface, flexBasis: '27%', marginRight: 8 }}
            outlineColor={tokens.color.border}
            activeOutlineColor={tokens.color.primary}
            outlineStyle={{ borderRadius: tokens.radius.md }}
            value={(data[row.key] as string) ?? ''}
            onChangeText={(v) => onChange({ [row.key]: v } as Partial<Data>)}
          />
          <View className="flex-1">
            <FileUploadRow
              label=""
              fileName={(data[row.reportKey] as FileVal)?.name ?? null}
              onChange={(file) => onChange({ [row.reportKey]: file } as Partial<Data>)}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
