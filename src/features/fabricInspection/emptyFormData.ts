import type { FabricInspectionData } from './types';

export function createEmptyFabricInspectionData(): FabricInspectionData {
  return {
    order_fabric_info: {
      factory: '', vendorMill: '', jobNo: '', style: '', po: '', colour: '',
      description: '', fabricType: '', gsm: null, widthIn: null, widthCm: null,
      construction: '', lotNo: '',
    },
    inspection_details: {
      inspectionDate: null, checker: '', inspectionMethod: '4-Point System', samplingPlan: '10% per lot',
      totalRolls: null, totalQuantity: null, lightSource: '', location: '', method: '4-Point System',
      shadeBandAvailable: '',
    },
    acceptance_criteria: {
      maxPerRoll: null, maxShipmentAverage: null,
    },
    roll_by_roll: { rolls: [] },
    defect_log: { defects: [] },
    defect_summary_result: {
      totalInspectedQty: null, totalPenaltyPoints: null, avgPtsPer100yd2: null, rollsInspected: null,
      overallResult: '', summaryRemarks: '',
    },
    shade_width_physical: { checks: {} },
    lab_test_reports: {
      shrinkageResult: '', shrinkageReport: null,
      crockingResult: '', crockingReport: null,
      washResult: '', washReport: null,
      gsmResult: '', gsmReport: null,
      spiralityResult: '', spiralityReport: null,
      phResult: '', phReport: null,
    },
    photo_journal: {
      fabricFace: null, fabricBack: null, shadeBand: null, selvedge: null,
      majorDefect1: null, majorDefect2: null, rollLotLabel: null, centreToSelvedgeTest: null,
    },
    conclusion_signoff: {
      overallResult: '', disposition: '', remarks: '', qualityController: '',
      warehouseInCharge: '', date: null, signature: null,
    },
  };
}
