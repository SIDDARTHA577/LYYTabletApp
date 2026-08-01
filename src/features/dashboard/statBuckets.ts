import dayjs from 'dayjs';
import type { InspectionSummary } from '../../api/inspections.api';

// Bucket definitions (documented since the Inspection status enum only has
// draft/submitted/synced — there's no separate "pending vs in-progress" or
// "overdue" concept in the data model, so these are computed, defensible
// business rules rather than raw status fields):
//   - Assigned:    every inspection owned by this inspector, any status.
//   - Today:       startedAt falls on today's calendar date.
//   - Completed:   status is submitted or synced.
//   - In Progress: draft, touched recently today.
//   - Pending:     draft, idle for a while but still today.
//   - Overdue:     draft, started on a previous calendar date.
const PENDING_IDLE_HOURS = 2;

export interface StatBuckets {
  assigned: InspectionSummary[];
  today: InspectionSummary[];
  completed: InspectionSummary[];
  inProgress: InspectionSummary[];
  pending: InspectionSummary[];
  overdue: InspectionSummary[];
}

export function computeStatBuckets(inspections: InspectionSummary[]): StatBuckets {
  const now = dayjs();
  const startOfToday = now.startOf('day');
  const idleHours = (i: InspectionSummary) => now.diff(dayjs(i.updatedAt), 'hour');

  return {
    assigned: inspections,
    today: inspections.filter((i) => dayjs(i.startedAt).isSame(now, 'day')),
    completed: inspections.filter((i) => i.status === 'submitted' || i.status === 'synced'),
    inProgress: inspections.filter((i) => i.status === 'draft' && dayjs(i.startedAt).isSame(now, 'day') && idleHours(i) < PENDING_IDLE_HOURS),
    pending: inspections.filter((i) => i.status === 'draft' && dayjs(i.startedAt).isSame(now, 'day') && idleHours(i) >= PENDING_IDLE_HOURS),
    overdue: inspections.filter((i) => i.status === 'draft' && dayjs(i.startedAt).isBefore(startOfToday)),
  };
}

export function styleOf(i: InspectionSummary): string {
  return (
    i.data?.order_fabric_info?.style ||
    i.data?.style_po_info?.style ||
    i.data?.insp_time_po_info?.styles?.[0]?.style ||
    i.data?.cover_summary?.report_title ||
    'Untitled inspection'
  );
}
