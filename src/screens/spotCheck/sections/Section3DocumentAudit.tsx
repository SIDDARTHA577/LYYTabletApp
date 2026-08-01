import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { DropdownField } from '../../../components/form/DropdownField';
import type { SpotCheckData } from '../../../features/spotCheck/types';

type Data = SpotCheckData['document_audit'];

import { DropdownOption } from '../../../components/form/DropdownField';
import tokens from '../../../theme/tokens';

const STATUS_OPTIONS: DropdownOption[] = [
  { value: 'Available', label: 'Available', icon: 'check-circle', color: tokens.color.success },
  { value: 'Not', label: 'Not Available', icon: 'close-circle', color: tokens.color.danger },
  { value: 'N/A', label: 'N/A', icon: 'minus-circle-outline', color: tokens.color.textSecondary }
];

export function Section3DocumentAudit({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title="Document Audit" subtitle="Verification of required documents">
        <FormRow>
          <DropdownField label="Tech Pack (TP)" labelCn="工艺包" value={data.tech_pack} options={STATUS_OPTIONS} onChangeValue={(v) => onChange({ tech_pack: v as any })} />
          <DropdownField label="PO" labelCn="订单" value={data.po} options={STATUS_OPTIONS} onChangeValue={(v) => onChange({ po: v as any })} />
          <DropdownField label="PPS – Sealed Sample" labelCn="封样" value={data.pps_sample} options={STATUS_OPTIONS} onChangeValue={(v) => onChange({ pps_sample: v as any })} />
          <DropdownField label="Fabric" labelCn="面料" value={data.fabric} options={STATUS_OPTIONS} onChangeValue={(v) => onChange({ fabric: v as any })} />
          <DropdownField label="Accessory" labelCn="辅料" value={data.accessory} options={STATUS_OPTIONS} onChangeValue={(v) => onChange({ accessory: v as any })} />
          <DropdownField label="Trim Card" labelCn="辅料卡" value={data.trim_card} options={STATUS_OPTIONS} onChangeValue={(v) => onChange({ trim_card: v as any })} />
          <DropdownField label="Packing" labelCn="包装" value={data.packing} options={STATUS_OPTIONS} onChangeValue={(v) => onChange({ packing: v as any })} />
          <DropdownField label="Size Spec" labelCn="尺寸规格" value={data.size_spec} options={STATUS_OPTIONS} onChangeValue={(v) => onChange({ size_spec: v as any })} />
        </FormRow>
      </SectionCard>
    </View>
  );
}
