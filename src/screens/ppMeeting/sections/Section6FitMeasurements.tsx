import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { DropdownField } from '../../../components/form/DropdownField';
import { TextAreaField } from '../../../components/form/TextAreaField';
import { FileUploadRow } from '../../../components/form/FileUploadRow';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import type { PpMeetingData } from '../../../features/ppMeeting/types';

type Data = PpMeetingData['fit_measurements'];

export function Section6FitMeasurements({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const RESULT_OPTIONS = [
    { value: 'Pass', label: 'Pass / 通过' },
    { value: 'Fail', label: 'Fail / 不通过' }
  ];

  return (
    <View>
      <SectionCard title="Fit & Measurements" subtitle="试身与尺寸">
        <FormRow>
          <DropdownField label="Measurement Result" labelCn="尺寸结果" value={data.measurement_result} options={RESULT_OPTIONS} onChangeValue={(v) => onChange({ measurement_result: v || '' })} />
        </FormRow>
        <TextAreaField label="Fitting Review Comments" labelCn="试身评审评语" value={data.fitting_comments} onChangeText={(v) => onChange({ fitting_comments: v })} />
        <TextAreaField label="Critical POM Reviewed" labelCn="关键测量点评审" value={data.critical_pom_reviewed} onChangeText={(v) => onChange({ critical_pom_reviewed: v })} />
        <FileUploadRow
          label="Spec Sheet / 尺寸规格表"
          fileName={data.spec_sheet ? data.spec_sheet.name : null}
          onChange={(file) => onChange({ spec_sheet: file })}
        />
      </SectionCard>

      <SectionCard title="Dress-form / Sample Photos" subtitle="人台/样品照片">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          <PhotoSlot label="Front / 正面" uri={data.photo_front} onChange={(uri) => onChange({ photo_front: uri })} />
          <PhotoSlot label="Back / 背面" uri={data.photo_back} onChange={(uri) => onChange({ photo_back: uri })} />
          <PhotoSlot label="Side / 侧面" uri={data.photo_side} onChange={(uri) => onChange({ photo_side: uri })} />
        </View>
      </SectionCard>
    </View>
  );
}
