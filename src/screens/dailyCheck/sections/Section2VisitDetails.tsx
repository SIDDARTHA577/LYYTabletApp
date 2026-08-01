import React from 'react';
import { View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { FormRow } from '../../../components/form/FormRow';
import { TextField } from '../../../components/form/TextField';
import { NumberField } from '../../../components/form/NumberField';
import type { DailyCheckData } from '../../../features/dailyCheck/types';
import { useLanguage } from '../../../i18n/LanguageContext';

type Data = DailyCheckData['visit_details'];

export function Section2VisitDetails({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <View>
      <SectionCard title={useLanguage().language === 'en' ? 'Visit Details' : '拜访详情'} subtitle="Information about the inspection visit">
        <FormRow>
          <TextField label="Date" labelCn="日期 (YYYY-MM-DD)" value={data.date} onChangeText={(v) => onChange({ date: v })} />
          <TextField label="Inspector" labelCn="检验员" value={data.inspector} onChangeText={(v) => onChange({ inspector: v })} />
          <TextField label="Factory" labelCn="工厂" value={data.factory} onChangeText={(v) => onChange({ factory: v })} />
          <TextField label="Audit Stage" labelCn="审核阶段" value={data.audit_stage} onChangeText={(v) => onChange({ audit_stage: v })} />
          <TextField label="Line(s)" labelCn="生产线" value={data.lines} onChangeText={(v) => onChange({ lines: v })} />
          <NumberField label="Sewer Headcount" labelCn="缝纫工人数" value={data.sewer_headcount} onChangeValue={(v) => onChange({ sewer_headcount: v })} />
          <NumberField label="No. Machines Allocated" labelCn="配置机台数" value={data.machines_allocated} onChangeValue={(v) => onChange({ machines_allocated: v })} />
          <NumberField label="No. Machines Running" labelCn="运行机台数" value={data.machines_running} onChangeValue={(v) => onChange({ machines_running: v })} />
        </FormRow>
      </SectionCard>
    </View>
  );
}
