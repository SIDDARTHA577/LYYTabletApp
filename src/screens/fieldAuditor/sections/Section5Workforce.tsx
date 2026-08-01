import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { TextField } from '../../../components/form/TextField';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['workforce'];

const WORKFORCE_ROLES = [
  'Total Employees', 'Office / Admin Staff', 'Knitting Machine Operators', 'Linking Operators',
  'Yarn Winding Operators', 'Panel Inspection', 'Cutting Operators', 'Cutting Room Supervisor',
  'Spreader Operators', 'Cut-piece Bundler / Numbering', 'Sewing Operators', 'Sewing Line Supervisor (per line)',
  'Fusing Operators', 'Fabric Inspector (incoming)', 'Pattern Maker / Designer', 'Pattern Grader',
  'Marker Maker', 'Sample Sewer (separate from line)', 'Pressing / Ironing', 'Inline / End-line QC Inspector',
  'Final QC / Inspection', 'Packing', 'Ticketing / Tagging', 'Dispatch / Receiving',
  'Mechanics — Sewing/Knitting', 'Mechanics — Cutting Room', 'Warehouse Staff — Fabric/Trim',
  'General Labourers', 'No. of Production Lines', 'Other (specify)'
];

export function Section5Workforce({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const updateRole = (role: string, field: 'headcount' | 'applicable_to' | 'notes', value: string) => {
    const current = data.headcount[role] || { headcount: '', applicable_to: '', notes: '' };
    onChange({ headcount: { ...data.headcount, [role]: { ...current, [field]: value } } });
  };

  return (
    <View>
      <SectionCard title="5. Workforce Headcount" subtitle="Factory personnel details">
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={{ minWidth: 1400, width: '100%' }}>
            <View style={{ flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 }}>
              <Text style={{ width: 400, fontWeight: 'bold' }}>Role</Text>
              <Text style={{ width: 250, fontWeight: 'bold' }}>Headcount</Text>
              <Text style={{ width: 250, fontWeight: 'bold' }}>Applicable to</Text>
              <Text style={{ width: 400, fontWeight: 'bold' }}>Notes</Text>
            </View>
            {WORKFORCE_ROLES.map((role) => {
              const current = data.headcount[role] || { headcount: '', applicable_to: '', notes: '' };
              return (
                <View key={role} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                  <Text style={{ width: 400, fontWeight: 'bold' }}>{role}</Text>
                  <View style={{ width: 250 }}>
                    <TextField label="" value={current.headcount} onChangeText={(v) => updateRole(role, 'headcount', v)} keyboardType="numeric" />
                  </View>
                  <View style={{ width: 250 }}>
                    <TextField label="" value={current.applicable_to} onChangeText={(v) => updateRole(role, 'applicable_to', v)} />
                  </View>
                  <View style={{ width: 400 }}>
                    <TextField label="" value={current.notes} onChangeText={(v) => updateRole(role, 'notes', v)} />
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
