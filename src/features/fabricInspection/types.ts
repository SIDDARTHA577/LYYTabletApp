// Mirrors the `fabric_inspection` FormSchema seeded in
// server/seed/formSchemas.js (fabricInspectionSections()) field-for-field —
// keep field keys in sync with that file so PATCH /inspections/:id payloads
// round-trip cleanly through the generic `data: Mixed` document shape.

export interface RollRow {
  _rowId: string;
  rollNo: string;
  lotDia: string;
  lengthYd: number | null;
  widthIn: number | null;
  weightKg: number | null;
  totalPts: number | null; // computed: sum of matching Defect Log rows
  ptsPer100yd2: number | null; // computed
  result: 'Pass' | 'Screen' | 'Reject' | '' ;
  labelLengthWeight: string; // supplier-stated length/weight as printed on the roll label
  labelPhotoUri: string | null; // photo of the roll/lot label
}

export interface DefectRow {
  _rowId: string;
  rollNo: string;
  code: string;
  defectName: string;
  band: '1' | '2' | '3' | '4' | '';
  pts: number | null; // computed from band
  locationRemark: string;
}

export interface CheckGridRowValue {
  status: string | null;
  value: string;
}

export interface SignatureValue {
  paths: string[];
}

export interface FabricInspectionData {
  order_fabric_info: {
    factory: string;
    vendorMill: string;
    jobNo: string;
    style: string;
    po: string;
    colour: string;
    description: string;
    fabricType: string;
    gsm: number | null;
    widthIn: number | null;
    widthCm: number | null;
    construction: string;
    lotNo: string;
  };
  inspection_details: {
    inspectionDate: string | null;
    checker: string;
    inspectionMethod: string;
    samplingPlan: string;
    totalRolls: number | null;
    totalQuantity: number | null;
    lightSource: string;
    location: string;
    method: string;
    shadeBandAvailable: 'Yes' | 'No' | '';
  };
  acceptance_criteria: {
    maxPerRoll: number | null;
    maxShipmentAverage: number | null;
  };
  roll_by_roll: {
    rolls: RollRow[];
  };
  defect_log: {
    defects: DefectRow[];
  };
  defect_summary_result: {
    totalInspectedQty: number | null;
    totalPenaltyPoints: number | null;
    avgPtsPer100yd2: number | null;
    rollsInspected: number | null;
    overallResult: 'Pass' | 'Screen' | 'Reject' | '';
    summaryRemarks: string;
  };
  shade_width_physical: {
    checks: Record<string, CheckGridRowValue>;
  };
  lab_test_reports: {
    shrinkageResult: string; shrinkageReport: { name: string; uri: string } | null;
    crockingResult: string; crockingReport: { name: string; uri: string } | null;
    washResult: string; washReport: { name: string; uri: string } | null;
    gsmResult: string; gsmReport: { name: string; uri: string } | null;
    spiralityResult: string; spiralityReport: { name: string; uri: string } | null;
    phResult: string; phReport: { name: string; uri: string } | null;
  };
  photo_journal: {
    fabricFace: string | null;
    fabricBack: string | null;
    shadeBand: string | null;
    selvedge: string | null;
    majorDefect1: string | null;
    majorDefect2: string | null;
    rollLotLabel: string | null;
    centreToSelvedgeTest: string | null;
  };
  conclusion_signoff: {
    overallResult: 'Pass' | 'Screen' | 'Reject' | '';
    disposition: string;
    remarks: string;
    qualityController: string;
    warehouseInCharge: string;
    date: string | null;
    signature: SignatureValue | null;
  };
}
