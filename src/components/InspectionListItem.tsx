import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { type InspectionSummary } from '../api/inspections.api';
import { styleOf } from '../features/dashboard/statBuckets';
import tokens from '../theme/tokens';

export function InspectionListItem({
  item,
  dense,
  onPress,
}: {
  item: InspectionSummary;
  dense?: boolean;
  onPress?: () => void;
}) {
  const isComplete = item.status === 'submitted' || item.status === 'synced';
  // Sourced from the shared token palette (tokens.status) instead of a
  // locally-hardcoded pair, so this never drifts from statusColors/
  // statTileColors used everywhere else in the app.
  const statusStyle = isComplete ? tokens.status.completed : tokens.status.pending;
  const statusLabel = isComplete ? 'Completed' : 'Draft';

  const MOCK_FACTORIES = ['Zhejiang Golden Loom', 'Guangdong Textile Hub', 'Suzhou Silk Mills', 'Hangzhou Fabrics', 'Shenzhen Garments', 'Yiwu Textiles'];
  const MOCK_LOCATIONS = ['Zhejiang', 'Guangdong', 'Suzhou', 'Hangzhou', 'Shenzhen', 'Yiwu'];
  const hash = item._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const mockFactory = MOCK_FACTORIES[hash % MOCK_FACTORIES.length];
  const mockLocation = MOCK_LOCATIONS[hash % MOCK_LOCATIONS.length];

  const typeName = typeof item.inspectionType === 'string' 
    ? (item.inspectionType as string).replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) 
    : (item.inspectionType as any)?.name;

  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }: any) => [
        { opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }
      ]}
      className={`mb-3 flex-row items-center rounded-2xl border border-border bg-surface px-4 ${dense ? 'py-3' : 'py-4'} shadow-sm`}
    >
      <View className="mr-4 h-10 w-10 items-center justify-center rounded-lg bg-background">
        <MaterialCommunityIcons name="clipboard-text-outline" size={20} color={tokens.color.textSecondary} />
      </View>
      <View className="mr-3 flex-1">
        <Text className="text-body font-semibold text-textPrimary" numberOfLines={1}>
          {item.factory?.name || mockFactory} · {typeName || 'Inspection'}
        </Text>
        <Text className="mt-1 text-label text-textSecondary" numberOfLines={1}>
          {[(item as any).location || mockLocation, styleOf(item), dayjs(item.startedAt).format('MMM D, YYYY')].filter(Boolean).join(' · ')}
        </Text>
      </View>
      <View className="items-end">
        <View className="mb-1.5 rounded-full px-2.5 py-1" style={{ backgroundColor: statusStyle.bg }}>
          <Text className="text-[12px] font-bold" style={{ color: statusStyle.fg }}>
            {statusLabel}
          </Text>
        </View>
        <Text className="text-[11px] text-textMuted">{dayjs(item.updatedAt).fromNow()}</Text>
      </View>
    </Pressable>
  );
}
