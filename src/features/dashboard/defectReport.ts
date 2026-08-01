import dayjs from 'dayjs';
import type { InspectionSummary } from '../../api/inspections.api';
import type { BarChartDatum } from '../../components/BarChart';

// Aggregates defect codes across every inspection's Defect Log (Section 5)
// into a frequency table — genuinely computed from the same records the
// inspection history shows, not fabricated report content.
export function aggregateDefectFrequency(items: InspectionSummary[], top = 8): BarChartDatum[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    const defects = item.data?.defect_log?.defects ?? [];
    for (const d of defects) {
      const label = d.defectName || d.code || 'Unknown';
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, top);
}

export function last7DaysSeries(items: InspectionSummary[]): BarChartDatum[] {
  const days = Array.from({ length: 7 }, (_, i) => dayjs().subtract(6 - i, 'day'));
  return days.map((d) => ({
    label: d.format('ddd'),
    value: items.filter((i) => dayjs(i.startedAt).isSame(d, 'day')).length,
  }));
}

export function last6MonthsSeries(items: InspectionSummary[]): BarChartDatum[] {
  const months = Array.from({ length: 6 }, (_, i) => dayjs().subtract(5 - i, 'month'));
  return months.map((m) => ({
    label: m.format('MMM'),
    value: items.filter((i) => dayjs(i.startedAt).isSame(m, 'month')).length,
  }));
}
