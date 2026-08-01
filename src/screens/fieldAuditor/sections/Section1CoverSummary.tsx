import React from 'react';
import { View, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { DateField } from '../../../components/form/DateField';
import { DropdownField } from '../../../components/form/DropdownField';
import type { FieldAuditorData } from '../../../features/fieldAuditor/types';

type Data = FieldAuditorData['cover_summary'];

const PRODUCTION_CAPABILITY_ITEMS = [
  'Knitting / Cutting', 'Linking / Sewing', 'Washing',
  'Pressing & Finishing', 'Inspection (in-house)', 'Packing',
  'Sub-contracting (declared)'
];

const COMPLIANCE_SNAPSHOT_ITEMS = [
  'Fire Safety', 'Emergency Exits', 'First Aid',
  'Security — Gate', 'Security — Packing Area', 'QC Equipment',
  'Material Storage', 'Certifications Held'
];

export function Section1CoverSummary({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  const updateCapability = (item: string, field: 'status' | 'notes', value: any) => {
    const current = data.production_capability[item] || { status: '', notes: '' };
    onChange({ production_capability: { ...data.production_capability, [item]: { ...current, [field]: value } } });
  };

  const updateCompliance = (item: string, field: 'status' | 'notes', value: any) => {
    const current = data.compliance_snapshot[item] || { status: '', notes: '' };
    onChange({ compliance_snapshot: { ...data.compliance_snapshot, [item]: { ...current, [field]: value } } });
  };
  return (
    <View>
      <SectionCard title="Cover Summary" subtitle="Factory Details and Cover">
        <FormRow>
          <View style={{ width: '100%' }}>
            <DropdownField 
              label="Factory Type" 
              value={data.factory_type} 
              options={[{ label: 'Knit wear (6K only)', value: 'knit wear' }, { label: 'Cut and sew (6C only)', value: 'cut and sew' }, { label: 'Combined (6K + 6C)', value: 'combined' }]} 
              onChangeValue={(v) => onChange({ factory_type: v })} 
            />
          </View>
          <TextField label="Report Title" value={data.report_title} onChangeText={(v) => onChange({ report_title: v })} />
          <TextField label="Report Subtitle" value={data.report_subtitle} onChangeText={(v) => onChange({ report_subtitle: v })} />
          <TextField label="Factory Name" value={data.factory_name_en} onChangeText={(v) => onChange({ factory_name_en: v })} />
          <TextField label="PO Vendor" value={data.po_vendor_en} onChangeText={(v) => onChange({ po_vendor_en: v })} />
          <TextField label="Location" value={data.location} onChangeText={(v) => onChange({ location: v })} />
          
          <DateField label="Date Established" value={data.date_established} onChangeValue={(v) => onChange({ date_established: v })} />
          <DateField label="Audit Date" value={data.audit_date} onChangeValue={(v) => onChange({ audit_date: v })} />
          
          <TextField label="Prepared By" value={data.prepared_by} onChangeText={(v) => onChange({ prepared_by: v })} />
          <TextField label="Report Month Year" value={data.report_month_year} onChangeText={(v) => onChange({ report_month_year: v })} />
          <TextField label="Factory Size" value={data.factory_size} onChangeText={(v) => onChange({ factory_size: v })} />
          <TextField label="Total Machines" value={data.total_machines} onChangeText={(v) => onChange({ total_machines: v })} />
          <TextField label="Workforce Approx" value={data.workforce_approx} onChangeText={(v) => onChange({ workforce_approx: v })} />
          <TextField label="Peak Monthly Capacity" value={data.peak_monthly_capacity} onChangeText={(v) => onChange({ peak_monthly_capacity: v })} />
        </FormRow>
      </SectionCard>
      
      <SectionCard title="Production Capability" subtitle="Mark applicable production areas">
        {PRODUCTION_CAPABILITY_ITEMS.map((item) => {
          const current = data.production_capability[item] || { status: '', notes: '' };
          return (
            <View key={item} className="mb-2 p-4 border border-border rounded-md bg-background">
              <Text className="font-bold text-textPrimary mb-4">{item}</Text>
              <FormRow>
                <DropdownField 
                  label="Status" 
                  value={current.status} 
                  options={['in house', 'out sourced', 'partial', 'none', 'N/A']} 
                  onChangeValue={(v) => updateCapability(item, 'status', v)} 
                  width="100%" 
                />
                <TextField 
                  label="Notes" 

                  value={current.notes} 
                  onChangeText={(v) => updateCapability(item, 'notes', v)} 
                  width="100%" 
                />
              </FormRow>
            </View>
          );
        })}
      </SectionCard>

      <SectionCard title="Compliance Snapshot" subtitle="Key compliance factors">
        {COMPLIANCE_SNAPSHOT_ITEMS.map((item) => {
          const current = data.compliance_snapshot[item] || { status: '', notes: '' };
          return (
            <View key={item} className="mb-2 p-4 border border-border rounded-md bg-background">
              <Text className="font-bold text-textPrimary mb-4">{item}</Text>
              <FormRow>
                <DropdownField 
                  label="Status" 
                  value={current.status} 
                  options={['pass', 'present', 'absent', 'action req', 'N/A', 'Not recorded']} 
                  onChangeValue={(v) => updateCompliance(item, 'status', v)} 
                  width="100%" 
                />
                <TextField 
                  label="Notes" 

                  value={current.notes} 
                  onChangeText={(v) => updateCompliance(item, 'notes', v)} 
                  width="100%" 
                />
              </FormRow>
            </View>
          );
        })}
      </SectionCard>
    </View>
  );
}
