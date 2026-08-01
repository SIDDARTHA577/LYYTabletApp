import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Chip, Searchbar } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { AppHeader } from '../../components/AppHeader';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SectionCard } from '../../components/SectionCard';
import { BarChart } from '../../components/BarChart';
import { InspectionListItem } from '../../components/InspectionListItem';
import { EmptyState } from '../../components/EmptyState';
import { BottomNavBar } from '../../components/BottomNavBar';
import { listInspections, type InspectionSummary } from '../../api/inspections.api';
import { MOCK_FABRIC_INSPECTIONS } from '../../features/fabricInspection/mockInspections';
import { styleOf } from '../../features/dashboard/statBuckets';
import { aggregateDefectFrequency, last6MonthsSeries, last7DaysSeries } from '../../features/dashboard/defectReport';
import { statTileColors, brandColors } from '../../theme/paperTheme';
import { useLanguage } from '../../i18n/LanguageContext';

type Range = '7d' | '6m';
type StatusFilter = 'all' | 'draft' | 'submitted';

export function ReportsScreen() {
  const navigation = useNavigation<any>();
  const { t } = useLanguage();

  const [items, setItems] = useState<InspectionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [range, setRange] = useState<Range>('7d');

  const load = useCallback(async () => {
    try {
      const res = await listInspections('fabric_inspection');
      setItems(res.items);
    } catch {
      setItems(MOCK_FABRIC_INSPECTIONS);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const history = useMemo(() => {
    let list = [...items].sort((a, b) => dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf());
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
  }, [items, statusFilter, search]);

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={t('reports')} showBack />
      <ScrollView contentContainerStyle={styles.content}>

        <SectionCard title={t('inspectionHistory')}>
          <Searchbar
            placeholder={t('searchPlaceholder')}
            value={search}
            onChangeText={setSearch}
            style={styles.search}
            inputStyle={styles.searchInput}
          />
          <View style={styles.chipRow}>
            <Chip selected={statusFilter === 'all'} onPress={() => setStatusFilter('all')} compact style={styles.chip}>
              {t('filterAll')}
            </Chip>
            <Chip selected={statusFilter === 'draft'} onPress={() => setStatusFilter('draft')} compact style={styles.chip}>
              {t('filterDraft')}
            </Chip>
            <Chip selected={statusFilter === 'submitted'} onPress={() => setStatusFilter('submitted')} compact style={styles.chip}>
              {t('filterSubmitted')}
            </Chip>
          </View>

          {!loading && history.length === 0 ? (
            <EmptyState icon="magnify" title={t('noResults')} />
          ) : (
            history.map((item) => {
              const hash = item._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
              const MOCK_FACTORIES = ['Zhejiang Golden Loom', 'Guangdong Textile Hub', 'Suzhou Silk Mills', 'Hangzhou Fabrics', 'Shenzhen Garments', 'Yiwu Textiles'];
              const MOCK_LOCATIONS = ['Zhejiang', 'Guangdong', 'Suzhou', 'Hangzhou', 'Shenzhen', 'Yiwu'];
              const mockFactory = MOCK_FACTORIES[hash % MOCK_FACTORIES.length];
              const mockLocation = MOCK_LOCATIONS[hash % MOCK_LOCATIONS.length];
              const factoryName = item.factory?.name || mockFactory;
              const typeName = typeof item.inspectionType === 'string' 
                ? (item.inspectionType as string).replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) 
                : (item.inspectionType as any)?.name;

              return (
              <View key={item._id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View style={styles.reportRow}>
                    <View style={styles.reportIcon}>
                      <MaterialCommunityIcons name="file-document-outline" size={20} color="#6A7185" />
                    </View>
                    <View style={styles.reportInfo}>
                      <Text style={styles.reportName} numberOfLines={1}>{factoryName} · {typeName || 'Inspection'}</Text>
                      <Text style={styles.reportType} numberOfLines={1}>{[(item as any).location || mockLocation, styleOf(item), dayjs(item.startedAt).format('MMM D, YYYY')].filter(Boolean).join(' · ')}</Text>
                    </View>
                  </View>
                <Chip icon="eye" onPress={() => {}} style={{ marginLeft: 8, height: 36 }}>Preview</Chip>
              </View>
            );
          })
          )}
        </SectionCard>
      </ScrollView>

      <BottomNavBar active="reports" />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 32, paddingBottom: 12 },
  rangeToggle: { flexDirection: 'row', gap: 6 },
  rangeChip: { backgroundColor: '#F3F4F6' },
  search: { borderRadius: 8, backgroundColor: '#F3F4F6', elevation: 0, marginBottom: 10, borderWidth: 1, borderColor: '#EAEAEA' },
  searchInput: { fontSize: 14, minHeight: 0 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  chip: { backgroundColor: '#F3F4F6' },
  reportRow: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8, padding: 12, marginRight: 8 },
  reportIcon: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  reportInfo: { flex: 1 },
  reportName: { fontSize: 14, fontWeight: '600', color: '#111827' },
  reportType: { fontSize: 12, color: '#6B7280', marginTop: 2 },
});
