import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { NumberField } from '../../../components/form/NumberField';
import type { FabricInspectionData } from '../../../features/fabricInspection/types';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = FabricInspectionData['order_fabric_info'];

export function Section1OrderFabricInfo({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title={useLanguage().language === 'en' ? 'Order Information' : '订单信息'} subtitle={useLanguage().language === 'en' ? 'Factory, vendor, job and PO identifiers' : '工厂、供应商、工单和采购订单'}>
        <FormRow>
          <TextField label="Factory" labelCn="工厂" value={data.factory} onChangeText={(v) => onChange({ factory: v })} />
          <TextField label="Vendor / Mill" labelCn="供应商/布厂" value={data.vendorMill} onChangeText={(v) => onChange({ vendorMill: v })} />
          <TextField label="Job #" labelCn="工单号" value={data.jobNo} onChangeText={(v) => onChange({ jobNo: v })} />
          <TextField label="PO" labelCn="订单号" value={data.po} onChangeText={(v) => onChange({ po: v })} />
        </FormRow>
      </SectionCard>

      <SectionCard title={useLanguage().language === 'en' ? 'Fabric Information' : '面料信息'} subtitle={useLanguage().language === 'en' ? 'Style, composition and physical specification' : '款式、成分和物理规格'}>
        <FormRow>
          <TextField label="Style #" labelCn="款号" value={data.style} onChangeText={(v) => onChange({ style: v })} />
          <TextField label="Colour" labelCn="颜色" value={data.colour} onChangeText={(v) => onChange({ colour: v })} />
          <TextField
            label="Fabric Type / Composition"
            labelCn="面料类型/成分"
            value={data.fabricType}
            onChangeText={(v) => onChange({ fabricType: v })}
          />
          <NumberField label="GSM" labelCn="克重" value={data.gsm} onChangeValue={(v) => onChange({ gsm: v })} suffix="g/m²" />
          <NumberField label="Width" labelCn="幅宽(英寸)" value={data.widthIn} onChangeValue={(v) => onChange({ widthIn: v })} suffix="in" />
          <NumberField label="Width" labelCn="幅宽(厘米)" value={data.widthCm} onChangeValue={(v) => onChange({ widthCm: v })} suffix="cm" />
          <TextField label="Construction" labelCn="织造结构" value={data.construction} onChangeText={(v) => onChange({ construction: v })} />
        </FormRow>
      </SectionCard>

      <SectionCard title={useLanguage().language === 'en' ? 'Additional Information' : '附加信息'} subtitle={useLanguage().language === 'en' ? 'Description and lot traceability' : '描述和批号追踪'} style={{ marginBottom: 0 }}>
        <FormRow>
          <TextField label="Description" labelCn="描述" value={data.description} onChangeText={(v) => onChange({ description: v })} />
          <TextField label="Lot #" labelCn="缸号" value={data.lotNo} onChangeText={(v) => onChange({ lotNo: v })} scannable />
        </FormRow>
      </SectionCard>
    </View>
  );
}
