import { mockDailyChecks } from '../features/dailyCheck/mockInspections';
import { MOCK_FABRIC_INSPECTIONS } from '../features/fabricInspection/mockInspections';
import { mockSpotChecks } from '../features/spotCheck/mockInspections';
import { mockFinalInspections } from '../features/finalInspection/mockInspections';
import { mockInlineInspections } from '../features/inlineInspection/mockInspections';
import { mockFieldAuditorInspections } from '../features/fieldAuditor/mockInspections';
import { mockPpMeetings } from '../features/ppMeeting/mockInspections';

export interface InspectionSummary {
  _id: string;
  clientId: string;
  inspectionType: { key: string; name: string };
  factory?: { name: string; nameCn?: string } | null;
  status: 'draft' | 'submitted' | 'synced';
  data: Record<string, any>;
  updatedAt: string;
  startedAt: string;
}

const TYPE_NAMES: Record<string, string> = {
  daily_check: 'Daily Check',
  fabric_inspection: 'Fabric Inspection',
  final_inspection: 'Final Inspection',
  inline_inspection: 'Inline Inspection',
  pp_meeting: 'PP Meeting',
  spot_check: 'Spot Check',
  field_auditor: 'Factory Check',
};

// No backend in this build — this is an in-memory store seeded from each
// module's existing mockInspections.ts (already shipped as the offline/
// fallback dataset for the list screens), so listing looks identical to
// before. Inspections created during the session are added on top and live
// for the lifetime of the app process.
let store: InspectionSummary[] = [
  ...MOCK_FABRIC_INSPECTIONS,
  ...mockDailyChecks,
  ...mockSpotChecks,
  ...mockFinalInspections,
  ...mockInlineInspections,
  ...mockFieldAuditorInspections,
  ...mockPpMeetings,
].map((i) => ({ ...i })) as unknown as InspectionSummary[];

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(inspectionType: string) {
  return `${inspectionType}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function listInspections(inspectionType?: string) {
  await delay();
  const items = inspectionType ? store.filter((i) => i.inspectionType.key === inspectionType) : store;
  return { items: [...items], total: items.length };
}

export async function getInspection(id: string) {
  await delay(200);
  const found = store.find((i) => i._id === id);
  if (!found) throw new Error('Inspection not found.');
  return found;
}

export async function createInspection(payload: { clientId: string; inspectionType: string; factory?: string }) {
  await delay(200);
  const now = new Date().toISOString();
  const created: InspectionSummary = {
    _id: generateId(payload.inspectionType),
    clientId: payload.clientId,
    inspectionType: { key: payload.inspectionType, name: TYPE_NAMES[payload.inspectionType] ?? payload.inspectionType },
    factory: null,
    status: 'draft',
    data: {},
    updatedAt: now,
    startedAt: now,
  };
  store = [created, ...store];
  return created;
}

export async function updateInspection(id: string, payload: { data: Record<string, any> }) {
  await delay(200);
  const idx = store.findIndex((i) => i._id === id);
  if (idx === -1) throw new Error('Inspection not found.');
  const updated: InspectionSummary = { ...store[idx], data: payload.data, updatedAt: new Date().toISOString() };
  store[idx] = updated;
  return updated;
}

export async function submitInspection(id: string) {
  await delay(300);
  const idx = store.findIndex((i) => i._id === id);
  if (idx === -1) throw new Error('Inspection not found.');
  const submittedAt = new Date().toISOString();
  store[idx] = { ...store[idx], status: 'submitted', updatedAt: submittedAt };
  return { id, status: 'submitted', submittedAt };
}

export async function deleteInspection(id: string) {
  await delay(200);
  store = store.filter((i) => i._id !== id);
}
