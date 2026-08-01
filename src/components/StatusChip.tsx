import React from 'react';
import { Chip } from 'react-native-paper';
import { statusColors } from '../theme/paperTheme';
import tokens from '../theme/tokens';

type Status = 'draft' | 'submitted' | 'synced' | 'Pass' | 'Screen' | 'Reject';

const STATUS_STYLE: Record<string, { bg: string; fg: string; label: string }> = {
  draft: { bg: tokens.status.draft.bg, fg: tokens.status.draft.fg, label: 'Draft' },
  submitted: { bg: tokens.color.primaryLight, fg: tokens.color.primary, label: 'Submitted' },
  synced: { bg: tokens.status.completed.bg, fg: statusColors.pass, label: 'Synced' },
  Pass: { bg: tokens.status.completed.bg, fg: statusColors.pass, label: 'Pass' },
  Screen: { bg: tokens.status.pending.bg, fg: statusColors.screen, label: 'Screen' },
  Reject: { bg: tokens.status.overdue.bg, fg: statusColors.reject, label: 'Reject' },
};

export function StatusChip({ status }: { status: Status | string }) {
  const style = STATUS_STYLE[status] ?? { bg: tokens.status.draft.bg, fg: tokens.status.draft.fg, label: status };
  return (
    <Chip
      compact
      style={{ backgroundColor: style.bg, borderRadius: tokens.radius.pill }}
      textStyle={{ color: style.fg, fontWeight: '600', fontSize: 12 }}
    >
      {style.label}
    </Chip>
  );
}
