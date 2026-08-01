import React from 'react';
import { View, Text } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { NumberField } from '../../../components/form/NumberField';
import { DateField } from '../../../components/form/DateField';
import { DropdownField } from '../../../components/form/DropdownField';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';
import { useAuthStore } from '../../../auth/useAuthStore';

type Data = InlineInspectionData['insp_time_po_info'];

const MATERIAL_OPTIONS = [
  { label: 'KNIT', value: 'KNIT' },
  { label: 'WOVEN', value: 'WOVEN' },
  { label: 'SWEATER', value: 'SWEATER' }
];

const PRODUCT_CATEGORY_OPTIONS = [
  { label: 'Adult', value: 'Adult' },
  { label: 'Children', value: 'Children' },
  { label: 'Clothing accessory', value: 'Clothing accessory' }
];

const SECONDARY_CATEGORY_OPTIONS = [
  'Vest', 'Shirt', 'Panties', 'Jumpsuit', 'Crew neck knitwear', 'T-shirt', 'Cardigan',
  'Knitwear', 'Jacket', 'Hoody', 'Coat', 'Down', 'Trench coat', 'Slip dress', 'Dress',
  'Suspender skirt', 'Denim shirt', 'Casual pants', 'Trousers', 'Shorts', 'Swimming trunks',
  'Beach shorts', 'Jeans', 'Boxers', 'Camisole', 'Bra', 'Leggings', 'Swimwear', 'Shapewear',
  'Thong', 'Top + Pants', 'Clothing set', 'Garter', 'Accessories'
].map(cat => ({ label: cat, value: cat }));

export function Section1InspTimePoInfo({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const { language } = useLanguage();
  
  const addStyle = () => {
    onChange({
      styles: [...data.styles, { selected: true, style: '', po: '', cpo: '', po_qty: 0, color_name: '', prepacks: 0, tech_packs: 0 }]
    });
  };

  const updateStyle = (index: number, field: string, value: any) => {
    const newStyles = [...data.styles];
    newStyles[index] = { ...newStyles[index], [field]: value };
    onChange({ styles: newStyles });
  };

  return (
    <View>
      <SectionCard title="Inspection Time & PO Info" subtitle="Basic inspection details">
        <FormRow>
          <TextField label="Factory" labelCn="工厂" value={data.factory} onChangeText={(v) => onChange({ factory: v })} />
          <TextField label="Type" labelCn="类型" value={data.type || 'Inline'} onChangeText={(v) => onChange({ type: v })} />
          
          <DropdownField label="Material" value={data.material} options={MATERIAL_OPTIONS} onChangeValue={(v) => onChange({ material: v })} />
          <DropdownField label="Product Category" value={data.product_category} options={PRODUCT_CATEGORY_OPTIONS} onChangeValue={(v) => onChange({ product_category: v })} />
          <DropdownField label="Secondary Category" value={data.product_secondary_category} options={SECONDARY_CATEGORY_OPTIONS} onChangeValue={(v) => onChange({ product_secondary_category: v })} />
          
          <TextField label="Vendor QC" labelCn="供应商QC" value={data.vendor_qc} onChangeText={(v) => onChange({ vendor_qc: v })} />
          <DropdownField label="Reporting User" value={data.reporting_user ? data.reporting_user[0] : ''} options={[{ label: 'User 1', value: 'User 1' }, { label: 'User 2', value: 'User 2' }]} onChangeValue={(v) => onChange({ reporting_user: [v] })} />
          <TextField label="Second Reporting User" labelCn="第二报告人" value={data.second_reporting ? data.second_reporting[0] : ''} onChangeText={(v) => onChange({ second_reporting: [v] })} />
          <TextField label="Inspector" labelCn="检验员" value={data.inspector && data.inspector.length > 0 ? data.inspector[0] : useAuthStore.getState().user?.name || ''} editable={false} onChangeText={() => {}} />
          
          <NumberField label="Color Count" labelCn="颜色数量" value={data.color_count} onChangeValue={(v) => onChange({ color_count: v })} />
          <DateField label="Inspection Date" labelCn="检验日期" value={data.inspection_date} onChangeValue={(v) => onChange({ inspection_date: v })} />
          
          <DropdownField label="Start Time (Hour)" value={data.start_time?.split(':')[0]} options={Array.from({length: 24}, (_, i) => ({label: `${i}`.padStart(2, '0'), value: `${i}`.padStart(2, '0')}))} onChangeValue={(v) => onChange({ start_time: `${v}:${data.start_time?.split(':')[1] || '00'}` })} />
          <DropdownField label="Start Time (Minute)" value={data.start_time?.split(':')[1]} options={Array.from({length: 60}, (_, i) => ({label: `${i}`.padStart(2, '0'), value: `${i}`.padStart(2, '0')}))} onChangeValue={(v) => onChange({ start_time: `${data.start_time?.split(':')[0] || '00'}:${v}` })} />
          
          <DropdownField label="End Time (Hour)" value={data.end_time?.split(':')[0]} options={Array.from({length: 24}, (_, i) => ({label: `${i}`.padStart(2, '0'), value: `${i}`.padStart(2, '0')}))} onChangeValue={(v) => onChange({ end_time: `${v}:${data.end_time?.split(':')[1] || '00'}` })} />
          <DropdownField label="End Time (Minute)" value={data.end_time?.split(':')[1]} options={Array.from({length: 60}, (_, i) => ({label: `${i}`.padStart(2, '0'), value: `${i}`.padStart(2, '0')}))} onChangeValue={(v) => onChange({ end_time: `${data.end_time?.split(':')[0] || '00'}:${v}` })} />
          
          <TextField label="Report Comments" labelCn="报告备注" value={data.report_comments} onChangeText={(v) => onChange({ report_comments: v })} width="100%" />
        </FormRow>
      </SectionCard>

      <SectionCard title="PO Selection" subtitle="Select POs and Styles">
        {data.styles.length === 0 && (
          <Text className="text-body text-textSecondary italic py-4">No POs selected.</Text>
        )}
        {data.styles.map((style, idx) => (
          <View key={idx} className="mb-4 border border-border p-4 rounded-md bg-background flex-row flex-wrap items-center gap-4">
            <Checkbox.Android status={style.selected ? 'checked' : 'unchecked'} onPress={() => updateStyle(idx, 'selected', !style.selected)} />
            <TextField label="Style" value={style.style} onChangeText={(v) => updateStyle(idx, 'style', v)} width="45%" />
            <TextField label="PO#" value={style.po} onChangeText={(v) => updateStyle(idx, 'po', v)} width="45%" />
            <TextField label="CPO#" value={style.cpo} onChangeText={(v) => updateStyle(idx, 'cpo', v)} width="45%" />
            <NumberField label="PO QTY" value={style.po_qty} onChangeValue={(v) => updateStyle(idx, 'po_qty', v)} width="45%" />
            <TextField label="Color Name" value={style.color_name} onChangeText={(v) => updateStyle(idx, 'color_name', v)} width="45%" />
            <NumberField label="Prepacks" value={style.prepacks} onChangeValue={(v) => updateStyle(idx, 'prepacks', v)} width="45%" />
          </View>
        ))}
        <Button mode="outlined" icon="plus" onPress={addStyle} style={{ marginTop: 8, borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{language === 'en' ? 'Add PO' : '添加订单'}</Button>
      </SectionCard>
    </View>
  );
}
