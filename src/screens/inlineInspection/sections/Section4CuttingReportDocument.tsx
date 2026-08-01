import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = InlineInspectionData['cutting_report_document'];

export function Section4CuttingReportDocument({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const addDocument = () => onChange({ documents: [...(data?.documents || []), ''] });
  const updateDocument = (idx: number, uri: string) => {
    const arr = [...(data?.documents || [])];
    arr[idx] = uri;
    onChange({ documents: arr });
  };

  const addLabTest = () => onChange({ lab_tests: [...(data?.lab_tests || []), ''] });
  const updateLabTest = (idx: number, uri: string) => {
    const arr = [...(data?.lab_tests || [])];
    arr[idx] = uri;
    onChange({ lab_tests: arr });
  };

  return (
    <View>
      <SectionCard title="Cutting Report Document" subtitle="Upload file table">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {(data?.documents || []).map((doc, idx) => (
            <PhotoSlot key={idx} label={`Document ${idx + 1}`} uri={doc} onChange={(uri) => updateDocument(idx, uri)} />
          ))}
        </View>
        <Button mode="outlined" icon="upload" onPress={addDocument} style={{ marginTop: 8, alignSelf: 'flex-start', borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{useLanguage().language === 'en' ? 'Upload File' : '上传文件'}</Button>
      </SectionCard>

      <SectionCard title="Lab Test" subtitle="Upload lab test files">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {(data?.lab_tests || []).map((test, idx) => (
            <PhotoSlot key={idx} label={`Lab Test ${idx + 1}`} uri={test} onChange={(uri) => updateLabTest(idx, uri)} />
          ))}
        </View>
        <Button mode="outlined" icon="upload" onPress={addLabTest} style={{ marginTop: 8, alignSelf: 'flex-start', borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{useLanguage().language === 'en' ? 'Upload File' : '上传文件'}</Button>
      </SectionCard>
    </View>
  );
}
