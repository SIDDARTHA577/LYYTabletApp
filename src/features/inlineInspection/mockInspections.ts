import { createEmptyInlineInspectionData } from './emptyFormData';
import type { InlineInspectionData } from './types';

export const mockInlineInspections = [
  {
    _id: 'ii-mock-1',
    clientId: 'ii-mock-1',
    inspectionType: { key: 'inline_inspection', name: 'Inline Inspection' },
    status: 'draft',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    startedAt: new Date().toISOString(), // Today
    data: {
      ...createEmptyInlineInspectionData(),
      insp_time_po_info: {
        factory: 'Shenzhen Apparel Co.',
        type: 'Inline',
        material: 'Knit',
        product_category: 'Bottoms',
        product_secondary_category: 'Trousers',
        vendor_qc: 'QC Li',
        reporting_user: ['Inspector Gadget'],
        second_reporting: [],
        inspector: ['Inspector Gadget'],
        color_count: 1,
        inspection_date: '2026-07-29',
        start_time: '13:00',
        end_time: '15:00',
        report_comments: 'Inline check normal.',
        styles: [
          {
            selected: true,
            style: 'II-2026-002',
            po: 'PO-202020',
            cpo: 'CPO-999',
            po_qty: 2500,
            color_name: 'Khaki',
            prepacks: 100,
            tech_packs: 1,
          },
        ],
      },
      production_status: {
        order: 2500,
        cutting: 1200,
        sampling_size: 50,
        in_house_subcontracted: 'In House',
        emb_out: 0,
        emb_back: 0,
        cutting_pieces: 1000,
        semi_finished: 500,
        trimming: 300,
        final_pressing: 200,
        packing: 100,
        finished: 100,
        remark_cn: '生产正常',
        remark_en: 'Production normal',
      },
      workmanship_defects: {
        critical: 0,
        major: 1,
        minor: 2,
        defects: [
          {
            type: 'Stitching',
            position: 'SIDE SEAM',
            content_cn: '侧缝起皱',
            content_en: 'Puckering at side seam',
            desc_cn: '部分起皱',
            desc_en: 'Slight puckering',
            corrective_cn: '返工',
            corrective_en: 'Rework',
            pre_alert: false,
          },
        ],
      },
    } as InlineInspectionData,
  },
];
