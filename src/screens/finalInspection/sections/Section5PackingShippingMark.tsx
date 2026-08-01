import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { NumberField } from '../../../components/form/NumberField';
import { TextField } from '../../../components/form/TextField';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import { DropdownField } from '../../../components/form/DropdownField';
import { FileUploadRow } from '../../../components/form/FileUploadRow';
import type { FinalInspectionData } from '../../../features/finalInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = FinalInspectionData['packing_shipping_mark'];

import { DropdownOption } from '../../../components/form/DropdownField';

const STATUS_OPTIONS: DropdownOption[] = [
  { value: 'OK', label: 'OK', icon: 'check-circle', color: tokens.color.success },
  { value: 'Not Conform', label: 'Not Conform', icon: 'close-circle', color: tokens.color.danger }
];

const APPROVED_REJECTED_OPTIONS: DropdownOption[] = [
  { value: 'Approved', label: 'Approved', icon: 'check-circle', color: tokens.color.success },
  { value: 'Rejected', label: 'Rejected', icon: 'close-circle', color: tokens.color.danger }
];

const OVERALL_STATUS_OPTIONS: DropdownOption[] = [
  { value: 'Approved', label: 'Approved', icon: 'check-circle', color: tokens.color.success },
  { value: 'Rejected', label: 'Rejected', icon: 'close-circle', color: tokens.color.danger },
  { value: 'N/A', label: 'N/A', icon: 'minus-circle-outline', color: tokens.color.textSecondary }
];

export function Section5PackingShippingMark({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const addPhoto = () => onChange({ photos: [...data.photos, { type: '', file: '' }] });
  const updatePhoto = (idx: number, field: string, value: any) => {
    const arr = [...data.photos];
    arr[idx] = { ...arr[idx], [field]: value };
    onChange({ photos: arr });
  };

  return (
    <View>
      <SectionCard title="Packing & Shipping Mark" subtitle="Weight, Measurement, and Packaging details">
        <FormRow>
          <View className="flex-1 w-full flex-row flex-wrap gap-4">
            <View className="w-[45%]">
              <Text className="font-bold text-textPrimary mb-4">Weight</Text>
              <NumberField label="Value" value={data.weight.value} onChangeValue={(v) => onChange({ weight: { ...data.weight, value: v || 0 } })} width="100%" />
              <DropdownField label="Unit" value={data.weight.unit} options={[{label: 'lbs', value: 'lbs'}, {label: 'kg', value: 'kg'}]} onChangeValue={(v) => onChange({ weight: { ...data.weight, unit: v } })} width="100%" />
              <DropdownField label="Status" value={data.weight.status} options={APPROVED_REJECTED_OPTIONS} onChangeValue={(v) => onChange({ weight: { ...data.weight, status: v } })} width="100%" />
              <TextField label="Comment" value={data.weight.comment} onChangeText={(v) => onChange({ weight: { ...data.weight, comment: v } })} width="100%" />
            </View>

            <View className="w-[45%]">
              <Text className="font-bold text-textPrimary mb-4">Measurement</Text>
              <NumberField label="Value" value={data.measurement.value} onChangeValue={(v) => onChange({ measurement: { ...data.measurement, value: v || 0 } })} width="100%" />
              <DropdownField label="Unit" value={data.measurement.unit} options={[{label: 'cm', value: 'cm'}, {label: 'inch', value: 'inch'}]} onChangeValue={(v) => onChange({ measurement: { ...data.measurement, unit: v } })} width="100%" />
              <DropdownField label="Status" value={data.measurement.status} options={APPROVED_REJECTED_OPTIONS} onChangeValue={(v) => onChange({ measurement: { ...data.measurement, status: v } })} width="100%" />
              <TextField label="Comment" value={data.measurement.comment} onChangeText={(v) => onChange({ measurement: { ...data.measurement, comment: v } })} width="100%" />
            </View>
          </View>
        </FormRow>
      </SectionCard>

      <SectionCard title={useLanguage().language === 'en' ? 'Packaging Details' : '包装详情'} subtitle={useLanguage().language === 'en' ? 'Cartons and Balance' : '纸箱和余额'}>
        <FormRow>
          <NumberField label="Packed Garments" value={data.packaging.packed_garments} onChangeValue={(v) => onChange({ packaging: { ...data.packaging, packed_garments: v || 0 } })} />
          <NumberField label="Packed Percent" value={data.packaging.packed_percent} onChangeValue={(v) => onChange({ packaging: { ...data.packaging, packed_percent: v || 0 } })} />
          <NumberField label="Carton Qty" value={data.packaging.carton_qty} onChangeValue={(v) => onChange({ packaging: { ...data.packaging, carton_qty: v || 0 } })} />
          <NumberField label="Balance Qty" value={data.packaging.balance_qty} onChangeValue={(v) => onChange({ packaging: { ...data.packaging, balance_qty: v || 0 } })} />
          <NumberField label="Balance Percent" value={data.packaging.balance_percent} onChangeValue={(v) => onChange({ packaging: { ...data.packaging, balance_percent: v || 0 } })} />
          <DropdownField label="Status" value={data.packaging.status} options={APPROVED_REJECTED_OPTIONS} onChangeValue={(v) => onChange({ packaging: { ...data.packaging, status: v } })} />
          
          <NumberField label="Pre-Pack / Individually Bagged" value={data.pre_pack.value} onChangeValue={(v) => onChange({ pre_pack: { value: v || 0 } })} />
          <DropdownField label="Packing Method" value={data.packing_method} options={[{label: 'Individually Bagged', value: 'Individually Bagged'}, {label: 'Prepack', value: 'Prepack'}, {label: 'Multi-Pieces In One Polybag', value: 'Multi-Pieces In One Polybag'}]} onChangeValue={(v) => onChange({ packing_method: v })} />
        </FormRow>
      </SectionCard>

      <SectionCard title={useLanguage().language === 'en' ? 'Overall Assessment' : '总体评估'} subtitle={useLanguage().language === 'en' ? 'General status and comment' : '总体状态和备注'}>
        <FormRow>
          <DropdownField label="Overall Status" value={data.overall.status} options={OVERALL_STATUS_OPTIONS} onChangeValue={(v) => onChange({ overall: { ...data.overall, status: v } })} />
          <TextField label="Overall Comment" value={data.overall.comment} onChangeText={(v) => onChange({ overall: { ...data.overall, comment: v } })} width="100%" />
        </FormRow>
      </SectionCard>

      <SectionCard title={useLanguage().language === 'en' ? 'Shipping Mark Photos' : '唛头照片'} subtitle={useLanguage().language === 'en' ? 'Upload carton marks and related photos' : '上传纸箱标记及相关照片'}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          {data.photos.map((item, idx) => (
            <View key={idx} className="mb-4 border border-border p-4 rounded-md bg-background w-[100%] max-w-[400px]">
              <TextField label="Photo/Zip Type" value={item.type} onChangeText={(v) => updatePhoto(idx, 'type', v)} width="100%" />
              <View className="mt-4">
                <FileUploadRow 
                  label={`Upload ${idx + 1}`} 
                  fileName={item.file ? item.file.split('/').pop() || item.file : null} 
                  onChange={(file) => updatePhoto(idx, 'file', file?.uri || '')} 
                />
              </View>
            </View>
          ))}
        </View>
        <Button mode="outlined" icon="plus" onPress={addPhoto} style={{ marginTop: 8, alignSelf: 'flex-start', borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{useLanguage().language === 'en' ? 'Add Photo' : '添加照片'}</Button>
      </SectionCard>
    </View>
  );
}
