import { createEmptyFieldAuditorData } from './emptyFormData';
import type { FieldAuditorData } from './types';

export const mockFieldAuditorInspections = [
  {
    _id: 'fa-mock-1',
    clientId: 'fa-mock-1',
    inspectionType: { key: 'field_auditor', name: 'Factory Check' },
    status: 'draft',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    startedAt: new Date().toISOString(), // Today
    data: {
      ...createEmptyFieldAuditorData(),
      cover_summary: {
        factory_type: 'Combined',
        report_title: 'Factory Inspection Report',
        report_subtitle: 'New Vendor Evaluation',
        factory_name_en: 'Shenzhen Apparel Co.',
        factory_name_cn: '深圳服装制造厂',
        po_vendor_en: 'Global Sourcing LLC',
        po_vendor_cn: '环球采购公司',
        location: 'Shenzhen, Guangdong, China',
        date_established: '2010-05-12',
        audit_date: '2026-07-29',
        prepared_by: 'Inspector Gadget',
        report_month_year: 'July 2026',
        factory_size: '5,000 sqm',
        total_machines: '250',
        workforce_approx: '300',
        peak_monthly_capacity: '500,000',
        production_capability: {},
        compliance_snapshot: {},
      },
      post_visit_decision: {
        certifications: {},
        recommendation: {
          tier: 'APPROVED WITH CONDITIONS',
          window: '90 days',
          reasoning: 'Minor compliance issues found in warehouse.',
        },
        cap: [
          {
            issue: 'Blocked fire exit in warehouse',
            owner: 'Factory Manager',
            deadline: '2026-08-15',
            status: 'Pending',
          }
        ],
        specialist_referral: false,
      }
    } as FieldAuditorData,
  },
];
