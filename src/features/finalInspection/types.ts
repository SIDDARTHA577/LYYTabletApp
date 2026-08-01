export interface FinalInspectionData {
  insp_time_po_info: {
    factory: string;
    type: string;
    material: string;
    product_category: string;
    product_secondary_category: string;
    vendor_qc: string;
    reporting_user: string[];
    second_reporting: string[];
    inspector: string;
    color_count: number;
    inspection_date: string;
    start_time: string;
    end_time: string;
    report_comments: string;
    styles: Array<{ selected: boolean; style: string; po: string; cpo: string; po_qty: number; color_name: string; prepacks: number; tech_packs: number }>;
  };
  upload_report_files: {
    measurement: { file: string; is_internal: boolean };
    handwritten_report: { file: string; is_internal: boolean };
    preview_report: { file: string; is_internal: boolean };
    inspection_file: { file: string; is_internal: boolean };
    other: { file: string; is_internal: boolean };
  };
  cutting_report: {
    order_qty: number;
    consignment_qty: number;
    cutting_qty_fty: number;
    aql_level: string;
    sampling_carton: string;
    sample_size_level: string;
    aql_standard: string;
    documents: string[];
  };
  pp_sample: {
    date: string;
    comment_cn: string;
    comment_en: string;
    photos: string[];
  };
  packing_shipping_mark: {
    weight: { value: number; unit: string; status: string; comment: string };
    measurement: { value: number; unit: string; status: string; comment: string };
    packaging: { packed_garments: number; packed_percent: number; carton_qty: number; balance_qty: number; balance_percent: number; status: string };
    pre_pack: { value: number };
    packing_method: string;
    overall: { status: string; comment: string };
    photos: Array<{ type: string; file: string }>;
  };
  accessories: Record<string, boolean>;
  check_point_list: Array<{ point: string; result: string; photo: string; comment_cn?: string; comment_en?: string }>;
  workmanship_defects: {
    critical: number;
    major: number;
    minor: number;
    defects: Array<{ type: string; position: string; position_cn?: string; position_en?: string; content?: string; content_cn: string; content_en: string; desc_cn: string; desc_en: string; corrective_cn: string; corrective_en: string; pre_alert: boolean; improvement_cn?: string; improvement_en?: string; is_custom?: boolean }>;
  };
  production_safety_mgmt: {
    needle_control: Record<string, any>;
    sharp_object_management: Record<string, any>;
    metal_detection_management: Record<string, any>;
  };
  random_sampling_meas: {
    qty: number;
    major: number;
    minor: number;
  };
  random_sampling_aql: {
    sampling_size: { major: number; minor: number; pcs?: number };
    accept_level: { major: number; minor: number };
    reject_level: { major: number; minor: number };
    rejected_pieces: { major: number; minor: number };
    results: string;
    comment: string;
  };
  photo_journal: Array<{ type: string; internal_data: boolean; status: string; photo: string }>;
  keep_sample: {
    quantity: string;
    barcode: string;
  };
}
