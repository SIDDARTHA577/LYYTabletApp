import { SignatureValue } from '../../components/form/SignaturePad';

export interface PpMeetingData {
  style_po_info: {
    vendor: string;
    factory_code: string;
    style: string;
    po: string;
    cpo: string;
    brand_dept: string;
    description: string;
    fabrication_weight: string;
    season: string;
    production_country: string;
    delivery_date: string;
    sealed_sample: string;
    high_risk_style: string;
    multi_factory: string;
    colors_qty: Array<{ color: string; qty: number }>;
  };
  meeting_details: {
    ppm_date: string;
    pp_approved: string;
    green_tag: string;
    size_set_status: string;
    plan_cut_date: string;
    actual_cut_date: string;
    plan_sew_date: string;
    actual_sew_date: string;
    finishing_date: string;
    packing_date: string;
  };
  participants: Array<{ name: string; title: string; side: string; signature: string }>;
  ppm_document_checklist: Record<string, { status: string; remarks: string }>;
  sample_review_approved: {
    checklist: Record<string, { status: string; remarks: string }>;
    others_status: string;
    others: string;
  };
  fit_measurements: {
    fitting_comments: string;
    critical_pom_reviewed: string;
    measurement_result: string;
    spec_sheet: { name: string; uri: string } | null;
    photo_front: string;
    photo_back: string;
    photo_side: string;
  };
  fabric_review: {
    checklist: Record<string, { status: string; remarks: string }>;
    properties: {
      bowing: string;
      skewing: string;
      repeat_variation: string;
      fraying: string;
      shade_variation: string;
      yarn_pulling: string;
      visual_rejection_pct: string;
    };
    shrinkage_by_colour: Array<{ colour: string; shrinkage: string; notes: string }>;
  };
  trims_review: {
    trim_card_approved: string;
    copies_distributed: number;
    trim_status: Record<string, { status: string; remarks: string }>;
    fusible_time: string;
    fusible_temp: string;
    fusible_pressure: string;
    fusible_strength: string;
    ht_area: string;
    ht_temp: string;
    ht_pressure: string;
    ht_time: string;
  };
  cutting_review: Record<string, { status: string; remarks: string }>;
  sewing_construction_review: {
    checklist: Record<string, { status: string; remarks: string }>;
    spi: {
      snls: string;
      overlock: string;
      flat_seam: string;
      other: string;
    };
    photo_sewing_illustration: string;
    photo_critical_operation: string;
  };
  finishing_pressing_packing_review: {
    checklist: Record<string, { status: string; remarks: string }>;
    packing_method: string;
    fold_code: string;
    carton_dimension: string;
  };
  size_set_inspection: {
    size_set_planned_date: string;
    actual_submission_date: string;
    pcd_date: string;
    cut_qty: number;
    accessories_check: Record<string, string>;
    pattern_check: Record<string, string>;
    measurement_and_result: Record<string, string>;
    corrections_to_be_done: string;
  };
  production_plan: {
    factory_capacity: string;
    capacity_for_brand: string;
    production_lead_time: string;
    total_production_lines: string;
    cut_date: string;
    sew_date: string;
    finishing_date: string;
    packing_date: string;
    sub_contractor: string;
  };
  follow_up_actions: {
    actions: Array<{ action: string; responsible: string; due_date: string }>;
    things_to_follow: Record<string, { responsibility: string; due_date: string }>;
    fpt_status_by_colour: Array<{ colour: string; status: string }>;
  };
  photo_journal: {
    photo_approved_sample: string;
    photo_bulk_fabric: string;
    photo_trims_labels: string;
    photo_critical_operation: string;
    photo_construction_detail: string;
    photo_packing_folding: string;
  };
  conclusion_remarks: {
    critical_defects_to_avoid: string;
    carryover_style_lessons: string;
    new_style: string;
    overall_pp_result: string;
    prepared_by: string;
    qa_manager: string;
    vendor_signature: SignatureValue | null;
    date: string;
  };
}
