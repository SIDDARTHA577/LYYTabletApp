import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, useWindowDimensions, Platform, Keyboard } from 'react-native';
import { ActivityIndicator, Button, Snackbar } from 'react-native-paper';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { AppHeader } from '../../components/AppHeader';
import { SectionCard } from '../../components/SectionCard';
import { SectionProgressRail } from '../../components/SectionProgressRail';
import { createEmptyFabricInspectionData } from '../../features/fabricInspection/emptyFormData';
import { recomputeFabricInspectionData } from '../../features/fabricInspection/calculations';
import type { FabricInspectionData } from '../../features/fabricInspection/types';
import { createInspection, getInspection, submitInspection, updateInspection } from '../../api/inspections.api';
import { apiErrorMessage } from '../../api/client';
import { useActivityStore } from '../../features/activity/useActivityStore';
import { useFabricFormNavStore } from '../../features/fabricInspection/useFabricFormNavStore';

import { Section1OrderFabricInfo } from './sections/Section1OrderFabricInfo';
import { Section2InspectionDetails } from './sections/Section2InspectionDetails';
import { Section3AcceptanceCriteria } from './sections/Section3AcceptanceCriteria';
import { Section4RollByRoll } from './sections/Section4RollByRoll';
import { Section5DefectLog } from './sections/Section5DefectLog';
import { Section6DefectSummaryResult } from './sections/Section6DefectSummaryResult';
import { Section7ShadeWidthPhysical } from './sections/Section7ShadeWidthPhysical';
import { Section8LabTestReports } from './sections/Section8LabTestReports';
import { Section9PhotoJournal } from './sections/Section9PhotoJournal';
import { Section10ConclusionSignoff } from './sections/Section10ConclusionSignoff';
import { BottomNavBar } from '../../components/BottomNavBar';
import { FabricInstructionsModal } from './sections/FabricInstructionsModal';
import { useLanguage } from '../../i18n/LanguageContext';
import tokens from '../../theme/tokens';

const SECTIONS = [
  { key: 'order_fabric_info', title: 'Order & Fabric Info', icon: 'information-outline' },
  { key: 'inspection_details', title: 'Inspection Details', icon: 'text-box-outline' },
  { key: 'acceptance_criteria', title: '4-Point Criteria', icon: 'check-decagram-outline' },
  { key: 'defect_log', title: 'Defect Log', icon: 'bug-outline' },
  { key: 'roll_by_roll', title: 'Roll-by-Roll', icon: 'format-list-numbered' },
  { key: 'defect_summary_result', title: 'Defect Summary', icon: 'chart-bar' },
  { key: 'shade_width_physical', title: 'Shade/Width/Physical', icon: 'palette-outline' },
  { key: 'lab_test_reports', title: 'Lab Test Reports', icon: 'flask-outline' },
  { key: 'photo_journal', title: 'Photo Journal', icon: 'camera-outline' },
  { key: 'conclusion_signoff', title: 'Conclusion & Sign-off', icon: 'file-sign' },
] as const;

function generateClientId() {
  return `fab-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function FabricInspectionFormScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const existingId: string | undefined = route.params?.inspectionId;
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const clientId = useRef(generateClientId());
  const serverId = useRef<string | null>(existingId ?? null);
  const scrollRef = useRef<ScrollView>(null);

  const [data, setData] = useState<FabricInspectionData>(createEmptyFabricInspectionData());
  const [loading, setLoading] = useState(Boolean(existingId));
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  // Drives AppDrawer's left nav: while this screen is mounted, the drawer
  // swaps its app-level menu for these 10 section jumps (see
  // useFabricFormNavStore.ts and AppDrawer.tsx's CustomDrawerContent) — one
  // contextual left nav instead of two competing rails.
  const activeSection = useFabricFormNavStore((s) => s.activeSection);
  const setActiveSection = useFabricFormNavStore((s) => s.setActiveSection);
  const markSectionComplete = useFabricFormNavStore((s) => s.markSectionComplete);
  const enter = useFabricFormNavStore((s) => s.enter);

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
        SECTIONS.map((s) => ({ key: s.key, title: s.title, icon: s.icon })),
        'order_fabric_info'
      );
      return () => useFabricFormNavStore.getState().exit();
    }, [enter])
  );

  useEffect(() => {
    if (!existingId) return;
    (async () => {
      try {
        const inspection = await getInspection(existingId);
        setData((prev) => recomputeFabricInspectionData({ ...prev, ...(inspection.data as FabricInspectionData) }));
      } catch (e) {
        setSnackbar(apiErrorMessage(e, 'Could not load this inspection.'));
      } finally {
        setLoading(false);
      }
    })();
  }, [existingId]);

  const updateSection = useCallback(<K extends keyof FabricInspectionData>(key: K, partial: any) => {
    setData((prev) => {
      const isArray = Array.isArray(prev[key]);
      return recomputeFabricInspectionData({ ...prev, [key]: isArray ? partial : { ...prev[key], ...partial } });
    });
  }, []);

  const persist = useCallback(async (): Promise<string> => {
    if (serverId.current) {
      await updateInspection(serverId.current, { data });
      return serverId.current;
    }
    const created = await createInspection({ clientId: clientId.current, inspectionType: 'fabric_inspection' });
    serverId.current = created._id;
    await updateInspection(created._id, { data });
    useActivityStore.getState().add({ type: 'inspection_created', title: 'Inspection created', detail: data.order_fabric_info.style || undefined });
    return created._id;
  }, [data]);

  const onSaveDraft = async () => {
    setSaving(true);
    try {
      await persist();
      useActivityStore.getState().add({ type: 'inspection_saved', title: 'Draft saved', detail: data.order_fabric_info.style || undefined });
      setSnackbar('Draft saved.');
    } catch (e) {
      setSnackbar(apiErrorMessage(e, 'Could not save draft — check the API server is running.'));
    } finally {
      setSaving(false);
    }
  };

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const id = await persist();
      await submitInspection(id);
      useActivityStore.getState().add({ type: 'inspection_submitted', title: 'Inspection submitted', detail: data.order_fabric_info.style || undefined });
      setSnackbar('Inspection submitted.');
      navigation.goBack();
    } catch (e) {
      setSnackbar(apiErrorMessage(e, 'Could not submit — check required fields and try again.'));
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

  // Section 1 supplies its own 3-card layout (Order / Fabric / Additional
  // Information), so it isn't re-wrapped in the generic section card below —
  // doing so would nest a card inside a card.
  const sectionBody = (
    <>
      {activeSection === 'order_fabric_info' && (
        <Section1OrderFabricInfo data={data.order_fabric_info} onChange={(p) => updateSection('order_fabric_info', p)} />
      )}
      {activeSection === 'inspection_details' && (
        <Section2InspectionDetails data={data.inspection_details} onChange={(p) => updateSection('inspection_details', p)} />
      )}
      {activeSection === 'acceptance_criteria' && (
        <Section3AcceptanceCriteria data={data.acceptance_criteria} onChange={(p) => updateSection('acceptance_criteria', p)} />
      )}
      {activeSection === 'roll_by_roll' && (
        <Section4RollByRoll rolls={data.roll_by_roll.rolls} onChangeRolls={(rolls) => updateSection('roll_by_roll', { rolls })} />
      )}
      {activeSection === 'defect_log' && (
        <Section5DefectLog defects={data.defect_log.defects} onChangeDefects={(defects) => updateSection('defect_log', { defects })} />
      )}
      {activeSection === 'defect_summary_result' && (
        <Section6DefectSummaryResult data={data.defect_summary_result} onChange={(p) => updateSection('defect_summary_result', p)} />
      )}
      {activeSection === 'shade_width_physical' && (
        <Section7ShadeWidthPhysical data={data.shade_width_physical} onChange={(p) => updateSection('shade_width_physical', p)} />
      )}
      {activeSection === 'lab_test_reports' && (
        <Section8LabTestReports data={data.lab_test_reports} onChange={(p) => updateSection('lab_test_reports', p)} />
      )}
      {activeSection === 'photo_journal' && (
        <Section9PhotoJournal data={data.photo_journal} onChange={(p) => updateSection('photo_journal', p)} />
      )}
      {activeSection === 'conclusion_signoff' && (
        <Section10ConclusionSignoff data={data.conclusion_signoff} onChange={(p) => updateSection('conclusion_signoff', p)} />
      )}
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="Fabric Inspection" subtitle={data.order_fabric_info.style || 'New inspection'} showBack />
      <View className={`flex-1 ${isWide ? 'flex-row' : 'flex-col'}`} style={{ paddingBottom: 82 }}>
        {/* On wide layouts the drawer itself becomes the section nav (see
            useFabricFormNavStore + AppDrawer's CustomDrawerContent) — the
            drawer is an overlay on narrow layouts, though, so this in-content
            horizontal strip is the only section nav available there. */}
        {!isWide && (
          <SectionProgressRail
            sections={SECTIONS.map((s) => ({ key: s.key, title: s.title, icon: s.icon }))}
            activeKey={activeSection}
            onSelect={setActiveSection}
            horizontal
          />
        )}
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <ScrollView
            ref={scrollRef}
            className="flex-1"
            contentContainerStyle={isWide ? { padding: 24, paddingBottom: 24 } : { padding: 16, paddingBottom: 16 }}
          >
            <View className="mb-[18px] flex-row items-center">
              <Text className="text-sectionTitle font-bold text-textPrimary">
                {SECTIONS.find((s) => s.key === activeSection)?.title}
              </Text>
              {activeSection === 'order_fabric_info' && (
                <Button
                  mode="outlined"
                  icon="information-outline"
                  onPress={() => setInstructionsOpen(true)}
                  style={{ marginLeft: 16, borderColor: tokens.color.border, borderRadius: tokens.radius.md }}
                  contentStyle={{ height: 44 }}
                  textColor={tokens.color.textSecondary}
                >
                  {useLanguage().t('instructions')}
                </Button>
              )}
            </View>

            {activeSection === 'order_fabric_info' ? sectionBody : <SectionCard style={{ marginBottom: 0 }}>{sectionBody}</SectionCard>}
          </ScrollView>
          <View className="flex-row items-center justify-between border-t border-border bg-surface p-4">
            <Button
              mode="text"
              icon="chevron-left"
              contentStyle={{ height: 48 }}
              disabled={activeSection === SECTIONS[0].key}
              onPress={() => {
                const idx = SECTIONS.findIndex((s) => s.key === activeSection);
                if (idx > 0) setActiveSection(SECTIONS[idx - 1].key);
              }}
            >
              Previous
            </Button>

            <View className="flex-row gap-3">
              {activeSection === SECTIONS[SECTIONS.length - 1].key ? (
                <Button
                  mode="contained"
                  onPress={onSubmit}
                  loading={submitting}
                  disabled={saving || submitting}
                  style={{ borderRadius: tokens.radius.md }}
                  contentStyle={{ height: 48 }}
                >
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
                    if (idx < SECTIONS.length - 1) setActiveSection(SECTIONS[idx + 1].key);
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
      <FabricInstructionsModal visible={instructionsOpen} onClose={() => setInstructionsOpen(false)} />
      <BottomNavBar active="inspections" />
    </View>
  );
}
