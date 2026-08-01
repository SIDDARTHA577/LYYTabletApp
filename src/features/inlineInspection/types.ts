export interface InlineInspectionData {
  insp_time_po_info: {
    factory: string;
    type: string;
    material: string;
    product_category: string;
    product_secondary_category: string;
    vendor_qc: string;
    reporting_user: string[];
    second_reporting: string[];
    inspector: string[];
    color_count: number;
    inspection_date: string;
    start_time: string;
    end_time: string;
    report_comments: string;
    styles: Array<{ selected: boolean; style: string; po: string; cpo: string; po_qty: number; color_name: string; prepacks: number; tech_packs: number }>;
  };
  upload_report_files: {
    measurement: { file: string; fileName?: string; is_internal: boolean };
    handwritten_report: { file: string; fileName?: string; is_internal: boolean };
    preview_report: { file: string; fileName?: string; is_internal: boolean };
    inspection_file: { file: string; fileName?: string; is_internal: boolean };
    other: { file: string; fileName?: string; is_internal: boolean };
  };
  pp_sample: {
    date: string;
    comment_cn: string;
    comment_en: string;
    photos: string[];
  };
  cutting_report_document: {
    documents: string[];
    lab_tests: string[];
  };
  accessories: Record<string, boolean>;
  production_status: {
    order: number;
    cutting: number;
    sampling_size: number;
    in_house_subcontracted: string;
    emb_out: number;
    emb_back: number;
    cutting_pieces: number;
    semi_finished: number;
    trimming: number;
    final_pressing: number;
    packing: number;
    finished: number;
    remark_cn: string;
    remark_en: string;
  };
  production_status_photos: Array<{ file: string; status: string }>;
  pre_packaged: Array<{ file: string; status: string }>;
  check_point_list: Array<{ point: string; result: string; desc?: string; photo: string }>;
  workmanship_defects: {
    critical: number;
    major: number;
    minor: number;
    defects: Array<{ type: string; position: string; content_cn: string; content_en: string; desc_cn: string; desc_en: string; corrective_cn: string; corrective_en: string; pre_alert: boolean; is_custom?: boolean }>;
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
  photo_journal: Array<{ type: string; internal_data: boolean; status: string; photo: string }>;
  keep_sample: {
    quantity: string;
    barcode: string;
  };
}
