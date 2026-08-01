import { createEmptyDailyCheckData } from './emptyFormData';
import type { DailyCheckData } from './types';

export const mockDailyChecks = [
  {
    _id: 'dc-mock-1',
    clientId: 'dc-mock-1',
    inspectionType: { key: 'daily_check', name: 'Daily Check' },
    status: 'draft',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    startedAt: new Date().toISOString(), // Today
    data: {
      ...createEmptyDailyCheckData(),
      style_po_info: {
        style: 'DC-2026-001',
        po: 'PO-987654',
        cpo: 'CPO-123',
        brand: 'LYY Basics',
        description: 'Cotton Crew Neck T-Shirt',
        colors_qty: 'White: 500, Black: 500',
        division: 'Menswear',
      },
      visit_details: {
        date: '2026-07-29',
        inspector: 'Inspector Gadget',
        factory: 'Shenzhen Apparel Co.',
        audit_stage: 'Inline',
        lines: 'Line 3',
        sewer_headcount: 25,
        machines_allocated: 30,
        machines_running: 28,
      },
      aql_inspection: {
        pcs_available: 1000,
        pcs_inspected: 80,
        aql_level: '2.5',
        sample_source: 'Line',
        total_majors: 1,
        total_minors: 2,
        pcs_rejected: 0,
        defective_percent: '1.25%',
        inspection_result: 'Pass',
        acceptance: 'Ac',
      },
    } as DailyCheckData,
  },
];
