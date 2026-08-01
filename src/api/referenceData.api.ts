// No backend in this build — static stand-ins for the reference-data
// lookups (not currently wired into any screen, kept for interface parity).
const MOCK_FACTORIES = [
  { _id: 'factory-1', name: 'Zhejiang Golden Loom', nameCn: '浙江金梭', code: 'ZJ-GL' },
  { _id: 'factory-2', name: 'Guangdong Textile Hub', nameCn: '广东纺织', code: 'GD-TH' },
  { _id: 'factory-3', name: 'Suzhou Silk Mills', nameCn: '苏州丝绸', code: 'SZ-SM' },
];

const MOCK_INSPECTORS = [
  { id: 'inspector-1', name: 'Inspector Gadget', employeeId: 'LYY-INS-0002' },
  { id: 'inspector-2', name: 'Wei Zhang', nameCn: '张伟', employeeId: 'LYY-INS-0015' },
];

const MOCK_REFERENCE_LISTS: Record<string, string[]> = {
  colors: ['White', 'Black', 'Navy', 'Grey', 'Red'],
  divisions: ['Menswear', 'Womenswear', 'Kidswear'],
};

export async function fetchFactories() {
  return MOCK_FACTORIES;
}

export async function fetchInspectors() {
  return MOCK_INSPECTORS;
}

export async function fetchReferenceList(key: string) {
  return MOCK_REFERENCE_LISTS[key] ?? [];
}
