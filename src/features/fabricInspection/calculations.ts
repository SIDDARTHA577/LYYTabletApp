import type { DefectRow, FabricInspectionData, RollRow } from './types';
import { defectNameForCode } from './options';

// All formulas transcribed from FABRIC INSPECTION.txt §3/§6 (also see
// docs/FIELD_MAPPING.md "Fabric Inspection"):
//
//   Points per 100 yd² = Total points × 3600 ÷ (Inspected yards × Cuttable width in inches)
//   Max 4 points per single defect; band 1..4 maps directly to points 1..4.

export function pointsForBand(band: string): number | null {
  const n = Number(band);
  if (!band || Number.isNaN(n)) return null;
  return Math.min(4, Math.max(1, n));
}

export function rollTotalPtsFromDefectLog(rollNo: string, defects: DefectRow[]): number | null {
  if (!rollNo) return null;
  const matching = defects.filter((d) => d.rollNo === rollNo && d.pts !== null);
  if (matching.length === 0) return null;
  return matching.reduce((sum, d) => sum + (d.pts ?? 0), 0);
}

export function ptsPer100yd2(totalPts: number | null, lengthYd: number | null, widthIn: number | null): number | null {
  if (!totalPts || !lengthYd || !widthIn || lengthYd <= 0 || widthIn <= 0) return null;
  return Math.round(((totalPts * 3600) / (lengthYd * widthIn)) * 100) / 100;
}

// The template only defines a hard "max per roll" acceptance threshold, not
// a separate Screen band — Screen is treated as a manual QC override
// available in the Result dropdown, not an auto-computed state. This
// suggestion is only ever used to pre-fill an *empty* Result cell; once an
// inspector picks a value the auto-suggestion no longer overwrites it.
export function suggestRollResult(pts: number | null, maxPerRoll: number | null): 'Pass' | 'Screen' | 'Reject' | '' {
  if (pts === null || maxPerRoll === null) return '';
  if (pts < maxPerRoll) return 'Pass';
  if (pts === maxPerRoll) return 'Screen';
  return 'Reject';
}

export function recomputeRoll(roll: RollRow, defects: DefectRow[]): RollRow {
  const totalPts = rollTotalPtsFromDefectLog(roll.rollNo, defects) ?? roll.totalPts;
  const pts100 = ptsPer100yd2(totalPts, roll.lengthYd, roll.widthIn);
  return { ...roll, totalPts, ptsPer100yd2: pts100 };
}

export interface DefectSummary {
  totalInspectedQty: number | null;
  totalPenaltyPoints: number | null;
  avgPtsPer100yd2: number | null;
  rollsInspected: number;
  suggestedOverallResult: 'Pass' | 'Screen' | 'Reject' | '';
}

export function computeDefectSummary(
  rolls: RollRow[],
  maxPerRoll: number | null,
  maxShipmentAverage: number | null
): DefectSummary {
  const rollsInspected = rolls.length;
  const totalInspectedQty = rolls.reduce((sum, r) => sum + (r.lengthYd ?? 0), 0) || null;
  const totalPenaltyPoints = rolls.reduce((sum, r) => sum + (r.totalPts ?? 0), 0) || null;

  const pts100Values = rolls.map((r) => r.ptsPer100yd2).filter((v): v is number => v !== null);
  const avgPtsPer100yd2 =
    pts100Values.length > 0 ? Math.round((pts100Values.reduce((s, v) => s + v, 0) / pts100Values.length) * 100) / 100 : null;

  let suggestedOverallResult: DefectSummary['suggestedOverallResult'] = '';
  if (rollsInspected > 0) {
    const anyRollOverMax = maxPerRoll !== null && pts100Values.some((v) => v > maxPerRoll);
    const averageOverMax = maxShipmentAverage !== null && avgPtsPer100yd2 !== null && avgPtsPer100yd2 > maxShipmentAverage;
    suggestedOverallResult = anyRollOverMax || averageOverMax ? 'Reject' : 'Pass';
  }

  return { totalInspectedQty, totalPenaltyPoints, avgPtsPer100yd2, rollsInspected, suggestedOverallResult };
}

// Single entry point the form screen calls after every edit to Section 4/5:
// fills Defect Log derived cells (defectName, pts), rolls up into Section 4
// (totalPts, ptsPer100yd2, a Result suggestion for still-empty cells), then
// rolls that up again into the Section 6 summary. Kept pure/side-effect-free
// so it's easy to unit test independent of any screen.
export function recomputeFabricInspectionData(data: FabricInspectionData): FabricInspectionData {
  const defects = data.defect_log.defects.map((d) => ({
    ...d,
    defectName: d.code ? defectNameForCode(d.code) : d.defectName,
    pts: d.band ? pointsForBand(d.band) : d.pts,
  }));

  // Sync unique rolls from defects
  const uniqueDefectRolls = Array.from(new Set(
    defects.map(d => d.rollNo.trim()).filter(r => r !== '')
  ));

  let syncedRolls = [...data.roll_by_roll.rolls];

  // Add missing rolls
  uniqueDefectRolls.forEach((rollNo) => {
    const exists = syncedRolls.some(r => r.rollNo.trim() === rollNo);
    if (!exists) {
      syncedRolls.push({
        _rowId: 'roll-' + Math.random().toString(36).slice(2, 11),
        rollNo: rollNo,
        lotDia: '',
        lengthYd: null,
        widthIn: null,
        weightKg: null,
        totalPts: null,
        ptsPer100yd2: null,
        result: '',
        labelLengthWeight: '',
        labelPhotoUri: null
      });
    }
  });

  // Remove empty auto-created rolls that are no longer in defects
  syncedRolls = syncedRolls.filter((roll) => {
    const hasDefects = uniqueDefectRolls.includes(roll.rollNo.trim());
    if (hasDefects) return true;
    const hasManualData = roll.lotDia.trim() !== '' ||
      roll.lengthYd !== null ||
      roll.widthIn !== null ||
      roll.weightKg !== null ||
      roll.labelLengthWeight.trim() !== '' ||
      roll.labelPhotoUri !== null;
    return hasManualData;
  });

  const rolls = syncedRolls.map((roll) => {
    const recomputed = recomputeRoll(roll, defects);
    const result =
      recomputed.result || suggestRollResult(recomputed.ptsPer100yd2, data.acceptance_criteria.maxPerRoll) || '';
    return { ...recomputed, result: result as RollRow['result'] };
  });

  const summary = computeDefectSummary(rolls, data.acceptance_criteria.maxPerRoll, data.acceptance_criteria.maxShipmentAverage);

  return {
    ...data,
    defect_log: { defects },
    roll_by_roll: { rolls },
    defect_summary_result: {
      ...data.defect_summary_result,
      totalInspectedQty: summary.totalInspectedQty,
      totalPenaltyPoints: summary.totalPenaltyPoints,
      avgPtsPer100yd2: summary.avgPtsPer100yd2,
      rollsInspected: summary.rollsInspected,
      overallResult: data.defect_summary_result.overallResult || summary.suggestedOverallResult,
    },
  };
}
