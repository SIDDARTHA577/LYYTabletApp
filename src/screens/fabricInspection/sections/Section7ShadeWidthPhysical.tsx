import React from 'react';
import { CheckGrid, CheckGridRowValue } from '../../../components/form/CheckGrid';
import { CHECK_STATUS_OPTIONS, SHADE_WIDTH_PHYSICAL_CHECKS } from '../../../features/fabricInspection/options';
import type { FabricInspectionData } from '../../../features/fabricInspection/types';

type Data = FabricInspectionData['shade_width_physical'];

export function Section7ShadeWidthPhysical({ data, onChange }: { data: Data; onChange: (next: Partial<Data>) => void }) {
  return (
    <CheckGrid
      items={SHADE_WIDTH_PHYSICAL_CHECKS}
      statusOptions={CHECK_STATUS_OPTIONS}
      value={data.checks}
      onChangeRow={(item, row: CheckGridRowValue) => onChange({ checks: { ...data.checks, [item]: row } })}
    />
  );
}
