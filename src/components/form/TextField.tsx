import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { FieldShell } from './FieldShell';
import { BarcodeScannerModal } from './BarcodeScannerModal';
import tokens from '../../theme/tokens';

export function TextField({
  label,
  labelCn,
  required,
  value,
  onChangeText,
  error,
  placeholder,
  multiline,
  numberOfLines,
  width,
  scannable,
  keyboardType,
  editable,
}: {
  label: string;
  labelCn?: string;
  required?: boolean;
  value?: string | null;
  onChangeText: (v: string) => void;
  error?: string;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  width?: number | `${number}%`;
  // Adds a barcode/QR scan icon that fills this field from a scanned label
  // — used for fields sourced from a physical roll/lot tag (see
  // Section1OrderFabricInfo's Lot # field).
  scannable?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  editable?: boolean;
}) {
  const [scannerOpen, setScannerOpen] = useState(false);

  return (
    <FieldShell label={label} labelCn={labelCn} required={required} error={error} width={width}>
      <TextInput
        mode="outlined"
        dense
        value={value || ''}
        onChangeText={onChangeText}
        editable={editable}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines ?? (multiline ? 3 : 1)}
        error={Boolean(error)}
        keyboardType={keyboardType}
        outlineColor={tokens.color.border}
        activeOutlineColor={tokens.color.primary}
        outlineStyle={{ borderRadius: tokens.radius.md }}
        style={{ backgroundColor: tokens.color.surface }}
        right={scannable ? <TextInput.Icon icon="barcode-scan" onPress={() => setScannerOpen(true)} /> : undefined}
      />
      {scannable && (
        <BarcodeScannerModal
          visible={scannerOpen}
          onClose={() => setScannerOpen(false)}
          onScanned={(v) => onChangeText(v)}
        />
      )}
    </FieldShell>
  );
}
