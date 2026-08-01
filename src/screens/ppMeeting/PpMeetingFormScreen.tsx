import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, useWindowDimensions, Platform, Keyboard } from 'react-native';
import { ActivityIndicator, Button, Snackbar } from 'react-native-paper';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { AppHeader } from '../../components/AppHeader';
import { SectionCard } from '../../components/SectionCard';
import { SectionProgressRail } from '../../components/SectionProgressRail';
import { createEmptyPpMeetingData } from '../../features/ppMeeting/emptyFormData';
import type { PpMeetingData } from '../../features/ppMeeting/types';
import { createInspection, getInspection, submitInspection, updateInspection } from '../../api/inspections.api';
import { apiErrorMessage } from '../../api/client';
import { useActivityStore } from '../../features/activity/useActivityStore';
import { useFabricFormNavStore as useFormNavStore } from '../../features/fabricInspection/useFabricFormNavStore';

import { Section1StylePoInfo } from './sections/Section1StylePoInfo';
import { Section2MeetingDetails } from './sections/Section2MeetingDetails';
import { Section3Participants } from './sections/Section3Participants';
import { Section4PpmDocumentChecklist } from './sections/Section4PpmDocumentChecklist';
import { Section5SampleReviewApproved } from './sections/Section5SampleReviewApproved';
import { Section6FitMeasurements } from './sections/Section6FitMeasurements';
import { Section7FabricReview } from './sections/Section7FabricReview';
import { Section8TrimsReview } from './sections/Section8TrimsReview';
import { Section9CuttingReview } from './sections/Section9CuttingReview';
import { Section10SewingConstructionReview } from './sections/Section10SewingConstructionReview';
import { Section11FinishingPressingPackingReview } from './sections/Section11FinishingPressingPackingReview';
import { Section12SizeSetInspection } from './sections/Section12SizeSetInspection';
import { Section13ProductionPlan } from './sections/Section13ProductionPlan';
import { Section14FollowUpActions } from './sections/Section14FollowUpActions';
import { Section15PhotoJournal } from './sections/Section15PhotoJournal';
import { Section16ConclusionRemarks } from './sections/Section16ConclusionRemarks';

import { BottomNavBar } from '../../components/BottomNavBar';
import tokens from '../../theme/tokens';

const SECTIONS = [
  { key: 'style_po_info', title: '1. Style & PO Info', icon: 'information-outline' },
  { key: 'meeting_details', title: '2. Meeting Details', icon: 'clock-outline' },
  { key: 'participants', title: '3. Participants', icon: 'account-group-outline' },
  { key: 'ppm_document_checklist', title: '4. Document Checklist', icon: 'file-document-outline' },
  { key: 'sample_review_approved', title: '5. Sample Review', icon: 'check-decagram-outline' },
  { key: 'fit_measurements', title: '6. Fit & Measurements', icon: 'tape-measure' },
  { key: 'fabric_review', title: '7. Fabric Review', icon: 'palette-outline' },
  { key: 'trims_review', title: '8. Trims Review', icon: 'tag-multiple-outline' },
  { key: 'cutting_review', title: '9. Cutting Review', icon: 'content-cut' },
  { key: 'sewing_construction_review', title: '10. Sewing Review', icon: 'needle' },
  { key: 'finishing_pressing_packing_review', title: '11. Finishing & Packing', icon: 'package-variant' },
  { key: 'size_set_inspection', title: '12. Size Set Inspection', icon: 'format-list-checks' },
  { key: 'production_plan', title: '13. Production Plan', icon: 'chart-timeline-variant' },
  { key: 'follow_up_actions', title: '14. Follow-up Actions', icon: 'calendar-check' },
  { key: 'photo_journal', title: '15. Photo Journal', icon: 'camera-outline' },
  { key: 'conclusion_remarks', title: '16. Conclusion & Remarks', icon: 'gavel' },
] as const;

function generateClientId() {
  return `ppm-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function PpMeetingFormScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const existingId: string | undefined = route.params?.inspectionId;
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const clientId = useRef(generateClientId());
  const serverId = useRef<string | null>(existingId ?? null);
  const scrollRef = useRef<ScrollView>(null);

  const [data, setData] = useState<PpMeetingData>(createEmptyPpMeetingData());
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
        setData((prev) => ({ ...prev, ...(inspection.data as PpMeetingData) }));
      } catch (e) {
        setSnackbar(apiErrorMessage(e, 'Could not load this PP Meeting.'));
      } finally {
        setLoading(false);
      }
    })();
  }, [existingId]);

  const updateSection = useCallback(<K extends keyof PpMeetingData>(key: K, partial: any) => {
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
    const created = await createInspection({ clientId: clientId.current, inspectionType: 'pp_meeting' });
    serverId.current = created._id;
    await updateInspection(created._id, { data });
    useActivityStore.getState().add({ type: 'inspection_created', title: 'PP Meeting created', detail: data.style_po_info.style || undefined });
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
      useActivityStore.getState().add({ type: 'inspection_submitted', title: 'PP Meeting submitted', detail: data.style_po_info.style || undefined });
      setSnackbar('PP Meeting submitted.');
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
      {activeSection === 'meeting_details' && <Section2MeetingDetails data={data.meeting_details} onChange={(p) => updateSection('meeting_details', p)} />}
      {activeSection === 'participants' && <Section3Participants data={data.participants} onChange={(p) => updateSection('participants', p)} />}
      {activeSection === 'ppm_document_checklist' && <Section4PpmDocumentChecklist data={data.ppm_document_checklist} onChange={(p) => updateSection('ppm_document_checklist', p)} />}
      {activeSection === 'sample_review_approved' && <Section5SampleReviewApproved data={data.sample_review_approved} onChange={(p) => updateSection('sample_review_approved', p)} />}
      {activeSection === 'fit_measurements' && <Section6FitMeasurements data={data.fit_measurements} onChange={(p) => updateSection('fit_measurements', p)} />}
      {activeSection === 'fabric_review' && <Section7FabricReview data={data.fabric_review} onChange={(p) => updateSection('fabric_review', p)} />}
      {activeSection === 'trims_review' && <Section8TrimsReview data={data.trims_review} onChange={(p) => updateSection('trims_review', p)} />}
      {activeSection === 'cutting_review' && <Section9CuttingReview data={data.cutting_review} onChange={(p) => updateSection('cutting_review', p)} />}
      {activeSection === 'sewing_construction_review' && <Section10SewingConstructionReview data={data.sewing_construction_review} onChange={(p) => updateSection('sewing_construction_review', p)} />}
      {activeSection === 'finishing_pressing_packing_review' && <Section11FinishingPressingPackingReview data={data.finishing_pressing_packing_review} onChange={(p) => updateSection('finishing_pressing_packing_review', p)} />}
      {activeSection === 'size_set_inspection' && <Section12SizeSetInspection data={data.size_set_inspection} onChange={(p) => updateSection('size_set_inspection', p)} />}
      {activeSection === 'production_plan' && <Section13ProductionPlan data={data.production_plan} onChange={(p) => updateSection('production_plan', p)} />}
      {activeSection === 'follow_up_actions' && <Section14FollowUpActions data={data.follow_up_actions} onChange={(p) => updateSection('follow_up_actions', p)} />}
      {activeSection === 'photo_journal' && <Section15PhotoJournal data={data.photo_journal} onChange={(p) => updateSection('photo_journal', p)} />}
      {activeSection === 'conclusion_remarks' && <Section16ConclusionRemarks data={data.conclusion_remarks} onChange={(p) => updateSection('conclusion_remarks', p)} />}
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="PP Meeting" subtitle={data.style_po_info.style || 'New report'} showBack />
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
            {activeSection === 'style_po_info' ? sectionBody : <SectionCard style={{ marginBottom: 0 }}>{sectionBody}</SectionCard>}
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
