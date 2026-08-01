import type { PpMeetingData } from './types';

export function createEmptyPpMeetingData(): PpMeetingData {
  const emptyChecklist = (size: number) => {
    const res: Record<string, { status: string; remarks: string }> = {};
    for (let i = 1; i <= size; i++) {
      res[String(i)] = { status: '', remarks: '' };
    }
    return res;
  };

  const emptyStatusRecord = (keys: string[]) => {
    const res: Record<string, { status: string; remarks: string }> = {};
    for (const k of keys) {
      res[k] = { status: '', remarks: '' };
    }
    return res;
  };

  return {
    style_po_info: {
      vendor: '',
      factory_code: '',
      style: '',
      po: '',
      cpo: '',
      brand_dept: '',
      description: '',
      fabrication_weight: '',
      season: '',
      production_country: '',
      delivery_date: '',
      sealed_sample: '',
      high_risk_style: '',
      multi_factory: '',
      colors_qty: [],
    },
    meeting_details: {
      ppm_date: '',
      pp_approved: '',
      green_tag: '',
      size_set_status: '',
      plan_cut_date: '',
      actual_cut_date: '',
      plan_sew_date: '',
      actual_sew_date: '',
      finishing_date: '',
      packing_date: '',
    },
    participants: [],
    ppm_document_checklist: emptyChecklist(19),
    sample_review_approved: {
      checklist: emptyChecklist(11),
      others_status: '',
      others: '',
    },
    fit_measurements: {
      fitting_comments: '',
      critical_pom_reviewed: '',
      measurement_result: '',
      spec_sheet: null,
      photo_front: '',
      photo_back: '',
      photo_side: '',
    },
    fabric_review: {
      checklist: emptyChecklist(11),
      properties: {
        bowing: '',
        skewing: '',
        repeat_variation: '',
        fraying: '',
        shade_variation: '',
        yarn_pulling: '',
        visual_rejection_pct: '',
      },
      shrinkage_by_colour: [],
    },
    trims_review: {
      trim_card_approved: '',
      copies_distributed: 0,
      trim_status: emptyStatusRecord([
        'Main Label', 'Size Label', 'Washcare Label', 'Security Label', 'Price Ticket',
        'Thread TEX', 'Elastic', 'Smocking Elastic', 'Drawcord', 'Mobilon',
        'Hook & Eye', 'Zipper', 'Button', 'Lining', 'Interlining'
      ]),
      fusible_time: '',
      fusible_temp: '',
      fusible_pressure: '',
      fusible_strength: '',
      ht_area: '',
      ht_temp: '',
      ht_pressure: '',
      ht_time: '',
    },
    cutting_review: emptyChecklist(6),
    sewing_construction_review: {
      checklist: emptyChecklist(5),
      spi: {
        snls: '',
        overlock: '',
        flat_seam: '',
        other: '',
      },
      photo_sewing_illustration: '',
      photo_critical_operation: '',
    },
    finishing_pressing_packing_review: {
      checklist: emptyChecklist(5),
      packing_method: '',
      fold_code: '',
      carton_dimension: '',
    },
    size_set_inspection: {
      size_set_planned_date: '',
      actual_submission_date: '',
      pcd_date: '',
      cut_qty: 0,
      accessories_check: {},
      pattern_check: {},
      measurement_and_result: {},
      corrections_to_be_done: '',
    },
    production_plan: {
      factory_capacity: '',
      capacity_for_brand: '',
      production_lead_time: '',
      total_production_lines: '',
      cut_date: '',
      sew_date: '',
      finishing_date: '',
      packing_date: '',
      sub_contractor: '',
    },
    follow_up_actions: {
      actions: [],
      things_to_follow: {
        'QA Lab Top Sample': { responsibility: '', due_date: '' },
        'Merchant Top Sample': { responsibility: '', due_date: '' },
        'Wash & Wear Garments': { responsibility: '', due_date: '' },
        'GPT Closure': { responsibility: '', due_date: '' },
        'GPT Counter': { responsibility: '', due_date: '' },
      },
      fpt_status_by_colour: [],
    },
    photo_journal: {
      photo_approved_sample: '',
      photo_bulk_fabric: '',
      photo_trims_labels: '',
      photo_critical_operation: '',
      photo_construction_detail: '',
      photo_packing_folding: '',
    },
    conclusion_remarks: {
      critical_defects_to_avoid: '',
      carryover_style_lessons: '',
      new_style: '',
      overall_pp_result: '',
      prepared_by: '',
      qa_manager: '',
      vendor_signature: null,
      date: '',
    },
  };
}
