import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, useWindowDimensions, Platform, Keyboard } from 'react-native';
import { ActivityIndicator, Button, Snackbar } from 'react-native-paper';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { AppHeader } from '../../components/AppHeader';
import { SectionCard } from '../../components/SectionCard';
import { SectionProgressRail } from '../../components/SectionProgressRail';
import { createEmptySpotCheckData } from '../../features/spotCheck/emptyFormData';
import type { SpotCheckData } from '../../features/spotCheck/types';
import { createInspection, getInspection, submitInspection, updateInspection } from '../../api/inspections.api';
import { apiErrorMessage } from '../../api/client';
import { useActivityStore } from '../../features/activity/useActivityStore';
import { useFabricFormNavStore as useFormNavStore } from '../../features/fabricInspection/useFabricFormNavStore';

import { Section1StylePoInfo } from './sections/Section1StylePoInfo';
import { Section2SpotCheckDetails } from './sections/Section2SpotCheckDetails';
import { Section3DocumentAudit } from './sections/Section3DocumentAudit';
import { Section4InProcessChecks } from './sections/Section4InProcessChecks';
import { Section5AqlSpotInspection } from './sections/Section5AqlSpotInspection';
import { Section6BulkConformity } from './sections/Section6BulkConformity';
import { Section7PhotoJournal } from './sections/Section7PhotoJournal';
import { Section8ConclusionCap } from './sections/Section8ConclusionCap';
import { BottomNavBar } from '../../components/BottomNavBar';
import tokens from '../../theme/tokens';

const SECTIONS = [
  { key: 'style_po_info', title: 'Style & PO Info', icon: 'information-outline' },
  { key: 'spot_check_details', title: 'Spot Check Details', icon: 'magnify-scan' },
  { key: 'document_audit', title: 'Document Audit', icon: 'file-document-outline' },
  { key: 'in_process_checks', title: 'In-Process Checks', icon: 'eye-check-outline' },
  { key: 'aql_spot_inspection', title: 'AQL Spot Inspection', icon: 'clipboard-check-outline' },
  { key: 'bulk_conformity', title: 'Bulk Conformity', icon: 'check-decagram-outline' },
  { key: 'photo_journal', title: 'Photo Journal', icon: 'camera-outline' },
  { key: 'conclusion_cap', title: 'Conclusion, CAP & Escalation', icon: 'account-group-outline' },
] as const;

function generateClientId() {
  return `sc-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function SpotCheckFormScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const existingId: string | undefined = route.params?.inspectionId;
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const clientId = useRef(generateClientId());
  const serverId = useRef<string | null>(existingId ?? null);
  const scrollRef = useRef<ScrollView>(null);

  const [data, setData] = useState<SpotCheckData>(createEmptySpotCheckData());
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
        'style_po_info'
      );
      return () => useFormNavStore.getState().exit();
    }, [enter])
  );

  useEffect(() => {
    if (!existingId) return;
    (async () => {
      try {
        const inspection = await getInspection(existingId);
        setData((prev) => ({ ...prev, ...(inspection.data as SpotCheckData) }));
      } catch (e) {
        setSnackbar(apiErrorMessage(e, 'Could not load this inspection.'));
      } finally {
        setLoading(false);
      }
    })();
  }, [existingId]);

  const updateSection = useCallback(<K extends keyof SpotCheckData>(key: K, partial: any) => {
    setData((prev) => {
      const isArray = Array.isArray(prev[key]);
      return { ...prev, [key]: isArray ? partial : { ...(prev[key] as any), ...partial } };
    });
  }, []);

  const persist = useCallback(async (): Promise<string> => {
    if (serverId.current) {
      await updateInspection(serverId.current, { data });
      return serverId.current;
    }
    const created = await createInspection({ clientId: clientId.current, inspectionType: 'spot_check' });
    serverId.current = created._id;
    await updateInspection(created._id, { data });
    useActivityStore.getState().add({ type: 'inspection_created', title: 'Spot Check created', detail: data.style_po_info.style || undefined });
    return created._id;
  }, [data]);

  const onSaveDraft = async () => {
    setSaving(true);
    try {
      await persist();
      useActivityStore.getState().add({ type: 'inspection_saved', title: 'Draft saved', detail: data.style_po_info.style || undefined });
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
      useActivityStore.getState().add({ type: 'inspection_submitted', title: 'Spot Check submitted', detail: data.style_po_info.style || undefined });
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
      {activeSection === 'style_po_info' && <Section1StylePoInfo data={data.style_po_info} onChange={(p) => updateSection('style_po_info', p)} />}
      {activeSection === 'spot_check_details' && <Section2SpotCheckDetails data={data.spot_check_details} onChange={(p) => updateSection('spot_check_details', p)} />}
      {activeSection === 'document_audit' && <Section3DocumentAudit data={data.document_audit} onChange={(p) => updateSection('document_audit', p)} />}
      {activeSection === 'in_process_checks' && <Section4InProcessChecks data={data.in_process_checks} onChange={(p) => updateSection('in_process_checks', p)} />}
      {activeSection === 'aql_spot_inspection' && <Section5AqlSpotInspection data={data.aql_spot_inspection} onChange={(p) => updateSection('aql_spot_inspection', p)} />}
      {activeSection === 'bulk_conformity' && <Section6BulkConformity data={data.bulk_conformity} specSheetValue={data.bulk_conformity_spec_sheet} onSpecSheetChange={(v) => updateSection('bulk_conformity_spec_sheet', v)} onChange={(p) => updateSection('bulk_conformity', p)} />}
      {activeSection === 'photo_journal' && <Section7PhotoJournal data={data.photo_journal} onChange={(p) => updateSection('photo_journal', p)} />}
      {activeSection === 'conclusion_cap' && <Section8ConclusionCap data={data.conclusion_cap} onChange={(p) => updateSection('conclusion_cap', p)} />}
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="Spot Check" subtitle={data.style_po_info.style || 'New inspection'} showBack />
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
