export interface FieldAuditorData {
  cover_summary: {
    factory_type: string;
    report_title: string;
    report_subtitle: string;
    factory_name_en: string;
    factory_name_cn: string;
    po_vendor_en: string;
    po_vendor_cn: string;
    location: string;
    date_established: string;
    audit_date: string;
    prepared_by: string;
    report_month_year: string;
    factory_size: string;
    total_machines: string;
    workforce_approx: string;
    peak_monthly_capacity: string;
    production_capability: Record<string, { status: string; notes: string }>;
    compliance_snapshot: Record<string, { status: string; notes: string }>;
  };
  pre_visit_pack: {
    documentation_compliance: Record<string, { status: string; notes: string }>;
    structural_geopolitical: Record<string, { status: string; notes: string }>;
  };
  company_overview: {
    identification: Record<string, { status: string; notes: string }>;
    key_contacts: Record<string, { status: string; notes: string }>;
    business_profile: Record<string, { status: string; notes: string }>;
  };
  business_structure: {
    entities: Record<string, { status: string; notes: string }>;
    ownership_overlap: Record<string, { status: string; notes: string }>;
  };
  workforce: {
    headcount: Record<string, { headcount: string; applicable_to: string; notes: string }>;
  };
  machinery: {
    knitwear_1: Record<string, { qty: string; brand_model: string; notes: string }>;
    knitwear_2: Record<string, { qty: string; brand_model: string; notes: string }>;
    knitwear_3: Record<string, { monthly_capacity: string; daily_output: string; notes: string }>;
    cut_sew_1: Record<string, { qty: string; brand_model: string; notes: string }>;
    cut_sew_2: Record<string, { status: string; notes: string }>;
    cut_sew_3: Record<string, { qty: string; brand_model: string; notes: string }>;
    cut_sew_4: Record<string, { status: string; notes: string }>;
    cut_sew_5: Record<string, { qty: string; brand_model: string; notes: string }>;
    cut_sew_6: Record<string, { qty: string; brand_model: string; notes: string }>;
    cut_sew_7: Record<string, { monthly_capacity: string; daily_equivalent: string; notes: string }>;
    common_finishing_1: Record<string, { qty: string; brand_model: string; notes: string }>;
    common_finishing_2: Record<string, { qty: string; brand_model: string; notes: string }>;
  };
  sample_room: {
    setup: Record<string, { status: string; notes: string }>;
    pre_production: Record<string, { status: string; notes: string }>;
  };
  sampling_cycle: Record<string, { status: string; notes: string }>;
  fabric_trims_sourcing: {
    fabric: Record<string, { status: string; notes: string }>;
    trims: Record<string, { status: string; notes: string }>;
  };
  production_flow: Array<{ stage: string; in_house_sub_con: string; sub_contractor: string; notes: string }>;
  compliance_checklist: {
    safety_facilities: Record<string, { status: string; notes: string }>;
    materials_inventory: Record<string, { status: string; notes: string }>;
  };
  qc_equipment: Record<string, { status: string; notes: string }>;
  non_negotiables: Array<{ gate: string; status: string; observation: string }>;
  observations: Record<string, string>;
  photo_log: Array<{ code: string; filename: string; caption: string; flag: string }>;
  post_visit_decision: {
    certifications: Record<string, { verified: string | boolean; date: string; notes: string }>;
    recommendation: { tier: string; window: string; reasoning: string };
    cap: Array<{ issue: string; owner: string; deadline: string; status: string }>;
    specialist_referral: boolean;
  };
}
