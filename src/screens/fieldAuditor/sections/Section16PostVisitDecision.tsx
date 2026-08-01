import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { TextField } from '../../../components/form/TextField';
import { SegmentedButtons, Checkbox, Button } from 'react-native-paper';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';
import { DateField } from '../../../components/form/DateField';

type Data = FieldAuditorData['post_visit_decision'];

const CERTS = ['ISO 9001', 'ISO 14001', 'BSCI', 'SMETA / Sedex', 'OEKO-TEX', 'GOTS / OCS / GRS / RCS', 'Other (specify)'];

export function Section16PostVisitDecision({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const updateCert = (cert: string, field: 'verified' | 'date' | 'notes', value: any) => {
    const current = data.certifications[cert] || { verified: false, date: '', notes: '' };
    onChange({ certifications: { ...data.certifications, [cert]: { ...current, [field]: value } } });
  };

  const updateRec = (field: 'tier' | 'window' | 'reasoning', value: string) => {
    onChange({ recommendation: { ...data.recommendation, [field]: value } });
  };

  const updateCAP = (idx: number, field: 'issue' | 'owner' | 'deadline' | 'status', value: string) => {
    let newCap = [...data.cap];
    newCap[idx] = { ...newCap[idx], [field]: value };
    onChange({ cap: newCap });
  };

  const addCap = () => {
    onChange({ cap: [...data.cap, { issue: '', owner: '', deadline: '', status: '' }] });
  };

  return (
    <View>
      <SectionCard title="16.1 Certifications Confirmed" subtitle="Verify and check expiry">
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={{ minWidth: 1400, width: '100%' }}>
            <View style={{ flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 }}>
              <Text style={{ width: 250, fontWeight: 'bold' }}>Status</Text>
              <Text style={{ width: 300, fontWeight: 'bold' }}>Certification</Text>
              <Text style={{ width: 250, fontWeight: 'bold' }}>Expiry</Text>
              <Text style={{ flex: 1, fontWeight: 'bold' }}>Notes</Text>
            </View>
            {CERTS.map(cert => {
              const current = data.certifications[cert] || { verified: false, date: '', notes: '' };
              return (
                <View key={cert} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 }}>
                  <View style={{ width: 250, alignItems: 'flex-start' }}>
                    <SegmentedButtons value={typeof current.verified === "string" ? current.verified : (current.verified ? "Yes" : "No")} onValueChange={(v) => updateCert(cert, "verified", v)} buttons={[{value: "Yes", label: "Yes"}, {value: "No", label: "No"}, {value: "N/A", label: "N/A"}]} density="small" style={{minWidth: 150}} />
                  </View>
                  <Text style={{ width: 300, fontWeight: 'bold' }}>{cert}</Text>
                  <View style={{ width: 250 }}>
                    <DateField label="" value={current.date} onChangeValue={(v) => updateCert(cert, 'date', v)} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <TextField label="" value={current.notes} onChangeText={(v) => updateCert(cert, 'notes', v)} />
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SectionCard>

      <SectionCard title="16.2 Factory Tier Recommendation" subtitle="Final decision">
        <SegmentedButtons
          value={data.recommendation.tier}
          onValueChange={(v) => updateRec('tier', v)}
          buttons={[
            { value: 'Tier 1', label: 'APPROVED — green light for engagement' },
{ value: 'Tier 2', label: 'APPROVED WITH CONDITIONS — engage with CAP' },
{ value: 'Tier 3', label: 'NOT RECOMMENDED — do not engage' },
          ]}
          style={{ marginBottom: 16 }}
        />
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ flex: 1 }}>
            <TextField label="Review Window (e.g. 3 months, 6 months)" value={data.recommendation.window} onChangeText={(v) => updateRec('window', v)} />
          </View>
          <View style={{ flex: 2 }}>
            <TextField label="Reasoning" value={data.recommendation.reasoning} onChangeText={(v) => updateRec('reasoning', v)} />
          </View>
        </View>
      </SectionCard>

      <SectionCard title="16.3 Corrective Action Plan (CAP) Summary" subtitle="Top issues to fix">
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={{ minWidth: 1200, width: '100%' }}>
            <View style={{ flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 }}>
              <Text style={{ width: '40%', fontWeight: 'bold' }}>Issue</Text>
              <Text style={{ width: '20%', fontWeight: 'bold' }}>Owner</Text>
              <Text style={{ width: '20%', fontWeight: 'bold' }}>Deadline</Text>
              <Text style={{ width: '20%', fontWeight: 'bold' }}>Status</Text>
            </View>
            {data.cap.map((cap, idx) => (
              <View key={idx} style={{ flexDirection: 'row', gap: 8, marginBottom: 12, alignItems: 'center' }}>
                <View style={{ width: '40%' }}><TextField label="" value={cap.issue} onChangeText={(v) => updateCAP(idx, 'issue', v)} /></View>
                <View style={{ width: '20%' }}><TextField label="" value={cap.owner} onChangeText={(v) => updateCAP(idx, 'owner', v)} /></View>
                <View style={{ width: '20%' }}><DateField label="" value={cap.deadline} onChangeValue={(v) => updateCAP(idx, 'deadline', v || '')} /></View>
                <View style={{ width: '20%' }}><TextField label="" value={cap.status} onChangeText={(v) => updateCAP(idx, 'status', v)} /></View>
              </View>
            ))}
            <Button mode="outlined" onPress={addCap} style={{ alignSelf: 'flex-start' }}>Add CAP Item</Button>
          </View>
        </ScrollView>
      </SectionCard>

      <SectionCard title="16.4 Specialist Referral Trigger" subtitle="Require third party audit?">
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox.Android status={data.specialist_referral ? 'checked' : 'unchecked'} onPress={() => onChange({ specialist_referral: !data.specialist_referral })} />
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Trigger structural/electrical/social compliance 3rd party audit (e.g. SGS / Intertek)</Text>
        </View>
      </SectionCard>
    </View>
  );
}
