import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { InspectionModule } from '../constants/modules';

export function ModuleCard({ module, onPress }: { module: InspectionModule; onPress: () => void }) {
  const theme = useTheme();

  return (
    <Pressable onPress={module.implemented ? onPress : undefined} disabled={!module.implemented} style={[styles.card, !module.implemented && styles.cardDisabled]}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name={module.icon as any} size={24} color="#5E6AD2" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{module.name}</Text>
          <Text style={styles.description}>
            {module.shortDescription}
          </Text>
        </View>
        {!module.implemented && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Soon</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { 
    minWidth: 260, flexGrow: 1, flexBasis: '30%', backgroundColor: '#FFFFFF', 
    borderRadius: 8, borderWidth: 1, borderColor: '#E8EAED', 
    padding: 16,
  },
  cardDisabled: { opacity: 0.6 },
  content: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  iconWrap: { width: 44, height: 44, borderRadius: 8, backgroundColor: '#F2F4FD', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 15, fontWeight: '600', color: '#111317', marginBottom: 2 },
  description: { fontSize: 13, color: '#6B7280' },
  badge: { backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '600', color: '#6B7280' },
});
