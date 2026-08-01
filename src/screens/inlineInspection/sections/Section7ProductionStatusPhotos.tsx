import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { SectionCard } from '../../../components/SectionCard';
import { PhotoSlot } from '../../../components/form/PhotoSlot';
import { DropdownField } from '../../../components/form/DropdownField';
import type { InlineInspectionData } from '../../../features/inlineInspection/types';
import tokens from '../../../theme/tokens';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = InlineInspectionData['production_status_photos'];

import { DropdownOption } from '../../../components/form/DropdownField';

const STATUS_OPTIONS: DropdownOption[] = [
  'Inspect Site', 'Fabric Weight Check', 'PP Sample', 'Summary', 'Shipment Sample',
  'Main Materials Situation', 'Sewing Workshop', 'Broken Needle Inspection', 'Defect And Corrective Action',
  'Inspection Of Special Cutting', 'Size Check', 'Check EMB Size', 'Top Main Label Placement Check',
  'Cutting Daily Inspection', 'Inline Checking', 'Pressing Area', 'Product Safe Management',
  'Embroidering/Printing Position Check', 'Pants Main Label Placement Check', 'Production Line Daily Inspection',
  'Needle Inspection', 'Comparison Between Approved Sample', 'Care Label Check', 'Full Size Bulk Trim Card',
  'Bulk Fitting Photo', 'Carton Mark Checking', 'Bulks In Carton And Carton Ply', 'Poly Bag Warning And Desiccant',
  'Checking & Packing Area', 'Carton Marking With Sticker Check', 'Packing And Ratio Inspection',
  'Hanger And Hanger Packing Check', 'Cartons', 'Carton Dimension/Weight Check',
  'Price Ticket/Hangtag and Placement', 'Summary Of Major Issues',
].map(opt => ({ value: opt, label: opt, icon: 'camera-outline' }));

export function Section7ProductionStatusPhotos({ data, onChange }: { data: Data; onChange: (next: Data) => void }) {
  const addPhoto = () => onChange([...data, { file: '', status: '' }]);
  const updatePhoto = (idx: number, field: string, value: any) => {
    const arr = [...data];
    arr[idx] = { ...arr[idx], [field]: value };
    onChange(arr);
  };

  return (
    <View>
      <SectionCard title="Production Status Photos" subtitle="Upload photos per production stage">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          {data.map((item, idx) => (
            <View key={idx} className="mb-4 border border-border p-4 rounded-md bg-background w-[300px]">
              <DropdownField label="Status" value={item.status} options={STATUS_OPTIONS} onChangeValue={(v) => updatePhoto(idx, 'status', v)} width="100%" />
              <View className="mt-4">
                <PhotoSlot label={`Photo ${idx + 1}`} uri={item.file} onChange={(uri) => updatePhoto(idx, 'file', uri)} />
              </View>
            </View>
          ))}
        </View>
        <Button mode="outlined" icon="plus" onPress={addPhoto} style={{ marginTop: 8, alignSelf: 'flex-start', borderColor: tokens.color.primary, borderRadius: tokens.radius.md }}>{useLanguage().language === 'en' ? 'Add Photo' : '添加照片'}</Button>
      </SectionCard>
    </View>
  );
}
