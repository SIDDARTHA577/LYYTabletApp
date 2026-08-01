import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { NumberField } from '../../../components/form/NumberField';
import { TextField } from '../../../components/form/TextField';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import { DropdownField } from '../../../components/form/DropdownField';
import type { FinalInspectionData } from '../../../features/finalInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = FinalInspectionData['cutting_report'];

export function Section3CuttingReport({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const addDocument = () => onChange({ documents: [...data.documents, ''] });
  const updateDocument = (idx: number, uri: string) => {
    const arr = [...data.documents];
    arr[idx] = uri;
    onChange({ documents: arr });
  };

  return (
    <View>
      <SectionCard title="Cutting Report" subtitle="Quantities and standard">
        <FormRow>
          <NumberField label="Order Qty" labelCn="订单数量" value={data.order_qty} onChangeValue={(v) => onChange({ order_qty: v })} />
          <NumberField label="Consignment Qty" labelCn="交货数量" value={data.consignment_qty} onChangeValue={(v) => onChange({ consignment_qty: v })} />
          <NumberField label="Cutting Qty(Fty)" labelCn="工厂裁剪数量" value={data.cutting_qty_fty} onChangeValue={(v) => onChange({ cutting_qty_fty: v })} />
          <TextField label="AQL Level" labelCn="AQL水平" value={data.aql_level} onChangeText={(v) => onChange({ aql_level: v })} />
          <TextField label="Sampling Carton" labelCn="抽样箱数" value={data.sampling_carton} onChangeText={(v) => onChange({ sampling_carton: v })} />
          <DropdownField label="Sample Size Level" value={data.sample_size_level} options={[{label: 'LEVEL I', value: 'LEVEL I'}, {label: 'LEVEL II', value: 'LEVEL II'}, {label: 'LEVEL III', value: 'LEVEL III'}]} onChangeValue={(v) => onChange({ sample_size_level: v })} />
          <DropdownField label="AQL Standard" value={data.aql_standard} options={[{label: 'AQL1.0–AQL1.5', value: 'AQL1.0–AQL1.5'}, {label: 'AQL2.5–AQL4.0', value: 'AQL2.5–AQL4.0'}, {label: 'AQL4.0–AQL4.5', value: 'AQL4.0–AQL4.5'}]} onChangeValue={(v) => onChange({ aql_standard: v })} />
        </FormRow>
      </SectionCard>

      <SectionCard title="Cutting Report Documents" subtitle="Upload file table">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {data.documents.map((doc, idx) => (
            <PhotoSlot key={idx} label={`Document ${idx + 1}`} uri={doc} onChange={(uri) => updateDocument(idx, uri)} />
          ))}
        </View>
        <Button mode="outlined" icon="upload" onPress={addDocument} style={{ marginTop: 8, alignSelf: 'flex-start', borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{useLanguage().language === 'en' ? 'Upload File' : '上传文件'}</Button>
      </SectionCard>
    </View>
  );
}
