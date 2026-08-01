import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { SegmentedButtons, Button } from 'react-native-paper';
import { TextField } from '../../../components/form/TextField';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['photo_log'];

const REQUIRED_PHOTOS = [
  'A1 — Factory Documents & Identity',
  'A2 — Factory Exterior & Entrance',
  'A3 — Fire Safety Equipment',
  'A4 — Emergency Exits & Safety Signage',
  'A5 — Worker Welfare Facilities',
  'A6 — Production & Warehouse Records',
  'A7 — Knitting Workshop (Knitwear only)',
  'A8 — Yarn Winding Room (Knitwear only)',
  'A9 — Linking & Mending (Knitwear only)',
  'A10 — Cutting Workshop (C&S only)',
  'A11 — Sewing Workshop (C&S only)',
  'A12 — Sample Room',
  'A13 — Panel/Cut-piece Inspection',
  'A14 — Pressing & Form-finishing',
  'A15 — Final Inspection & QC',
  'A16 — Fabric / Yarn / Trim Storage',
  'A17 — Finished Goods & Packing',
  'A18 — Factory Personnel & Office Areas'
];

export function Section15PhotoLog({ data, onChange }: { data: Data; onChange: (next: Data) => void }) {
  const updatePhoto = (code: string, field: 'filename' | 'caption' | 'flag', value: string) => {
    let newData = [...data];
    let idx = newData.findIndex(d => d.code === code);
    if (idx === -1) {
      newData.push({ code, filename: '', caption: '', flag: 'N/A' });
      idx = newData.length - 1;
    }
    newData[idx] = { ...newData[idx], [field]: value };
    onChange(newData);
  };

  return (
    <View>
      <SectionCard title="15. Photo Log" subtitle="Required photographic evidence">
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={{ minWidth: 1200, width: '100%' }}>
            <View style={{ flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 }}>
              <Text style={{ width: '35%', fontWeight: 'bold' }}>Required Photo</Text>
              <Text style={{ width: '15%', fontWeight: 'bold' }}>Status/File</Text>
              <Text style={{ width: '30%', fontWeight: 'bold' }}>Caption/Notes</Text>
              <Text style={{ width: '20%', fontWeight: 'bold' }}>Flag</Text>
            </View>
            {REQUIRED_PHOTOS.map((req) => {
              const current = data.find(d => d.code === req) || { filename: '', caption: '', flag: 'N/A' };
              return (
                <View key={req} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 }}>
                  <Text style={{ width: '35%', fontWeight: 'bold' }}>{req}</Text>
                  <View style={{ width: '15%' }}>
                    {current.filename ? (
                      <Text numberOfLines={1}>{current.filename}</Text>
                    ) : (
                      <Button mode="outlined" onPress={() => updatePhoto(req, 'filename', `photo_${Date.now()}.jpg`)}>Take Photo</Button>
                    )}
                  </View>
                  <View style={{ width: '30%' }}>
                    <TextField label="" value={current.caption} onChangeText={(v) => updatePhoto(req, 'caption', v)} />
                  </View>
                  <View style={{ width: '20%' }}>
                    <SegmentedButtons
                      value={current.flag}
                      onValueChange={(v) => updatePhoto(req, 'flag', v)}
                      buttons={[
                        { value: 'N/A', label: 'N/A' },
                        { value: 'Flagged', label: 'Flagged' },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SectionCard>
    </View>
  );
}
