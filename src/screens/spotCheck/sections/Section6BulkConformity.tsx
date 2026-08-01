import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { CheckGrid } from '../../../components/form/CheckGrid';
import { FormRow } from '../../../components/form/FormRow';
import { DropdownField } from '../../../components/form/DropdownField';
import { FileUploadRow } from '../../../components/form/FileUploadRow';
import type { SpotCheckData } from '../../../features/spotCheck/types';

type Data = SpotCheckData['bulk_conformity'];

import { COMMON_STATUS_OPTIONS as STATUS_OPTIONS } from '../../../constants/statusOptions';

const CHECK_POINTS = [
  'Bulk workmanship vs tech pack',
  'Bulk fabric / trim card',
  'Colour / shading by size (XS–XL)',
  'Emb / print & placement',
  'Product measurement',
  'Bulk quality inspection',
  'Bulk label / labelling vs TP',
  'Carton mark / prepack / dimension / polybag warning / packing vs document',
  'Silica gel quantity'
];

export function Section6BulkConformity({ 
  data, 
  onChange,
  specSheetValue,
  onSpecSheetChange
}: { 
  data: Data; 
  onChange: (next: Partial<Data>) => void;
  specSheetValue?: any;
  onSpecSheetChange?: (val: any) => void;
}) {
  const gridValue = CHECK_POINTS.reduce((acc, point) => {
    acc[point] = {
      status: data[point]?.status || null,
      value: data[point]?.comments || ''
    };
    return acc;
  }, {} as Record<string, any>);

  const handleRowChange = (item: string, row: any) => {
    onChange({
      ...data,
      [item]: {
        status: row.status as any,
        comments: row.value
      }
    });
  };

  const fileVal = typeof specSheetValue === 'string' && specSheetValue.startsWith('{') 
    ? JSON.parse(specSheetValue) 
    : typeof specSheetValue === 'object' ? specSheetValue : null;

  return (
    <View>
      <SectionCard title="Bulk Conformity" subtitle="Conformity to standard requirements">
        <CheckGrid
          items={CHECK_POINTS}
          statusOptions={STATUS_OPTIONS}
          value={gridValue}
          onChangeRow={handleRowChange}
        />
        <View className="mt-4 border border-border p-4 rounded-md bg-background">
          <FormRow>
            <DropdownField 
              label="Measurement Result" 
              labelCn="测量结果"
              value={data['Measurement Result']?.status || ''} 
              options={['Pass', 'Fail']} 
              onChangeValue={(v) => handleRowChange('Measurement Result', { status: v, value: data['Measurement Result']?.comments || '' })} 
            />
          </FormRow>
          <View className="mt-4">
            <FileUploadRow
              label="Spec Sheet Upload"
              fileName={fileVal?.name || null}
              onChange={(file) => onSpecSheetChange && onSpecSheetChange(file)}
            />
          </View>
        </View>
      </SectionCard>
    </View>
  );
}
