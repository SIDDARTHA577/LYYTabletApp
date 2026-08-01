import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, useWindowDimensions, Platform, Keyboard } from 'react-native';
import { ActivityIndicator, Button, Snackbar } from 'react-native-paper';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { AppHeader } from '../../components/AppHeader';
import { SectionCard } from '../../components/SectionCard';
import { SectionProgressRail } from '../../components/SectionProgressRail';
import { createEmptyFieldAuditorData } from '../../features/fieldAuditor/emptyFormData';
import type { FieldAuditorData } from '../../features/fieldAuditor/types';
import { createInspection, getInspection, submitInspection, updateInspection } from '../../api/inspections.api';
import { apiErrorMessage } from '../../api/client';
import { useActivityStore } from '../../features/activity/useActivityStore';
import { useFabricFormNavStore as useFormNavStore } from '../../features/fabricInspection/useFabricFormNavStore';

import { Section1CoverSummary } from './sections/Section1CoverSummary';
import { Section2PreVisitPack } from './sections/Section2PreVisitPack';
import { Section3CompanyOverview } from './sections/Section3CompanyOverview';
import { Section4BusinessStructure } from './sections/Section4BusinessStructure';
import { Section5Workforce } from './sections/Section5Workforce';
import { Section6Machinery } from './sections/Section6Machinery';
import { Section7SampleRoom } from './sections/Section7SampleRoom';
import { Section8SamplingCycle } from './sections/Section8SamplingCycle';
import { Section9FabricTrimsSourcing } from './sections/Section9FabricTrimsSourcing';
import { Section10ProductionFlow } from './sections/Section10ProductionFlow';
import { Section11ComplianceChecklist } from './sections/Section11ComplianceChecklist';
import { Section12QcEquipment } from './sections/Section12QcEquipment';
import { Section13NonNegotiables } from './sections/Section13NonNegotiables';
import { Section14Observations } from './sections/Section14Observations';
import { Section15PhotoLog } from './sections/Section15PhotoLog';
import { Section16PostVisitDecision } from './sections/Section16PostVisitDecision';
import { BottomNavBar } from '../../components/BottomNavBar';
import tokens from '../../theme/tokens';

const SECTIONS = [
  { key: 'cover_summary', title: 'Cover & Summary', icon: 'file-document-outline' },
  { key: 'pre_visit_pack', title: 'Pre-Visit Pack', icon: 'folder-outline' },
  { key: 'company_overview', title: 'Company Overview', icon: 'domain' },
  { key: 'business_structure', title: 'Business Structure', icon: 'graph-outline' },
  { key: 'workforce', title: 'Workforce', icon: 'account-group-outline' },
  { key: 'machinery', title: 'Machinery', icon: 'cog-outline' },
  { key: 'sample_room', title: 'Sample Room & PP', icon: 'palette-swatch-outline' },
  { key: 'sampling_cycle', title: 'Sampling Cycle', icon: 'refresh' },
  { key: 'fabric_trims_sourcing', title: 'Fabric & Trims', icon: 'tshirt-crew-outline' },
  { key: 'production_flow', title: 'Production Flow', icon: 'arrow-right-circle-outline' },
  { key: 'compliance_checklist', title: 'Compliance Checklist', icon: 'clipboard-check-outline' },
  { key: 'qc_equipment', title: 'QC Equipment', icon: 'tools' },
  { key: 'non_negotiables', title: 'Non-Negotiables', icon: 'alert-decagram-outline' },
  { key: 'observations', title: 'Observations', icon: 'eye-outline' },
  { key: 'photo_log', title: 'Photo Log', icon: 'image-multiple-outline' },
  { key: 'post_visit_decision', title: 'Post-Visit Decision', icon: 'gavel' },
] as const;

function generateClientId() {
  return `fa-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function FieldAuditorFormScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const existingId: string | undefined = route.params?.inspectionId;
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const clientId = useRef(generateClientId());
  const serverId = useRef<string | null>(existingId ?? null);
  const scrollRef = useRef<ScrollView>(null);

  const [data, setData] = useState<FieldAuditorData>(createEmptyFieldAuditorData());
  const [loading, setLoading] = useState(Boolean(existingId));
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<string | null>(null);

  const activeSection = useFormNavStore((s) => s.activeSection);
  const setActiveSection = useFormNavStore((s) => s.setActiveSection);
  const markSectionComplete = useFormNavStore((s) => s.markSectionComplete);
  const enter = useFormNavStore((s) => s.enter);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' } as any);
      (document.activeElement as any)?.blur();
    }
    Keyboard.dismiss();

    scrollRef.current?.scrollTo({ y: 0, animated: false });
    const timer = setTimeout(() => {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' } as any);
      }
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, 50);
    return () => clearTimeout(timer);
  }, [activeSection]);

  useFocusEffect(
    useCallback(() => {
      enter(
        SECTIONS.map((s) => ({ key: s.key as any, title: s.title, icon: s.icon })),
        'cover_summary'
      );
      return () => useFormNavStore.getState().exit();
    }, [enter])
  );

  useEffect(() => {
    if (!existingId) return;
    (async () => {
      try {
        const inspection = await getInspection(existingId);
        setData((prev) => ({ ...prev, ...(inspection.data as FieldAuditorData) }));
      } catch (e) {
        setSnackbar(apiErrorMessage(e, 'Could not load this inspection.'));
      } finally {
        setLoading(false);
      }
    })();
  }, [existingId]);

  const updateSection = useCallback(<K extends keyof FieldAuditorData>(key: K, partial: any) => {
    setData((prev) => {
      const isArray = Array.isArray(prev[key]);
      return { ...prev, [key]: isArray ? partial : { ...prev[key], ...partial } };
    });
  }, []);

  const persist = useCallback(async (): Promise<string> => {
    if (serverId.current) {
      await updateInspection(serverId.current, { data });
      return serverId.current;
    }
    const created = await createInspection({ clientId: clientId.current, inspectionType: 'field_auditor' });
    serverId.current = created._id;
    await updateInspection(created._id, { data });
    useActivityStore.getState().add({ type: 'inspection_created', title: 'Factory Check created', detail: data.cover_summary.factory_name_en || undefined });
    return created._id;
  }, [data]);

  const onSaveDraft = async () => {
    setSaving(true);
    try {
      await persist();
      useActivityStore.getState().add({ type: 'inspection_saved', title: 'Draft saved', detail: data.cover_summary.factory_name_en || undefined });
      setSnackbar('Draft saved.');
    } catch (e) {
      setSnackbar(apiErrorMessage(e, 'Could not save draft.'));
    } finally {
      setSaving(false);
    }
  };

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const id = await persist();
      await submitInspection(id);
      useActivityStore.getState().add({ type: 'inspection_submitted', title: 'Factory Check submitted', detail: data.cover_summary.factory_name_en || undefined });
      setSnackbar('Inspection submitted.');
      navigation.goBack();
    } catch (e) {
      setSnackbar(apiErrorMessage(e, 'Could not submit.'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const sectionBody = (
    <>
      {activeSection === 'cover_summary' && <Section1CoverSummary data={data.cover_summary} onChange={(p) => updateSection('cover_summary', p)} />}
      {activeSection === 'pre_visit_pack' && <Section2PreVisitPack data={data.pre_visit_pack} onChange={(p) => updateSection('pre_visit_pack', p)} />}
      {activeSection === 'company_overview' && <Section3CompanyOverview data={data.company_overview} onChange={(p) => updateSection('company_overview', p)} />}
      {activeSection === 'business_structure' && <Section4BusinessStructure data={data.business_structure} onChange={(p) => updateSection('business_structure', p)} />}
      {activeSection === 'workforce' && <Section5Workforce data={data.workforce} onChange={(p) => updateSection('workforce', p)} />}
      {activeSection === 'machinery' && <Section6Machinery data={data.machinery} onChange={(p) => updateSection('machinery', p)} />}
      {activeSection === 'sample_room' && <Section7SampleRoom data={data.sample_room} onChange={(p) => updateSection('sample_room', p)} />}
      {activeSection === 'sampling_cycle' && <Section8SamplingCycle data={data.sampling_cycle} onChange={(p) => updateSection('sampling_cycle', p)} />}
      {activeSection === 'fabric_trims_sourcing' && <Section9FabricTrimsSourcing data={data.fabric_trims_sourcing} onChange={(p) => updateSection('fabric_trims_sourcing', p)} />}
      {activeSection === 'production_flow' && <Section10ProductionFlow data={data.production_flow} onChange={(p) => updateSection('production_flow', p)} />}
      {activeSection === 'compliance_checklist' && <Section11ComplianceChecklist data={data.compliance_checklist} onChange={(p) => updateSection('compliance_checklist', p)} />}
      {activeSection === 'qc_equipment' && <Section12QcEquipment data={data.qc_equipment} onChange={(p) => updateSection('qc_equipment', p)} />}
      {activeSection === 'non_negotiables' && <Section13NonNegotiables data={data.non_negotiables} onChange={(p) => updateSection('non_negotiables', p)} />}
      {activeSection === 'observations' && <Section14Observations data={data.observations} onChange={(p) => updateSection('observations', p)} />}
      {activeSection === 'photo_log' && <Section15PhotoLog data={data.photo_log} onChange={(p) => updateSection('photo_log', p)} />}
      {activeSection === 'post_visit_decision' && <Section16PostVisitDecision data={data.post_visit_decision} onChange={(p) => updateSection('post_visit_decision', p)} />}
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="Factory Check" subtitle={data.cover_summary.factory_name_en || 'New report'} showBack />
      <View className={`flex-1 ${isWide ? 'flex-row' : 'flex-col'}`} style={{ paddingBottom: 82 }}>
        {!isWide && (
          <SectionProgressRail
            sections={SECTIONS.map((s) => ({ key: s.key as any, title: s.title, icon: s.icon }))}
            activeKey={activeSection}
            onSelect={setActiveSection}
            horizontal
          />
        )}
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <ScrollView ref={scrollRef} className="flex-1" contentContainerStyle={isWide ? { padding: 24, paddingBottom: 24 } : { padding: 16, paddingBottom: 16 }}>
            <View className="mb-[18px] flex-row items-center">
              <Text className="text-sectionTitle font-bold text-textPrimary">
                {SECTIONS.find((s) => s.key === activeSection)?.title}
              </Text>
            </View>
            {sectionBody}
          </ScrollView>
          <View className="flex-row items-center justify-between border-t border-border bg-surface p-4">
            <Button
              mode="text"
              icon="chevron-left"
              contentStyle={{ height: 48 }}
              disabled={activeSection === SECTIONS[0].key}
              onPress={() => {
                const idx = SECTIONS.findIndex((s) => s.key === activeSection);
                if (idx > 0) setActiveSection(SECTIONS[idx - 1].key as any);
              }}
            >
              Previous
            </Button>
            <View className="flex-row gap-3">
              {activeSection === SECTIONS[SECTIONS.length - 1].key ? (
                <Button mode="contained" onPress={onSubmit} loading={submitting} disabled={saving || submitting} style={{ borderRadius: tokens.radius.md }} contentStyle={{ height: 48 }}>
                  Submit
                </Button>
              ) : (
                <Button
                  mode="contained"
                  icon="chevron-right"
                  loading={saving}
                  disabled={saving || submitting}
                  style={{ borderRadius: tokens.radius.md }}
                  contentStyle={{ flexDirection: 'row-reverse', height: 48 }}
                  onPress={async () => {
                    markSectionComplete(activeSection);
                    await onSaveDraft();
                    const idx = SECTIONS.findIndex((s) => s.key === activeSection);
                    if (idx < SECTIONS.length - 1) setActiveSection(SECTIONS[idx + 1].key as any);
                  }}
                >
                  Next
                </Button>
              )}
            </View>
          </View>
        </View>
      </View>
      <Snackbar visible={Boolean(snackbar)} onDismiss={() => setSnackbar(null)} duration={3500}>
        {snackbar}
      </Snackbar>
      <BottomNavBar active="inspections" />
    </View>
  );
}
