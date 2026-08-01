import { createEmptySpotCheckData } from './emptyFormData';
import type { SpotCheckData } from './types';

export const mockSpotChecks = [
  {
    _id: 'sc-mock-1',
    clientId: 'sc-mock-1',
    inspectionType: { key: 'spot_check', name: 'Spot Check' },
    status: 'draft',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    startedAt: new Date().toISOString(), // Today
    data: {
      ...createEmptySpotCheckData(),
      style_po_info: {
        style: 'SC-2026-999',
        po: 'PO-111222',
        cpo: 'CPO-456',
        brand: 'LYY Premium',
        colors: 'Navy Blue',
        factory: 'Hangzhou Textiles',
        description: 'Linen Button-Up Shirt',
      },
      spot_check_details: {
        date: '2026-07-29',
        time: '14:30',
        inspector: 'Inspector Gadget',
        factory_type: 'Cut & Sew',
        area_stage: 'Sewing Line 2',
        trigger_reason: 'Routine Random',
        prior_report_ref: '',
      },
      aql_spot_inspection: {
        pcs_inspected: 32,
        aql_level: '1.5',
        total_majors: 0,
        total_minors: 1,
        defective_percent: '3.125%',
        aql_result: 'Pass',
        findings: [
          { defect: 'Uncut thread', severity: 'Minor', qty: 1, immediate_action: 'Trimmed on spot' }
        ],
      },
    } as SpotCheckData,
  },
];
