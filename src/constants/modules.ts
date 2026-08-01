// Registry of inspection modules the drawer/dashboard render from. Adding a
// module in a later phase (see docs/IMPLEMENTATION_PLAN.md §0) means adding
// one entry here plus its screen/stack — no navigation shell rewrite.
export type InspectionModuleKey =
  | 'daily_check'
  | 'fabric_inspection'
  | 'final_inspection'
  | 'inline_inspection'
  | 'pp_meeting'
  | 'spot_check'
  | 'factory_check';

export interface InspectionModule {
  key: InspectionModuleKey;
  name: string;
  nameCn: string;
  shortDescription: string;
  icon: string; // MaterialCommunityIcons name
  sortOrder: number;
  implemented: boolean;
}

export const INSPECTION_MODULES: InspectionModule[] = [
  {
    key: 'daily_check',
    name: 'Daily Check',
    nameCn: '每日检查',
    shortDescription: 'Production Follow-Up Report',
    icon: 'clipboard-check-outline',
    sortOrder: 1,
    implemented: true,
  },
  {
    key: 'fabric_inspection',
    name: 'Fabric Inspection',
    nameCn: '面料检验',
    shortDescription: '4-Point System roll-by-roll inspection',
    icon: 'texture-box',
    sortOrder: 2,
    implemented: true,
  },
  {
    key: 'final_inspection',
    name: 'Final Inspection',
    nameCn: '终检',
    shortDescription: 'Pre-shipment AQL & safety checks',
    icon: 'package-variant-closed-check',
    sortOrder: 3,
    implemented: true,
  },
  {
    key: 'inline_inspection',
    name: 'Inline Inspection',
    nameCn: '在线检验',
    shortDescription: 'In-progress production line checks',
    icon: 'factory',
    sortOrder: 4,
    implemented: true,
  },
  {
    key: 'pp_meeting',
    name: 'PP Meeting',
    nameCn: '产前会议',
    shortDescription: 'Pre-Production Meeting record',
    icon: 'account-group-outline',
    sortOrder: 5,
    implemented: true,
  },
  {
    key: 'spot_check',
    name: 'Spot Check',
    nameCn: '抽查',
    shortDescription: 'Unscheduled random quality sweep',
    icon: 'magnify-scan',
    sortOrder: 6,
    implemented: true,
  },
  {
    key: 'factory_check',
    name: 'Factory Check',
    nameCn: '工厂审核',
    shortDescription: 'Full factory / vendor audit',
    icon: 'domain',
    sortOrder: 7,
    implemented: true,
  },
];
