import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Portal, Modal } from 'react-native-paper';
import { FormRow } from '../../../components/form/FormRow';
import { NumberField } from '../../../components/form/NumberField';
import type { FabricInspectionData } from '../../../features/fabricInspection/types';
import { useLanguage } from '../../../i18n/LanguageContext';
import tokens from '../../../theme/tokens';

type Data = FabricInspectionData['acceptance_criteria'];

const PENALTY_SCALE = [
  { points: '1 Point', inch: '< 3 in', cm: '< 8 cm' },
  { points: '2 Points', inch: '3 – 6 in', cm: '8 – 15 cm' },
  { points: '3 Points', inch: '6 – 9 in', cm: '15 – 23 cm' },
  { points: '4 Points', inch: '> 9 in', cm: '> 23 cm' },
];

export function Section3AcceptanceCriteria({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { language } = useLanguage();

  return (
    <View>
      <View style={{ marginBottom: 16 }}>
        <Button
          mode="outlined"
          icon="information-outline"
          onPress={() => setModalVisible(true)}
          style={{ borderRadius: tokens.radius.md, borderColor: tokens.color.primary }}
          textColor={tokens.color.primary}
        >
          {language === 'en' ? '4-Point Criteria (Click to view)' : '四分制评判标准 (点击查看)'}
        </Button>
      </View>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={{
            backgroundColor: tokens.color.surface,
            margin: 20,
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            maxHeight: '90%',
            maxWidth: 600,
            alignSelf: 'center',
            width: '100%',
          }}
        >
          <View className="border-b border-border p-5" style={{ backgroundColor: tokens.color.background }}>
            <Text className="mb-1 text-cardTitle font-bold text-textPrimary">
              {language === 'en' ? '4-Point Penalty Scale & Rules' : '四分制评分标准与规则'}
            </Text>
            <Text className="text-label text-textSecondary">
              {language === 'en' ? 'Reference guidelines for fabric inspection' : '面料检验参考指南'}
            </Text>
          </View>
          <View style={{ padding: 20 }}>
            <Text className="mb-2.5 text-label font-bold text-textPrimary">
              {language === 'en' ? 'Penalty Point Scale' : '评分标准'}
            </Text>
            <View className="mb-3.5 overflow-hidden rounded-md border border-border">
              <View className="flex-row border-b border-border bg-background">
                <Text className="basis-[30%] p-2.5 text-caption font-bold text-textSecondary">Points</Text>
                <Text className="basis-[35%] p-2.5 text-caption font-bold text-textSecondary">Defect size (inch)</Text>
                <Text className="basis-[35%] p-2.5 text-caption font-bold text-textSecondary">Defect size (cm)</Text>
              </View>
              {PENALTY_SCALE.map((row) => (
                <View key={row.points} className="flex-row border-b border-border">
                  <Text className="basis-[30%] p-2.5 text-label text-textPrimary">{row.points}</Text>
                  <Text className="basis-[35%] p-2.5 text-label text-textPrimary">{row.inch}</Text>
                  <Text className="basis-[35%] p-2.5 text-label text-textPrimary">{row.cm}</Text>
                </View>
              ))}
            </View>

            <Text className="mb-2 text-label leading-5 text-textSecondary">
              Rules: Max 4 points per single defect. No linear yard/metre may exceed 4 points. Continuous running defect
              {'>'}9 in = 4 points. Continuous defects (roll-to-roll shading, irregular width, creasing, barre, skew) = max
              4 points per yard. Obvious / severe defects = 4 points per yard regardless of size.
            </Text>
            <Text className="mb-5 text-label font-semibold" style={{ color: tokens.color.primary }}>
              Points per 100 yd² = Total points × 3600 ÷ (Inspected yards × Cuttable width in inches)
            </Text>
          </View>
          <View className="items-end border-t border-border bg-surface p-4">
            <Button mode="contained" onPress={() => setModalVisible(false)} style={{ borderRadius: tokens.radius.md }}>
              {language === 'en' ? 'Close' : '关闭'}
            </Button>
          </View>
        </Modal>
      </Portal>

      <Text className="mb-2.5 mt-1 text-cardTitle font-bold text-textPrimary">Acceptance threshold · 接收阈值</Text>
      <FormRow>
        <NumberField
          label="Max per individual roll"
          labelCn="单卷上限"
          value={data.maxPerRoll}
          onChangeValue={(v) => onChange({ maxPerRoll: v })}
          suffix="pts/100yd²"
        />
        <NumberField
          label="Max shipment average"
          labelCn="整批平均上限"
          value={data.maxShipmentAverage}
          onChangeValue={(v) => onChange({ maxShipmentAverage: v })}
          suffix="pts/100yd²"
        />
      </FormRow>
    </View>
  );
}
