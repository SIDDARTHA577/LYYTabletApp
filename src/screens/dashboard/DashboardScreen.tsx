import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Button, Menu, Portal, Dialog } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components/AppHeader';
import { StatCard } from '../../components/StatCard';
import { SectionCard } from '../../components/SectionCard';
import { InspectionListItem } from '../../components/InspectionListItem';
import { BottomNavBar } from '../../components/BottomNavBar';
import { useAuthStore } from '../../auth/useAuthStore';
import { listInspections, type InspectionSummary } from '../../api/inspections.api';
import { MOCK_FABRIC_INSPECTIONS } from '../../features/fabricInspection/mockInspections';
import { mockDailyChecks } from '../../features/dailyCheck/mockInspections';
import { mockSpotChecks } from '../../features/spotCheck/mockInspections';
import { mockFinalInspections } from '../../features/finalInspection/mockInspections';
import { mockInlineInspections } from '../../features/inlineInspection/mockInspections';
import { mockFieldAuditorInspections } from '../../features/fieldAuditor/mockInspections';
import { mockPpMeetings } from '../../features/ppMeeting/mockInspections';
import { computeStatBuckets } from '../../features/dashboard/statBuckets';
import { statTileColors } from '../../theme/paperTheme';
import { useLanguage } from '../../i18n/LanguageContext';
import tokens from '../../theme/tokens';

export function DashboardScreen() {
  const navigation = useNavigation<any>();
  const user = useAuthStore((s) => s.user);
  const isAssigned = useAuthStore((s) => s.isAssigned);
  const { t } = useLanguage();

  const [inspections, setInspections] = useState<InspectionSummary[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [locFilter, setLocFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [locMenuVisible, setLocMenuVisible] = useState(false);
  const [typeMenuVisible, setTypeMenuVisible] = useState(false);
  const [statusMenuVisible, setStatusMenuVisible] = useState(false);
  
  // New Inspection Modal State
  const [newInspectionModalVisible, setNewInspectionModalVisible] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await listInspections(); // Fetch all types
      setInspections(res.items);
    } catch {
      setInspections([...MOCK_FABRIC_INSPECTIONS, ...(mockDailyChecks as any), ...(mockSpotChecks as any), ...(mockFinalInspections as any), ...(mockInlineInspections as any), ...(mockFieldAuditorInspections as any), ...(mockPpMeetings as any)]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const buckets = computeStatBuckets(inspections);

  // Computed Locations and Types for Filter Dropdowns
  const locations = useMemo(() => {
    const uniqueLocations = new Set<string>();
    inspections.forEach((item) => {
      let loc = (item as any).location;
      if (!loc) {
        const hash = item._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const mockLocs = ['Zhejiang', 'Guangdong', 'Suzhou', 'Hangzhou', 'Shenzhen', 'Yiwu'];
        loc = mockLocs[hash % mockLocs.length];
      }
      uniqueLocations.add(loc);
    });
    return ['All', ...Array.from(uniqueLocations)];
  }, [inspections]);

  const types = useMemo(() => ['All', ...new Set(inspections.map((i) => i.inspectionType.key))], [inspections]);
  const statuses = ['All', 'draft', 'submitted'];

  // Scheduled Inspections Filter Logic
  const scheduledInspections = useMemo(() => {
    // By default, display Today's Assigned Inspections on the dashboard.
    // If we wanted only assigned, we could use buckets.assigned, but they requested "Scheduled Inspections"
    const filtered = buckets.assigned.filter((i) => {
      let loc = (i as any).location;
      if (!loc) {
        const hash = i._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const mockLocs = ['Zhejiang', 'Guangdong', 'Suzhou', 'Hangzhou', 'Shenzhen', 'Yiwu'];
        loc = mockLocs[hash % mockLocs.length];
      }
      if (locFilter !== 'All' && loc !== locFilter) return false;
      if (typeFilter !== 'All' && i.inspectionType.key !== typeFilter) return false;
      if (statusFilter !== 'All' && i.status !== statusFilter) return false;
      return true;
    });
    return filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [buckets.assigned, locFilter, typeFilter, statusFilter]);

  const goToList = (filter?: string) =>
    navigation.navigate('FabricInspectionStack', { screen: 'FabricInspectionList', params: filter ? { filter } : undefined });

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="" subtitle={user ? `${user.name} · ${user.employeeId}` : undefined} showBell showSyncDot showBrandLogo />
      <ScrollView contentContainerClassName="p-10 pb-32 bg-background">
        <View className="mb-10 flex-row items-center justify-between">
          <View>
            <Text className="text-[34px] font-extrabold tracking-tight text-textPrimary">
              {t('goodDay')}, {user?.name?.split(' ')[0] ?? 'Inspector'}
            </Text>
            <Text className="mt-2 text-[16px] text-textSecondary">Here's your schedule for today.</Text>
          </View>
          <Button
            mode="contained"
            icon="plus"
            style={{ borderRadius: tokens.radius.md, backgroundColor: tokens.color.primary }}
            contentStyle={{ height: 50, paddingHorizontal: 12 }}
            onPress={() => setNewInspectionModalVisible(true)}
          >
            New Inspection
          </Button>
        </View>

        <View className="mb-10 flex-row flex-wrap gap-5">
          <StatCard icon="clipboard-list-outline" label="Assigned" value={buckets.assigned.length} color={statTileColors.assigned} onPress={() => goToList()} />
          <StatCard icon="progress-clock" label="In Progress" value={buckets.inProgress.length} color={statTileColors.inProgress} onPress={() => goToList('inProgress')} />
          <StatCard icon="clock-alert-outline" label="Pending" value={buckets.pending.length} color={statTileColors.pending} onPress={() => goToList('pending')} />
          <StatCard icon="alert-octagon-outline" label="Overdue" value={buckets.overdue.length} color={statTileColors.overdue} onPress={() => goToList('overdue')} />
          <StatCard icon="check-circle-outline" label="Completed" value={buckets.completed.length} color={statTileColors.completed} onPress={() => goToList('completed')} />
        </View>

        <SectionCard
          title="Scheduled Inspections"
          right={
            scheduledInspections.length > 0 ? (
              <Button compact mode="text" onPress={() => goToList()}>
                {t('viewAll')}
              </Button>
            ) : undefined
          }
        >
          <View className="mb-5 flex-row flex-wrap gap-3">
            <Menu
              visible={locMenuVisible}
              onDismiss={() => setLocMenuVisible(false)}
              anchor={
                <Pressable
                  onPress={() => setLocMenuVisible(true)}
                  className="flex-row items-center gap-1.5 rounded-pill border px-3.5 py-2"
                  style={{ backgroundColor: locFilter !== 'All' ? tokens.color.primaryLight : tokens.color.surface, borderColor: locFilter !== 'All' ? tokens.color.primary : tokens.color.border }}
                >
                  <Text className="text-label font-medium" style={{ color: locFilter !== 'All' ? tokens.color.primary : tokens.color.textSecondary }}>
                    Location: {locFilter}
                  </Text>
                  <MaterialCommunityIcons name="chevron-down" size={16} color={locFilter !== 'All' ? tokens.color.primary : tokens.color.textSecondary} />
                </Pressable>
              }
            >
              {locations.map((loc) => (
                <Menu.Item key={loc} onPress={() => { setLocFilter(loc); setLocMenuVisible(false); }} title={loc} />
              ))}
            </Menu>

            <Menu
              visible={typeMenuVisible}
              onDismiss={() => setTypeMenuVisible(false)}
              anchor={
                <Pressable
                  onPress={() => setTypeMenuVisible(true)}
                  className="flex-row items-center gap-1.5 rounded-pill border px-3.5 py-2"
                  style={{ backgroundColor: typeFilter !== 'All' ? tokens.color.primaryLight : tokens.color.surface, borderColor: typeFilter !== 'All' ? tokens.color.primary : tokens.color.border }}
                >
                  <Text className="text-label font-medium" style={{ color: typeFilter !== 'All' ? tokens.color.primary : tokens.color.textSecondary }}>
                    Type: {typeFilter === 'fabric_inspection' ? 'Fabric' : typeFilter === 'inline_inspection' ? 'Inline' : typeFilter}
                  </Text>
                  <MaterialCommunityIcons name="chevron-down" size={16} color={typeFilter !== 'All' ? tokens.color.primary : tokens.color.textSecondary} />
                </Pressable>
              }
            >
              {types.map((type) => (
                <Menu.Item key={type} onPress={() => { setTypeFilter(type); setTypeMenuVisible(false); }} title={type === 'fabric_inspection' ? 'Fabric' : type === 'inline_inspection' ? 'Inline' : type === 'daily_check' ? 'Daily Check' : type === 'spot_check' ? 'Spot Check' : type === 'final_inspection' ? 'Final Inspection' : type === 'field_auditor' ? 'Factory Check' : type} />
              ))}
            </Menu>

            <Menu
              visible={statusMenuVisible}
              onDismiss={() => setStatusMenuVisible(false)}
              anchor={
                <Pressable
                  onPress={() => setStatusMenuVisible(true)}
                  className="flex-row items-center gap-1.5 rounded-pill border px-3.5 py-2"
                  style={{ backgroundColor: statusFilter !== 'All' ? tokens.color.primaryLight : tokens.color.surface, borderColor: statusFilter !== 'All' ? tokens.color.primary : tokens.color.border }}
                >
                  <Text className="text-label font-medium" style={{ color: statusFilter !== 'All' ? tokens.color.primary : tokens.color.textSecondary }}>
                    Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  </Text>
                  <MaterialCommunityIcons name="chevron-down" size={16} color={statusFilter !== 'All' ? tokens.color.primary : tokens.color.textSecondary} />
                </Pressable>
              }
            >
              {statuses.map((st) => (
                <Menu.Item key={st} onPress={() => { setStatusFilter(st); setStatusMenuVisible(false); }} title={st.charAt(0).toUpperCase() + st.slice(1)} />
              ))}
            </Menu>
          </View>

          {scheduledInspections.length === 0 ? (
            <Text className="py-3 text-center text-label text-textMuted">No scheduled inspections match these filters.</Text>
          ) : (
            scheduledInspections
              .slice(0, 10)
              .map((item) => (
                <InspectionListItem
                  key={item._id}
                  item={item}
                  dense
                  onPress={() => {
                    let screenName = 'FabricInspectionStack';
                    if (item.inspectionType.key === 'daily_check') screenName = 'DailyCheckStack';
                    if (item.inspectionType.key === 'spot_check') screenName = 'SpotCheckStack';
                    if (item.inspectionType.key === 'final_inspection') screenName = 'FinalInspectionStack';
                    if (item.inspectionType.key === 'inline_inspection') screenName = 'InlineInspectionStack';
                    if (item.inspectionType.key === 'field_auditor') screenName = 'FieldAuditorStack';
                    if (item.inspectionType.key === 'pp_meeting') screenName = 'PpMeetingStack';
                    // Future mapping for other types can go here
                    
                    navigation.navigate(screenName, {
                      screen: screenName.replace('Stack', 'Form'),
                      params: { inspectionId: item._id.startsWith('mock-') || item._id.startsWith('dc-mock') || item._id.startsWith('sc-mock') || item._id.startsWith('fi-mock') || item._id.startsWith('ii-mock') || item._id.startsWith('fa-mock') || item._id.startsWith('ppm-mock') ? undefined : item._id },
                    });
                  }}
                />
              ))
          )}
        </SectionCard>
      </ScrollView>
      <BottomNavBar active="home" />

      {/* New Inspection Modal */}
      <Portal>
        <Dialog visible={newInspectionModalVisible} onDismiss={() => setNewInspectionModalVisible(false)} style={{ backgroundColor: tokens.color.surface, borderRadius: tokens.radius.lg }}>
          <Dialog.Title style={{ color: tokens.color.textPrimary, fontWeight: '700' }}>Select Inspection Type</Dialog.Title>
          <Dialog.Content>
            <View className="gap-3">
              {[
                { key: 'fabric_inspection', label: 'Fabric Inspection', stack: 'FabricInspectionStack' },
                { key: 'daily_check', label: 'Daily Check', stack: 'DailyCheckStack' },
                { key: 'spot_check', label: 'Spot Check', stack: 'SpotCheckStack' },
                { key: 'final_inspection', label: 'Final Inspection', stack: 'FinalInspectionStack' },
                { key: 'inline_inspection', label: 'Inline Inspection', stack: 'InlineInspectionStack' },
                { key: 'field_auditor', label: 'Factory Check', stack: 'FieldAuditorStack' },
                { key: 'pp_meeting', label: 'PP Meeting', stack: 'PpMeetingStack' },
              ].map((type) => (
                <Pressable
                  key={type.key}
                  onPress={() => {
                    setNewInspectionModalVisible(false);
                    navigation.navigate(type.stack, { screen: type.stack.replace('Stack', 'Form') });
                  }}
                  className="flex-row items-center justify-between rounded-lg border border-border p-4"
                  style={{ backgroundColor: tokens.color.background }}
                >
                  <Text className="text-base font-semibold" style={{ color: tokens.color.textPrimary }}>
                    {type.label}
                  </Text>
                  <MaterialCommunityIcons name="chevron-right" size={20} color={tokens.color.textMuted} />
                </Pressable>
              ))}
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setNewInspectionModalVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
