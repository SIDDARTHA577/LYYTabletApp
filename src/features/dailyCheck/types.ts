export interface DailyCheckData {
  style_po_info: {
    style: string;
    po: string;
    cpo: string;
    brand: string;
    description: string;
    colors_qty: string;
    division: string;
    last_x_factory_date: string;
  };
  visit_details: {
    date: string;
    inspector: string;
    factory: string;
    audit_stage: string;
    lines: string;
    sewer_headcount: number;
    machines_allocated: number;
    machines_running: number;
  };
  document_audit: {
    tech_pack: 'OK' | 'Not OK' | 'N/A' | '';
    po: 'OK' | 'Not OK' | 'N/A' | '';
    pps_sample: 'OK' | 'Not OK' | 'N/A' | '';
    fabric: 'OK' | 'Not OK' | 'N/A' | '';
    accessory: 'OK' | 'Not OK' | 'N/A' | '';
    trim_card: 'OK' | 'Not OK' | 'N/A' | '';
    packing: 'OK' | 'Not OK' | 'N/A' | '';
    size_spec: 'OK' | 'Not OK' | 'N/A' | '';
  };
  production_status: {
    order_qty: number;
    cutting: number;
    sewing: number;
    finishing: number;
    packed: number;
    balance_workshop: number;
    in_house_vs_sub: string;
    ex_factory_date: string;
  };
  in_process_checks: Record<string, { status: 'OK' | 'Not OK' | 'N/A' | ''; comment: string }>; // Check points to comments
  accessories_check: Record<string, 'OK' | 'Not OK' | 'N/A' | ''>;
  defect_checklist: Record<string, 'OK' | 'Defect' | 'N/A' | ''>;
  aql_inspection: {
    pcs_available: number;
    pcs_inspected: number;
    aql_level: string;
    sample_source: string;
    total_majors: number;
    total_minors: number;
    pcs_rejected: number;
    defective_percent: string;
    inspection_result: 'Pass' | 'Fail' | 'Pending' | '';
    acceptance: 'Ac' | 'Re' | '';
  };
  bulk_conformity: Record<string, { status: 'OK' | 'Not OK' | 'N/A' | ''; comment: string }>;
  photo_journal: {
    cutting_floor: string;
    sewing_line: string;
    pressing_finishing: string;
    labelling: string;
    packing_carton: string;
    defect: string;
    colour_shading: string;
    measurement: string;
  };
  meeting_cap: {
    meeting_notes: string;
    cap: string;
    overall_result: 'Pass' | 'Fail' | 'Pending' | '';
    system_report_issued: boolean;
    detailed_comments: string;
    action_by_vendor: string;
    inspector_signature: string;
    factory_signature: string;
    date: string;
  };
}
