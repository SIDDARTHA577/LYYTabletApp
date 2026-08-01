import React from 'react';
import { View, Image, Text as RNText } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { SectionCard } from '../../../components/SectionCard';
import { RadioGroupField } from '../../../components/form/RadioGroupField';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';
import tokens from '../../../theme/tokens';

type Data = InlineInspectionData['upload_report_files'];
type UploadValue = { file: string; fileName?: string; is_internal: boolean };

const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|bmp|heic)$/i;

function ReportFileUpload({
  label,
  labelCn,
  data,
  onChange,
  internalFileToggle = false,
  internalFileFixed = false,
}: {
  label: string;
  labelCn: string;
  data: UploadValue;
  onChange: (next: UploadValue) => void;
  internalFileToggle?: boolean;
  internalFileFixed?: boolean;
}) {
  const theme = useTheme();

  const browse = async () => {
    const result = await DocumentPicker.getDocumentAsync({ multiple: false, copyToCacheDirectory: true });
    if (!result.canceled && result.assets?.[0]) {
      onChange({ ...data, file: result.assets[0].uri, fileName: result.assets[0].name });
    }
  };

  const displayName = data.fileName || (data.file ? data.file.split('/').pop() : '');

  return (
    <View className="mb-3 flex-row items-center border-b border-border pb-3">
      <View style={{ width: 220 }} className="pr-3">
        <Text className="font-semibold text-textPrimary">
          {label}
          {internalFileFixed ? ' (Internal File)' : ''}
        </Text>
        <Text className="text-caption text-textSecondary">{labelCn}</Text>
        {internalFileToggle && (
          <View className="mt-1 -ml-2">
            <RadioGroupField
              label="Internal File"
              value={data.is_internal ? 'YES' : 'NO'}
              options={['YES', 'NO']}
              onChangeValue={(v) => onChange({ ...data, is_internal: v === 'YES' })}
            />
          </View>
        )}
      </View>

      <View className="flex-1 flex-row items-center gap-2">
        <View
          className="flex-1 rounded-md border px-3 py-2.5"
          style={{ borderColor: tokens.color.border, backgroundColor: tokens.color.background }}
        >
          <RNText numberOfLines={1} style={{ color: displayName ? tokens.color.textPrimary : tokens.color.textMuted }}>
            {displayName || 'No file selected'}
          </RNText>
        </View>
        <Button
          mode="contained"
          icon="folder-open-outline"
          onPress={browse}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={{ borderRadius: tokens.radius.sm }}
          contentStyle={{ height: 40 }}
        >
          Browse ...
        </Button>
      </View>
    </View>
  );
}

function PreviewItem({ label, value }: { label: string; value: UploadValue }) {
  if (!value.file) return null;
  const name = value.fileName || value.file.split('/').pop() || value.file;
  const isImage = IMAGE_EXTENSIONS.test(name);

  return (
    <View className="mb-4">
      <Text className="mb-2 font-bold text-textPrimary">{label}</Text>
      {isImage ? (
        <View className="h-48 items-center justify-center overflow-hidden rounded-md border border-border bg-background">
          <Image source={{ uri: value.file }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        </View>
      ) : (
        <View className="flex-row items-center rounded-md border border-border bg-background px-3 py-3">
          <MaterialCommunityIcons name="file-document-outline" size={22} color={tokens.color.textSecondary} />
          <Text className="ml-2 flex-1 text-body text-textPrimary" numberOfLines={1}>
            {name}
          </Text>
        </View>
      )}
    </View>
  );
}

export function Section2UploadReportFiles({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const hasPreviews = data.measurement.file || data.handwritten_report.file || data.preview_report.file || data.inspection_file.file || data.other.file;

  return (
    <View>
      <SectionCard title="Upload Report File" subtitle="Tip: to upload multiple images or files, press Ctrl to select multiple images. The same procedure is used for uploading subsequent files and images.">
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
          internalFileToggle
        />
        <ReportFileUpload
          label="Preview Report"
          labelCn="预览报告"
          data={data.preview_report}
          onChange={(v) => onChange({ preview_report: v })}
          internalFileFixed
        />
        <ReportFileUpload
          label="Inspection File"
          labelCn="检验文件"
          data={data.inspection_file}
          onChange={(v) => onChange({ inspection_file: v })}
          internalFileFixed
        />
        <ReportFileUpload
          label="Other"
          labelCn="其他"
          data={data.other}
          onChange={(v) => onChange({ other: v })}
          internalFileToggle
        />
      </SectionCard>

      <SectionCard title="Report Preview" subtitle="Uploaded files above are previewed here, grouped by category">
        {!hasPreviews ? (
          <Text className="py-4 text-body italic text-textSecondary">No files uploaded yet.</Text>
        ) : (
          <View className="w-full flex-row flex-wrap justify-between">
            <View className="w-[48%]">
              <PreviewItem label="Measurement" value={data.measurement} />
              <PreviewItem label="Handwritten Report (Internal File)" value={data.handwritten_report} />
              <PreviewItem label="Preview Report (Internal File)" value={data.preview_report} />
            </View>
            <View className="w-[48%]">
              <PreviewItem label="Inspection File (Internal File)" value={data.inspection_file} />
              <PreviewItem label="Other (Internal File)" value={data.other} />
            </View>
          </View>
        )}
      </SectionCard>
    </View>
  );
}
