import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, useWindowDimensions, Platform, Keyboard } from 'react-native';
import { ActivityIndicator, Button, Snackbar } from 'react-native-paper';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { AppHeader } from '../../components/AppHeader';
import { SectionCard } from '../../components/SectionCard';
import { SectionProgressRail } from '../../components/SectionProgressRail';
import { createEmptyInlineInspectionData } from '../../features/inlineInspection/emptyFormData';
import type { InlineInspectionData } from '../../features/inlineInspection/types';
import { createInspection, getInspection, submitInspection, updateInspection } from '../../api/inspections.api';
import { apiErrorMessage } from '../../api/client';
import { useActivityStore } from '../../features/activity/useActivityStore';
import { useFabricFormNavStore as useFormNavStore } from '../../features/fabricInspection/useFabricFormNavStore';

import { Section1InspTimePoInfo } from './sections/Section1InspTimePoInfo';
import { Section2UploadReportFiles } from './sections/Section2UploadReportFiles';
import { Section3PpSample } from './sections/Section3PpSample';
import { Section4CuttingReportDocument } from './sections/Section4CuttingReportDocument';
import { Section5Accessories } from './sections/Section5Accessories';
import { Section6ProductionStatus } from './sections/Section6ProductionStatus';
import { Section7ProductionStatusPhotos } from './sections/Section7ProductionStatusPhotos';
import { Section8PrePackaged } from './sections/Section8PrePackaged';
import { Section9CheckPointList } from './sections/Section9CheckPointList';
import { Section10WorkmanshipDefects } from './sections/Section10WorkmanshipDefects';
import { Section11ProductionSafetyMgmt } from './sections/Section11ProductionSafetyMgmt';
import { Section11RandomSamplingMeas } from './sections/Section11RandomSamplingMeas';
import { Section12PhotoJournal } from './sections/Section12PhotoJournal';
import { Section13KeepSample } from './sections/Section13KeepSample';
import { BottomNavBar } from '../../components/BottomNavBar';
import tokens from '../../theme/tokens';

const SECTIONS = [
  { key: 'insp_time_po_info', title: 'Inspection Time & PO Style Info', icon: 'information-outline' },
  { key: 'upload_report_files', title: 'Upload Report Files', icon: 'file-upload-outline' },
  { key: 'pp_sample', title: 'PP Sample', icon: 'tshirt-crew-outline' },
  { key: 'cutting_report_document', title: 'Cutting Report Document', icon: 'file-document-outline' },
  { key: 'accessories', title: 'Accessories', icon: 'tag-multiple-outline' },
  { key: 'production_status', title: 'Production Status', icon: 'chart-box-outline' },
  { key: 'production_status_photos', title: 'Production Status Photos', icon: 'camera-outline' },
  { key: 'pre_packaged', title: 'Pre-Packaged', icon: 'package-variant' },
  { key: 'check_point_list', title: 'Check Point List', icon: 'format-list-checks' },
  { key: 'workmanship_defects', title: 'Workmanship Defects', icon: 'alert-circle-outline' },
  { key: 'production_safety_mgmt', title: 'Production Safety Mgmt', icon: 'shield-check-outline' },
  { key: 'random_sampling_meas', title: 'Random Sampling - Meas', icon: 'tape-measure' },
  { key: 'photo_journal', title: 'Photo Journal', icon: 'image-multiple-outline' },
  { key: 'keep_sample', title: 'Keep Sample', icon: 'archive-outline' },
] as const;

function generateClientId() {
  return `ii-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function InlineInspectionFormScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const existingId: string | undefined = route.params?.inspectionId;
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const clientId = useRef(generateClientId());
  const serverId = useRef<string | null>(existingId ?? null);
  const scrollRef = useRef<ScrollView>(null);

  const [data, setData] = useState<InlineInspectionData>(createEmptyInlineInspectionData());
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
        'insp_time_po_info'
      );
      return () => useFormNavStore.getState().exit();
    }, [enter])
  );

  useEffect(() => {
    if (!existingId) return;
    (async () => {
      try {
        const inspection = await getInspection(existingId);
        setData((prev) => ({ ...prev, ...(inspection.data as InlineInspectionData) }));
      } catch (e) {
        setSnackbar(apiErrorMessage(e, 'Could not load this inspection.'));
      } finally {
        setLoading(false);
      }
    })();
  }, [existingId]);

  const updateSection = useCallback(<K extends keyof InlineInspectionData>(key: K, partial: any) => {
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
    const created = await createInspection({ clientId: clientId.current, inspectionType: 'inline_inspection' });
    serverId.current = created._id;
    await updateInspection(created._id, { data });
    useActivityStore.getState().add({ type: 'inspection_created', title: 'Inline Inspection created', detail: data.insp_time_po_info.factory || undefined });
    return created._id;
  }, [data]);

  const onSaveDraft = async () => {
    setSaving(true);
    try {
      await persist();
      useActivityStore.getState().add({ type: 'inspection_saved', title: 'Draft saved', detail: data.insp_time_po_info.factory || undefined });
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
      useActivityStore.getState().add({ type: 'inspection_submitted', title: 'Inline Inspection submitted', detail: data.insp_time_po_info.factory || undefined });
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
      {activeSection === 'insp_time_po_info' && <Section1InspTimePoInfo data={data.insp_time_po_info} onChange={(p) => updateSection('insp_time_po_info', p)} />}
      {activeSection === 'upload_report_files' && <Section2UploadReportFiles data={data.upload_report_files} onChange={(p) => updateSection('upload_report_files', p)} />}
      {activeSection === 'pp_sample' && <Section3PpSample data={data.pp_sample} onChange={(p) => updateSection('pp_sample', p)} />}
      {activeSection === 'cutting_report_document' && <Section4CuttingReportDocument data={data.cutting_report_document} onChange={(p) => updateSection('cutting_report_document', p)} />}
      {activeSection === 'accessories' && <Section5Accessories data={data.accessories} onChange={(p) => updateSection('accessories', p)} />}
      {activeSection === 'production_status' && <Section6ProductionStatus data={data.production_status} onChange={(p) => updateSection('production_status', p)} />}
      {activeSection === 'production_status_photos' && <Section7ProductionStatusPhotos data={data.production_status_photos} onChange={(p) => updateSection('production_status_photos', p)} />}
      {activeSection === 'pre_packaged' && <Section8PrePackaged data={data.pre_packaged} onChange={(p) => updateSection('pre_packaged', p)} />}
      {activeSection === 'check_point_list' && <Section9CheckPointList data={data.check_point_list} onChange={(p) => updateSection('check_point_list', p)} />}
      {activeSection === 'workmanship_defects' && <Section10WorkmanshipDefects data={data.workmanship_defects} onChange={(p) => updateSection('workmanship_defects', p)} />}
      {activeSection === 'production_safety_mgmt' && <Section11ProductionSafetyMgmt data={data.production_safety_mgmt} onChange={(p) => updateSection('production_safety_mgmt', p)} />}
      {activeSection === 'random_sampling_meas' && <Section11RandomSamplingMeas data={data.random_sampling_meas} onChange={(p) => updateSection('random_sampling_meas', p)} />}
      {activeSection === 'photo_journal' && <Section12PhotoJournal data={data.photo_journal} onChange={(p) => updateSection('photo_journal', p)} />}
      {activeSection === 'keep_sample' && <Section13KeepSample data={data.keep_sample} onChange={(p) => updateSection('keep_sample', p)} />}
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="Inline Inspection" subtitle={data.insp_time_po_info.factory || 'New inspection'} showBack />
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
