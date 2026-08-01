import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Chip, FAB, Searchbar } from 'react-native-paper';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { AppHeader } from '../../components/AppHeader';
import { EmptyState } from '../../components/EmptyState';
import { InspectionListItem } from '../../components/InspectionListItem';
import { BottomNavBar } from '../../components/BottomNavBar';
import { listInspections, InspectionSummary } from '../../api/inspections.api';
import { MOCK_FABRIC_INSPECTIONS } from '../../features/fabricInspection/mockInspections';
import { mockDailyChecks } from '../../features/dailyCheck/mockInspections';
import { mockSpotChecks } from '../../features/spotCheck/mockInspections';
import { mockFinalInspections } from '../../features/finalInspection/mockInspections';
import { mockInlineInspections } from '../../features/inlineInspection/mockInspections';
import { mockFieldAuditorInspections } from '../../features/fieldAuditor/mockInspections';
import { mockPpMeetings } from '../../features/ppMeeting/mockInspections';
import { computeStatBuckets, styleOf } from '../../features/dashboard/statBuckets';
import { useLanguage } from '../../i18n/LanguageContext';
import tokens from '../../theme/tokens';

type StatusFilter = 'all' | 'draft' | 'submitted';
// Matches the stat-tile keys DashboardScreen navigates here with.
type BucketFilter = 'today' | 'pending' | 'inProgress' | 'completed' | 'overdue' | undefined;

export function FabricInspectionListScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { t } = useLanguage();
  const bucketFilter: BucketFilter = route.params?.filter;

  const [items, setItems] = useState<InspectionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const load = useCallback(async () => {
    try {
      const res = await listInspections(); // Load all
      setItems(res.items);
      setDemoMode(false);
    } catch {
      setItems([...MOCK_FABRIC_INSPECTIONS, ...(mockDailyChecks as any), ...(mockSpotChecks as any), ...(mockFinalInspections as any), ...(mockInlineInspections as any), ...(mockFieldAuditorInspections as any), ...(mockPpMeetings as any)]);
      setDemoMode(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const visible = useMemo(() => {
    let list = items;
    if (bucketFilter) {
      const buckets = computeStatBuckets(items);
      list = buckets[bucketFilter];
    }
    if (statusFilter === 'draft') list = list.filter((i) => i.status === 'draft');
    if (statusFilter === 'submitted') list = list.filter((i) => i.status === 'submitted' || i.status === 'synced');
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((i) => {
        const info = i.data?.order_fabric_info ?? {};
        return [styleOf(i), info.po, info.colour, i.factory?.name].filter(Boolean).some((v: string) => v.toLowerCase().includes(q));
      });
    }
    return list;
  }, [items, bucketFilter, statusFilter, search]);

  const filterLabel = bucketFilter ? t(`stat${bucketFilter[0].toUpperCase()}${bucketFilter.slice(1)}` as any) : null;

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="All Inspections" subtitle="View and manage inspections" showBack />
      {demoMode && (
        <View className="px-4 py-2" style={{ backgroundColor: tokens.status.pending.bg }}>
          <Text className="text-caption" style={{ color: '#92400E' }}>
            API unreachable — showing demo data. Start the backend (tablet-app/server) to load real inspections.
          </Text>
        </View>
      )}

      <View className="px-4 pb-1 pt-3">
        <Searchbar
          placeholder={t('searchPlaceholder')}
          value={search}
          onChangeText={setSearch}
          style={{ borderRadius: tokens.radius.md, backgroundColor: tokens.color.background, elevation: 0 }}
          inputStyle={{ fontSize: 14, minHeight: 0 }}
        />
        <View className="mt-2.5 flex-row flex-wrap gap-2">
          <Chip
            selected={statusFilter === 'all'}
            onPress={() => setStatusFilter('all')}
            compact
            style={{ backgroundColor: tokens.color.background, borderRadius: tokens.radius.pill }}
          >
            {t('filterAll')}
          </Chip>
          <Chip
            selected={statusFilter === 'draft'}
            onPress={() => setStatusFilter('draft')}
            compact
            style={{ backgroundColor: tokens.color.background, borderRadius: tokens.radius.pill }}
          >
            {t('filterDraft')}
          </Chip>
          <Chip
            selected={statusFilter === 'submitted'}
            onPress={() => setStatusFilter('submitted')}
            compact
            style={{ backgroundColor: tokens.color.background, borderRadius: tokens.radius.pill }}
          >
            {t('filterSubmitted')}
          </Chip>
          {bucketFilter && (
            <Chip
              icon="close"
              onPress={() => navigation.setParams({ filter: undefined })}
              compact
              style={{ backgroundColor: tokens.color.primaryLight, borderRadius: tokens.radius.pill }}
              textStyle={{ color: tokens.color.primary }}
            >
              {filterLabel}
            </Chip>
          )}
        </View>
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item._id}
        contentContainerStyle={visible.length === 0 ? { flex: 1 } : { padding: 16, paddingBottom: 96 }}
        renderItem={({ item }) => (
          <InspectionListItem
            item={item}
            onPress={() => {
              const typeKey = typeof item.inspectionType === 'string' ? item.inspectionType : item.inspectionType?.key;
              let screenName = 'FabricInspectionStack';
              if (typeKey === 'daily_check') screenName = 'DailyCheckStack';
              if (typeKey === 'spot_check') screenName = 'SpotCheckStack';
              if (typeKey === 'final_inspection') screenName = 'FinalInspectionStack';
              if (typeKey === 'inline_inspection') screenName = 'InlineInspectionStack';
              if (typeKey === 'field_auditor') screenName = 'FieldAuditorStack';
              if (typeKey === 'pp_meeting') screenName = 'PpMeetingStack';
              
              navigation.navigate(screenName, {
                screen: screenName.replace('Stack', 'Form'),
                params: { inspectionId: item._id.startsWith('mock-') || item._id.startsWith('dc-mock') || item._id.startsWith('sc-mock') || item._id.startsWith('fi-mock') || item._id.startsWith('ii-mock') || item._id.startsWith('fa-mock') || item._id.startsWith('ppm-mock') ? undefined : item._id },
              });
            }}
          />
        )}
        ListEmptyComponent={
          !loading ? (
            items.length === 0 ? (
              <EmptyState
                icon="text-box-multiple-outline"
                title="No Inspections yet"
                description="Start a new inspection."
                actionLabel={t('newInspection')}
                onAction={() => navigation.navigate('FabricInspectionForm')}
              />
            ) : (
              <EmptyState icon="magnify" title={t('noResults')} />
            )
          ) : null
        }
      />
      <FAB
        icon="plus"
        label={t('newInspection')}
        style={{ position: 'absolute', right: 20, bottom: 76, borderRadius: tokens.radius.lg }}
        onPress={() => navigation.navigate('FabricInspectionForm')}
      />
      <BottomNavBar active="inspections" />
    </View>
  );
}
