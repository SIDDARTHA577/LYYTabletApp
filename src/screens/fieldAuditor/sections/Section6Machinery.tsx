import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { TextField } from '../../../components/form/TextField';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['machinery'];

const KNITWEAR_1 = ['12-gauge Computer Flat Knitting Machines', '7-gauge Computer Flat Knitting Machines', '3/5-gauge Computer Flat Knitting Machines', 'Whole-garment Knitting Machines', 'Hand-flat Knitting Machines', 'Yarn Winding Machines', 'Yarn Dyeing / Steaming (if in-house)', 'Other knitting equipment'];
const KNITWEAR_2 = ['Linking Machines', 'Mending Stations', 'Panel Inspection Stations'];
const KNITWEAR_3 = ['Round-neck Sweaters', 'Zip Cardigans', 'Hooded Sweaters', 'Polo Sweaters', 'Cardigans (button)', 'Whole-garment Pieces', 'Other (specify)'];

const CUT_SEW_1 = ['Manual cutting table with straight knife', 'Band knife / precision cutter', 'Automatic / CAD-driven cutting bed', 'Fabric spreading machine', 'Fabric inspection machine (4-point system)', 'Fabric relaxation tables / area', 'Cutting marker / pattern software in use', 'Cutter mechanic / sharpening station'];
const CUT_SEW_2 = ['Average daily cutting volume (pcs/day)', 'Maximum spread width (cm)', 'Maximum spread length (m)', 'Average ply height per spread', 'Fabric utilisation target (%)', 'Cut-piece bundling / numbering system', 'Cut-piece inspection regime'];
const CUT_SEW_3 = ['Plain stitching / lockstitch', 'Safety stitch / 5-thread overlock', 'Overlock / 3-thread serger', 'Coverstitch / flatlock', 'Twin-needle / double-needle', 'Bartack machine', 'Buttonhole machine', 'Button attaching machine', 'Other sewing equipment'];
const CUT_SEW_4 = ['Number of independent sewing lines', 'Average operators per line', 'Line balancing methodology (SAM / GSD / none)', 'Inline inspection points (per line)', 'Mechanic-to-machine ratio', 'Operator skill matrix maintained?', 'Production tracking — manual / digital / hybrid'];
const CUT_SEW_5 = ['Continuous fusing press', 'Flat-bed / platen fusing press', 'Bonded peel test (Y/N + records)', 'Interlining storage area separate (clean, dry)'];
const CUT_SEW_6 = ['Industrial washing machines', 'Garment dyeing tank / dye machine', 'Hydro-extractor', 'Tumble dryer', 'Stone wash / enzyme wash equipment', 'Effluent treatment (ETP) on/off site', 'Sandblasting equipment (PROHIBITED)', 'Container fumigation / chemical spraying (PROHIBITED)'];
const CUT_SEW_7 = ['Crew-neck T-shirts', 'Polo Shirts', 'Vests / Camisoles', 'Long Trousers', 'Shorts', 'Hoodies / Sweatshirts', 'Woven Shirts', 'Other (specify)'];

const FINISHING_1 = ['Industrial steam press / fusing press', 'Vacuum ironing table', 'Steam iron with boiler', 'Steam tunnel', 'Form finisher / dummy press', 'Total pressing stations', 'Boiler / steam system (centralised vs local)'];
const FINISHING_2 = ['Inline / end-line inspection tables', 'Final inspection tables', 'Folding tables', 'Polybagging / packing tables', 'Carton sealing equipment', 'Weighing scales (in/out)'];

export function Section6Machinery({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const updateEquip = (category: keyof Data, item: string, field: 'qty' | 'brand_model' | 'notes', value: string) => {
    const current = (data[category] as any)[item] || { qty: '', brand_model: '', notes: '' };
    onChange({ [category]: { ...data[category], [item]: { ...current, [field]: value } } });
  };
  
  const updateStatus = (category: keyof Data, item: string, field: 'status' | 'notes', value: string) => {
    const current = (data[category] as any)[item] || { status: '', notes: '' };
    onChange({ [category]: { ...data[category], [item]: { ...current, [field]: value } } });
  };

  const updateCapKnit = (category: keyof Data, item: string, field: 'monthly_capacity' | 'daily_output' | 'notes', value: string) => {
    const current = (data[category] as any)[item] || { monthly_capacity: '', daily_output: '', notes: '' };
    onChange({ [category]: { ...data[category], [item]: { ...current, [field]: value } } });
  };

  const updateCapSew = (category: keyof Data, item: string, field: 'monthly_capacity' | 'daily_equivalent' | 'notes', value: string) => {
    const current = (data[category] as any)[item] || { monthly_capacity: '', daily_equivalent: '', notes: '' };
    onChange({ [category]: { ...data[category], [item]: { ...current, [field]: value } } });
  };

  const renderEquipGrid = (title: string, sub: string, items: string[], category: keyof Data) => (
    <SectionCard title={title} subtitle={sub}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={{ minWidth: 1400, width: '100%' }}>
          <View style={{ flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 }}>
            <Text style={{ width: 400, fontWeight: 'bold' }}>Equipment</Text>
            <Text style={{ width: 200, fontWeight: 'bold' }}>Qty</Text>
            <Text style={{ width: 350, fontWeight: 'bold' }}>Brand / Model</Text>
            <Text style={{ width: 400, fontWeight: 'bold' }}>Notes</Text>
          </View>
          {items.map(item => {
            const current = (data[category] as any)[item] || { qty: '', brand_model: '', notes: '' };
            return (
              <View key={item} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                <Text style={{ width: 400, fontWeight: 'bold' }}>{item}</Text>
                <View style={{ width: 200 }}><TextField label="" value={current.qty} onChangeText={(v) => updateEquip(category, item, 'qty', v)} keyboardType="numeric" /></View>
                <View style={{ width: 350 }}><TextField label="" value={current.brand_model} onChangeText={(v) => updateEquip(category, item, 'brand_model', v)} /></View>
                <View style={{ width: 400 }}><TextField label="" value={current.notes} onChangeText={(v) => updateEquip(category, item, 'notes', v)} /></View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SectionCard>
  );

  const renderStatusGrid = (title: string, sub: string, items: string[], category: keyof Data) => (
    <SectionCard title={title} subtitle={sub}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={{ minWidth: 1400, width: '100%' }}>
          <View style={{ flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 }}>
            <Text style={{ width: '40%', fontWeight: 'bold' }}>Item</Text>
            <Text style={{ width: '20%', fontWeight: 'bold' }}>Value/Status</Text>
            <Text style={{ width: '40%', fontWeight: 'bold' }}>Notes</Text>
          </View>
          {items.map(item => {
            const current = (data[category] as any)[item] || { status: '', notes: '' };
            return (
              <View key={item} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                <Text style={{ width: '40%', fontWeight: 'bold' }}>{item}</Text>
                <View style={{ width: '20%' }}><TextField label="" value={current.status} onChangeText={(v) => updateStatus(category, item, 'status', v)} /></View>
                <View style={{ width: '40%' }}><TextField label="" value={current.notes} onChangeText={(v) => updateStatus(category, item, 'notes', v)} /></View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SectionCard>
  );

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}>6K. Machinery — Knitwear</Text>
      {renderEquipGrid("6K.1 Knitting Machinery", "", KNITWEAR_1, 'knitwear_1')}
      {renderEquipGrid("6K.2 Linking & Mending", "", KNITWEAR_2, 'knitwear_2')}
      <SectionCard title="6K.3 Monthly Output Capacity" subtitle="Knitwear">
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={{ minWidth: 1400, width: '100%' }}>
            <View style={{ flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 }}>
              <Text style={{ width: '33%', fontWeight: 'bold' }}>Product Type</Text>
              <Text style={{ width: '17%', fontWeight: 'bold' }}>Monthly Capacity</Text>
              <Text style={{ width: '17%', fontWeight: 'bold' }}>Daily per Machine</Text>
              <Text style={{ width: '33%', fontWeight: 'bold' }}>Notes</Text>
            </View>
            {KNITWEAR_3.map(item => {
              const current = (data.knitwear_3 as any)[item] || { monthly_capacity: '', daily_output: '', notes: '' };
              return (
                <View key={item} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                  <Text style={{ width: '33%', fontWeight: 'bold' }}>{item}</Text>
                  <View style={{ width: '17%' }}><TextField label="" value={current.monthly_capacity} onChangeText={(v) => updateCapKnit('knitwear_3', item, 'monthly_capacity', v)} keyboardType="numeric" /></View>
                  <View style={{ width: '17%' }}><TextField label="" value={current.daily_output} onChangeText={(v) => updateCapKnit('knitwear_3', item, 'daily_output', v)} keyboardType="numeric" /></View>
                  <View style={{ width: '33%' }}><TextField label="" value={current.notes} onChangeText={(v) => updateCapKnit('knitwear_3', item, 'notes', v)} /></View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SectionCard>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}>6C. Machinery — Cut & Sew</Text>
      {renderEquipGrid("6C.1 Cutting Room Equipment", "", CUT_SEW_1, 'cut_sew_1')}
      {renderStatusGrid("6C.2 Cutting Room Capacity & Practice", "", CUT_SEW_2, 'cut_sew_2')}
      {renderEquipGrid("6C.3 Sewing Machinery (expanded)", "", CUT_SEW_3, 'cut_sew_3')}
      {renderStatusGrid("6C.4 Sewing Floor Layout & Production Lines", "", CUT_SEW_4, 'cut_sew_4')}
      {renderEquipGrid("6C.5 Fusing & Interlining", "", CUT_SEW_5, 'cut_sew_5')}
      {renderEquipGrid("6C.6 Wet Processing", "", CUT_SEW_6, 'cut_sew_6')}
      <SectionCard title="6C.7 Monthly Output Capacity" subtitle="Cut & Sew">
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={{ minWidth: 1400, width: '100%' }}>
            <View style={{ flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 }}>
              <Text style={{ width: '33%', fontWeight: 'bold' }}>Product Type</Text>
              <Text style={{ width: '17%', fontWeight: 'bold' }}>Monthly Capacity</Text>
              <Text style={{ width: '17%', fontWeight: 'bold' }}>Daily Equivalent</Text>
              <Text style={{ width: '33%', fontWeight: 'bold' }}>Notes</Text>
            </View>
            {CUT_SEW_7.map(item => {
              const current = (data.cut_sew_7 as any)[item] || { monthly_capacity: '', daily_equivalent: '', notes: '' };
              return (
                <View key={item} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                  <Text style={{ width: '33%', fontWeight: 'bold' }}>{item}</Text>
                  <View style={{ width: '17%' }}><TextField label="" value={current.monthly_capacity} onChangeText={(v) => updateCapSew('cut_sew_7', item, 'monthly_capacity', v)} keyboardType="numeric" /></View>
                  <View style={{ width: '17%' }}><TextField label="" value={current.daily_equivalent} onChangeText={(v) => updateCapSew('cut_sew_7', item, 'daily_equivalent', v)} keyboardType="numeric" /></View>
                  <View style={{ width: '33%' }}><TextField label="" value={current.notes} onChangeText={(v) => updateCapSew('cut_sew_7', item, 'notes', v)} /></View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SectionCard>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}>6F. Machinery — Common Finishing</Text>
      {renderEquipGrid("6F.1 Pressing & Finishing", "", FINISHING_1, 'common_finishing_1')}
      {renderEquipGrid("6F.2 Inspection & Packing Stations", "", FINISHING_2, 'common_finishing_2')}
    </View>
  );
}
