import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import type { SpotCheckData } from '../../../features/spotCheck/types';

type Data = SpotCheckData['photo_journal'];

const SLOTS: Array<{ key: keyof Data & string; label: string; labelCn: string }> = [
  { key: 'sewing_line', label: 'Sewing Line / WIP', labelCn: '缝制线/在制' },
  { key: 'defect', label: 'Defect', labelCn: '缺陷' },
  { key: 'labelling', label: 'Labelling', labelCn: '标签' },
  { key: 'packing', label: 'Packing / Carton', labelCn: '包装/纸箱' },
  { key: 'colour_shading', label: 'Colour / Shading', labelCn: '色差' },
  { key: 'measurement', label: 'Measurement', labelCn: '尺寸测量' },
];

export function Section7PhotoJournal({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
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
