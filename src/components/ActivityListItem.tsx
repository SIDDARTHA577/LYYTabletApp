import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from '../utils/relativeTime';
import { activityIcon, type ActivityEntry } from '../features/activity/useActivityStore';

export function ActivityListItem({ entry }: { entry: ActivityEntry }) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      <View style={[styles.iconWrap, { backgroundColor: theme.colors.primaryContainer }]}>
        <MaterialCommunityIcons name={activityIcon(entry.type) as any} size={16} color={theme.colors.onPrimaryContainer} />
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="bodyMedium" style={!entry.read && styles.unreadTitle}>
          {entry.title}
        </Text>
        {entry.detail ? (
          <Text variant="bodySmall" style={styles.detail} numberOfLines={1}>
            {entry.detail}
          </Text>
        ) : null}
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text variant="bodySmall" style={styles.time}>
          {dayjs(entry.timestamp).fromNow()}
        </Text>
        {!entry.read && <View style={[styles.dot, { backgroundColor: theme.colors.primary }]} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 12 },
  iconWrap: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  unreadTitle: { fontWeight: '700' },
  detail: { opacity: 0.6, marginTop: 1 },
  time: { opacity: 0.5, fontSize: 11 },
  dot: { width: 7, height: 7, borderRadius: 4, marginTop: 4 },
});
