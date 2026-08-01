import type { FieldAuditorData } from './types';

export function createEmptyFieldAuditorData(): FieldAuditorData {
  return {
    cover_summary: {
      factory_type: '',
      report_title: 'Factory Inspection Report',
      report_subtitle: '',
      factory_name_en: '',
      factory_name_cn: '',
      po_vendor_en: '',
      po_vendor_cn: '',
      location: '',
      date_established: '',
      audit_date: '',
      prepared_by: '',
      report_month_year: '',
      factory_size: '',
      total_machines: '',
      workforce_approx: '',
      peak_monthly_capacity: '',
      production_capability: {},
      compliance_snapshot: {},
    },
    pre_visit_pack: {
      documentation_compliance: {},
      structural_geopolitical: {},
    },
    company_overview: {
      identification: {},
      key_contacts: {},
      business_profile: {},
    },
    business_structure: {
      entities: {},
      ownership_overlap: {},
    },
    workforce: {
      headcount: {},
    },
    machinery: {
      knitwear_1: {},
      knitwear_2: {},
      knitwear_3: {},
      cut_sew_1: {},
      cut_sew_2: {},
      cut_sew_3: {},
      cut_sew_4: {},
      cut_sew_5: {},
      cut_sew_6: {},
      cut_sew_7: {},
      common_finishing_1: {},
      common_finishing_2: {},
    },
    sample_room: {
      setup: {},
      pre_production: {},
    },
    sampling_cycle: {},
    fabric_trims_sourcing: {
      fabric: {},
      trims: {},
    },
    production_flow: [],
    compliance_checklist: {
      safety_facilities: {},
      materials_inventory: {},
    },
    qc_equipment: {},
    non_negotiables: [],
    observations: {},
    photo_log: [],
    post_visit_decision: {
      certifications: {},
      recommendation: { tier: '', window: '', reasoning: '' },
      cap: [],
      specialist_referral: false,
    },
  };
}
