import { DropdownOption } from '../components/form/DropdownField';
import tokens from '../theme/tokens';

export const COMMON_STATUS_OPTIONS: DropdownOption[] = [
  { value: 'OK', label: 'OK', icon: 'check-circle', color: tokens.color.success },
  { value: 'Not OK', label: 'Not OK', icon: 'close-circle', color: tokens.color.danger },
  { value: 'N/A', label: 'N/A', icon: 'minus-circle-outline', color: tokens.color.textSecondary }
];
