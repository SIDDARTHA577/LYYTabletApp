import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Chip, FAB, Searchbar } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components/AppHeader';
import { EmptyState } from '../../components/EmptyState';
import { InspectionListItem } from '../../components/InspectionListItem';
import { BottomNavBar } from '../../components/BottomNavBar';
import { listInspections, InspectionSummary } from '../../api/inspections.api';
import { mockInlineInspections } from '../../features/inlineInspection/mockInspections';
import { useLanguage } from '../../i18n/LanguageContext';
import tokens from '../../theme/tokens';

type StatusFilter = 'all' | 'draft' | 'submitted';

export function InlineInspectionListScreen() {
  const navigation = useNavigation<any>();
  const { t } = useLanguage();

  const [items, setItems] = useState<InspectionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const load = useCallback(async () => {
    try {
      const res = await listInspections('inline_inspection');
      setItems(res.items);
      setDemoMode(false);
    } catch {
      // API unreachable — fall back to static demo dataset
      setItems(mockInlineInspections as unknown as InspectionSummary[]);
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
    if (statusFilter === 'draft') list = list.filter((i) => i.status === 'draft');
    if (statusFilter === 'submitted') list = list.filter((i) => i.status === 'submitted' || i.status === 'synced');
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((i) => {
        const info = (i.data as any)?.insp_time_po_info ?? {};
        // Match on factory or first style's PO
        return [info.factory, info.styles?.[0]?.po].filter(Boolean).some((v: string) => v.toLowerCase().includes(q));
      });
    }
    return list;
  }, [items, statusFilter, search]);

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="Inline Inspection" subtitle="In-process production review" showBack />
      {demoMode && (
        <View className="px-4 py-2" style={{ backgroundColor: tokens.status.pending.bg }}>
          <Text className="text-caption" style={{ color: '#92400E' }}>
            API unreachable — showing demo data.
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
        </View>
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item._id}
        contentContainerStyle={visible.length === 0 ? { flex: 1 } : { padding: 16, paddingBottom: 96 }}
        renderItem={({ item }) => (
          <InspectionListItem
            item={item}
            onPress={() => navigation.navigate('InlineInspectionForm', { inspectionId: item._id.startsWith('ii-mock-') ? undefined : item._id })}
          />
        )}
        ListEmptyComponent={
          !loading ? (
            items.length === 0 ? (
              <EmptyState
                icon="progress-clock"
                title="No Inline Inspections yet"
                description="Start a new Inline Inspection."
                actionLabel={t('newInspection')}
                onAction={() => navigation.navigate('InlineInspectionForm')}
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
        onPress={() => navigation.navigate('InlineInspectionForm')}
      />
      <BottomNavBar active="inspections" />
    </View>
  );
}
