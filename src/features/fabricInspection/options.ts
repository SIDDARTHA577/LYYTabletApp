// Local copies of the option lists the backend also seeds into
// `referencelists` (server/seed/referenceLists.js), kept here so the form
// renders instantly without waiting on a reference-data fetch. If these
// lists ever need a correction, update both this file and
// server/seed/referenceLists.js.

export const LIGHT_SOURCE_OPTIONS = ['D65', 'TL84', 'CWF', 'Daylight'];
export const METHOD_OPTIONS = ['4-Point System'];
export const YES_NO_OPTIONS = ['Yes', 'No'];
export const RESULT_OPTIONS = ['Pass', 'Screen', 'Reject'];
export const DISPOSITION_OPTIONS = ['Accept', 'Accept with concession', 'Reject / return to mill'];
import { COMMON_STATUS_OPTIONS } from '../../constants/statusOptions';
export const CHECK_STATUS_OPTIONS = COMMON_STATUS_OPTIONS;
export const BAND_OPTIONS = ['1', '2', '3', '4'];

export const SHADE_WIDTH_PHYSICAL_CHECKS = [
  'Shade band available & approved',
  'Centre-to-selvedge variation (A/B/C/D/E test)',
  'Side-to-side shading',
  'End-to-end shading',
  'Roll-to-roll shading',
  'Width consistency vs spec',
  'GSM check vs spec',
  'Skewing / Bowing %',
  'Hand-feel vs approved',
];

export const FABRIC_DEFECT_CODES_WOVEN_GENERAL = [
  { code: 'F1', defect: 'Dye Patches' }, { code: 'F2', defect: 'Dyebar' },
  { code: 'F3', defect: 'Fly Yarn' }, { code: 'F4', defect: 'Contamination' },
  { code: 'F5', defect: 'Slubs' }, { code: 'F6', defect: 'Knots' },
  { code: 'F7', defect: 'Fabric Holes' }, { code: 'F8', defect: 'Needle Line' },
  { code: 'F9', defect: 'Pull Yarn' }, { code: 'F10', defect: 'Bowing' },
  { code: 'F11', defect: 'Grainlines' }, { code: 'F12', defect: 'Crease Mark' },
  { code: 'F13', defect: 'Wrinkles' }, { code: 'F14', defect: 'Stains' },
  { code: 'F15', defect: 'Misprint (AOP)' }, { code: 'F16', defect: 'Fabric Pilling' },
  { code: 'F17', defect: 'Selvedge' }, { code: 'F18', defect: 'Stripe Repeat Uneven' },
];

export const FABRIC_DEFECT_CODES_KNIT = [
  { code: 'F1', defect: 'Barre' }, { code: 'F2', defect: 'Drop Stitches' },
  { code: 'F3', defect: 'Hole' }, { code: 'F4', defect: 'Missing Yarn' },
  { code: 'F5', defect: 'Needle Line' }, { code: 'F6', defect: 'Runner' },
  { code: 'F7', defect: 'Birdseye' }, { code: 'F8', defect: 'Slub' },
  { code: 'F9', defect: 'Streakiness' }, { code: 'F10', defect: 'Imperfection' },
  { code: 'F11', defect: 'Snarls' }, { code: 'F12', defect: 'Broken Ends' },
  { code: 'F13', defect: 'Contamination' }, { code: 'F14', defect: 'Surface Hairiness / Pilling' },
  { code: 'F15', defect: 'Snagging' }, { code: 'F16', defect: 'Bleaching Spots' },
  { code: 'F17', defect: 'Dyestuff Stain' }, { code: 'F18', defect: 'Patchy / Uneven Dyeing' },
  { code: 'F19', defect: 'Shade in Printing' }, { code: 'F20', defect: 'Misprint / Absent Print' },
  { code: 'F21', defect: 'Bowing' },
];

// Combined "F3 - Hole" style option list + a code->name lookup, used by the
// Defect Log's Code dropdown and its auto-filled Defect Name field.
export const ALL_FABRIC_DEFECT_CODES = [...FABRIC_DEFECT_CODES_WOVEN_GENERAL, ...FABRIC_DEFECT_CODES_KNIT];

export function defectCodeOptions(): string[] {
  // De-duplicate by code, preferring the woven/general label when both lists share a code.
  const seen = new Map<string, string>();
  for (const d of FABRIC_DEFECT_CODES_KNIT) seen.set(d.code, d.defect);
  for (const d of FABRIC_DEFECT_CODES_WOVEN_GENERAL) seen.set(d.code, d.defect);
  return Array.from(seen.entries()).map(([code, defect]) => `${code} - ${defect}`);
}

export function defectNameForCode(codeOption: string): string {
  const [, ...rest] = codeOption.split(' - ');
  return rest.join(' - ');
}
