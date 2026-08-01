import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { TextField } from '../../../components/form/TextField';
import { SegmentedButtons } from 'react-native-paper';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['production_flow'];

const STAGES = [
  '1. Fabric receipt & inspection',
  '2. Fabric relaxation (12–24 hrs)',
  '3. Marker preparation',
  '4. Spreading',
  '5. Cutting',
  '6. Bundling / numbering / sorting',
  '7. Fusing (if applicable)',
  '8. Knitting (knitwear)',
  '9. Linking (knitwear) / Sub-assembly (C&S)',
  '10. Main assembly / Sewing',
  '11. Wet processing (if applicable)',
  '12. Pressing & form-finishing',
  '13. Inline / end-line QC',
  '14. Final QC + needle detection',
  '15. Ticketing / packing / despatch'
];

export function Section10ProductionFlow({ data, onChange }: { data: Data; onChange: (next: Data) => void }) {
  const updateStage = (stageName: string, field: 'in_house_sub_con' | 'sub_contractor' | 'notes', value: string) => {
    let newData = [...data];
    let idx = newData.findIndex(d => d.stage === stageName);
    if (idx === -1) {
      newData.push({ stage: stageName, in_house_sub_con: '', sub_contractor: '', notes: '' });
      idx = newData.length - 1;
    }
    newData[idx] = { ...newData[idx], [field]: value };
    onChange(newData);
  };

  return (
    <View>
      <SectionCard title="10. Production Flow & Sub-Contracting" subtitle="Declare processes">
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={{ minWidth: 1500, width: '100%' }}>
            <View style={{ flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 }}>
              <Text style={{ width: 350, fontWeight: 'bold' }}>Stage</Text>
              <Text style={{ width: 350, fontWeight: 'bold' }}>Location</Text>
              <Text style={{ width: 350, fontWeight: 'bold' }}>Sub-contractor</Text>
              <Text style={{ width: 350, fontWeight: 'bold' }}>Notes</Text>
            </View>
            {STAGES.map((stage) => {
              const current = data.find(d => d.stage === stage) || { in_house_sub_con: '', sub_contractor: '', notes: '' };
              return (
                <View key={stage} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 }}>
                  <Text style={{ width: 350, fontWeight: 'bold' }}>{stage}</Text>
                  <View style={{ width: 350 }}>
                    <SegmentedButtons
                      value={current.in_house_sub_con}
                      onValueChange={(v) => updateStage(stage, 'in_house_sub_con', v)}
                      buttons={[
                        { value: 'In-house', label: 'In-house' },
{ value: 'Sub-contracted', label: 'Sub-contracted' },
{ value: 'Partial', label: 'Partial' },
{ value: 'N/A', label: 'N/A' },
                      ]}
                      style={{ minWidth: 200 }}
                    />
                  </View>
                  <View style={{ width: 350 }}>
                    <TextField label="" value={current.sub_contractor} onChangeText={(v) => updateStage(stage, 'sub_contractor', v)} />
                  </View>
                  <View style={{ width: 350 }}>
                    <TextField label="" value={current.notes} onChangeText={(v) => updateStage(stage, 'notes', v)} />
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
