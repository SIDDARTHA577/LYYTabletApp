import { createEmptyPpMeetingData } from './emptyFormData';
import type { PpMeetingData } from './types';

export const mockPpMeetings = [
  {
    _id: 'ppm-mock-1',
    clientId: 'ppm-mock-1',
    inspectionType: { key: 'pp_meeting', name: 'PP Meeting' },
    status: 'draft',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    startedAt: new Date().toISOString(), // Today
    data: {
      ...createEmptyPpMeetingData(),
      style_po_info: {
        vendor: 'LYY Global Sourcing',
        factory_code: 'FTY-A',
        style: 'PPM-2026-001',
        po: 'PO-987654',
        cpo: 'CPO-12345',
        brand_dept: 'Menswear / Casual',
        description: 'Men Denim Jacket',
        fabrication_weight: '100% Cotton 12oz',
        season: 'Fall 2026',
        production_country: 'China',
        delivery_date: '2026-10-15',
        sealed_sample: 'PPS-0982-A',
        high_risk_style: 'No',
        multi_factory: 'No',
        colors_qty: [
          { color: 'Indigo Blue', qty: 5000 },
          { color: 'Black Denim', qty: 3000 }
        ],
      },
      meeting_details: {
        ppm_date: '2026-07-31',
        pp_approved: 'Yes',
        green_tag: 'Yes',
        size_set_status: 'Pending',
        plan_cut_date: '2026-08-05',
        actual_cut_date: '',
        plan_sew_date: '2026-08-08',
        actual_sew_date: '',
        finishing_date: '2026-08-25',
        packing_date: '2026-08-30',
      },
    } as PpMeetingData,
  },
  {
    _id: 'ppm-mock-2',
    clientId: 'ppm-mock-2',
    inspectionType: { key: 'pp_meeting', name: 'PP Meeting' },
    status: 'draft',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    startedAt: new Date().toISOString(),
    data: createEmptyPpMeetingData(),
  },
];
