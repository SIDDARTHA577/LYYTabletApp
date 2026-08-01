import type { InspectionSummary } from '../../api/inspections.api';

export const MOCK_FABRIC_INSPECTIONS: InspectionSummary[] = [
  {
    _id: 'mock-1',
    clientId: 'mock-clientid-1',
    inspectionType: { key: 'fabric_inspection', name: 'Fabric Inspection' },
    factory: { name: 'Zhejiang Golden Loom', nameCn: '浙江金织' },
    status: 'draft',
    data: { order_fabric_info: { style: 'MM2202', po: 'LYY-GC-24040', colour: 'Electric Magenta' } },
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    startedAt: new Date().toISOString(), // Today
    location: 'Zhejiang',
  } as any,
  {
    _id: 'mock-2',
    clientId: 'mock-clientid-2',
    inspectionType: { key: 'fabric_inspection', name: 'Fabric Inspection' },
    factory: { name: 'Guangdong Textile Hub', nameCn: '广东纺织枢纽' },
    status: 'draft',
    data: { order_fabric_info: { style: 'KW2210', po: 'LYY-GC-24122', colour: 'Charcoal Melange' } },
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    startedAt: new Date().toISOString(), // Today
    location: 'Guangdong',
  } as any,
  {
    _id: 'mock-3',
    clientId: 'mock-clientid-3',
    inspectionType: { key: 'fabric_inspection', name: 'Fabric Inspection' },
    factory: { name: 'Suzhou Silk Mills', nameCn: '苏州丝绸厂' },
    status: 'draft',
    data: { order_fabric_info: { style: 'SS1990', po: 'LYY-GC-25501', colour: 'Crimson Red' } },
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago (Overdue)
    location: 'Suzhou',
  } as any,
  {
    _id: 'mock-4',
    clientId: 'mock-clientid-4',
    inspectionType: { key: 'fabric_inspection', name: 'Fabric Inspection' },
    factory: { name: 'Guangdong Textile Hub', nameCn: '广东纺织枢纽' },
    status: 'submitted',
    data: { order_fabric_info: { style: 'MM2301', po: 'LYY-GC-24118', colour: 'Ivory White' } },
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    location: 'Guangdong',
  } as any,
  {
    _id: 'mock-5',
    clientId: 'mock-clientid-5',
    inspectionType: { key: 'inline_inspection', name: 'Inline Inspection' },
    factory: { name: 'Zhejiang Golden Loom', nameCn: '浙江金织' },
    status: 'submitted',
    data: { order_fabric_info: { style: 'PP1002', po: 'LYY-GC-30010', colour: 'Navy Blue' } },
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    location: 'Zhejiang',
  } as any,
];
