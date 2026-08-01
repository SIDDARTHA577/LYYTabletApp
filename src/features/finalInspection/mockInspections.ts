import { createEmptyFinalInspectionData } from './emptyFormData';
import type { FinalInspectionData } from './types';

export const mockFinalInspections = [
  {
    _id: 'fi-mock-1',
    clientId: 'fi-mock-1',
    inspectionType: { key: 'final_inspection', name: 'Final Inspection' },
    status: 'draft',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    startedAt: new Date().toISOString(), // Today
    data: {
      ...createEmptyFinalInspectionData(),
      insp_time_po_info: {
        factory: 'Shenzhen Apparel Co.',
        type: 'Final',
        material: 'Woven',
        product_category: 'Top',
        product_secondary_category: 'Blouse',
        vendor_qc: 'QC Wang',
        reporting_user: ['Inspector Gadget'],
        second_reporting: [],
        inspector: 'Inspector Gadget',
        color_count: 2,
        inspection_date: '2026-07-29',
        start_time: '09:00',
        end_time: '12:00',
        report_comments: 'Final inspection looks good.',
        styles: [
          {
            selected: true,
            style: 'FI-2026-001',
            po: 'PO-101010',
            cpo: 'CPO-789',
            po_qty: 1500,
            color_name: 'Red, Blue',
            prepacks: 50,
            tech_packs: 1,
          },
        ],
      },
      cutting_report: {
        order_qty: 1500,
        consignment_qty: 1550,
        cutting_qty_fty: 1560,
        aql_level: '2.5',
        sampling_carton: 'C1-C10',
        sample_size_level: 'LEVEL II',
        aql_standard: 'AQL2.5–AQL4.0',
        documents: [],
      },
      random_sampling_aql: {
        sampling_size: { major: 125, minor: 125, pcs: 125 },
        accept_level: { major: 7, minor: 7 },
        reject_level: { major: 8, minor: 8 },
        rejected_pieces: { major: 2, minor: 2 },
        results: 'Pass',
        comment: '',
      },
      conclusion_cap: {
        findings_summary: 'Overall good',
        meeting_cap: 'None required',
        overall_result: 'Pass',
        escalation: 'None',
        system_report_issued: true,
        notify: 'Production Manager',
        inspector_signature: 'IG',
        factory_signature: 'FW',
        date_inspector: '2026-07-29',
        date_factory: '2026-07-29',
      }
    } as FinalInspectionData,
  },
];
