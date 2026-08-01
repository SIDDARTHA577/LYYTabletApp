import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { TextField } from '../../../components/form/TextField';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['observations'];

const OBSERVATION_TOPICS = [
  'Factory Overview',
  'P.O. Vendor Arrangement',
  'Trading Co. / Factory Relationship & Ownership',
  'Machinery — detailed observations',
  'Workforce — observations on-site',
  'Sample Room & Pre-Production',
  'Production Records sighted',
  'Material Storage',
  'QC Equipment & Process',
  'Security',
  'Certifications (sighted, verification status)',
  'Geography / Shipping',
  'Customer\'s Current Order Status (for Current Order Status box)',
  'Identity Verification',
  'Audit Attendees',
  'Sub-contractor Disclosure & Visibility',
  'Other notable observations'
];

export function Section14Observations({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const handleChange = (topic: string, value: string) => {
    onChange({ ...data, [topic]: value });
  };

  return (
    <View>
      <SectionCard title="14. General Observations & Narrative" subtitle="Subjective assessments and context">
        {OBSERVATION_TOPICS.map((topic) => (
          <View key={topic} style={{ marginBottom: 16 }}>
            <TextField
              label={topic}
              value={data[topic] || ''}
              onChangeText={(v) => handleChange(topic, v)}
              multiline
              numberOfLines={3}
            />
          </View>
        ))}
      </SectionCard>
    </View>
  );
}
