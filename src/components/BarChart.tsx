import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export interface BarChartDatum {
  label: string;
  value: number;
}

// Lightweight single-series horizontal bar chart — no charting library
// dependency. Follows the dataviz skill's mark spec: ≤24px thick bars, 4px
// rounded data-end (square at the baseline), value at the tip in a text
// token (never the bar's own color), recessive baseline. Single series, so
// no legend box (the section title already names what's plotted).
export function BarChart({ data, color = '#4A5FE0' }: { data: BarChartDatum[]; color?: string }) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <View>
      {data.map((d) => (
        <View key={d.label} style={styles.row}>
          <Text style={styles.label} numberOfLines={1}>
            {d.label}
          </Text>
          <View style={styles.track}>
            <View style={[styles.bar, { width: `${Math.max(3, (d.value / max) * 100)}%`, backgroundColor: color }]} />
          </View>
          <Text style={styles.value}>{d.value}</Text>
        </View>
      ))}
      {data.length === 0 && (
        <Text style={styles.empty}>No data yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { width: 96, fontSize: 12.5, color: '#5C6478' },
  track: { flex: 1, height: 20, backgroundColor: '#F0F2F8', borderRadius: 10, overflow: 'hidden', marginHorizontal: 10 },
  bar: { height: 20, borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  value: { width: 32, fontSize: 12.5, fontWeight: '700', color: '#1B2130', textAlign: 'right', fontVariant: ['tabular-nums'] },
  empty: { color: '#96A0B8', fontSize: 13, paddingVertical: 8 },
});
