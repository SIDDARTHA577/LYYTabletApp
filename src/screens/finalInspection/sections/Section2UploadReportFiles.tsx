import React from 'react';
import { View, Image } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import type { FinalInspectionData } from '../../../features/finalInspection/types';
import tokens from '../../../theme/tokens';

type Data = FinalInspectionData['upload_report_files'];

function ReportFileUpload({
  label,
  labelCn,
  data,
  onChange,
}: {
  label: string;
  labelCn: string;
  data: { file: string; is_internal: boolean };
  onChange: (next: { file: string; is_internal: boolean }) => void;
}) {
  return (
    <View className="mb-4 border border-border p-4 rounded-md bg-background flex-row items-center justify-between">
      <View className="w-1/3 pr-2">
        <Text className="font-bold text-textPrimary">{label}</Text>
        <Text className="text-body text-textSecondary">{labelCn}</Text>
      </View>
      
      <View className="w-1/3 px-2">
        <Text className="text-body text-textSecondary mb-2">Internal File?</Text>
        <SegmentedButtons
          value={data.is_internal ? 'YES' : 'NO'}
          onValueChange={(v) => onChange({ ...data, is_internal: v === 'YES' })}
          buttons={[
            { value: 'YES', label: 'YES' },
            { value: 'NO', label: 'NO' },
          ]}
          density="small"
        />
      </View>

      <View className="w-1/4 items-end">
        <PhotoSlot
          label="Upload / Camera"
          uri={data.file}
          onChange={(uri) => onChange({ ...data, file: uri })}
        />
      </View>
    </View>
  );
}

function PreviewItem({ label, uri }: { label: string; uri: string }) {
  if (!uri) return null;
  return (
    <View className="mb-4">
      <Text className="font-bold text-textPrimary mb-2">{label}</Text>
      <View className="border border-border rounded-md overflow-hidden bg-background h-48 justify-center items-center">
        <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
      </View>
    </View>
  );
}

export function Section2UploadReportFiles({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const hasPreviews = data.measurement.file || data.handwritten_report.file || data.preview_report.file || data.inspection_file.file || data.other.file;

  return (
    <View>
      <SectionCard title="Upload Report Files" subtitle="Upload measurement, preview and inspection documents">
        <FormRow>
          <View className="w-full">
            <ReportFileUpload
              label="Measurement"
              labelCn="测量"
              data={data.measurement}
              onChange={(v) => onChange({ measurement: v })}
            />
            <ReportFileUpload
              label="Handwritten Report"
              labelCn="手写报告"
              data={data.handwritten_report}
              onChange={(v) => onChange({ handwritten_report: v })}
            />
            <ReportFileUpload
              label="Preview Report"
              labelCn="预览报告"
              data={data.preview_report}
              onChange={(v) => onChange({ preview_report: v })}
            />
            <ReportFileUpload
              label="Inspection File"
              labelCn="检验文件"
              data={data.inspection_file}
              onChange={(v) => onChange({ inspection_file: v })}
            />
            <ReportFileUpload
              label="Other"
              labelCn="其他"
              data={data.other}
              onChange={(v) => onChange({ other: v })}
            />
          </View>
        </FormRow>
      </SectionCard>

      {hasPreviews && (
        <SectionCard title="Preview of Reports" subtitle="Displays all uploaded files grouped by category below">
          <View className="w-full flex-row flex-wrap justify-between">
            <View className="w-[48%]">
              <PreviewItem label="Measurement" uri={data.measurement.file} />
              <PreviewItem label="Handwritten Report (Internal File)" uri={data.handwritten_report.file} />
              <PreviewItem label="Preview Report (Internal File)" uri={data.preview_report.file} />
            </View>
            <View className="w-[48%]">
              <PreviewItem label="Inspection File (Internal File)" uri={data.inspection_file.file} />
              <PreviewItem label="Other (Internal File)" uri={data.other.file} />
            </View>
          </View>
        </SectionCard>
      )}
    </View>
  );
}
