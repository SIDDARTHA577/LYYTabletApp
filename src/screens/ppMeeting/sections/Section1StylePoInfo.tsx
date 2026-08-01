import React from 'react';
import { View, Text } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { DateField } from '../../../components/form/DateField';
import { DropdownField } from '../../../components/form/DropdownField';
import { NumberField } from '../../../components/form/NumberField';
import type { PpMeetingData } from '../../../features/ppMeeting/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = PpMeetingData['style_po_info'];

export function Section1StylePoInfo({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const { t, language } = useLanguage();

  const addColorQty = () => {
    onChange({
      colors_qty: [...(data.colors_qty || []), { color: '', qty: 0 }]
    });
  };

  const updateColorQty = (index: number, field: 'color' | 'qty', value: any) => {
    const updated = [...(data.colors_qty || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ colors_qty: updated });
  };

  const removeColorQty = (index: number) => {
    const updated = [...(data.colors_qty || [])];
    updated.splice(index, 1);
    onChange({ colors_qty: updated });
  };

  const YES_NO_OPTIONS = [
    { value: 'Yes', label: 'Yes / 是' },
    { value: 'No', label: 'No / 否' }
  ];

  return (
    <View>
      <SectionCard title="Style & PO Info" subtitle="款式与订单信息">
        <FormRow>
          <TextField label="Vendor" labelCn="供应商" value={data.vendor} onChangeText={(v) => onChange({ vendor: v })} />
          <TextField label="Factory & Code" labelCn="工厂及代码" value={data.factory_code} onChangeText={(v) => onChange({ factory_code: v })} />
          <TextField label="Style" labelCn="款号" value={data.style} onChangeText={(v) => onChange({ style: v })} />
          <TextField label="PO" labelCn="订单号" value={data.po} onChangeText={(v) => onChange({ po: v })} />
          <TextField label="CPO" labelCn="客户订单号" value={data.cpo} onChangeText={(v) => onChange({ cpo: v })} />
          <TextField label="Brand / Dept" labelCn="品牌/部门" value={data.brand_dept} onChangeText={(v) => onChange({ brand_dept: v })} />
          <TextField label="Description" labelCn="描述" value={data.description} onChangeText={(v) => onChange({ description: v })} />
          <TextField label="Fabrication / Weight" labelCn="成分/克重" value={data.fabrication_weight} onChangeText={(v) => onChange({ fabrication_weight: v })} />
          <TextField label="Season" labelCn="季节" value={data.season} onChangeText={(v) => onChange({ season: v })} />
          <TextField label="Production Country" labelCn="生产国" value={data.production_country} onChangeText={(v) => onChange({ production_country: v })} />
          <DateField label="Delivery / X-Factory Date" labelCn="交期/出货日" value={data.delivery_date} onChangeValue={(v) => onChange({ delivery_date: v })} />
          <TextField label="Sealed Approved Sample # (PPS/GTS)" labelCn="封样编号" value={data.sealed_sample} onChangeText={(v) => onChange({ sealed_sample: v })} />
          <DropdownField label="Key / High-Risk Style" labelCn="重点/高风险款" value={data.high_risk_style} options={YES_NO_OPTIONS} onChangeValue={(v) => onChange({ high_risk_style: v || '' })} />
          <DropdownField label="Multi-Factory Production" labelCn="多工厂生产" value={data.multi_factory} options={YES_NO_OPTIONS} onChangeValue={(v) => onChange({ multi_factory: v || '' })} />
        </FormRow>
      </SectionCard>

      <SectionCard title="Colours & Quantity" subtitle="颜色与数量">
        {(data.colors_qty || []).map((item, idx) => (
          <View key={idx} className="mb-3 flex-row items-center gap-3">
            <TextField label="Colour" labelCn="颜色" value={item.color} onChangeText={(v) => updateColorQty(idx, 'color', v)} width="45%" />
            <NumberField label="Quantity" labelCn="数量" value={item.qty} onChangeValue={(v) => updateColorQty(idx, 'qty', v)} width="45%" />
            <IconButton icon="delete" iconColor={tokens.color.danger} style={{ marginTop: 24 }} onPress={() => removeColorQty(idx)} />
          </View>
        ))}
        <Button mode="outlined" icon="plus" style={{ borderColor: tokens.color.primary, borderRadius: tokens.radius.md, alignSelf: 'flex-start', marginTop: 8 }} onPress={addColorQty}>
          {language === 'en' ? 'Add Colour' : '添加颜色'}
        </Button>
      </SectionCard>
    </View>
  );
}
