export interface SpotCheckData {
  style_po_info: {
    style: string;
    po: string;
    cpo: string;
    brand: string;
    colors: string;
    factory: string;
    description: string;
  };
  spot_check_details: {
    date: string;
    time: string;
    inspector: string;
    factory_type: string;
    area_stage: string;
    trigger_reason: string;
    prior_report_ref: string;
  };
  document_audit: {
    tech_pack: 'Available' | 'Not' | 'N/A' | '';
    po: 'Available' | 'Not' | 'N/A' | '';
    pps_sample: 'Available' | 'Not' | 'N/A' | '';
    fabric: 'Available' | 'Not' | 'N/A' | '';
    accessory: 'Available' | 'Not' | 'N/A' | '';
    trim_card: 'Available' | 'Not' | 'N/A' | '';
    packing: 'Available' | 'Not' | 'N/A' | '';
    size_spec: 'Available' | 'Not' | 'N/A' | '';
  };
  in_process_checks: Record<string, { status: 'OK' | 'Not OK' | 'N/A' | ''; comments: string }>;
  aql_spot_inspection: {
    pcs_inspected: number;
    aql_level: string;
    total_majors: number;
    total_minors: number;
    defective_percent: string;
    aql_result: 'Pass' | 'Fail' | 'Hold' | '';
    findings: Array<{ defect: string; severity: string; qty: number; immediate_action: string }>;
  };
  bulk_conformity: Record<string, { status: 'OK' | 'Not OK' | 'N/A' | ''; comments: string }>;
  bulk_conformity_spec_sheet: { name: string; uri: string } | null | string;
  photo_journal: {
    sewing_line: string;
    defect: string;
    labelling: string;
    packing: string;
    colour_shading: string;
    measurement: string;
  };
  conclusion_cap: {
    findings_summary: string;
    meeting_cap: string;
    overall_result: 'Pass' | 'Fail' | 'Hold' | '';
    escalation: string;
    system_report_issued: boolean;
    notify: string;
    inspector_signature: string;
    factory_signature: string;
    date_inspector: string;
    date_factory: string;
  };
}
