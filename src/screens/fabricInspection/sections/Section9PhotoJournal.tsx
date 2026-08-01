import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import type { FabricInspectionData } from '../../../features/fabricInspection/types';

type Data = FabricInspectionData['photo_journal'];

const SLOTS: Array<{ key: keyof Data & string; label: string; labelCn: string }> = [
  { key: 'fabricFace', label: 'Fabric Face', labelCn: '面料正面' },
  { key: 'fabricBack', label: 'Fabric Back', labelCn: '面料反面' },
  { key: 'shadeBand', label: 'Shade Band', labelCn: '色档' },
  { key: 'selvedge', label: 'Selvedge', labelCn: '布边' },
  { key: 'majorDefect1', label: 'Major Defect', labelCn: '主要缺陷' },
  { key: 'majorDefect2', label: 'Major Defect', labelCn: '主要缺陷' },
  { key: 'rollLotLabel', label: 'Roll / Lot Label', labelCn: '卷/缸标签' },
  { key: 'centreToSelvedgeTest', label: 'Centre-to-Selvedge Test', labelCn: '中边测试' },
];

export function Section9PhotoJournal({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View style={styles.grid}>
      {SLOTS.map((slot) => (
        <PhotoSlot
          key={slot.key}
          label={`${slot.label} · ${slot.labelCn}`}
          uri={data[slot.key]}
          onChange={(uri) => onChange({ [slot.key]: uri } as Partial<Data>)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
});
