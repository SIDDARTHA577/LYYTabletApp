import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { SegmentedButtons } from 'react-native-paper';
import { TextField } from '../../../components/form/TextField';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['non_negotiables'];

const GATES = [
  '1. Visible Child Labour\nAny worker on-site or at a visited sub-contractor appearing to be below legal working age.',
  '2. Locked / Blocked Emergency Exits\nEmergency exits locked, padlocked, or blocked by inventory/machinery.',
  '3. Visible Signs of Forced Labour\nWorkers locked inside the facility, factory holding worker ID documents, visible coercion or restricted movement.',
  '4. Visible Chemical Mismanagement\nUnlabelled chemical containers in production / printing / washing areas, leaking drums, no SDS visible.',
  '5. Hidden Sub-contracting\nProduction observed at any facility NOT on the supplier\'s Tier 1 disclosure list (cross-ref Tab 2 / Tab 10).',
  '6. Building & Structural Safety\nVisible structural defects: cracks in load-bearing walls, illegal additional floors, water-damaged supports.'
];

export function Section13NonNegotiables({ data, onChange }: { data: Data; onChange: (next: Data) => void }) {
  const updateGate = (gate: string, field: 'status' | 'observation', value: string) => {
    let newData = [...data];
    let idx = newData.findIndex(d => d.gate === gate);
    if (idx === -1) {
      newData.push({ gate, status: '', observation: '' });
      idx = newData.length - 1;
    }
    newData[idx] = { ...newData[idx], [field]: value };
    onChange(newData);
  };

  return (
    <View>
      <SectionCard title="13. Non-Negotiables (Hard Gates)" subtitle="Critical failure conditions">
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={{ minWidth: 1400, width: '100%' }}>
            <View style={{ flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 }}>
              <Text style={{ width: 500, fontWeight: 'bold' }}>Condition</Text>
              <Text style={{ width: 350, fontWeight: 'bold' }}>Status</Text>
              <Text style={{ width: 350, fontWeight: 'bold' }}>Observation</Text>
            </View>
            {GATES.map((gate) => {
              const current = data.find(d => d.gate === gate) || { status: '', observation: '' };
              return (
                <View key={gate} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 }}>
                  <Text style={{ width: 500, fontWeight: 'bold' }}>{gate}</Text>
                  <View style={{ width: 350 }}>
                    <SegmentedButtons
                      value={current.status}
                      onValueChange={(v) => updateGate(gate, 'status', v)}
                      buttons={[
                        { value: 'Pass', label: 'Pass' },
{ value: 'Fail', label: 'Fail' },
{ value: 'Not Observed', label: 'Not Observed' },
                      ]}
                      style={{ minWidth: 160 }}
                    />
                  </View>
                  <View style={{ width: 350 }}>
                    <TextField label="" value={current.observation} onChangeText={(v) => updateGate(gate, 'observation', v)} />
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
